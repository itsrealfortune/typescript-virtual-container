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

const SHELL = new VirtualShell("lab-environment");
await SHELL.ensureInitialized();
SHELL.users.setPassword("root", "root");

const SSH = new VirtualSshServer({ port: 2222, shell: SHELL });

// ── Register all event listeners ──────────────────────────────────
console.log("--- Register all event listeners ---");
SSH.on("start", ({ port }) => {
	console.log(`[EVENT] Server started on port ${port}`);
});

SSH.on("stop", () => {
	console.log("[EVENT] Server stopped");
});

SSH.on("auth:success", ({ username, remoteAddress }) => {
	console.log(`[EVENT] Auth success: ${username}@${remoteAddress}`);
});

SSH.on("auth:failure", ({ username, remoteAddress }) => {
	console.log(`[EVENT] Auth failure: ${username}@${remoteAddress}`);
});

SSH.on("auth:lockout", ({ ip, until }) => {
	console.warn(`[EVENT] Lockout: ${ip} until ${until.toISOString()}`);
});

SSH.on("client:connect", ({ remoteAddress }) => {
	console.log(`[EVENT] Client connected from ${remoteAddress}`);
});

SSH.on("client:disconnect", ({ user }) => {
	console.log(`[EVENT] Client disconnected: ${user ?? "unknown"}`);
});

// ── Start server ──────────────────────────────────────────────────
console.log("--- Start server ---");
const PORT = await SSH.start();
console.log(`Server ready on port ${PORT}`);
console.log("Accepting real SSH connections: ssh root@localhost -p", PORT);

// ── Simulate activity via command runner ──────────────────────────
console.log("--- Simulate activity ---");
const RESULT = await runCommand(
	"echo 'Hello from connected client'",
	"root",
	"lab-environment",
	"exec",
	"/",
	SHELL
);
console.log(`Command output: ${RESULT.stdout?.trim()}`);

// ── Demonstrate lockout mechanism ─────────────────────────────────
console.log("--- Demonstrate lockout mechanism ---");
const ATTACKER_IP = "10.0.0.99";

SSH.recordAuthFailure(ATTACKER_IP);
SSH.recordAuthFailure(ATTACKER_IP);
SSH.recordAuthFailure(ATTACKER_IP);

console.log(`Admin clears lockout for ${ATTACKER_IP}...`);
SSH.clearLockout(ATTACKER_IP);
console.log("Lockout cleared");

// ── Graceful shutdown ─────────────────────────────────────────────
console.log("--- Graceful shutdown ---");
SSH.stop();
