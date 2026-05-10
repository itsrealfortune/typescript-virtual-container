import type { ShellModule } from "../types/commands";

/**
 * Print the configured hostname for the virtual shell.
 * @category system
 * @params []
 */
export const hostnameCommand: ShellModule = {
	name: "hostname",
	description: "Print hostname",
	category: "system",
	params: [],
	run: ({ hostname }) => ({ stdout: hostname, exitCode: 0 }),
};
