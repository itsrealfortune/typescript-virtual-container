[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VfsSnapshotBaseNode

# Interface: VfsSnapshotBaseNode

Defined in: [src/types/vfs.ts:67](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L67)

Base snapshot node schema used for archive serialization.

## Extended by

- [`VfsSnapshotDirectoryNode`](VfsSnapshotDirectoryNode.md)
- [`VfsSnapshotFileNode`](VfsSnapshotFileNode.md)

## Properties

### createdAt

> **createdAt**: `string`

Defined in: [src/types/vfs.ts:75](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L75)

ISO-8601 creation timestamp.

***

### gid

> **gid**: `number`

Defined in: [src/types/vfs.ts:73](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L73)

Owner group ID (0 = root).

***

### mode

> **mode**: `number`

Defined in: [src/types/vfs.ts:69](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L69)

***

### name

> **name**: `string`

Defined in: [src/types/vfs.ts:68](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L68)

***

### uid

> **uid**: `number`

Defined in: [src/types/vfs.ts:71](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L71)

Owner user ID (0 = root).

***

### updatedAt

> **updatedAt**: `string`

Defined in: [src/types/vfs.ts:77](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L77)

ISO-8601 update timestamp.
