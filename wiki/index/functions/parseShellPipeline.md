[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / parseShellPipeline

# Function: parseShellPipeline()

> **parseShellPipeline**(`rawInput`): [`Pipeline`](../interfaces/Pipeline.md)

Defined in: [src/modules/VirtualShell/shellParser.ts:45](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/shellParser.ts#L45)

Parse a single pipeline string (no &&/||/;) into a `Pipeline` object.
Handles pipes `|`, input/output redirects (`<`, `>`, `>>`), stderr
redirects (`2>`, `2>>`, `2>&1`), and combined redirect (`&>`).

## Parameters

### rawInput

`string`

Single pipeline command string.

## Returns

[`Pipeline`](../interfaces/Pipeline.md)

Parsed Pipeline with commands array and validity flag.
