---
title: Architecture
group: Guides
---

# Architecture — typescript-virtual-container v1.7.5

**Repository**: `github.com/itsrealfortune/typescript-virtual-container`
**Package**: `typescript-virtual-container` — Scalable Linux emulator with SSH/SFTP server, virtual filesystem, and typed programmatic API for testing, automation, and interactive shell scripting in TypeScript/JavaScript.
**License**: MIT
**Runtime**: Node.js / Bun (TypeScript 6.x + esbuild)

~41K source lines across 200 `.ts` files.

---

## Overview

The system is organized in clear, layered architecture:

```
Storage (VFS) → Auth (UserManager) → Software (PackageManager)
→ Interaction (Shell) → Transport (SSH) → Observability (Honeypot)
                                                      ↓
                               ┌──────────────────────┘
                               ▼
                        Virtual Network
                   ┌──────────────────────┐
                   │  VirtualSwitch       │
                   │  - subnet, ARP, NAT  │
                   │  - DNS, traffic      │
                   │    shaping, LB       │
                   ├──────────────────────┤
                   │  VirtualProxy        │
                   │  - port forwarding   │
                   │  - SOCKS5 proxy      │
                   ├──────────────────────┤
                   │  VirtualVpn          │
                   │  - encrypted tunnel  │
                   │    between Baies     │
                   └──────────────────────┘
                        Baie orchestrator


---

<details>
<summary>1. Source Structure — 200 files, 41,289 lines</summary>

**Total source files**: 200 `.ts` files
**Total source lines**: 41,289

### Directory tree

```
src/
├── index.ts                          — Main barrel export
├── standalone.ts                     — CLI standalone entry point
├── self-standalone.ts                — Self-contained build entry
├── bun.d.ts                          — Bun type declarations
│
├── commands/                         (136 .ts files + manuals/)
│   ├── registry.ts                   — Command registration/imports
│   ├── runtime.ts                    — Command execution engine
│   ├── command-helpers.ts            — Argument parsing utilities
│   ├── helpers.ts                    — Generic helpers
│   ├── manuals-bundle.ts             — Bundled man pages
│   └── 130+ individual command files
│
├── types/                            (5 .ts files)
│   ├── vfs.ts                        — VFS snapshot/node types
│   ├── commands.ts                   — CommandContext, ShellModule, etc.
│   ├── pipeline.ts                   — Pipeline/Statement AST
│   ├── streams.ts                    — ExecStream, ShellStream
│   └── tar-stream.d.ts
│
├── utils/                            (8 .ts files)
│   ├── expand.ts                     — Shell variable expansion
│   ├── tokenize.ts                   — Command tokenizer
│   ├── argv.ts                       — CLI argument helpers
│   ├── glob.ts                       — Glob pattern matching
│   ├── keyToBytes.ts                 — Key conversion utility
│   ├── perfLogger.ts                 — Performance logging
│   ├── shellSession.ts               — Session state helpers
│   └── vfsDiff.ts                    — VFS diff utility
│
└── modules/                          (all core subsystems)
    ├── VirtualFileSystem/            (8 .ts files)
    │   ├── index.ts                  — Main VFS class
    │   ├── internalTypes.ts          — Internal node types
    │   ├── path.ts                   — Path normalization
    │   ├── binaryPack.ts             — Binary snapshot format
    │   ├── permissions.ts            — POSIX permission enforcement
    │   ├── journal.ts                — Write-ahead log
    │   ├── fileCache.ts              — Disk I/O simulation cache
    │   └── swapStore.ts              — Swap file store for eviction
    │
    ├── VirtualShell/                 (4 .ts files)
    │   ├── index.ts                  — VirtualShell class
    │   ├── shell.ts                  — Interactive shell loop
    │   ├── shellParser.ts            — Shell syntax parser
    │   └── idleManager.ts            — Idle session management
    │
    ├── VirtualUserManager/           (4 .ts files)
    │   ├── index.ts                  — User management
    │   ├── groups.ts                 — /etc/group management
    │   ├── signals.ts                — POSIX signal definitions
    │   └── processScheduler.ts       — CPU scheduler (CFS-inspired)
    │
    ├── VirtualPackageManager/        (1 .ts file)
    │   └── index.ts                  — Package management
    │
    ├── SSHMimic/                     (9 .ts files)
    │   ├── index.ts                  — SSH server facade
    │   ├── executor.ts               — Statement executor
    │   ├── exec.ts                   — Non-interactive exec handler
    │   ├── scp.ts                    — SCP protocol handler
    │   ├── sftp.ts                   — SFTP protocol handler
    │   ├── hostKey.ts                — SSH host key management
    │   ├── prompt.ts                 — Shell prompt formatting
    │   ├── loginBanner.ts            — SSH login banner
    │   └── loginFormat.ts            — Login format strings
    │
    ├── SSHClient/                    (1 .ts file)
    │   └── index.ts                  — Programmatic command client
    │
    ├── Honeypot/                     (1 .ts file)
    │   └── index.ts                  — Security auditing/telemetry
    │
    ├── VirtualNetworkManager/        (2 .ts files)
    │   ├── index.ts                  — Networking stack
    │   └── types.ts                  — Network type definitions
    │
    ├── VirtualSwitch/                (3 .ts files)
    │   ├── index.ts                  — Multi-VM switch
    │   ├── helpers.ts                — Switch utilities
    │   └── types.ts                  — Switch type definitions
    │
    ├── VirtualVpn/                   (2 .ts files)
    │   ├── index.ts                  — Encrypted tunnel between Baies
    │   └── crypto.ts                 — Crypto helpers for VPN
    │
    ├── linuxRootfs.ts                — Linux root FS bootstrap
    ├── nanoEditor.ts                 — Built-in nano editor
    ├── desktopManager.ts             — XFCE desktop simulation
    ├── neofetch.ts                   — Neofetch display
    ├── pacmanGame.ts                 — Built-in Pac-Man game
    ├── VirtualProxy.ts               — Port forwarding + SOCKS5
    ├── sysctl.ts                     — Writable /proc/sys state
    ├── sessionManager.ts             — Shell session management
    ├── shellInteractive.ts           — Shell interaction module
    ├── shellRuntime.ts               — Shell runtime helpers
    ├── thunarManager.ts              — Thunar file manager simulation
    └── webTermRenderer.ts            — Web terminal renderer
