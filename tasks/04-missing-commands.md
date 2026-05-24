# Task: Missing POSIX commands

**Priority:** P1
**Estimated effort:** 3 weeks
**Dependencies:** None

## Context

32+ common Linux commands are missing. The project aims for POSIX completeness. These commands are essential for users expecting a realistic Linux environment.

## Commands to implement (by priority)

### P1 — System administration
- [ ] `mount` / `umount` — mount/unmount virtual filesystems
- [ ] `systemctl` — systemd interface (start/stop/status/enable)
- [ ] `journalctl` — system logs
- [ ] `ssh-keygen` — SSH key generation
- [ ] `crontab` — task scheduling
- [ ] `at` — delayed execution

### P1 — Editing and viewing
- [ ] `less` — pagination with search (highly requested)
- [ ] `more` — simple pagination
- [ ] `vi` / `vim` — modal editor (or at least a useful stub)

### P1 — Development
- [ ] `make` — build automation
- [ ] `git` — version control (even partial: init, add, commit, log, status)

### P2 — Network
- [ ] `dig` — DNS queries
- [ ] `nslookup` — DNS lookup
- [ ] `route` — routing table display
- [ ] `arp` — ARP cache
- [ ] `ethtool` — network interface configuration
- [ ] `service` — service management (init.d)
- [ ] `logger` — syslog message sending

### P2 — Text and data
- [ ] `cmp` — binary comparison
- [ ] `od` — octal dump
- [ ] `xxd` — hex dump
- [ ] `hexdump` — hex dump
- [ ] `patch` — apply diffs
- [ ] `iconv` — encoding conversion
- [ ] `recode` — character set conversion
- [ ] `pr` — file pagination

### P2 — Security and encryption
- [ ] `gpg` — encryption/signing
- [ ] `openssl` — crypto utility

### P3 — Process and terminal
- [ ] `screen` — terminal multiplexer
- [ ] `tmux` — terminal multiplexer
- [ ] `watch` — periodic execution
- [ ] `time` — execution time measurement

### P3 — Fun and display
- [ ] `figlet` — ASCII banners
- [ ] `banner` — banners
- [ ] `toilet` — colored banners
- [ ] `factor` — integer factorization
- [ ] `rs` — data reshaping

### P3 — Transfer
- [ ] `rsync` — file synchronization (can use VFS)

### P3 — Groups and users
- [ ] `useradd` / `userdel` — in addition to adduser/deluser (Debian vs POSIX semantics)
- [ ] `groupmod` — group modification

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
