import type { ShellModule } from "../types/commands";

/**
 * List process IDs matching a pattern
 * @category system
 * @params ["[-f] <pattern>"]
 */
export const pgrepCommand: ShellModule = {
	name: "pgrep",
	description: "List process IDs matching a pattern",
	category: "system",
	params: ["[-f] <pattern>"],
	run: ({ activeSessions, args }) => {
		const useFull = args.includes("-f");
		const pattern = args.find((a) => !a.startsWith("-"));
		if (!pattern) return { stderr: "pgrep: missing pattern\n", exitCode: 1 };
		try {
			const re = new RegExp(pattern);
			const results: string[] = [];
			for (let i = 0; i < activeSessions.length; i++) {
				const s = activeSessions[i]!;
				const target = useFull
					? `${s.username} ${s.tty} ${s.remoteAddress} ${s.id}`
					: s.username;
				if (re.test(target)) {
					results.push(String(1000 + i));
				}
			}
			if (results.length === 0) return { exitCode: 1 };
			return { stdout: results.join("\n") + "\n", exitCode: 0 };
		} catch {
			return { stderr: "pgrep: invalid pattern\n", exitCode: 2 };
		}
	},
};

/**
 * Kill processes matching a pattern
 * @category system
 * @params ["[-f] <pattern>"]
 */
export const pkillCommand: ShellModule = {
	name: "pkill",
	description: "Kill processes matching a pattern",
	category: "system",
	params: ["[-f] <pattern>"],
	run: ({ activeSessions, shell, args }) => {
		const useFull = args.includes("-f");
		const pattern = args.find((a) => !a.startsWith("-"));
		if (!pattern) return { stderr: "pkill: missing pattern\n", exitCode: 1 };
		try {
			const re = new RegExp(pattern);
			let killed = 0;
			for (const s of activeSessions) {
				const target = useFull
					? `${s.username} ${s.tty} ${s.remoteAddress} ${s.id}`
					: s.username;
				if (re.test(target)) {
					shell.users.unregisterSession(s.id);
					killed++;
				}
			}
			if (killed === 0) return { exitCode: 1 };
			return { stdout: `killed ${killed} process(es)\n`, exitCode: 0 };
		} catch {
			return { stderr: "pkill: invalid pattern\n", exitCode: 2 };
		}
	},
};
