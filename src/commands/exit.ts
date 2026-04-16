import type { ShellModule } from "../types/commands";

export const exitCommand: ShellModule = {
	name: "exit",
	aliases: ["bye"],
	params: [],
	run: () => ({ closeSession: true, exitCode: 0 }),
};
