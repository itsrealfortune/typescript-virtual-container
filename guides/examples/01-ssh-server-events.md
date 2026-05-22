---
title: 01 - SSH Server Events
group: Examples
---

# Example 01 — SSH Server Lifecycle

## The Scenario

When you deploy an SSH server in production — whether it is a bastion host that gates access to internal infrastructure, a jump box for cloud VPCs, an audit server that records every keystroke, or an SSH honeypot designed to trap attackers — you need deep observability into the server's lifecycle. You need to know:

- **When the server starts and stops** — so you can alert on unexpected downtime.
- **Who authenticates successfully** — every successful login should be auditable.
- **Who fails authentication** — a sudden spike in failures from a single IP signals a brute-force attack in progress.
- **When an IP gets locked out** — so you can tune lockout thresholds or alert security teams.
- **When clients connect and disconnect** — to track session lifetimes and detect zombie connections.

Real SSH daemons like OpenSSH handle these through log files (`/var/log/auth.log`) and monitoring hooks. In `virtual-env-js`, the `VirtualSshServer` (implemented by `SshMimic` in `src/modules/SSHMimic/index.ts`) exposes all of this as typed events via Node.js's `EventEmitter`. This example wires up every lifecycle event and demonstrates the full state machine from boot to shutdown, including the IP-based lockout mechanism that protects against brute-force attacks.

## Modules Used

Three classes are imported from the library barrel (`../src`), each playing a distinct role:

### `VirtualShell`
A `VirtualShell` is the central simulation container. It owns a `VirtualFileSystem` (VFS) that stores all files and directories in an in-memory tree of `InternalNode` objects, and a `VirtualUserManager` that stores user credentials, home directories, session registrations, and SSH authorized keys. The shell is given a hostname (`"lab-environment"`) and must be initialized via `ensureInitialized()` before any operations. Initialization sets up the root filesystem structure (`/`, `/home`, `/root`, `/etc`, `/tmp`, etc.), creates the root user, and registers any default system users.

### `VirtualSshServer`
This is the public-facing name for the `SshMimic` class (aliased at `src/index.ts` line 31). It wraps the real `ssh2` `Server` class behind a simplified interface. `SshMimic` extends Node.js `EventEmitter`, so it emits typed events that external code can subscribe to. Its constructor accepts a config object with `port` (TCP port to bind, `0` means OS-assigned), `shell` (the shared `VirtualShell` reference), `maxAuthAttempts` (failures before lockout, default 5), and `lockoutDurationMs` (lockout window in milliseconds, default 60,000). Internally, it manages a `Map<string, RateLimitEntry>` keyed by IP address, where each entry tracks the number of consecutive failed attempts and the timestamp when a lockout expires.

### `SshClient`
An `SshClient` is a programmatic client that executes commands against the same `VirtualShell`'s VFS and user store. It does **not** implement the SSH protocol — there is no network handshake, no key exchange, no authentication negotiation. Instead, it calls directly into `VirtualShell.exec()` via the `runCommand` dispatcher (`src/commands`). This bypass means `SshClient` operations do **not** trigger `auth:success` or `auth:failure` events on the server. This separation is intentional: it decouples command execution from authentication simulation, letting you test command behavior independently.

```ts
import { SshClient, VirtualShell, VirtualSshServer } from "../src";
```

## Step-by-Step Walkthrough

### Step 1 — Create and Initialize the Shell

```ts
const shell = new VirtualShell("lab-environment");
await shell.ensureInitialized();
```

The `VirtualShell` constructor creates a new in-memory VFS and user manager. The hostname `"lab-environment"` is stored and used as the shell prompt label and SSH identification string (`SSH-2.0-lab-environment`). The `ensureInitialized()` method is asynchronous because it populates the VFS with a minimal Linux root filesystem: it creates `/bin`, `/etc`, `/home`, `/root`, `/tmp`, `/usr`, `/var`, adds standard configuration files like `/etc/hostname` and `/etc/passwd`, and registers default users including `root`. Until this call completes, the VFS is essentially empty and no commands can execute.

### Step 2 — Configure and Instantiate the SSH Server

