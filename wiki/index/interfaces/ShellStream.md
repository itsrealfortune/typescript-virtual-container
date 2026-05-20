[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / ShellStream

# Interface: ShellStream

Defined in: [src/types/streams.ts:21](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/streams.ts#L21)

Minimal interactive stream contract used by shell mode.

## Methods

### end()

> **end**(): `void`

Defined in: [src/types/streams.ts:27](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/streams.ts#L27)

Ends shell stream.

#### Returns

`void`

***

### exit()

> **exit**(`code`): `void`

Defined in: [src/types/streams.ts:25](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/streams.ts#L25)

Sets shell exit code on close.

#### Parameters

##### code

`number`

#### Returns

`void`

***

### on()

#### Call Signature

> **on**(`event`, `listener`): `void`

Defined in: [src/types/streams.ts:29](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/streams.ts#L29)

Subscribes to incoming user input chunks.

##### Parameters

###### event

`"data"`

###### listener

(`chunk`) => `void`

##### Returns

`void`

#### Call Signature

> **on**(`event`, `listener`): `void`

Defined in: [src/types/streams.ts:31](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/streams.ts#L31)

Subscribes to stream close event.

##### Parameters

###### event

`"close"`

###### listener

() => `void`

##### Returns

`void`

***

### write()

> **write**(`data`): `void`

Defined in: [src/types/streams.ts:23](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/streams.ts#L23)

Writes text to shell output channel.

#### Parameters

##### data

`string`

#### Returns

`void`
