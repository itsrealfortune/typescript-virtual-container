# `typescript-virtual-container`

> Pure in-memory SSH/SFTP server with a virtual filesystem, a real shell interpreter, and a typed programmatic API for testing, automation, honeypots, and interactive shell scripting in TypeScript/JavaScript.

[![npm version](https://badge.fury.io/js/typescript-virtual-container.svg)](https://www.npmjs.com/package/typescript-virtual-container)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Runtime](https://img.shields.io/badge/runtime-Node.js%20%7C%20Bun-43853D.svg)](https://nodejs.org/)

## Table of Contents

- [Overview](#overview)
- [What This Is / What This Is Not](#what-this-is--what-this-is-not)
- [Why This Package](#why-this-package)
- [Installation](#installation)
- [Compatibility](#compatibility)
- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [API Reference](#api-reference)
  - [VirtualSshServer](#virtualsshserver)
  - [VirtualSftpServer](#virtualsftpserver)
  - [VirtualShell](#virtualshell)
  - [VirtualFileSystem](#virtualfilesystem)
  - [VFSB Binary Format](#vfsb-binary-format)
  - [VirtualUserManager](#virtualusermanager)
  - [HoneyPot](#honeypot)
  - [SshClient](#sshclient-programmatic-api)
  - [Key Types](#key-types)
- [Usage Examples](#usage-examples)
- [Built-in Commands](#built-in-commands)
- [Shell Scripting](#shell-scripting)
- [Configuration](#configuration)
- [Performance & Scalability](#performance--scalability)
- [Types & TypeScript](#types--typescript)
- [FAQ](#faq)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Security](#security)
- [Support](#support)
- [License](#license)
- [Roadmap](#roadmap)
- [Changelog](#changelog)

---

## Overview

`typescript-virtual-container` is a lightweight, fully-typed SSH/SFTP runtime written in TypeScript that provides:

- **Pure in-memory filesystem**: No disk I/O at runtime. All state lives in a fast recursive in-memory tree. Persist via a compact binary snapshot format (`.vfsb`) or JSON for interoperability.
- **SSH + SFTP Protocol Support**: Serve SSH shell/exec sessions and SFTP file operations on configurable ports.
- **Password & public-key authentication**: Register SSH public keys per user alongside (or instead of) password auth.
- **Rate limiting / brute-force protection**: Configurable per-IP lockout after N failed auth attempts.
- **User Management**: Create, authenticate, and manage virtual users with scrypt password hashing, sudo-like privilege elevation, and optional per-user disk quotas.
- **Programmatic Shell API**: Execute shell commands and query filesystem state directly from TypeScript without SSH overhead.
- **Real shell interpreter**: `&&` / `||` / `;` operators, `if`/`elif`/`else`/`fi`, `for`/`do`/`done`, `while`/`do`/`done`, variable expansion (`$VAR`, `${VAR:-default}`), `$?`, per-session environment.
- **`.bashrc` support**: Loaded automatically at interactive session start from `/home/<user>/.bashrc`.
- **Event-Driven Architecture**: All core classes extend `EventEmitter` for lifecycle and operation tracking.
- **Security Auditing**: Built-in `HoneyPot` utility for comprehensive activity logging, event tracking, statistics collection, and anomaly detection across all components.
- **60+ Built-in Commands**: Full navigation, text processing, archiving, system info, and user management commands — grouped and documented in the interactive `help` system.
- **Full TypeScript Support**: Complete JSDoc coverage, exported types, and first-class async/await for all operations.

---

## What This Is / What This Is Not

### What This Is

- A virtual shell runtime written in TypeScript with a **pure in-memory filesystem**.
- A virtual environment with its own filesystem, user management, and a real shell interpreter.
- A practical tool for deterministic testing, automation pipelines, and SSH-like workflows without running real containers.
- A honeypot framework for capturing and auditing attacker behavior.

### What This Is Not

- Not a fully isolated container runtime.
- Not a security sandbox — the VFS does not sandbox host filesystem access by spawned child processes (e.g. `wget`, `curl` delegate to the host binary).
- Not a kernel-level isolation boundary (unlike Docker/VM-based isolation).

This project emulates shell behavior for developer workflows. It is designed for realism and productivity, not hard security isolation.

---

## Why This Package

This package is designed for teams that need a realistic SSH-like runtime without spinning up real containers or VMs.

- **Zero disk footprint by default**: The VFS operates entirely in memory. Opt into binary snapshot persistence (`.vfsb`) when you need durability — ~27% smaller and significantly faster than JSON+base64.
- **Deterministic test environments**: Repeatable state for CI pipelines and integration tests. Build a fixture snapshot once, hydrate for each test.
- **Low operational overhead**: No Docker daemon, no kernel namespaces, no privileged setup.
- **Fast feedback loops**: Programmatic API for command execution and filesystem assertions.
- **Real shell scripting**: `&&`/`||`/`;`, `if`/`for`/`while`, variable expansion — not just command dispatch.
- **Developer-friendly internals**: Typed APIs, clear boundaries, composable building blocks, and full JSDoc.

---

## Installation

### From npm

```bash
npm install typescript-virtual-container
# or
yarn add typescript-virtual-container
# or
bun add typescript-virtual-container
```

### From source (development)

```bash
git clone https://github.com/itsrealfortune/typescript-virtual-container/
cd typescript-virtual-container
bun install
bun format   # Format code per Biome
bun check    # Lint and typecheck
bun run build
```

### Standalone (zero install)

To quickly try a standalone demo:

```bash
curl -s https://raw.githubusercontent.com/itsrealfortune/typescript-virtual-container/refs/heads/main/standalone.js -o standalone.js && node standalone.js && rm -f standalone.js
```

---

## Compatibility

- **Node.js**: Recommended `>=18`
- **Bun**: Supported for development and runtime
- **TypeScript**: Recommended `>=5.0`
- **OS**: Linux, macOS, and Windows (via Node/Bun runtime)

The virtual filesystem and shell behavior are intentionally portable and do not depend on host-specific POSIX syscalls.

---

## Quick Start

### Running an SSH Server

```typescript
import { VirtualSshServer } from "typescript-virtual-container";

const ssh = new VirtualSshServer({
  port: 2222,
  hostname: "my-container",
});

await ssh.start();
console.log("SSH server listening on :2222");

// Connect externally:
// ssh root@localhost -p 2222
// root has no password by default — login is allowed without verification.

process.on("SIGTERM", () => {
  ssh.stop();
  process.exit(0);
});
```

### Running SSH + SFTP with Shared State

```typescript
import { VirtualSftpServer, VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("my-container");

const ssh  = new VirtualSshServer({ port: 2222, hostname: "my-container", shell });
const sftp = new VirtualSftpServer({ port: 2223, hostname: "my-container", shell });

await ssh.start();
await sftp.start();

console.log("SSH on :2222, SFTP on :2223");
```

### Using the Programmatic Client API

```typescript
import { SshClient, VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("typescript-vm");
const ssh   = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

const client = new SshClient(shell, "root");

const list = await client.ls("/home");
console.log("stdout:", list.stdout);

const result = await client.pwd();
console.log("Current dir:", result.stdout);

await client.mkdir("/tmp/work", true);
await client.cd("/tmp/work");

const content = await client.readFile("/etc/hostname");
console.log("Hostname file:", content.stdout);

await client.writeFile("output.txt", "Hello, World!");

ssh.stop();
```

---

## Architecture Overview

### Execution Modes

1. **SSH Shell Mode**: Interactive terminal session over SSH with readline, history, `.bashrc` loading, TTY resizing, `Ctrl+W` word delete, `Ctrl+U` line clear.
2. **SSH Exec Mode**: Non-interactive command execution (e.g. `ssh user@host "ls -la"`).
3. **SFTP Mode**: Remote file operations (`readdir`, `stat`, `readFile`, `writeFile`, `mkdir`, `rename`, etc.) with home-directory confinement.
4. **Programmatic Mode**: Direct TypeScript API via `SshClient` — no SSH protocol overhead.

```
┌──────────────────────────────────────────────────────────────────────────┐
│  SshMimic (VirtualSshServer)             SftpMimic (VirtualSftpServer)  │
│  password auth · publickey auth          SFTP protocol handlers          │
│  per-IP rate limiting / lockout          home-dir confinement            │
└─────────────────────────┬────────────────────────────────────────────────┘
                          │
               ┌──────────▼──────────┐
               │    VirtualShell     │
               │  script parser      │  ← &&/||/; · if/for/while
               │  command executor   │  ← per-session ShellEnv
               │  .bashrc loader     │  ← /home/<user>/.bashrc
               │  session manager    │
               └──┬──────────────┬───┘
                  │              │
     ┌────────────▼───┐    ┌─────▼───────────────┐
     │VirtualFileSystem│   │ VirtualUserManager   │
     │ in-memory tree  │   │ scrypt · sudoers     │
     │ gzip · symlinks │   │ publickey auth       │
     │ .vfsb binary    │   │ quotas · sessions    │
     │ mode:memory|fs  │   └─────────────────────-┘
     └─────────────────┘
                  │
     ┌────────────▼────────────┐
     │        HoneyPot         │
     │ audit log · stats       │
     │ anomaly detection       │
     └─────────────────────────┘
```

---

## API Reference

### `VirtualSshServer`

Main SSH server class. Wires the virtual shell runtime into `ssh2` sessions and manages authentication and session handlers.

#### Constructor

```typescript
new VirtualSshServer({
  port: number;               // TCP port to bind
  hostname?: string;          // Virtual hostname (default: "typescript-vm")
  shell?: VirtualShell;       // Optional shared shell instance (share state with SFTP)
  maxAuthAttempts?: number;   // Max failed auth per IP before lockout (default: 5)
  lockoutDurationMs?: number; // Lockout duration in ms (default: 60_000)
})
```

If `shell` is omitted, the server creates `new VirtualShell(hostname)` internally.

**Example:**

```typescript
const shell = new VirtualShell("my-lab", {
  kernel: "1.0.0+itsrealfortune+1-amd64",
  os: "Fortune GNU/Linux x64",
  arch: "x86_64",
});

const ssh = new VirtualSshServer({ port: 2222, hostname: "my-lab", shell });
```

#### Methods

| Method | Description |
|--------|-------------|
| `start(): Promise<number>` | Initialize VFS, users, start listening. Returns bound port. |
| `stop(): void` | Gracefully close server and all active connections. |
| `clearLockout(ip: string): void` | Manually lift a rate-limit lockout for an IP. |
| `getVfs(): VirtualFileSystem \| null` | Access VFS instance (null before start). |
| `getUsers(): VirtualUserManager \| null` | Access user manager (null before start). |
| `getHostname(): string` | Returns configured hostname. |

#### Events

| Event | Data | Description |
|-------|------|-------------|
| `start` | `{ port: number }` | Server started and listening |
| `stop` | — | Server stopped |
| `auth:success` | `{ username, remoteAddress, method? }` | User authenticated |
| `auth:failure` | `{ username, remoteAddress, reason?, method? }` | Auth failed |
| `auth:lockout` | `{ ip, until: Date }` | IP locked out after too many failures |
| `client:connect` | — | New SSH client connected |
| `client:disconnect` | `{ user: string }` | SSH client disconnected |

**Example:**

```typescript
ssh.on("auth:success", ({ username, remoteAddress }) => {
  console.log(`[SSH] ${username} authenticated from ${remoteAddress}`);
});

ssh.on("auth:lockout", ({ ip, until }) => {
  console.warn(`[SSH] ${ip} locked until ${until}`);
});
```

---

### `VirtualSftpServer`

SFTP server class. Can share a `VirtualShell` with `VirtualSshServer` (recommended) or accept explicit `vfs` + `users` dependencies.

#### Constructor

```typescript
new VirtualSftpServer({
  port: number;
  hostname?: string;
  shell?: VirtualShell;          // share state with SSH server
  vfs?: VirtualFileSystem;       // explicit if no shell
  users?: VirtualUserManager;    // explicit if no shell
})
```

#### Methods

| Method | Description |
|--------|-------------|
| `start(): Promise<number>` | Start SFTP server, returns bound port. |
| `stop(): void` | Stop SFTP server. |

#### Behavior Notes

- Supports `password` and `keyboard-interactive` authentication. Users without a password set are accepted on any attempt.
- Resolves relative SFTP paths from `/home/<user>`.
- Confines all SFTP operations to `/home/<user>` — blocks traversal attempts outside home.
- Unsupported operations (`READLINK`, `SYMLINK`) return `OP_UNSUPPORTED`.

#### Events

| Event | Data | Description |
|-------|------|-------------|
| `start` | `{ port: number }` | SFTP server started |
| `stop` | — | SFTP server stopped |
| `auth:success` | `{ username, remoteAddress }` | User authenticated |
| `auth:failure` | `{ username, remoteAddress }` | Auth failed |
| `client:connect` | — | New SFTP client connected |
| `client:disconnect` | `{ user: string }` | SFTP client disconnected |

---

### `VirtualShell`

Coordinates the virtual filesystem, user manager, and command runtime. Used by both SSH servers and the programmatic `SshClient`.

#### Constructor

```typescript
new VirtualShell(
  hostname: string,
  properties?: ShellProperties,
  vfsOptions?: VfsOptions,
)
```

- **hostname**: Injected into command context and prompt.
- **properties**: Optional shell metadata shown in `uname`-like output. Defaults to `defaultShellProperties`.
- **vfsOptions**: Optional VFS persistence options — see [VirtualFileSystem](#virtualfilesystem).

```typescript
interface ShellProperties {
  kernel: string;  // e.g. "1.0.0+itsrealfortune+1-amd64"
  os: string;      // e.g. "Fortune GNU/Linux x64"
  arch: string;    // e.g. "x86_64"
}
```

**Example:**

```typescript
const shell = new VirtualShell("typescript-vm", {
  kernel: "1.0.0+itsrealfortune+1-amd64",
  os: "Fortune GNU/Linux x64",
  arch: "x86_64",
}, {
  mode: "fs",
  snapshotPath: "./data",
});
```

#### Methods

| Method | Description |
|--------|-------------|
| `ensureInitialized(): Promise<void>` | Await this before using the shell programmatically. |
| `addCommand(name, params, callback)` | Register a custom shell command. |
| `executeCommand(rawInput, authUser, cwd)` | Run a raw command string. |
| `startInteractiveSession(stream, authUser, sessionId, remoteAddress, terminalSize)` | Start an SSH interactive session. |
| `writeFileAsUser(authUser, path, content)` | Write a file with quota enforcement. |
| `getVfs(): VirtualFileSystem \| null` | Access the VFS instance. |
| `getUsers(): VirtualUserManager \| null` | Access the user manager. |
| `getHostname(): string` | Returns the configured hostname. |

**Custom command example:**

```typescript
shell.addCommand("greet", ["[name]"], ({ args, authUser }) => {
  const name = args[0] ?? authUser;
  return { stdout: `Hello, ${name}!`, exitCode: 0 };
});
// Inside the shell: greet world → Hello, world!
```

#### Events

| Event | Data | Description |
|-------|------|-------------|
| `initialized` | — | Shell initialization complete |
| `command` | `{ command, user, cwd }` | A command was executed |
| `session:start` | `{ user, sessionId, remoteAddress }` | Interactive session started |

---

### `VirtualFileSystem`

Pure in-memory virtual filesystem. All state lives in a recursive `Map`-based tree — no host filesystem access at runtime.

Two persistence modes are available via the `VfsOptions` constructor argument:

```typescript
// Default — pure in-memory, zero disk I/O
const vfs = new VirtualFileSystem();
const vfs = new VirtualFileSystem({ mode: "memory" });

// FS mode — binary snapshot (.vfsb) auto-saved to disk on flushMirror()
const vfs = new VirtualFileSystem({
  mode: "fs",
  snapshotPath: "./data",  // writes ./data/vfs-snapshot.vfsb
});
await vfs.restoreMirror(); // load from disk (silent no-op if no file yet)
// ... use vfs ...
await vfs.flushMirror();   // persist to disk
```

Both modes expose exactly the same API. The tree always lives in memory; `"fs"` mode adds a binary round-trip on `restoreMirror` / `flushMirror`. See [VFSB Binary Format](#vfsb-binary-format) for details.

#### Constructor

```typescript
interface VfsOptions {
  mode?: "memory" | "fs";  // default: "memory"
  snapshotPath?: string;   // required when mode is "fs"
}

new VirtualFileSystem(options?: VfsOptions)
```

#### Methods

| Method | Description |
|--------|-------------|
| `mkdir(path, mode?)` | Create directory and any missing parents. |
| `writeFile(path, content, options?)` | Write file (creates parent dirs). `options.compress` stores as gzip; `options.mode` sets POSIX mode bits. |
| `readFile(path): string` | Read file as UTF-8. Transparently decompresses gzip files. |
| `readFileRaw(path): Buffer` | Read file as Buffer (decompresses if needed). |
| `exists(path): boolean` | Test whether a file or directory exists. |
| `stat(path): VfsNodeStats` | Returns file/directory metadata. |
| `list(path?): string[]` | List direct children of a directory (sorted). |
| `tree(path?): string` | Render ASCII directory tree. |
| `move(from, to)` | Move or rename a node. Throws if destination exists. |
| `remove(path, options?)` | Delete file or directory. `options.recursive` required for non-empty dirs. |
| `chmod(path, mode)` | Update POSIX mode bits. |
| `compressFile(path)` | Gzip-compress file content in place. |
| `decompressFile(path)` | Gunzip file content in place. |
| `symlink(target, linkPath)` | Create a symbolic link (mode `0o120777`). |
| `isSymlink(path): boolean` | Returns true if the path is a symlink node. |
| `resolveSymlink(path, maxDepth?): string` | Resolve symlink chain to real path (default max 8 hops). |
| `getUsageBytes(path?): number` | Total stored bytes under a path. |
| `getMode(): VfsPersistenceMode` | Returns `"memory"` or `"fs"`. |
| `getSnapshotPath(): string \| null` | Snapshot file path in `"fs"` mode, or null. |
| `toSnapshot(): VfsSnapshot` | Export the whole tree as a JSON-serialisable snapshot. |
| `importSnapshot(snapshot)` | Replace current state from a snapshot (preserves mode). |
| `restoreMirror(): Promise<void>` | Load from disk (`"fs"` mode) / no-op (`"memory"` mode). |
| `flushMirror(): Promise<void>` | Save to disk (`"fs"` mode) / emit `mirror:flush` (`"memory"` mode). |
| `VirtualFileSystem.fromSnapshot(snapshot)` | **Static.** Create a new memory-mode instance from a snapshot. |

#### Events

| Event | Data | Description |
|-------|------|-------------|
| `file:write` | `{ path, size }` | File written |
| `file:read` | `{ path, size }` | File read |
| `dir:create` | `{ path, mode }` | Directory created |
| `node:remove` | `{ path }` | File or directory deleted |
| `symlink:create` | `{ link, target }` | Symlink created |
| `snapshot:import` | — | `importSnapshot()` called |
| `snapshot:restore` | `{ path }` | Restored from disk (fs mode) |
| `mirror:flush` | `{ path? }` | Flushed (path present in fs mode) |

**Example:**

```typescript
vfs.on("file:write", ({ path, size }) => {
  console.log(`[VFS] Written: ${path} (${size} bytes)`);
});

vfs.on("dir:create", ({ path, mode }) => {
  console.log(`[VFS] Dir created: ${path} (mode: ${mode.toString(8)})`);
});
```

#### Memory mode — manual snapshot persistence

```typescript
import { VirtualFileSystem } from "typescript-virtual-container";
import { writeFileSync, readFileSync } from "node:fs";

const vfs = new VirtualFileSystem(); // mode: "memory"
vfs.writeFile("/etc/config.json", JSON.stringify({ debug: true }));

// Export to disk manually as JSON (portable, human-readable)
// For binary format, use "fs" mode instead — see VFSB Binary Format.
writeFileSync("vfs-snapshot.json", JSON.stringify(vfs.toSnapshot()));

// Restore into a new instance
const snapshot = JSON.parse(readFileSync("vfs-snapshot.json", "utf8"));
const restored = VirtualFileSystem.fromSnapshot(snapshot);
console.log(restored.readFile("/etc/config.json")); // {"debug":true}
```

#### FS mode — automatic persistence across restarts

```typescript
import { VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("my-vm", undefined, {
  mode: "fs",
  snapshotPath: "./vfs-data",
});

const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();
// VFS is restored from ./vfs-data/vfs-snapshot.vfsb on start (if it exists).
// flushMirror() is called after each write, persisting state to disk automatically.
```

---

## VFSB Binary Format

When `mode: "fs"` is configured, the VFS persists its state to disk as a compact binary file (`vfs-snapshot.vfsb`) rather than JSON. This is the default and only on-disk format for `"fs"` mode.

### Why not JSON?

The JSON+base64 approach has two compounding costs: file content is base64-encoded (33% size bloat), and the entire tree must be stringified and parsed on every save/load. For a 10 MB VFS, that means writing ~13.3 MB of base64 data wrapped in JSON — and parsing all of it as a string on restart.

The VFSB format eliminates both costs.

### Wire format

All multi-byte integers are little-endian. The file starts with a 5-byte header, followed by a single recursive node tree.

```
File header
  [4]  magic   = 0x56 0x46 0x53 0x21  ("VFS!")
  [1]  version = 0x01

Node (recursive)
  [1]  type    = 0x01 (file) | 0x02 (directory)
  [2]  name length  (uint16)
  [N]  name bytes   (UTF-8)
  [4]  mode         (uint32)
  [8]  createdAt ms (float64 big-endian)
  [8]  updatedAt ms (float64 big-endian)

File node extra
  [1]  compressed flag  (0x00 | 0x01)
  [4]  content length   (uint32)
  [N]  content bytes    (raw — no base64)

Directory node extra
  [4]  children count   (uint32)
  [N]  children nodes   (recursive)
```

### Performance

Measured on a VFS tree with ~50 nodes and mixed file content:

| Metric | JSON+base64 | VFSB binary |
|--------|-------------|-------------|
| File size (10 MB of content) | ~13.7 MB | ~10.0 MB |
| Encode time | ~12 ms | ~0.04 ms |
| Decode time | ~18 ms | ~0.07 ms |
| External dependencies | none | none |

Size reduction comes from eliminating base64 encoding (33% overhead on raw bytes) and JSON string wrapping. Speed improvement comes from sequential buffer reads/writes instead of string parsing.

### Backward compatibility

If a legacy JSON snapshot file is found at the configured `snapshotPath`, it is automatically detected by the absence of the `VFS!` magic bytes and parsed as JSON. A migration notice is logged to `console.info`. On the next `flushMirror()` call, the file is rewritten in VFSB format — no manual migration step needed.

```typescript
// This just works — auto-migrates any existing JSON snapshot on first flush
const vfs = new VirtualFileSystem({ mode: "fs", snapshotPath: "./data" });
await vfs.restoreMirror(); // reads JSON if .vfsb contains JSON, binary otherwise
await vfs.flushMirror();   // always writes VFSB binary
```

### Using the binary API directly

The encoder and decoder are exported from the VFS module internals for advanced use cases (e.g. replication, custom storage backends):

```typescript
import { encodeVfs, decodeVfs, isBinarySnapshot } from "typescript-virtual-container/src/VirtualFileSystem/binaryPack";

// Encode the current tree to a Buffer
const buf = encodeVfs(vfs.root);

// Detect format
isBinarySnapshot(buf);    // true  — starts with "VFS!" magic
isBinarySnapshot(jsonBuf); // false — JSON or other format

// Restore from a Buffer
const root = decodeVfs(buf);
```

These are low-level APIs. For normal usage, `flushMirror()` and `restoreMirror()` are all you need.


---

### `VirtualUserManager`

Manages virtual users, password hashing (scrypt), sudo privileges, per-user storage quotas, SSH public keys, and active session tracking.

#### Constructor

```typescript
new VirtualUserManager(
  vfs: VirtualFileSystem,
  autoSudoForNewUsers?: boolean,  // default: true
)
```

- Auth data is stored inside the VFS at protected paths under `/virtual-env-js/.auth/`.
- `autoSudoForNewUsers`: when true, newly created users are automatically added to sudoers.

#### Methods

| Method | Description |
|--------|-------------|
| `initialize(): Promise<void>` | Load users/sudoers from VFS, ensure root exists. Call once on startup. |
| `verifyPassword(username, password): boolean` | Check plaintext password against stored hash. |
| `hasPassword(username): boolean` | Returns true if a password is set for the user. |
| `hashPassword(password): string` | Hash a password using the configured algorithm. |
| `addUser(username, password): Promise<void>` | Create user with home directory. |
| `deleteUser(username): Promise<void>` | Delete user. Cannot delete root. |
| `setPassword(username, password): Promise<void>` | Update password for an existing user. |
| `isSudoer(username): boolean` | Check if user has sudo privileges. |
| `addSudoer(username): Promise<void>` | Grant sudo privileges. |
| `removeSudoer(username): Promise<void>` | Revoke sudo privileges. Cannot remove root. |
| `setQuotaBytes(username, maxBytes): Promise<void>` | Set per-user write quota (bytes under `/home/<user>`). |
| `clearQuota(username): Promise<void>` | Remove quota limit. |
| `getQuotaBytes(username): number \| null` | Returns quota in bytes, or null if unlimited. |
| `getUsageBytes(username): number` | Returns current usage in bytes under `/home/<user>`. |
| `assertWriteWithinQuota(username, path, content)` | Throws if the write would exceed the user's quota. |
| `addAuthorizedKey(username, algo, data)` | Register an SSH public key for the user. |
| `getAuthorizedKeys(username)` | Returns the list of authorized keys for a user. |
| `removeAuthorizedKeys(username)` | Revoke all authorized keys for a user. |
| `registerSession(username, remoteAddress): VirtualActiveSession` | Start session tracking, returns session descriptor. |
| `unregisterSession(sessionId): void` | End session. Safe to call with null. |
| `updateSession(sessionId, username, remoteAddress): void` | Update session metadata (used by `su`/`sudo`). |
| `listActiveSessions(): VirtualActiveSession[]` | Returns all active sessions sorted by start time. |

#### Events

| Event | Data | Description |
|-------|------|-------------|
| `initialized` | — | User manager ready, root account ensured |
| `user:add` | `{ username }` | New user created |
| `user:delete` | `{ username }` | User deleted |
| `key:add` | `{ username, algo }` | Public key added |
| `key:remove` | `{ username }` | Public keys removed |
| `session:register` | `{ sessionId, username, remoteAddress }` | Session started |
| `session:unregister` | `{ sessionId, username }` | Session ended |

**Example:**

```typescript
users.on("user:add", ({ username }) => {
  console.log(`[USERS] Created: ${username}`);
});

users.on("session:register", ({ sessionId, username, remoteAddress }) => {
  console.log(`[USERS] Session ${sessionId}: ${username} from ${remoteAddress}`);
});
```

---

### `HoneyPot`

Comprehensive security auditing and event tracking utility. Attaches listeners to all core components to log activity, track statistics, and detect anomalies.

#### Constructor

```typescript
new HoneyPot(maxLogSize?: number)  // default: 10000
```

#### Methods

| Method | Description |
|--------|-------------|
| `attach(shell, vfs, users, ssh?, sftp?)` | Subscribe to all event sources. |
| `getAuditLog(type?, source?): AuditLogEntry[]` | Full log, optionally filtered by event type and/or source component. |
| `getStats(): Readonly<HoneyPotStats>` | Aggregated activity counters. |
| `getRecent(limit?): AuditLogEntry[]` | Most recent entries in reverse chronological order. |
| `detectAnomalies()` | Analyze patterns — returns `{ type, severity, message }[]`. |
| `reset()` | Clear audit log and reset all stat counters. |
| `exportJson(): string` | Serialise full log + stats to a JSON string. |

#### HoneyPotStats fields

```typescript
interface HoneyPotStats {
  authAttempts: number;
  authSuccesses: number;
  authFailures: number;
  commands: number;
  fileWrites: number;
  fileReads: number;
  sessionStarts: number;
  sessionEnds: number;
  userCreated: number;
  userDeleted: number;
  clientConnects: number;
  clientDisconnects: number;
}
```

#### Audit Log Entry

```typescript
interface AuditLogEntry {
  timestamp: string;                // ISO-8601
  type: string;                     // e.g. "auth:failure", "file:write"
  source: string;                   // e.g. "SshMimic", "VirtualFileSystem"
  details: Record<string, unknown>; // event-specific payload
}
```

`detectAnomalies` detects: high authentication failure rates, excessive auth failures, unusual command volume, unusual file write volume.

#### Example

```typescript
import { HoneyPot, VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("honeypot");
const ssh   = new VirtualSshServer({ port: 2222, shell });
const hp    = new HoneyPot(50_000);

await ssh.start();
hp.attach(shell, shell.vfs, shell.users, ssh);

// Filter audit log
const failures = hp.getAuditLog("auth:failure");
failures.forEach(e => console.log(e.details.username, e.details.remoteAddress));

// Detect anomalies
hp.detectAnomalies().forEach(a =>
  console.log(`[${a.severity.toUpperCase()}] ${a.type}: ${a.message}`)
);

// Export on shutdown
process.on("SIGINT", () => {
  require("fs").writeFileSync("audit.json", hp.exportJson());
  process.exit(0);
});
```

---

### `SshClient` (Programmatic API)

Execute shell commands against a `VirtualShell` without SSH protocol overhead. Maintains working-directory state across calls.

#### Constructor

```typescript
new SshClient(shell: VirtualShell, username: string)
```

No password required — the client authenticates by username only.

#### Methods

| Method | Description |
|--------|-------------|
| `exec(command): Promise<CommandResult>` | Run arbitrary raw command string (supports `&&`, `\|`, etc.). |
| `ls(path?)` | List directory (default: cwd). |
| `pwd()` | Print current working directory. |
| `cd(path)` | Change directory. Updates internal cwd state on success. |
| `cat(path)` | Read file content via `cat` command. |
| `readFile(path)` | Read file directly from VFS (programmatic, no shell parse). |
| `writeFile(path, content)` | Write file directly to VFS (programmatic). |
| `mkdir(path, recursive?)` | Create directory. `recursive=true` adds `-p`. |
| `touch(path)` | Create empty file. |
| `rm(path, recursive?)` | Remove file or directory. `recursive=true` adds `-r`. |
| `tree(path?)` | Render ASCII directory tree. |
| `whoami()` | Print current user. |
| `hostname()` | Print server hostname. |
| `who()` | List active sessions. |
| `getCwd(): string` | Returns current working directory (local, no I/O). |
| `getUsername(): string` | Returns authenticated username. |

**Example:**

```typescript
const shell  = new VirtualShell("typescript-vm");
const client = new SshClient(shell, "alice");

await client.mkdir("/home/alice/projects", true);
await client.cd("/home/alice/projects");

console.log(client.getCwd());  // /home/alice/projects

await client.writeFile("notes.txt", "Work in progress");
const list = await client.ls();
console.log(list.stdout);  // notes.txt

const read = await client.readFile("notes.txt");
console.log(read.stdout);  // Work in progress

// Shell operators work in exec()
const r = await client.exec("echo hello && echo world");
console.log(r.stdout); // hello\nworld
```

---

### Key Types

#### `CommandResult`

Returned by all command executions (shell or programmatic).

```typescript
interface CommandResult {
  stdout?: string;
  stderr?: string;
  exitCode?: number;
  nextCwd?: string;
  clearScreen?: boolean;
  closeSession?: boolean;
  switchUser?: string;
  openEditor?: NanoEditorSession;
  openHtop?: boolean;
  sudoChallenge?: SudoChallenge;
}
```

#### `ShellEnv`

Per-session shell environment. Passed as `env` in `CommandContext`.

```typescript
interface ShellEnv {
  vars: Record<string, string>;  // $VAR accessible in expansions
  lastExitCode: number;          // $? value
}
```

Default variables initialized per session: `PATH`, `HOME`, `USER`, `LOGNAME`, `SHELL`, `TERM`, `HOSTNAME`, `PS1`.

#### `ShellModule`

Contract for custom command plugins:

```typescript
interface ShellModule {
  name: string;
  params: string[];
  aliases?: string[];
  description?: string;    // shown in grouped help
  category?: string;       // navigation|files|text|archive|system|network|shell|users|misc
  run: (ctx: CommandContext) => CommandResult | Promise<CommandResult>;
}

interface CommandContext {
  authUser: string;
  hostname: string;
  activeSessions: VirtualActiveSession[];
  rawInput: string;
  mode: "shell" | "exec";
  args: string[];
  stdin?: string;
  cwd: string;
  shell: VirtualShell;
  env: ShellEnv;           // per-session environment (read/write)
}
```

#### `VfsNodeStats`

```typescript
type VfsNodeStats = VfsFileNode | VfsDirectoryNode;

interface VfsFileNode {
  type: "file";
  name: string;
  path: string;
  mode: number;
  size: number;
  compressed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface VfsDirectoryNode {
  type: "directory";
  name: string;
  path: string;
  mode: number;
  childrenCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### `VirtualActiveSession`

```typescript
interface VirtualActiveSession {
  id: string;
  username: string;
  tty: string;
  remoteAddress: string;
  startedAt: string;  // ISO-8601
}
```

#### `VfsSnapshot`

```typescript
interface VfsSnapshot {
  root: VfsSnapshotDirectoryNode;
}
// File nodes store content as base64 in contentBase64.
```

---

## Usage Examples

### Example 1: Basic SSH Server

```typescript
import { VirtualSshServer } from "typescript-virtual-container";

const ssh = new VirtualSshServer({ port: 2222, hostname: "lab-environment" });
await ssh.start();
console.log("SSH server ready. Connect: ssh root@localhost -p 2222");

process.on("SIGINT", () => { ssh.stop(); process.exit(0); });
```

```bash
ssh root@localhost -p 2222
# $ whoami
# root
```

---

### Example 2: Programmatic File Operations

```typescript
import { SshClient, VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell  = new VirtualShell("typescript-vm");
const ssh    = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

const client = new SshClient(shell, "root");

await client.mkdir("/app/config", true);
await client.mkdir("/app/logs", true);

await client.writeFile("/app/config/settings.json", JSON.stringify({
  environment: "dev",
  port: 8080,
  debug: true,
}, null, 2));

const result = await client.readFile("/app/config/settings.json");
console.log("Config:", result.stdout);

const tree = await client.tree("/app");
console.log(tree.stdout);

ssh.stop();
```

---

### Example 3: Multi-User Environment with Quotas

```typescript
import { SshClient, VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("typescript-vm");
const ssh   = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

const users = ssh.getUsers()!;

await users.addUser("alice", "alice123");
await users.addUser("bob", "bob456");

await users.removeSudoer("bob");
await users.setQuotaBytes("bob", 5 * 1024 * 1024); // 5 MB

const alice = new SshClient(shell, "alice");
await alice.writeFile("/etc/important.conf", "secret=yes");

const bob = new SshClient(shell, "bob");
const result = await bob.cat("/etc/important.conf");
console.log("Bob read file:", result.stderr); // permission denied

ssh.stop();
```

---

### Example 4: Persistent State across Restarts

#### Memory mode (manual)

```typescript
import { VirtualFileSystem } from "typescript-virtual-container";
import { writeFileSync, readFileSync } from "node:fs";

const vfs = new VirtualFileSystem();
vfs.writeFile("/data/report.txt", "Baseline data");

// JSON — portable/human-readable. For binary persistence use mode: "fs".
writeFileSync("snapshot.json", JSON.stringify(vfs.toSnapshot()));

const snapshot = JSON.parse(readFileSync("snapshot.json", "utf8"));
const restored = VirtualFileSystem.fromSnapshot(snapshot);
console.log(restored.readFile("/data/report.txt")); // Baseline data
```

#### FS mode (automatic)

```typescript
import { VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("my-vm", undefined, {
  mode: "fs",
  snapshotPath: "./container-data",
});

const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();
process.on("SIGTERM", () => { ssh.stop(); process.exit(0); });
```

---

### Example 5: Public-Key Authentication

```typescript
import { VirtualShell, VirtualSshServer } from "typescript-virtual-container";
import { readFileSync } from "node:fs";

const shell = new VirtualShell("secure-vm");
await shell.ensureInitialized();

await shell.users.addUser("alice", "fallback-password");

const pubLine = readFileSync(`${process.env.HOME}/.ssh/id_ed25519.pub`, "utf8").trim();
const [algo, b64] = pubLine.split(" ");
shell.users.addAuthorizedKey("alice", algo, Buffer.from(b64, "base64"));

const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();
// ssh -i ~/.ssh/id_ed25519 alice@localhost -p 2222
```

---

### Example 6: Rate Limiting

```typescript
const ssh = new VirtualSshServer({
  port: 2222,
  maxAuthAttempts: 3,
  lockoutDurationMs: 300_000,
});

ssh.on("auth:lockout", ({ ip, until }) => {
  console.warn(`[SSH] ${ip} locked until ${until}`);
});

ssh.clearLockout("192.168.1.100"); // manual override
```

---

### Example 7: Shell Operators and Variables

```typescript
import { SshClient, VirtualShell } from "typescript-virtual-container";

const shell  = new VirtualShell("typescript-vm");
await shell.ensureInitialized();
const client = new SshClient(shell, "root");

// && and || operators
await client.exec("mkdir /tmp/test && echo created || echo failed");

// Chaining with ;
await client.exec("echo a; echo b; echo c");

// Variable expansion via export then use
await client.exec("export GREETING=hello");
await client.exec("echo $GREETING world");  // hello world

// $? last exit code
await client.exec("false; echo exit=$?");   // exit=1

// Piping
const r = await client.exec("echo -e 'banana\\napple\\ncherry' | sort");
console.log(r.stdout); // apple\nbanana\ncherry
```

---

### Example 8: .bashrc

```typescript
import { VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("typescript-vm");
await shell.ensureInitialized();

// Write a .bashrc for the root user
shell.vfs.mkdir("/home/root", 0o755);
shell.vfs.writeFile("/home/root/.bashrc", `
export PS1="\\u@\\h:\\w\\$ "
export EDITOR=nano
export PATH="/usr/local/bin:/usr/bin:/bin"
alias ll="ls -l"
echo "Welcome back, root!"
`.trim());

const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();
// On interactive login, .bashrc is sourced automatically.
// "Welcome back, root!" is printed, and $EDITOR is set in the session.
```

---

### Example 9: Shell Scripting

```typescript
import { SshClient, VirtualShell } from "typescript-virtual-container";

const shell  = new VirtualShell("typescript-vm");
await shell.ensureInitialized();
const client = new SshClient(shell, "root");

// Write a script to VFS
shell.vfs.writeFile("/usr/local/bin/setup.sh", `
#!/bin/sh
for dir in config logs tmp; do
  mkdir /app/$dir
  echo "Created /app/$dir"
done
if [ -d /app/config ]; then
  echo "Setup complete"
else
  echo "Setup failed"
fi
`);

// Execute it
const r = await client.exec("sh /usr/local/bin/setup.sh");
console.log(r.stdout);
// Created /app/config
// Created /app/logs
// Created /app/tmp
// Setup complete
```

---

### Example 10: Snapshot-Based Test Fixtures

```typescript
import { VirtualFileSystem } from "typescript-virtual-container";
import type { VfsSnapshot } from "typescript-virtual-container";

function buildFixture(): VfsSnapshot {
  const vfs = new VirtualFileSystem();
  vfs.mkdir("/app/config");
  vfs.writeFile("/app/config/settings.json", JSON.stringify({ env: "test" }));
  vfs.writeFile("/app/README.md", "# My App");
  return vfs.toSnapshot();
}

const FIXTURE = buildFixture();

test("reads config file", () => {
  const vfs = VirtualFileSystem.fromSnapshot(FIXTURE);
  const content = JSON.parse(vfs.readFile("/app/config/settings.json"));
  expect(content.env).toBe("test");
});
```

---

### Example 11: Symlinks

```typescript
const vfs = new VirtualFileSystem();
vfs.mkdir("/usr/local/bin");
vfs.writeFile("/opt/myapp/bin/app", "#!/bin/sh\necho hello");
vfs.symlink("/opt/myapp/bin/app", "/usr/local/bin/app");

console.log(vfs.isSymlink("/usr/local/bin/app"));     // true
console.log(vfs.resolveSymlink("/usr/local/bin/app")); // /opt/myapp/bin/app
```

---

### Example 12: Security Auditing with HoneyPot

```typescript
import { HoneyPot, SshClient, VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("typescript-vm");
const ssh   = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

const hp = new HoneyPot(5000);
hp.attach(shell, shell.vfs, shell.users, ssh);

const alice = new SshClient(shell, "alice");
await alice.mkdir("/home/alice/projects", true);
await alice.writeFile("/home/alice/projects/app.txt", "My application");

const stats = hp.getStats();
console.log(`Commands run: ${stats.commands}`);
console.log(`File writes:  ${stats.fileWrites}`);

hp.detectAnomalies().forEach(a =>
  console.log(`[${a.severity.toUpperCase()}] ${a.type}: ${a.message}`)
);

const authFailures = hp.getAuditLog("auth:failure");
const sshEvents    = hp.getAuditLog(undefined, "SshMimic");
console.log(`Auth failures: ${authFailures.length}`);
console.log(`SSH events:    ${sshEvents.length}`);

ssh.stop();
```

---

### Example 13: Error Handling

```typescript
const client = new SshClient(shell, "root");

const r1 = await client.readFile("/etc/nonexistent.conf");
if (r1.exitCode !== 0) console.error("Read error:", r1.stderr);

const r2 = await client.cd("/invalid/path");
if (r2.exitCode !== 0) console.error("cd failed");

const r3 = await client.rm("/", true);
console.log("Remove root:", r3.stderr); // Cannot remove root directory.
```

---

### Example 14: Concurrent Clients

```typescript
const shell   = new VirtualShell("typescript-vm");
const client1 = new SshClient(shell, "alice");
const client2 = new SshClient(shell, "bob");

const [r1, r2] = await Promise.all([
  client1.writeFile("/tmp/alice.txt", "Alice's data"),
  client2.writeFile("/tmp/bob.txt",   "Bob's data"),
]);
```

---

## Built-in Commands

All commands are available in SSH shell mode and via `SshClient.exec()`. Type `help` in the shell for a grouped, colorized listing. Type `help <command>` for detailed usage.

### Navigation

| Command | Flags | Description |
|---------|-------|-------------|
| `cd <path>` | | Change directory |
| `ls [path]` | `-l` | List directory contents |
| `pwd` | | Print working directory |
| `tree [path]` | | ASCII directory tree |

### Files & Filesystem

| Command | Flags | Description |
|---------|-------|-------------|
| `cat <path>` | | Print file contents |
| `chmod <mode> <file>` | | Change file permissions (octal) |
| `cp <src> <dest>` | `-r` | Copy file or directory |
| `find [path]` | `-name <pat>` `-type f\|d` | Search for files |
| `ln <target> <link>` | `-s` | Create hard or symbolic link |
| `mkdir <path>` | `-p` | Create directory |
| `mv <src> <dest>` | | Move or rename |
| `rm <path>` | `-r` | Remove file or directory |
| `touch <path>` | | Create or update file |

### Text Processing

| Command | Flags | Description |
|---------|-------|-------------|
| `awk [-F <sep>] '<prog>'` | | Pattern scanning (print $N) |
| `cut` | `-d <sep>` `-f <cols>` | Remove sections from lines |
| `diff <f1> <f2>` | | Compare files line by line |
| `grep <pattern> [files]` | `-i` `-v` `-n` `-r` | Search file content |
| `head [files]` | `-n <N>` | First N lines (default 10) |
| `sed -e 's/pat/rep/[g]'` | `-i` | Stream editor |
| `sort [files]` | `-r` `-n` `-u` | Sort lines |
| `tail [files]` | `-n <N>` | Last N lines (default 10) |
| `tee [files]` | `-a` | Read stdin, write to stdout and files |
| `tr <set1> [set2]` | `-d` | Translate or delete characters |
| `uniq` | `-c` `-d` `-u` | Filter repeated lines |
| `wc [files]` | `-l` `-w` `-c` | Word/line/byte count |
| `xargs [cmd]` | | Build and execute commands from stdin |

### Archive & Compression

| Command | Flags | Description |
|---------|-------|-------------|
| `base64` | `-d` | Encode/decode base64 |
| `gzip <file>` | | Compress file |
| `gunzip <file>` | | Decompress file |
| `tar <archive> [files]` | `-czf` `-xzf` `-tf` | Archive utility |

### System

| Command | Flags | Description |
|---------|-------|-------------|
| `date` | `+format` | Print current date and time |
| `df` | `-h` | Filesystem disk space usage |
| `du [path]` | `-h` `-s` | Estimate file space usage |
| `groups [user]` | | Print group memberships |
| `hostname` | | Print hostname |
| `htop` | | System monitor (mock) |
| `id [user]` | | Print user identity (uid/gid/groups) |
| `kill [-9] <pid>` | | Send signal to process (mock) |
| `neofetch` | | System info display (mock) |
| `ping [-c <n>] <host>` | | Send ICMP ECHO_REQUEST (mock) |
| `ps` | `-a` `-u` `-x` | Report process status |
| `sleep <seconds>` | | Delay execution |
| `uname` | `-a` `-r` `-m` | Print system information |
| `who` | | List active sessions |
| `whoami` | | Print current user |

### Network

| Command | Flags | Description |
|---------|-------|-------------|
| `curl <url>` | | HTTP client (delegates to host binary) |
| `wget <url>` | | File downloader (delegates to host binary) |

### Shell

| Command | Flags | Description |
|---------|-------|-------------|
| `clear` | | Clear terminal screen (full ANSI reset) |
| `echo <text>` | | Display text |
| `env` | | Print session environment variables |
| `exit [code]` | | Exit session |
| `export NAME=VALUE` | | Set shell variable in current session |
| `help [command]` | | List commands (grouped) or show command details |
| `set [VAR=val]` | | Display or set shell variables |
| `sh` | `-c <script>` `[file]` | Execute shell script (supports if/for/while) |
| `unset <VAR>` | | Remove shell variable |

### Users & Permissions

| Command | Flags | Description |
|---------|-------|-------------|
| `adduser <name> <pass>` | | Create user (root only) |
| `deluser <name>` | | Delete user (root only) |
| `nano <path>` | | Interactive text editor |
| `passwd [user]` | | Change password |
| `su [user]` | | Switch user |
| `sudo <cmd>` | `-i` | Run as root |

Custom commands can be added via `shell.addCommand()`.

---

## Shell Scripting

The shell interpreter supports a subset of POSIX sh syntax, usable both interactively and via `sh -c '...'` or `sh <file>`.

### Logical Operators

```bash
mkdir /app && echo "created"       # run second only if first succeeds
rm /missing || echo "not found"    # run second only if first fails
echo a; echo b; echo c             # always run all three
```

### Pipes and Redirections

```bash
cat /etc/hosts | grep local
ls /home | sort | head -5
echo "hello world" > /tmp/out.txt
cat /tmp/out.txt >> /tmp/log.txt
```

### Variable Expansion

```bash
export NAME=world
echo "Hello $NAME"           # Hello world
echo "${NAME:-fallback}"     # world (or fallback if unset)
echo "${UNSET:-default}"     # default
echo "Exit: $?"              # last exit code
```

### Conditionals

```bash
if [ -f /etc/config ]; then
  echo "config exists"
elif [ -d /etc ]; then
  echo "etc is a directory"
else
  echo "nothing found"
fi

# String comparison
if [ "$USER" = "root" ]; then echo "root"; fi

# Numeric comparison
if [ $COUNT -gt 10 ]; then echo "large"; fi
```

### Loops

```bash
# for loop
for name in alice bob charlie; do
  echo "Hello $name"
done

# while loop
COUNT=0
while [ $COUNT -lt 3 ]; do
  echo "Count: $COUNT"
  export COUNT=$((COUNT + 1))
done
```

### Script Files

Write a script to the VFS and execute it:

```bash
# Via SSH shell:
nano /usr/local/bin/deploy.sh
# ... write the script ...
sh /usr/local/bin/deploy.sh

# Via programmatic client:
await client.writeFile("/usr/local/bin/setup.sh", `
for dir in config logs tmp; do
  mkdir /app/$dir
done
`);
await client.exec("sh /usr/local/bin/setup.sh");
```

### .bashrc

On every interactive SSH login, `/home/<user>/.bashrc` is sourced automatically. Use it to set environment variables, aliases (via `sh -c`), or print a welcome message.

```bash
# /home/alice/.bashrc
export EDITOR=nano
export PATH="/usr/local/bin:/usr/bin:/bin"
echo "Welcome, Alice!"
```

---

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SSH_MIMIC_FAST_PASSWORD_HASH` | `""` | Use SHA-256 instead of scrypt (faster, less secure — dev only). Set to `1` or `true`. |
| `SSH_MIMIC_AUTO_SUDO_NEW_USERS` | `"true"` | Auto-grant sudo to new users. Set to `0`, `false`, `no`, or `off` to disable. |
| `DEV_MODE` | `""` | Enable performance logging. |
| `RENDER_PERF` | `""` | Enable render performance logging. |

**Example:**

```bash
export SSH_MIMIC_FAST_PASSWORD_HASH=1
export SSH_MIMIC_AUTO_SUDO_NEW_USERS=false
node server.js
```

### Runtime Options Summary

```typescript
// VirtualShell
new VirtualShell(
  hostname,
  properties?,          // kernel, os, arch strings
  vfsOptions?,          // { mode: "memory"|"fs", snapshotPath?: string }
)

// VirtualSshServer
new VirtualSshServer({
  port,
  hostname?,
  shell?,
  maxAuthAttempts?,     // default: 5
  lockoutDurationMs?,   // default: 60_000
})

// VirtualSftpServer
new VirtualSftpServer({
  port,
  hostname?,
  shell?,               // or: vfs + users separately
})
```

---

## Performance & Scalability

### Benchmarking

Use the built-in benchmark script:

```bash
bun ./benchmark-virtualshell.ts
```

The benchmark reports:
- Shell initialization time by concurrency level
- Command execution time across active shells
- RSS memory growth during the run

Recent baselines show strong startup behavior up to 100 concurrent shells. The runtime is designed to scale easily to **1000+ parallel environments** for testing and automation workloads.

### Concurrency

- SSH server is event-driven and handles multiple concurrent connections.
- `SshClient` is sequential per instance — create multiple instances for parallel operations.
- Each `VirtualShell` instance is fully independent (separate VFS, users, env state).

### Performance Tips

- Use `SSH_MIMIC_FAST_PASSWORD_HASH=1` in test environments to skip scrypt overhead.
- Reuse long-lived shell instances for low-latency command bursts.
- Keep `DEV_MODE=1` enabled only during development (adds logging overhead).

**Parallel clients example:**

```typescript
const shell   = new VirtualShell("typescript-vm");
const client1 = new SshClient(shell, "alice");
const client2 = new SshClient(shell, "bob");

const [r1, r2] = await Promise.all([
  client1.writeFile("/tmp/alice.txt", "..."),
  client2.writeFile("/tmp/bob.txt",   "..."),
]);
```

---

## Types & TypeScript

Full TypeScript support with exported types:

```typescript
import type {
  // Persistence
  VfsOptions,
  VfsPersistenceMode,
  // Filesystem
  VfsSnapshot,
  VfsNodeStats,
  VfsFileNode,
  VfsDirectoryNode,
  WriteFileOptions,
  RemoveOptions,
  // Commands
  CommandContext,
  CommandResult,
  CommandMode,
  CommandOutcome,
  ShellModule,
  ShellEnv,
  SudoChallenge,
  NanoEditorSession,
  // Audit
  AuditLogEntry,
  HoneyPotStats,
  // Streams
  ShellStream,
  ExecStream,
} from "typescript-virtual-container";
```

---

## FAQ

**Is this a real container runtime?**
No. It emulates SSH sessions, users, and filesystem behavior in a virtual runtime. Ideal for testing, simulations, and automation where full OS isolation is not required.

**Can I use this in production?**
You can use it in production-like automation contexts (sandboxed command runners, test harnesses, training environments, honeypots). It is not a security boundary like a real container/VM.

**Does the VFS touch the host filesystem?**
In the default `"memory"` mode: no, all data lives in memory. In `"fs"` mode, it reads/writes a single binary file (`vfs-snapshot.vfsb`) inside the configured `snapshotPath` directory. No other host paths are accessed. See [VFSB Binary Format](#vfsb-binary-format).

**Does data persist between restarts?**
Only if you explicitly use `"fs"` mode or call `toSnapshot()` / `fromSnapshot()` manually. Memory mode is ephemeral. In `"fs"` mode, the snapshot is stored as a binary `.vfsb` file — see [VFSB Binary Format](#vfsb-binary-format).

**Can I run multiple isolated shells?**
Yes. Each `new VirtualShell(...)` creates a completely independent VFS, user manager, and shell environment.

**Are custom commands shared between shell instances?**
No. Custom commands registered with `shell.addCommand()` are instance-local.

**Does the shell support `&&`, `||`, and `;`?**
Yes. The shell parser handles logical operators, pipes, and redirections. `if`/`elif`/`else`/`fi`, `for`/`do`/`done`, and `while`/`do`/`done` are supported in scripts.

**Does `.bashrc` work?**
Yes. When an interactive SSH session starts, `/home/<user>/.bashrc` is loaded automatically and each non-comment line is executed in the session environment.

**Is networking fully implemented for curl/wget?**
`curl` and `wget` delegate to the host binaries. They are intended for realistic workflows, not full GNU tooling parity.

**Can I create custom commands?**
Yes — use `shell.addCommand()` or implement the `ShellModule` interface directly. Set `description` and `category` to appear in the grouped `help` output.

**Is SFTP fully supported?**
Core SFTP operations (open, read, write, stat, mkdir, remove, rename) are implemented. Some optional operations (extended attributes, symlinks) return `OP_UNSUPPORTED`.

**Can I use this for honeypot deployments?**
Yes — that is one of its primary use-cases. Use `HoneyPot.attach()` to capture all activity, configure `maxAuthAttempts` to throttle scanners, and export audit logs on shutdown.

---

## Troubleshooting

**`Error: listen EADDRINUSE :::2222`**
The port is already in use. Use a different port or stop the existing process.

**SSH authentication always fails**
Check the password (root has no password by default). If you set a password, verify it with `users.verifyPassword(username, password)`. Check if the IP is rate-limited: call `ssh.clearLockout(ip)`.

**Auth always fails with "lockout"**
Call `ssh.clearLockout(ip)` or increase `maxAuthAttempts`. In tests, use `maxAuthAttempts: Infinity`.

**`Error: Too many levels of symbolic links`**
A symlink chain exceeds 8 hops. Check for circular links or pass a larger `maxDepth` to `resolveSymlink()`.

**`Command 'xyz' not found` (exit code 127)**
The command is not registered. Register it with `shell.addCommand()`.

**Shell scripting — `if` block not working**
Ensure each keyword is on its own line or separated by `;`. The interpreter does not support complex one-liners like `if condition; then cmd; fi` as a single string passed to `sh -c` — split by line or use semicolons.

**File not found errors**
Create the parent directory first with `vfs.mkdir(path, 0o755)`.

**`snapshotPath` is required error**
You set `mode: "fs"` without providing `snapshotPath`: `new VirtualFileSystem({ mode: "fs", snapshotPath: "./data" })`.

**Variables not persisting between `exec()` calls**
Each `SshClient.exec()` call shares the same `ShellEnv` object per shell instance. Variables set via `export` in one exec call are visible in the next. If you need full isolation, create a new `SshClient` instance.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make changes and add tests.
4. Format and lint: `bun format && bun check`
5. Push and open a PR.

**Code quality standards:**
- Biome formatting (opinionated, enforced by CI)
- Full TypeScript — no `any`
- JSDoc comments on all public API surface
- Async/await throughout — no callbacks
- Tests for new commands and VFS behavior
- New commands must include `description` and `category` fields for `help`

---

## Security

- Passwords are hashed with `scrypt` by default (N=32768, r=8, p=1), with a random per-user salt.
- Root account always exists and cannot be deleted.
- Sudo privileges are explicit and stored in the VFS under `/virtual-env-js/.auth/sudoers`.
- Per-IP rate limiting prevents automated brute-force attacks on the SSH server.
- This project does **not** provide kernel-level or process-level isolation.
- Do **not** expose a running instance to the public internet without understanding the risks.

If you discover a vulnerability, avoid public disclosure in GitHub Issues. Contact maintainers privately first — see `SECURITY.md`.

---

## Support

- Open an issue for bugs, regressions, or feature requests.
- Include your Node.js/Bun version, package version, and a minimal reproduction.
- For API questions, include the exact call sequence plus expected vs. actual behavior.

---

## License

MIT — see [LICENSE](./LICENSE).

---

## Roadmap

- [x] Custom command plugin API
- [x] Optional per-user storage quotas
- [x] Improved shell compatibility (pipelines, redirections)
- [x] Pure in-memory VFS with snapshot import/export
- [x] Symlinks (`ln -s`, `isSymlink`, `resolveSymlink`)
- [x] SSH public-key authentication
- [x] Per-IP rate limiting and lockout
- [x] Shell operators: `&&` / `||` / `;`
- [x] Shell scripting: `if`/`elif`/`else`/`fi`, `for`/`do`/`done`, `while`/`do`/`done`
- [x] Variable expansion: `$VAR`, `${VAR:-default}`, `$?`
- [x] Per-session `ShellEnv` (no more global variable store)
- [x] `.bashrc` auto-sourced on interactive login
- [x] `clear` with full ANSI screen reset (`\x1b[2J\x1b[H\x1b[3J`)
- [x] `Ctrl+W` delete word in interactive shell
- [x] Grouped, colorized `help` with per-command detail
- [x] New commands: `sort`, `uniq`, `tee`, `cut`, `tr`, `xargs`, `diff`, `sed`, `awk`, `tar`, `gzip`, `gunzip`, `base64`, `date`, `sleep`, `id`, `groups`, `uname`, `ps`, `kill`, `df`, `du`, `ping`
- [x] Structured event hooks (session open/close, file write, sudo challenge)
- [x] Binary snapshot format (VFSB) — replaces JSON+base64, ~27% smaller, no string parsing overhead, backward-compatible JSON migration
- [ ] Snapshot diff tooling for test assertions
- [ ] WebSocket-based remote shell client (experimental)
- [ ] `$(cmd)` command substitution in variable expansion

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
