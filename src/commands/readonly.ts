import type { ShellModule } from "../types/commands";

const READONLY_KEY = "__readonly";

function getReadonlySet(vars: Record<string, string>): Set<string> {
	const raw = vars[READONLY_KEY];
	if (!raw) {
		return new Set();
	}
	try {
		return new Set(JSON.parse(raw) as string[]);
	} catch {
		return new Set();
	}
}

function saveReadonlySet(vars: Record<string, string>, set: Set<string>): void {
	vars[READONLY_KEY] = JSON.stringify([...set]);
}

/** Mark shell variables as readonly. */
export const readonlyCommand: ShellModule = {
	name: "readonly",
	description: "Mark shell variables as readonly",
	category: "shell",
	params: ["[-p] [NAME[=VALUE] ...]"],
	run: ({ args, env }) => {
		const roSet = getReadonlySet(env.vars);

		if (args.length === 0 || (args.length === 1 && args[0] === "-p")) {
			const out = Object.entries(env.vars)
				.filter(
					([k]) =>
						k &&
						!k.startsWith("__") &&
						/^[A-Za-z_][A-Za-z0-9_]*$/.test(k) &&
						roSet.has(k)
				)
				.map(([k, v]) => `readonly ${k}="${v}"`)
				.join("\n");
			return { stdout: out ? `${out}\n` : "", exitCode: 0 };
		}
		for (const arg of args) {
			if (arg === "-p") {
				continue;
			}
			if (arg.includes("=")) {
				const eq = arg.indexOf("=");
				const name = arg.slice(0, eq);
				const value = arg.slice(eq + 1);
				env.vars[name] = value;
				roSet.add(name);
			} else {
				roSet.add(arg);
			}
		}
		saveReadonlySet(env.vars, roSet);
		return { exitCode: 0 };
	},
};
