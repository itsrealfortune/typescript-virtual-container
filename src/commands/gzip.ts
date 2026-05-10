import type { ShellModule } from "../types/commands";
import { resolvePath } from "./helpers";

/**
 * Compress files using gzip (stores in VFS as compressed content).
 * @category archive
 * @params ["<file>"]
 */
export const gzipCommand: ShellModule = {
	name: "gzip",
	description: "Compress files",
	category: "archive",
	params: ["<file>"],
	run: ({ shell, cwd, args }) => {
		const file = args[0];
		if (!file) return { stderr: "gzip: no file specified", exitCode: 1 };
		const p = resolvePath(cwd, file);
		try { shell.vfs.compressFile(p); return { exitCode: 0 }; }
		catch { return { stderr: `gzip: ${file}: No such file or directory`, exitCode: 1 }; }
	},
};

export const gunzipCommand: ShellModule = {
/**
 * Decompress gzip files (or zcat alias).
 * @category archive
 * @params ["<file>"]
 */
	name: "gunzip",
	description: "Decompress files",
	category: "archive",
	params: ["<file>"],
	aliases: ["zcat"],
	run: ({ shell, cwd, args }) => {
		const file = args[0];
		if (!file) return { stderr: "gunzip: no file specified", exitCode: 1 };
		const p = resolvePath(cwd, file);
		try { shell.vfs.decompressFile(p); return { exitCode: 0 }; }
		catch { return { stderr: `gunzip: ${file}: No such file or directory`, exitCode: 1 }; }
	},
};
