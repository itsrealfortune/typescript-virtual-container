[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VfsDiffEntry

# Interface: VfsDiffEntry

Defined in: [src/utils/vfsDiff.ts:37](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L37)

A single changed node entry in a diff result.

## Extended by

- [`VfsDiffModified`](VfsDiffModified.md)

## Properties

### path

> **path**: `string`

Defined in: [src/utils/vfsDiff.ts:39](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L39)

Absolute VFS path of the changed node.

***

### type

> **type**: `"file"` \| `"directory"` \| `"device"`

Defined in: [src/utils/vfsDiff.ts:41](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L41)

Node type — `"file"`, `"directory"`, or `"device"`.
