import type { ShellModule } from "../../types/commands";
import { getArg, ifFlag } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

export const grepCommand: ShellModule = {
	name: "grep",
	params: ["[-i] [-v] <pattern> [file...]"],
	run: ({ authUser, vfs, cwd, args, stdin }) => {
		const caseInsensitive = ifFlag(args, "-i");
		const invertMatch = ifFlag(args, "-v");
		const parserOptions = { flags: ["-i", "-v"] };
		const pattern = getArg(args, 0, parserOptions);
		const files: string[] = [];
		for (let index = 1; ; index += 1) {
			const file = getArg(args, index, parserOptions);
			if (!file) {
				break;
			}
			files.push(file);
		}

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

		// If no files specified, read from stdin (pipe/input redirection).
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
				const content = vfs.readFile(target);
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
