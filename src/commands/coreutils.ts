import type { ShellModule } from "../types/commands";

/**
 * timeout — run command with time limit (simulated: just runs the command)
 * @category shell
 * @params ["<duration> <command> [args...]"]
 */
export const timeoutCommand: ShellModule = {
	name: "timeout",
	description: "Run command with time limit",
	category: "shell",
	params: ["<duration>", "<command>", "[args...]"],
	run: async ({ args, authUser, hostname, mode, cwd, shell, env, stdin }) => {
		// First arg is duration (ignored in simulation), rest is the command
		if (args.length < 2) return { stderr: "timeout: missing operand", exitCode: 1 };
		const { runCommand } = await import("./runtime");
		const cmd = args.slice(1).join(" ");
		return runCommand(cmd, authUser, hostname, mode, cwd, shell, stdin, env);
	},
};

/**
 * mktemp — create a temporary file or directory
 * @category shell
 * @params ["[TEMPLATE]"]
 */
export const mktempCommand: ShellModule = {
	name: "mktemp",
	description: "Create a temporary file or directory",
	category: "shell",
	params: ["[-d]", "[TEMPLATE]"],
	run: ({ args, shell }) => {
		const isDir = args.includes("-d");
		const templateArg = args.find((a) => !a.startsWith("-")) ?? "tmp.XXXXXXXXXX";
		const suffix = templateArg.replace(/X+$/, "") || "tmp.";
		const rand = Math.random().toString(36).slice(2, 10);
		const name = `${suffix}${rand}`;
		const path = name.startsWith("/") ? name : `/tmp/${name}`;

		try {
			if (!shell.vfs.exists("/tmp")) shell.vfs.mkdir("/tmp");
			if (isDir) {
				shell.vfs.mkdir(path);
			} else {
				shell.vfs.writeFile(path, "");
			}
		} catch {
			return { stderr: `mktemp: failed to create ${isDir ? "directory" : "file"} via template '${templateArg}'`, exitCode: 1 };
		}
		return { stdout: path, exitCode: 0 };
	},
};

/**
 * nproc — print number of processing units
 * @category system
 * @params ["[--all]"]
 */
export const nprocCommand: ShellModule = {
	name: "nproc",
	description: "Print number of processing units",
	category: "system",
	params: ["[--all]"],
	run: () => ({ stdout: "4", exitCode: 0 }),
};

/**
 * wait — wait for background jobs (no-op: background jobs are fire-and-forget)
 * @category shell
 * @params ["[job_id...]"]
 */
export const waitCommand: ShellModule = {
	name: "wait",
	description: "Wait for background jobs to finish",
	category: "shell",
	params: ["[job_id...]"],
	run: () => ({ exitCode: 0 }),
};

/**
 * shuf — shuffle lines of input
 * @category text
 * @params ["[-n count] [-i lo-hi] [file]"]
 */
export const shufCommand: ShellModule = {
	name: "shuf",
	description: "Shuffle lines of input randomly",
	category: "text",
	params: ["[-n count]", "[-i lo-hi]", "[file]"],
	run: ({ args, stdin, shell, cwd }) => {
		const { resolvePath } = require("./helpers") as typeof import("./helpers");

		// -i lo-hi: generate range
		const iIdx = args.indexOf("-i");
		if (iIdx !== -1) {
			const range = args[iIdx + 1] ?? "";
			const m = range.match(/^(-?\d+)-(-?\d+)$/);
			if (!m) return { stderr: "shuf: invalid range", exitCode: 1 };
			const lo = parseInt(m[1]!, 10);
			const hi = parseInt(m[2]!, 10);
			const nums: number[] = [];
			for (let n = lo; n <= hi; n++) nums.push(n);
			for (let i = nums.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[nums[i], nums[j]] = [nums[j]!, nums[i]!];
			}
			const nIdx = args.indexOf("-n");
			const count = nIdx !== -1 ? parseInt(args[nIdx + 1] ?? "0", 10) : nums.length;
			return { stdout: nums.slice(0, count).join("\n"), exitCode: 0 };
		}

		// file or stdin
		let input = stdin ?? "";
		const fileArg = args.find((a) => !a.startsWith("-"));
		if (fileArg) {
			const p = resolvePath(cwd ?? "/", fileArg);
			if (!shell.vfs.exists(p)) return { stderr: `shuf: ${fileArg}: No such file or directory`, exitCode: 1 };
			input = shell.vfs.readFile(p);
		}
		const lines = input.split("\n").filter((l) => l !== "");
		for (let i = lines.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[lines[i], lines[j]] = [lines[j]!, lines[i]!];
		}
		const nIdx = args.indexOf("-n");
		const count = nIdx !== -1 ? parseInt(args[nIdx + 1] ?? "0", 10) : lines.length;
		return { stdout: lines.slice(0, count).join("\n"), exitCode: 0 };
	},
};

/**
 * paste — merge lines of files side by side
 * @category text
 * @params ["[-d delimiter] file..."]
 */
