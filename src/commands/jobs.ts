import type { ShellModule } from "../types/commands";

export const jobsCommand: ShellModule = {
	name: "jobs",
	description: "List active jobs",
	category: "shell",
	params: [],
	run: () => ({ stdout: "", exitCode: 0 }),
};

export const bgCommand: ShellModule = {
	name: "bg",
	description: "Resume a suspended job in the background",
	category: "shell",
	params: ["[%jobspec]"],
	run: ({ args }) => ({
		stderr: `bg: ${args[0] ?? "%1"}: no such job`,
		exitCode: 1,
	}),
};

export const fgCommand: ShellModule = {
	name: "fg",
	description: "Resume a suspended job in the foreground",
	category: "shell",
	params: ["[%jobspec]"],
	run: ({ args }) => ({
		stderr: `fg: ${args[0] ?? "%1"}: no such job`,
		exitCode: 1,
	}),
};
