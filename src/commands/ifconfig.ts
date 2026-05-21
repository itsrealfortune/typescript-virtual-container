import type { ShellModule } from "../types/commands";

/**
 * Configure network interface parameters (legacy command, use 'ip' instead).
 * Shows and configures network interfaces with support for multiple interface types.
 * @category network
 */
export const ifconfigCommand: ShellModule = {
	name: "ifconfig",
	description: "Configure network interface parameters",
	category: "network",
	aliases: ["ipconfig"],
	params: ["[interface] [up|down] [inet <address>] [netmask <mask>] [mtu <size>]"],
	run: ({ args, shell }) => {
		const net = shell.network;
		const ifaceName = args.find((a) => !a.startsWith("-") && !["up", "down", "inet", "netmask", "mtu", "add", "del"].includes(a));

		if (args.includes("-a") || (!ifaceName && args.length === 0)) {
			return _showAllInterfaces(net);
		}

		if (ifaceName) {
			const iface = net.getInterface(ifaceName);
			if (!iface) {
				return { stderr: `ifconfig: ${ifaceName}: error fetching interface information: Device not found\n`, exitCode: 1 };
			}

			if (args.includes("up")) {
				net.setInterfaceState(ifaceName, "UP");
				return { exitCode: 0 };
			}

			if (args.includes("down")) {
				net.setInterfaceState(ifaceName, "DOWN");
				return { exitCode: 0 };
			}

			const inetIdx = args.indexOf("inet");
			if (inetIdx !== -1) {
				const addr = args[inetIdx + 1];
				const maskIdx = args.indexOf("netmask");
				const mask = maskIdx !== -1 ? _maskToCidr(args[maskIdx + 1] ?? "255.255.255.0") : 24;
				if (addr) {
					net.setInterfaceIp(ifaceName, addr, mask);
				}
				return { exitCode: 0 };
			}

			const mtuIdx = args.indexOf("mtu");
			if (mtuIdx !== -1) {
				const mtu = parseInt(args[mtuIdx + 1] ?? "1500", 10);
				if (!isNaN(mtu)) {
					net.setInterfaceMtu(ifaceName, mtu);
				}
				return { exitCode: 0 };
			}

			return _showInterface(iface);
		}

		return _showAllInterfaces(net);
	},
};

function _showAllInterfaces(net: import("../modules/VirtualNetworkManager").VirtualNetworkManager): { stdout: string; exitCode: number } {
	const ifaces = net.getInterfaces();
	const lines: string[] = [];

	for (const iface of ifaces) {
		lines.push(_formatInterface(iface));
		lines.push("");
	}

	return { stdout: lines.join("\n"), exitCode: 0 };
}

function _showInterface(iface: import("../modules/VirtualNetworkManager/types").VirtualInterface): { stdout: string; exitCode: number } {
	return { stdout: _formatInterface(iface) + "\n", exitCode: 0 };
}

function _formatInterface(iface: import("../modules/VirtualNetworkManager/types").VirtualInterface): string {
	const flags = _getFlags(iface);
	const lines: string[] = [];
	lines.push(`${iface.name}: flags=${flags}  mtu ${iface.mtu}`);

	if (iface.type === "loopback") {
		lines.push(`        loop  txqueuelen 1000  (Local Loopback)`);
	} else {
		lines.push(`        ether ${iface.mac}  txqueuelen 1000  (Ethernet)`);
	}

	lines.push(`        inet ${iface.ipv4}  netmask ${_cidrToMask(iface.ipv4Mask)}  broadcast ${_getBroadcast(iface.ipv4, iface.ipv4Mask)}`);
	lines.push(`        inet6 ${iface.ipv6}  prefixlen 64  scopeid 0x0 <link>`);

	const rxBytes = Math.floor(Math.random() * 1000000);
	const txBytes = Math.floor(Math.random() * 500000);
	const rxPackets = Math.floor(rxBytes / 64);
	const txPackets = Math.floor(txBytes / 64);

	lines.push(`        RX packets ${rxPackets}  bytes ${rxBytes} (${_formatBytes(rxBytes)})`);
	lines.push(`        RX errors 0  dropped 0  overruns 0  frame 0`);
	lines.push(`        TX packets ${txPackets}  bytes ${txBytes} (${_formatBytes(txBytes)})`);
	lines.push(`        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0`);

	if (iface.speed) {
		lines.push(`        Speed: ${iface.speed}Mb/s  Duplex: ${iface.duplex ?? "full"}`);
	}

	return lines.join("\n");
}

function _getFlags(iface: import("../modules/VirtualNetworkManager/types").VirtualInterface): number {
	let flags = 0x1000;
	if (iface.state === "UP") flags |= 0x1;
	if (iface.type !== "loopback") flags |= 0x2 | 0x1000;
	if (iface.type === "loopback") flags |= 0x8;
	return flags;
}

function _cidrToMask(cidr: number): string {
	const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
	return [
		(mask >>> 24) & 0xff,
		(mask >>> 16) & 0xff,
		(mask >>> 8) & 0xff,
		mask & 0xff,
	].join(".");
}

function _maskToCidr(mask: string): number {
	return mask.split(".").reduce((acc, oct) => acc + (parseInt(oct, 10) ? parseInt(oct, 10).toString(2).split("1").length - 1 : 0), 0);
}

function _getBroadcast(ip: string, cidr: number): string {
	const ipInt = ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct, 10), 0) >>> 0;
	const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
	const broadcast = (ipInt & mask) | (~mask >>> 0);
	return [
		(broadcast >>> 24) & 0xff,
		(broadcast >>> 16) & 0xff,
		(broadcast >>> 8) & 0xff,
		broadcast & 0xff,
	].join(".");
}

function _formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
	if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MiB`;
	return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GiB`;
}