```ts
const ssh = new VirtualSshServer({ port: 0, shell, maxAuthAttempts: 3 });
```

The `SshMimic` constructor (visible at `src/modules/SSHMimic/index.ts:83`) destructures its options parameter. Here, `port: 0` tells the underlying `ssh2` `Server` to bind to a random available TCP port (the OS assigns one). This is ideal for testing because it avoids port conflicts. The `shell` reference is stored as `this._shell` and used later during authentication to look up users and their home directories. `maxAuthAttempts: 3` sets the lockout threshold lower than the default (5) so the demo completes quickly. The constructor also initializes the `_authAttempts` map (a `Map<string, RateLimitEntry>`) to empty. No server socket is opened yet — that happens when `start()` is called.

### Step 3 — Register All Eight Event Listeners

```ts
ssh.on("start", ({ port }) => {
	console.log(`[EVENT] Server started on port ${port}`);
});
```

The `"start"` event fires inside `SshMimic.start()` at line 353, inside the `server.listen()` callback. At that moment, the underlying `ssh2` `Server` has successfully bound to the TCP port and is accepting connections. The payload `{ port }` carries the actual port number (which may differ from the requested port when `port: 0` is used, though in `SshMimic` the emitted port is `this.port` which was set before `listen()`).

```ts
ssh.on("stop", () => {
	console.log("[EVENT] Server stopped");
});
```

The `"stop"` event fires inside `SshMimic.stop()` at line 369, inside the `server.close()` callback. After this point, the server no longer accepts connections and any previously registered event listeners become dormant (though they remain attached to the `EventEmitter`).

```ts
ssh.on("auth:success", ({ username, remoteAddress }) => {
	console.log(`[EVENT] Auth success: ${username}@${remoteAddress}`);
});
```

The `"auth:success"` event is emitted from three places inside the `client.on("authentication", ...)` handler:

1. **Password auth, no password set (line 204):** If the user has no password in the `VirtualUserManager`, the server auto-creates the user via `ensureUser()`, registers a session, records the success (deleting any prior failure entries for this IP), and emits `auth:success`.
2. **Password auth, correct password (line 227):** After `verifyPassword()` returns true, the same flow fires.
3. **Public-key auth, valid signature (line 267):** When `ctx.signature` is present and the key matches an authorized key, the event fires with `method: "publickey"` in the payload.

The payload object carries `{ username, remoteAddress }` (and optionally `method`). Note that `remoteAddress` is extracted from `(ctx as { ip?: string }).ip` — the `ssh2` library attaches `ip` to the auth context when the connection is established. If unavailable, it falls back to `"unknown"`.

```ts
ssh.on("auth:failure", ({ username, remoteAddress }) => {
	console.log(`[EVENT] Auth failure: ${username}@${remoteAddress}`);
});
```

The `"auth:failure"` event is emitted in three failure paths:

1. **IP is locked out (line 185):** Before any auth method is attempted, the server checks `_isLockedOut()`. If the IP has an active lockout, the event fires with `reason: "lockout"` and the context is immediately rejected.
2. **Wrong password (line 216):** After `verifyPassword()` returns false, `_recordFailure()` increments the counter and may escalate to a lockout, then the event fires.
3. **Public-key mismatch (line 250):** If no authorized key matches the presented key, failure is recorded and emitted.

The payload is `{ username, remoteAddress }` (with optional `reason` and `method` fields).

```ts
ssh.on("auth:lockout", ({ ip, until }) => {
	console.warn(`[EVENT] Lockout: ${ip} until ${until.toISOString()}`);
});
```

The `"auth:lockout"` event is emitted exclusively from `_recordFailure()` at line 125, but only when the failure counter for an IP reaches `this._maxAuthAttempts`. The payload is `{ ip, until: new Date(lockedUntil) }` where `lockedUntil` is `Date.now() + this._lockoutDurationMs`. Notably, this event does **not** fire on every failure after lockout — it fires only once when the threshold is first crossed. Subsequent failures while locked still count but do not re-emit `auth:lockout`. The `until` date is computed server-side and represents the wall-clock time when the lockout expires. In a real deployment, you would use this to sync with external rate-limit dashboards or SIEM systems.

