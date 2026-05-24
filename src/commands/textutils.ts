import type { ShellModule } from "../types/commands";
import { parseArgs } from "./command-helpers";
import { resolvePath } from "./helpers";

function alphaSuffix(n: number): string {
	let result = "";
	let x = n;
	do {
		result = String.fromCharCode(97 + (x % 26)) + result;
		x = Math.floor(x / 26) - 1;
	} while (x >= 0);
	return result;
}

function numericSuffix(n: number, digits: number): string {
	return String(n).padStart(digits, "0");
}

/**
 * Join lines of two files on a common field
 * @category text
 * @params ["[-t sep] <file1> <file2>"]
 */
export const joinCommand: ShellModule = {
	name: "join",
	description: "Join lines of two files on a common field",
	category: "text",
	params: ["[-t sep] <file1> <file2>"],
	run: ({ shell, cwd, args }) => {
		const { flagsWithValues, positionals } = parseArgs(args, {
			flagsWithValue: ["-t"],
		});
		const separator = flagsWithValues.get("-t") || " \t";
		const [file1, file2] = positionals;

		if (!(file1 && file2)) {
			return { stderr: "join: missing operand\n", exitCode: 1 };
		}

		const p1 = resolvePath(cwd, file1);
		const p2 = resolvePath(cwd, file2);

		if (!(shell.vfs.exists(p1) && shell.vfs.exists(p2))) {
			return { stderr: "join: No such file\n", exitCode: 1 };
		}

		const lines1 = shell.vfs.readFile(p1).split("\n").filter(Boolean);
		const lines2 = shell.vfs.readFile(p2).split("\n").filter(Boolean);

		const sep = separator === " \t" ? /\s+/ : new RegExp(separator);
		const map1 = new Map<string, string>();
		for (const line of lines1) {
			const key = line.split(sep)[0] || line;
			map1.set(key, line);
		}

		const results: string[] = [];
		for (const line of lines2) {
			const key = line.split(sep)[0] || line;
			const match = map1.get(key);
			if (match) {
				results.push(`${match} ${line}`);
			}
		}

		return { stdout: `${results.join("\n")}\n`, exitCode: 0 };
	},
};

/**
 * Compare two sorted files line by line
 * @category text
 * @params ["<file1> <file2>"]
 */
export const commCommand: ShellModule = {
	name: "comm",
	description: "Compare two sorted files line by line",
	category: "text",
	params: ["<file1> <file2>"],
	run: ({ shell, cwd, args }) => {
		const positionals = args.filter((a) => !a.startsWith("-"));
		const [file1, file2] = positionals;

		if (!(file1 && file2)) {
			return { stderr: "comm: missing operand\n", exitCode: 1 };
		}

		const p1 = resolvePath(cwd, file1);
		const p2 = resolvePath(cwd, file2);

		if (!(shell.vfs.exists(p1) && shell.vfs.exists(p2))) {
			return { stderr: "comm: No such file\n", exitCode: 1 };
		}

		const lines1 = shell.vfs.readFile(p1).split("\n");
		const lines2 = shell.vfs.readFile(p2).split("\n");
		if (lines1[lines1.length - 1] === "") {
			lines1.pop();
		}
		if (lines2[lines2.length - 1] === "") {
			lines2.pop();
		}

		const set1 = new Set(lines1);
		const set2 = new Set(lines2);

		const only1: string[] = [];
		const only2: string[] = [];
		const both: string[] = [];

		for (const line of lines1) {
			if (set2.has(line)) {
				both.push(line);
			} else {
				only1.push(line);
			}
		}

		for (const line of lines2) {
			if (!set1.has(line)) {
				only2.push(line);
			}
		}

		const maxLen = Math.max(only1.length, only2.length, both.length);
		const results: string[] = [];
		for (let i = 0; i < maxLen; i++) {
			const col1 = i < only1.length ? (only1[i] as string) : "";
			const col2 = i < only2.length ? (only2[i] as string) : "";
			const col3 = i < both.length ? (both[i] as string) : "";
			results.push(`${col1}\t${col2}\t${col3}`);
		}

		return { stdout: `${results.join("\n")}\n`, exitCode: 0 };
	},
};

