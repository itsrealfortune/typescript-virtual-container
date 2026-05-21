[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / enforceChown

# Function: enforceChown()

> **enforceChown**(`_targetPath`, `uid`): `void`

Defined in: [src/modules/VirtualFileSystem/permissions.ts:136](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/permissions.ts#L136)

Check if `uid` can change ownership of `targetPath`.
Only root can chown.

## Parameters

### \_targetPath

`string`

### uid

`number`

The uid parameter.

## Returns

`void`
