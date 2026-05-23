/**
 * 17 - SaaS Platform
 *
 * Demonstrates multi-tenant isolation with separate networks, VMs,
 * user accounts, and resource caps for each customer.
 */

import { Baie, SshClient, type VirtualShell, VirtualSshServer } from "../src";

interface Tenant {
	id: string;
	baie: Baie;
	appVM: VirtualShell;
	dbVM: VirtualShell;
	appSsh: VirtualSshServer;
	dbSsh: VirtualSshServer;
	appPort: number;
	dbPort: number;
	users: string[];
}

// ── Provision tenants ─────────────────────────────────────────────
console.log("--- Provision tenants ---");

const tenants: Tenant[] = [];

const tenantConfigs = [
	{
		id: "acme-corp",
		subnet: "10.10.1.0/24",
		users: ["admin", "developer", "analyst"],
	},
	{ id: "globex-inc", subnet: "10.10.2.0/24", users: ["admin", "engineer"] },
	{
		id: "initech",
		subnet: "10.10.3.0/24",
		users: ["admin", "devops", "qa", "manager"],
	},
];

for (const config of tenantConfigs) {
	console.log(`\n--- Tenant: ${config.id} ---`);

	const baie = new Baie(config.id, config.subnet);
	const appVM = await baie.createVM("app");
	const dbVM = await baie.createVM("db");

	appVM.vfs.setRamCap(100 * 1024 * 1024);
	appVM.users.setCpuCapCores(2);
	dbVM.vfs.setRamCap(200 * 1024 * 1024);
	dbVM.users.setCpuCapCores(2);

	appVM.users.setPassword("root", "root");
	dbVM.users.setPassword("root", "root");

	for (const username of config.users) {
		appVM.users.addUser(username, "password123");
		dbVM.users.addUser(username, "password123");
	}

	const appSsh = new VirtualSshServer({ port: 0, shell: appVM });
	const dbSsh = new VirtualSshServer({ port: 0, shell: dbVM });
	const [appPort, dbPort] = await Promise.all([appSsh.start(), dbSsh.start()]);

	const appClient = new SshClient();
	await appClient.connect({
		host: "localhost",
		port: appPort,
		username: "root",
		password: "root",
	});
	await appClient.exec(
		"mkdir -p /app/config /app/logs /app/data && " +
			`echo '{"tenant":"${config.id}","env":"production"}' > /app/config/app.json && ` +
			"echo 'App initialized' > /app/logs/init.log",
	);
	appClient.disconnect();

	const dbClient = new SshClient();
	await dbClient.connect({
		host: "localhost",
		port: dbPort,
		username: "root",
		password: "root",
	});
	await dbClient.exec(
		"mkdir -p /var/lib/db /var/log/db && " +
			`echo 'CREATE DATABASE ${config.id.replace(/-/g, "_")};' > /var/lib/db/init.sql && ` +
			"echo 'Database initialized' > /var/log/db/init.log",
	);
	dbClient.disconnect();

	tenants.push({
		id: config.id,
		baie,
		appVM,
		dbVM,
		appSsh,
		dbSsh,
		appPort,
		dbPort,
		users: config.users,
	});
	console.log(
		`  ${config.id}: ${config.users.length} users, app+db VMs, app SSH ${appPort}, db SSH ${dbPort}`,
	);
}

// ── Cross-tenant isolation verification ───────────────────────────
console.log("\n--- Cross-tenant isolation verification ---");

for (let i = 0; i < tenants.length; i++) {
	for (let j = 0; j < tenants.length; j++) {
		if (i === j) {
			continue;
		}

		const t1 = tenants[i]!;
		const t2 = tenants[j]!;

		const appClient = new SshClient();
		await appClient.connect({
			host: "localhost",
			port: t1.appPort,
			username: "root",
			password: "root",
		});
		const result = await appClient.exec(
			`nc -z -w 1 ${t2.baie.switch.gateway} 5432 2>&1 || echo "unreachable"`,
		);
		appClient.disconnect();

		const isolated =
			result.stdout!.includes("unreachable") || result.exitCode !== 0;
		console.log(
			`  ${t1.id} -> ${t2.id}: ${isolated ? "isolated" : "connected"}`,
		);
	}
}

// ── Resource usage report ─────────────────────────────────────────
console.log("\n--- Resource usage report ---");
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
	if (appSwap) {
		console.log(`    Swap: ${appSwap.filesSwapped} files swapped`);
	}
	if (appCache) {
		console.log(
			`    Cache: ${appCache.entries} entries, ${appCache.hitRate.toFixed(0)}% hit rate`,
		);
	}
}

// ── Cleanup ───────────────────────────────────────────────────────
console.log("\n--- Cleanup ---");
for (const tenant of tenants) {
	tenant.appSsh.stop();
	tenant.dbSsh.stop();
}
console.log("All SSH servers stopped");
