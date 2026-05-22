---
title: 16 - CI/CD Pipeline
group: Examples
---

# Example 16 — CI/CD Pipeline

## The Scenario

Continuous Integration and Deployment pipelines automate the lifecycle of software delivery: linting source code, running test suites, compiling artifacts, and deploying to production. Real CI/CD systems (GitHub Actions, GitLab CI, Jenkins) typically run each **stage** in an isolated environment — a fresh container or VM — to prevent cross-stage contamination. Build artifacts from earlier stages are passed to later stages, and a failure in any stage halts the entire pipeline. This example simulates a 4-stage pipeline (lint → test → build → deploy) where each stage executes in its own virtual machine on an isolated virtual network. Each VM has resource caps (RAM, CPU) and a process scheduler, mirroring how cloud CI runners enforce resource limits to prevent a single build from starving others.

## Modules Used

```ts
import { Baie, SshClient } from "../src";
```

- **`Baie`**: The network namespace that owns a subnet (`10.100.0.0/24`) and manages VM creation. Each `Baie` acts like a virtual data center network — it creates a `VirtualSwitch` internally, allocates IPs, and tracks all VMs by name.
- **`SshClient`**: A virtual SSH session bound to a specific VM and user. Used here to execute pipeline commands (echo, mkdir, dd, cat) inside each stage's VM. The `exec()` method returns a result with `exitCode` and `stdout`.

## Step-by-Step Walkthrough

### Step 1 — Create the pipeline network

```ts
const baie = new Baie("ci-pipeline", "10.100.0.0/24");
```

Creates a `Baie` named `"ci-pipeline"` with subnet `10.100.0.0/24`. This allocates a `VirtualSwitch` with gateway IP `10.100.0.1` and prepares 254 usable addresses for VMs. All VMs created from this `Baie` will be on the same L2 segment.

### Step 2 — Create stage VMs

```ts
const lintVM = await baie.createVM("lint");
const testVM = await baie.createVM("test");
const buildVM = await baie.createVM("build");
const deployVM = await baie.createVM("deploy");
```

`createVM(name)` provisions a `VirtualShell` instance with a VFS, user manager, process scheduler, and virtual network interface. Each VM is automatically attached to the `Baie`'s switch and assigned an IP from the subnet. The `name` is used as the VM's hostname and DNS record. These are fully isolated environments — no filesystem or process overlap between them.

### Step 3 — Create SSH clients

```ts
const clients = {
  lint: new SshClient(lintVM, "root"),
  test: new SshClient(testVM, "root"),
  build: new SshClient(buildVM, "root"),
  deploy: new SshClient(deployVM, "root"),
};
```

Each `SshClient` wraps a VM shell and authenticates as `"root"` (the default admin user with full permissions). The client is the conduit for executing commands inside the VM. Because each VM is a separate `VirtualShell`, clients cannot cross boundaries — `clients.lint.exec()` runs only in the lint VM.

### Step 4 — Set resource caps on all VMs

```ts
for (const [name, vm] of Object.entries({ lint: lintVM, test: testVM, build: buildVM, deploy: deployVM })) {
  vm.vfs.setRamCap(50 * 1024 * 1024); // 50 MB per VM
  vm.users.setCpuCapCores(1); // 1 vCPU per VM
  vm.users.enableScheduler({ baseTimesliceMs: 50 });
  console.log(`✅ ${name} VM: 50MB RAM, 1 vCPU, scheduler enabled`);
}
```

Each VM gets the same resource profile:
- **RAM cap:** `setRamCap(50 MB)` limits total filesystem-backed memory (affects swap and cache behavior, not raw JavaScript heap).
- **CPU cap:** `setCpuCapCores(1)` limits the VM to 1 virtual core. This affects the process scheduler's concurrency — only one process runs per timeslice.
- **Scheduler:** `enableScheduler({ baseTimesliceMs: 50 })` activates the Completely Fair Scheduler (CFS) with 50ms base timeslices. The scheduler manages process time-sharing within the VM.

These caps simulate how CI runners use cgroups to prevent a single job from consuming all host resources.

### Step 5 — Stage 1: Lint

```ts
console.log("\n📋 Stage 1: Linting...");
const lintResult = await clients.lint.exec(
  "echo 'Running ESLint...' && echo 'No errors found' && echo 'lint-passed' > /tmp/lint-status && echo 'lint-passed'"
);
console.log("  Lint exit code:", lintResult.exitCode);
```

