import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/** Display or modify the ARP cache. */
export const arpCommand: ShellModule = {
	name: "arp",
	description: "Display or modify the ARP cache",
	category: "network",
	params: ["[-n] [-d <host>] [-s <host> <mac>]"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: arp [-n] [-d <host>] [-s <host> <mac>]",
					"  -n          Show numerical addresses",
					"  -d <host>   Delete ARP entry",
					"  -s <host> <mac>  Add ARP entry",
					"  -h, --help  Show this help",
					"",
					"Display or modify ARP cache entries.",
				].join("\n"),
				exitCode: 0,
			};
		}

		const net = shell.network;

		const dIdx = args.indexOf("-d");
		if (dIdx !== -1 && dIdx + 1 < args.length) {
			const host = args[dIdx + 1]!;
			net.arpCache = net.arpCache.filter((e) => e.ip !== host);
			return { stdout: "", exitCode: 0 };
		}

		const sIdx = args.indexOf("-s");
		if (sIdx !== -1 && sIdx + 2 < args.length) {
			const host = args[sIdx + 1]!;
			const mac = args[sIdx + 2]!;
			net.arpCache.push({ ip: host, mac, device: "eth0", state: "REACHABLE" });
			return { stdout: "", exitCode: 0 };
		}

		const entries = net.getArpCache();
		const lines: string[] = [
			"Address                  HWtype  HWaddress           Flags Mask    Iface",
		];

		for (const e of entries) {
			const flags = "C";
			lines.push(
				`${e.ip.padEnd(24)} ether   ${e.mac.padEnd(19)} ${flags.padEnd(12)} ${e.device}`
			);
		}

		return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
	},
};
