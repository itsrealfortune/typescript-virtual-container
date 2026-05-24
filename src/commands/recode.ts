import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/** Convert character encoding of files. */
export const recodeCommand: ShellModule = {
	name: "recode",
	description: "Convert character encoding of files",
	category: "files",
	params: ["<charset1>..<charset2> [file]"],
	run: ({ shell, args, stdin }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: recode <charset1>..<charset2> [file]\n  -h, --help  Show this help\n  -l          List known charsets\n",
				exitCode: 0,
			};
		}

		if (ifFlag(args, ["-l"])) {
			return { stdout: "UTF-8 ASCII ISO-8859-1 CP1252 KOI8-R\n", exitCode: 0 };
		}

		const spec = args.find((a) => a.includes(".."));
		if (!spec) {
			return { stderr: "recode: missing charset specification", exitCode: 1 };
		}

		const file = args.find((a) => !(a.startsWith("-") || a.includes("..")));

		let data = "";
		if (file) {
			if (!shell.vfs.exists(file)) {
				return { stderr: `recode: ${file}: No such file`, exitCode: 1 };
			}
			data = shell.vfs.readFile(file);
		} else if (stdin) {
			data = stdin;
		} else {
			return { stderr: "recode: missing file operand", exitCode: 1 };
		}

		return { stdout: data, exitCode: 0 };
	},
};
