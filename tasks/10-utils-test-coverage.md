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

### 1. tokenize.ts
- [ ] Simple tokenization: `echo hello world`
- [ ] Quotes: `echo "hello world"`, `echo 'it\'s'`
- [ ] Escaping: `echo hello\ world`
- [ ] Pipes and redirections: `cat file | grep foo > out`
- [ ] Variables: `echo $HOME`, `echo ${VAR:-default}`
- [ ] Logical operators: `cmd1 && cmd2`, `cmd1 || cmd2`
- [ ] Subshell: `(cmd1; cmd2)`
- [ ] Background: `cmd &`
- [ ] Heredoc: `cat << EOF ... EOF`

### 2. glob.ts
- [ ] `*` match
- [ ] `?` match
- [ ] `[abc]` character class
- [ ] `[!abc]` negated character class
- [ ] `**` recursive match
- [ ] `{a,b}` brace expansion in glob
- [ ] Edge cases: hidden files (`.` prefix), empty pattern

### 3. argv.ts
- [ ] `getFlag()` — boolean flags
- [ ] `getOption()` — string options
- [ ] `getOptionInt()` — integer options with defaults
- [ ] Mixed flags and options
- [ ] `--` terminator
- [ ] Combined short flags: `-abc`

### 4. vfsDiff.ts
- [ ] File addition detected
- [ ] File modification detected
- [ ] File deletion detected
- [ ] Permission change detected
- [ ] Identical snapshots → empty diff

### 5. keyToBytes.ts
- [ ] RSA key conversion OpenSSH format → Buffer
- [ ] Ed25519 key conversion OpenSSH format → Buffer
- [ ] Error handling: invalid format

### 6. perfLogger.ts
- [ ] Mark and measure
- [ ] Clear
- [ ] Empty entries
- [ ] Multiple entries

### 7. shellSession.ts
- [ ] Session serialization
- [ ] Deserialization
- [ ] Valid and invalid states

## Acceptance Criteria

- Each `src/utils/*.ts` file has coverage > 85%
- Tests are fast (< 100ms total)
- No regression on existing `expand.test.ts`

## Notes

- These are pure tests (no VFS or VirtualShell needed)
- Follow the `tests/expand.test.ts` pattern as a model
- Use `import { x } from "../src/utils/x"` directly
- See `tests/command-helpers.test.ts` for an argv test model
