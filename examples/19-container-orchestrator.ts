/**
 * Container orchestration simulator
 *
 * Real-world scenario: Simulate a Kubernetes-like orchestrator that
 * manages pods (VMs), services (load balancers), and network policies
 * (firewall rules) across a virtual cluster.
 */
import { Baie, SshClient, type VirtualShell } from "../src";

interface Pod {
	name: string;
	vm: VirtualShell;
	client: SshClient;
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

const cluster = new Baie("k8s-cluster", "172.16.0.0/16");

// ── Deploy pods ───────────────────────────────────────────────────
console.log("\n--- Deploy pods ---");

const podSpecs = [
	{ name: "web-1", image: "nginx:1.25", ports: [80] },
	{ name: "web-2", image: "nginx:1.25", ports: [80] },
	{ name: "web-3", image: "nginx:1.25", ports: [80] },
	{ name: "api-1", image: "node:20-alpine", ports: [3000] },
	{ name: "api-2", image: "node:20-alpine", ports: [3000] },
	{ name: "db-1", image: "postgres:16", ports: [5432] },
	{ name: "cache-1", image: "redis:7", ports: [6379] },
];

const pods: Pod[] = [];

for (const spec of podSpecs) {
	const vm = await cluster.createVM(spec.name);
	vm.vfs.setRamCap(256 * 1024 * 1024);
	vm.users.setCpuCapCores(1);

	const client = new SshClient(vm, "root");

	await client.exec(`mkdir -p /app && echo '${spec.image}' > /app/image`);
	for (const port of spec.ports) {
		await client.exec(`echo "Listening on port ${port}" > /app/port-${port}`);
	}

	const pod: Pod = {
		name: spec.name,
		vm,
		client,
		image: spec.image,
		ports: spec.ports,
		ready: true,
	};
	pods.push(pod);
	console.log(`  ${spec.name}: ${spec.image} [${spec.ports.join(", ")}]`);
}

// ── Create services ───────────────────────────────────────────────
console.log("\n--- Create services ---");

const services: Service[] = [
	{ name: "web-svc", pods: pods.filter((p) => p.name.startsWith("web")), port: 80, targetPort: 80 },
	{ name: "api-svc", pods: pods.filter((p) => p.name.startsWith("api")), port: 3000, targetPort: 3000 },
	{ name: "db-svc", pods: pods.filter((p) => p.name.startsWith("db")), port: 5432, targetPort: 5432 },
	{ name: "cache-svc", pods: pods.filter((p) => p.name.startsWith("cache")), port: 6379, targetPort: 6379 },
];

for (const svc of services) {
	cluster.switch.addDnsRecord(svc.name, "172.16.0.1");

	if (svc.pods.length > 1) {
		cluster.switch.addLoadBalancer({
			name: svc.name,
			port: svc.port,
			targets: svc.pods.map((p) => ({
				hostname: p.name,
				port: svc.targetPort,
				weight: 1,
			})),
			algorithm: "round-robin",
		});
		console.log(`  ${svc.name}: ${svc.pods.length} pods, round-robin LB on port ${svc.port}`);
	} else {
		console.log(`  ${svc.name}: 1 pod on port ${svc.port}`);
	}
}

// ── Apply network policies ────────────────────────────────────────
console.log("\n--- Apply network policies ---");

const webClient = new SshClient(pods[0]!.vm, "root");
await webClient.exec("iptables -A OUTPUT -d 172.16.0.0/16 -j ACCEPT");

const dbClient = new SshClient(pods.find((p) => p.name === "db-1")!.vm, "root");
await dbClient.exec("iptables -A INPUT -s 172.16.0.4 -p tcp --dport 5432 -j ACCEPT");
await dbClient.exec("iptables -A INPUT -s 172.16.0.5 -p tcp --dport 5432 -j ACCEPT");
await dbClient.exec("iptables -P INPUT DROP");

console.log("  web -> api: allowed");
console.log("  api -> db: allowed");
console.log("  web -> db: denied (policy)");
console.log("  external -> db: denied (default)");

// ── Verify connectivity ───────────────────────────────────────────
console.log("\n--- Verify connectivity ---");

const webToApi = await webClient.exec("echo 'test' | nc -w 1 172.16.0.4 3000 2>&1 || echo 'connection-refused'");
console.log(`  web-1 -> api-1: ${webToApi.exitCode === 0 ? "connected" : "refused"}`);

const webToDb = await webClient.exec("nc -z -w 1 172.16.0.6 5432 2>&1 || echo 'unreachable'");
console.log(`  web-1 -> db-1: ${(webToDb.stdout ?? "").includes("unreachable") ? "blocked" : "open"}`);

// ── Rolling update ────────────────────────────────────────────────
console.log("\n--- Rolling update: web pods v1.25 -> v1.26 ---");

for (const pod of pods.filter((p) => p.name.startsWith("web"))) {
	console.log(`  Updating ${pod.name}...`);

	pod.ready = false;

	await pod.client.exec("echo 'nginx:1.26' > /app/image");
	pod.image = "nginx:1.26";

	pod.ready = true;
	console.log(`  ${pod.name} updated to ${pod.image}`);
}

// ── Cluster status report ─────────────────────────────────────────
console.log("\n--- Cluster status report ---");
console.log("=".repeat(60));

console.log(`\n  Pods: ${pods.length} total`);
for (const pod of pods) {
	const status = pod.ready ? "Running" : "NotReady";
	console.log(`    ${pod.name}: ${pod.image} [${pod.ports.join(", ")}] - ${status}`);
}

console.log(`\n  Services: ${services.length}`);
for (const svc of services) {
	console.log(`    ${svc.name}: ${svc.pods.length} pods, port ${svc.port}->${svc.targetPort}`);
}

let totalSent = 0;
let totalReceived = 0;
for (const [mac] of cluster.switch.getPorts()) {
	totalSent += cluster.switch.getBytesSent(mac);
	totalReceived += cluster.switch.getBytesReceived(mac);
}
console.log(`\n  Network bandwidth: ${totalSent} bytes sent, ${totalReceived} bytes received`);

let _totalRam = 0;
for (const pod of pods) {
	const procs = pod.vm.users.listProcesses();
	_totalRam += procs.length * 10;
}
console.log(`  Total processes: ${pods.reduce((sum, p) => sum + p.vm.users.listProcesses().length, 0)}`);

console.log("\n--- Cluster running ---");
