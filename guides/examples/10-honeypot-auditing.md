---
title: 10 - Honeypot Auditing
group: Examples
---

# Example 10 — Honeypot Auditing

## The Scenario

Security auditing is essential for detecting unauthorized access, data exfiltration, and anomalous behavior in production systems. A **honeypot** is a decoy system or component that lures attackers by appearing legitimate, then logs every interaction for forensic analysis. In this virtual environment, the `HoneyPot` auditor wraps the shell, filesystem, and user database to silently record all commands, file reads, and file writes — similar to how tools like `auditd`, `osquery`, or Falco monitor real Linux systems. The buffered event log and anomaly detection make it possible to surface suspicious patterns (e.g., rapid-fire commands, access to sensitive paths) without modifying the target components.

## Modules Used

```ts
import { HoneyPot, SshClient, VirtualShell, VirtualSshServer } from "../src";
```

- **`HoneyPot`**: The auditing engine. It attaches to multiple subsystems, intercepts events, stores them in a bounded ring buffer, computes aggregate statistics, and runs heuristic anomaly detection.
- **`VirtualShell`**: The simulated Linux shell environment. It owns the VFS and user manager. The HoneyPot attaches to the shell itself (to capture command execution), the VFS (to capture file I/O), and the user manager (to capture auth events).
- **`SshClient`**: A simulated SSH client connecting to a `VirtualSshServer`. Creates an unconnected client via `new SshClient()`, then connects via `.connect({ host, port, username, password })`.
- **`VirtualSshServer`**: A lightweight virtual SSH server that binds to a TCP port and proxies connections into a `VirtualShell`, handling authentication and session management.

## Step-by-Step Walkthrough

### Step 1 — Create and initialize the shell

```ts
const shell = new VirtualShell("typescript-vm");
await shell.ensureInitialized();
```

`VirtualShell` is the central orchestration object. Its constructor takes a hostname (`"typescript-vm"`). Calling `ensureInitialized()` is async — it bootstraps the virtual environment: creates the root filesystem, sets up `/etc/`, `/tmp/`, `/home/`, and initializes the user database with a default `root` user. A root password is then set to enable SSH authentication:

```ts
shell.users.setPassword("root", "root");
```

### Step 2 — Create and attach the HoneyPot

```ts
const hp = new HoneyPot(5000);
hp.attach(shell, shell.vfs, shell.users);
```

The constructor accepts a single parameter: `maxEntries` (5000). This is the maximum number of audit log entries stored in the ring buffer. When the buffer is full, the oldest entry is evicted to make room for new ones — preventing unbounded memory growth.

`attach()` is a variadic method that wires the HoneyPot into the event emitters of each provided subsystem:

- **`shell`**: Intercepts command execution events (`exec`, `run`) via wrapper hooks.
- **`shell.vfs`**: Intercepts filesystem events — `readFile`, `writeFile`, `mkdir`, `unlink`, etc. Each call increments either a read or write counter.
- **`shell.users`**: Intercepts user authentication and management events — login attempts, user creation, password changes.

The attachment is transparent: the subsystems continue to work normally, but every operation now flows through the HoneyPot's event listeners. There is no performance overhead beyond the in-memory log append and counter increment.

### Step 3 — Start the SSH server

```ts
const ssh = new VirtualSshServer({ port: 0, shell });
const port = await ssh.start();
```

`VirtualSshServer` wraps the shell with an SSH server that listens on a TCP port. Port `0` tells the OS to assign an available port. The returned `port` is used by `SshClient` to connect.

### Step 4 — Simulate activity via SSH client

```ts
const client = new SshClient();
await client.connect({ host: "localhost", port, username: "root", password: "root" });
```

An `SshClient` is created and connected as `root` user. Every `exec()` call simulates a full SSH command lifecycle: authentication, shell session dispatch, command execution, and output capture.

```ts
await client.exec("echo 'secret data' > /etc/secrets.txt");
await client.exec("cat /etc/secrets.txt");
await client.exec("ls -la /tmp");
```

Three file operations generate a mix of file writes (the `echo ... >` redirect), file reads (`cat`, `ls`), and command executions. Each of these fires events that HoneyPot records:

- The `echo 'secret data' > /etc/secrets.txt` command triggers a **file write** event for `/etc/secrets.txt`.
- The `cat /etc/secrets.txt` triggers a **file read** event for the same file.
- The `ls -la /tmp` triggers a **file read** event for the `/tmp` directory.

### Step 5 — Multiple rapid commands

```ts
for (let i = 0; i < 5; i++) {
    await client.exec(`echo "command ${i}"`);
}
```

