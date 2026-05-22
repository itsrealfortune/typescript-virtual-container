/**
 * Example 99: Full-stack virtual infrastructure (ALL modules)
 *
 * Comprehensive end-to-end scenario exercising every major module:
 * VirtualShell, VirtualFileSystem, VirtualUserManager,
 * VirtualNetworkManager, VirtualPackageManager, VirtualSwitch,
 * VirtualProxy, IdleManager, and ProcessScheduler.
 *
 * Scenario: Deploy a two-tier application (web + database) with users,
 * network policies, service discovery, traffic shaping, and monitoring.
 */

import { VirtualShell, VirtualSwitch, VirtualProxy } from "../src";

// ═══════════════════════════════════════════════════════════════════
// 1. Infrastructure — create virtual switch and two VMs
// ═══════════════════════════════════════════════════════════════════
const net = new VirtualSwitch("10.0.100.0/24");

const web = new VirtualShell("web-01");
await web.ensureInitialized();
const webPort = net.attach(web, "10.0.100.10");

const db = new VirtualShell("db-01");
await db.ensureInitialized();
const dbPort = net.attach(db, "10.0.100.20");

console.log(`  web-01: ${webPort.ip} / ${webPort.mac}`);
console.log(`  db-01:  ${dbPort.ip} / ${dbPort.mac}`);

// ═══════════════════════════════════════════════════════════════════
// 2. Per-VM network configuration
// ═══════════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════════
// 3. DNS service discovery (switch-level)
// ═══════════════════════════════════════════════════════════════════
net.addDnsRecord("web-01", "10.0.100.10");
net.addDnsRecord("db-01", "10.0.100.20");

console.log(`\n  web-01 → ${net.resolveDns("web-01")}`);
console.log(`  db-01  → ${net.resolveDns("db-01")}`);

for (const r of net.listDnsRecords()) {
	console.log(`  DNS: ${r.hostname} → ${r.ip}`);
}

// ═══════════════════════════════════════════════════════════════════
// 4. Firewall — web: open HTTP/HTTPS/SSH; db: MySQL from web only
// ═══════════════════════════════════════════════════════════════════
web.network.addFirewallRule({ chain: "INPUT", protocol: "tcp", destPort: 22, action: "ACCEPT" });
web.network.addFirewallRule({ chain: "INPUT", protocol: "tcp", destPort: 80, action: "ACCEPT" });
web.network.addFirewallRule({ chain: "INPUT", protocol: "tcp", destPort: 443, action: "ACCEPT" });
web.network.setPolicy("INPUT", "DROP");

db.network.addFirewallRule({ chain: "INPUT", protocol: "tcp", source: "10.0.100.10", destPort: 3306, action: "ACCEPT" });
db.network.setPolicy("INPUT", "DROP");

const routeWebToDb = await net.route({ srcIp: "10.0.100.10", srcMac: webPort.mac, dstIp: "10.0.100.20", protocol: "tcp", dstPort: 3306 });
const routeDbToWeb = await net.route({ srcIp: "10.0.100.20", srcMac: dbPort.mac, dstIp: "10.0.100.10", protocol: "tcp", dstPort: 80 });
console.log(`  web → db:3306 = ${routeWebToDb.action}`);
console.log(`  db → web:80  = ${routeDbToWeb.action}`);

console.log(`  web  check MySQL = ${web.network.checkFirewall("INPUT", "tcp", "10.0.100.10", "10.0.100.20", 3306)}`);
console.log(`  db   check MySQL = ${db.network.checkFirewall("INPUT", "tcp", "10.0.100.20", "10.0.100.20", 3306)}`);

// ═══════════════════════════════════════════════════════════════════
// 5. Users, groups, sudo, password policies
// ═══════════════════════════════════════════════════════════════════
await web.users.addUser("admin", "s3cret!");
await web.users.addUser("developer", "dev-pass");
await web.users.addUser("deploy", "deploy-token");

web.users.createGroup("wheel", 1000);
web.users.createGroup("developers", 2000);
web.users.addGroupMember("wheel", "admin");
web.users.addGroupMember("developers", "admin");
web.users.addGroupMember("developers", "developer");

const groups = web.users.getUserAllGroups("admin");
console.log(`\n  admin groups: ${groups.join(", ")}`);
console.log(`  admin sudoer: ${web.users.isSudoer("admin")}`);
await web.users.addSudoer("admin");
console.log(`  admin sudoer after add: ${web.users.isSudoer("admin")}`);

