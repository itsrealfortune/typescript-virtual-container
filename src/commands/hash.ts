import type { ShellModule } from "../types/commands";

/** Display and manage the command hash table. */
export const hashCommand: ShellModule = {
	name: "hash",
	description: "Display and manage the command hash table",
	category: "shell",
	params: ["[-r] [name...]"],
	run: ({ args, shell, env }) => {
		const hasR = args.includes("-r");
		const names = args.filter((a) => a !== "-r");

		if (hasR) {
			const keys = Object.keys(env.vars).filter((k) => k.startsWith("__hash_"));
			for (const k of keys) {
				delete env.vars[k];
			}
		}

		if (names.length > 0) {
			const pathDirs = (
				env?.vars?.PATH ?? "/usr/local/bin:/usr/bin:/bin"
			).split(":");
			for (const name of names) {
				let found = false;
				for (const dir of pathDirs) {
					const full = `${dir}/${name}`;
					if (shell.vfs.exists(full)) {
						env.vars[`__hash_${name}`] = full;
						found = true;
						break;
					}
				}
				if (!found) {
					env.vars[`__hash_${name}`] = "";
				}
			}
			return { exitCode: 0 };
		}

		if (!hasR) {
			const lines: string[] = [];
			for (const [k, v] of Object.entries(env.vars)) {
				if (k.startsWith("__hash_") && v) {
					lines.push(`${k.slice(7)}  ${v}`);
				}
			}
			return {
				stdout: lines.length > 0 ? `${lines.join("\n")}\n` : "",
				exitCode: 0,
			};
		}

		return { exitCode: 0 };
	},
};
