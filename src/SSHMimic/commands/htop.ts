import type { ShellModule } from "../../types/commands";

export const htopCommand: ShellModule = {
	name: "htop",
	params: [],
	run: ({ mode }) => {
		if (mode === "exec") {
			return { stderr: "htop: interactive terminal required", exitCode: 1 };
		}

		return { openHtop: true, exitCode: 0 };
	},
};
