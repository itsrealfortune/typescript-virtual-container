import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

export const trCommand: ShellModule = {
	name: "tr",
	description: "Translate or delete characters",
	category: "text",
	params: ["[-d] <set1> [set2]"],
	run: ({ args, stdin }) => {
		const del = ifFlag(args, ["-d"]);
		const positionals = args.filter((a) => !a.startsWith("-"));
		const set1 = positionals[0] ?? "";
		const set2 = positionals[1] ?? "";
		let input = stdin ?? "";
		if (del) {
			for (const c of set1) input = input.split(c).join("");
		} else if (set2) {
			for (let i = 0; i < set1.length; i++) {
				input = input.split(set1[i]!).join(set2[i] ?? set2[set2.length - 1] ?? "");
			}
		}
		return { stdout: input, exitCode: 0 };
	},
};
