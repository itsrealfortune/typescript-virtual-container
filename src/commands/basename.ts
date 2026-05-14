import type { ShellModule } from "../types/commands";

/**
 * Return filename or directory portion of pathname.
 * @category text
 * @params ["<path> [suffix]"]
 */
export const basenameCommand: ShellModule = {
	name: "basename",
	description: "Strip directory and suffix from filenames",
	category: "text",
	params: ["<path> [suffix]"],
	run: ({ args }) => {
		if (!args[0]) return { stderr: "basename: missing operand", exitCode: 1 };
		const results: string[] = [];
		// basename can take multiple paths with -a
		const paths = args[0] === "-a" ? args.slice(1) : [args[0]];
		const suffix = args[0] === "-a" ? undefined : args[1];
		for (const p of paths) {
			let base = p.replace(/\/+$/, "").split("/").at(-1) ?? p;
			if (suffix && base.endsWith(suffix)) base = base.slice(0, -suffix.length);
			results.push(base);
		}
		return { stdout: results.join("\n"), exitCode: 0 };
	},
};

/**
 * Return directory portion of pathname.
 * @category text
 * @params ["<path>"]
 */
export const dirnameCommand: ShellModule = {
	name: "dirname",
	description: "Strip last component from file name",
	category: "text",
	params: ["<path>"],
	run: ({ args }) => {
		if (!args[0]) return { stderr: "dirname: missing operand", exitCode: 1 };
		const p = args[0].replace(/\/+$/, "");
		const idx = p.lastIndexOf("/");
		const dir = idx <= 0 ? (idx === 0 ? "/" : ".") : p.slice(0, idx);
		return { stdout: dir, exitCode: 0 };
	},
};
