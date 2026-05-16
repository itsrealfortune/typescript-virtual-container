import type { ShellModule } from "../types/commands";

/**
 * Send a signal to a process by PID.
 * Supports SIGTERM (default) and SIGKILL (-9). Aborts background processes.
 * @category system
 * @params ["[-9] <pid>"]
 */
export const killCommand: ShellModule = {
	name: "kill",
	description: "Send signal to process",
	category: "system",
	params: ["[-9] <pid>"],
	run: ({ args, shell }) => {
		const pidStr = args.find((a) => !a.startsWith("-"));
		if (!pidStr) return { stderr: "kill: no pid specified", exitCode: 1 };
		const pid = parseInt(pidStr, 10);
		if (Number.isNaN(pid)) {
			return { stderr: `kill: invalid pid: ${pidStr}`, exitCode: 1 };
		}
		const found = shell.users.killProcess(pid);
		if (!found) {
			return { stderr: `kill: (${pid}) - No such process`, exitCode: 1 };
		}
		return { stdout: "", exitCode: 0 };
	},
};
