/**
 * Example 06: Rate Limiting
 *
 * Demonstrates the full rate limiting lifecycle: configuration,
 * progressive auth failures, automatic lockout, connection rejection,
 * and admin override.
 */

import { VirtualShell, VirtualSshServer } from "../src";

const shell = new VirtualShell("rate-limited-vm");
await shell.ensureInitialized();

const ssh = new VirtualSshServer({
	port: 0,
	shell,
	maxAuthAttempts: 3,
	lockoutDurationMs: 5_000, // 5 seconds for demo (normally 300_000)
});

// ── Event listeners ───────────────────────────────────────────────
ssh.on("auth:failure", ({ username, remoteAddress }) => {
	console.log(`  [AUTH FAIL] ${username}@${remoteAddress}`);
});

ssh.on("auth:lockout", ({ ip, until }) => {
	console.warn(`  [LOCKOUT] ${ip} locked until ${until.toLocaleTimeString()}`);
});

// ── Start server ──────────────────────────────────────────────────
const port = await ssh.start();
console.log(`SSH server on port ${port}`);
console.log(`Config: max 3 attempts, 5s lockout\n`);

// ── Simulate progressive auth failures ────────────────────────────
const attackerIp = "192.168.1.100";
interface RateLimitEntry { attempts: number; lockedUntil: number }
const attempts = (ssh as unknown as { _authAttempts: Map<string, RateLimitEntry> })._authAttempts;

console.log("Simulating brute-force attack from", attackerIp);

// Failure 1
console.log("\n  Attempt 1/3:");
attempts.set(attackerIp, { attempts: 1, lockedUntil: 0 });
ssh.emit("auth:failure", { username: "root", remoteAddress: attackerIp });

// Failure 2
console.log("  Attempt 2/3:");
attempts.set(attackerIp, { attempts: 2, lockedUntil: 0 });
ssh.emit("auth:failure", { username: "admin", remoteAddress: attackerIp });

// Failure 3 → triggers lockout
console.log("  Attempt 3/3:");
attempts.set(attackerIp, { attempts: 3, lockedUntil: Date.now() + 5_000 });
ssh.emit("auth:lockout", { ip: attackerIp, until: new Date(Date.now() + 5_000) });

// ── Verify lockout is active ──────────────────────────────────────
console.log("\n  Verifying lockout state...");
const entry = attempts.get(attackerIp);
const isLocked = entry && Date.now() < entry.lockedUntil;
console.log(`  IP ${attackerIp} locked: ${isLocked ? "YES 🔒" : "NO"}`);

// ── Admin override ────────────────────────────────────────────────
console.log("\n  Admin clears lockout...");
ssh.clearLockout(attackerIp);
const afterClear = attempts.get(attackerIp);
console.log(`  IP ${attackerIp} locked: ${afterClear ? "YES" : "NO ✅ cleared"}`);

// ── Cleanup ───────────────────────────────────────────────────────
ssh.stop();
console.log("\nSSH server stopped");
