import * as path from "node:path";
import type { ShellProperties, VirtualShell } from ".";
import { applyUserSwitch, getCommandNames, makeDefaultEnv, runCommand, userHome } from "../commands";
import { NanoEditor } from "../modules/nanoEditor";
import { PacmanGame } from "../modules/pacmanGame";
import {
	spawnHtopProcess,
} from "../modules/shellInteractive";
import {
	getVisibleHtopPidList,
	type TerminalSize,
	toTtyLines,
} from "../modules/shellRuntime";
import { buildLoginBanner } from "../SSHMimic/loginBanner";
import { buildPrompt } from "../SSHMimic/prompt";
import type { CommandResult, ShellEnv } from "../types/commands";
import type { ShellStream } from "../types/streams";
import { listPathCompletions, loadHistory, readLastLogin, saveHistory, writeLastLogin } from "../utils/shellSession";

interface NanoSession {
	kind: "nano";
	targetPath: string;
	editor: NanoEditor;
}

interface HtopSession {
	kind: "htop";
	process: import("node:child_process").ChildProcessWithoutNullStreams;
}

interface PacmanSession {
	kind: "pacman";
	game: PacmanGame;
}


interface PendingSudo {
	username: string;
	targetUser: string;
	commandLine: string | null;
	loginShell: boolean;
	prompt: string;
	buffer: string;
	mode?: "sudo" | "passwd" | "confirm";
	onPassword?: (input: string, shell: VirtualShell) => Promise<{
		result: CommandResult | null;
		nextPrompt?: string;
	}>;
}

