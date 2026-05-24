import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

export const cmpCommand: ShellModule = {
	name: "cmp",
	description: "Compare two files byte by byte",
	category: "files",
	params: ["<file1> <file2>"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: cmp [-l] [-s] <file1> <file2>\n  -l  Print byte offsets\n  -s  Silent (exit code only)\n  -h, --help  Show this help\n",
				exitCode: 0,
			};
		}

		const files = args.filter((a) => !a.startsWith("-"));
		if (files.length < 2) {
			return { stderr: "cmp: missing file operand", exitCode: 2 };
		}

		const verbose = ifFlag(args, ["-l"]);
		const silent = ifFlag(args, ["-s"]);

		if (!shell.vfs.exists(files[0]!)) {
			return { stderr: `cmp: ${files[0]}: No such file`, exitCode: 2 };
		}
		if (!shell.vfs.exists(files[1]!)) {
			return { stderr: `cmp: ${files[1]}: No such file`, exitCode: 2 };
		}

		const a = shell.vfs.readFile(files[0]!);
		const b = shell.vfs.readFile(files[1]!);

		if (a === b) {
			return { stdout: "", exitCode: 0 };
		}

		if (silent) {
			return { stdout: "", exitCode: 1 };
		}

		const minLen = Math.min(a.length, b.length);
		for (let i = 0; i < minLen; i++) {
			if (a[i] !== b[i]) {
				const char = (c: string) => (c.length > 0 ? c.charCodeAt(0) : 0);
				if (verbose) {
					return {
						stdout: `${i + 1} ${char(a[i]!).toString(8)} ${char(b[i]!).toString(8)}\n`,
						exitCode: 1,
					};
				}
				return {
					stdout: `cmp: ${files[0]} ${files[1]} differ: byte ${i + 1}\n`,
					exitCode: 1,
				};
			}
		}

		if (a.length !== b.length) {
			return {
				stdout: `cmp: EOF on ${a.length < b.length ? files[0] : files[1]}\n`,
				exitCode: 1,
			};
		}

		return { stdout: "", exitCode: 0 };
	},
};
