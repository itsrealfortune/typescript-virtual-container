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
 │    └── ProcessScheduler       (processes, timeslices)
 │
 └── db-01  (10.0.100.20)
      └── VirtualNetworkManager  (interface eth0, firewall)
```

The `VirtualSwitch` manages the network *between* VMs. Each `VirtualShell` manages
its *internal* state (VFS, users, packages, local firewall).

---

## Flow

### 1. Infrastructure creation

Two `VirtualShell` instances are created and attached to a `VirtualSwitch` via
`switch.attach(shell, ip)`. The attachment assigns an IP and a MAC, and
registers the VM in the switch's routing table.

**Key insight:** `switch.attach()` does not automatically configure
the network interface inside the shell. It is a network bridge: the switch knows
where to find the VM, but the VM must declare its own interface.

### 2. Per-VM network configuration

Each VM declares its interface with `shell.network.addInterface()` then
activates it with `setInterfaceState("eth0", "UP")`. The default route is
added manually — the switch acts as the gateway.

The `VirtualNetworkManager` is **local to each VM**: it models what the VM
"sees" of its own network (like `/etc/network/interfaces`).

### 3. DNS (switch-level)

Hostnames are registered in the switch with `addDnsRecord()`.
Resolution is available via `resolveDns()`. The switch acts
as the DNS server for the subnet.

### 4. Firewall

Two filtering levels coexist:

| Level | Module | Scope | Example |
|-------|--------|-------|---------|
| **iptables** | `VirtualNetworkManager` | Internal to the VM | `checkFirewall()` checks local rules |
| **routing** | `VirtualSwitch.route()` | Traffic between VMs | `route()` directs or blocks packets |

The example illustrates both: iptables rules on each VM + inter-VM
routing via `net.route()`.

### 5. Users and groups

3 users created (admin, developer, deploy) with:
- Automatic primary groups (per-user group)
- Supplementary groups (wheel, developers)
- `addSudoer()` for sudo rights
- `setPasswordAging()` with min/max days and warning

### 6-8. Account security

A credible sequence:
1. Adding an authorized SSH key (`addAuthorizedKey`)
2. Active sessions (`registerSession`, `listActiveSessions`)
3. Simulated login failures (`recordLoginFailure` ×3, `getLoginFailures`, `resetLoginFailures`)
4. Locking/unlocking (`lockAccount`, `unlockAccount`, `isAccountLocked`)
5. Account expiry (`setAccountExpiry`, `isPasswordExpired`)

### 9. Quotas

`setQuotaBytes()` sets a disk usage limit. `getUsageBytes()` reads
actual consumption (size of files in `/home/<user>`).

### 10. Package manager

`packageManager.load()` populates the registry, `listAvailable()` counts
packages, `findInRegistry()` searches for a package by name and exposes its
version and description.

### 11-12. Advanced VFS

The VFS is used to write application configuration (nginx.conf,
index.html), then to demonstrate two advanced features:

- **Content resolver:** `/var/www/status.json` is dynamically generated on
  read, without being stored on disk. The resolver receives the path and
  returns the content or `null` to let it pass through.
- **beforeWrite hook:** `/etc` is monitored. Any write to `/etc`
  triggers a callback (useful for auditing).

### 13. Process scheduler

`enableScheduler()` activates the CFS scheduler. Processes are registered
with `registerProcess()` (command, argv, tty). The example shows:
- Creation of 3 processes (nginx, node, tail)
- Looking up a process by PID (`getProcess()`)
- Termination (`killProcess` with SIGKILL)
- Cleanup (`unregisterProcess`)
- Scheduler statistics (`getSchedulerStats()`)

### 14. Traffic shaping

`setTrafficRule()` configures bandwidth, latency and jitter on a MAC.
`addQdiscRule()` adds a queue discipline (netem with packet
loss). `getQdiscRules()` lists active rules.

### 15. Load balancing

`addLoadBalancer()` creates a round-robin load balancer on port 80.
`resolveLoadBalancer()` returns the next target according to the algorithm.

### 16. Network partitions

`setPartitions()` isolates groups of MAC addresses — VMs in different
partitions cannot communicate. `clearPartitions()` restores
connectivity.

### 17. Port forwarding

`VirtualProxy` exposes VM ports to the host via `exposePort()`.
The example forwards ports 80 and 22 from web-01 to the host. Forwards
are listed with `listPorts()` then stopped with `stop()`.

### 18. Idle management

`enableIdleManagement()` starts the monitor that freezes the shell after
inactivity. The example pings the shell (`pingIdle()`), forces a GC (`runGc()`),
reads the state (`idleState`, `idleMs`), then disables the manager.

### 19-20. System files and statistics

`generateShadowFile()` and `generateGroupFile()` produce the
`/etc/shadow` and `/etc/group` formats. `getBytesSent()`/`getBytesReceived()` read
the switch counters.

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

Many new users confuse these two modules:

| | `VirtualSwitch` | `VirtualNetworkManager` |
|---|---|---|
| Role | Network *between* VMs | *Internal* network of a VM |
| API | `route()`, `attach()`, `addDnsRecord()` | `addInterface()`, `addRoute()`, `addFirewallRule()` |
| Scope | All attached VMs | A single VM |
| Real-world equivalent | Physical router/switch + DNS | `/etc/network/interfaces` + iptables |

Both are complementary: the local firewall (`checkFirewall`) decides whether
a packet is accepted by the VM, the switch (`route`) decides whether the
packet reaches it.
