import type { ShellModule } from "../types/commands";

export const clearCommand: ShellModule = {
	name: "clear",
	description: "Clear the terminal screen",
	category: "shell",
	params: [],
	// clearScreen flag triggers \x1b[2J\x1b[H in the shell layer
	run: () => ({ clearScreen: true, stdout: "", exitCode: 0 }),
};
