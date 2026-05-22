---
title: 25 - VFS Hooks and Resolvers
group: Examples
---

# Example 25 — VFS Hooks and Resolvers

Registers content resolvers (files dynamically generated on read)
and beforeRead/beforeWrite hooks for monitoring or access control.

**Modules:** `VirtualFileSystem`

**Key points:**
- `registerContentResolver(prefix, fn)`: the function receives the path, returns content or `null`
- `onBeforeRead(prefix, fn)`: hook called before each read
- `onBeforeWrite(prefix, fn)`: hook with `(path, content)` — can throw to block
- `offBeforeRead()` / `offBeforeWrite()` to remove hooks
- Root (`/`) resolvers match all paths
- `stat()` on a dynamically resolved file returns `type="file"` with the real size
