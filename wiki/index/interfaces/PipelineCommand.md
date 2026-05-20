[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / PipelineCommand

# Interface: PipelineCommand

Defined in: [src/types/pipeline.ts:2](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L2)

Represents a single command in a pipeline.

## Properties

### appendOutput?

> `optional` **appendOutput?**: `boolean`

Defined in: [src/types/pipeline.ts:12](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L12)

Append to output file (>> file)

***

### args

> **args**: `string`[]

Defined in: [src/types/pipeline.ts:6](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L6)

Command arguments

***

### inputFile?

> `optional` **inputFile?**: `string`

Defined in: [src/types/pipeline.ts:8](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L8)

Input redirection file path (< file)

***

### name

> **name**: `string`

Defined in: [src/types/pipeline.ts:4](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L4)

Command name

***

### outputFile?

> `optional` **outputFile?**: `string`

Defined in: [src/types/pipeline.ts:10](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L10)

Output redirection file path (> file)

***

### stderrAppend?

> `optional` **stderrAppend?**: `boolean`

Defined in: [src/types/pipeline.ts:16](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L16)

Append stderr to file (2>> file)

***

### stderrFile?

> `optional` **stderrFile?**: `string`

Defined in: [src/types/pipeline.ts:14](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L14)

Stderr redirection file path (2> file)

***

### stderrToStdout?

> `optional` **stderrToStdout?**: `boolean`

Defined in: [src/types/pipeline.ts:18](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L18)

Redirect stderr to stdout (2>&1)
