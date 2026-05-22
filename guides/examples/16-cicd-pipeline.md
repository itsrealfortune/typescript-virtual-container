---
title: 16 - CI/CD Pipeline
group: Examples
---

# Example 16 — CI/CD Pipeline

4-stage pipeline (lint → test → build → deploy), each stage in its
own VM with resource limits (RAM + CPU) and its own scheduler.

**Modules:** `Baie`, `SshClient`

**Key points:**
- Each `Baie.createVM()` produces an isolated VM with VFS, users, scheduler
- `setRamCap(bytes)` + `setCpuCapCores(n)` set per-VM limits
- Stage success is determined by the last line of stdout
- Stages are chained: the next only starts if the previous succeeds
- Final report with per-stage stats
