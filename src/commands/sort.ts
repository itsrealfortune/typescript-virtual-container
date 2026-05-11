import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

/**
 * Sort lines of text with various options (reverse, numeric, unique).
 * @category text
 * @params ["[-r] [-n] [-u] [-k <col>] [file...]"]
 */
export const sortCommand: ShellModule = {
	name: "sort",
	description: "Sort lines of text",
	category: "text",
	params: ["[-r] [-n] [-u] [-k <col>] [file...]"],
	run: ({ authUser, shell, cwd, args, stdin }) => {
		const reverse = ifFlag(args, ["-r"]);
		const numeric = ifFlag(args, ["-n"]);
		const unique = ifFlag(args, ["-u"]);
		const files = args.filter((a) => !a.startsWith("-"));

		const getContent = (): string => {
			if (files.length > 0) {
				return files
					.map((f) => {
						try {
							assertPathAccess(authUser, resolvePath(cwd, f), "sort");
							return shell.vfs.readFile(resolvePath(cwd, f));
						} catch {
							return "";
						}
					})
					.join("\n");
			}
			return stdin ?? "";
		};

		const lines = getContent().split("\n").filter(Boolean);
		const sorted = [...lines].sort((a, b) => {
			if (numeric) return Number(a) - Number(b);
			return a.localeCompare(b);
		});
		const result = reverse ? sorted.reverse() : sorted;
		const out = unique ? [...new Set(result)] : result;
		return { stdout: out.join("\n"), exitCode: 0 };
	},
};
