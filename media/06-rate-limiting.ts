/**
 * 06 - Rate Limiting
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
	lockoutDurationMs: 5_000,
});

// ── Event listeners ───────────────────────────────────────────────
console.log("--- Event listeners ---");
ssh.on("auth:failure", ({ username, remoteAddress }) => {
	console.log(`  [AUTH FAIL] ${username}@${remoteAddress}`);
});

ssh.on("auth:lockout", ({ ip, until }) => {
	console.warn(`  [LOCKOUT] ${ip} locked until ${until.toLocaleTimeString()}`);
});

// ── Start server ──────────────────────────────────────────────────
console.log("--- Start server ---");
const port = await ssh.start();
console.log(`SSH server on port ${port}`);
console.log("Config: max 3 attempts, 5s lockout");

// ── Simulate brute-force attack ───────────────────────────────────
console.log("--- Simulate brute-force attack ---");
const attackerIp = "192.168.1.100";
console.log(`Simulating brute-force attack from ${attackerIp}`);

console.log("\n  Attempt 1/3:");
ssh.recordAuthFailure(attackerIp);

console.log("  Attempt 2/3:");
ssh.recordAuthFailure(attackerIp);

console.log("  Attempt 3/3:");
ssh.recordAuthFailure(attackerIp);

// ── Admin override ────────────────────────────────────────────────
console.log("--- Admin override ---");
console.log("  Admin clears lockout...");
ssh.clearLockout(attackerIp);
console.log(`  IP ${attackerIp} cleared`);

// ── Cleanup ───────────────────────────────────────────────────────
console.log("--- Cleanup ---");
ssh.stop();
console.log("SSH server stopped");
