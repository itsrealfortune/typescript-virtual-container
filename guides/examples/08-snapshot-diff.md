---
title: 08 - Snapshot Diff
group: Examples
---

# Example 08 — Snapshot Diff

Captures VFS state before/after an operation (simulated installation), computes
the difference with `diffSnapshots()`, and verifies expected changes.

**Modules:** `VirtualFileSystem`, `diffSnapshots`, `assertDiff`

**Key points:**
- `diffSnapshots(before, after)` returns `{ added, modified, removed }`
- `assertDiff()` throws on unexpected differences
- Useful for verifying the impact of an installer or a build tool
- Paths are normalized automatically
