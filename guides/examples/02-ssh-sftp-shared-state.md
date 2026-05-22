---
title: 02 - SSH & SFTP Shared State
group: Examples
---

# Example 02 — SSH/SFTP Shared State

An SSH server and an SFTP server share the same `VirtualShell` instance.
Files written via the VFS are immediately visible from the other
service, without any real network transport.

**Modules:** `VirtualShell`, `VirtualSftpServer`

**Key points:**
- No real SFTP protocol — `VirtualSftpServer` is a lightweight wrapper
- Sharing is a simple reference to the same `VirtualFileSystem` object
- Demonstrates that dependency injection is sufficient for data consistency
