# Task: Shell POSIX compliance

**Priority:** P1
**Estimated effort:** 2 weeks
**Dependencies:** None

## Context

The shell interpreter covers common patterns but is not POSIX-compliant. This is a compatibility risk for user shell scripts. Full compliance is a project goal.

## Subtasks

### 1. Parser — POSIX fixes
- [ ] `$((expr))` — support full POSIX operators (+, -, *, /, %, <<, >>, &, |, ^, ~, &&, ||, relationals, ternary)
- [ ] `${var:-word}`, `${var:=word}`, `${var:?word}`, `${var:+word}` — verify all expansion cases
- [ ] `${var%pattern}`, `${var%%pattern}`, `${var#pattern}`, `${var##pattern}` — edge cases with special characters
- [ ] `${var/pattern/replace}` — support glob patterns, not just literal strings
- [ ] `export` — support `export -n`, `export -p`, `export name=value name2=value2`
- [ ] `readonly` — same support as export
- [ ] `set` — support `set -o option`, `set +o option`, `set -- args`
- [ ] `unset` — support `unset -f name` (unset function), `unset -v name` (unset variable)

### 2. Shell functions
- [ ] POSIX functions: `name() { body; }` — already supported
- [ ] `function name { body; }` — bash extension (already supported?)
- [ ] POSIX local variables: `local` keyword (not POSIX but ubiquitous)
- [ ] `return` in functions with numeric value
- [ ] Exported functions via `export -f` (bash extension)

### 3. Tests `[ ]` and `[[ ]]`
- [ ] Complete POSIX operators for `test` / `[ ]`:
  - [ ] `-b file`, `-c file`, `-g file`, `-k file`, `-p file`, `-S file`, `-t fd`
  - [ ] `file1 -nt file2`, `file1 -ot file2`, `file1 -ef file2`
  - [ ] `-o option` (shell option set?)
  - [ ] `-v var` (variable set?)
  - [ ] `-R var` (name reference?)
- [ ] `[[ ]]` extended tests (bash extension):
  - [ ] `=~` regex matching
  - [ ] `<` `>` string comparison (locale-aware)
  - [ ] `&&` `||` inside `[[ ]]`

### 4. Expansion and globbing
- [ ] `~` tilde expansion: `~user`, `~+`, `~-`
- [ ] Full POSIX globbing: `?`, `*`, `[abc]`, `[!abc]`, `[a-z]`
- [ ] `extglob` bash: `?(...)`, `*(...)`, `+(...)`, `@(...)`, `!(...)`
- [ ] `GLOBIGNORE` / `FIGNORE`
- [ ] `nullglob`, `failglob`, `dotglob` options
- [ ] Brace expansion: `{a..z}` ranges, `{a,b}{c,d}` nesting
- [ ] Process substitution: `<(cmd)`, `>(cmd)` (bash/zsh)

### 5. Redirections
- [ ] `<>` read-write redirection
- [ ] `&>`, `|&` (bash: redirect both stdout and stderr)
- [ ] Here-string `<<< word`
- [ ] Here-doc with `<<-` (tab stripping)
- [ ] `/dev/tcp/host/port`, `/dev/udp/host/port` (bash extension)
- [ ] Co-process `|&` (bash 4.0)

### 6. Signal trapping and jobs
- [ ] `trap 'cmd' SIGNAL` — verify all POSIX signals
- [ ] `trap - SIGNAL` — reset
- [ ] `trap -p` — display active traps
- [ ] Job control: `fg`, `bg`, `kill %jobspec`
- [ ] `wait -n`, `wait -p` (bash 5.1+)

### 7. Missing builtins
- [ ] `type -a`, `type -t`, `type -p`
- [ ] `command -v`, `command -V`
- [ ] `builtin` — run a builtin even if a function with the same name exists
- [ ] `hash` — PATH cache
- [ ] `shopt` — bash options
- [ ] `caller` — stack trace
- [ ] `printf` — verify complete (already partial)
- [ ] `read -d`, `read -n`, `read -s`, `read -t`, `read -a` (array)

### 8. Special variables
- [ ] `$-` — active flags
- [ ] `$_` — last argument of previous command
- [ ] `$BASH_*`, `$POSIXLY_CORRECT`
- [ ] `$EPOCHREALTIME`, `$EPOCHSECONDS`
- [ ] `$BASHPID` — current subshell PID
- [ ] `$PIPESTATUS` — exit codes of all pipes

### 9. Shell options
- [ ] `set -o pipefail` — pipe exit code = last non-zero
- [ ] `set -o nounset` — error on undefined variable
- [ ] `set -o noclobber` — don't overwrite files with `>`
- [ ] `set -o errexit` — exit on error
- [ ] `set -o xtrace` — debug output
- [ ] `shopt -s extdebug` — extended debug mode

## Acceptance Criteria

- A reference POSIX test suite (from POSIX.1-2024) passes > 90%
- Existing user shell scripts continue to work (no regression)
- `bash --posix` and the virtual shell produce the same results on a 50-script benchmark
- Known POSIX deviations are documented

## Notes

- Parser is in `src/modules/VirtualShell/shellParser.ts`
- Expansions are in `src/utils/expand.ts`
- Builtins are in `src/commands/` (echo, export, set, etc.)
- Test framework `tests/expand.test.ts` can serve as a model
- Don't pursue 100% compliance if it breaks existing features — document deviations
- Prioritize the most used builtins and expansions
