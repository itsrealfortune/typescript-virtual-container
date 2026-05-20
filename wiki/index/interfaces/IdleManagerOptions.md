[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / IdleManagerOptions

# Interface: IdleManagerOptions

Defined in: [src/modules/VirtualShell/idleManager.ts:27](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/idleManager.ts#L27)

## Properties

### checkIntervalMs?

> `optional` **checkIntervalMs?**: `number`

Defined in: [src/modules/VirtualShell/idleManager.ts:37](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/idleManager.ts#L37)

How often the idle check runs.
Default: 15_000 (15 seconds).

***

### idleThresholdMs?

> `optional` **idleThresholdMs?**: `number`

Defined in: [src/modules/VirtualShell/idleManager.ts:32](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/idleManager.ts#L32)

Milliseconds of inactivity before the shell is frozen.
Default: 60_000 (1 minute).
