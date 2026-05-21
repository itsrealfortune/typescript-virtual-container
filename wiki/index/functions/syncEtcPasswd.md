[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / syncEtcPasswd

# Function: syncEtcPasswd()

> **syncEtcPasswd**(`vfs`, `users`): `void`

Defined in: [src/modules/linuxRootfs.ts:411](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/linuxRootfs.ts#L411)

Sync `/etc/passwd`, `/etc/group`, and `/etc/shadow` from the
VirtualUserManager's current user list into the VFS.

## Parameters

### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

### users

[`VirtualUserManager`](../classes/VirtualUserManager.md)

## Returns

`void`
