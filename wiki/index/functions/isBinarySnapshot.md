[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / isBinarySnapshot

# Function: isBinarySnapshot()

> **isBinarySnapshot**(`buf`): `boolean`

Defined in: [src/modules/VirtualFileSystem/binaryPack.ts:370](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/binaryPack.ts#L370)

Checks whether `buf` starts with the VFS binary magic bytes, indicating a valid
binary snapshot produced by [encodeVfs](encodeVfs.md).

## Parameters

### buf

`Buffer`

The buffer to inspect.

## Returns

`boolean`

`true` if the buffer begins with the VFS magic header (`"VFS!"`).
