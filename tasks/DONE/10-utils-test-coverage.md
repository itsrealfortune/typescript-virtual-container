# Task: Utils — unit tests

**Priority:** P3
**Estimated effort:** 3 days
**Dependencies:** None

## Context

Several utilities in `src/utils/` have no direct tests:

| File | Lines | Risk |
|---|---|---|
| `shellSession.ts` | ~80 | Low |
| `argv.ts` | ~120 | Low |
| `keyToBytes.ts` | ~60 | Low |
| `perfLogger.ts` | ~80 | Low |
| `tokenize.ts` | ~200 | Medium |
| `glob.ts` | ~150 | Medium |
| `vfsDiff.ts` | 275 | Low |
| `expand.ts` | 664 | Existing (`tests/expand.test.ts`)

## Subtasks

### 1. tokenize.ts (31 tests)
- [x] Simple tokenization: `echo hello world`
- [x] Quotes: `echo "hello world"`, `echo 'it\'s'`
- [x] Escaping: `echo hello\ world` (backslash kept literal — tokenizer limitation)
- [x] Pipes and redirections: `cat file | grep foo > out`
- [x] Variables in quotes: `'$HOME'`, `"$HOME"`
- [x] Logical operators: `cmd1 && cmd2`, `cmd1 || cmd2`
- [x] Subshell: `(cmd1; cmd2)` (parens kept as token content)
- [x] Background: `cmd &`
- [x] Heredoc: `cat << EOF ... EOF`, `<<-`, `<<<`

### 2. glob.ts (21 tests)
- [x] `*` match
- [x] `?` match
- [x] `[abc]` character class
- [x] `[!abc]` negated character class
- [x] `**` recursive match
- [x] Extglob: `@(a|b)`, `?(a)`, `*(pat)`, `+(pat)`
- [x] `shellGlobToRegex` prefix/suffix/none/greedy modes

### 3. argv.ts (13 tests)
- [x] `getFlag()` — boolean flags
- [x] `getOptionString()` — string options with fallback
- [x] `getOptionInt()` — integer options with defaults
- [x] Mixed args: `--name VALUE` and `--name=VALUE` forms
- [x] Flags before positional args
- [x] Unparseable value returns NaN

### 4. vfsDiff.ts (17 tests)
- [x] File addition detected
- [x] File modification detected
- [x] File deletion detected
- [x] Permission change detected
- [x] Identical snapshots → empty diff
- [x] `formatDiff` output formatting (+, -, ~, summary)
- [x] `assertDiff` expectation matching

### 5. keyToBytes.ts (21 tests)
- [x] Control characters: Ctrl+A..Z, Ctrl+[, Ctrl+Backspace
- [x] Alt+key combos
- [x] Arrow keys, Home, End, PageUp, PageDown
- [x] Function keys: F1-F4
- [x] Special keys: Enter, Tab, Escape, Backspace, Delete, Insert
- [x] Regular characters
- [x] Unknown keys and meta combos return null

### 6. perfLogger.ts (5 tests)
- [x] Disabled by default (DEV_MODE not set)
- [x] `mark` and `done` are no-ops when disabled
- [x] Multiple marks don't throw

### 7. shellSession.ts (8 tests)
- [x] `loadHistory` creates file if missing
- [x] `loadHistory` returns lines, filters empty
- [x] `loadHistory` works for non-root user paths
- [x] `saveHistory` writes entries
- [x] `saveHistory` empty array writes empty file
- [x] `listPathCompletions` returns sorted matches
- [x] `listPathCompletions` hides/shows dot-files
- [x] `listPathCompletions` appends `/` for directories

## Acceptance Criteria

- Each `src/utils/*.ts` file has coverage > 85%
- Tests are fast (< 100ms total)
- No regression on existing `expand.test.ts`

## Notes

- These are pure tests (no VFS or VirtualShell needed)
- Follow the `tests/expand.test.ts` pattern as a model
- Use `import { x } from "../src/utils/x"` directly
- See `tests/command-helpers.test.ts` for an argv test model
