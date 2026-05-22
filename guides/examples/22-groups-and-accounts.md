---
title: 22 - Groups and Accounts
group: Examples
---

# Example 22 — Groups and Account Policies

User groups, password aging, account locking, login failure tracking,
sudo, active sessions, and generation of `/etc/shadow` and `/etc/group` files.

**Modules:** `VirtualShell` (via `users`)

**Key points:**
- `createGroup()` + `addGroupMember()` for group management
- `setPasswordAging(minDays, maxDays, warnDays, inactiveDays)`
- `lockAccount()` / `unlockAccount()` / `isAccountLocked()`
- `recordLoginFailure()` and `isAccountLockedByFailures()`
- `registerSession()` / `listActiveSessions()`
- `generateShadowFile()` and `generateGroupFile()` for standard formats
