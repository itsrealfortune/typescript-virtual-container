import type { ShellModule } from "../types/commands";

/**
 * Interactive system monitor (requires terminal interaction).
 * @category system
 * @params []
 */
export const htopCommand: ShellModule = {
	name: "htop",
	description: "System monitor",
	category: "system",
	params: [],
	run: ({ mode }) => {
		if (mode === "exec") {
			return { stderr: "htop: interactive terminal required", exitCode: 1 };
		}

		return { openHtop: true, exitCode: 0 };
	},
};
