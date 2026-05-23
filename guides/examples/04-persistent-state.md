---
title: 04 - Persistent State
group: Examples
---
# Example 04 — VFS Persistence

## The Scenario

In-memory state is great for tests: it is fast, deterministic, and requires no cleanup. But when you need to restart a process, transfer a filesystem between machines, or snapshot state for debugging, you need persistence. Real-world use cases include:

- **Container checkpointing**: Saving the full filesystem state of a container before shutting it down, then restoring it on a different host.
- **CI/CD test fixtures**: Building a complex directory structure once in a setup phase, serializing it, and reusing it across multiple test suites without rebuilding each time.
- **State transfer between processes**: Sending a filesystem snapshot over an HTTP API or message queue to a worker process.

This example demonstrates two persistence strategies built into `VirtualFileSystem`: automatic binary snapshots to disk (FS mode) and manual JSON snapshots for portability (memory mode). Both let you save and restore the entire filesystem tree without touching real disk in the traditional sense — the "disk" in FS mode is still just a binary blob managed by the library.

## Modules Used

```ts
import { VirtualFileSystem } from "../src";
import { mkdirSync, existsSync, rmSync } from "node:fs";
```

- **`VirtualFileSystem`** — the in-memory virtual filesystem with support for persistence via two modes: `"fs"` (automatic binary snapshots to disk) and `"memory"` (manual JSON snapshots for portability). Named export from the library barrel.

- **`node:fs` utilities** — standard Node.js filesystem functions for creating directories, checking existence, and cleanup. These interact with the real OS filesystem, not the virtual one. The distinction is important: `mkdirSync` creates a real directory; `vfs.writeFile` writes to the in-memory virtual filesystem.

## Step-by-Step Walkthrough

### Part 1: FS Mode — Automatic Binary Persistence

```ts
const dataDir = "./container-data";
if (!existsSync(dataDir)) { mkdirSync(dataDir); }
const vfsFs = new VirtualFileSystem({
  mode: "fs",
  snapshotPath: dataDir,
});
```

The constructor receives an options object with two keys:
- `mode: "fs"` — tells the VFS to enable automatic persistence. Without this, the VFS defaults to `"memory"` mode (no disk writes).
- `snapshotPath: "./container-data"` — the directory where the binary snapshot file will be written. The directory must exist before construction (hence the `mkdirSync` call). If the directory does not exist, the constructor will throw.

Internally, this configures the VFS to prepare a write-behind buffer. When `flushMirror()` is called later, the VFS serializes all entries and writes them to `{snapshotPath}/fs.vfsb`. The file extension `.vfsb` is the convention for "Virtual File System Binary."

```ts
vfsFs.writeFile("/data/persistent.txt", "This survives restarts");
console.log("FS mode: wrote /data/persistent.txt");
```

At this point, the data exists only in the in-memory `Map<string, VfsEntry>`. No disk write has occurred. This is intentional: the VFS batches mutations in memory for performance, and only flushes to disk when explicitly told to.

```ts
vfsFs.flushMirror();
console.log("FS mode: flushed to disk");
```

`flushMirror()` triggers a full serialization of every entry in the VFS. Here is what happens step by step:

1. The VFS iterates over all entries in its internal `Map`.
2. Each entry's metadata (path, mode, uid, gid, atime, mtime, ctime) is serialized into a binary format.
3. Each entry's content (a `Buffer`) is concatenated after size-prefixed headers.
4. The entire binary blob is atomically written to `./container-data/fs.vfsb` using `writeFileSync`.

The binary format is compact and fast but not human-readable — you cannot open `fs.vfsb` in a text editor and see the file contents. This makes FS mode ideal for caching and checkpointing where throughput matters, and memory mode ideal for debugging and portability.

### Part 2: Memory Mode — Manual JSON Snapshots

