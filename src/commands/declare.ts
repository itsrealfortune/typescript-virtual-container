import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

export const declareCommand: ShellModule = {
	name: "declare",
	aliases: ["local", "typeset"],
	description: "Declare variables and give them attributes",
	category: "shell",
	params: ["[-i] [-r] [-x] [-a] [name[=value]...]"],
	run: ({ args, env }) => {
		if (!env) return { exitCode: 0 };

		const integer  = ifFlag(args, ["-i"]);
		const _readonly = ifFlag(args, ["-r"]);
		const _export_  = ifFlag(args, ["-x"]);
		const printAll = args.filter((a) => !a.startsWith("-")).length === 0;

		if (printAll) {
			const lines = Object.entries(env.vars).map(([k, v]) => `declare -- ${k}="${v}"`);
			return { stdout: lines.join("\n"), exitCode: 0 };
		}

		const assignments = args.filter((a) => !a.startsWith("-"));
		for (const token of assignments) {
			const eq = token.indexOf("=");
			if (eq === -1) {
				// Just declare (no value)
				if (!(token in env.vars)) env.vars[token] = "";
			} else {
				const name = token.slice(0, eq);
				let val    = token.slice(eq + 1);
				if (integer) {
					const n = parseInt(val, 10);
					val = Number.isNaN(n) ? "0" : String(n);
				}
				env.vars[name] = val;
			}
		}

		return { exitCode: 0 };
	},
};
