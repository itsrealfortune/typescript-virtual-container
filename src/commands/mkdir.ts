import type { ShellModule } from "../types/commands";
import { getArg } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

/**
 * Create one or more directories.
 * @category files
 * @params ["<dir>"]
 */
export const mkdirCommand: ShellModule = {
	name: "mkdir",
	description: "Make directories",
	category: "files",
	params: ["<dir>"],
	run: ({ authUser, shell, cwd, args }) => {
		if (args.length === 0) {
			return { stderr: "mkdir: missing operand", exitCode: 1 };
		}

		for (let index = 0; index < args.length; index++) {
			const dir = getArg(args, index);
			if (!dir) {
				return { stderr: "mkdir: missing operand", exitCode: 1 };
			}
			const target = resolvePath(cwd, dir);
			assertPathAccess(authUser, target, "mkdir");
			shell.vfs.mkdir(target);
		}
		return { exitCode: 0 };
	},
};
