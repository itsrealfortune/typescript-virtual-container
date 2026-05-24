import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

export const odCommand: ShellModule = {
	name: "od",
	description: "Dump files in octal and other formats",
	category: "files",
	params: ["[-t type] [file...]"],
	run: ({ shell, args, stdin }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: od [-t type] [file...]\n  -t a    Named characters\n  -t c    ASCII characters\n  -t o    Octal (default)\n  -t x    Hex\n  -t u    Unsigned decimal\n  -h, --help  Show this help\n",
				exitCode: 0,
			};
		}

		const files = args.filter((a) => !a.startsWith("-") && a !== "-t");
		const tIdx = args.indexOf("-t");
		const type = tIdx !== -1 && tIdx + 1 < args.length ? args[tIdx + 1]! : "o";

		let data = "";
		if (files.length > 0) {
			if (!shell.vfs.exists(files[0]!)) {
				return { stderr: `od: ${files[0]}: No such file`, exitCode: 1 };
			}
			data = shell.vfs.readFile(files[0]!);
		} else if (stdin) {
			data = stdin;
		} else {
			return { stderr: "od: missing operand", exitCode: 1 };
		}

		const lines: string[] = [];
		const bytes = Buffer.from(data);
		const bytesPerLine = 16;

		for (let offset = 0; offset < bytes.length; offset += bytesPerLine) {
			const addr = offset.toString(7).padStart(7, "0");
			const chunk = bytes.slice(offset, offset + bytesPerLine);
			const values: string[] = [];

			if (type === "a") {
				for (const b of chunk) {
					values.push(b >= 32 && b <= 126 ? String.fromCharCode(b) : ".");
				}
				lines.push(`${addr} ${values.join(" ")}`);
			} else if (type === "c") {
				for (const b of chunk) {
					const c =
						b >= 32 && b <= 126 ? String.fromCharCode(b) : `\\${b.toString(8)}`;
					values.push(c);
				}
				lines.push(`${addr} ${values.join(" ")}`);
			} else if (type === "x") {
				for (const b of chunk) {
					values.push(b.toString(16).padStart(2, "0"));
				}
				lines.push(`${addr} ${values.join(" ")}`);
			} else if (type === "u") {
				for (const b of chunk) {
					values.push(String(b).padStart(3));
				}
				lines.push(`${addr} ${values.join(" ")}`);
			} else {
				for (const b of chunk) {
					values.push(b.toString(8).padStart(3, "0"));
				}
				lines.push(`${addr} ${values.join(" ")}`);
			}
		}

		return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
	},
};
