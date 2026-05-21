[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / parseScript

# Function: parseScript()

> **parseScript**(`rawInput`): [`Script`](../interfaces/Script.md)

Defined in: [src/modules/VirtualShell/shellParser.ts:25](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/shellParser.ts#L25)

Parse a shell input line into a Script (sequence of statements connected
by && / || / ;).  Each statement contains one Pipeline (commands connected
by |).

Handles subshells `(...)`, command groups `{...}`, background jobs `&`,
and heredocs. Returns `{ isValid: false, error }` on parse failure.

## Parameters

### rawInput

`string`

Raw user input string (may contain multiple statements).

## Returns

[`Script`](../interfaces/Script.md)

Parsed Script object with statements array and validity flag.
