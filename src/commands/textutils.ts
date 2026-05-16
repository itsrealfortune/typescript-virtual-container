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

		if (!file1 || !file2) {
			return { stderr: "join: missing operand\n", exitCode: 1 };
		}

		const p1 = resolvePath(cwd, file1);
		const p2 = resolvePath(cwd, file2);

		if (!shell.vfs.exists(p1) || !shell.vfs.exists(p2)) {
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

		return { stdout: results.join("\n") + "\n", exitCode: 0 };
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

		if (!file1 || !file2) {
			return { stderr: "comm: missing operand\n", exitCode: 1 };
		}

		const p1 = resolvePath(cwd, file1);
		const p2 = resolvePath(cwd, file2);

		if (!shell.vfs.exists(p1) || !shell.vfs.exists(p2)) {
			return { stderr: "comm: No such file\n", exitCode: 1 };
		}

		const lines1 = shell.vfs.readFile(p1).split("\n");
		const lines2 = shell.vfs.readFile(p2).split("\n");
		if (lines1[lines1.length - 1] === "") lines1.pop();
		if (lines2[lines2.length - 1] === "") lines2.pop();

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
			const col1 = i < only1.length ? only1[i]! : "";
			const col2 = i < only2.length ? only2[i]! : "";
			const col3 = i < both.length ? both[i]! : "";
			results.push(`${col1}\t${col2}\t${col3}`);
		}

		return { stdout: results.join("\n") + "\n", exitCode: 0 };
	},
};

/**
 * Split a file into pieces
 * @category text
 * @params ["[-l lines] [-b bytes] <file> [prefix]"]
 */
export const splitCommand: ShellModule = {
	name: "split",
	description: "Split a file into pieces",
	category: "text",
	params: ["[-l lines] [-b bytes] <file> [prefix]"],
	run: ({ authUser, shell, cwd, args }) => {
		const { flagsWithValues, positionals } = parseArgs(args, {
			flagsWithValue: ["-l", "-b"],
		});
		const linesPerFile = parseInt(flagsWithValues.get("-l") || "1000", 10);
		const bytesPerFile = flagsWithValues.has("-b") ? parseInt(flagsWithValues.get("-b")!, 10) : undefined;
		const fileArg = positionals[0];
		const prefix = positionals[1] || "x";

		if (!fileArg) {
			return { stderr: "split: missing file operand\n", exitCode: 1 };
		}

		const p = resolvePath(cwd, fileArg);
		if (!shell.vfs.exists(p)) {
			return { stderr: `split: ${fileArg}: No such file or directory\n`, exitCode: 1 };
		}

		const content = shell.vfs.readFile(p);

		if (bytesPerFile !== undefined) {
			let chunkIndex = 0;
			for (let i = 0; i < content.length; i += bytesPerFile) {
				const chunk = content.slice(i, i + bytesPerFile);
				const outPath = resolvePath(cwd, `${prefix}${alphaSuffix(chunkIndex)}`);
				shell.writeFileAsUser(authUser, outPath, chunk);
				chunkIndex++;
			}
			return { exitCode: 0 };
		}

		const allLines = content.split("\n");
		let chunkIndex = 0;
		for (let i = 0; i < allLines.length; i += linesPerFile) {
			const chunk = allLines.slice(i, i + linesPerFile).join("\n");
			const outPath = resolvePath(cwd, `${prefix}${alphaSuffix(chunkIndex)}`);
			shell.writeFileAsUser(authUser, outPath, chunk);
			chunkIndex++;
		}

		return { exitCode: 0 };
	},
};

/**
 * Split a file based on context patterns
 * @category text
 * @params ["<file> <pattern>..."]
 */
export const csplitCommand: ShellModule = {
	name: "csplit",
	description: "Split a file based on context patterns",
	category: "text",
	params: ["<file> <pattern>..."],
	run: () => {
		return { stderr: "csplit: not implemented\n", exitCode: 1 };
	},
};
