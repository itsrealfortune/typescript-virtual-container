---
title: 13 - Process Scheduler
group: Examples
---

# Example 13 — Process Scheduler

Enables the CFS scheduler, registers processes with nice values, queries
priorities, accounts for CPU time, and reads global statistics.

**Modules:** `VirtualShell` (via `shell.users`)

**Key points:**
- Nice -20 → high priority, Nice +19 → low priority
- `enableScheduler()` with options: `baseTimesliceMs`, `enforceFairShare`
- `recordAndCheckThrottle(pid, elapsedMs)` → returns `true` if the process is throttled
- `setProcessNice(pid, nice)` for hot priority changes
- `getSchedulerStats()`: `runQueueLength`, `scheduleCount`, `throttleCount`, `avgTimesliceMs`
