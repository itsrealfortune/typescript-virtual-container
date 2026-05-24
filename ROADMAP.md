# Roadmap — typescript-virtual-container

## Current Focus

- **Test Coverage** — ~72 commands (56%) ont zéro test. Priorité absolue.
- **Security** — sandbox multi-tenant et isolation.

---

## Planned

### P0 — Test Coverage & Security

- [ ] **01 — Test coverage: 72 commands sans test** — `ping`, `ifconfig`, `iptables`, `dd`, `file`, `apt`, `gzip`, `tar`, `top`, `fortune`, et ~62 autres (`tasks/01-test-coverage-commands.md`)
- [ ] **02 — Test coverage: modules critiques** — SSHMimic (scp, hostKey, prompt), Honeypot, desktopManager, VirtualProxy, VirtualVpn, nanoEditor (`tasks/02-test-coverage-modules.md`)
- [ ] **03 — Security sandbox multi-tenant** — WebWorker isolation, restriction curl/wget, CSP, VFS fork-on-write, cgroups virtuels (`tasks/03-security-sandbox.md`)

### P1 — POSIX Completeness & Desktop

- [ ] **04 — 32+ commandes POSIX manquantes** — mount, systemctl, journalctl, less, more, dig, git, make, ssh-keygen, crontab, gpg, openssl, screen/tmux, watch, rsync, figlet, et plus (`tasks/04-missing-commands.md`)
- [ ] **05 — Full POSIX shell compliance** — parser, expansions, `[[ ]]`, redirections, traps, builtins, shell options (`tasks/05-shell-compliance.md`)
- [ ] **06 — Desktop features** — multi-workspaces, icons desktop, login screen, notifications, window snapping, Alt+Tab, search, clipboard, personalisation (`tasks/06-desktop-features.md`)

### P2 — Infrastructure & Transport

- [ ] **07 — CI/CD gates** — coverage threshold, build verification, bundle size gate, security audit, benchmark regression, matrix tests (`tasks/07-ci-cd-gates.md`)
- [ ] **08 — Snapshot format standard** — support tar/squashfs en plus de VFSB, interopérabilité (`tasks/08-snapshot-format.md`)
- [ ] **09 — WebSocket remote shell client** — serveur WS, protocole messages, client terminal web, intégration desktop (`tasks/09-websocket-shell.md`)

### P3 — Polish

- [ ] **10 — Utils test coverage** — tokenize, glob, argv, vfsDiff, keyToBytes, perfLogger, shellSession (`tasks/10-utils-test-coverage.md`)
- [ ] **11 — Stubs et correctifs** — csplit, split, printf, read, alias manquants, graceful degradation (`tasks/11-stubs-fixes.md`)

---

## Detailed Task Files

Chaque groupe de tâches est documenté en détail dans `tasks/` :

| Fichier | Contenu |
|---|---|
| `tasks/01-test-coverage-commands.md` | Liste exhaustive des ~72 commandes à tester |
| `tasks/02-test-coverage-modules.md` | Modules critiques à couvrir (SSHMimic, Honeypot, desktop) |
| `tasks/03-security-sandbox.md` | WebWorker, CSP, restriction réseau, isolation |
| `tasks/04-missing-commands.md` | 32+ commandes à implémenter |
| `tasks/05-shell-compliance.md` | POSIX shell gaps |
| `tasks/06-desktop-features.md` | Desktop fonctionnalités manquantes |
| `tasks/07-ci-cd-gates.md` | CI/CD améliorations |
| `tasks/08-snapshot-format.md` | Standard snapshot format |
| `tasks/09-websocket-shell.md` | WebSocket transport |
| `tasks/10-utils-test-coverage.md` | Tests unitaires utils |
| `tasks/11-stubs-fixes.md` | Stubs et correctifs |

---

## Completed (v1.0.0 → v1.7.0)

<details>
<summary>See full changelog</summary>

