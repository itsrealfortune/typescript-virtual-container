import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

const PAGE_SIZE = 24;

export const moreCommand: ShellModule = {
	name: "more",
	description: "View file content page by page",
	category: "files",
	params: ["[options] [file...]"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: more [options] file...",
					"  -d               Show prompts with [Press space to continue]",
					"  -h, --help       Show this help",
					"",
					"View file content one screen at a time.",
				].join("\n"),
				exitCode: 0,
			};
		}

		const files = args.filter((a) => !a.startsWith("-"));

		if (files.length === 0) {
			if (!process.stdin.isTTY) {
				let input = "";
				const buf = process.stdin.read();
				if (buf) {
					input = buf.toString();
				}
				return { stdout: `${input}\n`, exitCode: 0 };
			}
			return { stderr: "more: missing file operand", exitCode: 1 };
		}

		const parts: string[] = [];
		for (const file of files) {
			if (!shell.vfs.exists(file)) {
				return { stderr: `more: ${file}: No such file`, exitCode: 1 };
			}
			const content = shell.vfs.readFile(file);
			parts.push(content);
		}

		const text = parts.join("\n\n");
		const allLines = text.split("\n");

		if (allLines.length <= PAGE_SIZE) {
			return { stdout: `${text}\n`, exitCode: 0 };
		}

		const result: string[] = [];
		for (let i = 0; i < allLines.length; i += PAGE_SIZE) {
			const chunk = allLines.slice(i, i + PAGE_SIZE);
			const pct = Math.min(
				100,
				Math.round(((i + PAGE_SIZE) / allLines.length) * 100)
			);
			result.push(chunk.join("\n"));
			if (i + PAGE_SIZE < allLines.length) {
				result.push(`\n--More--(${pct}%)`);
			}
		}

		return { stdout: `${result.join("\n")}\n`, exitCode: 0 };
	},
};
