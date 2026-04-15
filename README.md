# `typescript-virtual-container`

> In-memory SSH server with a virtual filesystem and typed programmatic API for testing, automation, and interactive shell scripting in TypeScript/JavaScript.

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

`typescript-virtual-container` is a lightweight, fully-typed SSH server written in TypeScript that provides:

- **SSH Protocol Support**: Serve SSH connections on any port with password authentication and support for both shell and exec modes.
- **Virtual Filesystem**: In-memory filesystem with optional compression, persistence to disk via tar.gz snapshots, and programmatic access.
- **User Management**: Create, authenticate, and manage virtual users with strict password hashing (scrypt) and sudo-like privilege elevation.
- **Programmatic Shell API**: Execute shell commands and query filesystem state directly from TypeScript without SSH overhead.
- **Built-in Commands**: `ls`, `cd`, `pwd`, `cat`, `mkdir`, `touch`, `rm`, `tree`, `whoami`, `hostname`, `who`, `sudo`, `su`, `adduser`, `deluser`, `nano` (text editor), `curl`, `wget`, and a growing set of additional commands. Not everything is implemented yet, and shell compatibility is still being expanded.
- **Full TypeScript Support**: Complete JSDoc coverage, exported types, and first-class async/await for all operations.

## What This Is / What This Is Not

### What This Is

- A virtual shell runtime written in TypeScript.
- An in-memory environment with its own virtual filesystem, user management, and command runtime.
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
git clone <repo-url>
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
import { VirtualMachine } from "typescript-virtual-container";

