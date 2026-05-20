[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / ShellEnv

# Interface: ShellEnv

Defined in: [src/types/commands.ts:100](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L100)

Per-session shell environment (variables, last exit code).

## Properties

### lastExitCode

> **lastExitCode**: `number`

Defined in: [src/types/commands.ts:104](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L104)

Exit status of the last executed command.

***

### vars

> **vars**: `Record`\<`string`, `string`\>

Defined in: [src/types/commands.ts:102](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L102)

Environment variables visible to commands.
