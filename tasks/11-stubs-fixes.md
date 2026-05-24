# Task: Stubs and miscellaneous fixes

**Priority:** P3
**Estimated effort:** 2 days
**Dependencies:** None
**Status:** ✅ Complete

## Context

Several commands are registered but return "not implemented" or are stubs. Other minor features are incomplete.

## Subtasks

### 1. csplit — stub → implementation
- [x] Implement `csplit` (split by context regex)
- [x] Basic support: `/regex/`, `%regex%`, `{N}` repetitions, line numbers
- [x] `-f` prefix, `-n` digits, `-s` silent, `-k` (parsed, always-on)
- [x] 6 tests

### 2. split — add missing flags
- [x] `-l` (lines), `-b` (bytes) — already working
- [x] `-d` (numeric suffixes)
- [x] `--additional-suffix`
- [x] 4 tests

### 3. printf — add -v var
- [x] Formats: `%s`, `%d`, `%i`, `%f`, `%o`, `%x`, `%X` — already working
- [x] Escapes: `\n`, `\t`, `\r`, `\\`, `\a`, `\b`, `\f`, `\v` — already working
- [x] `-v var` (assign to variable)
- [x] 2 tests

### 4. read — already complete
- [x] `-p prompt`, `-t timeout`, `-n nchars`, `-s`, `-a array`, `-d delim` — all working
- [x] Fixed bug: `-a array` loop overwriting `[0]` — loop now starts at index 1
- [x] 5 tests

### 5. Commands missing aliases
- [x] `grep` → aliases: `egrep` / `fgrep`
- [x] `cp -i` (interactive prompt before overwrite)
- [x] `mv -i` (interactive prompt before overwrite)
- [x] `rm -I` (interactive once — prompts for >3 files or recursive)
- [x] Checked stubs: `comm` and `join` are already implemented (not stubs)

### 6. Optional dependencies — graceful degradation
- [x] `zip.ts` / `unzip.ts`: lazy fflate import with try/catch, clear error message if missing

### 7. docs/ — cleaner scripts in examples
- [ ] (deferred) Update `@example` JSDoc in classes — minor, no functional impact

## Acceptance Criteria

- [x] `csplit` no longer shows "not implemented" — now splits by regex/line patterns
- [x] All builtins have documented and consistent behavior
- [x] Error messages follow GNU format: `cmd: error: description`

## Files Changed

| File | Change |
|------|--------|
| `src/commands/textutils.ts` | Implemented `csplitCommand`; added `-d`/`--additional-suffix` to `splitCommand` |
| `src/commands/printf.ts` | Added `-v var` flag |
| `src/commands/read.ts` | Fixed `-a array` overwrite bug |
| `src/commands/grep.ts` | Added `egrep`/`fgrep` aliases |
| `src/commands/cp.ts` | Added `-i` interactive overwrite prompt |
| `src/commands/mv.ts` | Added `-i` interactive overwrite prompt |
| `src/commands/rm.ts` | Added `-I` interactive-once flag |
| `src/commands/zip.ts` | Graceful fflate degradation with lazy import |
| `tests/stubs-fixes.test.ts` | 24 new tests covering all changes |
