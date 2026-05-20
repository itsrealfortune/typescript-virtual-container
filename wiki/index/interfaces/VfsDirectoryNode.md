[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VfsDirectoryNode

# Interface: VfsDirectoryNode

Defined in: [src/types/vfs.ts:32](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L32)

Stat shape returned for directory nodes.

## Extends

- [`VfsBaseNode`](VfsBaseNode.md)

## Properties

### childrenCount

> **childrenCount**: `number`

Defined in: [src/types/vfs.ts:35](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L35)

Number of direct children in directory.

***

### createdAt

> **createdAt**: `Date`

Defined in: [src/types/vfs.ts:17](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L17)

Node creation timestamp.

#### Inherited from

[`VfsBaseNode`](VfsBaseNode.md).[`createdAt`](VfsBaseNode.md#createdat)

***

### gid

> **gid**: `number`

Defined in: [src/types/vfs.ts:15](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L15)

Owner group ID (0 = root).

#### Inherited from

[`VfsBaseNode`](VfsBaseNode.md).[`gid`](VfsBaseNode.md#gid)

***

### mode

> **mode**: `number`

Defined in: [src/types/vfs.ts:11](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L11)

POSIX-like mode bits.

#### Inherited from

[`VfsBaseNode`](VfsBaseNode.md).[`mode`](VfsBaseNode.md#mode)

***

### name

> **name**: `string`

Defined in: [src/types/vfs.ts:7](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L7)

Node name without parent path.

#### Inherited from

[`VfsBaseNode`](VfsBaseNode.md).[`name`](VfsBaseNode.md#name)

***

### path

> **path**: `string`

Defined in: [src/types/vfs.ts:9](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L9)

Absolute normalized node path.

#### Inherited from

[`VfsBaseNode`](VfsBaseNode.md).[`path`](VfsBaseNode.md#path)

***

### type

> **type**: `"directory"`

Defined in: [src/types/vfs.ts:33](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L33)

***

### uid

> **uid**: `number`

Defined in: [src/types/vfs.ts:13](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L13)

Owner user ID (0 = root).

#### Inherited from

[`VfsBaseNode`](VfsBaseNode.md).[`uid`](VfsBaseNode.md#uid)

***

### updatedAt

> **updatedAt**: `Date`

Defined in: [src/types/vfs.ts:19](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L19)

Last update timestamp.

#### Inherited from

[`VfsBaseNode`](VfsBaseNode.md).[`updatedAt`](VfsBaseNode.md#updatedat)
