[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / Baie

# Class: Baie

Defined in: [src/modules/VirtualSwitch.ts:450](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L450)

## Constructors

### Constructor

> **new Baie**(`name`, `subnet?`): `Baie`

Defined in: [src/modules/VirtualSwitch.ts:455](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L455)

#### Parameters

##### name

`string`

##### subnet?

`string` = `"10.0.1.0/24"`

#### Returns

`Baie`

## Properties

### name

> `readonly` **name**: `string`

Defined in: [src/modules/VirtualSwitch.ts:451](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L451)

***

### switch

> `readonly` **switch**: [`VirtualSwitch`](VirtualSwitch.md)

Defined in: [src/modules/VirtualSwitch.ts:452](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L452)

## Methods

### createVM()

> **createVM**(`hostname`, `vfsOptions?`, `preferredIp?`): `Promise`\<[`VirtualShell`](VirtualShell.md)\>

Defined in: [src/modules/VirtualSwitch.ts:460](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L460)

#### Parameters

##### hostname

`string`

##### vfsOptions?

`undefined`

##### preferredIp?

`string`

#### Returns

`Promise`\<[`VirtualShell`](VirtualShell.md)\>

***

### destroyVM()

> **destroyVM**(`hostname`): `Promise`\<`void`\>

Defined in: [src/modules/VirtualSwitch.ts:473](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L473)

#### Parameters

##### hostname

`string`

#### Returns

`Promise`\<`void`\>

***

### getVM()

> **getVM**(`hostname`): [`VirtualShell`](VirtualShell.md) \| `undefined`

Defined in: [src/modules/VirtualSwitch.ts:482](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L482)

#### Parameters

##### hostname

`string`

#### Returns

[`VirtualShell`](VirtualShell.md) \| `undefined`

***

### listVMs()

> **listVMs**(): `object`[]

Defined in: [src/modules/VirtualSwitch.ts:486](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L486)

#### Returns

`object`[]
