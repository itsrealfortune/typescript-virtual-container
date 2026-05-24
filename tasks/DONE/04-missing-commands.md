# Task: Missing POSIX commands

**Priority:** P1
**Estimated effort:** 3 weeks
**Dependencies:** None

## Context

32+ common Linux commands are missing. The project aims for POSIX completeness. These commands are essential for users expecting a realistic Linux environment.

## Commands to implement (by priority)

### P1 — System administration
- [x] `mount` / `umount` — mount/unmount virtual filesystems
- [x] `systemctl` — systemd interface (start/stop/status/enable)
- [x] `journalctl` — system logs
- [x] `ssh-keygen` — SSH key generation
- [x] `crontab` — task scheduling
- [x] `at` — delayed execution

### P1 — Editing and viewing
- [x] `less` — pagination with search (highly requested)
- [x] `more` — simple pagination
- [x] `vi` / `vim` — modal editor (or at least a useful stub)

### P1 — Development
- [x] `make` — build automation
- [x] `git` — version control (even partial: init, add, commit, log, status)

### P2 — Network
- [x] `dig` — DNS queries
- [x] `nslookup` — DNS lookup
- [x] `route` — routing table display
- [x] `arp` — ARP cache
- [x] `ethtool` — network interface configuration
- [x] `service` — service management (init.d)
- [x] `logger` — syslog message sending

### P2 — Text and data
- [x] `cmp` — binary comparison
- [x] `od` — octal dump
- [x] `xxd` — hex dump
- [x] `hexdump` — hex dump
- [x] `patch` — apply diffs
- [x] `iconv` — encoding conversion
- [x] `recode` — character set conversion
- [x] `pr` — file pagination

### P2 — Security and encryption
- [x] `gpg` — encryption/signing
- [x] `openssl` — crypto utility

### P3 — Process and terminal
- [x] `screen` — terminal multiplexer
- [x] `tmux` — terminal multiplexer
- [x] `watch` — periodic execution
- [x] `time` — execution time measurement

### P3 — Fun and display
- [x] `figlet` — ASCII banners
- [x] `banner` — banners
- [x] `toilet` — colored banners
- [x] `factor` — integer factorization
- [x] `rs` — data reshaping

### P3 — Transfer
- [x] `rsync` — file synchronization (can use VFS)

### P3 — Groups and users
- [x] `useradd` / `userdel` — in addition to adduser/deluser (Debian vs POSIX semantics)
- [x] `groupmod` — group modification

## Acceptance Criteria

- Each command has a functional basic implementation (not a stub)
- Each command has tests (nominal case + main edge case)
- Each command has a man page
- Complex commands (git, make, vi) can be partial but useful implementations

## Notes

- `mount` can wrap the existing `VirtualFileSystem.mount()`
- `systemctl` can map onto the existing session manager
- `crontab` requires a scheduler in VFS (`/var/spool/cron/`)
- `git` would be a full rewrite — consider partial integration (reading `.git/`)
- See `src/commands/registry.ts` for the registration pattern
- See existing commands for the `ShellModule` pattern