/**
 * Split a file into pieces
 * @category text
 * @params ["[-l lines] [-b bytes] [-d] [--additional-suffix suffix] <file> [prefix]"]
 */
export const splitCommand: ShellModule = {
	name: "split",
	description: "Split a file into pieces",
	category: "text",
	params: ["[-l lines] [-b bytes] [-d] [--additional-suffix suffix] <file> [prefix]"],
	run: ({ shell, cwd, args, uid, gid }) => {
		const { flags, flagsWithValues, positionals } = parseArgs(args, {
			flags: ["-d"],
			flagsWithValue: ["-l", "-b", "--additional-suffix"],
		});
		const linesPerFile = Number.parseInt(
			flagsWithValues.get("-l") || "1000",
			10
		);
		const bytesPerFile = flagsWithValues.has("-b")
			? Number.parseInt(flagsWithValues.get("-b") as string, 10)
			: undefined;
		const useNumeric = flags.has("-d");
		const suffix = flagsWithValues.get("--additional-suffix") ?? "";
		const fileArg = positionals[0];
		const prefix = positionals[1] || "x";

		if (!fileArg) {
			return { stderr: "split: missing file operand\n", exitCode: 1 };
		}

		const p = resolvePath(cwd, fileArg);
		if (!shell.vfs.exists(p)) {
			return {
				stderr: `split: ${fileArg}: No such file or directory\n`,
				exitCode: 1,
			};
		}

		const content = shell.vfs.readFile(p, uid, gid);

		const suffixGen = useNumeric
			? (n: number) => numericSuffix(n, 2)
			: alphaSuffix;

		if (bytesPerFile !== undefined) {
			let chunkIndex = 0;
			for (let i = 0; i < content.length; i += bytesPerFile) {
				const chunk = content.slice(i, i + bytesPerFile);
				const outPath = resolvePath(cwd, `${prefix}${suffixGen(chunkIndex)}${suffix}`);
				shell.vfs.writeFile(outPath, chunk, {}, uid, gid);
				chunkIndex++;
			}
			return { exitCode: 0 };
		}

		const allLines = content.split("\n");
		let chunkIndex = 0;
		for (let i = 0; i < allLines.length; i += linesPerFile) {
			const chunk = allLines.slice(i, i + linesPerFile).join("\n");
			const outPath = resolvePath(cwd, `${prefix}${suffixGen(chunkIndex)}${suffix}`);
			shell.vfs.writeFile(outPath, chunk, {}, uid, gid);
			chunkIndex++;
		}

		return { exitCode: 0 };
	},
};

/**
 * Split a file based on context patterns
 * @category text
 * @params ["[-f prefix] [-n digits] [-s] [-k] <file> <pattern>..."]
 */
