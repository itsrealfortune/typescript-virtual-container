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
				.filter(([k]) => !k.startsWith("__"))
				.map(([k, v]) => `${k}=${v}`)
				.join("\n");
			return { stdout: out, exitCode: 0 };
		}
		for (const arg of args) {
			const flagMatch = arg.match(/^([+-])([a-zA-Z]+)$/);
			if (flagMatch) {
				const on = flagMatch[1] === "-";
				for (const flag of flagMatch[2]!) {
					if (flag === "e") { if (on) env.vars.__errexit = "1"; else delete env.vars.__errexit; }
					if (flag === "x") { if (on) env.vars.__xtrace = "1"; else delete env.vars.__xtrace; }
				}
				continue;
			}
			if (arg.includes("=")) {
				const eq = arg.indexOf("=");
				env.vars[arg.slice(0, eq)] = arg.slice(eq + 1);
			}
		}
		return { exitCode: 0 };
	},
};
