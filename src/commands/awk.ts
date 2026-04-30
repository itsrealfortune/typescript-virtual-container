import type { ShellModule } from "../types/commands";
import { getFlag } from "./command-helpers";

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
		if (!printMatch) return { stderr: `awk: unsupported program: ${prog}`, exitCode: 1 };

		const fields = printMatch[1]!.split(/\s*,\s*/).map((f) => f.trim());
		const lines = (stdin ?? "").split("\n").filter(Boolean);
		const out = lines.map((line) => {
			const parts = line.split(sep === " " ? /\s+/ : sep);
			return fields.map((f) => {
				if (f === "$0") return line;
				const n = parseInt(f.replace("$", ""), 10);
				return Number.isNaN(n) ? f.replace(/"/g, "") : (parts[n - 1] ?? "");
			}).join(sep === " " ? "\t" : sep);
		});
		return { stdout: out.join("\n"), exitCode: 0 };
	},
};
