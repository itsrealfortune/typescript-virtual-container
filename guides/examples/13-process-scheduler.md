---
title: 13 - Process Scheduler
group: Examples
---
# Example 13 — Process Scheduler

## Real-World Scenario

Operating system schedulers are responsible for dividing CPU time among competing processes. The Linux Completely Fair Scheduler (CFS) uses a red-black tree of tasks ordered by `vruntime`, aiming to give each task an equal share of the processor. Each task has a **nice value** ranging from -20 (highest priority) to +19 (lowest priority), which acts as a weight multiplier on its time slice. A web server like nginx (typically run at nice -10) gets more CPU than a background backup job (nice +15). This virtual scheduler models the same behavior: processes are registered with nice values, the scheduler computes weighted time slices, tracks consumed CPU time, throttles processes that exceed their allotment, and reports global statistics. This is useful for simulating resource contention and priority inversion scenarios in a controlled virtual environment.

## Modules Imported

```ts
import { VirtualShell } from "../src";
```

Only `VirtualShell` is imported because the scheduler lives on the `shell.users` sub-object. The `UserManager` (accessed via `shell.users`) contains a `Scheduler` instance that manages all process lifecycle, CPU accounting, and priority operations. The shell just bootstraps the environment; the scheduler is a service within it.

## Step-by-Step Walkthrough

### Step 1 — Initialize the shell

```ts
const shell = new VirtualShell("scheduler-demo");
await shell.ensureInitialized();
```

Creates a shell with hostname `"scheduler-demo"` and bootstraps its virtual environment. The `users` manager is automatically initialized with a default root user.

### Step 2 — Enable the scheduler

```ts
shell.users.enableScheduler({
    baseTimesliceMs: 100,
    maxTimesliceMs: 500,
    minTimesliceMs: 10,
    enforceFairShare: true,
    accountingWindowMs: 1000,
});
```

The scheduler is **opt-in** — it only tracks and constrains processes after `enableScheduler()` is called. The configuration parameters:

- **`baseTimesliceMs: 100`**: The default time slice for a process with nice 0. All other nice values are scaled relative to this.
- **`maxTimesliceMs: 500`**: Hard cap on any single time slice, preventing high-priority processes from monopolizing the CPU even with very low nice values.
- **`minTimesliceMs: 10`**: Floor on any time slice, ensuring low-priority processes still make progress (anti-starvation guarantee).
- **`enforceFairShare: true`**: When enabled, `recordAndCheckThrottle()` actually blocks (throttles) processes that exceed their fair share. When false, it only reports but does not enforce.
- **`accountingWindowMs: 1000`**: The sliding window over which CPU time is tracked. At 1000ms, CPU accounting resets every second.

### Step 3 — Map nice values to priorities

```ts
const niceValues = [-20, -15, -10, -5, 0, 5, 10, 15, 19];
for (const nice of niceValues) {
    const pid = shell.users.registerProcess("root", "test", ["test"], "pts/0", undefined, 1, nice);
    const priority = shell.users.getProcessPriority(pid);
    shell.users.unregisterProcess(pid);
    console.log(`  nice ${String(nice).padStart(3)} → ${String(priority).padEnd(12)}`);
}
```

This loop demonstrates the nice-to-priority mapping without leaving processes running. For each nice value:

1. **`registerProcess()`** creates a temporary process with: owner `"root"`, name `"test"`, command `["test"]`, terminal `"pts/0"`, parent PID `1`, and the given nice value. Returns a new PID.
2. **`getProcessPriority()`** retrieves the computed priority value. The priority is derived from nice using a weight table: nice -20 gets the highest priority (lowest numerical value), nice +19 gets the lowest.
3. **`unregisterProcess()`** immediately removes the process, keeping the system clean.
4. The mapping is printed: e.g., `nice -20 → 0` (highest priority), `nice 0 → 20` (default), `nice 19 → 39` (lowest priority).

The priority calculation uses the same weight array as Linux CFS: each nice level corresponds to a weight that determines the proportion of CPU the process receives relative to a nice-0 baseline.

### Step 4 — Register real processes

```ts
const processes = [
    { name: "nginx", nice: -10, cmd: ["nginx", "-g", "daemon off;"] },
    { name: "node", nice: 0, cmd: ["node", "server.js"] },
    { name: "backup", nice: 15, cmd: ["tar", "-czf", "/backup/full.tar.gz", "/"] },
    { name: "cron", nice: 19, cmd: ["cron", "-f"] },
];
```

Four processes representing different system roles:

- **nginx** (nice -10): A web server that needs responsive CPU — gets a high weight.
- **node** (nice 0): An application server at default priority.
- **backup** (nice 15): A background archive job — intentionally low priority to avoid starving interactive processes.
- **cron** (nice 19): The lowest priority, typical for cron daemons and background maintenance.

Each process is registered and its PID is stored. The printed output shows PID, name, nice value, and computed priority.

### Step 5 — CPU accounting and throttling

```ts
for (const pid of pids) {
    const elapsed = 50; // 50ms of simulated CPU time
    const throttled = shell.users.recordAndCheckThrottle(pid, elapsed);
    const cpuTime = shell.users.getSchedulerCpuTime(pid);
    console.log(`  PID ${pid}: ${cpuTime}ms consumed, throttled: ${throttled}`);
}
```

Simulates 50ms of CPU consumption per process. `recordAndCheckThrottle()` does two things:

1. **Records** the elapsed time in the process's CPU accounting window.
2. **Checks** whether the process has exceeded its fair share. If `enforceFairShare` is true and the process's consumed time exceeds its weighted allotment, the method returns `true` (throttled). The process should then be *de-scheduled* until the next accounting window.

