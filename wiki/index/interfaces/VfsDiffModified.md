[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VfsDiffModified

# Interface: VfsDiffModified

Defined in: [src/utils/vfsDiff.ts:45](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L45)

A modified file entry — includes before/after content for files.

## Extends

- [`VfsDiffEntry`](VfsDiffEntry.md)

## Properties

### after

> **after**: `string`

Defined in: [src/utils/vfsDiff.ts:50](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L50)

Content after the change (decoded from base64).

***

### before

> **before**: `string`

Defined in: [src/utils/vfsDiff.ts:48](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L48)

Content before the change (decoded from base64).

***

### path

> **path**: `string`

Defined in: [src/utils/vfsDiff.ts:39](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L39)

Absolute VFS path of the changed node.

#### Inherited from

[`VfsDiffEntry`](VfsDiffEntry.md).[`path`](VfsDiffEntry.md#path)

***

### type

> **type**: `"file"`

Defined in: [src/utils/vfsDiff.ts:46](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L46)

Node type — `"file"`, `"directory"`, or `"device"`.

#### Overrides

[`VfsDiffEntry`](VfsDiffEntry.md).[`type`](VfsDiffEntry.md#type)
