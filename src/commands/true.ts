import type { ShellModule } from "../types/commands";

export const trueCommand: ShellModule = {
	name: "true",
	description: "Return success exit code",
	category: "shell",
	params: [],
	run: () => ({ exitCode: 0 }),
};

export const falseCommand: ShellModule = {
	name: "false",
	description: "Return failure exit code",
	category: "shell",
	params: [],
	run: () => ({ exitCode: 1 }),
};
