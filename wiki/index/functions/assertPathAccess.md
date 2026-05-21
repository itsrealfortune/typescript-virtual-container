[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / assertPathAccess

# Function: assertPathAccess()

> **assertPathAccess**(`authUser`, `targetPath`, `operation`): `void`

Defined in: [src/commands/helpers.ts:54](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/commands/helpers.ts#L54)

Throw an error if a non-root user attempts to access a protected path.
Protected paths include auth directories and password files.

## Parameters

### authUser

`string`

Authenticated username.

### targetPath

`string`

Path being accessed.

### operation

`string`

Description of the operation (e.g. "read", "write").

## Returns

`void`
