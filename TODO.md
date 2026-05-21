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
- [x] Regenerate wiki (87 files, 3769 new lines)
- [x] Run `bun publish-doc` — TypeDoc HTML + wiki pushed to remote
- [x] All 777 tests pass

## Remaining / Future

- [ ] Add @example tags to remaining complex APIs (VirtualSwitch, VirtualNetworkManager, VirtualUserManager)
- [ ] Add file-level JSDoc to modules missing it (shellInteractive, shellRuntime, desktopManager, thunarManager, linuxRootfs, neofetch, pacmanGame, webTermRenderer, commands/*)
- [ ] Add @example tags to command modules (110+ files)
- [ ] Consider exporting startShell and NanoEditorSession types from index.ts if needed by consumers
- [ ] Add JSDoc to internal types (InternalDirectoryNode, InternalFileNode, etc.) if they become public
