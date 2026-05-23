---
title: HoneyPot Quick Start
group: Examples
---

# HoneyPot — Quick Start Guide

## The Scenario

You need to audit every operation in a virtual environment — file reads and writes, user creation, authentication attempts, command execution — without instrumenting each component individually. `HoneyPot` is a single attach point that intercepts events from `VirtualShell`, `VirtualFileSystem`, `VirtualUserManager`, `SshMimic`, and `SftpMimic` through a unified logging interface.

This example walks through the full lifecycle: create a virtual environment, attach HoneyPot, perform operations, query statistics, filter logs, and detect anomalies.

## Modules Used

```ts
import { HoneyPot, SshClient, VirtualShell, VirtualSshServer } from "../../src/index";
```

- `HoneyPot` — central audit logger. Attaches to any component and records typed events with timestamps, sources, and details.
- `VirtualShell` — simulation container with VFS and user manager.
- `VirtualSshServer` — SSH server that accepts real TCP connections and generates auth/connection events.
- `SshClient` — real SSH client that connects over TCP to the server.

## Step-by-Step Walkthrough

### Step 1 — Create the Virtual Environment

```ts
const shell = new VirtualShell("my-lab");
const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

const users = shell.getUsers()!;
const vfs = shell.getVfs()!;
```

Creates a shell with hostname `"my-lab"`, an SSH server on port 2222, and extracts the user manager and VFS references via nullable getters.

### Step 2 — Initialize HoneyPot

```ts
const honeypot = new HoneyPot();
```

Constructs a HoneyPot instance with the default log size limit. Optionally accepts `maxLogSize` (number of entries to retain — older entries are trimmed automatically).

### Step 3 — Attach to Components

```ts
honeypot.attach(shell, vfs, users, ssh);
```

`attach()` subscribes to events on all provided components. After this call, every operation on these objects is recorded:

- **shell** — command execution events
- **vfs** — file read/write events
- **users** — user add/remove, auth success/failure events
- **ssh** — connect, disconnect, auth events

### Step 4 — Perform Operations

```ts
users.addUser("dev_user", "secure_pass");

const client = new SshClient();
await client.connect({ host: "localhost", port: 2222, username: "dev_user", password: "root" });
await client.mkdir("/app", true);
await client.writeFile("/app/config.json", '{"debug":true}');
await client.readFile("/app/config.json");
```

Creates a user, connects over real SSH, creates a directory, writes a config file, and reads it back. Every operation is automatically logged by HoneyPot.

### Step 5 — Query Statistics

```ts
const stats = honeypot.getStats();
```

Returns an object with aggregate counters: `commands`, `fileWrites`, `fileReads`, `userCreated`, `authAttempts`, `authSuccesses`, `authFailures`, `sessionStarts`, `sessionStops`, `clientConnects`, `clientDisconnects`.

### Step 6 — View Recent Events

```ts
honeypot.getRecent(5).forEach((entry, idx) => {
	console.log(`  ${idx + 1}. [${entry.source}] ${entry.type}`);
});
```

Returns the last N entries from the audit log. Each entry has `{ timestamp, source, type, details }`.

### Step 7 — Filter by Event Type or Source

```ts
const userEvents = honeypot.getAuditLog("user:add");
const vfsEvents = honeypot.getAuditLog(undefined, "VirtualFileSystem");
```

`getAuditLog(type?, source?)` filters by event type, source, or both. Common event types: `auth:success`, `auth:failure`, `file:read`, `file:write`, `user:add`, `command:exec`.

### Step 8 — Detect Anomalies

```ts
const anomalies = honeypot.detectAnomalies();
```

Returns an array of anomaly objects `{ type, severity, message }`. Anomalies are detected from patterns in the audit log — thresholds of unexpected behavior trigger entries.

### Step 9 — Export the Full Audit Log

```ts
const fullLog = honeypot.getAuditLog();
```

Returns every recorded entry. Ready to store in a database, write to a file, or send to a monitoring system.

## Expected Output

```
🍯 HoneyPot Quick Start

Step 1️⃣  Creating virtual environment...
✅ Environment ready

Step 2️⃣  Initializing HoneyPot...
Step 3️⃣  Attaching HoneyPot to components...
✅ HoneyPot is now tracking all activity

Step 4️⃣  Performing some operations...

  ✓ Created user 'dev_user'
  ✓ Created /app directory and config.json
  ✓ Read config.json

Step 5️⃣  Viewing activity statistics...

  📊 Commands: 3
  📝 File writes: 1
  📖 File reads: 1
  👤 Users created: 1

Step 6️⃣  Last 5 events:
  ...
```

## Key Concepts

- **Single attach point**: One `attach()` call covers shell, VFS, users, and SSH — no per-component wiring.
- **Typed audit entries**: Every event carries `timestamp`, `source` (component name), `type` (event name), and `details` (typed payload).
- **Two query modes**: `getRecent(n)` for the latest entries, `getAuditLog(type, source)` for filtered searches.
- **Anomaly detection**: `detectAnomalies()` surface patterns like unexpected auth failures without manual log analysis.
- **Automatic trimming**: Old entries are evicted when the log exceeds `maxLogSize`, preventing unbounded memory growth.
