[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / runExec

# Function: runExec()

> **runExec**(`stream`, `cmd`, `authUser`, `hostname`, `shell`): `void`

Defined in: [src/modules/SSHMimic/exec.ts:27](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHMimic/exec.ts#L27)

Handles SSH exec channel requests. Runs the given command in a non-interactive
shell session and writes stdout/stderr to the stream, then signals exit.

## Parameters

### stream

[`ExecStream`](../interfaces/ExecStream.md)

SSH exec channel stream for stdout/stderr writing.

### cmd

`string`

Command string to execute (e.g. "ls -la /tmp").

### authUser

`string`

Authenticated username running the command.

### hostname

`string`

VM hostname for the command context.

### shell

[`VirtualShell`](../classes/VirtualShell.md)

VirtualShell providing VFS and command registry.

## Returns

`void`
