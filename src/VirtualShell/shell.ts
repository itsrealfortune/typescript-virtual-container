import type { ChildProcessWithoutNullStreams } from "node:child_process";
import { readFile, unlink, writeFile } from "node:fs/promises";
import * as path from "node:path";
import type { ShellProperties, VirtualShell } from ".";
import {
	spawnHtopProcess,
	spawnNanoEditorProcess,
} from "../../modules/shellInteractive";
import {
	getVisibleHtopPidList,
	resolvePath,
	type TerminalSize,
	toTtyLines,
} from "../../modules/shellRuntime";
import { getCommandNames, runCommand } from "../commands";
import { formatLoginDate } from "../SSHMimic/loginFormat";
import { buildPrompt } from "../SSHMimic/prompt";
import type { ShellStream } from "../types/streams";
import type VirtualFileSystem from "../VirtualFileSystem";

interface NanoSession {
	kind: "nano" | "htop";
	targetPath: string;
	tempPath: string;
	process: ChildProcessWithoutNullStreams;
}

interface PendingSudo {
	username: string;
	targetUser: string;
	commandLine: string | null;
	loginShell: boolean;
	prompt: string;
	buffer: string;
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
	let history = loadHistory(shell.vfs);
	let historyIndex: number | null = null;
	let historyDraft = "";
	let cwd = `/home/${authUser}`;
	let nanoSession: NanoSession | null = null;
	let pendingSudo: PendingSudo | null = null;
	const buildCurrentPrompt = (): string => {
		const homePath = `/home/${authUser}`;
		const cwdLabel = cwd === homePath ? "~" : path.posix.basename(cwd) || "/";
		return buildPrompt(authUser, hostname, cwdLabel);
	};
	const commandNames = Array.from(new Set(getCommandNames())).sort();
	console.log(
		`[${sessionId}] Shell started for user '${authUser}' at ${remoteAddress}`,
	);

	function renderLine(): void {
		const prompt = buildCurrentPrompt();
		stream.write(`\r${prompt}${lineBuffer}\u001b[K`);

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
			cwd = `/home/${authUser}`;
			shell.users.updateSession(sessionId, authUser, remoteAddress);
			stream.write("\r\n");
			renderLine();
			return;
		}

