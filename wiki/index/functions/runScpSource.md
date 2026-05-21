[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / runScpSource

# Function: runScpSource()

> **runScpSource**(`stream`, `srcArg`, `_authUser`, `shell`, `recursive`): `void`

Defined in: [src/modules/SSHMimic/scp.ts:233](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHMimic/scp.ts#L233)

Handles SCP source mode (sending files to the client). Traverses the virtual
filesystem and streams file contents using the SCP wire protocol control
messages (C, D, E) in response to client acknowledgements.

## Parameters

### stream

`ScpStream`

SSH channel stream for SCP protocol communication.

### srcArg

`string`

Source path on the server (e.g. "/home/user/file.txt").

### \_authUser

`string`

### shell

[`VirtualShell`](../classes/VirtualShell.md)

VirtualShell providing VFS for file reads.

### recursive

`boolean`

Whether to send directory trees (-r flag).

## Returns

`void`
