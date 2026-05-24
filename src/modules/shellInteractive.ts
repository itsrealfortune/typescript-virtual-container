/**
 * shellInteractive.ts — spawn and manage interactive subprocesses
 * (nano, htop, pacman) within a VirtualShell session.
 *
 * Each subprocess is connected to the ShellStream for bidirectional I/O,
 * with terminal size propagation and graceful cleanup on exit.
 *
 * Public API:
 *  - spawnNanoEditorProcess() — start a nano subprocess
 *  - spawnHtopProcess()       — start an htop subprocess
 */
import { type ChildProcessWithoutNullStreams, spawn } from "node:child_process";
import type { ShellStream } from "../types/streams";
import {
	shellQuote,
	type TerminalSize,
	withTerminalSize,
} from "./shellRuntime";

function spawnScriptProcess(
	command: string,
	terminalSize: TerminalSize,
	stream: ShellStream
): ChildProcessWithoutNullStreams {
	const formatted = withTerminalSize(command, terminalSize);
	const proc = spawn("script", ["-qfec", formatted, "/dev/null"], {
		stdio: ["pipe", "pipe", "pipe"],
		env: {
			...process.env,
			TERM: process.env.TERM ?? "xterm-256color",
		},
	});

	proc.stdout.on("data", (data: Buffer) => {
		stream.write(data.toString("utf8"));
	});

	proc.stderr.on("data", (data: Buffer) => {
		stream.write(data.toString("utf8"));
	});

	return proc;
}

/** Spawns the nano editor as an interactive subprocess. */
export function spawnNanoEditorProcess(
	tempPath: string,
	terminalSize: TerminalSize,
	stream: ShellStream
): ChildProcessWithoutNullStreams {
	return spawnScriptProcess(
		`nano -- ${shellQuote(tempPath)}`,
		terminalSize,
		stream
	);
}

/** Spawns htop as an interactive subprocess, filtered to the given PIDs. */
export function spawnHtopProcess(
	pidList: string,
	terminalSize: TerminalSize,
	stream: ShellStream
): ChildProcessWithoutNullStreams {
	return spawnScriptProcess(
		`htop -p ${shellQuote(pidList)}`,
		terminalSize,
		stream
	);
}
