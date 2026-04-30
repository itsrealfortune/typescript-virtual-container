import type { ShellModule } from "../types/commands";

export const exportCommand: ShellModule = {
	name: "export",
	description: "Set shell environment variable",
	category: "shell",
	params: ["[VAR=value]"],
	run: ({ args, env }) => {
		if (args.length === 0) {
			const out = Object.entries(env.vars).map(([k, v]) => `declare -x ${k}="${v}"`).join("\n");
			return { stdout: out, exitCode: 0 };
		}
		for (const arg of args) {
			if (arg.includes("=")) {
				const eq = arg.indexOf("=");
				const name = arg.slice(0, eq);
				const value = arg.slice(eq + 1);
				env.vars[name] = value;
			} else {
				// mark existing as exported (already is)
			}
		}
		return { exitCode: 0 };
	},
};
