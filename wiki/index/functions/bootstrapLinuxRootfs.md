[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / bootstrapLinuxRootfs

# Function: bootstrapLinuxRootfs()

> **bootstrapLinuxRootfs**(`vfs`, `users`, `hostname`, `props`, `shellStartTime`, `sessions?`, `network?`): `void`

Defined in: [src/modules/linuxRootfs.ts:2092](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/linuxRootfs.ts#L2092)

Bootstraps the full Linux rootfs hierarchy in the VFS.
Safe to call multiple times — idempotent.

## Parameters

### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

Target virtual filesystem.

### users

[`VirtualUserManager`](../classes/VirtualUserManager.md)

User manager (for /etc/passwd sync).

### hostname

`string`

Virtual hostname.

### props

[`ShellProperties`](../interfaces/ShellProperties.md)

Shell properties (kernel, os, arch).

### shellStartTime

`number`

Unix ms of shell creation (for uptime).

### sessions?

[`VirtualActiveSession`](../interfaces/VirtualActiveSession.md)[] = `[]`

Active sessions (for /proc/<pid> population).

### network?

[`VirtualNetworkManager`](../classes/VirtualNetworkManager.md)

## Returns

`void`
