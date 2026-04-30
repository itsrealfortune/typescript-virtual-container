import type { ShellModule } from "../types/commands";
import { assertPathAccess, resolvePath } from "./helpers";

export const chmodCommand: ShellModule = {
	name: "chmod",
	params: ["<mode> <file>"],
	run: ({ authUser, shell, cwd, args }) => {
		const [modeArg, fileArg] = args;
		if (!modeArg || !fileArg) {
			return { stderr: "chmod: missing operand", exitCode: 1 };
		}

		const filePath = resolvePath(cwd, fileArg);
		try {
			assertPathAccess(authUser, filePath, "chmod");
			if (!shell.vfs.exists(filePath)) {
				return { stderr: `chmod: ${fileArg}: No such file or directory`, exitCode: 1 };
			}
			const mode = parseInt(modeArg, 8);
			if (Number.isNaN(mode)) {
				return { stderr: `chmod: invalid mode: ${modeArg}`, exitCode: 1 };
			}
			shell.vfs.chmod(filePath, mode);
			return { exitCode: 0 };
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return { stderr: `chmod: ${msg}`, exitCode: 1 };
		}
	},
};
