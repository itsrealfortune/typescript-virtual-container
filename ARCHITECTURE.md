# Architecture — typescript-virtual-container v1.6.3

**Repository**: `github.com/itsrealfortune/typescript-virtual-container`
**Package**: `typescript-virtual-container` — Scalable Linux emulator with SSH/SFTP server, virtual filesystem, and typed programmatic API for testing, automation, and interactive shell scripting in TypeScript/JavaScript.
**License**: MIT
**Runtime**: Node.js / Bun (TypeScript 6.x + esbuild)

~32K source lines across 168 `.ts` files.

---

## Overview

The system is organized in clear, layered architecture:

```
Storage (VFS) → Auth (UserManager) → Software (PackageManager)
→ Interaction (Shell) → Transport (SSH) → Observability (Honeypot)
```

---

## 1. Source Structure

**Total source files**: 168 `.ts` files
**Total source lines**: 31,758

### Directory tree

```
src/
├── index.ts                          (86 lines) — Main barrel export
├── stand alone.ts                     (78 lines) — CLI standalone entry point
├── self-standalone.ts                 (674 lines) — Self-contained build entry
├── bun.d.ts                           — Bun type declarations
│
├── commands/                          (120 .ts files + 1 manuals/ subdir)
│   ├── index.ts                       (9 lines) — Re-exports registry + runtime
│   ├── registry.ts                    (387 lines) — Command registration/imports
│   ├── runtime.ts                     (553 lines) — Command execution engine
│   ├── command-helpers.ts             (271 lines) — Argument parsing utilities
│   ├── helpers.ts                     — Generic helpers
│   ├── manuals-bundle.ts              (1968 lines) — Bundled man pages
│   ├── manuals/                       (138 .txt files) — Plain-text man pages
│   └── 112 individual command files   (each exporting a ShellModule)
│
├── types/                             (5 .ts files)
│   ├── vfs.ts                         (106 lines) — VFS snapshot/node types
│   ├── commands.ts                    (152 lines) — CommandContext, ShellModule, etc.
│   ├── pipeline.ts                    (54 lines)  — Pipeline/Statement/Script AST
│   ├── streams.ts                     (32 lines)  — ExecStream, ShellStream
│   └── tar-stream.d.ts                — Third-party type declarations
│
├── VirtualFileSystem/                 (5 .ts files)
│   ├── index.ts                       (1,339 lines) — Main VFS class
│   ├── internalTypes.ts               (49 lines)  — Internal node types
│   ├── path.ts                        (104 lines) — Path normalization
│   ├── binaryPack.ts                  (315 lines) — Binary snapshot format
│   └── journal.ts                     (181 lines) — Write-ahead log
│
├── VirtualShell/                      (4 .ts files)
│   ├── index.ts                       (486 lines) — VirtualShell class
│   ├── shell.ts                       (784 lines) — Interactive shell loop
│   ├── shellParser.ts                 (299 lines) — Shell syntax parser
│   └── idleManager.ts                 — Idle session management
│
├── VirtualUserManager/                (1 .ts file)
│   └── index.ts                       (853 lines)
│
├── VirtualPackageManager/             (1 .ts file)
│   └── index.ts                       (1,027 lines)
│
├── SSHMimic/                          (9 .ts files)
│   ├── index.ts                       (356 lines) — SSH server facade
│   ├── executor.ts                    (293 lines) — Statement executor
│   ├── exec.ts                        — Non-interactive exec handler
│   ├── scp.ts                         (375 lines) — SCP protocol handler
│   ├── sftp.ts                        (888 lines) — SFTP protocol handler
│   ├── hostKey.ts                     — SSH host key management
│   ├── prompt.ts                      — Shell prompt formatting
│   ├── loginBanner.ts                 — SSH login banner
│   └── loginFormat.ts                 — Login format strings
│
├── SSHClient/                         (1 .ts file)
│   └── index.ts                       (270 lines) — Programmatic command client
│
├── Honeypot/                          (1 .ts file)
│   └── index.ts                       (541 lines) — Security auditing/telemetry
│
├── modules/                           (9 .ts files)
│   ├── linuxRootfs.ts                 (2,140 lines) — Linux root FS bootstrap
│   ├── nanoEditor.ts                  (953 lines) — Built-in nano editor
│   ├── desktopManager.ts              (944 lines) — XFCE desktop simulation
│   ├── webTermRenderer.ts             (362 lines) — Web terminal renderer
│   ├── neofetch.ts                    (360 lines) — Neofetch display
│   ├── pacmanGame.ts                  (689 lines) — Built-in Pac-Man game
│   ├── shellInteractive.ts            — Shell interaction module
│   ├── shellRuntime.ts                — Shell runtime module
│   └── VirtualNetworkManager.ts       (256 lines) — Virtual networking stack
│
└── utils/                             (8 .ts files)
    ├── expand.ts                       (664 lines) — Shell variable expansion
    ├── tokenize.ts                     — Command tokenizer
    ├── argv.ts                         — CLI argument helpers
    ├── glob.ts                         — Glob pattern matching
    ├── keyToBytes.ts                   — Key conversion utility
    ├── perfLogger.ts                   — Performance logging
    ├── shellSession.ts                 — Session state helpers
    └── vfsDiff.ts                      (275 lines) — VFS diff utility
```

