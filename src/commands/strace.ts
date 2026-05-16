import type { ShellModule } from "../types/commands";

/**
 * Trace system calls and signals (stub — runs command, emits fake strace output).
 * @category system
 */
export const straceCommand: ShellModule = {
	name: "strace",
	description: "Trace system calls and signals",
	category: "system",
	params: ["[-e <expr>] [-o <file>] <command> [args]"],
	run: ({ args }) => {
		const cmd = args.find((a) => !a.startsWith("-"));
		if (!cmd) return { stderr: "strace: must have PROG [ARGS] or -p PID", exitCode: 1 };
		const lines = [
			`execve("/usr/bin/${cmd}", ["${cmd}"${args.slice(1).map((a) => `, "${a}"`).join("")}], 0x... /* ... vars */) = 0`,
			`brk(NULL)                               = 0x${(Math.random() * 0xfffff | 0).toString(16)}000`,
			`access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)`,
			`openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3`,
			`fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0`,
			`close(3)                                = 0`,
			`+++ exited with 0 +++`,
		];
		return { stderr: lines.join("\n"), exitCode: 0 };
	},
};
