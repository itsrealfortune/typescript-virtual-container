import * as path from "node:path";
import type { ShellModule } from "../../types/commands";
import { assertPathAccess, resolvePath } from "./helpers";

export const nanoCommand: ShellModule = {
	name: "nano",
	params: ["<file>"],
	run: ({ authUser, vfs, cwd, args }) => {
		const fileArg = args[0];
		if (!fileArg) {
			return { stderr: "nano: missing file operand", exitCode: 1 };
		}

		const targetPath = resolvePath(cwd, fileArg);
		assertPathAccess(authUser, targetPath, "nano");
		const initialContent = vfs.exists(targetPath)
			? vfs.readFile(targetPath)
			: "";
		const safeName = path.posix.basename(targetPath) || "buffer";
		const tempPath = `/tmp/sshmimic-nano-${Date.now()}-${safeName}.tmp`;

		return {
			openEditor: {
				targetPath,
				tempPath,
				initialContent,
			},
			exitCode: 0,
		};
	},
};
