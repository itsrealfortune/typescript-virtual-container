import type { ShellModule } from "../types/commands";

/**
 * Always return success (exit code 0).
 * @category shell
 * @params []
 */
export const trueCommand: ShellModule = {
	name: "true",
	description: "Return success exit code",
	category: "shell",
	params: [],
	run: () => ({ exitCode: 0 }),
};

/**
 * Always return failure (exit code 1).
 * @category shell
 * @params []
 */
export const falseCommand: ShellModule = {
	name: "false",
	description: "Return failure exit code",
	category: "shell",
	params: [],
	run: () => ({ exitCode: 1 }),
};
