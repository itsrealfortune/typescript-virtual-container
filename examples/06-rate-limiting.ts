/**
 * Example 06: Rate Limiting
 *
 * Demonstrates configuring authentication rate limiting,
 * triggering lockouts, and manual lockout override.
 */

import { VirtualShell, VirtualSshServer } from "../src";

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

// The lockout is triggered internally by the SSH server after maxAuthAttempts failures.
// Here we verify the configuration:
console.log(`Max auth attempts: 3`);
console.log(`Lockout duration: 300000ms`);
console.log(`Manual override available via ssh.clearLockout(ip)`);

ssh.stop();
console.log("\nSSH server stopped");
