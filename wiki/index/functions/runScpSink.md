[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / runScpSink

# Function: runScpSink()

> **runScpSink**(`stream`, `destArg`, `authUser`, `shell`, `recursive`): `void`

Defined in: [src/modules/SSHMimic/scp.ts:82](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHMimic/scp.ts#L82)

Handles SCP sink mode (receiving files from the client). Parses the SCP wire
protocol control messages (C, D, E, T) and writes file data into the virtual
filesystem.

## Parameters

### stream

`ScpStream`

The stream parameter.

### destArg

`string`

The destination path argument.

### authUser

`string`

The authenticated username.

### shell

[`VirtualShell`](../classes/VirtualShell.md)

The shell parameter.

### recursive

`boolean`

The recursive parameter.

## Returns

`void`
