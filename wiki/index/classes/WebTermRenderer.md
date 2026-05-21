[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / WebTermRenderer

# Class: WebTermRenderer

Defined in: [src/modules/webTermRenderer.ts:38](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L38)

Minimal VT100 screen buffer for browser-side rendering.
Handles the subset of escape sequences emitted by NanoEditor and other
terminal applications: cursor positioning, erase, SGR styling, and scrollback.

## Example

```ts
const renderer = new WebTermRenderer(24, 80);
renderer.write("\x1b[1mHello\x1b[0m World\r\n");
const html = renderer.renderScrollbackHtml();
document.getElementById("term").innerHTML = html;
```

## Constructors

### Constructor

> **new WebTermRenderer**(`rows`, `cols`): `WebTermRenderer`

Defined in: [src/modules/webTermRenderer.ts:70](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L70)

Create a new terminal screen buffer.

#### Parameters

##### rows

`number`

Number of visible rows (default: 24).

##### cols

`number`

Number of columns (default: 80).

#### Returns

`WebTermRenderer`

## Accessors

### cursorCol

#### Get Signature

> **get** **cursorCol**(): `number`

Defined in: [src/modules/webTermRenderer.ts:342](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L342)

Current cursor column position (0-indexed).

##### Returns

`number`

***

### cursorRow

#### Get Signature

> **get** **cursorRow**(): `number`

Defined in: [src/modules/webTermRenderer.ts:340](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L340)

Current cursor row position (0-indexed).

##### Returns

`number`

***

### isCursorVisible

#### Get Signature

> **get** **isCursorVisible**(): `boolean`

Defined in: [src/modules/webTermRenderer.ts:344](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L344)

Whether the cursor is currently visible (controlled by CSI ?25l/?25h).

##### Returns

`boolean`

***

### scrollbackLength

#### Get Signature

> **get** **scrollbackLength**(): `number`

Defined in: [src/modules/webTermRenderer.ts:354](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L354)

Number of rows currently in the scrollback buffer.

##### Returns

`number`

## Methods

### clearScrollback()

> **clearScrollback**(): `void`

Defined in: [src/modules/webTermRenderer.ts:357](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L357)

Clear the scrollback buffer.

#### Returns

`void`

***

### consumeCleared()

> **consumeCleared**(): `boolean`

Defined in: [src/modules/webTermRenderer.ts:347](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L347)

Returns true (once) if CSI 2J was received since last call.

#### Returns

`boolean`

***

### renderHtml()

> **renderHtml**(): `string`

Defined in: [src/modules/webTermRenderer.ts:303](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L303)

Render current screen state to an HTML string for a <pre> element.

#### Returns

`string`

***

### renderScrollbackHtml()

> **renderScrollbackHtml**(): `string`

Defined in: [src/modules/webTermRenderer.ts:364](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L364)

Render the scrollback buffer as HTML with inline styles for colors and bold.
Each row becomes a div, each styled cell becomes a span.

#### Returns

`string`

HTML string suitable for innerHTML insertion.

***

### resize()

> **resize**(`rows`, `cols`): `void`

Defined in: [src/modules/webTermRenderer.ts:81](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L81)

Resize the terminal screen and preserve existing content.

#### Parameters

##### rows

`number`

New number of rows.

##### cols

`number`

New number of columns.

#### Returns

`void`

***

### write()

> **write**(`data`): `void`

Defined in: [src/modules/webTermRenderer.ts:100](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L100)

Write ANSI escape sequence data to the screen buffer.
Handles cursor movement, erasing, SGR styling, and scrollback.

#### Parameters

##### data

`string`

Raw terminal output string (may contain escape sequences).

#### Returns

`void`
