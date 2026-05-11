import type { ShellModule } from "../types/commands";

/**
 * Remove shell variable from the environment.
 * @category shell
 * @params ["<VAR>"]
 */
export const unsetCommand: ShellModule = {
	name: "unset",
	description: "Remove shell variable",
	category: "shell",
	params: ["<VAR>"],
	run: ({ args, env }) => {
		for (const name of args) delete env.vars[name];
		return { exitCode: 0 };
	},
};
