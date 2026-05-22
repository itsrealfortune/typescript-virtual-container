---
title: 11 - Concurrent Clients
group: Examples
---
# Example 11 — Concurrent Clients

## The Scenario

Multi-user systems like shared hosting environments, CI/CD runners, and classroom VMs must support many users operating on the same filesystem simultaneously. Each user expects isolated home directories but shared access to common spaces like `/tmp`. Real-world systems handle this with kernel-level locking, permission bits, and concurrent I/O schedulers. This example simulates three users — Alice, Bob, and Charlie — running file operations in parallel against the same virtual shell. It demonstrates that the VFS correctly serializes concurrent writes, preserves data integrity under parallel reads, and presents a consistent directory listing to all clients, exactly as a real POSIX filesystem would.

## Modules Used

```ts
import { SshClient, VirtualShell } from "../src";
```

- **`VirtualShell`**: The shared shell environment that all clients connect to. It holds the single `VirtualFileSystem` instance and `UserManager` — the source of truth for all file state.
- **`SshClient`**: A simulated SSH session bound to a specific user. Each client authenticates as a different user, but they all share the same underlying `VirtualShell` and thus the same VFS. File writes from any client are immediately visible to all others.

## Step-by-Step Walkthrough

### Step 1 — Initialize the shared shell

```ts
const shell = new VirtualShell("typescript-vm");
await shell.ensureInitialized();
```

Creates a single `VirtualShell` with hostname `"typescript-vm"` and bootstraps its filesystem and user database. This shell is the shared environment that all three clients will connect to. There is no duplication — one VFS, one user database.

### Step 2 — Create three users

```ts
await shell.users.addUser("alice", "alice123");
await shell.users.addUser("bob", "bob456");
await shell.users.addUser("charlie", "charlie789");
```

Each user is registered in the virtual user database with a username and password. The `addUser()` method creates a home directory at `/home/<username>` with appropriate permissions. This mimics the `useradd` Linux command. All three users exist in the same user manager, which means they share the same UID namespace and filesystem realm.

### Step 3 — Create per-user SSH clients

```ts
const client1 = new SshClient(shell, "alice");
const client2 = new SshClient(shell, "bob");
const client3 = new SshClient(shell, "charlie");
```

Each `SshClient` wraps the same `shell` but authenticates as a different user. Internally, the client stores a reference to the shell and the username. Every operation (`exec`, `writeFile`, `cat`, `ls`) is executed under that user's identity — the shell applies permission checks based on the user's UID and group membership.

### Step 4 — Concurrent file writes

