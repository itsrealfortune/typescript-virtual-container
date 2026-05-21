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

The root parameter.

### targetPath

`string`

The target file path.

### uid

`number`

The uid parameter.

## Returns

`void`
