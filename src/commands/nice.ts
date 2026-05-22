import type { ShellModule } from "../types/commands";
import { parseArgs } from "./command-helpers";
import { runCommand } from "./runtime";

/**
 * Run command with adjusted niceness or change priority of running process.
 * @category system
 * @params ["[-n priority] [-p pid] [command [args...]]"]
 */
export const niceCommand: ShellModule = {
	name: "nice",
	description: "Run command with adjusted scheduling priority",
	category: "system",
	params: ["[-n priority] [-p pid] [command [args...]]"],
	run: async ({ authUser, hostname, mode, cwd, shell, stdin, env, args }) => {
		const { flagsWithValues, positionals } = parseArgs(args, {
			flagsWithValue: ["-n", "-p"],
		});

		const niceStr = flagsWithValues.get("-n");
		const pidStr = flagsWithValues.get("-p");

		// Change priority of existing process
		if (pidStr) {
			const pid = parseInt(pidStr, 10);
			if (Number.isNaN(pid)) {
				return { stderr: `nice: invalid PID: ${pidStr}\n`, exitCode: 1 };
			}

			const nice = niceStr !== undefined ? parseInt(niceStr, 10) : 0;
			if (Number.isNaN(nice) || nice < -20 || nice > 19) {
				return { stderr: `nice: invalid priority: ${niceStr} (must be -20 to 19)\n`, exitCode: 1 };
			}

			const proc = shell.users.getProcess(pid);
			if (!proc) {
				return { stderr: `nice: no such process: ${pid}\n`, exitCode: 1 };
			}

			if (proc.username !== authUser && authUser !== "root") {
				return { stderr: `nice: permission denied\n`, exitCode: 1 };
			}

			const oldNice = proc.nice;
			const ok = shell.users.setProcessNice(pid, nice);
			if (!ok) {
				return { stderr: `nice: failed to set priority\n`, exitCode: 1 };
			}

			return { stdout: `pid ${pid}: nice ${oldNice} → ${nice} (${proc.priority})\n`, exitCode: 0 };
		}

		// Run command with specified nice value
		const nice = niceStr !== undefined ? parseInt(niceStr, 10) : 10;
		if (Number.isNaN(nice) || nice < -20 || nice > 19) {
			return { stderr: `nice: invalid priority: ${niceStr} (must be -20 to 19)\n`, exitCode: 1 };
		}

		const cmd = positionals.join(" ");
		if (!cmd) {
			// No command: just print current nice (like `nice` with no args)
			return { stdout: "0\n", exitCode: 0 };
		}

		// Run the command with the specified nice value
		// The nice value is passed through to process registration via env
		const niceEnv = { ...env, NICE_PRIORITY: String(nice) };
		return runCommand(cmd, authUser, hostname, mode, cwd, shell, stdin, niceEnv);
	},
};