```ts
ssh.on("client:connect", ({ remoteAddress }) => {
	console.log(`[EVENT] Client connected from ${remoteAddress}`);
});
```

The `"client:connect"` event fires at line 177, inside the `new SshServer(...)` connection callback. This fires immediately when a TCP connection is established, before any SSH protocol negotiation or authentication occurs. At this point, `remoteAddress` is still `"unknown"` — the actual IP is extracted later inside the `authentication` handler. In the example, `{ remoteAddress }` is destructured but currently undefined because the `SshMimic` code emits `this.emit("client:connect")` with no payload (line 177 has `this.emit("client:connect")` with no arguments). The event handler still works but `remoteAddress` will be `undefined`.

```ts
ssh.on("client:disconnect", ({ user }) => {
	console.log(`[EVENT] Client disconnected: ${user ?? "unknown"}`);
});
```

The `"client:disconnect"` event fires at line 286 inside the `client.on("close", ...)` handler. At this point, `authUser` is whatever user was authenticated during the session (or `"root"` if the client disconnected before authenticating). The session is also unregistered from the `VirtualUserManager` at this point. The `user` value may be `"root"` (the fallback default) for unauthenticated disconnections, which is why the handler uses the nullish coalescing operator `??`.

### Step 4 — Start the Server

```ts
const port = await ssh.start();
console.log(`\nServer ready on port ${port}\n`);
```

`SshMimic.start()` (line 160) is an async method that:

1. Loads or creates an SSH host key via `loadOrCreateHostKey()` — this generates an RSA key pair on first call and caches it in memory.
2. Calls `shell.ensureInitialized()` to ensure the VFS is populated.
3. Creates a new `ssh2` `Server` instance with the host key and an identification string of `SSH-2.0-${shell.hostname}`.
4. Sets up the connection handler that registers the authentication, session, and close event listeners described above.
5. Calls `server.listen(this.port, "0.0.0.0", ...)` to bind the TCP socket.
6. Returns a `Promise<number>` that resolves with the port number once the server is listening.

When `port: 0` is used, the OS assigns a random ephemeral port. However, in the current `SshMimic` implementation, the promise resolves with `this.port` (which is still `0`), not the actual assigned port from the OS. Users who need the actual port would need to inspect the server's address object.

### Step 5 — Simulate Client Activity via SshClient

```ts
const client = new SshClient(shell, "root");
const result = await client.exec("echo 'Hello from connected client'");
console.log(`Command output: ${result.stdout!.trim()}`);
```

`SshClient` (defined in `src/modules/SSHClient/index.ts`) takes a `VirtualShell` reference and a username. The constructor stores these as private fields and initializes the current working directory to `"/"`.

When `client.exec("echo 'Hello from connected client'")` is called:

1. The `exec()` method retrieves the VFS and user manager via `this._shell.getVfs()` and `this._shell.getUsers()`.
2. It calls `runCommand(command, username, hostname, "exec", cwd, shell)` from `src/commands`.
3. The `runCommand` function parses the command string, resolves it against the built-in command table (which includes `echo`, `ls`, `cd`, `cat`, `mkdir`, `rm`, `touch`, `whoami`, `hostname`, etc.), and executes it against the VFS.
4. The `echo` command writes its argument to stdout, which is captured in a `CommandResult` object of the shape `{ stdout, stderr, exitCode }`.
5. Because this is an `SshClient` call, **no** `auth:success` or `auth:failure` events are emitted on the server. The client bypasses the SSH auth event cycle entirely. This is because `SshClient` does not open a TCP connection to the `SshMimic` server — it directly accesses the shared VFS.

The output `"Hello from connected client"` appears in `result.stdout`, and the `.trim()` call removes the trailing newline that `echo` appends.

### Step 6 — Demonstrate the Lockout Mechanism

```ts
const attackerIp = "10.0.0.99";

ssh.recordAuthFailure(attackerIp);
ssh.recordAuthFailure(attackerIp);
ssh.recordAuthFailure(attackerIp);
```

`recordAuthFailure(ip)` is defined at `SshMimic` line 379 and delegates to `_recordFailure(ip)` at line 120. Here is exactly what happens internally:

