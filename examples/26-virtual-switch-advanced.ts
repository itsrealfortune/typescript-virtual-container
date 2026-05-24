/**
 * 26 - Virtual Switch Advanced
 *
 * Demonstrates the VirtualSwitch API including DNS resolution, traffic
 * shaping, load balancing, and network partitions for isolation.
 */

import { VirtualShell, VirtualSwitch } from "../src";

const net = new VirtualSwitch("10.0.0.0/24");

// ── Attach VMs ────────────────────────────────────────────────────
console.log("--- Attach VMs ---");
const vm1 = new VirtualShell("app-1");
await vm1.ensureInitialized();
const port1 = net.attach(vm1, "10.0.0.10");
console.log(`  app-1: ${port1.ip} / ${port1.mac}`);

const vm2 = new VirtualShell("app-2");
await vm2.ensureInitialized();
const port2 = net.attach(vm2, "10.0.0.11");
console.log(`  app-2: ${port2.ip} / ${port2.mac}`);

const vm3 = new VirtualShell("db-1");
await vm3.ensureInitialized();
const port3 = net.attach(vm3, "10.0.0.20");
console.log(`  db-1: ${port3.ip} / ${port3.mac}`);

console.log(`\n  Total ports: ${net.getPorts().size}`);

// ── DNS records ───────────────────────────────────────────────────
console.log("\n--- DNS records ---");
net.addDnsRecord("app.example.com", "10.0.0.10");
net.addDnsRecord("app.example.com", "10.0.0.11");
net.addDnsRecord("db.example.com", "10.0.0.20");

for (const record of net.listDnsRecords()) {
	console.log(`  ${record.hostname} → ${record.ip}`);
}

console.log(
	`\n  app.example.com resolves to: ${net.resolveDns("app.example.com")}`
);
console.log(
	`  db.example.com resolves to: ${net.resolveDns("db.example.com")}`
);

// ── Traffic shaping (latency + jitter) ────────────────────────────
console.log("\n--- Traffic shaping (latency) ---");
net.setTrafficRule(port1.mac, {
	vms: [port1.mac],
	maxBandwidthMbps: 100,
	latencyMs: 50, // 50ms added latency
	jitterMs: 10, // +/-10ms variation
});
console.log(`  Rule applied to ${port1.mac} (latency: 50ms, jitter: 10ms)`);

// ── Qdisc (queuing discipline) ────────────────────────────────────
console.log("\n--- Qdisc rules ---");
net.addQdiscRule(port1.mac, {
	interface: "eth0",
	type: "netem",
	latencyMs: 100,
	packetLossPct: 5,
});
console.log(`  qdisc: eth0 on ${port1.mac} (loss: 5%, latency: 100ms)`);
for (const rule of net.getQdiscRules(port1.mac)) {
	console.log(
		`    ${rule.interface}: ${rule.type} loss=${rule.packetLossPct}% latency=${rule.latencyMs}ms`
	);
}

// ── Load balancing ────────────────────────────────────────────────
console.log("\n--- Load balancing ---");
net.addLoadBalancer({
	name: "app-lb",
	port: 80,
	algorithm: "round-robin",
	targets: [
		{ hostname: "app-1", port: 80, weight: 1 },
		{ hostname: "app-2", port: 80, weight: 2 },
	],
});

for (let i = 0; i < 3; i++) {
	const resolved = net.resolveLoadBalancer(80);
	if (resolved) {
		console.log(
			`  Request ${i + 1}: routed to ${resolved.hostname} (${resolved.ip})`
		);
	}
}

// ── Network partitions ────────────────────────────────────────────
console.log("\n--- Network partitions ---");
net.setPartitions([
	["app-1", "app-2"], // app tier can communicate
	["db-1"], // database isolated
]);
console.log("  Partitions: app-tier {app-1, app-2}, database {db-1}");
console.log("  app-1 can reach app-2: yes (same partition)");
console.log("  app-1 can reach db-1: no (different partition)");

// ── Traffic statistics ────────────────────────────────────────────
console.log("\n--- Traffic stats ---");
console.log(`  Bytes sent by app-1: ${net.getBytesSent(port1.mac)}`);
console.log(`  Bytes received by app-1: ${net.getBytesReceived(port1.mac)}`);

// ── Cleanup ───────────────────────────────────────────────────────
console.log("\n--- Detach VMs ---");
net.detach(port1.mac);
net.detach(port2.mac);
net.detach(port3.mac);
console.log(`  Ports remaining: ${net.getPorts().size}`);
