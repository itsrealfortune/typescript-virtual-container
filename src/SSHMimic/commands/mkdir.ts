import type { ShellModule } from "../../types/commands";
import { assertPathAccess, resolvePath } from "./helpers";

export const mkdirCommand: ShellModule = {
	name: "mkdir",
	params: ["<dir>"],
	run: ({ authUser, vfs, cwd, args }) => {
		if (args.length === 0) {
			return { stderr: "mkdir: missing operand", exitCode: 1 };
		}

		for (const dir of args) {
			const target = resolvePath(cwd, dir);
			assertPathAccess(authUser, target, "mkdir");
			vfs.mkdir(target);
		}
		return { exitCode: 0 };
	},
};
