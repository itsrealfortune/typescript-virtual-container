import type { ShellModule } from "../types/commands";

/**
 * Exit the current shell session (closeSession flag).
 * @category shell
 * @params ["[code]"]
 */
export const exitCommand: ShellModule = {
	name: "exit",
	aliases: ["bye"],
	description: "Exit the shell session",
	category: "shell",
	params: ["[code]"],
	run: ({ args }) => ({ closeSession: true, exitCode: parseInt(args[0] ?? "0", 10) || 0 }),
};
