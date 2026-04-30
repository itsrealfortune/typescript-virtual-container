import * as path from "node:path";
import type { ShellModule } from "../types/commands";
import { assertPathAccess, resolvePath } from "./helpers";

export const nanoCommand: ShellModule = {
	name: "nano",
	description: "Text editor",
	category: "shell",
	params: ["<file>"],
	run: ({ authUser, shell, cwd, args }) => {
		const fileArg = args[0];
		if (!fileArg) {
			return { stderr: "nano: missing file operand", exitCode: 1 };
		}

		const targetPath = resolvePath(cwd, fileArg);
		assertPathAccess(authUser, targetPath, "nano");
		const initialContent = shell.vfs.exists(targetPath)
			? shell.vfs.readFile(targetPath)
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
