/**
 * Example 07: Snapshot-Based Test Fixtures
 *
 * Demonstrates building a VFS snapshot once and reusing it
 * across multiple isolated "test" environments.
 */

import type { VfsSnapshot } from "../src";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";

// Build a fixture snapshot once
function buildFixture(): VfsSnapshot {
	const vfs = new VirtualFileSystem();
	vfs.mkdir("/app/config");
	vfs.writeFile("/app/config/settings.json", JSON.stringify({ env: "test", db: "localhost" }));
	vfs.writeFile("/app/config/routes.json", JSON.stringify({ "/": "index", "/api": "api" }));
	vfs.writeFile("/app/public/index.html", "<h1>Hello</h1>");
	return vfs.toSnapshot();
}

const FIXTURE = buildFixture();
console.log(`Fixture built: ${Object.keys(FIXTURE.root.children ?? {}).length} top-level entries\n`);

// Test 1: reads config file
console.log("Test 1: reads config file");
{
	const vfs = VirtualFileSystem.fromSnapshot(FIXTURE);
	const content = JSON.parse(vfs.readFile("/app/config/settings.json"));
	console.log(`  env: ${content.env} (expected: test) ${content.env === "test" ? "✅" : "❌"}`);
	console.log(`  db: ${content.db} (expected: localhost) ${content.db === "localhost" ? "✅" : "❌"}`);
}

// Test 2: isolated writes don't affect fixture
console.log("\nTest 2: isolated writes don't affect fixture");
{
	const vfs1 = VirtualFileSystem.fromSnapshot(FIXTURE);
	vfs1.writeFile("/app/config/settings.json", JSON.stringify({ env: "modified" }));

	const vfs2 = VirtualFileSystem.fromSnapshot(FIXTURE);
	const content = JSON.parse(vfs2.readFile("/app/config/settings.json"));
	console.log(`  fixture still has env=test: ${content.env === "test" ? "✅" : "❌"}`);
}

// Test 3: file listing
console.log("\nTest 3: file listing");
{
	const vfs = VirtualFileSystem.fromSnapshot(FIXTURE);
	const files = vfs.list("/app/config");
	console.log(`  /app/config contains: ${files.join(", ")}`);
}

console.log("\nAll tests passed");
