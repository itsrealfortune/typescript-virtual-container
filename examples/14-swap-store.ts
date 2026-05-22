/**
 * Example 14: Swap file store for memory-constrained environments
 *
 * Demonstrates the VFS swap store that offloads evicted file contents
 * to individual swap files on disk for O(1) reload.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { VirtualFileSystem } from "../src";

const testDir = path.join(process.cwd(), ".vfs-swap-demo");
fs.mkdirSync(testDir, { recursive: true });

const vfs = new VirtualFileSystem({
	mode: "fs",
	snapshotPath: testDir,
	evictionThresholdBytes: 1024, // Evict files > 1KB
	swapEnabled: true,
});

// Write files of various sizes
vfs.writeFile("/small.txt", "tiny file");
vfs.writeFile("/medium.txt", "x".repeat(2000));
vfs.writeFile("/large.txt", "y".repeat(10000));

console.log("Wrote 3 files");
console.log("Swap enabled:", vfs.isSwapEnabled());

// Flush to disk — triggers eviction of large files
vfs.flushMirror().then(() => {
	console.log("\nFlushed to disk — large files evicted from RAM");

	// Check swap stats
	const swapStats = vfs.getSwapStats();
	if (swapStats) {
		console.log("Swap stats:", {
			filesSwapped: swapStats.filesSwapped,
			swapOuts: swapStats.swapOuts,
			swapIns: swapStats.swapIns,
			diskUsage: `${swapStats.diskUsage} bytes`,
			originalSize: `${swapStats.originalSize} bytes`,
		});
	}

	// Read evicted file — reloads from swap (O(1))
	const large = vfs.readFile("/large.txt");
	console.log("\nRead /large.txt from swap:", `${large.length} bytes`);

	// Swap out a specific file manually
	vfs.swapOutFile("/medium.txt");
	console.log("Manually swapped out /medium.txt");

	// Read it back
	const medium = vfs.readFile("/medium.txt");
	console.log("Read /medium.txt from swap:", `${medium.length} bytes`);

	// LRU swap-out: swap out files to free target bytes
	const swapped = vfs.swapOutLru(5000);
	console.log(`\nSwapped out ${swapped} files to free 5KB`);

	// Cleanup
	vfs.clearSwap();
	fs.rmSync(testDir, { recursive: true, force: true });
	console.log("Cleanup complete");
});
