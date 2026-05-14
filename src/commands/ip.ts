import type { ShellModule } from "../types/commands";

const ADDR_OUTPUT = `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 02:42:0a:00:00:02 brd ff:ff:ff:ff:ff:ff
    inet 10.0.0.2/24 brd 10.0.0.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:aff:fe00:2/64 scope link
       valid_lft forever preferred_lft forever`;

const ROUTE_OUTPUT = `default via 10.0.0.1 dev eth0
10.0.0.0/24 dev eth0 proto kernel scope link src 10.0.0.2`;

const LINK_OUTPUT = `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 02:42:0a:00:00:02 brd ff:ff:ff:ff:ff:ff`;

/**
 * Show/manipulate routing, network devices, interfaces and tunnels.
 * @category network
 * @params ["<object> <command>"]
 */
export const ipCommand: ShellModule = {
	name: "ip",
	description: "Show/manipulate routing, network devices, interfaces",
	category: "network",
	params: ["<object> <command>"],
	run: ({ args }) => {
		const obj = args[0]?.toLowerCase();
		const cmd = args[1]?.toLowerCase() ?? "show";

		if (!obj) {
			return { stderr: "Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }\nOBJECT := { link | addr | route | neigh }", exitCode: 1 };
		}

		if (obj === "addr" || obj === "address" || obj === "a") {
			return { stdout: ADDR_OUTPUT, exitCode: 0 };
		}
		if (obj === "route" || obj === "r" || obj === "ro") {
			return { stdout: ROUTE_OUTPUT, exitCode: 0 };
		}
		if (obj === "link" || obj === "l") {
			return { stdout: LINK_OUTPUT, exitCode: 0 };
		}
		if (obj === "neigh" || obj === "n") {
			return { stdout: "10.0.0.1 dev eth0 lladdr 02:42:0a:00:00:01 REACHABLE", exitCode: 0 };
		}
		if (["set", "add", "del", "flush", "change", "replace"].includes(cmd)) {
			return { exitCode: 0 }; // silently succeed mutations
		}
		return { stderr: `ip: Object "${obj}" is unknown, try "ip help".`, exitCode: 1 };
	},
};
