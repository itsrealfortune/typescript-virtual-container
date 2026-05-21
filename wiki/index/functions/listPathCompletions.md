[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / listPathCompletions

# Function: listPathCompletions()

> **listPathCompletions**(`vfs`, `cwd`, `prefix`): `string`[]

Defined in: [src/utils/shellSession.ts:90](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/shellSession.ts#L90)

Lists path completions for tab-completion in the shell.
Filters directory entries that match the given prefix, hides dot-files
unless the prefix itself starts with a dot, and appends `"/"` to directories.

## Parameters

### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

The virtual file system instance.

### cwd

`string`

The current working directory to resolve relative paths against.

### prefix

`string`

The partial path to complete (e.g. `"/usr/lo"` or `"./fo"`).

## Returns

`string`[]

A sorted array of matching completion candidates.
