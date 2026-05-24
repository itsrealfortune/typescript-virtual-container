# Task: Test Coverage — critical modules

**Priority:** P0
**Estimated effort:** 1 week
**Dependencies:** None

## Context

Several critical modules have very low or zero coverage:

| Module | Lines | Current Coverage | Risk |
|---|---|---|---|
| `SSHMimic/index.ts` | 356 | ~10% | High — entry point for all SSH traffic |
| `SSHMimic/scp.ts` | 375 | ~2% | High — transfer protocol |
| `SSHMimic/hostKey.ts` | ~50 | 0% | Medium — key generation |
| `SSHMimic/prompt.ts` | ~40 | ~3% | Low — prompt formatting |
| `SSHMimic/loginFormat.ts` | ~30 | 0% | Low — login messages |
| `SSHMimic/loginBanner.ts` | ~30 | 0% | Low — banner |
| `Honeypot/index.ts` | 543 | ~5% | High — security auditing |
| `desktopManager.ts` | 1574 | 0% | High — all desktop logic |
| `thunarManager.ts` | ~300 | 0% | Medium — file manager |
| `pacmanGame.ts` | 733 | ~1% | Low — game |
| `nanoEditor.ts` | 1025 | ~7% | Medium — editor |
| `VirtualProxy.ts` | 198 | 0% | Medium — proxy/SOCKS5 |
| `VirtualVpn/index.ts` | ~200 | 0% | Medium — VPN |
| `VirtualVpn/crypto.ts` | ~80 | 0% | Medium — encryption |
| `shellRuntime.ts` | ~100 | 0% | Medium — runtime helpers |
| `shellInteractive.ts` | ~200 | 0% | Medium — interactive shell |
| `webTermRenderer.ts` | 362 | 0% | Low — web renderer |

## Subtasks

### 1. SSHMimic — scp.ts
- [ ] Test file reception (scp -> virtual)
- [ ] Test file upload (virtual -> scp)
- [ ] Test absolute/relative paths
- [ ] Test permissions
- [ ] Test errors (missing file, insufficient permissions)

### 2. SSHMimic — hostKey.ts
- [ ] Test RSA key generation
- [ ] Test Ed25519 key generation
- [ ] Test existing key reloading
- [ ] Test fallback when `ssh2` is unavailable

### 3. SSHMimic — index.ts
- [ ] Test server start/stop
- [ ] Test password authentication
- [ ] Test public-key authentication
- [ ] Test rate limiting
- [ ] Test IP lockout
- [ ] Test events (connection, error, close)

### 4. Honeypot/index.ts
- [ ] Test auth event capture
- [ ] Test executed command tracking
- [ ] Test file access logging
- [ ] Test aggregated statistics
- [ ] Test JSON serialization
- [ ] Test clearLog()

### 5. desktopManager.ts
- [ ] Test window creation
- [ ] Test focus management
- [ ] Test dragging
- [ ] Test resize
- [ ] Test minimize/maximize
- [ ] Test close
- [ ] Test localStorage persistence
- [ ] Test session restoration

### 6. thunarManager.ts
- [ ] Test folder navigation
- [ ] Test drag-and-drop
- [ ] Test context menu
- [ ] Test rename
- [ ] Test trash

### 7. VirtualProxy.ts
- [ ] Test port forwarding
- [ ] Test SOCKS5 proxy
- [ ] Test DNS resolution
- [ ] Test connection close

### 8. VirtualVpn/
- [ ] Test key derivation
- [ ] Test encryption/decryption
- [ ] Test tunnel establishment
- [ ] Test data transfer

## Acceptance Criteria

- Each critical module has line coverage > 60%
- SSHMimic tests don't require a real SSH server (mocking)
- Honeypot tests verify log integrity
- Desktop tests use a DOM mock (jsdom or similar, or skip outside browser)

## Notes

- `SSHMimic/` and `Honeypot/` are testable with `ssh2` mocks — no real socket needed
- Desktop modules only run in a browser → headless test framework (Playwright) or conditional skip
- `VirtualProxy` and `VirtualVpn` can be tested with local TCP connections
