[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / isExecutable

# Function: isExecutable()

> **isExecutable**(`root`, `targetPath`, `uid`, `gid`): `boolean`

Defined in: [src/modules/VirtualFileSystem/permissions.ts:210](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/permissions.ts#L210)

Check if a file is executable by `uid`/`gid`.

## Parameters

### root

`InternalDirectoryNode`

Root directory node of the VFS tree.

### targetPath

`string`

Absolute VFS path of the file.

### uid

`number`

User ID attempting execution.

### gid

`number`

Group ID of the user.

## Returns

`boolean`

True if the file has execute permission for the user.
