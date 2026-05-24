import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

const PAGE_SIZE = 24;

/** View file content with pagination. */
export const lessCommand: ShellModule = {
	name: "less",
	description: "View file content with pagination",
	category: "files",
	params: ["[-N] [file...]"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: less [options] file...",
					"  -N, --line-numbers  Show line numbers",
					"  -h, --help          Show this help",
					"",
					"View file content with paginated output.",
				].join("\n"),
				exitCode: 0,
			};
		}

		const showLineNumbers = ifFlag(args, ["-N", "--line-numbers"]);
		const files = args.filter((a) => !a.startsWith("-"));

		if (files.length === 0) {
			return { stderr: "less: missing file operand", exitCode: 1 };
		}

		const parts: string[] = [];
		for (const file of files) {
			if (!shell.vfs.exists(file)) {
				return { stderr: `less: ${file}: No such file`, exitCode: 1 };
			}
			const content = shell.vfs.readFile(file);
			const lines = content.split("\n");

			if (showLineNumbers) {
				const lineWidth = String(lines.length).length;
				const numbered = lines.map(
					(l, i) => `${String(i + 1).padStart(lineWidth)}  ${l}`
				);
				parts.push(numbered.join("\n"));
			} else {
				parts.push(content);
			}
		}

		const text = parts.join("\n\n");
		const totalLines = text.split("\n").length;

		if (totalLines <= PAGE_SIZE) {
			return { stdout: `${text}\n`, exitCode: 0 };
		}

		const result: string[] = [];
		const allLines = text.split("\n");
		for (let i = 0; i < allLines.length; i += PAGE_SIZE) {
			const chunk = allLines.slice(i, i + PAGE_SIZE);
			const pct = Math.min(
				100,
				Math.round(((i + PAGE_SIZE) / totalLines) * 100)
			);
			result.push(chunk.join("\n"));
			if (i + PAGE_SIZE < allLines.length) {
				result.push(`\n--More--(${pct}%)`);
			}
		}

		return { stdout: `${result.join("\n")}\n(END)\n`, exitCode: 0 };
	},
};
