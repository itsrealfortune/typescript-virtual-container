import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

export const routeCommand: ShellModule = {
	name: "route",
	description: "Display or modify the routing table",
	category: "network",
	params: ["[-n] [add|del]"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: route [-n] [add|del <target> gw <gateway>]",
					"  -n     Show numerical addresses (no DNS resolution)",
					"  -h, --help  Show this help",
					"",
					"Display or modify the IP routing table.",
				].join("\n"),
				exitCode: 0,
			};
		}

		const net = shell.network;
		const positionals = args.filter((a) => !a.startsWith("-"));

		if (positionals.length === 0) {
			const routes = net.getRoutes();
			const lines: string[] = [
				"Kernel IP routing table",
				"Destination     Gateway         Genmask         Flags Metric Ref    Use Iface",
			];

			for (const r of routes) {
				const dest = r.destination ?? "0.0.0.0";
				const gw = r.gateway ?? "0.0.0.0";
				const mask = r.netmask ?? "255.255.255.0";
				const flags = dest === "0.0.0.0" ? "UG" : "U";
				const metric = r.metric ?? "0";
				const dev = r.device ?? "eth0";
				lines.push(
					`${dest.padEnd(15)} ${gw.padEnd(15)} ${mask.padEnd(15)} ${flags.padEnd(5)} ${String(metric).padEnd(4)} 0       ${dev}`
				);
			}

			return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
		}

		const cmd = positionals[0]!;
		if (cmd === "add" || cmd === "del") {
			const target = positionals[1];
			const gwIdx = positionals.indexOf("gw");
			const gw =
				gwIdx !== -1 && gwIdx + 1 < positionals.length
					? positionals[gwIdx + 1]
					: "0.0.0.0";
			const netmask = "0.0.0.0";
			const device = "eth0";

			if (!target) {
				return { stderr: "route: missing target", exitCode: 1 };
			}

			if (cmd === "add") {
				net.addRoute(target, gw!, netmask, device);
				return { stdout: "", exitCode: 0 };
			}
			net.delRoute(target);
			return { stdout: "", exitCode: 0 };
		}

		return { stderr: `route: unknown command '${cmd}'`, exitCode: 1 };
	},
};