---

## 2. Commands (`src/commands/`)

**Total command modules**: 120 `.ts` files (including index, registry, runtime, helpers, manuals-bundle), yielding ~112 distinct built-in commands.

### Command categories

| Category | Examples |
|---|---|
| **File Operations** | `cat`, `cp`, `mv`, `rm`, `touch`, `ls`, `ln`, `tree`, `mkdir`, `dd`, `head`, `tail`, `wc`, `stat`, `du`, `df`, `file`, `tee` |
| **Text Processing** | `grep`, `sed`, `awk`, `tr`, `sort`, `uniq`, `cut`, `paste`, `diff`, `join`, `nl`, `tac`, `fmt`, `fold`, `split`, `comm`, `csplit`, `expand`, `strings` |
| **User/Group Admin** | `adduser`, `deluser`, `passwd`, `groups`, `id`, `who`, `whoami`, `w`, `last`, `su`, `sudo`, `chown`, `chgrp`, `chmod` |
| **Process Management** | `ps`, `top`, `htop`, `kill`, `nice`, `nohup`, `jobs`, `lsof`, `pgrep`, `pkill`, `timeout`, `wait` |
| **Package Management** | `apt`, `apt-cache`, `dpkg`, `dpkg-query`, `pacman` |
| **Network** | `ping`, `ip`, `curl`, `wget`, `netcat`, `ssh`, `ifconfig`, `hostname` |
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
- The registry accumulates all ~112 commands and exports them as a unified map.

---

## 3. Types (`src/types/`)

| File | Lines | Key Types Exported |
|---|---|---|
| `vfs.ts` | 106 | `VfsNodeType`, `VfsBaseNode`, `VfsFileNode`, `VfsDirectoryNode`, `VfsNodeStats`, `WriteFileOptions`, `RemoveOptions`, `VfsSnapshot*`, `MountOptions`, `MountPoint` |
| `commands.ts` | 152 | `CommandMode`, `CommandResult`, `SudoChallenge`, `PasswordChallenge`, `NanoEditorSession`, `ShellEnv`, `CommandContext`, `ShellModule`, `CommandOutcome` |
| `pipeline.ts` | 54 | `PipelineCommand`, `Pipeline`, `Statement`, `Script`, `LogicalOp` |
| `streams.ts` | 32 | `ExecStream`, `ShellStream` |
| `tar-stream.d.ts` | — | Third-party type augmentation for tar-stream |

---

## 4. VirtualFileSystem (`src/VirtualFileSystem/`)

**Files** (5): `index.ts` (1,339), `internalTypes.ts` (49), `path.ts` (104), `binaryPack.ts` (315), `journal.ts` (181) — **1,888 lines total**

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
- **Path utilities** (`path.ts`): Normalization via `path.posix.normalize()`, tree traversal with `getNode()`, parent directory lookup.
- **Mount points**: Supports host directory mounts with configurable read-only mode.

### Key public API

