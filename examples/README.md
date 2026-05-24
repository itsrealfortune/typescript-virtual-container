# Examples

Each file demonstrates one or more virtual infrastructure modules.
Run with `bun examples/<file>` from the project root.

## Module reference

| # | File | Module(s) featured |
|---|---|---|
| 01 | `01-ssh-server-events.ts` | SshMimic, VirtualShell |
| 02 | `02-ssh-sftp-shared-state.ts` | SshMimic (SFTP), VirtualShell |
| 03 | `03-multi-user-quotas.ts` | VirtualUserManager, VirtualFileSystem (quotas) |
| 04 | `04-persistent-state.ts` | VirtualFileSystem (fs mode + journal) |
| 05 | `05-public-key-auth.ts` | SshMimic (public key auth) |
| 06 | `06-rate-limiting.ts` | SshMimic (rate limiting) |
| 07 | `07-snapshot-test-fixtures.ts` | VirtualFileSystem (snapshot) |
| 08 | `08-snapshot-diff.ts` | VirtualFileSystem (diff) |
| 09 | `09-symlinks.ts` | VirtualFileSystem (symlinks) |
| 10 | `10-honeypot-auditing.ts` | Honeypot, VirtualShell |
| 11 | `11-concurrent-clients.ts` | SshMimic (concurrency) |
| 12 | `12-file-cache.ts` | VirtualFileSystem (cache) |
| 13 | `13-process-scheduler.ts` | VirtualProcessManager (scheduler) |
| 14 | `14-swap-store.ts` | VirtualFileSystem (swap) |
| 15 | `15-fd-and-mounts.ts` | VirtualFileSystem (fd + mounts) |
| 16 | `16-cicd-pipeline.ts` | Full CI/CD pipeline |
| 17 | `17-saas-platform.ts` | Multi-tenant SaaS |
| 18 | `18-honeypot-threat-detection.ts` | Honeypot (threat detection) |
| 19 | `19-container-orchestrator.ts` | Container orchestration |
| 20 | `20-package-manager.ts` | VirtualPackageManager |
| 21 | `21-network-management.ts` | VirtualNetworkManager |
| 22 | `22-groups-and-accounts.ts` | VirtualUserManager (groups) |
| 23 | `23-virtual-proxy.ts` | VirtualProxy |
| 24 | `24-idle-manager.ts` | IdleManager |
| 25 | `25-vfs-hooks.ts` | VirtualFileSystem (hooks) |
| 26 | `26-virtual-switch-advanced.ts` | VirtualSwitch, VirtualShell |
| 27 | `27-sandboxed-shell.ts` | SandboxedShell (worker thread) |
| 28 | `28-virtual-vpn.ts` | VirtualVpn, VirtualSwitch |
| 29 | `29-websocket-server.ts` | VirtualWebSocketServer, VirtualShell |
| 99 | `99-full-stack.ts` | All modules — end-to-end scenario |
| — | `HoneyPot/` | Honeypot quickstart + audit tools |

See each file's header comment for a detailed description.
