/**
 * 06 - Rate Limiting
 *
 * Demonstrates the full rate limiting lifecycle: configuration,
 * progressive auth failures, automatic lockout, connection rejection,
 * and admin override.
 */

import { VirtualShell, VirtualSshServer } from "../src";

const SHELL = new VirtualShell("rate-limited-vm");
await SHELL.ensureInitialized();

const SSH = new VirtualSshServer({
	port: 0,
	shell: SHELL,
	maxAuthAttempts: 3,
	lockoutDurationMs: 5_000,
});

// ── Event listeners ───────────────────────────────────────────────
console.log("--- Event listeners ---");
SSH.on("auth:failure", ({ username, remoteAddress }) => {
	console.log(`  [AUTH FAIL] ${username}@${remoteAddress}`);
});

SSH.on("auth:lockout", ({ ip, until }) => {
	console.warn(`  [LOCKOUT] ${ip} locked until ${until.toLocaleTimeString()}`);
});

// ── Start server ──────────────────────────────────────────────────
console.log("--- Start server ---");
const PORT = await SSH.start();
console.log(`SSH server on port ${PORT}`);
console.log("Config: max 3 attempts, 5s lockout");

// ── Simulate brute-force attack ───────────────────────────────────
console.log("--- Simulate brute-force attack ---");
const ATTACKER_IP = "192.168.1.100";
console.log(`Simulating brute-force attack from ${ATTACKER_IP}`);

console.log("\n  Attempt 1/3:");
SSH.recordAuthFailure(ATTACKER_IP);

console.log("  Attempt 2/3:");
SSH.recordAuthFailure(ATTACKER_IP);

console.log("  Attempt 3/3:");
SSH.recordAuthFailure(ATTACKER_IP);

// ── Admin override ────────────────────────────────────────────────
console.log("--- Admin override ---");
console.log("  Admin clears lockout...");
SSH.clearLockout(ATTACKER_IP);
console.log(`  IP ${ATTACKER_IP} cleared`);

// ── Cleanup ───────────────────────────────────────────────────────
console.log("--- Cleanup ---");
SSH.stop();
console.log("SSH server stopped");
