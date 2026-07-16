/**
 * 08 - Snapshot Diff in Tests
 *
 * Demonstrates capturing VFS snapshots before and after an operation,
 * then asserting on the diff to verify expected changes.
 */

import { assertDiff, diffSnapshots, VirtualFileSystem } from "../src";

// ── Setup initial state ───────────────────────────────────────────
console.log("--- Setup initial state ---");
const VFS = new VirtualFileSystem();
VFS.mkdir("/app");
VFS.writeFile("/app/index.js", "console.log('hello')");
VFS.writeFile("/var/log/syslog", "system boot");

const BEFORE = VFS.toSnapshot();
console.log("Before snapshot captured");

// ── Simulate operations ───────────────────────────────────────────
console.log("\n--- Simulate operations ---");
VFS.writeFile("/usr/bin/vim", "#!/bin/sh\nvim");
VFS.mkdir("/app/src");
VFS.writeFile("/app/src/main.js", "export default {}");
VFS.writeFile("/var/log/syslog", "system boot\npackage installed");

const AFTER = VFS.toSnapshot();
console.log("After snapshot captured");

// ── Compute and display diff ──────────────────────────────────────
console.log("\n--- Compute and display diff ---");
const DIFF = diffSnapshots(BEFORE, AFTER);

console.log("Added files:");
for (const ENTRY of DIFF.added) {
	console.log(`  + ${ENTRY.path}`);
}

console.log("\nModified files:");
for (const ENTRY of DIFF.modified) {
	console.log(`  ~ ${ENTRY.path}`);
}

console.log("\nRemoved files:");
for (const ENTRY of DIFF.removed) {
	console.log(`  - ${ENTRY.path}`);
}

// ── Assert expected changes ───────────────────────────────────────
console.log("\n--- Assert expected changes ---");
assertDiff(DIFF, {
	added: ["/usr/bin/vim", "/app/src", "/app/src/main.js"],
	modified: ["/var/log/syslog"],
});

console.log("[OK] All assertions passed");
