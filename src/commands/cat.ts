import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { assertPathAccess, resolveReadablePath } from "./helpers";

/**
 * Concatenate and print files to stdout.
 * @category files
 * @params ["[-n] [-b] <file...>"]
 */
export const catCommand: ShellModule = {
	name: "cat",
	description: "Concatenate and print files",
	category: "files",
	params: ["[-n] [-b] <file...>"],
	run: ({ authUser, shell, cwd, args, stdin }) => {
		const numberAll    = ifFlag(args, ["-n", "--number"]);
		const numberNonBlank = ifFlag(args, ["-b", "--number-nonblank"]);
		const fileArgs = args.filter((a) => !a.startsWith("-"));

		if (fileArgs.length === 0 && stdin !== undefined) {
			return { stdout: stdin, exitCode: 0 };
		}

		if (fileArgs.length === 0) {
			return { stderr: "cat: missing file operand", exitCode: 1 };
		}

		const parts: string[] = [];
		for (const fileArg of fileArgs) {
			const target = resolveReadablePath(shell.vfs, cwd, fileArg);
			assertPathAccess(authUser, target, "cat");
			parts.push(shell.vfs.readFile(target));
		}

		const combined = parts.join("");

		if (!numberAll && !numberNonBlank) {
			return { stdout: combined, exitCode: 0 };
		}

		let lineNum = 1;
		const numbered = combined.split("\n").map((line) => {
			if (numberNonBlank && line.trim() === "") return line;
			return `${String(lineNum++).padStart(6)}\t${line}`;
		}).join("\n");

		return { stdout: numbered, exitCode: 0 };
	},
};
