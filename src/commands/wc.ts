import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

/**
 * Count words, lines, and/or bytes in files or stdin.
 * @category text
 * @params ["[-l] [-w] [-c] [file...]"]
 */
export const wcCommand: ShellModule = {
	name: "wc",
	description: "Count words/lines/bytes",
	category: "text",
	params: ["[-l] [-w] [-c] [file...]"],
	run: ({ authUser, shell, cwd, args, stdin }) => {
		const lines = ifFlag(args, ["-l"]);
		const words = ifFlag(args, ["-w"]);
		const bytes = ifFlag(args, ["-c"]);
		const showAll = !lines && !words && !bytes;
		const positionals = args.filter((a) => !a.startsWith("-"));

		const count = (content: string, label: string): string => {
			const l = content.split("\n").length - (content.endsWith("\n") ? 1 : 0);
			const w = content.trim().split(/\s+/).filter(Boolean).length;
			const c = Buffer.byteLength(content, "utf8");
			const parts: string[] = [];
			if (showAll || lines) parts.push(String(l).padStart(7));
			if (showAll || words) parts.push(String(w).padStart(7));
			if (showAll || bytes) parts.push(String(c).padStart(7));
			if (label) parts.push(` ${label}`);
			return parts.join("");
		};

		if (positionals.length === 0) {
			const content = stdin ?? "";
			return { stdout: count(content, ""), exitCode: 0 };
		}

		const results: string[] = [];
		for (const file of positionals) {
			const filePath = resolvePath(cwd, file);
			try {
				assertPathAccess(authUser, filePath, "wc");
				const content = shell.vfs.readFile(filePath);
				results.push(count(content, file));
			} catch {
				return {
					stderr: `wc: ${file}: No such file or directory`,
					exitCode: 1,
				};
			}
		}
		return { stdout: results.join("\n"), exitCode: 0 };
	},
};
