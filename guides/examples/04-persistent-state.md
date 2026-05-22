---
title: 04 - Persistent State
group: Examples
---

# Example 04 — VFS Persistence

Compares two persistence strategies for `VirtualFileSystem`:
- **FS mode:** automatic binary `.vfsb` snapshot, explicit `flushMirror()`
- **Memory mode:** manual JSON snapshot via `toSnapshot()` / `fromSnapshot()`

**Modules:** `VirtualFileSystem`

**Key points:**
- The same `VirtualFileSystem` supports two backends via the `mode` option
- `toSnapshot()` produces a serializable object (`VfsSnapshot`)
- `fromSnapshot()` restores state — ideal for test fixtures
- Cleanup (`rmSync`) is built into the example
