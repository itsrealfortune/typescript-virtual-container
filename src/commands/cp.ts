import * as path from "node:path";
import type { VirtualShell } from "../modules/VirtualShell";
import type { CommandResult, ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { checkFilePermission, resolvePath } from "./helpers";

/**
 * Copy files or directories inside the virtual filesystem.
 * @category files
 * @params ["[-r] [-i] <source> <dest>"]
 */
export const cpCommand: ShellModule = {
	name: "cp",
	description: "Copy files or directories",
	category: "files",
	params: ["[-r] [-i] <source> <dest>"],
	run: ({ authUser, shell, cwd, args, uid, gid }) => {
		const recursive = ifFlag(args, ["-r", "-R", "--recursive"]);
		const interactive = ifFlag(args, ["-i"]);
		const positionals = args.filter((a) => !a.startsWith("-"));
		const [srcArg, destArg] = positionals;

		if (!(srcArg && destArg)) {
			return { stderr: "cp: missing operand", exitCode: 1 };
		}

		const srcPath = resolvePath(cwd, srcArg);
		const destPath = resolvePath(cwd, destArg);

		try {
			checkFilePermission(shell.vfs, shell.users, authUser, srcPath, 4);
			checkFilePermission(
				shell.vfs,
				shell.users,
				authUser,
				path.posix.dirname(destPath),
				2
			);

			if (!shell.vfs.exists(srcPath)) {
				return {
					stderr: `cp: ${srcArg}: No such file or directory`,
					exitCode: 1,
				};
			}

			const srcStat = shell.vfs.stat(srcPath);

			const doCopy = (sh: VirtualShell): CommandResult => {
				if (srcStat.type === "directory") {
					if (!recursive) {
						return {
							stderr: `cp: ${srcArg}: is a directory (use -r)`,
							exitCode: 1,
						};
					}
					const cpDir = (from: string, to: string) => {
						sh.vfs.mkdir(to, 0o755, uid, gid);
						for (const entry of sh.vfs.list(from)) {
							const fe = `${from}/${entry}`;
							const te = `${to}/${entry}`;
							const st = sh.vfs.stat(fe);
							if (st.type === "directory") {
								cpDir(fe, te);
							} else {
								const content = sh.vfs.readFileRaw(fe);
								sh.vfs.writeFile(te, content, {}, uid, gid);
							}
						}
					};
					const finalDest =
						sh.vfs.exists(destPath) &&
						sh.vfs.stat(destPath).type === "directory"
							? `${destPath}/${srcArg.split("/").pop()}`
							: destPath;
					cpDir(srcPath, finalDest);
				} else {
					const finalDest =
						sh.vfs.exists(destPath) &&
						sh.vfs.stat(destPath).type === "directory"
							? `${destPath}/${srcArg.split("/").pop()}`
							: destPath;
					const content = sh.vfs.readFileRaw(srcPath);
					sh.vfs.writeFile(finalDest, content, {}, uid, gid);
				}
				return { exitCode: 0 };
			};

			if (
				interactive &&
				shell.vfs.exists(destPath) &&
				shell.vfs.stat(destPath).type === "file"
			) {
				const label = srcStat.type === "directory" ? srcArg : destArg;
				return {
					sudoChallenge: {
						username: authUser,
						targetUser: authUser,
						commandLine: null,
						loginShell: false,
						prompt: `cp: overwrite '${label}'? [y/N] `,
						mode: "confirm",
						onPassword: (input, sh) => {
							const answer = input.trim().toLowerCase();
							if (answer !== "y" && answer !== "yes") {
								return Promise.resolve({
									result: { stdout: "cp: cancelled\n", exitCode: 1 },
								});
							}
							return Promise.resolve({ result: doCopy(sh) });
						},
					},
					exitCode: 0,
				};
			}

			return doCopy(shell);
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return { stderr: `cp: ${msg}`, exitCode: 1 };
		}
	},
};
