import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

export const uniqCommand: ShellModule = {
	name: "uniq",
	description: "Report or filter out repeated lines",
	category: "text",
	params: ["[-c] [-d] [-u] [file]"],
	run: ({ args, stdin }) => {
		const count = ifFlag(args, ["-c"]);
		const dupOnly = ifFlag(args, ["-d"]);
		const uniqOnly = ifFlag(args, ["-u"]);
		const lines = (stdin ?? "").split("\n");
		const out: string[] = [];
		let i = 0;
		while (i < lines.length) {
			let j = i;
			while (j < lines.length && lines[j] === lines[i]) j++;
			const n = j - i;
			const line = lines[i]!;
			if (dupOnly && n === 1) {
				i = j;
				continue;
			}
			if (uniqOnly && n > 1) {
				i = j;
				continue;
			}
			out.push(count ? `${String(n).padStart(4)} ${line}` : line);
			i = j;
		}
		return { stdout: out.join("\n"), exitCode: 0 };
	},
};