export const pasteCommand: ShellModule = {
	name: "paste",
	description: "Merge lines of files",
	category: "text",
	params: ["[-d delimiter]", "file..."],
	run: ({ args, stdin, shell, cwd }) => {
		const { resolvePath } = require("./helpers") as typeof import("./helpers");

		let delim = "\t";
		const files: string[] = [];
		let i = 0;
		while (i < args.length) {
			if (args[i] === "-d" && args[i + 1]) { delim = args[i + 1]!; i += 2; }
			else { files.push(args[i]!); i++; }
		}

		// serial mode (-s not implemented; basic merge)
		let sources: string[][];
		if (files.length === 0 || files[0] === "-") {
			sources = [(stdin ?? "").split("\n")];
		} else {
			sources = files.map((f) => {
				const p = resolvePath(cwd ?? "/", f);
				if (!shell.vfs.exists(p)) return [];
				return shell.vfs.readFile(p).split("\n");
			});
		}
		const maxLen = Math.max(...sources.map((s) => s.length));
		const out: string[] = [];
		for (let row = 0; row < maxLen; row++) {
			out.push(sources.map((s) => s[row] ?? "").join(delim));
		}
		return { stdout: out.join("\n"), exitCode: 0 };
	},
};

/**
 * tac — concatenate files in reverse (line order)
 * @category text
 * @params ["[file...]"]
 */
export const tacCommand: ShellModule = {
	name: "tac",
	description: "Concatenate files in reverse line order",
	category: "text",
	params: ["[file...]"],
	run: ({ args, stdin, shell, cwd }) => {
		const { resolvePath } = require("./helpers") as typeof import("./helpers");

		let input = "";
		if (args.length === 0 || (args.length === 1 && args[0] === "-")) {
			input = stdin ?? "";
		} else {
			for (const f of args) {
				const p = resolvePath(cwd ?? "/", f);
				if (!shell.vfs.exists(p)) return { stderr: `tac: ${f}: No such file or directory`, exitCode: 1 };
				input += shell.vfs.readFile(p);
			}
		}
		const lines = input.split("\n");
		// preserve trailing newline behaviour
		if (lines[lines.length - 1] === "") lines.pop();
		return { stdout: lines.reverse().join("\n"), exitCode: 0 };
	},
};

/**
 * nl — number lines of files
 * @category text
 * @params ["[file]"]
 */
export const nlCommand: ShellModule = {
	name: "nl",
	description: "Number lines of files",
	category: "text",
	params: ["[-ba] [-nrz] [file]"],
	run: ({ args, stdin, shell, cwd }) => {
		const { resolvePath } = require("./helpers") as typeof import("./helpers");

		const fileArg = args.find((a) => !a.startsWith("-"));
		let input = stdin ?? "";
		if (fileArg) {
			const p = resolvePath(cwd ?? "/", fileArg);
			if (!shell.vfs.exists(p)) return { stderr: `nl: ${fileArg}: No such file or directory`, exitCode: 1 };
			input = shell.vfs.readFile(p);
		}
		const lines = input.split("\n");
		if (lines[lines.length - 1] === "") lines.pop();
		let n = 1;
		const out = lines.map((l) => {
			if (l.trim() === "") return `\t${l}`;
			return `${String(n++).padStart(6)}\t${l}`;
		});
		return { stdout: out.join("\n"), exitCode: 0 };
	},
};

/**
 * column — columnate lists
 * @category text
 * @params ["[-t] [-s sep] [file]"]
 */
export const columnCommand: ShellModule = {
	name: "column",
	description: "Columnate lists",
	category: "text",
	params: ["[-t]", "[-s sep]", "[file]"],
	run: ({ args, stdin, shell, cwd }) => {
		const { resolvePath } = require("./helpers") as typeof import("./helpers");

		const tableMode = args.includes("-t");
		const sIdx = args.indexOf("-s");
		const sep = sIdx !== -1 ? (args[sIdx + 1] ?? "\t") : /\s+/;
		const fileArg = args.find((a) => !a.startsWith("-") && a !== args[sIdx + 1]);
		let input = stdin ?? "";
		if (fileArg) {
			const p = resolvePath(cwd ?? "/", fileArg);
			if (!shell.vfs.exists(p)) return { stderr: `column: ${fileArg}: No such file or directory`, exitCode: 1 };
			input = shell.vfs.readFile(p);
		}
		const lines = input.split("\n").filter((l) => l !== "");

		if (tableMode) {
			const rows = lines.map((l) => (typeof sep === "string" ? l.split(sep) : l.split(sep)));
			const colWidths: number[] = [];
			for (const row of rows) {
				row.forEach((cell, ci) => {
					colWidths[ci] = Math.max(colWidths[ci] ?? 0, cell.length);
				});
			}
			const out = rows.map((row) =>
				row.map((cell, ci) => cell.padEnd(colWidths[ci] ?? 0)).join("  ").trimEnd(),
			);
			return { stdout: out.join("\n"), exitCode: 0 };
		}

		// Default: fill columns (simple: just output as-is)
		return { stdout: lines.join("\n"), exitCode: 0 };
	},
};
