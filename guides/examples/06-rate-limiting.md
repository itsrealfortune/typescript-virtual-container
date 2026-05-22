---
title: 06 - Rate Limiting
group: Examples
---
# Example 06 — Rate Limiting

## The Scenario

Brute-force attacks against SSH are one of the most common automated threats on the internet. Bots scan IPv4 ranges on port 22, trying common username/password combinations (root/admin/test) against every reachable host. A server without rate limiting will eventually be compromised if any account uses a weak password.

Rate limiting is the first line of defense: after N failed authentication attempts from the same IP address within a window, the server temporarily refuses further connections from that IP. This makes brute-force attacks economically infeasible — an attacker would need millions of IP addresses (or wait through lockout periods) to try enough passwords.

This example implements the complete rate-limiting lifecycle in about 60 lines of code:
- Configurable threshold (`maxAuthAttempts`) and lockout duration (`lockoutDurationMs`).
- Automatic lockout when the threshold is crossed.
- Observable events (`auth:failure` and `auth:lockout`) for logging and monitoring.
- Administrative override (`clearLockout`) for recovery when legitimate users are blocked.
- Clean shutdown.

The lockout duration is set to 5 seconds for the demo (so you can see the full cycle in a single terminal session). In production, typical values range from 5 minutes for aggressive protection to 24 hours for high-security environments.

## Modules Used

```ts
import { VirtualShell, VirtualSshServer } from "../src";
```

- **`VirtualShell`** — provides the user database and filesystem. The SSH server needs a shell reference to resolve usernames, check passwords, and execute authenticated commands. Even though this example does not actually authenticate specific users, `VirtualSshServer` requires a `shell` in its constructor.

- **`VirtualSshServer`** — the SSH server simulation that embeds the rate-limiting engine. Its constructor accepts:
  - `port`: TCP port to listen on (use `0` for OS-assigned).
  - `shell`: the `VirtualShell` instance.
  - `maxAuthAttempts`: failed attempt threshold before lockout.
  - `lockoutDurationMs`: how long an IP stays locked (milliseconds).

  Internally, the constructor stores these values and initializes two private `Map`s — one for tracking per-IP failure counts, one for per-IP lockout expiry timestamps.

## Step-by-Step Walkthrough

### 1. Shell and Server Creation

```ts
const shell = new VirtualShell("rate-limited-vm");
await shell.ensureInitialized();

const ssh = new VirtualSshServer({
  port: 0,
  shell,
  maxAuthAttempts: 3,
  lockoutDurationMs: 5_000,
});
```

The shell is initialized with a label (`"rate-limited-vm"`) for identification. The SSH server is configured with:
- `port: 0` — bind to any available port (OS-assigned). This avoids port conflicts and makes the example safe to run in parallel.
- `maxAuthAttempts: 3` — three failures trigger a lockout. In production this would be higher (5–10) to tolerate typos without locking legitimate users, but 3 makes the demo concise.
- `lockoutDurationMs: 5000` — 5 seconds. Production systems typically use 300,000 (5 minutes) or more. The short duration lets you observe the lockout → override → clear cycle without waiting.

Constructor internals:
- `this.failureCounters = new Map<string, number>()` — tracks consecutive failures per IP.
- `this.lockouts = new Map<string, number>()` — tracks lockout expiry timestamps (epoch ms).

### 2. Event Listeners

```ts
ssh.on("auth:failure", ({ username, remoteAddress }) => {
  console.log(`  [AUTH FAIL] ${username}@${remoteAddress}`);
});

ssh.on("auth:lockout", ({ ip, until }) => {
  console.warn(`  [LOCKOUT] ${ip} locked until ${until.toLocaleTimeString()}`);
});
```

Event listeners are registered before starting the server to ensure no events are missed. Two events are consumed:

- **`auth:failure`** — emitted on every failed authentication attempt. The payload includes `username` (the attempted username, `"(unknown)"` in this example since we call `recordAuthFailure` directly without simulating a full auth attempt) and `remoteAddress` (the client IP). A production system would log this to a structured logger, increment a metrics counter (e.g., Prometheus), and possibly feed into an intrusion detection system (IDS).

- **`auth:lockout`** — emitted when an IP crosses the failure threshold and becomes locked. The payload includes `ip` (the locked address) and `until` (a `Date` object representing the lockout expiry). Note the use of `console.warn` instead of `console.log` — warnings are more visible in most logging systems and signal a condition that may require operator attention.

Event listener registration uses the EventEmitter pattern (inherited from `EventEmitter` in Node.js). The server stores listener callbacks in an internal `Map<string, Function[]>`. Multiple listeners can be registered for the same event, and they fire in registration order.

### 3. Server Start

```ts
const port = await ssh.start();
console.log(`SSH server on port ${port}`);
console.log(`Config: max 3 attempts, 5s lockout\n`);
```

`ssh.start()` is async because it may need to perform asynchronous setup (socket binding). It returns the assigned port number (since we used `port: 0`). The configuration summary is printed to confirm the server is live and ready to accept authentication requests.

