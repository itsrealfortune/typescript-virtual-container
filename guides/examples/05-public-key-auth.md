---
title: 05 - Public Key Auth
group: Examples
---

# Example 05 — Public Key Authentication

Full lifecycle: creating a user with a fallback password,
adding multiple authorized keys (Ed25519 + RSA), inspecting keys,
and removing all keys.

**Modules:** `VirtualShell` (via `shell.users`)

**Key points:**
- `addAuthorizedKey()` takes a raw `Buffer`, not a formatted string
- Keys are stored in memory, not in the VFS
- Rotation is simulated by adding then removing keys
- Self-contained: no need for external `ssh-keygen`
