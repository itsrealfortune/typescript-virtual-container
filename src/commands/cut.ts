import type { ShellModule } from "../types/commands";
import { getFlag } from "./command-helpers";

/**
 * Extract selected fields from each line of input.
 * @category text
 * @params ["-d <delim> -f <fields> [file]"]
 */
export const cutCommand: ShellModule = {
	name: "cut",
	description: "Remove sections from lines",
	category: "text",
	params: ["-d <delim> -f <fields> [file]"],
	run: ({ args, stdin }) => {
		const delim = (getFlag(args, ["-d"]) as string | undefined) ?? "\t";
		const fields = (getFlag(args, ["-f"]) as string | undefined) ?? "1";
		const cols = fields.split(",").map((f) => {
			const [a, b] = f.split("-").map(Number);
			return b !== undefined
				? { from: (a ?? 1) - 1, to: b - 1 }
				: { from: (a ?? 1) - 1, to: (a ?? 1) - 1 };
		});
		const lines = (stdin ?? "").split("\n");
		const out = lines.map((line) => {
			const parts = line.split(delim);
			const selected: string[] = [];
			for (const col of cols) {
				for (let i = col.from; i <= Math.min(col.to, parts.length - 1); i++) {
					selected.push(parts[i] ?? "");
				}
			}
			return selected.join(delim);
		});
		return { stdout: out.join("\n"), exitCode: 0 };
	},
};
