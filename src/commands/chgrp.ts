import type { ShellModule } from "../types/commands";
import { assertPathAccess, resolvePath } from "./helpers";

/**
 * Change group ownership.
 * @category files
 * @params ["<group> <file>"]
 */
export const chgrpCommand: ShellModule = {
	name: "chgrp",
	description: "Change group ownership",
	category: "files",
	params: ["<group> <file>"],
	run: ({ authUser, shell, cwd, args }) => {
		const [groupArg, fileArg] = args;
		if (!groupArg || !fileArg) {
			return { stderr: "chgrp: missing operand", exitCode: 1 };
		}

		if (authUser !== "root") {
			return { stderr: "chgrp: changing group: Operation not permitted", exitCode: 1 };
		}

		const filePath = resolvePath(cwd, fileArg);
		try {
			assertPathAccess(authUser, filePath, "chgrp");
			if (!shell.vfs.exists(filePath)) {
				return {
					stderr: `chgrp: ${fileArg}: No such file or directory`,
					exitCode: 1,
				};
			}

			const gid = parseInt(groupArg, 10);
			if (Number.isNaN(gid)) {
				return { stderr: `chgrp: invalid group: ${groupArg}`, exitCode: 1 };
			}

			const current = shell.vfs.getOwner(filePath);
			shell.vfs.chown(filePath, current.uid, gid);
			return { exitCode: 0 };
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return { stderr: `chgrp: ${msg}`, exitCode: 1 };
		}
	},
};
