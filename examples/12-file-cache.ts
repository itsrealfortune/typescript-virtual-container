/**
 * 12 - File Cache with Disk I/O Simulation
 *
 * Demonstrates the VFS file cache with configurable eviction policies
 * (LRU, LFU, FIFO) and simulated disk read/write latencies.
 */

import { VirtualFileSystem } from "../src";

const VFS = new VirtualFileSystem({
	mode: "fs",
	snapshotPath: ".vfs-cache-demo",
	cache: {
		enabled: true,
		maxEntries: 50,
		maxMemoryBytes: 2 * 1024 * 1024,
		policy: "lru",
		simulateDiskIo: true,
		diskIo: {
			readLatencyMs: 5,
			writeLatencyMs: 10,
		},
	},
});

// ── Write files ─────────────────────────────────────────────────────
console.log("--- Write files ---");

VFS.writeFile("/etc/config.txt", "database_host=localhost\ndatabase_port=5432");
VFS.writeFile(
	"/var/log/app.log",
	"INFO: Application started\nINFO: Listening on port 3000"
);
VFS.writeFile("/tmp/data.bin", Buffer.alloc(10000, 0x42));

// ── First read (populates cache) ───────────────────────────────────
console.log("\n--- First read ---");

const CONFIG = VFS.readFile("/etc/config.txt");
console.log("Config:", CONFIG);

// ── Second read (cache hit) ────────────────────────────────────────
console.log("\n--- Second read (cache hit) ---");

const CONFIG2 = VFS.readFile("/etc/config.txt");
console.log("Config (cached):", CONFIG2);

// ── Cache stats ────────────────────────────────────────────────────
console.log("\n--- Cache stats ---");

const STATS = VFS.getCacheStats();
if (STATS) {
	console.log({
		hits: STATS.hits,
		misses: STATS.misses,
		entries: STATS.entries,
		hitRate: `${STATS.hitRate.toFixed(1)}%`,
		memoryUsage: `${STATS.memoryUsage} bytes`,
	});
}

// ── Preload cache ──────────────────────────────────────────────────
console.log("\n--- Preload cache ---");

VFS.preloadCache(["/var/log/app.log", "/etc/config.txt"]);
console.log("Preloaded 2 files into cache");

// ── Cache invalidation on write ────────────────────────────────────
console.log("\n--- Cache invalidation on write ---");

VFS.writeFile(
	"/etc/config.txt",
	"database_host=production-db\ndatabase_port=5433"
);
console.log("Wrote new config -- cache invalidated");

const FRESH = VFS.readFile("/etc/config.txt");
console.log("Fresh config:", FRESH);

// ── Clear cache ────────────────────────────────────────────────────
console.log("\n--- Clear cache ---");

VFS.clearCache();
console.log("Cache cleared");
