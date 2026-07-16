/**
 * 99 - Full-Stack Infrastructure
 *
 * Comprehensive end-to-end scenario exercising VirtualShell, VFS,
 * user management, network management, package management,
 * VirtualSwitch, VirtualProxy, and IdleManager.
 */

import {
	VirtualPackageManager,
	VirtualProxy,
	VirtualShell,
	VirtualSwitch,
} from "../src";

// ── Infrastructure — create virtual switch and two VMs ─────────────
console.log("--- Infrastructure ---");
const NET = new VirtualSwitch("10.0.100.0/24");

const WEB = new VirtualShell("web-01");
await WEB.ensureInitialized();
const WEB_PORT = NET.attach(WEB, "10.0.100.10");

const DB = new VirtualShell("db-01");
await DB.ensureInitialized();
const DB_PORT = NET.attach(DB, "10.0.100.20");

console.log(`  web-01: ${WEB_PORT.ip} / ${WEB_PORT.mac}`);
console.log(`  db-01:  ${DB_PORT.ip} / ${DB_PORT.mac}`);

// ── Per-VM network configuration ──────────────────────────────────
console.log("\n--- Network config ---");
WEB.network.addInterface({
	name: "eth0",
	type: "ether",
	mac: WEB_PORT.mac,
	mtu: 1500,
	ipv4: "10.0.100.10",
	ipv4Mask: 24,
	ipv6: "::1",
	speed: 1000,
});
WEB.network.setInterfaceState("eth0", "UP");
WEB.network.addRoute("0.0.0.0/0", "10.0.100.1", "0.0.0.0", "eth0");

DB.network.addInterface({
	name: "eth0",
	type: "ether",
	mac: DB_PORT.mac,
	mtu: 1500,
	ipv4: "10.0.100.20",
	ipv4Mask: 24,
	ipv6: "::1",
	speed: 1000,
});
DB.network.setInterfaceState("eth0", "UP");

// ── DNS service discovery (switch-level) ───────────────────────────
console.log("\n--- DNS records ---");
NET.addDnsRecord("web-01", "10.0.100.10");
NET.addDnsRecord("db-01", "10.0.100.20");

console.log(`  web-01 → ${NET.resolveDns("web-01")}`);
console.log(`  db-01  → ${NET.resolveDns("db-01")}`);

for (const r of NET.listDnsRecords()) {
	console.log(`  DNS: ${r.hostname} → ${r.ip}`);
}

// ── Firewall ──────────────────────────────────────────────────────
console.log("\n--- Firewall rules ---");
WEB.network.addFirewallRule({
	chain: "INPUT",
	protocol: "tcp",
	destPort: 22,
	action: "ACCEPT",
});
WEB.network.addFirewallRule({
	chain: "INPUT",
	protocol: "tcp",
	destPort: 80,
	action: "ACCEPT",
});
WEB.network.addFirewallRule({
	chain: "INPUT",
	protocol: "tcp",
	destPort: 443,
	action: "ACCEPT",
});
WEB.network.setPolicy("INPUT", "DROP");

DB.network.addFirewallRule({
	chain: "INPUT",
	protocol: "tcp",
	source: "10.0.100.10",
	destPort: 3306,
	action: "ACCEPT",
});
DB.network.setPolicy("INPUT", "DROP");

const ROUTE_WEB_TO_DB = await NET.route({
	srcIp: "10.0.100.10",
	srcMac: WEB_PORT.mac,
	dstIp: "10.0.100.20",
	protocol: "tcp",
	dstPort: 3306,
});
const ROUTE_DB_TO_WEB = await NET.route({
	srcIp: "10.0.100.20",
	srcMac: DB_PORT.mac,
	dstIp: "10.0.100.10",
	protocol: "tcp",
	dstPort: 80,
});
console.log(`  web to db:3306 = ${ROUTE_WEB_TO_DB.action}`);
console.log(`  db to web:80  = ${ROUTE_DB_TO_WEB.action}`);

console.log(
	`  web check MySQL = ${WEB.network.checkFirewall("INPUT", "tcp", "10.0.100.10", "10.0.100.20", 3306)}`
);
console.log(
	`  db check MySQL  = ${DB.network.checkFirewall("INPUT", "tcp", "10.0.100.20", "10.0.100.20", 3306)}`
);

// ── Users, groups, sudo, password policies ─────────────────────────
console.log("\n--- Users and groups ---");
WEB.users.addUser("admin", "s3cret!");
WEB.users.addUser("developer", "dev-pass");
WEB.users.addUser("deploy", "deploy-token");

WEB.users.createGroup("wheel", 1000);
WEB.users.createGroup("developers", 2000);
WEB.users.addGroupMember("wheel", "admin");
WEB.users.addGroupMember("developers", "admin");
WEB.users.addGroupMember("developers", "developer");

const GROUPS = WEB.users.getUserAllGroups("admin");
console.log(`  admin groups: ${GROUPS.join(", ")}`);
console.log(`  admin sudoer: ${WEB.users.isSudoer("admin")}`);
WEB.users.addSudoer("admin");
console.log(`  admin sudoer after add: ${WEB.users.isSudoer("admin")}`);

