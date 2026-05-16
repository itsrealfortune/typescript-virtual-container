import type { ShellModule } from "../types/commands";

/**
 * Show/manipulate routing, network devices, interfaces and tunnels.
 * Uses the shell's VirtualNetworkManager for dynamic output.
 * @category network
 * @params ["<object> <command>"]
 */
export const ipCommand: ShellModule = {
	name: "ip",
	description: "Show/manipulate routing, network devices, interfaces",
	category: "network",
	params: ["<object> <command>"],
	run: ({ args, shell }) => {
		const net = shell.network;
		const obj = args[0]?.toLowerCase();
		const cmd = args[1]?.toLowerCase() ?? "show";

		if (!obj) {
			return { stderr: "Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }\nOBJECT := { link | addr | route | neigh }", exitCode: 1 };
		}

		if (obj === "addr" || obj === "address" || obj === "a") {
			if (cmd === "add") {
				// ip addr add <ip>/<mask> dev <dev>
				const ipArg = args.find((a) => a.includes("/"));
				const devIdx = args.indexOf("dev");
				const dev = devIdx !== -1 && devIdx + 1 < args.length ? args[devIdx + 1] : undefined;
				if (ipArg && dev) {
					const [ip, maskStr] = ipArg.split("/");
					const mask = parseInt(maskStr ?? "24", 10);
					net.setInterfaceIp(dev, ip ?? "0.0.0.0", mask);
				}
				return { exitCode: 0 };
			}
			if (cmd === "del") {
				const devIdx = args.indexOf("dev");
				const dev = devIdx !== -1 && devIdx + 1 < args.length ? args[devIdx + 1] : undefined;
				if (dev) net.setInterfaceIp(dev, "0.0.0.0", 0);
				return { exitCode: 0 };
			}
			return { stdout: `${net.formatIpAddr()}\n`, exitCode: 0 };
		}
		if (obj === "route" || obj === "r" || obj === "ro") {
			if (cmd === "add") {
				const viaIdx = args.indexOf("via");
				const devIdx = args.indexOf("dev");
				const dest = args[1] !== "add" ? args[1] : args[2]; // ip route add <dest> ...
				const gateway = viaIdx !== -1 ? args[viaIdx + 1] : "0.0.0.0";
				const device = devIdx !== -1 ? args[devIdx + 1] : "eth0";
				if (dest && dest !== "add") net.addRoute(dest, gateway ?? "0.0.0.0", "255.255.255.0", device ?? "eth0");
				return { exitCode: 0 };
			}
			if (cmd === "del") {
				const dest = args[1] !== "del" ? args[1] : args[2];
				if (dest && dest !== "del") net.delRoute(dest);
				return { exitCode: 0 };
			}
			return { stdout: `${net.formatIpRoute()}\n`, exitCode: 0 };
		}
		if (obj === "link" || obj === "l") {
			if (cmd === "set") {
				const dev = args[2]; // ip link set <dev> ...
				if (args.includes("up") && dev) net.setInterfaceState(dev, "UP");
				if (args.includes("down") && dev) net.setInterfaceState(dev, "DOWN");
				return { exitCode: 0 };
			}
			return { stdout: `${net.formatIpLink()}\n`, exitCode: 0 };
		}
		if (obj === "neigh" || obj === "n") {
			return { stdout: `${net.formatIpNeigh()}\n`, exitCode: 0 };
		}
		if (["set", "add", "del", "flush", "change", "replace"].includes(cmd)) {
			return { exitCode: 0 }; // silently succeed mutations
		}
		return { stderr: `ip: Object "${obj}" is unknown, try "ip help".`, exitCode: 1 };
	},
};
