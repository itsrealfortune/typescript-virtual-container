import type { ShellModule } from "../../types/commands";

export const whoamiCommand: ShellModule = {
	name: "whoami",
	params: [],
	run: ({ authUser }) => ({ stdout: authUser, exitCode: 0 }),
};
