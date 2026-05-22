---
title: 99 - Full-Stack Infrastructure
group: Examples
---

# Example 99 Guide — Full Virtual Infrastructure

This example is an **integration scenario** that chains all major
modules of the project in a realistic flow. No mocks, no simulation: each
module is instantiated and used as it would be in a real application.

---

## Architecture

```
VirtualSwitch "10.0.100.0/24"
 ├── web-01 (10.0.100.10)
 │    ├── VirtualFileSystem      (files, resolvers, hooks)
 │    ├── VirtualUserManager     (users, groups, sessions, quotas)
 │    ├── VirtualNetworkManager  (interface eth0, route, firewall)
 │    ├── VirtualPackageManager  (registry, search)
 │    ├── ProcessScheduler       (processes, timeslices)
 │    └── IdleManager            (freeze/thaw, GC)
 │
 └── db-01  (10.0.100.20)
      └── VirtualNetworkManager  (interface eth0, firewall)
```

The `VirtualSwitch` manages the network *between* VMs. Each `VirtualShell`
manages its *internal* state (VFS, users, packages, local firewall).

External access is provided by `VirtualProxy`, which forwards host ports to
VM ports.

---

## Module tree and interaction

When `VirtualShell` is initialized (`ensureInitialized()`), it creates and
wires up these subsystems:

- `shell.vfs` — `VirtualFileSystem` (the root filesystem)
- `shell.users` — `VirtualUserManager` (accounts, groups, sessions, processes)
- `shell.network` — `VirtualNetworkManager` (interfaces, routes, firewall)
- `shell.packageManager` — `VirtualPackageManager` (registry, search)
- `shell.idleState` / `shell.enableIdleManagement()` — `IdleManager`
- `shell.startTime` — epoch timestamp of initialization

The subsystems are independent but communicate through the shell:
- `VirtualUserManager.registerProcess()` adds processes to the scheduler
- `VirtualUserManager.setQuotaBytes()` computes usage by scanning `shell.vfs`
- `IdleManager.freeze()` suspends the process scheduler and marks the shell
  for potential GC
- `VirtualShell.executeCommand()` routes through VFS, users, and network
  simultaneously

The `VirtualSwitch` is external — it holds references to shells but does not
own them. The `VirtualProxy` is also external, using the switch and shells
to route external connections.

---

## Scenario: Deploying a two-tier application

The example walks through deploying a web application with a database backend:

1. Create the network and VMs
2. Configure networking on each VM
3. Set up DNS-based service discovery
4. Configure firewalls (web: open 22/80/443, db: MySQL only from web)
5. Create users and assign roles/permissions
6. Add SSH keys for secure authentication
7. Track user sessions and login failures
8. Configure account lockout and expiry policies
9. Set disk quotas
10. Browse available packages (nginx, node)
11. Write application configuration files
12. Add dynamic status endpoint via VFS resolver
13. Run processes (nginx, node, tail)
14. Apply traffic shaping on the network
15. Configure load balancing across web servers
16. Isolate database traffic via network partitions
17. Forward host ports to web-01 for external access
18. Enable idle management and garbage collection
19. Generate system files (/etc/shadow, /etc/group)
20. Read traffic statistics

---

## 1. Infrastructure — virtual switch and VMs

```typescript
import { VirtualShell, VirtualSwitch, VirtualProxy } from "../src";

const net = new VirtualSwitch("10.0.100.0/24");

const web = new VirtualShell("web-01");
await web.ensureInitialized();
const webPort = net.attach(web, "10.0.100.10");

const db = new VirtualShell("db-01");
await db.ensureInitialized();
const dbPort = net.attach(db, "10.0.100.20");
```

The switch `net` is created with subnet `10.0.100.0/24`. Two shells are
created and attached. `attach()` registers the VM with the switch and
returns a `PortInfo` with the assigned IP and an auto-generated MAC address.

The switch now knows about both VMs but has not configured their internal
network stacks — that happens in the next step.

---

## 2. Per-VM network configuration

