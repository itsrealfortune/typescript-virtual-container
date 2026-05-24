import type { ShellModule } from "../types/commands";

/**
 * Print the current user name.
 * @category system
 * @params []
 */
export const whoamiCommand: ShellModule = {
	name: "whoami",
	description: "Print current user",
	category: "system",
	params: [],
	run: ({ authUser }) => ({ stdout: authUser, exitCode: 0 }),
};
