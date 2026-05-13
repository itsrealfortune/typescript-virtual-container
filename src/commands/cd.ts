import type { ShellModule } from "../types/commands";
import { assertPathAccess, resolvePath } from "./helpers";

/**
 * Change current working directory.
 * @category navigation
 * @params ["[path]"]
 */
export const cdCommand: ShellModule = {
	name: "cd",
	description: "Change directory",
	category: "navigation",
	params: ["[path]"],
	run: ({ authUser, shell, cwd, args }) => {
		const homeDir = authUser === "root" ? "/root" : `/home/${authUser}`;
		const target = resolvePath(cwd, args[0] ?? "~", homeDir);
		assertPathAccess(authUser, target, "cd");
		const stats = shell.vfs.stat(target);
		if (stats.type !== "directory") {
			return { stderr: `cd: not a directory: ${target}`, exitCode: 1 };
		}

		return { nextCwd: target, exitCode: 0 };
	},
};