The lint stage simulates running ESLint: echoes messages, writes a status file (`/tmp/lint-status`) with the result, and prints `"lint-passed"` as the **last line** of stdout. The `&&` chaining means if any command fails (non-zero exit), the pipeline would halt here. The `exec()` method returns an object: `{ exitCode: number, stdout?: string, stderr?: string }`. The exit code `0` indicates the command chain succeeded.

### Step 6 — Stage 2: Test

```ts
const testResult = await clients.test.exec(
  "echo 'Running test suite...' && " +
  "mkdir -p /tmp/test-results && " +
  "echo '42 tests, 0 failures' > /tmp/test-results/summary.txt && " +
  "echo 'tests-passed' > /tmp/test-status && echo 'tests-passed'"
);
```

The test stage creates a test results directory, writes a summary file (42 tests, 0 failures), and sets the stage status. The last line `"tests-passed"` will be used later in the summary report. In a real pipeline, this would run `jest` or `pytest` and collect JUnit XML output.

### Step 7 — Stage 3: Build

```ts
const buildResult = await clients.build.exec(
  "echo 'Compiling TypeScript...' && " +
  "mkdir -p /tmp/build-output && " +
  "echo '{\"name\":\"app\",\"version\":\"1.0.0\"}' > /tmp/build-output/package.json && " +
  "dd if=/dev/zero of=/tmp/build-output/app.bin bs=1024 count=100 2>/dev/null && " +
  "echo 'build-passed' > /tmp/build-status && echo 'build-passed'"
);
```

The build stage simulates compilation: creates a build output directory, writes a `package.json` artifact, generates a 100 KB binary (`dd if=/dev/zero of=... bs=1024 count=100`), and records success. The `dd` command simulates generating a real binary artifact — the `2>/dev/null` suppresses the summary output that `dd` prints to stderr.

### Step 8 — Stage 4: Deploy

```ts
const deployFs = deployVM.vfs;
deployFs.writeFile("/etc/deploy-config.json", JSON.stringify({
  environment: "production",
  replicas: 3,
  healthCheck: "/healthz",
}));

const deployResult = await clients.deploy.exec(
  "echo 'Deploying to production...' && " +
  "cat /etc/deploy-config.json && " +
  "echo 'Deployment complete' && " +
  "echo 'deploy-passed' > /tmp/deploy-status && echo 'deploy-passed'"
);
```

The deploy stage demonstrates a hybrid approach: the config file is written directly to the deploy VM's VFS (using `vfs.writeFile`), then a command reads it back and reports completion. In a real pipeline, this stage would run `kubectl apply` or `rsync` to push built artifacts. Writing the config file programmatically (rather than via shell echo) shows that pipeline logic can mix direct VFS manipulation with command execution. The `cat /etc/deploy-config.json` command outputs the JSON config to prove the file is readable inside the VM.

### Step 9 — Pipeline Summary

```ts
const stages = [
  { name: "Lint", result: lintResult },
  { name: "Tests", result: testResult },
  { name: "Build", result: buildResult },
  { name: "Deploy", result: deployResult },
];

function lastLine(s: string | undefined): string {
  return (s ?? "").trim().split("\n").pop() ?? "";
}
const allPassed = stages.every((s) => lastLine(s.result.stdout) === `${s.name.toLowerCase()}-passed`);
```

This collects all stage results and checks success by comparing the **last line** of stdout against the expected pattern (`lint-passed`, `tests-passed`, etc.). The `lastLine()` helper trims whitespace, splits on newlines, and returns the final line. This is a simple but effective protocol: each stage is responsible for printing its own pass/fail status as the last output line. The `every()` call short-circuits on the first failure — if any stage's last line does not match, the pipeline is marked as failed.

```ts
for (const stage of stages) {
  const passed = lastLine(stage.result.stdout) === `${stage.name.toLowerCase()}-passed`;
  console.log(`  ${passed ? "✅" : "❌"} ${stage.name}: ${lastLine(stage.result.stdout)}`);
}
console.log(`\n${allPassed ? "✅ Pipeline PASSED" : "❌ Pipeline FAILED"}`);
```

Each stage is printed with its pass/fail icon and the last line of output. The consolidated verdict is displayed at the bottom.

### Step 10 — Resource Usage Report

```ts
for (const [name, vm] of Object.entries({ lint: lintVM, test: testVM, build: buildVM, deploy: deployVM })) {
  const procs = vm.users.listProcesses();
  const schedulerStats = vm.users.getSchedulerStats();
  console.log(`  ${name}: ${procs.length} processes, scheduler: ${schedulerStats ? `${schedulerStats.scheduleCount} schedules` : "disabled"}`);
}
```