**web-01:**
```typescript
web.network.addInterface({
  name: "eth0", type: "ether", mac: webPort.mac,
  mtu: 1500, ipv4: "10.0.100.10", ipv4Mask: 24, ipv6: "::1", speed: 1000,
});
web.network.setInterfaceState("eth0", "UP");
web.network.addRoute("0.0.0.0/0", "10.0.100.1", "0.0.0.0", "eth0");
```

**db-01:**
```typescript
db.network.addInterface({
  name: "eth0", type: "ether", mac: dbPort.mac,
  mtu: 1500, ipv4: "10.0.100.20", ipv4Mask: 24, ipv6: "::1", speed: 1000,
});
db.network.setInterfaceState("eth0", "UP");
```

Each VM declares its `eth0` interface with the MAC and IP assigned by the
switch. The web VM adds a default route pointing to `10.0.100.1` (the
switch as gateway). The db VM does not need a default route — it only
talks to the web tier.

**Key insight:** The switch's `attach()` and the VM's `addInterface()` are
separate operations. The switch is the network fabric; `addInterface()` is
the VM's local configuration (like `/etc/network/interfaces`). Both must
exist for connectivity to work.

---

## 3. DNS service discovery

```typescript
net.addDnsRecord("web-01", "10.0.100.10");
net.addDnsRecord("db-01", "10.0.100.20");

console.log(`  web-01 → ${net.resolveDns("web-01")}`);
console.log(`  db-01  → ${net.resolveDns("db-01")}`);
```

Hostnames are registered at the switch level. Any VM (or external system)
can resolve them. The switch acts as a simple DNS server for the subnet.

In a real deployment, the web tier would resolve `db-01` to find the
database IP, and the proxy would resolve `web-01` for port forwarding.

---

## 4. Firewall configuration

**web-01 (accept SSH, HTTP, HTTPS; drop everything else):**
```typescript
web.network.addFirewallRule({ chain: "INPUT", protocol: "tcp", destPort: 22, action: "ACCEPT" });
web.network.addFirewallRule({ chain: "INPUT", protocol: "tcp", destPort: 80, action: "ACCEPT" });
web.network.addFirewallRule({ chain: "INPUT", protocol: "tcp", destPort: 443, action: "ACCEPT" });
web.network.setPolicy("INPUT", "DROP");
```

**db-01 (accept MySQL only from web-01; drop everything else):**
```typescript
db.network.addFirewallRule({ chain: "INPUT", protocol: "tcp", source: "10.0.100.10", destPort: 3306, action: "ACCEPT" });
db.network.setPolicy("INPUT", "DROP");
```

The db firewall is more restrictive: it only allows MySQL (port 3306) from
the web VM's IP. All other traffic is dropped by the default policy.

```typescript
const routeWebToDb = await net.route({ srcIp: "10.0.100.10", srcMac: webPort.mac, dstIp: "10.0.100.20", protocol: "tcp", dstPort: 3306 });
const routeDbToWeb = await net.route({ srcIp: "10.0.100.20", srcMac: dbPort.mac, dstIp: "10.0.100.10", protocol: "tcp", dstPort: 80 });
```

`net.route()` simulates a packet traversing the switch. It checks:
1. Are source and destination in the same partition?
2. Does the destination VM exist?
3. Are there traffic rules or qdiscs that affect delivery?

The return value `{ action, ... }` tells us whether the packet would be
forwarded or dropped at the switch level. This is **separate** from the
per-VM firewall check (`checkFirewall`), which happens inside the
destination VM.

```typescript
console.log(`  web  check MySQL = ${web.network.checkFirewall("INPUT", "tcp", "10.0.100.10", "10.0.100.20", 3306)}`);
console.log(`  db   check MySQL = ${db.network.checkFirewall("INPUT", "tcp", "10.0.100.20", "10.0.100.20", 3306)}`);
```

Two firewall checks:
- web's own firewall on MySQL traffic → DROP (web doesn't allow MySQL)
- db's firewall on MySQL traffic from web → ACCEPT (rule matches)

