/**
 * Example 08: Snapshot Diff in Tests
 *
 * Demonstrates capturing VFS snapshots before and after an operation,
 * then asserting on the diff to verify expected changes.
 */

import { assertDiff, diffSnapshots } from "../src";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";

// Setup: create initial state
const vfs = new VirtualFileSystem();
vfs.mkdir("/app");
vfs.writeFile("/app/index.js", "console.log('hello')");
vfs.writeFile("/var/log/syslog", "system boot");

const before = vfs.toSnapshot();
console.log("Before snapshot captured\n");

// Simulate operations: install a package, create a directory
vfs.writeFile("/usr/bin/vim", "#!/bin/sh\nvim");
vfs.mkdir("/app/src");
vfs.writeFile("/app/src/main.js", "export default {}");
vfs.writeFile("/var/log/syslog", "system boot\npackage installed");

const after = vfs.toSnapshot();
console.log("After snapshot captured\n");

// Compute and display the diff
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

// Assert expected changes
assertDiff(diff, {
	added: ["/usr/bin/vim", "/app/src", "/app/src/main.js"],
	modified: ["/var/log/syslog"],
});

console.log("\n✅ All assertions passed");
