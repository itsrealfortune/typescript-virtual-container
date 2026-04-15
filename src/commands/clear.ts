import type { ShellModule } from "../types/commands";

export const clearCommand: ShellModule = {
	name: "clear",
	params: [],
	run: () => ({ clearScreen: true, exitCode: 0 }),
};
