/**
 * 04 - Persistent State
 *
 * Demonstrates two persistence strategies:
 * - FS mode: automatic .vfsb persistence to disk
 * - Memory mode: manual JSON snapshot / restore
 */

import { VirtualFileSystem } from "../src";
import { mkdirSync, existsSync, rmSync } from "node:fs";

// ── FS mode — automatic .vfsb persistence ─────────────────────────
console.log("--- FS mode — automatic .vfsb persistence ---");
const dataDir = "./container-data";
if (!existsSync(dataDir)) mkdirSync(dataDir);
const vfsFs = new VirtualFileSystem({
	mode: "fs",
	snapshotPath: dataDir,
});

vfsFs.writeFile("/data/persistent.txt", "This survives restarts");
console.log("FS mode: wrote /data/persistent.txt");

await vfsFs.flushMirror();
console.log("FS mode: flushed to disk");

// ── Memory mode — manual JSON snapshot ────────────────────────────
console.log("--- Memory mode — manual JSON snapshot ---");
const vfsMem = new VirtualFileSystem();
vfsMem.writeFile("/data/report.txt", "Baseline data");
console.log("Memory mode: wrote /data/report.txt");

const snapshot = vfsMem.toSnapshot();
console.log("Memory mode: captured snapshot");

const restored = VirtualFileSystem.fromSnapshot(snapshot);
console.log("Memory mode: restored from snapshot");
console.log(`Restored content: "${restored.readFile("/data/report.txt")}"`);

// ── Cleanup ───────────────────────────────────────────────────────
console.log("--- Cleanup ---");
rmSync(dataDir, { recursive: true, force: true });
console.log("Cleaned up persistent data");
