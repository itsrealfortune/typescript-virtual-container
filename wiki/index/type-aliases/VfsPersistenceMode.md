[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VfsPersistenceMode

# Type Alias: VfsPersistenceMode

> **VfsPersistenceMode** = `"memory"` \| `"fs"`

Defined in: [src/modules/VirtualFileSystem/index.ts:42](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L42)

"memory" — pure in-memory, no disk I/O (default).

"fs"     — mirrors the VFS tree to a directory on the host filesystem.
            `snapshotPath` must be set to the directory where the binary
            snapshot file will be read/written (`vfs-snapshot.vfsb`).
