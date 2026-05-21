[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / readLastLogin

# Function: readLastLogin()

> **readLastLogin**(`vfs`, `authUser`): [`LastLogin`](../interfaces/LastLogin.md) \| `null`

Defined in: [src/utils/shellSession.ts:58](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/shellSession.ts#L58)

Reads the last-login timestamp for a user from the VFS.

## Parameters

### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

The virtual file system instance.

### authUser

`string`

The authenticated username.

## Returns

[`LastLogin`](../interfaces/LastLogin.md) \| `null`

The `LastLogin` object, or `null` if no record exists or parsing fails.
