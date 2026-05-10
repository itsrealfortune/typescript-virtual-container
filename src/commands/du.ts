import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { resolvePath } from "./helpers";

export const duCommand: ShellModule = {
	name: "du",
	description: "Estimate file space usage",
	category: "system",
	params: ["[-h] [-s] [path]"],
	run: ({ shell, cwd, args }) => {
		const human = ifFlag(args, ["-h"]);
		const summary = ifFlag(args, ["-s"]);
		const target = args.find((a) => !a.startsWith("-")) ?? ".";
		const p = resolvePath(cwd, target);

		const fmt = (b: number) =>
			human ? `${(b / 1024).toFixed(1)}K` : String(Math.ceil(b / 1024));

		if (!shell.vfs.exists(p))
			return {
				stderr: `du: ${target}: No such file or directory`,
				exitCode: 1,
			};

		if (summary || shell.vfs.stat(p).type === "file") {
			return {
				stdout: `${fmt(shell.vfs.getUsageBytes(p))}\t${target}`,
				exitCode: 0,
			};
		}

		const lines: string[] = [];
		const walk = (dir: string, rel: string) => {
			let total = 0;
			for (const e of shell.vfs.list(dir)) {
				const full = `${dir}/${e}`,
					r = `${rel}/${e}`;
				const st = shell.vfs.stat(full);
				if (st.type === "directory") total += walk(full, r);
				else {
					total += st.size;
					if (!summary) lines.push(`${fmt(st.size)}\t${r}`);
				}
			}
			lines.push(`${fmt(total)}\t${rel}`);
			return total;
		};
		walk(p, target);
		return { stdout: lines.join("\n"), exitCode: 0 };
	},
};
