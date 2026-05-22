---
title: 10 - Honeypot Auditing
group: Examples
---

# Example 10 — Honeypot Auditing

Attaches a `HoneyPot` to the shell, VFS and users, executes commands and
file operations, then inspects statistics, detects anomalies and
consults recent entries.

**Modules:** `HoneyPot`, `VirtualShell`, `SshClient`

**Key points:**
- `attach()` connects the HoneyPot to multiple subsystems at once
- `getStats()` returns counters: commands, reads, writes
- `detectAnomalies()` heuristically analyzes accumulated events
- The event buffer is bounded (`maxEntries` = 5000)
- AOP style: observation without component modification
