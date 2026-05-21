[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / Cell

# Interface: Cell

Defined in: [src/modules/webTermRenderer.ts:11](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L11)

Minimal VT100 screen buffer for browser-side rendering.
Handles the subset of escape sequences emitted by NanoEditor:
  - CSI H / CSI row;colH  (cursor position)
  - CSI K                  (erase to end of line)
  - CSI 2J                 (erase display)
  - CSI ?25l / ?25h        (cursor hide/show)
  - CSI <n> m              (SGR — bold, reverse, fg, bg, reset)

## Properties

### bg

> **bg**: `string` \| `null`

Defined in: [src/modules/webTermRenderer.ts:16](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L16)

***

### bold

> **bold**: `boolean`

Defined in: [src/modules/webTermRenderer.ts:13](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L13)

***

### ch

> **ch**: `string`

Defined in: [src/modules/webTermRenderer.ts:12](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L12)

***

### fg

> **fg**: `string` \| `null`

Defined in: [src/modules/webTermRenderer.ts:15](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L15)

***

### reverse

> **reverse**: `boolean`

Defined in: [src/modules/webTermRenderer.ts:14](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/webTermRenderer.ts#L14)
