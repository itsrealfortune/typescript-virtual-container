import type { ShellModule } from "../types/commands";
import { resolvePath } from "./helpers";

/**
 * Compress files using bzip2 (VFS stub — stores content as-is).
 * @category archive
 */
export const bzip2Command: ShellModule = {
	name: "bzip2",
	description: "Compress files using Burrows-Wheeler algorithm",
	category: "archive",
	params: ["[-k] [-d] <file>"],
	run: ({ authUser, shell, cwd, args }) => {
		const keepOrig = args.includes("-k") || args.includes("--keep");
		const decompress = args.includes("-d");
		const file = args.find((a) => !a.startsWith("-"));
		if (!file) return { stderr: "bzip2: no file specified", exitCode: 1 };

		const p = resolvePath(cwd, file);
		if (!shell.vfs.exists(p)) return { stderr: `bzip2: ${file}: No such file or directory`, exitCode: 1 };

		if (decompress) {
			if (!file.endsWith(".bz2")) return { stderr: `bzip2: ${file}: unknown suffix -- ignored`, exitCode: 1 };
			const content = shell.vfs.readFile(p);
			const dest = p.slice(0, -4);
			shell.writeFileAsUser(authUser, dest, content);
			if (!keepOrig) shell.vfs.remove(p);
			return { exitCode: 0 };
		}

		if (file.endsWith(".bz2")) return { stderr: `bzip2: ${file}: already has .bz2 suffix -- unchanged`, exitCode: 1 };
		const content = shell.vfs.readFile(p);
		shell.writeFileAsUser(authUser, `${p}.bz2`, content);
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
		const content = shell.vfs.readFile(p);
		const dest = p.slice(0, -4);
		shell.writeFileAsUser(authUser, dest, content);
		if (!keepOrig) shell.vfs.remove(p);
		return { exitCode: 0 };
	},
};
