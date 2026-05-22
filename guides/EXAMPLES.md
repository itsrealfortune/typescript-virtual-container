# Examples

Run any example with: `bun run examples/<number>-<name>.ts`

Each example has a detailed guide in [`guides/examples/`](./examples/).

| # | File | What it covers | Guide |
|---|------|---------------|-------|
| 01 | [`01-ssh-server-events.ts`](../examples/01-ssh-server-events.ts) | Full SSH server event lifecycle: `start`, `stop`, `auth:success`, `auth:failure`, `auth:lockout`, `client:connect`, `client:disconnect`. Simulated lockout, admin override, graceful shutdown. | [guide](./examples/01-ssh-server-events.md) |
| 02 | [`02-ssh-sftp-shared-state.ts`](../examples/02-ssh-sftp-shared-state.ts) | SSH + SFTP servers sharing the same VirtualShell. Files written via VFS are immediately visible through SFTP without real network transport. | [guide](./examples/02-ssh-sftp-shared-state.md) |
| 03 | [`03-multi-user-quotas.ts`](../examples/03-multi-user-quotas.ts) | Multi-user environment: user creation, sudo management, per-user disk quotas, file permission enforcement, cross-user access verification. | [guide](./examples/03-multi-user-quotas.md) |
| 04 | [`04-persistent-state.ts`](../examples/04-persistent-state.ts) | Two persistence strategies: **FS mode** with `.vfsb` binary snapshot and `flushMirror()`, and **memory mode** with `toSnapshot()` / `fromSnapshot()` JSON round-trip. | [guide](./examples/04-persistent-state.md) |
| 05 | [`05-public-key-auth.ts`](../examples/05-public-key-auth.ts) | Public-key authentication: key addition (`addAuthorizedKey`), multi-key rotation, key verification, bulk removal. | [guide](./examples/05-public-key-auth.md) |
| 06 | [`06-rate-limiting.ts`](../examples/06-rate-limiting.ts) | Rate limiting: `maxAuthAttempts`, `lockoutDurationMs`, progressive auth failures, lockout events, admin override via `clearLockout()`. | [guide](./examples/06-rate-limiting.md) |
| 07 | [`07-snapshot-test-fixtures.ts`](../examples/07-snapshot-test-fixtures.ts) | VFS snapshot as test fixtures: build once, reuse across isolated environments. Fixture isolation, config file reading, file listing. | [guide](./examples/07-snapshot-test-fixtures.md) |
| 08 | [`08-snapshot-diff.ts`](../examples/08-snapshot-diff.ts) | Snapshot diffing: capture before/after snapshots, compute diff with `diffSnapshots()`, display added/modified/removed entries, assert with `assertDiff()`. | [guide](./examples/08-snapshot-diff.md) |
| 09 | [`09-symlinks.ts`](../examples/09-symlinks.ts) | Symbolic links: `symlink()`, `isSymlink()`, `resolveSymlink()`. | [guide](./examples/09-symlinks.md) |
| 10 | [`10-honeypot-auditing.ts`](../examples/10-honeypot-auditing.ts) | HoneyPot audit logging: attach to shell/VFS/users, track file operations and commands, retrieve statistics, detect anomalies, inspect recent entries. | [guide](./examples/10-honeypot-auditing.md) |
| 11 | [`11-concurrent-clients.ts`](../examples/11-concurrent-clients.ts) | Concurrent client operations: 3 users running parallel file writes, reads, cross-user access, directory listings, and commands via `Promise.all()`. Shared VFS consistency under concurrency. | [guide](./examples/11-concurrent-clients.md) |
| 12 | [`12-file-cache.ts`](../examples/12-file-cache.ts) | **FileCache** — LRU eviction policy, disk I/O simulation (read/write latency), cache hit/miss tracking, `preloadCache()`, cache invalidation on write, `clearCache()`. | [guide](./examples/12-file-cache.md) |
| 13 | [`13-process-scheduler.ts`](../examples/13-process-scheduler.ts) | **ProcessScheduler** — nice values (-20 to 19) mapped to CFS priorities, process registration, CPU time accounting, `setProcessNice()`, scheduler statistics. | [guide](./examples/13-process-scheduler.md) |
| 14 | [`14-swap-store.ts`](../examples/14-swap-store.ts) | **SwapStore** — eviction threshold on flush, automatic swap-out of large files, O(1) reload from swap files, `swapOutFile()`, `swapOutLru()`, swap statistics. | [guide](./examples/14-swap-store.md) |
| 15 | [`15-fd-and-mounts.ts`](../examples/15-fd-and-mounts.ts) | **File descriptors & mounts** — POSIX-like `fdOpen`, `fdDup`, `fdDup2`, `fdPath`, `getOpenFds`, `closeAllFds`; host directory mounting with read-only enforcement. | [guide](./examples/15-fd-and-mounts.md) |
| 16 | [`16-cicd-pipeline.ts`](../examples/16-cicd-pipeline.ts) | **CI/CD pipeline** — 4 isolated build stages (lint → test → build → deploy) each in its own VM with RAM/CPU caps and process scheduling. Pass/fail detection via stdout tokens. | [guide](./examples/16-cicd-pipeline.md) |
| 17 | [`17-saas-platform.ts`](../examples/17-saas-platform.ts) | **Multi-tenant SaaS** — 3 tenants on isolated subnets, per-tenant app + db VMs, user provisioning, resource caps, cross-tenant isolation verification. | [guide](./examples/17-saas-platform.md) |
| 18 | [`18-honeypot-threat-detection.ts`](../examples/18-honeypot-threat-detection.ts) | **Security honeypot** — decoy files (`/etc/shadow`, credentials, bash history), simulated attacker commands, HoneyPot audit log, anomaly detection with severity-rated alerts. | [guide](./examples/18-honeypot-threat-detection.md) |
| 19 | [`19-container-orchestrator.ts`](../examples/19-container-orchestrator.ts) | **Container orchestrator** — Kubernetes-like cluster (7 pods, 3 tiers), service DNS, round-robin load balancers, iptables network policies, rolling updates, per-MAC bandwidth accounting. | [guide](./examples/19-container-orchestrator.md) |
| 20 | [`20-package-manager.ts`](../examples/20-package-manager.ts) | **Package manager** — registry load, search, find in registry, install, remove, list available and installed packages. | [guide](./examples/20-package-manager.md) |
| 21 | [`21-network-management.ts`](../examples/21-network-management.ts) | **Network management** — interfaces (`addInterface`, `setInterfaceState`), routes, policy routing, firewall (iptables-like), conntrack, ARP cache. | [guide](./examples/21-network-management.md) |
| 22 | [`22-groups-and-accounts.ts`](../examples/22-groups-and-accounts.ts) | **Groups and account policies** — create groups, password aging, account locking, login failure tracking, sudo, sessions, `/etc/shadow` and `/etc/group` generation. | [guide](./examples/22-groups-and-accounts.md) |
| 23 | [`23-virtual-proxy.ts`](../examples/23-virtual-proxy.ts) | **Virtual proxy (port forwarding)** — `exposePort()`, `listPorts()`, `removePort()`, `stop()`. Forward VM ports to the host. | [guide](./examples/23-virtual-proxy.md) |
| 24 | [`24-idle-manager.ts`](../examples/24-idle-manager.ts) | **Idle management** — `enableIdleManagement()`, `pingIdle()`, `runGc()`, freeze/thaw lifecycle, garbage collection stats. | [guide](./examples/24-idle-manager.md) |
| 25 | [`25-vfs-hooks.ts`](../examples/25-vfs-hooks.ts) | **VFS hooks and content resolvers** — `registerContentResolver()` for dynamic files, `onBeforeRead()`/`onBeforeWrite()` for audit and access control. | [guide](./examples/25-vfs-hooks.md) |
| 26 | [`26-virtual-switch-advanced.ts`](../examples/26-virtual-switch-advanced.ts) | **VirtualSwitch advanced** — DNS records, traffic shaping (latency/jitter/loss), qdisc, load balancing, network partitions, traffic statistics. | [guide](./examples/26-virtual-switch-advanced.md) |
| 99 | [`99-full-stack.ts`](../examples/99-full-stack.ts) | **Full-stack virtual infrastructure** — ALL modules combined: VirtualSwitch + 2 VMs, network (interfaces, routes, firewall, DNS), users (groups, sudo, aging, sessions, locking, quotas), VFS (files, resolvers, hooks), packages, process scheduler, traffic shaping, load balancing, network partitions, port forwarding, idle manager, GC. | [guide](./examples/99-full-stack.md) |

---

## Legacy patterns

The following patterns from earlier documentation are now covered by the full examples above:

- **Multi-VM network (Baie)** → see [`19-container-orchestrator.ts`](../examples/19-container-orchestrator.ts)
- **Multi-tenant isolation** → see [`17-saas-platform.ts`](../examples/17-saas-platform.ts)
- **Traffic shaping, DNS, load balancer** → see [`19-container-orchestrator.ts`](../examples/19-container-orchestrator.ts)
- **VPN between Baie instances** → see `src/modules/VirtualVpn/`
