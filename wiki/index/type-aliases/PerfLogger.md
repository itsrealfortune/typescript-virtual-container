[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / PerfLogger

# Type Alias: PerfLogger

> **PerfLogger** = `object`

Defined in: [src/utils/perfLogger.ts:5](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/perfLogger.ts#L5)

Interface for a performance logger instance.
When `enabled` is false, `mark` and `done` are no-ops.

## Properties

### done

> **done**: (`label?`) => `void`

Defined in: [src/utils/perfLogger.ts:8](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/perfLogger.ts#L8)

#### Parameters

##### label?

`string`

#### Returns

`void`

***

### enabled

> **enabled**: `boolean`

Defined in: [src/utils/perfLogger.ts:6](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/perfLogger.ts#L6)

***

### mark

> **mark**: (`label`) => `void`

Defined in: [src/utils/perfLogger.ts:7](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/perfLogger.ts#L7)

#### Parameters

##### label

`string`

#### Returns

`void`
