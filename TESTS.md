# Tests

## Overview

- **706 tests** (686 pass, 20 skip, 0 fail)
- **~~15~~ 17 files**, ~~1121~~ 1171 expect() calls
- **~1.49s** runtime (default, without network/SFTP)
- **73.93% line coverage**, 72.54% function coverage

## Running Tests

```bash
# All tests (fast path — skips network + SFTP)
bun test

# With network tests (curl/wget/ping real HTTP calls)
SSH_MIMIC_RUN_NETWORK_TESTS=1 bun test

# With SFTP tests (requires SSH server)
SSH_MIMIC_RUN_SFTP_TESTS=1 bun test

# Both
SSH_MIMIC_RUN_NETWORK_TESTS=1 SSH_MIMIC_RUN_SFTP_TESTS=1 bun test

# Coverage
bun test --coverage

# Single file
bun test tests/permissions.test.ts
```

## Opt-in Test Groups

| Group | Env var | Tests | Reason skipped |
|-------|---------|-------|----------------|
| Network | `SSH_MIMIC_RUN_NETWORK_TESTS` | 15 | Real HTTP calls (curl, wget, ping) |
| SFTP | `SSH_MIMIC_RUN_SFTP_TESTS` | 5 | Requires real SSH server |

## Timing Breakdown

| File | Duration | Tests |
|------|----------|-------|
| `new-features.test.ts` | 675ms | 135 |
| `commands-admin-net.test.ts` | 422ms | 137 |
| `users.test.ts` | 397ms | 14 |
| `commands-missing.test.ts` | 355ms | 71 |
| `commands-specific-units.test.ts` | 348ms | 48 |
| `commands-text-sys.test.ts` | 336ms | 50 |
| `commands-advanced.test.ts` | 309ms | 67 |
| `commands-core.test.ts` | 296ms | 87 |
| `parser-executor.test.ts` | 278ms | 3 |
| `sftp.test.ts` | 238ms | 5 (skipped) |
| `ssh-exec.test.ts` | 365ms | 1 |
| `permissions.test.ts` | 85ms | 20 |
| `expand.test.ts` | 73ms | 31 |
| `command-helpers.test.ts` | 40ms | 17 |
| `helpers.test.ts` | 37ms | 15 |
| **Total** | **~1.35s** | **706** |

## File-by-file Coverage

### Commands (70+ files)

