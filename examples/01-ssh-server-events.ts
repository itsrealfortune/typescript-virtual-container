/**
 * 01 - SSH Server with Events
 *
 * Demonstrates the full SSH server event lifecycle: start, auth events,
 * connection tracking, lockout, and graceful shutdown.
 *
 * The SSH server started here accepts real SSH connections — test it manually:
 *   ssh root@localhost -p 2222
 */

import { runCommand } from "../src/commands/index";
import { SshMimic as VirtualSshServer } from "../src/modules/SSHMimic/index";
import { VirtualShell } from "../src/modules/VirtualShell/index";

const shell = new VirtualShell("lab-environment");
shell.ensureInitialized();
shell.users.setPassword("root", "root");

const ssh = new VirtualSshServer({ port: 2222, shell });

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
console.log("Accepting real SSH connections: ssh root@localhost -p", port);

// ── Simulate activity via command runner ──────────────────────────
console.log("--- Simulate activity ---");
const result = await runCommand("echo 'Hello from connected client'", "root", "lab-environment", "exec", "/", shell);
console.log(`Command output: ${result.stdout?.trim()}`);

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
ssh.stop();
