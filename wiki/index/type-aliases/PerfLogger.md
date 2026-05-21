[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / PerfLogger

# Type Alias: PerfLogger

> **PerfLogger** = `object`

Defined in: [src/utils/perfLogger.ts:12](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/perfLogger.ts#L12)

Interface for a performance logger instance.
When `enabled` is false, `mark` and `done` are no-ops.

## Properties

### done

> **done**: (`label?`) => `void`

Defined in: [src/utils/perfLogger.ts:15](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/perfLogger.ts#L15)

#### Parameters

##### label?

`string`

#### Returns

`void`

***

### enabled

> **enabled**: `boolean`

Defined in: [src/utils/perfLogger.ts:13](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/perfLogger.ts#L13)

***

### mark

> **mark**: (`label`) => `void`

Defined in: [src/utils/perfLogger.ts:14](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/perfLogger.ts#L14)

#### Parameters

##### label

`string`

#### Returns

`void`
