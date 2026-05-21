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

Root directory node of the VFS tree.

### targetPath

`string`

Absolute VFS path to check.

### uid

`number`

User ID requesting access.

### gid

`number`

Group ID of the requesting user.

### want

`number`

Permission bitmask (R_OK=4, W_OK=2, X_OK=1).

## Returns

`void`
