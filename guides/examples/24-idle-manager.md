---
title: 24 - Idle Manager
group: Examples
---

# Example 24 — Idle Management

Monitors shell activity, auto-freezes after a configurable inactivity
threshold, thaws on activity, and releases unused resources through
garbage collection.

**Modules:** `VirtualShell` (via `enableIdleManagement()`)

---

## Real-world scenario

Virtual environments consume memory and CPU even when idle — processes
remain resident, file descriptors stay open, and scheduler state is
maintained. In a VPS or container environment, idle tenants waste
infrastructure resources.

The `IdleManager` solves this by:

1. **Monitoring** shell commands and explicit pings to track activity
2. **Freezing** the shell after a configurable period of inactivity —
   suspending process scheduling and releasing volatile memory
3. **Thawing** automatically when activity resumes — restoring the shell
   to full operational state
4. **Garbage collecting** resources that can be safely evicted
   (completed processes, unused cache, stale file handles)

This is conceptually similar to how cloud providers suspend idle VMs
(GCP "suspended" state) or how serverless functions go cold after
inactivity. At a smaller scale, it also mirrors how `systemd` manages
idle services with `StopWhenUnneeded=`.

---

## Imports and initialization

```typescript
import { VirtualShell } from "../src";

const shell = new VirtualShell("idle-demo");
await shell.ensureInitialized();
```

The `VirtualShell` is initialized normally. The idle manager is optional
and must be explicitly enabled — it is off by default to avoid surprise
freezing.

---

## Enabling idle management

```typescript
shell.enableIdleManagement({
  idleThresholdMs: 2_000,   // freeze after 2s inactivity
  checkIntervalMs: 500,     // check every 500ms
  gcIntervalMs: 5_000,      // GC every 5s
});
```

Three configuration parameters control behavior:

- **`idleThresholdMs` (2000):** How long the shell must be inactive before
  transitioning to `"frozen"`. If any activity occurs within this window,
  the timer resets.
- **`checkIntervalMs` (500):** How often the manager polls the idle timer.
  Lower values increase responsiveness at the cost of more event-loop
  iterations.
- **`gcIntervalMs` (5000):** How often automatic garbage collection runs.
  This is independent of the freeze/thaw cycle — GC can run on active
  shells too, cleaning up terminated processes and evictable cache entries.

Under the hood, `enableIdleManagement` starts two interval timers:

1. The **idle checker** runs every `checkIntervalMs` and compares
   `Date.now() - lastActivity` against `idleThresholdMs`. If the shell
   is active but the threshold has been exceeded, it calls `freeze()`.
2. The **GC timer** runs every `gcIntervalMs` and calls the garbage
   collector unconditionally (with optimizations for frozen state).

```typescript
console.log(`  idle state: ${shell.idleState}`);   // "active"
console.log(`  idle duration: ${shell.idleMs}ms`);
```

Immediately after enabling, the shell is `"active"` and `idleMs` is close
to 0 (or exactly 0 if no activity has been tracked yet).

---

## Simulating activity

```typescript
await shell.executeCommand("echo 'user activity'", "root", "/root");
shell.pingIdle();
```

`executeCommand()` simulates a user running a command. Each command execution
implicitly pings the idle timer. The explicit `pingIdle()` call is a manual
activity reset — useful for long-running operations that don't map to
specific commands (e.g., a file watcher polling every few seconds).

`pingIdle()` sets `lastActivity = Date.now()`, which resets the idle clock.
The state remains `"active"`.

---

## Waiting for freeze

```typescript
await new Promise((r) => setTimeout(r, 3_000));
console.log(`  idle state: ${shell.idleState}`);   // "frozen"
console.log(`  idle duration: ${shell.idleMs}ms`);
```

After 3 seconds (exceeding the 2-second threshold), the idle checker fires:

1. The checker sees `Date.now() - lastActivity >= idleThresholdMs`
2. It calls the internal `freeze()` method
3. `idleState` switches to `"frozen"`
4. `idleMs` now reports the total time since last activity