`writeFile`, `readFile`, `mkdir`, `exists`, `stat`, `list`, `remove`, `chmod`, `symlink`, `toSnapshot`, `fromSnapshot`, `importSnapshot`, `mount`, `unmount`, `flushMirror`, `restoreMirror`.

---

## 5. VirtualShell (`src/VirtualShell/`)

**Files** (4): `index.ts` (486 lines), `shell.ts` (784 lines), `shellParser.ts` (299 lines), `idleManager.ts`

- **`index.ts`** — Main `VirtualShell` class (EventEmitter). Orchestrates VFS, UserManager, PackageManager, and the command runtime. Constructor accepts hostname, `ShellProperties` (kernel, OS, arch), and `VfsOptions`. Exposes `exec()`, `addCommand()`, `getVfs()`, `getUsers()`, `getHostname()`.
- **`shell.ts`** — The interactive shell loop. Handles prompt display, input reading, command execution dispatch, user switching, sudo challenge flow, and idle detection.
- **`shellParser.ts`** — Parses shell input into a typed AST (`Script` → `Statement` → `Pipeline` → `PipelineCommand`). Handles pipes, redirections, logical operators (`&&`, `||`, `;`), backgrounding (`&`), and command grouping.
- **`idleManager.ts`** — Tracks session idle time, emits freeze/thaw events for honeypot integration, supports configurable timeout.

---

## 6. SSHMimic (`src/SSHMimic/`)

**Files** (9): `index.ts` (356), `executor.ts` (293), `exec.ts`, `scp.ts` (375), `sftp.ts` (888), `hostKey.ts`, `prompt.ts`, `loginBanner.ts`, `loginFormat.ts` — **~2,140 lines total**

- **`index.ts`** — `SshMimic` class (exported as `VirtualSshServer`). Wraps the `ssh2` `Server`. Features: password auth, public-key auth, per-IP rate limiting/lockout, interactive shell sessions, non-interactive exec sessions. Emits `connection`, `error`, `close` events.
- **`executor.ts`** — `executeStatements()` — takes parsed AST from shellParser, resolves commands, handles pipes (`|`), redirects (`>`, `>>`, `<`, `2>`, `2>&1`), and logical operators.
- **`scp.ts`** — SCP protocol handler using the virtual filesystem.
- **`sftp.ts`** — Full SFTP subsystem handler (exported as `VirtualSftpServer`). Supports read/write/stat/list/mkdir/remove/rename/symlink operations over an `sftp-stream` wrapper module.
- **`hostKey.ts`** — Loads or creates SSH host keys (RSA/Ed25519) from the filesystem.
- **`prompt.ts`** — Formats the interactive shell prompt (PS1 with user@hostname:cwd$).
- **`loginBanner.ts`** — Generates SSH pre-auth banner.
- **`loginFormat.ts`** — Last-login style messages.

---

## 7. SSHClient (`src/SSHClient/`)

**1 file**, `index.ts` (270 lines)

- `SshClient` class — Programmatic client for executing commands without SSH transport overhead.
- Maintains working directory state across invocations.
- Methods: `exec(command)`, `cd(path)`, `ls(path)`, `getCwd()`, `getHome()`.
- Binds to a `VirtualShell` instance and a username.

---

## 8. Honeypot (`src/Honeypot/`)

**1 file**, `index.ts` (541 lines)

- `HoneyPot` class — Security auditing and telemetry module.
- Attaches listeners to `VirtualShell`, `VirtualFileSystem`, `VirtualUserManager`, `SshMimic`, and `SftpMimic`.
- Tracks 20+ metrics: auth attempts/successes/failures/lockouts, commands run, file reads/writes, session starts/ends, users created/deleted, mounts/unmounts, symlinks, snapshots.
- Exports `AuditLogEntry` and `HoneyPotStats` types.
- Provides `getAuditLog()`, `getStats()`, `clearLog()`, `toJSON()`.
- Designed for forensic analysis and anomaly detection.

---

## 9. VirtualUserManager (`src/VirtualUserManager/`)

**1 file**, `index.ts` (853 lines)

