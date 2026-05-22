---
title: 03 - Multi-User Quotas
group: Examples
---

# Example 03 — Multi-User Quotas

Creates multiple users, configures per-user disk quotas,
removes sudo privileges, and verifies permission isolation (a
`chmod 600` file is inaccessible to others).

**Modules:** `VirtualShell` (via `shell.users`), `SshClient`

**Key points:**
- `addUser()` creates users with a personal group
- `setQuotaBytes()` sets a disk space limit
- `SshClient.cat()` returns `exitCode` + `stderr` to detect denials
- The `removeSudoer()` method restricts privileges