**During freeze:**
- Process scheduling is suspended — registered processes are paused
  (their time slices are not advanced)
- The process scheduler's run queue is preserved but not executed
- Memory pressure is reduced (cache entries may be flagged as evictable)
- A `"freeze"` event is emitted on the shell (subscribable via `.on("freeze", ...)`)

The shell is still accessible via API — you can inspect state, read the VFS,
etc. Only execution of new virtual commands and scheduler tick advancement
are blocked.

---

## Thawing on activity

```typescript
shell.pingIdle();
console.log(`  idle state: ${shell.idleState}`);   // "active"
```

`pingIdle()` detects the frozen state and triggers a thaw:

1. `idleState` transitions to `"active"`
2. The process scheduler resumes — pending processes resume their time slices
3. A `"thaw"` event is emitted
4. The idle timer restarts

Thaw is designed to be transparent: any API call that implies activity
(commands, pings, VFS reads/writes) can trigger it. The goal is that
callers don't need to know whether the shell was frozen — it just works.

---

## Manual garbage collection

```typescript
const gcStats = shell.runGc();
if (gcStats) {
  console.log(`  GC stats: ${JSON.stringify(gcStats)}`);
}
```

`runGc()` forces an immediate garbage collection pass regardless of the
GC interval timer. It returns a statistics object (or `undefined` if GC
is not enabled):

```typescript
interface GcStats {
  terminatedProcesses: number;  // reaped zombie processes
  evictedFiles: number;         // cache files removed
  freedMemory: number;          // estimated bytes reclaimed
  forcedGc?: boolean;           // true if manually triggered
}
```

The garbage collector scans:

- **Process table:** Finds processes with exit status that have not been
  reaped (`wait()`-ed). These are cleaned up and their memory released.
- **VFS cache:** Evicts files marked as cache (not permanently stored).
  This includes temporary files and resolver-generated content that hasn't
  been accessed recently.
- **Session state:** Cleans up expired or orphaned sessions.

In this example, since no processes or files have been created, GC stats
will show zeros — but the API still returns a valid stats object.

---

## Disabling idle management

```typescript
await shell.disableIdleManagement();
console.log(`  idle state: ${shell.idleState}`);
```

`disableIdleManagement()`:

1. Clears both interval timers (`idleChecker` and `gcTimer`)
2. If the shell is frozen, it thaws it first
3. Removes event listeners associated with idle management
4. Idle state remains as-is (typically `"active"` after thaw)

After disabling, the shell operates normally without any idle monitoring
or auto-freezing. The `idleState` property is still readable but no longer
transitions automatically.

---

## Expected output

When you run `bun run examples/24-idle-manager.ts`, the output shows:

```
--- Enabling idle management ---
  idle state: active
  idle duration: 0ms
--- Activity simulation ---
  idle state: active
--- Waiting for idle threshold (2s)...
  idle state: frozen
  idle duration: ~2000ms
--- Activity triggers thaw ---
  idle state: active
--- Manual GC ---
  GC stats: {"terminatedProcesses":0,"evictedFiles":0,"freedMemory":0}
--- Disabling idle management ---
  idle state: active
```

---

## Key concepts

- **Time-based state machine:** The shell transitions between `active` and
  `frozen` based on wall-clock time since last activity, with a
  configurable threshold. This is a simple but effective model.
- **Polling vs event-driven:** The idle manager uses polling
  (`setInterval`) rather than event-driven hooks because activity can come
  from many sources (commands, VFS operations, network, API calls) and
  instrumenting every entry point would be fragile. Polling is simpler
  and more robust.
- **Separation of freeze and GC:** Freezing suspends execution; GC reclaims
  memory. They operate on different timers and can be tuned independently.
  In aggressive configurations, GC can run while the shell is still active.
- **Transparent thaw:** Callers don't need to check `idleState` before
  acting — `pingIdle()` (and other activity sources) handle thaw
  transparently. This makes the idle manager a leaky but practical
  abstraction.
- **State inspection:** `idleState` and `idleMs` are read-only properties
  that provide insight into the manager's decisions, useful for monitoring
  and debugging.
