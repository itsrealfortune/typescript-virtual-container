---
title: 12 - File Cache
group: Examples
---
# Example 12 — File Cache

## Real-World Scenario

In production systems, reading files from disk is orders of magnitude slower than reading from memory. A typical SSD has ~50µs latency; RAM has ~50ns — a 1000× difference. Operating systems mitigate this with the page cache: frequently accessed files or blocks are kept in free RAM so subsequent reads bypass disk entirely. This virtual filesystem cache mimics that behavior in user-space JavaScript. The scenario is a long-running daemon (e.g., an HTTP server or database) that repeatedly reads configuration files, logs, or other hot data. With caching enabled, the first read pays the (simulated) disk latency cost, but subsequent reads are served from memory instantly. The configurable eviction policy (LRU, LFU, or FIFO) lets you tune cache behavior for different access patterns.

## Modules Imported

```ts
import * as fs from "node:fs";
import { VirtualFileSystem } from "../src";
```

- **`fs` (Node built-in):** Used only for creating the snapshot directory on the real filesystem (`fs.mkdirSync`). The VFS itself operates in `"fs"` mode (persisted to disk) so that cache behavior and simulated I/O have a realistic backing store.
- **`VirtualFileSystem`:** The full virtual filesystem with cache configuration passed as a constructor option. The cache subsystem is built directly into the VFS — it intercepts `readFile` and `writeFile` calls to maintain in-memory copies of file data.

## Step-by-Step Walkthrough

### Step 1 — Create the snapshot directory

```ts
fs.mkdirSync(".vfs-cache-demo", { recursive: true });
```

Creates a real directory on disk at `.vfs-cache-demo`. The VFS will use this as its `snapshotPath` — when the cache evicts a file or when `flushMirror()` is called, data is written here as individual files on the real filesystem.

### Step 2 — Configure the VFS with caching

```ts
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
```

The `cache` configuration block controls all caching behavior:

- **`enabled: true`**: Activates the cache subsystem. Without this, `readFile` always reads from the backing store.
- **`maxEntries: 50`**: The cache can hold at most 50 file entries. When a 51st file is read, the eviction policy chooses which entry to drop.
- **`maxMemoryBytes: 2 * 1024 * 1024`**: Total memory cap of 2 MB across all cached entries. This is a secondary limit — whichever limit is hit first (entry count or memory) triggers eviction.
- **`policy: "lru"`**: Least-Recently-Used eviction. On eviction, the file that was accessed longest ago is removed. Other options: `"lfu"` (Least-Frequently-Used — tracks access frequency instead of recency) and `"fifo"` (First-In-First-Out — evicts in insertion order).
- **`simulateDiskIo: true`**: When enabled, cache misses artificially delay the response by `readLatencyMs` (5 ms) and writes by `writeLatencyMs` (10 ms). This makes cache hits (no delay) visually distinguishable from misses.
- **`diskIo.readLatencyMs` / `writeLatencyMs`**: The simulated delay in milliseconds applied per cache miss.

### Step 3 — Write initial files

```ts
vfs.writeFile("/etc/config.txt", "database_host=localhost\ndatabase_port=5432");
vfs.writeFile("/var/log/app.log", "INFO: Application started\nINFO: Listening on port 3000");
vfs.writeFile("/tmp/data.bin", Buffer.alloc(10000, 0x42));
```

Three files of varying sizes and types: a small config file (~40 bytes), a small log file (~50 bytes), and a binary blob (10,000 bytes of 0x42). The binary file is close to the `maxMemoryBytes` budget and demonstrates cache pressure.

### Step 4 — First read (cache miss / populate)

```ts
console.log("Reading /etc/config.txt...");
const config = vfs.readFile("/etc/config.txt");
```

This is the first access to `/etc/config.txt`. The cache is empty, so this is a **cache miss**. Under the hood:

1. The VFS checks the cache — no entry found.
2. The VFS reads from the backing store (simulated disk, which is actually the in-memory VFS store or the snapshot directory if persisted).
3. Since `simulateDiskIo` is `true`, the VFS waits 5ms (simulating disk read latency).
4. The file content is returned AND inserted into the cache (an LRU entry is created).
5. The `misses` counter increments.

### Step 5 — Second read (cache hit)

```ts
const config2 = vfs.readFile("/etc/config.txt");
```

Same file, second read. This is a **cache hit**:

1. The VFS checks the cache — entry found.
2. **No simulated delay** — the data is returned immediately from the in-memory cache entry.
3. The `hits` counter increments.
4. The LRU ordering is updated (this entry moves to the "most recently used" position).

### Step 6 — Inspect cache statistics

```ts
const stats = vfs.getCacheStats();
if (stats) {
    console.log("Cache stats:", {
        hits: stats.hits,
        misses: stats.misses,
        entries: stats.entries,
        hitRate: `${stats.hitRate.toFixed(1)}%`,
        memoryUsage: `${stats.memoryUsage} bytes`,
    });
}
```

