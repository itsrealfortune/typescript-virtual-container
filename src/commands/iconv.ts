import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

const CHARSET_MAP: Record<string, string> = {
	"utf-8": "utf8",
	utf8: "utf8",
	ascii: "ascii",
	latin1: "latin1",
	"latin-1": "latin1",
	"iso-8859-1": "latin1",
	ucs2: "ucs2",
	"ucs-2": "ucs2",
	utf16le: "ucs2",
	"utf-16le": "ucs2",
	base64: "base64",
	hex: "hex",
};

/** Convert text from one character encoding to another. */
export const iconvCommand: ShellModule = {
	name: "iconv",
	description: "Convert text from one character encoding to another",
	category: "files",
	params: ["-f <from> -t <to> [file]"],
	run: ({ shell, args, stdin }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: iconv -f <from> -t <to> [file]\n  -f <encoding>  Input encoding\n  -t <encoding>  Output encoding\n  -l             List known encodings\n  -h, --help     Show this help\n",
				exitCode: 0,
			};
		}

		if (ifFlag(args, ["-l"])) {
			return {
				stdout: `${Object.keys(CHARSET_MAP).sort().join("\n")}\n`,
				exitCode: 0,
			};
		}

		const fIdx = args.indexOf("-f");
		const tIdx = args.indexOf("-t");
		const fromEnc =
			fIdx !== -1 && fIdx + 1 < args.length ? args[fIdx + 1]! : "utf-8";
		const toEnc =
			tIdx !== -1 && tIdx + 1 < args.length ? args[tIdx + 1]! : "utf-8";

		const file = args.find(
			(a) => !a.startsWith("-") && a !== args[fIdx + 1] && a !== args[tIdx + 1]
		);

		let data = "";
		if (file) {
			if (!shell.vfs.exists(file)) {
				return { stderr: `iconv: ${file}: No such file`, exitCode: 1 };
			}
			data = shell.vfs.readFile(file);
		} else if (stdin) {
			data = stdin;
		} else {
			return { stderr: "iconv: missing operand", exitCode: 1 };
		}

		const from = CHARSET_MAP[fromEnc.toLowerCase()] ?? "utf8";
		const to = CHARSET_MAP[toEnc.toLowerCase()] ?? "utf8";

		try {
			const buf = Buffer.from(data, from as BufferEncoding);
			const result = buf.toString(to as BufferEncoding);
			return { stdout: result, exitCode: 0 };
		} catch {
			return {
				stderr: `iconv: conversion from ${fromEnc} to ${toEnc} not supported`,
				exitCode: 1,
			};
		}
	},
};
