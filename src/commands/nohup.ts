import type { ShellModule } from "../types/commands";
import { runCommand } from "./runtime";

/**
 * Run command immune to hup signals
 * @category system
 * @params ["<command> [args...]"]
 */
export const nohupCommand: ShellModule = {
	name: "nohup",
	description: "Run command immune to hup signals",
	category: "system",
	params: ["<command> [args...]"],
	run: async ({ authUser, hostname, mode, cwd, shell, stdin, env, args }) => {
		const cmd = args.join(" ");
		if (!cmd) return { stderr: "nohup: missing command\n", exitCode: 1 };
		return runCommand(cmd, authUser, hostname, mode, cwd, shell, stdin, env);
	},
};
