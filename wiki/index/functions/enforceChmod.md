[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / enforceChmod

# Function: enforceChmod()

> **enforceChmod**(`root`, `targetPath`, `uid`): `void`

Defined in: [src/modules/VirtualFileSystem/permissions.ts:152](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/permissions.ts#L152)

Check if `uid` can change mode of `targetPath`.
Must be owner or root.

## Parameters

### root

`InternalDirectoryNode`

Root directory node of the VFS tree.

### targetPath

`string`

Absolute VFS path of the node.

### uid

`number`

User ID attempting the chmod operation.

## Returns

`void`