WEB.users.setPasswordAging("developer", 1, 90, 7, 30);
const AGING = WEB.users.getPasswordAging("developer");
if (AGING) {
	console.log(
		`  developer password: minAge=${AGING.minAge}d maxAge=${AGING.maxAge}d warn=${AGING.warnDays}d`
	);
}
console.log(`  developer expired: ${WEB.users.isPasswordExpired("developer")}`);

// ── SSH authorized keys ───────────────────────────────────────────
console.log("\n--- Authorized keys ---");
WEB.users.addAuthorizedKey(
	"admin",
	"ssh-ed25519",
	Buffer.from("AAAAC3NzaC1lZDI1NTE5AAAAI...")
);
console.log(
	`  admin authorized keys: ${WEB.users.getAuthorizedKeys("admin").length}`
);

// ── Sessions and login tracking ───────────────────────────────────
console.log("\n--- Sessions ---");
WEB.users.registerSession("admin", "10.0.0.1");
WEB.users.registerSession("developer", "10.0.0.2");
WEB.users.registerSession("deploy", "10.0.0.3");
console.log(`  active sessions: ${WEB.users.listActiveSessions().length}`);

WEB.users.recordLoginFailure("developer", "10.0.99.99");
WEB.users.recordLoginFailure("developer", "10.0.99.99");
WEB.users.recordLoginFailure("developer", "10.0.99.99");
console.log(`  developer failures: ${WEB.users.getLoginFailures("developer")}`);
console.log(
	`  developer locked: ${WEB.users.isAccountLockedByFailures("developer")}`
);
WEB.users.resetLoginFailures("developer");

// ── Account locking and expiry ─────────────────────────────────────
console.log("\n--- Account locking ---");
console.log(`  deploy locked: ${WEB.users.isAccountLocked("deploy")}`);
WEB.users.lockAccount("deploy");
console.log(
	`  deploy locked after lock: ${WEB.users.isAccountLocked("deploy")}`
);
WEB.users.unlockAccount("deploy");

WEB.users.setAccountExpiry(
	"developer",
	Math.floor(Date.now() / 1000) + 30 * 86400
);
console.log(
	`  developer password expired: ${WEB.users.isPasswordExpired("developer")}`
);

// ── Quotas ────────────────────────────────────────────────────────
console.log("\n--- Quotas ---");
WEB.users.setQuotaBytes("developer", 50 * 1024 * 1024);
console.log(`  developer quota: ${WEB.users.getQuotaBytes("developer")} bytes`);
console.log(`  developer usage: ${WEB.users.getUsageBytes("developer")} bytes`);

// ── Package management ─────────────────────────────────────────────
console.log("\n--- Package management ---");
WEB.packageManager.load();
console.log(
	`  available packages: ${VirtualPackageManager.listAvailable().length}`
);

const NGINX_PKG = VirtualPackageManager.findInRegistry("nginx");
if (NGINX_PKG) {
	console.log(`  nginx: ${NGINX_PKG.version} — ${NGINX_PKG.description}`);
}

const NODE_PKG = VirtualPackageManager.findInRegistry("node");
if (NODE_PKG) {
	console.log(`  node:  ${NODE_PKG.version} — ${NODE_PKG.description}`);
}

// ── VFS: files, directories, mounts ───────────────────────────────
console.log("\n--- VFS operations ---");
WEB.vfs.mkdir("/etc/nginx", 0o755);
WEB.vfs.mkdir("/var/www", 0o755);
WEB.vfs.mkdir("/var/log", 0o755);

WEB.vfs.writeFile(
	"/etc/nginx/nginx.conf",
	"worker_processes auto;\nevents {}\nhttp {\n    include /etc/nginx/sites-enabled/*;\n}\n"
);
WEB.vfs.writeFile("/var/www/index.html", "<h1>Hello from web-01</h1>");
WEB.vfs.writeFile("/var/log/access.log", "");

const CONF = WEB.vfs.readFile("/etc/nginx/nginx.conf");
console.log(`  nginx.conf: ${CONF.split("\n").length} lines`);

const WWW_STAT = WEB.vfs.stat("/var/www/index.html");
console.log(
	`  index.html: type=${WWW_STAT.type}, size=${WWW_STAT.type === "file" ? WWW_STAT.size : "N/A"}`
);

// ── Content resolvers and VFS hooks ───────────────────────────────
console.log("\n--- VFS resolvers and hooks ---");
WEB.vfs.registerContentResolver("/var/www", (path) => {
	if (path === "/var/www/status.json") {
		return JSON.stringify({
			status: "ok",
			hostname: "web-01",
			uptimeMs: Date.now() - WEB.startTime,
		});
	}
	return null;
});

console.log(`  status.json: ${WEB.vfs.readFile("/var/www/status.json")}`);

WEB.vfs.onBeforeWrite("/etc", () => {
	console.log("  (audit: /etc write detected)");
});
WEB.vfs.writeFile("/etc/test-hook", "should trigger hook");

WEB.vfs.offBeforeRead("/etc");
WEB.vfs.offBeforeWrite("/etc");