```ts
const vfsMem = new VirtualFileSystem();
vfsMem.writeFile("/data/report.txt", "Baseline data");
console.log("Memory mode: wrote /data/report.txt");
```

With no constructor arguments, the VFS defaults to `mode: "memory"`. No snapshot path is set, no disk writes are configured. All files live only in RAM.

```ts
const snapshot = vfsMem.toSnapshot();
console.log("Memory mode: captured snapshot");
```

`toSnapshot()` is the serialization workhorse. It produces a `VfsSnapshot` — a plain JavaScript object (JSON-serializable by definition). The structure looks like:

```ts
interface VfsSnapshot {
  version: number;
  root: {
    children: Record<string, VfsSnapshotEntry>;
  };
}

interface VfsSnapshotEntry {
  type: "file" | "directory";
  mode: number;
  uid: number;
  gid: number;
  content?: string; // base64-encoded for files
  mtime: number;
  // ... other metadata
}
```

Key points about the snapshot format:
- File content is base64-encoded (the `content` field is a string, not a Buffer). This ensures the JSON remains valid UTF-8 and can be transmitted over text-based protocols.
- Directory entries have no `content` field — they are represented purely by their presence in the parent's `children` map.
- The `version` field is a schema version number. If the VFS data format changes in a future release, `fromSnapshot` can check the version and apply migrations or reject incompatible snapshots.
- Timestamps (`mtime`, `atime`, `ctime`) are stored as Unix epoch milliseconds (numbers), not ISO strings, to save space.

```ts
const restored = VirtualFileSystem.fromSnapshot(snapshot);
console.log("Memory mode: restored from snapshot");
console.log(`Restored content: "${restored.readFile("/data/report.txt")}"`);
```

`VirtualFileSystem.fromSnapshot(snapshot)` is a static factory method. It does:

1. Creates a new, empty `VirtualFileSystem` (mode: "memory", no snapshot path).
2. Iterates over all entries in the snapshot's `root.children` tree recursively.
3. For each entry, creates a `VfsEntry` with the correct path, mode, UID/GID, and content (decoding base64 back to a Buffer).
4. Inserts each entry into the new VFS's internal `Map`.

The restored VFS is a fully independent instance. Mutations to `restored` have no effect on the `vfsMem` instance or on the JSON snapshot object. This immutability contract is important — it enables the copy-on-write test fixture pattern shown in Example 07.

The round-trip is verified: the content written to `vfsMem` survives serialization to JSON and deserialization back to a new VFS instance.

### Part 3: Cleanup

```ts
rmSync(dataDir, { recursive: true, force: true });
console.log("Cleaned up persistent data");
```

The FS mode snapshot directory is deleted. The `force: true` option prevents errors if the directory does not exist. Since the memory mode snapshot was kept in memory (never written to disk), only the FS mode's data directory needs cleanup. This leaves the working directory in its original state, which is important when the example is run in automated test suites or CI pipelines.

## Module Interactions

The two VFS instances (`vfsFs` and `vfsMem`) share the same `VirtualFileSystem` class. They differ only in their configuration:

| Aspect | FS mode | Memory mode |
|---|---|---|
| Constructor options | `{ mode: "fs", snapshotPath }` | `{}` or `{ mode: "memory" }` |
| Disk writes | On `flushMirror()` call | Never |
| Serialization format | Binary `.vfsb` | JSON (via `toSnapshot`) |
| Deserialization | Automatic on construction (if `.vfsb` exists) | Manual via `fromSnapshot()` |
| Use case | Caching, checkpointing | Debugging, portability, fixtures |

Both mode's serialization functions (`flushMirror` vs `toSnapshot`) operate on the same internal data structure — the `Map<string, VfsEntry>`. The difference is only in how they encode that map for storage.

## Under the Hood

### Binary snapshot format (FS mode)

The `.vfsb` file is a concatenation of variable-length records. Each record has:

