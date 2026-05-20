[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / ShellModule

# Interface: ShellModule

Defined in: [src/types/commands.ts:140](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L140)

Contract implemented by each shell command module.

## Properties

### aliases?

> `optional` **aliases?**: `string`[]

Defined in: [src/types/commands.ts:148](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L148)

Optional alternative command names.

***

### category?

> `optional` **category?**: `string`

Defined in: [src/types/commands.ts:152](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L152)

Category used for grouped help output.

***

### description?

> `optional` **description?**: `string`

Defined in: [src/types/commands.ts:150](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L150)

Short description shown in `help`.

***

### name

> **name**: `string`

Defined in: [src/types/commands.ts:142](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L142)

Primary command name used in CLI.

***

### params

> **params**: `string`[]

Defined in: [src/types/commands.ts:144](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L144)

Parameter help snippets displayed by help command.

***

### run

> **run**: (`ctx`) => [`CommandResult`](CommandResult.md) \| `Promise`\<[`CommandResult`](CommandResult.md)\>

Defined in: [src/types/commands.ts:146](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L146)

Command handler implementation.

#### Parameters

##### ctx

[`CommandContext`](CommandContext.md)

#### Returns

[`CommandResult`](CommandResult.md) \| `Promise`\<[`CommandResult`](CommandResult.md)\>