A packet from web to db:3306 would pass the switch routing, reach db-01,
and be accepted by db's firewall. This is the intended flow.

---

## 5. Users, groups, and sudo

```typescript
await web.users.addUser("admin", "s3cret!");
await web.users.addUser("developer", "dev-pass");
await web.users.addUser("deploy", "deploy-token");

web.users.createGroup("wheel", 1000);
web.users.createGroup("developers", 2000);
web.users.addGroupMember("wheel", "admin");
web.users.addGroupMember("developers", "admin");
web.users.addGroupMember("developers", "developer");
```

Three users are created on web-01. The `wheel` group (GID 1000) is a
traditional Unix admin group. `developers` is a functional group for
development staff. Admin is in both groups; developer is in developers only.

```typescript
await web.users.addSudoer("admin");
```

Admin is granted sudo privileges. `isSudoer()` transitions from `false` to
`true` after `addSudoer()`.

```typescript
await web.users.setPasswordAging("developer", 1, 90, 7, 30);
```

Developer's password must be changed at least every 90 days, with 7 days
of warning and a 30-day grace period before account lockout.

---

## 6-8. SSH keys, sessions, login tracking, and locking

```typescript
web.users.addAuthorizedKey("admin", "ssh-ed25519", Buffer.from("AAAAC3NzaC1lZDI1NTE5AAAAI..."));
```

An SSH authorized key is added for admin. This is stored and can be
exported to `~/.ssh/authorized_keys`.

Sessions are registered for all three users. Login failures are simulated
for developer (3 failed attempts from `10.0.99.99`). The failure count is
read, checked against the lockout threshold, then reset.

Deploy's account is locked and then unlocked. Developer's account is set to
expire in 30 days via `setAccountExpiry()`.

---

## 9. Quotas

```typescript
await web.users.setQuotaBytes("developer", 50 * 1024 * 1024);
console.log(`  developer quota: ${web.users.getQuotaBytes("developer")} bytes`);
console.log(`  developer usage: ${web.users.getUsageBytes("developer")} bytes`);
```

`setQuotaBytes()` sets a 50 MB disk quota. `getUsageBytes()` calculates
actual usage by scanning the user's home directory in the VFS
(`/home/developer/`). Since we haven't created any files for developer,
usage is 0 bytes.

Quota enforcement would occur during `writeFile()` — if the user exceeds
their quota, the write is rejected. This is analogous to `quota` / `edquota`
on Linux.

---

## 10. Package management

```typescript
web.packageManager.load();
console.log(`  available packages: ${web.packageManager.listAvailable().length}`);
const nginxPkg = web.packageManager.findInRegistry("nginx");
```

`load()` populates the internal package registry from a built-in package
database. `listAvailable()` returns all packages. `findInRegistry()` does a
name search and returns the package metadata (version, description,
dependencies).

The package manager does not actually install packages — it simulates a
registry lookup. This is useful for testing infrastructure that checks
whether a package exists before proceeding with configuration.

---

## 11-12. VFS: files, directories, and advanced hooks

```typescript
web.vfs.mkdir("/etc/nginx", 0o755);
web.vfs.mkdir("/var/www", 0o755);
web.vfs.mkdir("/var/log", 0o755);

web.vfs.writeFile("/etc/nginx/nginx.conf", "worker_processes auto;\nevents {}\nhttp {\n    include /etc/nginx/sites-enabled/*;\n}\n");
web.vfs.writeFile("/var/www/index.html", "<h1>Hello from web-01</h1>");
web.vfs.writeFile("/var/log/access.log", "");
```

Directories and files are created on the VFS, mimicking a real web server's
filesystem. The VFS stores all content in an in-memory tree structure.

```typescript
web.vfs.registerContentResolver("/var/www", (path) => {
  if (path === "/var/www/status.json") {
    return JSON.stringify({ status: "ok", hostname: "web-01", uptimeMs: Date.now() - web.startTime });
  }
  return null;
});
```

