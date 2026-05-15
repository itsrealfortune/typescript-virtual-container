import type { CommandResult, ShellModule } from "../types/commands";
import type { VirtualShell } from "../VirtualShell";
import { getArg, ifFlag } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

const FLAG_RECURSIVE = ["-r", "-R", "-rf", "-fr", "-rF", "-Fr"];
const FLAG_FORCE = ["-f", "-rf", "-fr", "-rF", "-Fr", "--force"];

/**
 * Remove files or directories from the filesystem.
 * @category files
 * @params ["[-r|-rf|-f] <path>"]
 */
export const rmCommand: ShellModule = {
	name: "rm",
	description: "Remove files or directories",
	category: "files",
	params: ["[-r|-rf|-f] <path>"],
	run: ({ authUser, shell, cwd, args }) => {
		if (args.length === 0) {
			return { stderr: "rm: missing operand", exitCode: 1 };
		}

		const recursive = ifFlag(args, FLAG_RECURSIVE);
		const force = ifFlag(args, FLAG_FORCE);
		const allFlags = [...FLAG_RECURSIVE, ...FLAG_FORCE, "--force"];

		const targets: string[] = [];
		for (let index = 0; ; index += 1) {
			const target = getArg(args, index, { flags: allFlags });
			if (!target) break;
			targets.push(target);
		}

		if (targets.length === 0) {
			return { stderr: "rm: missing operand", exitCode: 1 };
		}

		const resolved = targets.map((t) => resolvePath(cwd, t));
		for (const r of resolved) assertPathAccess(authUser, r, "rm");

		for (const r of resolved) {
			if (!shell.vfs.exists(r)) {
				if (force) continue;
				return { stderr: `rm: cannot remove '${r}': No such file or directory`, exitCode: 1 };
			}
		}

		const doRemove = (sh: VirtualShell): CommandResult => {
			for (const r of resolved) if (sh.vfs.exists(r)) sh.vfs.remove(r, { recursive });
			return { exitCode: 0 };
		};

		if (force) return doRemove(shell);

		const label = targets.length === 1 ? `'${targets[0]}'` : `${targets.length} items`;
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
				onPassword: async (input, sh) => {
					const answer = input.trim().toLowerCase();
					if (answer !== "y" && answer !== "yes") {
						return { result: { stdout: "rm: cancelled\n", exitCode: 1 } };
					}
					return { result: doRemove(sh) };
				},
			},
			exitCode: 0,
		};
	},
};
