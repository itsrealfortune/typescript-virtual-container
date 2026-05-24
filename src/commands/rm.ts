import * as path from "node:path";
import type { VirtualShell } from "../modules/VirtualShell";
import type { CommandResult, ShellModule } from "../types/commands";
import { getArg, ifFlag } from "./command-helpers";
import { checkFilePermission, resolvePath } from "./helpers";

const FLAG_RECURSIVE = ["-r", "-R", "-rf", "-fr", "-rF", "-Fr"];
const FLAG_FORCE = ["-f", "-rf", "-fr", "-rF", "-Fr", "--force"];

/**
 * Remove files or directories from the filesystem.
 * @category files
 * @params ["[-r|-rf|-f|-I] <path>"]
 */
export const rmCommand: ShellModule = {
	name: "rm",
	description: "Remove files or directories",
	category: "files",
	params: ["[-r|-rf|-f|-I] <path>"],
	run: ({ authUser, shell, cwd, args, uid, gid }) => {
		if (args.length === 0) {
			return { stderr: "rm: missing operand", exitCode: 1 };
		}

		const recursive = ifFlag(args, FLAG_RECURSIVE);
		const force = ifFlag(args, FLAG_FORCE);
		const interactiveOnce = ifFlag(args, ["-I"]);
		const allFlags = [
			...FLAG_RECURSIVE,
			...FLAG_FORCE,
			"--force",
			"-I",
		];

		const targets: string[] = [];
		for (let index = 0; ; index += 1) {
			const target = getArg(args, index, { flags: allFlags });
			if (!target) {
				break;
			}
			targets.push(target);
		}

		if (targets.length === 0) {
			return { stderr: "rm: missing operand", exitCode: 1 };
		}

		const resolved = targets.map((t) => resolvePath(cwd, t));
		for (const r of resolved) {
			checkFilePermission(
				shell.vfs,
				shell.users,
				authUser,
				path.posix.dirname(r),
				2
			);
		}

		for (const r of resolved) {
			if (!shell.vfs.exists(r)) {
				if (force) {
					continue;
				}
				return {
					stderr: `rm: cannot remove '${r}': No such file or directory`,
					exitCode: 1,
				};
			}
		}

		const doRemove = (sh: VirtualShell): CommandResult => {
			for (const r of resolved) {
				if (sh.vfs.exists(r)) {
					sh.vfs.remove(r, { recursive }, uid, gid);
				}
			}
			return { exitCode: 0 };
		};

		if (force) {
			return doRemove(shell);
		}

		// -I: prompt once before removing more than 3 files or recursive
		if (interactiveOnce) {
			const needsConfirm = targets.length > 3 || recursive;
			if (!needsConfirm) {
				return doRemove(shell);
			}
		}

		const label =
			targets.length === 1 ? `'${targets[0]}'` : `${targets.length} items`;
		const prompt = recursive
			? `rm: remove ${label} recursively? [y/N] `
			: `rm: remove ${label}? [y/N] `;

		return {
			sudoChallenge: {
				username: authUser,
				targetUser: authUser,
				commandLine: null,
				loginShell: false,
				prompt,
				mode: "confirm",
				onPassword: (input, sh) => {
					const answer = input.trim().toLowerCase();
					if (answer !== "y" && answer !== "yes") {
						return Promise.resolve({
							result: { stdout: "rm: cancelled\n", exitCode: 1 },
						});
					}
					return Promise.resolve({ result: doRemove(sh) });
				},
			},
			exitCode: 0,
		};
	},
};
