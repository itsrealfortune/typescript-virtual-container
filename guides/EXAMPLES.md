# Examples

Run any example with: `npx tsx examples/<number>-<name>.ts`

> **Note:** Examples that use `VirtualSshServer` or `Baie` require the `ssh2` native bindings to be available. Run `npm install` to ensure all dependencies are resolved.

---

## Feature demos

| # | File | What it covers |
|---|------|---------------|
| 01 | [`01-ssh-server-events.ts`](../examples/01-ssh-server-events.ts) | SSH server lifecycle: start, stop, connection/disconnection events, session management |
| 02 | [`02-ssh-sftp-shared-state.ts`](../examples/02-ssh-sftp-shared-state.ts) | SFTP file transfers sharing the same VFS instance as the SSH server — uploads visible to shell commands |
| 03 | [`03-multi-user-quotas.ts`](../examples/03-multi-user-quotas.ts) | Multiple users with per-user disk quotas, file ownership, permission enforcement |
| 04 | [`04-persistent-state.ts`](../examples/04-persistent-state.ts) | Filesystem persistence: snapshot to disk, restore from disk, auto-flush intervals |
| 05 | [`05-public-key-auth.ts`](../examples/05-public-key-auth.ts) | SSH public key authentication: key generation, authorized_keys, key-based login |
| 06 | [`06-rate-limiting.ts`](../examples/06-rate-limiting.ts) | Connection rate limiting: max auth attempts per IP, lockout windows, automatic unlock |
| 07 | [`07-snapshot-test-fixtures.ts`](../examples/07-snapshot-test-fixtures.ts) | Using VFS snapshots as test fixtures: capture, restore, isolate test state |
| 08 | [`08-snapshot-diff.ts`](../examples/08-snapshot-diff.ts) | Filesystem snapshot diffing: detect added/removed/modified files between snapshots |
| 09 | [`09-symlinks.ts`](../examples/09-symlinks.ts) | Symbolic link operations: create, resolve, chain resolution, broken link detection |
| 10 | [`10-honeypot-auditing.ts`](../examples/10-honeypot-auditing.ts) | HoneyPot audit logging: attach to shell/vfs/users/ssh, track commands, file ops, sessions |
| 11 | [`11-concurrent-clients.ts`](../examples/11-concurrent-clients.ts) | Multiple concurrent SSH clients operating on the same VFS, race conditions, shared state |

## New modules (v1.7.1+)

| # | File | What it covers |
|---|------|---------------|
| 12 | [`12-file-cache.ts`](../examples/12-file-cache.ts) | **FileCache** — LRU/LFU/FIFO eviction policies, disk I/O presets (HDD/NVME), cache hit/miss stats, preload, invalidation, simulated disk latency |
| 13 | [`13-process-scheduler.ts`](../examples/13-process-scheduler.ts) | **ProcessScheduler** — nice values (-20 to 19), CFS weight calculation, fair-share CPU enforcement, timeslice allocation, priority boosting, scheduler stats |
| 14 | [`14-swap-store.ts`](../examples/14-swap-store.ts) | **SwapStore** — eviction threshold, swap-out on flush, O(1) reload from swap files, manual swap-out, LRU bulk swap-out, swap stats, clear swap |
| 15 | [`15-fd-and-mounts.ts`](../examples/15-fd-and-mounts.ts) | **File descriptors & mounts** — `fdOpen`, `fdDup`, `fdDup2`, `fdPath`, `getOpenFds`, `closeAllFds`; host directory mounting with read-only enforcement, unmount |

## Real-world scenarios

| # | File | What it covers |
|---|------|---------------|
| 16 | [`16-cicd-pipeline.ts`](../examples/16-cicd-pipeline.ts) | **CI/CD pipeline** — 4 isolated build stages (lint → test → build → deploy), each in its own VM with RAM/CPU caps and process scheduling, pipeline summary with pass/fail |
| 17 | [`17-saas-platform.ts`](../examples/17-saas-platform.ts) | **Multi-tenant SaaS** — 3 tenants on isolated subnets, per-tenant VMs (app + db), user provisioning, resource caps, cross-tenant isolation verification, resource usage report |
| 18 | [`18-honeypot-threat-detection.ts`](../examples/18-honeypot-threat-detection.ts) | **Security honeypot** — decoy file planting, simulated attacker commands, HoneyPot audit log, anomaly detection (high auth failure rate, excessive failures), severity-rated alerts |
| 19 | [`19-container-orchestrator.ts`](../examples/19-container-orchestrator.ts) | **Container orchestrator** — Kubernetes-like cluster with 7 pods (web, api, db, cache), service DNS records, round-robin load balancers, network policies via iptables, rolling updates, bandwidth accounting |

---

## Legacy snippets

The following patterns are now covered by the full examples above. Refer to the corresponding files for working code:

- **Multi-VM network (Baie)** → see [`19-container-orchestrator.ts`](../examples/19-container-orchestrator.ts)
- **Port forwarding (VirtualProxy)** → see existing examples in `examples/HoneyPot/`
- **Multi-tenant isolation** → see [`17-saas-platform.ts`](../examples/17-saas-platform.ts)
- **VPN between Baie instances** → see `src/modules/VirtualVpn/`
- **Traffic shaping, DNS, load balancer** → see [`19-container-orchestrator.ts`](../examples/19-container-orchestrator.ts)