A content resolver dynamically generates `/var/www/status.json` on read.
It returns the current uptime (`web.startTime` is set during
`ensureInitialized()`), so each read produces a different uptime value.

```typescript
web.vfs.onBeforeWrite("/etc", () => {
  console.log("  (audit: /etc write detected)");
});
web.vfs.writeFile("/etc/test-hook", "should trigger hook");
```

A `beforeWrite` hook on `/etc` fires on every write under that directory.
Writing to `/etc/test-hook` triggers the audit message. The hook does not
block — it's purely observational. A read-only guard (like the one in
example 25) would throw to block.

---

## 13. Process scheduling

```typescript
web.users.enableScheduler();

const pid1 = web.users.registerProcess("admin", "nginx", ["-g", "daemon off;"], "/dev/pts/0");
const pid2 = web.users.registerProcess("developer", "node", ["app.js"], "/dev/pts/1");
const pid3 = web.users.registerProcess("developer", "tail", ["-f", "/var/log/access.log"], "/dev/pts/1");
```

`enableScheduler()` activates the CFS (Completely Fair Scheduler)
simulation. Three processes are registered with their command, arguments,
and controlling TTY. Each gets a unique PID.

The scheduler tracks:
- Per-process state (running, sleeping, stopped, zombie)
- CPU time allocation (fair-share based on nice value, default 0)
- Run queue with priority ordering
- Context switch count

```typescript
web.users.killProcess(pid3, 9);
web.users.unregisterProcess(pid1);
web.users.unregisterProcess(pid2);
```

`tail` is terminated with SIGKILL (signal 9), and the other two processes
are unregistered (clean exit). After cleanup, the scheduler stats show
the remaining run queue length and total context switches.

---

## 14-16. Traffic shaping, load balancing, and partitions

Traffic shaping adds 5ms latency with ±2ms jitter to web-01's traffic. A
netem qdisc with 1% packet loss and 50ms latency is stacked on top.

A load balancer on port 80 (round-robin, single target web-01) is created.
Three requests are resolved against it.

Network partitions isolate web and db — they are placed in separate
partitions, then partitions are cleared to restore connectivity.

---

## 17. Port forwarding

```typescript
const proxy = new VirtualProxy({
  getVM: (name: string) => name === "web-01" ? web : undefined,
  switch: net,
  listVMs: () => [{ hostname: "web-01", ip: "10.0.100.10", shell: web }],
});

proxy.exposePort("web-01", 80, 35801);
proxy.exposePort("web-01", 22, 35802);
```

The `VirtualProxy` is constructed with an adapter object rather than a
`Baie` instance. This allows custom resolution logic. The proxy creates
real TCP listeners on host ports 35801 (→ web-01:80) and 35802 (→ web-01:22).

After a brief async delay, `listPorts()` confirms 2 active forwards. They
are listed, then `proxy.stop()` tears them down.

---

## 18. Idle management

```typescript
web.enableIdleManagement({ gcIntervalMs: 60000 });
console.log(`  idle state: ${web.idleState}`);
console.log(`  idle ms: ${web.idleMs}`);
web.pingIdle();
const gc = web.runGc();
```

Idle management is enabled with a 60-second GC interval. The shell is
immediately active. `pingIdle()` resets the idle timer. `runGc()` forces
a garbage collection pass, reporting terminated processes and evicted files.

After cleanup, `disableIdleManagement()` stops the idle timer and GC
intervals.

---

## 19-20. System files and statistics

```typescript
console.log(`  shadow entries: ${web.users.generateShadowFile().split("\n").length}`);
console.log(`  group entries:  ${web.users.generateGroupFile().split("\n").length}`);

console.log(`  ${webPort.mac} sent:     ${net.getBytesSent(webPort.mac)} bytes`);
console.log(`  ${webPort.mac} received: ${net.getBytesReceived(webPort.mac)} bytes`);
```

`generateShadowFile()` and `generateGroupFile()` produce standard Unix
system files from the current user/group state.

