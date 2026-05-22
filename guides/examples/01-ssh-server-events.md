---
title: 01 - SSH Server Events
group: Examples
---

# Example 01 — SSH Server Lifecycle

Demonstrates listening to SSH server events (`auth:success`, `auth:failure`,
`auth:lockout`, `client:connect`, `client:disconnect`), simulating an
IP block after repeated failures, admin unblock, and controlled shutdown.

**Modules:** `VirtualShell`, `VirtualSshServer`, `SshClient`

**Key points:**
- Events are emitted by `VirtualSshServer` via `EventEmitter`
- `recordAuthFailure()` simulates failures without real network connections
- `clearLockout()` allows administrative unblocking
- `SshClient` shares the same VFS/users but does not increment the failure counter
