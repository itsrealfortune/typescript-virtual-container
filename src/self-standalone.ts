import * as path from "node:path";
import { basename } from "node:path";
import { stdin, stdout } from "node:process";
import { createInterface, type Interface } from "node:readline";

import { getCommandNames } from "./commands/registry";
import { makeDefaultEnv, runCommand, userHome } from "./commands/runtime";
import { NanoEditor } from "./modules/nanoEditor";
import { resolvePath } from "./modules/shellRuntime";
import { buildLoginBanner, type LoginBannerState } from "./SSHMimic/loginBanner";
import { buildPrompt } from "./SSHMimic/prompt";
import type { CommandResult, PasswordChallenge, SudoChallenge } from "./types/commands";
import { getFlag, getOptionString } from "./utils/argv";
import type VirtualFileSystem from "./VirtualFileSystem";
import { VirtualShell } from "./VirtualShell";

// ── CLI args ──────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);

if (getFlag(argv, "--version") || getFlag(argv, "-V")) {
	process.stdout.write("self-standalone 1.5.8\n");
	process.exit(0);
}

if (getFlag(argv, "--help") || getFlag(argv, "-h")) {
	process.stdout.write(`\
Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`);
	process.exit(0);
}

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

const hostname = getOptionString(argv, "--hostname", process.env.SSH_MIMIC_HOSTNAME ?? "typescript-vm");
const snapshotPath = getOptionString(argv, "--snapshot", ".vfs");
const initialUser = readUserArg();

// ── Shell ─────────────────────────────────────────────────────────────────────

