[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / parseArgs

# Function: parseArgs()

> **parseArgs**(`args`, `options?`): `object`

Defined in: [src/commands/command-helpers.ts:238](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/commands/command-helpers.ts#L238)

Parses an argument array into structured flags, flag values, and positionals.

- `options.flags` — boolean flags (e.g. `["-r", "--recursive"]`); collected
  into a `Set<string>` and not treated as positionals.
- `options.flagsWithValue` — flags that consume the next token or an inline
  `=value`; collected into a `Map<string, string>`.
- All remaining tokens are positionals.
- Tokens after `--` are always positionals, regardless of `-` prefix.

## Parameters

### args

`string`[]

Tokenized argument array from `CommandContext.args`.

### options?

Flag declaration lists.

#### flags?

`string`[]

#### flagsWithValue?

`string`[]

## Returns

`object`

`{ flags, flagsWithValues, positionals }`.

### flags

> **flags**: `Set`\<`string`\>

### flagsWithValues

> **flagsWithValues**: `Map`\<`string`, `string`\>

### positionals

> **positionals**: `string`[]

## Example

```ts
const { flags, flagsWithValues, positionals } = parseArgs(args, {
  flags:          ["-r", "--recursive"],
  flagsWithValue: ["-o", "--output"],
});
const recursive = flags.has("-r");
const output    = flagsWithValues.get("-o");
```
