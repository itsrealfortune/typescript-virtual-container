/** biome-ignore-all lint/style/useNamingConvention: env variables */
import type { ShellModule } from "../types/commands";

/**
 * Display or set shell variables and options.
 * @category shell
 * @params ["[VAR=value]"]
 */
export const setCommand: ShellModule = {
	name: "set",
	description: "Display or set shell variables",
	category: "shell",
	params: ["[VAR=value]"],
	run: ({ args, env }) => {
		if (args.length === 0) {
			const out = Object.entries(env.vars)
				.map(([k, v]) => `${k}=${v}`)
				.join("\n");
			return { stdout: out, exitCode: 0 };
		}
		for (const arg of args) {
			if (arg.includes("=")) {
				const eq = arg.indexOf("=");
				env.vars[arg.slice(0, eq)] = arg.slice(eq + 1);
			}
		}
		return { exitCode: 0 };
	},
};
