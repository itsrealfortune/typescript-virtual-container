import type { ShellModule } from "../types/commands";

/**
 * Locate a command in PATH.
 * @category shell
 * @params ["<command...>"]
 */
export const whichCommand: ShellModule = {
	name: "which",
	description: "Locate a command in PATH",
	category: "shell",
	params: ["<command...>"],
	run: ({ args, shell, env }) => {
		if (args.length === 0)
			return { stderr: "which: missing argument", exitCode: 1 };

		const pathDirs = (env?.vars?.PATH ?? "/usr/local/bin:/usr/bin:/bin").split(
			":",
		);
		const lines: string[] = [];
		let anyMissing = false;

		for (const name of args) {
			let found = false;
			for (const dir of pathDirs) {
				const full = `${dir}/${name}`;
				if (shell.vfs.exists(full)) {
					const st = shell.vfs.stat(full);
					if (st.type === "file") {
						lines.push(full);
						found = true;
						break;
					}
				}
			}
			if (!found) anyMissing = true;
		}

		if (lines.length === 0) return { exitCode: 1 };
		return { stdout: lines.join("\n"), exitCode: anyMissing ? 1 : 0 };
	},
};
