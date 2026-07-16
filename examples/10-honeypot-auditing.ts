/**
 * 10 - Security Auditing with HoneyPot
 *
 * Demonstrates attaching HoneyPot to virtual components to log events,
 * track statistics, and detect anomalies.
 */

import { HoneyPot, SshClient, VirtualShell, VirtualSshServer } from "../src";

const SHELL = new VirtualShell("typescript-vm");
await SHELL.ensureInitialized();
SHELL.users.setPassword("root", "root");

// ── Attach HoneyPot ────────────────────────────────────────────────
console.log("--- Attach HoneyPot ---");

const HP = new HoneyPot(5000);
HP.attach(SHELL, SHELL.vfs, SHELL.users);

// ── Start SSH server ──────────────────────────────────────────────
const SSH = new VirtualSshServer({ port: 0, shell: SHELL });
const PORT = await SSH.start();

// ── Simulate activity ──────────────────────────────────────────────
console.log("\n--- Simulate activity ---");

const CLIENT = new SshClient();
await CLIENT.connect({
	host: "localhost",
	port: PORT,
	username: "root",
	password: "root",
});
await CLIENT.exec("echo 'secret data' > /etc/secrets.txt");
await CLIENT.exec("cat /etc/secrets.txt");
await CLIENT.exec("ls -la /tmp");
for (let i = 0; i < 5; i++) {
	await CLIENT.exec(`echo "command ${i}"`);
}

// ── Audit statistics ───────────────────────────────────────────────
console.log("\n--- Audit statistics ---");

const STATS = HP.getStats();
console.log(`Commands: ${STATS.commands}`);
console.log(`File reads: ${STATS.fileReads}`);
console.log(`File writes: ${STATS.fileWrites}`);

// ── Anomalies ──────────────────────────────────────────────────────
console.log("\n--- Anomalies ---");

const ANOMALIES = HP.detectAnomalies();
if (ANOMALIES.length > 0) {
	for (const a of ANOMALIES) {
		console.log(`[${a.severity.toUpperCase()}] ${a.type}: ${a.message}`);
	}
} else {
	console.log("No anomalies detected");
}

// ── Recent log entries ─────────────────────────────────────────────
console.log("\n--- Recent log entries ---");

const RECENT = HP.getRecent(3);
for (const ENTRY of RECENT) {
	console.log(`[${ENTRY.type}] ${ENTRY.source}`);
}

CLIENT.disconnect();
SSH.stop();
