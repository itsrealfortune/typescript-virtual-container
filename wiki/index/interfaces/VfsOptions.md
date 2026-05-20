[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VfsOptions

# Interface: VfsOptions

Defined in: [src/modules/VirtualFileSystem/index.ts:44](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L44)

## Properties

### evictionThresholdBytes?

> `optional` **evictionThresholdBytes?**: `number`

Defined in: [src/modules/VirtualFileSystem/index.ts:77](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L77)

Files larger than this threshold (bytes) are evicted from RAM after each
`flushMirror()` and reloaded on demand from the snapshot.
Default: 65536 (64 KB). Set to `0` to disable eviction.
Only applies to `"fs"` mode.

***

### flushAfterNWrites?

> `optional` **flushAfterNWrites?**: `number`

Defined in: [src/modules/VirtualFileSystem/index.ts:70](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L70)

Trigger a checkpoint after this many write operations, regardless of the
timer interval. Prevents unbounded journal growth during bulk operations
(e.g. a 15 000-file SFTP transfer). Default: 500.
Set to `0` to disable write-count flushing.

***

### flushIntervalMs?

> `optional` **flushIntervalMs?**: `number`

Defined in: [src/modules/VirtualFileSystem/index.ts:63](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L63)

Interval in milliseconds between automatic checkpoints in `"fs"` mode.
Set to `0` to disable automatic flushing (manual `flushMirror()` only).
Default: 30_000 (30 seconds).

***

### mode?

> `optional` **mode?**: [`VfsPersistenceMode`](../type-aliases/VfsPersistenceMode.md)

Defined in: [src/modules/VirtualFileSystem/index.ts:51](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L51)

Persistence mode.
- `"memory"` (default): no disk access, snapshot via `toSnapshot()`.
- `"fs"`: auto-save JSON snapshot to `snapshotPath` on every
  `flushMirror()` call, and restore from it on `restoreMirror()`.

***

### snapshotPath?

> `optional` **snapshotPath?**: `string`

Defined in: [src/modules/VirtualFileSystem/index.ts:57](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L57)

Directory used by `"fs"` mode.
The snapshot file will be written to `<snapshotPath>/vfs-snapshot.json`.
Required when `mode` is `"fs"`.
