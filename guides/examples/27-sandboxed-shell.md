---
title: 27 - SandboxedShell (Worker Thread)
group: Examples
---

# Example 27 — SandboxedShell (Worker Thread)

## The Scenario

When you execute user-supplied commands or untrusted code, you need strong isolation. Forking a subprocess per command is expensive and leaks OS resources. The `SandboxedShell` runs commands inside a Node.js `worker_thread`, giving you process-level isolation with configurable timeouts — all within a single process.

This example demonstrates command execution, error handling, timeouts, and serial execution in a sandboxed environment.

## Modules Used

### `SandboxedShell`
A restricted shell that spawns a worker thread per command. Each `exec()` call runs the command in an isolated context with a configurable timeout.

```ts
import { SandboxedShell } from "../src/modules/SandboxedShell/index";
```

## Step-by-Step Walkthrough

### Step 1 — Create the Sandbox

```ts
const shell = new SandboxedShell({ execTimeoutMs: 5000 });
```

`execTimeoutMs: 5000` sets a 5-second timeout per command. If the command doesn't complete within that window, it's forcefully terminated and the promise rejects with a timeout error.

### Step 2 — Basic Commands

```ts
let r = await shell.exec("echo hello world");
console.log(`  echo: exit=${r.exitCode} stdout=${r.stdout.trim()}`);
```

Each `exec()` call spawns a worker thread that runs the command, captures stdout/stderr and the exit code, then terminates the worker. The return value `{ stdout, stderr, exitCode }` mirrors a typical shell return.

```ts
r = await shell.exec("whoami");
```

Inside the worker, `whoami` reflects the OS-level user running the Node.js process, not a virtual user.

```ts
r = await shell.exec("pwd");
```

PWD defaults to the project root, but can be overridden.

### Step 3 — Working Directory

```ts
r = await shell.exec("ls -la", "root", "/tmp");
```

The second parameter is the username (used for permission simulation), and the third is the working directory. The `ls` runs inside `/tmp`, listing its contents.

### Step 4 — Error Handling

```ts
r = await shell.exec("nonexistent-command-xyz");
```

A non-existent command returns `exitCode !== 0` with stderr populated by the shell's "command not found" error.

### Step 5 — Timeout

```ts
try {
	await shell.exec("sleep 10", "root", "/root");
} catch (err) {
	console.log(`  timeout: ${(err as Error).message}`);
}
```

`sleep 10` exceeds the 5-second timeout. The worker is terminated, the promise rejects, and the catch block prints the timeout message.

### Step 6 — Serial Execution

```ts
for (let i = 1; i <= 3; i++) {
	r = await shell.exec(`echo "command ${i}"`);
}
```

Three commands run sequentially. Since they're `await`ed, each completes before the next starts. Each command spawns a fresh worker thread.

### Step 7 — Cleanup

```ts
shell.terminate();
```

`terminate()` performs cleanup — ending any remaining workers and freeing resources.

## Key Concepts

- **Worker thread isolation**: Each command runs in its own V8 isolate. A crash in one command cannot bring down the main process.
- **Configurable timeout**: Commands exceeding the timeout are force-terminated, preventing runaway processes.
- **No shared state**: Each `exec()` is stateless — environment variables, working directory, and other context must be passed explicitly each time.
- **Serial execution**: `await` guarantees ordering. Parallel execution is possible by not awaiting promises, but each call still gets its own worker.
- **Resource cleanup**: Always call `terminate()` when done to avoid accumulating zombie workers.

## Expected Output

```
--- Basic commands ---
  echo: exit=0 stdout=hello world
  whoami: exit=0 stdout=root
  pwd: exit=0 stdout=/home/itsrealfortune/virtual-env-js

--- Working directory ---
  ls /tmp: exit=0 lines=8

--- Error handling ---
  bad cmd: exit=127 stderr=/bin/sh: nonexistent-command-xyz: not found

--- Timeout ---
  timeout: Command execution timed out

--- Serial commands ---
  cmd 1: command 1
  cmd 2: command 2
  cmd 3: command 3
```

(Actual output depends on your OS environment.)
