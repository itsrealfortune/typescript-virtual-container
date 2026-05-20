[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualProcess

# Interface: VirtualProcess

Defined in: [src/modules/VirtualUserManager/index.ts:27](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L27)

Runtime representation of a command currently executing in a session.

## Properties

### abortController?

> `optional` **abortController?**: `AbortController`

Defined in: [src/modules/VirtualUserManager/index.ts:45](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L45)

AbortController for terminating the process.

***

### argv

> **argv**: `string`[]

Defined in: [src/modules/VirtualUserManager/index.ts:37](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L37)

Full argument list (command + args).

***

### command

> **command**: `string`

Defined in: [src/modules/VirtualUserManager/index.ts:35](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L35)

Command name (argv[0]).

***

### exitCode?

> `optional` **exitCode?**: `number`

Defined in: [src/modules/VirtualUserManager/index.ts:47](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L47)

Exit code set when process terminates.

***

### pid

> **pid**: `number`

Defined in: [src/modules/VirtualUserManager/index.ts:29](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L29)

Unique process identifier (auto-incremented).

***

### ppid

> **ppid**: `number`

Defined in: [src/modules/VirtualUserManager/index.ts:31](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L31)

Parent process ID.

***

### signalHandlers

> **signalHandlers**: `Map`\<`number`, (`sig`, `pid`) => `void`\>

Defined in: [src/modules/VirtualUserManager/index.ts:51](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L51)

Custom signal handlers: signal number → handler.

***

### startedAt

> **startedAt**: `string`

Defined in: [src/modules/VirtualUserManager/index.ts:41](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L41)

ISO-8601 start timestamp.

***

### status

> **status**: [`ProcessStatus`](../type-aliases/ProcessStatus.md)

Defined in: [src/modules/VirtualUserManager/index.ts:43](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L43)

Current process state.

***

### terminatedBySignal?

> `optional` **terminatedBySignal?**: `number`

Defined in: [src/modules/VirtualUserManager/index.ts:49](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L49)

Signal that terminated the process (if any).

***

### tty

> **tty**: `string`

Defined in: [src/modules/VirtualUserManager/index.ts:39](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L39)

TTY identifier of the owning session, or "?" for background jobs.

***

### username

> **username**: `string`

Defined in: [src/modules/VirtualUserManager/index.ts:33](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L33)

Username running the process.
