[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / enforcePathTraversal

# Function: enforcePathTraversal()

> **enforcePathTraversal**(`root`, `targetPath`, `uid`, `gid`): `void`

Defined in: [src/modules/VirtualFileSystem/permissions.ts:75](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/permissions.ts#L75)

Check X_OK on every parent directory component of `targetPath`.
Required for path traversal. Throws EACCES on failure.

## Parameters

### root

`InternalDirectoryNode`

The root parameter.

### targetPath

`string`

The target file path.

### uid

`number`

The uid parameter.

### gid

`number`

The gid parameter.

## Returns

`void`
