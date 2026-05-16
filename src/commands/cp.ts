import * as path from "node:path";
import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { checkFilePermission, resolvePath } from "./helpers";

/**
 * Copy files or directories inside the virtual filesystem.
 * @category files
 * @params ["[-r] <source> <dest>"]
 */
export const cpCommand: ShellModule = {
	name: "cp",
	description: "Copy files or directories",
	category: "files",
	params: ["[-r] <source> <dest>"],
	run: ({ authUser, shell, cwd, args }) => {
		const recursive = ifFlag(args, ["-r", "-R", "--recursive"]);
		const positionals = args.filter((a) => !a.startsWith("-"));
		const [srcArg, destArg] = positionals;

		if (!srcArg || !destArg) {
			return { stderr: "cp: missing operand", exitCode: 1 };
		}

		const srcPath = resolvePath(cwd, srcArg);
		const destPath = resolvePath(cwd, destArg);

		try {
			checkFilePermission(shell.vfs, shell.users, authUser, srcPath, 4);
			checkFilePermission(shell.vfs, shell.users, authUser, path.posix.dirname(destPath), 2);

			if (!shell.vfs.exists(srcPath)) {
				return {
					stderr: `cp: ${srcArg}: No such file or directory`,
					exitCode: 1,
				};
			}

			const srcStat = shell.vfs.stat(srcPath);

			if (srcStat.type === "directory") {
				if (!recursive) {
					return {
						stderr: `cp: ${srcArg}: is a directory (use -r)`,
						exitCode: 1,
					};
				}
				const copyDir = (from: string, to: string) => {
					shell.vfs.mkdir(to, 0o755);
					for (const entry of shell.vfs.list(from)) {
						const fromEntry = `${from}/${entry}`;
						const toEntry = `${to}/${entry}`;
						const stat = shell.vfs.stat(fromEntry);
						if (stat.type === "directory") {
							copyDir(fromEntry, toEntry);
						} else {
							const content = shell.vfs.readFileRaw(fromEntry);
							shell.writeFileAsUser(authUser, toEntry, content);
						}
					}
				};
				const finalDest =
					shell.vfs.exists(destPath) &&
					shell.vfs.stat(destPath).type === "directory"
						? `${destPath}/${srcArg.split("/").pop()}`
						: destPath;
				copyDir(srcPath, finalDest);
			} else {
				const finalDest =
					shell.vfs.exists(destPath) &&
					shell.vfs.stat(destPath).type === "directory"
						? `${destPath}/${srcArg.split("/").pop()}`
						: destPath;
				const content = shell.vfs.readFileRaw(srcPath);
				shell.writeFileAsUser(authUser, finalDest, content);
			}

			return { exitCode: 0 };
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return { stderr: `cp: ${msg}`, exitCode: 1 };
		}
	},
};
