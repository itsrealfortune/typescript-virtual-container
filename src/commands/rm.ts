import type { ShellModule } from "../types/commands";
import { getArg, ifFlag } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

export const rmCommand: ShellModule = {
	name: "rm",
	description: "Remove files or directories",
	category: "files",
	params: ["[-r|-rf] <path>"],
	run: ({ authUser, shell, cwd, args }) => {
		if (args.length === 0) {
			return { stderr: "rm: missing operand", exitCode: 1 };
		}

		const recursive = ifFlag(args, ["-r", "-rf", "-fr"]);
		const targets: string[] = [];
		for (let index = 0; ; index += 1) {
			const target = getArg(args, index, { flags: ["-r", "-rf", "-fr"] });
			if (!target) {
				break;
			}
			targets.push(target);
		}

		if (targets.length === 0) {
			return { stderr: "rm: missing operand", exitCode: 1 };
		}

		for (const target of targets) {
			const resolvedTarget = resolvePath(cwd, target);
			assertPathAccess(authUser, resolvedTarget, "rm");
			shell.vfs.remove(resolvedTarget, { recursive });
		}

		return { exitCode: 0 };
	},
};
