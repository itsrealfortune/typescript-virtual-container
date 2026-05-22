---
title: 14 - Swap Store
group: Examples
---
# Example 14 — Swap Store

## The Scenario

Operating systems use swap space to extend apparent RAM: when memory pressure is high, the kernel moves inactive pages to a dedicated swap partition or swap file on disk, then transparently loads them back when needed. This virtual swap store implements the same concept for the VFS's file cache. When files exceed a configurable size threshold (`evictionThresholdBytes`), their content is automatically offloaded to individual swap files on the real filesystem during `flushMirror()`. The swap store is designed for memory-constrained environments like embedded devices, low-RAM containers, or serverless functions where keeping every file's content in RAM is prohibitively expensive. Files are swapped out on a per-file basis, and reloading is O(1) — the swap file is found by path hash, not scanned.

## Modules Used

```ts
import * as fs from "node:fs";
import * as path from "node:path";
import { VirtualFileSystem } from "../src";
```

- **`fs` (Node built-in):** Used to create the snapshot directory (`fs.mkdirSync`) and clean it up afterward (`fs.rmSync`). Also used implicitly by the VFS swap engine to write and read swap files on disk.
- **`path` (Node built-in):** Used to construct the test directory path relative to `process.cwd()`, ensuring it works regardless of which directory the script is run from.
- **`VirtualFileSystem`:** The VFS with swap support configured via two options: `evictionThresholdBytes` (the size above which files are evicted) and `swapEnabled` (toggles the swap subsystem).

## Step-by-Step Walkthrough

### Step 1 — Set up the test directory

```ts
const testDir = path.join(process.cwd(), ".vfs-swap-demo");
fs.mkdirSync(testDir, { recursive: true });
```

Creates a real directory at `<cwd>/.vfs-swap-demo`. This directory will contain both the VFS snapshot metadata and the individual swap files. Using `path.join(process.cwd(), ...)` ensures the path is absolute and OS-correct regardless of the launch directory.

### Step 2 — Create the VFS with swap enabled

```ts
const vfs = new VirtualFileSystem({
    mode: "fs",
    snapshotPath: testDir,
    evictionThresholdBytes: 1024, // Evict files > 1KB
    swapEnabled: true,
});
```

Two options enable swap behavior:

- **`evictionThresholdBytes: 1024`**: Any file larger than 1024 bytes (1 KB) is eligible for automatic eviction during `flushMirror()`. Files smaller than this stay in RAM permanently.
- **`swapEnabled: true`**: Activates the swap subsystem. Without this, large files would simply be evicted without backup (lost) or would remain in RAM indefinitely.

The VFS operates in `"fs"` mode, meaning it has a real disk backing store. The `snapshotPath` points to `.vfs-swap-demo`, so swap files are written alongside the regular snapshot files.

### Step 3 — Write files of varying sizes

```ts
vfs.writeFile("/small.txt", "tiny file");
vfs.writeFile("/medium.txt", "x".repeat(2000));
vfs.writeFile("/large.txt", "y".repeat(10000));
```

Three files:

- **`/small.txt`**: 9 bytes — well under the 1024-byte threshold. Stays in RAM permanently.
- **`/medium.txt`**: 2000 bytes — over the threshold. Eligible for swap-out.
- **`/large.txt`**: 10000 bytes (~10 KB) — also over the threshold. Eligible for swap-out.

At this point, all three files exist only in the VFS's in-memory storage. No disk I/O has occurred yet.

### Step 4 — Verify swap is enabled

```ts
console.log("Swap enabled:", vfs.isSwapEnabled());
```

A boolean check returning `true` if the swap subsystem is active. Useful for guards in conditional logic.

### Step 5 — Flush triggers eviction

```ts
vfs.flushMirror().then(() => {
```

`flushMirror()` is asynchronous — it persists the current VFS state to disk. During this process, the VFS examines each file against `evictionThresholdBytes`. Files exceeding the threshold are **swapped out**: their content is written to individual swap files on the real filesystem, and the in-memory storage is freed. After flush:

- `/small.txt` remains in RAM (below threshold).
- `/medium.txt` is swapped out — freed from RAM.
- `/large.txt` is swapped out — freed from RAM.

The swap files are named using a hash of the VFS path (e.g., `swap_<md5-of-path>.bin`) for O(1) lookup.

### Step 6 — Inspect swap statistics

```ts
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
```

`getSwapStats()` returns a snapshot of swap subsystem activity. The fields:

- **`filesSwapped`**: Number of files currently in the swapped-out state (should be 2 after flush).
- **`swapOuts`**: Total count of swap-out events (writes to disk). Increases each time a file is evicted from RAM.
- **`swapIns`**: Total count of swap-in events (reads from disk). Starts at 0 until a swapped file is accessed.
- **`diskUsage`**: Total bytes consumed by swap files on disk. Should be roughly 12000 bytes (2000 + 10000).
- **`originalSize`**: Sum of the original file sizes that were swapped. Should match `diskUsage` closely (some overhead may differ).

### Step 7 — Read an evicted file (transparent swap-in)

```ts
const large = vfs.readFile("/large.txt");
console.log("\nRead /large.txt from swap:", `${large.length} bytes`);
```

When `readFile("/large.txt")` is called, the VFS:

1. Checks in-memory storage — file not found (evicted).
2. Checks the swap store — swap file found for this path.
3. **Transparently loads** the content from the swap file on disk.
4. Returns the content and increments the `swapIns` counter.

