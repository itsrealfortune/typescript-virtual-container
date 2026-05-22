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

// Listen for lockout events
ssh.on("auth:failure", ({ username, remoteAddress }) => {
	console.log(`[AUTH FAIL] ${username} from ${remoteAddress}`);
});

ssh.on("auth:lockout", ({ ip, until }) => {
	console.warn(`[LOCKOUT] ${ip} locked until ${until}`);
});

const port = await ssh.start();
console.log(`SSH server on port ${port} (max 3 attempts, 5min lockout)\n`);

// Simulate lockout by triggering the event directly
// (In production, this fires automatically after maxAuthAttempts failures)
const testIp = "192.168.1.100";
console.log(`Simulating 3 failed auth attempts from ${testIp}...`);
ssh.emit("auth:lockout", { ip: testIp, until: new Date(Date.now() + 300_000) });

console.log(`\n${testIp} is now locked out — further connections will be rejected`);
console.log("Admin overrides the lockout...");
ssh.clearLockout(testIp);
console.log(`Lockout cleared for ${testIp} — connections allowed again`);

ssh.stop();
console.log("\nSSH server stopped");
