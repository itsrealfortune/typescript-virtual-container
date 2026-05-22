---
title: 06 - Rate Limiting
group: Examples
---

# Example 06 — Rate Limiting

Configures `maxAuthAttempts` and `lockoutDurationMs`, simulates progressive
authentication failures leading to a lockout, then admin unblock.

**Modules:** `VirtualShell`, `VirtualSshServer`

**Key points:**
- Lockout is IP-based, not user-based
- `recordAuthFailure(ip)` increments the counter
- `clearLockout(ip)` allows unblocking before the timer expires
- A short duration (`lockoutDurationMs: 5000`) makes the test observable
- `auth:failure` and `auth:lockout` events are emitted at each step
