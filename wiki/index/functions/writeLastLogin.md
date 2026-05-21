[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / writeLastLogin

# Function: writeLastLogin()

> **writeLastLogin**(`vfs`, `authUser`, `from`): `void`

Defined in: [src/utils/shellSession.ts:68](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/shellSession.ts#L68)

Writes the current timestamp as the last login for a user to the VFS.

## Parameters

### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

The virtual file system instance.

### authUser

`string`

The authenticated username.

### from

`string`

An identifier for the origin of the login session (e.g. `"web"` or `"ssh"`).

## Returns

`void`
