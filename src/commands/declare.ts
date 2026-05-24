import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

const SCOPE_KEY = "__local_scope";

interface ScopeEntry {
	name: string;
	oldValue: string | undefined;
}

function pushScope(vars: Record<string, string>, name: string): void {
	const raw = vars[SCOPE_KEY];
	const stack: ScopeEntry[] = raw ? (JSON.parse(raw) as ScopeEntry[]) : [];
	stack.push({ name, oldValue: vars[name] });
	vars[SCOPE_KEY] = JSON.stringify(stack);
}

/** Pop and restore all local scope entries from the stack. */
export function popScope(vars: Record<string, string>): void {
	const raw = vars[SCOPE_KEY];
	if (!raw) {
		return;
	}
	const stack: ScopeEntry[] = JSON.parse(raw) as ScopeEntry[];
	while (stack.length > 0) {
		const entry = stack.pop()!;
		if (entry.oldValue === undefined) {
			delete vars[entry.name];
		} else {
			vars[entry.name] = entry.oldValue;
		}
	}
	vars[SCOPE_KEY] = "[]";
}

export const declareCommand: ShellModule = {
	name: "declare",
	aliases: ["local", "typeset"],
	description: "Declare variables and give them attributes",
	category: "shell",
	params: ["[-i] [-r] [-x] [-a] [name[=value]...]"],
	run: ({ args, env }) => {
		if (!env) {
			return { exitCode: 0 };
		}

		const integer = ifFlag(args, ["-i"]);
		const printAll = args.filter((a) => !a.startsWith("-")).length === 0;

		if (printAll) {
			const lines = Object.entries(env.vars).map(
				([k, v]) => `declare -- ${k}="${v}"`
			);
			return { stdout: lines.join("\n"), exitCode: 0 };
		}

		const assignments = args.filter((a) => !a.startsWith("-"));
		for (const token of assignments) {
			const eq = token.indexOf("=");
			if (eq === -1) {
				if (!(token in env.vars)) {
					env.vars[token] = "";
				}
				pushScope(env.vars, token);
			} else {
				const name = token.slice(0, eq);
				let val = token.slice(eq + 1);
				if (integer) {
					const n = Number.parseInt(val, 10);
					val = Number.isNaN(n) ? "0" : String(n);
				}
				pushScope(env.vars, name);
				env.vars[name] = val;
			}
		}

		return { exitCode: 0 };
	},
};
