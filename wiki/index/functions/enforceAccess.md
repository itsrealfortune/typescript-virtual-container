[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / enforceAccess

# Function: enforceAccess()

> **enforceAccess**(`root`, `targetPath`, `uid`, `gid`, `want`): `void`

Defined in: [src/modules/VirtualFileSystem/permissions.ts:33](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/permissions.ts#L33)

Check if `uid`/`gid` can access `targetPath` with the given permission bits.
Throws EACCES on failure.

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

### want

`number`

The want parameter.

## Returns

`void`
