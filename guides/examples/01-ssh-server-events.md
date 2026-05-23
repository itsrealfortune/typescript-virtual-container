---
title: 01 - SSH Server Events
group: Examples
---

# Example 01 — SSH Server Lifecycle

## The Scenario

When you deploy an SSH server in production — a bastion host, a cloud jump box, an audit server, or a honeypot — you need deep observability into its lifecycle: start/stop, auth successes and failures, lockout events, and client connections.

In `virtual-env-js`, the `VirtualSshServer` (implemented by `SshMimic`) exposes all of this as typed events via Node.js's `EventEmitter`. This example wires up every lifecycle event and demonstrates the IP-based lockout mechanism.

## Modules Used

Three imports from deep paths (the library barrel re-exports these):

### `VirtualShell`
The central simulation container. Owns a `VirtualFileSystem` (VFS) and a `VirtualUserManager`. Given a hostname (`"lab-environment"`) and initialized via `ensureInitialized()` before any operations.

### `VirtualSshServer` (aliased from `SshMimic`)
Wraps the real `ssh2` `Server` class. Extends `EventEmitter` with typed events. Constructor accepts `port`, `shell`, `maxAuthAttempts` (default 5), and `lockoutDurationMs` (default 60,000).

### `runCommand` (from `src/commands`)
A direct command dispatcher that calls into `VirtualShell.exec()`. Bypasses SSH auth events entirely — no `auth:success` or `auth:failure` events are triggered.

```ts
import { runCommand } from "../src/commands/index";
import { SshMimic as VirtualSshServer } from "../src/modules/SSHMimic/index";
import { VirtualShell } from "../src/modules/VirtualShell/index";
```

## Step-by-Step Walkthrough

### Step 1 — Create, Set Password, and Initialize the Shell

```ts
const shell = new VirtualShell("lab-environment");
await shell.ensureInitialized();
shell.users.setPassword("root", "root");
```

The `VirtualShell` constructor creates an in-memory VFS and user manager. `ensureInitialized()` populates the VFS with a minimal Linux root filesystem: `/bin`, `/etc`, `/home`, `/root`, `/tmp`, `/usr`, `/var`, standard config files, and default users including `root`. After init, `setPassword` sets the root password so SSH password auth works.

### Step 2 — Configure and Instantiate the SSH Server

```ts
const ssh = new VirtualSshServer({ port: 2222, shell });
```

`port: 2222` binds to a fixed port — convenient for manual testing via `ssh root@localhost -p 2222`. No `maxAuthAttempts` is set, so it defaults to 5 (the lockout demo uses `recordAuthFailure` directly, which respects the same threshold). The constructor stores `shell` as `this._shell` and initializes an empty `_authAttempts` map. No socket opens until `start()`.

### Step 3 — Register All Eight Event Listeners

```ts
ssh.on("start", ({ port }) => {
	console.log(`[EVENT] Server started on port ${port}`);
});
```

Fires inside `SshMimic.start()` in the `server.listen()` callback. The payload carries the actual port number.

```ts
ssh.on("stop", () => {
	console.log("[EVENT] Server stopped");
});
```

Fires inside `SshMimic.stop()` in the `server.close()` callback. After this, the server no longer accepts connections.

```ts
ssh.on("auth:success", ({ username, remoteAddress }) => {
	console.log(`[EVENT] Auth success: ${username}@${remoteAddress}`);
});
```

Emitted from three paths inside the `client.on("authentication", ...)` handler:

1. **Password auth, no password set:** Auto-creates user, registers session, records success, emits.
2. **Password auth, correct password:** After `verifyPassword()` returns true.
3. **Public-key auth, valid signature:** When `ctx.signature` matches an authorized key.

Payload: `{ username, remoteAddress }`. `remoteAddress` comes from `(ctx as { ip?: string }).ip` — falls back to `"unknown"`.

```ts
ssh.on("auth:failure", ({ username, remoteAddress }) => {
	console.log(`[EVENT] Auth failure: ${username}@${remoteAddress}`);
});
```

Emitted in three failure paths:

1. **IP is locked out:** Before auth, `_isLockedOut()` returns true.
2. **Wrong password:** After `verifyPassword()` returns false.
3. **Public-key mismatch:** No authorized key matches.

Payload: `{ username, remoteAddress }` with optional `reason` and `method`.

```ts
ssh.on("auth:lockout", ({ ip, until }) => {
	console.warn(`[EVENT] Lockout: ${ip} until ${until.toISOString()}`);
});
```

Emitted from `_recordFailure()` only when the failure counter reaches `this._maxAuthAttempts`. Fires once per lockout cycle — subsequent failures while locked do not re-emit.

```ts
ssh.on("client:connect", ({ remoteAddress }) => {
	console.log(`[EVENT] Client connected from ${remoteAddress}`);
});
```

Fires inside the `Server` connection callback, immediately on TCP connection. Currently emitted with no payload (`this.emit("client:connect")` with no arguments), so `remoteAddress` will be `undefined`.

```ts
ssh.on("client:disconnect", ({ user }) => {
	console.log(`[EVENT] Client disconnected: ${user ?? "unknown"}`);
});
```

Fires inside `client.on("close")`. At this point, `authUser` is whatever user was authenticated during the session. Uses `?? "unknown"` for the unauthenticated-disconnection case.

