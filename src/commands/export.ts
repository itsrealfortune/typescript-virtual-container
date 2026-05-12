import type { ShellModule } from "../types/commands";

/**
 * Set or display shell environment variables for child processes.
 * @category shell
 * @params ["[VAR=value]"]
 */
export const exportCommand: ShellModule = {
	name: "export",
	description: "Set shell environment variable",
	category: "shell",
	params: ["[VAR=value]"],
	run: ({ args, env }) => {
		// export -p or export with no args — list all exported vars
		if (args.length === 0 || (args.length === 1 && args[0] === "-p")) {
			const out = Object.entries(env.vars)
				.filter(([k]) => k && /^[A-Za-z_][A-Za-z0-9_]*$/.test(k))
				.map(([k, v]) => `declare -x ${k}="${v}"`)
				.join("\n");
			return { stdout: out ? `${out}\n` : "", exitCode: 0 };
		}
		for (const arg of args.filter((a) => a !== "-p")) {
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
