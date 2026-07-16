/**
 * 24 - Idle Manager
 *
 * Demonstrates the IdleManager API: monitoring shell inactivity,
 * automatic freeze after idle threshold, thaw on activity, garbage
 * collection of unused resources, and manual GC triggers.
 */

import { VirtualShell } from "../src";

const SHELL = new VirtualShell("idle-demo");
await SHELL.ensureInitialized();

// ── Enable idle management ────────────────────────────────────────
console.log("--- Enabling idle management ---");
SHELL.enableIdleManagement({
	idleThresholdMs: 2_000, // freeze after 2s inactivity
	checkIntervalMs: 500, // check every 500ms
	gcIntervalMs: 5_000, // GC every 5s
});

console.log(`  idle state: ${SHELL.idleState}`); // "active"
console.log(`  idle duration: ${SHELL.idleMs}ms`);

// ── Simulate activity ─────────────────────────────────────────────
console.log("\n--- Activity simulation ---");
await SHELL.executeCommand("echo 'user activity'", "root", "/root");
SHELL.pingIdle();
console.log(`  idle state: ${SHELL.idleState}`); // "active"

// ── Wait for freeze ───────────────────────────────────────────────
console.log("\n--- Waiting for idle threshold (2s)...");
await new Promise((r) => setTimeout(r, 3_000));
console.log(`  idle state: ${SHELL.idleState}`); // "frozen"
console.log(`  idle duration: ${SHELL.idleMs}ms`);

// ── Thaw on activity ──────────────────────────────────────────────
console.log("\n--- Activity triggers thaw ---");
SHELL.pingIdle();
console.log(`  idle state: ${SHELL.idleState}`); // "active"

// ── Manual garbage collection ─────────────────────────────────────
console.log("\n--- Manual GC ---");
const GC_STATS = SHELL.runGc();
if (GC_STATS) {
	console.log(`  GC stats: ${JSON.stringify(GC_STATS)}`);
}

// ── Disable idle management ───────────────────────────────────────
console.log("\n--- Disabling idle management ---");
SHELL.disableIdleManagement();
console.log(`  idle state: ${SHELL.idleState}`);
