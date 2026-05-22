# Examples

## Multi-VM network (Baie)

Create multiple virtual machines on a shared subnet with NAT gateway:

```typescript
import { Baie, SshClient } from "typescript-virtual-container";

const baie = new Baie("lab", "10.0.1.0/24");
const web = await baie.createVM("web");
const db  = await baie.createVM("db");
const dbClient = new SshClient(db, "root");

// VMs communicate over the virtual switch
await dbClient.exec("nc -l -p 8080 -v &");
const webClient = new SshClient(web, "root");
const r = await webClient.exec("echo 'hello from web' | nc 10.0.1.3 8080");
console.log(r.stdout); // 'hello from web'

// iptables firewall rules apply to the virtual switch
await webClient.exec("iptables -A OUTPUT -d 10.0.1.3 -j DROP");
// web can no longer reach db
```

## Expose VM ports on the host (VirtualProxy)

Forward VM services to the host machine, or use the SOCKS5 proxy to route
host traffic into the virtual network:

```typescript
import { Baie, VirtualProxy } from "typescript-virtual-container";

const baie = new Baie("demo", "10.0.1.0/24");
const web = await baie.createVM("web");
const proxy = new VirtualProxy(baie);

// Port forwarding: expose VM's port 80 on host:8080
proxy.exposePort("web", 80, 8080);
// curl http://localhost:8080 → reaches VM "web" port 80

// SOCKS5 proxy: route any host traffic into the virtual network
proxy.startSocksProxy(1080);
// curl --proxy socks5://localhost:1080 http://10.0.1.2:3000
```

## Full lab: multi-tier application with firewall

Three-tier web application across three VMs on an isolated virtual network,
exposed to the host.

```typescript
import { Baie, VirtualProxy, SshClient } from "typescript-virtual-container";

// 1. Create a virtual datacenter with a /24 subnet
const lab = new Baie("production", "10.0.1.0/24");

// 2. Boot three VMs — each gets an IP from the subnet
const web  = await lab.createVM("web");     // 10.0.1.2
const api  = await lab.createVM("api");     // 10.0.1.3
const db   = await lab.createVM("db");      // 10.0.1.4

const cWeb = new SshClient(web, "root");
const cApi = new SshClient(api, "root");
const cDb  = new SshClient(db, "root");

// 3. Start services inside each VM
cDb.exec("nc -l -p 5432 -v &");
cApi.exec("nc -l -p 3000 -v &");

// 4. Verify connectivity — web reaches api via virtual IP
const test = await cWeb.exec("echo 'GET /users' | nc 10.0.1.3 3000");
console.log("API reachable from web:", test.exitCode === 0);

// 5. Apply firewall — only web can reach api:3000
cApi.exec("iptables -A INPUT -s 10.0.1.2 -p tcp --dport 3000 -j ACCEPT");
cApi.exec("iptables -P INPUT DROP");

// 6. Expose web VM on the host
const proxy = new VirtualProxy(lab);
proxy.exposePort("web", 80, 8080);
console.log("curl http://localhost:8080 → web VM port 80");
```

Step by step:

| Step | What happens |
|------|-------------|
| `new Baie("prod", "10.0.1.0/24")` | Virtual switch with gateway at .1, pool .2–.254 |
| `createVM("web")` | Boots VirtualShell, IP 10.0.1.2, registered in ARP |
| `nc -l -p 5432` | TCP listener on port 5432 inside db VM |
| `nc 10.0.1.3 3000` | TCP connection web→api via VirtualSwitch |
| `iptables -A INPUT -s 10.0.1.2 -j ACCEPT` | Restrict api ingress to web IP |
| `proxy.exposePort("web", 80, 8080)` | Bind host:8080 → web VM:80 |

## Hosting platform (multi-tenant isolation)

Multiple Baie instances for isolated tenant networks with SSH, NAT,
and port forwarding.

