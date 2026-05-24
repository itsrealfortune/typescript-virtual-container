# Task: Stubs and miscellaneous fixes

**Priority:** P3
**Estimated effort:** 2 days
**Dependencies:** None

## Context

Several commands are registered but return "not implemented" or are stubs. Other minor features are incomplete.

## Subtasks

### 1. csplit — stub → implementation
- [ ] Implement `csplit` (split by context regex)
- [ ] Basic support: `/regex/`, `%regex%`, `{N}` repetitions
- [ ] `-f` prefix, `-n` digits, `-s` silent, `-k` keep files
- [ ] Tests

### 2. split — verify completeness
- [ ] Verify that `split` works (split by lines, bytes)
- [ ] `-l`, `-b`, `-d`, `--additional-suffix`
- [ ] Tests if missing

### 3. printf — verify completeness
- [ ] Support formats: `%s`, `%d`, `%f`, `%x`, `%o`
- [ ] Support escape sequences: `\n`, `\t`, `\r`, `\\`, `\0NNN`, `\xHH`
- [ ] `-v var` (assign to variable)
- [ ] Tests

### 4. read — verify completeness
- [ ] `-p prompt` (interactive prompt)
- [ ] `-t timeout` (timeout)
- [ ] `-n nchars` (character count)
- [ ] `-s` (silent, for passwords)
- [ ] `-a array` (read into array)
- [ ] `-d delim` (custom delimiter)

### 5. Commands missing aliases that should have them
- [ ] `grep` should also accept `egrep` / `fgrep` (GNU behavior)
- [ ] `cp` should have `cp -i` (interactive)
- [ ] `mv` should have `mv -i` (interactive)
- [ ] `rm` should have `rm -I` (interactive once)
- [ ] Check stubs in `src/commands/textutils.ts` (csplit, comm, etc.)

### 6. Optional dependencies — graceful degradation
- [ ] If `fflate` is unavailable, `zip`/`unzip`/`gzip` should give a clear message
- [ ] If `node:crypto` is polyfilled, document the limitations

### 7. docs/ — cleaner scripts in examples
- [ ] Update `@example` JSDoc in classes to reflect the current API
- [ ] Verify links in docs point to valid paths

## Acceptance Criteria

- `csplit` no longer shows "not implemented"
- All builtins have documented and consistent behavior
- Error messages are helpful and follow GNU format: `cmd: error: description`

## Notes

- See `src/commands/textutils.ts` for `csplit`
- See `src/commands/coreutils.ts` for `split`, `printf`
- See `src/commands/shift.ts` for `read`
- See `src/commands/registry.ts` for the full list
