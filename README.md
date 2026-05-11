# `typescript-virtual-container`

> Pure in-memory SSH/SFTP server with a realistic Linux rootfs, a virtual package manager, a real shell interpreter, and a typed programmatic API for testing, automation, honeypots, and interactive shell scripting in TypeScript/JavaScript.

[![npm version](https://badge.fury.io/js/typescript-virtual-container.svg)](https://www.npmjs.com/package/typescript-virtual-container)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Runtime](https://img.shields.io/badge/runtime-Node.js%20%7C%20Bun-43853D.svg)](https://nodejs.org/)

## Table of Contents

- [Overview](#overview)
- [What This Is / What This Is Not](#what-this-is--what-this-is-not)
- [Why This Package](#why-this-package)
- [Installation](#installation)
- [Browser Build (web.min.js)](#browser-build-webminjs)
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
  - [VirtualPackageManager](#virtualpackagemanager)
  - [HoneyPot](#honeypot)
  - [SshClient](#sshclient-programmatic-api)
  - [Key Types](#key-types)
- [Usage Examples](#usage-examples)
- [Linux Rootfs](#linux-rootfs)
- [Package Manager (apt/dpkg)](#package-manager-aptdpkg)
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
- **Linux rootfs on boot**: Realistic `/etc`, `/proc`, `/sys`, `/dev`, `/usr`, `/var` hierarchy populated at startup — `os-release`, `passwd`, `hosts`, `resolv.conf`, `/proc/meminfo`, `/proc/cpuinfo`, and more.
- **Virtual package manager**: `apt install`, `apt remove`, `apt search`, `dpkg -l`, `dpkg -s` — 25 packages in the built-in registry (vim, git, nodejs, python3, curl, openssh, gcc…). Writes files into VFS, tracks state in `/var/lib/dpkg/status`.
- **87 Built-in Commands**: Full navigation, text processing, archiving, system info, package management, and user management commands — grouped and documented in the interactive `help` system.
- **`$(cmd)` command substitution**: Nested command execution in any argument position.
- **Alias support**: `alias`, `unalias` — persisted in session environment.
- **Full TypeScript Support**: Complete JSDoc coverage, exported types, and first-class async/await for all operations.

---

## What This Is / What This Is Not

### What This Is

- A virtual shell runtime written in TypeScript with a **pure in-memory filesystem**.
- A virtual environment with its own filesystem, user management, and a real shell interpreter.
- A practical tool for deterministic testing, automation pipelines, and SSH-like workflows without running real containers.
- A honeypot framework for capturing and auditing attacker behavior.

TL;DR: this is a shell emulator and virtual environment for developer workflows, not a security sandbox or container runtime.

### What This Is Not

- Not a fully isolated container runtime.
- Not a kernel-level isolation boundary (unlike Docker/VM-based isolation).
- Package stubs (e.g. `node`, `python3`) write files into the VFS and are visible to `which`/`dpkg -L`, but do not execute real binaries — the shell is pure TypeScript with no `execvp`.

This project emulates shell behavior for developer workflows. `curl` and `wget` use the native `fetch()` API (no host binary). All other network and execution primitives are simulated. It is designed for realism and deployability, not kernel-level security isolation.

TL;DR: this is not a secure sandbox for running untrusted code. Do not expose it to untrusted users or the public internet without additional isolation layers.

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
curl -s https://raw.githubusercontent.com/itsrealfortune/typescript-virtual-container/refs/heads/main/builds/standalone.js -o standalone.js && node standalone.js && rm -f standalone.js
```

---

## Browser Build (web.min.js)

The package includes a browser-only runtime entrypoint in `src/web.ts`.
It runs the shell fully in-browser and persists the virtual filesystem in IndexedDB.

Build the minified browser bundle:

```bash
bun run web-build
```

This generates:

- `builds/web.min.js`
- `builds/web.min.js.map`

Use it from a browser module script:

```html
<script type="module">
  import { createWebShell } from "./builds/web.min.js";

  const shell = createWebShell("web-vm", {
    indexedDbName: "virtual-env-js",
    storeName: "vfs",
  });

  const out = await shell.executeCommandLine("pwd && mkdir -p /tmp/demo && cd /tmp/demo && echo hello > file.txt && ls -la");
  console.log(out.stdout);
</script>
```

Notes:

- This build is browser-targeted and does not include SSH/SFTP networking servers.
- State is mirrored to IndexedDB via the VFS mirror implementation.
- If you need SSH/SFTP, use the Node standalone builds instead (`standalone.js` or `standalone-wo-sftp.js`).

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
  kernel: string;  // Kernel version string — shown by uname, neofetch, /proc/version
  os: string;      // Full OS description — shown by neofetch, /etc/os-release, lsb_release
  arch: string;    // CPU architecture label — shown by uname -m, neofetch
}
```

Fields map directly to the values reported by `uname -a`, `neofetch`, `lsb_release`, `/etc/os-release`, and `/proc/version` inside the shell. Changing them after construction has no effect — pass them to the constructor.

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
| `executeCommand(rawInput, authUser, cwd)` | Run a raw command string (supports `&&`, `\|`, `$(cmd)`, aliases). |
| `startInteractiveSession(stream, authUser, sessionId, remoteAddress, terminalSize)` | Attach an interactive PTY session to this shell. |
| `writeFileAsUser(authUser, path, content)` | Write a file on behalf of a user with quota enforcement. |
| `refreshProcFs(): void` | Refresh `/proc/uptime`, `/proc/meminfo`, `/proc/cpuinfo`, etc. from live host data. |
| `syncPasswd(): void` | Sync `/etc/passwd`, `/etc/group`, `/etc/shadow` from `VirtualUserManager` state. |
| `getVfs(): VirtualFileSystem \| null` | Access the VFS instance. |
| `getUsers(): VirtualUserManager \| null` | Access the user manager. |
| `getHostname(): string` | Returns the configured hostname. |

#### Public fields

| Field | Type | Description |
|-------|------|-------------|
| `vfs` | `VirtualFileSystem` | Backing virtual filesystem — use for direct path operations. |
| `users` | `VirtualUserManager` | Virtual user database — auth, quotas, and session tracking. |
| `packageManager` | `VirtualPackageManager` | APT/dpkg package manager backed by the built-in registry. |
| `hostname` | `string` | Hostname shown in the shell prompt and SSH ident string. |
| `properties` | `ShellProperties` | Distro identity strings surfaced by `uname`, `neofetch`, etc. |
| `startTime` | `number` | Unix ms timestamp of shell creation — used by `uptime` and `/proc/uptime`. |

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
| `hasPassword(username): boolean` | Returns `true` if a non-empty password is set for the user. |
| `hashPassword(password): string` | Hash a password using scrypt (or SHA-256 with `SSH_MIMIC_FAST_PASSWORD_HASH=1`). |
| `getPasswordHash(username): string \| null` | Returns the raw stored hash for a user, or `null` if not found. |
| `addUser(username, password): Promise<void>` | Create user with home directory. |
| `deleteUser(username): Promise<void>` | Delete user. Throws when user is `root` or does not exist. |
| `setPassword(username, password): Promise<void>` | Update password for an existing user. Throws when user does not exist. |
| `isSudoer(username): boolean` | Returns `true` when the user has sudo privileges. |
| `addSudoer(username): Promise<void>` | Grant sudo privileges. Throws when user does not exist. |
| `removeSudoer(username): Promise<void>` | Revoke sudo privileges. Throws when username is `root`. |
| `setQuotaBytes(username, maxBytes): Promise<void>` | Set per-user write quota (bytes under `/home/<user>`). |
| `clearQuota(username): Promise<void>` | Remove quota limit for a user. |
| `getQuotaBytes(username): number \| null` | Returns quota in bytes, or `null` if unlimited. |
| `getUsageBytes(username): number` | Returns current usage in bytes under `/home/<user>`. |
| `assertWriteWithinQuota(username, path, content)` | Throws if the write would exceed the user's quota. |
| `listUsers(): string[]` | Returns a sorted list of all registered usernames. |
| `addAuthorizedKey(username, algo, data)` | Register an SSH public key for the user. |
| `getAuthorizedKeys(username)` | Returns the list of authorized keys for a user. |
| `removeAuthorizedKeys(username)` | Revoke all authorized keys for a user. |
| `registerSession(username, remoteAddress): VirtualActiveSession` | Register an active session and allocate a virtual TTY. |
| `unregisterSession(sessionId): void` | Remove a session record on disconnect. Safe to call with `null`. |
| `updateSession(sessionId, username, remoteAddress): void` | Update session metadata after `su`/`sudo` identity change. |
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


### `VirtualPackageManager`

Simulates APT/dpkg package management backed by a built-in registry. Accessed via `shell.packageManager`.

#### Constructor

Instantiated automatically by `VirtualShell`. Not constructed directly.

#### Methods

| Method | Description |
|--------|-------------|
| `load()` | Load installed packages from `/var/lib/dpkg/status` (called on shell init) |
| `install(names, opts?)` | Install packages (resolves deps, writes files to VFS). Returns `{ output, exitCode }` |
| `remove(names, opts?)` | Remove packages. `opts.purge` also removes config files |
| `search(term)` | Search available packages by name or description |
| `show(name)` | Show dpkg-style metadata block for a package |
| `listInstalled()` | List all installed packages as `InstalledPackage[]` |
| `listAvailable()` | List all packages in the registry |
| `isInstalled(name)` | Returns `true` if package is installed |
| `installedCount()` | Count of installed packages (used by `neofetch`) |
| `findInRegistry(name)` | Look up a `PackageDefinition` by name |

#### Types

```ts
interface PackageDefinition {
  name: string;
  version: string;
  description: string;
  files?: PackageFile[];          // written to VFS on install
  depends?: string[];             // resolved recursively
  onInstall?: (vfs, users) => void;
  onRemove?: (vfs) => void;
}

interface InstalledPackage {
  name: string;
  version: string;
  architecture: string;
  installedAt: string;            // ISO-8601
  files: string[];                // paths written to VFS
}
```

---

### Snapshot Diff Tooling

Three utility functions for comparing VFS snapshots in tests and deployment verification.

```typescript
import {
  diffSnapshots,
  formatDiff,
  assertDiff,
} from "typescript-virtual-container";
```

#### `diffSnapshots(before, after, options?): VfsDiff`

Compares two snapshots and returns structured diff results.

```ts
const before = shell.vfs.toSnapshot();
await client.exec("apt install vim && mkdir -p /app");
const after = shell.vfs.toSnapshot();

const diff = diffSnapshots(before, after, {
  ignore: ["/proc", "/var/log"],  // skip volatile paths
});

diff.clean;       // false
diff.added;       // [{ path: "/usr/bin/vim", type: "file" }, ...]
diff.removed;     // []
diff.modified;    // [{ path: "/var/lib/dpkg/status", before: "...", after: "..." }]
```

#### `formatDiff(diff, options?): string`

Human-readable output similar to `git diff --stat`.

```ts
console.log(formatDiff(diff));
// + /app  [directory]
// + /usr/bin/vim  [file]
// ~ /var/lib/dpkg/status  [modified]
//
// 2 added, 1 modified

console.log(formatDiff(diff, { showContent: true, maxContentChars: 80 }));
```

#### `assertDiff(diff, expected): void`

Throws on mismatch — designed for test suites.

```ts
assertDiff(diff, {
  added:    ["/app", "/usr/bin/vim"],
  modified: ["/var/lib/dpkg/status"],
});
// throws if any expected path is not in the diff
```

#### Types

```ts
interface VfsDiff {
  added:    VfsDiffEntry[];      // { path, type }
  removed:  VfsDiffEntry[];      // { path, type }
  modified: VfsDiffModified[];   // { path, type, before, after }
  clean:    boolean;
}
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

### Command Helpers

Three utility functions are exported from `typescript-virtual-container` to assist with argument parsing inside custom command handlers.

#### `ifFlag(args, flags): boolean`

Returns `true` when any of the given flags appear in the argument array. Matches both standalone tokens (`-s`, `--silent`) and inline forms (`--output=file`).

```typescript
import { ifFlag } from "typescript-virtual-container";

const recursive = ifFlag(args, ["-r", "--recursive"]);
const silent    = ifFlag(args, "-s");
```

#### `getFlag(args, flags): string | true | undefined`

Returns the value of a flag, `true` if the flag has no value, or `undefined` if absent.

```typescript
import { getFlag } from "typescript-virtual-container";

const output = getFlag(args, ["-o", "--output"]);
// args = ["--output", "file.txt"] → "file.txt"
// args = ["--output=file.txt"]    → "file.txt"
// args = ["--verbose"]            → true  (when "verbose" is in flags list)
// args = []                       → undefined
```

#### `getArg(args, index, options?): string | undefined`

Returns the positional argument at a given zero-based index, skipping known flags and their values.

```typescript
import { getArg } from "typescript-virtual-container";

// args = ["-r", "src", "dest"]
const src  = getArg(args, 0, { flags: ["-r"] }); // "src"
const dest = getArg(args, 1, { flags: ["-r"] }); // "dest"
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

## Linux Rootfs

On every `VirtualShell` init, a realistic Linux directory hierarchy is bootstrapped into the VFS. All paths are created idempotently — FS-mode snapshots survive restarts without duplication.

### Directory layout

```
/
├── bin -> /usr/bin          (symlink, Debian-style)
├── dev/                     null, zero, random, urandom, pts/, shm/
├── etc/
│   ├── apt/sources.list     Fortune package sources
│   ├── debian_version
│   ├── group                synced from VirtualUserManager
│   ├── hostname
│   ├── hosts                127.0.0.1 localhost + VM hostname
│   ├── motd
│   ├── os-release           NAME="Fortune GNU/Linux" + ShellProperties
│   ├── passwd               synced from VirtualUserManager
│   ├── resolv.conf          1.1.1.1 + 8.8.8.8
│   └── shadow               (mode 0o640)
├── proc/
│   ├── 1/                   init process (cmdline, status, comm, environ, fd/)
│   ├── <pid>/               one entry per active session (based on pts/* TTY)
│   ├── self/                mirrors the most recent session's /proc/<pid>/
│   ├── cpuinfo              real host CPU info
│   ├── loadavg
│   ├── meminfo              real host memory
│   ├── net/dev              eth0 + lo
│   ├── uptime               shell uptime in seconds
│   └── version              kernel from ShellProperties
├── root/                    root home + .bashrc
├── sys/devices/virtual/dmi/id/
│   ├── sys_vendor           "Fortune Systems"
│   └── product_name         "VirtualContainer v1"
├── tmp/                     (mode 0o1777 sticky)
├── usr/bin/                 stubs for all built-in commands
├── var/
│   ├── lib/dpkg/status      managed by VirtualPackageManager
│   └── log/                 syslog, auth.log, dpkg.log, apt/
└── ...
```

### API

```ts
shell.refreshProcFs();   // refresh /proc/* with current system state
shell.syncPasswd();      // sync /etc/passwd|group|shadow from VirtualUserManager
```

`syncPasswd()` is called automatically on `bootstrapLinuxRootfs`. Call it again after `users.addUser()` / `users.deleteUser()` to keep `/etc/passwd` consistent.

---

## Package Manager (apt/dpkg)

A pure-TypeScript APT/dpkg simulation backed by a built-in package registry. No external process is spawned.

### Workflow

```
apt install <pkg>   → resolves deps → writes files to VFS → updates /var/lib/dpkg/status
apt remove <pkg>    → removes VFS files → updates status
dpkg -l             → reads installed packages from VirtualPackageManager
```

### Built-in package registry (25 packages)

| Package | Version | Section |
|---------|---------|---------|
| `vim` | 2:9.0.1378-2 | editors |
| `git` | 1:2.39.2-1 | vcs |
| `python3` | 3.11.2-1 | python |
| `nodejs` | 18.19.0 | javascript |
| `npm` | 9.2.0 | javascript |
| `curl` | 7.88.1-10 | web |
| `wget` | 1.21.3-1 | web |
| `htop` | 3.2.2-2 | utils |
| `openssh-client` | 1:9.2p1-2 | net |
| `openssh-server` | 1:9.2p1-2 | net |
| `net-tools` | 2.10-0.1 | net |
| `iputils-ping` | 3:20221126-1 | net |
| `jq` | 1.6-2.1 | utils |
| `build-essential` | 12.9 | devel |
| `gcc` | 4:12.2.0-3 | devel |
| `g++` | 4:12.2.0-3 | devel |
| `make` | 4.3-4.1 | devel |
| `less` | 590-2 | text |
| `unzip` | 6.0-28 | utils |
| `rsync` | 3.2.7-1 | net |
| `tmux` | 3.3a-3 | utils |
| `tree` | 2.1.0-1 | utils |
| `ca-certificates` | 20230311 | misc |
| `sudo` | 1.9.13p3-1 | admin |
| `systemd` | 252.22-1 | admin |

> **Note on package stubs**: installing `nodejs` or `python3` writes stubs into `/usr/bin/` and makes them discoverable via `which` and `dpkg -L`. The stubs print a version line but do not execute real binaries — the shell runtime is pure TypeScript with no `execvp`. This makes them useful for testing install workflows and `which`/`dpkg -L` queries, not for running actual scripts.

### `VirtualPackageManager` API

```ts
// Access via shell instance
const pm = shell.packageManager;

pm.install(["vim", "git"], { quiet: false })   // → { output, exitCode }
pm.remove(["vim"], { purge: false })           // → { output, exitCode }
pm.search("editor")                            // → PackageDefinition[]
pm.show("vim")                                 // → string (dpkg-style block)
pm.listInstalled()                             // → InstalledPackage[]
pm.listAvailable()                             // → PackageDefinition[]
pm.isInstalled("vim")                          // → boolean
pm.installedCount()                            // → number
pm.findInRegistry("nodejs")                    // → PackageDefinition | undefined
```

### Registering custom packages

```ts
import { VirtualPackageManager } from "typescript-virtual-container";

// Custom packages can be added to the registry before shell init
// by extending PACKAGE_REGISTRY or by calling install() with custom defs.

// Or: register a post-install hook via onInstall
const customPkg = {
  name: "myapp",
  version: "1.0.0",
  description: "My application",
  files: [
    { path: "/usr/bin/myapp", content: "#!/bin/sh\necho myapp v1.0.0\n", mode: 0o755 },
    { path: "/etc/myapp/config.json", content: JSON.stringify({ port: 3000 }) },
  ],
  onInstall: (vfs) => {
    vfs.mkdir("/var/lib/myapp", 0o755);
    vfs.mkdir("/var/log/myapp", 0o755);
  },
};
```


---

## Built-in Commands

All commands are available in SSH shell mode and via `SshClient.exec()`. Type `help` in the shell for a grouped, colorized listing. Type `help <command>` for detailed usage.

### Navigation

| Command | Flags | Description |
|---------|-------|-------------|
| `cd <path>` | | Change directory |
| `ls [path]` | `-l` `-a` | List directory contents (`-a` shows dotfiles) |
| `pwd` | | Print working directory |
| `tree [path]` | | ASCII directory tree |

### Files & Filesystem

| Command | Flags | Description |
|---------|-------|-------------|
| `cat <path...>` | `-n` `-b` | Concatenate and print files; `-n` numbers all lines, `-b` numbers non-blank lines |
| `chmod <mode> <file>` | | Change file permissions — octal (`755`) or symbolic (`+x`, `u+x`, `go-w`, `a=rx`) |
| `cp <src> <dest>` | `-r` | Copy file or directory |
| `find [path]` | `-name <pat>` `-type f\|d` | Search for files |
| `ln <target> <link>` | `-s` | Create hard or symbolic link |
| `mkdir <path>` | `-p` | Create directory |
| `mv <src> <dest>` | | Move or rename |
| `rm <path>` | `-r` | Remove file or directory |
| `nano <path>` | | Interactive text editor |
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
| `free` | `-h` `-m` `-g` | Display free and used memory |
| `lsb_release` | `-a` `-i` `-d` `-r` `-c` | Print distribution information |
| `neofetch` | | System info display (shows real packages/uptime) |
| `node` | `--version` `-e` `-p` | JavaScript runtime (virtual REPL — evaluates expressions and VFS `.js` files) |
| `python3` | `--version` `-c` `-V` | Python 3 interpreter (virtual REPL — evaluates expressions and VFS `.py` files); alias `python` |
| `uptime` | `-p` `-s` | Tell how long the system has been running |
| `ping [-c <n>] <host>` | | Send ICMP ECHO_REQUEST (mock) |
| `ps` | `-a` `-u` `-x` `aux` | Report process status; `-u` / `aux` shows USER/PID/%CPU/%MEM columns |
| `sleep <seconds>` | | Delay execution |
| `uname` | `-a` `-r` `-m` | Print system information |
| `who` | | List active sessions |
| `whoami` | | Print current user |

### Network

| Command | Flags | Description |
|---------|-------|-------------|
| `curl <url>` | `-o` `-X` `-d` `-H` `-s` `-I` `-L` `-v` | HTTP client (pure `fetch()`, no host binary) |
| `wget <url>` | `-O` `-P` `-q` | File downloader (pure `fetch()`, no host binary) |

### Shell

| Command | Flags | Description |
|---------|-------|-------------|
| `alias [name=value]` | | Define or display aliases |
| `clear` | | Clear terminal screen (full ANSI reset) |
| `declare [name=value]` | `-i` `-r` `-x` | Declare variables with attributes; aliases `local`, `typeset` |
| `echo <text>` | `-n` `-e` | Display text; `-n` suppresses newline, `-e` interprets `\n` `\t` `\r` `\\` |
| `env` | | Print session environment variables |
| `exit [code]` | | Exit session with optional exit code |
| `export NAME=VALUE` | | Set shell variable in current session |
| `help [command]` | | List commands grouped by category, or show usage for a specific command |
| `history [n]` | | Display command history (last N entries) |
| `man <command>` | | Display command reference manual |
| `printf <fmt> [args...]` | | Format and print data (`%s` `%d` `%f` `%x` `\n` `\t`) |
| `read [-r] <var...>` | `-r` `-p` | Read a line from stdin into variable(s) |
| `return [n]` | | Return from a shell function with optional exit code |
| `set [VAR=val]` | | Display or set shell variables |
| `sh` | `-c <script>` `[file]` | Execute shell script — supports `if`/`for`/`while`/`case`/functions, bare `VAR=val` assignments, `$((expr))` arithmetic; single-quoted args are never expanded |
| `shift [n]` | | Shift positional parameters left by n (default 1) |
| `source <file>` | | Execute file in current shell environment; aliases and exports persist |
| `. <file>` | | Alias for `source` |
| `test <expr>` | | Evaluate POSIX conditional expression |
| `[ <expr> ]` | | Alias for `test`; supports `-f` `-d` `-e` `-z` `-n` `-x` `-s` `=` `!=` `-eq` `-lt` `-gt` `-le` `-ge` `!` `-a` `-o` |
| `trap [action] [signal]` | | Register handler for shell signals; supports `EXIT` |
| `true` | | Return success exit code (0) |
| `false` | | Return failure exit code (1) |
| `type <command>` | | Describe how a command would be interpreted (builtin vs PATH) |
| `unalias <name>` | `-a` | Remove alias definitions |
| `unset <VAR>` | | Remove shell variable |
| `which <command>` | | Locate a command in the session PATH |

### Package Management

| Command | Flags | Description |
|---------|-------|-------------|
| `apt <cmd> [pkg...]` | | Package manager (`install`, `remove`, `purge`, `update`, `upgrade`, `search`, `show`, `list`) |
| `apt-get <cmd>` | | Alias for `apt` |
| `apt-cache <cmd>` | | Query package cache (`search`, `show`, `policy`) |
| `dpkg` | `-l` `-s` `-L` `-r` `-P` | Debian package manager low-level tool |
| `dpkg-query` | `-W` `-l` | Show information about installed packages |


### Users & Permissions

| Command | Flags | Description |
|---------|-------|-------------|
| `adduser <name> <pass>` | | Create user (root only) |
| `deluser <name>` | | Delete user (root only) |
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
echo "${NAME}"               # world (braced form)
echo "${NAME:-fallback}"     # world (or fallback if unset)
echo "${UNSET:-default}"     # default (assign-on-read: use ${UNSET:=default})
echo "${NAME:+alternate}"    # alternate (only if NAME is set)
echo "${#NAME}"              # 5 (string length)
echo "$?"                    # last exit code
echo "~"                     # /home/<user> (tilde expansion)
```

### Arithmetic Expansion

```bash
echo $((2 + 3))              # 5
echo $((10 % 3))             # 1
X=4; echo $((X * 2))         # 8
i=0; i=$((i + 1)); echo $i   # 1

# In loops (via sh):
sh -c 'i=0
while [ $i -lt 5 ]; do
  echo $i
  i=$((i + 1))
done'
```

> **Single-quote isolation** — variable and arithmetic expansion never occurs inside single quotes.
> `echo '$NAME'` always outputs the literal string `$NAME`.

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
- [x] Linux rootfs on boot — `/etc`, `/proc`, `/sys`, `/dev`, `/usr`, `/var` populated at init; `os-release`, `passwd`, `hosts`, `/proc/meminfo`, `/proc/cpuinfo`, `/proc/version`, `/proc/uptime`, `/sys/devices/virtual/dmi/`, symlinks `/bin`→`/usr/bin`
- [x] Virtual package manager — `apt install/remove/purge/update/upgrade/search/show/list`, `apt-get`, `apt-cache`, `dpkg`, `dpkg-query`; 25 packages in registry; writes files to VFS; `/var/lib/dpkg/status` persistence
- [x] `curl` / `wget` reimplemented as pure `fetch()` — no host binary spawned, full isolation
- [x] New commands: `which`, `type`, `man`, `uptime`, `free`, `lsb_release`, `alias`, `unalias`
- [x] `$(cmd)` command substitution in variable expansion
- [x] Alias expansion in command dispatch
- [x] `neofetch` shows real package count and shell uptime
- [x] `syncPasswd()` / `refreshProcFs()` public API on `VirtualShell`
- [x] `test` / `[` — full POSIX conditional expressions (`-f`, `-d`, `-e`, `-z`, `-n`, `-x`, `-s`, `-L`, `=`, `!=`, `-eq`, `-lt`, `-gt`, `-le`, `-ge`, `!`, `-a`, `-o`)
- [x] `source` / `.` — execute file in current shell env (aliases and exports persist across commands)
- [x] `history [n]` — display command history from VFS `.bash_history`
- [x] `echo -e` / `echo -n` — escape sequence interpretation and newline suppression
- [x] `ls -a` — show dotfiles
- [x] `chmod` symbolic modes — `+x`, `u+x`, `go-w`, `a=rx`, comma-separated
- [x] `cat -n` / `-b` — line numbering, multi-file concatenation, stdin support
- [x] `ping -c N` — respects packet count flag
- [x] `ps -u` / `ps aux` — extended format with USER/PID/%CPU/%MEM/VSZ/RSS columns
- [x] `$(cmd)` in single-quoted args preserved — `sh -c 'echo $(whoami)'` now works correctly
- [x] Pipeline executor: `runCommandDirect` — args with `;`, `|`, `>` no longer re-parsed
- [x] `>>` append redirect fixed — was broken because `echo` lacked terminal newline
- [x] `export A=1 && echo $A` — env vars visible to subsequent commands in same pipeline
- [x] `echo` uses session `env.vars` (not stale global store)
- [x] `printf` — format string with `%s` `%d` `%f` `%x` `\n` `\t`
- [x] `read` — read stdin into variables (supports multiple vars, splits on whitespace)
- [x] `declare` / `local` / `typeset` — variable declaration with `-i` integer, `-r` readonly, `-x` export
- [x] `shift [n]` — shift positional parameters
- [x] `trap [action] [signal]` — signal handlers with `EXIT` support
- [x] `return [n]` — return from shell functions
- [x] `exit [code]` — optional exit code
- [x] `help` rewrite — Package Management category, aliases shown inline, `help <cmd>` shows category
- [x] Category corrections — `neofetch`→system, `nano`→files, `apt`/`dpkg`→package
- [x] `src/utils/expand.ts` — centralised expansion module used by `runCommand`, `echo`, and `sh.ts`
- [x] `${#VAR}` string length, `$((expr))` arithmetic, `~` tilde expansion
- [x] `${VAR:=assign}` assign-on-read, `${VAR:+alternate}` alternate-if-set
- [x] Single-quote isolation in expansion — `$VAR` never expanded inside `'...'`
- [x] `true` / `false` builtins
- [x] Bare `VAR=val` assignments in `sh` scripts (`i=0`, `i=$((i+1))`)
- [x] `$?` reflects last command exit code correctly across `&&` / `;` chains
- [x] `node` / `python3` virtual REPL stubs — `node -e`, `node <file>`, `python3 -c`, `python3 <file>`, `--version` flags
- [x] `/proc/self` and `/proc/<pid>` per-session process entries — `comm`, `status`, `cmdline`, `environ`, `cwd`, `exe`, `fd/`
- [x] Snapshot diff tooling — `diffSnapshots()`, `formatDiff()`, `assertDiff()` exported from `typescript-virtual-container`
- [ ] WebSocket-based remote shell client (experimental)
