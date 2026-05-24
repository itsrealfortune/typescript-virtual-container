import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

export const ethtoolCommand: ShellModule = {
	name: "ethtool",
	description: "Display or modify network interface parameters",
	category: "network",
	params: ["<interface>"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: ethtool <interface>",
					"  -h, --help    Show this help",
					"",
					"Display network interface configuration.",
				].join("\n"),
				exitCode: 0,
			};
		}

		const ifaceName = args.find((a) => !a.startsWith("-"));
		if (!ifaceName) {
			return { stderr: "ethtool: missing interface name", exitCode: 1 };
		}

		const net = shell.network;
		const iface = net.getInterface(ifaceName);
		if (!iface) {
			return { stderr: `ethtool: ${ifaceName}: No such device`, exitCode: 1 };
		}

		return {
			stdout: `${[
				`Settings for ${ifaceName}:`,
				"	Supported ports: [ TP MII ]",
				"	Supported link modes:   10baseT/Half 10baseT/Full",
				"	                        100baseT/Half 100baseT/Full",
				"	                        1000baseT/Full",
				"	Supported pause frame use: Symmetric",
				"	Supports auto-negotiation: Yes",
				"	Advertised link modes:  1000baseT/Full",
				"	Advertised pause frame use: Symmetric",
				"	Advertised auto-negotiation: Yes",
				`	Speed: ${iface.speed ?? 1000}Mb/s`,
				`	Duplex: ${iface.duplex ?? "Full"}`,
				"	Port: Twisted Pair",
				"	PHYAD: 0",
				"	Transceiver: internal",
				"	Auto-negotiation: on",
				"	Supports Wake-on: pumbg",
				"	Wake-on: d",
				`	Link detected: ${iface.state === "UP" ? "yes" : "no"}`,
			].join("\n")}\n`,
			exitCode: 0,
		};
	},
};
