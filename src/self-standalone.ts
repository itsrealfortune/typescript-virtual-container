import { basename } from "node:path";
import { stdin, stdout } from "node:process";
import { createInterface, type Interface } from "node:readline";
import { readFile, unlink, writeFile } from "node:fs/promises";

import { makeDefaultEnv, runCommand } from "./commands/runtime";
import { buildLoginBanner, type LoginBannerState } from "./SSHMimic/loginBanner";
import { buildPrompt } from "./SSHMimic/prompt";
import { spawnNanoEditorProcess } from "./modules/shellInteractive";
import type { CommandResult, PasswordChallenge, SudoChallenge } from "./types/commands";
import { VirtualShell } from "./VirtualShell";

const hostname = process.env.SSH_MIMIC_HOSTNAME ?? "typescript-vm";
const argv = process.argv.slice(2);

function readUserArg(): string {
	for (let index = 0; index < argv.length; index += 1) {
		const current = argv[index];
		if (current === "--user") {
			const next = argv[index + 1];
			if (!next || next.startsWith("--")) {
				throw new Error("self-standalone: --user requires a value");
			}
			return next;
		}
		if (current?.startsWith("--user=")) {
			return current.slice("--user=".length) || "root";
		}
	}

	return "root";
}

const initialUser = readUserArg();
const virtualShell = new VirtualShell(hostname, undefined, {
	mode: "fs",
	snapshotPath: ".vfs",
});

function readLastLogin(username: string): LoginBannerState | null {
	const lastlogPath = `/virtual-env-js/.lastlog/${username}.json`;
	if (!virtualShell.vfs.exists(lastlogPath)) {
		return null;
	}

	try {
		return JSON.parse(virtualShell.vfs.readFile(lastlogPath)) as LoginBannerState;
	} catch {
		return null;
	}
}

function askHiddenQuestion(rl: Interface, promptText: string): Promise<string> {
	return new Promise((resolve) => {
		if (!stdin.isTTY || !stdout.isTTY) {
			rl.question(promptText, resolve);
			return;
		}

		const wasRawMode = Boolean(stdin.isRaw);
		let buffer = "";

		const cleanup = (): void => {
			stdin.off("data", onData);
			if (!wasRawMode) {
				stdin.setRawMode(false);
			}
			rl.resume();
		};

		const finish = (value: string): void => {
			cleanup();
			stdout.write("\n");
			resolve(value);
		};

		const onData = (chunk: Buffer): void => {
			const input = chunk.toString("utf8");
			for (let index = 0; index < input.length; index += 1) {
				const ch = input[index]!;
				if (ch === "\r" || ch === "\n") {
					finish(buffer);
					return;
				}
				if (ch === "\u007f" || ch === "\b") {
					buffer = buffer.slice(0, -1);
					continue;
				}
				if (ch >= " ") {
					buffer += ch;
				}
			}
		};

		rl.pause();
		stdout.write(promptText);
		if (!wasRawMode) {
			stdin.setRawMode(true);
		}
		stdin.resume();
		stdin.on("data", onData);
	});
}

function writeLastLogin(username: string, from: string): void {
	const dir = "/virtual-env-js/.lastlog";
	if (!virtualShell.vfs.exists(dir)) {
		virtualShell.vfs.mkdir(dir, 0o700);
	}

	virtualShell.vfs.writeFile(
		`/virtual-env-js/.lastlog/${username}.json`,
		JSON.stringify({ at: new Date().toISOString(), from }),
	);
}

async function flushVfs(): Promise<void> {
	await virtualShell.vfs.flushMirror();
}

function loadHistory(): string[] {
	const historyPath = "/virtual-env-js/.bash_history";
	if (!virtualShell.vfs.exists(historyPath)) {
		virtualShell.vfs.writeFile(historyPath, "");
		return [];
	}

	return virtualShell.vfs
		.readFile(historyPath)
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.length > 0);
}

function saveHistory(history: string[]): void {
	const data = history.length > 0 ? `${history.join("\n")}\n` : "";
	virtualShell.vfs.writeFile("/virtual-env-js/.bash_history", data);
}

