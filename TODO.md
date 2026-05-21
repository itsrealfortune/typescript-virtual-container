
# TODO — typescript-virtual-container

## Done

- [x] Remove `wiki` from `.gitignore` — wiki content now tracked
- [x] Add wiki reference to README.md
- [x] JSDoc audit across 179 TypeScript files
- [x] Add JSDoc to Baie class (VirtualSwitch.ts) — class + all methods + @example
- [x] Add JSDoc to startShell function (VirtualShell/shell.ts) — 8 params documented
- [x] Add JSDoc to NanoEditor class (nanoEditor.ts) — class + 3 public methods + options interface
- [x] Add JSDoc to SftpMimic class (SSHMimic/sftp.ts) — class + start/stop/getVfs/getUsers
- [x] Fix 50+ lazy @param/@returns in VirtualFileSystem/index.ts
- [x] Fix 18 lazy @param/@returns in VirtualSwitch.ts
- [x] Fix 20+ lazy @param/@returns in VirtualUserManager/index.ts
- [x] Fix lazy @param/@returns in VirtualNetworkManager.ts
- [x] Fix lazy @param/@returns in Honeypot/index.ts
- [x] Add JSDoc to sessionManager.ts (3 exported functions)
- [x] Add JSDoc to VirtualShell/shellParser.ts functions
- [x] Add JSDoc to VirtualVpn.ts helper functions (deriveKey, encrypt, decrypt)
- [x] Strip JSDoc from private methods (keep only public API documented)
- [x] Expand index.ts with 40+ missing public API exports
- [x] Add @example to VirtualSwitch (attach, DNS, routing, traffic shaping, partitions)
- [x] Add @example to VirtualNetworkManager (interfaces, routes, firewall, ping)
- [x] Add @example to VirtualUserManager (users, processes, sessions, sudo)
- [x] Add file-level JSDoc to shellInteractive.ts
- [x] Add file-level JSDoc to shellRuntime.ts
- [x] Add file-level JSDoc to desktopManager.ts
- [x] Add file-level JSDoc to thunarManager.ts
- [x] Add file-level JSDoc to neofetch.ts
- [x] Add file-level JSDoc to pacmanGame.ts
- [x] linuxRootfs.ts and webTermRenderer.ts already had file-level JSDoc
- [x] Regenerate wiki (enriched with examples and file docs)
- [x] Run `bun publish-doc` — TypeDoc HTML + wiki pushed to remote
- [x] All 777 tests pass
- [x] Add @example to HoneyPot, SshMimic, PacmanGame, WebTermRenderer, DesktopManager
- [x] Add class-level JSDoc + constructor to IdleManager, WebTermRenderer, DesktopManager, ThunarManager, NanoEditor, PacmanGame
- [x] Add JSDoc to all public methods: DesktopManager (16), WebTermRenderer (7), PacmanGame (3), ThunarManager (1), VirtualShell (3)
- [x] Fix 50+ lazy @param/@returns in permissions.ts, binaryPack.ts, scp.ts, hostKey.ts, loginBanner.ts, exec.ts, sysctl.ts, neofetch.ts, Honeypot
- [x] Add file-level JSDoc to 13 utility modules (glob, keyToBytes, shellSession, perfLogger, commands/helpers, commands/command-helpers, VirtualPackageManager, SSHClient, exec, hostKey, loginBanner, scp, neofetch)
- [x] Add @param/@returns to linuxRootfs (syncEtcPasswd, refreshProc)
- [x] 14/14 exported classes now have @example in generated docs
- [x] Uniformized JSDoc style across all exported modules

## Remaining / Future

- [ ] Consider exporting startShell from index.ts if consumers need custom shell sessions (means: add `export { startShell }` to index.ts so external code can create raw shell sessions without going through SshClient)
- [ ] Add JSDoc to internal types (InternalDirectoryNode, InternalFileNode, etc.) if they become public
