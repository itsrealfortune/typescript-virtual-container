import * as path from "node:path";
import type {ShellModule} from "../types/commands";
import {assertPathAccess, resolvePath} from "./helpers";

export const viCommand: ShellModule = {
	name: "vi",
	aliases: ["vim"],
	description: "Modal text editor (vi compatible)",
	category: "files",
	params: ["<file>"],
	run: ({authUser, shell, cwd, args}) => {
		if (args.includes("--help") || args.includes("-h")) {
			return {
				stdout: [
					"Usage: vi [file]",
					"  -h, --help    Show this help",
					"",
					"Modal text editor. Use :q to quit, :w to save.",
				].join("\n"),
				exitCode: 0,
			};
		}

		const fileArg = args.find((a) => !a.startsWith("-"));
		if (!fileArg) {
			return {stderr: "vi: missing file operand", exitCode: 1};
		}

		const targetPath = resolvePath(cwd, fileArg);
		assertPathAccess(authUser, targetPath, "vi");
		const initialContent = shell.vfs.exists(targetPath)
			? shell.vfs.readFile(targetPath)
			: "";
		const safeName = path.posix.basename(targetPath) || "buffer";
		const tempPath = `/tmp/sshmimic-vi-${Date.now()}-${safeName}.tmp`;

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
