import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/**
 * Read a line from stdin into one or more variables.
 * @category shell
 * @params ["[-r] [-p prompt] <var...>"]
 */
export const readCommand: ShellModule = {
	name: "read",
	description: "Read a line from stdin into variables",
	category: "shell",
	params: ["[-r] [-p prompt] <var...>"],
	run: ({ args, stdin, env }) => {
		const varNames = args.filter(
			(a, i) => a !== "-r" && a !== "-p" && args[i - 1] !== "-p",
		);

		// In non-interactive context, read from stdin pipe
		const input = (stdin ?? "").split("\n")[0] ?? "";
		const line = ifFlag(args, ["-r"])
			? input
			: input.replace(/\\(?:\r?\n|.)/g, (m) =>
					m[1] === "\n" || m[1] === "\r" ? "" : m[1]!,
				);

		if (!env) return { exitCode: 0 };

		if (varNames.length === 0) {
			// No var names: store into REPLY
			env.vars.REPLY = line;
		} else if (varNames.length === 1) {
			env.vars[varNames[0]!] = line;
		} else {
			// Split on whitespace, last var gets remainder
			const parts = line.split(/\s+/);
			for (let i = 0; i < varNames.length; i++) {
				env.vars[varNames[i]!] =
					i < varNames.length - 1 ? (parts[i] ?? "") : parts.slice(i).join(" ");
			}
		}

		return { exitCode: 0 };
	},
};
