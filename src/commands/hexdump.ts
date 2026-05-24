import type {ShellModule} from "../types/commands";
import {ifFlag} from "./command-helpers";

export const hexdumpCommand: ShellModule = {
	name: "hexdump",
	description: "Display file contents in hexadecimal",
	category: "files",
	params: ["[-C] [file...]"],
	run: ({shell, args, stdin}) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: hexdump [-C] [file...]\n  -C  Canonical hex+ASCII display\n  -h, --help  Show this help\n",
				exitCode: 0,
			};
		}

		const canonical = ifFlag(args, ["-C"]);
		const files = args.filter((a) => !a.startsWith("-"));

		let data = "";
		if (files.length > 0) {
			if (!shell.vfs.exists(files[0]!)) {
				return {stderr: `hexdump: ${files[0]}: No such file`, exitCode: 1};
			}
			data = shell.vfs.readFile(files[0]!);
		} else if (stdin) {
			data = stdin;
		} else {
			return {stderr: "hexdump: missing operand", exitCode: 1};
		}

		const bytes = Buffer.from(data);
		const lines: string[] = [];
		const bpl = canonical ? 16 : 16;

		for (let offset = 0; offset < bytes.length; offset += bpl) {
			const chunk = bytes.slice(offset, offset + bpl);
			const hex = Array.from(chunk)
				.map((b) => b.toString(16).padStart(2, "0"))
				.join(" ");

			if (canonical) {
				const ascii = Array.from(chunk)
					.map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : "."))
					.join("");
				const addr = offset.toString(8).padStart(8, "0");
				lines.push(`${addr}  ${hex.padEnd(47)}  |${ascii}|`);
			} else {
				lines.push(hex);
			}
		}

		return {stdout: `${lines.join("\n")}\n`, exitCode: 0};
	},
};