```

</details>

---

<details>
<summary>2. Commands — 136 files, ~173 built-in commands</summary>

**Total command modules**: 136 `.ts` files (including index, registry, runtime, helpers, manuals-bundle), yielding ~173 distinct built-in commands.

### Command categories

| Category | Examples |
|---|---|
| **File Operations** | `cat`, `cp`, `mv`, `rm`, `touch`, `ls`, `ln`, `tree`, `mkdir`, `dd`, `head`, `tail`, `wc`, `stat`, `du`, `df`, `file`, `tee` |
| **Text Processing** | `grep`, `sed`, `awk`, `tr`, `sort`, `uniq`, `cut`, `paste`, `diff`, `join`, `nl`, `tac`, `fmt`, `fold`, `split`, `comm`, `csplit`, `expand`, `strings` |
| **User/Group Admin** | `adduser`, `deluser`, `passwd`, `groups`, `id`, `who`, `whoami`, `w`, `last`, `su`, `sudo`, `chown`, `chgrp`, `chmod` |
| **Process Management** | `ps`, `top`, `htop`, `kill`, `nice`, `nohup`, `jobs`, `lsof`, `pgrep`, `pkill`, `timeout`, `wait`, `swap` |
| **Package Management** | `apt`, `apt-cache`, `dpkg`, `dpkg-query`, `pacman` |
| **Network** | `ping`, `ip`, `curl`, `wget`, `netcat`, `ssh`, `ifconfig`, `hostname`, `iptables`, `tc`, `ss`, `traceroute`, `conntrack` |
| **Archiving/Compression** | `tar`, `gzip`, `gunzip`, `bzip2`, `bunzip2`, `zip`, `unzip` |
| **Shell Built-ins** | `cd`, `pwd`, `echo`, `printf`, `export`, `unset`, `set`, `env`, `source`, `shift`, `declare`, `type`, `alias`, `unalias`, `read`, `exit`, `return`, `true`, `false`, `test`, `exec`, `trap` |
| **System Info** | `uname`, `neofetch`, `lsb-release`, `uptime`, `free`, `dmesg`, `sysinfo`, `hostname`, `lscpu`, `lspci`, `lsusb`, `nproc` |
| **Fun** | `cowsay`, `cowthink`, `fortune`, `sl`, `cmatrix`, `yes` |
| **Programming Langs** | `python3`, `node`, `npm`, `npx`, `perl`, `bc` |
| **Development** | `diff`, `find`, `xargs`, `basename`, `dirname`, `realpath`, `readlink`, `mktemp`, `md5sum`, `sha256sum` |
| **Desktop/UI** | `startxfce4`, `mousepad`, `xfceDesktop`, `nano` |
| **Other** | `help`, `man`, `history`, `clear`, `tput`, `stty`, `seq`, `sh`, `sleep`, `strace`, `expr`, `base64` |

### Command implementation pattern

- Each command file exports a `ShellModule` object with: `name`, `params`, `run(ctx: CommandContext) => CommandResult`, optional `aliases`, `description`, `category`.
- Commands are registered centrally in `src/commands/registry.ts` via `import` + `registerCommand()` calls.
- The registry accumulates all ~173 commands and exports them as a unified map.

</details>

---

<details>
<summary>3. Types — 5 files</summary>

| File | Lines | Key Types Exported |
|---|---|---|
| `vfs.ts` | 195 | `VfsNodeType`, `VfsBaseNode`, `VfsFileNode`, `VfsDirectoryNode`, `VfsDeviceNode`, `VfsNodeStats`, `WriteFileOptions`, `RemoveOptions`, `VfsSnapshot*`, `MountOptions`, `MountPoint`, `VfsCacheOptions`, `VfsCacheStats`, `VfsCacheEvictionPolicy`, `VfsDiskIoParams` |
| `commands.ts` | 152 | `CommandMode`, `CommandResult`, `SudoChallenge`, `PasswordChallenge`, `NanoEditorSession`, `ShellEnv`, `CommandContext`, `ShellModule`, `CommandOutcome` |
| `pipeline.ts` | 54 | `PipelineCommand`, `Pipeline`, `Statement`, `Script`, `LogicalOp` |
| `streams.ts` | 32 | `ExecStream`, `ShellStream` |
| `tar-stream.d.ts` | — | Third-party type augmentation for tar-stream |

</details>

---

<details>
<summary>4. VirtualFileSystem — 8 files, ~2,652 lines</summary>

**Files** (8): `index.ts` (2,270), `internalTypes.ts` (78), `path.ts` (104), `binaryPack.ts` (315), `journal.ts` (181), `permissions.ts` (231), `fileCache.ts` (340), `swapStore.ts` (180) — **~2,652 lines total**

### Architecture

- **Purpose**: In-memory POSIX-like virtual filesystem hosting a recursive tree of `InternalNode` objects.
- **Persistence**: Two modes — `"memory"` (default, no disk I/O) and `"fs"` (mirrors to host filesystem with JSON/binary snapshots).
- **Internal nodes**: Uses three node types for performance:
  - `InternalFileNode` — real file with `Buffer` content
  - `InternalStubNode` — lazy stubs for static rootfs content (no Buffer allocation until first write)
  - `InternalDirectoryNode` — directories with null-prototype `children` objects (avoids Map overhead, ~40% less RAM)
- **Snapshot format** (`binaryPack.ts`): Custom binary serialization (magic bytes `VFS!`, versioned) — ~27% smaller than JSON+base64, no string parsing overhead.
- **Write-ahead log** (`journal.ts`): Binary journal with opcodes (WRITE=0x01, MKDIR=0x02, REMOVE=0x03, CHMOD=0x04, MOVE=0x05, SYMLINK=0x06). Used in `"fs"` mode for crash recovery.
- **File eviction**: In `"fs"` mode, files >64KB (configurable) are evicted from RAM after flush and reloaded on demand.
- **Swap store** (`swapStore.ts`): Individual swap files for evicted content — O(1) reload instead of full snapshot parsing.
- **File cache** (`fileCache.ts`): Realistic disk I/O simulation with configurable latency (SSD/HDD/NVMe presets), priority-weighted timeslices, and LRU/LFU/FIFO eviction policies.
- **Path utilities** (`path.ts`): Normalization via `path.posix.normalize()`, tree traversal with `getNode()`, parent directory lookup.
- **Mount points**: Supports host directory mounts with configurable read-only mode.

### Key public API

`writeFile`, `readFile`, `mkdir`, `exists`, `stat`, `list`, `remove`, `chmod`, `symlink`, `toSnapshot`, `fromSnapshot`, `importSnapshot`, `mount`, `unmount`, `flushMirror`, `restoreMirror`.

</details>

---

<details>
<summary>5. VirtualShell — 4 files</summary>

**Files** (4): `index.ts` (661 lines), `shell.ts` (794 lines), `shellParser.ts` (299 lines), `idleManager.ts` (320 lines)

- **`index.ts`** — Main `VirtualShell` class (EventEmitter). Orchestrates VFS, UserManager, PackageManager, and the command runtime. Constructor accepts hostname, `ShellProperties` (kernel, OS, arch), and `VfsOptions`. Exposes `exec()`, `addCommand()`, `getVfs()`, `getUsers()`, `getHostname()`.
- **`shell.ts`** — The interactive shell loop. Handles prompt display, input reading, command execution dispatch, user switching, sudo challenge flow, and idle detection.
- **`shellParser.ts`** — Parses shell input into a typed AST (`Script` → `Statement` → `Pipeline` → `PipelineCommand`). Handles pipes, redirections, logical operators (`&&`, `||`, `;`), backgrounding (`&`), and command grouping.
- **`idleManager.ts`** — Tracks session idle time, emits freeze/thaw events for honeypot integration, supports configurable timeout.

</details>

---

<details>
<summary>6. SSHMimic — 9 files, ~2,900 lines</summary>

**Files** (9): `index.ts` (356), `executor.ts` (293), `exec.ts`, `scp.ts` (375), `sftp.ts` (931), `hostKey.ts`, `prompt.ts`, `loginBanner.ts`, `loginFormat.ts` — **~2,900 lines total**

- **`index.ts`** — `SshMimic` class (exported as `VirtualSshServer`). Wraps the `ssh2` `Server`. Features: password auth, public-key auth, per-IP rate limiting/lockout, interactive shell sessions, non-interactive exec sessions. Emits `connection`, `error`, `close` events.
- **`executor.ts`** — `executeStatements()` — takes parsed AST from shellParser, resolves commands, handles pipes (`|`), redirects (`>`, `>>`, `<`, `2>`, `2>&1`), and logical operators.
- **`scp.ts`** — SCP protocol handler using the virtual filesystem.
- **`sftp.ts`** — Full SFTP subsystem handler (exported as `VirtualSftpServer`). Supports read/write/stat/list/mkdir/remove/rename/symlink operations over an `sftp-stream` wrapper module.
- **`hostKey.ts`** — Loads or creates SSH host keys (RSA/Ed25519) from the filesystem.
- **`prompt.ts`** — Formats the interactive shell prompt (PS1 with user@hostname:cwd$).
- **`loginBanner.ts`** — Generates SSH pre-auth banner.
- **`loginFormat.ts`** — Last-login style messages.

</details>

---

<details>
<summary>7. SSHClient — 1 file, 270 lines</summary>

**1 file**, `index.ts` (270 lines)

- `SshClient` class — Programmatic client for executing commands without SSH transport overhead.
- Maintains working directory state across invocations.
- Methods: `exec(command)`, `cd(path)`, `ls(path)`, `getCwd()`, `getHome()`.
- Binds to a `VirtualShell` instance and a username.

</details>

---

<details>
<summary>8. Honeypot — 1 file, 543 lines</summary>

**1 file**, `index.ts` (543 lines)

- `HoneyPot` class — Security auditing and telemetry module.
- Attaches listeners to `VirtualShell`, `VirtualFileSystem`, `VirtualUserManager`, `SshMimic`, and `SftpMimic`.
- Tracks 20+ metrics: auth attempts/successes/failures/lockouts, commands run, file reads/writes, session starts/ends, users created/deleted, mounts/unmounts, symlinks, snapshots.
- Exports `AuditLogEntry` and `HoneyPotStats` types.
- Provides `getAuditLog()`, `getStats()`, `clearLog()`, `toJSON()`.
- Designed for forensic analysis and anomaly detection.

</details>

---

<details>
<summary>9. VirtualUserManager — 4 files, ~2,400 lines</summary>

**Files** (4): `index.ts` (1,891), `groups.ts` (120), `signals.ts` (63), `processScheduler.ts` (340) — **~2,400 lines total**

- `VirtualUserManager` class (EventEmitter) — Complete virtual user management system.
- User records with: `username`, `uid`, `gid`, `salt`, `passwordHash` (scrypt-derived).
- Methods: `addUser`, `removeUser`, `authenticate`, `changePassword`, `getUser`, `userExists`, `listUsers`.
- Password hashing via `crypto.scryptSync` with per-user random salts; constant-time comparison via `timingSafeEqual`.
- Session tracking: `createSession`, `closeSession`, `getSessions`, and `VirtualActiveSession` interface with UUID, TTY, remote address.
- Process tracking: `registerProcess`, `unregisterProcess`, `killProcess`, `listProcesses` with PID, command, TTY, nice value, priority.
- **Process scheduler** (`processScheduler.ts`): Priority-based round-robin scheduling with Linux-compatible nice values (-20 to 19), CFS-inspired weight-based timeslices, fair-share CPU enforcement, and configurable accounting windows.
- Syncs `/etc/passwd`, `/etc/group`, `/etc/shadow` via callbacks.

</details>

---

<details>
<summary>10. VirtualPackageManager — 1 file, 1,045 lines</summary>

**1 file**, `index.ts` (1,045 lines)

- `VirtualPackageManager` class — APT/Dpkg-compatible package management.
- `PackageDefinition` interface: `name`, `version`, `architecture`, `maintainer`, `description`, `shortDesc`, `installedSizeKb`, `depends`, `section`, `files[]`, `onInstall`/`onRemove` hooks.
- `PackageFile` interface: `path`, `content`, `mode`.
- `InstalledPackage` runtime record tracked in `/var/lib/dpkg/status`.
- Methods: `install(name)`, `remove(name)`, `isInstalled(name)`, `getInstalledPackages()`, `getRegistry()`, `registerPackages()`.
- Built-in registry with ~30+ packages including `vim`, `build-essential`, `python3`, `nodejs`, `git`, `curl`, `htop`, `neofetch`, `gcc`, `make`, etc.
- Recursive dependency resolution with cycle detection.

</details>

---

<details>
<summary>11. Modules — 12 files</summary>

**12 files**:

| File | Lines | Purpose |
|---|---|---|
| `linuxRootfs.ts` | 2,127 | Bootstraps full Linux directory tree (/bin, /usr, /etc, /proc, /sys, /dev, /var, /tmp, /root, /home) with realistic files |
| `nanoEditor.ts` | 1,025 | Built-in nano-like text editor with keybindings, search/replace, syntax highlighting |
| `desktopManager.ts` | 1,209 | XFCE4 desktop environment simulation (windows, panels, menus, wallpapers) |
| `pacmanGame.ts` | 733 | Playable Pac-Man game rendered in terminal |
| `neofetch.ts` | 360 | System info display (logo + hardware/distro info) |
| `webTermRenderer.ts` | 362 | Web-based terminal emulator renderer |
| `VirtualProxy.ts` | 198 | Port forwarding + SOCKS5 proxy |
| `sysctl.ts` | 193 | Writable /proc/sys state |
| `sessionManager.ts` | 80 | Shell session management |
| `shellInteractive.ts` | — | Interactive shell session controller |
| `shellRuntime.ts` | — | Shell runtime helpers |
| `thunarManager.ts` | — | Thunar file manager simulation |

**Subdirectories** (documented separately above):
- `VirtualNetworkManager/` (2 files) — Networking stack
- `VirtualSwitch/` (3 files) — Multi-VM switch with NAT, DNS, traffic shaping, LB
- `VirtualVpn/` (2 files) — Encrypted tunnel between Baies

</details>

---

<details>
<summary>12. Utils — 8 files</summary>

**8 files**:

| File | Lines | Purpose |
|---|---|---|
| `expand.ts` | 664 | Centralized shell variable expansion: tilde, `$?`, `$$`, `$#`, `${VAR}`, `$((arithmetic))`, pattern substitution |
| `tokenize.ts` | — | Shell command tokenizer (splits raw input into tokens respecting quotes, escaping) |
| `argv.ts` | — | CLI argument parser (getFlag, getOption, getOptionInt) |
| `glob.ts` | — | Glob pattern → RegExp conversion for path matching |
| `keyToBytes.ts` | — | SSH key format conversion |
| `perfLogger.ts` | — | Performance logging with mark/measure |
| `shellSession.ts` | — | Session state serialization |
| `vfsDiff.ts` | 275 | VFS snapshot diffing: three-way comparison of two snapshots, produces structured `VfsDiff` with additions/modifications/deletions |

