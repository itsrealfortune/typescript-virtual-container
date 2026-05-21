[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / NanoEditor

# Class: NanoEditor

Defined in: [src/modules/nanoEditor.ts:114](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L114)

A terminal-based text editor inspired by GNU nano, rendered over a ShellStream.

Supports:
- Full cursor navigation (arrows, home, end, page up/down)
- Text insertion and deletion (backspace, delete)
- Cut/copy/paste (^K, ^U, ^6)
- Search with case sensitivity toggle (^W)
- Go-to line (^_ / Alt+G)
- Save to file (^O / ^S for silent save)
- Undo/redo (Alt+U / Alt+E)
- Mark selection (^6)
- Resize handling for terminal changes

## Example

```ts
const nano = new NanoEditor({
  stream,
  terminalSize: { cols: 80, rows: 24 },
  content: "Hello, world!\n",
  filename: "/home/user/hello.txt",
  onExit: (reason, content) => {
    if (reason === "saved") vfs.writeFile("/home/user/hello.txt", content);
  },
});
nano.start();
// Then feed keystrokes: nano.handleInput(Buffer.from("a"));
```

## Constructors

### Constructor

> **new NanoEditor**(`opts`): `NanoEditor`

Defined in: [src/modules/nanoEditor.ts:135](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L135)

#### Parameters

##### opts

[`NanoEditorOptions`](../interfaces/NanoEditorOptions.md)

#### Returns

`NanoEditor`

## Methods

### fullRedraw()

> **fullRedraw**(): `void`

Defined in: [src/modules/nanoEditor.ts:801](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L801)

#### Returns

`void`

***

### handleInput()

> **handleInput**(`chunk`): `void`

Defined in: [src/modules/nanoEditor.ts:175](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L175)

Process raw terminal input bytes. Dispatches keystrokes to the
appropriate handler based on current mode (normal, search, write, etc.).
Supports ANSI escape sequences, Ctrl+key combos, and Alt+key.

#### Parameters

##### chunk

`Buffer`

Raw bytes from the terminal stream.

#### Returns

`void`

***

### resize()

> **resize**(`size`): `void`

Defined in: [src/modules/nanoEditor.ts:164](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L164)

Update the terminal dimensions and redraw the screen.
Call this when the terminal is resized (e.g., from a SIGWINCH handler).

#### Parameters

##### size

[`TerminalSize`](../interfaces/TerminalSize.md)

New terminal dimensions (cols × rows).

#### Returns

`void`

***

### start()

> **start**(): `void`

Defined in: [src/modules/nanoEditor.ts:155](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/nanoEditor.ts#L155)

Render the initial editor UI and draw the buffer on screen.
Call this after construction to display the editor.

#### Returns

`void`
