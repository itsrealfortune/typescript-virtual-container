import type {ShellModule} from "../types/commands";

export const exportCommand: ShellModule = {
	name: "export",
	description: "Set shell environment variable",
	category: "shell",
	params: ["[-n] [-p] [NAME[=VALUE] ...]"],
	run: ({args, env}) => {
		const flags = new Set(
			args.filter((a) => a.startsWith("-") && !a.includes("="))
		);
		const names = args.filter((a) => !flags.has(a));
		const options = [...flags].join("").replace(/-/g, "");

		// -p or no args: print exported vars
		if (options.includes("p") || names.length === 0) {
			const out = Object.entries(env.vars)
				.filter(
					([k]) =>
						k && !k.startsWith("__") && /^[A-Za-z_][A-Za-z0-9_]*$/.test(k)
				)
				.map(([k, v]) => `declare -x ${k}="${v}"`)
				.join("\n");
			return {stdout: out ? `${out}\n` : "", exitCode: 0};
		}

		for (const arg of names) {
			if (arg.includes("=")) {
				const eq = arg.indexOf("=");
				const name = arg.slice(0, eq);
				const value = arg.slice(eq + 1);
				env.vars[name] = value;
			}
			// -n: unexport (remove from env) — in our model all vars are accessible,
			// so we just delete it to simulate unexport
			if (options.includes("n")) {
				delete env.vars[arg];
			}
		}
		return {exitCode: 0};
	},
};