```
┌─────────┬──────────┬──────────┬──────┬──────────┐
│ pathLen │   path   │ metadata │ contLen │ content │
│ (4 B)   │ (UTF-8)  │ (32 B)   │ (4 B)   │ (N B)   │
└─────────┴──────────┴──────────┴──────┴──────────┘
```

- `pathLen`: unsigned 32-bit integer (little-endian) — byte length of the path string.
- `path`: UTF-8 encoded path bytes.
- `metadata`: packed struct with mode (u16), uid (u32), gid (u32), mtime (f64), atime (f64), ctime (f64) — 32 bytes total.
- `contLen`: unsigned 32-bit integer — byte length of the file content (0 for directories).
- `content`: raw bytes of file content.

The format is append-only — entries are written sequentially. On read, the VFS reads the entire file into memory and parses entries sequentially using the length prefixes as delimiters.

### JSON snapshot format (memory mode)

The JSON format wraps the same data in a human-readable structure:

```json
{
  "version": 1,
  "root": {
    "children": {
      "data": {
        "type": "directory",
        "mode": 16877,
        "children": {
          "report.txt": {
            "type": "file",
            "mode": 33188,
            "uid": 0,
            "gid": 0,
            "content": "QmFzZWxpbmUgZGF0YQ==",
            "mtime": 1712345678901
          }
        }
      }
    }
  }
}
```

File modes are full Unix mode bits (including the file type bits — `0o100000` for regular files, `0o40000` for directories), which is why they look like large numbers (`33188` = `0o100644` = regular file, `644` permissions).

### Performance characteristics

- `toSnapshot()` performs a full recursive walk of the entry tree. O(n) in entries.
- `fromSnapshot()` performs a full recursive insertion. O(n) in entries.
- `flushMirror()` serializes and writes all entries. O(n) in entries + file I/O.
- Base64 encoding adds ~33% bloat versus binary. This is the main trade-off: JSON snapshots are larger but debuggable.

## Expected Output

```text
--- FS mode — automatic .vfsb persistence ---
FS mode: wrote /data/persistent.txt
FS mode: flushed to disk
--- Memory mode — manual JSON snapshot ---
Memory mode: wrote /data/report.txt
Memory mode: captured snapshot
Memory mode: restored from snapshot
Restored content: "Baseline data"
--- Cleanup ---
Cleaned up persistent data
```

If you interrupt the script before cleanup, the `./container-data/` directory may be left behind on disk.

## Key Concepts

- **Dual persistence strategies**: FS mode for automatic, efficient binary snapshots; memory mode with manual JSON for portability and debugging. Choose FS mode when performance and automation matter (e.g., periodic container checkpointing). Choose memory mode when you need to inspect, transfer, or version-control the state (e.g., test fixtures checked into git).

- **Snapshot as a value**: `VfsSnapshot` is a plain serializable object — it has no methods, no references to the VFS instance, and no hidden state. This enables value semantics: you can pass snapshots around, compare them with `JSON.stringify`, or store them in databases without any VFS dependency at the consumer side.

- **Static factory pattern**: `fromSnapshot()` is a static method on the class, not an instance method. This is a deliberate API design choice: you do not need an existing VFS to restore one. The method is self-contained — it creates a new VFS, populates it from the snapshot data, and returns it. This is in contrast to a hypothetical `vfs.loadSnapshot(snap)` which would mutate an existing instance and potentially conflict with existing state.

- **Explicit flush**: Rather than writing to disk on every mutation (which would be catastrophically slow for write-heavy workloads), the FS mode requires an explicit `flushMirror()` call. This gives the caller control over when I/O occurs and enables batching: make many changes in memory, then flush once to amortize the I/O cost.

- **Cleanup responsibility**: The VFS does not clean up after itself. If you create snapshot files, you own their lifecycle. The example demonstrates this responsibility with explicit `rmSync` calls, which is especially important in test environments where leftover files could interfere with subsequent runs.
