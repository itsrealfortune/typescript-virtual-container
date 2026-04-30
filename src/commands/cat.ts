import type { ShellModule } from "../types/commands";
import { getArg } from "./command-helpers";
import { assertPathAccess, resolveReadablePath } from "./helpers";

export const catCommand: ShellModule = {
	name: "cat",
	description: "Concatenate and print files",
	category: "files",
	params: ["<file>"],
	run: ({ authUser, shell, cwd, args }) => {
		const fileArg = getArg(args, 0);
		if (!fileArg) {
			return { stderr: "cat: missing file operand", exitCode: 1 };
		}

		const target = resolveReadablePath(shell.vfs, cwd, fileArg);
		assertPathAccess(authUser, target, "cat");
		return { stdout: shell.vfs.readFile(target), exitCode: 0 };
	},
};