`getBytesSent()` and `getBytesReceived()` read the switch's traffic
counters, which track simulated bytes from `route()` calls.

---

## Cleanup

```typescript
net.detach(webPort.mac);
net.detach(dbPort.mac);
console.log(`  ports remaining: ${net.getPorts().size}`);
```

Both VMs are detached from the switch. The shells remain in memory but are
no longer reachable via the virtual network.

---

## Expected output

When you run `bun run examples/99-full-stack.ts`, the output is
approximately 60+ lines showing every step of the deployment:
IPs and MACs, DNS resolutions, firewall check results, user/group
memberships, package info, file stats, process PIDs, load balancer routing,
forwarding ports, idle state, GC stats, system file counts, and traffic
counters.

---

## Modules covered

| Module | API used |
|--------|----------|
| `VirtualSwitch` | `attach`, `detach`, `addDnsRecord`, `resolveDns`, `listDnsRecords`, `route`, `setTrafficRule`, `addQdiscRule`, `getQdiscRules`, `addLoadBalancer`, `resolveLoadBalancer`, `setPartitions`, `clearPartitions`, `getBytesSent`, `getBytesReceived`, `getPorts` |
| `VirtualShell` | Constructor, `ensureInitialized`, `enableIdleManagement`, `disableIdleManagement`, `pingIdle`, `runGc`, `idleState`, `idleMs`, `startTime` |
| `VirtualFileSystem` | `mkdir`, `writeFile`, `readFile`, `stat`, `registerContentResolver`, `onBeforeWrite`, `offBeforeRead`, `offBeforeWrite` |
| `VirtualUserManager` | `addUser`, `createGroup`, `addGroupMember`, `getUserAllGroups`, `isSudoer`, `addSudoer`, `setPasswordAging`, `getPasswordAging`, `isPasswordExpired`, `addAuthorizedKey`, `getAuthorizedKeys`, `registerSession`, `listActiveSessions`, `recordLoginFailure`, `getLoginFailures`, `resetLoginFailures`, `isAccountLockedByFailures`, `lockAccount`, `unlockAccount`, `isAccountLocked`, `setAccountExpiry`, `setQuotaBytes`, `getQuotaBytes`, `getUsageBytes`, `enableScheduler`, `registerProcess`, `getProcess`, `killProcess`, `unregisterProcess`, `getSchedulerStats`, `generateShadowFile`, `generateGroupFile` |
| `VirtualNetworkManager` | `addInterface`, `setInterfaceState`, `addRoute`, `addFirewallRule`, `setPolicy`, `checkFirewall` |
| `VirtualPackageManager` | `load`, `listAvailable`, `findInRegistry` |
| `VirtualProxy` | Constructor, `exposePort`, `listPorts`, `stop` |

---

## Key difference: VirtualSwitch vs VirtualNetworkManager

| | `VirtualSwitch` | `VirtualNetworkManager` |
|---|---|---|
| Role | Network *between* VMs | *Internal* network of a VM |
| API | `route()`, `attach()`, `addDnsRecord()` | `addInterface()`, `addRoute()`, `addFirewallRule()` |
| Scope | All attached VMs | A single VM |
| Real-world equivalent | Physical router/switch + DNS | `/etc/network/interfaces` + iptables |

Both are complementary: the local firewall (`checkFirewall`) decides whether
a packet is accepted by the VM; the switch (`route`) decides whether the
packet reaches it in the first place.

---

## Key patterns demonstrated

- **Separation of concerns:** Each subsystem (VFS, users, network,
  packages, scheduler, idle) is independent and testable in isolation.
  The shell composes them without coupling.
- **Two-tier networking:** Internal firewall (per-VM) + switch routing
  (inter-VM) provides defense in depth.
- **Dynamic content generation:** Content resolvers produce real-time
  data (uptime, status) without filesystem writes.
- **Resource lifecycle management:** Processes are created, terminated,
  and cleaned up. Idle management suspends the shell to free resources.
- **Standard format compatibility:** Shadow files, group files, firewall
  output, and routing tables all match standard Unix formats.