`getCacheStats()` returns a detailed snapshot of the cache state (returns `null` if the cache is disabled). The reported values at this point:

- **hits**: 1 (the second read)
- **misses**: 1 (the first read)
- **entries**: 1 (only `/etc/config.txt` has been cached so far)
- **hitRate**: `50.0%` (1 hit / 2 total reads)
- **memoryUsage**: ~40 bytes (the size of the config file content)

### Step 7 — Preload the cache

```ts
vfs.preloadCache(["/var/log/app.log", "/etc/config.txt"]);
```

This explicitly loads specific files into the cache without reading them (no return value). Preloading is useful for predictable hot files — when you know the server will need `/etc/nginx.conf` at startup, you can avoid cold-start misses by pre-warming the cache. In this case:

- `/var/log/app.log` is freshly cached.
- `/etc/config.txt` is already cached, so this is a no-op.

After preloading, the cache has 2 entries and 0 new misses (preloads are not counted as misses).

### Step 8 — Write invalidates the cache

```ts
vfs.writeFile("/etc/config.txt", "database_host=production-db\ndatabase_port=5433");
```

Writing to a cached file triggers **automatic cache invalidation**. The VFS detects that `/etc/config.txt` has a cache entry and evicts it before performing the write. This prevents **stale reads** — if the cache still held the old content, a subsequent read would silently return outdated data.

### Step 9 — Read after invalidation

```ts
const fresh = vfs.readFile("/etc/config.txt");
```

Because the cache entry was invalidated by the write, this read is a **cache miss**. The VFS goes back to the backing store, loads the new content (with another 5ms simulated delay), and re-caches it. The output shows the updated hostname.

### Step 10 — Clear the cache

```ts
vfs.clearCache();
```

Empties all cache entries. This is equivalent to dropping the page cache on Linux (`echo 3 > /proc/sys/vm/drop_caches`). All counters (hits, misses) are reset to zero.

## How the Cache Works Under the Hood

The cache is a data structure with three layers:

1. **A `Map<path, CacheEntry>`** for O(1) lookup by path. Each entry stores the file content (`Buffer`), access timestamp, frequency counter (for LFU), and insertion order index (for FIFO).
2. **An eviction ordering structure** that depends on the policy:
   - **LRU**: A doubly-linked list ordered by last-access time. On hit, the node moves to the head. On eviction, the tail is removed.
   - **LFU**: A min-heap or frequency map. The entry with the lowest access count is evicted.
   - **FIFO**: A simple queue ordered by insertion time. The oldest entry is evicted regardless of access patterns.
3. **Memory accounting**: Every entry tracks its `byteLength`. The total is compared to `maxMemoryBytes` on every insertion. If exceeded, entries are evicted until memory is under the limit.

When `simulateDiskIo` is enabled, cache misses use `setTimeout` (or `Atomics.wait` in synchronous mode) to delay the response. Cache hits bypass the delay entirely, making the performance difference visible in console output.

## Expected Output

```
Reading /etc/config.txt...
Config: database_host=localhost
database_port=5432

Reading /etc/config.txt again (cache hit)...
Config (cached): database_host=localhost
database_port=5432

Cache stats: { hits: 1, misses: 1, entries: 2, hitRate: "50.0%", memoryUsage: "10088 bytes" }

Preloaded 2 files into cache

Wrote new config — cache invalidated

Fresh config: database_host=production-db
database_port=5433

Cache cleared
```

Run with:

```bash
bun run examples/12-file-cache.ts
```

Note the second read appears instantly (no perceptible delay), while the first and post-invalidation reads have a ~5ms pause due to simulated disk latency.

## Key Concepts and Patterns

- **Cache-aside pattern:** The VFS checks the cache first on read (`look-aside`), and on write it invalidates the cache entry (`write-invalidate`). This is the simplest correct caching strategy — no write-through or write-back complexity.
- **Configurable eviction policy:** LRU is best for workloads with temporal locality (recently accessed files are likely to be accessed again). LFU works well for static hot files (configs, binaries). FIFO is a baseline with low overhead.
- **Dual eviction limits:** Both entry count (`maxEntries`) and total memory (`maxMemoryBytes`) are checked independently. This prevents scenarios where one huge file consumes all cache memory, or many tiny files exhaust iteration performance.
- **Simulated disk I/O:** The `simulateDiskIo` feature makes cache hits vs. misses observable in a demo without real hardware. In production environments, this maps to actual latency differences between RAM and SSD.
- **Automatic invalidation on write:** This guarantees **strong consistency** — a read after a write always returns the latest data. The alternative (TTL-based expiration) risks stale reads.
- **Preloading for cold-start optimization:** `preloadCache()` eliminates the warm-up period for known hot paths. This is analogous to a database connection pool pre-warming or an application server loading classes at startup.
