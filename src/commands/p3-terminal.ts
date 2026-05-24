import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/** Terminal multiplexer. */
export const screenCommand: ShellModule = {
	name: "screen",
	description: "Terminal multiplexer",
	category: "system",
	params: ["[-S <name>] [command]"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: screen [-S <name>] [command]\n  -S <name>  Set session name\n  -ls        List sessions\n  -r <name>  Reattach to session\n  -h, --help Show this help\n",
				exitCode: 0,
			};
		}
		if (ifFlag(args, ["-ls", "--list"])) {
			const screensDir = "/var/run/screen";
			try {
				if (shell.vfs.exists(screensDir)) {
					const entries = shell.vfs.list(screensDir);
					if (entries.length > 0) {
						return {
							stdout: `There ${entries.length === 1 ? "is" : "are"} ${entries.length} screen(s) on this system.\n${entries.map((e) => `\t${e}`).join("\n")}\n`,
							exitCode: 0,
						};
					}
				}
			} catch {}
			return { stdout: "No Sockets found in /var/run/screen.\n", exitCode: 1 };
		}
		return {
			stdout: `[screen: session created on pts/${Math.floor(Math.random() * 256)}]\n`,
			exitCode: 0,
		};
	},
};

/** Terminal multiplexer. */
export const tmuxCommand: ShellModule = {
	name: "tmux",
	description: "Terminal multiplexer",
	category: "system",
	params: ["[command]"],
	aliases: ["tmux"],
	run: ({ args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: tmux [command]\n  new-session, ls, attach, kill-session\n  -h, --help  Show this help\n",
				exitCode: 0,
			};
		}
		const cmd = args.find((a) => !a.startsWith("-"));
		if (cmd === "ls" || cmd === "list-sessions") {
			return { stdout: "0: 1 windows (created ...) (attached)\n", exitCode: 0 };
		}
		if (cmd === "new-session" || cmd === "new") {
			return { stdout: "", exitCode: 0 };
		}
		if (cmd === "attach" || cmd === "attach-session") {
			return { stdout: "", exitCode: 0 };
		}
		return { stdout: "[tmux: virtual session started]\n", exitCode: 0 };
	},
};

/** Execute a program periodically. */
export const watchCommand: ShellModule = {
	name: "watch",
	description: "Execute a program periodically",
	category: "system",
	params: ["[-n <seconds>] <command>"],
	run: ({ args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: watch [-n <seconds>] <command>\n  -n <seconds>  Interval (default: 2)\n  -h, --help    Show this help\n",
				exitCode: 0,
			};
		}
		const nIdx = args.indexOf("-n");
		const interval =
			nIdx !== -1 && nIdx + 1 < args.length ? args[nIdx + 1]! : "2";
		const cmd = args
			.filter((a) => !a.startsWith("-") && a !== args[nIdx + 1])
			.join(" ");
		const now = new Date().toUTCString();
		return {
			stdout: `Every ${interval}s: ${cmd}\n\n${now}\n\n[watch: virtual execution]\n`,
			exitCode: 0,
		};
	},
};

/** Measure command execution time. */
export const timeCommand: ShellModule = {
	name: "time",
	description: "Measure command execution time",
	category: "system",
	params: ["<command> [args...]"],
	run: ({ args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: time <command> [args...]\n  -h, --help  Show this help\n",
				exitCode: 0,
			};
		}
		void args.filter((a) => !a.startsWith("-")).join(" ");
		const real = (Math.random() * 0.5 + 0.01).toFixed(3);
		const user = (Math.random() * 0.3 + 0.01).toFixed(3);
		const sys = (Math.random() * 0.2 + 0.01).toFixed(3);
		return {
			stdout: `real\t0m${real}s\nuser\t0m${user}s\nsys\t0m${sys}s\n`,
			exitCode: 0,
		};
	},
};
