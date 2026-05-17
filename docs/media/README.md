# `typescript-virtual-container`

> Pure in-memory SSH/SFTP server with a virtual filesystem and typed programmatic API for testing, automation, and interactive shell scripting in TypeScript/JavaScript.

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
- [Usage Examples](#usage-examples)
- [Built-in Commands](#built-in-commands)
- [Configuration](#configuration)
- [Security Features](#security-features)
- [Types & TypeScript](#types--typescript)
- [FAQ](#faq)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)
- [Changelog](#changelog)

## Overview

`typescript-virtual-container` is a lightweight, fully-typed SSH/SFTP runtime written in TypeScript that provides:

- **Pure in-memory filesystem**: No disk I/O at runtime. All state lives in a fast recursive tree with JSON snapshot export/import for persistence.
- **SSH + SFTP Protocol Support**: Serve SSH shell/exec sessions and SFTP file operations on configurable ports.
- **Password & public-key authentication**: Register SSH public keys per user alongside (or instead of) password auth.
- **Rate limiting / brute-force protection**: Configurable per-IP lockout after N failed auth attempts.
- **User Management**: Create, authenticate, and manage virtual users with scrypt password hashing and sudo-like privilege elevation.
- **Programmatic Shell API**: Execute shell commands and query filesystem state directly from TypeScript without SSH overhead.
- **Event-Driven Architecture**: All core classes extend `EventEmitter` for lifecycle and operation tracking.
- **Security Auditing**: Built-in `HoneyPot` utility for comprehensive activity logging, event tracking, and statistics collection.
- **40+ Built-in Commands**: `ls`, `cd`, `cat`, `cp`, `mv`, `ln`, `find`, `grep`, `wc`, `head`, `tail`, `chmod`, `mkdir`, `touch`, `rm`, `tree`, `nano`, `curl`, `wget`, `sudo`, `su`, `adduser`, `deluser`, and more.
- **Full TypeScript Support**: Complete JSDoc coverage, exported types, and first-class async/await for all operations.

## What This Is / What This Is Not

### What This Is

- A virtual shell runtime written in TypeScript with a **pure in-memory filesystem**.
- A practical tool for deterministic testing, automation pipelines, and SSH-like workflows without running real containers.
- A honeypot framework for capturing and auditing attacker behavior.

### What This Is Not

- Not a fully isolated container runtime.
- Not a security sandbox — the VFS does not sandbox host filesystem access by spawned child processes (e.g. `wget`, `curl`).
- Not a kernel-level isolation boundary (unlike Docker/VM-based isolation).

## Why This Package

- **Zero disk footprint**: The VFS operates entirely in memory. Snapshot to JSON for persistence.
- **Deterministic test environments**: Repeatable state for CI pipelines and integration tests.
- **Low operational overhead**: No Docker daemon, no kernel namespaces, no privileged setup.
- **Fast feedback loops**: Programmatic API for command execution and filesystem assertions.
- **Developer-friendly internals**: Typed APIs, clear boundaries, and composable building blocks.

## Installation

```bash
npm install typescript-virtual-container
# or
yarn add typescript-virtual-container
# or
bun add typescript-virtual-container
```

## Compatibility

- **Node.js**: `>=18`
- **Bun**: Supported for development and runtime
- **TypeScript**: `>=5.0`
- **OS**: Linux, macOS, Windows

## Quick Start

### Running an SSH Server

```typescript
import { VirtualSshServer } from "typescript-virtual-container";

const ssh = new VirtualSshServer({ port: 2222, hostname: "my-container" });
await ssh.start();
console.log("SSH server listening on :2222");

// Connect: ssh root@localhost -p 2222
// root has no password by default — login is allowed without verification.

process.on("SIGTERM", () => { ssh.stop(); process.exit(0); });
```

### SSH + SFTP with Shared State

```typescript
import { VirtualSftpServer, VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("my-container");

const ssh  = new VirtualSshServer({ port: 2222, shell });
const sftp = new VirtualSftpServer({ port: 2223, shell });

await ssh.start();
await sftp.start();
```

### Programmatic Client (no SSH round-trip)

```typescript
import { SshClient, VirtualShell } from "typescript-virtual-container";

const shell  = new VirtualShell("typescript-vm");
await shell.ensureInitialized();

const client = new SshClient(shell, "root");

await client.mkdir("/tmp/work");
await client.cd("/tmp/work");
await client.writeFile("hello.txt", "Hello, World!");

const list = await client.ls();
console.log(list.stdout); // hello.txt

const content = await client.readFile("hello.txt");
console.log(content.stdout); // Hello, World!
```

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│  SshMimic (VirtualSshServer)          SftpMimic (VirtualSftpServer) │
│  password auth · publickey auth       SFTP protocol handlers        │
│  per-IP rate limiting / lockout                                      │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                 ┌──────────▼──────────┐
                 │    VirtualShell     │
                 │  pipeline parser   │
                 │  command executor  │
                 │  session manager   │
                 └──┬──────────────┬──┘
                    │              │
       ┌────────────▼──┐     ┌─────▼──────────────┐
       │VirtualFileSystem│    │ VirtualUserManager │
       │ in-memory tree │    │ scrypt · sudoers   │
       │ gzip · symlinks│    │ publickey auth      │
       │ snapshot I/O   │    │ quotas · sessions  │
       └────────────────┘    └────────────────────┘
                    │
       ┌────────────▼────────────┐
       │       HoneyPot          │
       │ audit log · stats · I/O │
       └─────────────────────────┘
```

## API Reference

### `VirtualSshServer`

```typescript
new VirtualSshServer({
  port: number;
  hostname?: string;              // default: "typescript-vm"
  shell?: VirtualShell;           // share state with SFTP
  maxAuthAttempts?: number;       // default: 5 (per IP before lockout)
  lockoutDurationMs?: number;     // default: 60_000 (1 minute)
})
```

| Method | Description |
|--------|-------------|
| `start(): Promise<number>` | Starts the server, returns bound port |
| `stop(): void` | Gracefully closes the server |
| `clearLockout(ip: string): void` | Manually lift an IP lockout |

**Events**: `client:connect`, `client:disconnect`, `auth:success`, `auth:failure`, `auth:lockout`, `start`, `stop`

### `VirtualShell`

```typescript
new VirtualShell(
  hostname: string,
  properties?: ShellProperties,
  vfsOptions?: VfsOptions,    // { mode?: 'memory'|'fs', snapshotPath?: string }
)
```

| Method | Description |
|--------|-------------|
| `ensureInitialized(): Promise<void>` | Await before using programmatically |
| `addCommand(name, params, callback)` | Register a custom shell command |
| `executeCommand(rawInput, authUser, cwd)` | Run a command string |
| `writeFileAsUser(authUser, path, content)` | Write with quota enforcement |
| `getVfs(): VirtualFileSystem` | Access the VFS directly |
| `getUsers(): VirtualUserManager` | Access the user manager |

### `VirtualFileSystem`

Two persistence modes controlled by the `VfsOptions` constructor argument:

```typescript
// Default — pure in-memory, zero disk I/O
const vfs = new VirtualFileSystem();

// FS mode — auto-saves a JSON snapshot to disk on flushMirror()
const vfs = new VirtualFileSystem({
  mode: "fs",
  snapshotPath: "./data",   // writes ./data/vfs-snapshot.json
});
await vfs.restoreMirror();  // load from disk (silent no-op if file missing)
// ...
await vfs.flushMirror();    // persist to disk
```

Both modes expose the exact same API. The tree always lives in memory; `"fs"` mode simply adds a JSON round-trip on `restoreMirror` / `flushMirror`.

| Method | Description |
|--------|-------------|
| `mkdir(path, mode?)` | Create directory (recursive) |
| `writeFile(path, content, options?)` | Write file (creates parents) |
| `readFile(path): string` | Read file as UTF-8 string |
| `readFileRaw(path): Buffer` | Read file as Buffer |
| `exists(path): boolean` | Test existence |
| `stat(path): VfsNodeStats` | File/directory metadata |
| `list(path?): string[]` | List directory children |
| `tree(path?): string` | ASCII tree output |
| `move(from, to)` | Move/rename node |
| `remove(path, options?)` | Delete file or directory |
| `chmod(path, mode)` | Update mode bits |
| `compressFile(path)` | Gzip in-place |
| `decompressFile(path)` | Gunzip in-place |
| `symlink(target, linkPath)` | Create symbolic link |
| `isSymlink(path): boolean` | Test if path is a symlink |
| `resolveSymlink(path): string` | Resolve symlink chain |
| `getUsageBytes(path?): number` | Total stored bytes |
| `getMode(): VfsPersistenceMode` | Returns `"memory"` or `"fs"` |
| `getSnapshotPath(): string \| null` | Snapshot file path in fs mode |
| `toSnapshot(): VfsSnapshot` | Export to JSON-serialisable object |
| `importSnapshot(snapshot)` | Replace state from snapshot |
| `restoreMirror(): Promise<void>` | Load from disk (fs mode) / no-op (memory) |
| `flushMirror(): Promise<void>` | Save to disk (fs mode) / emit event (memory) |
| `VirtualFileSystem.fromSnapshot(snapshot)` | Create new memory-mode instance from snapshot |

**Events**: `file:write`, `file:read`, `dir:create`, `node:remove`, `symlink:create`, `snapshot:import`, `snapshot:restore`, `mirror:flush`

#### Memory mode — manual snapshot persistence

```typescript
import { VirtualFileSystem } from "typescript-virtual-container";
import { writeFileSync, readFileSync } from "node:fs";

const vfs = new VirtualFileSystem(); // mode: "memory"
vfs.writeFile("/etc/config.json", JSON.stringify({ debug: true }));

// Export to disk manually
writeFileSync("vfs-snapshot.json", JSON.stringify(vfs.toSnapshot()));

// Restore into a new instance
const snapshot = JSON.parse(readFileSync("vfs-snapshot.json", "utf8"));
const restored = VirtualFileSystem.fromSnapshot(snapshot);
console.log(restored.readFile("/etc/config.json")); // {"debug":true}
```

#### FS mode — automatic persistence

```typescript
import { VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("my-vm", undefined, {
  mode: "fs",
  snapshotPath: "./vfs-data",
});

const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();
// VFS is restored from disk on start, and flushed after every file write via flushMirror()
```

### `VirtualUserManager`

| Method | Description |
|--------|-------------|
| `initialize(): Promise<void>` | Load users and ensure root exists |
| `createUser(username, password?)` | Create user (async) |
| `deleteUser(username)` | Remove user |
| `verifyPassword(username, password): boolean` | Check credentials |
| `hasPassword(username): boolean` | True if password is set |
| `addSudoer(username)` | Grant sudo privilege |
| `isSudoer(username): boolean` | Test sudo privilege |
| `addAuthorizedKey(username, algo, data)` | Register SSH public key |
| `getAuthorizedKeys(username)` | List public keys for user |
| `removeAuthorizedKeys(username)` | Revoke all public keys |
| `registerSession(username, remoteAddress)` | Start session tracking |
| `unregisterSession(sessionId)` | End session tracking |
| `listActiveSessions()` | All active sessions |

### `HoneyPot`

```typescript
import { HoneyPot, VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("honeypot");
const ssh   = new VirtualSshServer({ port: 22, shell });
const hp    = new HoneyPot();

await ssh.start();
hp.attach(shell, shell.vfs, shell.users, ssh);

// Later:
const log   = hp.getAuditLog();
const stats = hp.getStats();
```

| Method | Description |
|--------|-------------|
| `attach(shell, vfs, users, ssh?, sftp?)` | Subscribe to all event sources |
| `getAuditLog(): AuditLogEntry[]` | Full log in insertion order |
| `getStats(): HoneyPotStats` | Aggregated counters |
| `clearLog()` | Flush the in-memory log |
| `exportJson(): string` | Serialise log + stats to JSON |

### `SshClient` (programmatic)

```typescript
const client = new SshClient(shell, "username");
```

| Method | Description |
|--------|-------------|
| `exec(command): Promise<CommandResult>` | Run arbitrary command string |
| `ls(path?)` | List directory |
| `cd(path)` | Change working directory |
| `pwd()` | Current directory |
| `cat(path)` | Read file |
| `readFile(path)` | Alias for `cat` |
| `writeFile(path, content)` | Write file |
| `mkdir(path, recursive?)` | Create directory |
| `rm(path, recursive?)` | Delete file/directory |

## Usage Examples

### Public-key authentication

```typescript
import { VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("secure-vm");
await shell.ensureInitialized();

await shell.users.createUser("alice", "fallback-password");

// Register Alice's SSH public key (parsed from ~/.ssh/id_ed25519.pub)
const keyData = Buffer.from("<base64-key-data>", "base64");
shell.users.addAuthorizedKey("alice", "ssh-ed25519", keyData);

const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();
// ssh -i ~/.ssh/id_ed25519 alice@localhost -p 2222
```

### Rate limiting

```typescript
const ssh = new VirtualSshServer({
  port: 2222,
  maxAuthAttempts: 3,        // lock after 3 failures
  lockoutDurationMs: 300_000 // 5-minute lockout
});

ssh.on("auth:lockout", ({ ip, until }) => {
  console.warn(`${ip} locked out until ${until}`);
});

ssh.on("auth:failure", ({ username, remoteAddress }) => {
  console.warn(`Failed login attempt: ${username} from ${remoteAddress}`);
});
```

### Custom commands

```typescript
const shell = new VirtualShell("typescript-vm");

shell.addCommand("greet", ["[name]"], ({ args, authUser }) => {
  const name = args[0] ?? authUser;
  return { stdout: `Hello, ${name}!`, exitCode: 0 };
});

// Inside the shell: greet world → Hello, world!
```

### Snapshot-based test fixtures

```typescript
import { VirtualFileSystem } from "typescript-virtual-container";

// Build fixture once
function buildFixture(): VfsSnapshot {
  const vfs = new VirtualFileSystem();
  vfs.mkdir("/app/config");
  vfs.writeFile("/app/config/settings.json", JSON.stringify({ env: "test" }));
  vfs.writeFile("/app/README.md", "# My App");
  return vfs.toSnapshot();
}

const FIXTURE = buildFixture();

// Each test gets a fresh isolated VFS
test("reads config file", () => {
  const vfs = VirtualFileSystem.fromSnapshot(FIXTURE);
  const content = JSON.parse(vfs.readFile("/app/config/settings.json"));
  expect(content.env).toBe("test");
});
```

### Symlinks

```typescript
const vfs = new VirtualFileSystem();
vfs.mkdir("/usr/local/bin");
vfs.writeFile("/opt/myapp/bin/app", "#!/bin/sh\necho hello");
vfs.symlink("/opt/myapp/bin/app", "/usr/local/bin/app");

console.log(vfs.isSymlink("/usr/local/bin/app")); // true
console.log(vfs.resolveSymlink("/usr/local/bin/app")); // /opt/myapp/bin/app
```

### HoneyPot with JSON export

```typescript
import { HoneyPot, VirtualShell, VirtualSshServer } from "typescript-virtual-container";
import { writeFileSync } from "node:fs";

const shell = new VirtualShell("trap");
const ssh   = new VirtualSshServer({ port: 22, shell });
const hp    = new HoneyPot(50_000);

await ssh.start();
hp.attach(shell, shell.vfs, shell.users, ssh);

process.on("SIGINT", () => {
  writeFileSync("honeypot-session.json", hp.exportJson());
  process.exit(0);
});
```

## Built-in Commands

| Command | Description |
|---------|-------------|
| `ls [-l]` | List directory contents |
| `cd <path>` | Change working directory |
| `pwd` | Print working directory |
| `cat <file>` | Print file contents |
| `cp [-r] <src> <dest>` | Copy file or directory |
| `mv <src> <dest>` | Move or rename |
| `ln [-s] <target> <link>` | Create hard or symbolic link |
| `find [path] [-name] [-type]` | Search for files |
| `grep [-i] [-v] [-n] [-r] <pattern> [files]` | Search file content |
| `wc [-l] [-w] [-c] [files]` | Word/line/byte count |
| `head [-n] [files]` | First N lines |
| `tail [-n] [files]` | Last N lines |
| `chmod <mode> <file>` | Change file permissions |
| `mkdir [-p] <path>` | Create directory |
| `touch <file>` | Create or update file timestamp |
| `rm [-r] <path>` | Remove file or directory |
| `tree [path]` | Display directory tree |
| `echo [text]` | Print text |
| `nano <file>` | Interactive text editor |
| `htop` | Interactive process viewer |
| `whoami` | Print current user |
| `who` | List active sessions |
| `hostname` | Print hostname |
| `env` | Print environment variables |
| `export VAR=value` | Set environment variable |
| `set` | List all variables |
| `unset VAR` | Remove variable |
| `sudo <cmd>` | Run command as root |
| `su [user]` | Switch user |
| `adduser <user>` | Add new user |
| `deluser <user>` | Delete user |
| `passwd [user]` | Change password |
| `curl <url>` | HTTP client |
| `wget <url>` | File downloader |
| `sh <script>` | Run shell script |
| `clear` | Clear terminal screen |
| `exit` | Exit shell session |
| `help` | List all commands |
| `neofetch` | System info display |

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SSH_MIMIC_FAST_PASSWORD_HASH` | `""` | Use SHA-256 instead of scrypt (faster, less secure — dev only) |
| `SSH_MIMIC_AUTO_SUDO_NEW_USERS` | `"true"` | Automatically grant sudo to new users |
| `DEV_MODE` | `""` | Enable performance logging |
| `RENDER_PERF` | `""` | Enable render performance logging |

## Security Features

### Per-IP Rate Limiting

`VirtualSshServer` tracks failed authentication attempts per remote IP address. After `maxAuthAttempts` consecutive failures, the IP is locked out for `lockoutDurationMs` milliseconds.

```typescript
const ssh = new VirtualSshServer({
  port: 2222,
  maxAuthAttempts: 5,       // default
  lockoutDurationMs: 60_000 // default: 1 minute
});

ssh.on("auth:lockout", ({ ip, until }) => { /* ... */ });
ssh.clearLockout("192.168.1.1"); // manual override
```

### Public-Key Authentication

Register one or more SSH public keys for a user. Both password and public-key methods are supported simultaneously.

```typescript
import { createPublicKey } from "node:crypto";

// Parse key from openssh authorized_keys line
const [algo, b64] = line.split(" ");
shell.users.addAuthorizedKey(username, algo, Buffer.from(b64, "base64"));
```

### Password Security

Passwords are hashed with **scrypt** (N=32768, r=8, p=1) by default with a random per-user salt. In development, set `SSH_MIMIC_FAST_PASSWORD_HASH=1` to use SHA-256 for faster test runs.

## Types & TypeScript

```typescript
import type {
  // Filesystem
  VfsSnapshot, VfsNodeStats, VfsFileNode, VfsDirectoryNode,
  WriteFileOptions, RemoveOptions,
  // Commands
  CommandContext, CommandResult, ShellModule, CommandMode,
  // Audit
  AuditLogEntry, HoneyPotStats,
  // Streams
  ShellStream, ExecStream,
} from "typescript-virtual-container";
```

## FAQ

**Does the VFS touch the host filesystem?**  
By default (mode `"memory"`): no, all data lives in memory. In mode `"fs"`, it reads/writes a single JSON file (`vfs-snapshot.json`) inside the configured `snapshotPath` directory. No other host paths are accessed.

**Can I run multiple isolated shells?**  
Yes. Each `new VirtualShell(...)` creates a completely independent VFS and user manager instance.

**Are custom commands shared between shell instances?**  
No. Custom commands registered with `shell.addCommand()` are instance-local. The global command registry (built-in commands) is shared but read-only.

**Can I use this for honeypot deployments?**  
Yes — that's one of its primary use-cases. Use `HoneyPot.attach()` to capture all activity, and configure `maxAuthAttempts` to slow down automated scanners.

**Is SFTP fully supported?**  
SFTP file operations (open, read, write, stat, mkdir, remove, rename) are implemented. Some optional operations (e.g. extended attributes) return `OP_UNSUPPORTED`.

## Troubleshooting

**`Error: Too many levels of symbolic links`**  
A symlink chain exceeds 8 hops (the default). Check for circular links or increase `maxDepth` when calling `resolveSymlink()` directly.

**Auth always fails with "lockout"**  
Call `ssh.clearLockout(ip)` or increase `maxAuthAttempts` / restart the server. In tests, use `maxAuthAttempts: Infinity` to disable lockout.

**`Command 'xyz' not found`**  
Either register it with `shell.addCommand()` or use the programmatic `SshClient.exec()` method with an `exec` callback.

## Contributing

```bash
git clone https://github.com/itsrealfortune/typescript-virtual-container
cd typescript-virtual-container
bun install
bun run check    # lint + typecheck
bun run build    # compile to dist/
bun test         # run tests
```

Please open an issue before submitting large pull requests.

## Security

This project is designed for development workflows and honeypots. **Do not expose a running instance to the public internet without understanding the risks.** The virtual shell intentionally allows arbitrary command execution within the virtual environment.

Please report security vulnerabilities via GitHub Issues or the contact in `SECURITY.md`.

## License

MIT — see [LICENSE](./LICENSE).

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
