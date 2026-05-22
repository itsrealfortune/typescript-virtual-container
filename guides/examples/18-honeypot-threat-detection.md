---
title: 18 - Honeypot Threat Detection
group: Examples
---

# Example 18 — Honeypot Threat Detection

Deploys an SSH honeypot with realistic decoy files (`/etc/shadow`,
credentials, bash history), executes post-exploitation commands, then
generates anomaly reports.

**Modules:** `HoneyPot`, `VirtualShell`, `SshClient`

**Key points:**
- `attach()` connects the HoneyPot to the shell, VFS and users
- Decoy files are planted in the VFS before the simulated attack
- `client.exec()` executes "malicious" commands (cat, wget, useradd)
- `detectAnomalies()` returns anomalies with `severity`, `type` and `message`
- `getStats()` tallies commands, reads, writes, sessions
