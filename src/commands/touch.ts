import type { ShellModule } from "../types/commands";
import { assertPathAccess, resolvePath } from "./helpers";

export const touchCommand: ShellModule = {
	name: "touch",
	description: "Create or update files",
	category: "files",
	params: ["<file>"],
	run: ({ authUser, shell, cwd, args }) => {
		if (args.length === 0) {
			return { stderr: "touch: missing file operand", exitCode: 1 };
		}

		for (const file of args) {
			const target = resolvePath(cwd, file);
			assertPathAccess(authUser, target, "touch");
			if (!shell.vfs.exists(target)) {
				shell.writeFileAsUser(authUser, target, "");
			}
		}
		return { exitCode: 0 };
	},
};
