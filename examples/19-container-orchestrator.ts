/**
 * 19 - Container Orchestrator
 *
 * Simulates a Kubernetes-like orchestrator managing pods, services,
 * and network policies across a virtual cluster.
 */

import { Baie, SshClient, VirtualSshServer, type VirtualShell } from "../src";

interface Pod {
	name: string;
	vm: VirtualShell;
	ssh: VirtualSshServer;
	client: SshClient;
	port: number;
	image: string;
	ports: number[];
	ready: boolean;
}

interface Service {
	name: string;
	pods: Pod[];
	port: number;
	targetPort: number;
}

// ── Create cluster network ────────────────────────────────────────
console.log("--- Create cluster network ---");

const CLUSTER = new Baie("k8s-cluster", "172.16.0.0/16");

// ── Deploy pods ───────────────────────────────────────────────────
console.log("\n--- Deploy pods ---");

const POD_SPECS = [
	{ name: "web-1", image: "nginx:1.25", ports: [80] },
	{ name: "web-2", image: "nginx:1.25", ports: [80] },
	{ name: "web-3", image: "nginx:1.25", ports: [80] },
	{ name: "api-1", image: "node:20-alpine", ports: [3000] },
	{ name: "api-2", image: "node:20-alpine", ports: [3000] },
	{ name: "db-1", image: "postgres:16", ports: [5432] },
	{ name: "cache-1", image: "redis:7", ports: [6379] },
];

const PODS: Pod[] = [];

for (const SPEC of POD_SPECS) {
	const VM = await CLUSTER.createVM(SPEC.name);
	VM.vfs.setRamCap(256 * 1024 * 1024);
	VM.users.setCpuCapCores(1);
	VM.users.setPassword("root", "root");

	const SSH = new VirtualSshServer({ port: 0, shell: VM });
	const PORT = await SSH.start();

	const CLIENT = new SshClient();
	await CLIENT.connect({
		host: "localhost",
		port: PORT,
		username: "root",
		password: "root",
	});

	await CLIENT.exec(`mkdir -p /app && echo '${SPEC.image}' > /app/image`);
	for (const p of SPEC.ports) {
		await CLIENT.exec(`echo "Listening on port ${p}" > /app/port-${p}`);
	}

	const POD: Pod = {
		name: SPEC.name,
		vm: VM,
		ssh: SSH,
		client: CLIENT,
		port: PORT,
		image: SPEC.image,
		ports: SPEC.ports,
		ready: true,
	};
	PODS.push(POD);
	console.log(`  ${SPEC.name}: ${SPEC.image} [${SPEC.ports.join(", ")}]`);
}

// ── Create services ───────────────────────────────────────────────
console.log("\n--- Create services ---");

const SERVICES: Service[] = [
	{
		name: "web-svc",
		pods: PODS.filter((p) => p.name.startsWith("web")),
		port: 80,
		targetPort: 80,
	},
	{
		name: "api-svc",
		pods: PODS.filter((p) => p.name.startsWith("api")),
		port: 3000,
		targetPort: 3000,
	},
	{
		name: "db-svc",
		pods: PODS.filter((p) => p.name.startsWith("db")),
		port: 5432,
		targetPort: 5432,
	},
	{
		name: "cache-svc",
		pods: PODS.filter((p) => p.name.startsWith("cache")),
		port: 6379,
		targetPort: 6379,
	},
];

for (const SVC of SERVICES) {
	CLUSTER.switch.addDnsRecord(SVC.name, "172.16.0.1");

	if (SVC.pods.length > 1) {
		CLUSTER.switch.addLoadBalancer({
			name: SVC.name,
			port: SVC.port,
			targets: SVC.pods.map((p) => ({
				hostname: p.name,
				port: SVC.targetPort,
				weight: 1,
			})),
			algorithm: "round-robin",
		});
		console.log(
			`  ${SVC.name}: ${SVC.pods.length} pods, round-robin LB on port ${SVC.port}`
		);
	} else {
		console.log(`  ${SVC.name}: 1 pod on port ${SVC.port}`);
	}
}

// ── Apply network policies ────────────────────────────────────────
console.log("\n--- Apply network policies ---");

const WEB_CLIENT = PODS[0]!.client;
await WEB_CLIENT.exec("iptables -A OUTPUT -d 172.16.0.0/16 -j ACCEPT");

const DB_CLIENT = PODS.find((p) => p.name === "db-1")!.client;
await DB_CLIENT.exec(
	"iptables -A INPUT -s 172.16.0.4 -p tcp --dport 5432 -j ACCEPT"
);
await DB_CLIENT.exec(
	"iptables -A INPUT -s 172.16.0.5 -p tcp --dport 5432 -j ACCEPT"
);
await DB_CLIENT.exec("iptables -P INPUT DROP");

console.log("  web -> api: allowed");
console.log("  api -> db: allowed");
console.log("  web -> db: denied (policy)");
console.log("  external -> db: denied (default)");

// ── Verify connectivity ───────────────────────────────────────────
console.log("\n--- Verify connectivity ---");

const WEB_TO_API = await WEB_CLIENT.exec(
	"echo 'test' | nc -w 1 172.16.0.4 3000 2>&1 || echo 'connection-refused'"
);
console.log(
	`  web-1 -> api-1: ${WEB_TO_API.exitCode === 0 ? "connected" : "refused"}`
);

const WEB_TO_DB = await WEB_CLIENT.exec(
	"nc -z -w 1 172.16.0.6 5432 2>&1 || echo 'unreachable'"
);
console.log(
	`  web-1 -> db-1: ${(WEB_TO_DB.stdout ?? "").includes("unreachable") ? "blocked" : "open"}`
);

// ── Rolling update ────────────────────────────────────────────────
console.log("\n--- Rolling update: web pods v1.25 -> v1.26 ---");

for (const POD of PODS.filter((p) => p.name.startsWith("web"))) {
	console.log(`  Updating ${POD.name}...`);

	POD.ready = false;

	await POD.client.exec("echo 'nginx:1.26' > /app/image");
	POD.image = "nginx:1.26";

	POD.ready = true;
	console.log(`  ${POD.name} updated to ${POD.image}`);
}

// ── Cluster status report ─────────────────────────────────────────
console.log("\n--- Cluster status report ---");
console.log("=".repeat(60));

console.log(`\n  Pods: ${PODS.length} total`);
for (const POD of PODS) {
	const STATUS = POD.ready ? "Running" : "NotReady";
	console.log(
		`    ${POD.name}: ${POD.image} [${POD.ports.join(", ")}] - ${STATUS}`
	);
}

console.log(`\n  Services: ${SERVICES.length}`);
for (const SVC of SERVICES) {
	console.log(
		`    ${SVC.name}: ${SVC.pods.length} pods, port ${SVC.port}->${SVC.targetPort}`
	);
}

let totalSent = 0;
let totalReceived = 0;
for (const [MAC] of CLUSTER.switch.getPorts()) {
	totalSent += CLUSTER.switch.getBytesSent(MAC);
	totalReceived += CLUSTER.switch.getBytesReceived(MAC);
}
console.log(
	`\n  Network bandwidth: ${totalSent} bytes sent, ${totalReceived} bytes received`
);

let _totalRam = 0;
for (const POD of PODS) {
	const PROCS = POD.vm.users.listProcesses();
	_totalRam += PROCS.length * 10;
}
console.log(
	`  Total processes: ${PODS.reduce((sum, p) => sum + p.vm.users.listProcesses().length, 0)}`
);

console.log("\n--- Cluster running ---");

for (const POD of PODS) {
	POD.client.disconnect();
	POD.ssh.stop();
}
