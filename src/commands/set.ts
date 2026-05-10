/** biome-ignore-all lint/style/useNamingConvention: env variables */
import type { ShellModule } from "../types/commands";

// Legacy global store kept for compatibility with older callers
const _globalEnv: Record<string, string> = {
	PATH: "/usr/local/bin:/usr/bin:/bin",
	HOME: "/home/user",
	SHELL: "/bin/sh",
	TERM: "xterm-256color",
	USER: "user",
};

/** @deprecated use env.vars from CommandContext */
export function getEnvVar(name: string): string | undefined {
	return _globalEnv[name];
}
/** @deprecated use env.vars from CommandContext */
export function setEnvVar(name: string, value: string): void {
	_globalEnv[name] = value;
}
/** @deprecated use env.vars from CommandContext */
export function getAllEnvVars(authUser: string): Record<string, string> {
	_globalEnv.USER = authUser;
	_globalEnv.HOME = `/home/${authUser}`;
	return { ..._globalEnv };
}

export const setCommand: ShellModule = {
	name: "set",
	description: "Display or set shell variables",
	category: "shell",
	params: ["[VAR=value]"],
	run: ({ args, env }) => {
		if (args.length === 0) {
			const out = Object.entries(env.vars)
				.map(([k, v]) => `${k}=${v}`)
				.join("\n");
			return { stdout: out, exitCode: 0 };
		}
		for (const arg of args) {
			if (arg.includes("=")) {
				const eq = arg.indexOf("=");
				env.vars[arg.slice(0, eq)] = arg.slice(eq + 1);
			}
		}
		return { exitCode: 0 };
	},
};
