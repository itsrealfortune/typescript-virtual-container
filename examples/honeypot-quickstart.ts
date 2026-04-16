/**
 * HoneyPot Quick Start Example
 *
 * A minimal, step-by-step introduction to HoneyPot auditing.
 * Perfect for beginners.
 *
 * Run with: bun run examples/honeypot-quickstart.ts
 */

import {
    HoneyPot,
    SshClient,
    VirtualShell,
    VirtualSshServer,
} from "../src/index";

async function quickStart() {
	console.log("🍯 HoneyPot Quick Start\n");

	// Step 1: Create virtual environment
	console.log("Step 1️⃣  Creating virtual environment...");
	const shell = new VirtualShell("my-lab");
	const ssh = new VirtualSshServer({ port: 2222, shell });
	await ssh.start();

	const users = shell.getUsers()!;
	const vfs = shell.getVfs()!;

	console.log("✅ Environment ready\n");

	// Step 2: Create HoneyPot instance
	console.log("Step 2️⃣  Initializing HoneyPot...");
	const honeypot = new HoneyPot();

	// Step 3: Attach HoneyPot to all components
	console.log("Step 3️⃣  Attaching HoneyPot to components...");
	honeypot.attach(shell, vfs, users, ssh);

	console.log("✅ HoneyPot is now tracking all activity\n");

	// Step 4: Do some work (which will be audited)
	console.log("Step 4️⃣  Performing some operations...\n");

	// Create a user
	await users.addUser("dev_user", "secure_pass");
	console.log("  ✓ Created user 'dev_user'");

	// Create a client
	const client = new SshClient(shell, "dev_user");

	// Create files
	await client.mkdir("/app", true);
	await client.writeFile("/app/config.json", '{"debug":true}');
	await client.readFile("/app/config.json");

	console.log("  ✓ Created /app directory and config.json");
	console.log("  ✓ Read config.json\n");

	// Step 5: Get statistics
	console.log("Step 5️⃣  Viewing activity statistics...\n");
	const stats = honeypot.getStats();
	console.log(`  📊 Commands: ${stats.commands}`);
	console.log(`  📝 File writes: ${stats.fileWrites}`);
	console.log(`  📖 File reads: ${stats.fileReads}`);
	console.log(`  👤 Users created: ${stats.userCreated}\n`);

	// Step 6: Get recent events
	console.log("Step 6️⃣  Last 5 events:\n");
	honeypot.getRecent(5).forEach((entry, idx) => {
		console.log(`  ${idx + 1}. [${entry.source}] ${entry.type}`);
		if (Object.keys(entry.details).length > 0) {
			console.log(`     └─ ${JSON.stringify(entry.details)}`);
		}
	});
	console.log();

	// Step 7: Query filtered logs
	console.log("Step 7️⃣  Querying specific event types...\n");

	const userEvents = honeypot.getAuditLog("user:add");
	console.log(`  👤 User creation events: ${userEvents.length}`);

	const fileEvents = honeypot.getAuditLog(undefined, "VirtualFileSystem");
	console.log(`  📁 VirtualFileSystem events: ${fileEvents.length}\n`);

	// Step 8: Detect anomalies
	console.log("Step 8️⃣  Checking for anomalies...\n");
	const anomalies = honeypot.detectAnomalies();
	if (anomalies.length === 0) {
		console.log("  ✅ No anomalies detected\n");
	} else {
		console.log("  ⚠️  Anomalies found:");
		anomalies.forEach((a) => {
			console.log(`     • ${a.message}`);
		});
		console.log();
	}

	// Step 9: Export audit data (for storage/analysis)
	console.log("Step 9️⃣  Exporting audit log...\n");
	const fullLog = honeypot.getAuditLog();
	console.log(`  ✓ Exported ${fullLog.length} audit entries`);
	console.log(`  ✓ Ready to store in database, file, or monitoring system\n`);

	// Cleanup
	ssh.stop();
	console.log("✅ Example complete!");
}

quickStart().catch(console.error);
