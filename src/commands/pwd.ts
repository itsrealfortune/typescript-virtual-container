import type { ShellModule } from "../types/commands";

/**
 * Print working directory.
 * @category navigation
 * @params []
 */
export const pwdCommand: ShellModule = {
	name: "pwd",
	description: "Print working directory",
	category: "navigation",
	params: [],
	run: ({ cwd }) => ({ stdout: cwd, exitCode: 0 }),
};
