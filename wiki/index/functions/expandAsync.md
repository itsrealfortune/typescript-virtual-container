[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / expandAsync

# Function: expandAsync()

> **expandAsync**(`input`, `env`, `lastExit`, `runCmd`): `Promise`\<`string`\>

Defined in: [src/utils/expand.ts:513](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/expand.ts#L513)

Expand all shell forms including `$(cmd)` command substitution.

Processes `$(...)` blocks depth-first, respecting single-quote boundaries.
Then delegates to `expandSync` for the remaining forms.

## Parameters

### input

`string`

Raw string.

### env

`Record`\<`string`, `string`\>

Current session env vars.

### lastExit

`number`

Last exit code.

### runCmd

(`cmd`) => `Promise`\<`string`\>

Async callback to execute a command and return its stdout.

## Returns

`Promise`\<`string`\>
