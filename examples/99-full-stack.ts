/**
 * 99 - Full-Stack Infrastructure
 *
 * Comprehensive end-to-end scenario exercising VirtualShell, VFS,
 * user management, network management, package management,
 * VirtualSwitch, VirtualProxy, and IdleManager.
 */

import { VirtualProxy, VirtualShell, VirtualSwitch } from "../src";

// ── Infrastructure — create virtual switch and two VMs ─────────────
console.log("--- Infrastructure ---");
const net = new VirtualSwitch("10.0.100.0/24");

const web = new VirtualShell("web-01");
web.ensureInitialized();
const webPort = net.attach(web, "10.0.100.10");

const db = new VirtualShell("db-01");
db.ensureInitialized();
const dbPort = net.attach(db, "10.0.100.20");

console.log(`  web-01: ${webPort.ip} / ${webPort.mac}`);
console.log(`  db-01:  ${dbPort.ip} / ${dbPort.mac}`);

// ── Per-VM network configuration ──────────────────────────────────
console.log("\n--- Network config ---");
web.network.addInterface({
	name: "eth0", type: "ether", mac: webPort.mac,
	mtu: 1500, ipv4: "10.0.100.10", ipv4Mask: 24, ipv6: "::1", speed: 1000,
});
web.network.setInterfaceState("eth0", "UP");
web.network.addRoute("0.0.0.0/0", "10.0.100.1", "0.0.0.0", "eth0");

db.network.addInterface({
	name: "eth0", type: "ether", mac: dbPort.mac,
	mtu: 1500, ipv4: "10.0.100.20", ipv4Mask: 24, ipv6: "::1", speed: 1000,
});
db.network.setInterfaceState("eth0", "UP");

// ── DNS service discovery (switch-level) ───────────────────────────
console.log("\n--- DNS records ---");
net.addDnsRecord("web-01", "10.0.100.10");
net.addDnsRecord("db-01", "10.0.100.20");

console.log(`  web-01 → ${net.resolveDns("web-01")}`);
console.log(`  db-01  → ${net.resolveDns("db-01")}`);

for (const r of net.listDnsRecords()) {
	console.log(`  DNS: ${r.hostname} → ${r.ip}`);
}

// ── Firewall ──────────────────────────────────────────────────────
console.log("\n--- Firewall rules ---");
web.network.addFirewallRule({ chain: "INPUT", protocol: "tcp", destPort: 22, action: "ACCEPT" });
web.network.addFirewallRule({ chain: "INPUT", protocol: "tcp", destPort: 80, action: "ACCEPT" });
web.network.addFirewallRule({ chain: "INPUT", protocol: "tcp", destPort: 443, action: "ACCEPT" });
web.network.setPolicy("INPUT", "DROP");

db.network.addFirewallRule({ chain: "INPUT", protocol: "tcp", source: "10.0.100.10", destPort: 3306, action: "ACCEPT" });
db.network.setPolicy("INPUT", "DROP");

const routeWebToDb = await net.route({ srcIp: "10.0.100.10", srcMac: webPort.mac, dstIp: "10.0.100.20", protocol: "tcp", dstPort: 3306 });
const routeDbToWeb = await net.route({ srcIp: "10.0.100.20", srcMac: dbPort.mac, dstIp: "10.0.100.10", protocol: "tcp", dstPort: 80 });
console.log(`  web to db:3306 = ${routeWebToDb.action}`);
console.log(`  db to web:80  = ${routeDbToWeb.action}`);

console.log(`  web check MySQL = ${web.network.checkFirewall("INPUT", "tcp", "10.0.100.10", "10.0.100.20", 3306)}`);
console.log(`  db check MySQL  = ${db.network.checkFirewall("INPUT", "tcp", "10.0.100.20", "10.0.100.20", 3306)}`);

// ── Users, groups, sudo, password policies ─────────────────────────
console.log("\n--- Users and groups ---");
web.users.addUser("admin", "s3cret!");
web.users.addUser("developer", "dev-pass");
web.users.addUser("deploy", "deploy-token");

web.users.createGroup("wheel", 1000);
web.users.createGroup("developers", 2000);
web.users.addGroupMember("wheel", "admin");
web.users.addGroupMember("developers", "admin");
web.users.addGroupMember("developers", "developer");

const groups = web.users.getUserAllGroups("admin");
console.log(`  admin groups: ${groups.join(", ")}`);
console.log(`  admin sudoer: ${web.users.isSudoer("admin")}`);
web.users.addSudoer("admin");
console.log(`  admin sudoer after add: ${web.users.isSudoer("admin")}`);

