/**
 * Example 17: Multi-tenant SaaS platform with isolated environments
 *
 * Real-world scenario: A SaaS provider hosts multiple customers, each
 * with their own isolated network, VMs, user accounts, and resource caps.
 */
import { Baie, SshClient, type VirtualShell, VirtualSshServer } from "../src";

interface Tenant {
	id: string;
	baie: Baie;
	appVM: VirtualShell;
	dbVM: VirtualShell;
	sshServer: VirtualSshServer;
	users: string[];
}

async function setupSaaSPlatform() {
	console.log("🏢 Setting up Multi-Tenant SaaS Platform\n");

	const tenants: Tenant[] = [];

	// ── Provision tenants ─────────────────────────────────────────
	const tenantConfigs = [
		{ id: "acme-corp", subnet: "10.10.1.0/24", users: ["admin", "developer", "analyst"] },
		{ id: "globex-inc", subnet: "10.10.2.0/24", users: ["admin", "engineer"] },
		{ id: "initech", subnet: "10.10.3.0/24", users: ["admin", "devops", "qa", "manager"] },
	];

	for (const config of tenantConfigs) {
		console.log(`\n📦 Provisioning tenant: ${config.id}`);

		const baie = new Baie(config.id, config.subnet);
		const appVM = await baie.createVM("app");
		const dbVM = await baie.createVM("db");

		// Resource caps per tenant
		appVM.vfs.setRamCap(100 * 1024 * 1024); // 100 MB
		appVM.users.setCpuCapCores(2);
		dbVM.vfs.setRamCap(200 * 1024 * 1024); // 200 MB
		dbVM.users.setCpuCapCores(2);

		// Create user accounts
		for (const username of config.users) {
			await appVM.users.addUser(username, "password123");
			await dbVM.users.addUser(username, "password123");
		}

		// Setup application environment
		const appClient = new SshClient(appVM, "root");
		await appClient.exec(
			"mkdir -p /app/config /app/logs /app/data && " +
			`echo '{"tenant":"${config.id}","env":"production"}' > /app/config/app.json && ` +
			"echo 'App initialized' > /app/logs/init.log"
		);

		// Setup database environment
		const dbClient = new SshClient(dbVM, "root");
		await dbClient.exec(
			"mkdir -p /var/lib/db /var/log/db && " +
			`echo 'CREATE DATABASE ${config.id.replace(/-/g, "_")};' > /var/lib/db/init.sql && ` +
			"echo 'Database initialized' > /var/log/db/init.log"
		);

		// Start SSH server for tenant access
		const sshServer = new VirtualSshServer({ port: 0, shell: appVM });
		await sshServer.start();

		tenants.push({ id: config.id, baie, appVM, dbVM, sshServer, users: config.users });
		console.log(`  ✅ ${config.id}: ${config.users.length} users, app+db VMs, SSH on port ${sshServer.port}`);
	}

	// ── Cross-tenant isolation verification ───────────────────────
	console.log("\n🔒 Verifying tenant isolation...");

	for (let i = 0; i < tenants.length; i++) {
		for (let j = 0; j < tenants.length; j++) {
			if (i === j) continue;

			const t1 = tenants[i];
			const t2 = tenants[j];

			// Try to reach tenant2's DB from tenant1's app
			const appClient = new SshClient(t1.appVM, "root");
			const result = await appClient.exec(`nc -z -w 1 ${t2.baie.switch.gateway} 5432 2>&1 || echo "unreachable"`);

			const isolated = result.stdout!.includes("unreachable") || result.exitCode !== 0;
			console.log(`  ${t1.id} → ${t2.id}: ${isolated ? "🔒 isolated" : "⚠️  connected"}`);
		}
	}

	// ── Tenant resource usage report ──────────────────────────────
	console.log("\n📊 Resource Usage Report");
	console.log("=".repeat(60));

	for (const tenant of tenants) {
		const appProcs = tenant.appVM.users.listProcesses();
		const dbProcs = tenant.dbVM.users.listProcesses();
		const appSwap = tenant.appVM.vfs.getSwapStats();
		const appCache = tenant.appVM.vfs.getCacheStats();

		console.log(`\n  ${tenant.id}:`);
		console.log(`    Users: ${tenant.users.join(", ")}`);
		console.log(`    App VM: ${appProcs.length} processes`);
		console.log(`    DB VM: ${dbProcs.length} processes`);
		if (appSwap) console.log(`    Swap: ${appSwap.filesSwapped} files swapped`);
		if (appCache) console.log(`    Cache: ${appCache.entries} entries, ${appCache.hitRate.toFixed(0)}% hit rate`);
	}

	// ── Cleanup ───────────────────────────────────────────────────
	console.log("\n🧹 Cleaning up...");
	for (const tenant of tenants) {
		await tenant.sshServer.stop();
	}
	console.log("All SSH servers stopped");
}

setupSaaSPlatform().catch(console.error);
