[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VfsSnapshotDirectoryNode

# Interface: VfsSnapshotDirectoryNode

Defined in: [src/types/vfs.ts:100](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L100)

Serialized snapshot shape for directory nodes.

## Extends

- [`VfsSnapshotBaseNode`](VfsSnapshotBaseNode.md)

## Properties

### children

> **children**: [`VfsSnapshotNode`](../type-aliases/VfsSnapshotNode.md)[]

Defined in: [src/types/vfs.ts:102](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L102)

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

> **type**: `"directory"`

Defined in: [src/types/vfs.ts:101](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L101)

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
