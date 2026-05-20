[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VfsBaseNode

# Interface: VfsBaseNode

Defined in: [src/types/vfs.ts:5](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L5)

Shared metadata fields available on file and directory stats.

## Extended by

- [`VfsDirectoryNode`](VfsDirectoryNode.md)
- [`VfsFileNode`](VfsFileNode.md)

## Properties

### createdAt

> **createdAt**: `Date`

Defined in: [src/types/vfs.ts:17](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L17)

Node creation timestamp.

***

### gid

> **gid**: `number`

Defined in: [src/types/vfs.ts:15](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L15)

Owner group ID (0 = root).

***

### mode

> **mode**: `number`

Defined in: [src/types/vfs.ts:11](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L11)

POSIX-like mode bits.

***

### name

> **name**: `string`

Defined in: [src/types/vfs.ts:7](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L7)

Node name without parent path.

***

### path

> **path**: `string`

Defined in: [src/types/vfs.ts:9](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L9)

Absolute normalized node path.

***

### uid

> **uid**: `number`

Defined in: [src/types/vfs.ts:13](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L13)

Owner user ID (0 = root).

***

### updatedAt

> **updatedAt**: `Date`

Defined in: [src/types/vfs.ts:19](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L19)

Last update timestamp.
