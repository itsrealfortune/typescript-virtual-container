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
const DATA_DIR = "./container-data";
if (!existsSync(DATA_DIR)) {
	mkdirSync(DATA_DIR);
}
const VFS_FS = new VirtualFileSystem({
	mode: "fs",
	snapshotPath: DATA_DIR,
});

VFS_FS.writeFile("/data/persistent.txt", "This survives restarts");
console.log("FS mode: wrote /data/persistent.txt");

VFS_FS.flushMirror();
console.log("FS mode: flushed to disk");

// ── Memory mode — manual JSON snapshot ────────────────────────────
console.log("--- Memory mode — manual JSON snapshot ---");
const VFS_MEM = new VirtualFileSystem();
VFS_MEM.writeFile("/data/report.txt", "Baseline data");
console.log("Memory mode: wrote /data/report.txt");

const SNAPSHOT = VFS_MEM.toSnapshot();
console.log("Memory mode: captured snapshot");

const RESTORED = VirtualFileSystem.fromSnapshot(SNAPSHOT);
console.log("Memory mode: restored from snapshot");
console.log(`Restored content: "${RESTORED.readFile("/data/report.txt")}"`);

// ── Cleanup ───────────────────────────────────────────────────────
console.log("--- Cleanup ---");
rmSync(DATA_DIR, { recursive: true, force: true });
console.log("Cleaned up persistent data");