The CPU time per process is queryable via `getSchedulerCpuTime(pid)`. After 50ms of simulated work, each process shows that amount consumed. Whether any process is throttled depends on the scheduler weights and the 1000ms accounting window — a single 50ms burst is unlikely to trigger throttling for any process.

### Step 6 — Dynamic priority boosting

```ts
const backupPid = pids.find((pid) => shell.users.getProcessNice(pid) === 15)!;
shell.users.setProcessNice(backupPid, -5);
```

This demonstrates **hot priority changes** — modifying a process's nice value while it is running. Before the change, `backup` has nice 15 (low priority). After `setProcessNice()` to -5, it jumps to a much higher priority level. This is equivalent to `renice -5 -p <pid>` on Linux. The scheduler immediately recalculates the process's weight and time slice for the next scheduling decision.

### Step 7 — Scheduler statistics

```ts
const stats = shell.users.getSchedulerStats();
```

Returns a global statistics snapshot:

- **`runQueueLength`**: Number of processes currently in the run queue (4 at this point, since all are registered and running).
- **`totalCpuTimeMs`**: Sum of all recorded CPU time across all processes. After the accounting loop, this should be 200ms (4 processes × 50ms).
- **`throttleCount`**: Number of times any process was throttled (likely 0 for this simple scenario).
- **`preemptCount`**: Number of times a process was preempted by a higher-priority process (0, since no concurrent execution simulation is happening).
- **`avgTimesliceMs`**: The average time slice across all processes, weighted by their nice values. Should be close to `baseTimesliceMs` (100ms) since most processes are near nice 0.

### Step 8 — Cleanup

```ts
for (const pid of pids) {
    shell.users.killProcess(pid, 9);
    shell.users.unregisterProcess(pid);
}
```

Each process is killed with signal 9 (SIGKILL) and then unregistered from the scheduler. `killProcess()` records the signal in the process's exit status; `unregisterProcess()` removes it from the process table and scheduler data structures. After this, `runQueueLength` drops to 0.

## How the Scheduler Works Under the Hood

The virtual CFS scheduler uses a simplified version of Linux's scheduling algorithm:

1. **Weight calculation**: Each nice value maps to a `weight` via a fixed table. A process with nice 0 has weight 1024; nice -20 has weight 88761 (~86× heavier); nice +19 has weight 15 (~68× lighter). These weights come from the Linux kernel source.

2. **Timeslice calculation**: `timeslice = baseTimesliceMs × (weight / totalWeight) × nProcesses`. Higher-weight processes get larger slices. The result is clamped to `[minTimesliceMs, maxTimesliceMs]`.

3. **Fair-share enforcement**: The scheduler tracks the `vruntime` (virtual runtime) — the actual CPU time divided by the process's weight. This normalizes CPU usage so that all processes make equal progress per unit of real time, regardless of priority. When `enforceFairShare` is true, a process whose `vruntime` exceeds the average by a threshold is throttled.

4. **Sliding accounting window**: CPU time is tracked within a fixed-duration window (`accountingWindowMs`). Once the window expires, all CPU counters are reset. This prevents processes from accumulating debt indefinitely.

## Expected Output

```
Scheduler enabled: true
Config: base=100ms, max=500ms, min=10ms, fair-share=on

--- Nice value → Priority mapping ---
nice -20 → 0
nice -15 → 5
nice -10 → 10
nice -5  → 15
nice  0  → 20
nice  5  → 25
nice  10 → 30
nice  15 → 35
nice  19 → 39

--- Process registration ---
PID 2: nginx (nice -10, priority: 10)
PID 3: node (nice 0, priority: 20)
PID 4: backup (nice 15, priority: 35)
PID 5: cron (nice 19, priority: 39)

--- CPU accounting ---
PID 2: 50ms consumed, throttled: false
PID 3: 50ms consumed, throttled: false
PID 4: 50ms consumed, throttled: false
PID 5: 50ms consumed, throttled: false

--- Priority boosting ---
Before: PID 4 nice=15, priority=35
After:  PID 4 nice=-5, priority=15

--- Scheduler statistics ---
Run queue: 4 processes
Total CPU time: 200ms
Throttle count: 0
Preempt count: 0
Avg timeslice: 87ms

--- Process cleanup ---
PID 2 terminated
PID 3 terminated
PID 4 terminated
PID 5 terminated

✅ Scheduler demo complete
```

Run with:

```bash
bun run examples/13-process-scheduler.ts
```

The exact `avgTimesliceMs` value varies with the weight calculations, but the output structure is deterministic.

## Key Concepts and Patterns

- **Nice value and priority separation:** Nice is a user-facing "niceness" hint; priority is the internal scheduling value. A lower nice value produces a higher priority (lower numeric priority value). The mapping is linear: `priority = 20 - nice` when nice is negative, `priority = nice + 20` when nice is positive.
- **Weighted fair sharing:** CPU time is proportional to weight, not equal. A process at nice -20 gets ~88× more CPU than a process at nice +19. This matches Linux CFS behavior.
- **Hot renicing:** `setProcessNice()` changes priority without restarting the process, just like `renice` on Linux. The weight and timeslice are recalculated on the next scheduling tick.
- **Opt-in scheduling:** The scheduler is disabled by default. `enableScheduler()` explicitly activates it with tunable parameters. This allows you to run virtual environments without any scheduling overhead when tracing isn't needed.
- **Throttling vs. preemption:** Throttling stops a process that exceeded its fair share (a form of active policing). Preemption suspends a running process because a higher-priority process needs the CPU (context switching). The demo shows throttling checks; true preemption would require a timer-driven scheduling loop.
