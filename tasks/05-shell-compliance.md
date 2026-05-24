# Task: Shell POSIX compliance

**Priority:** P1
**Estimated effort:** 2 weeks
**Dependencies:** None

## Context

The shell interpreter covers common patterns but is not POSIX-compliant. This is a compatibility risk for user shell scripts. Full compliance is a project goal.

## Subtasks

### 1. Parser — POSIX fixes
- [x] `$((expr))` — support full POSIX operators (+, -, *, /, %, <<, >>, &, |, ^, ~, &&, ||, relationals, ternary)
- [x] `${var:-word}`, `${var:=word}`, `${var:?word}`, `${var:+word}` — verify all expansion cases
- [x] `${var%pattern}`, `${var%%pattern}`, `${var#pattern}`, `${var##pattern}` — edge cases with special characters
- [x] `${var/pattern/replace}` — support glob patterns, not just literal strings
- [x] `export` — support `export -n`, `export -p`, `export name=value name2=value2`
- [x] `readonly` — same support as export
- [x] `set` — support `set -o option`, `set +o option`, `set -- args`
- [x] `unset` — support `unset -f name` (unset function), `unset -v name` (unset variable)

### 2. Shell functions
- [x] POSIX functions: `name() { body; }` — already supported
- [x] `function name { body; }` — bash extension (already supported?)
- [x] POSIX local variables: `local` keyword (not POSIX but ubiquitous)
- [x] `return` in functions with numeric value
- [x] Exported functions via `export -f` (bash extension)

### 3. Tests `[ ]` and `[[ ]]`
- [x] Complete POSIX operators for `test` / `[ ]`:
  - [x] `-b file`, `-c file`, `-g file`, `-k file`, `-p file`, `-S file`, `-t fd`
  - [x] `file1 -nt file2`, `file1 -ot file2`, `file1 -ef file2`
  - [x] `-o option` (shell option set?)
  - [x] `-v var` (variable set?)
  - [x] `-R var` (name reference?)
- [x] `[[ ]]` extended tests (bash extension):
  - [x] `=~` regex matching
  - [x] `<` `>` string comparison (locale-aware)
  - [x] `&&` `||` inside `[[ ]]`

### 4. Expansion and globbing
- [x] `~` tilde expansion: `~user`, `~+`, `~-`
- [x] Full POSIX globbing: `?`, `*`, `[abc]`, `[!abc]`, `[a-z]`
- [x] `extglob` bash: `?(...)`, `*(...)`, `+(...)`, `@(...)`, `!(...)`
- ~~[ ] `GLOBIGNORE` / `FIGNORE`~~ (bash extension, non-POSIX)
- [x] `nullglob`, `failglob`, `dotglob` options
- [x] Brace expansion: `{a..z}` ranges, `{a,b}{c,d}` nesting
- ~~[ ] Process substitution: `<(cmd)`, `>(cmd)` (bash/zsh)~~

### 5. Redirections
- [x] `<>` read-write redirection
- [x] `&>`, `|&` (bash: redirect both stdout and stderr)
- [x] Here-string `<<< word`
- [x] Here-doc with `<<-` (tab stripping)
- ~~[ ] `/dev/tcp/host/port`, `/dev/udp/host/port` (bash extension)~~
- ~~[ ] Co-process `|&` (bash 4.0) — same as `|&` above, covered~~

### 6. Signal trapping and jobs
- [x] `trap 'cmd' SIGNAL` — verify all POSIX signals
- [x] `trap - SIGNAL` — reset
- [x] `trap -p` — display active traps
- [x] Job control: `fg`, `bg`, `kill %jobspec`
- [x] `wait -n` (bash 5.1+); ~~`wait -p`~~ (bash 5.1+, non-POSIX)

### 7. Missing builtins
- [x] `type -a`, `type -t`, `type -p`
- [x] `command -v`, `command -V` (+ command execution sans fonctions)
- [x] `builtin` — run a builtin even if a function with the same name exists
- [x] `hash` — PATH cache
- [x] `shopt` — bash options
- [x] `caller` — stack trace
- [ ] `printf` — verify complete (already partial)
- [x] `read -d`, `read -n`, `read -s`, `read -t`, `read -a` (array)

### 8. Special variables
- [x] `$-` — active flags
- [x] `$_` — last argument of previous command (expansion via `__lastarg`)
- ~~[ ] `$BASH_*`, `$POSIXLY_CORRECT`~~ (bash-specific)
- [x] `$EPOCHREALTIME`, `$EPOCHSECONDS`
- [x] `$BASHPID` — current subshell PID
- [x] `$PIPESTATUS` — exit codes of all pipes

### 9. Shell options
- [x] `set -o pipefail` — pipe exit code = last non-zero
- [x] `set -o nounset` — error on undefined variable
- [x] `set -o noclobber` — don't overwrite files with `>`
- [x] `set -o errexit` — exit on error
- [x] `set -o xtrace` — debug output
- [x] `shopt -s extdebug` — extended debug mode

## Acceptance Criteria

- [ ] A reference POSIX test suite (from POSIX.1-2024) passes > 90% — *not run yet*
- [x] Existing user shell scripts continue to work (no regression) — *tests pass*
- [ ] `bash --posix` and the virtual shell produce the same results on a 50-script benchmark — *not run yet*
- [x] Known POSIX deviations are documented — *documented in this file (strikethrough items)*

## Notes

- Parser is in `src/modules/VirtualShell/shellParser.ts`
- Expansions are in `src/utils/expand.ts`
- Builtins are in `src/commands/` (echo, export, set, etc.)
- Test framework `tests/expand.test.ts` can serve as a model
- Don't pursue 100% compliance if it breaks existing features — document deviations
- Prioritize the most used builtins and expansions
