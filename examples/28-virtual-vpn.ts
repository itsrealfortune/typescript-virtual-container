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
const DC1 = new VirtualSwitch("10.0.1.0/24");
const DC2 = new VirtualSwitch("10.0.2.0/24");
console.log(`  DC-1: ${DC1.subnet}`);
console.log(`  DC-2: ${DC2.subnet}`);

// ── VPN tunnel ────────────────────────────────────────────────────
console.log("\n--- VPN tunnel ---");
const VPN = new VirtualVpn(
	{ switch: DC1 },
	{ switch: DC2 },
	{ key: "shared-secret", latencyMs: 30 }
);
console.log("  Tunnel established (30ms latency)");

// ── Route traffic between subnets ──────────────────────────────────
console.log("\n--- Tunnel traffic ---");
// Packet from DC-1 → DC-2 (10.0.2.10 is in dc2's subnet)
const PKT = {
	srcIp: "10.0.1.10",
	srcMac: "02:42:0a:00:01:0a" as const,
	dstIp: "10.0.2.10",
	protocol: "tcp" as const,
	srcPort: 40000,
	dstPort: 80,
	payload: "GET / HTTP/1.1",
};
const RESULT = await VPN.tunnel(PKT);
console.log(
	`  Tunnel result: ${RESULT.action} (latency: ${RESULT.latencyMs}ms)`
);

// Packet from DC-2 → DC-1 (10.0.1.10 is in dc1's subnet)
const PKT2 = {
	srcIp: "10.0.2.10",
	srcMac: "02:42:0a:00:02:0a" as const,
	dstIp: "10.0.1.10",
	protocol: "tcp" as const,
	srcPort: 50000,
	dstPort: 22,
	payload: "SSH handshake",
};
const RESULT2 = await VPN.tunnel(PKT2);
console.log(
	`  Reverse tunnel: ${RESULT2.action} (latency: ${RESULT2.latencyMs}ms)`
);

// Unknown destination (not in either subnet)
const PKT3 = {
	srcIp: "10.0.1.10",
	srcMac: "02:42:0a:00:01:0a" as const,
	dstIp: "8.8.8.8",
	protocol: "udp" as const,
	srcPort: 40001,
	dstPort: 53,
};
const RESULT3 = await VPN.tunnel(PKT3);
console.log(`  Unknown dst: ${RESULT3.action}`); // DROP

// ── Peer routing (multi-site) ─────────────────────────────────────
console.log("\n--- Multi-site ---");
const DC3 = new VirtualSwitch("10.0.3.0/24");
const VPN2 = new VirtualVpn(
	{ switch: DC1 },
	{ switch: DC3 },
	{ key: "peer-key", latencyMs: 50 }
);
VPN.addPeer(VPN2);
console.log("  DC-3 peer added (50ms latency)");
console.log("  DC-1 ↔ DC-2 via tunnel, DC-1 ↔ DC-3 via peer");