web.users.setPasswordAging("developer", 1, 90, 7, 30);
const aging = web.users.getPasswordAging("developer");
if (aging) {
	console.log(`  developer password: minAge=${aging.minAge}d maxAge=${aging.maxAge}d warn=${aging.warnDays}d`);
}
console.log(`  developer expired: ${web.users.isPasswordExpired("developer")}`);

// ── SSH authorized keys ───────────────────────────────────────────
console.log("\n--- Authorized keys ---");
web.users.addAuthorizedKey("admin", "ssh-ed25519", Buffer.from("AAAAC3NzaC1lZDI1NTE5AAAAI..."));
console.log(`  admin authorized keys: ${web.users.getAuthorizedKeys("admin").length}`);

// ── Sessions and login tracking ───────────────────────────────────
console.log("\n--- Sessions ---");
web.users.registerSession("admin", "10.0.0.1");
web.users.registerSession("developer", "10.0.0.2");
web.users.registerSession("deploy", "10.0.0.3");
console.log(`  active sessions: ${web.users.listActiveSessions().length}`);

web.users.recordLoginFailure("developer", "10.0.99.99");
web.users.recordLoginFailure("developer", "10.0.99.99");
web.users.recordLoginFailure("developer", "10.0.99.99");
console.log(`  developer failures: ${web.users.getLoginFailures("developer")}`);
console.log(`  developer locked: ${web.users.isAccountLockedByFailures("developer")}`);
web.users.resetLoginFailures("developer");

// ── Account locking and expiry ─────────────────────────────────────
console.log("\n--- Account locking ---");
console.log(`  deploy locked: ${web.users.isAccountLocked("deploy")}`);
web.users.lockAccount("deploy");
console.log(`  deploy locked after lock: ${web.users.isAccountLocked("deploy")}`);
web.users.unlockAccount("deploy");

web.users.setAccountExpiry("developer", Math.floor(Date.now() / 1000) + 30 * 86400);
console.log(`  developer password expired: ${web.users.isPasswordExpired("developer")}`);

// ── Quotas ────────────────────────────────────────────────────────
console.log("\n--- Quotas ---");
web.users.setQuotaBytes("developer", 50 * 1024 * 1024);
console.log(`  developer quota: ${web.users.getQuotaBytes("developer")} bytes`);
console.log(`  developer usage: ${web.users.getUsageBytes("developer")} bytes`);

// ── Package management ─────────────────────────────────────────────
console.log("\n--- Package management ---");
web.packageManager.load();
console.log(`  available packages: ${web.packageManager.listAvailable().length}`);

const nginxPkg = web.packageManager.findInRegistry("nginx");
if (nginxPkg) { console.log(`  nginx: ${nginxPkg.version} — ${nginxPkg.description}`); }

const nodePkg = web.packageManager.findInRegistry("node");
if (nodePkg) { console.log(`  node:  ${nodePkg.version} — ${nodePkg.description}`); }

// ── VFS: files, directories, mounts ───────────────────────────────
console.log("\n--- VFS operations ---");
web.vfs.mkdir("/etc/nginx", 0o755);
web.vfs.mkdir("/var/www", 0o755);
web.vfs.mkdir("/var/log", 0o755);

web.vfs.writeFile("/etc/nginx/nginx.conf", "worker_processes auto;\nevents {}\nhttp {\n    include /etc/nginx/sites-enabled/*;\n}\n");
web.vfs.writeFile("/var/www/index.html", "<h1>Hello from web-01</h1>");
web.vfs.writeFile("/var/log/access.log", "");

const conf = web.vfs.readFile("/etc/nginx/nginx.conf");
console.log(`  nginx.conf: ${conf.split("\n").length} lines`);

const wwwStat = web.vfs.stat("/var/www/index.html");
console.log(`  index.html: type=${wwwStat.type}, size=${wwwStat.type === "file" ? wwwStat.size : "N/A"}`);

// ── Content resolvers and VFS hooks ───────────────────────────────
console.log("\n--- VFS resolvers and hooks ---");
web.vfs.registerContentResolver("/var/www", (path) => {
	if (path === "/var/www/status.json") {
		return JSON.stringify({ status: "ok", hostname: "web-01", uptimeMs: Date.now() - web.startTime });
	}
	return null;
});

console.log(`  status.json: ${web.vfs.readFile("/var/www/status.json")}`);

web.vfs.onBeforeWrite("/etc", () => {
	console.log("  (audit: /etc write detected)");
});
web.vfs.writeFile("/etc/test-hook", "should trigger hook");

web.vfs.offBeforeRead("/etc");
web.vfs.offBeforeWrite("/etc");

