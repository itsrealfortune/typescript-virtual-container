# `typescript-virtual-container`

> Scalable SSH/SFTP server with a virtual filesystem and typed programmatic API for testing, automation, and interactive shell scripting in TypeScript/JavaScript.

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
- [Performance & Scalability](#performance--scalability)
- [Types & TypeScript](#types--typescript)
- [FAQ](#faq)
- [Troubleshooting](#troubleshooting)
- [Migration Guide](#migration-guide)
- [Contributing](#contributing)
- [Security](#security)
- [Support](#support)
- [License](#license)
- [Roadmap](#roadmap)
- [Changelog](#changelog)

## Overview

`typescript-virtual-container` is a lightweight, fully-typed SSH/SFTP runtime written in TypeScript that provides:

- **SSH + SFTP Protocol Support**: Serve SSH shell/exec sessions and SFTP file operations on configurable ports.
- **Virtual Filesystem**: Fast developer workflow backed by a mirror directory under `.vfs/mirror`, with optional gzip compression and programmatic access.
- **User Management**: Create, authenticate, and manage virtual users with strict password hashing (scrypt) and sudo-like privilege elevation.
- **Programmatic Shell API**: Execute shell commands and query filesystem state directly from TypeScript without SSH overhead.
- **Event-Driven Architecture**: All core classes extend `EventEmitter` for lifecycle and operation tracking. Listen to auth events, filesystem operations, session lifecycle, and command execution for auditing and integration.
- **Security Auditing**: Built-in `HoneyPot` utility for comprehensive activity logging, event tracking, statistics collection, and anomaly detection across all components.
- **Built-in Commands**: `ls`, `cd`, `pwd`, `cat`, `mkdir`, `touch`, `rm`, `tree`, `whoami`, `hostname`, `who`, `sudo`, `su`, `adduser`, `deluser`, `nano` (text editor), `curl`, `wget`, and a growing set of additional commands. Not everything is implemented yet, and shell compatibility is still being expanded.
- **Full TypeScript Support**: Complete JSDoc coverage, exported types, and first-class async/await for all operations.

## What This Is / What This Is Not

### What This Is

- A virtual shell runtime written in TypeScript.
- A virtual environment with its own virtual filesystem, user management, and command runtime.
- A practical tool for deterministic testing, automation pipelines, and SSH-like workflows without running real containers.

### What This Is Not

- Not a fully isolated container runtime.
- Not a security sandbox.
- Not a kernel-level isolation boundary (unlike Docker/VM-based isolation).

This project emulates shell behavior for developer workflows. It is designed for realism and productivity, not hard security isolation.

## Why This Package

This package is designed for teams that need a realistic SSH-like runtime without spinning up real containers or VMs.

- **Deterministic test environments**: Repeatable state for CI pipelines and integration tests.
- **Low operational overhead**: No Docker daemon, no kernel namespaces, no privileged setup.
- **Fast feedback loops**: Programmatic API for command execution and filesystem assertions.
- **Developer-friendly internals**: Typed APIs, clear boundaries, and composable building blocks.

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
cd virtual-env-js
bun install
bun format  # Format code per Biome
bun check   # Lint and typecheck
```

## Compatibility

- **Node.js**: Recommended `>=18`
- **Bun**: Supported for development and runtime
- **TypeScript**: Recommended `>=5.0`
- **OS**: Linux, macOS, and Windows (via Node/Bun runtime)

The virtual filesystem and shell behavior are intentionally portable and do not depend on host-specific POSIX syscalls.

## Quick Start

### Running an SSH Server

```typescript
import { VirtualSshServer } from "typescript-virtual-container";

// Create server on port 2222
const ssh = new VirtualSshServer({ 
	port: 2222, 
	hostname: "my-container" 
});

// Start server
await ssh.start();
console.log("SSH server listening on :2222");

// Connect externally via SSH
// ssh root@localhost -p 2222  (password: "root")

// Graceful shutdown
process.on("SIGTERM", () => {
	ssh.stop();
	process.exit(0);
});
```

### Running SSH + SFTP with Shared State

```typescript
import { VirtualSftpServer, VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("my-container");

const ssh = new VirtualSshServer({
	port: 2222,
	hostname: "my-container",
	shell,
});

const sftp = new VirtualSftpServer({
	port: 2223,
	hostname: "my-container",
	shell,
});

await ssh.start();
await sftp.start();

console.log("SSH on :2222, SFTP on :2223");
```

### Using the Programmatic Client API

```typescript
import { VirtualSshServer, SshClient, VirtualShell } from "typescript-virtual-container";

const shell = new VirtualShell("typescript-vm");
const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

// Create authenticated client for specific user
const client = new SshClient(shell, "root");

// Execute commands programmatically
const list = await client.ls("/home");
console.log("stdout:", list.stdout);  // Directory listing

const result = await client.pwd();
console.log("Current dir:", result.stdout);

await client.mkdir("/tmp/work", true);
await client.cd("/tmp/work");

const content = await client.readFile("/etc/hostname");
console.log("Hostname file:", content.stdout);

await client.writeFile("output.txt", "Hello, World!");

ssh.stop();
```

## Architecture Overview

<!-- ### Core Components

```
┌─────────────────────────────────────────────┐
│       SSH Server (SshMimic)                 │
│  Listens on :port, handles auth & sessions │
└──────────────┬──────────────────────────────┘
							 │
			 ┌───────┴────────┬──────────────┐
			 │                │              │
┌──────┴──────┐  ┌─────┴─────┐  ┌────┴─────┐
│ VirtualFileSystem   │ VirtualUserManager  │  Command Runtime
│ In-mem FS w/ persist      │ Auth & Sudoers    │  Shell/Exec Mode
└──────────────┘  └──────────┘  └──────────┘
			 ▲
│              Backed by disk
│              .vfs/mirror
└──────────────────────────────────┘
``` -->

### Execution Modes

1. **SSH Shell Mode**: Interactive terminal session over SSH with readline, prompt, TTY resizing.
2. **SSH Exec Mode**: Non-interactive command execution (e.g., `ssh user@host "ls -la"`).
3. **SFTP Mode**: Remote file operations (`readdir`, `stat`, `readFile`, `writeFile`, `mkdir`, `rename`, etc.) with home-directory confinement.
4. **Programmatic Mode**: Direct TypeScript API via `SshClient`, no SSH protocol overhead.

### Persistence

- Filesystem state is stored under `.vfs/mirror` inside the configured `basePath`
- Users/passwords stored in virtual paths `/virtual-env-js/.auth/htpasswd` and `/virtual-env-js/.auth/sudoers`
- `restoreMirror()` and `flushMirror()` are lightweight compatibility hooks for initialization boundaries

---

## API Reference

### SshMimic (SSH Server)

Main SSH server class, exported as `VirtualSshServer` in the package entrypoint. It wires the virtual shell runtime into ssh2 sessions and manages authentication/session handlers.

#### Constructor

```typescript
new SshMimic(options: {
	port: number;           // TCP port to bind on localhost
	hostname?: string;      // Virtual hostname (default: "typescript-vm")
	shell?: VirtualShell;   // Optional preconfigured shell instance
})
```

- `hostname` controls the SSH ident label and the default hostname used by a generated shell.
- If `shell` is omitted, the server creates `new VirtualShell(hostname)` for you.

**Example:**

```typescript
const virtualShell = new VirtualShell("my-lab", {
	kernel: "1.0.0+itsrealfortune+1-amd64",
	os: "Fortune GNU/Linux x64",
	arch: "x86_64",
}, "./data");
const ssh = new SshMimic({
	port: 2222,
	hostname: "my-lab",
	shell: virtualShell
});
```

#### Methods

##### `async start(): Promise<number>`

Initializes virtual filesystem, user manager, and starts listening for SSH connections.

- **Returns**: Bound port number
- **Throws**: Error if port not available or initialization fails

```typescript
const port = await ssh.start();
console.log(`Listening on ${port}`);
```

##### `stop(): void`

Cleanly closes server and all active connections.

```typescript
ssh.stop();
```

#### Events

`SshMimic` extends `EventEmitter` and emits the following events:

| Event | Data | Description |
|-------|------|-------------|
| `start` | `{ port: number }` | Server started and listening |
| `stop` | — | Server stopped |
| `auth:success` | `{ username: string; remoteAddress: string }` | User authenticated |
| `auth:failure` | `{ username: string; remoteAddress: string }` | Auth failed for user |
| `client:connect` | — | New SSH client connected |
| `client:disconnect` | `{ user: string }` | SSH client disconnected |

**Example:**

```typescript
ssh.on("auth:success", ({ username, remoteAddress }) => {
	console.log(`[SSH] User ${username} authenticated from ${remoteAddress}`);
});

ssh.on("auth:failure", ({ username }) => {
	console.log(`[SSH] Auth failed for user ${username}`);
});
```

##### `getVfs(): VirtualFileSystem | null`

Returns the virtual filesystem instance. Null if server not started.

```typescript
const vfs = ssh.getVfs();
if (vfs) {
	const content = vfs.readFile("/etc/hosts");
}
```

##### `getUsers(): VirtualUserManager | null`

Returns the user manager instance. Null if server not started.

```typescript
const users = ssh.getUsers();
const sessions = users.listActiveSessions();
```

##### `getHostname(): string`

Returns configured server hostname.

```typescript
console.log(`Server name: ${ssh.getHostname()}`);
```

---

### SftpMimic (SFTP Server)

SFTP server class, exported as `VirtualSftpServer` in the package entrypoint. It can run with a shared `VirtualShell` (recommended) or with explicit `vfs + users` dependencies.

#### Constructor

```typescript
new SftpMimic(options: {
	port: number;
	hostname?: string;
	shell?: VirtualShell;
	vfs?: VirtualFileSystem;
	users?: VirtualUserManager;
})
```

- If `shell` is provided, SFTP reuses the same users/filesystem state as SSH.
- If `shell` is omitted, pass `vfs` and `users` explicitly.

#### Methods

##### `async start(): Promise<number>`

Starts the SFTP server and returns the bound port (useful with `port: 0`).

```typescript
const sftp = new SftpMimic({ port: 0, shell });
const boundPort = await sftp.start();
console.log(`SFTP listening on ${boundPort}`);
```

##### `stop(): void`

Stops the SFTP server.

```typescript
sftp.stop();
```

#### Behavior Notes

- Supports `password` and `keyboard-interactive` authentication.
- Resolves relative SFTP paths from `/home/<user>`.
- Confines all SFTP operations to `/home/<user>` and blocks traversal attempts outside the user home.
- Unsupported operations (`READLINK`, `SYMLINK`) return `OP_UNSUPPORTED`.

#### Events

`SftpMimic` extends `EventEmitter` and emits the following events:

| Event | Data | Description |
|-------|------|-------------|
| `start` | `{ port: number }` | SFTP server started and listening |
| `stop` | — | SFTP server stopped |
| `auth:success` | `{ username: string; remoteAddress: string }` | User authenticated for SFTP |
| `auth:failure` | `{ username: string; remoteAddress: string }` | SFTP auth failed for user |
| `client:connect` | — | New SFTP client connected |
| `client:disconnect` | `{ user: string }` | SFTP client disconnected |

**Example:**

```typescript
sftp.on("auth:success", ({ username }) => {
	console.log(`[SFTP] User ${username} authenticated`);
});
```

---

### SshClient (Programmatic Shell API)

Execute shell commands against a `VirtualShell` instance without SSH overhead. Maintains connection state (current working directory) across calls.

#### Constructor

```typescript
new SshClient(shell: VirtualShell, username: string)
```

- **shell**: Parent virtual shell instance
- **username**: User to authenticate as (no password required)

**Example:**

```typescript
const shell = new VirtualShell("typescript-vm");
const client = new SshClient(shell, "alice");
```

#### Methods

##### `async exec(command: string): Promise<CommandResult>`

Raw command execution. Returns structured output.

```typescript
const result = await client.exec("echo hello && exit 42");
console.log(result.stdout);      // "hello"
console.log(result.exitCode);    // 42
```

##### `async ls(path?: string): Promise<CommandResult>`

Lists directory contents. Defaults to current directory.

```typescript
const result = await client.ls("/tmp");
// result.stdout contains formatted listing
```

##### `async pwd(): Promise<CommandResult>`

Prints current working directory.

```typescript
const result = await client.pwd();
console.log("cwd:", result.stdout);  // "/home/alice"
```

##### `async cd(path: string): Promise<CommandResult>`

Changes working directory. Updates internal state on success.

```typescript
const result = await client.cd("/var/log");
// Internal cwd now "/var/log"

const result2 = await client.ls();  // Listed from /var/log
```

##### `async cat(path: string): Promise<CommandResult>`

Reads file content via command.

```typescript
const result = await client.cat("/etc/hostname");
console.log(result.stdout);
```

##### `async mkdir(path: string, recursive?: boolean): Promise<CommandResult>`

Creates directory. Set `recursive=true` for `-p` flag.

```typescript
await client.mkdir("/tmp/nested/dirs", true);
```

##### `async touch(path: string): Promise<CommandResult>`

Creates empty file.

```typescript
await client.touch("/tmp/marker.txt");
```

##### `async rm(path: string, recursive?: boolean): Promise<CommandResult>`

Removes file or directory. Set `recursive=true` for `-r` flag.

```typescript
await client.rm("/tmp/old", true);  // rm -r /tmp/old
```

##### `async readFile(path: string): Promise<CommandResult>`

Reads file content directly from VFS (programmatic, no shell).

```typescript
const result = await client.readFile("/etc/hostname");
console.log(result.stdout);  // File content
if (result.exitCode !== 0) console.error(result.stderr);
```

##### `async writeFile(path: string, content: string): Promise<CommandResult>`

Writes file content directly to VFS (programmatic, no shell).

```typescript
await client.writeFile("/tmp/config.txt", "port=8080\nhost=localhost");
```

##### `async tree(path?: string): Promise<CommandResult>`

Renders ASCII directory tree.

```typescript
const result = await client.tree("/home");
console.log(result.stdout);
```

##### `async whoami(): Promise<CommandResult>`

Shows authenticated user.

```typescript
const result = await client.whoami();
console.log(result.stdout);  // "alice" (or user passed to constructor)
```

##### `async hostname(): Promise<CommandResult>`

Shows server hostname.

```typescript
const result = await client.hostname();
```

##### `async who(): Promise<CommandResult>`

Lists active user sessions.

```typescript
const result = await client.who();
console.log(result.stdout);  // Active sessions
```

##### `getCwd(): string`

Returns current working directory (local state, no I/O).

```typescript
await client.cd("/tmp");
console.log(client.getCwd());  // "/tmp"
```

##### `getUsername(): string`

Returns authenticated username (local state, no I/O).

```typescript
console.log(client.getUsername());  // Username from constructor
```

---

### VirtualShell

Encapsulates shell execution primitives used by the SSH runtime for command dispatch, interactive sessions, and the programmatic client.

#### ShellProperties

```typescript
interface ShellProperties {
	kernel: string;
	os: "Fortune GNU/Linux x64";
	arch: "x86_64";
}

const defaultShellProperties: ShellProperties;
```

- `kernel` is displayed in shell/system information output.
- `os` and `arch` are fixed labels used by the shell runtime.

#### Constructor

```typescript
new VirtualShell(
	hostname: string,
	properties?: ShellProperties,
	basePath?: string,
)
```

- **hostname**: Hostname injected into command context and prompt behavior.
- **properties**: Optional shell metadata. Defaults to `defaultShellProperties`.
- **basePath**: Optional directory used to resolve `.vfs/mirror` and auth storage (defaults to `.`).

**Example:**

```typescript
const shell = new VirtualShell("typescript-vm", {
	kernel: "1.0.0+itsrealfortune+1-amd64",
	os: "Fortune GNU/Linux x64",
	arch: "x86_64",
}, "./data");
```

#### Methods

##### `addCommand(name: string, params: string[], callback: (ctx: CommandContext) => CommandResult | Promise<CommandResult>): void`

Registers a custom command at runtime.

```typescript
shell.addCommand("hello", [], () => ({ stdout: "hello", exitCode: 0 }));
```

##### `executeCommand(rawInput: string, authUser: string, cwd: string): void`

Runs one command input in shell mode for a given user and working directory.

```typescript
shell.executeCommand("ls -la", "root", "/home/root");
```

##### `startInteractiveSession(stream: ShellStream, authUser: string, sessionId: string | null, remoteAddress: string, terminalSize: { cols: number; rows: number }): void`

Starts an interactive shell session over a shell stream.

```typescript
shell.startInteractiveSession(
	stream,
	"root",
	sessionId,
	"127.0.0.1",
	{ cols: 120, rows: 30 },
);
```

#### Events

`VirtualShell` extends `EventEmitter` and emits the following events:

| Event | Data | Description |
|-------|------|-------------|
| `initialized` | — | Shell initialization complete |
| `command` | `{ command: string; user: string; cwd: string }` | Command executed |
| `session:start` | `{ user: string; sessionId: string \| null; remoteAddress: string }` | Interactive session started |

**Example:**

```typescript
shell.on("command", ({ command, user, cwd }) => {
	console.log(`[SHELL] User ${user} executed: ${command} (cwd: ${cwd})`);
});

shell.on("session:start", ({ user, remoteAddress }) => {
	console.log(`[SHELL] Session started for ${user} from ${remoteAddress}`);
});
```

---

### VirtualFileSystem

Virtual filesystem abstraction backed by a mirror directory on disk, with optional gzip compression per file.

#### Constructor

```typescript
new VirtualFileSystem(baseDir?: string)
```

- **baseDir**: Directory used for the `.vfs/mirror` root (default: current working directory)

```typescript
const vfs = new VirtualFileSystem("./container-data");
// Mirror root at ./container-data/.vfs/mirror
```

#### Methods

#### Events

`VirtualFileSystem` extends `EventEmitter` and emits the following events:

| Event | Data | Description |
|-------|------|-------------|
| `file:read` | `{ path: string; size: number }` | File read |
| `file:write` | `{ path: string; size: number }` | File written |
| `dir:create` | `{ path: string; mode: number }` | Directory created |
| `mirror:flush` | — | Mirror persisted to disk |

**Example:**

```typescript
vfs.on("file:write", ({ path, size }) => {
	console.log(`[VFS] File written: ${path} (${size} bytes)`);
});

vfs.on("dir:create", ({ path, mode }) => {
	console.log(`[VFS] Directory created: ${path} (mode: ${mode.toString(8)})`);
});
```

##### `async restoreMirror(): Promise<void>`

Ensures mirror directory structure exists and is ready for operations.

```typescript
await vfs.restoreMirror();
```

##### `async flushMirror(): Promise<void>`

Compatibility hook to finalize mirror boundary operations.

```typescript
// After file modifications...
await vfs.flushMirror();
```

##### `mkdir(path: string, mode?: number): void`

Creates directory and any missing parents. Throws if parent is a file.

```typescript
vfs.mkdir("/home/user/.ssh", 0o700);
```

##### `writeFile(path: string, content: string | Buffer, options?: WriteFileOptions): void`

Writes file content. Creates parent directories if missing.

- **options.mode**: POSIX file mode (default: 0o644)
- **options.compress**: Store as gzip (default: false)

```typescript
vfs.writeFile("/etc/app.conf", "debug=true\n", { compress: true });
```

##### `readFile(path: string): string`

Reads file as UTF-8 string. Transparently decompresses if needed.

```typescript
const content = vfs.readFile("/etc/app.conf");
```

##### `exists(path: string): boolean`

Checks node existence (file or directory).

```typescript
if (!vfs.exists("/var/log")) {
	vfs.mkdir("/var/log");
}
```

##### `stat(path: string): VfsNodeStats`

Returns metadata (type, size, dates, mode, etc.).

```typescript
const stats = vfs.stat("/etc/hostname");
if (stats.type === "file") {
	console.log(`File size: ${stats.size} bytes`);
}
```

##### `list(dirPath?: string): string[]`

Lists child names in directory (sorted). Throws if path not a directory.

```typescript
const files = vfs.list("/home");
// ["alice", "bob", "root"]
```

##### `tree(dirPath?: string): string`

Renders ASCII tree view of directory hierarchy.

```typescript
console.log(vfs.tree("/home"));
```

##### `chmod(path: string, mode: number): void`

Updates file/dir permissions.

```typescript
vfs.chmod("/tmp/script.sh", 0o755);
```

##### `remove(path: string, options?: RemoveOptions): void`

Removes file or directory. Throws if directory not empty unless `recursive: true`.

```typescript
vfs.remove("/tmp/old", { recursive: true });
```

##### `move(fromPath: string, toPath: string): void`

Renames or moves node. Throws if destination exists.

```typescript
vfs.move("/var/tmp", "/var/backup");
```

##### `compressFile(path: string): void`

Gzip-compresses file content and marks as compressed.

```typescript
vfs.compressFile("/var/log/app.log");
```

##### `decompressFile(path: string): void`

Decompresses file content (inverse of `compressFile`).

```typescript
vfs.decompressFile("/var/log/app.log");
```

**Example:**

```typescript
vfs.on("file:write", ({ path, size }) => {
	console.log(`[VFS] File written: ${path} (${size} bytes)`);
});

vfs.on("dir:create", ({ path, mode }) => {
	console.log(`[VFS] Directory created: ${path} (mode: ${mode.toString(8)})`);
});
```

---

### VirtualUserManager

User authentication, password hashing (scrypt), sudo privilege management, and session tracking.

#### Constructor

```typescript
new VirtualUserManager(vfs: VirtualFileSystem, defaultRootPassword?: string, autoSudoForNewUsers?: boolean)
```

- **vfs**: Virtual filesystem (for auth data persistence)
- **defaultRootPassword**: Root password used when root is created (default: "root")
- **autoSudoForNewUsers**: When true, new users are added to sudoers automatically (default: `true` unless `SSH_MIMIC_AUTO_SUDO_NEW_USERS` disables it)

```typescript
const users = new VirtualUserManager(vfs, "SecureRootPass123");
```

#### Methods

##### `async initialize(): Promise<void>`

Loads users/sudoers from disk, ensures root exists, and initializes sessions.

```typescript
await users.initialize();
```

##### `verifyPassword(username: string, password: string): boolean`

Checks plaintext password against hashed record.

```typescript
if (users.verifyPassword("alice", "password123")) {
	console.log("Auth OK");
}
```

##### `async addUser(username: string, password: string): Promise<void>`

Creates new user with home directory.

```typescript
await users.addUser("bob", "bob_password");
// ~/bob created, added to sudoers
```

##### `async deleteUser(username: string): Promise<void>`

Removes user. Cannot delete root.

```typescript
await users.deleteUser("bob");
```

##### `isSudoer(username: string): boolean`

Checks sudo access.


```typescript
if (users.isSudoer("alice")) {
	console.log("alice can use sudo");
}
```

##### `async addSudoer(username: string): Promise<void>`

Grants sudo privileges to user.

```typescript
await users.addSudoer("charlie");
```

##### `async removeSudoer(username: string): Promise<void>`

Revokes sudo privileges. Cannot remove root.

```typescript
await users.removeSudoer("charlie");
```

##### `async setQuotaBytes(username: string, maxBytes: number): Promise<void>`

Sets an optional per-user quota (bytes) for writes under `/home/<username>`.

```typescript
await users.setQuotaBytes("alice", 5 * 1024 * 1024); // 5 MB
```

##### `async clearQuota(username: string): Promise<void>`

Removes quota limit for a user.

```typescript
await users.clearQuota("alice");
```

##### `getQuotaBytes(username: string): number | null`

Returns configured quota in bytes, or `null` if unlimited.

```typescript
console.log(users.getQuotaBytes("alice"));
```

##### `getUsageBytes(username: string): number`

Returns current stored usage in bytes under `/home/<username>`.

```typescript
console.log(users.getUsageBytes("alice"));
```

##### `assertWriteWithinQuota(username: string, targetPath: string, nextContent: string | Buffer): void`

Validates a write operation against quota rules; throws when projected usage exceeds quota.

```typescript
users.assertWriteWithinQuota("alice", "/home/alice/data.txt", "payload");
```

##### `registerSession(username: string, remoteAddress: string): VirtualActiveSession`

Creates active session (called on SSH auth). Returns session descriptor with UUID, tty, start time.

```typescript
const session = users.registerSession("alice", "192.168.1.100");
console.log(session.id);  // UUID
```

##### `unregisterSession(sessionId: string | null): void`

Closes session. Safe to call with null.

```typescript
users.unregisterSession(sessionId);
```

##### `updateSession(sessionId: string | null, username: string, remoteAddress: string): void`

Updates session metadata (used for su/sudo).

```typescript
users.updateSession(sessionId, "root", "192.168.1.100");
```

##### `listActiveSessions(): VirtualActiveSession[]`

Returns snapshot of active sessions (sorted by start time).

```typescript
const sessions = users.listActiveSessions();
sessions.forEach(s => {
	console.log(`${s.username}@${s.remoteAddress} on ${s.tty}`);
});
```

#### Events

`VirtualUserManager` extends `EventEmitter` and emits the following events:

| Event | Data | Description |
|-------|------|-------------|
| `initialized` | — | User manager initialization complete, root user ready |
| `user:add` | `{ username: string }` | New user created |
| `user:delete` | `{ username: string }` | User deleted |
| `session:register` | `{ sessionId: string; username: string; remoteAddress: string }` | Session registered (user logged in) |
| `session:unregister` | `{ sessionId: string; username: string }` | Session unregistered (user logged out) |

**Example:**

```typescript
users.on("user:add", ({ username }) => {
	console.log(`[USERS] User created: ${username}`);
});

users.on("session:register", ({ sessionId, username, remoteAddress }) => {
	console.log(`[USERS] Session ${sessionId}: ${username} from ${remoteAddress}`);
});

users.on("session:unregister", ({ sessionId, username }) => {
	console.log(`[USERS] Session ${sessionId} (${username}) closed`);
});
```

---

### HoneyPot (Auditing & Event Tracking)

Comprehensive security auditing and event tracking utility. Attaches to all core components (VirtualShell, VirtualFileSystem, VirtualUserManager, SshMimic, SftpMimic) to log activity, track statistics, and detect anomalies.

#### Constructor

```typescript
new HoneyPot(maxLogSize?: number)
```

- **maxLogSize**: Maximum audit log entries to retain (default: 10000)

```typescript
const honeypot = new HoneyPot(5000);  // Keep last 5000 audit entries
```

#### Methods

##### `attach(shell: VirtualShell, vfs: VirtualFileSystem, users: VirtualUserManager, ssh?: SshMimic, sftp?: SftpMimic): void`

Attaches honeypot listeners to all provided event emitters. This wires up all audit tracking across the entire virtual environment.

```typescript
honeypot.attach(shell, vfs, users, ssh, sftp);
// All components now emit events to honeypot
```

##### `getAuditLog(type?: string, source?: string): AuditLogEntry[]`

Returns audit log entries with optional filtering by event type or source component.

```typescript
// All entries
const allLogs = honeypot.getAuditLog();

// Only auth events
const authLogs = honeypot.getAuditLog("auth:failure");

// Only SshMimic events
const sshLogs = honeypot.getAuditLog(undefined, "SshMimic");

// Combine filters
const sshAuthLogs = honeypot.getAuditLog("auth:success", "SshMimic");
```

##### `getStats(): Readonly<HoneyPotStats>`

Returns current activity statistics snapshot.

```typescript
const stats = honeypot.getStats();
console.log(`Auth attempts: ${stats.authAttempts}`);
console.log(`Auth successes: ${stats.authSuccesses}`);
console.log(`Auth failures: ${stats.authFailures}`);
console.log(`Commands executed: ${stats.commands}`);
console.log(`File writes: ${stats.fileWrites}`);
console.log(`File reads: ${stats.fileReads}`);
console.log(`Sessions started: ${stats.sessionStarts}`);
console.log(`Sessions ended: ${stats.sessionEnds}`);
console.log(`Users created: ${stats.userCreated}`);
console.log(`Users deleted: ${stats.userDeleted}`);
console.log(`Client connects: ${stats.clientConnects}`);
console.log(`Client disconnects: ${stats.clientDisconnects}`);
```

##### `getRecent(limit?: number): AuditLogEntry[]`

Returns most recent audit entries in reverse chronological order.

```typescript
const last50 = honeypot.getRecent(50);
last50.forEach(entry => {
	console.log(`${entry.timestamp} | ${entry.source} | ${entry.type}`);
	console.log(`Details:`, entry.details);
});
```

##### `detectAnomalies(): Array<{ type: string; severity: "low" | "medium" | "high"; message: string }>`

Analyzes activity patterns and detects potential security issues.

```typescript
const anomalies = honeypot.detectAnomalies();
anomalies.forEach(anomaly => {
	console.log(`[${anomaly.severity.toUpperCase()}] ${anomaly.type}`);
	console.log(`  ${anomaly.message}`);
});
```

Detects:
- High authentication failure rates
- Excessive authentication failures
- Unusual command execution volume
- Unusual file write volume

##### `reset(): void`

Clears audit log and resets all statistics counters.

```typescript
honeypot.reset();  // Fresh start
```

#### Audit Log Entry Structure

```typescript
interface AuditLogEntry {
	timestamp: string;              // ISO-8601 timestamp
	type: string;                   // Event type (e.g., "auth:success", "file:write")
	source: string;                 // Event source component
	details: Record<string, unknown>; // Event-specific data
}
```

#### Example Usage

See [Example 8: Security Auditing with HoneyPot](#example-8-security-auditing-with-honeypot) in Usage Examples.

---

### Demo: Standalone Version

To quickly try out a standalone version of the project, you can use the following command:

```bash
curl -s https://raw.githubusercontent.com/itsrealfortune/typescript-virtual-container/refs/heads/main/standalone.js -o standalone.js && node standalone.js && rm -f standalone.js
```

This will:
1. Download the standalone script.
2. Execute it using Node.js.
3. Clean up by removing the script after execution.

Enjoy exploring the standalone features of the project!

---

### Key Types

#### CommandResult

Response from command execution (shell or programmatic).

```typescript
interface CommandResult {
	stdout?: string;          // Standard output
	stderr?: string;          // Standard error
	exitCode?: number;        // Exit code (default: 0)
	nextCwd?: string;         // Updated cwd (used by cd command)
	clearScreen?: boolean;    // Request terminal clear
	closeSession?: boolean;   // Request session close
	switchUser?: string;      // User change request (su/sudo)
	openEditor?: NanoEditorSession;  // Text editor launch
	openHtop?: boolean;       // System monitor launch
	sudoChallenge?: SudoChallenge;   // Sudo password challenge
}
```

#### VfsNodeStats

File/directory metadata.

```typescript
type VfsNodeStats = VfsFileNode | VfsDirectoryNode;

interface VfsFileNode {
	type: "file";
	name: string;
	path: string;
	mode: number;          // POSIX mode bits
	size: number;          // Byte length
	compressed: boolean;   // Is gzip compressed?
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

#### VirtualActiveSession

Active SSH/programmatic session descriptor.

```typescript
interface VirtualActiveSession {
	id: string;            // UUID
	username: string;
	tty: string;           // e.g., "pts/0"
	remoteAddress: string; // Client IP or label
	startedAt: string;     // ISO-8601 timestamp
}
```

---

## Usage Examples

### Example 1: Basic SSH Server

Minimal server startup that accepts SSH connections:

```typescript
import { VirtualSshServer } from "typescript-virtual-container";

const ssh = new VirtualSshServer({
	port: 2222,
	hostname: "lab-environment"
});

await ssh.start();
console.log("SSH server ready. Connect via: ssh root@localhost -p 2222");

// Keep running (e.g., in cloud deployment)
process.on("SIGINT", () => {
	ssh.stop();
	process.exit(0);
});
```

**External SSH connection:**

```bash
ssh root@localhost -p 2222
# Password: root
# $ whoami
# root
# $
```

---

### Example 2: Programmatic File Operations

Create, read, modify files without SSH:

```typescript
import { VirtualSshServer, SshClient, VirtualShell } from "typescript-virtual-container";

const shell = new VirtualShell("typescript-vm");
const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

const client = new SshClient(shell, "root");

// Create structure
await client.mkdir("/app/config", true);
await client.mkdir("/app/logs", true);

// Write config
await client.writeFile("/app/config/settings.json", JSON.stringify({
	environment: "dev",
	port: 8080,
	debug: true
}, null, 2));

// Read it back
const result = await client.readFile("/app/config/settings.json");
console.log("Config:", result.stdout);

// List directory
const list = await client.ls("/app");
console.log(list.stdout);

// Verify tree
console.log(await client.tree("/app"));

ssh.stop();
```

---

### Example 3: Multi-User Environment

Create users, manage permissions, session tracking:

```typescript
import { VirtualSshServer, SshClient, VirtualShell } from "typescript-virtual-container";

const shell = new VirtualShell("typescript-vm");
const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

const users = ssh.getUsers()!;

// Create users
await users.addUser("alice", "alice123");
await users.addUser("bob", "bob456");
console.log("Created users: alice, bob");

// Grant sudo to alice only
await users.removeSudoer("bob");
await users.addSudoer("alice");

// Alice: High privilege
const alice = new SshClient(shell, "alice");
await alice.writeFile("/etc/important.conf", "secret=yes");

// Bob: Regular user
const bob = new SshClient(shell, "bob");
const result = await bob.cat("/etc/important.conf");
console.log("Bob read file:", result.stderr);

ssh.stop();
```

---

### Example 4: Persistent State

Save filesystem state between runs:

```typescript
import { VirtualSshServer, VirtualShell } from "typescript-virtual-container";

// First run: Initialize
const shell1 = new VirtualShell("typescript-vm", undefined, "./container");
const ssh1 = new VirtualSshServer({ 
	port: 2222,
	shell: shell1 
});
await ssh1.start();
const vfs1 = ssh1.getVfs()!;

vfs1.mkdir("/data", 0o777);
vfs1.writeFile("/data/report.txt", "Baseline data");
await vfs1.flushMirror();
ssh1.stop();

console.log("State available under ./container/.vfs/mirror");

// Later: Reload and continue
const shell2 = new VirtualShell("typescript-vm", undefined, "./container");
const ssh2 = new VirtualSshServer({ 
	port: 2223,
	shell: shell2 
});
await ssh2.start();
const vfs2 = ssh2.getVfs()!;
await vfs2.restoreMirror();

const content = vfs2.readFile("/data/report.txt");
console.log("Restored:", content);

ssh2.stop();
```

---

### Example 5: CI/CD Automation

Simulate filesystem changes and verify outcomes:

```typescript
import { VirtualSshServer, SshClient, VirtualShell } from "typescript-virtual-container";

async function testDeployment() {
	const shell = new VirtualShell("typescript-vm");
	const ssh = new VirtualSshServer({ port: 2222, shell });
	await ssh.start();

	const client = new SshClient(shell, "root");

	// Pre-deployment: Set up base structure
	await client.mkdir("/srv/app", true);
	await client.writeFile("/srv/app/package.json", '{"name":"myapp"}');

	// Simulate deployment: Write new version
	await client.writeFile("/srv/app/app.js", 'console.log("v2.0");');

	// Verify deployment: Read and validate
	const appContent = await client.readFile("/srv/app/app.js");
	if (appContent.stdout.includes("v2.0")) {
		console.log("✓ Deployment verified");
	} else {
		console.error("✗ Deployment failed");
	}

	ssh.stop();
}

testDeployment().catch(console.error);
```

---

### Example 6: Complex Navigation

Simulate shell workflows:

```typescript
import { VirtualSshServer, SshClient, VirtualShell } from "typescript-virtual-container";

const shell = new VirtualShell("typescript-vm");
const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

const client = new SshClient(shell, "root");

// Create nested structure
await client.mkdir("/home/user/projects/myapp/src", true);
await client.cd("/home/user/projects");

console.log(client.getCwd());  // "/home/user/projects"

// Navigate deeper
await client.cd("myapp/src");
console.log(client.getCwd());  // "/home/user/projects/myapp/src"

// Create files in new location
await client.writeFile("main.ts", "export function main() {}");
await client.writeFile("utils.ts", "export function util() {}");

// List current
const srcFiles = await client.ls();
console.log(srcFiles.stdout);  // main.ts, utils.ts

// Navigate up (relative paths)
await client.cd("..");
console.log(client.getCwd());  // "/home/user/projects/myapp"

const appTree = await client.tree();
console.log(appTree.stdout);

ssh.stop();
```

---

### Example 7: Error Handling

Graceful error handling in programmatic workflows:

```typescript
import { VirtualSshServer, SshClient, VirtualShell } from "typescript-virtual-container";

const shell = new VirtualShell("typescript-vm");
const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

const client = new SshClient(shell, "root");

// Try read non-existent file
const result = await client.readFile("/etc/nonexistent.conf");
if (result.exitCode !== 0) {
	console.error("Read error:", result.stderr);
}

// Try change to non-existent directory
const cdResult = await client.cd("/invalid/path");
if (cdResult.exitCode !== 0) {
	console.error("Invalid path");
}

// Try remove root
const rmResult = await client.rm("/", true);
console.log("Remove root:", rmResult.stderr);  // Error

ssh.stop();
```

---

### Example 8: Security Auditing with HoneyPot

Track all system activity, detect anomalies, and maintain security audit logs:

```typescript
import {
	VirtualSshServer,
	VirtualShell,
	SshClient,
	HoneyPot,
} from "typescript-virtual-container";

const shell = new VirtualShell("typescript-vm");
const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

const users = ssh.getUsers()!;
const vfs = ssh.getVfs()!;

// Initialize honeypot with 5000-entry log limit
const honeypot = new HoneyPot(5000);
honeypot.attach(shell, vfs, users, ssh);

// Create users
await users.addUser("alice", "alice123");
await users.addUser("bob", "bob456");

// Simulate activity
const alice = new SshClient(shell, "alice");
await alice.mkdir("/home/alice/projects", true);
await alice.writeFile("/home/alice/projects/app.txt", "My application");
await alice.ls("/home/alice/projects");

const bob = new SshClient(shell, "bob");
// Bob tries invalid operations
await bob.readFile("/etc/shadow");  // Will fail
await bob.writeFile("/etc/passwd", "hacked");  // Will fail

// Collect stats
const stats = honeypot.getStats();
console.log("\n=== Activity Summary ===");
console.log(`Auth attempts: ${stats.authAttempts}`);
console.log(`Auth successes: ${stats.authSuccesses}`);
console.log(`Auth failures: ${stats.authFailures}`);
console.log(`Commands executed: ${stats.commands}`);
console.log(`File writes: ${stats.fileWrites}`);
console.log(`File reads: ${stats.fileReads}`);
console.log(`Sessions active: ${stats.sessionStarts}`);
console.log(`Users created: ${stats.userCreated}`);

// Get recent events
console.log("\n=== Last 5 Events ===");
honeypot.getRecent(5).forEach((entry) => {
	console.log(`[${entry.timestamp}] ${entry.source} -> ${entry.type}`);
	console.log(`  Details: ${JSON.stringify(entry.details, null, 2)}`);
});

// Detect anomalies
console.log("\n=== Security Analysis ===");
const anomalies = honeypot.detectAnomalies();
if (anomalies.length > 0) {
	anomalies.forEach((anomaly) => {
		console.log(
			`[${anomaly.severity.toUpperCase()}] ${anomaly.type}: ${anomaly.message}`,
		);
	});
} else {
	console.log("No anomalies detected");
}

// Filter audit log by event type
console.log("\n=== Auth Failures ===");
const authFailures = honeypot.getAuditLog("auth:failure");
authFailures.forEach((entry) => {
	console.log(
		`  ${entry.details.username} from ${entry.details.remoteAddress}`,
	);
});

// Filter by source component
console.log("\n=== All SSH Events ===");
const sshEvents = honeypot.getAuditLog(undefined, "SshMimic");
console.log(`  Total SSH events: ${sshEvents.length}`);

// Export full audit log (for external storage/analysis)
const fullAuditLog = honeypot.getAuditLog();
console.log(`\nTotal audit entries: ${fullAuditLog.length}`);

// Optional: Reset for next test phase
// honeypot.reset();

ssh.stop();
```

**Output example:**

```
[AUDIT] 2026-04-16T10:30:45.123Z | SshMimic | start { port: 2222 }
[AUDIT] 2026-04-16T10:30:46.234Z | VirtualUserManager | user:add { username: 'alice' }
[AUDIT] 2026-04-16T10:30:47.345Z | VirtualUserManager | user:add { username: 'bob' }
[AUDIT] 2026-04-16T10:30:48.456Z | VirtualShell | command { command: 'mkdir /home/alice/projects', user: 'alice', cwd: '/home/alice' }
[AUDIT] 2026-04-16T10:30:49.567Z | VirtualFileSystem | dir:create { path: '/home/alice/projects', mode: 16877 }
[AUDIT] 2026-04-16T10:30:50.678Z | VirtualShell | command { command: 'writeFile /home/alice/projects/app.txt', user: 'alice', cwd: '/home/alice' }

=== Activity Summary ===
Auth attempts: 2
Auth successes: 2
Auth failures: 0
Commands executed: 8
File writes: 1
File reads: 2
Sessions active: 2
Users created: 2

=== Last 5 Events ===
[2026-04-16T10:30:50.678Z] VirtualShell -> command
  Details: { command: 'ls /home/alice/projects', user: 'alice', cwd: '/home/alice/projects' }

=== Security Analysis ===
No anomalies detected

=== All SSH Events ===
  Total SSH events: 4
```

---

## Built-in Commands

The following commands are currently registered and available in both SSH shell mode and via `SshClient.exec()`. Some flags and edge-case behavior are still being expanded for shell compatibility.

| Command | Purpose | Notes |
|---------|---------|-------|
| `adduser <name> <pass>` | Create user | Root only |
| `cat <path>` | Read file | Displays content |
| `cd <path>` | Change directory | Updates client cwd |
| `clear` | Clear screen | No args |
| `curl <url>` | Fetch URL | Mock implementation |
| `deluser <name>` | Delete user | Root only, not root |
| `echo <text...>` | Print text | Supports shell-like argument output |
| `env` | List environment variables | Shell environment view |
| `exit [code]` | Close session | Optional exit code |
| `export NAME=VALUE` | Set/export environment variable | Persists in shell env |
| `grep <pattern> [path]` | Search for text | Simplified grep behavior |
| `help` | List commands | No args |
| `hostname` | Server hostname | No args |
| `htop` | System monitor | Mock display |
| `pwd` | Print working directory | No args |
| `ls [path]` | List directory | Defaults to `.` |
| `mkdir [-p] <path>` | Create directory | `-p` for parents |
| `nano <path>` | Text editor | Interactive mode |
| `neofetch` | Show system summary | Mock display |
| `touch <path>` | Create empty file | Updates timestamps |
| `rm [-r] <path>` | Remove file/dir | `-r` for recursive |
| `set` | Show shell options/variables | Simplified behavior |
| `sh <script>` | Run shell script | Simplified execution model |
| `su <user>` | Switch user | Requires password/sudo |
| `sudo [-i] <cmd>` | Elevation | Requires sudoer status |
| `tree [path]` | ASCII tree view | Defaults to `.` |
| `unset <name>` | Remove environment variable | Shell environment update |
| `wget <url>` | Download | Mock implementation |
| `who` | Active sessions | No args |
| `whoami` | Current user | No args |

Commands can be added via the VirtualShell addCommand() method for custom behavior.

---

## Configuration

### Environment Variables

- **`SSH_MIMIC_HOSTNAME`**: Override server hostname at startup (default: "typescript-vm")
- **`SSH_MIMIC_AUTO_SUDO_NEW_USERS`**: Control whether new users are added to sudoers automatically (default: enabled). Set to `0`, `false`, `no`, or `off` to disable.

**Note:** By default, no password is set for the root user or any new users during the first initialization. Ensure to configure user passwords manually if required.

**Example:**

```bash
export SSH_MIMIC_HOSTNAME=production-lab
export SSH_MIMIC_AUTO_SUDO_NEW_USERS=false
npm run start
```

### Runtime Options

```typescript
const shell = new VirtualShell("my-container", undefined, "./data");
const ssh = new VirtualSshServer({
	port: 2222,                    // Required
	hostname: "my-container",      // Optional
	shell                          // Optional, prebuilt shell instance
});
```

---

## Performance & Scalability

### Benchmarking

Use the built-in benchmark script to measure initialization and command throughput under concurrent shell loads:

```bash
bun ./benchmark-virtualshell.ts
```

The benchmark reports:

- shell initialization time by concurrency level
- command execution time across all active shells
- RSS memory growth during the run

Recent baseline runs show strong startup behavior up to 100 concurrent shells, and the runtime is designed to scale up to **1000 environments very easily** for testing and automation workloads.

### Concurrency

- SSH server handles multiple concurrent connections (event-driven)
- Programmatic `SshClient` is synchronous (executes sequentially per instance)
- Create multiple client instances for parallel operations
- Horizontal shell instantiation (`new VirtualShell(...)`) is intended for high-volume scenarios, including large test matrices and multi-tenant simulation batches

### Scalability Notes

- Use a dedicated `basePath` per isolated environment to parallelize safely
- Reuse long-lived shell instances when you need low-latency command bursts
- Keep performance logging enabled in development (`DEV_MODE=1` or `RENDER_PERF=1`) to locate hotspots quickly

**Example:**

```typescript
const shell = new VirtualShell("typescript-vm");
const client1 = new SshClient(shell, "alice");
const client2 = new SshClient(shell, "bob");

const [result1, result2] = await Promise.all([
	client1.writeFile("/tmp/alice.txt", "..."),
	client2.writeFile("/tmp/bob.txt", "...")
]);
```

---

## Types & TypeScript

Full TypeScript support with exported types:

```typescript
import type {
	CommandResult,
	VirtualActiveSession,
	VfsNodeStats,
	VfsFileNode,
	VfsDirectoryNode,
	SudoChallenge
} from "typescript-virtual-container";

async function processResult(r: CommandResult) {
	if (r.exitCode === 0 && r.stdout) {
		console.log("Success:", r.stdout);
	} else if (r.stderr) {
		console.error("Error:", r.stderr);
	}
}
```

---

## FAQ

### Is this a real container runtime?

No. It emulates SSH sessions, users, and filesystem behavior in a virtual runtime. It is ideal for testing, simulations, and automation workflows where full OS isolation is not required.

### Can I use this in production?

You can use it in production-like automation contexts (sandboxed command runners, test harnesses, training environments), but it is not a security boundary like a real container/VM. And at the moment, all commands are not implemented with full fidelity, so it may not be suitable for all production use cases.

### Does data persist between restarts?

Yes, when using a stable `basePath`. Files are stored under `.vfs/mirror`.

### Is networking fully implemented for curl/wget?

`curl` and `wget` are command-layer implementations intended for realistic workflows, not full parity with GNU tooling.

### Can I create custom commands?

Yes. Commands are modular and can be extended in the command runtime layer to fit project-specific use cases.

---

## Troubleshooting

### Port Already in Use

```
Error: listen EADDRINUSE :::2222
```

**Solution**: Use a different port

```typescript
const ssh = new VirtualSshServer({ port: 3333 });
```

### SSH Authentication Failed

**Causes**: Server not started, wrong password, SSH client not found

**Solution**:

```typescript
process.env.SSH_MIMIC_ROOT_PASSWORD = "your-password";
await ssh.start();
```

### File Not Found Errors

**Cause**: Directory doesn't exist

**Solution**: Create directories first

```typescript
const vfs = ssh.getVfs();
vfs.mkdir("/home/alice", 0o755);
```

### Filesystem State Not Persisted

**Cause**: `flushMirror()` not called

**Solution**:

```typescript
await ssh.getVfs().flushMirror();
```

---

## Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feat/my-feature`
3. Make changes and add tests
4. Format & lint: `bun format && bun check`
5. Push and open PR

**Code Quality**:
- Biome formatting (opinionated)
- Full TypeScript (no `any`)
- JSDoc comments on public API
- Async/await (no callbacks)

---

## Security

- Passwords are hashed with `scrypt` in the virtual auth store.
- Root account is always protected and cannot be deleted.
- Sudo privileges are explicit and persisted in sudoers data.
- Protect the root password in production by setting `SSH_MIMIC_ROOT_PASSWORD`; otherwise startup logs a generated ephemeral password.
- Disable `SSH_MIMIC_AUTO_SUDO_NEW_USERS` when you want newly created users to stay unprivileged by default.
- This project is not intended to provide kernel-level or process-level isolation.

If you discover a vulnerability, avoid public disclosure in issues and contact maintainers privately first.

---

## Support

- Open an issue for bugs, regressions, or feature requests.
- Include Node/Bun version, package version, and a minimal reproduction.
- For API questions, include the exact command sequence and expected vs actual result.

---

## License

MIT License. See LICENSE file for details.

---

## Roadmap

- [x] Custom command plugin API
- [x] Optional per-user quotas for virtual filesystem usage
- [x] Improved shell compatibility for complex piping and redirection
- [ ] Snapshot diff tooling for test assertions
- [x] Structured event hooks (session open/close, file write, sudo challenge)
- [ ] WebSocket-based remote shell client (experimental)