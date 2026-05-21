[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / handleScp

# Function: handleScp()

> **handleScp**(`stream`, `rawArgs`, `authUser`, `shell`): `void`

Defined in: [src/modules/SSHMimic/scp.ts:368](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHMimic/scp.ts#L368)

Handles SCP protocol transfer by parsing the exec arguments to determine
sink (upload) or source (download) mode and delegating accordingly.

## Parameters

### stream

`ScpStream`

The stream parameter.

### rawArgs

`string`[]

The raw arguments array.

### authUser

`string`

The authenticated username.

### shell

[`VirtualShell`](../classes/VirtualShell.md)

The shell parameter.

## Returns

`void`