// Create server on port 2222
const ssh = new VirtualMachine({ 
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

### Using the Programmatic Client API

```typescript
import { VirtualMachine, SshClient } from "typescript-virtual-container";

const ssh = new VirtualMachine({ port: 2222 });
await ssh.start();

// Create authenticated client for specific user
const client = new SshClient(ssh, "root");

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
│              .vfs/mirror.tar.gz
└──────────────────────────────────┘
``` -->

### Execution Modes

1. **SSH Shell Mode**: Interactive terminal session over SSH with readline, prompt, TTY resizing.
2. **SSH Exec Mode**: Non-interactive command execution (e.g., `ssh user@host "ls -la"`).
3. **Programmatic Mode** (new): Direct TypeScript API via `SshClient`, no SSH protocol overhead.

### Persistence

- Filesystem state saved as gzip-compressed tar archive at `.vfs/mirror.tar.gz`
- Users/passwords stored in virtual paths `/virtual-env-js/.auth/htpasswd` and `/virtual-env-js/.auth/sudoers`
- Manual flush via `VirtualFileSystem.flushMirror()` or automatic on command completion

---

## API Reference

### SshMimic (SSH Server)

Main SSH server class. Manages virtual filesystem, user authentication, and session handlers.

#### Constructor

```typescript
new SshMimic(options: {
	port: number;           // TCP port to bind on localhost
	hostname?: string;      // Virtual hostname (default: "typescript-vm")
	shell?: VirtualShell; // Optional shell properties override
})
```

- `hostname` and `properties` are forwarded to the underlying `VirtualShell` instance.
- If `properties` is omitted, `VirtualShell.defaultShellProperties` is used.

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

### SshClient (Programmatic Shell API)

Execute shell commands as a specific user without SSH overhead. Maintains connection state (current working directory) across calls.

#### Constructor

```typescript
new SshClient(ssh: SshMimic, username: string)
```

- **ssh**: Parent SSH server instance (must be started)
- **username**: User to authenticate as (no password required)

**Example:**

```typescript
const client = new SshClient(ssh, "alice");
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

Encapsulates shell execution primitives used by the SSH runtime for command dispatch and interactive sessions.

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
	vfs: VirtualFileSystem,
	users: VirtualUserManager,
	hostname: string,
	properties?: ShellProperties,
)
```

- **vfs**: Virtual filesystem instance used by shell commands.
- **users**: User manager for authentication/session-aware command behavior.
- **hostname**: Hostname injected into command context and prompt behavior.
- **properties**: Optional shell metadata. Defaults to `defaultShellProperties`.

**Example:**

```typescript
const shell = new VirtualShell(vfs, users, "typescript-vm", {
	kernel: "1.0.0+itsrealfortune+1-amd64",
	os: "Fortune GNU/Linux x64",
	arch: "x86_64",
});
```

#### Methods

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

---

### VirtualFileSystem

In-memory filesystem with optional gzip compression and tar.gz persistence.

#### Constructor

```typescript
new VirtualFileSystem(baseDir?: string)
```

- **baseDir**: Directory to store `.vfs/mirror.tar.gz` snapshot (default: current working directory)

```typescript
const vfs = new VirtualFileSystem("./container-data");
// Snapshot at ./container-data/.vfs/mirror.tar.gz
```

#### Methods

##### `async restoreMirror(): Promise<void>`

Loads filesystem state from disk snapshot. If missing, creates fresh filesystem.

```typescript
await vfs.restoreMirror();
```

##### `async flushMirror(): Promise<void>`

Persists current filesystem state to disk. No-op if nothing changed.

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

---

### VirtualUserManager

User authentication, password hashing (scrypt), sudo privilege management, and session tracking.

#### Constructor

```typescript
new VirtualUserManager(vfs: VirtualFileSystem, defaultRootPassword?: string)
```

- **vfs**: Virtual filesystem (for auth data persistence)
- **defaultRootPassword**: Root password if creating new user (default: "root")

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
import { VirtualMachine } from "typescript-virtual-container";

const ssh = new VirtualMachine({
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
import { VirtualMachine, SshClient } from "typescript-virtual-container";

const ssh = new VirtualMachine({ port: 2222 });
await ssh.start();

const client = new SshClient(ssh, "root");

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
import { VirtualMachine, SshClient } from "typescript-virtual-container";

const ssh = new VirtualMachine({ port: 2222 });
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
const alice = new SshClient(ssh, "alice");
await alice.writeFile("/etc/important.conf", "secret=yes");

// Bob: Regular user
const bob = new SshClient(ssh, "bob");
const result = await bob.cat("/etc/important.conf");
console.log("Bob read file:", result.stderr);

ssh.stop();
```

---

### Example 4: Persistent State

Save filesystem state between runs:

```typescript
import { VirtualMachine } from "typescript-virtual-container";

// First run: Initialize
const ssh1 = new VirtualMachine({ 
	port: 2222,
	basePath: "./container" 
});
await ssh1.start();
const vfs1 = ssh1.getVfs()!;

vfs1.mkdir("/data", 0o777);
vfs1.writeFile("/data/report.txt", "Baseline data");
await vfs1.flushMirror();
ssh1.stop();

console.log("State saved to ./container/.vfs/mirror.tar.gz");

// Later: Reload and continue
const ssh2 = new VirtualMachine({ 
	port: 2223,
	basePath: "./container" 
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
import { VirtualMachine, SshClient } from "typescript-virtual-container";

async function testDeployment() {
	const ssh = new VirtualMachine({ port: 2222 });
	await ssh.start();

	const client = new SshClient(ssh, "root");

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
import { VirtualMachine, SshClient } from "typescript-virtual-container";

const ssh = new VirtualMachine({ port: 2222 });
await ssh.start();

const client = new SshClient(ssh, "root");

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
import { VirtualMachine, SshClient } from "typescript-virtual-container";

const ssh = new VirtualMachine({ port: 2222 });
await ssh.start();

const client = new SshClient(ssh, "root");

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
- **`SSH_MIMIC_ROOT_PASSWORD`**: Set root password. If unset, a random ephemeral password is generated at startup and logged once.
- **`SSH_MIMIC_AUTO_SUDO_NEW_USERS`**: Control whether new users are added to sudoers automatically (default: enabled). Set to `0`, `false`, `no`, or `off` to disable.

**Example:**

```bash
export SSH_MIMIC_HOSTNAME=production-lab
export SSH_MIMIC_ROOT_PASSWORD=SecurePass123
export SSH_MIMIC_AUTO_SUDO_NEW_USERS=false
npm run start
```

### Runtime Options

```typescript
const ssh = new VirtualMachine({
	port: 2222,                    // Required
	hostname: "my-container",      // Optional
	basePath: "./data"             // Optional, default: "."
});
```

---

## Performance & Scalability

### Memory Model

- **In-Memory FS**: Full filesystem tree kept in RAM (no lazy loading)
- **Typical footprint**: ~1-10 MB for 1000 files, increases with file content
- **Compression**: Use `compressFile()` or `compress: true` in `writeFile()` to reduce RAM usage

### Concurrency

- SSH server handles multiple concurrent connections (event-driven)
- Programmatic `SshClient` is synchronous (executes sequentially per instance)
- Create multiple client instances for parallel operations

**Example:**

```typescript
const client1 = new SshClient(ssh, "alice");
const client2 = new SshClient(ssh, "bob");

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

No. It emulates SSH sessions, users, and filesystem behavior in memory. It is ideal for testing, simulations, and automation workflows where full OS isolation is not required.

### Can I use this in production?

You can use it in production-like automation contexts (sandboxed command runners, test harnesses, training environments), but it is not a security boundary like a real container/VM. And at the moment, all commands are not implemented with full fidelity, so it may not be suitable for all production use cases.

### Does data persist between restarts?

Yes, if you call `flushMirror()` and use a stable `basePath`. State is restored from `.vfs/mirror.tar.gz`.

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
const ssh = new VirtualMachine({ port: 3333 });
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

- [ ] Custom command plugin API
- [ ] Optional per-user quotas for virtual filesystem usage
- [ ] Improved shell compatibility for complex piping and redirection
- [ ] Snapshot diff tooling for test assertions
- [ ] Structured event hooks (session open/close, file write, sudo challenge)
- [ ] WebSocket-based remote shell client (experimental)