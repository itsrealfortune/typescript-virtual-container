[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / Script

# Interface: Script

Defined in: [src/types/pipeline.ts:63](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L63)

Top-level parse result for a script.

## Properties

### error?

> `optional` **error?**: `string`

Defined in: [src/types/pipeline.ts:69](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L69)

Optional parse error message.

***

### isValid

> **isValid**: `boolean`

Defined in: [src/types/pipeline.ts:67](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L67)

Whether the script was parsed successfully.

***

### statements

> **statements**: [`Statement`](Statement.md)[]

Defined in: [src/types/pipeline.ts:65](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/pipeline.ts#L65)

Statements contained in the script.