```ts
const [r1, r2, r3] = await Promise.all([
    client1.writeFile("/tmp/alice.txt", `Alice's data — written at ${Date.now()}`),
    client2.writeFile("/tmp/bob.txt", `Bob's data — written at ${Date.now()}`),
    client3.writeFile("/tmp/charlie.txt", `Charlie's data — written at ${Date.now()}`),
]);
```

`Promise.all()` fires all three write operations simultaneously. Each client writes to a different file under `/tmp/` — a shared directory writable by all users. The writes contain a `Date.now()` timestamp to prove they were created in the same batch.

Under the hood, each `writeFile()` call goes through the same VFS instance. The VFS serializes writes internally (via a mutex or synchronous operations), so there is no corruption or interleaving. Each file is created atomically. The exit codes verify success: `exitCode === 0` means the write completed without errors.

### Step 5 — Concurrent reads

```ts
const [read1, read2, read3] = await Promise.all([
    client1.cat("/tmp/alice.txt"),
    client2.cat("/tmp/bob.txt"),
    client3.cat("/tmp/charlie.txt"),
]);
```

Each client reads their own file concurrently. Because reads are non-mutating, the VFS can serve all three in parallel without locking conflicts. Each `cat()` returns an `ExecResult` object with a `stdout` property containing the file content. The `.trim()` call removes any trailing newline from the shell output.

### Step 6 — Cross-user file access

```ts
const bobReadsAlice = await client2.cat("/tmp/alice.txt");
```

Bob reads Alice's file from `/tmp/`. Since `/tmp/` is world-readable in the virtual environment, this succeeds. The output shows `exitCode 0` and the first 30 characters of the content (truncated via `.slice(0, 30)`). In a more restrictive setup, Alice could set permissions to `600` (owner-only) to block this access — the VFS supports standard Unix permission bits.

### Step 7 — Concurrent directory listing

```ts
const [ls1, ls2, ls3] = await Promise.all([
    client1.ls("/tmp"),
    client2.ls("/tmp"),
    client3.ls("/tmp"),
]);
```

All three clients list the contents of `/tmp/` simultaneously. Since all three files were written to the same shared directory, every client sees exactly the same listing — the VFS is a single consistent state. The `.split("\n").length` count should show 3 entries for all clients.

### Step 8 — Concurrent command execution

```ts
const commands = [
    client1.exec("echo 'hello from alice'"),
    client2.exec("echo 'hello from bob'"),
    client3.exec("echo 'hello from charlie'"),
    client1.exec("hostname"),
    client2.exec("whoami"),
];
const results = await Promise.all(commands);
```

Five commands run in parallel — a mix of echo greetings, `hostname`, and `whoami`. Each command runs in its own shell context under the respective user's identity. `whoami` returns the username of the client that issued it (Bob), proving that user identity is correctly scoped to the `SshClient` instance even under concurrent execution.

## Module Interactions

The VFS is a **single-threaded synchronous store** wrapped in async APIs. When multiple `SshClient` instances issue operations simultaneously:

1. `Promise.all()` schedules all operations as microtasks in the JavaScript event loop.
2. The VFS processes each operation in the order it arrives at the underlying synchronous methods. Because JavaScript is single-threaded, there is no true parallel mutation — the event loop serializes access to the VFS data structures.
3. File reads (`cat`, `readFile`) are lock-free and can interleave with each other and with other operations.
4. File writes (`writeFile`, shell redirects) are atomic — a write either fully completes or does not happen. Partial writes are impossible because each write is a single synchronous operation that replaces the entire file content.
5. Directory listings (`ls`) take a snapshot of the directory entries at the moment of the call. Concurrent writes that happen during the listing will either be included or excluded depending on timing — this is the same behavior as `ls` on a real Linux system.

The key insight: the virtual environment is not truly parallel at the VFS level (no kernel threads, no multi-core file locking), but the async interface (`Promise.all`) makes it *appear* concurrent to the caller. This is sufficient to test correctness of shared-state logic, permission checks, and cross-user visibility.

## Expected Output

```
Running 3 concurrent file writes...

Alice write: exit 0
Bob write:   exit 0
Charlie write: exit 0

Reading all files concurrently...
Alice's file: "Alice's data — written at <timestamp>"
Bob's file:   "Bob's data — written at <timestamp>"
Charlie's file: "Charlie's data — written at <timestamp>"

Cross-user file access (shared /tmp):
Bob reads Alice's file: exit 0 — "Alice's data — written at <t..."

Concurrent directory listing of /tmp:
Alice sees: 3 entries
Bob sees:   3 entries
Charlie sees: 3 entries

Running 5 concurrent commands...
  → "hello from alice" (exit 0)
  → "hello from bob" (exit 0)
  → "hello from charlie" (exit 0)
  → "typescript-vm" (exit 0)
  → "bob" (exit 0)

✅ All concurrent operations completed
```

Run with:

```bash
bun run examples/11-concurrent-clients.ts
```

Timestamps in the output will vary, but the structure and exit codes are deterministic.

## Key Concepts

- **Shared VFS, multiple auth contexts:** All clients share one filesystem but authenticate as different users. This mirrors real-world multitenancy where isolation is at the permission level, not the filesystem level.
- **`Promise.all()` for concurrency simulation:** Without needing threads or worker processes, `Promise.all()` creates concurrent pressure on the VFS. This is the idiomatic JavaScript approach to testing shared-state correctness.
- **`/tmp/` as shared space:** The virtual `/tmp/` has world-writable permissions (mode `1777`, sticky bit), enabling cross-user file sharing. This matches Linux convention.
- **Per-client identity scoping:** The `whoami` example proves that `SshClient` correctly scopes user identity even under concurrent execution — the VFS applies permission checks based on each client's authenticated user, not the shell's default user.
- **No race condition exposure:** Because the VFS serializes writes synchronously, this example does not demonstrate data corruption races. In a real distributed filesystem (NFS, SMB), concurrent writes to the same file could interleave. The VFS's simplicity is both a limitation and a guarantee.
