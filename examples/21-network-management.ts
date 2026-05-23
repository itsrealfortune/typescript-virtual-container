/**
 * 21 - Network Management
 *
 * Demonstrates the VirtualNetworkManager API for creating interfaces,
 * adding routes, configuring firewall rules, and inspecting conntrack.
 */

import {VirtualShell} from "../src";

const shell = new VirtualShell("network-demo");
await shell.ensureInitialized();

const net = shell.network;

// ── Interfaces ────────────────────────────────────────────────────
console.log("--- Interfaces ---");
net.addInterface({
	name: "eth0",
	type: "ether",
	mac: "02:42:ac:10:00:01",
	mtu: 1500,
	ipv4: "10.0.0.1",
	ipv4Mask: 8,
	ipv6: "::1",
	speed: 1000,
});
net.addInterface({
	name: "eth1",
	type: "ether",
	mac: "02:42:ac:10:00:02",
	mtu: 1500,
	ipv4: "192.168.1.1",
	ipv4Mask: 24,
	ipv6: "::1",
	speed: 100,
});
net.addInterface({
	name: "lo",
	type: "loopback",
	mac: "00:00:00:00:00:00",
	mtu: 65536,
	ipv4: "127.0.0.1",
	ipv4Mask: 8,
	ipv6: "::1",
});

net.setInterfaceState("eth0", "UP");
net.setInterfaceState("eth1", "UP");

console.log(net.formatIpAddr());

// ── Routes ────────────────────────────────────────────────────────
console.log("--- Routes ---");
net.addRoute("10.0.0.0/8", "0.0.0.0", "255.0.0.0", "eth0");
net.addRoute("0.0.0.0/0", "10.0.0.1", "0.0.0.0", "eth0", 100);
net.addRoute("192.168.1.0/24", "0.0.0.0", "255.255.255.0", "eth1");

console.log(net.formatIpRoute());

// ── Policy routing ────────────────────────────────────────────────
console.log("--- Policy routing ---");
net.addRoutingTable("custom");
net.addRouteToTable("10.0.0.0/8", "10.0.0.1", "255.0.0.0", "eth0", 1);
net.addPolicyRule({from: "10.0.0.0/8", table: 1, action: "lookup"});
console.log(net.formatIpRule());

// ── Firewall ──────────────────────────────────────────────────────
console.log("\n--- Firewall (iptables simulation) ---");
net.addFirewallRule({
	chain: "INPUT",
	protocol: "tcp",
	source: "0.0.0.0/0",
	destination: "10.0.0.1",
	destPort: 22,
	action: "ACCEPT",
});
net.addFirewallRule({
	chain: "INPUT",
	protocol: "tcp",
	source: "0.0.0.0/0",
	destination: "10.0.0.1",
	destPort: 80,
	action: "ACCEPT",
});
net.addFirewallRule({
	chain: "INPUT",
	protocol: "tcp",
	source: "0.0.0.0/0",
	destination: "10.0.0.1",
	destPort: 443,
	action: "ACCEPT",
});
net.setPolicy("INPUT", "DROP");

console.log(net.formatFirewall());

// ── Check firewall ────────────────────────────────────────────────
console.log("\n--- Firewall checks ---");
const checks: Array<{
	proto: "tcp" | "udp" | "icmp" | "all";
	dst: string;
	port: number;
}> = [
	{proto: "tcp", dst: "10.0.0.1", port: 22},
	{proto: "tcp", dst: "10.0.0.1", port: 8080},
	{proto: "tcp", dst: "10.0.0.1", port: 443},
];
for (const {proto, dst, port} of checks) {
	const result = net.checkFirewall("INPUT", proto, "10.0.0.2", dst, port);
	console.log(`  ${proto} ${dst}:${port} → ${result}`);
}

// ── Conntrack ─────────────────────────────────────────────────────
console.log("\n--- Conntrack ---");
net.updateConntrack("10.0.0.2", "10.0.0.1", "tcp", 40000, 80, 1024);
net.updateConntrack("10.0.0.2", "8.8.8.8", "udp", 40001, 53, 64);
console.log(`  Entries: ${net.getConntrackCount()}/${net.getConntrackMax()}`);
console.log(net.formatConntrack());

// ── ARP cache ─────────────────────────────────────────────────────
console.log("\n--- ARP cache ---");
if (net.getArpCache().length === 0) {
	console.log("  (ARP cache empty — populate via traffic)");
} else {
	for (const entry of net.getArpCache()) {
		console.log(`  ${entry.ip.padEnd(15)} ${entry.mac}  ${entry.device}`);
	}
}
