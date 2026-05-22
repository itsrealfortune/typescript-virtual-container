---
title: 99 - Full-Stack Infrastructure
group: Examples
---

# Example 99 — Full-Stack Infrastructure

## The Scenario

Deploy a two-tier application (web + database) with users, network policies,
service discovery, traffic shaping, and monitoring. This is the most
comprehensive example — it chains every major module in a single realistic
flow: `VirtualShell`, `VirtualFileSystem`, `VirtualUserManager`,
`VirtualNetworkManager`, `VirtualPackageManager`, `VirtualSwitch`,
`VirtualProxy`, `IdleManager`, and `ProcessScheduler`.

## Modules Used

- **`VirtualSwitch`** — Network fabric between VMs (routing, DNS, traffic shaping, load balancing, partitions)
- **`VirtualShell`** — VM environment with VFS, users, network, packages, scheduler, idle management
- **`VirtualProxy`** — Expose VM ports to the host
- **`VirtualFileSystem`** — In-memory filesystem with content resolvers and hooks
- **`VirtualUserManager`** — Users, groups, sudo, password policies, sessions, quotas, process scheduler
- **`VirtualNetworkManager`** — Per-VM interfaces, routes, firewall rules
- **`VirtualPackageManager`** — Package registry lookup
- **`IdleManager`** — Freeze/thaw lifecycle and garbage collection

## Step-by-Step Walkthrough

### Infrastructure

A `VirtualSwitch` is created on `10.0.100.0/24`. Two `VirtualShell` instances
are created and attached via `switch.attach()`, which assigns IPs (10.0.100.10
and 10.0.100.20) and auto-generates MAC addresses.

The switch knows about both VMs but has not configured their internal stacks.

### Per-VM network configuration

Each VM declares its `eth0` interface via `shell.network.addInterface()` with
the MAC and IP from the switch. The web VM adds a default route via
`10.0.100.1` (switch as gateway). The switch's `attach()` and the VM's
`addInterface()` are separate — the switch is the fabric, `addInterface()` is
the VM's local config (like `/etc/network/interfaces`).

### DNS service discovery

Hostnames are registered on the switch with `addDnsRecord()`. Any VM can
resolve them. The switch acts as a simple DNS server for the subnet.

### Firewall

Web-01: accepts SSH (22), HTTP (80), HTTPS (443); default policy DROP.
Db-01: accepts MySQL (3306) only from web-01's IP; default policy DROP.

`net.route()` simulates packet traversal through the switch, checking
partitions, VM existence, and traffic rules. `checkFirewall()` does the
per-VM iptables check. These are independent layers: switch routing +
VM firewall.

### Users and groups

Three users are created on web-01 (admin, developer, deploy). Groups `wheel`
and `developers` are created. Admin is in both groups and gets sudo.
Developer's password expires every 90 days with a 7-day warning.

### SSH keys, sessions, login tracking

An SSH authorized key is added for admin. Sessions are registered for all
users. Login failures are simulated for developer (3 attempts from a hostile
IP), counted, checked against the lockout threshold, then reset.

### Account locking and quotas

Deploy's account is locked then unlocked. Developer's account expires in 30
days. Developer gets a 50 MB disk quota.

### Package management

`load()` populates the registry. `listAvailable()` shows 29 packages.
`findInRegistry()` looks up nginx and node metadata.

### VFS files and advanced hooks

Directories and config files are created (nginx.conf, index.html). A content
resolver dynamically generates `/var/www/status.json` with current uptime.
A `beforeWrite` hook on `/etc` fires on writes for audit logging.

### Process scheduling

The CFS scheduler is enabled. Three processes are registered (nginx, node,
tail). Tail is killed with SIGKILL, the others are cleanly unregistered.
Scheduler stats show the run queue and context switches.

### Traffic shaping and load balancing

Web-01 gets a traffic rule (100 Mbps, 5ms latency, 2ms jitter) and a netem
qdisc (50ms latency, 1% packet loss). A round-robin load balancer on port 80
resolves to web-01 across 3 requests.

### Network partitions

Web and db are placed in separate partitions (isolated), then partitions are
cleared to restore connectivity.

### Port forwarding

`VirtualProxy` creates real TCP listeners: host:35801 → web-01:80 and
host:35802 → web-01:22. After a brief async delay, forwards are listed and
then stopped.

### Idle management and GC

Idle management is enabled with a 60-second GC interval. The shell is pinged
as active. `runGc()` forces a garbage collection pass. The manager is then
disabled.

### System files and traffic statistics

`generateShadowFile()` and `generateGroupFile()` produce standard Unix format
outputs. `getBytesSent()`/`getBytesReceived()` read switch traffic counters.

## Module Interactions

When `VirtualShell` initializes, it creates and wires:
- `shell.vfs` — `VirtualFileSystem`
- `shell.users` — `VirtualUserManager`
- `shell.network` — `VirtualNetworkManager`
- `shell.packageManager` — `VirtualPackageManager`

These subsystems communicate through the shell:
- `registerProcess()` adds to the scheduler
- `setQuotaBytes()` computes usage by scanning `shell.vfs`
- `IdleManager.freeze()` suspends the scheduler

The `VirtualSwitch` and `VirtualProxy` are external — they hold references
to shells but do not own them.

**Key distinction:** `VirtualSwitch` manages the network *between* VMs
(routing, DNS, shaping). `VirtualNetworkManager` manages the network
*inside* a single VM (interfaces, firewall, local routes). Both must be
configured for connectivity to work.

## Expected Output

When you run `bun run examples/99-full-stack.ts`, you'll see ~60+ lines
showing:
- IP/MAC assignments for both VMs
- DNS resolution results
- Firewall check results (ACCEPT/DROP)
- User/group memberships and sudo status
- Password aging settings
- Session counts and login failure tracking
- Account lock/unlock status
- Quota and usage stats
- Package registry info
- File stats (nginx.conf line count, index.html size)
- Dynamic status.json content
- Audit hook trigger
- Process list and scheduler stats
- Traffic rule and qdisc confirmations
- Load balancer routing (3 requests)
- Port forwarding list
- Idle state and GC stats
- Shadow and group file entry counts
- Traffic byte counters
- Cleanup confirmation (0 ports remaining)

## Key Concepts

- **Separation of concerns:** Each subsystem is independent and testable in
  isolation. The shell composes them without coupling.
- **Two-tier networking:** Internal firewall (per-VM) + switch routing
  (inter-VM) provides defense in depth.
- **Dynamic content generation:** Content resolvers produce real-time data
  without filesystem writes.
- **Resource lifecycle management:** Processes are created, killed, cleaned
  up. Idle management suspends the shell to free resources.
- **Standard format compatibility:** Shadow files, group files, firewall
  output, and routing tables all match standard Unix formats.
