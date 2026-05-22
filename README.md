# `typescript-virtual-container`

> A complete virtual Linux environment in pure TypeScript — runs as an SSH/SFTP server, a browser-based web shell, or a standalone CLI. Ships with a realistic Linux rootfs, a virtual package manager, a full shell interpreter, and a typed programmatic API for testing, automation, honeypots, and embedded shell experiences.

[![npm version](https://badge.fury.io/js/typescript-virtual-container.svg)](https://www.npmjs.com/package/typescript-virtual-container)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Runtime](https://img.shields.io/badge/runtime-Node.js%20%7C%20Bun-43853D.svg)](https://nodejs.org/)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://itsrealfortune.fr/typescript-virtual-container/demo)

---

## Table of Contents

- [Three ways to run](#three-ways-to-run) · [Get Started](#get-started)
- [How It Works](#how-it-works) · [Resource Capping](#resource-capping) · [Swap File Store](#swap-file-store) · [Virtual Package Manager](#virtual-package-manager) · [Built-in Commands](#built-in-commands-157)
- [Shell Scripting](#shell-scripting) · [Linux Rootfs](#linux-rootfs--vfs-path-resolution)
- [Configuration](#configuration) · [Troubleshooting](#troubleshooting)
- [FAQ](#faq) · [Contributing](#contributing)
- [License](#license) · [Roadmap](#roadmap)

---

## Three ways to run

<!-- BUILD:mode-table -->
| Mode | Entry point | Use case |
|------|-------------|----------|
| **SSH/SFTP server** | `VirtualSshServer` / `VirtualSftpServer` | Honeypots, remote testing, training environments |
| **Web shell** | `builds/fortune-nyx-v1.7.1-web.min.js` (ESM) | Embedded terminals, interactive tutorials, browser demos — run `startxfce4` for a full XFCE desktop |
| **Standalone CLI** | `builds/fortune-nyx-v1.7.1-directbash-k6.1.0.mjs` (single file) | Local shell, one-liner demos, no install required |
<!-- /BUILD:mode-table -->

All three modes share the same core: a pure in-memory VFS, a real shell interpreter, a virtual package manager, and a typed programmatic API.

---

## Get Started

### Install

```bash
npm install typescript-virtual-container
# or: yarn add / bun add
```

### Try instantly (zero install)

<!-- BUILD:curl-start -->
#### Interactive local shell — persists VFS in .vfs/ in the current directory
```bash
curl -s https://raw.githubusercontent.com/itsrealfortune/typescript-virtual-container/refs/heads/main/builds/fortune-nyx-v1.7.1-directbash-k6.1.0.mjs -o fortune-nyx-v1.7.1-directbash-k6.1.0.mjs && node fortune-nyx-v1.7.1-directbash-k6.1.0.mjs
```

#### SSH server with built-in SFTP subsystem (scp / sftp on port 2222)
```bash
curl -s https://raw.githubusercontent.com/itsrealfortune/typescript-virtual-container/refs/heads/main/builds/fortune-nyx-v1.7.1-ssh.cjs -o fortune-nyx-v1.7.1-ssh.cjs && node fortune-nyx-v1.7.1-ssh.cjs
```

#### Custom SSH port
```bash
node fortune-nyx-v1.7.1-ssh.cjs --ssh-port=2022
```

#### SSH disabled (handler only, no server started)
```bash
node fortune-nyx-v1.7.1-ssh.cjs --no-ssh
```
<!-- /BUILD:curl-start -->

> [!NOTE]
> The standalone builds are intended for quick demos and testing. For production use, it's recommended to install the package and import the relevant classes directly in your codebase for better performance, stability, and security.

<!-- BUILD:selfStandalone-options -->
**`fortune-nyx-v1.7.1-directbash-k6.1.0.mjs` options:**

```bash
node fortune-nyx-v1.7.1-directbash-k6.1.0.mjs                          # boot as root
node fortune-nyx-v1.7.1-directbash-k6.1.0.mjs --user alice             # boot as alice (prompts for password if set)
node fortune-nyx-v1.7.1-directbash-k6.1.0.mjs --user=alice             # same, inline form
node fortune-nyx-v1.7.1-directbash-k6.1.0.mjs --hostname=my-box        # custom hostname
node fortune-nyx-v1.7.1-directbash-k6.1.0.mjs --snapshot=/data/.vfs    # custom VFS snapshot path
node fortune-nyx-v1.7.1-directbash-k6.1.0.mjs --help                   # show all options
node fortune-nyx-v1.7.1-directbash-k6.1.0.mjs --version                # print version
```
<!-- /BUILD:selfStandalone-options -->

The VFS is persisted automatically to `.vfs/vfs-snapshot.vfsb` in the current directory — state survives between runs. Delete `.vfs/` to start fresh.

The shell shows a login banner and `Last login:` timestamp on each start.

### SSH server

```typescript
import { VirtualSshServer } from "typescript-virtual-container";

const ssh = new VirtualSshServer({ port: 2222, hostname: "my-container" });
await ssh.start();
// ssh root@localhost -p 2222
```

### Web shell (browser)

> **[🖥 Try the live demo →](https://itsrealfortune.fr/typescript-virtual-container/demo)**

Two browser bundles are available:

<!-- BUILD:web-table -->
| Bundle | Format | Entry point | Use case |
|--------|--------|-------------|----------|
| `builds/fortune-nyx-v1.7.1-web.min.js` | ESM | `createWebShell()` | Embedded terminals, modern bundlers |
<!-- /BUILD:web-table -->

Both bundles persist the VFS in **IndexedDB** — state survives page reloads.

```bash
bun run web-build       # → builds/web.min.js + examples/web.min.js
bun run web-full-build  # → builds/web-full-api.min.js
bun run build-all       # rebuild everything
```

<!-- BUILD:web-options -->
**`fortune-nyx-v1.7.1-web.min.js`** — lightweight shell with IndexedDB VFS:

```html
<script type="module">
  import { createWebShell } from "./builds/fortune-nyx-v1.7.1-web.min.js";

  const shell = createWebShell("web-vm", {
    vfs: { databaseName: "virtual-env-js", storeName: "vfs" },
  });
  await shell.ensureInitialized();

  const out = await shell.executeCommandLine("ls /etc && echo hello");
  console.log(out.stdout);
</script>
```

**`fortune-nyx-v1.7.1-web.min.js`** — mirrors the `VirtualShell` programmatic API:

```html
<script type="module">
  import { createVirtualShellShim } from "./builds/fortune-nyx-v1.7.1-web.min.js";

  const shell = createVirtualShellShim("web-vm");
  await shell.ensureInitialized();
  await shell.executeCommandLine("mkdir -p /app && echo hello > /app/file.txt");
  console.log(shell.getVfs().readFile("/app/file.txt")); // hello
</script>
```
<!-- /BUILD:web-options -->

**Run the demo locally:**

```bash
bun run example-serve
# Open http://localhost:8787/index.html
```

> You can also try the hosted demo at **[itsrealfortune.fr/typescript-virtual-container/demo](https://itsrealfortune.fr/typescript-virtual-container/demo)**.

### Programmatic API

```typescript
import { SshClient, VirtualShell } from "typescript-virtual-container";

const shell  = new VirtualShell("typescript-vm");
await shell.ensureInitialized();
const client = new SshClient(shell, "root");

await client.mkdir("/app/config", true);
await client.writeFile("/app/config/settings.json", JSON.stringify({ env: "dev" }));

const r = await client.exec("ls /app && cat /app/config/settings.json");
console.log(r.stdout);
```

#### Multi-VM, proxy, VPN, and hosting examples

See [`guides/EXAMPLES.md`](guides/EXAMPLES.md) for:

- **Baie** — multi-VM network on a shared subnet
- **VirtualProxy** — port forwarding and SOCKS5 proxy
- **Multi-tier lab** — web/api/db with firewall isolation
- **Hosting platform** — multi-tenant with SSH per tenant
- **VirtualVpn** — encrypted tunnel between Baie instances
- **Traffic shaping** — latency, jitter (Gaussian), packet loss, burst loss, reordering, duplication
- **Bandwidth enforcement** — token bucket rate limiting per VM
- **MTU enforcement** — packets exceeding interface MTU are dropped
- **Connection tracking** — stateful conntrack with NEW/ESTABLISHED/TIME_WAIT states
- **Advanced routing** — multiple routing tables, policy-based routing, route metrics
- **DNS, load balancer, partition**

---

## How It Works

```
┌──────────────────────────────────────────────────────────────────────────┐
│  SshMimic (VirtualSshServer)             SftpMimic (VirtualSftpServer)  │
│  password auth · publickey auth          SFTP protocol handlers          │
│  per-IP rate limiting / lockout          home-dir confinement            │
└─────────────────────────┬────────────────────────────────────────────────┘
                          │
               ┌──────────▼──────────┐         ┌──────────────────────────┐
               │    VirtualShell     │────────▶ │    DesktopManager        │
               │  script parser      │          │  XFCE panel · windows    │
               │  command executor   │          │  Thunar · Mousepad       │
               │  .bashrc loader     │          │  Trash · terminal windows│
               │  session manager    │          │  (browser only)          │
               └──┬──────────────┬───┘          └──────────────────────────┘
                  │              │
     ┌────────────▼───┐    ┌─────▼───────────────┐
     │VirtualFileSystem│   │ VirtualUserManager   │
     │ in-memory tree  │   │ scrypt · sudoers     │
     │ gzip · symlinks │   │ publickey auth       │
     │ .vfsb binary    │   │ quotas · sessions    │
     │ mode:memory|fs  │   └─────────────────────-┘
     └─────────────────┘
                  │
     ┌────────────▼────────────┐
     │   VirtualNetworkManager │
     │ interfaces · routes     │
     │ firewall · ARP          │
     │ conntrack · policy rules│
     │ multi-table routing     │
     └─────────────────────────┘
                  │
     ┌────────────▼────────────┐
     │        HoneyPot         │
     │ audit log · stats       │
     │ anomaly detection       │
     └─────────────────────────┘
```

**What it is:** a shell emulator and virtual Linux environment for developer workflows.

**What it is not:** a fully isolated sandbox. The shell commands are contained — no host binary is ever spawned, `execvp` is never called, `node`/`python3`/`npm` are virtual stubs. Permission enforcement follows POSIX semantics (owner/group/other, sticky bit, setuid) for all file operations, and unknown users are auto-provisioned with non-root UIDs. But `curl`/`wget` use the real `fetch()` API (live network access), all instances share the same JS heap as the host application, and resource capping is enforced at the VFS/process level (not at the kernel level). Do not expose to untrusted input without additional infrastructure-level isolation.

---

## Resource Capping

Limit the RAM and CPU resources visible inside a virtual shell. Pass a `VirtualShellResourceCaps` object as the 4th constructor argument:

```typescript
import { VirtualShell } from "typescript-virtual-container";

const shell = new VirtualShell("prod-vm", undefined, undefined, {
  ramCapBytes: 2 * 1024 * 1024 * 1024, // 2 GiB VFS storage limit
  cpuCapCores: 2,                        // 2 vCPUs
});
```

### Reporting (always active)

When a cap is set, every `/proc` file, sysctl entry, cgroup file, and system-monitor command reports the capped value instead of the real host total:

| Command | CPU cap | RAM cap |
|---|---|---|
| `free` | — | ✅ |
| `top` | — | ✅ |
| `htop` | ✅ | ✅ |
| `nproc` | ✅ | — |
| `lscpu` | ✅ | — |
| `neofetch` | ✅ | ✅ |
| `/proc/cpuinfo` | ✅ | — |
| `/proc/meminfo` | — | ✅ |
| `/proc/stat` | ✅ | — |
| cgroup files | ✅ | ✅ |

### RAM enforcement

When `ramCapBytes` is set, the VFS tracks total bytes stored in its in-memory tree. Any write that would cause the total to exceed the cap is rejected with an `ENOMEM` error:

```bash
$ dd if=/dev/zero of=/tmp/big bs=1M count=3000
ENOMEM: Cannot allocate memory: write to '/tmp/big' would exceed RAM cap
```

This covers all VFS writes: `echo > file`, `dd`, `cp`, `tee`, SFTP uploads, etc. Compressed files count their compressed size.

> **Note:** this caps VFS storage, not Node.js heap usage. A process that allocates large JS objects without writing to the VFS will not be blocked.

### CPU enforcement

When `cpuCapCores` is set, a background watcher tracks wall-clock time per process. If a process exceeds the per-window budget (`cpuCapCores × 1000 ms` per second), it is killed with `SIGKILL` (exit code 137):

```bash
$ while true; do :; done
Killed  # exit code 137
```

Short commands (`ls`, `echo`, `cat`) are unaffected. The `process:killed:cpu` event is emitted with `{ pid, command, cpuTime }`.

### Runtime changes

Both caps can be changed at runtime via `sysctl`:

```bash
sysctl vm.ram_cap_bytes=1073741824   # 1 GiB
sysctl kernel.cpu_cap_cores=2         # 2 vCPUs
sysctl vm.ram_cap_bytes=0             # remove RAM cap
```

---

## Swap File Store

When running in `"fs"` persistence mode with `swapEnabled: true`, the VFS can offload evicted file contents to individual swap files on disk. This provides two benefits:

1. **O(1) reload** — reading an evicted file loads from its swap file directly, instead of parsing the entire snapshot.
2. **RAM overflow handling** — when a write would exceed `ramCapBytes`, the VFS swaps out the least recently used (LRU) files to make room instead of immediately rejecting with `ENOMEM`.

```typescript
import { VirtualFileSystem } from "typescript-virtual-container";

const vfs = new VirtualFileSystem({
  mode: "fs",
  snapshotPath: "./data",
  swapEnabled: true,         // enable swap store
  swapDir: "./data/swap",    // optional: custom swap directory (defaults to <snapshotPath>/swap)
});
```

### How it works

- When a file is evicted (by `evictLargeFiles()`, `evictUnusedLargeFiles()`, or RAM cap pressure), its content is written to `<swapDir>/<hash>.swap` with a small binary header.
- The in-memory node keeps `evicted: true` and `content = Buffer.alloc(0)`.
- On the next `readFile()`, the content is loaded from the swap file and the swap entry is deleted.
- Swap is **disabled by default** — it must be explicitly enabled via `VfsOptions`.

### Swap command

```bash
$ swap -s              # show swap statistics
Swap usage:
  Files swapped out : 12
  Swap disk usage   : 4.2 MB
  Original size     : 3.8 MB
  Swap-in ops       : 45
  Swap-out ops      : 57

$ swap -c              # clear all swap files
swap: swap files cleared
```

---

## Virtual Package Manager

The `apt`/`dpkg`/`pacman` commands are **fully virtual** — they do not install real system packages. Instead, they manage a curated database of ~25 virtual packages that write files into the VFS and register new shell commands.

### What `apt install` actually does

1. Looks up the package in the internal database (`VirtualPackageManager`)
2. Writes the package's files into the VFS (e.g. `/usr/bin/python3.12`, `/usr/lib/...`)
3. Registers any bundled commands in the shell's command registry
4. Records the installation in `/var/lib/dpkg/status`

### Available packages

| Package | Version | Category | What it provides |
|---|---|---|---|
| `python3` | 3.12.3 | interpreter | Virtual Python REPL, `/usr/bin/python3.12` |
| `node` | 22.x | interpreter | Virtual Node.js REPL |
| `npm` | 10.x | package manager | Virtual npm stub |
| `gcc` | 13.3.0 | compiler | Compiler stub + headers |
| `g++` | 13.3.0 | compiler | C++ compiler stub |
| `openjdk-21` | 21.0.1 | runtime | Java runtime stub |
| `curl` | 8.5.0 | network | Already built-in, package is metadata only |
| `git` | 2.43.0 | vcs | Git stub with basic commands |
| `vim` | 9.0 | editor | Already built-in (nano), package is metadata only |
| `htop` | 3.3.0 | system | Already built-in, package is metadata only |
| `tmux` | 3.4 | terminal | Tmux stub |
| `wget` | 1.21 | network | Already built-in, package is metadata only |
| `zip` | 3.0 | archive | Already built-in, package is metadata only |
| `unzip` | 6.0 | archive | Already built-in, package is metadata only |
| `rsync` | 3.2.7 | network | Rsync stub |
| `strace` | 6.6 | debug | Already built-in, package is metadata only |
| `lsof` | 4.95 | system | Already built-in, package is metadata only |
| `iperf3` | 3.16 | network | Iperf stub |
| `jq` | 1.7 | text | jq stub |
| `tree` | 2.1.1 | files | Already built-in, package is metadata only |
| `neofetch` | 7.1.0 | system | Already built-in, package is metadata only |
| `cmatrix` | 2.0 | fun | Already built-in, package is metadata only |
| `sl` | 5.02 | fun | Already built-in, package is metadata only |
| `fortune` | 1.99 | fun | Already built-in, package is metadata only |
| `cowsay` | 3.03 | fun | Already built-in, package is metadata only |

> **Important:** These are **not real packages**. Installing `python3` does not give you a full Python interpreter — it provides a virtual REPL stub that simulates basic Python behavior. The same applies to all other packages. This is intentional: the project is designed to be a self-contained virtual environment, not a real package manager.

### Package-gated commands

Some commands require `apt install` before they become available:

```bash
$ gcc --version
Command 'gcc' not found

$ apt install gcc
$ gcc --version
gcc (Fortune 13.3.0-nyx1) 13.3.0
```

---

<details>
<summary><strong>API Reference</strong></summary>

<!-- https://itsrealfortune.fr/typescript-virtual-container/ -->
API reference for all core classes and utilities. Designed for quick lookup while developing with the library. More extensive documentation, examples, and guides are available in <a href="https://itsrealfortune.fr/typescript-virtual-container/">the documentation</a>.

</details>

---

<details>
<summary><strong>Examples</strong></summary>

All examples are available as runnable TypeScript files in the [`examples/`](examples/) directory:

| # | File | Description |
|---|------|-------------|
| 01 | [`01-ssh-server-events.ts`](examples/01-ssh-server-events.ts) | SSH server with auth and lockout event handlers |
| 02 | [`02-ssh-sftp-shared-state.ts`](examples/02-ssh-sftp-shared-state.ts) | SSH + SFTP servers sharing the same VirtualShell |
| 03 | [`03-multi-user-quotas.ts`](examples/03-multi-user-quotas.ts) | Multi-user setup with sudo management and disk quotas |
| 04 | [`04-persistent-state.ts`](examples/04-persistent-state.ts) | FS mode auto-persistence and manual JSON snapshots |
| 05 | [`05-public-key-auth.ts`](examples/05-public-key-auth.ts) | Public-key SSH authentication setup |
| 06 | [`06-rate-limiting.ts`](examples/06-rate-limiting.ts) | Auth rate limiting and manual lockout override |
| 07 | [`07-snapshot-test-fixtures.ts`](examples/07-snapshot-test-fixtures.ts) | Snapshot-based test fixtures for isolated tests |
| 08 | [`08-snapshot-diff.ts`](examples/08-snapshot-diff.ts) | VFS snapshot diffing to verify expected changes |
| 09 | [`09-symlinks.ts`](examples/09-symlinks.ts) | Creating and resolving symbolic links |
| 10 | [`10-honeypot-auditing.ts`](examples/10-honeypot-auditing.ts) | HoneyPot event logging, stats, and anomaly detection |
| 11 | [`11-concurrent-clients.ts`](examples/11-concurrent-clients.ts) | Parallel operations from multiple SshClient instances |

</details>

---

<details>
<summary><strong>Built-in Commands (172)</strong></summary>

Type `help` in the shell for a grouped, colorized listing. Type `help <command>` for detailed usage. Type `man <command>` for full manual pages — all commands are documented.

### Navigation

| Command | Description |
|---------|-------------|
| `pwd` | Print working directory |
| `cd <path>` | Change directory |
| `ls [path]` | List directory |
| `tree [path]` | ASCII directory tree |
| `help` | Full list: type `help` in the shell |

### Files

| Command | Description |
|---------|-------------|
| `cat <path...>` | Concatenate and print |
| `touch <path>` | Create or update file |
| `rm <path>` | Remove file or directory |
| `mkdir <path>` | Create directory |
| `cp <src> <dest>` | Copy file or directory |
| `mv <src> <dest>` | Move or rename |
| `chmod <mode> <file>` | Change file mode |
| `ln <target> <link>` | Hard or symbolic link |
| `find [path]` | Search for files |
| `stat <path>` | Display file status |
| `dd` | Convert and copy a file |
| `realpath <path>` | Print resolved absolute path |
| `help` | Full list: type `help` in the shell |

### Text

| Command | Description |
|---------|-------------|
| `grep <pattern> [files]` | Search file content |
| `sed -e 's/pat/rep/'` | Stream editor |
| `awk '<prog>'` | Pattern scanning and processing |
| `sort [files]` | Sort lines |
| `uniq` | Filter repeated lines |
| `wc [files]` | Word/line/byte count |
| `head [files]` | First N lines |
| `tail [files]` | Last N lines |
| `diff <f1> <f2>` | Compare files |
| `tee [files]` | Read stdin, write to stdout and files |
| `md5sum <file>` | Compute MD5 checksum |
| `sha256sum <file>` | Compute SHA-256 checksum |
| `fold <file>` | Wrap lines to specified width |
| `expand <file>` | Convert tabs to spaces |
| `fmt <file>` | Simple text formatter |
| `help` | Full list: type `help` in the shell |

### Archives

| Command | Description |
|---------|-------------|
| `tar <archive> [files]` | Archive utility (POSIX ustar) |
| `gzip <file>` / `gunzip <file>` | Compress / decompress |
| `zip [-r] <archive> <files>` / `unzip <archive>` | PKZIP + DEFLATE archive |
| `bzip2 <file>` / `bunzip2 <file>` | Bzip2 compress / decompress |
| `base64` | Encode/decode base64 |
| `help` | Full list: type `help` in the shell |

### System

| Command | Description |
|---------|-------------|
| `whoami` | Current user |
| `id [user]` | User identity (uid/gid/groups) |
| `uname` | System information |
| `hostname` | Print hostname |
| `ps` | Process status |
| `kill [-9] <pid>` | Send signal (mock) |
| `df` | Filesystem disk space |
| `du [path]` | Estimate file space |
| `free` | Memory usage (real host data) |
| `uptime` | Running time |
| `lsof` | List open files (simulated) |
| `strace <cmd>` | Trace system calls (stub) |
| `lscpu` | CPU architecture info |
| `lspci` | PCI device listing |
| `nice <cmd>` | Run with adjusted priority |
| `nohup <cmd>` | Run immune to hangups |
| `pgrep <pattern>` | Search processes by name |
| `pkill <pattern>` | Kill processes by name |
| `top` | Real-time process monitor (mock) |
| `help` | Full list: type `help` in the shell |

### Network

| Command | Description |
|---------|-------------|
| `curl <url>` | HTTP client (pure `fetch()`) |
| `wget <url>` | File downloader (pure `fetch()`) |
| `ip <object>` | Network interface/routing tool (addr, route, link, neigh, rule) |
| `ping [-c <n>] <host>` | ICMP ECHO_REQUEST (mock) |
| `nc <host> <port>` | TCP netcat (mock) |
| `tc qdisc` | Traffic control — netem, tbf, htb qdiscs |
| `ss` / `netstat` | Socket statistics and connection tracking |
| `traceroute <host>` | Route tracing with simulated hop paths |
| `conntrack` | Connection tracking management |
| `ifconfig` | Legacy interface configuration |
| `iptables` | Firewall rule management |
| `help` | Full list: type `help` in the shell |

### Session

| Command | Description |
|---------|-------------|
| `ssh <user>@<host>` | SSH client (mock) |
| `sftp <user>@<host>` | SFTP client (mock) |
| `nano <path>` | Interactive text editor |
| `su [user]` | Switch user |
| `sudo <cmd>` | Run as root |
| `passwd [user]` | Change password |
| `adduser <name>` | Create user interactively (root only) |
| `deluser <name>` | Delete user (root only) |
| `last [user]` | Show login history |
| `w` | Who is logged on and what they are doing |
| `who` | Active sessions |
| `help` | Full list: type `help` in the shell |

### User & Group Management

| Command | Description |
|---------|-------------|
| `id [-u|-g|-G|-n] [user]` | User identity — real uid/gid/supplementary groups |
| `groups [user]` | All group memberships |
| `getent passwd\|group [key]` | Query user/group database |
| `groupadd [-g GID] <group>` | Create a new group |
| `groupdel <group>` | Delete a group |
| `gpasswd -a\|-d -G group user` | Add/remove users from groups |
| `usermod [-g\|-G\|-aG\|-L\|-U] <user>` | Modify user account |
| `newgrp [group]` | Switch primary group for session |
| `chage [-m\|-M\|-W\|-I\|-E\|-l] <user>` | Password aging & account expiry |
| `help` | Full list: type `help` in the shell |

### Package

| Command | Description |
|---------|-------------|
| `apt <cmd> [pkg...]` | Package manager |
| `dpkg` | Low-level package tool |
| `npm` | Node.js package manager |
| `npx` | Node.js package runner |
| `node` | Virtual JS runtime |
| `perl` | One-liner interpreter |
| `python3` | Virtual Python 3 interpreter |
| `help` | Full list: type `help` in the shell |

### Shell

| Command | Description |
|---------|-------------|
| `sh` | Execute shell script |
| `echo <text>` | Display text |
| `printf <fmt> [args...]` | Format and print |
| `read [-r] <var...>` | Read stdin into variable(s) |
| `source <file>` | Execute file in current env |
| `export NAME=VALUE` | Set shell variable |
| `set [VAR=val]` | Display or set shell variables |
| `unset <VAR>` | Remove shell variable |
| `alias [name=value]` | Define or display aliases |
| `type <command>` | Describe command interpretation |
| `test <expr>` / `[ <expr> ]` | POSIX conditional |
| `expr <expr>` | Evaluate expression |
| `declare [name=value]` | Declare variables |
| `exit [code]` | Exit session |
| `shift [n]` | Shift positional parameters |
| `return [n]` | Return from shell function |
| `trap [action] [signal]` | Signal handlers |
| `true` / `false` | Return exit code 0 / 1 |
| `sleep <seconds>` | Delay execution |
| `timeout <n> <cmd>` | Run command with time limit |
| `wait [job...]` | Wait for background jobs (no-op) |
| `history [n]` | Command history |
| `help` | Full list: type `help` in the shell |

### Desktop (browser only)

| Command | Description |
|---------|-------------|
| `startxfce4` | Launch the XFCE desktop — blocks the shell until logout |
| `thunar [path]` | Open the file manager window |
| `mousepad [file]` | Open the text editor (`gedit` and `xed` are aliases) |

> Desktop commands are no-ops outside the browser environment.

### Fun

| Command | Description |
|---------|-------------|
| `neofetch` | System info display |
| `cowsay [msg]` | ASCII cow saying something |
| `fortune` | Print a random adage |
| `cmatrix` | Matrix-style falling characters |
| `sl` | Steam locomotive |
| `yes [string]` | Repeatedly output string |
| `bc` | Arithmetic calculator |
| `seq` | Print sequence of numbers |
| `pacman` | Pacman game (mock) |
| `help` | Full list: type `help` in the shell |

**ℹ️ All 157 built-in commands include complete JSDoc documentation** with `@category` and `@params` tags. See [src/commands/](https://github.com/itsrealfortune/typescript-virtual-container/tree/main/src/commands) for source code and inline documentation.

Custom commands: `shell.addCommand(name, params, callback)`.

</details>

---

<details>
<summary><strong>Shell Scripting</strong></summary>

The interpreter supports a POSIX sh subset via `sh -c '...'`, `sh <file>`, or interactive session.

### Operators and Redirections

```bash
mkdir /app && echo "created"     # && — only if previous succeeds
rm /missing || echo "not found"  # || — only if previous fails
echo a; echo b; echo c           # ; — always all three

cat /etc/hosts | grep local
echo "hello" > /tmp/out.txt      # overwrite
cat /tmp/out.txt >> /tmp/log.txt # append
```

### Variable Expansion

```bash
export NAME=world
echo "Hello $NAME"            # basic variable
echo "${NAME:-fallback}"      # default if unset
echo "$(whoami)"              # command substitution
echo $((2 + 3))               # arithmetic expansion
echo "${HOME}"                # curly brace delimited
```

### Arithmetic

```bash
echo $((2 + 3))        # 5
X=4; echo $((X * 2))   # 8
i=0; i=$((i + 1))      # increment
```

### Conditionals

```bash
if [ -f /etc/config ]; then
  echo "config exists"
elif [ -d /etc ]; then
  echo "etc is a directory"
else
  echo "nothing found"
fi

[ "$USER" = "root" ] && echo "root"
[ $COUNT -gt 10 ] && echo "large"
```

### Loops

```bash
for name in alice bob charlie; do
  echo "Hello $name"
done

COUNT=0
while [ $COUNT -lt 3 ]; do
  echo "Count: $COUNT"
  COUNT=$((COUNT + 1))
done

until [ $COUNT -eq 0 ]; do
  echo "Countdown: $COUNT"
  COUNT=$((COUNT - 1))
done
```

### Functions and case

```bash
greet() {
  echo "Hello, $1!"
}
greet world

case "$1" in
  start) echo "Starting..." ;;
  stop)  echo "Stopping..." ;;
  *)     echo "Usage: $0 {start|stop}" ;;
esac
```

### Heredoc

```bash
cat << EOF
line one
line two
EOF

# write to file
cat > /tmp/config << EOF
HOST=localhost
PORT=3000
EOF
```

### set -e / set -x

```bash
set -e          # exit immediately on any non-zero exit code
set -x          # print each command before executing (trace)
set +e          # disable errexit
set +x          # disable xtrace
```

### Script Files

```typescript
shell.vfs.writeFile("/usr/local/bin/setup.sh", `
#!/bin/sh
for dir in config logs tmp; do
  mkdir /app/$dir
done
`);
await client.exec("sh /usr/local/bin/setup.sh");
```

### Login Files

Sourced automatically at session start, in order:

1. `/etc/environment` — `KEY=VALUE` pairs only, no shell syntax
2. `~/.profile` — user login script
3. `~/.bashrc` — interactive shell config

```bash
export EDITOR=nano
alias ll="ls -l"
echo "Welcome, $USER!"
```

Set `.bashrc` programmatically:

```typescript
shell.vfs.writeFile("/home/root/.bashrc", `
export EDITOR=nano
alias ll="ls -l"
echo "Welcome back, root!"
`.trim());
```

</details>

---

<details>
<summary><strong>Linux Rootfs &amp; VFS PATH Resolution</strong></summary>

### Directory Layout

On every `VirtualShell` init, a realistic Linux hierarchy is bootstrapped idempotently:

```
/
├── bin/
│   ├── [47 stubs: sh, bash, python3, ...]
├── boot/
├── dev/
│   ├── null, zero, random, urandom, tty, ...
├── etc/
│   ├── passwd, shadow, group, sudoers, hostname, ...
├── home/
│   └── root/
├── opt/
├── proc/
│   ├── (dynamic — uptime, meminfo, cpuinfo, stat, ...)
├── root/
├── run/
├── sbin/
│   └── init
├── sys/
├── tmp/
├── usr/
│   ├── bin/
│   ├── lib/python3.12/
│   ├── share/
│   └── src/
└── var/
    ├── log/
    └── lib/apt/
```

```typescript
shell.refreshProcFs();   // refresh /proc/* with current system state
shell.syncPasswd();      // sync /etc/passwd|group|shadow from user manager
```

### VFS PATH Resolution

When a command is not a built-in, the shell searches `$PATH` in the VFS — binaries installed by `apt` become immediately accessible.

- `/sbin` and `/usr/sbin` are excluded from `$PATH` for non-root users.
- Stubs containing `exec builtin <name>` delegate to the named built-in TS command.

**Package-gated commands** (require `apt install`):

| Command | Package |
|---------|---------|
| `node` | `nodejs` |
| `python3` / `python` | `python3` |
| `npm` / `npx` | `npm` |

### Built-in Package Registry (25 packages)

| Package | Version | Section |
|---------|---------|---------|
| `vim` | 2:9.0.1378-2 | editors |
| `git` | 1:2.39.2-1 | vcs |
| `python3` | 3.11.2-1 | python |
| `nodejs` | 18.19.0 | javascript |
| `npm` | 9.2.0 | javascript |
| `curl` | 7.88.1-10 | web |
| `wget` | 1.21.3-1 | web |
| `htop` | 3.2.2-2 | utils |
| `openssh-client` | 1:9.2p1-2 | net |
| `openssh-server` | 1:9.2p1-2 | net |
| `net-tools` | 2.10-0.1 | net |
| `iputils-ping` | 3:20221126-1 | net |
| `jq` | 1.6-2.1 | utils |
| `build-essential` | 12.9 | devel |
| `gcc` | 4:12.2.0-3 | devel |
| `g++` | 4:12.2.0-3 | devel |
| `make` | 4.3-4.1 | devel |
| `less` | 590-2 | text |
| `unzip` | 6.0-28 | utils |
| `rsync` | 3.2.7-1 | net |
| `tmux` | 3.3a-3 | utils |
| `tree` | 2.1.0-1 | utils |
| `ca-certificates` | 20230311 | misc |
| `sudo` | 1.9.13p3-1 | admin |
| `systemd` | 252.22-1 | admin |

</details>

---

<details>
<summary><strong>Configuration</strong></summary>

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SSH_MIMIC_FAST_PASSWORD_HASH` | `""` | Use SHA-256 instead of scrypt (dev only). Set to `1` or `true`. |
| `SSH_MIMIC_AUTO_SUDO_NEW_USERS` | `"true"` | Auto-grant sudo to new users. Set to `0`, `false`, `no`, or `off` to disable. |
| `DEV_MODE` | `""` | Enable performance logging. |
| `RENDER_PERF` | `""` | Enable render performance logging. |

### Constructor Options

```typescript
new VirtualShell(hostname, properties?, vfsOptions?)
// vfsOptions: { mode: "memory"|"fs", snapshotPath?: string }

new VirtualSshServer({
  port, hostname?,
  shell?,
  maxAuthAttempts?,   // default: 5
  lockoutDurationMs?, // default: 60_000
})

new VirtualSftpServer({ port, hostname?, shell? })
// or: { port, vfs, users } without a shell instance
```

</details>

---

<details>
<summary><strong>Performance &amp; Scalability</strong></summary>

```bash
bun ./benchmark-virtualshell.ts
```

Reports shell initialization time, command execution time, and RSS memory by concurrency. Designed to scale to **1000+ parallel environments**.

- SSH server is event-driven — handles many concurrent connections.
- `SshClient` is sequential per instance — create multiple for parallel operations.
- Each `VirtualShell` is fully independent.

**Tips:**
- Use `SSH_MIMIC_FAST_PASSWORD_HASH=1` in tests to skip scrypt overhead.
- Reuse long-lived shell instances for low-latency command bursts.

</details>

---

<details>
<summary><strong>Memory Management &amp; Garbage Collection</strong></summary>

Each `VirtualShell` holds its VFS tree, process table, sessions, and file descriptors entirely in the JS heap. For long-running servers or multi-shell deployments, two mechanisms keep memory in check:

### Idle freeze/thaw

After a configurable period of inactivity, the VFS tree is serialised to a compact binary buffer and the live object graph is released. On the next command the tree is reconstructed in ~0.1 ms.

```ts
await shell.ensureInitialized();
shell.enableIdleManagement({
  idleThresholdMs: 60_000,   // freeze after 60s of inactivity
  checkIntervalMs: 15_000,   // check every 15s
});
// Events: shell.on("shell:freeze", ...) / shell.on("shell:thaw", ...)
```

### Garbage collector

The GC is built into `IdleManager` and runs automatically when idle management is enabled. Each cycle (default every 30s) performs four steps in order:

1. **Scan process table** — find all processes with `status === "done"` and remove them.
2. **Clean stale CPU entries** — remove CPU time tracking for PIDs that no longer exist.
3. **Evict closed large files** — walk the VFS tree and zero out file contents that exceed the eviction threshold **and** have no open file descriptors. Evicted files are reloaded on demand from the snapshot.
4. **Trigger Node.js GC** — if the runtime was started with `--expose-gc`, call `globalThis.gc()` to force V8 to reclaim memory immediately.

```ts
shell.enableIdleManagement({
  idleThresholdMs: 60_000,
  gcIntervalMs: 30_000,  // GC runs every 30s (0 = disabled)
});
```

The GC timer is `unref()`'d so it never blocks `process.exit()`.

**Manual trigger and stats:**

```ts
const idle = new IdleManager(shell);
const stats = idle.runGc();
// stats: {
//   terminatedProcesses: 3,   // process records removed this cycle
//   staleCpuEntries: 1,       // orphaned CPU time entries cleared
//   evictedFiles: 2,          // large files zeroed out (no open FDs)
//   forcedGc: false,          // true only when --expose-gc is passed to Node/Bun
// }

idle.on("gc:run", (stats) => console.log(stats));
```

> **Note:** In `"fs"` mode the existing `evictionThresholdBytes` option (default 64 KB) already evicts large files after each `flushMirror()`. The GC extends this by also checking **open file descriptor state** — a large file that is currently open by a running command will NOT be evicted, even if it exceeds the threshold.

</details>

---

<details>
<summary><strong>Types &amp; TypeScript</strong></summary>

```typescript
import type {
  VfsOptions, VfsPersistenceMode,
  VfsSnapshot, VfsNodeStats, VfsFileNode, VfsDirectoryNode,
  WriteFileOptions, RemoveOptions,
  CommandContext, CommandResult, CommandMode, CommandOutcome,
  ShellModule, ShellEnv, SudoChallenge, NanoEditorSession,
  AuditLogEntry, HoneyPotStats,
  ShellStream, ExecStream,
} from "typescript-virtual-container";
```

</details>

---

## Troubleshooting

**`Error: listen EADDRINUSE :::2222`** — port already in use. Change port or stop existing process.

**Auth always fails** — root has no password by default. Verify with `users.verifyPassword(username, password)`. Check lockout: `ssh.clearLockout(ip)`.

**`Command 'xyz' not found` (exit 127)** — not a registered built-in and not found in VFS `$PATH`. Register with `shell.addCommand()` or `apt install` the package.

**Shell scripting — `if` block not working** — ensure each keyword is on its own line or separated by `;`.

**`snapshotPath` required error** — set `mode: "fs"` without `snapshotPath`: `new VirtualFileSystem({ mode: "fs", snapshotPath: "./data" })`.

**Variables not persisting between `exec()` calls** — `SshClient` shares one `ShellEnv` per shell instance. `export` in one call is visible in the next. For isolation, create a new `SshClient`.

**`Too many levels of symbolic links`** — symlink chain exceeds 8 hops. Check for circular links or increase `maxDepth` in `resolveSymlink()`.

---

## FAQ

**What exactly is this project?**
A self-contained Linux environment implemented entirely in TypeScript. It is not a mock, a stub, or a thin SSH wrapper — it is a full virtual container with its own filesystem (`VirtualFileSystem`), user and permission system (`VirtualUserManager`), shell interpreter, package manager, network layer, process table, and desktop environment. Each `VirtualShell` instance is an independent container that runs anywhere TypeScript runs: Node.js, Bun, or the browser.

**How is this different from a Docker container or a real VM?**
Docker and VMs enforce kernel-level isolation and run real binaries. This project runs entirely in the JavaScript runtime — no subprocess is ever spawned, no host binary is called. The trade-off is intentional: you get zero-dependency portability (including the browser), a fully inspectable and programmable environment, and no host OS requirements. It is not a security boundary.

**Is the environment fully isolated?**
No — and this is important to understand before exposing it to untrusted input:

- **Network is real.** `curl` and `wget` use the host's `fetch()` — requests reach the actual internet.
- **The JS heap is shared.** All `VirtualShell` instances run in the same JavaScript runtime as your application. There is no memory boundary between them or between the shell and the host.
- **No resource enforcement.** CPU usage and memory consumption are not capped by the container itself — a runaway loop consumes real host resources.
- **Filesystem isolation holds** in `"memory"` mode (the VFS never touches the host FS) and is limited to one `.vfsb` file in `"fs"` mode.

In short: the shell commands are sandboxed, the runtime is not.

**Can I use this in production?**
Yes, for the right use cases: automated test harnesses, interactive tutorials, training environments, honeypots, and browser-based shell experiences. Do not expose it to arbitrary untrusted input without additional isolation at the infrastructure level — it is not a security boundary.

**Does the VFS touch the host filesystem?**
In `"memory"` mode: never. In `"fs"` mode: exactly one binary file (`vfs-snapshot.vfsb`) inside `snapshotPath`. In the browser: IndexedDB only.

**Can I run multiple isolated environments in parallel?**
Yes. Each `new VirtualShell(...)` is fully independent — separate VFS, user database, environment state, and session manager. They share no global state.

**Does the shell support `&&`, `||`, `;`, and `&`?**
Yes — plus pipes, redirections, `if`/`for`/`while`/`until`/`case`, function definitions, arrays, brace expansion, glob expansion, heredocs, `set -e`/`set -x`, and background jobs (`cmd &`).

**Can I use this for honeypot deployments?**
Yes — `HoneyPot.attach()` captures every command, file write, auth attempt, and session event with timestamps. Configure `maxAuthAttempts` to throttle scanners. Export the audit log on shutdown.

**Is SFTP fully supported?**
Core operations are implemented. Extended attributes and symlinks return `OP_UNSUPPORTED`.

**Does the desktop work outside the browser?**
No — `startxfce4`, `thunar`, and `mousepad` require a DOM. In Node.js/Bun they return an error immediately. The `DesktopManager` is only instantiated in the web shell example (`demo/app.ts`).

**What does the desktop simulate?**
A single-user XFCE session: a panel with Applications menu and clock, draggable windows, a file manager (Thunar) with navigation, right-click context menu, rename, and trash, a text editor (Mousepad) with Ctrl+S save, and terminal windows each backed by a real interactive shell session against the same VFS.

---

## Contributing

1. Fork and create a feature branch: `git checkout -b feat/my-feature`
2. Add changes and tests.
3. Format and lint: `bun format && bun check`
4. Push and open a PR.

**Standards:** Biome formatting · full TypeScript (no `any`) · ✅ **JSDoc on all built-in commands** · async/await · `description` and `category` fields on new `ShellModule` · unit tests (prioritized for core features; advanced tests planned).

---

## Security

- Passwords hashed with scrypt (N=32768, r=8, p=1) with random per-user salt.
- Root account always exists and cannot be deleted.
- Per-IP rate limiting prevents automated brute-force on the SSH server.
- **Account lockout** — accounts are locked after 5 consecutive failed login attempts.
- **Password aging** — configurable min/max age, warning period, and account expiry via `chage`.
- **Account lock/unlock** — password hash prefixed with `!` to disable authentication.
- **Sudo timestamp caching** — 5-minute credential cache matching real `sudo` behavior.
- **Group-based permissions** — supplementary groups tracked in `/etc/group` with full membership management.
- This project does **not** provide kernel-level or process-level isolation. All `VirtualShell` instances share the same JS heap as the host application.
- `curl` and `wget` issue real network requests via `fetch()` — they are not sandboxed.
- Do **not** expose to untrusted input without additional infrastructure-level isolation.

Vulnerability reports: contact maintainers privately before public disclosure — see `SECURITY.md`.

---

## Compatibility

- **Node.js**: `>=18` · **Bun**: Supported · **TypeScript**: `>=5.0`
- **OS**: Linux, macOS, Windows (via Node/Bun)

---

## License

MIT — see [LICENSE](./LICENSE).