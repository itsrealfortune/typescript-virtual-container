import type { ShellModule } from "../../types/commands";
import { assertPathAccess, resolvePath } from "./helpers";

export const touchCommand: ShellModule = {
	name: "touch",
	params: ["<file>"],
	run: ({ authUser, vfs, cwd, args }) => {
		if (args.length === 0) {
			return { stderr: "touch: missing file operand", exitCode: 1 };
		}

		for (const file of args) {
			const target = resolvePath(cwd, file);
			assertPathAccess(authUser, target, "touch");
			if (!vfs.exists(target)) {
				vfs.writeFile(target, "");
			}
		}
		return { exitCode: 0 };
	},
};
