/**
 * Example 01: SSH Server with Events
 *
 * Demonstrates the full SSH server event lifecycle: start, auth events,
 * connection tracking, lockout, and graceful shutdown.
 */

import { SshClient, VirtualShell, VirtualSshServer } from "../src";

const shell = new VirtualShell("lab-environment");
await shell.ensureInitialized();

const ssh = new VirtualSshServer({ port: 0, shell, maxAuthAttempts: 3 });

// ── Register all event listeners ──────────────────────────────────
ssh.on("start", ({ port }) => {
	console.log(`[EVENT] Server started on port ${port}`);
});

ssh.on("stop", () => {
	console.log("[EVENT] Server stopped");
});

ssh.on("auth:success", ({ username, remoteAddress }) => {
	console.log(`[EVENT] Auth success: ${username}@${remoteAddress}`);
});

ssh.on("auth:failure", ({ username, remoteAddress }) => {
	console.log(`[EVENT] Auth failure: ${username}@${remoteAddress}`);
});

ssh.on("auth:lockout", ({ ip, until }) => {
	console.warn(`[EVENT] Lockout: ${ip} until ${until.toISOString()}`);
});

ssh.on("client:connect", ({ remoteAddress }) => {
	console.log(`[EVENT] Client connected from ${remoteAddress}`);
});

ssh.on("client:disconnect", ({ user }) => {
	console.log(`[EVENT] Client disconnected: ${user ?? "unknown"}`);
});

// ── Start server ──────────────────────────────────────────────────
const port = await ssh.start();
console.log(`\nServer ready on port ${port}\n`);

// ── Simulate activity via SshClient ───────────────────────────────
// SshClient bypasses SSH auth but shares the same VFS/users
const client = new SshClient(shell, "root");

// Simulate a command execution (triggers command events in HoneyPot if attached)
const result = await client.exec("echo 'Hello from connected client'");
console.log(`Command output: ${result.stdout!.trim()}`);

// ── Demonstrate lockout mechanism ─────────────────────────────────
console.log("\n--- Lockout demo ---");
const attackerIp = "10.0.0.99";

// Record auth failures via the public API, simulating brute-force attempts.
// Each call increments the internal counter; at maxAuthAttempts (3) the IP is locked.
ssh.recordAuthFailure(attackerIp);
ssh.recordAuthFailure(attackerIp);
ssh.recordAuthFailure(attackerIp);
// The third failure emits "auth:lockout" automatically

console.log(`\nAdmin clears lockout for ${attackerIp}...`);
ssh.clearLockout(attackerIp);
console.log(`Lockout cleared`);

// ── Graceful shutdown ─────────────────────────────────────────────
ssh.stop();
