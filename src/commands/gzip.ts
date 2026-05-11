import type { ShellModule } from "../types/commands";
import { resolvePath } from "./helpers";

/**
 * Compress files using gzip — renames file to `<file>.gz`, removes original.
 * @category archive
 */
export const gzipCommand: ShellModule = {
	name: "gzip",
	description: "Compress files",
	category: "archive",
	params: ["[-k] [-d] <file>"],
	run: ({ shell, cwd, args }) => {
		if (!shell.packageManager.isInstalled("gzip")) {
			return {
				stderr:
					"bash: gzip: command not found\nHint: install it with: apt install gzip\n",
				exitCode: 127,
			};
		}
		const keepOrig = args.includes("-k") || args.includes("--keep");
		const decompress = args.includes("-d");
		const file = args.find((a) => !a.startsWith("-"));
		if (!file) return { stderr: "gzip: no file specified\n", exitCode: 1 };

		const p = resolvePath(cwd, file);

		if (decompress) {
			// gzip -d = gunzip
			if (!file.endsWith(".gz")) {
				return { stderr: `gzip: ${file}: unknown suffix -- ignored\n`, exitCode: 1 };
			}
			if (!shell.vfs.exists(p)) {
				return { stderr: `gzip: ${file}: No such file or directory\n`, exitCode: 1 };
			}
			const content = shell.vfs.readFile(p);
			const dest = p.slice(0, -3);
			shell.vfs.writeFile(dest, content);
			if (!keepOrig) shell.vfs.remove(p);
			return { exitCode: 0 };
		}

		if (!shell.vfs.exists(p)) {
			return { stderr: `gzip: ${file}: No such file or directory\n`, exitCode: 1 };
		}
		if (file.endsWith(".gz")) {
			return { stderr: `gzip: ${file}: already has .gz suffix -- unchanged\n`, exitCode: 1 };
		}

		const rawContent = shell.vfs.readFileRaw(p);
		const gzPath = `${p}.gz`;
		shell.vfs.writeFile(gzPath, rawContent, { compress: true });
		if (!keepOrig) shell.vfs.remove(p);
		return { exitCode: 0 };
	},
};

/**
 * Decompress gzip files — renames `<file>.gz` to `<file>`, removes original.
 * @category archive
 */
export const gunzipCommand: ShellModule = {
	name: "gunzip",
	description: "Decompress files",
	category: "archive",
	aliases: ["zcat"],
	params: ["[-k] <file>"],
	run: ({ shell, cwd, args }) => {
		const keepOrig = args.includes("-k") || args.includes("--keep");
		const file = args.find((a) => !a.startsWith("-"));
		if (!file) return { stderr: "gunzip: no file specified\n", exitCode: 1 };

		const p = resolvePath(cwd, file);

		if (!shell.vfs.exists(p)) {
			return { stderr: `gunzip: ${file}: No such file or directory\n`, exitCode: 1 };
		}
		if (!file.endsWith(".gz")) {
			return { stderr: `gunzip: ${file}: unknown suffix -- ignored\n`, exitCode: 1 };
		}

		const content = shell.vfs.readFile(p);
		const dest = p.slice(0, -3);
		shell.vfs.writeFile(dest, content);
		if (!keepOrig) shell.vfs.remove(p);
		return { exitCode: 0 };
	},
};
