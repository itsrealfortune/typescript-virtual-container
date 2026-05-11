import type { ShellModule } from "../types/commands";

/**
 * Send a signal to a process by PID.
 * @category system
 * @params ["[-9] <pid>"]
 */
export const killCommand: ShellModule = {
	name: "kill",
	description: "Send signal to process",
	category: "system",
	params: ["[-9] <pid>"],
	run: ({ args }) => {
		const pid = args.find((a) => !a.startsWith("-"));
		if (!pid) return { stderr: "kill: no pid specified", exitCode: 1 };
		// In virtual env, we just acknowledge the kill
		return { stdout: ``, exitCode: 0 };
	},
};
