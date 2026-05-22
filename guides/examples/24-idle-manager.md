---
title: 24 - Idle Manager
group: Examples
---

# Example 24 — Idle Management

Monitors shell activity, freezes it after inactivity, and releases
resources via the garbage collector.

**Modules:** `VirtualShell` (via `enableIdleManagement()`)

**Key points:**
- `enableIdleManagement({ idleThresholdMs, checkIntervalMs, gcIntervalMs })`
- The shell transitions to `"frozen"` state after `idleThresholdMs` of inactivity
- `pingIdle()` resets the inactivity counter
- `runGc()` forces a collection (`terminatedProcesses`, `evictedFiles`)
- `freeze` / `thaw` events are emitted by the manager
