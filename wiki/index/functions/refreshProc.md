[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / refreshProc

# Function: refreshProc()

> **refreshProc**(`vfs`, `props`, `hostname`, `shellStartTime`, `sessions?`, `network?`): `void`

Defined in: [src/modules/linuxRootfs.ts:700](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/linuxRootfs.ts#L700)

Populate and refresh `/proc` virtual entries based on host stats and
provided active sessions. Rewrites uptime, meminfo, cpuinfo, loadavg,
per-pid entries, and /proc/self.

Safe to call repeatedly — acts as a live kernel state snapshot.

## Parameters

### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

### props

[`ShellProperties`](../interfaces/ShellProperties.md)

### hostname

`string`

### shellStartTime

`number`

### sessions?

[`VirtualActiveSession`](../interfaces/VirtualActiveSession.md)[] = `[]`

### network?

[`VirtualNetworkManager`](../classes/VirtualNetworkManager.md)

## Returns

`void`
