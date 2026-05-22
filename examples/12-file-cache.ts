/**
 * Example 12: File cache with disk I/O simulation
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
		maxMemoryBytes: 2 * 1024 * 1024, // 2 MB
		policy: "lru",
		simulateDiskIo: true,
		diskIo: {
			readLatencyMs: 5,
			writeLatencyMs: 10,
		},
	},
});

// Write some files
vfs.writeFile("/etc/config.txt", "database_host=localhost\ndatabase_port=5432");
vfs.writeFile("/var/log/app.log", "INFO: Application started\nINFO: Listening on port 3000");
vfs.writeFile("/tmp/data.bin", Buffer.alloc(10000, 0x42));

// First read — populates cache
console.log("Reading /etc/config.txt...");
const config = vfs.readFile("/etc/config.txt");
console.log("Config:", config);

// Second read — cache hit (no disk I/O)
console.log("\nReading /etc/config.txt again (cache hit)...");
const config2 = vfs.readFile("/etc/config.txt");
console.log("Config (cached):", config2);

// Check cache stats
const stats = vfs.getCacheStats();
if (stats) {
	console.log("\nCache stats:", {
		hits: stats.hits,
		misses: stats.misses,
		entries: stats.entries,
		hitRate: `${stats.hitRate.toFixed(1)}%`,
		memoryUsage: `${stats.memoryUsage} bytes`,
	});
}

// Preload frequently accessed files
vfs.preloadCache(["/var/log/app.log", "/etc/config.txt"]);
console.log("\nPreloaded 2 files into cache");

// Invalidate cache on write
vfs.writeFile("/etc/config.txt", "database_host=production-db\ndatabase_port=5433");
console.log("\nWrote new config — cache invalidated");

// Read again — will get fresh content
const fresh = vfs.readFile("/etc/config.txt");
console.log("Fresh config:", fresh);

// Cleanup
vfs.clearCache();
console.log("\nCache cleared");
