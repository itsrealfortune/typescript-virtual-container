# Task: Infrastructure — standard snapshot format

**Priority:** P2
**Estimated effort:** 2 weeks
**Dependencies:** None

## Context

The VFSB format (`.vfsb`) is proprietary. No other tool can read it. The goal is to evolve toward a standard format like squashfs for interoperability.

## Subtasks

### 1. Analysis and backward compatibility
- [ ] Document the current VFSB format (magic bytes `VFS!`, versioning, opcodes)
- [ ] List all VFSB features that must survive migration
- [ ] Decide on strategy: parallel support (VFSB + new format) or migration

### 2. Squashfs read support
- [ ] Implement a squashfs parser in TypeScript (no native dependency)
- [ ] Support gzip/zstd compression (optional)
- [ ] Read inodes, files, directories, symlinks
- [ ] Import content into the internal VFS

### 3. Squashfs write support — optional
- [ ] Generate squashfs images from the VFS
- [ ] Support extended attributes if relevant
- [ ] Configurable compression

### 4. Tar format as lightweight alternative
- [ ] Export VFS as POSIX tar (use existing `tar.ts`)
- [ ] Import POSIX tar into the VFS
- [ ] Advantage: readable by all system tools

### 5. Migration and tests
- [ ] Test roundtrip: VFS → squashfs → VFS
- [ ] Test roundtrip: VFS → tar → VFS
- [ ] Benchmark size vs VFSB
- [ ] Benchmark load time vs VFSB
- [ ] Add regression tests

## Acceptance Criteria

- At least one standard format is supported for reading
- The current VFSB format remains supported (backward compatibility)
- The standard format is documented and can be read by external tools
- Migration is transparent for the user (snapshot auto-detect)

## Notes

- Squashfs is the standard format for Linux snapshots (Docker, snapd)
- Tar is simpler to implement and already partially supported (see `tar.ts`)
- Current code is in `src/modules/VirtualFileSystem/binaryPack.ts`
- `src/modules/VirtualFileSystem/journal.ts` also uses a binary format
- Prioritize tar support first (simpler, already in the codebase), then squashfs
- Don't remove VFSB — keep it as a more performant native format