</details>

---

<details>
<summary>13. Tests — 26 test files, 8,229 lines</summary>

**Total test files**: 27 (26 `.test.ts` + 1 `test-helper.ts`)
**Total test lines**: 8,229

### Test files

| File | Lines | Scope |
|---|---|---|
| `new-features.test.ts` | 1,036 | Integration tests for new features |
| `commands-admin-net.test.ts` | 441 | Admin + network commands |
| `commands-core.test.ts` | 562 | Core command tests |
| `commands-missing.test.ts` | 571 | Edge case/missing command tests |
| `commands-advanced.test.ts` | 456 | Advanced command scenarios |
| `commands-text-sys.test.ts` | 445 | Text processing + system commands |
| `commands-specific-units.test.ts` | 327 | Specific command unit tests |
| `sftp.test.ts` | 323 | SFTP protocol handler tests |
| `virtual-switch.test.ts` | ~400 | VirtualSwitch, VPN, proxy tests |
| `network-upgrades.test.ts` | ~300 | Network module tests |
| `caching.test.ts` | ~250 | File cache and eviction tests |
| `scheduler.test.ts` | ~250 | Process scheduler tests |
| `swap.test.ts` | ~170 | Swap store tests |
| `permissions.test.ts` | ~100 | Permission enforcement tests |
| `expand.test.ts` | 170 | Shell variable expansion tests |
| `command-helpers.test.ts` | 116 | Argument parsing tests |
| `helpers.test.ts` | 97 | Generic helper tests |
| `users.test.ts` | 86 | User management tests |
| `idle-manager.test.ts` | ~100 | Idle session management tests |
| `capping.test.ts` | ~100 | Resource cap tests |
| `ssh-client.test.ts` | ~50 | SSH client tests |
| `ssh-exec.test.ts` | 45 | SSH exec session tests |
| `executor.test.ts` | ~30 | Command executor tests |
| `user-upgrades.test.ts` | ~30 | User upgrade path tests |
| `virtual-shell-api.test.ts` | ~30 | VirtualShell API tests |
| `parser-executor.test.ts` | 37 | Shell parser + executor tests |
| `test-helper.ts` | 79 | Shared test utilities/fixtures |

