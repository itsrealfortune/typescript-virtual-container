/**
 * Example 10: Security Auditing with HoneyPot
 *
 * Demonstrates attaching HoneyPot to virtual components to log events,
 * track statistics, and detect anomalies.
 */

import { HoneyPot, VirtualShell, SshClient } from "../src";

const shell = new VirtualShell("typescript-vm");
await shell.ensureInitialized();

// Attach HoneyPot auditor
const hp = new HoneyPot(5000);
hp.attach(shell, shell.vfs, shell.users);

console.log("HoneyPot attached to shell, VFS, and users\n");

// Simulate activity via SshClient
const client = new SshClient(shell, "root");

// File operations
await client.exec("echo 'secret data' > /etc/secrets.txt");
await client.exec("cat /etc/secrets.txt");
await client.exec("ls -la /tmp");

// Multiple commands
for (let i = 0; i < 5; i++) {
	await client.exec(`echo "command ${i}"`);
}

// Read audit stats
const stats = hp.getStats();
console.log("Audit statistics:");
console.log(`  Commands: ${stats.commands}`);
console.log(`  File reads: ${stats.fileReads}`);
console.log(`  File writes: ${stats.fileWrites}`);

// Check for anomalies
const anomalies = hp.detectAnomalies();
if (anomalies.length > 0) {
	console.log("\nAnomalies detected:");
	for (const a of anomalies) {
		console.log(`  [${a.severity.toUpperCase()}] ${a.type}: ${a.message}`);
	}
} else {
	console.log("\nNo anomalies detected");
}

// Show recent log entries
const recent = hp.getRecent(3);
console.log("\nRecent audit entries:");
for (const entry of recent) {
	console.log(`  [${entry.type}] ${entry.source}`);
}
