[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / Pipeline

# Interface: Pipeline

Defined in: [src/types/pipeline.ts:37](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L37)

Represents a parsed shell pipeline

## Properties

### commands

> **commands**: [`PipelineCommand`](PipelineCommand.md)[]

Defined in: [src/types/pipeline.ts:39](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L39)

List of commands in the pipeline

***

### error?

> `optional` **error?**: `string`

Defined in: [src/types/pipeline.ts:43](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L43)

Error message if parsing failed

***

### isValid

> **isValid**: `boolean`

Defined in: [src/types/pipeline.ts:41](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L41)

Whether this is a valid pipeline