### 4. Simulating Progressive Auth Failures

```ts
const attackerIp = "192.168.1.100";
console.log("Simulating brute-force attack from", attackerIp);
```

The example simulates a brute-force attack from a single IP address. In a real scenario, this would be an external IP (not RFC 1918 private) — the `192.168.x.x` range is used here as a familiar example.

Each call to `ssh.recordAuthFailure(attackerIp)` simulates an authentication failure from that IP. The internal logic is:

```ts
recordAuthFailure(ip: string): void {
  if (this.isLocked(ip)) return;  // silently reject

  const count = (this.failureCounters.get(ip) ?? 0) + 1;
  this.failureCounters.set(ip, count);
  this.emit("auth:failure", { username: "(unknown)", remoteAddress: ip });

  if (count >= this.maxAuthAttempts) {
    const until = Date.now() + this.lockoutDurationMs;
    this.lockouts.set(ip, until);
    this.emit("auth:lockout", { ip, until: new Date(until) });
  }
}
```

#### Attempt 1

```ts
console.log("\n  Attempt 1/3:");
ssh.recordAuthFailure(attackerIp);
```

- `this.failureCounters.get("192.168.1.100")` returns `undefined` (no prior failures).
- Default to `0`, increment to `1`.
- Set counter to `1`.
- Emit `auth:failure`.
- Check: `1 >= 3`? No. No lockout.

Output: `[AUTH FAIL] (unknown)@192.168.1.100`

#### Attempt 2

```ts
console.log("  Attempt 2/3:");
ssh.recordAuthFailure(attackerIp);
```

- Counter reads `1`, increments to `2`.
- Set counter to `2`.
- Emit `auth:failure`.
- Check: `2 >= 3`? No. No lockout.

Output: `[AUTH FAIL] (unknown)@192.168.1.100`

#### Attempt 3 — Triggers Lockout

```ts
console.log("  Attempt 3/3:");
ssh.recordAuthFailure(attackerIp);
```

- Counter reads `2`, increments to `3`.
- Set counter to `3`.
- Emit `auth:failure`.
- Check: `3 >= 3`? Yes!
- Compute `until = Date.now() + 5000`.
- Store in lockouts map: `this.lockouts.set("192.168.1.100", until)`.
- Emit `auth:lockout` with the expiry time.

Output (both events fire):
```
  [AUTH FAIL] (unknown)@192.168.1.100
  [LOCKOUT] 192.168.1.100 locked until HH:MM:SS
```

After this point, any further calls to `recordAuthFailure` from `192.168.1.100` will hit the `isLocked()` guard at the top and return immediately without incrementing the counter or emitting events. The IP is effectively blocked.

The `isLocked()` check works as follows:

```ts
isLocked(ip: string): boolean {
  const lockoutUntil = this.lockouts.get(ip);
  if (!lockoutUntil) return false;
  if (lockoutUntil > Date.now()) return true;
  // Lockout expired — clean up
  this.lockouts.delete(ip);
  this.failureCounters.delete(ip);
  return false;
}
```

The expiration check uses a simple timestamp comparison. If the lockout window has passed, the lockout auto-clears and the failure counter resets. This means an attacker can try again after the window expires, but at that point the counter starts from zero.

### 5. Administrative Override

```ts
console.log("\n  Admin clears lockout...");
ssh.clearLockout(attackerIp);
console.log(`  IP ${attackerIp} cleared`);
```

`clearLockout` is the administrative back-channel. It deletes the IP from both maps:

```ts
clearLockout(ip: string): void {
  this.lockouts.delete(ip);
  this.failureCounters.delete(ip);
}
```

After this call, the IP is fully unblocked — the lockout timer is gone, and the failure counter is reset. If the attacker resumes, the counter starts again from 0, giving them 3 more attempts before re-lockout.

In a real system, `clearLockout` would be guarded by authentication (only admins can call it) and logged as an auditable event. The example omits those guards for simplicity.

### 6. Server Shutdown

```ts
ssh.stop();
console.log("\nSSH server stopped");
```

`ssh.stop()` shuts down any underlying socket or connection resources and clears internal state. The method is synchronous in this implementation. After stop, the server instance should not be reused — create a new `VirtualSshServer` if you need to restart.

## Module Interactions

`VirtualSshServer` contains the rate-limiting logic internally. It does not delegate to an external module or service. The interaction with `VirtualShell` is minimal — the shell is stored as a reference and used only if a real authentication attempt is processed (which this example does not exercise; it calls `recordAuthFailure` directly instead of going through the full auth flow).

The internal architecture of `VirtualSshServer` relevant to rate limiting:

```
VirtualSshServer
  ├── shell: VirtualShell (injected, used for user lookup)
  ├── maxAuthAttempts: number
  ├── lockoutDurationMs: number
  ├── failureCounters: Map<string, number>
  ├── lockouts: Map<string, number>
  ├── recordAuthFailure(ip)
  ├── clearLockout(ip)
  ├── isLocked(ip) → boolean
  ├── start() → Promise<number>
  └── stop()
```

