import { gunzipSync, gzipSync } from "fflate";
import type { ShellModule } from "../types/commands";
import { resolvePath } from "./helpers";

// BZ2 magic bytes: "BZh" — we store gzip data after this marker so our tools
// can round-trip. Real bzip2 files won't be decompressable this way, but files
// created and extracted within this VM will work correctly.
const BZ2_MAGIC = Buffer.from("BZhVFS\0");

function vfsBzip2(data: Buffer): Buffer {
	const gz = Buffer.from(gzipSync(data));
	return Buffer.concat([BZ2_MAGIC, gz]);
}

function vfsBunzip2(data: Buffer): Buffer | null {
	if (!data.subarray(0, BZ2_MAGIC.length).equals(BZ2_MAGIC)) return null;
	try { return Buffer.from(gunzipSync(data.subarray(BZ2_MAGIC.length))); }
	catch { return null; }
}

/**
 * Compress files using bzip2 (VFS-internal gzip with BZ2 marker — round-trips within VM).
 * @category archive
 */
export const bzip2Command: ShellModule = {
	name: "bzip2",
	description: "Compress files using Burrows-Wheeler algorithm",
	category: "archive",
	params: ["[-k] [-d] <file>"],
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
			const result = vfsBunzip2(raw);
			if (!result) return { stderr: `bzip2: ${file}: data integrity error`, exitCode: 2 };
			const dest = p.slice(0, -4);
			shell.writeFileAsUser(authUser, dest, result);
			if (!keepOrig) shell.vfs.remove(p);
			return { exitCode: 0 };
		}

		if (file.endsWith(".bz2")) return { stderr: `bzip2: ${file}: already has .bz2 suffix -- unchanged`, exitCode: 1 };
		const raw = shell.vfs.readFileRaw(p);
		shell.vfs.writeFile(`${p}.bz2`, vfsBzip2(raw));
		if (!keepOrig) shell.vfs.remove(p);
		return { exitCode: 0 };
	},
};

/**
 * Decompress bzip2 files (VFS-internal format).
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
		const result = vfsBunzip2(raw);
		if (!result) return { stderr: `bunzip2: ${file}: data integrity error`, exitCode: 2 };
		const dest = p.slice(0, -4);
		shell.writeFileAsUser(authUser, dest, result);
		if (!keepOrig) shell.vfs.remove(p);
		return { exitCode: 0 };
	},
};