// ── Process scheduling and monitoring ──────────────────────────────
console.log("\n--- Process scheduler ---");
WEB.users.enableScheduler();

const PID1 = WEB.users.registerProcess(
	"admin",
	"nginx",
	["-g", "daemon off;"],
	"/dev/pts/0"
);
const PID2 = WEB.users.registerProcess(
	"developer",
	"node",
	["app.js"],
	"/dev/pts/1"
);
const PID3 = WEB.users.registerProcess(
	"developer",
	"tail",
	["-f", "/var/log/access.log"],
	"/dev/pts/1"
);

console.log(`  processes: ${WEB.users.listProcesses().length}`);

const PROC2 = WEB.users.getProcess(PID2);
if (PROC2) {
	console.log(`  pid ${PID2}: ${PROC2.command} (${PROC2.username})`);
}

WEB.users.killProcess(PID3, 9);
WEB.users.unregisterProcess(PID1);
WEB.users.unregisterProcess(PID2);

const STATS = WEB.users.getSchedulerStats();
if (STATS) {
	console.log(
		`  scheduler: ${STATS.runQueueLength} queued, ${STATS.scheduleCount} context switches`
	);
}

// ── Traffic shaping ───────────────────────────────────────────────
console.log("\n--- Traffic shaping ---");
NET.setTrafficRule(WEB_PORT.mac, {
	vms: [WEB_PORT.mac],
	maxBandwidthMbps: 100,
	latencyMs: 5,
	jitterMs: 2,
});

NET.addQdiscRule(WEB_PORT.mac, {
	interface: "eth0",
	type: "netem",
	latencyMs: 50,
	packetLossPct: 1,
});

console.log(`  traffic rule set for ${WEB_PORT.mac}`);
console.log(`  qdisc rules: ${NET.getQdiscRules(WEB_PORT.mac).length}`);

// ── Load balancing ────────────────────────────────────────────────
console.log("\n--- Load balancing ---");
NET.addLoadBalancer({
	name: "web-lb",
	port: 80,
	algorithm: "round-robin",
	targets: [{ hostname: "web-01", port: 80, weight: 1 }],
});

for (let i = 0; i < 3; i++) {
	const TARGET = NET.resolveLoadBalancer(80);
	if (TARGET) {
		console.log(
			`  request ${i + 1} to ${TARGET.hostname} (${TARGET.ip}:${TARGET.port})`
		);
	}
}

// ── Network partitions ────────────────────────────────────────────
console.log("\n--- Network partitions ---");
NET.setPartitions([[WEB_PORT.mac], [DB_PORT.mac]]);
console.log("  partitions: web and db isolated");
NET.clearPartitions();
console.log("  partitions cleared");

// ── Port forwarding ───────────────────────────────────────────────
console.log("\n--- Port forwarding ---");
const PROXY = new VirtualProxy({
	getVM: (name: string) => (name === "web-01" ? WEB : undefined),
	switch: NET,
	listVMs: () => [{ hostname: "web-01", ip: "10.0.100.10", shell: WEB }],
});

PROXY.exposePort("web-01", 80, 35801);
PROXY.exposePort("web-01", 22, 35802);

await new Promise((r) => setTimeout(r, 100));
console.log(`  forwards: ${PROXY.listPorts().length}`);

for (const f of PROXY.listPorts()) {
	console.log(`  ${f.vmName}:${f.vmPort} ↔ host:${f.hostPort}`);
}

PROXY.stop();
console.log("  forwards stopped");

// ── Idle management and GC ────────────────────────────────────────
console.log("\n--- Idle management ---");
WEB.enableIdleManagement({ gcIntervalMs: 60000 });
console.log(`  idle state: ${WEB.idleState}`);
console.log(`  idle ms: ${WEB.idleMs}`);

WEB.pingIdle();
const GC = WEB.runGc();
if (GC) {
	console.log(
		`  GC: ${GC.terminatedProcesses} terminated, ${GC.evictedFiles} evicted, forced=${GC.forcedGc}`
	);
}

WEB.disableIdleManagement();
console.log("  idle manager stopped");

// ── System files generation ───────────────────────────────────────
console.log("\n--- System files ---");
console.log(
	`  shadow entries: ${WEB.users.generateShadowFile().split("\n").length}`
);
console.log(
	`  group entries:  ${WEB.users.generateGroupFile().split("\n").length}`
);

// ── Traffic statistics ────────────────────────────────────────────
console.log("\n--- Traffic statistics ---");
console.log(
	`  ${WEB_PORT.mac} sent:     ${NET.getBytesSent(WEB_PORT.mac)} bytes`
);
console.log(`  ${DB_PORT.mac} sent:     ${NET.getBytesSent(DB_PORT.mac)} bytes`);
console.log(
	`  ${WEB_PORT.mac} received: ${NET.getBytesReceived(WEB_PORT.mac)} bytes`
);

// ── Cleanup ───────────────────────────────────────────────────────
console.log("\n--- Cleanup ---");
NET.detach(WEB_PORT.mac);
NET.detach(DB_PORT.mac);
console.log(`  ports remaining: ${NET.getPorts().size}`);
