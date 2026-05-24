import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

export const xxdCommand: ShellModule = {
	name: "xxd",
	description: "Make a hexdump or reverse a hexdump",
	category: "files",
	params: ["[-r] [file]"],
	run: ({ shell, args, stdin }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: xxd [-r] [file]\n  -r  Reverse (hexdump back to binary)\n  -h, --help  Show this help\n",
				exitCode: 0,
			};
		}

		const reverse = ifFlag(args, ["-r"]);
		const file = args.find((a) => !a.startsWith("-"));

		let data: string;
		if (file) {
			if (!shell.vfs.exists(file)) {
				return { stderr: `xxd: ${file}: No such file`, exitCode: 1 };
			}
			data = shell.vfs.readFile(file);
		} else if (stdin) {
			data = stdin;
		} else {
			return { stderr: "xxd: missing operand", exitCode: 1 };
		}

		if (reverse) {
			return unHexdump(data);
		}

		return hexdump(data);
	},
};

function hexdump(data: string) {
	const bytes = Buffer.from(data);
	const lines: string[] = [];

	for (let offset = 0; offset < bytes.length; offset += 16) {
		const addr = offset.toString(16).padStart(8, "0");
		const chunk = bytes.slice(offset, offset + 16);
		const hex = Array.from(chunk)
			.map((b) => b.toString(16).padStart(2, "0"))
			.join(" ");
		const ascii = Array.from(chunk)
			.map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : "."))
			.join("");
		lines.push(`${addr}: ${hex.padEnd(47)} ${ascii}`);
	}

	return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
}

function unHexdump(data: string) {
	const bytes: number[] = [];
	for (const line of data.split("\n")) {
		const hexPart = line.replace(/^[0-9a-fA-F]+:\s*/, "").split(/\s+/);
		for (const h of hexPart) {
			if (h.length === 2 && /^[0-9a-fA-F]{2}$/.test(h)) {
				bytes.push(Number.parseInt(h, 16));
			}
		}
	}
	return { stdout: Buffer.from(bytes).toString("utf-8"), exitCode: 0 };
}
