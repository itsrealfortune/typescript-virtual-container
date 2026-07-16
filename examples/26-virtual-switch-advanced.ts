/**
 * 26 - Virtual Switch Advanced
 *
 * Demonstrates the VirtualSwitch API including DNS resolution, traffic
 * shaping, load balancing, and network partitions for isolation.
 */

import { VirtualShell, VirtualSwitch } from "../src";

const NET = new VirtualSwitch("10.0.0.0/24");

// ── Attach VMs ────────────────────────────────────────────────────
console.log("--- Attach VMs ---");
const VM1 = new VirtualShell("app-1");
await VM1.ensureInitialized();
const PORT1 = NET.attach(VM1, "10.0.0.10");
console.log(`  app-1: ${PORT1.ip} / ${PORT1.mac}`);

const VM2 = new VirtualShell("app-2");
await VM2.ensureInitialized();
const PORT2 = NET.attach(VM2, "10.0.0.11");
console.log(`  app-2: ${PORT2.ip} / ${PORT2.mac}`);

const VM3 = new VirtualShell("db-1");
await VM3.ensureInitialized();
const PORT3 = NET.attach(VM3, "10.0.0.20");
console.log(`  db-1: ${PORT3.ip} / ${PORT3.mac}`);

console.log(`\n  Total ports: ${NET.getPorts().size}`);

// ── DNS records ───────────────────────────────────────────────────
console.log("\n--- DNS records ---");
NET.addDnsRecord("app.example.com", "10.0.0.10");
NET.addDnsRecord("app.example.com", "10.0.0.11");
NET.addDnsRecord("db.example.com", "10.0.0.20");

for (const RECORD of NET.listDnsRecords()) {
	console.log(`  ${RECORD.hostname} → ${RECORD.ip}`);
}

console.log(
	`\n  app.example.com resolves to: ${NET.resolveDns("app.example.com")}`
);
console.log(
	`  db.example.com resolves to: ${NET.resolveDns("db.example.com")}`
);

// ── Traffic shaping (latency + jitter) ────────────────────────────
console.log("\n--- Traffic shaping (latency) ---");
NET.setTrafficRule(PORT1.mac, {
	vms: [PORT1.mac],
	maxBandwidthMbps: 100,
	latencyMs: 50, // 50ms added latency
	jitterMs: 10, // +/-10ms variation
});
console.log(`  Rule applied to ${PORT1.mac} (latency: 50ms, jitter: 10ms)`);

// ── Qdisc (queuing discipline) ────────────────────────────────────
console.log("\n--- Qdisc rules ---");
NET.addQdiscRule(PORT1.mac, {
	interface: "eth0",
	type: "netem",
	latencyMs: 100,
	packetLossPct: 5,
});
console.log(`  qdisc: eth0 on ${PORT1.mac} (loss: 5%, latency: 100ms)`);
for (const RULE of NET.getQdiscRules(PORT1.mac)) {
	console.log(
		`    ${RULE.interface}: ${RULE.type} loss=${RULE.packetLossPct}% latency=${RULE.latencyMs}ms`
	);
}

// ── Load balancing ────────────────────────────────────────────────
console.log("\n--- Load balancing ---");
NET.addLoadBalancer({
	name: "app-lb",
	port: 80,
	algorithm: "round-robin",
	targets: [
		{ hostname: "app-1", port: 80, weight: 1 },
		{ hostname: "app-2", port: 80, weight: 2 },
	],
});

for (let i = 0; i < 3; i++) {
	const RESOLVED = NET.resolveLoadBalancer(80);
	if (RESOLVED) {
		console.log(
			`  Request ${i + 1}: routed to ${RESOLVED.hostname} (${RESOLVED.ip})`
		);
	}
}

// ── Network partitions ────────────────────────────────────────────
console.log("\n--- Network partitions ---");
NET.setPartitions([
	["app-1", "app-2"], // app tier can communicate
	["db-1"], // database isolated
]);
console.log("  Partitions: app-tier {app-1, app-2}, database {db-1}");
console.log("  app-1 can reach app-2: yes (same partition)");
console.log("  app-1 can reach db-1: no (different partition)");

// ── Traffic statistics ────────────────────────────────────────────
console.log("\n--- Traffic stats ---");
console.log(`  Bytes sent by app-1: ${NET.getBytesSent(PORT1.mac)}`);
console.log(`  Bytes received by app-1: ${NET.getBytesReceived(PORT1.mac)}`);

// ── Cleanup ───────────────────────────────────────────────────────
console.log("\n--- Detach VMs ---");
NET.detach(PORT1.mac);
NET.detach(PORT2.mac);
NET.detach(PORT3.mac);
console.log(`  Ports remaining: ${NET.getPorts().size}`);
