---
title: 03 - Multi-User Quotas
group: Examples
---

# Example 03 — Multi-User Quotas

## The Scenario

Multi-tenant environments like shared hosting platforms, training VMs, or CI/CD runner pools all face the same fundamental problem: one user should not be able to interfere with another user's files or exhaust shared disk resources. Real-world platforms like Heroku, GitHub Actions, and school lab environments solve this with a combination of OS-level user accounts, filesystem permissions, and disk quotas. This example recreates that triad entirely in a VirtualShell sandbox.

The concrete scenario: a team of developers (Alice and Bob) share a Linux VM. Alice stores secrets in her home directory. Bob should not be able to read those secrets. Bob should also be unable to run `sudo` commands, and his disk usage should be capped at 5 MB so he cannot fill the disk and cause a denial of service for Alice.

## Modules Used

```ts
import { SshClient, VirtualShell, VirtualSshServer } from "../src";
```

- **`VirtualShell`** — the top-level orchestrator that manages a virtual Linux environment. Its `.users` property returns a `UserManager` instance, which is the gateway for all user-related operations: creation, modification, privilege toggling, quota management, and key storage. The shell also owns the `VirtualFileSystem` that enforces permission checks during file I/O.

- **`SshClient`** — a simulated SSH client connecting over TCP to a `VirtualSshServer`. Each `SshClient` is constructed without arguments, then connected via `.connect({ host, port, username, password })`. Every method call (`.exec()`, `.cat()`) sends a command over the SSH session, which the server executes within the shell under the authenticated user's UID.

- **`VirtualSshServer`** — a lightweight virtual SSH server that binds to a TCP port and proxies SSH connections into a `VirtualShell`. It handles authentication (password, public key) and session management, and translates client commands into VFS operations with the correct UID attached.

## Step-by-Step Walkthrough

### 1. Shell Initialization

```ts
const shell = new VirtualShell("typescript-vm");
await shell.ensureInitialized();
```

`new VirtualShell("typescript-vm")` creates a new virtual environment with a fresh, empty filesystem, a root user, and a default user database. The string "typescript-vm" is an identifier used internally (e.g., for container naming or logging). `ensureInitialized()` is async because it performs any one-time setup required — creating the root home directory, setting up the VFS root node, and establishing the base user record for root. Until this promise resolves, operations on `shell.users` or the VFS may throw.

A root password must be set to enable SSH authentication as root:

```ts
shell.users.setPassword("root", "root");
```

### 2. User Creation

```ts
shell.users.addUser("alice", "alice123");
shell.users.addUser("bob", "bob456");
console.log("Created users: alice, bob");
```

`addUser(username, password)` does several things under the hood inside `UserManager`:
- Generates a unique UID (assigned sequentially starting from 1000, following Linux conventions).
- Creates a matching primary GID.
- Hashes the password using a configurable algorithm (defaults to SHA-256 with a salt).
- Creates a `UserRecord` object: `{ uid, gid, username, passwordHash, sudo: true, quotaBytes: Infinity, homeDir: "/home/<username>", authorizedKeys: [] }`.
- Inserts the record into the internal `Map<string, UserRecord>`.
- Creates `/home/<username>` in the VFS if it does not already exist, owned by that UID/GID with mode `755`.

Both Alice and Bob start with `sudo: true` by default. The password is stored as a hash, not plaintext — `UserManager` never logs or exposes the original password string.

### 3. Privilege Adjustment

```ts
shell.users.removeSudoer("bob");
console.log("Removed sudo from bob");
```

This flips Bob's `sudo` field from `true` to `false`. There is a corresponding `addSudoer()` that flips it back. The sudo flag is checked by the SSH server simulation during command execution: if a command requires elevated privileges (anything running as root or using `sudo` prefix), the server checks this flag and either permits or denies the operation. Without sudo, Bob is restricted to commands that run under his own UID — he cannot install system packages, modify `/etc/` files, or read `/root/`.

### 4. Quota Configuration

