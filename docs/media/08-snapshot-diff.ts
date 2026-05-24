/**
 * 08 - Snapshot Diff in Tests
 *
 * Demonstrates capturing VFS snapshots before and after an operation,
 * then asserting on the diff to verify expected changes.
 */

import {assertDiff, diffSnapshots, VirtualFileSystem} from "../src";

// ── Setup initial state ───────────────────────────────────────────
console.log("--- Setup initial state ---");
const vfs = new VirtualFileSystem();
vfs.mkdir("/app");
vfs.writeFile("/app/index.js", "console.log('hello')");
vfs.writeFile("/var/log/syslog", "system boot");

const before = vfs.toSnapshot();
console.log("Before snapshot captured");

// ── Simulate operations ───────────────────────────────────────────
console.log("\n--- Simulate operations ---");
vfs.writeFile("/usr/bin/vim", "#!/bin/sh\nvim");
vfs.mkdir("/app/src");
vfs.writeFile("/app/src/main.js", "export default {}");
vfs.writeFile("/var/log/syslog", "system boot\npackage installed");

const after = vfs.toSnapshot();
console.log("After snapshot captured");

// ── Compute and display diff ──────────────────────────────────────
console.log("\n--- Compute and display diff ---");
const diff = diffSnapshots(before, after);

console.log("Added files:");
for (const entry of diff.added) {
	console.log(`  + ${entry.path}`);
}

console.log("\nModified files:");
for (const entry of diff.modified) {
	console.log(`  ~ ${entry.path}`);
}

console.log("\nRemoved files:");
for (const entry of diff.removed) {
	console.log(`  - ${entry.path}`);
}

// ── Assert expected changes ───────────────────────────────────────
console.log("\n--- Assert expected changes ---");
assertDiff(diff, {
	added: ["/usr/bin/vim", "/app/src", "/app/src/main.js"],
	modified: ["/var/log/syslog"],
});

console.log("[OK] All assertions passed");
