---
title: 09 - Symlinks
group: Examples
---

# Example 09 — Symbolic Links

Creates a symbolic link, checks its nature with `isSymlink()`, and resolves its
target with `resolveSymlink()`.

**Modules:** `VirtualFileSystem`

**Key points:**
- `symlink(target, linkPath)` — the target is the existing file
- Convention: method name = "create a link at `linkPath` pointing to `target`"
- The shortest example (14 lines) — pure utility API