### Testing patterns

- **Test runner**: Bun's built-in test runner (`bun test`)
- **Pattern**: `describe`/`it`/`expect` blocks (Bun-compatible)
- **Naming convention**: `*.test.ts` files, separated by domain
- **Salve execution**: `test-salve` script runs each file sequentially with `--timeout 10000` and interleaved sleep (not parallel)
- **Helper pattern**: Shared `test-helper.ts` for common fixtures/setup
- **Coverage**: Heavy on integration tests running actual commands against a `VirtualShell` instance; lighter on pure unit tests for individual functions.

</details>

---

<details>
<summary>14. Build Output — builds/ + dist/</summary>

### `builds/` (3 artifacts)

| File | Lines | Format | Description |
|---|---|---|---|
| `fortune-nyx-v1.7.5-directbash-k6.1.0.mjs` | 3,882 | ESM | Direct bash bundle (Node.js) |
| `fortune-nyx-v1.7.5-ssh.cjs` | 3,876 | CJS | SSH server bundle |
| `fortune-nyx-v1.7.5-web.min.js` | 35,254 | ESM (minified) | Web browser shell |

### `dist/` (compiled TypeScript output)

**444 files total** (222 `.js` + 222 `.d.ts`). Mirrors the full `src/` structure:

```
dist/
├── index.js + index.d.ts
├── commands/    (210 files — 105 .js + 105 .d.ts)
├── modules/     (14 files — 7 .js + 7 .d.ts)
├── types/       (8 files — 4 .js + 4 .d.ts)
├── utils/       (14 files — 7 .js + 7 .d.ts)
├── VirtualFileSystem/   (10 files)
├── VirtualShell/        (8 files)
├── VirtualPackageManager/ (2 files)
├── VirtualUserManager/  (2 files)
├── SSHMimic/            (18 files)
├── SSHClient/           (2 files)
└── Honeypot/            (2 files)
```

