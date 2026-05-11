import type { ShellModule } from "../types/commands";
import { resolvePath } from "./helpers";

export const tarCommand: ShellModule = {
	name: "tar",
	description: "Archive utility",
	category: "archive",
	params: ["[-czf|-xzf|-tf] <archive> [files...]"],
	run: ({ authUser, shell, cwd, args }) => {
		// Expand combined flags: -czf or czf (bare mode string) → ["-c", "-z", "-f"]
		const expanded: string[] = [];
		let foundModeStr = false;
		for (const a of args) {
			if (/^-[a-zA-Z]{2,}$/.test(a)) {
				// -czf style
				for (const ch of a.slice(1)) expanded.push(`-${ch}`);
			} else if (!foundModeStr && /^[cxtdru]{1,}[a-zA-Z]*$/.test(a) && !a.includes("/") && !a.startsWith("-")) {
				// czf bare style (first non-path arg)
				foundModeStr = true;
				for (const ch of a) expanded.push(`-${ch}`);
			} else {
				expanded.push(a);
			}
		}

		const create  = expanded.includes("-c");
		const extract = expanded.includes("-x");
		const list    = expanded.includes("-t");
		const fIdx    = expanded.indexOf("-f");
		const archiveName = fIdx !== -1
			? expanded[fIdx + 1]
			: expanded.find((a) => a.endsWith(".tar") || a.endsWith(".tar.gz") || a.endsWith(".tgz"));

		if (!create && !extract && !list) {
			return { stderr: "tar: must specify -c, -x, or -t\n", exitCode: 1 };
		}

		if (!archiveName)
			return { stderr: "tar: no archive specified\n", exitCode: 1 };
		const archivePath = resolvePath(cwd, archiveName);

		if (create) {
			// Skip flags and archive name from file list
			const skipNext2 = new Set<number>();
			if (fIdx !== -1) skipNext2.add(fIdx + 1);
			const fileArgs = expanded.filter((a, i) =>
				!a.startsWith("-") && a !== archiveName && !skipNext2.has(i),
			);
			const entries: Record<string, string> = {};
			for (const f of fileArgs) {
				const p = resolvePath(cwd, f);
				try {
					const stat = shell.vfs.stat(p);
					if (stat.type === "file") entries[f] = shell.vfs.readFile(p);
					else {
						const walk = (dir: string, prefix: string) => {
							for (const e of shell.vfs.list(dir)) {
								const full = `${dir}/${e}`,
									rel = `${prefix}/${e}`;
								const s = shell.vfs.stat(full);
								if (s.type === "file") entries[rel] = shell.vfs.readFile(full);
								else walk(full, rel);
							}
						};
						walk(p, f);
					}
				} catch {
					return {
						stderr: `tar: ${f}: No such file or directory`,
						exitCode: 1,
					};
				}
			}
			shell.writeFileAsUser(authUser, archivePath, JSON.stringify(entries));
			return { exitCode: 0 };
		}

		if (list || extract) {
			let entries: Record<string, string>;
			try {
				entries = JSON.parse(shell.vfs.readFile(archivePath));
			} catch {
				return {
					stderr: `tar: ${archiveName}: cannot open archive`,
					exitCode: 1,
				};
			}
			if (list) return { stdout: Object.keys(entries).join("\n"), exitCode: 0 };
			for (const [name, content] of Object.entries(entries)) {
				shell.writeFileAsUser(authUser, resolvePath(cwd, name), content);
			}
			return { exitCode: 0 };
		}

		return { stderr: "tar: must specify -c, -x, or -t", exitCode: 1 };
	},
};
