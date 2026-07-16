/**
 * 14 - Swap File Store for Memory-Constrained Environments
 *
 * Demonstrates the VFS swap store that offloads evicted file contents
 * to individual swap files on disk for O(1) reload.
 */

import { VirtualFileSystem } from "../src";

const TEST_DIR = `${process.cwd()}/.vfs-swap-demo`;

const VFS = new VirtualFileSystem({
	mode: "fs",
	snapshotPath: TEST_DIR,
	evictionThresholdBytes: 1024,
	swapEnabled: true,
});

// ── Write files ─────────────────────────────────────────────────────
console.log("--- Write files ---");

VFS.writeFile("/small.txt", "tiny file");
VFS.writeFile("/medium.txt", "x".repeat(2000));
VFS.writeFile("/large.txt", "y".repeat(10000));

console.log("Wrote 3 files");
console.log("Swap enabled:", VFS.isSwapEnabled());

// ── Flush to disk ───────────────────────────────────────────────────
console.log("\n--- Flush to disk ---");

VFS.flushMirror();
console.log("Flushed to disk -- large files evicted from RAM");

// ── Swap stats ──────────────────────────────────────────────────────
console.log("\n--- Swap stats ---");

const SWAP_STATS = VFS.getSwapStats();
if (SWAP_STATS) {
	console.log({
		filesSwapped: SWAP_STATS.filesSwapped,
		swapOuts: SWAP_STATS.swapOuts,
		swapIns: SWAP_STATS.swapIns,
		diskUsage: `${SWAP_STATS.diskUsage} bytes`,
		originalSize: `${SWAP_STATS.originalSize} bytes`,
	});
}

// ── Read from swap ──────────────────────────────────────────────────
console.log("\n--- Read from swap ---");

const LARGE = VFS.readFile("/large.txt");
console.log(`Read /large.txt from swap: ${LARGE.length} bytes`);

// ── Manual swap out ─────────────────────────────────────────────────
console.log("\n--- Manual swap out ---");

VFS.swapOutFile("/medium.txt");
console.log("Manually swapped out /medium.txt");

const MEDIUM = VFS.readFile("/medium.txt");
console.log(`Read /medium.txt from swap: ${MEDIUM.length} bytes`);

// ── LRU swap out ────────────────────────────────────────────────────
console.log("\n--- LRU swap out ---");

const SWAPPED = VFS.swapOutLru(5000);
console.log(`Swapped out ${SWAPPED} files to free 5KB`);

// ── Cleanup ─────────────────────────────────────────────────────────
console.log("\n--- Cleanup ---");

VFS.clearSwap();
console.log("Cleanup complete");
