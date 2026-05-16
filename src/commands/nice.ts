import type { ShellModule } from "../types/commands";
import { parseArgs } from "./command-helpers";
import { runCommand } from "./runtime";

export const niceCommand: ShellModule = {
	name: "nice",
	description: "Run command with adjusted niceness",
	category: "system",
	params: ["[-n adjustment] <command> [args...]"],
	run: async ({ authUser, hostname, mode, cwd, shell, stdin, env, args }) => {
		const { positionals } = parseArgs(args, {
			flagsWithValue: ["-n"],
		});
	const cmd = positionals.join(" ");
		if (!cmd) return { stderr: "nice: missing command\n", exitCode: 1 };
		return runCommand(cmd, authUser, hostname, mode, cwd, shell, stdin, env);
	},
};
