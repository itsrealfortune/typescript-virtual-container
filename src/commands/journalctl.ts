import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/** Query the systemd journal. */
export const journalctlCommand: ShellModule = {
	name: "journalctl",
	description: "Query the systemd journal",
	category: "system",
	params: ["[options] [pattern]"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: journalctl [OPTIONS...] [PATTERN]",
					"",
					"  -n, --lines=N     Show latest N lines",
					"  -f, --follow      Follow new log entries",
					"  -p, --priority=P  Filter by priority (emerg,alert,crit,err,warning,info,debug)",
					"  -u, --unit=UNIT   Show logs for a specific unit",
					"  --no-pager        Do not pipe output into a pager",
					"  -h, --help        Show this help",
					"",
					"Without arguments, show all log entries.",
				].join("\n"),
				exitCode: 0,
			};
		}

		const logPath = "/var/log/journal";
		const messages: string[] = [];

		try {
			if (shell.vfs.exists(logPath)) {
				const files = listLogFiles(shell.vfs, logPath);
				for (const f of files) {
					const content = shell.vfs.readFile(f);
					if (content) {
						messages.push(...content.trim().split("\n"));
					}
				}
			}
		} catch {
			// fall through
		}

		if (messages.length === 0) {
			return {
				stdout: `${["-- Logs begin at ... --", "(no entries)"].join("\n")}\n`,
				exitCode: 0,
			};
		}

		let filtered = messages;
		const flags = extractFlags(args);

		if (flags.priority) {
			const levels = priorityLevels(flags.priority);
			filtered = filtered.filter((l) => {
				const m = l.match(/<(\d+)>/);
				if (!m) {
					return true;
				}
				const prio = Number(m[1]) & 7;
				return prio <= levels;
			});
		}

		if (flags.unit) {
			filtered = filtered.filter((l) =>
				l.toLowerCase().includes(flags.unit!.toLowerCase())
			);
		}

		if (flags.lines !== undefined && flags.lines > 0) {
			filtered = filtered.slice(-flags.lines);
		}

		const result = `${filtered.join("\n")}\n`;

		if (flags.follow && result) {
			return { stdout: result, exitCode: 0 };
		}

		return { stdout: result || "(no entries)\n", exitCode: 0 };
	},
};

function listLogFiles(
	vfs: { exists: (p: string) => boolean; list: (d: string) => string[] },
	dir: string
): string[] {
	if (!vfs.exists(dir)) {
		return [];
	}
	const files: string[] = [];
	const entries = vfs.list(dir);
	for (const e of entries) {
		const full = `${dir}/${e}`;
		if (e.endsWith(".log") || e.endsWith(".journal")) {
			files.push(full);
		} else {
			try {
				files.push(...listLogFiles(vfs, full));
			} catch {
				// not a directory
			}
		}
	}
	return files;
}

function extractFlags(args: string[]): {
	lines: number | undefined;
	follow: boolean;
	priority: string | undefined;
	unit: string | undefined;
} {
	let lines: number | undefined;
	let follow = false;
	let priority: string | undefined;
	let unit: string | undefined;

	for (let i = 0; i < args.length; i++) {
		const arg = args[i]!;
		if (arg === "-f" || arg === "--follow") {
			follow = true;
		} else if (arg === "-n" || arg === "--lines") {
			const val = args[i + 1];
			if (val && !val.startsWith("-")) {
				lines = Number(val);
				i++;
			}
		} else if (arg.startsWith("-n") && arg.length > 2) {
			lines = Number(arg.slice(2));
		} else if (arg === "-p" || arg === "--priority") {
			const val = args[i + 1];
			if (val && !val.startsWith("-")) {
				priority = val;
				i++;
			}
		} else if (arg === "-u" || arg === "--unit") {
			const val = args[i + 1];
			if (val && !val.startsWith("-")) {
				unit = val;
				i++;
			}
		}
	}

	return { lines, follow, priority, unit };
}

function priorityLevels(name: string): number {
	const map: Record<string, number> = {
		emerg: 0,
		alert: 1,
		crit: 2,
		err: 3,
		warning: 4,
		notice: 5,
		info: 6,
		debug: 7,
	};
	return map[name.toLowerCase()] ?? 6;
}