### Step 4 — Start the Server

```ts
const port = await ssh.start();
console.log(`Server ready on port ${port}`);
console.log("Accepting real SSH connections: ssh root@localhost -p", port);
```

`SshMimic.start()`:
1. Loads or creates an SSH host key via `loadOrCreateHostKey()`.
2. Calls `shell.ensureInitialized()`.
3. Creates an `ssh2` `Server` with identification string `SSH-2.0-${hostname}`.
4. Sets up connection, auth, session, and close handlers.
5. Calls `server.listen(this.port, "0.0.0.0", ...)`.
6. Returns a `Promise<number>` with the port.

### Step 5 — Simulate Activity via `runCommand`

```ts
const result = await runCommand(
	"echo 'Hello from connected client'",
	"root", "lab-environment", "exec", "/", shell,
);
console.log(`Command output: ${result.stdout?.trim()}`);
```

`runCommand` (from `src/commands/index.ts`) parses the command string, resolves it against the built-in command table (`echo`, `ls`, `cd`, `cat`, `mkdir`, etc.), and executes it against the VFS directly. Returns `{ stdout, stderr, exitCode }`. Because it bypasses the SSH protocol, **no** `auth:success` or `auth:failure` events fire.

### Step 6 — Demonstrate the Lockout Mechanism

```ts
const attackerIp = "10.0.0.99";

ssh.recordAuthFailure(attackerIp);
ssh.recordAuthFailure(attackerIp);
ssh.recordAuthFailure(attackerIp);
```

`recordAuthFailure(ip)` delegates to `_recordFailure(ip)`:

**Call 1:** `_authAttempts` has no entry. Creates `{ attempts: 0, lockedUntil: 0 }`. Increments to 1. Below threshold (default 5). No event.

**Call 2:** Entry has `attempts: 1`. Increments to 2. Below threshold.

**Call 3:** Entry has `attempts: 2`. Increments to 3. Still below default threshold of 5 — no lockout yet.

After the third call, the demo continues with admin clearing (even though no lockout has occurred yet at the default threshold).

### Step 7 — Admin Clears the Lockout

```ts
console.log(`Admin clears lockout for ${attackerIp}...`);
ssh.clearLockout(attackerIp);
console.log("Lockout cleared");
```

`clearLockout(ip)` calls `this._authAttempts.delete(ip)`, removing the entry entirely.

### Step 8 — Graceful Shutdown

```ts
ssh.stop();
```

`SshMimic.stop()`:
1. Calls `void this._shell.vfs.stopAutoFlush()` to flush WAL journal entries.
2. If the `ssh2` `Server` is running, calls `this.server.close()`, which emits `"stop"` on completion.

## Module Interactions

`VirtualSshServer` holds a `VirtualShell` reference as a dependency — the auth handler calls `shell.users.verifyPassword()`, `shell.users.getAuthorizedKeys()`, `shell.users.registerSession()`, and `shell.vfs` methods. `runCommand` accesses the same shell to execute commands directly. Both operate on shared in-memory state without real SSH traffic between them.

### EventEmitter Architecture

`SshMimic` extends `EventEmitter` from `node:events`. Handlers registered via `.on()` are stored in an internal `_events` map. When `.emit()` is called, Node.js synchronously invokes all handlers in registration order. EventEmitter is not async-aware — async handler promises are silently discarded.

### Rate-Limiting Map

`_authAttempts` is a `Map<string, RateLimitEntry>` with fields `attempts` and `lockedUntil`. `_recordFailure` uses `Map.get()` with fallback to a zero-entry. `_recordSuccess` deletes the entry. `_isLockedOut` checks `Date.now() < entry.lockedUntil` and auto-cleans expired entries.

## Expected Output

```
--- Register all event listeners ---
--- Start server ---
[EVENT] Server started on port 2222
Server ready on port 2222
Accepting real SSH connections: ssh root@localhost -p 2222
--- Simulate activity ---
Command output: Hello from connected client
--- Demonstrate lockout mechanism ---
Admin clears lockout for 10.0.0.99...
Lockout cleared
--- Graceful shutdown ---
[EVENT] Server stopped
```

Note: the example demonstrates the full event API, but `recordAuthFailure` respects the default threshold of 5 — three calls do not trigger a lockout event. The `auth:success`, `auth:failure`, `client:connect`, and `client:disconnect` events only fire during real SSH connections, not during `runCommand` calls.

## Key Concepts

- **Event-driven architecture**: The server is observable via typed events rather than log scraping. Each event carries a typed payload.
- **IP-based lockout**: Lockouts are scoped to IP addresses, not usernames. Mirrors fail2ban and OpenSSH `MaxAuthTries`.
- **Direct command dispatch**: `runCommand` bypasses auth events entirely, letting you test command execution independently from the auth flow.
- **Shared state**: Both `SshMimic` and `runCommand` access the same `VirtualShell` instance. Changes from one are immediately visible to the other.
- **Clean lifecycle**: Start → operate → stop forms a predictable state machine. Calling `stop()` twice is safe.
- **Auto-cleanup**: Expired lockout entries are cleaned on the next `_isLockedOut()` check, preventing unbounded map growth.
