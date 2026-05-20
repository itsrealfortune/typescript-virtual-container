[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / ifFlag

# Function: ifFlag()

> **ifFlag**(`args`, `flags`): `boolean`

Defined in: [src/commands/command-helpers.ts:113](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/commands/command-helpers.ts#L113)

Returns `true` when any of the given flags appear in `args`.

Matches both standalone tokens (`-s`, `--silent`) and inline forms
(`--output=file`). Useful for simple boolean flag checks inside command
`run` handlers.

## Parameters

### args

`string`[]

Tokenized argument array from `CommandContext.args`.

### flags

`string` \| `string`[]

Single flag string or array of equivalent flag strings.

## Returns

`boolean`

`true` if at least one flag is present, otherwise `false`.

## Example

```ts
ifFlag(args, "-r")              // single flag
ifFlag(args, ["-r", "--recursive"]) // aliases
```
