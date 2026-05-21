[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / resolveReadablePath

# Function: resolveReadablePath()

> **resolveReadablePath**(`vfs`, `cwd`, `inputPath`): `string`

Defined in: [src/commands/helpers.ts:105](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/commands/helpers.ts#L105)

Resolves a path with readable error messages by attempting an exact match
first, then falling back to case-insensitive matching, and finally to a
Levenshtein-distance (≤1) fuzzy match against sibling entries.

## Parameters

### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

The virtual file system instance

### cwd

`string`

The current working directory

### inputPath

`string`

The path string to resolve

## Returns

`string`

The best matching path (exact, case-insensitive, or fuzzy)
