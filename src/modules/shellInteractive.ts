import { type ChildProcessWithoutNullStreams, spawn } from "node:child_process";
import type { ShellStream } from "../types/streams";
import { shellQuote, type TerminalSize, withTerminalSize } from "./shellRuntime";

function spawnScriptProcess(command: string, terminalSize: TerminalSize, stream: ShellStream): ChildProcessWithoutNullStreams {
	const formatted = withTerminalSize(command, terminalSize);
	const proc = spawn("script", ["-qfec", formatted, "/dev/null"], {
		stdio: ["pipe", "pipe", "pipe"],
		env: {
			...process.env,
			// biome-ignore lint/style/useNamingConvention: env variable should be uppercase
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

export function spawnNanoEditorProcess(tempPath: string, terminalSize: TerminalSize, stream: ShellStream): ChildProcessWithoutNullStreams {
	return spawnScriptProcess(`nano -- ${shellQuote(tempPath)}`, terminalSize, stream);
}

export function spawnHtopProcess(pidList: string, terminalSize: TerminalSize, stream: ShellStream): ChildProcessWithoutNullStreams {
	return spawnScriptProcess(`htop -p ${shellQuote(pidList)}`, terminalSize, stream);
}
