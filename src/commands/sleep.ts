import type { ShellModule } from "../types/commands";

/**
 * Delay execution for a specified number of seconds.
 * @category system
 * @params ["<seconds>"]
 */
export const sleepCommand: ShellModule = {
	name: "sleep",
	description: "Delay execution",
	category: "system",
	params: ["<seconds>"],
	run: async ({ args }) => {
		const secs = parseFloat(args[0] ?? "1");
		if (Number.isNaN(secs) || secs < 0)
			return { stderr: "sleep: invalid time", exitCode: 1 };
		await new Promise((r) => setTimeout(r, secs * 1000));
		return { exitCode: 0 };
	},
};
