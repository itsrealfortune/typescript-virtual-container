[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / loadHistory

# Function: loadHistory()

> **loadHistory**(`vfs`, `authUser`): `string`[]

Defined in: [src/utils/shellSession.ts:21](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/shellSession.ts#L21)

Loads the shell command history for a user from the VFS.
Creates an empty history file if none exists.

## Parameters

### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

The virtual file system instance.

### authUser

`string`

The authenticated username.

## Returns

`string`[]

An array of history lines, with empty lines removed.
