import type { ShellModule } from "../types/commands";
import { getFlag } from "./command-helpers";

/**
 * Minimal `awk`-like pattern scanner (supports simple print patterns).
 * @category text
 * @params ["[-F <sep>] '<program>' [file]"]
 *
 * Supported program patterns:
 * - `print $N` (e.g. `print $1`, `print $2, $3`, `print $0`)
 * - `{print $N}` (e.g. `{print $1}`, `{print $2, $3}`, `{print $0}`)
 *
 * The field separator can be set with `-F` (default is space, which splits on any whitespace).
 */
export const awkCommand: ShellModule = {
	name: "awk",
	description: "Pattern scanning and processing language (minimal)",
	category: "text",
	params: ["[-F <sep>] '<program>' [file]"],
	run: ({ args, stdin }) => {
		const sep = (getFlag(args, ["-F"]) as string | undefined) ?? " ";
		const prog = args.find((a) => !a.startsWith("-") && a !== sep);
		if (!prog) return { stderr: "awk: no program", exitCode: 1 };

		// Only support print $N and {print $N} patterns
		const printMatch = prog.match(/^\{?\s*print\s+([^}]+)\s*\}?$/);
		if (!printMatch)
			return { stderr: `awk: unsupported program: ${prog}`, exitCode: 1 };

		const fields = printMatch[1]!.split(/\s*,\s*/).map((f) => f.trim());
		const lines = (stdin ?? "").split("\n").filter(Boolean);
		const out = lines.map((line) => {
			const parts = line.split(sep === " " ? /\s+/ : sep);
			return fields
				.map((f) => {
					if (f === "$0") return line;
					const n = parseInt(f.replace("$", ""), 10);
					return Number.isNaN(n) ? f.replace(/"/g, "") : (parts[n - 1] ?? "");
				})
				.join(sep === " " ? "\t" : sep);
		});
		return { stdout: out.join("\n"), exitCode: 0 };
	},
};