function applySessionState(
	authUserState: string,
	cwdState: string,
	result: CommandResult,
	shellEnvState: ReturnType<typeof makeDefaultEnv>,
): { authUser: string; cwd: string } {
	let authUser = authUserState;
	let cwd = cwdState;

	if (result.switchUser) {
		authUser = result.switchUser;
		cwd = result.nextCwd ?? `/home/${authUser}`;
		shellEnvState.vars.USER = authUser;
		shellEnvState.vars.LOGNAME = authUser;
		shellEnvState.vars.HOME = `/home/${authUser}`;
		shellEnvState.vars.PWD = cwd;
	} else if (result.nextCwd) {
		cwd = result.nextCwd;
		shellEnvState.vars.PWD = cwd;
	}

	return { authUser, cwd };
}

virtualShell.addCommand("demo", [], () => {
	return {
		stdout: "This is a demo command. It does nothing useful.",
		exitCode: 0,
	};
});

async function runReadlineShell() {
	const rl = createInterface({ input: stdin, output: stdout, terminal: true });
	await virtualShell.ensureInitialized();
	let history = loadHistory();
	(rl as unknown as { history: string[] }).history = [...history].reverse();

	const selectedUser = initialUser.trim() || "root";
	const userExists = virtualShell.users.getPasswordHash(selectedUser) !== null;
	if (!userExists) {
		process.stderr.write(`self-standalone: user '${selectedUser}' does not exist\n`);
		process.exit(1);
	}

	const shellEnv = makeDefaultEnv(selectedUser, hostname);
	let authUser = selectedUser;
	let cwd = `/home/${authUser}`;
	shellEnv.vars.PWD = cwd;
	const remoteAddress = "localhost";
	const terminalSize = {
		cols: stdout.columns ?? 80,
		rows: stdout.rows ?? 24,
	};
	const nanoStream = {
		write: stdout.write.bind(stdout),
		exit: () => undefined,
		end: () => undefined,
	} as const;

	async function startNanoEditor(
		targetPath: string,
		initialContent: string,
		tempPath: string,
	): Promise<void> {
		if (virtualShell.vfs.exists(targetPath)) {
			await writeFile(tempPath, initialContent, "utf8");
		}

		rl.pause();
		const editor = spawnNanoEditorProcess(
			tempPath,
			terminalSize,
			nanoStream as unknown as Parameters<typeof spawnNanoEditorProcess>[2],
		);

		await new Promise<void>((resolve) => {
			editor.on("error", (error: Error) => {
				stdout.write(`nano: ${error.message}\r\n`);
				resolve();
			});

			editor.on("close", async () => {
				try {
					const updatedContent = await readFile(tempPath, "utf8");
					virtualShell.writeFileAsUser(authUser, targetPath, updatedContent);
					await flushVfs();
				} catch {
					// Save skipped or temp file missing.
				}

				await unlink(tempPath).catch(() => undefined);
				stdout.write("\r\n");
				resolve();
			});
		});

		rl.resume();
	}

	async function handleSudoChallenge(challenge: SudoChallenge): Promise<void> {
		if (challenge.onPassword) {
			let promptText = challenge.prompt;
			while (true) {
				const typed = await askHiddenQuestion(rl, promptText);
				const step = await challenge.onPassword(typed, virtualShell);
				if (step.result === null) {
					promptText = step.nextPrompt ?? promptText;
					continue;
				}

				await handleCommandResult(step.result);
				return;
			}
		}

		const password = await askHiddenQuestion(rl, challenge.prompt);
		if (!virtualShell.users.verifyPassword(challenge.username, password)) {
			process.stderr.write("Sorry, try again.\n");
			return;
		}

		if (!challenge.commandLine) {
			authUser = challenge.targetUser;
			cwd = `/home/${authUser}`;
			shellEnv.vars.USER = authUser;
			shellEnv.vars.LOGNAME = authUser;
			shellEnv.vars.HOME = `/home/${authUser}`;
			shellEnv.vars.PWD = cwd;
			return;
		}

		const runCwd = challenge.loginShell ? `/home/${challenge.targetUser}` : cwd;
		const nestedResult = await runCommand(
			challenge.commandLine,
			challenge.targetUser,
			hostname,
			"shell",
			runCwd,
			virtualShell,
			undefined,
			shellEnv,
		);
		await handleCommandResult(nestedResult);
	}

	async function handlePasswordChallenge(
		challenge: PasswordChallenge,
	): Promise<void> {
		const first = await askHiddenQuestion(rl, challenge.prompt);
		if (challenge.confirmPrompt) {
			const second = await askHiddenQuestion(rl, challenge.confirmPrompt);
			if (second !== first) {
				process.stderr.write("passwords do not match\n");
				return;
			}
		}

		switch (challenge.action) {
			case "passwd":
				await virtualShell.users.setPassword(challenge.targetUsername, first);
				stdout.write("passwd: password updated successfully\n");
				break;
			case "adduser":
				if (!challenge.newUsername) {
					process.stderr.write("adduser: missing username\n");
					return;
				}
				await virtualShell.users.addUser(challenge.newUsername, first);
				stdout.write(`adduser: user '${challenge.newUsername}' created\n`);
				break;
			case "deluser":
				await virtualShell.users.deleteUser(challenge.targetUsername);
				stdout.write(`Removing user '${challenge.targetUsername}' ...\ndeluser: done.\n`);
				break;
			case "su":
				authUser = challenge.targetUsername;
				cwd = `/home/${authUser}`;
				shellEnv.vars.USER = authUser;
				shellEnv.vars.LOGNAME = authUser;
				shellEnv.vars.HOME = `/home/${authUser}`;
				shellEnv.vars.PWD = cwd;
				break;
		}
	}

	async function handleCommandResult(result: CommandResult): Promise<void> {
		if (result.openEditor) {
			await startNanoEditor(
				result.openEditor.targetPath,
				result.openEditor.initialContent,
				result.openEditor.tempPath,
			);
			return;
		}

		if (result.sudoChallenge) {
			await handleSudoChallenge(result.sudoChallenge);
			return;
		}

		if (result.passwordChallenge) {
			await handlePasswordChallenge(result.passwordChallenge);
			return;
		}

		if (result.stdout) {
			stdout.write(result.stdout.endsWith("\n") ? result.stdout : `${result.stdout}\n`);
		}

		if (result.stderr) {
			process.stderr.write(result.stderr.endsWith("\n") ? result.stderr : `${result.stderr}\n`);
		}

		if (result.clearScreen) {
			stdout.write("\u001b[2J\u001b[H");
			console.clear();
		}

		const updatedState = applySessionState(authUser, cwd, result, shellEnv);
		authUser = updatedState.authUser;
		cwd = updatedState.cwd;

		if (result.closeSession) {
			await flushVfs();
			rl.close();
			process.exit(result.exitCode ?? 0);
		}
	}

	if (process.env.USER !== "root" && virtualShell.users.hasPassword(authUser)) {
		const password = await askHiddenQuestion(rl, `Password for ${authUser}: `);
		if (!virtualShell.users.verifyPassword(authUser, password)) {
			process.stderr.write("self-standalone: authentication failed\n");
			process.exit(1);
		}
	}

	const renderPrompt = (): string => {
		const cwdLabel = cwd === `/home/${authUser}` ? "~" : basename(cwd) || "/";
		return buildPrompt(authUser, hostname, cwdLabel);
	};

	const prompt = (): void => {
		rl.setPrompt(renderPrompt());
		rl.prompt();
	};

	rl.on("SIGINT", () => {
		stdout.write("^C\n");
		rl.write("", { ctrl: true, name: "u" });
		prompt();
	});

	rl.on("close", () => {
		void (async () => {
			await flushVfs();
			console.log("");
			process.exit(0);
		})();
	});

	stdout.write(buildLoginBanner(hostname, virtualShell.properties, readLastLogin(authUser)));
	writeLastLogin(authUser, remoteAddress);
	await flushVfs();
	prompt();

	while (true) {
		const inputLine = await new Promise<string>((resolve) => {
			rl.once("line", (line) => resolve(line));
		});

		rl.pause();
		if (inputLine.trim().length > 0) {
			history.push(inputLine);
			if (history.length > 500) {
				history = history.slice(history.length - 500);
			}
			saveHistory(history);
			(rl as unknown as { history: string[] }).history = [...history].reverse();
		}

		const result = await runCommand(inputLine, authUser, hostname, "shell", cwd, virtualShell, undefined, shellEnv);
		await handleCommandResult(result);

		await flushVfs();

		prompt();
		rl.resume();
	}
}

runReadlineShell().catch((error: unknown) => {
	console.error("Failed to start readline SSH emulation:", error);
	process.exit(1);
});

process.on("uncaughtException", (error) => {
	console.log("Oh my god, something terrible happened: ", error);
});

process.on("unhandledRejection", (error, promise) => {
	console.log(
		" Oh Lord! We forgot to handle a promise rejection here: ",
		promise,
	);
	console.log(" The error was: ", error);
});
