[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / getArg

# Function: getArg()

> **getArg**(`args`, `index`, `options?`): `string` \| `undefined`

Defined in: [src/commands/command-helpers.ts:197](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/commands/command-helpers.ts#L197)

Returns the positional argument at the given zero-based index, skipping
known flags and their values.

Flags declared in `options.flags` are treated as boolean and skipped.
Flags declared in `options.flagsWithValue` consume the next token too.
Tokens after `--` are always treated as positionals.

## Parameters

### args

`string`[]

Tokenized argument array from `CommandContext.args`.

### index

`number`

Zero-based positional index to retrieve.

### options?

[`ArgParseOptions`](../type-aliases/ArgParseOptions.md) = `{}`

Optional flag declarations to skip during positional collection.

## Returns

`string` \| `undefined`

The positional value, or `undefined` if the index is out of range.

## Example

```ts
// args = ["-r", "src", "dest"]
getArg(args, 0, { flags: ["-r"] }) // "src"
getArg(args, 1, { flags: ["-r"] }) // "dest"
```
