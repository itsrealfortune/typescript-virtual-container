[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / assertDiff

# Function: assertDiff()

> **assertDiff**(`diff`, `expect`): `void`

Defined in: [src/utils/vfsDiff.ts:240](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L240)

Assert that a diff contains specific paths, throwing on mismatch.
Designed for use in test suites.

## Parameters

### diff

[`VfsDiff`](../interfaces/VfsDiff.md)

Result from `diffSnapshots`.

### expect

Expected paths in each category.

#### added?

`string`[]

#### modified?

`string`[]

#### removed?

`string`[]

## Returns

`void`

## Throws

When any expectation is not met.