// ── Process scheduling and monitoring ──────────────────────────────
console.log("\n--- Process scheduler ---");
web.users.enableScheduler();

const pid1 = web.users.registerProcess("admin", "nginx", ["-g", "daemon off;"], "/dev/pts/0");
const pid2 = web.users.registerProcess("developer", "node", ["app.js"], "/dev/pts/1");
const pid3 = web.users.registerProcess("developer", "tail", ["-f", "/var/log/access.log"], "/dev/pts/1");

console.log(`  processes: ${web.users.listProcesses().length}`);

const proc2 = web.users.getProcess(pid2);
if (proc2) { console.log(`  pid ${pid2}: ${proc2.command} (${proc2.username})`); }

web.users.killProcess(pid3, 9);
web.users.unregisterProcess(pid1);
web.users.unregisterProcess(pid2);

const stats = web.users.getSchedulerStats();
if (stats) { console.log(`  scheduler: ${stats.runQueueLength} queued, ${stats.scheduleCount} context switches`); }

// ── Traffic shaping ───────────────────────────────────────────────
console.log("\n--- Traffic shaping ---");
net.setTrafficRule(webPort.mac, {
	vms: [webPort.mac],
	maxBandwidthMbps: 100,
	latencyMs: 5,
	jitterMs: 2,
});

net.addQdiscRule(webPort.mac, {
	interface: "eth0",
	type: "netem",
	latencyMs: 50,
	packetLossPct: 1,
});

console.log(`  traffic rule set for ${webPort.mac}`);
console.log(`  qdisc rules: ${net.getQdiscRules(webPort.mac).length}`);

// ── Load balancing ────────────────────────────────────────────────
console.log("\n--- Load balancing ---");
net.addLoadBalancer({
	name: "web-lb",
	port: 80,
	algorithm: "round-robin",
	targets: [
		{ hostname: "web-01", port: 80, weight: 1 },
	],
});

for (let i = 0; i < 3; i++) {
	const target = net.resolveLoadBalancer(80);
	if (target) {
		console.log(`  request ${i + 1} to ${target.hostname} (${target.ip}:${target.port})`);
	}
}

// ── Network partitions ────────────────────────────────────────────
console.log("\n--- Network partitions ---");
net.setPartitions([[webPort.mac], [dbPort.mac]]);
console.log("  partitions: web and db isolated");
net.clearPartitions();
console.log("  partitions cleared");

// ── Port forwarding ───────────────────────────────────────────────
console.log("\n--- Port forwarding ---");
const proxy = new VirtualProxy({
	getVM: (name: string) => name === "web-01" ? web : undefined,
	switch: net,
	listVMs: () => [{ hostname: "web-01", ip: "10.0.100.10", shell: web }],
});

proxy.exposePort("web-01", 80, 35801);
proxy.exposePort("web-01", 22, 35802);

await new Promise((r) => setTimeout(r, 100));
console.log(`  forwards: ${proxy.listPorts().length}`);

for (const f of proxy.listPorts()) {
	console.log(`  ${f.vmName}:${f.vmPort} ↔ host:${f.hostPort}`);
}

proxy.stop();
console.log("  forwards stopped");

// ── Idle management and GC ────────────────────────────────────────
console.log("\n--- Idle management ---");
web.enableIdleManagement({ gcIntervalMs: 60000 });
console.log(`  idle state: ${web.idleState}`);
console.log(`  idle ms: ${web.idleMs}`);

web.pingIdle();
const gc = web.runGc();
if (gc) { console.log(`  GC: ${gc.terminatedProcesses} terminated, ${gc.evictedFiles} evicted, forced=${gc.forcedGc}`); }

web.disableIdleManagement();
console.log("  idle manager stopped");

// ── System files generation ───────────────────────────────────────
console.log("\n--- System files ---");
console.log(`  shadow entries: ${web.users.generateShadowFile().split("\n").length}`);
console.log(`  group entries:  ${web.users.generateGroupFile().split("\n").length}`);

// ── Traffic statistics ────────────────────────────────────────────
console.log("\n--- Traffic statistics ---");
console.log(`  ${webPort.mac} sent:     ${net.getBytesSent(webPort.mac)} bytes`);
console.log(`  ${dbPort.mac} sent:     ${net.getBytesSent(dbPort.mac)} bytes`);
console.log(`  ${webPort.mac} received: ${net.getBytesReceived(webPort.mac)} bytes`);

// ── Cleanup ───────────────────────────────────────────────────────
console.log("\n--- Cleanup ---");
net.detach(webPort.mac);
net.detach(dbPort.mac);
console.log(`  ports remaining: ${net.getPorts().size}`);
