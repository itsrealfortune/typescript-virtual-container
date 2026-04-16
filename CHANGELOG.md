# Changelog

All notable changes to this project are documented in this file.

The format is based on Keep a Changelog.

## [Unreleased]

## [1.1.4] - 2026-04-16

### Added

- New SFTP server implementation (`SftpMimic`), exported as `VirtualSftpServer`.
- SFTP handlers for file/directory operations: `OPEN`, `READ`, `WRITE`, `FSTAT`, `CLOSE`, `OPENDIR`, `READDIR`, `STAT`, `LSTAT`, `SETSTAT`, `FSETSTAT`, `REALPATH`, `MKDIR`, `RMDIR`, `REMOVE`, `RENAME`.
- Home-directory confinement for SFTP sessions (`/home/<user>`) with path traversal blocking.
- Keyboard-interactive authentication support in SFTP in addition to password auth.
- Standalone runtime now starts both SSH and SFTP servers with a shared `VirtualShell`.
- New SFTP test suite covering authentication, read/write flows, system-user login, and traversal protection.

### Changed

- `VirtualFileSystem` mirror strategy now uses `.vfs/mirror` directory storage as the persistence boundary.
- SSH and SFTP startup now explicitly wait for full shell/user initialization before accepting connections.
- SFTP `start()` returns the actual bound port (including when configured with port `0`).
- Relative SFTP request paths are resolved from the authenticated user home.
- `VirtualUserManager.initialize()` auto-creates the current system user (`$USER` / `$USERNAME`) for easier local auth flows.

### Fixed

- Added stronger error handling/logging for SFTP client/session/stream lifecycle events.
- Fixed flaky SFTP tests by isolating each test run with temporary VFS base paths and deterministic cleanup.
- Fixed `ssh-exec` test timeout by resolving the mocked exec stream completion correctly.

## [1.0.6...1.0.8] - 2026-04-15

Too much refactor to list.

## [1.0.5] - 2026-04-15

### Changed

- Refactored commands to use shared argument/flag parsing helpers.
- Improved maintainability and consistency of argument parsing across commands.

### Fixed

- Verified all refactored commands pass existing test cases without regressions.

## [1.0.4] - 2026-04-15

### Added

- Shell pipeline parser and executor with support for:
  - Pipes (`|`)
  - Input redirection (`<`)
  - Output redirection (`>`)
  - Append redirection (`>>`)
- New built-in commands:
  - `echo`
  - `grep`
  - `set`
  - `env`
  - `export`
  - `unset`
  - `sh` (with `bash` alias)
- Command stdin support in runtime context so commands can consume piped input.

### Changed

- Argument parsing now respects quoted strings, including for commands like `sh -c "echo hi"`.
- `echo` now expands environment variables (`$VAR`) and can read from stdin when no explicit text argument is provided.
- `grep` now supports stdin input (e.g. `ls | grep ".txt"`) in addition to file operands.

### Fixed

- Relative file paths in redirections are now resolved from current working directory during pipeline execution.
  - Example fixed behavior: `echo hi > cat.txt` writes to `./cat.txt` in current virtual directory.
- Pipeline chaining now correctly passes command stdout as stdin to next command.

## [1.0.2] - 2026-04-14

### Added

- Governance and community files:
  - LICENSE
  - CONTRIBUTING.md
  - SECURITY.md
  - CODE_OF_CONDUCT.md
  - GitHub issue and PR templates
- Security hardening for virtual auth storage and shell access:
  - Non-root commands now block access to `/virtual-env-js/.auth/**`.
  - Auth files are persisted with restrictive modes (`0700` for `.auth`, `0600` for `htpasswd` and `sudoers`).
  - Root password no longer falls back to a fixed default when `SSH_MIMIC_ROOT_PASSWORD` is unset; startup generates an ephemeral password instead.
- New environment toggle `SSH_MIMIC_AUTO_SUDO_NEW_USERS` to control whether newly created users are added to sudoers by default.
- README and security docs now describe the new auth hardening and configuration flags.
- Added tests covering `.auth` path protection and auto-sudo behavior.

## [1.0.1] - 2026-04-14

### Added

- `ls -l` / `ls --long` support with long listing format (permissions, size, updated time).
- Host-command mirroring for network tools:
  - `curl` now runs through host `curl` via `child_process`.
  - `wget` now runs through host `wget` via `child_process`.
- Temporary host download flow for `wget` using `/tmp` before import into VFS.
- Terminal line normalization utility for command help and diagnostics rendering.

### Changed

- `curl` behavior is now aligned with the host binary output and exit codes.
- `curl -o` writes host command output to the virtual filesystem target path.
- `wget` writes downloaded payloads to VFS after host-side transfer, preserving command semantics.
- URL fetch helper now accepts host-only inputs by normalizing missing protocol to `http://`.
- Auto pull-request GitHub workflow now targets any non-`main` branch instead of only `dev`.
- Auto PR metadata now uses the dynamic source branch name in PR head/title/body.
- Test workflow trigger scope was generalized by removing hardcoded branch filters.

### Fixed

- Resolved large horizontal spacing artifacts in SSH terminal output by normalizing TTY line endings (`\r\n`) in both interactive shell and exec paths.
- Reduced excessive whitespace in help output rendering (`curl --help`, `wget --help`) by normalizing tabs and over-padded spacing.

## [1.0.0] - 2026-04-14

### Added

- In-memory SSH server with password authentication.
- Virtual filesystem with optional compression and tar.gz persistence.
- Virtual user management with sudoers and session tracking.
- Programmatic SshClient API.
- 20+ built-in shell commands.
- TypeScript-first API with exported types and JSDoc.
