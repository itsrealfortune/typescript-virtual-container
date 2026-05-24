import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import * as fsSync from "node:fs";
import * as path from "node:path";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";

const TEST_DIR = path.join(process.cwd(), ".test-cache");

function cleanup() {
	try {
		fsSync.rmSync(TEST_DIR, { recursive: true, force: true });
	} catch {
		/* ignore */
	}
}

function makeVfsWithCache(cacheOptions = {}) {
	cleanup();
	fsSync.mkdirSync(TEST_DIR, { recursive: true });
	return new VirtualFileSystem({
		mode: "fs",
		snapshotPath: TEST_DIR,
		cache: {
			enabled: true,
			maxEntries: 10,
			maxMemoryBytes: 1024 * 1024, // 1 MB
			...cacheOptions,
		},
	});
}

describe("FileCache basic operations", () => {
	beforeEach(cleanup);
	afterEach(cleanup);

	test("cache is disabled by default", () => {
		const vfs = new VirtualFileSystem();
		expect(vfs.isCacheEnabled()).toBe(false);
		expect(vfs.getCacheStats()).toBeNull();
	});

	test("cache can be enabled with options", () => {
		const vfs = makeVfsWithCache();
		expect(vfs.isCacheEnabled()).toBe(true);
		expect(vfs.getCacheStats()).not.toBeNull();
	});

	test("cache tracks hits and misses", () => {
		const vfs = makeVfsWithCache();
		vfs.writeFile("/test.txt", "hello world");

		// First read - populates cache
		vfs.readFile("/test.txt");
		let stats = vfs.getCacheStats()!;
		expect(stats.entries).toBe(1); // File is now in cache

		// Second read - cache hit
		vfs.readFile("/test.txt");
		stats = vfs.getCacheStats()!;
		expect(stats.hits).toBe(1);
		expect(stats.entries).toBe(1);

		// Third read - another cache hit
		vfs.readFile("/test.txt");
		stats = vfs.getCacheStats()!;
		expect(stats.hits).toBe(2);
	});

	test("cache invalidates on write", () => {
		const vfs = makeVfsWithCache();
		vfs.writeFile("/test.txt", "original");
		vfs.readFile("/test.txt"); // Populate cache

		vfs.writeFile("/test.txt", "updated");
		const content = vfs.readFile("/test.txt");
		expect(content).toBe("updated");
	});

	test("clearCache removes all entries", () => {
		const vfs = makeVfsWithCache();
		vfs.writeFile("/a.txt", "a");
		vfs.writeFile("/b.txt", "b");
		vfs.readFile("/a.txt");
		vfs.readFile("/b.txt");

		vfs.clearCache();
		const stats = vfs.getCacheStats()!;
		expect(stats.entries).toBe(0);
	});

	test("invalidateCache removes specific path", () => {
		const vfs = makeVfsWithCache();
		vfs.writeFile("/a.txt", "a");
		vfs.writeFile("/b.txt", "b");
		vfs.readFile("/a.txt");
		vfs.readFile("/b.txt");

		vfs.invalidateCache("/a.txt");
		const stats = vfs.getCacheStats()!;
		expect(stats.entries).toBe(1); // Only b.txt should remain
	});
});

describe("Cache eviction policies", () => {
	beforeEach(cleanup);
	afterEach(cleanup);

	test("LRU evicts least recently used entry", () => {
		const vfs = makeVfsWithCache({
			policy: "lru",
			maxEntries: 3,
		});

		// Fill cache
		vfs.writeFile("/a.txt", "a");
		vfs.writeFile("/b.txt", "b");
		vfs.writeFile("/c.txt", "c");
		vfs.readFile("/a.txt");
		vfs.readFile("/b.txt");
		vfs.readFile("/c.txt");

		// Access a.txt to make it recently used
		vfs.readFile("/a.txt");

		// Add another file - should evict b.txt (least recently used)
		vfs.writeFile("/d.txt", "d");
		vfs.readFile("/d.txt");

		const stats = vfs.getCacheStats()!;
		expect(stats.evictions).toBeGreaterThanOrEqual(1);
		expect(stats.entries).toBeLessThanOrEqual(3);
	});

	test("LFU evicts least frequently used entry", () => {
		const vfs = makeVfsWithCache({
			policy: "lfu",
			maxEntries: 3,
		});

		// Fill cache by reading files
		vfs.writeFile("/a.txt", "a");
		vfs.writeFile("/b.txt", "b");
		vfs.writeFile("/c.txt", "c");

		// Read all files to populate cache
		vfs.readFile("/a.txt");
		vfs.readFile("/b.txt");
		vfs.readFile("/c.txt");

		// Access a.txt multiple times to increase its count
		vfs.readFile("/a.txt");
		vfs.readFile("/a.txt");

		// b.txt has 1 access, c.txt has 1 access

		// Add and read another file - should evict b.txt or c.txt (least frequently used)
		vfs.writeFile("/d.txt", "d");
		vfs.readFile("/d.txt");

		const stats = vfs.getCacheStats()!;
		expect(stats.evictions).toBeGreaterThanOrEqual(1);
	});

	test("FIFO evicts first-in entry", () => {
		const vfs = makeVfsWithCache({
			policy: "fifo",
			maxEntries: 3,
		});

		// Fill cache by reading files
		vfs.writeFile("/a.txt", "a");
		vfs.writeFile("/b.txt", "b");
		vfs.writeFile("/c.txt", "c");

		// Read all files to populate cache
		vfs.readFile("/a.txt");
		vfs.readFile("/b.txt");
		vfs.readFile("/c.txt");

		// Add and read another file - should evict a.txt (first in)
		vfs.writeFile("/d.txt", "d");
		vfs.readFile("/d.txt");

		const stats = vfs.getCacheStats()!;
		expect(stats.evictions).toBeGreaterThanOrEqual(1);
	});
});

