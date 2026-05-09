import type { ShellModule } from "../types/commands";

export const shiftCommand: ShellModule = {
	name: "shift",
	description: "Shift positional parameters",
	category: "shell",
	params: ["[n]"],
	// shift is meaningful only inside sh scripts where positional params exist.
	// In the current impl, positional params ($1 $2 …) aren't tracked in env by default.
	// We store them under env.vars.__argv and shift there if present.
	run: ({ args, env }) => {
		if (!env) return { exitCode: 0 };
		const n = parseInt(args[0] ?? "1", 10) || 1;
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

export const trapCommand: ShellModule = {
	name: "trap",
	description: "Trap signals and events",
	category: "shell",
	params: ["[action] [signal...]"],
	// Store trap handlers in env for EXIT signal support
	run: ({ args, env }) => {
		if (!env || args.length === 0) return { exitCode: 0 };
		const action = args[0] ?? "";
		const signals = args.slice(1);
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
		const code = parseInt(args[0] ?? "0", 10);
		if (env) env.lastExitCode = code;
		// Signal the caller via exitCode; function return is handled by runBlocks
		return { exitCode: code };
	},
};
