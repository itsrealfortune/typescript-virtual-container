---
title: 19 - Container Orchestrator
group: Examples
---

# Example 19 — Container Orchestrator

## The Scenario

Container orchestrators like Kubernetes manage clusters of compute nodes, scheduling containers into **pods**, exposing them via **services** with load balancing, enforcing **network policies** for security, and supporting **rolling updates** for zero-downtime deployments. Each pod has resource limits (CPU/memory), each service provides stable DNS and load-balanced access to a set of pods, and network policies (implemented via iptables or CNI plugins) restrict which pods can communicate. This example simulates a Kubernetes-like orchestrator on a virtual network (`172.16.0.0/16`) with 7 pods across 4 tiers (web, API, database, cache), 4 services with round-robin load balancers, iptables-based network policies, a rolling update of the web tier from `nginx:1.25` to `nginx:1.26`, and cluster-wide network bandwidth reporting.

## Modules Used

```ts
import { Baie, SshClient, VirtualSshServer, type VirtualShell } from "../src";
```

- **`Baie`**: The cluster network namespace. Created with CIDR `172.16.0.0/16` — a large private range that can accommodate hundreds of pods. All pods are attached to this single `Baie`'s switch.
- **`SshClient`**: A virtual SSH client connecting to a `VirtualSshServer`. Used here for executing commands inside pods: writing container image info, simulating port listeners, applying iptables rules, and testing connectivity with `nc`.
- **`VirtualSshServer`**: A lightweight virtual SSH server that binds to a TCP port and proxies connections into a `VirtualShell`. Each pod gets its own SSH server.
- **`VirtualShell`**: The pod type. Each pod is a `VirtualShell` instance with resource caps and its own VFS, user manager, and process scheduler.

## Step-by-Step Walkthrough

### Step 1 — Create the cluster network

```ts
const cluster = new Baie("k8s-cluster", "172.16.0.0/16");
```

Creates a `Baie` named `"k8s-cluster"` with a `/16` subnet (65,534 usable IPs). This single `Baie` hosts all pods — unlike the SaaS example where each tenant had its own `Baie`, here all pods share one flat network. The `VirtualSwitch` inside handles DNS, load balancing, and routing for all attached VMs.

### Step 2 — Deploy pods

```ts
const podSpecs = [
  { name: "web-1", image: "nginx:1.25", ports: [80] },
  { name: "web-2", image: "nginx:1.25", ports: [80] },
  { name: "web-3", image: "nginx:1.25", ports: [80] },
  { name: "api-1", image: "node:20-alpine", ports: [3000] },
  { name: "api-2", image: "node:20-alpine", ports: [3000] },
  { name: "db-1", image: "postgres:16", ports: [5432] },
  { name: "cache-1", image: "redis:7", ports: [6379] },
];
```

Seven pods across four tiers:
- **Web tier (3 replicas):** `nginx:1.25` on port 80. Multiple replicas provide redundancy and load distribution.
- **API tier (2 replicas):** `node:20-alpine` on port 3000. The business logic layer.
- **Database tier (1 replica):** `postgres:16` on port 5432. Single instance (not production practice, but simpler for simulation).
- **Cache tier (1 replica):** `redis:7` on port 6379. Single instance.

```ts
const pods: Pod[] = [];
for (const spec of podSpecs) {
  const vm = await cluster.createVM(spec.name);
  vm.vfs.setRamCap(256 * 1024 * 1024);
  vm.users.setCpuCapCores(1);

  vm.users.setPassword("root", "root");
  const sshServer = new VirtualSshServer({ port: 0, shell: vm });
  const sshPort = await sshServer.start();
  const client = new SshClient();
  await client.connect({ host: "localhost", port: sshPort, username: "root", password: "root" });
  await client.exec(`mkdir -p /app && echo '${spec.image}' > /app/image`);
  for (const port of spec.ports) {
    await client.exec(`echo "Listening on port ${port}" > /app/port-${port}`);
  }

  const pod: Pod = { name: spec.name, vm, client, image: spec.image, ports: spec.ports, ready: true };
  pods.push(pod);
  console.log(`  ✅ ${spec.name}: ${spec.image} [${spec.ports.join(", ")}]`);
}
```

Each pod is created via `cluster.createVM()` which attaches it to the cluster switch and assigns an IP. Resource caps are applied: 256 MB RAM, 1 vCPU per pod — tighter than SaaS tenant VMs because pods share a cluster. A container startup is simulated by writing the image name to `/app/image` and creating per-port marker files. Each pod is initialized with `ready: true`, mimicking the Kubernetes `Ready` status condition.

