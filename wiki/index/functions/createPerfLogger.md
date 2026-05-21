[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / createPerfLogger

# Function: createPerfLogger()

> **createPerfLogger**(`scope`): [`PerfLogger`](../type-aliases/PerfLogger.md)

Defined in: [src/utils/perfLogger.ts:45](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/perfLogger.ts#L45)

Creates a performance logger that logs elapsed-time marks to the console.
Logging is only active when `DEV_MODE` or `RENDER_PERF` env vars are truthy.

## Parameters

### scope

`string`

A label prefixed to every log line (e.g. `"render"`).

## Returns

[`PerfLogger`](../type-aliases/PerfLogger.md)

A [PerfLogger](../type-aliases/PerfLogger.md) instance.