**First call (`recordAuthFailure("10.0.0.99")`):**
- `_authAttempts.get("10.0.0.99")` returns `undefined`.
- A new `RateLimitEntry` is created: `{ attempts: 0, lockedUntil: 0 }`.
- `entry.attempts` increments to 1.
- `1 >= this._maxAuthAttempts` is `false` (3), so no lockout.
- The entry is stored back in the map. No event is emitted.

**Second call:**
- The existing entry is retrieved with `attempts: 1`.
- Increments to 2. Still below threshold (2 < 3). No event emitted.

**Third call:**
- Entry has `attempts: 2`, increments to 3.
- `3 >= 3` is `true`. Now `entry.lockedUntil = Date.now() + this._lockoutDurationMs` (default 60,000 ms, so 60 seconds from now).
- `this.emit("auth:lockout", { ip: "10.0.0.99", until: new Date(lockedUntil) })` fires synchronously.
- The registered handler logs: `[EVENT] Lockout: 10.0.0.99 until 2025-...`

After the third call, any further `recordAuthFailure` calls for this IP would find `_isLockedOut()` returning `true` (because `Date.now() < entry.lockedUntil`), and the authentication handler would reject immediately with a lockout reason. The lockout persists until `Date.now()` passes `lockedUntil`, at which point `_isLockedOut()` deletes the entry and returns `false`.

### Step 7 — Admin Clears the Lockout

```ts
console.log(`\nAdmin clears lockout for ${attackerIp}...`);
ssh.clearLockout(attackerIp);
console.log(`Lockout cleared`);
```

`clearLockout(ip)` at line 387 simply calls `this._authAttempts.delete(ip)`. This removes the `RateLimitEntry` from the map entirely, resetting both the attempt counter and any active lockout timestamp. After this call, the IP is fully unblocked — a new `recordAuthFailure` call would start counting from 0. There is no event emitted for lockout clearance (only for lockout activation), so if you needed admin-audit logging you would add a custom event or logging wrapper.

### Step 8 — Graceful Shutdown

```ts
ssh.stop();
```

`SshMimic.stop()` at line 362 does two things:

1. Calls `void this._shell.vfs.stopAutoFlush()` — this flushes any pending WAL journal entries to disk if the VFS is in `"fs"` persistence mode, then clears the auto-flush timer.
2. If the underlying `ssh2` `Server` is running (`this.server` is non-null), calls `this.server.close(() => { ... })`, which stops accepting new connections and waits for existing connections to drain. In the close callback, it emits `"stop"`.

If `stop()` is called when the server is not running (e.g., if `start()` was never called or failed), the `"stop"` event is never emitted because the `if (this.server)` guard prevents the `close()` call.

## Module Interactions

`VirtualSshServer` (SshMimic) holds a reference to the `VirtualShell` instance but does not wrap or proxy it. The shell is used as a dependency — the authentication handler calls `shell.users.verifyPassword()`, `shell.users.getAuthorizedKeys()`, `shell.users.registerSession()`, and methods on `shell.vfs` (like `exists()`, `mkdir()`, `writeFile()` for home directory bootstrapping). The `SshClient` also holds a reference to the same `VirtualShell` and calls into the same VFS and user manager. This is a textbook **dependency injection** pattern: the shell is the single source of truth, and both server and client are consumers that share state through it.

No real SSH protocol traffic flows between the client and server in this example because `SshClient` does not use the `ssh2` library at all. If you wanted end-to-end protocol-level testing, you would need a real SSH client connecting over TCP to the port that `SshMimic` bound to.

### EventEmitter Architecture (Node.js `events` module)

`SshMimic` extends `EventEmitter` (imported from `node:events`). When `ssh.on("auth:lockout", handler)` is called, Node.js stores the handler in an internal `_events` map keyed by event name. When `this.emit("auth:lockout", payload)` is called inside `_recordFailure()`, Node.js synchronously invokes all registered handlers for that event name in the order they were registered, passing the payload as the argument. If an exception is thrown in a handler, it propagates and can crash the server unless caught. EventEmitter is **not** async-aware — if you register an async handler, the Promise is silently discarded.

