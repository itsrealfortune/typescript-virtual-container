/** biome-ignore-all lint/suspicious/noControlCharactersInRegex: binary magic bytes detection */
import type { ShellModule } from "../types/commands";
import { resolvePath } from "./helpers";

const MAGIC: Array<[RegExp | ((s: string) => boolean), string]> = [
	[s => s.startsWith('\x7fELF'), "ELF 64-bit LSB executable, x86-64"],
	[/^#!\/bin\/sh/, "POSIX shell script, ASCII text executable"],
	[/^#!\/bin\/bash/, "Bourne-Again shell script, ASCII text executable"],
	[/^#!\/usr\/bin\/env (node|bun)/, "Node.js script, ASCII text executable"],
	[/^#!\/usr\/bin\/env python/, "Python script, ASCII text executable"],
	[/^\x89PNG/, "PNG image data"],
	[/^GIF8/, "GIF image data"],
	[/^\xff\xd8\xff/, "JPEG image data"],
	[/^PK\x03\x04/, "Zip archive data"],
	[/^\x1f\x8b/, "gzip compressed data"],
	[s => s.trimStart().startsWith('{') || s.trimStart().startsWith('['), "JSON data"],
	[/^<\?xml/, "XML document, ASCII text"],
	[/^<!DOCTYPE html/i, "HTML document, ASCII text"],
	[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/, "ASCII text"],
];

/**
 * Determine file type.
 * @category files
 * @params ["<file>..."]
 */
export const fileCommand: ShellModule = {
	name: "file",
	description: "Determine file type",
	category: "files",
	params: ["<file>..."],
	run: ({ args, cwd, shell }) => {
		if (!args.length) return { stderr: "file: missing operand", exitCode: 1 };
		const lines: string[] = [];
		let exitCode = 0;
		for (const arg of args) {
			const p = resolvePath(cwd, arg);
			if (!shell.vfs.exists(p)) {
				lines.push(`${arg}: ERROR: No such file or directory`);
				exitCode = 1;
				continue;
			}
			const st = shell.vfs.stat(p);
			if (st.type === "directory") {
				lines.push(`${arg}: directory`);
				continue;
			}
			const content = shell.vfs.readFile(p);
			let type = "data";
			for (const [matcher, label] of MAGIC) {
				if (typeof matcher === "function" ? matcher(content) : matcher.test(content)) {
					type = label;
					break;
				}
			}
			lines.push(`${arg}: ${type}`);
		}
		return { stdout: lines.join("\n"), exitCode };
	},
};
