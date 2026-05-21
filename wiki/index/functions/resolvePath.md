[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / resolvePath

# Function: resolvePath()

> **resolvePath**(`cwd`, `inputPath`, `homeDir?`): `string`

Defined in: [src/commands/helpers.ts:18](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/commands/helpers.ts#L18)

Resolves a path string against the virtual file system.
Supports `~` as shorthand for the home directory. If `inputPath` is
absolute it is returned as-is; otherwise it is joined to `cwd`.

## Parameters

### cwd

`string`

The current working directory

### inputPath

`string`

The path string to resolve

### homeDir?

`string`

The home directory to use for `~` expansion (defaults to `/root`)

## Returns

`string`

The normalized absolute path
