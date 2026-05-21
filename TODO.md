
# TODO — typescript-virtual-container

## Roadmap

<details>
<summary>## Done</summary>

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
- [x] Web shell bundles (`fortune-nyx-v1.7.1-web.min.js`) — fully browser-native with IndexedDB VFS
- [x] Self-standalone CLI (`fortune-nyx-v1.7.1-directbash-k6.1.0.mjs`) — single-file interactive shell, per-user history, tab completion
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
- [x] POSIX permission enforcement — `enforceAccess`/`enforcePathTraversal`/`enforceDelete`/`enforceChown`/`enforceChmod`; all file commands pass uid/gid; path traversal checked on every read/write/remove; sticky bit semantics
- [x] User auto-provisioning — `ensureUser()` creates unknown SSH users with non-root UID; `addUser`/`ensureUser` create homes with `0o700`; `getUsername()`/`getGroup()` resolve uid/gid to names
- [x] Device nodes — `/dev/null`, `/dev/zero`, `/dev/urandom`, `/dev/full`, etc. with correct read/write semantics; `mknod` command
- [x] File descriptor table — `fdOpen()`/`fdClose()`/`fdDup()` in VFS; `/proc/self/fd` population
- [x] Subshell/command group isolation — `(cmd)` runs in copied environment; `{ cmd; }` runs in current context
- [x] Writable `/proc/sys` — 40+ kernel tunables via sysctl content resolver + write hooks; `sysctl` command
- [x] POSIX signal handling — `SIGKILL`/`SIGSTOP`/`SIGCONT`/`SIGCHLD`; `kill -9` terminates with exit code 137
- [x] Firewall engine — `iptables` with INPUT/OUTPUT/FORWARD chains, first-match evaluation, policy config
- [x] `autoSudoForNewUsers` defaults to `false` — new users are not sudoers by default
- [x] `ls -l` shows usernames (not uid numbers) — `getUsername`/`getGroup` resolution
- [x] Remove `wiki` from `.gitignore` — wiki content now tracked
- [x] Add wiki reference to README.md
- [x] JSDoc audit across 179 TypeScript files
- [x] Add JSDoc to Baie class (VirtualSwitch.ts) — class + all methods + @example
- [x] Add JSDoc to startShell function (VirtualShell/shell.ts) — 8 params documented
- [x] Add JSDoc to NanoEditor class (nanoEditor.ts) — class + 3 public methods + options interface
- [x] Add JSDoc to SftpMimic class (SSHMimic/sftp.ts) — class + start/stop/getVfs/getUsers
- [x] Fix 50+ lazy @param/@returns in VirtualFileSystem/index.ts
- [x] Fix 18 lazy @param/@returns in VirtualSwitch.ts
- [x] Fix 20+ lazy @param/@returns in VirtualUserManager/index.ts
- [x] Fix lazy @param/@returns in VirtualNetworkManager.ts
- [x] Fix lazy @param/@returns in Honeypot/index.ts
- [x] Add JSDoc to sessionManager.ts (3 exported functions)
- [x] Add JSDoc to VirtualShell/shellParser.ts functions
- [x] Add JSDoc to VirtualVpn.ts helper functions (deriveKey, encrypt, decrypt)
- [x] Strip JSDoc from private methods (keep only public API documented)
- [x] Expand index.ts with 40+ missing public API exports
- [x] Add @example to VirtualSwitch (attach, DNS, routing, traffic shaping, partitions)
- [x] Add @example to VirtualNetworkManager (interfaces, routes, firewall, ping)
- [x] Add @example to VirtualUserManager (users, processes, sessions, sudo)
- [x] Add file-level JSDoc to shellInteractive.ts
- [x] Add file-level JSDoc to shellRuntime.ts
- [x] Add file-level JSDoc to desktopManager.ts
- [x] Add file-level JSDoc to thunarManager.ts
- [x] Add file-level JSDoc to neofetch.ts
- [x] Add file-level JSDoc to pacmanGame.ts
- [x] linuxRootfs.ts and webTermRenderer.ts already had file-level JSDoc
- [x] Regenerate wiki (enriched with examples and file docs)
- [x] Run `bun publish-doc` — TypeDoc HTML + wiki pushed to remote
- [x] All 777 tests pass
- [x] XFCE desktop: resize windows, multi-monitor layout
- [x] Thunar: drag-and-drop between folders
</details>

## Urgent
- [ ] Fix parameters name convention in multiple filesand remove unused parameters (noUnusedLocals, noUnusedParameters)
- [ ] Fix all names conventions (camelCase for variables/functions, PascalCase for classes/types, UPPER_SNAKE_CASE for constants)

## Prioty

- [ ] Remove all non null assertions (`!`) from the codebase — ensure proper null checks and type guards instead
- [ ] Remove all biome and ts-ignore comments — fix underlying issues instead of silencing them
- [ ] Add a RAM and CPU capping
- [ ] Add a garbage collector to free up memory from deleted files, closed windows, and terminated processes, but also from closed files that are not required to be kept in memory (e.g. large files that have been closed) [refers to IdleManager]
- [ ] Add a swap file mechanism to handle memory overflow when RAM is full (e.g. move least recently used data to disk)
- [ ] Add a process scheduler to manage CPU time between running processes, ensuring fair resource allocation and preventing any single process from monopolizing the CPU
- [ ] Add a more realistic file caching mechanism that simulates disk read/write speeds and cache eviction policies
- [ ] Add a more realistic network stack that simulates latency, bandwidth limits, and packet loss, and allows for more complex network configurations (e.g. multiple interfaces, routing tables, firewall rules)
- [ ] Add a more realistic user management system that supports user groups, permissions, and authentication mechanisms (e.g. password hashing, PAM)
- [ ] WebSocket-based remote shell client (experimental)

## Remaining / Future

- [ ] Add @example tags to command modules (110+ files) — low priority, commands are self-documenting via usage strings
- [ ] Consider exporting startShell from index.ts if consumers need custom shell sessions
- [ ] Add JSDoc to internal types (InternalDirectoryNode, InternalFileNode, etc.) if they become public
