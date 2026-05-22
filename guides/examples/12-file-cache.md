---
title: 12 - File Cache
group: Examples
---

# Example 12 — File Cache

Configures a VFS cache with LRU eviction policy, simulates disk
latencies, observes hit/miss, preheats the cache and invalidates after writes.

**Modules:** `VirtualFileSystem` (`cache` option)

**Key points:**
- Supported policies: `LRU`, `LFU`, `FIFO`
- `simulateDiskIo` + `diskIo.readLatencyMs/writeLatencyMs` make misses observable
- `preloadCache()` warms the cache with frequent files
- `clearCache()` empties the entire cache
- Writes automatically invalidate the cached entry