### Core Engine
- [x] Pure in-memory VFS with binary snapshot format (VFSB, ~27% smaller than JSON+base64)
- [x] Linux rootfs on boot — `/etc`, `/proc`, `/sys`, `/dev`, `/usr`, `/var`
- [x] Virtual package manager — `apt`/`dpkg`, 30+ packages, VFS file writes
- [x] Real shell interpreter — `if`/`for`/`while`/`until`/`case`/functions
- [x] Arrays `arr=(...)`, `$(cmd)`, `$((expr))`, `${VAR:-default}`, `${#VAR}`
- [x] Brace expansion `{a,b,c}`, range `{1..N}`, glob `*.txt`
- [x] History expansion `!!`, `!n`, `!-n`
- [x] Heredoc `<< EOF`, line continuation `\`
- [x] `set -e`/`set -x`, `$RANDOM`/`$LINENO`

### Commands
- [x] 152 built-in commands across 13 categories
- [x] Full JSDoc on all commands (`@category`, `@params`)
- [x] `man` pages for all commands (138 manual pages)
- [x] `sed` — `d`/`p`/`=`/`q`, `-n`, line/regex/range/`$` addresses
- [x] `awk` — `-v`, field assignment, `gsub`/`sub`/`substr`/`split`/`length`/`printf`/`next`
- [x] `find` — `-exec`, `-maxdepth`, `-iname`, `-not`/`!`, `-o`/`-a`, `-empty`, `-size`
- [x] `tar` — real POSIX ustar binary format
- [x] `zip`/`unzip` — PKZIP+DEFLATE (via fflate)
- [x] `bzip2`/`bunzip2` — block-sorting compression
- [x] New commands: `lsof`, `strace`, `perl`, `w`, `ip`, `dmesg`, `last`, `basename`, `dirname`, `file`, `tput`, `stty`, `yes`, `fortune`, `cowsay`, `cowthink`, `cmatrix`, `sl`, `bc`, `jobs`, `bg`, `fg`, `tac`, `nl`, `paste`, `shuf`, `column`, `timeout`, `mktemp`, `nproc`, `wait`

### Desktop (browser)
- [x] `startxfce4` — full in-browser XFCE desktop
- [x] XFCE panel — Applications menu, clock, system tray
- [x] Draggable windows with focus management
- [x] Window resize — draggable bottom-right resize handle
- [x] Thunar file manager — navigate, right-click, trash, rename
- [x] Mousepad text editor — Ctrl+S, dirty indicator, syntax highlighting
- [x] Terminal windows — live interactive shell sessions
- [x] Font Awesome icons
- [x] Frosted glass window styling
- [x] Thunar: drag-and-drop — move files between folders via drag-and-drop
- [x] Thunar: Copy Path — right-click → copy full path to system clipboard
- [x] Session save/restore — window positions/types/paths persist to localStorage across tab close
- [x] GUI Task Manager — process table (PID/User/Command/TTY/Status), Kill/Close buttons, auto-refresh
- [x] Maximize button — `□` button + double-click title bar toggles fullscreen (respects panel height)
- [x] Kill actually works — abort signal racing for shell processes, session unregistration, desktop window close

### SSH & Networking
- [x] SSH server (ssh2) — password + public-key auth
- [x] SFTP subsystem — read/write/stat/list/mkdir/remove/rename/symlink
- [x] SCP protocol handler
- [x] Per-IP rate limiting and lockout
- [x] Host key management (RSA/Ed25519)
- [x] Virtual network manager — interfaces, routing, ARP, latency simulation
- [x] Dynamic `/proc/net`, `/proc/self`, `/proc/<pid>` per session

### Security
- [x] scrypt password hashing (N=32768, r=8, p=1) with per-user salt
- [x] Constant-time password comparison
- [x] SSH public-key authentication
- [x] Honeypot — audit logging, 20+ metrics, anomaly detection
- [x] User quotas (per-user disk space limits)
- [x] UID/GID file ownership — chown, chgrp, POSIX permission checks
- [x] /sbin root-only PATH restriction

### Testing & Tooling
- [x] 14 test files, ~4,800 lines, organized by domain
- [x] Snapshot diff tooling — `diffSnapshots`, `formatDiff`, `assertDiff`
- [x] Binary VFS snapshot format (VFSB)
- [x] Write-ahead journaling with crash recovery
- [x] File eviction in FS mode (>64 KB evicted after flush)
- [x] Null-prototype objects for directory children (~40% RAM savings)
- [x] Lazy stub nodes for static rootfs content
- [x] `PasswordChallenge` type — interactive password flow
- [x] Host directory mounts (`mount(vPath, hostPath, { readOnly })`)

### Web & Distribution
- [x] Web shell bundle — browser-native with IndexedDB VFS
- [x] Standalone CLI bundle — single-file interactive shell
- [x] SSH server bundle — zero-install SSH server
- [x] Node.js polyfills for browser builds
- [x] npm package — `typescript-virtual-container`
- [x] TypeDoc API documentation (11 classes, 44 interfaces)

</details>

---

## Known Limitations

- **No security boundary** — all shells share the same JS heap, `curl`/`wget` use real `fetch()`
- **Desktop is browser-only** — `startxfce4`/`thunar`/`mousepad` no-op outside DOM
- **POSIX subset** — shell interpreter covers common patterns but is not fully POSIX-compliant
- **Proprietary snapshot format** — VFSB is custom binary (no other tool can read it)
- **No resource enforcement** — CPU/memory not capped per shell

---

## Long-Term Vision

- Zero-dependency Linux-in-TypeScript for testing, honeypots, tutorials, embedded shells
- WebWorker sandbox isolation for multi-tenant deployments
- Full POSIX shell compliance
- Standard snapshot format (squashfs or similar)