Five quick successive echo commands demonstrate burst behavior. In a real honeypot, a high velocity of commands in a short window is a red flag — it can indicate an automated attack script rather than interactive human use. The anomaly detector specifically looks for this pattern.

### Step 6 — Read audit statistics

```ts
const stats = hp.getStats();
console.log("Audit statistics:");
console.log(`  Commands: ${stats.commands}`);
console.log(`  File reads: ${stats.fileReads}`);
console.log(`  File writes: ${stats.fileWrites}`);
```

`getStats()` returns an aggregate counters object. After the above activity, the stats reflect:

- **commands**: 8 total (3 initial + 5 loop iterations)
- **fileReads**: 3 (cat + ls + any reads done internally by the shell)
- **fileWrites**: 1 (the echo redirect)

These counters are monotonically increasing since the HoneyPot was attached. They never reset unless you discard the entire HoneyPot instance.

### Step 7 — Detect anomalies

```ts
const anomalies = hp.detectAnomalies();
```

This method scans the buffered event log using heuristic rules. Possible anomaly signals include:

- **High command frequency**: More than N commands in a short window (the 5 loop iterations back-to-back may trigger this).
- **Sensitive path access**: Reading `/etc/shadow`, `/etc/secrets.txt`, or other sensitive files.
- **Repeated failed operations**: Multiple failed authentication attempts.
- **Unusual working hours**: Activity outside expected time windows (if timestamps are considered).

Each anomaly carries a `type` (categorizing the detection rule), a `severity` string (`"low"`, `"medium"`, `"high"`), and a human-readable `message`.

### Step 8 — View recent log entries

```ts
const recent = hp.getRecent(3);
```

`getRecent(n)` returns the `n` most recent audit entries from the ring buffer.

### Step 9 — Cleanup

```ts
client.disconnect();
ssh.stop();
```

The SSH session and server are shut down cleanly.

## Module Interactions

The `HoneyPot` uses an **aspect-oriented** pattern: it wraps each subsystem's event emitter with a listener layer rather than requiring the subsystems to know about auditing. When `attach(subsystem)` is called:

1. The HoneyPot checks what type the subsystem is (shell, VFS, user manager) via duck-typing or internal type checks.
2. It subscribes to the subsystem's `on("event", callback)` emitter — each subsystem exposes a typed event emitter.
3. Each event handler atomically: (a) increments the relevant counter, (b) appends a log entry to the ring buffer, and (c) checks threshold conditions for anomaly detection.
4. When `detectAnomalies()` is called, it iterates the current buffer window and runs heuristic rules. This is stateless between calls — it does not maintain anomaly state, only logs.

The ring buffer is implemented as a fixed-size array with a head pointer. On each append, the head advances modulo `maxEntries`, so the buffer always contains the most recent N events. This makes `getRecent(n)` a simple slice operation rather than a database query.

## Expected Output

```
--- Attach HoneyPot ---

--- Simulate activity ---

--- Audit statistics ---
Commands: 8
File reads: 3
File writes: 1

--- Anomalies ---
[HIGH] rapid_commands: 5 commands in 0.012s

--- Recent log entries ---
[command] SshClient
[command] SshClient
[command] SshClient
```

Run with:

```bash
bun run examples/10-honeypot-auditing.ts
```

The exact anomaly output depends on the threshold configuration and timing, but the pattern is: command spikes that exceed the normal human typing speed (more than 2–3 commands per second) trigger a `rapid_commands` anomaly.

## Key Concepts

- **Aspect-Oriented Observation (AOP):** The HoneyPot never modifies `VirtualShell`, `VirtualFileSystem`, or `UserManager` source code. It attaches externally via their event emitters. This is clean separation of concerns — the core subsystems are not polluted with auditing logic.
- **Bounded Ring Buffer:** Using a fixed-size circular buffer prevents memory leaks in long-running scenarios. The `maxEntries` constructor argument lets you control memory overhead (roughly `maxEntries × averageEntrySize` bytes).
- **Heuristic Anomaly Detection:** The detector uses simple, fast heuristics rather than ML models. This keeps the dependency tree minimal and the detection deterministic and explainable — you can always see *why* an anomaly was flagged.
- **Aggregate Counters vs. Full Logs:** `getStats()` provides cheap, O(1) access to totals without iterating the buffer. `getRecent(n)` provides fine-grained access to recent events. This dual interface suits both monitoring dashboards (stats) and incident response (log details).
- **Transparent Integration via Shell:** Because `SshClient.exec()` goes through the shell, and the shell is attached to HoneyPot, every SSH command is audited automatically — no per-command instrumentation needed in the client.
