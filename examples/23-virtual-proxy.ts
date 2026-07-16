/**
 * 23 - Virtual Proxy
 *
 * Demonstrates the VirtualProxy API: expose VM ports to the host,
 * list and remove port forwards, and manage port lifecycle.
 */

import { Baie, VirtualProxy } from "../src";

const BAIE = new Baie("proxy-demo", "10.0.0.0/24");

await BAIE.createVM("web-server");
await BAIE.createVM("client");

const PROXY = new VirtualProxy(BAIE);

// ── Port forwarding (use port 0 for OS-assigned ports) ────────────
console.log("--- Port forwarding ---");

PROXY.exposePort("web-server", 80, 34501);
PROXY.exposePort("web-server", 22, 34502);
PROXY.exposePort("client", 3000, 34503);

// Wait for async listen callbacks to fire
await new Promise((r) => setTimeout(r, 100));

console.log(`  Forwards active: ${PROXY.listPorts().length}`);

// ── List forwards ─────────────────────────────────────────────────
console.log("\n--- Active forwards ---");
for (const f of PROXY.listPorts()) {
	console.log(`  ${f.vmName}:${f.vmPort} ↔ host:${f.hostPort}`);
}

// ── Remove a forward ──────────────────────────────────────────────
const FIRST = PROXY.listPorts()[0];
if (FIRST) {
	PROXY.removePort(FIRST.hostPort);
	await new Promise((r) => setTimeout(r, 50));
}
console.log(`  Forwards remaining: ${PROXY.listPorts().length}`);

// ── Stop everything ───────────────────────────────────────────────
console.log("\n--- Cleanup ---");
PROXY.stop();
console.log("  All forwards stopped");

BAIE.destroyVM("web-server");
BAIE.destroyVM("client");
