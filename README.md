# `typescript-virtual-container`

> A complete virtual Linux environment in pure TypeScript — runs as an SSH/SFTP server, a browser-based web shell, a standalone CLI, or a full XFCE desktop simulation. Ships with a realistic Linux rootfs, a virtual package manager, a full shell interpreter, and a typed programmatic API for testing, automation, honeypots, and embedded shell experiences.

[![npm version](https://badge.fury.io/js/typescript-virtual-container.svg)](https://www.npmjs.com/package/typescript-virtual-container)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Runtime](https://img.shields.io/badge/runtime-Node.js%20%7C%20Bun-43853D.svg)](https://nodejs.org/)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://itsrealfortune.fr/typescript-virtual-container/demo)

---

## Table of Contents

- [Four ways to run](#four-ways-to-run) · [Get Started](#get-started)
- [How It Works](#how-it-works) · [Built-in Commands](#built-in-commands-149)
- [Shell Scripting](#shell-scripting) · [Linux Rootfs](#linux-rootfs--vfs-path-resolution)
- [Configuration](#configuration) · [Troubleshooting](#troubleshooting)
- [FAQ](#faq) · [Contributing](#contributing)
- [License](#license) · [Roadmap](#roadmap)

---

## Four ways to run

<!-- BUILD:mode-table -->
| Mode | Entry point | Use case |
|------|-------------|----------|
| **SSH/SFTP server** | `VirtualSshServer` / `VirtualSftpServer` | Honeypots, remote testing, training environments |
| **Web shell** | `builds/fortune-nyx-v1.6.2-web.min.js` (ESM) | Embedded terminals, interactive tutorials, browser demos |
| **Standalone CLI** | `builds/fortune-nyx-v1.6.2-directbash-k6.1.0.mjs` (single file) | Local shell, one-liner demos, no install required |
| **XFCE desktop** | `startxfce4` in the web shell | Full graphical desktop in the browser — windows, file manager, text editor, trash |
<!-- /BUILD:mode-table -->

All four modes share the same core: a pure in-memory VFS, a real shell interpreter, a virtual package manager, and a typed programmatic API.

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
curl -s https://raw.githubusercontent.com/itsrealfortune/typescript-virtual-container/refs/heads/main/builds/fortune-nyx-v1.6.2-directbash-k6.1.0.mjs -o fortune-nyx-v1.6.2-directbash-k6.1.0.mjs && node fortune-nyx-v1.6.2-directbash-k6.1.0.mjs
```

#### SSH server with built-in SFTP subsystem (scp / sftp on port 2222)
```bash
curl -s https://raw.githubusercontent.com/itsrealfortune/typescript-virtual-container/refs/heads/main/builds/fortune-nyx-v1.6.2-ssh.cjs -o fortune-nyx-v1.6.2-ssh.cjs && node fortune-nyx-v1.6.2-ssh.cjs
```

#### Custom SSH port
```bash
node fortune-nyx-v1.6.2-ssh.cjs --ssh-port=2022
```

#### SSH disabled (handler only, no server started)
```bash
node fortune-nyx-v1.6.2-ssh.cjs --no-ssh
```
<!-- /BUILD:curl-start -->

> [!NOTE]
> The standalone builds are intended for quick demos and testing. For production use, it's recommended to install the package and import the relevant classes directly in your codebase for better performance, stability, and security.

<!-- BUILD:selfStandalone-options -->
**`fortune-nyx-v1.6.2-directbash-k6.1.0.mjs` options:**

```bash
node fortune-nyx-v1.6.2-directbash-k6.1.0.mjs                          # boot as root
node fortune-nyx-v1.6.2-directbash-k6.1.0.mjs --user alice             # boot as alice (prompts for password if set)
node fortune-nyx-v1.6.2-directbash-k6.1.0.mjs --user=alice             # same, inline form
node fortune-nyx-v1.6.2-directbash-k6.1.0.mjs --hostname=my-box        # custom hostname
node fortune-nyx-v1.6.2-directbash-k6.1.0.mjs --snapshot=/data/.vfs    # custom VFS snapshot path
node fortune-nyx-v1.6.2-directbash-k6.1.0.mjs --help                   # show all options
node fortune-nyx-v1.6.2-directbash-k6.1.0.mjs --version                # print version
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
| `builds/fortune-nyx-v1.6.2-web.min.js` | ESM | `createWebShell()` | Embedded terminals, modern bundlers |
<!-- /BUILD:web-table -->

Both bundles persist the VFS in **IndexedDB** — state survives page reloads.

```bash
bun run web-build       # → builds/web.min.js + examples/web.min.js
bun run web-full-build  # → builds/web-full-api.min.js
bun run build-all       # rebuild everything
```

<!-- BUILD:web-options -->
**`fortune-nyx-v1.6.2-web.min.js`** — lightweight shell with IndexedDB VFS:

```html
<script type="module">
  import { createWebShell } from "./builds/fortune-nyx-v1.6.2-web.min.js";

  const shell = createWebShell("web-vm", {
    vfs: { databaseName: "virtual-env-js", storeName: "vfs" },
  });
  await shell.ensureInitialized();

  const out = await shell.executeCommandLine("ls /etc && echo hello");
  console.log(out.stdout);
</script>
```

**`fortune-nyx-v1.6.2-web.min.js`** — mirrors the `VirtualShell` programmatic API:

```html
<script type="module">
  import { createVirtualShellShim } from "./builds/fortune-nyx-v1.6.2-web.min.js";

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
     │        HoneyPot         │
     │ audit log · stats       │
     │ anomaly detection       │
     └─────────────────────────┘
```

**What it is:** a shell emulator and virtual Linux environment for developer workflows.

**What it is not:** a kernel-level security boundary. `curl`/`wget` use the native `fetch()` API — no host binary spawned. `node`/`python3`/`npm` are virtual REPL stubs, not real runtimes. `execvp` is never called. Do not expose to the public internet without additional isolation.

---

<details>
<summary><strong>API Reference</strong></summary>

<!-- https://itsrealfortune.fr/typescript-virtual-container/ -->
API reference for all core classes and utilities. Designed for quick lookup while developing with the library. More extensive documentation, examples, and guides are available in <a href="https://itsrealfortune.fr/typescript-virtual-container/">the documentation</a>.

</details>

---

<details>
<summary><strong>Examples</strong></summary>

### SSH Server with Events

```typescript
import { VirtualSshServer } from "typescript-virtual-container";

const ssh = new VirtualSshServer({ port: 2222, hostname: "lab-environment" });

ssh.on("auth:success", ({ username, remoteAddress }) => {
  console.log(`[SSH] ${username} from ${remoteAddress}`);
});
ssh.on("auth:lockout", ({ ip, until }) => {
  console.warn(`[SSH] ${ip} locked until ${until}`);
});

await ssh.start();
process.on("SIGINT", () => { ssh.stop(); process.exit(0); });
```

### SSH + SFTP with Shared State

```typescript
import { VirtualSftpServer, VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("my-container");
const ssh   = new VirtualSshServer({ port: 2222, shell });
const sftp  = new VirtualSftpServer({ port: 2223, shell });

await ssh.start();
await sftp.start();
```

### Multi-User Environment with Quotas

```typescript
import { SshClient, VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("typescript-vm");
const ssh   = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

const users = ssh.getUsers()!;
await users.addUser("alice", "alice123");
await users.addUser("bob",   "bob456");
await users.removeSudoer("bob");
await users.setQuotaBytes("bob", 5 * 1024 * 1024); // 5 MB

const alice = new SshClient(shell, "alice");
await alice.writeFile("/etc/important.conf", "secret=yes");

const bob = new SshClient(shell, "bob");
const r = await bob.cat("/etc/important.conf");
console.log(r.stderr); // permission denied
```

### Persistent State

```typescript
// FS mode — automatic .vfsb persistence
const shell = new VirtualShell("my-vm", undefined, {
  mode: "fs",
  snapshotPath: "./container-data",
});
const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();
// Restored from ./container-data/vfs-snapshot.vfsb on start, saved on every write.

// Memory mode — manual JSON snapshot
import { VirtualFileSystem } from "typescript-virtual-container";
import { writeFileSync, readFileSync } from "node:fs";

const vfs = new VirtualFileSystem();
vfs.writeFile("/data/report.txt", "Baseline data");
writeFileSync("snapshot.json", JSON.stringify(vfs.toSnapshot()));

const restored = VirtualFileSystem.fromSnapshot(
  JSON.parse(readFileSync("snapshot.json", "utf8"))
);
console.log(restored.readFile("/data/report.txt")); // Baseline data
```

### Public-Key Authentication

```typescript
import { readFileSync } from "node:fs";

const shell = new VirtualShell("secure-vm");
await shell.ensureInitialized();
await shell.users.addUser("alice", "fallback-password");

const pubLine = readFileSync(`${process.env.HOME}/.ssh/id_ed25519.pub`, "utf8").trim();
const [algo, b64] = pubLine.split(" ");
shell.users.addAuthorizedKey("alice", algo, Buffer.from(b64, "base64"));

const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();
// ssh -i ~/.ssh/id_ed25519 alice@localhost -p 2222
```

### Rate Limiting

```typescript
const ssh = new VirtualSshServer({
  port: 2222,
  maxAuthAttempts: 3,
  lockoutDurationMs: 300_000,
});
ssh.on("auth:lockout", ({ ip, until }) => console.warn(`${ip} locked until ${until}`));
ssh.clearLockout("192.168.1.100"); // manual override
```



### Snapshot-Based Test Fixtures

```typescript
import { VirtualFileSystem } from "typescript-virtual-container";
import type { VfsSnapshot } from "typescript-virtual-container";

function buildFixture(): VfsSnapshot {
  const vfs = new VirtualFileSystem();
  vfs.mkdir("/app/config");
  vfs.writeFile("/app/config/settings.json", JSON.stringify({ env: "test" }));
  return vfs.toSnapshot();
}

const FIXTURE = buildFixture();

test("reads config file", () => {
  const vfs     = VirtualFileSystem.fromSnapshot(FIXTURE);
  const content = JSON.parse(vfs.readFile("/app/config/settings.json"));
  expect(content.env).toBe("test");
});
```

### Snapshot Diff in Tests

```typescript
import { diffSnapshots, assertDiff } from "typescript-virtual-container";

const before = shell.vfs.toSnapshot();
await client.exec("apt install vim && mkdir -p /app");
const after = shell.vfs.toSnapshot();

assertDiff(diffSnapshots(before, after, { ignore: ["/proc"] }), {
  added:    ["/app", "/usr/bin/vim"],
  modified: ["/var/lib/dpkg/status"],
});
```

### Symlinks

```typescript
const vfs = new VirtualFileSystem();
vfs.writeFile("/opt/myapp/bin/app", "#!/bin/sh\necho hello");
vfs.symlink("/opt/myapp/bin/app", "/usr/local/bin/app");

console.log(vfs.isSymlink("/usr/local/bin/app"));     // true
console.log(vfs.resolveSymlink("/usr/local/bin/app")); // /opt/myapp/bin/app
```

### Security Auditing with HoneyPot

Attach HoneyPot to any set of virtual components to log every event with timestamps, track statistics, and detect anomalies.

```typescript
import { HoneyPot, VirtualShell, VirtualSshServer } from "typescript-virtual-container";

const shell = new VirtualShell("typescript-vm");
const ssh   = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

const hp = new HoneyPot(5000);
hp.attach(shell, shell.vfs, shell.users, ssh);

const stats = hp.getStats();
console.log(`Commands: ${stats.commands}, File writes: ${stats.fileWrites}`);

hp.detectAnomalies().forEach(a =>
  console.log(`[${a.severity.toUpperCase()}] ${a.type}: ${a.message}`)
);
```

**Tracked events by source:**

| Source | Events | Stats |
|--------|--------|-------|
| `VirtualShell` | `initialized`, `command`, `session:start`, `shell:freeze`, `shell:thaw` | `commands`, `sessionStarts`, `shellFreezes`, `shellThaws` |
| `VirtualFileSystem` | `file:read`, `file:write`, `dir:create`, `snapshot:restore`, `snapshot:import`, `mirror:flush`, `mount`, `unmount`, `symlink:create`, `node:remove` | `fileReads`, `fileWrites`, `snapshotsRestored`, `snapshotsImported`, `mounts`, `unmounts`, `symlinksCreated`, `nodesRemoved` |
| `VirtualUserManager` | `initialized`, `user:add`, `user:delete`, `session:register`, `session:unregister`, `key:add`, `key:remove` | `userCreated`, `userDeleted`, `sessionEnds`, `keysAdded`, `keysRemoved` |
| `SshMimic` | `start`, `stop`, `auth:success`, `auth:failure`, `auth:lockout`, `client:connect`, `client:disconnect` | `authAttempts`, `authSuccesses`, `authFailures`, `authLockouts`, `clientConnects`, `clientDisconnects` |
| `SftpMimic` | `start`, `stop`, `auth:success`, `auth:failure`, `client:connect`, `client:disconnect` | `authAttempts`, `authSuccesses`, `authFailures`, `clientConnects`, `clientDisconnects` |

**Anomaly detection** — `hp.detectAnomalies()` flags high auth failure rates (>50%), excessive failures (>10), high command volume (>1000), and high write volume (>500).

### Concurrent Clients

```typescript
const shell   = new VirtualShell("typescript-vm");
const client1 = new SshClient(shell, "alice");
const client2 = new SshClient(shell, "bob");

const [r1, r2] = await Promise.all([
  client1.writeFile("/tmp/alice.txt", "Alice's data"),
  client2.writeFile("/tmp/bob.txt",   "Bob's data"),
]);
```

</details>

---

<details>
<summary><strong>Built-in Commands (152)</strong></summary>

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
| `ip <object>` | Network interface/routing tool |
| `ping [-c <n>] <host>` | ICMP ECHO_REQUEST (mock) |
| `nc <host> <port>` | TCP netcat (mock) |
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
| `adduser <name> <pass>` | Create user (root only) |
| `deluser <name>` | Delete user (root only) |
| `last [user]` | Show login history |
| `w` | Who is logged on and what they are doing |
| `who` | Active sessions |
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

**ℹ️ All 152 built-in commands include complete JSDoc documentation** with `@category` and `@params` tags. See [src/commands/](https://github.com/itsrealfortune/typescript-virtual-container/tree/main/src/commands) for source code and inline documentation.

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

**Is this a real container runtime?**
No — it emulates SSH sessions, users, and filesystem behavior in a virtual runtime. Ideal for testing, simulations, and automation where full OS isolation is not required.

**Can I use this in production?**
Yes for automation contexts (sandboxed command runners, test harnesses, training environments, honeypots). It is not a security boundary like a real container/VM.

**Does the VFS touch the host filesystem?**
In `"memory"` mode: no. In `"fs"` mode: one binary file (`vfs-snapshot.vfsb`) inside `snapshotPath` only.

**Can I run multiple isolated shells?**
Yes. Each `new VirtualShell(...)` is completely independent (separate VFS, users, env state).

**Does the shell support `&&`, `||`, `;`, and `&`?**
Yes — plus pipes, redirections, `if`/`for`/`while`/`case`, function definitions, and background jobs (`cmd &`).

**Can I use this for honeypot deployments?**
Yes — use `HoneyPot.attach()` to capture all activity, configure `maxAuthAttempts` to throttle scanners, export on shutdown.

**Is SFTP fully supported?**
Core operations are implemented. Extended attributes and symlinks return `OP_UNSUPPORTED`.

**Does the desktop work outside the browser?**
No — `startxfce4`, `thunar`, and `mousepad` require a DOM. In Node.js/Bun they return an error immediately. The `DesktopManager` is only instantiated in the web shell example (`examples/app.ts`).

**What does the desktop simulate?**
A single-user XFCE session: a panel with Applications menu and clock, draggable windows, a file manager (Thunar) with right-click context menu and trash support, a text editor (Mousepad) with Ctrl+S save, and terminal windows backed by real interactive shell sessions.

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
- This project does **not** provide kernel-level or process-level isolation.
- Do **not** expose to the public internet without understanding the risks.

Vulnerability reports: contact maintainers privately before public disclosure — see `SECURITY.md`.

---

## Compatibility

- **Node.js**: `>=18` · **Bun**: Supported · **TypeScript**: `>=5.0`
- **OS**: Linux, macOS, Windows (via Node/Bun)

---

## License

MIT — see [LICENSE](./LICENSE).

---

## Roadmap

Open:

- [ ] WebSocket-based remote shell client (experimental)
- [ ] XFCE desktop: resize windows, multi-monitor layout
- [ ] Thunar: drag-and-drop between folders

<details>
<summary>Completed</summary>

- [x] Custom command plugin API · per-user quotas · SSH public-key auth · per-IP rate limiting
- [x] Pure in-memory VFS · symlinks · binary snapshot format (VFSB, ~27% smaller than JSON+base64)
- [x] Linux rootfs on boot — `/etc`, `/proc`, `/sys`, `/dev`, `/usr`, `/var`
- [x] Virtual package manager — `apt`/`dpkg`, 25 packages, VFS file writes
- [x] 127 built-in commands across 11 categories (added `zip`, `unzip`, `bzip2`, `bunzip2`, `lsof`, `strace`, `perl`, `w`, `ip`, `dmesg`, `last`, `basename`, `dirname`, `file`, `tput`, `stty`, `yes`, `fortune`, `cowsay`, `cowthink`, `cmatrix`, `sl`, `bc`, `jobs`, `bg`, `fg`, `tac`, `nl`, `paste`, `shuf`, `column`, `timeout`, `mktemp`, `nproc`, `wait`)
- [x] Real shell interpreter — `if`/`for`/`while`/`until`/`case`/functions, arrays `arr=(...)`, `$(cmd)`, `$((expr))`, `${#VAR}`, `${var#pfx}` `${var##pfx}` `${var%sfx}` `${var%%sfx}` `${var/p/r}` `${var//p/r}` `${var:off:len}` `${arr[@]}`, `{a,b,c}` brace expansion, `{1..N}` ranges, `*.glob` expansion, `!!` history expansion, `\` line continuation, `2>/dev/null` stderr redirect, `2>&1`, `(( x++ ))`, heredoc `<< EOF`, `set -e`/`set -x`, `$RANDOM`/`$LINENO`
- [x] `curl`/`wget` as pure `fetch()` · VFS PATH resolution · `/sbin` root-only
- [x] `/proc/self` and `/proc/<pid>` per-session entries
- [x] Snapshot diff tooling — `diffSnapshots`, `formatDiff`, `assertDiff`
- [x] `node`/`python3`/`npm`/`npx` — package-gated virtual REPL stubs
<!-- BUILD:changelog -->
- [x] Web shell bundles (`fortune-nyx-v1.6.2-web.min.js`) — fully browser-native with IndexedDB VFS
- [x] Self-standalone CLI (`fortune-nyx-v1.6.2-directbash-k6.1.0.mjs`) — single-file interactive shell, per-user history, tab completion
<!-- /BUILD:changelog -->
- [x] XFCE desktop simulation — `startxfce4` launches a full in-browser desktop with draggable windows, XFCE panel (Applications menu, clock, tray), Thunar file manager (navigate, right-click, trash, rename), Mousepad text editor (Ctrl+S, dirty indicator), terminal windows with live shell sessions, Font Awesome icons
- [x] 127+ `man` pages — all built-in commands documented via `man <cmd>`
- [x] Background job support — trailing `&` fires commands async; `:(){ :|:& };:` fork-bomb safely blocked by `MAX_CALL_DEPTH` guard; shell function names now accept any non-whitespace identifier (POSIX-compliant)
- [x] Shared `tokenize.ts` — unified tokenizer for shell parser and runtime (eliminates duplication)
- [x] Full readline line editing — `Ctrl+A/E/K/U/W`, `Home`/`End`, `!!` history expansion, `/etc/environment` + `~/.profile` login sourcing
- [x] Interoperable archive formats — `tar` writes real POSIX ustar binary; `zip`/`unzip` use PKZIP+DEFLATE (fflate); files extracted by real system tools via SFTP
- [x] Overhauled `sed` — `d`/`p`/`=`/`q`, `-n` suppress, line/regex/range/`$` addresses; overhauled `awk` — `-v`, field assignment, `gsub`/`sub`/`substr`/`split`/`length`/`printf`/`next`; overhauled `find` — `-exec`, `-maxdepth`, `-iname`, `-not`/`!`, `-o`/`-a`, `-empty`, `-size`
- [x] `PasswordChallenge` type — generic interactive password flow for `adduser`, `passwd`, `deluser`
- [x] `VirtualFileSystem.mount(vPath, hostPath, { readOnly })` — bind-mount host directories into the VM; read-only by default; browser-safe (silent no-op)

</details>