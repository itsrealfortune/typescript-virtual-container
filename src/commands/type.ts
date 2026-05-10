import { resolveModule } from ".";
import type { ShellModule } from "../types/commands";

export const typeCommand: ShellModule = {
	name: "type",
	description: "Describe how a command would be interpreted",
	category: "shell",
	params: ["<command...>"],
	run: ({ args, shell, env }) => {
		if (args.length === 0)
			return { stderr: "type: missing argument", exitCode: 1 };

		const pathDirs = (env?.vars?.PATH ?? "/usr/local/bin:/usr/bin:/bin").split(
			":",
		);
		const lines: string[] = [];
		let exitCode = 0;

		for (const name of args) {
			if (resolveModule(name)) {
				lines.push(`${name} is a shell builtin`);
				continue;
			}

			let found = false;
			for (const dir of pathDirs) {
				const full = `${dir}/${name}`;
				if (shell.vfs.exists(full)) {
					lines.push(`${name} is ${full}`);
					found = true;
					break;
				}
			}

			if (!found) {
				lines.push(`${name}: not found`);
				exitCode = 1;
			}
		}

		return { stdout: lines.join("\n"), exitCode };
	},
};
