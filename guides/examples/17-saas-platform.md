---
title: 17 - Multi-Tenant SaaS
group: Examples
---

# Example 17 — Multi-Tenant SaaS Platform

## The Scenario

Software-as-a-Service providers must host multiple customers on shared infrastructure while guaranteeing **hard isolation** between tenants. Each customer's data, user accounts, network traffic, and resource consumption must be invisible to every other customer. Real SaaS platforms achieve this through a combination of virtual private clouds (VPCs), per-tenant database instances, dedicated user directories, and network ACLs. This example simulates a SaaS provider with three tenants (Acme Corp, Globex Inc, Initech), each on an isolated subnet with their own pair of application and database VMs, user accounts, resource caps, and SSH access. After provisioning, cross-tenant isolation is verified by attempting network connections between tenants, and a consolidated resource usage report is generated.

## Modules Used

```ts
import { Baie, SshClient, type VirtualShell, VirtualSshServer } from "../src";
```

- **`Baie`**: The network namespace — each tenant gets their own `Baie` with a unique subnet. This enforces IP-level isolation: tenants on different subnets cannot communicate unless explicitly routed.
- **`SshClient`**: Used for executing commands inside tenant VMs (creating directories, writing configs, running `nc` for isolation checks).
- **`VirtualShell`**: The type for a VM instance. Used in the `Tenant` interface to hold `appVM` and `dbVM` references.
- **`VirtualSshServer`**: A lightweight virtual SSH server that binds to a port on the host and proxies SSH connections into a `VirtualShell`. Each tenant gets their own SSH server on a dynamic port, allowing external clients to SSH into their isolated environment.

## Step-by-Step Walkthrough

### Step 1 — Define the Tenant interface

```ts
interface Tenant {
  id: string;
  baie: Baie;
  appVM: VirtualShell;
  dbVM: VirtualShell;
  sshServer: VirtualSshServer;
  users: string[];
}
```

This TypeScript interface structures all per-tenant state. Each tenant has:
- `id`: A unique identifier (also used as the hostname/DNS prefix).
- `baie`: The isolated network namespace with its own subnet.
- `appVM` and `dbVM`: Two virtual machines for application and database workloads.
- `sshServer`: A `VirtualSshServer` instance that exposes the app VM over SSH.
- `users`: An array of usernames that exist on both VMs.

### Step 2 — Define tenant configurations

```ts
const tenantConfigs = [
  { id: "acme-corp", subnet: "10.10.1.0/24", users: ["admin", "developer", "analyst"] },
  { id: "globex-inc", subnet: "10.10.2.0/24", users: ["admin", "engineer"] },
  { id: "initech", subnet: "10.10.3.0/24", users: ["admin", "devops", "qa", "manager"] },
];
```

Three tenants with distinct subnets (10.10.x.0/24) and varying numbers of users. The subnets are deliberately non-overlapping — this is the foundation of network isolation. Acme gets 3 users, Globex gets 2, Initech gets 4. All tenants have an `admin` user (a common SaaS pattern where the provider or customer admin gets root-like access).

### Step 3 — Provision each tenant

```ts
for (const config of tenantConfigs) {
  const baie = new Baie(config.id, config.subnet);
  const appVM = await baie.createVM("app");
  const dbVM = await baie.createVM("db");
```

Iteration begins: for each tenant, a new `Baie` is created with its own subnet. This is the **critical isolation boundary** — each `Baie` creates a separate `VirtualSwitch` instance. Two VMs are provisioned: `"app"` for the application tier and `"db"` for the database tier. The `baie.createVM()` call attaches each VM to the tenant's switch and assigns an IP from the tenant's subnet.

```ts
  appVM.vfs.setRamCap(100 * 1024 * 1024);
  appVM.users.setCpuCapCores(2);
  dbVM.vfs.setRamCap(200 * 1024 * 1024);
  dbVM.users.setCpuCapCores(2);
```

Resource caps are per-VM and per-tenant: the app VM gets 100 MB RAM and 2 vCPUs, the database VM gets 200 MB RAM (heavier workload) and 2 vCPUs. Because each VM is isolated, these caps apply independently — Acme's app VM cannot consume Globex's allocated resources.

```ts
  for (const username of config.users) {
    appVM.users.addUser(username, "password123");
    dbVM.users.addUser(username, "password123");
  }
```

Each user is created on **both** the app and db VMs with the same password. `addUser()` registers the user in the virtual user database, creates a home directory at `/home/<username>`, and assigns a primary group matching the username. Having the same users on both VMs means an authenticated user can access both tiers without re-authentication.

