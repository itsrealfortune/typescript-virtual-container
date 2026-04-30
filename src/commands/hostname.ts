import type { ShellModule } from "../types/commands";

export const hostnameCommand: ShellModule = {
	name: "hostname",
	description: "Print hostname",
	category: "system",
	params: [],
	run: ({ hostname }) => ({ stdout: hostname, exitCode: 0 }),
};
