[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / tokenizeCommand

# Function: tokenizeCommand()

> **tokenizeCommand**(`input`): `string`[]

Defined in: [src/utils/tokenize.ts:20](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/tokenize.ts#L20)

Tokenize a shell command line respecting quoted strings and redirect
operators.

- Single-quoted content is preserved verbatim.
- Double-quoted content is preserved (expansion happens later).
- `>`, `>>`, and `<` are emitted as standalone tokens.

## Parameters

### input

`string`

Raw shell command string.

## Returns

`string`[]

Array of string tokens.