		const runCwd = challenge.loginShell ? `/home/${challenge.targetUser}` : cwd;
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
			authUser = result.switchUser;
			cwd = result.nextCwd ?? `/home/${authUser}`;
			shell.users.updateSession(sessionId, authUser, remoteAddress);
		} else if (result.nextCwd) {
			cwd = result.nextCwd;
		}

		await shell.vfs.flushMirror();
		renderLine();
	}

	async function finishNanoEditor(): Promise<void> {
		if (!nanoSession) {
			return;
		}

		const activeSession = nanoSession;

		if (activeSession.kind === "nano") {
			try {
				const updatedContent = await readFile(activeSession.tempPath, "utf8");
				shell.writeFileAsUser(
					authUser,
					activeSession.targetPath,
					updatedContent,
				);
				await shell.vfs.flushMirror();
			} catch {
				// If temp file does not exist, nano exited without writing.
			}

			await unlink(activeSession.tempPath).catch(() => undefined);
		}

		nanoSession = null;
		lineBuffer = "";
		cursorPos = 0;
		stream.write("\r\n");
		renderLine();
	}

	async function startNanoEditor(
		targetPath: string,
		initialContent: string,
		tempPath: string,
	): Promise<void> {
		if (shell.vfs.exists(targetPath)) {
			await writeFile(tempPath, initialContent, "utf8");
		}

		const editor = spawnNanoEditorProcess(tempPath, terminalSize, stream);

		editor.on("error", (error: Error) => {
			stream.write(`nano: ${error.message}\r\n`);
			void finishNanoEditor();
		});

		editor.on("close", () => {
			void finishNanoEditor();
		});

		nanoSession = {
			kind: "nano",
			targetPath,
			tempPath,
			process: editor,
		};
	}

	async function startHtop(): Promise<void> {
		const pidList = await getVisibleHtopPidList();
		if (!pidList) {
			stream.write("htop: no child_process processes to display\r\n");
			return;
		}

		const monitor = spawnHtopProcess(pidList, terminalSize, stream);

		monitor.on("error", (error: Error) => {
			stream.write(`htop: ${error.message}\r\n`);
			void finishNanoEditor();
		});

		monitor.on("close", () => {
			void finishNanoEditor();
		});

		nanoSession = {
			kind: "htop",
			targetPath: "",
			tempPath: "",
			process: monitor,
		};
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

	function listPathCompletions(prefix: string): string[] {
		const slashIndex = prefix.lastIndexOf("/");
		const dirPart = slashIndex >= 0 ? prefix.slice(0, slashIndex + 1) : "";
		const namePart = slashIndex >= 0 ? prefix.slice(slashIndex + 1) : prefix;
		const basePath = resolvePath(cwd, dirPart || ".");

		try {
			return shell.vfs
				.list(basePath)
				.filter((entry) => !entry.startsWith("."))
				.filter((entry) => entry.startsWith(namePart))
				.map((entry) => {
					const fullPath = path.posix.join(basePath, entry);
					const st = shell.vfs.stat(fullPath);
					const suffix = st.type === "directory" ? "/" : "";
					return `${dirPart}${entry}${suffix}`;
				})
				.sort();
		} catch {
			return [];
		}
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
		const pathCandidates = listPathCompletions(token);
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
		if (cmd.length === 0) {
			return;
		}

		history.push(cmd);
		if (history.length > 500) {
			history = history.slice(history.length - 500);
		}

		const data = history.length > 0 ? `${history.join("\n")}\n` : "";
		shell.vfs.writeFile("/virtual-env-js/.bash_history", data);
	}

	function readLastLogin(): { at: string; from: string } | null {
		const lastlogPath = `/virtual-env-js/.lastlog/${authUser}.json`;
		if (!shell.vfs.exists(lastlogPath)) {
			return null;
		}

		try {
			return JSON.parse(shell.vfs.readFile(lastlogPath)) as {
				at: string;
				from: string;
			};
		} catch {
			return null;
		}
	}

	function writeLastLogin(nowIso: string): void {
		const dir = "/virtual-env-js/.lastlog";
		if (!shell.vfs.exists(dir)) {
			shell.vfs.mkdir(dir, 0o700);
		}

		const lastlogPath = `${dir}/${authUser}.json`;
		shell.vfs.writeFile(
			lastlogPath,
			JSON.stringify({ at: nowIso, from: remoteAddress }),
		);
	}

	function renderLoginBanner(): void {
		const last = readLastLogin();
		const nowIso = new Date().toISOString();

		stream.write(
			`Linux ${hostname} ${properties.kernel} ${properties.arch}\r\n`,
		);
		stream.write("\r\n");
		stream.write(
			"The programs included with the Fortune GNU/Linux system are free software;\r\n",
		);
		stream.write(
			"the exact distribution terms for each program are described in the\r\n",
		);
		stream.write("individual files in /usr/share/doc/*/copyright.\r\n");
		stream.write("\r\n");
		stream.write(
			"Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent\r\n",
		);
		stream.write("permitted by applicable law.\r\n");

		if (last) {
			const when = new Date(last.at);
			const displayed = Number.isNaN(when.getTime())
				? last.at
				: formatLoginDate(when);
			stream.write(
				`Last login: ${displayed} from ${last.from || "unknown"}\r\n`,
			);
		}

		stream.write("\r\n");
		writeLastLogin(nowIso);
	}

	renderLoginBanner();
	renderLine();

	stream.on("data", async (chunk: Buffer) => {
		if (nanoSession) {
			nanoSession.process.stdin.write(chunk);
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
					const password = pendingSudo.buffer;
					pendingSudo.buffer = "";
					const valid = shell.users.verifyPassword(
						pendingSudo.username,
						password,
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
				stream.write("logout\r\n");
				stream.exit(0);
				stream.end();
				return;
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

			if (ch === "\r" || ch === "\n") {
				const line = lineBuffer.trim();
				lineBuffer = "";
				cursorPos = 0;
				historyIndex = null;
				historyDraft = "";
				stream.write("\r\n");

				if (line.length > 0) {
					const result = await Promise.resolve(
						runCommand(line, authUser, hostname, "shell", cwd, shell),
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
						stream.exit(result.exitCode ?? 0);
						stream.end();
						return;
					}

					if (result.nextCwd) {
						cwd = result.nextCwd;
					}

					if (result.switchUser) {
						authUser = result.switchUser;
						cwd = result.nextCwd ?? `/home/${authUser}`;
						shell.users.updateSession(sessionId, authUser, remoteAddress);
						lineBuffer = "";
						cursorPos = 0;
					}

					await shell.vfs.flushMirror();
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
			nanoSession.process.kill("SIGTERM");
			nanoSession = null;
		}
	});
}

function loadHistory(vfs: VirtualFileSystem): string[] {
	const historyPath = "/virtual-env-js/.bash_history";
	if (!vfs.exists(historyPath)) {
		vfs.writeFile(historyPath, "");
		return [];
	}

	const raw = vfs.readFile(historyPath);
	return raw
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.length > 0);
}
