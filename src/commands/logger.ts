import type {ShellModule} from "../types/commands";
import {ifFlag} from "./command-helpers";

export const loggerCommand: ShellModule = {
	name: "logger",
	description: "Send message to syslog",
	category: "network",
	params: ["[-p priority] [-t tag] [message...]"],
	run: ({shell, args}) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: logger [options] [message...]",
					"  -p, --priority <prio>  Priority (facility.severity)",
					"  -t, --tag <tag>        Mark lines with tag",
					"  -h, --help             Show this help",
					"",
					"Write message to system syslog.",
				].join("\n"),
				exitCode: 0,
			};
		}

		let tag = process.env.USER ?? "root";
		const msgParts: string[] = [];

		for (let i = 0; i < args.length; i++) {
			const a = args[i]!;
			if (a === "-p" || a === "--priority") {
				i++;
			} else if (a === "-t" || a === "--tag") {
				const val = args[++i];
				if (val) {
					tag = val;
				}
			} else if (!a.startsWith("-")) {
				msgParts.push(a);
			}
		}

		const message = msgParts.join(" ") || "(none)";
		const timestamp = new Date().toISOString();
		const logLine = `${timestamp} ${tag}: ${message}`;

		try {
			const logDir = "/var/log";
			if (!shell.vfs.exists(logDir)) {
				shell.vfs.mkdir(logDir, 0o755);
			}

			let existing = "";
			if (shell.vfs.exists("/var/log/syslog")) {
				existing = shell.vfs.readFile("/var/log/syslog");
			}
			shell.vfs.writeFile("/var/log/syslog", `${existing + logLine}\n`);
		} catch {
			return {stderr: "logger: could not write to syslog", exitCode: 1};
		}

		return {stdout: "", exitCode: 0};
	},
};
