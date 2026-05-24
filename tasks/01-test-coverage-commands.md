# Task: Test Coverage — uncovered commands

**Priority:** P0
**Estimated effort:** 2 weeks (Batch 1 done ✅)
**Dependencies:** None

## Context

~31 out of ~127 commands had zero dedicated tests. Existing tests focused on ~20 basic commands. First batch of tests has been written — see below for remaining commands.

## Status

| Test file | Commands covered | Status |
|---|---|---|
| `tests/commands-admin-net.test.ts` | `ifconfig`, `tc`, `ss`, `conntrack`, `traceroute` | ✅ Done |
| `tests/commands-missing.test.ts` | `realpath`, `timeout` | ✅ Done |
| `tests/commands-fun.test.ts` | `fortune`, `cowsay`, `cowthink`, `cmatrix`, `sl` | ✅ Done |
| `tests/commands-packages.test.ts` | `pacman` | ✅ Done |
| `tests/commands-text-extra.test.ts` | `tac`, `nl`, `paste`, `column`, `shuf`, `fold`, `expand`, `fmt`, `strings` | ✅ Done |
| `tests/commands-proc.test.ts` | `top`, `nice`, `pgrep`, `pkill`, `wait`, `jobs`, `bg`, `fg` | ✅ Done |
| `tests/commands-hash.test.ts` | `md5sum`, `sha256sum` | ✅ Done |

**Total: 31 commands now tested** (added to 7 test files)

## Commands that already had tests (no action needed)

The following commands from the original task list already had test coverage:

- `ping` — tested in `commands-admin-net.test.ts` (behind `describeNetwork`)
- `iptables` — tested in `commands-admin-net.test.ts`
- `ip` — tested in `commands-admin-net.test.ts`
- `dd`, `file`, `basename`, `dirname`, `mktemp`, `tput`, `stty`, `yes`, `seq` — tested in `commands-missing.test.ts`
- `bc` — tested in `commands-missing.test.ts`
- `apt`, `apt-cache`, `dpkg`, `dpkg-query` — tested in `commands-admin-net.test.ts`
- `nano` — tested in `commands-specific-units.test.ts`
- `gzip`, `bzip2`, `zip`, `tar` — tested in `commands-text-sys.test.ts`
- `nohup`, `kill`, `lsof`, `strace`, `ps` — tested in `commands-missing.test.ts` or `commands-specific-units.test.ts`
- `md5sum`, `sha256sum` — now tested in `commands-hash.test.ts` ✅
- `comm`, `csplit`, `split`, `cut`, `tr`, `sort`, `uniq`, `diff` — tested in `commands-text-sys.test.ts`
- `printf`, `read` — tested in `commands-specific-units.test.ts`
- `expand` (CLI tool) — tested in `commands-text-extra.test.ts` ✅

## Known shuf limitation

The `shuf -n` flag with a file argument has a parsing bug: the `-n` value is mistaken for a file path. Workaround: pipe from stdin with `cat file | shuf -n N`.
