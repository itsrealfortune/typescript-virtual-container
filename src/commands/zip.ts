import type { ShellModule } from "../types/commands";
import { resolvePath } from "./helpers";

/**
 * Create or extract ZIP archives (VFS stub — stores content as-is, no real compression).
 * @category archive
 */
export const zipCommand: ShellModule = {
	name: "zip",
	description: "Package and compress files",
	category: "archive",
	params: ["<archive.zip> <file...>"],
	run: ({ authUser, shell, cwd, args }) => {
		const files = args.filter((a) => !a.startsWith("-"));
		const archive = files[0];
		const sources = files.slice(1);
		if (!archive) return { stderr: "zip: no archive specified", exitCode: 1 };
		if (sources.length === 0) return { stderr: "zip: nothing to do!", exitCode: 12 };

		const archivePath = resolvePath(cwd, archive.endsWith(".zip") ? archive : `${archive}.zip`);
		const entries: string[] = [];
		for (const src of sources) {
			const p = resolvePath(cwd, src);
			if (!shell.vfs.exists(p)) { return { stderr: `zip warning: name not matched: ${src}`, exitCode: 12 }; }
			try {
				const content = shell.vfs.readFile(p);
				entries.push(`${src}:${content}`);
			} catch { /* directory or unreadable */ }
		}
		shell.writeFileAsUser(authUser, archivePath, entries.join("\n__ZIP_ENTRY__\n"));
		const out = sources.map((s) => `  adding: ${s} (stored 0%)`).join("\n");
		return { stdout: out, exitCode: 0 };
	},
};

/**
 * Extract ZIP archives (VFS stub).
 * @category archive
 */
export const unzipCommand: ShellModule = {
	name: "unzip",
	description: "Extract compressed files from ZIP archives",
	category: "archive",
	params: ["[-l] <archive.zip> [-d <dir>]"],
	run: ({ authUser, shell, cwd, args }) => {
		const listOnly = args.includes("-l");
		const dIdx = args.indexOf("-d");
		const destDir = dIdx !== -1 ? args[dIdx + 1] : undefined;
		const archive = args.find((a) => !a.startsWith("-") && a !== destDir);
		if (!archive) return { stderr: "unzip: missing archive operand", exitCode: 1 };

		const archivePath = resolvePath(cwd, archive);
		if (!shell.vfs.exists(archivePath)) {
			return { stderr: `unzip: cannot find or open ${archive}`, exitCode: 9 };
		}

		const content = shell.vfs.readFile(archivePath);
		const entries = content.split("\n__ZIP_ENTRY__\n");
		const dest = destDir ? resolvePath(cwd, destDir) : cwd;

		if (listOnly) {
			const header = `Archive:  ${archive}\n  Length      Date    Time    Name\n---------  ---------- -----   ----`;
			const rows = entries.map((e) => {
				const colon = e.indexOf(":");
				const name = colon !== -1 ? e.slice(0, colon) : e;
				const size = colon !== -1 ? e.slice(colon + 1).length : 0;
				return `     ${size}  2024-01-01 00:00   ${name}`;
			});
			return { stdout: `${header}\n${rows.join("\n")}`, exitCode: 0 };
		}

		const out: string[] = [`Archive:  ${archive}`];
		for (const entry of entries) {
			const colon = entry.indexOf(":");
			if (colon === -1) continue;
			const name = entry.slice(0, colon);
			const data = entry.slice(colon + 1);
			const destPath = `${dest}/${name}`;
			shell.writeFileAsUser(authUser, destPath, data);
			out.push(`  inflating: ${destPath}`);
		}
		return { stdout: out.join("\n"), exitCode: 0 };
	},
};
