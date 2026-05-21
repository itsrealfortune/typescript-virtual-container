[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / NanoEditorOptions

# Interface: NanoEditorOptions

Defined in: [src/modules/nanoEditor.ts:42](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L42)

## Properties

### content

> **content**: `string`

Defined in: [src/modules/nanoEditor.ts:48](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L48)

Initial file content to display in the editor.

***

### filename

> **filename**: `string`

Defined in: [src/modules/nanoEditor.ts:50](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L50)

File path shown in the title bar and used for save operations.

***

### onExit

> **onExit**: (`reason`, `content`) => `void`

Defined in: [src/modules/nanoEditor.ts:52](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L52)

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

Defined in: [src/modules/nanoEditor.ts:54](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L54)

Called on ^S / silent save — save without closing nano. Optional.

#### Parameters

##### content

`string`

#### Returns

`void`

***

### stream

> **stream**: [`ShellStream`](ShellStream.md)

Defined in: [src/modules/nanoEditor.ts:44](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L44)

Terminal output stream for rendering the editor UI.

***

### terminalSize

> **terminalSize**: [`TerminalSize`](TerminalSize.md)

Defined in: [src/modules/nanoEditor.ts:46](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L46)

Current terminal dimensions for layout calculations.
