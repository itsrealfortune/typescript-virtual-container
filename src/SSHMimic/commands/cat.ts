import type { ShellModule } from "../../types/commands";
import { getArg } from "./command-helpers";
import { assertPathAccess, resolveReadablePath } from "./helpers";

export const catCommand: ShellModule = {
	name: "cat",
	params: ["<file>"],
	run: ({ authUser, vfs, cwd, args }) => {
		const fileArg = getArg(args, 0);
		if (!fileArg) {
			return { stderr: "cat: missing file operand", exitCode: 1 };
		}

		const target = resolveReadablePath(vfs, cwd, fileArg);
		assertPathAccess(authUser, target, "cat");
		return { stdout: vfs.readFile(target), exitCode: 0 };
	},
};
