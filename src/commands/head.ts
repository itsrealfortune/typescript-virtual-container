import type { ShellModule } from "../types/commands";
import { getFlag } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

export const headCommand: ShellModule = {
	name: "head",
	params: ["[-n <lines>] [file...]"],
	run: ({ authUser, shell, cwd, args, stdin }) => {
		const nArg = getFlag(args, ["-n"]);
		const n = typeof nArg === "string" ? parseInt(nArg, 10) : 10;
		const positionals = args.filter((a) => !a.startsWith("-") && a !== nArg);

		const take = (content: string) =>
			content.split("\n").slice(0, n).join("\n");

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
