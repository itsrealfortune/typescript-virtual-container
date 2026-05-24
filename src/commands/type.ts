import type {ShellModule} from "../types/commands";
import {resolveModule} from "./registry";

function getFuncName(name: string): string {
	return `__func_${name}`;
}

function classify(
	name: string,
	vars: Record<string, string>,
	pathDirs: string[],
	shell: {vfs: {exists: (p: string) => boolean}}
): {kind: string; path?: string} {
	if (getFuncName(name) in vars) {
		return {kind: "function"};
	}
	if (resolveModule(name)) {
		return {kind: "builtin"};
	}
	for (const dir of pathDirs) {
		const full = `${dir}/${name}`;
		if (shell.vfs.exists(full)) {
			return {kind: "file", path: full};
		}
	}
	return {kind: "not found"};
}

export const typeCommand: ShellModule = {
	name: "type",
	description: "Describe how a command would be interpreted",
	category: "shell",
	params: ["[-afptP] <command...>"],
	run: ({args, shell, env}) => {
		if (args.length === 0) {
			return {stderr: "type: missing argument", exitCode: 1};
		}

		const flags = new Set(
			[...args].filter((a) => a.startsWith("-") && !a.includes("="))
		);
		const names = args.filter((a) => !flags.has(a));
		const hasT = flags.has("-t");
		const hasP = flags.has("-p");
		const hasA = flags.has("-a");

		const pathDirs = (env?.vars?.PATH ?? "/usr/local/bin:/usr/bin:/bin").split(
			":"
		);
		const lines: string[] = [];
		let exitCode = 0;

		for (const name of names) {
			const {kind, path} = classify(name, env.vars, pathDirs, shell);

			if (hasT) {
				lines.push(kind === "not found" ? "" : kind);
				if (kind === "not found") {
					exitCode = 1;
				}
				continue;
			}

			if (hasP) {
				lines.push(kind === "file" && path ? path : "");
				if (kind === "not found") {
					exitCode = 1;
				}
				continue;
			}

			if (kind === "not found") {
				lines.push(`type: ${name}: not found`);
				exitCode = 1;
				continue;
			}

			if (kind === "builtin") {
				lines.push(`${name} is a shell builtin`);
			} else if (kind === "function") {
				lines.push(`${name} is a function`);
			} else if (kind === "file" && path) {
				lines.push(`${name} is ${path}`);
			}

			if (hasA) {
				if (resolveModule(name)) {
					lines.push(`${name} is a shell builtin`);
				}
				if (getFuncName(name) in env.vars) {
					lines.push(`${name} is a function`);
				}
				for (const dir of pathDirs) {
					const full = `${dir}/${name}`;
					if (shell.vfs.exists(full)) {
						lines.push(`${name} is ${full}`);
					}
				}
			}
		}

		return {stdout: lines.join("\n"), exitCode};
	},
};