</details>

---

<details>
<summary>15. Docs — 192 HTML files, 13,194 lines</summary>

**Total files**: 216 (192 HTML + 24 non-HTML)
**Total lines**: 13,194
Generated by **TypeDoc** (`typedoc.json` config).

```
docs/
├── index.html                    — Main entry
├── modules.html                  — Module list
├── hierarchy.html               — Class hierarchy
├── app.js                       — Terminal demo app
├── demo.html                    — Demo page
│
├── classes/          (11 HTML) — VirtualFileSystem, VirtualShell, SshClient, etc.
├── interfaces/       (44 HTML) — All public interfaces (VfsNodeStats, CommandContext, etc.)
├── types/            (12 HTML) — Type aliases (VfsNodeType, LogicalOp, etc.)
├── functions/        (8 HTML)  — Utility functions (parseArgs, getArg, assertDiff, etc.)
├── media/            (1 file)  — LICENSE copy
└── assets/           (8 files) — CSS, JS, SVG icons, search index
```

**10 public classes documented**: `HoneyPot`, `IdleManager`, `NanoEditor`, `SshClient`, `VirtualFileSystem`, `VirtualNetworkManager`, `VirtualPackageManager`, `VirtualSftpServer`, `VirtualShell`, `VirtualSshServer`, `VirtualUserManager`

