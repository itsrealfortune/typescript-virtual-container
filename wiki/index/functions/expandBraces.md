[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / expandBraces

# Function: expandBraces()

> **expandBraces**(`token`): `string`[]

Defined in: [src/utils/expand.ts:242](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/expand.ts#L242)

Expand brace expressions in a single token.
- `{a,b,c}` → `["a", "b", "c"]`
- `{1..5}` → `["1", "2", "3", "4", "5"]`
- `{a..e}` → `["a", "b", "c", "d", "e"]`
- `prefix{a,b}suffix` → `["prefixasuffix", "prefixbsuffix"]`
Returns a single-element array when no brace expansion applies.

## Parameters

### token

`string`

## Returns

`string`[]
