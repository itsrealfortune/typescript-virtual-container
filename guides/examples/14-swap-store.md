---
title: 14 - Swap Store
group: Examples
---

# Example 14 — Swap Store

Enables swap on the VFS with an eviction threshold: large files
are automatically offloaded to disk during `flushMirror()`. Supports
manual swap-out and LRU.

**Modules:** `VirtualFileSystem` (`swapEnabled`, `evictionThresholdBytes` options)

**Key points:**
- `evictionThresholdBytes`: files exceeding this size are swapped
- `swapOutFile(path)`: manual swap-out of a specific file
- `swapOutLru(targetBytes)`: frees a given volume by LRU eviction
- `getSwapStats()`: `filesSwapped`, `swapOuts`, `swapIns`, `diskUsage`
- Re-reading a swapped file is O(1) — transparent loading
