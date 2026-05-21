[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / globToRegex

# Function: globToRegex()

> **globToRegex**(`pattern`, `flags?`): `RegExp`

Defined in: [src/utils/glob.ts:14](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/glob.ts#L14)

Convert a shell glob pattern to a RegExp.
Supports: * (any chars), ? (one char), [...] (char class), flags (e.g. "i").
Results are memoized — same pattern+flags returns the cached instance.

## Parameters

### pattern

`string`

### flags?

`string` = `""`

## Returns

`RegExp`
