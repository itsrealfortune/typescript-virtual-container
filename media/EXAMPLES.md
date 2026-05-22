# Examples

Run any example with: `bun run examples/<number>-<name>.ts`

---

## Feature demos

| # | File | What it covers |
|---|------|---------------|
| 01 | [`01-ssh-server-events.ts`](../examples/01-ssh-server-events.ts) | Full SSH server event lifecycle: `start`, `stop`, `auth:success`, `auth:failure`, `auth:lockout`, `client:connect`, `client:disconnect`. Demonstrates event registration, command execution through SshClient, simulated lockout, admin override, and graceful shutdown. |
| 02 | [`02-ssh-sftp-shared-state.ts`](../examples/02-ssh-sftp-shared-state.ts) | SSH and SFTP servers sharing the same VirtualShell instance. Files written via VFS are immediately visible through SFTP, demonstrating shared state without real network transport. |
| 03 | [`03-multi-user-quotas.ts`](../examples/03-multi-user-quotas.ts) | Multi-user environment: user creation (`addUser`), sudo management (`removeSudoer`), per-user disk quotas (`setQuotaBytes`), file permission enforcement (mode 600 denial), and cross-user access verification. |
| 04 | [`04-persistent-state.ts`](../examples/04-persistent-state.ts) | Two persistence strategies: **FS mode** with automatic `.vfsb` binary snapshot to disk and `flushMirror()`, and **memory mode** with manual JSON `toSnapshot()` / `fromSnapshot()` round-trip. |
| 05 | [`05-public-key-auth.ts`](../examples/05-public-key-auth.ts) | Public-key authentication flow: key addition (`addAuthorizedKey`), multi-key support (key rotation), key verification (`getAuthorizedKeys`), and bulk removal (`removeAuthorizedKeys`). Shows the SSH server's key validation pipeline. |
| 06 | [`06-rate-limiting.ts`](../examples/06-rate-limiting.ts) | Rate limiting lifecycle: configuration (`maxAuthAttempts`, `lockoutDurationMs`), progressive auth failure simulation (3 attempts), automatic lockout event emission, lockout state verification, and admin override via `clearLockout()`. |
| 07 | [`07-snapshot-test-fixtures.ts`](../examples/07-snapshot-test-fixtures.ts) | VFS snapshot as test fixtures: build a snapshot once, reuse across isolated test environments. Demonstrates fixture isolation (writes don't leak), config file reading, and file listing verification. |
| 08 | [`08-snapshot-diff.ts`](../examples/08-snapshot-diff.ts) | Snapshot diffing for change detection: capture before/after snapshots, compute diff with `diffSnapshots()`, display added/modified/removed entries, and assert expected changes with `assertDiff()`. |
| 09 | [`09-symlinks.ts`](../examples/09-symlinks.ts) | Symbolic link operations: create symlinks with `symlink()`, verify with `isSymlink()`, and resolve target paths with `resolveSymlink()`. |
| 10 | [`10-honeypot-auditing.ts`](../examples/10-honeypot-auditing.ts) | HoneyPot audit logging: attach to shell/VFS/users, track file reads/writes and command execution via SshClient, retrieve statistics (`getStats()`), detect anomalies (`detectAnomalies()`), and inspect recent audit entries (`getRecent()`). |
| 11 | [`11-concurrent-clients.ts`](../examples/11-concurrent-clients.ts) | Concurrent client operations: 3 users (alice, bob, charlie) running parallel file writes, reads, cross-user file access, directory listings, and command execution via `Promise.all()`. Demonstrates shared VFS consistency under concurrent access. |

## New modules (v1.7.1+)

| # | File | What it covers |
|---|------|---------------|
| 12 | [`12-file-cache.ts`](../examples/12-file-cache.ts) | **FileCache** — LRU eviction policy, disk I/O simulation (read/write latency), cache hit/miss tracking, file preloading, cache invalidation on write, and cache clearing. |
| 13 | [`13-process-scheduler.ts`](../examples/13-process-scheduler.ts) | **ProcessScheduler** — nice values (-20 to 19) mapped to CFS priorities (realtime → idle), process registration with priority, CPU time accounting (`recordAndCheckThrottle`), priority boosting (`setProcessNice`), scheduler statistics (run queue, CPU time, throttle/preempt counts), and process lifecycle management. |
| 14 | [`14-swap-store.ts`](../examples/14-swap-store.ts) | **SwapStore** — eviction threshold on flush, automatic swap-out of large files, O(1) reload from swap files, manual `swapOutFile()`, LRU bulk swap-out (`swapOutLru`), swap statistics, and `clearSwap()`. |
| 15 | [`15-fd-and-mounts.ts`](../examples/15-fd-and-mounts.ts) | **File descriptors & mounts** — POSIX-like FD operations (`fdOpen`, `fdDup`, `fdDup2`, `fdPath`, `getOpenFds`, `fdClose`, `closeAllFds`); host directory mounting with read-only enforcement, file access through mount points, and `unmount()`. |

## Real-world scenarios

| # | File | What it covers |
|---|------|---------------|
| 16 | [`16-cicd-pipeline.ts`](../examples/16-cicd-pipeline.ts) | **CI/CD pipeline** — 4 isolated build stages (lint → test → build → deploy) each running in its own VM with RAM/CPU caps and process scheduling. Pipeline summary with pass/fail detection via stdout tokens, per-stage resource reporting. |
| 17 | [`17-saas-platform.ts`](../examples/17-saas-platform.ts) | **Multi-tenant SaaS** — 3 tenants on isolated subnets (Baie instances), per-tenant app + db VMs, user provisioning, resource caps, cross-tenant isolation verification via network reachability tests, and resource usage report. |
| 18 | [`18-honeypot-threat-detection.ts`](../examples/18-honeypot-threat-detection.ts) | **Security honeypot** — decoy file planting (`/etc/shadow`, credentials, bash history), simulated attacker command execution (cat sensitive files, wget malware, user creation), HoneyPot audit log with file operation tracking, and anomaly detection with severity-rated alerts. |
| 19 | [`19-container-orchestrator.ts`](../examples/19-container-orchestrator.ts) | **Container orchestrator** — Kubernetes-like cluster with 7 pods across 3 tiers (web, api, db/cache), service DNS records, round-robin load balancers for multi-pod services, network policies via iptables (web→api allowed, web→db blocked), rolling updates, and per-MAC bandwidth accounting. |

---

## Legacy patterns

The following patterns from earlier documentation are now covered by the full examples above:

- **Multi-VM network (Baie)** → see [`19-container-orchestrator.ts`](../examples/19-container-orchestrator.ts)
- **Multi-tenant isolation** → see [`17-saas-platform.ts`](../examples/17-saas-platform.ts)
- **Traffic shaping, DNS, load balancer** → see [`19-container-orchestrator.ts`](../examples/19-container-orchestrator.ts)
- **VPN between Baie instances** → see `src/modules/VirtualVpn/`
