import type { ShellModule } from "../types/commands";
import { runCommand } from "./index";

export const xargsCommand: ShellModule = {
	name: "xargs",
	description: "Build and execute command lines from stdin",
	category: "text",
	params: ["[command] [args...]"],
	run: async ({ authUser, hostname, mode, cwd, args, stdin, shell, env }) => {
		const baseCmd = args[0] ?? "echo";
		const extraArgs = args.slice(1);
		const items = (stdin ?? "").trim().split(/\s+/).filter(Boolean);
		if (items.length === 0) return { exitCode: 0 };
		const fullCmd = [baseCmd, ...extraArgs, ...items].join(" ");
		return runCommand(
			fullCmd,
			authUser,
			hostname,
			mode,
			cwd,
			shell,
			undefined,
			env,
		);
	},
};