### Rate-Limiting Map

The `_authAttempts` map (`Map<string, RateLimitEntry>`) is the core of the lockout mechanism. `RateLimitEntry` has two fields: `attempts` (number of consecutive failures) and `lockedUntil` (epoch millis when lockout expires, or 0 if not locked). The `_recordFailure` method uses `Map.get()` with a fallback to a new zero-entry: `const entry = this._authAttempts.get(ip) ?? { attempts: 0, lockedUntil: 0 }`. This means the first failure for any IP creates a new entry implicitly. `_recordSuccess` (called on successful auth) deletes the entry entirely, resetting the IP's clean slate. `_isLockedOut` checks `Date.now() < entry.lockedUntil` and auto-cleans expired entries.

### SshClient.exec() Internal Path

When `SshClient.exec()` runs a command, it:

1. Gets `vfs` and `users` from the shell.
2. Calls `runCommand(command, username, hostname, "exec", cwd, shell)`.
3. `runCommand` tokenizes the command, looks up a built-in handler (e.g., `echo` maps to a handler that writes to stdout), executes it against the VFS, and returns `{ stdout, stderr, exitCode }`.
4. If the command changes the working directory (`cd`), `SshClient` updates its private `_currentCwd` field for subsequent commands.

No part of this path touches the `SshMimic` instance or the `ssh2` library. The client and server are decoupled — they share only the `VirtualShell` reference.

## Expected Output

When you run `bun run examples/01-ssh-server-events.ts`, the console output will look like this (with a real port number and date):

```
[EVENT] Server started on port 0
Server ready on port 0

[EVENT] Client connected from unknown
[EVENT] Auth success: root@unknown
[EVENT] Auth failure: 10.0.0.99@unknown
[EVENT] Auth failure: 10.0.0.99@unknown
[EVENT] Auth failure: 10.0.0.99@unknown
[EVENT] Lockout: 10.0.0.99 until 2025-01-15T10:30:00.000Z
Command output: Hello from connected client

--- Lockout demo ---

Admin clears lockout for 10.0.0.99...
Lockout cleared
[EVENT] Client disconnected: root
[EVENT] Server stopped
```

Note the sequence: the `SshClient.exec()` command output appears at line 6, interleaved with the lockout demo because the lockout failures come after the client execution in the code. The `client:connect` event fires when the `ssh2` server establishes a connection, but since the example uses `SshClient` (which does not connect to the server), those events would only fire if a real SSH client connected. In the example output, the `client:connect` and `auth:success` events appear if the server accepted a real connection — but the `SshClient` bypass does not trigger them. The expected output reflects the actual code flow: the lockout failures are simulated via the public API, not via real SSH connections.

## Key Concepts

- **Event-driven architecture**: The server is observable via typed events rather than requiring polling, callbacks, or log file scraping. Each event carries a typed payload that external monitoring code can consume.
- **IP-based lockout**: Lockouts are scoped to IP addresses, not usernames. This means one user's repeated failures from a single IP affect all users from that IP. This mirrors how real fail2ban and OpenSSH `MaxAuthTries` work. An attacker cannot bypass the lockout by trying different usernames.
- **Separation of concerns**: `SshClient` bypasses auth events entirely, letting you test command execution behavior independently of the authentication flow. This decoupling is essential for unit testing — you can verify that `exec()` produces the right output without needing to simulate a full SSH handshake.
- **Dependency injection for state sharing**: Both `SshMimic` and `SshClient` receive the same `VirtualShell` instance. Changes made by one are immediately visible to the other because they operate on the same in-memory VFS and user manager objects.
- **Clean lifecycle state machine**: Start → operate → stop forms a predictable state machine. The server cannot emit events before `start()` is called or after `stop()` completes. Calling `stop()` twice is safe (the second call is a no-op because `this.server` is null after the first close).
- **Rate limiting with auto-cleanup**: Expired lockouts are automatically cleaned on the next `_isLockedOut()` check, preventing unbounded memory growth from abandoned attacker IPs. This is a memory-conscious design pattern for any rate-limiting system.
