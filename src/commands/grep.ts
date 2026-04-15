import type { ShellModule } from "../types/commands";
import { parseArgs } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

export const grepCommand: ShellModule = {
	name: "grep",
	params: ["[-i] [-v] <pattern> [file...]"],
	run: ({ authUser, shell, cwd, args, stdin }) => {
		const { flags, positionals } = parseArgs(args, { flags: ["-i", "-v"] });
		const caseInsensitive = flags.has("-i");
		const invertMatch = flags.has("-v");
		const pattern = positionals[0];
		const files = positionals.slice(1);

		if (!pattern) {
			return { stderr: "grep: no pattern specified", exitCode: 1 };
		}

		let regex: RegExp;
		try {
			const flags = caseInsensitive ? "gmi" : "gm";
			regex = new RegExp(pattern, flags);
		} catch {
			return { stderr: `grep: invalid regex: ${pattern}`, exitCode: 1 };
		}

		const results: string[] = [];

		if (files.length === 0) {
			if (!stdin) {
				return { stdout: "", exitCode: 1 };
			}

			const lines = stdin.split("\n");
			for (const line of lines) {
				regex.lastIndex = 0;
				const matches = regex.test(line);
				const shouldInclude = invertMatch ? !matches : matches;

				if (shouldInclude) {
					results.push(line);
				}
			}

			return {
				stdout: results.length > 0 ? results.join("\n") : "",
				exitCode: results.length > 0 ? 0 : 1,
			};
		}

		for (const file of files) {
			const target = resolvePath(cwd, file);
			try {
				assertPathAccess(authUser, target, "grep");
				const content = shell.vfs.readFile(target);
				const lines = content.split("\n");

				for (const line of lines) {
					regex.lastIndex = 0;
					const matches = regex.test(line);
					const shouldInclude = invertMatch ? !matches : matches;

					if (shouldInclude) {
						results.push(line);
					}
				}
			} catch {
				return {
					stderr: `grep: ${file}: No such file or directory`,
					exitCode: 1,
				};
			}
		}

		return {
			stdout: results.length > 0 ? results.join("\n") : "",
			exitCode: results.length > 0 ? 0 : 1,
		};
	},
};
