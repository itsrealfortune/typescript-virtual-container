import type {ShellModule} from "../types/commands";
import {ifFlag} from "./command-helpers";

export const nslookupCommand: ShellModule = {
	name: "nslookup",
	description: "Query DNS for hostname or IP",
	category: "network",
	params: ["<hostname> [dns-server]"],
	run: ({shell, args}) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: nslookup <hostname> [dns-server]",
					"  -h, --help    Show this help",
					"",
					"Query DNS for hostname resolution.",
				].join("\n"),
				exitCode: 0,
			};
		}

		const positionals = args.filter((a) => !a.startsWith("-"));
		const hostname = positionals[0];
		if (!hostname) {
			return {stderr: "nslookup: missing hostname", exitCode: 1};
		}

		const server = positionals[1] ?? "1.1.1.1";
		let ip: string | null = null;

		try {
			if (shell.vfs.exists("/etc/hosts")) {
				const hosts = shell.vfs.readFile("/etc/hosts");
				for (const line of hosts.split("\n")) {
					const trimmed = line.trim();
					if (!trimmed || trimmed.startsWith("#")) {
						continue;
					}
					const parts = trimmed.split(/\s+/);
					if (parts.length >= 2) {
						const candidate = parts[0]!;
						const hostnames = parts.slice(1);
						if (
							hostnames.includes(hostname) ||
							hostnames.includes(hostname.split(".")[0]!)
						) {
							ip = candidate;
						}
					}
				}
			}
		} catch {
			// ignore
		}

		if (!ip) {
			ip = "127.0.0.1";
		}

		return {
			stdout: [
				`Server:		${server}`,
				`Address:	${server}#53`,
				"",
				`Name:	${hostname}`,
				`Address:	${ip}`,
				"",
			].join("\n"),
			exitCode: 0,
		};
	},
};
