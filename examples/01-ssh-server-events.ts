/**
 * 01 - SSH Server with Events
 *
 * Demonstrates the full SSH server event lifecycle: start, auth events,
 * connection tracking, lockout, and graceful shutdown.
 */

import { SshClient, VirtualShell, VirtualSshServer } from "../src";

const shell = new VirtualShell("lab-environment");
await shell.ensureInitialized();
await shell.users.setPassword("root", "root");

const ssh = new VirtualSshServer({ port: 0, shell, maxAuthAttempts: 3 });

// ── Register all event listeners ──────────────────────────────────
console.log("--- Register all event listeners ---");
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
console.log("--- Start server ---");
const port = await ssh.start();
console.log(`Server ready on port ${port}`);

// ── Simulate activity via real SSH client ─────────────────────────
console.log("--- Simulate activity via SshClient ---");
const client = new SshClient();
await client.connect({ host: "localhost", port, username: "root", password: "root" });

const result = await client.exec("echo 'Hello from connected client'");
console.log(`Command output: ${result.stdout!.trim()}`);

// ── Demonstrate lockout mechanism ─────────────────────────────────
console.log("--- Demonstrate lockout mechanism ---");
const attackerIp = "10.0.0.99";

ssh.recordAuthFailure(attackerIp);
ssh.recordAuthFailure(attackerIp);
ssh.recordAuthFailure(attackerIp);

console.log(`Admin clears lockout for ${attackerIp}...`);
ssh.clearLockout(attackerIp);
console.log("Lockout cleared");

// ── Graceful shutdown ─────────────────────────────────────────────
console.log("--- Graceful shutdown ---");
client.disconnect();
ssh.stop();
