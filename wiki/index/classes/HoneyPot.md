[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / HoneyPot

# Class: HoneyPot

Defined in: [src/modules/Honeypot/index.ts:66](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/Honeypot/index.ts#L66)

HoneyPot audit and event tracking utility.

Singleton-like helper that attaches listeners to virtual shell components
and maintains an audit log of all activity.

## Constructors

### Constructor

> **new HoneyPot**(`maxLogSize?`): `HoneyPot`

Defined in: [src/modules/Honeypot/index.ts:103](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/Honeypot/index.ts#L103)

Creates a new HoneyPot instance.

#### Parameters

##### maxLogSize?

`number` = `10000`

Maximum audit log entries to retain (default: 10000).

#### Returns

`HoneyPot`

## Methods

### attach()

> **attach**(`shell`, `vfs`, `users`, `ssh?`, `sftp?`): `void`

Defined in: [src/modules/Honeypot/index.ts:117](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/Honeypot/index.ts#L117)

Attaches honeypot listeners to all provided event emitters.

#### Parameters

##### shell

[`VirtualShell`](VirtualShell.md)

VirtualShell instance.

##### vfs

[`VirtualFileSystem`](VirtualFileSystem.md)

VirtualFileSystem instance.

##### users

[`VirtualUserManager`](VirtualUserManager.md)

VirtualUserManager instance.

##### ssh?

[`VirtualSshServer`](VirtualSshServer.md)

SshMimic instance (optional).

##### sftp?

[`VirtualSftpServer`](VirtualSftpServer.md)

SftpMimic instance (optional).

#### Returns

`void`

***

### detectAnomalies()

> **detectAnomalies**(): `object`[]

Defined in: [src/modules/Honeypot/index.ts:489](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/Honeypot/index.ts#L489)

Detects potential security issues based on activity patterns.

#### Returns

`object`[]

Array of anomalies detected.

***

### getAuditLog()

> **getAuditLog**(`type?`, `source?`): [`AuditLogEntry`](../interfaces/AuditLogEntry.md)[]

Defined in: [src/modules/Honeypot/index.ts:422](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/Honeypot/index.ts#L422)

Returns audit log entries matching optional filters.

#### Parameters

##### type?

`string`

Optional event type filter.

##### source?

`string`

Optional source filter.

#### Returns

[`AuditLogEntry`](../interfaces/AuditLogEntry.md)[]

Filtered audit log entries.

***

### getRecent()

> **getRecent**(`limit?`): [`AuditLogEntry`](../interfaces/AuditLogEntry.md)[]

Defined in: [src/modules/Honeypot/index.ts:479](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/Honeypot/index.ts#L479)

Returns recent log entries in reverse chronological order.

#### Parameters

##### limit?

`number` = `100`

Number of recent entries to return (default: 100).

#### Returns

[`AuditLogEntry`](../interfaces/AuditLogEntry.md)[]

Recent audit log entries.

***

### getStats()

> **getStats**(): `Readonly`\<[`HoneyPotStats`](../interfaces/HoneyPotStats.md)\>

Defined in: [src/modules/Honeypot/index.ts:435](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/Honeypot/index.ts#L435)

Returns current activity statistics.

#### Returns

`Readonly`\<[`HoneyPotStats`](../interfaces/HoneyPotStats.md)\>

Snapshot of honeypot stats.

***

### reset()

> **reset**(): `void`

Defined in: [src/modules/Honeypot/index.ts:443](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/Honeypot/index.ts#L443)

Clears audit log and resets statistics.

#### Returns

`void`
