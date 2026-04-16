/**
 * HoneyPot Auditing Example
 *
 * Demonstrates how to use the HoneyPot utility to track all activity
 * in a virtual environment, collect statistics, and detect anomalies.
 *
 * Run with: bun run examples/honeypot-audit.ts
 */

import {
    HoneyPot,
    SshClient,
    VirtualShell,
    VirtualSshServer,
} from "../src/index";

async function demonstrateHoneypot() {
	console.log("🍯 HoneyPot Auditing Example\n");

	// Initialize the virtual environment
	const shell = new VirtualShell("security-lab");
	const ssh = new VirtualSshServer({ port: 2222, shell });
	await ssh.start();

	const users = shell.getUsers()!;
	const vfs = shell.getVfs()!;

	// Create HoneyPot instance with 1000-entry log limit
	const honeypot = new HoneyPot(1000);

	// Attach HoneyPot to all components
	honeypot.attach(shell, vfs, users, ssh);

	console.log("✅ HoneyPot attached to all components\n");

	// ------ Scenario 1: Normal user activity ------
	console.log("--- Scenario 1: Normal User Activity ---\n");

	await users.addUser("alice", "alice_pass123");
	await users.addUser("bob", "bob_pass456");

	const alice = new SshClient(shell, "alice");
	await alice.mkdir("/home/alice/work", true);
	await alice.writeFile("/home/alice/work/notes.txt", "Project notes");
	await alice.ls("/home/alice/work");
	await alice.cat("/home/alice/work/notes.txt");

	console.log("✓ Alice performed normal operations\n");

	// ------ Scenario 2: Bob attempts suspicious operations ------
	console.log("--- Scenario 2: Suspicious Attempt ---\n");

	const bob = new SshClient(shell, "bob");
	// These will fail but are tracked
	await bob.readFile("/etc/shadow");
	await bob.readFile("/etc/passwd");
	await bob.readFile("/root/.ssh/id_rsa");

	console.log("✓ Bob attempted unauthorized file access\n");

	// ------ Activity Summary ------
	console.log("--- Activity Summary ---\n");

	const stats = honeypot.getStats();
	console.log("📊 Audit Statistics:");
	console.log(`  • Auth attempts: ${stats.authAttempts}`);
	console.log(`  • Auth successes: ${stats.authSuccesses}`);
	console.log(`  • Auth failures: ${stats.authFailures}`);
	console.log(`  • Commands executed: ${stats.commands}`);
	console.log(`  • File reads: ${stats.fileReads}`);
	console.log(`  • File writes: ${stats.fileWrites}`);
	console.log(`  • Users created: ${stats.userCreated}`);
	console.log(`  • Sessions started: ${stats.sessionStarts}\n`);

	// ------ Recent Events ------
	console.log("--- Most Recent Events ---\n");

	const recent = honeypot.getRecent(10);
	console.log(`📋 Last ${recent.length} events:\n`);
	recent.forEach((entry) => {
		console.log(`  [${entry.timestamp}]`);
		console.log(`  Source: ${entry.source}`);
		console.log(`  Event: ${entry.type}`);
		console.log(`  Details: ${JSON.stringify(entry.details)}\n`);
	});

	// ------ Filtered Audit Log ------
	console.log("--- Filtered Audit Log ---\n");

	const authFailures = honeypot.getAuditLog("auth:failure");
	console.log(`🚨 Auth Failures (${authFailures.length} total):\n`);
	if (authFailures.length > 0) {
		authFailures.forEach((entry) => {
			console.log(
				`  • User "${entry.details.username}" from ${entry.details.remoteAddress}`,
			);
		});
	} else {
		console.log("  • None detected");
	}
	console.log();

	// ------ SSH-specific events ------
	console.log("--- SSH-Specific Events ---\n");

	const sshEvents = honeypot.getAuditLog(undefined, "SshMimic");
	console.log(`🔗 SSH events (${sshEvents.length} total):\n`);
	sshEvents.forEach((entry) => {
		console.log(`  • ${entry.type}: ${JSON.stringify(entry.details)}`);
	});
	console.log();

	// ------ File System Activity ------
	console.log("--- File System Activity ---\n");

	const fileWrites = honeypot.getAuditLog("file:write", "VirtualFileSystem");
	const fileReads = honeypot.getAuditLog("file:read", "VirtualFileSystem");

	console.log(`📁 File Operations:`);
	console.log(`  • File writes: ${fileWrites.length}`);
	fileWrites.forEach((entry) => {
		console.log(`    - ${entry.details.path} (${entry.details.size} bytes)`);
	});
	console.log(`  • File reads: ${fileReads.length}`);
	fileReads.forEach((entry) => {
		console.log(`    - ${entry.details.path} (${entry.details.size} bytes)`);
	});
	console.log();

	// ------ Anomaly Detection ------
	console.log("--- Security Analysis ---\n");

	const anomalies = honeypot.detectAnomalies();
	if (anomalies.length > 0) {
		console.log("⚠️  Anomalies Detected:\n");
		anomalies.forEach((anomaly) => {
			const severity = {
				low: "ℹ️ ",
				medium: "⚠️ ",
				high: "🚨",
			}[anomaly.severity];
			console.log(`  ${severity} [${anomaly.type}]`);
			console.log(`     ${anomaly.message}\n`);
		});
	} else {
		console.log("✅ No anomalies detected\n");
	}

	// ------ Export Audit Log ------
	console.log("--- Full Audit Export ---\n");

	const allAuditEntries = honeypot.getAuditLog();
	console.log(`📊 Total audit entries: ${allAuditEntries.length}`);
	console.log(`💾 Audit log is ready for export/storage\n`);

	// Example export to JSON
	const exportData = {
		timestamp: new Date().toISOString(),
		environment: "security-lab",
		stats,
		auditLog: allAuditEntries.slice(-50), // Last 50 entries
		anomalies,
	};

	console.log("📄 Sample export structure:");
	console.log(`${JSON.stringify(exportData, null, 2).substring(0, 300)}...\n`);

	// Cleanup
	ssh.stop();

	console.log(
		"✅ Example completed! HoneyPot auditing demonstration finished.\n",
	);
}

// Run the example
demonstrateHoneypot().catch((error) => {
	console.error("❌ Error:", error);
	process.exit(1);
});