**44 public interfaces** and **12 type aliases** documented.

</details>

---

<details>
<summary>16. Git History — 1,017 commits, 3 contributors</summary>

| Metric | Value |
|---|---|
| **Total commits** | 1,017 |
| **Contributors** | 3 |
| **Primary author** | `itsrealfortune` (873 commits) |
| **Other contributors** | `fox3000foxy` (78), `Fortune` (66) |
| **Latest tag** | `v1.7.5` |
| **Total tags** | 50+ (from `v1.0.0` through `v1.7.5`) |
| **Local branches** | 62 |
| **Remote branches** | 66 (plus `gh-pages`) |
| **Active branch** | `main` |
| **Branch naming convention** | `feat/*`, `fix/*`, `chore/*`, `build/*`, `format/*`, `test/*`, `upgrade/*`, `docs/*` |

</details>

---

<details>
<summary>17. Architectural Observations — 10 key points</summary>

1. **Clean layered architecture**: The system is organized in clear layers — VFS (storage) → UserManager (auth) → PackageManager (software) → Shell (interaction) → SSHMimic/SSHClient (transport) → Honeypot (observability).

2. **Well-defined module contract**: Every command implements the `ShellModule` interface (`{ name, params, run, aliases?, description?, category? }`), making extension trivial.

3. **Performance-conscious design**:
   - Binary serialization (not JSON+base64) for VFS snapshots (~27% smaller)
   - Null-prototype objects instead of Maps for directory children (~40% RAM savings)
   - Lazy stubs (InternalStubNode) avoid Buffer allocation for static files
   - File eviction in FS mode to manage memory
   - Swap store for O(1) reload of evicted files (no full snapshot parsing)
   - File cache with disk I/O simulation (SSD/HDD/NVMe presets) and LRU/LFU/FIFO eviction
   - Write-ahead journaling with configurable flush intervals