- `VirtualUserManager` class (EventEmitter) — Complete virtual user management system.
- User records with: `username`, `uid`, `gid`, `salt`, `passwordHash` (scrypt-derived).
- Methods: `addUser`, `removeUser`, `authenticate`, `changePassword`, `getUser`, `userExists`, `listUsers`.
- Password hashing via `crypto.scryptSync` with per-user random salts; constant-time comparison via `timingSafeEqual`.
- Session tracking: `createSession`, `closeSession`, `getSessions`, and `VirtualActiveSession` interface with UUID, TTY, remote address.
- Process tracking: `createProcess`, `updateProcessStatus`, `getProcessTable` with PID, command, TTY, abort controller.
- Syncs `/etc/passwd`, `/etc/group`, `/etc/shadow` via callbacks.

---

## 10. VirtualPackageManager (`src/VirtualPackageManager/`)

**1 file**, `index.ts` (1,027 lines)

- `VirtualPackageManager` class — APT/Dpkg-compatible package management.
- `PackageDefinition` interface: `name`, `version`, `architecture`, `maintainer`, `description`, `shortDesc`, `installedSizeKb`, `depends`, `section`, `files[]`, `onInstall`/`onRemove` hooks.
- `PackageFile` interface: `path`, `content`, `mode`.
- `InstalledPackage` runtime record tracked in `/var/lib/dpkg/status`.
- Methods: `install(name)`, `remove(name)`, `isInstalled(name)`, `getInstalledPackages()`, `getRegistry()`, `registerPackages()`.
- Built-in registry with ~30+ packages including `vim`, `build-essential`, `python3`, `nodejs`, `git`, `curl`, `htop`, `neofetch`, `gcc`, `make`, etc.
- Recursive dependency resolution with cycle detection.

---

## 11. Modules (`src/modules/`)

**9 files**:

| File | Lines | Purpose |
|---|---|---|
| `linuxRootfs.ts` | 2,140 | Bootstraps full Linux directory tree (/bin, /usr, /etc, /proc, /sys, /dev, /var, /tmp, /root, /home) with realistic files |
| `nanoEditor.ts` | 953 | Built-in nano-like text editor with keybindings, search/replace, syntax highlighting |
| `desktopManager.ts` | 944 | XFCE4 desktop environment simulation (windows, panels, menus, wallpapers) |
| `pacmanGame.ts` | 689 | Playable Pac-Man game rendered in terminal |
| `neofetch.ts` | 360 | System info display (logo + hardware/distro info) |
| `webTermRenderer.ts` | 362 | Web-based terminal emulator renderer |
| `VirtualNetworkManager.ts` | 256 | Virtual networking stack: interfaces, routing table, ARP cache, latency/packet loss simulation |
| `shellInteractive.ts` | — | Interactive shell session controller |
| `shellRuntime.ts` | — | Shell runtime helpers |

---

## 12. Utils (`src/utils/`)

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

---

## 13. Tests (`tests/`)

**Total test files**: 15 (14 `.test.ts` + 1 `test-helper.ts`)
**Total test lines**: 4,791

### Test files

| File | Lines | Scope |
|---|---|---|
| `new-features.test.ts` | 1,036 | Integration tests for new features |
| `commands-core.test.ts` | 562 | Core command tests |
| `commands-missing.test.ts` | 571 | Edge case/missing command tests |
| `commands-advanced.test.ts` | 456 | Advanced command scenarios |
| `commands-text-sys.test.ts` | 445 | Text processing + system commands |
| `commands-admin-net.test.ts` | 441 | Admin + network commands |
| `commands-specific-units.test.ts` | 327 | Specific command unit tests |
| `sftp.test.ts` | 323 | SFTP protocol handler tests |
| `expand.test.ts` | 170 | Shell variable expansion tests |
| `command-helpers.test.ts` | 116 | Argument parsing tests |
| `helpers.test.ts` | 97 | Generic helper tests |
| `users.test.ts` | 86 | User management tests |
| `test-helper.ts` | 79 | Shared test utilities/fixtures |
| `parser-executor.test.ts` | 37 | Shell parser + executor tests |
| `ssh-exec.test.ts` | 45 | SSH exec session tests |

