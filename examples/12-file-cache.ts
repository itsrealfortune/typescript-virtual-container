/**
 * 12 - File Cache with Disk I/O Simulation
 *
 * Demonstrates the VFS file cache with configurable eviction policies
 * (LRU, LFU, FIFO) and simulated disk read/write latencies.
 */

import { VirtualFileSystem } from "../src";

const vfs = new VirtualFileSystem({
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

vfs.writeFile("/etc/config.txt", "database_host=localhost\ndatabase_port=5432");
vfs.writeFile(
	"/var/log/app.log",
	"INFO: Application started\nINFO: Listening on port 3000",
);
vfs.writeFile("/tmp/data.bin", Buffer.alloc(10000, 0x42));

// ── First read (populates cache) ───────────────────────────────────
console.log("\n--- First read ---");

const config = vfs.readFile("/etc/config.txt");
console.log("Config:", config);

// ── Second read (cache hit) ────────────────────────────────────────
console.log("\n--- Second read (cache hit) ---");

const config2 = vfs.readFile("/etc/config.txt");
console.log("Config (cached):", config2);

// ── Cache stats ────────────────────────────────────────────────────
console.log("\n--- Cache stats ---");

const stats = vfs.getCacheStats();
if (stats) {
	console.log({
		hits: stats.hits,
		misses: stats.misses,
		entries: stats.entries,
		hitRate: `${stats.hitRate.toFixed(1)}%`,
		memoryUsage: `${stats.memoryUsage} bytes`,
	});
}

// ── Preload cache ──────────────────────────────────────────────────
console.log("\n--- Preload cache ---");

vfs.preloadCache(["/var/log/app.log", "/etc/config.txt"]);
console.log("Preloaded 2 files into cache");

// ── Cache invalidation on write ────────────────────────────────────
console.log("\n--- Cache invalidation on write ---");

vfs.writeFile(
	"/etc/config.txt",
	"database_host=production-db\ndatabase_port=5433",
);
console.log("Wrote new config -- cache invalidated");

const fresh = vfs.readFile("/etc/config.txt");
console.log("Fresh config:", fresh);

// ── Clear cache ────────────────────────────────────────────────────
console.log("\n--- Clear cache ---");

vfs.clearCache();
console.log("Cache cleared");
