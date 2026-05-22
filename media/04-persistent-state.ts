/**
 * Example 04: Persistent State
 *
 * Demonstrates two persistence strategies:
 * - FS mode: automatic .vfsb persistence to disk
 * - Memory mode: manual JSON snapshot / restore
 */

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";

// ── FS mode — automatic .vfsb persistence ─────────────────────────
const fsDir = "./container-data";
mkdirSync(fsDir, { recursive: true });
const vfsFs = new VirtualFileSystem({
	mode: "fs",
	snapshotPath: fsDir,
});

vfsFs.writeFile("/data/persistent.txt", "This survives restarts");
console.log("FS mode: wrote /data/persistent.txt");

await vfsFs.flushMirror();
console.log("FS mode: flushed to disk");

// ── Memory mode — manual JSON snapshot ────────────────────────────
const vfsMem = new VirtualFileSystem();
vfsMem.writeFile("/data/report.txt", "Baseline data");
console.log("Memory mode: wrote /data/report.txt");

// Snapshot to JSON
const snapshot = vfsMem.toSnapshot();
writeFileSync("snapshot.json", JSON.stringify(snapshot));
console.log("Memory mode: saved snapshot to snapshot.json");

// Restore from JSON
const restored = VirtualFileSystem.fromSnapshot(
	JSON.parse(readFileSync("snapshot.json", "utf8")),
);
console.log("Memory mode: restored from snapshot");
console.log(`Restored content: "${restored.readFile("/data/report.txt")}"`);

// Cleanup
rmSync(fsDir, { recursive: true, force: true });
rmSync("snapshot.json", { force: true });
console.log("Cleanup complete");
