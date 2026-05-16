import { createHash } from "node:crypto";
import * as path from "node:path";
import type { ShellModule } from "../types/commands";
import { parseArgs } from "./command-helpers";
import { resolvePath } from "./helpers";

export const realpathCommand: ShellModule = {
	name: "realpath",
	description: "Resolve symlinks and print absolute path",
	category: "files",
	params: ["<path>"],
	run: ({ shell, cwd, args }) => {
		const target = args.find((a) => !a.startsWith("-"));
		if (!target) return { stderr: "realpath: missing operand\n", exitCode: 1 };
		const p = resolvePath(cwd, target);
		if (!shell.vfs.exists(p)) {
			return { stderr: `realpath: ${target}: No such file or directory\n`, exitCode: 1 };
		}
		const resolved = shell.vfs.isSymlink(p)
			? shell.vfs.resolveSymlink(p)
			: p;
		return { stdout: path.posix.normalize(resolved) + "\n", exitCode: 0 };
	},
};

export const md5sumCommand: ShellModule = {
	name: "md5sum",
	description: "Compute MD5 hash of a file",
	category: "text",
	params: ["<file>"],
	run: ({ shell, cwd, args }) => {
		const fileArg = args.find((a) => !a.startsWith("-"));
		if (!fileArg) return { stderr: "md5sum: missing file operand\n", exitCode: 1 };
		const p = resolvePath(cwd, fileArg);
		if (!shell.vfs.exists(p)) {
			return { stderr: `md5sum: ${fileArg}: No such file or directory\n`, exitCode: 1 };
		}
		const content = shell.vfs.readFile(p);
		const hash = createHash("md5").update(content).digest("hex");
		return { stdout: `${hash}  ${fileArg}\n`, exitCode: 0 };
	},
};

export const sha256sumCommand: ShellModule = {
	name: "sha256sum",
	description: "Compute SHA256 hash of a file",
	category: "text",
	params: ["<file>"],
	run: ({ shell, cwd, args }) => {
		const fileArg = args.find((a) => !a.startsWith("-"));
		if (!fileArg) return { stderr: "sha256sum: missing file operand\n", exitCode: 1 };
		const p = resolvePath(cwd, fileArg);
		if (!shell.vfs.exists(p)) {
			return { stderr: `sha256sum: ${fileArg}: No such file or directory\n`, exitCode: 1 };
		}
		const content = shell.vfs.readFile(p);
		const hash = createHash("sha256").update(content).digest("hex");
		return { stdout: `${hash}  ${fileArg}\n`, exitCode: 0 };
	},
};

export const stringsCommand: ShellModule = {
	name: "strings",
	description: "Find printable strings in a file",
	category: "text",
	params: ["<file>"],
	run: ({ shell, cwd, args }) => {
		const fileArg = args.find((a) => !a.startsWith("-"));
		if (!fileArg) return { stderr: "strings: missing file operand\n", exitCode: 1 };
		const p = resolvePath(cwd, fileArg);
		if (!shell.vfs.exists(p)) {
			return { stderr: `strings: ${fileArg}: No such file or directory\n`, exitCode: 1 };
		}
		const buf = shell.vfs.readFileRaw(p);
		let current = "";
		const results: string[] = [];
		for (let i = 0; i < buf.length; i++) {
			const ch = buf[i]!;
			if (ch >= 32 && ch <= 126) {
				current += String.fromCharCode(ch);
			} else {
				if (current.length >= 4) results.push(current);
				current = "";
			}
		}
		if (current.length >= 4) results.push(current);
		return { stdout: results.join("\n") + "\n", exitCode: 0 };
	},
};

export const foldCommand: ShellModule = {
	name: "fold",
	description: "Wrap lines to a specified width",
	category: "text",
	params: ["[-w width] <file>"],
	run: ({ shell, cwd, args, stdin }) => {
		const { flagsWithValues, positionals } = parseArgs(args, {
			flagsWithValue: ["-w"],
		});
		const width = parseInt(flagsWithValues.get("-w") || "80", 10);
		const fileArg = positionals[0];

		let input: string | undefined;
		if (fileArg) {
			const p = resolvePath(cwd, fileArg);
			if (!shell.vfs.exists(p)) {
				return { stderr: `fold: ${fileArg}: No such file or directory\n`, exitCode: 1 };
			}
			input = shell.vfs.readFile(p);
		} else {
			input = stdin;
		}

		if (!input) return { exitCode: 0 };

		const lines = input.split("\n");
		const folded = lines.map((line) => {
			if (line.length <= width) return line;
			const parts: string[] = [];
			for (let i = 0; i < line.length; i += width) {
				parts.push(line.slice(i, i + width));
			}
			return parts.join("\n");
		});
		return { stdout: folded.join("\n"), exitCode: 0 };
	},
};

export const expandCommand: ShellModule = {
	name: "expand",
	description: "Convert tabs to spaces",
	category: "text",
	params: ["[-t tabs] <file>"],
	run: ({ shell, cwd, args, stdin }) => {
		const { flagsWithValues, positionals } = parseArgs(args, {
			flagsWithValue: ["-t", "--tabs"],
		});
		const tabstop = parseInt(flagsWithValues.get("-t") || flagsWithValues.get("--tabs") || "8", 10);
		const fileArg = positionals[0];

		let input: string | undefined;
		if (fileArg) {
			const p = resolvePath(cwd, fileArg);
			if (!shell.vfs.exists(p)) {
				return { stderr: `expand: ${fileArg}: No such file or directory\n`, exitCode: 1 };
			}
			input = shell.vfs.readFile(p);
		} else {
			input = stdin;
		}

		if (!input) return { exitCode: 0 };

		const expanded = input.replace(/\t/g, " ".repeat(tabstop));
		return { stdout: expanded, exitCode: 0 };
	},
};

export const fmtCommand: ShellModule = {
	name: "fmt",
	description: "Simple text formatter",
	category: "text",
	params: ["[-w width] <file>"],
	run: ({ shell, cwd, args, stdin }) => {
		const { flagsWithValues, positionals } = parseArgs(args, {
			flagsWithValue: ["-w"],
		});
		const width = parseInt(flagsWithValues.get("-w") || "75", 10);
		const fileArg = positionals[0];

		let input: string | undefined;
		if (fileArg) {
			const p = resolvePath(cwd, fileArg);
			if (!shell.vfs.exists(p)) {
				return { stderr: `fmt: ${fileArg}: No such file or directory\n`, exitCode: 1 };
			}
			input = shell.vfs.readFile(p);
		} else {
			input = stdin;
		}

		if (!input) return { exitCode: 0 };

		const words = input.replace(/\n/g, " ").split(/\s+/).filter(Boolean);
		const lines: string[] = [];
		let current = "";
		for (const word of words) {
			if (current.length + word.length + (current ? 1 : 0) > width) {
				if (current) lines.push(current);
				current = word;
			} else {
				current = current ? `${current} ${word}` : word;
			}
		}
		if (current) lines.push(current);
		return { stdout: lines.join("\n") + "\n", exitCode: 0 };
	},
};
