/**
 * Example 01: SSH Server with Events
 *
 * Demonstrates starting an SSH server, registering event listeners,
 * and verifying server lifecycle.
 */

import { VirtualShell, VirtualSshServer } from "../src";

const shell = new VirtualShell("lab-environment");
await shell.ensureInitialized();

const ssh = new VirtualSshServer({ port: 0, shell, maxAuthAttempts: 3 });

// Register event listeners
ssh.on("auth:success", ({ username, remoteAddress }) => {
	console.log(`[SSH] Auth success: ${username} from ${remoteAddress}`);
});

ssh.on("auth:failure", ({ username, remoteAddress }) => {
	console.log(`[SSH] Auth failure: ${username} from ${remoteAddress}`);
});

ssh.on("auth:lockout", ({ ip, until }) => {
	console.warn(`[SSH] Lockout: ${ip} until ${until}`);
});

ssh.on("client:connect", ({ remoteAddress }) => {
	console.log(`[SSH] Client connected from ${remoteAddress}`);
});

ssh.on("client:disconnect", ({ user }) => {
	console.log(`[SSH] Client disconnected: ${user ?? "unknown"}`);
});

// Start server — port 0 means auto-assign
const port = await ssh.start();
console.log(`SSH server started on port ${port}`);
console.log(`Hostname: ${shell.hostname}`);
console.log(`Max auth attempts: 3`);
console.log(`Event listeners registered: auth:success, auth:fail, auth:lockout, client:connect, client:disconnect`);

// Server is now accepting connections (e.g. ssh -p ${port} root@localhost)
ssh.stop();
console.log("SSH server stopped");
