import * as path from "node:path";
import type { ShellModule } from "../types/commands";
import { checkFilePermission, resolvePath } from "./helpers";

/**
 * Create empty files or update file timestamps.
 * @category files
 * @params ["<file>"]
 */
export const touchCommand: ShellModule = {
	name: "touch",
	description: "Create or update files",
	category: "files",
	params: ["<file>"],
	run: ({ authUser, shell, cwd, args, uid, gid }) => {
		if (args.length === 0) {
			return { stderr: "touch: missing file operand", exitCode: 1 };
		}

		for (const file of args) {
			const target = resolvePath(cwd, file);
			if (!shell.vfs.exists(target)) {
				checkFilePermission(shell.vfs, shell.users, authUser, path.posix.dirname(target), 2);
				shell.vfs.writeFile(target, "", uid, gid);
			} else {
				checkFilePermission(shell.vfs, shell.users, authUser, target, 2);
			}
		}
		return { exitCode: 0 };
	},
};
