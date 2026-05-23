/**
 * 10 - Security Auditing with HoneyPot
 * 
 * Demonstrates attaching HoneyPot to virtual components to log events,
 * track statistics, and detect anomalies.
 */

import { HoneyPot, SshClient, VirtualShell, VirtualSshServer } from "../src";

const shell = new VirtualShell("typescript-vm");
await shell.ensureInitialized();
shell.users.setPassword("root", "root");

// ── Attach HoneyPot ────────────────────────────────────────────────
console.log("--- Attach HoneyPot ---");

const hp = new HoneyPot(5000);
hp.attach(shell, shell.vfs, shell.users);

// ── Start SSH server ──────────────────────────────────────────────
const ssh = new VirtualSshServer({ port: 0, shell });
const port = await ssh.start();

// ── Simulate activity ──────────────────────────────────────────────
console.log("\n--- Simulate activity ---");

const client = new SshClient();
await client.connect({ host: "localhost", port, username: "root", password: "root" });
await client.exec("echo 'secret data' > /etc/secrets.txt");
await client.exec("cat /etc/secrets.txt");
await client.exec("ls -la /tmp");
for (let i = 0; i < 5; i++) {
	await client.exec(`echo "command ${i}"`);
}

// ── Audit statistics ───────────────────────────────────────────────
console.log("\n--- Audit statistics ---");

const stats = hp.getStats();
console.log(`Commands: ${stats.commands}`);
console.log(`File reads: ${stats.fileReads}`);
console.log(`File writes: ${stats.fileWrites}`);

// ── Anomalies ──────────────────────────────────────────────────────
console.log("\n--- Anomalies ---");

const anomalies = hp.detectAnomalies();
if (anomalies.length > 0) {
	for (const a of anomalies) {
		console.log(`[${a.severity.toUpperCase()}] ${a.type}: ${a.message}`);
	}
} else {
	console.log("No anomalies detected");
}

// ── Recent log entries ─────────────────────────────────────────────
console.log("\n--- Recent log entries ---");

const recent = hp.getRecent(3);
for (const entry of recent) {
	console.log(`[${entry.type}] ${entry.source}`);
}

client.disconnect();
ssh.stop();
