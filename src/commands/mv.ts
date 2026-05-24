import * as path from "node:path";
import type { VirtualShell } from "../modules/VirtualShell";
import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { checkFilePermission, resolvePath } from "./helpers";

/**
 * Move or rename files and directories.
 * @category files
 * @params ["[-i] <source> <dest>"]
 */
export const mvCommand: ShellModule = {
	name: "mv",
	description: "Move or rename files",
	category: "files",
	params: ["[-i] <source> <dest>"],
	run: ({ authUser, shell, cwd, args }) => {
		const interactive = ifFlag(args, ["-i"]);
		const positionals = args.filter((a) => !a.startsWith("-"));
		const [srcArg, destArg] = positionals;

		if (!(srcArg && destArg)) {
			return { stderr: "mv: missing operand", exitCode: 1 };
		}

		const srcPath = resolvePath(cwd, srcArg);
		const destPath = resolvePath(cwd, destArg);
		const uid = shell.users.getUid(authUser);
		const gid = shell.users.getGid(authUser);

		try {
			checkFilePermission(shell.vfs, shell.users, authUser, srcPath, 2);
			checkFilePermission(
				shell.vfs,
				shell.users,
				authUser,
				path.posix.dirname(destPath),
				2
			);

			if (!shell.vfs.exists(srcPath)) {
				return {
					stderr: `mv: ${srcArg}: No such file or directory`,
					exitCode: 1,
				};
			}

			const finalDest =
				shell.vfs.exists(destPath) &&
				shell.vfs.stat(destPath).type === "directory"
					? `${destPath}/${srcArg.split("/").pop()}`
					: destPath;

			const doMove = (sh: VirtualShell) => {
				sh.vfs.move(srcPath, finalDest, uid, gid);
				return { exitCode: 0 };
			};

			if (
				interactive &&
				shell.vfs.exists(finalDest) &&
				shell.vfs.stat(finalDest).type === "file"
			) {
				return {
					sudoChallenge: {
						username: authUser,
						targetUser: authUser,
						commandLine: null,
						loginShell: false,
						prompt: `mv: overwrite '${destArg}'? [y/N] `,
						mode: "confirm",
						onPassword: (input, sh) => {
							const answer = input.trim().toLowerCase();
							if (answer !== "y" && answer !== "yes") {
								return Promise.resolve({
									result: { stdout: "mv: cancelled\n", exitCode: 1 },
								});
							}
							return Promise.resolve({ result: doMove(sh) });
						},
					},
					exitCode: 0,
				};
			}

			return doMove(shell);
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return { stderr: `mv: ${msg}`, exitCode: 1 };
		}
	},
};
