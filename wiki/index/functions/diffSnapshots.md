[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / diffSnapshots

# Function: diffSnapshots()

> **diffSnapshots**(`before`, `after`, `options?`): [`VfsDiff`](../interfaces/VfsDiff.md)

Defined in: [src/utils/vfsDiff.ts:99](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L99)

Compute the diff between two VFS snapshots.

## Parameters

### before

[`VfsSnapshot`](../interfaces/VfsSnapshot.md)

Snapshot taken before the operation.

### after

[`VfsSnapshot`](../interfaces/VfsSnapshot.md)

Snapshot taken after the operation.

### options?

Optional filtering options.

#### ignore?

`string`[]

Glob-style path prefixes to ignore (e.g. `["/proc", "/var/log"]`).

## Returns

[`VfsDiff`](../interfaces/VfsDiff.md)

A structured `VfsDiff` result.
