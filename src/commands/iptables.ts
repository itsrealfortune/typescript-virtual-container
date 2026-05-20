import type { ShellModule } from "../types/commands";
import type { FirewallRule } from "../modules/VirtualNetworkManager";

/**
 * Configure firewall rules (iptables-compatible subset).
 * @category network
 * @params ["-L | -A <chain> [-p proto] [-s src] [-d dst] [--dport port] -j ACTION | -F | -P <chain> <policy>"]
 */
export const iptablesCommand: ShellModule = {
	name: "iptables",
	description: "Configure firewall rules",
	category: "network",
	params: ["-L | -A <chain> [-p proto] [-s src] [-d dst] [--dport port] -j ACTION | -F | -P <chain> <policy>"],
	run: ({ args, shell }) => {
		const net = shell.network;
		let action: "list" | "append" | "flush" | "policy" = "list";
		let chain = "";
		const rule: Partial<FirewallRule> = {};

		for (let i = 0; i < args.length; i++) {
			const arg = args[i];
			if (!arg) continue;

			switch (arg) {
				case "-L":
				case "--list":
					action = "list";
					break;
				case "-A":
				case "--append":
					action = "append";
					chain = args[++i] ?? "";
					break;
				case "-F":
				case "--flush":
					action = "flush";
					break;
				case "-P":
				case "--policy":
					action = "policy";
					chain = args[++i] ?? "";
					break;
				case "-p":
				case "--protocol":
					rule.protocol = (args[++i] ?? "all") as FirewallRule["protocol"];
					break;
				case "-s":
				case "--source":
					rule.source = args[++i];
					break;
				case "-d":
				case "--destination":
					rule.destination = args[++i];
					break;
				case "--dport":
					rule.destPort = parseInt(args[++i] ?? "0", 10);
					break;
				case "-j":
				case "--jump":
					rule.action = (args[++i] ?? "ACCEPT") as FirewallRule["action"];
					break;
			}
		}

		switch (action) {
			case "list":
				return { stdout: `${net.formatFirewall()}\n`, exitCode: 0 };

			case "flush":
				net.flushFirewall();
				return { stdout: "", exitCode: 0 };

			case "policy": {
				if (!chain || !args.includes("-j") && !["ACCEPT", "DROP"].includes(args[args.length - 1] ?? "")) {
					const policy = args.find((a) => a === "ACCEPT" || a === "DROP");
					if (!policy) return { stderr: "iptables: -P requires chain and policy (ACCEPT|DROP)", exitCode: 1 };
					if (!net.setPolicy(chain, policy as "ACCEPT" | "DROP")) {
						return { stderr: `iptables: unknown chain '${chain}'`, exitCode: 1 };
					}
					return { stdout: "", exitCode: 0 };
				}
				const policy = args.find((a) => a === "ACCEPT" || a === "DROP");
				if (!policy) return { stderr: "iptables: -P requires policy (ACCEPT|DROP)", exitCode: 1 };
				if (!net.setPolicy(chain, policy as "ACCEPT" | "DROP")) {
					return { stderr: `iptables: unknown chain '${chain}'`, exitCode: 1 };
				}
				return { stdout: "", exitCode: 0 };
			}

			case "append": {
				if (!chain || !rule.action) {
					return { stderr: "iptables: -A requires chain and -j action", exitCode: 1 };
				}
				if (!["INPUT", "OUTPUT", "FORWARD"].includes(chain)) {
					return { stderr: `iptables: unknown chain '${chain}'`, exitCode: 1 };
				}
				if (!["ACCEPT", "DROP", "REJECT"].includes(rule.action)) {
					return { stderr: `iptables: unknown action '${rule.action}'`, exitCode: 1 };
				}
				const idx = net.addFirewallRule({
					chain: chain as FirewallRule["chain"],
					protocol: rule.protocol ?? "all",
					source: rule.source,
					destination: rule.destination,
					destPort: rule.destPort,
					action: rule.action,
				});
				return { stdout: `Rule added at index ${idx}\n`, exitCode: 0 };
			}
		}
	},
};
