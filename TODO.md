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

## Remaining / Future

- [ ] Add @example tags to command modules (110+ files) — low priority, commands are self-documenting via usage strings
- [ ] Consider exporting startShell from index.ts if consumers need custom shell sessions
- [ ] Add JSDoc to internal types (InternalDirectoryNode, InternalFileNode, etc.) if they become public
