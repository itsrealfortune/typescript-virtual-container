[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / NanoEditorOptions

# Interface: NanoEditorOptions

Defined in: [src/modules/nanoEditor.ts:41](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L41)

## Properties

### content

> **content**: `string`

Defined in: [src/modules/nanoEditor.ts:44](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L44)

***

### filename

> **filename**: `string`

Defined in: [src/modules/nanoEditor.ts:45](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L45)

***

### onExit

> **onExit**: (`reason`, `content`) => `void`

Defined in: [src/modules/nanoEditor.ts:46](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L46)

#### Parameters

##### reason

[`NanoExitReason`](../type-aliases/NanoExitReason.md)

##### content

`string`

#### Returns

`void`

***

### onSave?

> `optional` **onSave?**: (`content`) => `void`

Defined in: [src/modules/nanoEditor.ts:48](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L48)

Called on ^S / silent save — save without closing nano. Optional.

#### Parameters

##### content

`string`

#### Returns

`void`

***

### stream

> **stream**: [`ShellStream`](ShellStream.md)

Defined in: [src/modules/nanoEditor.ts:42](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L42)

***

### terminalSize

> **terminalSize**: `TerminalSize`

Defined in: [src/modules/nanoEditor.ts:43](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L43)
