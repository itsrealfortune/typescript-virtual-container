[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / refreshProc

# Function: refreshProc()

> **refreshProc**(`vfs`, `props`, `hostname`, `shellStartTime`, `sessions?`, `network?`): `void`

Defined in: [src/modules/linuxRootfs.ts:709](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/linuxRootfs.ts#L709)

Populate and refresh `/proc` virtual entries based on host stats and
provided active sessions. Rewrites uptime, meminfo, cpuinfo, loadavg,
per-pid entries, and /proc/self.

Safe to call repeatedly — acts as a live kernel state snapshot.

## Parameters

### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

VirtualFileSystem to write /proc entries into.

### props

[`ShellProperties`](../interfaces/ShellProperties.md)

Shell properties (kernel, arch, etc.).

### hostname

`string`

VM hostname for /proc/sys/kernel/hostname.

### shellStartTime

`number`

Timestamp when the shell started (for uptime calc).

### sessions?

[`VirtualActiveSession`](../interfaces/VirtualActiveSession.md)[] = `[]`

Active SSH sessions to populate /proc/<pid> for.

### network?

[`VirtualNetworkManager`](../classes/VirtualNetworkManager.md)

Optional network manager for /proc/net entries.

## Returns

`void`