console.clear();
const virtualShell = new VirtualShell(hostname, undefined, {
	mode: "fs",
	snapshotPath,
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
	const historyPath = `${userHome(authUser)}/.bash_history`;
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
	virtualShell.vfs.writeFile(`${userHome(authUser)}/.bash_history`, data);
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
				if (ch === "" || ch === "\b") { buffer = buffer.slice(0, -1); continue; }
				if (ch >= " ") buffer += ch;
			}
		};

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
		cwd = result.nextCwd ?? userHome(authUser);
		shellEnvState.vars.USER = authUser;
		shellEnvState.vars.LOGNAME = authUser;
		shellEnvState.vars.HOME = userHome(authUser);
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

	const homePath = selectedUser === "root" ? "/root" : userHome(selectedUser);
	if (!virtualShell.vfs.exists(homePath)) {
		virtualShell.vfs.mkdir(homePath, selectedUser === "root" ? 0o700 : 0o755);
	}
	const readmePath = `${homePath}/README.txt`;
	if (!virtualShell.vfs.exists(readmePath)) {
		virtualShell.vfs.writeFile(readmePath, `Welcome to ${hostname}\n`);
		await virtualShell.vfs.stopAutoFlush();
	}

	const shellEnv = makeDefaultEnv(selectedUser, hostname);
	let authUser = selectedUser;
	let cwd = userHome(authUser);
	shellEnv.vars.PWD = cwd;
	const sessionStack: Array<{ authUser: string; cwd: string }> = [];
	const remoteAddress = "localhost";

	// Terminal size — updated on SIGWINCH
	const terminalSize = { cols: stdout.columns ?? 80, rows: stdout.rows ?? 24 };
	process.on("SIGWINCH", () => {
		terminalSize.cols = stdout.columns ?? terminalSize.cols;
		terminalSize.rows = stdout.rows ?? terminalSize.rows;
	});

	let history = loadHistory(authUser);

	const rl = createInterface({
		input: stdin,
		output: stdout,
		terminal: true,
		completer: makeCompleter(() => ({ cwd })),
	});

	const rlWithHistory = rl as Interface & { history: string[] };
	rlWithHistory.history = [...history].reverse();

	// Intercept Ctrl+D at the readline level: when inside a nested session,
	// pop the session stack and re-prompt instead of closing readline.
	{
		type RlInternal = { _ttyWrite: (s: string, key: { ctrl?: boolean; name?: string } | null) => void; line: string };
		const rlI = rl as unknown as RlInternal;
		const orig = rlI._ttyWrite.bind(rl);
		rlI._ttyWrite = (s, key) => {
			if (key?.ctrl && key?.name === "d" && rlI.line === "" && sessionStack.length > 0) {
				stdout.write("^D\n");
				const prev = sessionStack.pop()!;
				authUser = prev.authUser;
				cwd = prev.cwd;
				shellEnv.vars.USER = authUser;
				shellEnv.vars.LOGNAME = authUser;
				shellEnv.vars.HOME = userHome(authUser);
				shellEnv.vars.PWD = cwd;
				stdout.write("logout\n");
				void flushVfs().then(() => { prompt(); });
				return;
			}
			orig(s, key);
		};
	}

	// ── nano editor ────────────────────────────────────────────────────────────

	function startNanoEditor(
		targetPath: string,
		initialContent: string,
		_tempPath: string,
	): Promise<void> {
		return new Promise<void>((resolve) => {
			const stream: import("./types/streams").ShellStream = {
				write: (data: string) => { stdout.write(data); },
				exit: () => undefined,
				end: () => undefined,
				on: () => undefined,
			};

			const snapSize = { cols: stdout.columns ?? 80, rows: stdout.rows ?? 24 };

			// Steal all stdin listeners from readline so it gets no bytes during nano.
			// Store them to restore later — this is safer than rl.pause()/resume()
			// which leaves readline's internal state machine in a broken position.
			const stdinListeners = stdin.listeners("data") as ((chunk: Buffer) => void)[];
			for (const l of stdinListeners) stdin.off("data", l);

			// Also steal the "keypress" listeners readline attaches for raw key events.
			const keypressListeners = stdin.listeners("keypress") as ((...args: unknown[]) => void)[];
			for (const l of keypressListeners) stdin.off("keypress", l);

			function cleanup(): void {
				process.off("SIGWINCH", onResize);
				process.off("SIGINT", onSigint);
				stdin.off("data", forwardInput);

				// Restore readline's listeners BEFORE touching rawMode.
				// readline re-enables raw mode itself when it resumes — calling
				// setRawMode(false) here leaves stdin in cooked mode and causes
				// escape sequences to print as literal text.
				for (const l of stdinListeners) stdin.on("data", l);
				for (const l of keypressListeners) stdin.on("keypress", l);

				// Reset terminal visual state only (cursor, SGR).
				stdout.write("\x1b[?25h\x1b[0m");

				// Let readline re-establish raw mode and line discipline.
				rl.resume();
			}

			// Block SIGINT from killing the process while in nano
			const onSigint = (): void => { /* absorbed — nano handles ^C via raw bytes */ };

			const editor = new NanoEditor({
				stream,
				terminalSize: snapSize,
				content: initialContent,
				filename: path.posix.basename(targetPath),
				onSave: (content) => {
					virtualShell.writeFileAsUser(authUser, targetPath, content);
					void flushVfs();
				},
				onExit: (reason, content) => {
					cleanup();
					if (reason === "saved") {
						virtualShell.writeFileAsUser(authUser, targetPath, content);
						void flushVfs();
					}
					resolve();
				},
			});

			const onResize = (): void => {
				editor.resize({ cols: stdout.columns ?? snapSize.cols, rows: stdout.rows ?? snapSize.rows });
			};

			const forwardInput = (chunk: Buffer): void => { editor.handleInput(chunk); };

			stdin.setRawMode(true);
			stdin.resume();
			stdin.on("data", forwardInput);
			process.on("SIGWINCH", onResize);
			process.on("SIGINT", onSigint);
			editor.start();
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
			sessionStack.push({ authUser, cwd });
			authUser = challenge.targetUser;
			cwd = userHome(authUser);
			shellEnv.vars.USER = authUser;
			shellEnv.vars.LOGNAME = authUser;
			shellEnv.vars.HOME = userHome(authUser);
			shellEnv.vars.PWD = cwd;
			return;
		}

		const runCwd = challenge.loginShell ? userHome(challenge.targetUser) : cwd;
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
				sessionStack.push({ authUser, cwd });
				authUser = challenge.targetUsername;
				cwd = userHome(authUser);
				shellEnv.vars.USER = authUser;
				shellEnv.vars.LOGNAME = authUser;
				shellEnv.vars.HOME = userHome(authUser);
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
			prompt();
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
			stdout.write("[2J[H");
			console.clear();
		}

		if (result.stdout) {
			stdout.write(result.stdout.endsWith("\n") ? result.stdout : `${result.stdout}\n`);
		}

		if (result.stderr) {
			process.stderr.write(result.stderr.endsWith("\n") ? result.stderr : `${result.stderr}\n`);
		}

		if (result.switchUser) {
			sessionStack.push({ authUser, cwd });
		}
		const updated = applySessionState(authUser, cwd, result, shellEnv);
		authUser = updated.authUser;
		cwd = updated.cwd;

		if (result.closeSession) {
			await flushVfs();
			if (sessionStack.length > 0) {
				const prev = sessionStack.pop()!;
				authUser = prev.authUser;
				cwd = prev.cwd;
				shellEnv.vars.USER = authUser;
				shellEnv.vars.LOGNAME = authUser;
				shellEnv.vars.HOME = userHome(authUser);
				shellEnv.vars.PWD = cwd;
				stdout.write("logout\n");
				// resume prompt handled by caller
			} else {
				rl.close();
				process.exit(result.exitCode ?? 0);
			}
		}
	}

	// ── Prompt helper ──────────────────────────────────────────────────────────

	const renderPrompt = (): string => {
		if (shellEnv.vars.PS1) return buildPrompt(authUser, hostname, "", shellEnv.vars.PS1, cwd);
		const cwdLabel = cwd === userHome(authUser) ? "~" : basename(cwd) || "/";
		return buildPrompt(authUser, hostname, cwdLabel);
	};

	const prompt = (): void => {
		rl.setPrompt(renderPrompt());
		rl.prompt();
	};

	// ── Auth (password gate) ───────────────────────────────────────────────────
	// Bypass if virtual user is root, or if host process runs as real root
	// (real root can read/write VFS files directly — password gate is theater).

	if (authUser !== "root" && process.env.USER !== "root" && virtualShell.users.hasPassword(authUser)) {
		const password = await askHiddenQuestion(rl, `Password for ${authUser}: `);
		if (!virtualShell.users.verifyPassword(authUser, password)) {
			process.stderr.write("self-standalone: authentication failed\n");
			process.exit(1);
		}
	}

	// ── Login banner ───────────────────────────────────────────────────────────

	stdout.write(buildLoginBanner(hostname, virtualShell.properties, readLastLogin(authUser)));
	writeLastLogin(authUser, remoteAddress);

	// Source login/rc files so PS1, aliases, exports are applied before first prompt.
	for (const rcPath of ["/etc/environment", `${userHome(authUser)}/.profile`, `${userHome(authUser)}/.bashrc`]) {
		if (!virtualShell.vfs.exists(rcPath)) continue;
		for (const raw of virtualShell.vfs.readFile(rcPath).split("\n")) {
			const l = raw.trim();
			if (!l || l.startsWith("#")) continue;
			try {
				const r = await runCommand(l, authUser, hostname, "shell", cwd, virtualShell, undefined, shellEnv);
				if (r.stdout) stdout.write(r.stdout);
			} catch { /* ignore */ }
		}
	}

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
		if (busy) return;
		busy = true;
		rl.pause();

		const trimmed = inputLine.trim();
		if (trimmed.length > 0) {
			// ignoredups: skip consecutive duplicates
			if (history.at(-1) !== inputLine) {
				history.push(inputLine);
				if (history.length > 500) history = history.slice(history.length - 500);
				saveHistory(history, authUser);
			}
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
		rl.resume();
		prompt();
	});

	rl.on("SIGINT", () => {
		stdout.write("^C\n");
		rl.write("", { ctrl: true, name: "u" });
		prompt();
	});

	rl.on("close", () => {
		if (sessionStack.length > 0) {
			// Ctrl+D inside a su session: pop back to outer user then exit cleanly.
			// Readline is already closed at this point so we can't re-prompt;
			// just flush and exit with 0 (same UX as real ssh when inner shell dies).
			const prev = sessionStack.pop()!;
			authUser = prev.authUser;
			void flushVfs().then(() => {
				stdout.write(`logout\n`);
				process.exit(0);
			});
		} else {
			void flushVfs().then(() => {
				console.log("");
				process.exit(0);
			});
		}
	});

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
