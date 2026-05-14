# `typescript-virtual-container`

> A complete virtual Linux environment in pure TypeScript — runs as an SSH/SFTP server, a browser-based web shell, or a standalone CLI. Ships with a realistic Linux rootfs, a virtual package manager, a full shell interpreter, and a typed programmatic API for testing, automation, honeypots, and embedded shell experiences.

[![npm version](https://badge.fury.io/js/typescript-virtual-container.svg)](https://www.npmjs.com/package/typescript-virtual-container)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Runtime](https://img.shields.io/badge/runtime-Node.js%20%7C%20Bun-43853D.svg)](https://nodejs.org/)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://itsrealfortune.fr/typescript-virtual-container/demo)

---

## Table of Contents

- [Three ways to run](#three-ways-to-run)
- [Get Started](#get-started)
  - [Install](#install)
  - [Try instantly (zero install)](#try-instantly-zero-install)
  - [SSH server](#ssh-server)
  - [Web shell (browser)](#web-shell-browser)
  - [Programmatic API](#programmatic-api)
- [How It Works](#how-it-works)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Built-in Commands (118)](#built-in-commands-118)
- [Shell Scripting](#shell-scripting)
- [Linux Rootfs & VFS PATH Resolution](#linux-rootfs--vfs-path-resolution)
- [Configuration](#configuration)
- [Performance & Scalability](#performance--scalability)
- [Types & TypeScript](#types--typescript)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [Contributing](#contributing)
- [Security](#security)
- [Compatibility](#compatibility)
- [License](#license)
- [Roadmap](#roadmap)

---

## Three ways to run

<!-- BUILD:mode-table -->
| Mode | Entry point | Use case |
|------|-------------|----------|
| **SSH/SFTP server** | `VirtualSshServer` / `VirtualSftpServer` | Honeypots, remote testing, training environments |
| **Web shell** | `builds/fortune-nyx-v1.5.6-web.min.js` (ESM) | Embedded terminals, interactive tutorials, browser demos |
| **Standalone CLI** | `builds/fortune-nyx-v1.5.6-directbash-k6.1.0.mjs` (single file) | Local shell, one-liner demos, no install required |
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
curl -s https://raw.githubusercontent.com/itsrealfortune/typescript-virtual-container/refs/heads/main/builds/fortune-nyx-v1.5.6-directbash-k6.1.0.mjs -o fortune-nyx-v1.5.6-directbash-k6.1.0.mjs && node fortune-nyx-v1.5.6-directbash-k6.1.0.mjs
```

#### SSH server with built-in SFTP subsystem (scp / sftp on port 2222)
```bash
curl -s https://raw.githubusercontent.com/itsrealfortune/typescript-virtual-container/refs/heads/main/builds/fortune-nyx-v1.5.6-ssh.cjs -o fortune-nyx-v1.5.6-ssh.cjs && node fortune-nyx-v1.5.6-ssh.cjs
```

#### Custom SSH port
```bash
node fortune-nyx-v1.5.6-ssh.cjs --ssh-port=2022
```

#### SSH disabled (handler only, no server started)
```bash
node fortune-nyx-v1.5.6-ssh.cjs --no-ssh
```
<!-- /BUILD:curl-start -->

> [!NOTE]
> The standalone builds are intended for quick demos and testing. For production use, it's recommended to install the package and import the relevant classes directly in your codebase for better performance, stability, and security.

<!-- BUILD:selfStandalone-options -->
**`fortune-nyx-v1.5.6-directbash-k6.1.0.mjs` options:**

```bash
node fortune-nyx-v1.5.6-directbash-k6.1.0.mjs                          # boot as root
node fortune-nyx-v1.5.6-directbash-k6.1.0.mjs --user alice             # boot as alice (prompts for password if set)
node fortune-nyx-v1.5.6-directbash-k6.1.0.mjs --user=alice             # same, inline form
node fortune-nyx-v1.5.6-directbash-k6.1.0.mjs --hostname=my-box        # custom hostname
node fortune-nyx-v1.5.6-directbash-k6.1.0.mjs --snapshot=/data/.vfs    # custom VFS snapshot path
node fortune-nyx-v1.5.6-directbash-k6.1.0.mjs --help                   # show all options
node fortune-nyx-v1.5.6-directbash-k6.1.0.mjs --version                # print version
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
| `builds/fortune-nyx-v1.5.6-web.min.js` | ESM | `createWebShell()` | Embedded terminals, modern bundlers |
<!-- /BUILD:web-table -->

Both bundles persist the VFS in **IndexedDB** — state survives page reloads.

```bash
bun run web-build       # → builds/web.min.js + examples/web.min.js
bun run web-full-build  # → builds/web-full-api.min.js
bun run build-all       # rebuild everything
```

<!-- BUILD:web-options -->
**`fortune-nyx-v1.5.6-web.min.js`** — lightweight shell with IndexedDB VFS:

```html
<script type="module">
  import { createWebShell } from "./builds/fortune-nyx-v1.5.6-web.min.js";

  const shell = createWebShell("web-vm", {
    vfs: { databaseName: "virtual-env-js", storeName: "vfs" },
  });
  await shell.ensureInitialized();

  const out = await shell.executeCommandLine("ls /etc && echo hello");
  console.log(out.stdout);
</script>
```

**`fortune-nyx-v1.5.6-web.min.js`** — mirrors the `VirtualShell` programmatic API:

```html
<script type="module">
  import { createVirtualShellShim } from "./builds/fortune-nyx-v1.5.6-web.min.js";

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
               ┌──────────▼──────────┐
               │    VirtualShell     │
               │  script parser      │  ← &&/||/; · if/for/while/case
               │  command executor   │  ← per-session ShellEnv
               │  .bashrc loader     │  ← /home/<user>/.bashrc
               │  session manager    │
               └──┬──────────────┬───┘
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

### Shell Operators and Variables

```typescript
const client = new SshClient(shell, "root");

await client.exec("mkdir /tmp/test && echo created || echo failed");
await client.exec("export GREETING=hello && echo $GREETING world");
await client.exec("false; echo exit=$?"); // exit=1

const r = await client.exec("echo -e 'banana\\napple\\ncherry' | sort");
console.log(r.stdout); // apple\nbanana\ncherry
```

### Shell Scripting

```typescript
shell.vfs.writeFile("/usr/local/bin/setup.sh", `
#!/bin/sh
for dir in config logs tmp; do
  mkdir /app/$dir
  echo "Created /app/$dir"
done
if [ -d /app/config ]; then
  echo "Setup complete"
fi
`);
const r = await client.exec("sh /usr/local/bin/setup.sh");
console.log(r.stdout);
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

### .bashrc

```typescript
shell.vfs.writeFile("/home/root/.bashrc", `
export EDITOR=nano
export PATH="/usr/local/bin:/usr/bin:/bin"
alias ll="ls -l"
echo "Welcome back, root!"
`.trim());
// On interactive SSH login, .bashrc is sourced automatically.
```

</details>

---

<details>
<summary><strong>Built-in Commands (118)</strong></summary>

Type `help` in the shell for a grouped, colorized listing. Type `help <command>` for detailed usage. Type `man <command>` for full manual pages — all 118 commands are documented.

### Navigation

| Command | Flags | Description |
|---------|-------|-------------|
| `cd <path>` | | Change directory |
| `ls [path]` | `-l` `-a` | List directory (`-a` shows dotfiles) |
| `pwd` | | Print working directory |
| `tree [path]` | | ASCII directory tree |

### Files & Filesystem

| Command | Flags | Description |
|---------|-------|-------------|
| `cat <path...>` | `-n` `-b` | Concatenate and print; `-n` numbers lines, `-b` numbers non-blank |
| `chmod <mode> <file>` | | Octal (`755`) or symbolic (`+x`, `u+x`, `go-w`, `a=rx`) |
| `cp <src> <dest>` | `-r` | Copy file or directory |
| `find [path]` | `-name` `-iname` `-type` `-maxdepth` `-mindepth` `-exec` `-not` `-o` `-a` `-empty` `-size` | Search for files |
| `ln <target> <link>` | `-s` | Hard or symbolic link |
| `readlink <path>` | `-f` | Print resolved path of symbolic link |
| `mkdir <path>` | `-p` | Create directory |
| `mv <src> <dest>` | | Move or rename |
| `nano <path>` | | Interactive text editor |
| `rm <path>` | `-r` | Remove file or directory |
| `stat <path>` | `-c <format>` | Display file status (inode, size, mode, timestamps) |
| `touch <path>` | | Create or update file |

### Text Processing

| Command | Flags | Description |
|---------|-------|-------------|
| `awk [-F <sep>] '<prog>'` | `-v var=val` | Pattern scanning — NR/NF, `BEGIN`/`END`, field assign, `gsub`/`sub`/`substr`/`split`/`length`, `printf` |
| `base64` | `-d` | Encode/decode base64 |
| `cut` | `-d` `-f` | Remove sections from lines |
| `diff <f1> <f2>` | | Compare files line by line |
| `grep <pattern> [files]` | `-i` `-v` `-n` `-r` | Search file content |
| `head [files]` | `-n <N>` | First N lines |
| `sed -e 's/pat/rep/[g]'` | `-n` `-i` `-e` | Stream editor — `s///[gI]`, `d`, `p`, `=`, `q`, line/regex/range addresses |
| `sort [files]` | `-r` `-n` `-u` | Sort lines |
| `tail [files]` | `-n <N>` | Last N lines |
| `tee [files]` | `-a` | Read stdin, write to stdout and files |
| `tr <set1> [set2]` | `-d` | Translate or delete characters |
| `uniq` | `-c` `-d` `-u` | Filter repeated lines |
| `basename <path> [suffix]` | `-a` `-s` | Strip directory and suffix from path |
| `dirname <path>` | | Strip last component from path |
| `file <path...>` | | Determine file type (magic bytes) |
| `wc [files]` | `-l` `-w` `-c` | Word/line/byte count |
| `xargs [cmd]` | | Build and execute commands from stdin |

### Archive & Compression

| Command | Flags | Description |
|---------|-------|-------------|
| `gzip <file>` / `gunzip <file>` | `-k` `-d` | Compress / decompress (real gzip, browser-native) |
| `bzip2 <file>` / `bunzip2 <file>` | `-k` `-d` | Compress / decompress bzip2 (VFS round-trip) |
| `zip [-r] <archive> <files>` / `unzip <archive>` | `-l` `-d <dir>` | Real PKZIP + DEFLATE (interoperable) |
| `tar <archive> [files]` | `-czf` `-xzf` `-tf` `-v` | Archive utility — real POSIX ustar binary format (interoperable) |

### System

| Command | Flags | Description |
|---------|-------|-------------|
| `date` | `+format` | Current date and time |
| `df` | `-h` | Filesystem disk space |
| `du [path]` | `-h` `-s` | Estimate file space |
| `free` | `-h` `-m` `-g` | Memory usage (real host data) |
| `groups [user]` | | Group memberships |
| `hostname` | | Print hostname |
| `htop` | | System monitor (mock) |
| `id [user]` | | User identity (uid/gid/groups) |
| `dmesg` | `-n` | Print kernel ring buffer messages |
| `ip <object>` | `addr` `route` `link` `neigh` | Modern network interface/routing tool |
| `kill [-9] <pid>` | | Send signal (mock) |
| `last [user]` | | Show login history |
| `lsb_release` | `-a` `-i` `-d` `-r` `-c` | Distribution info |
| `neofetch` | | System info (real package count and uptime) |
| `node` | `--version` `-e` `-p` | Virtual JS runtime; **requires `apt install nodejs`** |
| `npm` | `--version` `list` `version` | Node.js package manager (install/run stubbed); **requires `apt install npm`** |
| `npx` | `--version` | Node.js package runner (stubbed); **requires `apt install npm`** |
| `ping [-c <n>] <host>` | | ICMP ECHO_REQUEST (mock) |
| `ps` | `-a` `-u` `-x` `aux` | Process status |
| `python3` | `--version` `-c` `-V` | Virtual Python 3 interpreter; alias `python`; **requires `apt install python3`** |
| `sleep <seconds>` | | Delay execution |
| `uname` | `-a` `-r` `-m` | System information |
| `bc` | | Arithmetic calculator (integer; `+` `-` `*` `/` `%` `**` `()`) |
| `lsof` | `-i` | List open files (simulated) |
| `strace <cmd>` | `-e` `-o` | Trace system calls (stub with realistic output) |
| `uptime` | `-p` `-s` | Running time |
| `w` | | Who is logged on and what they are doing |
| `who` | | Active sessions |
| `whoami` | | Current user |

### Network

| Command | Flags | Description |
|---------|-------|-------------|
| `curl <url>` | `-o` `-X` `-d` `-H` `-s` `-I` `-L` `-v` | HTTP client (pure `fetch()`) |
| `wget <url>` | `-O` `-P` `-q` | File downloader (pure `fetch()`) |

### Shell & Scripting

| Command | Flags | Description |
|---------|-------|-------------|
| `alias [name=value]` | | Define or display aliases |
| `clear` | | Clear terminal screen |
| `declare [name=value]` | `-i` `-r` `-x` | Declare variables; aliases `local`, `typeset` |
| `echo <text>` | `-n` `-e` | Display text; `-e` interprets `\n` `\t` `\r` `\\` |
| `env` | | Print session environment |
| `exit [code]` | | Exit session |
| `export NAME=VALUE` | | Set shell variable |
| `false` | | Return exit code 1 |
| `help [command]` | | List commands or show command usage |
| `history [n]` | | Command history |
| `jobs` | | List active jobs |
| `bg [%n]` | | Resume job in background |
| `fg [%n]` | | Resume job in foreground |
| `man <command>` | | Command reference manual |
| `printf <fmt> [args...]` | | Format and print (`%s` `%d` `%f` `%x` `\n` `\t`) |
| `read [-r] <var...>` | `-r` `-p` | Read stdin into variable(s) |
| `return [n]` | | Return from shell function |
| `set [VAR=val]` | `-e` `-x` `+e` `+x` | Display or set shell variables; `-e` exit on error, `-x` trace execution |
| `sh` | `-c <script>` `[file]` | Execute shell script — `if`/`for`/`while`/`until`/`case`/functions, arrays `arr=(a b c)`, `$((expr))`, single-quote-safe |
| `perl` | `-e` `-p` `-n` | One-liner interpreter (`print`/`say`, `s///`, `-p`/`-n` loop) |
| `shift [n]` | | Shift positional parameters |
| `source <file>` | | Execute file in current env; alias `.` |
| `test <expr>` / `[ <expr> ]` | | POSIX conditional: `-f` `-d` `-e` `-z` `-n` `-x` `-s` `=` `!=` `-eq` `-lt` `-gt` `-le` `-ge` `!` `-a` `-o` |
| `trap [action] [signal]` | | Signal handlers; supports `EXIT` |
| `stty` | `-a` `size` | Print/change terminal line settings |
| `tput <cap>` | `cols` `lines` `setaf` `bold` `sgr0` | Query terminfo / output terminal escape sequences |
| `true` | | Return exit code 0 |
| `type <command>` | | Describe command interpretation |
| `unalias <name>` | `-a` | Remove aliases |
| `unset <VAR>` | | Remove shell variable |
| `which <command>` | | Locate command in `$PATH` |

### Misc & Fun

| Command | Flags | Description |
|---------|-------|-------------|
| `cmatrix` | | Matrix-style falling characters |
| `cowsay [msg]` | | ASCII cow saying something |
| `cowthink [msg]` | | ASCII cow thinking |
| `fortune` | | Print a random adage |
| `sl` | | Steam locomotive (cure for mistyping `ls`) |
| `yes [string]` | | Repeatedly output string until killed |

### Package Management

| Command | Flags | Description |
|---------|-------|-------------|
| `apt <cmd> [pkg...]` | | `install`, `remove`, `purge`, `update`, `upgrade`, `search`, `show`, `list` |
| `apt-get` | | Alias for `apt` |
| `apt-cache <cmd>` | | `search`, `show`, `policy` |
| `dpkg` | `-l` `-s` `-L` `-r` `-P` | Low-level package tool |
| `dpkg-query` | `-W` `-l` | Show installed package info |

### Users & Permissions

| Command | Flags | Description |
|---------|-------|-------------|
| `adduser <name> <pass>` | | Create user (root only) |
| `deluser <name>` | | Delete user (root only) |
| `passwd [user]` | | Change password |
| `su [user]` | | Switch user |
| `sudo <cmd>` | `-i` | Run as root |

**ℹ️ All 118 built-in commands include complete JSDoc documentation** with `@category` and `@params` tags. See [src/commands/](https://github.com/itsrealfortune/typescript-virtual-container/tree/main/src/commands) for source code and inline documentation.

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
echo "Hello $NAME"           # Hello world
echo "${NAME:-fallback}"     # world (or fallback if unset)
echo "${UNSET:-default}"     # default
echo "${NAME:+alternate}"    # alternate (only if NAME is set)
echo "${UNSET:=assigned}"    # assigns and returns "assigned"
echo "${#NAME}"              # 5 (string length)
echo "${NAME:2}"             # rld (substring from offset 2)
echo "${NAME:1:3}"           # orl (substring offset 1, length 3)
echo "${NAME/o/0}"           # w0rld (replace first)
echo "${NAME//l/L}"          # worLd  (replace all)
echo "${PATH##*/}"           # strip longest prefix match
echo "${FILE%.txt}"          # strip shortest suffix match
echo "$?"                    # last exit code
echo "$RANDOM"               # random integer 0–32767
echo "$LINENO"               # current line number
echo ~                       # /home/<user> (tilde expansion)

# Arrays
arr=(alpha beta gamma)
echo "${arr[0]}"             # alpha
echo "${arr[@]}"             # alpha beta gamma
echo "${#arr[@]}"            # 3
```

> **Single-quote isolation** — `$VAR` and `$((...))` are never expanded inside `'...'`.

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

COUNT=5
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

### Line Editing

Interactive shell supports full readline-style key bindings:

| Key | Action |
|-----|--------|
| `←` / `→` | Move cursor left / right |
| `Home` / `Ctrl+A` | Jump to start of line |
| `End` / `Ctrl+E` | Jump to end of line |
| `Ctrl+K` | Kill to end of line |
| `Ctrl+U` | Kill to start of line |
| `Ctrl+W` | Kill word backward |
| `!!` | Expand to last command |

</details>

---

<details>
<summary><strong>Linux Rootfs &amp; VFS PATH Resolution</strong></summary>

### Directory Layout

On every `VirtualShell` init, a realistic Linux hierarchy is bootstrapped idempotently:

```
/
├── bin -> /usr/bin             (symlink, Debian-style)
├── sbin -> /usr/sbin           (symlink, Debian-style)
├── lib/                        (ELF stub)
│   ├── modules/
│   └── x86_64-linux-gnu/
├── lib64/
│   └── ld-linux-x86-64.so.2   (stub, 0o755)
├── initrd.img -> /boot/initrd.img-<kernel>
├── initrd.img.old -> /boot/initrd.img-<kernel>
├── vmlinuz -> /boot/vmlinuz-<kernel>
├── vmlinuz.old -> /boot/vmlinuz-<kernel>
├── lost+found/                 (mode 0o700, ext4 fsck dir)
│
├── boot/
│   ├── grub/
│   │   └── grub.cfg            virtual bootloader config
│   ├── vmlinuz-<kernel>        kernel stub
│   ├── initrd.img-<kernel>     initrd stub
│   ├── System.map-<kernel>
│   └── config-<kernel>
│
├── dev/
│   ├── null / zero / full      (0o666)
│   ├── random / urandom        (0o444)
│   ├── mem                     (0o640)
│   ├── console / tty / tty0 / tty1 / ttyS0
│   ├── sda / sda1 / sda2       block device stubs
│   ├── loop0-loop7 + loop-control
│   ├── stdin / stdout / stderr
│   ├── pts/
│   └── shm/
│
├── etc/
│   ├── apt/
│   │   ├── sources.list
│   │   ├── sources.list.d/
│   │   ├── trusted.gpg.d/
│   │   ├── keyrings/
│   │   └── apt.conf.d/70debconf
│   ├── cron.d/ + cron.daily/ + cron.hourly/ + cron.weekly/ + cron.monthly/
│   ├── default/locale
│   ├── init.d/
│   ├── ld.so.conf + ld.so.conf.d/x86_64-linux-gnu.conf + fakeroot.conf
│   ├── netplan/01-netcfg.yaml
│   ├── network/interfaces      lo + eth0 (DHCP)
│   ├── pam.d/                  common-auth|account|password|session · sshd · login · sudo
│   ├── security/limits.conf + access.conf
│   ├── sudoers (0o440) + sudoers.d/README
│   ├── systemd/system/ + systemd/network/ + systemd/system.conf
│   ├── debian_version          nyx/stable
│   ├── fstab                   UUID stubs + tmpfs entries
│   ├── group                   synced from VirtualUserManager
│   ├── hostname
│   ├── hosts                   127.0.0.1 + ::1 + VM hostname
│   ├── issue + issue.net        login banner
│   ├── locale.conf + locale.gen LANG=en_US.UTF-8
│   ├── localtime / timezone    UTC
│   ├── login.defs              UID_MIN=1000 SHA512
│   ├── lsb-release             Fortune GNU/Linux + ShellProperties
│   ├── motd                    uses ShellProperties
│   ├── nsswitch.conf
│   ├── os-release              NAME="Fortune GNU/Linux" + ShellProperties
│   ├── passwd                  synced from VirtualUserManager
│   ├── profile                 PATH + PS1 defaults
│   ├── resolv.conf             1.1.1.1 + 8.8.8.8
│   ├── shadow                  (mode 0o640, fake hashes)
│   └── shells                  /bin/sh /bin/bash /usr/bin/bash
│
├── home/
│   └── <user>/
│       └── README.txt          created on first login
├── media/
├── mnt/
├── opt/
│   └── rclone/
├── srv/
│
├── proc/                       kernel simulation engine (refreshed on demand)
│   ├── boot/log + version      kernel boot sequence
│   ├── net/dev + if_inet6 + tcp + tcp6
│   ├── sys/kernel/             hostname, ostype, osrelease, pid_max,
│   │                           threads-max, randomize_va_space, dmesg_restrict
│   ├── sys/net/ipv4/ip_forward
│   ├── sys/vm/swappiness + overcommit_memory
│   ├── self/mounts             mirrors most recent session's /proc/<pid>/
│   ├── 1/                      init (cmdline, comm, stat, status, environ, fd/, fdinfo/)
│   ├── <pid>/                  one subtree per active session (TTY-derived PID)
│   ├── cmdline                 kernel boot args
│   ├── cpuinfo                 real host CPU passthrough
│   ├── filesystems
│   ├── hostname
│   ├── loadavg                 computed dynamically
│   ├── meminfo                 real host memory (Total/Free/Available/Buffers/Cached/Swap)
│   ├── mounts
│   ├── partitions
│   ├── swaps
│   ├── uptime                  computed from shellStartTime
│   └── version                 Linux <kernel> (fortune@build)
│
├── root/                       (mode 0o700)
│   ├── .ssh/                   (mode 0o700)
│   ├── .config/pip/pip.conf    break-system-packages = true
│   ├── .local/share/
│   ├── .bash_logout
│   ├── .bashrc                 colored PS1, PATH, ll/la/l aliases
│   └── .profile
│
├── run/                        (systemd tmpfs runtime)
│   ├── lock/
│   ├── systemd/
│   ├── user/
│   └── utmp
│
├── sys/                        sysfs graph — deterministic, seeded from hostname (fnv1a)
│   ├── class/net/
│   ├── devices/virtual/dmi/id/
│   │   ├── bios_vendor / bios_version / bios_date
│   │   ├── sys_vendor / product_name / product_family / product_version
│   │   ├── product_uuid / product_serial
│   │   ├── chassis_type / chassis_vendor / chassis_version
│   │   ├── board_name
│   │   └── modalias
│   └── kernel/
│       ├── hostname
│       ├── osrelease
│       └── ostype
│
├── tmp/                        (mode 0o1777, sticky)
│   └── node-compile-cache/
│
├── usr/
│   ├── bin/                    stubs for all built-in commands (exec builtin <name>)
│   ├── sbin/
│   ├── lib/
│   │   ├── x86_64-linux-gnu/
│   │   ├── python3/dist-packages/
│   │   ├── python3.12/
│   │   └── jvm/java-21-openjdk-amd64/
│   ├── local/bin|lib|share|include|sbin/
│   └── share/
│       ├── doc/
│       ├── man/man1|man5|man8/
│       ├── ca-certificates/
│       ├── common-licenses/
│       └── zoneinfo/
│
└── var/
    ├── cache/
    │   ├── apt/archives/partial/
    │   ├── debconf/
    │   ├── fontconfig/
    │   ├── ldconfig/
    │   └── PackageKit/
    ├── lib/
    │   ├── apt/lists/partial/
    │   ├── dpkg/
    │   │   ├── info/
    │   │   ├── updates/
    │   │   ├── alternatives/
    │   │   ├── available
    │   │   └── status          managed by VirtualPackageManager
    │   ├── misc/
    │   └── systemd/
    ├── log/
    │   ├── apt/history.log + term.log
    │   ├── auth.log
    │   ├── dpkg.log
    │   ├── journal/
    │   ├── kern.log
    │   ├── private/
    │   └── syslog
    ├── run -> /run              (legacy symlink)
    ├── spool/cron/
    └── tmp/
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

**Does the shell support `&&`, `||`, and `;`?**
Yes — plus pipes, redirections, `if`/`for`/`while`/`case`, and function definitions.

**Can I use this for honeypot deployments?**
Yes — use `HoneyPot.attach()` to capture all activity, configure `maxAuthAttempts` to throttle scanners, export on shutdown.

**Is SFTP fully supported?**
Core operations are implemented. Extended attributes and symlinks return `OP_UNSUPPORTED`.

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

<details>
<summary>Completed</summary>

- [x] Custom command plugin API · per-user quotas · SSH public-key auth · per-IP rate limiting
- [x] Pure in-memory VFS · symlinks · binary snapshot format (VFSB, ~27% smaller than JSON+base64)
- [x] Linux rootfs on boot — `/etc`, `/proc`, `/sys`, `/dev`, `/usr`, `/var`
- [x] Virtual package manager — `apt`/`dpkg`, 25 packages, VFS file writes
- [x] 118 built-in commands across 11 categories (added `zip`, `unzip`, `bzip2`, `bunzip2`, `lsof`, `strace`, `perl`, `w`, `ip`, `dmesg`, `last`, `basename`, `dirname`, `file`, `tput`, `stty`, `yes`, `fortune`, `cowsay`, `cowthink`, `cmatrix`, `sl`, `bc`, `jobs`, `bg`, `fg`)
- [x] Real shell interpreter — `if`/`for`/`while`/`until`/`case`/functions, arrays `arr=(...)`, `$(cmd)`, `$((expr))`, `${#VAR}`, `${var#pfx}` `${var##pfx}` `${var%sfx}` `${var%%sfx}` `${var/p/r}` `${var//p/r}` `${var:off:len}` `${arr[@]}`, `{a,b,c}` brace expansion, `{1..N}` ranges, `*.glob` expansion, `!!` history expansion, `\` line continuation, `2>/dev/null` stderr redirect, `2>&1`, `(( x++ ))`, heredoc `<< EOF`, `set -e`/`set -x`, `$RANDOM`/`$LINENO`
- [x] `curl`/`wget` as pure `fetch()` · VFS PATH resolution · `/sbin` root-only
- [x] `/proc/self` and `/proc/<pid>` per-session entries
- [x] Snapshot diff tooling — `diffSnapshots`, `formatDiff`, `assertDiff`
- [x] `node`/`python3`/`npm`/`npx` — package-gated virtual REPL stubs
<!-- BUILD:changelog -->
- [x] Web shell bundles (`fortune-nyx-v1.5.6-web.min.js`) — fully browser-native with IndexedDB VFS
- [x] Self-standalone CLI (`fortune-nyx-v1.5.6-directbash-k6.1.0.mjs`) — single-file interactive shell, per-user history, tab completion
<!-- /BUILD:changelog -->
- [x] 120+ `man` pages — all built-in commands documented via `man <cmd>`
- [x] Shared `tokenize.ts` — unified tokenizer for shell parser and runtime (eliminates duplication)
- [x] Full readline line editing — `Ctrl+A/E/K/U/W`, `Home`/`End`, `!!` history expansion, `/etc/environment` + `~/.profile` login sourcing
- [x] Interoperable archive formats — `tar` writes real POSIX ustar binary; `zip`/`unzip` use PKZIP+DEFLATE (fflate); files extracted by real system tools via SFTP
- [x] Overhauled `sed` — `d`/`p`/`=`/`q`, `-n` suppress, line/regex/range/`$` addresses; overhauled `awk` — `-v`, field assignment, `gsub`/`sub`/`substr`/`split`/`length`/`printf`/`next`; overhauled `find` — `-exec`, `-maxdepth`, `-iname`, `-not`/`!`, `-o`/`-a`, `-empty`, `-size`
- [x] `PasswordChallenge` type — generic interactive password flow for `adduser`, `passwd`, `deluser`
- [x] `VirtualFileSystem.mount(vPath, hostPath, { readOnly })` — bind-mount host directories into the VM; read-only by default; browser-safe (silent no-op)

</details>