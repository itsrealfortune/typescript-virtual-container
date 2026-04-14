# Changelog

All notable changes to this project are documented in this file.

The format is based on Keep a Changelog.

## [Unreleased]

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