await web.users.setPasswordAging("developer", 1, 90, 7, 30);
const aging = web.users.getPasswordAging("developer");
if (aging) {
	console.log(`  developer password: minAge=${aging.minAge}d maxAge=${aging.maxAge}d warn=${aging.warnDays}d`);
}
console.log(`  developer expired: ${web.users.isPasswordExpired("developer")}`);

// ═══════════════════════════════════════════════════════════════════
// 6. SSH authorized keys
// ═══════════════════════════════════════════════════════════════════
web.users.addAuthorizedKey("admin", "ssh-ed25519", Buffer.from("AAAAC3NzaC1lZDI1NTE5AAAAI..."));
console.log(`  admin authorized keys: ${web.users.getAuthorizedKeys("admin").length}`);

// ═══════════════════════════════════════════════════════════════════
// 7. Sessions and login tracking
// ═══════════════════════════════════════════════════════════════════
web.users.registerSession("admin", "10.0.0.1");
web.users.registerSession("developer", "10.0.0.2");
web.users.registerSession("deploy", "10.0.0.3");
console.log(`\n  active sessions: ${web.users.listActiveSessions().length}`);

web.users.recordLoginFailure("developer", "10.0.99.99");
web.users.recordLoginFailure("developer", "10.0.99.99");
web.users.recordLoginFailure("developer", "10.0.99.99");
console.log(`  developer failures: ${web.users.getLoginFailures("developer")}`);
console.log(`  developer locked: ${web.users.isAccountLockedByFailures("developer")}`);
web.users.resetLoginFailures("developer");

// ═══════════════════════════════════════════════════════════════════
// 8. Account locking and expiry
// ═══════════════════════════════════════════════════════════════════
console.log(`\n  deploy locked: ${web.users.isAccountLocked("deploy")}`);
await web.users.lockAccount("deploy");
console.log(`  deploy locked after lock: ${web.users.isAccountLocked("deploy")}`);
await web.users.unlockAccount("deploy");

await web.users.setAccountExpiry("developer", Math.floor(Date.now() / 1000) + 30 * 86400);
console.log(`  developer password expired: ${web.users.isPasswordExpired("developer")}`);

// ═══════════════════════════════════════════════════════════════════
// 9. Quotas
// ═══════════════════════════════════════════════════════════════════
await web.users.setQuotaBytes("developer", 50 * 1024 * 1024);
console.log(`\n  developer quota: ${web.users.getQuotaBytes("developer")} bytes`);
console.log(`  developer usage: ${web.users.getUsageBytes("developer")} bytes`);

// ═══════════════════════════════════════════════════════════════════
// 10. Package management
// ═══════════════════════════════════════════════════════════════════
web.packageManager.load();

console.log(`\n  available packages: ${web.packageManager.listAvailable().length}`);
const nginxPkg = web.packageManager.findInRegistry("nginx");
if (nginxPkg) {
	console.log(`  nginx: ${nginxPkg.version} — ${nginxPkg.description}`);
}

const nodePkg = web.packageManager.findInRegistry("node");
if (nodePkg) {
	console.log(`  node:  ${nodePkg.version} — ${nodePkg.description}`);
}

// ═══════════════════════════════════════════════════════════════════
// 11. VFS: files, directories, mounts
// ═══════════════════════════════════════════════════════════════════
web.vfs.mkdir("/etc/nginx", 0o755);
web.vfs.mkdir("/var/www", 0o755);
web.vfs.mkdir("/var/log", 0o755);

web.vfs.writeFile("/etc/nginx/nginx.conf", "worker_processes auto;\nevents {}\nhttp {\n    include /etc/nginx/sites-enabled/*;\n}\n");
web.vfs.writeFile("/var/www/index.html", "<h1>Hello from web-01</h1>");
web.vfs.writeFile("/var/log/access.log", "");

const conf = web.vfs.readFile("/etc/nginx/nginx.conf");
console.log(`\n  nginx.conf: ${conf.split("\n").length} lines`);

const wwwStat = web.vfs.stat("/var/www/index.html");
console.log(`  index.html: type=${wwwStat.type}, size=${wwwStat.type === "file" ? wwwStat.size : "N/A"}`);

// ═══════════════════════════════════════════════════════════════════
// 12. Content resolvers and VFS hooks
// ═══════════════════════════════════════════════════════════════════
web.vfs.registerContentResolver("/var/www", (path) => {
	if (path === "/var/www/status.json") {
		return JSON.stringify({ status: "ok", hostname: "web-01", uptimeMs: Date.now() - web.startTime });
	}
	return null;
});

console.log(`\n  status.json: ${web.vfs.readFile("/var/www/status.json")}`);