After the pipeline completes, each VM reports its process count and scheduler statistics. `listProcesses()` returns all processes that were registered and are still tracked. `getSchedulerStats()` returns an object with `scheduleCount` (how many times the scheduler ran), `totalTimeslices`, and other metrics. If the scheduler was never enabled on a VM, this returns `null`. The output shows that each VM ran commands and the scheduler was active.

## Module Interactions

**Isolation model:** Each `createVM()` call spawns a completely independent `VirtualShell` with its own VFS tree, user database, process table, and scheduler. There is no shared state between VMs — they cannot see each other's files, processes, or users. The only shared resource is the `VirtualSwitch` inside the `Baie`, which enables IP-level communication between VMs (though this example does not use inter-VM networking).

**Command execution flow:** `SshClient.exec(command)` works by:
1. Creating a sub-shell environment inside the VM's process scheduler.
2. Registering the command as a process (with a synthetic PID).
3. Executing the command string through the VM's shell parser.
4. Collecting stdout, stderr, and exit code.
5. Returning the result object.

The `&&` chaining in the command strings means the shell stops at the first non-zero exit — a failed `mkdir` would prevent the subsequent `echo` from running. The pipeline does not check intermediate exits; it relies on the overall command chain exit code and the last-line protocol for status.

**Resource cap enforcement:** `setRamCap()` affects swap and cache behavior — if file operations exceed the cap, the VFS may fail writes or swap out entries. `setCpuCapCores()` and `enableScheduler()` affect how processes are time-sliced: with 1 core, only one process runs per timeslice. The scheduler uses a CFS-like algorithm where each process gets a fair share of the base timeslice (50ms), and processes with higher vruntime are preempted in favor of those with lower vruntime.

## Expected Output

When running `bun run examples/16-cicd-pipeline.ts`:

```
🚀 Starting CI/CD Pipeline Simulation

✅ lint VM: 50MB RAM, 1 vCPU, scheduler enabled
✅ test VM: 50MB RAM, 1 vCPU, scheduler enabled
✅ build VM: 50MB RAM, 1 vCPU, scheduler enabled
✅ deploy VM: 50MB RAM, 1 vCPU, scheduler enabled

📋 Stage 1: Linting...
  Lint exit code: 0

🧪 Stage 2: Running tests...
  Test exit code: 0

🔨 Stage 3: Building application...
  Build exit code: 0

🚀 Stage 4: Deploying to production...
  Deploy exit code: 0

==================================================
📊 Pipeline Summary
==================================================
  ✅ Lint: lint-passed
  ✅ Tests: tests-passed
  ✅ Build: build-passed
  ✅ Deploy: deploy-passed

✅ Pipeline PASSED
  lint: 4 processes, scheduler: 4 schedules
  test: 4 processes, scheduler: 4 schedules
  build: 5 processes, scheduler: 5 schedules
  deploy: 4 processes, scheduler: 4 schedules

🏁 Pipeline complete
```

Process counts may vary slightly depending on how the shell parser registers internal processes. The key invariant is that every stage reports `passed` and the pipeline verdict is `PASSED`.

## Key Concepts

- **Per-stage isolation:** Each pipeline stage runs in its own VM with a separate VFS, user database, and process scheduler. This is how real CI systems prevent cross-stage contamination — build artifacts from the lint stage are not visible to the test stage unless explicitly passed.
- **Stage-gated progression:** The pipeline uses `await` (sequential execution) — each stage waits for the previous one to complete. Combined with `&&` chaining inside commands, a failure in any stage would prevent subsequent stages from running. The return values are checked after all stages complete, not between them, but the pattern can easily be adapted to early-exit on failure.
- **Last-line status protocol:** The pipeline determines stage success by parsing the last line of stdout. This is a minimal protocol that avoids needing structured output (JSON) or status files. In production CI, you would replace this with exit code checking and structured artifact passing.
- **Resource caps as cgroup simulation:** Each VM's RAM cap, CPU cap, and scheduler configuration simulate the resource limits that real CI runners enforce via cgroups. The scheduler's timeslice configuration (50ms) is the virtual equivalent of setting a CPU quota.
- **Hybrid direct-VFS + SSH execution:** The deploy stage writes a config file via direct VFS methods (`deployVM.vfs.writeFile`) while running commands via `SshClient.exec()`. This shows that orchestration code can manipulate VM state directly without going through the shell.
