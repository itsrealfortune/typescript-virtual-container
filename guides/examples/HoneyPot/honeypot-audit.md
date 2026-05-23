---
title: HoneyPot Comprehensive Auditing
group: Examples
---

# HoneyPot — Comprehensive Auditing

## The Scenario

A security audit of a virtual environment needs more than counters — it needs per-user activity trails, filtered views by event type and source, file operation tracking, and anomaly detection with severity grading. This example builds a complete auditing scenario with multiple users, normal operations, attempted unauthorized access, and a structured audit report.

## Modules Used

```ts
import { HoneyPot, SshClient, VirtualShell, VirtualSshServer } from "../../src/index";
```

Same modules as the quick start, used to simulate a multi-user security lab.

## Step-by-Step Walkthrough

### Step 1 — Setup

```ts
const shell = new VirtualShell("security-lab");
const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();
const users = shell.getUsers()!;
const vfs = shell.getVfs()!;
const honeypot = new HoneyPot(1000);
honeypot.attach(shell, vfs, users, ssh);
```

Creates the environment with a 1000-entry log limit and attaches HoneyPot to all components.

### Step 2 — Normal User Activity (Alice)

```ts
users.addUser("alice", "alice_pass123");
users.addUser("bob", "bob_pass456");

const alice = new SshClient();
await alice.connect({ host: "localhost", port: 2222, username: "alice", password: "alice_pass123" });
await alice.mkdir("/home/alice/work", true);
await alice.writeFile("/home/alice/work/notes.txt", "Project notes");
await alice.ls("/home/alice/work");
await alice.cat("/home/alice/work/notes.txt");
```

Alice creates a working directory, writes notes, lists files, and reads them back — all legitimate activity that HoneyPot logs.

### Step 3 — Suspicious Activity (Bob)

```ts
const bob = new SshClient();
await bob.connect({ host: "localhost", port: 2222, username: "bob", password: "bob_pass456" });
await bob.readFile("/etc/shadow");
await bob.readFile("/etc/passwd");
await bob.readFile("/root/.ssh/id_rsa");
```

Bob attempts to read sensitive system files. These operations will fail (permissions prevent them), but HoneyPot tracks the attempts as `file:read` events with the target paths.

### Step 4 — Review Statistics

```ts
const stats = honeypot.getStats();
```

Returns aggregate counters. In this scenario, `fileReads` includes both Alice's legitimate reads and Bob's blocked attempts — HoneyPot records the attempt, not just the success.

### Step 5 — View Recent Events

```ts
const recent = honeypot.getRecent(10);
```

The last 10 entries show the full sequence: user creation, SSH connections, directory creation, file writes, file reads, and the blocked `/etc/shadow` accesses.

### Step 6 — Filter Auth Failures

```ts
const authFailures = honeypot.getAuditLog("auth:failure");
```

While this scenario has no actual auth failures (passwords are correct), this demonstrates filtering by event type for security analysis.

### Step 7 — Filter SSH-Specific Events

```ts
const sshEvents = honeypot.getAuditLog(undefined, "SshMimic");
```

Returns all events emitted by `SshMimic`: `client:connect`, `auth:success`, `client:disconnect`. The `source` filter isolates component-specific activity.

### Step 8 — File System Activity Report

```ts
const fileWrites = honeypot.getAuditLog("file:write", "VirtualFileSystem");
const fileReads = honeypot.getAuditLog("file:read", "VirtualFileSystem");
```

Combined type + source filtering produces a focused file operations report.

### Step 9 — Anomaly Detection

```ts
const anomalies = honeypot.detectAnomalies();
```

Returns anomalies with severity levels (`low`, `medium`, `high`). Bob's attempts to read sensitive files may trigger medium or high severity anomalies depending on HoneyPot's detection rules.

### Step 10 — Full Audit Export

```ts
const allAuditEntries = honeypot.getAuditLog();
const exportData = {
	timestamp: new Date().toISOString(),
	environment: "security-lab",
	stats,
	auditLog: allAuditEntries.slice(-50),
	anomalies,
};
```

Builds a structured export object with metadata, statistics, the last 50 entries, and any anomalies.

## Expected Output

```
🍯 HoneyPot Auditing Example

✅ HoneyPot attached to all components

--- Scenario 1: Normal User Activity ---
✓ Alice performed normal operations

--- Scenario 2: Suspicious Attempt ---
✓ Bob attempted unauthorized file access

--- Activity Summary ---

📊 Audit Statistics:
  • Auth attempts: ...
  • Auth successes: ...
  • File reads: ...
  • File writes: ...
```

## Key Concepts

- **Comprehensive tracking**: All operations — successful or not — are recorded. Blocked file reads appear alongside legitimate ones.
- **Dual-axis filtering**: `getAuditLog(type, source)` lets you zoom in on specific event types from specific components.
- **Severity-graded anomalies**: Not all anomalies are equal — `low`, `medium`, and `high` severity help prioritize response.
- **Scenario isolation**: The pattern of normal → suspicious → analyze → export is reusable for security regression testing.
- **Export-ready**: The audit log can be serialized as JSON and stored in any external system.
