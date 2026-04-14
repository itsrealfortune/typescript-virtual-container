import type { ShellModule } from "../../types/commands";
import { assertPathAccess, resolvePath } from "./helpers";

export const rmCommand: ShellModule = {
	name: "rm",
	params: ["[-r|-rf] <path>"],
	run: ({ authUser, vfs, cwd, args }) => {
		if (args.length === 0) {
			return { stderr: "rm: missing operand", exitCode: 1 };
		}

		const recursive =
			args.includes("-r") || args.includes("-rf") || args.includes("-fr");
		const targets = args.filter((arg) => !arg.startsWith("-"));

		if (targets.length === 0) {
			return { stderr: "rm: missing operand", exitCode: 1 };
		}

		for (const target of targets) {
			const resolvedTarget = resolvePath(cwd, target);
			assertPathAccess(authUser, resolvedTarget, "rm");
			vfs.remove(resolvedTarget, { recursive });
		}

		return { exitCode: 0 };
	},
};
