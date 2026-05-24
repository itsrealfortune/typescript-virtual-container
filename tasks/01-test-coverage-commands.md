# Task: Test Coverage — uncovered commands

**Priority:** P0
**Estimated effort:** 2 weeks
**Dependencies:** None

## Context

~72 out of ~127 commands (56%) have **zero dedicated tests**. Existing tests focus on ~20 basic commands (`echo`, `cat`, `ls`, `mkdir`, `cp`, `mv`, `rm`, `grep`, `sed`, `awk`, `find`, etc.), leaving the majority without any automated verification.

## Commands to cover by test file

### tests/commands-admin-net.test.ts (existing)
- [ ] `ping` — basic test, timeout, reachable/unreachable
- [ ] `ifconfig` — display, interface configuration
- [ ] `iptables` — INPUT/OUTPUT/FORWARD rules, policy
- [ ] `tc` — traffic shaping, latency
- [ ] `ss` — socket listing
- [ ] `conntrack` — connection tracking
- [ ] `traceroute` — basic traceroute
- [ ] `ip` — route, addr, link, neigh

### tests/commands-missing.test.ts (existing or new file)
- [ ] `dd` — read/write, seek, count, bs
- [ ] `file` — basic type detection
- [ ] `basename` / `dirname` — path parsing
- [ ] `realpath` — resolution
- [ ] `mktemp` — temp file/dir creation
- [ ] `timeout` — time limit
- [ ] `tput` / `stty` — terminal control
- [ ] `yes` — output stream
- [ ] `seq` — number sequences

### New: tests/commands-fun.test.ts
- [ ] `fortune` — non-empty output
- [ ] `cowsay` / `cowthink` — message formatting
- [ ] `cmatrix` — start/stop
- [ ] `sl` — display
- [ ] `bc` — basic arithmetic

### New: tests/commands-packages.test.ts
- [ ] `apt` — install, remove, update, search
- [ ] `apt-cache` — search, show
- [ ] `dpkg` — query, list
- [ ] `dpkg-query` — basic queries
- [ ] `pacman` — basic operations

### New: tests/commands-desktop.test.ts
- [ ] `startxfce4` — launch (browser only)
- [ ] `thunar` / `xfceDesktop` — UI components
- [ ] `mousepad` — text editor launch
- [ ] `nano` — file creation via nano

### New: tests/commands-text-extra.test.ts
- [ ] `tac` — reverse cat
- [ ] `nl` — line numbering
- [ ] `paste` — merge lines
- [ ] `column` — column formatting
- [ ] `shuf` — shuffle lines
- [ ] `pr` — pagination (if implemented)
- [ ] `fold` — wrap lines
- [ ] `expand` / `unexpand` — tab conversion
- [ ] `fmt` — text formatting
- [ ] `strings` — extract strings
- [ ] `comm` — compare sorted files
- [ ] `csplit` — split by context (implement first)
- [ ] `split` — split files
- [ ] `cut` — field extraction (verify coverage)
- [ ] `tr` — character translation (verify coverage)
- [ ] `sort` — sorting (verify coverage)
- [ ] `uniq` — unique lines (verify coverage)
- [ ] `diff` — file comparison

### New: tests/commands-compress.test.ts
- [ ] `gzip` / `gunzip` — basic compression
- [ ] `bzip2` / `bunzip2` — basic compression
- [ ] `zip` / `unzip` — archive operations
- [ ] `tar` — create, extract, list

### New: tests/commands-proc.test.ts
- [ ] `top` — process listing
- [ ] `nice` — priority setting
- [ ] `nohup` — background persistence
- [ ] `pgrep` / `pkill` — process search/kill
- [ ] `wait` — job completion
- [ ] `kill` — signal sending
- [ ] `lsof` — open files listing
- [ ] `strace` — syscall tracing
- [ ] `ps` — process listing
- [ ] `jobs` / `bg` / `fg` — job control

### New: tests/commands-hash.test.ts
- [ ] `md5sum` — checksum generation/verification
- [ ] `sha256sum` — checksum generation/verification

## Acceptance Criteria

- Each command listed above has at least 2-3 tests (nominal case + edge case)
- Tests pass sequentially (`bun run test`)
- Line coverage > 80% for each command file
- No flaky tests (timeout > 5s)

## Notes

- Use the existing `createTestEnv` + `SshClient` pattern
- Prefer `runCmd()` for integration tests
- For interactive commands (nano), use mocks
- See `tests/test-helper.ts` for available helpers
- Desktop tests (startxfce4, thunar, mousepad) only run in a browser → mark as skip in Node.js CI
