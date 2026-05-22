/**
 * 14 - Swap File Store for Memory-Constrained Environments
 * 
 * Demonstrates the VFS swap store that offloads evicted file contents
 * to individual swap files on disk for O(1) reload.
 */

import { VirtualFileSystem } from "../src";

const testDir = `${process.cwd()}/.vfs-swap-demo`;

const vfs = new VirtualFileSystem({
	mode: "fs",
	snapshotPath: testDir,
	evictionThresholdBytes: 1024,
	swapEnabled: true,
});

// ── Write files ─────────────────────────────────────────────────────
console.log("--- Write files ---");

vfs.writeFile("/small.txt", "tiny file");
vfs.writeFile("/medium.txt", "x".repeat(2000));
vfs.writeFile("/large.txt", "y".repeat(10000));

console.log("Wrote 3 files");
console.log("Swap enabled:", vfs.isSwapEnabled());

// ── Flush to disk ───────────────────────────────────────────────────
console.log("\n--- Flush to disk ---");

await vfs.flushMirror();
console.log("Flushed to disk -- large files evicted from RAM");

// ── Swap stats ──────────────────────────────────────────────────────
console.log("\n--- Swap stats ---");

const swapStats = vfs.getSwapStats();
if (swapStats) {
	console.log({
		filesSwapped: swapStats.filesSwapped,
		swapOuts: swapStats.swapOuts,
		swapIns: swapStats.swapIns,
		diskUsage: `${swapStats.diskUsage} bytes`,
		originalSize: `${swapStats.originalSize} bytes`,
	});
}

// ── Read from swap ──────────────────────────────────────────────────
console.log("\n--- Read from swap ---");

const large = vfs.readFile("/large.txt");
console.log(`Read /large.txt from swap: ${large.length} bytes`);

// ── Manual swap out ─────────────────────────────────────────────────
console.log("\n--- Manual swap out ---");

vfs.swapOutFile("/medium.txt");
console.log("Manually swapped out /medium.txt");

const medium = vfs.readFile("/medium.txt");
console.log(`Read /medium.txt from swap: ${medium.length} bytes`);

// ── LRU swap out ────────────────────────────────────────────────────
console.log("\n--- LRU swap out ---");

const swapped = vfs.swapOutLru(5000);
console.log(`Swapped out ${swapped} files to free 5KB`);

// ── Cleanup ─────────────────────────────────────────────────────────
console.log("\n--- Cleanup ---");

vfs.clearSwap();
console.log("Cleanup complete");
