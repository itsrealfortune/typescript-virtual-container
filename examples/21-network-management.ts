/**
 * 21 - Network Management
 *
 * Demonstrates the VirtualNetworkManager API for creating interfaces,
 * adding routes, configuring firewall rules, and inspecting conntrack.
 */

import { VirtualShell } from "../src";

const SHELL = new VirtualShell("network-demo");
await SHELL.ensureInitialized();

const NET = SHELL.network;

// ── Interfaces ────────────────────────────────────────────────────
console.log("--- Interfaces ---");
NET.addInterface({
	name: "eth0",
	type: "ether",
	mac: "02:42:ac:10:00:01",
	mtu: 1500,
	ipv4: "10.0.0.1",
	ipv4Mask: 8,
	ipv6: "::1",
	speed: 1000,
});
NET.addInterface({
	name: "eth1",
	type: "ether",
	mac: "02:42:ac:10:00:02",
	mtu: 1500,
	ipv4: "192.168.1.1",
	ipv4Mask: 24,
	ipv6: "::1",
	speed: 100,
});
NET.addInterface({
	name: "lo",
	type: "loopback",
	mac: "00:00:00:00:00:00",
	mtu: 65536,
	ipv4: "127.0.0.1",
	ipv4Mask: 8,
	ipv6: "::1",
});

NET.setInterfaceState("eth0", "UP");
NET.setInterfaceState("eth1", "UP");

console.log(NET.formatIpAddr());

// ── Routes ────────────────────────────────────────────────────────
console.log("--- Routes ---");
NET.addRoute("10.0.0.0/8", "0.0.0.0", "255.0.0.0", "eth0");
NET.addRoute("0.0.0.0/0", "10.0.0.1", "0.0.0.0", "eth0", 100);
NET.addRoute("192.168.1.0/24", "0.0.0.0", "255.255.255.0", "eth1");

console.log(NET.formatIpRoute());

// ── Policy routing ────────────────────────────────────────────────
console.log("--- Policy routing ---");
NET.addRoutingTable("custom");
NET.addRouteToTable("10.0.0.0/8", "10.0.0.1", "255.0.0.0", "eth0", 1);
NET.addPolicyRule({ from: "10.0.0.0/8", table: 1, action: "lookup" });
console.log(NET.formatIpRule());

// ── Firewall ──────────────────────────────────────────────────────
console.log("\n--- Firewall (iptables simulation) ---");
NET.addFirewallRule({
	chain: "INPUT",
	protocol: "tcp",
	source: "0.0.0.0/0",
	destination: "10.0.0.1",
	destPort: 22,
	action: "ACCEPT",
});
NET.addFirewallRule({
	chain: "INPUT",
	protocol: "tcp",
	source: "0.0.0.0/0",
	destination: "10.0.0.1",
	destPort: 80,
	action: "ACCEPT",
});
NET.addFirewallRule({
	chain: "INPUT",
	protocol: "tcp",
	source: "0.0.0.0/0",
	destination: "10.0.0.1",
	destPort: 443,
	action: "ACCEPT",
});
NET.setPolicy("INPUT", "DROP");

console.log(NET.formatFirewall());

// ── Check firewall ────────────────────────────────────────────────
console.log("\n--- Firewall checks ---");
const CHECKS: Array<{
	proto: "tcp" | "udp" | "icmp" | "all";
	dst: string;
	port: number;
}> = [
	{ proto: "tcp", dst: "10.0.0.1", port: 22 },
	{ proto: "tcp", dst: "10.0.0.1", port: 8080 },
	{ proto: "tcp", dst: "10.0.0.1", port: 443 },
];
for (const { proto, dst, port } of CHECKS) {
	const RESULT = NET.checkFirewall("INPUT", proto, "10.0.0.2", dst, port);
	console.log(`  ${proto} ${dst}:${port} → ${RESULT}`);
}

// ── Conntrack ─────────────────────────────────────────────────────
console.log("\n--- Conntrack ---");
NET.updateConntrack("10.0.0.2", "10.0.0.1", "tcp", 40000, 80, 1024);
NET.updateConntrack("10.0.0.2", "8.8.8.8", "udp", 40001, 53, 64);
console.log(`  Entries: ${NET.getConntrackCount()}/${NET.getConntrackMax()}`);
console.log(NET.formatConntrack());

// ── ARP cache ─────────────────────────────────────────────────────
console.log("\n--- ARP cache ---");
if (NET.getArpCache().length === 0) {
	console.log("  (ARP cache empty — populate via traffic)");
} else {
	for (const ENTRY of NET.getArpCache()) {
		console.log(`  ${ENTRY.ip.padEnd(15)} ${ENTRY.mac}  ${ENTRY.device}`);
	}
}
