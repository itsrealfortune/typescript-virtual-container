import type { ShellModule } from "../types/commands";
import { evalArith } from "../utils/expand";

export const bcCommand: ShellModule = {
	name: "bc",
	description: "Arbitrary precision calculator language",
	category: "system",
	params: ["[expression]"],
	run: ({ args, stdin }) => {
		const input = (stdin ?? args.join(" ")).trim();
		if (!input) return { stdout: "", exitCode: 0 };
		const results: string[] = [];
		for (const line of input.split("\n")) {
			const expr = line.trim();
			if (!expr || expr.startsWith("#")) continue;
			// Strip trailing semicolons
			const cleaned = expr.replace(/;+$/, "").trim();
			const val = evalArith(cleaned, {});
			if (!Number.isNaN(val)) {
				results.push(String(val));
			} else {
				return { stderr: `bc: syntax error on line: ${expr}`, exitCode: 1 };
			}
		}
		return { stdout: results.join("\n"), exitCode: 0 };
	},
};
