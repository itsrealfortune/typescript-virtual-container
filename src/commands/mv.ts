import type { ShellModule } from "../types/commands";
import { assertPathAccess, resolvePath } from "./helpers";

/**
 * Move or rename files and directories.
 * @category files
 * @params ["<source> <dest>"]
 */
export const mvCommand: ShellModule = {
	name: "mv",
	description: "Move or rename files",
	category: "files",
	params: ["<source> <dest>"],
	run: ({ authUser, shell, cwd, args }) => {
		const positionals = args.filter((a) => !a.startsWith("-"));
		const [srcArg, destArg] = positionals;

		if (!srcArg || !destArg) {
			return { stderr: "mv: missing operand", exitCode: 1 };
		}

		const srcPath = resolvePath(cwd, srcArg);
		const destPath = resolvePath(cwd, destArg);

		try {
			assertPathAccess(authUser, srcPath, "mv");
			assertPathAccess(authUser, destPath, "mv");

			if (!shell.vfs.exists(srcPath)) {
				return {
					stderr: `mv: ${srcArg}: No such file or directory`,
					exitCode: 1,
				};
			}

			// If dest is a directory, move into it
			const finalDest =
				shell.vfs.exists(destPath) &&
				shell.vfs.stat(destPath).type === "directory"
					? `${destPath}/${srcArg.split("/").pop()}`
					: destPath;

			shell.vfs.move(srcPath, finalDest);
			return { exitCode: 0 };
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return { stderr: `mv: ${msg}`, exitCode: 1 };
		}
	},
};
