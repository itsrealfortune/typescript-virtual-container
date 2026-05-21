[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / enforceDelete

# Function: enforceDelete()

> **enforceDelete**(`root`, `dirPath`, `name`, `uid`, `gid`): `void`

Defined in: [src/modules/VirtualFileSystem/permissions.ts:106](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/permissions.ts#L106)

Check if `uid`/`gid` can delete `name` inside `dirPath`.
Sticky bit: only root, directory owner, or file owner can delete.

## Parameters

### root

`InternalDirectoryNode`

Root directory node of the VFS tree.

### dirPath

`string`

Absolute VFS path of the parent directory.

### name

`string`

Name of the file/directory to delete.

### uid

`number`

User ID requesting deletion.

### gid

`number`

Group ID of the requesting user.

## Returns

`void`