```ts
  const appClient = new SshClient();
  await appClient.connect({ host: "localhost", port: appPort, username: "root", password: "root" });
  await appClient.exec(
    "mkdir -p /app/config /app/logs /app/data && " +
    `echo '{"tenant":"${config.id}","env":"production"}' > /app/config/app.json && ` +
    "echo 'App initialized' > /app/logs/init.log"
  );
```

The application environment is set up via SSH commands: create standard directories (`/app/config`, `/app/logs`, `/app/data`), write a JSON config file identifying the tenant, and log initialization. The config file is tenant-specific — `acme-corp` writes `{"tenant":"acme-corp","env":"production"}` — making it easy to verify which tenant owns which VFS state.

```ts
  const dbClient = new SshClient();
  await dbClient.connect({ host: "localhost", port: dbPort, username: "root", password: "root" });
  await dbClient.exec(
    "mkdir -p /var/lib/db /var/log/db && " +
    `echo 'CREATE DATABASE ${config.id.replace(/-/g, "_")};' > /var/lib/db/init.sql && ` +
    "echo 'Database initialized' > /var/log/db/init.log"
  );
```

The database VM gets a similar setup: data and log directories, plus a SQL init script that creates a database named after the tenant (with hyphens replaced by underscores: `acme_corp`, `globex_inc`, `initech`). This mirrors real SaaS patterns where each tenant gets a separate database or schema.

```ts
  const sshServer = new VirtualSshServer({ port: 0, shell: appVM });
  await sshServer.start();
```

Each tenant gets a `VirtualSshServer` bound to the app VM. The `port: 0` parameter means the OS assigns a random available port. `start()` begins listening on that port, proxying SSH connections into the app VM's shell. This simulates how SaaS platforms provide SSH access per customer — each tenant connects to their own port and sees only their own environment.

```ts
  tenants.push({ id: config.id, baie, appVM, dbVM, sshServer, users: config.users });
  console.log(`  ✅ ${config.id}: ${config.users.length} users, app+db VMs, SSH on port ${sshServer.port}`);
}
```

The tenant object is collected into the `tenants` array. The console output shows the port assigned to each tenant's SSH server — these are dynamic and will vary between runs.

### Step 4 — Verify cross-tenant isolation

```ts
for (let i = 0; i < tenants.length; i++) {
  for (let j = 0; j < tenants.length; j++) {
    if (i === j) continue;

    const t1 = tenants[i]!;
    const t2 = tenants[j]!;

    const appClient = new SshClient();
    await appClient.connect({ host: "localhost", port: t1.appPort, username: "root", password: "root" });
    const result = await appClient.exec(`nc -z -w 1 ${t2.baie.switch.gateway} 5432 2>&1 || echo "unreachable"`);

    const isolated = result.stdout!.includes("unreachable") || result.exitCode !== 0;
    console.log(`  ${t1.id} → ${t2.id}: ${isolated ? "🔒 isolated" : "⚠️  connected"}`);
  }
}
```

Every pair of distinct tenants is tested: from tenant A's app VM, try to connect to tenant B's switch gateway on port 5432 (PostgreSQL default). The `nc -z -w 1` command performs a port scan with a 1-second timeout. If the connection succeeds (exit 0), the tenants are not properly isolated — a critical security failure. If the connection fails or times out (yielding `"unreachable"`), isolation is verified.

Under the hood, this works because each `Baie` creates an independent `VirtualSwitch`. Tenant A's switch has no route to tenant B's subnet. The `nc` command runs inside tenant A's app VM, which only knows about its own `10.10.1.0/24` network. The gateway IP of tenant B (`10.10.2.1`) is unreachable from tenant A's network namespace. The `|| echo "unreachable"` ensures the command exits with code 0 even on failure (so the error is captured in stdout rather than as a non-zero exit).

### Step 5 — Resource usage report

```ts
for (const tenant of tenants) {
  const appProcs = tenant.appVM.users.listProcesses();
  const dbProcs = tenant.dbVM.users.listProcesses();
  const appSwap = tenant.appVM.vfs.getSwapStats();
  const appCache = tenant.appVM.vfs.getCacheStats();
  // ...
}
```

Per-tenant metrics are collected:
- **Process count:** `listProcesses()` returns all registered processes on each VM.
- **Swap stats:** `getSwapStats()` returns `{ filesSwapped: number }` — files that were swapped out to conserve memory.
- **Cache stats:** `getCacheStats()` returns `{ entries: number, hitRate: number }` — the VFS file cache efficiency.

This report proves that each tenant's resource usage is independently measurable. A real SaaS platform would use this for billing (charging per process, per swap, per cache entry) and capacity planning.

### Step 6 — Cleanup

```ts
for (const tenant of tenants) {
  await tenant.sshServer.stop();
}
```

