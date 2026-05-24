import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/** Paginate or columnate files for printing. */
export const prCommand: ShellModule = {
	name: "pr",
	description: "Paginate or columnate files for printing",
	category: "files",
	params: ["[options] [file...]"],
	run: ({ shell, args, stdin }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: pr [options] [file...]\n  -l <lines>  Page length (default: 66)\n  -h, --help  Show this help\n",
				exitCode: 0,
			};
		}

		const lIdx = args.indexOf("-l");
		const pageLen =
			lIdx !== -1 && lIdx + 1 < args.length ? Number(args[lIdx + 1]) : 66;
		const files = args.filter(
			(a) => !a.startsWith("-") && a !== args[lIdx + 1]
		);

		let data = "";
		if (files.length > 0) {
			for (const f of files) {
				if (!shell.vfs.exists(f)) {
					return { stderr: `pr: ${f}: No such file`, exitCode: 1 };
				}
				data += `${shell.vfs.readFile(f)}\n`;
			}
		} else if (stdin) {
			data = stdin;
		} else {
			return { stderr: "pr: missing file operand", exitCode: 1 };
		}

		const lines = data.split("\n");
		const result: string[] = [];
		const header = `${new Date().toUTCString()}  Page 1`;

		for (let i = 0; i < lines.length; i += pageLen - 3) {
			result.push(`\n\n${header}\n\n`);
			const chunk = lines.slice(i, i + pageLen - 3);
			result.push(chunk.join("\n"));
		}

		return { stdout: `${result.join("")}\n`, exitCode: 0 };
	},
};
