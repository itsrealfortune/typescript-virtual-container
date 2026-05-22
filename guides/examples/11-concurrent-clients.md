---
title: 11 - Concurrent Clients
group: Examples
---

# Example 11 — Concurrent Clients

Launches three `SshClient` (Alice, Bob, Charlie) in parallel: simultaneous
writes, concurrent reads, cross-user access and parallel commands
via `Promise.all()`.

**Modules:** `VirtualShell`, `SshClient`

**Key points:**
- `Promise.all()` for all concurrent operations
- `/tmp` is shared between users (cross-user read possible)
- Home directories are isolated by permissions
- All clients see the same file list → VFS consistency
