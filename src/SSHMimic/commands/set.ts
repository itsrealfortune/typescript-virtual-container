/** biome-ignore-all lint/style/useNamingConvention: env variables */
import type { ShellModule } from "../../types/commands";

// Simple in-memory environment variables store
// In a real implementation, this would be per-session/per-user
const envVars: Record<string, string> = {
	PATH: "/usr/local/bin:/usr/bin:/bin",
	HOME: "/home/user",
	SHELL: "/bin/sh",
	TERM: "xterm-256color",
	USER: "user",
};

export function getEnvVar(name: string): string | undefined {
	return envVars[name];
}

export function setEnvVar(name: string, value: string): void {
	envVars[name] = value;
}

export function getAllEnvVars(authUser: string): Record<string, string> {
	envVars.USER = authUser;
	envVars.HOME = `/home/${authUser}`;
	return { ...envVars };
}

export const setCommand: ShellModule = {
	name: "set",
	params: ["[VAR=value]"],
	run: ({ args }) => {
		// No arguments: display all environment variables
		if (args.length === 0) {
			const output = Object.entries(envVars)
				.map(([key, value]) => `${key}=${value}`)
				.sort()
				.join("\n");

			return { stdout: output, exitCode: 0 };
		}

		// Parse VAR=value format
		const assignments: string[] = [];
		for (const arg of args) {
			if (arg.includes("=")) {
				const [varName, varValue] = arg.split("=", 2);
				if (varName && varValue !== undefined) {
					setEnvVar(varName, varValue);
					assignments.push(arg);
				}
			} else {
				// If no '=' present, display that specific variable
				const value = getEnvVar(arg);
				if (value !== undefined) {
					assignments.push(`${arg}=${value}`);
				} else {
					assignments.push(`${arg}: not set`);
				}
			}
		}

		return {
			stdout: assignments.length > 0 ? assignments.join("\n") : "",
			exitCode: 0,
		};
	},
};
