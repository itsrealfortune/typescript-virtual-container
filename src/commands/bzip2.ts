import { spawnSync } from "node:child_process";
import type { ShellModule } from "../types/commands";
import { resolvePath } from "./helpers";

function bzip2Compress(data: Buffer): Buffer | null {
	const r = spawnSync("bzip2", ["-c"], { input: data, maxBuffer: 64 * 1024 * 1024 });
	if (r.status !== 0 || !r.stdout?.length) return null;
	return r.stdout as Buffer;
}

function bzip2Decompress(data: Buffer): Buffer | null {
	const r = spawnSync("bzip2", ["-dc"], { input: data, maxBuffer: 64 * 1024 * 1024 });
	if (r.status !== 0 || !r.stdout) return null;
	return r.stdout as Buffer;
}

/**
 * Compress files using real bzip2 (delegates to system bzip2 via spawnSync).
 * @category archive
 */
export const bzip2Command: ShellModule = {
	name: "bzip2",
	description: "Compress files using Burrows-Wheeler algorithm",
	category: "archive",
	params: ["[-k] [-d] [-1..-9] <file>"],
	run: ({ authUser, shell, cwd, args }) => {
		const keepOrig = args.includes("-k") || args.includes("--keep");
		const decompress = args.includes("-d") || args.includes("--decompress");
		const file = args.find((a) => !a.startsWith("-"));
		if (!file) return { stderr: "bzip2: no file specified", exitCode: 1 };

		const p = resolvePath(cwd, file);
		if (!shell.vfs.exists(p)) return { stderr: `bzip2: ${file}: No such file or directory`, exitCode: 1 };

		if (decompress) {
			if (!file.endsWith(".bz2")) return { stderr: `bzip2: ${file}: unknown suffix -- ignored`, exitCode: 1 };
			const raw = shell.vfs.readFileRaw(p);
			const result = bzip2Decompress(raw);
			if (!result) return { stderr: `bzip2: ${file}: data integrity error`, exitCode: 2 };
			const dest = p.slice(0, -4);
			shell.writeFileAsUser(authUser, dest, result);
			if (!keepOrig) shell.vfs.remove(p);
			return { exitCode: 0 };
		}

		if (file.endsWith(".bz2")) return { stderr: `bzip2: ${file}: already has .bz2 suffix -- unchanged`, exitCode: 1 };
		const raw = shell.vfs.readFileRaw(p);
		const result = bzip2Compress(raw);
		if (!result) return { stderr: "bzip2: compression failed (bzip2 not available on host)", exitCode: 1 };
		shell.vfs.writeFile(`${p}.bz2`, result);
		if (!keepOrig) shell.vfs.remove(p);
		return { exitCode: 0 };
	},
};

/**
 * Decompress bzip2 files.
 * @category archive
 */
export const bunzip2Command: ShellModule = {
	name: "bunzip2",
	description: "Decompress bzip2 files",
	category: "archive",
	aliases: ["bzcat"],
	params: ["[-k] <file>"],
	run: ({ authUser, shell, cwd, args }) => {
		const keepOrig = args.includes("-k") || args.includes("--keep");
		const file = args.find((a) => !a.startsWith("-"));
		if (!file) return { stderr: "bunzip2: no file specified", exitCode: 1 };
		const p = resolvePath(cwd, file);
		if (!shell.vfs.exists(p)) return { stderr: `bunzip2: ${file}: No such file or directory`, exitCode: 1 };
		if (!file.endsWith(".bz2")) return { stderr: `bunzip2: ${file}: unknown suffix -- ignored`, exitCode: 1 };
		const raw = shell.vfs.readFileRaw(p);
		const result = bzip2Decompress(raw);
		if (!result) return { stderr: `bunzip2: ${file}: data integrity error`, exitCode: 2 };
		const dest = p.slice(0, -4);
		shell.writeFileAsUser(authUser, dest, result);
		if (!keepOrig) shell.vfs.remove(p);
		return { exitCode: 0 };
	},
};
