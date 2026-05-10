import type { ShellModule } from "../types/commands";
import { parseArgs } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

/**
 * Search for a regex pattern in files or stdin with common flags.
 * @category text
 * @params ["[-i] [-v] [-n] [-r] <pattern> [file...]"]
 */
export const grepCommand: ShellModule = {
	name: "grep",
	description: "Search text patterns",
	category: "text",
	params: ["[-i] [-v] [-n] [-r] <pattern> [file...]"],
	run: ({ authUser, shell, cwd, args, stdin }) => {
		const { flags, positionals } = parseArgs(args, {
			flags: ["-i", "-v", "-n", "-r"],
		});
		const caseInsensitive = flags.has("-i");
		const invertMatch = flags.has("-v");
		const showLineNumbers = flags.has("-n");
		const recursive = flags.has("-r");
		const pattern = positionals[0];
		const files = positionals.slice(1);

		if (!pattern) {
			return { stderr: "grep: no pattern specified", exitCode: 1 };
		}

		let regex: RegExp;
		try {
			// No "g" flag — avoids the stateful lastIndex problem with regex.test()
			const regexFlags = caseInsensitive ? "mi" : "m";
			regex = new RegExp(pattern, regexFlags);
		} catch {
			return { stderr: `grep: invalid regex: ${pattern}`, exitCode: 1 };
		}

		const matchLines = (content: string, prefix = ""): string[] => {
			const lines = content.split("\n");
			const out: string[] = [];
			for (let i = 0; i < lines.length; i++) {
				const line = lines[i] ?? "";
				const matches = regex.test(line);
				const shouldInclude = invertMatch ? !matches : matches;
				if (shouldInclude) {
					const lineLabel = showLineNumbers ? `${i + 1}:` : "";
					out.push(`${prefix}${lineLabel}${line}`);
				}
			}
			return out;
		};

		const readPaths = (base: string): string[] => {
			if (!shell.vfs.exists(base)) return [];
			const stat = shell.vfs.stat(base);
			if (stat.type === "file") return [base];
			if (!recursive) return [];
			const paths: string[] = [];
			const walk = (dir: string) => {
				for (const entry of shell.vfs.list(dir)) {
					const full = `${dir}/${entry}`;
					const s = shell.vfs.stat(full);
					if (s.type === "file") paths.push(full);
					else walk(full);
				}
			};
			walk(base);
			return paths;
		};

		const results: string[] = [];

		if (files.length === 0) {
			if (!stdin) return { stdout: "", exitCode: 1 };
			results.push(...matchLines(stdin));
		} else {
			const resolvedPaths = files.flatMap((f) => {
				const target = resolvePath(cwd, f);
				return readPaths(target).map((p) => ({ file: f, path: p }));
			});

			for (const { file, path: filePath } of resolvedPaths) {
				try {
					assertPathAccess(authUser, filePath, "grep");
					const content = shell.vfs.readFile(filePath);
					const prefix = resolvedPaths.length > 1 ? `${file}:` : "";
					results.push(...matchLines(content, prefix));
				} catch {
					return {
						stderr: `grep: ${file}: No such file or directory`,
						exitCode: 1,
					};
				}
			}
		}

		return {
			stdout: results.length > 0 ? results.join("\n") : "",
			exitCode: results.length > 0 ? 0 : 1,
		};
	},
};