```typescript
import { Baie, VirtualProxy, VirtualSshServer } from "typescript-virtual-container";

async function createTenant(id: string, subnet: string, sshPort: number, httpPort: number) {
	const baie = new Baie(`tenant-${id}`, subnet);
	const vm = await baie.createVM("app");
	const ssh = new VirtualSshServer({ port: 0, shell: vm });
	await ssh.start();
	const proxy = new VirtualProxy(baie);
	proxy.exposePort("app", 22, sshPort);
	proxy.exposePort("app", 80, httpPort);
	return { baie, vm, proxy, ssh };
}

const alice = await createTenant("alice", "10.100.1.0/24", 2201, 8081);
const bob   = await createTenant("bob",   "10.100.2.0/24", 2202, 8082);

// Tenants cannot reach each other — separate subnets, separate switches
```

## VPN between Baie instances

Encrypted tunnel connecting two virtual networks:

```typescript
import { Baie, VirtualVpn } from "typescript-virtual-container";

const paris = new Baie("paris", "10.0.1.0/24");
const tokyo = new Baie("tokyo", "10.0.2.0/24");

const vpn = new VirtualVpn(paris, tokyo, {
    key: "shared-secret",
    latencyMs: 150, // simulate intercontinental latency
});

// VMs in paris can now reach VMs in tokyo
// paris VM ping 10.0.2.3 → routed through encrypted tunnel
```

## Traffic shaping, DNS, load balancer

```typescript
const baie = new Baie("test", "10.0.1.0/24");
const sw = baie.switch;

// DNS: reach VMs by hostname
sw.addDnsRecord("my-app", "10.0.1.5");
console.log(sw.resolveHostname("my-app")); // "10.0.1.5"

// Traffic shaping: add 200ms latency + 10% packet loss
sw.setTrafficRule("*", { latencyMs: 200, packetLossPct: 10 });

// Load balancer: round-robin across two VMs
sw.addLoadBalancer({
    name: "web-lb",
    port: 80,
    targets: [
        { hostname: "web-1", port: 80, weight: 1 },
        { hostname: "web-2", port: 80, weight: 1 },
    ],
    algorithm: "round-robin",
});

// Network partition: isolate groups of VMs
sw.setPartitions([
    ["02:42:0a:00:01:02", "02:42:0a:00:01:03"], // group A
    ["02:42:0a:00:01:04", "02:42:0a:00:01:05"], // group B (isolated from A)
]);

// Bandwidth accounting
console.log(sw.getBytesSent("02:42:0a:00:01:02"));
console.log(sw.getBytesReceived("02:42:0a:00:01:02"));
sw.resetBandwidth();
```

---

# Complete Examples

Run any example with: `npx tsx examples/<number>-<name>.ts`

| # | File | Description |
|---|------|-------------|
| 01 | `01-ssh-server-events.ts` | SSH server event handling |
| 02 | `02-ssh-sftp-shared-state.ts` | SFTP with shared state |
| 03 | `03-multi-user-quotas.ts` | Multi-user disk quotas |
| 04 | `04-persistent-state.ts` | Persistent filesystem state |
| 05 | `05-public-key-auth.ts` | SSH public key authentication |
| 06 | `06-rate-limiting.ts` | Connection rate limiting |
| 07 | `07-snapshot-test-fixtures.ts` | Snapshot-based test fixtures |
| 08 | `08-snapshot-diff.ts` | Filesystem snapshot diffing |
| 09 | `09-symlinks.ts` | Symbolic link operations |
| 10 | `10-honeypot-auditing.ts` | Security auditing with HoneyPot |
| 11 | `11-concurrent-clients.ts` | Multiple concurrent SSH clients |
| 12 | `12-file-cache.ts` | VFS file cache (LRU/LFU/FIFO, disk I/O presets) |
| 13 | `13-process-scheduler.ts` | Process scheduler with nice values and fair-share CPU |
| 14 | `14-swap-store.ts` | Swap file store for memory-constrained environments |
| 15 | `15-fd-and-mounts.ts` | POSIX file descriptors and host directory mounting |
| 16 | `16-cicd-pipeline.ts` | CI/CD pipeline simulation with isolated build stages |
| 17 | `17-saas-platform.ts` | Multi-tenant SaaS platform with isolated environments |
| 18 | `18-honeypot-threat-detection.ts` | Security honeypot with anomaly detection |
| 19 | `19-container-orchestrator.ts` | Kubernetes-like container orchestration simulator |
