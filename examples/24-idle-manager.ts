/**
 * 24 - Idle Manager
 *
 * Demonstrates the IdleManager API: monitoring shell inactivity,
 * automatic freeze after idle threshold, thaw on activity, garbage
 * collection of unused resources, and manual GC triggers.
 */

import { VirtualShell } from "../src";

const shell = new VirtualShell("idle-demo");
shell.ensureInitialized();

// ── Enable idle management ────────────────────────────────────────
console.log("--- Enabling idle management ---");
shell.enableIdleManagement({
	idleThresholdMs: 2_000,   // freeze after 2s inactivity
	checkIntervalMs: 500,      // check every 500ms
	gcIntervalMs: 5_000,       // GC every 5s
});

console.log(`  idle state: ${shell.idleState}`);   // "active"
console.log(`  idle duration: ${shell.idleMs}ms`);

// ── Simulate activity ─────────────────────────────────────────────
console.log("\n--- Activity simulation ---");
await shell.executeCommand("echo 'user activity'", "root", "/root");
shell.pingIdle();
console.log(`  idle state: ${shell.idleState}`);   // "active"

// ── Wait for freeze ───────────────────────────────────────────────
console.log("\n--- Waiting for idle threshold (2s)...");
await new Promise((r) => setTimeout(r, 3_000));
console.log(`  idle state: ${shell.idleState}`);   // "frozen"
console.log(`  idle duration: ${shell.idleMs}ms`);

// ── Thaw on activity ──────────────────────────────────────────────
console.log("\n--- Activity triggers thaw ---");
shell.pingIdle();
console.log(`  idle state: ${shell.idleState}`);   // "active"

// ── Manual garbage collection ─────────────────────────────────────
console.log("\n--- Manual GC ---");
const gcStats = shell.runGc();
if (gcStats) {
	console.log(`  GC stats: ${JSON.stringify(gcStats)}`);
}

// ── Disable idle management ───────────────────────────────────────
console.log("\n--- Disabling idle management ---");
shell.disableIdleManagement();
console.log(`  idle state: ${shell.idleState}`);
