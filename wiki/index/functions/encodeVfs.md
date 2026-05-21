[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / encodeVfs

# Function: encodeVfs()

> **encodeVfs**(`root`): `Buffer`

Defined in: [src/modules/VirtualFileSystem/binaryPack.ts:174](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/binaryPack.ts#L174)

Serialise an in-memory VFS root to a compact binary Buffer.
No base64, no JSON. ~27% smaller than the JSON+base64 format for typical VFS trees.

## Parameters

### root

`InternalDirectoryNode`

The root parameter.

## Returns

`Buffer`

The buffer content.
