[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / NanoEditorOptions

# Interface: NanoEditorOptions

Defined in: [src/modules/nanoEditor.ts:62](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L62)

## Properties

### content

> **content**: `string`

Defined in: [src/modules/nanoEditor.ts:68](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L68)

Initial file content to display in the editor.

***

### filename

> **filename**: `string`

Defined in: [src/modules/nanoEditor.ts:70](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L70)

File path shown in the title bar and used for save operations.

***

### onExit

> **onExit**: (`reason`, `content`) => `void`

Defined in: [src/modules/nanoEditor.ts:72](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L72)

Called when nano exits (saved or aborted). Receives the exit reason and final content.

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

Defined in: [src/modules/nanoEditor.ts:74](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L74)

Called on ^S / silent save — save without closing nano. Optional.

#### Parameters

##### content

`string`

#### Returns

`void`

***

### stream

> **stream**: [`ShellStream`](ShellStream.md)

Defined in: [src/modules/nanoEditor.ts:64](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L64)

Terminal output stream for rendering the editor UI.

***

### terminalSize

> **terminalSize**: [`TerminalSize`](TerminalSize.md)

Defined in: [src/modules/nanoEditor.ts:66](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L66)

Current terminal dimensions for layout calculations.
