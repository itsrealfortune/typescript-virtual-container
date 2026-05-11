import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
/**
 * Manage shell aliases (list / set / remove).
 * @category shell
 * @params ["[name[=value] ...]"]
 */
export const aliasCommand: ShellModule = {
	name: "alias",
	description: "Define or display aliases",
	category: "shell",
	params: ["[name[=value] ...]"],
	run: ({ args, env }) => {
		if (!env) return { exitCode: 0 };

		// Aliases stored in env.vars under prefix __alias_
		if (args.length === 0) {
			const aliases = Object.entries(env.vars)
				.filter(([k]) => k.startsWith("__alias_"))
				.map(([k, v]) => `alias ${k.slice("__alias_".length)}='${v}'`);
			return { stdout: aliases.join("\n") || "", exitCode: 0 };
		}

		const lines: string[] = [];
		for (const arg of args) {
			const eq = arg.indexOf("=");
			if (eq === -1) {
				// Display single alias
				const val = env.vars[`__alias_${arg}`];
				if (val) lines.push(`alias ${arg}='${val}'`);
				else return { stderr: `alias: ${arg}: not found`, exitCode: 1 };
			} else {
				// Set alias
				const name = arg.slice(0, eq);
				const val = arg.slice(eq + 1).replace(/^['"]|['"]$/g, "");
				env.vars[`__alias_${name}`] = val;
			}
		}

		return { stdout: lines.join("\n") || undefined, exitCode: 0 };
	},
};

/**
 * Remove shell aliases.
 * @category shell
 * @params ["<name...>"]
 */
export const unaliasCommand: ShellModule = {
	name: "unalias",
	description: "Remove alias definitions",
	category: "shell",
	params: ["<name...> | -a"],
	run: ({ args, env }) => {
		if (!env) return { exitCode: 0 };

		if (ifFlag(args, ["-a"])) {
			for (const k of Object.keys(env.vars)) {
				if (k.startsWith("__alias_")) delete env.vars[k];
			}
			return { exitCode: 0 };
		}

		for (const name of args) {
			delete env.vars[`__alias_${name}`];
		}
		return { exitCode: 0 };
	},
};
