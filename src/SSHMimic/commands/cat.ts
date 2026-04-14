import type { ShellModule } from "../../types/commands";
import { resolveReadablePath } from "./helpers";

export const catCommand: ShellModule = {
	name: "cat",
	params: ["<file>"],
	run: ({ vfs, cwd, args }) => {
		const fileArg = args[0];
		if (!fileArg) {
			return { stderr: "cat: missing file operand", exitCode: 1 };
		}

		const target = resolveReadablePath(vfs, cwd, fileArg);
		return { stdout: vfs.readFile(target), exitCode: 0 };
	},
};
