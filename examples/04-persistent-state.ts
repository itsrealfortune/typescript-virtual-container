/**
 * Example 04: Persistent State
 *
 * Demonstrates two persistence strategies:
 * - FS mode: automatic .vfsb persistence to disk
 * - Memory mode: manual JSON snapshot / restore
 */

import { readFileSync, writeFileSync } from "node:fs";
import { VirtualFileSystem } from "../src";

// FS mode — automatic .vfsb persistence
const _shell = new VirtualShell("my-vm", undefined, {
  mode: "fs",
  snapshotPath: "./container-data",
});

// Memory mode — manual JSON snapshot
const vfs = new VirtualFileSystem();
vfs.writeFile("/data/report.txt", "Baseline data");
writeFileSync("snapshot.json", JSON.stringify(vfs.toSnapshot()));

const restored = VirtualFileSystem.fromSnapshot(
  JSON.parse(readFileSync("snapshot.json", "utf8"))
);
console.log(restored.readFile("/data/report.txt")); // Baseline data
