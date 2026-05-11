import type { ShellModule } from "../types/commands";
import { getFlag } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

export const tailCommand: ShellModule = {
	name: "tail",
	description: "Output last lines",
	category: "text",
	params: ["[-n <lines>] [file...]"],
	run: ({ authUser, shell, cwd, args, stdin }) => {
		const nArg = getFlag(args, ["-n"]);
		const shortN = args.find((a) => /^-\d+$/.test(a));
		const n = typeof nArg === "string"
			? parseInt(nArg, 10)
			: shortN ? parseInt(shortN.slice(1), 10) : 10;
		const positionals = args.filter(
			(a) => !a.startsWith("-") && a !== nArg && a !== String(n),
		);

		const take = (content: string) => {
			const lines = content.split("\n");
			// If content ends with \n, last element is ""; exclude from count
			const hasTrailingNewline = content.endsWith("\n");
			const meaningful = hasTrailingNewline ? lines.slice(0, -1) : lines;
			const sliced = meaningful.slice(Math.max(0, meaningful.length - n));
			return sliced.join("\n") + (hasTrailingNewline ? "\n" : "");
		};

		if (positionals.length === 0) {
			return { stdout: take(stdin ?? ""), exitCode: 0 };
		}

		const results: string[] = [];
		for (const file of positionals) {
			const filePath = resolvePath(cwd, file);
			try {
				assertPathAccess(authUser, filePath, "tail");
				results.push(take(shell.vfs.readFile(filePath)));
			} catch {
				return {
					stderr: `tail: ${file}: No such file or directory`,
					exitCode: 1,
				};
			}
		}
		return { stdout: results.join("\n"), exitCode: 0 };
	},
};