```ts
shell.users.setQuotaBytes("bob", 5 * 1024 * 1024);
console.log(`Bob's quota: ${shell.users.getQuotaBytes("bob")} bytes`);
```

`setQuotaBytes("bob", 5242880)` stores `5242880` in Bob's `UserRecord.quotaBytes`. The getter confirms the value. Under the hood, quotas are checked lazily by the VFS during write operations, not eagerly by `UserManager`. When any write operation is about to commit data, the VFS queries `UserManager.getQuotaBytes(ownerUid)`, sums the sizes of all files owned by that UID across the entire VFS, and rejects the write if `usedBytes + newBytes > quotaBytes`. This means:
- Quota enforcement is scoped to file ownership (UID), not the current writer.
- The sum is recomputed on every write — no cached running total, so it is always accurate but may be O(n) in the number of files.
- The return value of `setQuotaBytes()` is `void`; it always succeeds. Errors only surface at write time.

### 5. Start the SSH Server

```ts
const ssh = new VirtualSshServer({ port: 0, shell });
const port = await ssh.start();
```

`VirtualSshServer` wraps the shell with an SSH server that listens on a TCP port. Port `0` tells the OS to assign an available port. The returned `port` value is used by `SshClient` instances to connect.

### 6. Alice Writes a Private File

```ts
const alice = new SshClient();
await alice.connect({ host: "localhost", port, username: "alice", password: "alice123" });
await alice.exec("echo 'secret=yes' > /home/alice/private.conf && chmod 600 /home/alice/private.conf");
console.log("Alice wrote /home/alice/private.conf (mode 600)");
```

`new SshClient()` creates an unconnected client. `.connect({ host, port, username, password })` opens an SSH session to the `VirtualSshServer`, authenticating as Alice. All subsequent operations from this client carry her UID.

The compound `exec` command does two things:
1. `echo 'secret=yes' > /home/alice/private.conf` — writes the string to a new file. The VFS creates a `VfsEntry` with owner UID=1000, GID=1000, mode=`644` (the default for new files), and content `"secret=yes\n"`.
2. `chmod 600 /home/alice/private.conf` — changes the file's mode to `600` (octal; binary `110 000 000`). This means owner-read (`0o400`) + owner-write (`0o200`), and zero bits for group and other. After this, only Alice (UID 1000) can read or write the file. The VFS's `chmod` implementation simply updates the `mode` field on the `VfsEntry` — no stat or actual disk I/O occurs.

### 7. Bob Attempts to Read Alice's File

```ts
const bob = new SshClient();
await bob.connect({ host: "localhost", port, username: "bob", password: "bob456" });
const r = await bob.cat("/home/alice/private.conf");
console.log(`Bob's cat result: exit ${r.exitCode}${r.stderr ? ` — "${r.stderr.trim()}"` : ""}`);
```

Bob's `SshClient` connects as Bob (UID 1001). When `cat()` is called, the VFS's `readFile()` method:

1. Resolves the path `/home/alice/private.conf` to a `VfsEntry`. The path is normalized to remove any `..` or `.` components and looked up in the `Map<string, VfsEntry>`.
2. Checks permissions: the entry's mode is `600`. The requesting UID is 1001, but the entry's owner UID is 1000. The VFS checks the "other" permission bits first: `mode & 0o004` — that is bit 2 (read for others). `600` in octal is `0o300` in hex, binary `110 000 000`. Bits 2-0 (other) are `000`. Read denied. (It would then check group bits — also `000` — then owner bits — `110`, which would pass, but only for the matching UID.)
3. Since no permission bits grant read access to UID 1001, the operation rejects with a structured result: `{ exitCode: 1, stdout: null, stderr: "cat: /home/alice/private.conf: Permission denied" }`.

The `console.log` shows the rejection. Note that Bob never learns anything about the file — not its size, not its existence as a readable entity. The VFS does not leak metadata on permission errors.

### 8. Alice Reads Her Own File

```ts
const r2 = await alice.cat("/home/alice/private.conf");
console.log(`Alice's cat result: exit ${r2.exitCode} — "${r2.stdout!.trim()}"`);
```

Alice's UID (1000) matches the file owner UID (1000). The VFS checks owner-read bit (`mode & 0o400`, which is `true` for `600`). The read succeeds, returning `{ exitCode: 0, stdout: "secret=yes", stderr: null }`. The output confirms that Alice's permissions work correctly.

### 9. Cleanup

```ts
alice.disconnect();
bob.disconnect();
ssh.stop();
```

Both SSH sessions are terminated and the server is shut down. The shell and its VFS remain in memory.

## Module Interactions

The three key modules — `VirtualShell`, `UserManager` (accessed as `shell.users`), and `VirtualFileSystem` — interact as follows:

1. **`VirtualShell`** acts as a registry. It holds references to both `UserManager` and `VFS`. It does not duplicate data — the user records live exclusively in `UserManager`, files live exclusively in `VFS`.

2. **`VirtualSshServer`** accepts TCP connections, authenticates users against `UserManager`, and creates SSH sessions backed by the shell. Each session maps to the authenticated user's UID.

3. **`SshClient`** connects to `VirtualSshServer` over TCP. After authentication, each command it executes runs within the shell under the connected user's UID. The VFS never resolves usernames internally — it works entirely with numeric UIDs.

4. **Quota enforcement** crosses module boundaries. The VFS does not store quota limits; it reads them from `UserManager` during write operations. This separation of concerns means quota logic lives with user management, while the enforcement hook lives with the filesystem.

5. **Permission enforcement** happens inside `VfsEntry`. The entry stores `uid`, `gid`, and `mode`. The VFS's `readFile`/`writeFile` methods extract these fields and compare them against the caller's UID. No user manager call is needed for basic permission checks.

## Under the Hood

### UserRecord structure

Each user is stored as a `UserRecord` inside `UserManager`'s private `Map<string, UserRecord>`:

```ts
interface UserRecord {
  uid: number;
  gid: number;
  username: string;
  passwordHash: string;
  sudo: boolean;
  quotaBytes: number;        // Infinity by default
  homeDir: string;
  authorizedKeys: { algo: string; data: Buffer }[];
}
```

UIDs are assigned sequentially starting at 1000. There is no UID reuse on deletion — deleted users leave gaps.

### Permission check algorithm

When `vfs.readFile(path, callerUid)` is called, the VFS:

1. Looks up the `VfsEntry` by normalized path.
2. Compares `callerUid` to `entry.uid`. If they match, checks `entry.mode & 0o400` (owner read). If set, allow.
3. If UIDs do not match, resolves the caller's GID (passed alongside callerUid) and compares to `entry.gid`. If they match, checks `entry.mode & 0o040` (group read). If set, allow.
4. If neither UID nor GID matches, checks `entry.mode & 0o004` (other read). If set, allow.
5. If none of the above, deny.

The same pattern applies for write operations using `0o200` (owner write), `0o020` (group write), `0o002` (other write).

### Quota check algorithm

When `vfs.writeFile(path, content, callerUid)` is called:

1. The VFS queries `UserManager.getQuotaBytes(callerUid)`.
2. If the limit is `Infinity`, skip the check (fast path for most users).
3. Otherwise, iterate all entries in the VFS `Map` and sum `entry.content.length` for entries where `entry.uid === callerUid`.
4. Compute `sum + newContent.length`. If it exceeds the limit, reject with an error.

This is O(n) in the number of files but simple and correct. Production implementations would maintain a running total or use an index.

## Expected Output

```text
--- Create users ---
Created users: alice, bob
--- Remove sudo from bob ---
Removed sudo from bob
--- Set disk quota for bob ---
Bob's quota: 5242880 bytes
--- Alice writes private file ---
Alice wrote /home/alice/private.conf (mode 600)
--- Bob tries to read Alice's file ---
Bob's cat result: exit 1 — "cat: /home/alice/private.conf: Permission denied"
--- Alice can read her own file ---
Alice's cat result: exit 0 — "secret=yes"
```

The exact stderr message for Bob may vary slightly depending on the `cat` implementation in the VFS shell, but the exit code of 1 and the presence of "Permission denied" are guaranteed.

## Key Concepts

- **POSIX permission model in a virtualized VFS**: The same owner/group/other read/write/execute bitmask that Linux uses is implemented here entirely in JavaScript, operating on in-memory file entries rather than inode tables. This makes it possible to test permission-sensitive code without root access or real file systems.

- **UID-based user isolation**: The `SshClient` binds to a UID at construction time, and every subsequent operation carries that identity. There is no concept of "switching users" on a single client — you create a new client for each user. This mirrors how real SSH sessions work (one session, one user).

- **Quota as a soft limit enforced at the VFS layer**: The quota is stored in `UserManager` but checked by `VFS` during writes. This means the quota applies to all writes, not just the ones initiated through `SshClient`. If any code writes to the VFS under Bob's UID, the quota check triggers.

- **Privilege separation as a boolean flag**: Unlike real Linux, where sudo is governed by `/etc/sudoers` with fine-grained command-level rules, this system uses a simple `sudo: boolean` flag. This is sufficient for testing and demonstration but not a substitute for proper sudo configuration in production.

- **No pseudo-terminal or login simulation**: `SshClient` does not simulate a full login session — it does not source `.bashrc` or set environment variables. It is a lightweight identity wrapper around VFS operations, which keeps tests fast and deterministic.
