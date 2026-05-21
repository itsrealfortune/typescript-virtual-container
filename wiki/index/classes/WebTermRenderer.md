[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / WebTermRenderer

# Class: WebTermRenderer

Defined in: [src/modules/webTermRenderer.ts:25](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L25)

## Constructors

### Constructor

> **new WebTermRenderer**(`rows`, `cols`): `WebTermRenderer`

Defined in: [src/modules/webTermRenderer.ts:43](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L43)

#### Parameters

##### rows

`number`

##### cols

`number`

#### Returns

`WebTermRenderer`

## Accessors

### cursorCol

#### Get Signature

> **get** **cursorCol**(): `number`

Defined in: [src/modules/webTermRenderer.ts:303](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L303)

##### Returns

`number`

***

### cursorRow

#### Get Signature

> **get** **cursorRow**(): `number`

Defined in: [src/modules/webTermRenderer.ts:302](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L302)

##### Returns

`number`

***

### isCursorVisible

#### Get Signature

> **get** **isCursorVisible**(): `boolean`

Defined in: [src/modules/webTermRenderer.ts:304](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L304)

##### Returns

`boolean`

***

### scrollbackLength

#### Get Signature

> **get** **scrollbackLength**(): `number`

Defined in: [src/modules/webTermRenderer.ts:313](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L313)

##### Returns

`number`

## Methods

### clearScrollback()

> **clearScrollback**(): `void`

Defined in: [src/modules/webTermRenderer.ts:315](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L315)

#### Returns

`void`

***

### consumeCleared()

> **consumeCleared**(): `boolean`

Defined in: [src/modules/webTermRenderer.ts:307](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L307)

Returns true (once) if CSI 2J was received since last call.

#### Returns

`boolean`

***

### renderHtml()

> **renderHtml**(): `string`

Defined in: [src/modules/webTermRenderer.ts:266](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L266)

Render current screen state to an HTML string for a <pre> element.

#### Returns

`string`

***

### renderScrollbackHtml()

> **renderScrollbackHtml**(): `string`

Defined in: [src/modules/webTermRenderer.ts:317](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L317)

#### Returns

`string`

***

### resize()

> **resize**(`rows`, `cols`): `void`

Defined in: [src/modules/webTermRenderer.ts:49](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L49)

#### Parameters

##### rows

`number`

##### cols

`number`

#### Returns

`void`

***

### write()

> **write**(`data`): `void`

Defined in: [src/modules/webTermRenderer.ts:63](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L63)

#### Parameters

##### data

`string`

#### Returns

`void`
