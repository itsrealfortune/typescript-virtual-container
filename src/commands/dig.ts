import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

export const digCommand: ShellModule = {
	name: "dig",
	description: "DNS lookup utility",
	category: "network",
	params: ["[@server] <name> [type]"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: dig [@server] <name> [type]",
					"  -h, --help    Show this help",
					"",
					"Types: A, AAAA, MX, TXT, CNAME, NS, SOA",
					"",
					"Query DNS for name resolution.",
				].join("\n"),
				exitCode: 0,
			};
		}

		let server = "1.1.1.1";
		let name: string | undefined;
		let qtype = "A";

		for (const a of args) {
			if (a.startsWith("@")) {
				server = a.slice(1);
			} else if (a === args[0] && !name) {
				name = a;
			} else if (name && !qtype) {
				qtype = a.toUpperCase();
			}
		}

		if (!name) {
			return { stderr: "dig: missing hostname", exitCode: 1 };
		}

		const resolved = resolveName(shell.vfs, name);
		const now = new Date().toISOString().replace("T", " ").slice(0, 19);

		const lines: string[] = [
			`; <<>> DiG 9.18.28 <<>> ${name}`,
			";; global options: +cmd",
			";; Got answer:",
			`;; ->>HEADER<<- opcode: QUERY, status: ${resolved ? "NOERROR" : "NXDOMAIN"}, id: ${Math.floor(Math.random() * 65535)}`,
			`;; flags: qr rd ra; QUERY: 1, ANSWER: ${resolved ? 1 : 0}, AUTHORITY: 0, ADDITIONAL: 1`,
			"",
			";; OPT PSEUDOSECTION:",
			"; EDNS: version: 0, flags:; udp: 1232",
			";; QUESTION SECTION:",
			`;${name}.			IN	${qtype}`,
			"",
		];

		if (resolved) {
			lines.push(";; ANSWER SECTION:");
			if (qtype === "A" || qtype === "AAAA") {
				const ips = resolveAll(shell.vfs, name, qtype);
				for (const ip of ips) {
					lines.push(`${name}.		300	IN	${qtype}	${ip}`);
				}
			} else if (qtype === "MX") {
				lines.push(`${name}.		300	IN	MX	10 mail.${name}.`);
			} else if (qtype === "TXT") {
				lines.push(`${name}.		300	IN	TXT	"v=spf1 mx ~all"`);
			} else if (qtype === "CNAME") {
				lines.push(`${name}.		300	IN	CNAME	${name}.`);
			} else {
				lines.push(`${name}.		300	IN	A	${resolved}`);
			}
			lines.push("");
		}

		lines.push(`;; Query time: ${Math.floor(Math.random() * 50 + 10)} msec`);
		lines.push(`;; SERVER: ${server}#53(${server}) (UDP)`);
		lines.push(`;; WHEN: ${now}`);
		lines.push(`;; MSG SIZE  rcvd: ${Math.floor(Math.random() * 200 + 50)}`);
		lines.push("");

		return { stdout: lines.join("\n"), exitCode: 0 };
	},
};

function resolveName(
	vfs: { exists: (p: string) => boolean; readFile: (p: string) => string },
	name: string
): string | null {
	try {
		if (vfs.exists("/etc/hosts")) {
			const hosts = vfs.readFile("/etc/hosts");
			for (const line of hosts.split("\n")) {
				const trimmed = line.trim();
				if (!trimmed || trimmed.startsWith("#")) {
					continue;
				}
				const parts = trimmed.split(/\s+/);
				if (parts.length >= 2) {
					const ip = parts[0]!;
					const hostnames = parts.slice(1);
					if (
						hostnames.includes(name) ||
						hostnames.includes(name.split(".")[0]!)
					) {
						return ip;
					}
				}
			}
		}
	} catch {
		// ignore
	}
	return null;
}

function resolveAll(
	vfs: { exists: (p: string) => boolean; readFile: (p: string) => string },
	name: string,
	qtype: string
): string[] {
	const results: string[] = [];
	try {
		if (vfs.exists("/etc/hosts")) {
			const hosts = vfs.readFile("/etc/hosts");
			for (const line of hosts.split("\n")) {
				const trimmed = line.trim();
				if (!trimmed || trimmed.startsWith("#")) {
					continue;
				}
				const parts = trimmed.split(/\s+/);
				if (parts.length >= 2) {
					const ip = parts[0]!;
					const hostnames = parts.slice(1);
					if (
						hostnames.includes(name) ||
						hostnames.includes(name.split(".")[0]!)
					) {
						if (qtype === "A" && !ip.includes(":")) {
							results.push(ip);
						}
						if (qtype === "AAAA" && ip.includes(":")) {
							results.push(ip);
						}
					}
				}
			}
		}
	} catch {
		// ignore
	}
	if (results.length === 0 && qtype === "A") {
		results.push("127.0.0.1");
	}
	return results;
}
