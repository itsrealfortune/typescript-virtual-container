---
title: Performance
group: Guides
---

# Performance — typescript-virtual-container

## Benchmark

Run the official benchmark:

```bash
bun run benchmark    # → benchmark-results.txt
```

Measures 4 dimensions concurrently: parallel init, command latency, VFS I/O throughput, memory.

## Results (Bun 1.3.11, ~4.8s wall time)

### Parallel Shell Initialization

| Shells | Init (ms) | ms/shell | Cmd (ms) | Ops/sec | RSS |
|---|---|---|---|---|---|
| 1 | 162 | 162.0 | 79 | 38 | 165 MB |
| 2 | 140 | 70.0 | 852 | 7 | 184 MB |
| 5 | 940 | 188.0 | 1 | 15,000 | 209 MB |
| 10 | 56 | 5.6 | 1 | 30,000 | 212 MB |
| 20 | 196 | 9.8 | 1 | 60,000 | 214 MB |
| 50 | 489 | 9.8 | 1 | 150,000 | 212 MB |
| 100 | 803 | 8.0 | 4 | 75,000 | 216 MB |

- **~8–10 ms per shell** at scale (10–100 shells)
- Command throughput peaks at **150,000 ops/sec** (50 shells)
- RSS scales **sub-linearly**: +42% for 100x more shells (152 → 216 MB)

### Command Latency (N=500, single shell)

| Command | p50 | p95 | p99 |
|---|---|---|---|
| `echo hello` | 0.01 ms | 0.59 ms | 195 ms |
| `ls /etc` | 0.11 ms | 0.21 ms | 0.85 ms |
| `cat /etc/passwd` | 0.01 ms | 0.03 ms | 0.10 ms |
| `grep root /etc/passwd` | 0.02 ms | 0.06 ms | 0.14 ms |
| `ls -la /` | 1.59 ms | 2.63 ms | 6.94 ms |
| `pwd` | 0.00 ms | 0.00 ms | 0.02 ms |
| `date` | 0.00 ms | 0.01 ms | 0.02 ms |

- Most commands are **sub-millisecond at p50**
- `echo hello` has high p99 (195 ms) due to GC pauses in long iterations
- `ls -la /` is heaviest at ~1.6 ms p50 (full root directory listing)

### VFS I/O Throughput (direct, no command parsing)

| Operation | Size | Time | Throughput |
|---|---|---|---|
| Write 1,000 small files | 0.5 MB | 5 ms | **97.7 MB/s** |
| Read 1,000 small files | 0.5 MB | 2 ms | **244.1 MB/s** |
| Write 1 large file | 10 MB | 6 ms | **1.6 GB/s** |
| Read 1 large file | 10 MB | 9 ms | **1.1 GB/s** |

- VFS is in-memory (Buffer ops) — near memory-bandwidth limited
- Large contiguous I/O achieves **>1 GB/s**

### Memory (RSS)

| Shells | Heap used | Heap total | External | RSS |
|---|---|---|---|---|
| 1 | 0.2 MB | 14.3 MB | 24.8 MB | 152 MB |
| 10 | 39.7 MB | 28.8 MB | 9.9 MB | 182 MB |
| 50 | 24.5 MB | 31.9 MB | 16.7 MB | 184 MB |
| 100 | 57.1 MB | 50.8 MB | 33.2 MB | 209 MB |

- Base RSS floor ~150 MB (Bun runtime + bundled Linux rootfs)
- ~0.65 MB per additional shell at scale
- GC-driven variance in heapUsed (not linear)

---

<details>
<summary>Performance Tips — hashing, reuse, memory mode, snapshots</summary>

### 1. Fast password hashing (tests/CI)

```bash
SSH_MIMIC_FAST_PASSWORD_HASH=1  # SHA-256 instead of scrypt (N=32768)
```

Scrypt is the single largest init-time cost. Skip it in tests.

### 2. Reuse shell instances

Long-lived `VirtualShell` instances avoid re-init overhead. Create multiple `SshClient` objects for parallel operations against the same shell.

### 3. Memory mode for speed

```typescript
new VirtualShell("vm", undefined, { mode: "memory" }) // default, no disk I/O
```

No fsync, no eviction, no journaling overhead. Snapshot only when needed via `toSnapshot()`.

### 4. Use binary snapshots

The VFSB binary format is ~27% smaller than JSON+base64 and avoids string parsing.

```typescript
const snapshot = vfs.toSnapshot();           // binary Buffer
const restored = VirtualFileSystem.fromSnapshot(snapshot);
```

### 5. Tune eviction (FS mode)

```typescript
{ mode: "fs", snapshotPath: "./data", evictionThresholdBytes: 128_000 }
```

Default: 64 KB. Files above threshold are evicted from RAM after flush. Set to `0` to disable.

### 6. Batch operations in FS mode

The write-ahead journal flushes after 500 writes or 30 seconds. For bulk imports, call `flushMirror()` periodically to keep the journal small.

</details>

---

<details>
<summary>Memory Management — internal structures, eviction, journal</summary>

### Internal data structures

| Type | Strategy |
|---|---|
| `InternalDirectoryNode` | Null-prototype object vs `Map` — ~40% less RAM |
| `InternalFileNode` | `Buffer` content, gzip-compressed on write, evictable in FS mode |
| `InternalStubNode` | Static content as plain string — no Buffer allocation |
| Timestamps | `number` (Unix ms) instead of `Date` — ~80 bytes saved per node |

### Eviction system (FS mode only)

- **Threshold**: 64 KB default, configurable
- **Trigger**: After each `flushMirror()`
- On evict: content set to `Buffer.alloc(0)`, `evicted: true`
- On read: lazy reload from binary snapshot
- **Disabled in memory mode** (`evictionThreshold = 0`)

### Journal (FS mode only)

- Write-ahead log recorded before each flush
- On startup: replay journal for crash recovery
- Truncated after successful flush

</details>

---

<details>
<summary>Scaling — 1000+ parallel environments</summary>

- **Designed for 1000+ parallel environments** (per README)
- Each `VirtualShell` is fully independent — no shared global state
- `VirtualSshServer` is event-driven — handles many concurrent connections
- `SshClient` is sequential per instance; create multiple for parallel operations

</details>