export function startShell(
	properties: ShellProperties,
	stream: ShellStream,
	authUser: string,
	hostname: string,
	sessionId: string | null,
	remoteAddress = "unknown",
	terminalSize: TerminalSize = { cols: 80, rows: 24 },
	shell: VirtualShell,
): void {
	let lineBuffer = "";
	let cursorPos = 0;
	let history = loadHistory(shell.vfs, authUser);
	let historyIndex: number | null = null;
	let historyDraft = "";
	let cwd = userHome(authUser);
	let pendingHeredoc: { delimiter: string; lines: string[]; cmdBefore: string } | null = null;
	const shellEnv: ShellEnv = makeDefaultEnv(authUser, hostname);
	if (sessionId) {
		const sess = shell.users.listActiveSessions().find((s) => s.id === sessionId);
		if (sess) shellEnv.vars.__TTY = sess.tty;
	}
	const sessionStack: Array<{ authUser: string; cwd: string }> = [];
	let nanoSession: NanoSession | HtopSession | PacmanSession | null = null;
	let pendingSudo: PendingSudo | null = null;
	const buildCurrentPrompt = (): string => {
		if (shellEnv.vars.PS1) return buildPrompt(authUser, hostname, "", shellEnv.vars.PS1, cwd);
		const homePath = userHome(authUser);
		const cwdLabel = cwd === homePath ? "~" : path.posix.basename(cwd) || "/";
		return buildPrompt(authUser, hostname, cwdLabel);
	};
	const commandNames = Array.from(new Set(getCommandNames())).sort();
	console.log(
		`[${sessionId}] Shell started for user '${authUser}' at ${remoteAddress}`,
	);

	// Source login/rc files before first prompt.
	let loginReady = false;
	const sourceFile = async (filePath: string, isEnvFile = false) => {
		if (!shell.vfs.exists(filePath)) return;
		try {
			const content = shell.vfs.readFile(filePath);
			for (const line of content.split("\n")) {
				const l = line.trim();
				if (!l || l.startsWith("#")) continue;
				if (isEnvFile) {
					const m = l.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);
					if (m) shellEnv.vars[m[1]!] = m[2]!;
				} else {
					const r = await runCommand(l, authUser, hostname, "shell", cwd, shell, undefined, shellEnv);
					if (r.stdout) stream.write(r.stdout.replace(/\n/g, "\r\n"));
				}
			}
		} catch { /* ignore */ }
	};
	const loginPromise = (async () => {
		await sourceFile("/etc/environment", true);
		await sourceFile(`${userHome(authUser)}/.profile`);
		await sourceFile(`${userHome(authUser)}/.bashrc`);
		loginReady = true;
	})();

	function renderLine(): void {
		const prompt = buildCurrentPrompt();
		stream.write(`\r\x1b[0m${prompt}${lineBuffer}\u001b[K`);

		const moveLeft = lineBuffer.length - cursorPos;
		if (moveLeft > 0) {
			stream.write(`\u001b[${moveLeft}D`);
		}
	}

	function clearCurrentLine(): void {
		stream.write("\r\u001b[K");
	}

	function startSudoPrompt(challenge: {
		username: string;
		targetUser: string;
		commandLine: string | null;
		loginShell: boolean;
		prompt: string;
		mode?: "sudo" | "passwd" | "confirm";
		onPassword?: (input: string, shell: VirtualShell) => Promise<{
			result: CommandResult | null;
			nextPrompt?: string;
		}>;
	}): void {
		pendingSudo = {
			...challenge,
			buffer: "",
		};
		clearCurrentLine();
		stream.write(challenge.prompt);
	}

	async function finishSudoPrompt(success: boolean): Promise<void> {
		if (!pendingSudo) {
			return;
		}

		const challenge = pendingSudo;
		pendingSudo = null;

		if (!success) {
			stream.write("\r\nSorry, try again.\r\n");
			renderLine();
			return;
		}

		if (!challenge.commandLine) {
			authUser = challenge.targetUser;
			if (challenge.loginShell) {
				cwd = userHome(authUser);
			}
			shell.users.updateSession(sessionId, authUser, remoteAddress);
			await applyUserSwitch(authUser, hostname, cwd, shellEnv, shell);
			stream.write("\r\n");
			renderLine();
			return;
		}

		const runCwd = challenge.loginShell ? userHome(challenge.targetUser) : cwd;
		const result = await Promise.resolve(
			runCommand(
				challenge.commandLine,
				challenge.targetUser,
				hostname,
				"shell",
				runCwd,
				shell,
			),
		);

		stream.write("\r\n");

		if (result.openEditor) {
			await startNanoEditor(
				result.openEditor.targetPath,
				result.openEditor.initialContent,
				result.openEditor.tempPath,
			);
			return;
		}

		if (result.openHtop) {
			await startHtop();
			return;
		}

		if (result.openPacman) {
			startPacman();
			return;
		}

		if (result.clearScreen) {
			stream.write("\u001b[2J\u001b[H");
		}

		if (result.stdout) {
			stream.write(`${toTtyLines(result.stdout)}\r\n`);
		}

		if (result.stderr) {
			stream.write(`${toTtyLines(result.stderr)}\r\n`);
		}

		if (result.switchUser) {
			sessionStack.push({ authUser, cwd });
			authUser = result.switchUser;
			cwd = result.nextCwd ?? userHome(authUser);
			shell.users.updateSession(sessionId, authUser, remoteAddress);
			await applyUserSwitch(authUser, hostname, cwd, shellEnv, shell);
		} else if (result.nextCwd) {
			cwd = result.nextCwd;
		}

		// WAL: checkpoint handled by auto-flush timer
		renderLine();
	}

	let interactivePid = -1;

	function finishInteractiveSession(savedContent?: string, targetPath?: string): void {
		if (savedContent !== undefined && targetPath) {
			shell.writeFileAsUser(authUser, targetPath, savedContent);
		}
		if (interactivePid !== -1) {
			shell.users.unregisterProcess(interactivePid);
			interactivePid = -1;
		}
		nanoSession = null;
		lineBuffer = "";
		cursorPos = 0;
		// Clear screen + reset SGR so nano residue is gone before next prompt
		stream.write("\x1b[2J\x1b[H\x1b[0m");
		renderLine();
	}

	function startNanoEditor(
		targetPath: string,
		initialContent: string,
		_tempPath: string,
	): void {
		interactivePid = shell.users.registerProcess(authUser, "nano", ["nano", targetPath], shellEnv.vars.__TTY ?? "?");
		const editor = new NanoEditor({
			stream,
			terminalSize,
			content: initialContent,
			filename: path.posix.basename(targetPath),
			onExit: (reason, content) => {
				if (reason === "saved") {
					finishInteractiveSession(content, targetPath);
				} else {
					finishInteractiveSession();
				}
			},
		});

		nanoSession = { kind: "nano", targetPath, editor };
		editor.start();
	}

	async function startHtop(): Promise<void> {
		const pidList = await getVisibleHtopPidList();
		if (!pidList) {
			stream.write("htop: no child_process processes to display\r\n");
			return;
		}

		interactivePid = shell.users.registerProcess(authUser, "htop", ["htop"], shellEnv.vars.__TTY ?? "?");
		const monitor = spawnHtopProcess(pidList, terminalSize, stream);

		monitor.on("error", (error: Error) => {
			stream.write(`htop: ${error.message}\r\n`);
			finishInteractiveSession();
		});

		monitor.on("close", () => {
			finishInteractiveSession();
		});

		nanoSession = { kind: "htop", process: monitor };
	}

	function startPacman(): void {
		interactivePid = shell.users.registerProcess(authUser, "pacman", ["pacman"], shellEnv.vars.__TTY ?? "?");
		const game = new PacmanGame({
			stream,
			terminalSize,
			onExit: () => {
				if (interactivePid !== -1) {
					shell.users.unregisterProcess(interactivePid);
					interactivePid = -1;
				}
				nanoSession = null;
				lineBuffer = "";
				cursorPos = 0;
				stream.write("\x1b[2J\x1b[H\x1b[0m");
				renderLine();
			},
		});
		nanoSession = { kind: "pacman", game };
		game.start();
	}

	function applyHistoryLine(nextLine: string): void {
		lineBuffer = nextLine;
		cursorPos = lineBuffer.length;
		renderLine();
	}

	function insertText(text: string): void {
		lineBuffer = `${lineBuffer.slice(0, cursorPos)}${text}${lineBuffer.slice(cursorPos)}`;
		cursorPos += text.length;
		renderLine();
	}

	function getTokenRange(
		line: string,
		cursor: number,
	): { start: number; end: number } {
		let start = cursor;
		while (start > 0 && !/\s/.test(line[start - 1]!)) {
			start -= 1;
		}

		let end = cursor;
		while (end < line.length && !/\s/.test(line[end]!)) {
			end += 1;
		}

		return { start, end };
	}


	function handleTabCompletion(): void {
		const { start, end } = getTokenRange(lineBuffer, cursorPos);
		const token = lineBuffer.slice(start, cursorPos);

		if (token.length === 0) {
			return;
		}

		const firstToken = lineBuffer.slice(0, start).trim().length === 0;
		const commandCandidates = firstToken
			? commandNames.filter((name) => name.startsWith(token))
			: [];
		const pathCandidates = listPathCompletions(shell.vfs, cwd, token);
		const candidates = Array.from(
			new Set([...commandCandidates, ...pathCandidates]),
		).sort();

		if (candidates.length === 0) {
			return;
		}

		if (candidates.length === 1) {
			const completed = candidates[0]!;
			const suffix = completed.endsWith("/") ? "" : " ";
			lineBuffer = `${lineBuffer.slice(0, start)}${completed}${suffix}${lineBuffer.slice(end)}`;
			cursorPos = start + completed.length + suffix.length;
			renderLine();
			return;
		}

		stream.write("\r\n");
		stream.write(`${candidates.join("  ")}\r\n`);
		renderLine();
	}

	function pushHistory(cmd: string): void {
		if (cmd.length === 0) return;
		history.push(cmd);
		if (history.length > 500) history = history.slice(history.length - 500);
		saveHistory(shell.vfs, authUser, history);
	}

	function renderLoginBanner(): void {
		const last = readLastLogin(shell.vfs, authUser);
		stream.write(buildLoginBanner(hostname, properties, last));
		writeLastLogin(shell.vfs, authUser, remoteAddress);
	}

	renderLoginBanner();
	void loginPromise.then(() => renderLine());

	stream.on("data", async (chunk: Buffer) => {
		if (!loginReady) return;
		if (nanoSession) {
			if (nanoSession.kind === "nano") {
				nanoSession.editor.handleInput(chunk);
			} else if (nanoSession.kind === "pacman") {
				nanoSession.game.handleInput(chunk);
			} else {
				nanoSession.process.stdin.write(chunk);
			}
			return;
		}

		if (pendingHeredoc) {
			const hd = pendingHeredoc;
			const input = chunk.toString("utf8");
			for (let i = 0; i < input.length; i++) {
				const ch = input[i]!;
				if (ch === "") {
					pendingHeredoc = null;
					stream.write("^C\r\n");
					renderLine();
					return;
				}
				if (ch === "" || ch === "\b") {
					lineBuffer = lineBuffer.slice(0, -1);
					renderLine();
					continue;
				}
				if (ch === "\r" || ch === "\n") {
					const typedLine = lineBuffer;
					lineBuffer = "";
					cursorPos = 0;
					stream.write("\r\n");
					if (typedLine === hd.delimiter) {
						const stdin = hd.lines.join("\n");
						const cmd = hd.cmdBefore;
						pendingHeredoc = null;
						pushHistory(`${cmd} << ${hd.delimiter}`);
						const result = await Promise.resolve(
							runCommand(cmd, authUser, hostname, "shell", cwd, shell, stdin, shellEnv),
						);
						if (result.stdout) stream.write(`${toTtyLines(result.stdout)}\r\n`);
						if (result.stderr) stream.write(`${toTtyLines(result.stderr)}\r\n`);
						if (result.nextCwd) cwd = result.nextCwd;
						renderLine();
						return;
					}
					hd.lines.push(typedLine);
					stream.write("> ");
					continue;
				}
				if (ch >= " " || ch === "\t") {
					lineBuffer += ch;
					stream.write(ch);
				}
			}
			return;
		}

		if (pendingSudo) {
			const input = chunk.toString("utf8");

			for (let i = 0; i < input.length; i += 1) {
				const ch = input[i]!;

				if (ch === "\u0003") {
					pendingSudo = null;
					stream.write("^C\r\n");
					renderLine();
					return;
				}

				if (ch === "\u007f" || ch === "\b") {
					pendingSudo.buffer = pendingSudo.buffer.slice(0, -1);
					continue;
				}

				if (ch === "\r" || ch === "\n") {
					const typed = pendingSudo.buffer;
					pendingSudo.buffer = "";

					// ── Generic onPassword handler (passwd / confirm modes) ────
					if (pendingSudo.onPassword) {
						const { result, nextPrompt } = await pendingSudo.onPassword(typed, shell);
						stream.write("\r\n");
						if (result !== null) {
							pendingSudo = null;
							if (result.stdout) stream.write(result.stdout.replace(/\n/g, "\r\n"));
							if (result.stderr) stream.write(result.stderr.replace(/\n/g, "\r\n"));
							renderLine();
						} else {
							if (nextPrompt) pendingSudo.prompt = nextPrompt;
							stream.write(pendingSudo.prompt);
						}
						return;
					}

					// ── Default sudo mode — verify current user's password ─────
					const valid = shell.users.verifyPassword(
						pendingSudo.username,
						typed,
					);
					await finishSudoPrompt(valid);
					return;
				}

				if (ch >= " ") {
					pendingSudo.buffer += ch;
				}
			}

			return;
		}

		const input = chunk.toString("utf8");

		for (let i = 0; i < input.length; i += 1) {
			const ch = input[i]!;

			if (ch === "\u0004") {
				lineBuffer = "";
				cursorPos = 0;
				historyIndex = null;
				historyDraft = "";
				stream.write("logout\r\n");
				if (sessionStack.length > 0) {
					const prev = sessionStack.pop()!;
					authUser = prev.authUser;
					cwd = prev.cwd;
					shellEnv.vars.USER = authUser;
					shellEnv.vars.LOGNAME = authUser;
					shellEnv.vars.HOME = userHome(authUser);
					shellEnv.vars.PWD = cwd;
					shell.users.updateSession(sessionId, authUser, remoteAddress);
					renderLine();
				} else {
					stream.exit(0);
					stream.end();
					return;
				}
				continue;
			}

			if (ch === "\t") {
				handleTabCompletion();
				continue;
			}

			if (ch === "\u001b") {
				const next = input[i + 1];
				const third = input[i + 2];
				const fourth = input[i + 3];

				if (next === "[" && third) {
					if (third === "A") {
						i += 2;
						if (history.length > 0) {
							if (historyIndex === null) {
								historyDraft = lineBuffer;
								historyIndex = history.length - 1;
							} else if (historyIndex > 0) {
								historyIndex -= 1;
							}
							applyHistoryLine(history[historyIndex] ?? "");
						}
						continue;
					}

					if (third === "B") {
						i += 2;
						if (historyIndex !== null) {
							if (historyIndex < history.length - 1) {
								historyIndex += 1;
								applyHistoryLine(history[historyIndex] ?? "");
							} else {
								historyIndex = null;
								applyHistoryLine(historyDraft);
							}
						}
						continue;
					}

					if (third === "C") {
						i += 2;
						if (cursorPos < lineBuffer.length) {
							cursorPos += 1;
							stream.write("\u001b[C");
						}
						continue;
					}

					if (third === "D") {
						i += 2;
						if (cursorPos > 0) {
							cursorPos -= 1;
							stream.write("\u001b[D");
						}
						continue;
					}

					if (third === "3" && fourth === "~") {
						i += 3;
						if (cursorPos < lineBuffer.length) {
							lineBuffer = `${lineBuffer.slice(0, cursorPos)}${lineBuffer.slice(cursorPos + 1)}`;
							renderLine();
						}
						continue;
					}
					// Home: \x1b[1~ or \x1b[H
					if (third === "1" && fourth === "~") { i += 3; cursorPos = 0; renderLine(); continue; }
					if (third === "H") { i += 2; cursorPos = 0; renderLine(); continue; }
					// End: \x1b[4~ or \x1b[F
					if (third === "4" && fourth === "~") { i += 3; cursorPos = lineBuffer.length; renderLine(); continue; }
					if (third === "F") { i += 2; cursorPos = lineBuffer.length; renderLine(); continue; }
				}
				// Home/End via \x1bO sequences (some terminals)
				if (next === "O" && third) {
					if (third === "H") { i += 2; cursorPos = 0; renderLine(); continue; }
					if (third === "F") { i += 2; cursorPos = lineBuffer.length; renderLine(); continue; }
				}
			}

			if (ch === "\u0003") {
				lineBuffer = "";
				cursorPos = 0;
				historyIndex = null;
				historyDraft = "";
				stream.write("^C\r\n");
				renderLine();
				continue;
			}

			if (ch === "\u0001") { cursorPos = 0; renderLine(); continue; } // Ctrl+A
			if (ch === "\u0005") { cursorPos = lineBuffer.length; renderLine(); continue; } // Ctrl+E
			if (ch === "\u000b") { lineBuffer = lineBuffer.slice(0, cursorPos); renderLine(); continue; } // Ctrl+K
			if (ch === "\u0015") { lineBuffer = lineBuffer.slice(cursorPos); cursorPos = 0; renderLine(); continue; } // Ctrl+U
			if (ch === "\u0017") { // Ctrl+W — kill word backward
				let wStart = cursorPos;
				while (wStart > 0 && lineBuffer[wStart - 1] === " ") wStart--;
				while (wStart > 0 && lineBuffer[wStart - 1] !== " ") wStart--;
				lineBuffer = lineBuffer.slice(0, wStart) + lineBuffer.slice(cursorPos);
				cursorPos = wStart;
				renderLine();
				continue;
			}

			if (ch === "\r" || ch === "\n") {
				let line = lineBuffer.trim();
				lineBuffer = "";
				cursorPos = 0;
				historyIndex = null;
				historyDraft = "";
				stream.write("\r\n");

				// !! history expansion
				if (line === "!!" || line.startsWith("!! ") || /\s!!$/.test(line) || / !! /.test(line)) {
					const lastCmd = history.length > 0 ? history[history.length - 1]! : "";
					line = line === "!!" ? lastCmd : line.replace(/!!/g, lastCmd);
				} else if (/(?:^|\s)!!/.test(line)) {
					const lastCmd = history.length > 0 ? history[history.length - 1]! : "";
					line = line.replace(/!!/g, lastCmd);
				}

				// Heredoc detection: cmd << DELIM
				const heredocMatch = line.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);
				if (heredocMatch && line.length > 0) {
					pendingHeredoc = { delimiter: heredocMatch[2]!, lines: [], cmdBefore: heredocMatch[1]!.trim() || "cat" };
					stream.write("> ");
					continue;
				}

				if (line.length > 0) {
					const result = await Promise.resolve(
						runCommand(
							line,
							authUser,
							hostname,
							"shell",
							cwd,
							shell,
							undefined,
							shellEnv,
						),
					);

					pushHistory(line);

					if (result.openEditor) {
						await startNanoEditor(
							result.openEditor.targetPath,
							result.openEditor.initialContent,
							result.openEditor.tempPath,
						);
						return;
					}

					if (result.openHtop) {
						await startHtop();
						return;
					}

					if (result.openPacman) {
						startPacman();
						return;
					}

					if (result.sudoChallenge) {
						startSudoPrompt(result.sudoChallenge);
						return;
					}

					if (result.clearScreen) {
						stream.write("\u001b[2J\u001b[H");
					}

					if (result.stdout) {
						stream.write(`${toTtyLines(result.stdout)}\r\n`);
					}

					if (result.stderr) {
						stream.write(`${toTtyLines(result.stderr)}\r\n`);
					}

					if (result.closeSession) {
						stream.write("logout\r\n");
						if (sessionStack.length > 0) {
							const prev = sessionStack.pop()!;
							authUser = prev.authUser;
							cwd = prev.cwd;
							shellEnv.vars.USER = authUser;
							shellEnv.vars.LOGNAME = authUser;
							shellEnv.vars.HOME = userHome(authUser);
							shellEnv.vars.PWD = cwd;
							shell.users.updateSession(sessionId, authUser, remoteAddress);
						} else {
							stream.exit(result.exitCode ?? 0);
							stream.end();
							return;
						}
					}

					if (result.nextCwd && !result.closeSession) {
						cwd = result.nextCwd;
					}

					if (result.switchUser) {
						sessionStack.push({ authUser, cwd });
						authUser = result.switchUser;
						cwd = result.nextCwd ?? userHome(authUser);
						shellEnv.vars.PWD = cwd;
						shell.users.updateSession(sessionId, authUser, remoteAddress);
						await applyUserSwitch(authUser, hostname, cwd, shellEnv, shell);
						lineBuffer = "";
						cursorPos = 0;
					}

					// WAL: checkpoint handled by auto-flush timer
				}

				renderLine();
				continue;
			}

			if (ch === "\u007f" || ch === "\b") {
				if (cursorPos > 0) {
					lineBuffer = `${lineBuffer.slice(0, cursorPos - 1)}${lineBuffer.slice(cursorPos)}`;
					cursorPos -= 1;
					renderLine();
				}
				continue;
			}

			insertText(ch);
		}
	});

	stream.on("close", () => {
		if (nanoSession) {
			if (nanoSession.kind === "htop") {
				nanoSession.process.kill("SIGTERM");
			} else if (nanoSession.kind === "pacman") {
				nanoSession.game.stop();
			}
			nanoSession = null;
		}
	});
}