# Task: Infrastructure — standard snapshot format

**Priority:** P2
**Estimated effort:** 2 weeks
**Dependencies:** None

## Context

The VFSB format (`.vfsb`) is proprietary. No other tool can read it. The goal is to evolve toward a standard format like squashfs for interoperability.

## VFSB Format Reference

### Magic bytes and version

| Field | Value | Location |
|-------|-------|----------|
| Magic bytes (4) | `0x56 0x46 0x53 0x21` (ASCII `"VFS!"`) | `binaryPack.ts:44` |
| Wire version (1) | `0x03` | `binaryPack.ts:45` |
| Min readable version | `>= 0x02` (v0x02 added uid/gid fields) | `binaryPack.ts:376` |

### Opcodes (node types)

| Opcode | Type | Notes |
|--------|------|-------|
| `0x01` | FILE | `binaryPack.ts:46` |
| `0x02` | DIRECTORY | `binaryPack.ts:47` |
| `0x03` | DEVICE | `binaryPack.ts:48` |

### Wire format (little-endian)

```
File header:
  [4] magic  = 0x56 0x46 0x53 0x21
  [1] version = 0x03

Node (all types):
  [1] type       = 0x01 | 0x02 | 0x03
  [2] name length (uint16)
  [N] name bytes (utf8)
  [4] mode (uint32)
  [4] uid (uint32)           -- only if version >= 0x02
  [4] gid (uint32)           -- only if version >= 0x02
  [8] createdAt ms (float64 BE)
  [8] updatedAt ms (float64 BE)

File node extra:
  [1] compressed flag (0x00 | 0x01)
  [4] content length (uint32)
  [N] content bytes

Device node extra:
  [1] device kind code
  [1] major
  [1] minor

Directory node extra:
  [4] children count (uint32)
  [N] children nodes (recursive)
```

### VFSB features that must survive migration

- File content (compressed and uncompressed)
- Stub files (lazy-loaded string content — promoted to real files on write)
- Directory hierarchy with permissions
- Symlinks (stored as files with mode `0o120777`)
- Device nodes (/dev/null, /dev/zero, /dev/random, /dev/urandom, /dev/full)
- POSIX permissions (uid, gid, mode)
- Creation and modification timestamps
- File eviction (content purged from RAM, reloaded from snapshot)
- Swap store (content offloaded to disk)
- Journal (WAL for crash recovery, replayed after snapshot load)

### Strategy: parallel support

VFSB remains the primary native format (more compact, faster). Squashfs and tar are read-only formats — when loaded, they are migrated to VFSB on the next `flushMirror()`. This gives backward compatibility while adding interoperability.

## Auto-detection order in `restoreMirror()`

See `src/modules/VirtualFileSystem/index.ts:682-697`:

1. `isBinarySnapshot(raw)` → `decodeVfs(raw)` (VFSB)
2. `isSquashfsFormat(raw)` → `decodeSquashfs(raw)` (squashfs)
3. `isTarFormat(raw) || isGzip(raw)` → `decodeTar(raw)` (tar / gzip tar)
4. else → `JSON.parse` → `_deserializeDir` (legacy JSON)

Each non-VFSB format prints an info message that it will migrate to VFSB on next flush.

## Subtasks

### 1. Analysis and backward compatibility
- [x] Document the current VFSB format (magic bytes `VFS!`, versioning, opcodes)
- [x] List all VFSB features that must survive migration
- [x] Decide on strategy: parallel support (VFSB + new format) or migration

### 2. Squashfs read support
- [x] Implement a squashfs parser in TypeScript (no native dependency)
- [x] Support gzip/zstd compression (zstd optional, gzip done)
- [x] Read inodes, files, directories, symlinks
- [x] Import content into the internal VFS

### 3. Squashfs write support — optional
- [ ] Generate squashfs images from the VFS (not implemented — low priority)
- [ ] Support extended attributes if relevant
- [ ] Configurable compression

### 4. Tar format as lightweight alternative
- [x] Export VFS as POSIX tar (see `tarFormat.ts`)
- [x] Import POSIX tar into the VFS
- [x] Advantage: readable by all system tools

### 5. Migration and tests
- [ ] Test roundtrip: VFS → squashfs → VFS (blocked on subtask 3)
- [x] Test roundtrip: VFS → tar → VFS
- [x] Test squashfs read → VFS → tar → VFS (squashfs → tar roundtrip via VFS)
- [x] Test squashfs snapshot restore in fs mode (auto-detect)
- [ ] Benchmark size vs VFSB
- [ ] Benchmark load time vs VFSB
- [x] Add regression tests

## Acceptance Criteria

- [x] At least one standard format is supported for reading (squashfs + tar)
- [x] The current VFSB format remains supported (backward compatibility)
- [x] The standard format is documented and can be read by external tools (unsquashfs reads squashfs images; tar is universal)
- [x] Migration is transparent for the user (snapshot auto-detect in restoreMirror)

## Notes

- Squashfs is the standard format for Linux snapshots (Docker, snapd)
- Tar is simpler to implement and already partially supported (see `tarFormat.ts`)
- Current code is in `src/modules/VirtualFileSystem/binaryPack.ts`
- `src/modules/VirtualFileSystem/journal.ts` also uses a binary format
- Prioritize tar support first (simpler, already in the codebase), then squashfs
- Don't remove VFSB — keep it as a more performant native format
- Benchmarks (size vs VFSB, load time vs VFSB) remain as future work
