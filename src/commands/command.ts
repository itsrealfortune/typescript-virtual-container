import type {ShellModule} from "../types/commands";
import {resolveModule} from "./registry";

export const commandCommand: ShellModule = {
	name: "command",
	description: "Run a command or display info about it",
	category: "shell",
	params: ["[-vVp] <command> [args...]"],
	run: ({args, shell, env}) => {
		if (args.length === 0) {
			return {stderr: "command: missing argument", exitCode: 1};
		}

		const flags = new Set(
			[...args].filter((a) => a.startsWith("-") && !a.includes("="))
		);
		const names = args.filter((a) => !flags.has(a));
		const hasV = flags.has("-v");
		const hasVv = flags.has("-V");
		const hasP = flags.has("-p");

		const pathDirs = (
			hasP
				? "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
				: (env?.vars?.PATH ?? "/usr/local/bin:/usr/bin:/bin")
		).split(":");

		if (hasV || hasVv) {
			const lines: string[] = [];
			let exitCode = 0;
			for (const name of names) {
				const builtin = resolveModule(name);
				const isFunc = `__func_${name}` in env.vars;

				if (hasVv) {
					if (builtin) {
						lines.push(`${name} is a shell builtin`);
					} else if (isFunc) {
						lines.push(`${name} is a function`);
					} else {
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
				} else if (builtin || isFunc) {
					lines.push(name);
				} else {
					let found = false;
					for (const dir of pathDirs) {
						const full = `${dir}/${name}`;
						if (shell.vfs.exists(full)) {
							lines.push(full);
							found = true;
							break;
						}
					}
					if (!found) {
						exitCode = 1;
					}
				}
			}
			return {stdout: lines.join("\n"), exitCode};
		}

		return {stdout: "", exitCode: 0};
	},
};