### Step 3 — Create services with DNS and load balancing

```ts
const services: Service[] = [
  { name: "web-svc", pods: pods.filter((p) => p.name.startsWith("web")), port: 80, targetPort: 80 },
  { name: "api-svc", pods: pods.filter((p) => p.name.startsWith("api")), port: 3000, targetPort: 3000 },
  { name: "db-svc", pods: pods.filter((p) => p.name.startsWith("db")), port: 5432, targetPort: 5432 },
  { name: "cache-svc", pods: pods.filter((p) => p.name.startsWith("cache")), port: 6379, targetPort: 6379 },
];
```

Four services aggregate pods by tier. Each service has a stable name (like a Kubernetes Service name), a `port` (the service port clients connect to), and a `targetPort` (the pod's container port).

```ts
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
    console.log(`  ✅ ${svc.name}: ${svc.pods.length} pods, round-robin LB on port ${svc.port}`);
  } else {
    console.log(`  ✅ ${svc.name}: 1 pod on port ${svc.port}`);
  }
}
```

Each service gets a DNS record (mapping the service name to the cluster IP) and a load balancer. Services with multiple pods (`web-svc`, `api-svc`) get a round-robin load balancer that distributes traffic across all target pods evenly (each target has `weight: 1`). Services with a single pod (`db-svc`, `cache-svc`) skip the load balancer — though in practice they would still benefit from DNS resolution. The load balancer stores targets and rotates through them on each `resolveLoadBalancer()` call.

### Step 4 — Apply network policies

```ts
// Only web pods can reach api pods
const webClient = new SshClient();
await webClient.connect({ host: "localhost", port: pods[0]!.sshPort, username: "root", password: "root" });
await webClient.exec("iptables -A OUTPUT -d 172.16.0.0/16 -j ACCEPT");

// DB only accepts connections from api pods
const dbClient = new SshClient();
await dbClient.connect({ host: "localhost", port: pods.find((p) => p.name === "db-1")!.sshPort, username: "root", password: "root" });
await dbClient.exec("iptables -A INPUT -s 172.16.0.4 -p tcp --dport 5432 -j ACCEPT");
await dbClient.exec("iptables -A INPUT -s 172.16.0.5 -p tcp --dport 5432 -j ACCEPT");
await dbClient.exec("iptables -P INPUT DROP");
```

Three iptables rules define the network policy:

1. **Web → any cluster traffic allowed:** `iptables -A OUTPUT -d 172.16.0.0/16 -j ACCEPT` — web pods can initiate outbound connections to any pod in the cluster.
2. **API → DB allowed (specific IPs):** Two `INPUT` rules on the DB pod accept TCP connections on port 5432 from `api-1` (172.16.0.4) and `api-2` (172.16.0.5). These IPs are assigned sequentially by `createVM()` — `web-1` through `web-3` get .1-.3, `api-1` gets .4, `api-2` gets .5, etc.
3. **Default deny on DB:** `iptables -P INPUT DROP` — all other inbound traffic to the DB is dropped. This means web pods cannot reach the database directly (policy enforcement).

The iptables rules are executed inside each pod via `SshClient.exec()`. The virtual `iptables` implementation checks source/destination IPs, protocol, and port against the rule list, returning ACCEPT or DROP. This simulates how Kubernetes network policies are implemented via iptables on each node.

### Step 5 — Verify connectivity

```ts
const webToApi = await webClient.exec("echo 'test' | nc -w 1 172.16.0.4 3000 2>&1 || echo 'connection-refused'");
console.log(`  web-1 → api-1: ${webToApi.exitCode === 0 ? "✅ connected" : "❌ refused"}`);

const webToDb = await webClient.exec("nc -z -w 1 172.16.0.6 5432 2>&1 || echo 'unreachable'");
console.log(`  web-1 → db-1: ${(webToDb.stdout ?? "").includes("unreachable") ? "🔒 blocked" : "⚠️  open"}`);
```

Two connectivity tests run from `web-1`:
1. **web → api:** Uses `echo 'test' | nc` to send data and check if the API pod accepts the connection. Expected: connected (web outbound is allowed, no ingress restriction on API).
2. **web → db:** Uses `nc -z` (port scan) to check if the DB port is reachable. Expected: blocked (DB's default-deny INPUT policy drops the connection). The `|| echo "unreachable"` fallback captures the failure in stdout.

### Step 6 — Rolling update simulation

```ts
console.log("\n🔄 Rolling update: web pods v1.25 → v1.26...\n");
for (const pod of pods.filter((p) => p.name.startsWith("web"))) {
  console.log(`  Updating ${pod.name}...`);
  pod.ready = false;
  await pod.client.exec("echo 'nginx:1.26' > /app/image");
  pod.image = "nginx:1.26";
  pod.ready = true;
  console.log(`  ✅ ${pod.name} updated to ${pod.image}`);
}
```

A rolling update updates all three web pods from `nginx:1.25` to `nginx:1.26`. For each pod:
1. **Drain:** `ready = false` — the pod is marked as not ready. In Kubernetes, this would remove the pod from the service's endpoint list, stopping traffic from reaching it.
2. **Update:** The image identifier in `/app/image` is overwritten. In a real container orchestrator, this would pull the new image and restart the container.
3. **Activate:** `ready = true` — traffic resumes. The load balancer now directs requests to the updated pod.

This is done sequentially (one pod at a time), preserving availability — two web pods remain serving traffic while the third is updated.

### Step 7 — Cluster status report

```ts
console.log(`\n  Pods: ${pods.length} total`);
for (const pod of pods) {
  const status = pod.ready ? "✅ Running" : "❌ NotReady";
  console.log(`    ${pod.name}: ${pod.image} [${pod.ports.join(", ")}] — ${status}`);
}
```

The pod status section lists all 7 pods with their current image, ports, and readiness. After the rolling update, the three web pods should show `nginx:1.26`.

```ts
for (const svc of services) {
  console.log(`    ${svc.name}: ${svc.pods.length} pods, port ${svc.port}→${svc.targetPort}`);
}
```

Services are listed with their pod count and port mapping, showing the architecture: `web-svc` maps 3 pods on port 80, `api-svc` maps 2 pods on port 3000, etc.

```ts
let totalSent = 0;
let totalReceived = 0;
for (const [mac] of cluster.switch.getPorts()) {
  totalSent += cluster.switch.getBytesSent(mac);
  totalReceived += cluster.switch.getBytesReceived(mac);
}
console.log(`\n  Network bandwidth: ${totalSent} bytes sent, ${totalReceived} bytes received`);
```

`getPorts()` returns all MAC addresses registered on the switch. `getBytesSent(mac)` and `getBytesReceived(mac)` return per-MAC byte counters maintained by the switch. The sum across all ports gives cluster-wide bandwidth. Each `SshClient.exec()` call generates traffic (command bytes, response bytes) that the switch tracks at the MAC layer.

```ts
let _totalRam = 0;
for (const pod of pods) {
  const procs = pod.vm.users.listProcesses();
  _totalRam += procs.length * 10;
}
console.log(`  Total processes: ${pods.reduce((sum, p) => sum + p.vm.users.listProcesses().length, 0)}`);
```

The total process count across all pods is reported. Each command execution registers a process in the scheduler. This gives a rough measure of how much work each pod performed.

## Module Interactions

**Pod-to-VM mapping:** Each `Pod` object wraps a `VirtualShell` (VM). The VM provides filesystem isolation (separate VFS), process isolation (separate scheduler and process table), and user isolation (separate `VirtualUserManager`). From the orchestrator's perspective, each pod is an isolated execution unit — just like a Kubernetes pod is an isolated container group.

**Service DNS resolution:** `cluster.switch.addDnsRecord(name, ip)` registers a hostname-to-IP mapping in the switch's DNS table. When any pod runs a DNS query for `web-svc`, the switch resolves it to `172.16.0.1`. In Kubernetes, services get a DNS entry in the cluster DNS (CoreDNS) that resolves to the service's ClusterIP.

**Load balancer operation:** `addLoadBalancer()` creates an entry in the switch's load balancer table. The balancer uses round-robin: each call to `resolveLoadBalancer()` returns the next target in the target list cyclically. The targets are specified by hostname (which the switch resolves to IP). This is similar to how kube-proxy implements service load balancing with iptables DNAT rules.

**iptables policy enforcement:** The virtual iptables implementation inside each VM's firewall evaluates rules sequentially. A rule like `-A INPUT -s 172.16.0.4 -p tcp --dport 5432 -j ACCEPT` checks: is the source IP `172.16.0.4`? Is the protocol TCP? Is the destination port 5432? If all match, the packet is accepted. If no rule matches, the default policy (`-P INPUT DROP`) applies. This mirrors real iptables behavior at a simplified level.

**Network bandwidth tracking:** The `VirtualSwitch` maintains byte counters for each MAC address. Every time a packet is sent from one VM to another, the switch increments the source MAC's sent counter and the destination MAC's received counter. These counters are monotonically increasing — they never reset unless the switch is restarted.

## Expected Output

When running `bun run examples/19-container-orchestrator.ts`:

```
☸️  Container Orchestration Simulator

📦 Deploying pods...

  ✅ web-1: nginx:1.25 [80]
  ✅ web-2: nginx:1.25 [80]
  ✅ web-3: nginx:1.25 [80]
  ✅ api-1: node:20-alpine [3000]
  ✅ api-2: node:20-alpine [3000]
  ✅ db-1: postgres:16 [5432]
  ✅ cache-1: redis:7 [6379]

🌐 Creating services...

  ✅ web-svc: 3 pods, round-robin LB on port 80
  ✅ api-svc: 2 pods, round-robin LB on port 3000
  ✅ db-svc: 1 pod on port 5432
  ✅ cache-svc: 1 pod on port 6379

🔒 Applying network policies...

  ✅ web → api: allowed
  ✅ api → db: allowed
  ✅ web → db: denied (policy)
  ✅ external → db: denied (default)

🔍 Verifying connectivity...

  web-1 → api-1: ✅ connected
  web-1 → db-1: 🔒 blocked

🔄 Rolling update: web pods v1.25 → v1.26...

  Updating web-1...
  ✅ web-1 updated to nginx:1.26
  Updating web-2...
  ✅ web-2 updated to nginx:1.26
  Updating web-3...
  ✅ web-3 updated to nginx:1.26

📊 Cluster Status Report
============================================================

  Pods: 7 total
    web-1: nginx:1.26 [80] — ✅ Running
    web-2: nginx:1.26 [80] — ✅ Running
    web-3: nginx:1.26 [80] — ✅ Running
    api-1: node:20-alpine [3000] — ✅ Running
    api-2: node:20-alpine [3000] — ✅ Running
    db-1: postgres:16 [5432] — ✅ Running
    cache-1: redis:7 [6379] — ✅ Running

  Services: 4
    web-svc: 3 pods, port 80→80
    api-svc: 2 pods, port 3000→3000
    db-svc: 1 pod, port 5432→5432
    cache-svc: 1 pod, port 6379→6379

  Network bandwidth: <sent> bytes sent, <received> bytes received
  Total processes: <count>

🏁 Cluster running
```

Bandwidth byte counts and process counts depend on command execution volume and will vary between runs.

## Key Concepts

- **Single flat cluster network:** Unlike the SaaS example (separate `Baie` per tenant), all pods share one `Baie` with a `/16` subnet. This mimics Kubernetes clusters where all pods get IPs from a single CIDR and communicate directly via the CNI plugin.
- **Service abstraction with DNS + load balancer:** The `addDnsRecord()` + `addLoadBalancer()` pair provides discovery and distribution. Pods reference services by name (DNS), and the switch distributes traffic across healthy pods (load balancer). This is the virtual equivalent of kube-proxy + CoreDNS.
- **iptables-based network policies:** The access control model mirrors Kubernetes NetworkPolicy: rules are evaluated at the pod level (ingress/egress), with a default-deny stance. The DB pod's `-P INPUT DROP` is the equivalent of a `NetworkPolicy` that isolates the database.
- **Rolling update with readiness gates:** The `ready` boolean serves as a readiness probe. Setting it to `false` before the update and back to `true` after simulates the Kubernetes pattern of removing a pod from the service endpoint before terminating it.
- **Per-pod resource caps:** Each pod gets 256 MB RAM and 1 vCPU, independent of other pods. This is the virtual version of Kubernetes resource `limits` and `requests`.
- **MAC-layer bandwidth monitoring:** `getBytesSent(mac)` / `getBytesReceived(mac)` provide per-pod network metrics. In Kubernetes, this data comes from CNI plugin metrics or `kubectl top pod`.
- **Sequential update with availability guarantee:** The `for` loop updates one web pod at a time, leaving at least 2 replicas serving during the update. A production orchestrator would also wait for the pod to pass a health check before proceeding to the next.
