[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / checkFilePermission

# Function: checkFilePermission()

> **checkFilePermission**(`vfs`, `users`, `authUser`, `filePath`, `want`): `void`

Defined in: [src/commands/helpers.ts:172](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/commands/helpers.ts#L172)

POSIX-style permission check: does `authUser` have `want` access to `filePath`?
`want` is a bitmask: 4=R_OK, 2=W_OK, 1=X_OK, 0=F_OK (check existence).
Root bypasses all checks. Throws on EACCES.

## Parameters

### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

VirtualFileSystem for permission checking.

### users

User manager for UID/GID resolution.

#### getGid

(`u`) => `number`

#### getUid

(`u`) => `number`

### authUser

`string`

Authenticated username.

### filePath

`string`

Path to check permissions on.

### want

`number`

Permission bitmask (R_OK=4, W_OK=2, X_OK=1, F_OK=0).

## Returns

`void`
