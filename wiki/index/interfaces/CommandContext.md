[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / CommandContext

# Interface: CommandContext

Defined in: [src/types/commands.ts:112](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L112)

Runtime context object passed to each command module.

## Properties

### activeSessions

> **activeSessions**: [`VirtualActiveSession`](VirtualActiveSession.md)[]

Defined in: [src/types/commands.ts:122](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L122)

Snapshot of currently active user sessions.

***

### args

> **args**: `string`[]

Defined in: [src/types/commands.ts:128](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L128)

Tokenized arguments excluding command name.

***

### authUser

> **authUser**: `string`

Defined in: [src/types/commands.ts:114](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L114)

Authenticated user currently bound to stream.

***

### cwd

> **cwd**: `string`

Defined in: [src/types/commands.ts:134](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L134)

Current working directory for command execution.

***

### env

> **env**: [`ShellEnv`](ShellEnv.md)

Defined in: [src/types/commands.ts:136](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L136)

Per-session environment available to command modules.

***

### gid

> **gid**: `number`

Defined in: [src/types/commands.ts:118](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L118)

Effective group ID for permission checks.

***

### hostname

> **hostname**: `string`

Defined in: [src/types/commands.ts:120](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L120)

Virtual hostname shown in prompt and banners.

***

### mode

> **mode**: [`CommandMode`](../type-aliases/CommandMode.md)

Defined in: [src/types/commands.ts:126](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L126)

Invocation mode (interactive shell or direct exec).

***

### rawInput

> **rawInput**: `string`

Defined in: [src/types/commands.ts:124](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L124)

Original unparsed command line input.

***

### shell

> **shell**: [`VirtualShell`](../classes/VirtualShell.md)

Defined in: [src/types/commands.ts:130](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L130)

Virtual shell instance.

***

### stdin?

> `optional` **stdin?**: `string`

Defined in: [src/types/commands.ts:132](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L132)

Optional stdin payload (used by pipes/redirections).

***

### uid

> **uid**: `number`

Defined in: [src/types/commands.ts:116](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L116)

Effective user ID for permission checks.