### Testing patterns

- **Test runner**: Bun's built-in test runner (`bun test`)
- **Pattern**: `describe`/`it`/`expect` blocks (Bun-compatible)
- **Naming convention**: `*.test.ts` files, separated by domain
- **Salve execution**: `test-salve` script runs each file sequentially with `--timeout 10000` and interleaved sleep (not parallel)
- **Helper pattern**: Shared `test-helper.ts` for common fixtures/setup
- **Coverage**: Heavy on integration tests running actual commands against a `VirtualShell` instance; lighter on pure unit tests for individual functions.

---

## 14. Build Output

### `builds/` (3 artifacts)

| File | Lines | Format | Description |
|---|---|---|---|
| `fortune-nyx-v1.6.3-directbash-k6.1.0.mjs` | 3,085 | ESM | Direct bash bundle (Node.js) |
| `fortune-nyx-v1.6.3-ssh.cjs` | 3,079 | CJS | SSH server bundle |
| `fortune-nyx-v1.6.3-web.min.js` | 26,699 | ESM (minified) | Web browser shell |

### `dist/` (compiled TypeScript output)

**270 files total** (135 `.js` + 135 `.d.ts`). Mirrors the full `src/` structure:

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

---

## 15. Docs (`docs/`)

**Total files**: 90 (79 HTML + 11 non-HTML)
**Total lines**: 9,053
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

---

## 16. Git History

| Metric | Value |
|---|---|
| **Total commits** | 735 |
| **Contributors** | 4 |
| **Primary author** | `itsrealfortune` (686 commits) |
| **Other contributors** | `fox3000foxy` (81), `Fortune` (44), `dependabot[bot]` (3) |
| **Latest tag** | `v1.6.3` |
| **Total tags** | 44 (from `v1.0.0` through `v1.6.3`) |
| **Local branches** | 38 |
| **Remote branches** | 26 (plus `gh-pages`) |
| **Active branch** | `main` |
| **Branch naming convention** | `feat/*`, `fix/*`, `chore/*`, `build/*`, `format/*`, `test/*`, `upgrade/*`, `docs/*` |

---

## 17. Architectural Observations

1. **Clean layered architecture**: The system is organized in clear layers — VFS (storage) → UserManager (auth) → PackageManager (software) → Shell (interaction) → SSHMimic/SSHClient (transport) → Honeypot (observability).

2. **Well-defined module contract**: Every command implements the `ShellModule` interface (`{ name, params, run, aliases?, description?, category? }`), making extension trivial.

3. **Performance-conscious design**:
   - Binary serialization (not JSON+base64) for VFS snapshots (~27% smaller)
   - Null-prototype objects instead of Maps for directory children (~40% RAM savings)
   - Lazy stubs (InternalStubNode) avoid Buffer allocation for static files
   - File eviction in FS mode to manage memory
   - Write-ahead journaling with configurable flush intervals

4. **Comprehensive Linux emulation**: The project simulates a Fortune GNU/Linux (Nyx) distribution with Firecracker MicroVM kernel 6.x, realistic /proc, /sys, /dev hierarchy, package manager, user management, and desktop environment.

5. **Dual deployment model**: Can be used programmatically (TypeScript library, `dist/index.js`) or as a standalone SSH server (`standalone.ts`, builds for Node.js and web).

6. **Security features**: Password hashing with scrypt + per-user salt, constant-time comparison, rate limiting, IP lockout, audit logging (Honeypot), SSH public-key auth.

7. **Web compatibility**: Polyfills for Node.js built-ins (`node:fs`, `node:crypto`, `node:child_process`, etc.) enable browser-side execution via esbuild bundling.

8. **Documentation quality**: Full TypeDoc-generated API docs with 11 classes, 44 interfaces, 12 types, 8 functions documented.

9. **Testing maturity**: 14 test files, ~4,800 lines, organized by domain. Uses Bun's test runner with sequential execution pattern.

10. **Modern toolchain**: TypeScript 6.x, esbuild (for bundling), Biome (for formatting/linting), Bun (for testing/running), GH Actions CI (3 workflows).
