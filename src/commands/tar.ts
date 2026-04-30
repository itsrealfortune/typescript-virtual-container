import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { resolvePath } from "./helpers";

export const tarCommand: ShellModule = {
	name: "tar",
	description: "Archive utility",
	category: "archive",
	params: ["[-czf|-xzf|-tf] <archive> [files...]"],
	run: ({ authUser, shell, cwd, args }) => {
		const create = ifFlag(args, ["-c"]);
		const extract = ifFlag(args, ["-x"]);
		const list = ifFlag(args, ["-t"]);
		const fFlag = args.findIndex((a) => a.includes("f"));
		const archiveName = fFlag !== -1 ? args[fFlag + 1] : args.find((a) => a.endsWith(".tar") || a.endsWith(".tar.gz") || a.endsWith(".tgz"));

		if (!archiveName) return { stderr: "tar: no archive specified", exitCode: 1 };
		const archivePath = resolvePath(cwd, archiveName);

		if (create) {
			const fileArgs = args.filter((a) => !a.startsWith("-") && a !== archiveName);
			const entries: Record<string, string> = {};
			for (const f of fileArgs) {
				const p = resolvePath(cwd, f);
				try {
					const stat = shell.vfs.stat(p);
					if (stat.type === "file") entries[f] = shell.vfs.readFile(p);
					else {
						const walk = (dir: string, prefix: string) => {
							for (const e of shell.vfs.list(dir)) {
								const full = `${dir}/${e}`, rel = `${prefix}/${e}`;
								const s = shell.vfs.stat(full);
								if (s.type === "file") entries[rel] = shell.vfs.readFile(full);
								else walk(full, rel);
							}
						};
						walk(p, f);
					}
				} catch { return { stderr: `tar: ${f}: No such file or directory`, exitCode: 1 }; }
			}
			shell.writeFileAsUser(authUser, archivePath, JSON.stringify(entries));
			return { exitCode: 0 };
		}

		if (list || extract) {
			let entries: Record<string, string>;
			try { entries = JSON.parse(shell.vfs.readFile(archivePath)); }
			catch { return { stderr: `tar: ${archiveName}: cannot open archive`, exitCode: 1 }; }
			if (list) return { stdout: Object.keys(entries).join("\n"), exitCode: 0 };
			for (const [name, content] of Object.entries(entries)) {
				shell.writeFileAsUser(authUser, resolvePath(cwd, name), content);
			}
			return { exitCode: 0 };
		}

		return { stderr: "tar: must specify -c, -x, or -t", exitCode: 1 };
	},
};
