import { resolveSignal, SIGNALS } from "../modules/VirtualUserManager/signals";
import type { ShellModule } from "../types/commands";

/**
 * Send a signal to a process by PID.
 * Supports all POSIX signals: SIGTERM (default), SIGKILL (-9), SIGSTOP, SIGCONT, etc.
 * @category system
 * @params ["[-s SIGNAL | -SIGNAL] <pid>"]
 */
export const killCommand: ShellModule = {
	name: "kill",
	description: "Send signal to process",
	category: "system",
	params: ["[-s SIGNAL | -SIGNAL] <pid>"],
	run: ({ args, shell }) => {
		let signal = 15; // SIGTERM default
		let pidStr: string | undefined;

		for (let i = 0; i < args.length; i++) {
			const arg = args[i];
			if (!arg) continue;
			if (arg === "-l") {
				// List signals
				const lines = Object.entries(SIGNALS)
					.sort((a, b) => Number(a[0]) - Number(b[0]))
					.map(([num, sig]) => `${num} ${sig.name}`);
				return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
			}
			if (arg === "-s" && i + 1 < args.length) {
				const resolved = resolveSignal(args[++i] ?? "");
				if (resolved === null) {
					return { stderr: `kill: unknown signal name '${args[i]}'`, exitCode: 1 };
				}
				signal = resolved;
			} else if (arg.startsWith("-") && arg !== "-") {
				const spec = arg.startsWith("-s") ? arg.slice(2) : arg.slice(1);
				if (spec) {
					const resolved = resolveSignal(spec);
					if (resolved === null) {
						return { stderr: `kill: unknown signal '${arg}'`, exitCode: 1 };
					}
					signal = resolved;
				}
			} else if (!arg.startsWith("-")) {
				pidStr = arg;
			}
		}

		if (!pidStr) return { stderr: "kill: no pid specified", exitCode: 1 };
		const pid = parseInt(pidStr, 10);
		if (Number.isNaN(pid)) {
			return { stderr: `kill: invalid pid: ${pidStr}`, exitCode: 1 };
		}

		const found = shell.users.killProcess(pid, signal);
		if (!found) {
			return { stderr: `kill: (${pid}) - No such process`, exitCode: 1 };
		}

		const sigName = SIGNALS[signal]?.name ?? `signal ${signal}`;
		return { stdout: `Sent ${sigName} to ${pid}\n`, exitCode: 0 };
	},
};