The rate limiter is tightly coupled to the SSH server — it is not a separate, reusable component. If you needed rate limiting for other protocols (HTTP, SMTP), you would extract the `failureCounters` / `lockouts` / `isLocked` logic into a standalone `RateLimiter` class. The pattern is simple enough to extract easily.

## Under the Hood

### Lockout state machine

An IP address goes through three states:

```
┌──────────┐   recordAuthFailure()    ┌──────────┐
│  CLEAN   │ ──────────────────────→  │ COUNTING │
└──────────┘   (counter < threshold)  └──────────┘
                                              │
                                   counter >= threshold
                                              │
                                              ↓
                                        ┌──────────┐
                                        │  LOCKED  │
                                        └──────────┘
                                              │
                                   clearLockout() or
                                   lockout expires
                                              │
                                              ↓
                                        ┌──────────┐
                                        │  CLEAN   │
                                        └──────────┘
```

- **CLEAN**: No failure counter entry, no lockout entry. `isLocked()` returns `false`.
- **COUNTING**: Failure counter exists but is below threshold. `isLocked()` returns `false`.
- **LOCKED**: Lockout timestamp exists and is in the future. `isLocked()` returns `true`.

Transitions happen on `recordAuthFailure()` (COUNTING → LOCKED) and on `clearLockout()` or timer expiry (LOCKED → CLEAN).

### Race conditions and edge cases

- **Concurrent calls**: `recordAuthFailure` is synchronous — there is no `await` between the get and set of the failure counter. This means concurrent calls from the same IP are not possible in the single-threaded Node.js event loop. No race conditions.

- **Lockout duration zero**: If `lockoutDurationMs` is 0, the lockout expires immediately, effectively disabling it. The `isLocked()` check uses `>`, not `>=`, so `until === Date.now()` is not considered locked.

- **Overflow**: The failure counter is a JavaScript `number` stored in a `Map`. It can grow to `Number.MAX_SAFE_INTEGER` (9 quadrillion) without overflow. In practice, `clearLockout` or timer expiration resets it long before that.

- **Memory leak**: IPs that get locked and never cleared (neither by admin nor by timer expiration) remain in the `lockouts` map indefinitely. In a long-running server with many unique attacker IPs, this could grow unbounded. A production implementation would add a TTL-based cleanup or a fixed-size LRU cache.

### Event timing

The `auth:failure` and `auth:lockout` events are emitted synchronously during the `recordAuthFailure` call. This means:
- Event listeners execute before `recordAuthFailure` returns.
- If a listener throws, the error propagates to the caller of `recordAuthFailure`.
- There is no `setImmediate` or `process.nextTick` deferral — events fire in the same tick.

## Expected Output

```text
SSH server on port X
Config: max 3 attempts, 5s lockout

Simulating brute-force attack from 192.168.1.100

  Attempt 1/3:
  [AUTH FAIL] (unknown)@192.168.1.100
  Attempt 2/3:
  [AUTH FAIL] (unknown)@192.168.1.100
  Attempt 3/3:
  [AUTH FAIL] (unknown)@192.168.1.100
  [LOCKOUT] 192.168.1.100 locked until HH:MM:SS

  Admin clears lockout...
  IP 192.168.1.100 cleared

SSH server stopped
```

The port number `X` varies (OS-assigned). The lockout timestamp `HH:MM:SS` is the current time plus 5 seconds. The exact warning formatting depends on `toLocaleTimeString()` output (varies by locale — en-US shows `HH:MM:SS AM/PM`, en-GB shows `HH:MM:SS`).

## Key Concepts

- **IP-based rate limiting**: The lockout scopes to IP addresses, not usernames. One user's failed attempts cannot lock out another user from a different IP. This is standard for SSH — attackers try many usernames from a single IP, so IP-based locking is more effective than username-based locking.

- **Configurable parameters**: `maxAuthAttempts` and `lockoutDurationMs` are constructor options, making the rate limiter tunable without code changes. Different environments can use different policies: aggressive for internet-facing endpoints, relaxed for internal networks.

- **Event-driven observability**: Every failure and lockout fires an EventEmitter event. This enables decoupled integration with logging (structured logs), metrics (Prometheus counters), alerting (PagerDuty/Slack hooks), and incident response (auto-block at the firewall level).

- **Admin override**: `clearLockout()` provides a back-channel for recovery. This is essential for operational use — legitimate users get locked out accidentally (e.g., a misconfigured client retrying with wrong credentials). Without an override, ops teams would need to restart the server or wait for the timer.

- **Short duration for demo**: Using 5 seconds instead of 5 minutes makes the lockout and clear cycle observable in a single terminal session. The pattern is identical for longer durations — change `lockoutDurationMs` and the behavior is the same, just slower.

- **Server port 0 pattern**: Using `port: 0` lets the OS assign a random available port. This eliminates port conflicts and makes examples safe to run in parallel or in CI where specific ports may not be available.
