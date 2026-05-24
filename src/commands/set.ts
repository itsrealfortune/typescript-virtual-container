import type { ShellModule } from "../types/commands";

const FLAG_TO_INTERNAL: Record<string, string> = {
	e: "__errexit",
	u: "__nounset",
	C: "__noclobber",
	x: "__xtrace",
};

const OPTION_MAP: Record<string, string> = {
	errexit: "e",
	nounset: "u",
	noclobber: "C",
	xtrace: "x",
	pipefail: "__pipefail",
};

function setFlag(
	flag: string,
	on: boolean,
	vars: Record<string, string>
): void {
	const internal = FLAG_TO_INTERNAL[flag];
	if (!internal) {
		return;
	}
	if (on) {
		vars[internal] = "1";
	} else {
		delete vars[internal];
	}
}

export const setCommand: ShellModule = {
	name: "set",
	description: "Display or set shell variables",
	category: "shell",
	params: ["[+-abCefhkmnuvx] [+-o option] [-- args]"],
	run: ({ args, env }) => {
		if (args.length === 0) {
			const out = Object.entries(env.vars)
				.filter(([k]) => !k.startsWith("__"))
				.map(([k, v]) => `${k}=${v}`)
				.join("\n");
			return { stdout: out, exitCode: 0 };
		}

		let dashDash = false;
		const positional: string[] = [];

		for (let i = 0; i < args.length; i++) {
			const arg = args[i] as string;

			if (dashDash) {
				positional.push(arg);
				continue;
			}
			if (arg === "--") {
				dashDash = true;
				continue;
			}

			// -o option or +o option
			if (arg === "-o" && i + 1 < args.length) {
				const opt = args[i + 1] as string;
				const mapped = OPTION_MAP[opt];
				if (mapped) {
					if (mapped.startsWith("__")) {
						env.vars[mapped] = "1";
					} else {
						setFlag(mapped, true, env.vars);
					}
				}
				i++;
				continue;
			}
			if (arg === "+o" && i + 1 < args.length) {
				const opt = args[i + 1] as string;
				const mapped = OPTION_MAP[opt];
				if (mapped) {
					if (mapped.startsWith("__")) {
						delete env.vars[mapped];
					} else {
						setFlag(mapped, false, env.vars);
					}
				}
				i++;
				continue;
			}

			const flagMatch = arg.match(/^([+-])([a-zA-Z]+)$/);
			if (flagMatch) {
				const on = flagMatch[1] === "-";
				for (const flag of flagMatch[2] as string) {
					setFlag(flag, on, env.vars);
				}
				continue;
			}

			if (arg.includes("=")) {
				const eq = arg.indexOf("=");
				env.vars[arg.slice(0, eq)] = arg.slice(eq + 1);
				continue;
			}

			positional.push(arg);
		}

		if (positional.length > 0) {
			for (let i = 0; i < positional.length; i++) {
				env.vars[String(i + 1)] = positional[i] as string;
			}
		}

		return { exitCode: 0 };
	},
};