Each tenant's SSH server is stopped, releasing the bound port. This is the virtual equivalent of terminating customer-facing infrastructure.

## Module Interactions

**Network isolation via separate Baie instances:** The `Baie` class internally creates a `VirtualSwitch` bound to the given subnet. Each switch maintains its own ARP table, routing table, DNS records, and load balancer state. Because each tenant gets a separate `Baie` with a non-overlapping subnet, there is no network path between tenants unless explicitly bridged. The `VirtualSwitch.route()` method checks against its own routing table only — it has no knowledge of other `Baie` instances.

**VFS isolation via separate VirtualShell instances:** Each `createVM()` call produces a `VirtualShell` with a brand-new `VirtualFileSystem`. There is no shared inode table, no shared directory tree, and no mount propagation between VMs. Tenant A's `/app/config/app.json` is physically a different object in memory from tenant B's — they do not share any pointers.

**User database isolation:** Each VM has its own `VirtualUserManager`. Users are created per-VM, so the same username ("admin") on two different VMs refers to different UID allocations and different home directories. This means tenants can have overlapping usernames without conflict.

**SSH server per tenant:** Each `VirtualSshServer` is bound to a specific `VirtualShell` (the app VM). When a client connects to port X, the server proxies all SSH protocol messages into that single shell. Since each tenant has a separate `VirtualSshServer` bound to a different shell, there is no risk of a client accidentally landing in the wrong tenant's environment.

## Expected Output

When running `bun run examples/17-saas-platform.ts`:

```
🏢 Setting up Multi-Tenant SaaS Platform


📦 Provisioning tenant: acme-corp
  ✅ acme-corp: 3 users, app+db VMs, SSH on port <dynamic>

📦 Provisioning tenant: globex-inc
  ✅ globex-inc: 2 users, app+db VMs, SSH on port <dynamic>

📦 Provisioning tenant: initech
  ✅ initech: 4 users, app+db VMs, SSH on port <dynamic>

🔒 Verifying tenant isolation...
  acme-corp → globex-inc: 🔒 isolated
  acme-corp → initech: 🔒 isolated
  globex-inc → acme-corp: 🔒 isolated
  globex-inc → initech: 🔒 isolated
  initech → acme-corp: 🔒 isolated
  initech → globex-inc: 🔒 isolated

📊 Resource Usage Report
============================================================

  acme-corp:
    Users: admin, developer, analyst
    App VM: 4 processes
    DB VM: 2 processes
    Swap: 0 files swapped
    Cache: 4 entries, 100% hit rate

  globex-inc:
    Users: admin, engineer
    App VM: 4 processes
    DB VM: 2 processes
    Swap: 0 files swapped
    Cache: 4 entries, 100% hit rate

  initech:
    Users: admin, devops, qa, manager
    App VM: 4 processes
    DB VM: 2 processes
    Swap: 0 files swapped
    Cache: 4 entries, 100% hit rate

🧹 Cleaning up...
All SSH servers stopped
```

The SSH server ports are dynamically assigned and will vary between runs. All 6 cross-tenant isolation checks should show `🔒 isolated`.

## Key Concepts

- **Baie-per-tenant isolation:** Each tenant gets their own `Baie` (network namespace + switch) with a dedicated subnet. This is the strongest form of network isolation — there is no routing between subnets unless explicitly configured. This mirrors how public clouds use VPCs to isolate customer networks.
- **App/DB tier separation within a tenant:** Each tenant has two VMs, simulating a two-tier architecture. The app VM runs application code; the DB VM runs the database. In a real deployment, these would be on separate subnets within the tenant's VPC with firewall rules between them.
- **Per-VM resource caps with independent scheduling:** Each VM's RAM cap, CPU cap, and scheduler operate independently. Acme's app VM cannot affect Initech's database VM performance — the scheduler is per-VM, so there is no shared CPU time queue.
- **`VirtualSshServer` as a tenant access gateway:** Each tenant gets their own SSH server instance on a unique host port. This is the virtual equivalent of giving each tenant a bastion host or VPN endpoint. The port randomization (`port: 0`) simulates dynamic port allocation used in containerized environments.
- **`nc` for isolation verification:** The `nc -z` (zero-I/O mode) command is the standard POSIX tool for testing TCP connectivity without sending data. Combined with `|| echo "unreachable"`, it becomes a reliable isolation test that handles both connection refused and connection timeout.
- **Independent user databases with overlapping usernames:** All tenants have an `admin` user, but each is a separate entry in a separate `VirtualUserManager`. They do not share UIDs, home directories, or password hashes — the same string `"admin"` maps to completely different objects across tenants.
