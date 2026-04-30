import type { ShellModule } from "../types/commands";
import { resolvePath } from "./helpers";

export const diffCommand: ShellModule = {
	name: "diff",
	description: "Compare files line by line",
	category: "text",
	params: ["<file1> <file2>"],
	run: ({ shell, cwd, args }) => {
		const [f1, f2] = args;
		if (!f1 || !f2) return { stderr: "diff: missing operand", exitCode: 1 };
		const p1 = resolvePath(cwd, f1);
		const p2 = resolvePath(cwd, f2);
		let a: string[], b: string[];
		try { a = shell.vfs.readFile(p1).split("\n"); } catch { return { stderr: `diff: ${f1}: No such file or directory`, exitCode: 2 }; }
		try { b = shell.vfs.readFile(p2).split("\n"); } catch { return { stderr: `diff: ${f2}: No such file or directory`, exitCode: 2 }; }

		const out: string[] = [];
		const max = Math.max(a.length, b.length);
		for (let i = 0; i < max; i++) {
			const la = a[i]; const lb = b[i];
			if (la !== lb) {
				if (la !== undefined) out.push(`< ${la}`);
				if (lb !== undefined) out.push(`> ${lb}`);
			}
		}
		return { stdout: out.join("\n"), exitCode: out.length > 0 ? 1 : 0 };
	},
};
