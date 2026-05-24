import type { VirtualShell } from "../modules/VirtualShell";
import type { ShellModule } from "../types/commands";
import type { VfsFileNode } from "../types/vfs";
import { resolvePath } from "./helpers";

function evalTest(
	tokens: string[],
	shell: VirtualShell,
	cwd: string,
	vars?: Record<string, string>
): boolean {
	if (tokens.length === 0) {
		return false;
	}

	if (tokens[0] === "!") {
		return !evalTest(tokens.slice(1), shell, cwd, vars);
	}

	if (tokens.includes("-a") || tokens.includes("-o")) {
		const andIdx = tokens.indexOf("-a");
		if (andIdx !== -1) {
			return (
				evalTest(tokens.slice(0, andIdx), shell, cwd, vars) &&
				evalTest(tokens.slice(andIdx + 1), shell, cwd, vars)
			);
		}
		const orIdx = tokens.indexOf("-o");
		if (orIdx !== -1) {
			return (
				evalTest(tokens.slice(0, orIdx), shell, cwd, vars) ||
				evalTest(tokens.slice(orIdx + 1), shell, cwd, vars)
			);
		}
	}

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
			case "-b":
				return false;
			case "-c":
				return false;
			case "-p":
				return false;
			case "-S":
				return false;
			case "-g":
				return Boolean(
					shell.vfs.exists(path) && shell.vfs.stat(path).mode & 0o2000
				);
			case "-k":
				return Boolean(
					shell.vfs.exists(path) && shell.vfs.stat(path).mode & 0o1000
				);
			case "-r":
				return shell.vfs.exists(path);
			case "-w":
				return shell.vfs.exists(path);
			case "-x":
				return (
					shell.vfs.exists(path) && Boolean(shell.vfs.stat(path).mode & 0o111)
				);
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
			case "-t": {
				const fd = Number.parseInt(operand, 10);
				return fd === 0 || fd === 1 || fd === 2;
			}
			case "-o": {
				if (!vars) {
					return false;
				}
				const optVar = `__${operand}`;
				return vars[optVar] === "1";
			}
			case "-v":
				return vars ? operand in vars : false;
			case "-R": {
				if (!vars) {
					return false;
				}
				const refVal = vars[operand];
				return refVal !== undefined;
			}
			default:
				break;
		}
	}

	if (tokens.length === 3) {
		const [left = "", op, right = ""] = tokens;
		const leftN = Number(left);
		const rightN = Number(right);

		switch (op) {
			case "=":
			case "==":
				return left === right;
			case "!=":
				return left !== right;
			case "<":
				return left < right;
			case ">":
				return left > right;
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
			case "-nt": {
				const lPath = resolvePath(cwd, left);
				const rPath = resolvePath(cwd, right);
				if (!(shell.vfs.exists(lPath) && shell.vfs.exists(rPath))) {
					return false;
				}
				const lStat = shell.vfs.stat(lPath);
				const rStat = shell.vfs.stat(rPath);
				return lStat.updatedAt > rStat.updatedAt;
			}
			case "-ot": {
				const lPath = resolvePath(cwd, left);
				const rPath = resolvePath(cwd, right);
				if (!(shell.vfs.exists(lPath) && shell.vfs.exists(rPath))) {
					return false;
				}
				const lStat = shell.vfs.stat(lPath);
				const rStat = shell.vfs.stat(rPath);
				return lStat.updatedAt < rStat.updatedAt;
			}
			case "-ef": {
				const lPath = resolvePath(cwd, left);
				const rPath = resolvePath(cwd, right);
				if (!(shell.vfs.exists(lPath) && shell.vfs.exists(rPath))) {
					return false;
				}
				const lStat = shell.vfs.stat(lPath);
				const rStat = shell.vfs.stat(rPath);
				return lStat.path === rStat.path;
			}
			case "=~": {
				try {
					const re = new RegExp(right);
					return re.test(left);
				} catch {
					return false;
				}
			}
			default:
				break;
		}
	}

	if (tokens.length === 1) {
		return (tokens[0] ?? "").length > 0;
	}

	return false;
}

/** POSIX `test` / `[` builtin — evaluate conditional expressions. */
export const testCommand: ShellModule = {
	name: "test",
	aliases: ["["],
	description: "Evaluate conditional expression",
	category: "shell",
	params: ["<expression>"],
	run: ({ args, shell, cwd }) => {
		try {
			const tokens = [...args];
			if (tokens[tokens.length - 1] === "]") {
				tokens.length--;
			}
			if (tokens[0] === "[") {
				tokens.shift();
			}
			const result = evalTest(tokens, shell, cwd);
			return { exitCode: result ? 0 : 1 };
		} catch {
			return { stderr: "test: malformed expression", exitCode: 2 };
		}
	},
};

/** Extended test `[[ ]]` builtin with pattern matching and regex support. */
export const bracketCommand: ShellModule = {
	name: "[[",
	aliases: ["[["],
	description: "Evaluate conditional expression (extended)",
	category: "shell",
	params: ["<expression>"],
	run: ({ args, shell, cwd, env }) => {
		try {
			const tokens = [...args];
			while (tokens[tokens.length - 1] === "]]") {
				tokens.length--;
			}
			while (tokens[0] === "[[") {
				tokens.shift();
			}
			// Inside [[ ]], && and || are logical operators, not command separators
			// Simple handling: replace -a/-o with &&
			const processed = tokens.map((t) =>
				t === "&&" ? "-a" : t === "||" ? "-o" : t
			);
			const result = evalTest(processed, shell, cwd, env.vars);
			return { exitCode: result ? 0 : 1 };
		} catch {
			return { stderr: "[[ : malformed expression", exitCode: 2 };
		}
	},
};
