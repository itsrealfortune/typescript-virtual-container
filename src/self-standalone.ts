import { readFile, unlink, writeFile } from "node:fs/promises";
import * as path from "node:path";
import { basename } from "node:path";
import { stdin, stdout } from "node:process";
import { createInterface, type Interface } from "node:readline";

import { getCommandNames } from "./commands/registry";
import { makeDefaultEnv, runCommand } from "./commands/runtime";
import { spawnNanoEditorProcess } from "./modules/shellInteractive";
import { resolvePath } from "./modules/shellRuntime";
import { buildLoginBanner, type LoginBannerState } from "./SSHMimic/loginBanner";
import { buildPrompt } from "./SSHMimic/prompt";
import type { CommandResult, PasswordChallenge, SudoChallenge } from "./types/commands";
import type VirtualFileSystem from "./VirtualFileSystem";
import { VirtualShell } from "./VirtualShell";

const hostname = process.env.SSH_MIMIC_HOSTNAME ?? "typescript-vm";
const argv = process.argv.slice(2);

// ── CLI args ──────────────────────────────────────────────────────────────────
console.clear();
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

// ── VFS helpers ───────────────────────────────────────────────────────────────

function readLastLogin(username: string): LoginBannerState | null {
	const lastlogPath = `/home/${username}/.lastlog`;
	if (!virtualShell.vfs.exists(lastlogPath)) return null;
	try {
		return JSON.parse(virtualShell.vfs.readFile(lastlogPath)) as LoginBannerState;
	} catch {
		return null;
	}
}

function writeLastLogin(username: string, from: string): void {
	virtualShell.vfs.writeFile(
		`/home/${username}/.lastlog`,
		JSON.stringify({ at: new Date().toISOString(), from }),
	);
}

async function flushVfs(): Promise<void> {
	await virtualShell.vfs.stopAutoFlush();
}

function loadHistory(authUser: string): string[] {
	const historyPath = `/home/${authUser}/.bash_history`;
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

function saveHistory(history: string[], authUser: string): void {
	const data = history.length > 0 ? `${history.join("\n")}\n` : "";
	virtualShell.vfs.writeFile(`/home/${authUser}/.bash_history`, data);
}

// ── Tab completion ────────────────────────────────────────────────────────────

function listPathCompletions(vfs: VirtualFileSystem, cwd: string, prefix: string): string[] {
	const slashIndex = prefix.lastIndexOf("/");
	const dirPart = slashIndex >= 0 ? prefix.slice(0, slashIndex + 1) : "";
	const namePart = slashIndex >= 0 ? prefix.slice(slashIndex + 1) : prefix;
	const basePath = resolvePath(cwd, dirPart || ".");
	try {
		return vfs
			.list(basePath)
			.filter((e) => !e.startsWith(".") && e.startsWith(namePart))
			.map((e) => {
				const fullPath = path.posix.join(basePath, e);
				const st = vfs.stat(fullPath);
				return `${dirPart}${e}${st.type === "directory" ? "/" : ""}`;
			})
			.sort();
	} catch {
		return [];
	}
}

function makeCompleter(getState: () => { cwd: string }) {
	const commandNames = Array.from(new Set(getCommandNames())).sort();
	return (line: string, cb: (err: null, result: [string[], string]) => void): void => {
		const { cwd } = getState();
		// Extract the token under/before cursor (last whitespace-separated word)
		const token = line.split(/\s+/).at(-1) ?? "";
		const isFirstToken = line.trimStart() === token;
		const cmdHits = isFirstToken ? commandNames.filter((n) => n.startsWith(token)) : [];
		const pathHits = listPathCompletions(virtualShell.vfs, cwd, token);
		const hits = Array.from(new Set([...cmdHits, ...pathHits])).sort();
		cb(null, [hits, token]);
	};
}

// ── Hidden password input ─────────────────────────────────────────────────────

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
			if (!wasRawMode) stdin.setRawMode(false);
		};

		const finish = (value: string): void => {
			cleanup();
			stdout.write("\n");
			resolve(value);
		};

		const onData = (chunk: Buffer): void => {
			const input = chunk.toString("utf8");
			for (let i = 0; i < input.length; i += 1) {
				const ch = input[i]!;
				if (ch === "\r" || ch === "\n") { finish(buffer); return; }
				if (ch === "\u007f" || ch === "\b") { buffer = buffer.slice(0, -1); continue; }
				if (ch >= " ") buffer += ch;
			}
		};

		// Pause readline so it doesn't eat our raw keystrokes
		rl.pause();
		stdout.write(promptText);
		if (!wasRawMode) stdin.setRawMode(true);
		stdin.resume();
		stdin.on("data", onData);
	});
}

