[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / checkFilePermission

# Function: checkFilePermission()

> **checkFilePermission**(`vfs`, `users`, `authUser`, `filePath`, `want`): `void`

Defined in: [src/commands/helpers.ts:153](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/commands/helpers.ts#L153)

POSIX-style permission check: does `authUser` have `want` access to `filePath`?
`want` is a bitmask: 4=R_OK, 2=W_OK, 1=X_OK, 0=F_OK (check existence).
Root bypasses all checks. Throws on EACCES.

## Parameters

### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

### users

#### getGid

(`u`) => `number`

#### getUid

(`u`) => `number`

### authUser

`string`

### filePath

`string`

### want

`number`

## Returns

`void`
