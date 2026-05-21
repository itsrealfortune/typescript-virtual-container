[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / Statement

# Interface: Statement

Defined in: [src/types/pipeline.ts:47](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L47)

A statement: one pipeline optionally followed by && / || / ; and the next statement

## Properties

### background?

> `optional` **background?**: `boolean`

Defined in: [src/types/pipeline.ts:59](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L59)

Run in background (trailing &).

***

### group?

> `optional` **group?**: [`CommandGroup`](CommandGroup.md)

Defined in: [src/types/pipeline.ts:53](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L53)

Command group to execute (if present instead of pipeline).

***

### next?

> `optional` **next?**: `Statement`

Defined in: [src/types/pipeline.ts:57](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L57)

Optional next statement in sequence.

***

### op?

> `optional` **op?**: [`LogicalOp`](../type-aliases/LogicalOp.md)

Defined in: [src/types/pipeline.ts:55](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L55)

Operator connecting this statement to the next one.

***

### pipeline?

> `optional` **pipeline?**: [`Pipeline`](Pipeline.md)

Defined in: [src/types/pipeline.ts:49](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L49)

Pipeline to execute for this statement.

***

### subshell?

> `optional` **subshell?**: [`Subshell`](Subshell.md)

Defined in: [src/types/pipeline.ts:51](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L51)

Subshell to execute (if present instead of pipeline).
