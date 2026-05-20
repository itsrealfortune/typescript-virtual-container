[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / ExecStream

# Interface: ExecStream

Defined in: [src/types/streams.ts:4](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/streams.ts#L4)

Minimal stream contract used by exec command handlers.

## Properties

### stderr

> **stderr**: `object`

Defined in: [src/types/streams.ts:12](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/streams.ts#L12)

Writable stderr channel.

#### write()

> **write**(`data`): `void`

Writes text to stderr channel.

##### Parameters

###### data

`string`

##### Returns

`void`

## Methods

### end()

> **end**(): `void`

Defined in: [src/types/streams.ts:8](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/streams.ts#L8)

Signals output completion.

#### Returns

`void`

***

### exit()

> **exit**(`code`): `void`

Defined in: [src/types/streams.ts:10](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/streams.ts#L10)

Sets process-like exit code for exec response.

#### Parameters

##### code

`number`

#### Returns

`void`

***

### write()

> **write**(`data`): `void`

Defined in: [src/types/streams.ts:6](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/streams.ts#L6)

Writes text to stdout channel.

#### Parameters

##### data

`string`

#### Returns

`void`
