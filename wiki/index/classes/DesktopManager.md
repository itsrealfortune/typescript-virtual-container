[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / DesktopManager

# Class: DesktopManager

Defined in: [src/modules/desktopManager.ts:114](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L114)

XFCE-like desktop environment manager for browser rendering.

Manages a virtual desktop with draggable, resizable, minimizable windows
containing terminals, file managers, text editors, about dialogs, and task
managers. Supports session persistence via localStorage.

## Example

```ts
const shell = new VirtualShell("desktop-vm");
await shell.ensureInitialized();

const desktop = new DesktopManager(shell, document.getElementById("desktop")!);
desktop.setOnExit(() => console.log("Desktop closed"));

// Start the desktop (returns a promise that resolves on stop)
desktop.start();

// Create windows programmatically
desktop.createTerminalWindow();
desktop.createThunarWindow("/home/user");
desktop.createEditorWindow("/home/user/notes.txt");
```

## Constructors

### Constructor

> **new DesktopManager**(`shell`, `container`): `DesktopManager`

Defined in: [src/modules/desktopManager.ts:138](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L138)

Creates a desktop manager bound to a VirtualShell and DOM container.

#### Parameters

##### shell

[`VirtualShell`](VirtualShell.md)

VirtualShell providing filesystem and command execution.

##### container

`HTMLElement`

DOM element to render the desktop into.

#### Returns

`DesktopManager`

## Methods

### closeWindow()

> **closeWindow**(`id`): `void`

Defined in: [src/modules/desktopManager.ts:421](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L421)

Close a window by ID. Removes it from the desktop and cleans up resources.

#### Parameters

##### id

`string`

Window ID to close.

#### Returns

`void`

***

### createAboutWindow()

> **createAboutWindow**(): `string`

Defined in: [src/modules/desktopManager.ts:387](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L387)

Create an "About" window showing system information.

#### Returns

`string`

The unique window ID.

***

### createEditorWindow()

> **createEditorWindow**(`path?`): `string`

Defined in: [src/modules/desktopManager.ts:372](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L372)

Create a new text editor window (Nano-based).

#### Parameters

##### path?

`string` = `"/root/untitled.txt"`

File path to open (default: "/root/untitled.txt").

#### Returns

`string`

The unique window ID.

***

### createTaskManagerWindow()

> **createTaskManagerWindow**(): `string`

Defined in: [src/modules/desktopManager.ts:400](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L400)

Create a task manager window showing running processes.

#### Returns

`string`

The unique window ID.

***

### createTerminalWindow()

> **createTerminalWindow**(): `string`

Defined in: [src/modules/desktopManager.ts:303](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L303)

Create a new terminal window with an interactive shell session.

#### Returns

`string`

The unique window ID.

***

### createThunarWindow()

> **createThunarWindow**(`path?`): `string`

Defined in: [src/modules/desktopManager.ts:358](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L358)

Create a new Thunar file manager window.

#### Parameters

##### path?

`string` = `"/root"`

Initial directory to browse (default: "/root").

#### Returns

`string`

The unique window ID.

***

### focusWindow()

> **focusWindow**(`id`): `void`

Defined in: [src/modules/desktopManager.ts:484](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L484)

Bring a window to the front and mark it as focused.

#### Parameters

##### id

`string`

Window ID to focus.

#### Returns

`void`

***

### getFocusedTerminal()

> **getFocusedTerminal**(): \{ `dataListeners`: (`chunk`) => `void`[]; `preEl`: `HTMLPreElement`; `stream`: [`ShellStream`](../interfaces/ShellStream.md); \} \| `null`

Defined in: [src/modules/desktopManager.ts:242](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L242)

Get the focused terminal window's stream and DOM element.
Returns null if no terminal is focused or all are minimized.

#### Returns

\{ `dataListeners`: (`chunk`) => `void`[]; `preEl`: `HTMLPreElement`; `stream`: [`ShellStream`](../interfaces/ShellStream.md); \} \| `null`

Terminal stream, data listeners, and pre element for rendering.

***

### handleKeyDown()

> **handleKeyDown**(`e`): `void`

Defined in: [src/modules/desktopManager.ts:260](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L260)

Handle a keyboard event and forward keystrokes to the focused terminal.
Handles Ctrl+C/V passthrough and Escape to close the panel menu.

#### Parameters

##### e

`KeyboardEvent`

Keyboard event from the browser.

#### Returns

`void`

***

### handlePaste()

> **handlePaste**(`e`): `void`

Defined in: [src/modules/desktopManager.ts:288](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L288)

Handle a paste event and forward the clipboard text to the focused terminal.

#### Parameters

##### e

`ClipboardEvent`

Clipboard event from the browser.

#### Returns

`void`

***

### isActive()

> **isActive**(): `boolean`

Defined in: [src/modules/desktopManager.ts:155](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L155)

Returns true if the desktop is currently active and rendered.

#### Returns

`boolean`

***

### setOnExit()

> **setOnExit**(`cb`): `void`

Defined in: [src/modules/desktopManager.ts:158](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L158)

Set a callback invoked when the desktop is stopped.

#### Parameters

##### cb

() => `void`

#### Returns

`void`

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [src/modules/desktopManager.ts:165](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L165)

Start the desktop environment. Renders the desktop UI and restores
any previously saved session. Returns a promise that resolves when
`stop()` is called.

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `void`

Defined in: [src/modules/desktopManager.ts:182](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L182)

Stop the desktop environment. Clears all windows, stops the clock,
removes event listeners, and resolves the start() promise.

#### Returns

`void`

***

### toggleMaximize()

> **toggleMaximize**(`id`): `void`

Defined in: [src/modules/desktopManager.ts:452](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L452)

Toggle the maximized state of a window.
When maximizing, saves the current rect for restoration.

#### Parameters

##### id

`string`

Window ID to toggle.

#### Returns

`void`

***

### toggleMinimize()

> **toggleMinimize**(`id`): `void`

Defined in: [src/modules/desktopManager.ts:439](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L439)

Toggle the minimized state of a window.

#### Parameters

##### id

`string`

Window ID to toggle.

#### Returns

`void`
