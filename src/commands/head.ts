import type { ShellModule } from "../types/commands";
import { getFlag } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

/**
 * Output the first part of files or stdin (head).
 * @category text
 * @params ["[-n <lines>] [file...]"]
 */
export const headCommand: ShellModule = {
	name: "head",
	description: "Output first lines",
	category: "text",
	params: ["[-n <lines>] [file...]"],
	run: ({ authUser, shell, cwd, args, stdin }) => {
		const nArg = getFlag(args, ["-n"]);
		// Support both -n N and -N shorthand (head -2, head -10)
		const shortN = args.find((a) => /^-\d+$/.test(a));
		const n = typeof nArg === "string"
			? parseInt(nArg, 10)
			: shortN ? parseInt(shortN.slice(1), 10) : 10;
		const positionals = args.filter(
			(a) => !a.startsWith("-") && a !== nArg && a !== String(n),
		);

		const take = (content: string) => {
			const lines = content.split("\n");
			// Preserve trailing newline
			const sliced = lines.slice(0, n);
			return sliced.join("\n") + (content.endsWith("\n") && sliced.length === lines.slice(0, n).length ? "\n" : "");
		};

		if (positionals.length === 0) {
			return { stdout: take(stdin ?? ""), exitCode: 0 };
		}

		const results: string[] = [];
		for (const file of positionals) {
			const filePath = resolvePath(cwd, file);
			try {
				assertPathAccess(authUser, filePath, "head");
				results.push(take(shell.vfs.readFile(filePath)));
			} catch {
				return {
					stderr: `head: ${file}: No such file or directory`,
					exitCode: 1,
				};
			}
		}
		return { stdout: results.join("\n"), exitCode: 0 };
	},
};
