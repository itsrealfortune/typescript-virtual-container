import type { ShellModule } from "../types/commands";

/**
 * Shift positional parameters (remove first N arguments).
 * @category shell
 * @params ["[n]"]
 */
export const shiftCommand: ShellModule = {
	name: "shift",
	description: "Shift positional parameters",
	category: "shell",
	params: ["[n]"],
	// shift is meaningful only inside sh scripts where positional params exist.
	// In the current impl, positional params ($1 $2 …) aren't tracked in env by default.
	// We store them under env.vars.__argv and shift there if present.
	run: ({ args, env }) => {
		if (!env) {
			return { exitCode: 0 };
		}
		const n = Number.parseInt(args[0] ?? "1", 10) || 1;
		const argv = env.vars.__argv?.split("\x00").filter(Boolean) ?? [];
		env.vars.__argv = argv.slice(n).join("\x00");
		// Update $1 $2 … in env
		const shifted = argv.slice(n);
		for (let i = 1; i <= 9; i++) {
			env.vars[String(i)] = shifted[i - 1] ?? "";
		}
		return { exitCode: 0 };
	},
};

/**
 * Trap signals and execute actions on signal receipt or shell exit.
 * @category shell
 * @params ["[action] [signal...]"]
 */
export const trapCommand: ShellModule = {
	name: "trap",
	description: "Trap signals and events",
	category: "shell",
	params: ["[action] [signal...]"],
	run: ({ args, env }) => {
		if (!env) {
			return { exitCode: 0 };
		}

		// trap -p — display active traps
		if (args.includes("-p") || args.length === 0) {
			const lines: string[] = [];
			for (const [k, v] of Object.entries(env.vars)) {
				if (k.startsWith("__trap_") && v) {
					const sig = k.slice(7);
					lines.push(`trap -- '${v}' ${sig}`);
				}
			}
			return {
				stdout: lines.length > 0 ? `${lines.join("\n")}\n` : "",
				exitCode: 0,
			};
		}

		// trap - SIGNAL — reset to default
		if (args[0] === "-") {
			const signals = args.slice(1);
			for (const sig of signals) {
				delete env.vars[`__trap_${sig.toUpperCase()}`];
			}
			return { exitCode: 0 };
		}

		const action = args[0] ?? "";
		const signals = args.slice(1);
		if (signals.length === 0) {
			// Just print traps for named signals
			const lines: string[] = [];
			for (const sig of signals) {
				const handler = env.vars[`__trap_${sig.toUpperCase()}`];
				if (handler) {
					lines.push(`trap -- '${handler}' ${sig}`);
				}
			}
			if (lines.length > 0) {
				return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
			}
			return { exitCode: 0 };
		}

		for (const sig of signals) {
			env.vars[`__trap_${sig.toUpperCase()}`] = action;
		}
		return { exitCode: 0 };
	},
};

export const returnCommand: ShellModule = {
	name: "return",
	description: "Return from a shell function",
	category: "shell",
	params: ["[n]"],
	run: ({ args, env }) => {
		const code = Number.parseInt(args[0] ?? "0", 10);
		if (env) {
			env.lastExitCode = code;
		}
		// Signal the caller via exitCode; function return is handled by runBlocks
		return { exitCode: code };
	},
};