// ── Session state helper ──────────────────────────────────────────────────────

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

// ── Demo command ──────────────────────────────────────────────────────────────

virtualShell.addCommand("demo", [], () => ({
	stdout: "This is a demo command. It does nothing useful.",
	exitCode: 0,
}));

// ── Main shell ────────────────────────────────────────────────────────────────

async function runReadlineShell(): Promise<void> {
	await virtualShell.ensureInitialized();

	const selectedUser = initialUser.trim() || "root";
	if (virtualShell.users.getPasswordHash(selectedUser) === null) {
		process.stderr.write(`self-standalone: user '${selectedUser}' does not exist\n`);
		process.exit(1);
	}

	const shellEnv = makeDefaultEnv(selectedUser, hostname);
	let authUser = selectedUser;
	let cwd = `/home/${authUser}`;
	shellEnv.vars.PWD = cwd;
	const remoteAddress = "localhost";
	const terminalSize = { cols: stdout.columns ?? 80, rows: stdout.rows ?? 24 };

	let history = loadHistory(authUser);

	// completer reads cwd via closure — always current
	const rl = createInterface({
		input: stdin,
		output: stdout,
		terminal: true,
		completer: makeCompleter(() => ({ cwd })),
	});

	// Sync readline's internal history with our VFS history
	const rlWithHistory = rl as Interface & { history: string[] };
	rlWithHistory.history = [...history].reverse();

	// ── nano editor ────────────────────────────────────────────────────────────

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
			{
				write: stdout.write.bind(stdout),
				exit: () => undefined,
				end: () => undefined,
			} as unknown as Parameters<typeof spawnNanoEditorProcess>[2],
		);

		const wasRawMode = Boolean(stdin.isRaw);
		const forwardInput = (chunk: Buffer): void => { editor.stdin.write(chunk); };

		stdin.resume();
		if (!wasRawMode) stdin.setRawMode(true);
		stdin.on("data", forwardInput);

		await new Promise<void>((resolve) => {
			const cleanup = (): void => {
				stdin.off("data", forwardInput);
				if (!wasRawMode) stdin.setRawMode(false);
				rl.resume();
			};

			editor.on("error", (error: Error) => {
				cleanup();
				stdout.write(`nano: ${error.message}\r\n`);
				resolve();
			});

			editor.on("close", async () => {
				cleanup();
				rl.write("", { ctrl: true, name: "u" });
				try {
					const updatedContent = await readFile(tempPath, "utf8");
					virtualShell.writeFileAsUser(authUser, targetPath, updatedContent);
					await flushVfs();
				} catch {
					// save skipped or temp file missing
				}
				await unlink(tempPath).catch(() => undefined);
				stdout.write("\r\n");
				resolve();
			});
		});
	}

	// ── challenge handlers ─────────────────────────────────────────────────────

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

	async function handlePasswordChallenge(challenge: PasswordChallenge): Promise<void> {
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

	// handleCommandResult must be declared before the "line" handler
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

		if (result.clearScreen) {
			stdout.write("\u001b[2J\u001b[H");
			console.clear();
		}

		if (result.stdout) {
			stdout.write(result.stdout.endsWith("\n") ? result.stdout : `${result.stdout}\n`);
		}

		if (result.stderr) {
			process.stderr.write(result.stderr.endsWith("\n") ? result.stderr : `${result.stderr}\n`);
		}

		const updated = applySessionState(authUser, cwd, result, shellEnv);
		authUser = updated.authUser;
		cwd = updated.cwd;

		if (result.closeSession) {
			await flushVfs();
			rl.close();
			process.exit(result.exitCode ?? 0);
		}
	}

	// ── Prompt helper ──────────────────────────────────────────────────────────

	const renderPrompt = (): string => {
		const cwdLabel = cwd === `/home/${authUser}` ? "~" : basename(cwd) || "/";
		return buildPrompt(authUser, hostname, cwdLabel);
	};

	const prompt = (): void => {
		rl.setPrompt(renderPrompt());
		rl.prompt();
	};

	// ── Auth (password gate) ───────────────────────────────────────────────────

	if (process.env.USER !== "root" && virtualShell.users.hasPassword(authUser)) {
		const password = await askHiddenQuestion(rl, `Password for ${authUser}: `);
		if (!virtualShell.users.verifyPassword(authUser, password)) {
			process.stderr.write("self-standalone: authentication failed\n");
			process.exit(1);
		}
	}

	// ── Login banner ───────────────────────────────────────────────────────────

	stdout.write(buildLoginBanner(hostname, virtualShell.properties, readLastLogin(authUser)));
	writeLastLogin(authUser, remoteAddress);
	await flushVfs();

	// ── Event-driven line handler (enables completer) ──────────────────────────
	//
	// Key insight: readline's completer only fires when readline itself owns
	// stdin (i.e. rl is not paused). We use the event-driven "line" pattern
	// instead of a while(true)+rl.once("line") loop so readline stays active
	// between commands. We pause only while awaiting async work, then resume
	// immediately before re-prompting so the next Tab press is caught.

	let busy = false;

	rl.on("line", async (inputLine: string) => {
		if (busy) return; // shouldn't happen but guard re-entrancy
		busy = true;
		rl.pause();

		const trimmed = inputLine.trim();
		if (trimmed.length > 0) {
			history.push(inputLine);
			if (history.length > 500) history = history.slice(history.length - 500);
			saveHistory(history, authUser);
			rlWithHistory.history = [...history].reverse();
		}

		const result = await runCommand(
			inputLine,
			authUser,
			hostname,
			"shell",
			cwd,
			virtualShell,
			undefined,
			shellEnv,
		);
		await handleCommandResult(result);
		await flushVfs();

		busy = false;
		// Resume before prompt so readline can handle Tab on the next input
		rl.resume();
		prompt();
	});

	rl.on("SIGINT", () => {
		stdout.write("^C\n");
		rl.write("", { ctrl: true, name: "u" });
		prompt();
	});

	rl.on("close", () => {
		void flushVfs().then(() => {
			console.log("");
			process.exit(0);
		});
	});

	// Initial prompt — readline is already active, completer live from first keystroke
	prompt();
}

runReadlineShell().catch((error: unknown) => {
	console.error("Failed to start readline SSH emulation:", error);
	process.exit(1);
});


// ── Graceful shutdown (process-level) ────────────────────────────────────────
let _shuttingDown = false;
async function _gracefulShutdown(signal: string): Promise<void> {
	if (_shuttingDown) return;
	_shuttingDown = true;
	process.stdout.write(`\n[${signal}] Saving VFS...\n`);
	try { await virtualShell.vfs.stopAutoFlush(); } catch {}
	process.exit(0);
}
process.on("SIGTERM", () => { void _gracefulShutdown("SIGTERM"); });
process.on("beforeExit", () => { void virtualShell.vfs.stopAutoFlush(); });

process.on("uncaughtException", (error) => {
	console.error("Uncaught exception:", error);
});

process.on("unhandledRejection", (error, promise) => {
	console.error("Unhandled rejection at:", promise, "error:", error);
});