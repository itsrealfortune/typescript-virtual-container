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

`boolean`

The success indicator.