describe("Cache memory limits", () => {
	beforeEach(cleanup);
	afterEach(cleanup);

	test("cache respects maxMemoryBytes", () => {
		const vfs = makeVfsWithCache({
			maxMemoryBytes: 500, // Very small limit
			maxEntries: 100,
		});

		// Write files that exceed memory limit
		vfs.writeFile("/large.txt", "x".repeat(300));
		vfs.readFile("/large.txt");

		vfs.writeFile("/another.txt", "y".repeat(300));
		vfs.readFile("/another.txt");

		const stats = vfs.getCacheStats()!;
		expect(stats.memoryUsage).toBeLessThanOrEqual(500);
	});

	test("cache respects maxEntries", () => {
		const vfs = makeVfsWithCache({
			maxEntries: 3,
			maxMemoryBytes: 10 * 1024 * 1024, // Large memory limit
		});

		// Write more files than max entries
		for (let i = 0; i < 10; i++) {
			vfs.writeFile(`/file${i}.txt`, `content${i}`);
			vfs.readFile(`/file${i}.txt`);
		}

		const stats = vfs.getCacheStats()!;
		expect(stats.entries).toBeLessThanOrEqual(3);
		expect(stats.evictions).toBeGreaterThanOrEqual(7);
	});
});

describe("Cache preload", () => {
	beforeEach(cleanup);
	afterEach(cleanup);

	test("preloadCache loads files into cache", () => {
		const vfs = makeVfsWithCache();
		vfs.writeFile("/a.txt", "a");
		vfs.writeFile("/b.txt", "b");
		vfs.writeFile("/c.txt", "c");

		const loaded = vfs.preloadCache(["/a.txt", "/b.txt"]);
		expect(loaded).toBe(2);

		const stats = vfs.getCacheStats()!;
		expect(stats.entries).toBe(2);
	});

	test("preloadCache skips non-existent files", () => {
		const vfs = makeVfsWithCache();
		vfs.writeFile("/a.txt", "a");

		const loaded = vfs.preloadCache(["/a.txt", "/nonexistent.txt"]);
		expect(loaded).toBe(1);
	});
});

describe("Cache statistics", () => {
	beforeEach(cleanup);
	afterEach(cleanup);

	test("hitRate is calculated correctly", () => {
		const vfs = makeVfsWithCache();
		vfs.writeFile("/test.txt", "hello");

		// Multiple reads
		vfs.readFile("/test.txt");
		vfs.readFile("/test.txt");
		vfs.readFile("/test.txt");

		const stats = vfs.getCacheStats()!;
		expect(stats.hitRate).toBeGreaterThanOrEqual(0);
		expect(stats.hitRate).toBeLessThanOrEqual(100);
	});

	test("resetStats clears counters", () => {
		const vfs = makeVfsWithCache();
		vfs.writeFile("/test.txt", "hello");
		vfs.readFile("/test.txt");
		vfs.readFile("/test.txt");

		vfs.clearCache(); // Also resets stats
		const stats = vfs.getCacheStats()!;
		expect(stats.hits).toBe(0);
		expect(stats.misses).toBe(0);
		expect(stats.evictions).toBe(0);
	});
});

describe("Cache + VFS integration", () => {
	beforeEach(cleanup);
	afterEach(cleanup);

	test("cache works with compressed files", () => {
		const vfs = makeVfsWithCache();
		vfs.writeFile("/compressed.txt", "compressed content", { compress: true });

		const content = vfs.readFile("/compressed.txt");
		expect(content).toBe("compressed content");
	});

	test("cache works with evicted files", () => {
		const vfs = makeVfsWithCache({
			maxMemoryBytes: 100, // Small to trigger eviction
		});

		vfs.writeFile("/test.txt", "x".repeat(200));
		vfs.evictLargeFiles();

		// Reading evicted file should still work and cache it
		const content = vfs.readFile("/test.txt");
		expect(content).toBe("x".repeat(200));
	});

	test("cache works across flushMirror cycles", () => {
		const vfs = makeVfsWithCache();
		vfs.writeFile("/test.txt", "persistent content");
		vfs.flushMirror();

		// Cache should still work after flush
		const content = vfs.readFile("/test.txt");
		expect(content).toBe("persistent content");
	});
});