| File | Lines | Funcs | Status |
|------|-------|-------|--------|
| `basename.ts` | 100% | 100% | ✅ |
| `cat.ts` | 97% | 100% | ✅ |
| `cd.ts` | 94% | 100% | ✅ |
| `chmod.ts` | 89% | 67% | ✅ |
| `chown.ts` | 84% | 100% | ✅ |
| `cp.ts` | 83% | 100% | ✅ |
| `curl.ts` | 31% | 100% | ⬜ skipped by default |
| `cut.ts` | 100% | 100% | ✅ |
| `date.ts` | 100% | 100% | ✅ |
| `dd.ts` | 90% | 100% | ✅ |
| `df.ts` | 100% | 100% | ✅ |
| `echo.ts` | 97% | 67% | ✅ |
| `env.ts` | 100% | 100% | ✅ |
| `exit.ts` | 100% | 100% | ✅ |
| `export.ts` | 100% | 100% | ✅ |
| `expr.ts` | 80% | 100% | ✅ |
| `file.ts` | 100% | 100% | ✅ |
| `find.ts` | 78% | 100% | ✅ |
| `free.ts` | 100% | 100% | ✅ |
| `grep.ts` | 80% | 83% | ✅ |
| `groups.ts` | 100% | 100% | ✅ |
| `head.ts` | 100% | 100% | ✅ |
| `help.ts` | 95% | 100% | ✅ |
| `hostname.ts` | 100% | 100% | ✅ |
| `id.ts` | 100% | 100% | ✅ |
| `ip.ts` | 76% | 100% | ✅ |
| `iptables.ts` | 92% | 67% | ✅ |
| `kill.ts` | 67% | 100% | ✅ |
| `ln.ts` | 86% | 100% | ✅ |
| `ls.ts` | 95% | 95% | ✅ |
| `lsb-release.ts` | 100% | 100% | ✅ |
| `man.ts` | 95% | 100% | ✅ |
| `mkdir.ts` | 96% | 100% | ✅ |
| `mv.ts` | 91% | 100% | ✅ |
| `nano.ts` | 96% | 100% | ✅ |
| `neofetch.ts` | 81% | 100% | ✅ |
| `nohup.ts` | 100% | 100% | ✅ |
| `nproc.ts` | — | — | ✅ |
| `passwd.ts` | 77% | 100% | ✅ |
| `printf.ts` | 60% | 100% | ✅ |
| `ps.ts` | 63% | 50% | ✅ |
| `pwd.ts` | 100% | 100% | ✅ |
| `read.ts` | 93% | 67% | ✅ |
| `rm.ts` | 65% | 75% | ✅ |
| `sed.ts` | 85% | 100% | ✅ |
| `seq.ts` | 100% | 100% | ✅ |
| `sleep.ts` | — | — | ✅ |
| `sort.ts` | 94% | 100% | ✅ |
| `stat.ts` | 82% | 100% | ✅ |
| `strace.ts` | 100% | 67% | ✅ |
| `su.ts` | 67% | 100% | ✅ |
| `sudo.ts` | 91% | 100% | ✅ |
| `sysctl.ts` | 98% | 100% | ✅ |
| `tail.ts` | 90% | 100% | ✅ |
| `tar.ts` | 92% | 91% | ✅ |
| `tee.ts` | 96% | 100% | ✅ |
| `test.ts` | 65% | 100% | ✅ |
| `touch.ts` | 95% | 100% | ✅ |
| `tr.ts` | 95% | 86% | ✅ |
| `tree.ts` | 100% | 100% | ✅ |
| `true.ts` | 100% | 100% | ✅ |
| `type.ts` | 91% | 100% | ✅ |
| `uname.ts` | 100% | 100% | ✅ |
| `uniq.ts` | 87% | 100% | ✅ |
| `uptime.ts` | 83% | 100% | ✅ |
| `wc.ts` | 90% | 100% | ✅ |
| `wget.ts` | 35% | 100% | ⬜ skipped by default |
| `which.ts` | 97% | 100% | ✅ |
| `who.ts` | 67% | 50% | ✅ |
| `whoami.ts` | 100% | 100% | ✅ |
| `yes.ts` | 100% | 100% | ✅ |
| `zip.ts` | 99% | 100% | ✅ |

### Core modules

| File | Lines | Funcs | Status |
|------|-------|-------|--------|
| `VirtualFileSystem/index.ts` | 73% | 57% | 🔶 core VFS |
| `VirtualFileSystem/permissions.ts` | 67% | 63% | 🔶 permission engine |
| `VirtualFileSystem/binaryPack.ts` | 91% | 83% | ✅ |
| `VirtualFileSystem/path.ts` | 93% | 100% | ✅ |
| `VirtualUserManager/index.ts` | 78% | 73% | 🔶 user management |
| `VirtualUserManager/signals.ts` | 61% | 0% | ⬜ signal definitions (data) |
| `VirtualShell/index.ts` | 56% | 52% | 🔶 shell API layer |
| `VirtualShell/shellParser.ts` | 92% | 100% | ✅ |
| `VirtualPackageManager/index.ts` | 99% | 94% | ✅ |

### Untestable / Skipped (interactive or protocol-level)

| File | Lines | Reason |
|------|-------|--------|
| `VirtualShell/shell.ts` | 1% | Interactive stdin/raw-mode shell |
| `SSHMimic/index.ts` | 10% | Real SSH server setup |
| `SSHMimic/scp.ts` | 2% | Real SCP protocol |
| `SSHMimic/sftp.ts` | 7% | Needs SSH server (opt-in) |
| `SSHMimic/prompt.ts` | 3% | Prompt rendering (indirectly tested) |
| `modules/nanoEditor.ts` | 7% | Interactive editor |
| `modules/pacmanGame.ts` | 1% | Interactive game |
| `Honeypot/index.ts` | 5% | Integration-only |
