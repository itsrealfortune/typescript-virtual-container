[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / getFlag

# Function: getFlag()

> **getFlag**(`args`, `flags`): `string` \| `true` \| `undefined`

Defined in: [src/commands/command-helpers.ts:154](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/commands/command-helpers.ts#L154)

Returns the value associated with a flag, or `true` if the flag is present
but has no associated value, or `undefined` if the flag is absent.

Handles three forms:
- `--output file`   → returns `"file"` (next token)
- `--output=file`   → returns `"file"` (inline `=` form)
- `--verbose`       → returns `true` (flag with no value)

## Parameters

### args

`string`[]

Tokenized argument array from `CommandContext.args`.

### flags

`string` \| `string`[]

Single flag string or array of equivalent flag strings.

## Returns

`string` \| `true` \| `undefined`

The flag value string, `true` when valueless, or `undefined`.

## Example

```ts
const output = getFlag(args, ["-o", "--output"]);
if (typeof output === "string") { /* use path */ }
```