The reload is O(1) because the swap store uses a deterministic file-naming scheme (`hash(path)`). There is no directory scan or iteration. The returned content is identical to the original — the user cannot distinguish a swapped file from an in-RAM file.

### Step 8 — Manual swap-out

```ts
vfs.swapOutFile("/medium.txt");
console.log("Manually swapped out /medium.txt");
```

`swapOutFile()` forces a specific file to be evicted from RAM and written to a swap file on disk, regardless of whether it's already been swapped. This is useful for proactive memory management — if you know a file won't be needed soon, you can manually evict it. If `/medium.txt` was already swapped (from `flushMirror()`), this is a no-op (or re-writes the swap file).

### Step 9 — Read manually-swapped file

```ts
const medium = vfs.readFile("/medium.txt");
console.log("Read /medium.txt from swap:", `${medium.length} bytes`);
```

Same transparent reload mechanism. The file content (2000 bytes of `"x"` characters) is loaded from the swap file on disk. No errors, no special handling needed.

### Step 10 — LRU swap-out to free space

```ts
const swapped = vfs.swapOutLru(5000);
console.log(`\nSwapped out ${swapped} files to free 5KB`);
```

`swapOutLru(targetBytes)` is an intelligent eviction method: it scans the in-memory file list, selects the **least recently accessed** files, and swaps them out until the freed space reaches `targetBytes` (5000 = ~5 KB). This is useful when you need to reclaim a specific amount of memory — e.g., before launching a memory-intensive operation.

The method returns the number of files that were swapped out. Since most large files are already swapped, this may return 0 or a small number depending on which files are still in RAM.

### Step 11 — Cleanup

```ts
vfs.clearSwap();
fs.rmSync(testDir, { recursive: true, force: true });
```

`clearSwap()` deletes all swap files from disk and resets the swap store's internal state. Then the entire `.vfs-swap-demo` directory is recursively removed. After cleanup, no traces of the swap or snapshot remain on the filesystem.

## Module Interactions

The swap store is a separate subsystem from the main VFS storage layer:

1. **Swap file naming**: Each swapable path is hashed (e.g., MD5 or SHA-256 of the normalized path) to produce a filename like `<snapshotPath>/swap_<hash>.bin`. This guarantees O(1) lookup — no linear scan across swap files.

2. **Swap-out flow**: When a file is swapped out:
   - Its content is read from the in-memory VFS store.
   - The content is written to `<snapshotPath>/swap_<path-hash>.bin` via `fs.writeFileSync`.
   - The in-memory entry is removed (memory freed).
   - The swap store records the path→swap-file mapping in an internal `Map`.

3. **Swap-in flow**: When a swapped file is requested:
   - The VFS checks in-memory (miss).
   - The VFS checks the swap store's map.
   - If found, the swap file is read via `fs.readFileSync`.
   - The content is returned; optionally re-cached in the main memory store.
   - The `swapIns` counter is incremented.

4. **Automatic vs. manual eviction**:
   - **Automatic**: Happens during `flushMirror()` for files exceeding `evictionThresholdBytes`.
   - **Manual**: `swapOutFile(path)` evicts a specific file.
   - **LRU batch**: `swapOutLru(targetBytes)` evicts the least-recently-used files until enough memory is freed.

5. **No double-swapping**: If a file is already swapped and you try to swap it again, the operation is either a no-op (if content matches) or overwrites the swap file (if content changed).

## Expected Output

```
Wrote 3 files
Swap enabled: true

Flushed to disk — large files evicted from RAM
Swap stats: {
  filesSwapped: 2,
  swapOuts: 2,
  swapIns: 0,
  diskUsage: "12000 bytes",
  originalSize: "12000 bytes"
}

Read /large.txt from swap: 10000 bytes
Manually swapped out /medium.txt
Read /medium.txt from swap: 2000 bytes

Swapped out 0 files to free 5KB
Cleanup complete
```

Run with:

```bash
bun run examples/14-swap-store.ts
```

The "0 files" LRU result may vary depending on implementation details of what remains in RAM after the manual swap-out.

## Key Concepts

- **Size-based eviction threshold:** Files below `evictionThresholdBytes` are "hot" — they stay in RAM. Files above it are "cold" — they get swapped to disk. This is analogous to the Linux kernel's `vm.swappiness` parameter, but applied at the file level rather than the page level.
- **O(1) swap-in via path hashing:** Because swap files are named by a deterministic hash of the VFS path, reloading a swapped file does not require scanning a swap table. This is critical for large swap stores with hundreds of files.
- **Transparent access:** The caller cannot distinguish between a file served from RAM and one loaded from swap. `readFile()` returns the same data in both cases. This follows the Principle of Least Astonishment.
- **LRU batch eviction for memory pressure:** `swapOutLru(targetBytes)` enables proactive memory management — reclaim a specific amount of RAM by evicting files that haven't been accessed recently. This is useful before launching a child process or allocating a large buffer.
- **Cleanup discipline:** `clearSwap()` ensures swap files are deleted, preventing stale swap data from persisting between runs. The `fs.rmSync` with `recursive: true` and `force: true` removes the entire snapshot directory cleanly.
- **`flushMirror()` as the eviction trigger:** The swap-out happens during the persistence step, not during the write. This batches the disk I/O and prevents performance degradation on every single file write.
