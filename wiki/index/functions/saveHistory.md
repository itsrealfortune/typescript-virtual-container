[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / saveHistory

# Function: saveHistory()

> **saveHistory**(`vfs`, `authUser`, `history`): `void`

Defined in: [src/utils/shellSession.ts:40](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/shellSession.ts#L40)

Saves shell command history for a user to the VFS.
Each entry is written on its own line to `.bash_history`.

## Parameters

### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

The virtual file system instance.

### authUser

`string`

The authenticated username.

### history

`string`[]

The ordered list of history entries to persist.

## Returns

`void`
