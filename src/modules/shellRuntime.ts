import { readFile } from "node:fs/promises";
import * as path from "node:path";

/** Terminal dimensions (columns × rows). */
export interface TerminalSize {
	cols: number;
	rows: number;
}

/** Shell-escapes a string for safe use in a command line. */
export function shellQuote(value: string): string {
	return `'${value.replace(/'/g, `'\\''`)}'`;
}

/** Converts line endings to CRLF for TTY output. */
export function toTtyLines(text: string): string {
	return text
		.replace(/\r\n/g, "\n")
		.replace(/\r/g, "\n")
		.replace(/\n/g, "\r\n");
}

/** Wraps a command to run with a specific terminal size via stty. */
export function withTerminalSize(
	command: string,
	terminalSize: TerminalSize,
): string {
	const cols =
		Number.isFinite(terminalSize.cols) && terminalSize.cols > 0
			? Math.floor(terminalSize.cols)
			: 80;
	const rows =
		Number.isFinite(terminalSize.rows) && terminalSize.rows > 0
			? Math.floor(terminalSize.rows)
			: 24;
	return `stty cols ${cols} rows ${rows} 2>/dev/null; ${command}`;
}

/** Resolves a path relative to a base working directory. */
export function resolvePath(base: string, inputPath: string): string {
	if (!inputPath || inputPath.trim() === "" || inputPath === ".") {
		return base;
	}
	return inputPath.startsWith("/")
		? path.posix.normalize(inputPath)
		: path.posix.normalize(path.posix.join(base, inputPath));
}

/** Recursively collects all child PIDs of a given parent process. */
export async function collectChildPids(parentPid: number): Promise<number[]> {
	try {
		const childrenRaw = await readFile(
			`/proc/${parentPid}/task/${parentPid}/children`,
			"utf8",
		);
		const directChildren = childrenRaw
			.trim()
			.split(/\s+/)
			.filter(Boolean)
			.map((value) => Number.parseInt(value, 10))
			.filter((pid) => Number.isInteger(pid) && pid > 0);

		const nested = await Promise.all(
			directChildren.map((pid) => collectChildPids(pid)),
		);
		return [...directChildren, ...nested.flat()];
	} catch {
		return [];
	}
}

/** Returns a comma-separated PID list visible in htop, or null if none. */
export async function getVisibleHtopPidList(
	rootPid = process.pid,
): Promise<string | null> {
	const descendants = await collectChildPids(rootPid);
	const unique = Array.from(new Set(descendants)).sort((a, b) => a - b);
	if (unique.length === 0) {
		return null;
	}

	return unique.join(",");
}
