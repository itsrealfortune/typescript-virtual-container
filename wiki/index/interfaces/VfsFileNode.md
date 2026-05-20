[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VfsFileNode

# Interface: VfsFileNode

Defined in: [src/types/vfs.ts:23](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L23)

Stat shape returned for file nodes.

## Extends

- [`VfsBaseNode`](VfsBaseNode.md)

## Properties

### compressed

> **compressed**: `boolean`

Defined in: [src/types/vfs.ts:26](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L26)

True when file content stored as gzip bytes.

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

### size

> **size**: `number`

Defined in: [src/types/vfs.ts:28](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L28)

Stored byte length (compressed when compressed=true).

***

### type

> **type**: `"file"`

Defined in: [src/types/vfs.ts:24](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L24)

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
