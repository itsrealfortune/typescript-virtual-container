import type { ShellModule } from "../types/commands";

/**
 * Print the current date/time or a formatted representation.
 * @category system
 * @params ["[+format]"]
 */
export const dateCommand: ShellModule = {
	name: "date",
	description: "Print current date and time",
	category: "system",
	params: ["[+format]"],
	run: ({ args }) => {
		const now = new Date();
		const fmt = args[0];
		if (fmt?.startsWith("+")) {
			const f = fmt.slice(1)
				.replace("%Y", String(now.getFullYear()))
				.replace("%m", String(now.getMonth() + 1).padStart(2, "0"))
				.replace("%d", String(now.getDate()).padStart(2, "0"))
				.replace("%H", String(now.getHours()).padStart(2, "0"))
				.replace("%M", String(now.getMinutes()).padStart(2, "0"))
				.replace("%S", String(now.getSeconds()).padStart(2, "0"))
				.replace("%s", String(Math.floor(now.getTime() / 1000)));
			return { stdout: f, exitCode: 0 };
		}
		return { stdout: now.toString(), exitCode: 0 };
	},
};
