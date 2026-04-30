import type { ShellModule } from "../types/commands";
import { getFlag } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

export const tailCommand: ShellModule = {
	name: "tail",
	params: ["[-n <lines>] [file...]"],
	run: ({ authUser, shell, cwd, args, stdin }) => {
		const nArg = getFlag(args, ["-n"]);
		const n = typeof nArg === "string" ? parseInt(nArg, 10) : 10;
		const positionals = args.filter((a) => !a.startsWith("-") && a !== nArg);

		const take = (content: string) => {
			const lines = content.split("\n");
			return lines.slice(Math.max(0, lines.length - n)).join("\n");
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
