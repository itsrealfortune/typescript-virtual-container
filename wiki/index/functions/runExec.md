[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / runExec

# Function: runExec()

> **runExec**(`stream`, `cmd`, `authUser`, `hostname`, `shell`): `void`

Defined in: [src/modules/SSHMimic/exec.ts:21](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHMimic/exec.ts#L21)

Handles SSH exec channel requests. Runs the given command in a non-interactive
shell session and writes stdout/stderr to the stream, then signals exit.

## Parameters

### stream

[`ExecStream`](../interfaces/ExecStream.md)

The stream parameter.

### cmd

`string`

The cmd parameter.

### authUser

`string`

The authenticated username.

### hostname

`string`

The hostname parameter.

### shell

[`VirtualShell`](../classes/VirtualShell.md)

The shell parameter.

## Returns

`void`
