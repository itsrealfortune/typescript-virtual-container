/**
 * Virtual Proxy (port forwarding)
 *
 * Demonstrates the VirtualProxy API: expose VM ports to the host,
 * list port forwards, remove forwards, and port lifecycle.
 */

import { Baie, VirtualProxy } from "../src";

const baie = new Baie("proxy-demo", "10.0.0.0/24");

await baie.createVM("web-server");
await baie.createVM("client");

const proxy = new VirtualProxy(baie);

// ── Port forwarding (use port 0 for OS-assigned ports) ────────────
console.log("--- Port forwarding ---");

proxy.exposePort("web-server", 80, 34501);
proxy.exposePort("web-server", 22, 34502);
proxy.exposePort("client", 3000, 34503);

// Wait for async listen callbacks to fire
await new Promise((r) => setTimeout(r, 100));

console.log(`  Forwards active: ${proxy.listPorts().length}`);

// ── List forwards ─────────────────────────────────────────────────
console.log("\n--- Active forwards ---");
for (const f of proxy.listPorts()) {
	console.log(`  ${f.vmName}:${f.vmPort} ↔ host:${f.hostPort}`);
}

// ── Remove a forward ──────────────────────────────────────────────
const first = proxy.listPorts()[0];
if (first) {
	proxy.removePort(first.hostPort);
	await new Promise((r) => setTimeout(r, 50));
}
console.log(`  Forwards remaining: ${proxy.listPorts().length}`);

// ── Stop everything ───────────────────────────────────────────────
console.log("\n--- Cleanup ---");
proxy.stop();
console.log("  All forwards stopped");

await baie.destroyVM("web-server");
await baie.destroyVM("client");
