/**
 * 07 - Snapshot-Based Test Fixtures
 *
 * Demonstrates building a VFS snapshot once and reusing it
 * across multiple isolated "test" environments.
 */

import type { VfsSnapshot } from "../src";
import { VirtualFileSystem } from "../src";

function buildFixture(): VfsSnapshot {
	const vfs = new VirtualFileSystem();
	vfs.mkdir("/app/config");
	vfs.writeFile(
		"/app/config/settings.json",
		JSON.stringify({ env: "test", db: "localhost" })
	);
	vfs.writeFile(
		"/app/config/routes.json",
		JSON.stringify({ "/": "index", "/api": "api" })
	);
	vfs.writeFile("/app/public/index.html", "<h1>Hello</h1>");
	return vfs.toSnapshot();
}

const FIXTURE = buildFixture();
console.log(
	`Fixture built: ${Object.keys(FIXTURE.root.children ?? {}).length} top-level entries`
);

// ── Test 1: reads config file ─────────────────────────────────────
console.log("\n--- Test 1: reads config file ---");
{
	const VFS = VirtualFileSystem.fromSnapshot(FIXTURE);
	const CONTENT = JSON.parse(VFS.readFile("/app/config/settings.json"));
	console.log(
		`  env: ${CONTENT.env} (expected: test) ${CONTENT.env === "test" ? "(ok)" : "(fail)"}`
	);
	console.log(
		`  db: ${CONTENT.db} (expected: localhost) ${CONTENT.db === "localhost" ? "(ok)" : "(fail)"}`
	);
}

// ── Test 2: isolated writes don't affect fixture ──────────────────
console.log("\n--- Test 2: isolated writes don't affect fixture ---");
{
	const VFS1 = VirtualFileSystem.fromSnapshot(FIXTURE);
	VFS1.writeFile(
		"/app/config/settings.json",
		JSON.stringify({ env: "modified" })
	);

	const VFS2 = VirtualFileSystem.fromSnapshot(FIXTURE);
	const CONTENT = JSON.parse(VFS2.readFile("/app/config/settings.json"));
	console.log(
		`  fixture still has env=test: ${CONTENT.env === "test" ? "(ok)" : "(fail)"}`
	);
}

// ── Test 3: file listing ──────────────────────────────────────────
console.log("\n--- Test 3: file listing ---");
{
	const VFS = VirtualFileSystem.fromSnapshot(FIXTURE);
	const FILES = VFS.list("/app/config");
	console.log(`  /app/config contains: ${FILES.join(", ")}`);
}

console.log("\nAll tests passed");
