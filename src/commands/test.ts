import type { ShellModule } from "../types/commands";
import type { VfsFileNode } from "../types/vfs";
import type { VirtualShell } from "../VirtualShell";
import { resolvePath } from "./helpers";

/**
 * Evaluate a POSIX test expression.
 * Supports: -f, -d, -e, -r, -w, -x, -s, -z, -n,
 *           string =, !=, numeric -eq -ne -lt -le -gt -ge,
 *           ! (negate), -a (and), -o (or).
 */
function evalTest(
	tokens: string[],
	shell: VirtualShell,
	cwd: string,
): boolean {
	// When called via [ command, ] is the last arg — strip it
	// When called via test command, no brackets present
	if (tokens[tokens.length - 1] === "]") {
		tokens = tokens.slice(0, -1);
	}
	// Also strip leading [ if present (shouldn't normally happen but be safe)
	if (tokens[0] === "[") {
		tokens = tokens.slice(1);
	}

	if (tokens.length === 0) return false;

	// Negation
	if (tokens[0] === "!") return !evalTest(tokens.slice(1), shell, cwd);

	// Boolean -a / -o (simple left-right, no precedence)
	const andIdx = tokens.indexOf("-a");
	if (andIdx !== -1) {
		return (
			evalTest(tokens.slice(0, andIdx), shell, cwd) &&
			evalTest(tokens.slice(andIdx + 1), shell, cwd)
		);
	}
	const orIdx = tokens.indexOf("-o");
	if (orIdx !== -1) {
		return (
			evalTest(tokens.slice(0, orIdx), shell, cwd) ||
			evalTest(tokens.slice(orIdx + 1), shell, cwd)
		);
	}

	// Unary file tests
	if (tokens.length === 2) {
		const [flag, operand = ""] = tokens;
		const path = resolvePath(cwd, operand);

		switch (flag) {
			case "-e":
				return shell.vfs.exists(path);
			case "-f":
				return shell.vfs.exists(path) && shell.vfs.stat(path).type === "file";
			case "-d":
				return (
					shell.vfs.exists(path) && shell.vfs.stat(path).type === "directory"
				);
			case "-r":
				return shell.vfs.exists(path); // all readable in virtual env
			case "-w":
				return shell.vfs.exists(path);
			case "-x":
				return shell.vfs.exists(path) && !!(shell.vfs.stat(path).mode & 0o111);
			case "-s":
				return (
					shell.vfs.exists(path) &&
					shell.vfs.stat(path).type === "file" &&
					(shell.vfs.stat(path) as VfsFileNode).size > 0
				);
			case "-z":
				return operand.length === 0;
			case "-n":
				return operand.length > 0;
			case "-L":
				return shell.vfs.isSymlink(path);
		}
	}

	// Binary comparisons
	if (tokens.length === 3) {
		const [left = "", op, right = ""] = tokens;
		const leftN = Number(left);
		const rightN = Number(right);

		switch (op) {
			// String
			case "=":
			case "==":
				return left === right;
			case "!=":
				return left !== right;
			case "<":
				return left < right;
			case ">":
				return left > right;
			// Numeric
			case "-eq":
				return leftN === rightN;
			case "-ne":
				return leftN !== rightN;
			case "-lt":
				return leftN < rightN;
			case "-le":
				return leftN <= rightN;
			case "-gt":
				return leftN > rightN;
			case "-ge":
				return leftN >= rightN;
		}
	}

	// Single string (truthy if non-empty)
	if (tokens.length === 1) return (tokens[0] ?? "").length > 0;

	return false;
}

export const testCommand: ShellModule = {
	name: "test",
	aliases: ["["],
	description: "Evaluate conditional expression",
	category: "shell",
	params: ["<expression>"],
	run: ({ args, shell, cwd }) => {
		try {
			const result = evalTest([...args], shell, cwd);
			return { exitCode: result ? 0 : 1 };
		} catch {
			return { stderr: "test: malformed expression", exitCode: 2 };
		}
	},
};
