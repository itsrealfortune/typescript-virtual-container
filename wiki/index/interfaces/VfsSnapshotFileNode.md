[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VfsSnapshotFileNode

# Interface: VfsSnapshotFileNode

Defined in: [src/types/vfs.ts:81](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L81)

Serialized snapshot shape for file nodes.

## Extends

- [`VfsSnapshotBaseNode`](VfsSnapshotBaseNode.md)

## Properties

### compressed

> **compressed**: `boolean`

Defined in: [src/types/vfs.ts:83](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L83)

***

### contentBase64

> **contentBase64**: `string`

Defined in: [src/types/vfs.ts:85](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L85)

Base64-encoded raw file bytes.

***

### createdAt

> **createdAt**: `string`

Defined in: [src/types/vfs.ts:75](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L75)

ISO-8601 creation timestamp.

#### Inherited from

[`VfsSnapshotBaseNode`](VfsSnapshotBaseNode.md).[`createdAt`](VfsSnapshotBaseNode.md#createdat)

***

### gid

> **gid**: `number`

Defined in: [src/types/vfs.ts:73](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L73)

Owner group ID (0 = root).

#### Inherited from

[`VfsSnapshotBaseNode`](VfsSnapshotBaseNode.md).[`gid`](VfsSnapshotBaseNode.md#gid)

***

### mode

> **mode**: `number`

Defined in: [src/types/vfs.ts:69](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L69)

#### Inherited from

[`VfsSnapshotBaseNode`](VfsSnapshotBaseNode.md).[`mode`](VfsSnapshotBaseNode.md#mode)

***

### name

> **name**: `string`

Defined in: [src/types/vfs.ts:68](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L68)

#### Inherited from

[`VfsSnapshotBaseNode`](VfsSnapshotBaseNode.md).[`name`](VfsSnapshotBaseNode.md#name)

***

### type

> **type**: `"file"`

Defined in: [src/types/vfs.ts:82](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L82)

***

### uid

> **uid**: `number`

Defined in: [src/types/vfs.ts:71](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L71)

Owner user ID (0 = root).

#### Inherited from

[`VfsSnapshotBaseNode`](VfsSnapshotBaseNode.md).[`uid`](VfsSnapshotBaseNode.md#uid)

***

### updatedAt

> **updatedAt**: `string`

Defined in: [src/types/vfs.ts:77](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L77)

ISO-8601 update timestamp.

#### Inherited from

[`VfsSnapshotBaseNode`](VfsSnapshotBaseNode.md).[`updatedAt`](VfsSnapshotBaseNode.md#updatedat)
