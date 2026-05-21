[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / keyToBytes

# Function: keyToBytes()

> **keyToBytes**(`e`): `Uint8Array`\<`ArrayBufferLike`\> \| `null`

Defined in: [src/utils/keyToBytes.ts:14](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/keyToBytes.ts#L14)

Convert a browser KeyboardEvent to the corresponding terminal byte sequence.
Handles Ctrl+key, Alt+key, arrow keys, function keys, Home/End, PageUp/Down, etc.

## Parameters

### e

`KeyboardEvent`

Browser keyboard event.

## Returns

`Uint8Array`\<`ArrayBufferLike`\> \| `null`

Uint8Array of terminal bytes, or null if the key has no terminal mapping.
