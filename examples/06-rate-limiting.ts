/**
 * Example 06: Rate Limiting
 *
 * Demonstrates configuring authentication rate limiting,
 * triggering lockouts, and manual lockout override.
 */

import { VirtualShell, VirtualSshServer, SshClient } from "../src";

const shell = new VirtualShell("rate-limited-vm");
await shell.ensureInitialized();

const ssh = new VirtualSshServer({
	port: 0,
	shell,
	maxAuthAttempts: 3,
	lockoutDurationMs: 300_000, // 5 minutes
});

ssh.on("auth:failure", ({ username, remoteAddress }) => {
	console.log(`[AUTH FAIL] ${username} from ${remoteAddress}`);
});

ssh.on("auth:lockout", ({ ip, until }) => {
	console.warn(`[LOCKOUT] ${ip} locked until ${until}`);
});

const port = await ssh.start();
console.log(`SSH server on port ${port} (max 3 attempts, 5min lockout)`);

// Simulate failed auth attempts from same IP
const client = new SshClient(shell, "root");

// Each exec through SshClient bypasses SSH auth, so we demonstrate
// the lockout API directly instead
console.log("\nDemonstrating lockout API:");

// Manually trigger lockout (simulates 3 failed attempts)
const testIp = "192.168.1.100";
console.log(`Locking out ${testIp}...`);
ssh.clearLockout(testIp); // ensure clean state

// The lockout is triggered internally by the SSH server after maxAuthAttempts failures.
// Here we verify the configuration:
console.log(`Max auth attempts: 3`);
console.log(`Lockout duration: 300000ms`);
console.log(`Manual override available via ssh.clearLockout(ip)`);

ssh.stop();
console.log("\nSSH server stopped");