4. **Process scheduler**: Priority-based round-robin scheduling with Linux-compatible nice values (-20 to 19), CFS-inspired weight-based timeslices, fair-share CPU enforcement, and configurable accounting windows. Prevents any single process from monopolizing the CPU.

5. **Comprehensive Linux emulation**: The project simulates a Fortune GNU/Linux (Nyx) distribution with Firecracker MicroVM kernel 6.x, realistic /proc, /sys, /dev hierarchy, package manager, user management, and desktop environment.

6. **Dual deployment model**: Can be used programmatically (TypeScript library, `dist/index.js`) or as a standalone SSH server (`standalone.ts`, builds for Node.js and web).

7. **Security features**: Password hashing with scrypt + per-user salt, constant-time comparison, rate limiting, IP lockout, audit logging (Honeypot), SSH public-key auth.

8. **Web compatibility**: Polyfills for Node.js built-ins (`node:fs`, `node:crypto`, `node:child_process`, etc.) enable browser-side execution via esbuild bundling.

9. **Documentation quality**: Full TypeDoc-generated API docs with 192 HTML pages covering all public classes, interfaces, types, and functions.

10. **Testing maturity**: 26 test files, ~8,200 lines, organized by domain. Uses Bun's test runner with sequential execution pattern. 921+ tests across 26 files cover permission enforcement, user provisioning, VFS operations, command-level integration, file caching, process scheduling, swap store, virtual networking, and more.

11. **Permission enforcement**: POSIX permission model implemented in `src/VirtualFileSystem/permissions.ts`. VFS methods (`readFile`, `writeFile`, `remove`, `chmod`, `chown`, `mkdir`, `symlink`) accept optional `uid`/`gid` parameters. When provided, `enforceAccess` checks the permission bits (owner/group/other) with root bypass. `enforcePathTraversal` checks `x` on every parent directory component. `enforceDelete` handles sticky bit semantics. All file commands pass `uid`/`gid` from `CommandContext`.

12. **Modern toolchain**: TypeScript 6.x, esbuild (for bundling), Biome (for formatting/linting), Bun (for testing/running), GH Actions CI (3 workflows).

</details>
