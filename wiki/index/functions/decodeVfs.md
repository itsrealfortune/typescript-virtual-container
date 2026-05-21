[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / decodeVfs

# Function: decodeVfs()

> **decodeVfs**(`buf`): `InternalDirectoryNode`

Defined in: [src/modules/VirtualFileSystem/binaryPack.ts:343](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/binaryPack.ts#L343)

Deserialise a binary Buffer produced by [encodeVfs](encodeVfs.md) back into an
InternalDirectoryNode tree. Throws on magic/version mismatch or truncation.

## Parameters

### buf

`Buffer`

Binary Buffer in VFS! format.

## Returns

`InternalDirectoryNode`

Reconstructed root directory node.
