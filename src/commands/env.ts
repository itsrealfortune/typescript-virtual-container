/** biome-ignore-all lint/style/useNamingConvention: ENV VARS */
import type { ShellModule } from "../types/commands";

/**
 * Print environment variables for the current session.
 * @category shell
 * @params []
 */
export const envCommand: ShellModule = {
	name: "env",
	description: "Print environment variables",
	category: "shell",
	params: [],
	run: ({ env, authUser }) => {
		const vars = { ...env.vars, USER: authUser, HOME: `/home/${authUser}` };
		return {
			stdout: Object.entries(vars)
				.map(([k, v]) => `${k}=${v}`)
				.join("\n"),
			exitCode: 0,
		};
	},
};