export const csplitCommand: ShellModule = {
	name: "csplit",
	description: "Split a file based on context patterns",
	category: "text",
	params: ["[-f prefix] [-n digits] [-s] [-k] <file> <pattern>..."],
	run: ({ shell, cwd, args, uid, gid }) => {
		const { flags, flagsWithValues, positionals } = parseArgs(args, {
			flags: ["-s", "-k"],
			flagsWithValue: ["-f", "-n"],
		});
		const silent = flags.has("-s");
		const prefix = flagsWithValues.get("-f") ?? "xx";
		const digits = Number.parseInt(flagsWithValues.get("-n") ?? "2", 10);
		const fileArg = positionals[0];
		const patterns = positionals.slice(1);

		if (!fileArg) {
			return { stderr: "csplit: missing file operand\n", exitCode: 1 };
		}
		if (patterns.length === 0) {
			return { stderr: "csplit: missing pattern\n", exitCode: 1 };
		}

		const p = resolvePath(cwd, fileArg);
		if (!shell.vfs.exists(p)) {
			return {
				stderr: `csplit: ${fileArg}: No such file or directory\n`,
				exitCode: 1,
			};
		}

		const content = shell.vfs.readFile(p, uid, gid);
		const lines = content.split("\n");
		if (lines.length > 0 && lines[lines.length - 1] === "") {
			lines.pop();
		}

		type Pattern =
			| { kind: "regex"; regex: RegExp; repeat: number }
			| { kind: "lineno"; lineno: number };

		const parsedPatterns: Pattern[] = [];
		for (const pat of patterns) {
			if (/^\d+$/.test(pat)) {
				parsedPatterns.push({ kind: "lineno", lineno: Number.parseInt(pat, 10) });
			} else if (pat.startsWith("/") && pat.endsWith("/")) {
				const reBody = pat.slice(1, -1);
				try {
					parsedPatterns.push({ kind: "regex", regex: new RegExp(reBody), repeat: 1 });
				} catch {
					return { stderr: `csplit: invalid regex: ${pat}\n`, exitCode: 1 };
				}
			} else if (pat.startsWith("%") && pat.endsWith("%")) {
				// %regex% — suppress pattern (skip matched lines)
				const reBody = pat.slice(1, -1);
				try {
					new RegExp(reBody);
				} catch {
					return { stderr: `csplit: invalid regex: ${pat}\n`, exitCode: 1 };
				}
				parsedPatterns.push({ kind: "regex", regex: /$^/, repeat: 0 });
			} else if (pat.startsWith("/") && pat.includes("{")) {
				const braceStart = pat.indexOf("{");
				const reBody = pat.slice(1, braceStart - 1);
				const repeatStr = pat.slice(braceStart + 1, pat.indexOf("}", braceStart));
				const repeat = Number.parseInt(repeatStr, 10) || 1;
				try {
					parsedPatterns.push({
						kind: "regex",
						regex: new RegExp(reBody),
						repeat,
					});
				} catch {
					return { stderr: `csplit: invalid regex: ${pat}\n`, exitCode: 1 };
				}
			} else {
				return { stderr: `csplit: invalid pattern: ${pat}\n`, exitCode: 1 };
			}
		}

		const splitPoints = new Set<number>();
		for (const pat of parsedPatterns) {
			if (pat.kind === "lineno") {
				if (pat.lineno > 0 && pat.lineno <= lines.length) {
					splitPoints.add(pat.lineno - 1);
				}
			} else if (pat.kind === "regex" && pat.repeat > 0) {
				let count = 0;
				for (let i = 0; i < lines.length; i++) {
					if (pat.regex.test(lines[i] ?? "")) {
						splitPoints.add(i);
						count++;
						if (count >= pat.repeat) {
							break;
						}
					}
				}
			}
		}

		const sortedPoints = [...splitPoints].sort((a, b) => a - b);
		const outFiles: string[] = [];
		let prev = 0;
		let fileIndex = 0;

		for (const pt of sortedPoints) {
			if (pt <= prev) {
				continue;
			}
			const chunk = lines.slice(prev, pt).join("\n");
			const outName = `${prefix}${numericSuffix(fileIndex, digits)}`;
			const outPath = resolvePath(cwd, outName);
			shell.vfs.writeFile(outPath, chunk, {}, uid, gid);
			outFiles.push(outName);
			prev = pt;
			fileIndex++;
		}

		if (prev < lines.length) {
			const chunk = lines.slice(prev).join("\n");
			const outName = `${prefix}${numericSuffix(fileIndex, digits)}`;
			const outPath = resolvePath(cwd, outName);
			shell.vfs.writeFile(outPath, chunk, {}, uid, gid);
			outFiles.push(outName);
		}

		if (!silent) {
			const sizeReport = outFiles
				.map((f) => {
					const fp = resolvePath(cwd, f);
					try {
						const st = shell.vfs.stat(fp);
						return String(st.type === "file" ? st.size : 0);
					} catch {
						return "0";
					}
				})
				.join("\n");
			return { stdout: `${sizeReport}\n`, exitCode: 0 };
		}

		return { exitCode: 0 };
	},
};