web.vfs.onBeforeWrite("/etc", () => {
	console.log("  (audit: /etc write detected)");
});
web.vfs.writeFile("/etc/test-hook", "should trigger hook");

web.vfs.offBeforeRead("/etc");
web.vfs.offBeforeWrite("/etc");

// ═══════════════════════════════════════════════════════════════════
// 13. Process scheduling and monitoring
// ═══════════════════════════════════════════════════════════════════
web.users.enableScheduler();

const pid1 = web.users.registerProcess("admin", "nginx", ["-g", "daemon off;"], "/dev/pts/0");
const pid2 = web.users.registerProcess("developer", "node", ["app.js"], "/dev/pts/1");
const pid3 = web.users.registerProcess("developer", "tail", ["-f", "/var/log/access.log"], "/dev/pts/1");

console.log(`\n  processes: ${web.users.listProcesses().length}`);

const proc2 = web.users.getProcess(pid2);
if (proc2) console.log(`  pid ${pid2}: ${proc2.command} (${proc2.username})`);

web.users.killProcess(pid3, 9);
web.users.unregisterProcess(pid1);
web.users.unregisterProcess(pid2);

const stats = web.users.getSchedulerStats();
if (stats) console.log(`  scheduler: ${stats.runQueueLength} queued, ${stats.scheduleCount} context switches`);

// ═══════════════════════════════════════════════════════════════════
// 14. Traffic shaping
// ═══════════════════════════════════════════════════════════════════
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

console.log(`\n  traffic rule set for ${webPort.mac}`);
console.log(`  qdisc rules: ${net.getQdiscRules(webPort.mac).length}`);

// ═══════════════════════════════════════════════════════════════════
// 15. Load balancing
// ═══════════════════════════════════════════════════════════════════
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
		console.log(`  request ${i + 1} → ${target.hostname} (${target.ip}:${target.port})`);
	}
}

// ═══════════════════════════════════════════════════════════════════
// 16. Network partitions
// ═══════════════════════════════════════════════════════════════════
net.setPartitions([[webPort.mac], [dbPort.mac]]);
console.log(`\n  partitions: web and db isolated`);
net.clearPartitions();
console.log(`  partitions cleared`);

// ═══════════════════════════════════════════════════════════════════
// 17. Port forwarding
// ═══════════════════════════════════════════════════════════════════
const proxy = new VirtualProxy({
	getVM: (name: string) => name === "web-01" ? web : undefined,
	switch: net,
	listVMs: () => [{ hostname: "web-01", ip: "10.0.100.10", shell: web }],
});

proxy.exposePort("web-01", 80, 35801);
proxy.exposePort("web-01", 22, 35802);

await new Promise((r) => setTimeout(r, 100));
console.log(`\n  forwards: ${proxy.listPorts().length}`);

for (const f of proxy.listPorts()) {
	console.log(`  ${f.vmName}:${f.vmPort} ↔ host:${f.hostPort}`);
}

proxy.stop();
console.log(`  forwards stopped`);

// ═══════════════════════════════════════════════════════════════════
// 18. Idle management and GC
// ═══════════════════════════════════════════════════════════════════
web.enableIdleManagement({ gcIntervalMs: 60000 });
console.log(`\n  idle state: ${web.idleState}`);
console.log(`  idle ms: ${web.idleMs}`);

web.pingIdle();
const gc = web.runGc();
if (gc) console.log(`  GC: ${gc.terminatedProcesses} terminated, ${gc.evictedFiles} evicted, forced=${gc.forcedGc}`);

await web.disableIdleManagement();
console.log(`  idle manager stopped`);

// ═══════════════════════════════════════════════════════════════════
// 19. /etc/shadow and /etc/group generation
// ═══════════════════════════════════════════════════════════════════
console.log(`\n  shadow entries: ${web.users.generateShadowFile().split("\n").length}`);
console.log(`  group entries:  ${web.users.generateGroupFile().split("\n").length}`);

// ═══════════════════════════════════════════════════════════════════
// 20. Traffic statistics
// ═══════════════════════════════════════════════════════════════════
console.log(`\n  ${webPort.mac} sent:     ${net.getBytesSent(webPort.mac)} bytes`);
console.log(`  ${dbPort.mac} sent:     ${net.getBytesSent(dbPort.mac)} bytes`);
console.log(`  ${webPort.mac} received: ${net.getBytesReceived(webPort.mac)} bytes`);

// ═══════════════════════════════════════════════════════════════════
// Cleanup
// ═══════════════════════════════════════════════════════════════════
net.detach(webPort.mac);
net.detach(dbPort.mac);
console.log(`\n  ports remaining: ${net.getPorts().size}`);
