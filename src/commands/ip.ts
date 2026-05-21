import type { ShellModule } from "../types/commands";
import { randomMac } from "../modules/VirtualNetworkManager";

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
			return { stderr: "Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }\nOBJECT := { link | addr | route | neigh | rule | route table }", exitCode: 1 };
		}

		if (obj === "addr" || obj === "address" || obj === "a") {
			if (cmd === "add") {
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
			const tableIdx = args.indexOf("table");
			const tableId = tableIdx !== -1 ? parseInt(args[tableIdx + 1] ?? "254", 10) : undefined;

			if (cmd === "add") {
				const viaIdx = args.indexOf("via");
				const devIdx = args.indexOf("dev");
				const metricIdx = args.indexOf("metric");
				const dest = args[1] !== "add" ? args[1] : args[2];
				const gateway = viaIdx !== -1 ? args[viaIdx + 1] : "0.0.0.0";
				const device = devIdx !== -1 ? args[devIdx + 1] : "eth0";
				const metric = metricIdx !== -1 ? parseInt(args[metricIdx + 1] ?? "0", 10) : undefined;
				if (dest && dest !== "add") {
					if (tableId) {
						net.addRouteToTable(dest, gateway ?? "0.0.0.0", "255.255.255.0", device ?? "eth0", tableId);
					} else {
						net.addRoute(dest, gateway ?? "0.0.0.0", "255.255.255.0", device ?? "eth0", metric);
					}
				}
				return { exitCode: 0 };
			}
			if (cmd === "del") {
				const dest = args[1] !== "del" ? args[1] : args[2];
				if (dest && dest !== "del") net.delRoute(dest);
				return { exitCode: 0 };
			}
			if (cmd === "show" || cmd === "list") {
				if (tableId) {
					return { stdout: `${net.formatIpRouteTable(tableId)}\n`, exitCode: 0 };
				}
				return { stdout: `${net.formatIpRoute()}\n`, exitCode: 0 };
			}
			return { stdout: `${net.formatIpRoute()}\n`, exitCode: 0 };
		}
		if (obj === "link" || obj === "l") {
			if (cmd === "set") {
				const dev = args[2];
				if (args.includes("up") && dev) net.setInterfaceState(dev, "UP");
				if (args.includes("down") && dev) net.setInterfaceState(dev, "DOWN");
				const mtuIdx = args.indexOf("mtu");
				if (mtuIdx !== -1 && dev) {
					const mtu = parseInt(args[mtuIdx + 1] ?? "1500", 10);
					if (!isNaN(mtu)) net.setInterfaceMtu(dev, mtu);
				}
				return { exitCode: 0 };
			}
			if (cmd === "add") {
				const typeIdx = args.indexOf("type");
				let name = "eth1";
				for (let i = 2; i < args.length; i++) {
					const prev = args[i - 1];
					if (prev !== "type" && prev !== "add" && prev !== "link") {
						name = args[i] ?? "eth1";
						break;
					}
				}
				const type = typeIdx !== -1 ? (args[typeIdx + 1] ?? "ether") : "ether";
				net.addInterface({
					name,
					type: type as never,
					mac: randomMac(),
					mtu: 1500,
					ipv4: "0.0.0.0",
					ipv4Mask: 24,
					ipv6: "fe80::1",
				});
				return { exitCode: 0 };
			}
			if (cmd === "del") {
				const dev = args[2];
				if (dev) net.removeInterface(dev);
				return { exitCode: 0 };
			}
			return { stdout: `${net.formatIpLink()}\n`, exitCode: 0 };
		}
		if (obj === "neigh" || obj === "n") {
			return { stdout: `${net.formatIpNeigh()}\n`, exitCode: 0 };
		}
		if (obj === "rule" || obj === "ru") {
			if (cmd === "show" || cmd === "list") {
				return { stdout: `${net.formatIpRule()}\n`, exitCode: 0 };
			}
			if (cmd === "add") {
				const fromIdx = args.indexOf("from");
				const toIdx = args.indexOf("to");
				const tableIdx = args.indexOf("table");
				const iifIdx = args.indexOf("iif");
				const oifIdx = args.indexOf("oif");
				net.addPolicyRule({
					from: fromIdx !== -1 ? args[fromIdx + 1] : undefined,
					to: toIdx !== -1 ? args[toIdx + 1] : undefined,
					table: parseInt(args[tableIdx + 1] ?? "254", 10),
					iif: iifIdx !== -1 ? args[iifIdx + 1] : undefined,
					oif: oifIdx !== -1 ? args[oifIdx + 1] : undefined,
					action: "lookup",
				});
				return { exitCode: 0 };
			}
			if (cmd === "del") {
				const priority = parseInt(args[2] ?? "0", 10);
				if (priority) net.delPolicyRule(priority);
				return { exitCode: 0 };
			}
			return { stdout: `${net.formatIpRule()}\n`, exitCode: 0 };
		}
		if (obj === "route" && args.includes("table")) {
			const tableIdx = args.indexOf("table");
			const tableId = parseInt(args[tableIdx + 1] ?? "254", 10);
			return { stdout: `${net.formatIpRouteTable(tableId)}\n`, exitCode: 0 };
		}
		if (["set", "add", "del", "flush", "change", "replace"].includes(cmd)) {
			return { exitCode: 0 };
		}
		return { stderr: `ip: Object "${obj}" is unknown, try "ip help".`, exitCode: 1 };
	},
};
