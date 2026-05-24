/**
 * 28 - Virtual VPN Tunnel
 *
 * Demonstrates VirtualVpn — an encrypted tunnel between two virtual
 * switch subnets. Traffic is AES-256-CBC encrypted, tunneled with
 * simulated latency, decrypted, and routed on the destination switch.
 */

import { VirtualVpn } from "../src/modules/VirtualVpn/index";
import { VirtualSwitch } from "../src";

// ── Two isolated subnets ──────────────────────────────────────────
console.log("--- Create subnets ---");
const dc1 = new VirtualSwitch("10.0.1.0/24");
const dc2 = new VirtualSwitch("10.0.2.0/24");
console.log(`  DC-1: ${dc1.subnet}`);
console.log(`  DC-2: ${dc2.subnet}`);

// ── VPN tunnel ────────────────────────────────────────────────────
console.log("\n--- VPN tunnel ---");
const vpn = new VirtualVpn(
	{ switch: dc1 },
	{ switch: dc2 },
	{ key: "shared-secret", latencyMs: 30 }
);
console.log("  Tunnel established (30ms latency)");

// ── Route traffic between subnets ──────────────────────────────────
console.log("\n--- Tunnel traffic ---");
// Packet from DC-1 → DC-2 (10.0.2.10 is in dc2's subnet)
const pkt = {
	srcIp: "10.0.1.10",
	dstIp: "10.0.2.10",
	protocol: "tcp" as const,
	srcPort: 40000,
	dstPort: 80,
	payload: Buffer.from("GET / HTTP/1.1"),
};
const result = await vpn.tunnel(pkt);
console.log(
	`  Tunnel result: ${result.action} (latency: ${result.latencyMs}ms)`
);

// Packet from DC-2 → DC-1 (10.0.1.10 is in dc1's subnet)
const pkt2 = {
	srcIp: "10.0.2.10",
	dstIp: "10.0.1.10",
	protocol: "tcp" as const,
	srcPort: 50000,
	dstPort: 22,
	payload: Buffer.from("SSH handshake"),
};
const result2 = await vpn.tunnel(pkt2);
console.log(
	`  Reverse tunnel: ${result2.action} (latency: ${result2.latencyMs}ms)`
);

// Unknown destination (not in either subnet)
const pkt3 = {
	srcIp: "10.0.1.10",
	dstIp: "8.8.8.8",
	protocol: "udp" as const,
	srcPort: 40001,
	dstPort: 53,
};
const result3 = await vpn.tunnel(pkt3);
console.log(`  Unknown dst: ${result3.action}`); // DROP

// ── Peer routing (multi-site) ─────────────────────────────────────
console.log("\n--- Multi-site ---");
const dc3 = new VirtualSwitch("10.0.3.0/24");
const vpn2 = new VirtualVpn(
	{ switch: dc1 },
	{ switch: dc3 },
	{ key: "peer-key", latencyMs: 50 }
);
vpn.addPeer(vpn2);
console.log("  DC-3 peer added (50ms latency)");
console.log("  DC-1 ↔ DC-2 via tunnel, DC-1 ↔ DC-3 via peer");
