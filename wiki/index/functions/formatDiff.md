[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / formatDiff

# Function: formatDiff()

> **formatDiff**(`diff`, `options?`): `string`

Defined in: [src/utils/vfsDiff.ts:184](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L184)

Format a `VfsDiff` as a human-readable string similar to `git diff --stat`.

## Parameters

### diff

[`VfsDiff`](../interfaces/VfsDiff.md)

Result from `diffSnapshots`.

### options?

Formatting options.

#### maxContentChars?

`number`

Max chars of content to show per change. Default: 120.

#### showContent?

`boolean`

Show file content changes inline. Default: false.

## Returns

`string`
