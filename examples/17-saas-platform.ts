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

const TENANTS: Tenant[] = [];

const TENANT_CONFIGS = [
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

for (const CONFIG of TENANT_CONFIGS) {
	console.log(`\n--- Tenant: ${CONFIG.id} ---`);

	const BAIE = new Baie(CONFIG.id, CONFIG.subnet);
	const APP_VM = await BAIE.createVM("app");
	const DB_VM = await BAIE.createVM("db");

	APP_VM.vfs.setRamCap(100 * 1024 * 1024);
	APP_VM.users.setCpuCapCores(2);
	DB_VM.vfs.setRamCap(200 * 1024 * 1024);
	DB_VM.users.setCpuCapCores(2);

	APP_VM.users.setPassword("root", "root");
	DB_VM.users.setPassword("root", "root");

	for (const USERNAME of CONFIG.users) {
		APP_VM.users.addUser(USERNAME, "password123");
		DB_VM.users.addUser(USERNAME, "password123");
	}

	const APP_SSH = new VirtualSshServer({ port: 0, shell: APP_VM });
	const DB_SSH = new VirtualSshServer({ port: 0, shell: DB_VM });
	const [APP_PORT, DB_PORT] = await Promise.all([APP_SSH.start(), DB_SSH.start()]);

	const APP_CLIENT = new SshClient();
	await APP_CLIENT.connect({
		host: "localhost",
		port: APP_PORT,
		username: "root",
		password: "root",
	});
	await APP_CLIENT.exec(
		"mkdir -p /app/config /app/logs /app/data && " +
			`echo '{"tenant":"${CONFIG.id}","env":"production"}' > /app/config/app.json && ` +
			"echo 'App initialized' > /app/logs/init.log"
	);
	APP_CLIENT.disconnect();

	const DB_CLIENT = new SshClient();
	await DB_CLIENT.connect({
		host: "localhost",
		port: DB_PORT,
		username: "root",
		password: "root",
	});
	await DB_CLIENT.exec(
		"mkdir -p /var/lib/db /var/log/db && " +
			`echo 'CREATE DATABASE ${CONFIG.id.replace(/-/g, "_")};' > /var/lib/db/init.sql && ` +
			"echo 'Database initialized' > /var/log/db/init.log"
	);
	DB_CLIENT.disconnect();

	TENANTS.push({
		id: CONFIG.id,
		baie: BAIE,
		appVM: APP_VM,
		dbVM: DB_VM,
		appSsh: APP_SSH,
		dbSsh: DB_SSH,
		appPort: APP_PORT,
		dbPort: DB_PORT,
		users: CONFIG.users,
	});
	console.log(
		`  ${CONFIG.id}: ${CONFIG.users.length} users, app+db VMs, app SSH ${APP_PORT}, db SSH ${DB_PORT}`
	);
}

// ── Cross-tenant isolation verification ───────────────────────────
console.log("\n--- Cross-tenant isolation verification ---");

for (let i = 0; i < TENANTS.length; i++) {
	for (let j = 0; j < TENANTS.length; j++) {
		if (i === j) {
			continue;
		}

		const T1 = TENANTS[i]!;
		const T2 = TENANTS[j]!;

		const APP_CLIENT = new SshClient();
		await APP_CLIENT.connect({
			host: "localhost",
			port: T1.appPort,
			username: "root",
			password: "root",
		});
		const RESULT = await APP_CLIENT.exec(
			`nc -z -w 1 ${T2.baie.switch.gateway} 5432 2>&1 || echo "unreachable"`
		);
		APP_CLIENT.disconnect();

		const ISOLATED =
			RESULT.stdout!.includes("unreachable") || RESULT.exitCode !== 0;
		console.log(
			`  ${T1.id} -> ${T2.id}: ${ISOLATED ? "isolated" : "connected"}`
		);
	}
}

// ── Resource usage report ─────────────────────────────────────────
console.log("\n--- Resource usage report ---");
console.log("=".repeat(60));

for (const TENANT of TENANTS) {
	const APP_PROCS = TENANT.appVM.users.listProcesses();
	const DB_PROCS = TENANT.dbVM.users.listProcesses();
	const APP_SWAP = TENANT.appVM.vfs.getSwapStats();
	const APP_CACHE = TENANT.appVM.vfs.getCacheStats();

	console.log(`\n  ${TENANT.id}:`);
	console.log(`    Users: ${TENANT.users.join(", ")}`);
	console.log(`    App VM: ${APP_PROCS.length} processes`);
	console.log(`    DB VM: ${DB_PROCS.length} processes`);
	if (APP_SWAP) {
		console.log(`    Swap: ${APP_SWAP.filesSwapped} files swapped`);
	}
	if (APP_CACHE) {
		console.log(
			`    Cache: ${APP_CACHE.entries} entries, ${APP_CACHE.hitRate.toFixed(0)}% hit rate`
		);
	}
}

// ── Cleanup ───────────────────────────────────────────────────────
console.log("\n--- Cleanup ---");
for (const TENANT of TENANTS) {
	TENANT.appSsh.stop();
	TENANT.dbSsh.stop();
}
console.log("All SSH servers stopped");
