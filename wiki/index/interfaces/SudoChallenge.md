[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / SudoChallenge

# Interface: SudoChallenge

Defined in: [src/types/commands.ts:41](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L41)

Deferred sudo challenge metadata returned by sudo command.

## Properties

### commandLine

> **commandLine**: `string` \| `null`

Defined in: [src/types/commands.ts:47](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L47)

Command to execute after successful challenge; null for login shell.

***

### loginShell

> **loginShell**: `boolean`

Defined in: [src/types/commands.ts:49](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L49)

True when challenge targets interactive login shell.

***

### mode?

> `optional` **mode?**: `"sudo"` \| `"passwd"` \| `"confirm"`

Defined in: [src/types/commands.ts:58](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L58)

Challenge mode.
- `"sudo"` (default): verify `username`'s password, then run `commandLine`.
- `"passwd"`: multi-step new-password flow; `onPassword` handles each step.
- `"confirm"`: text confirmation flow (e.g. deluser); `onPassword` receives typed text.

***

### onPassword?

> `optional` **onPassword?**: (`input`, `shell`) => `Promise`\<\{ `nextPrompt?`: `string`; `result`: [`CommandResult`](CommandResult.md) \| `null`; \}\>

Defined in: [src/types/commands.ts:65](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L65)

Optional async handler called when the user submits input.
Receives the typed text and the shell instance.
Returns a `CommandResult` written to the terminal, or `null` to show
another prompt (pass `nextPrompt` to change the prompt text).

#### Parameters

##### input

`string`

##### shell

[`VirtualShell`](../classes/VirtualShell.md)

#### Returns

`Promise`\<\{ `nextPrompt?`: `string`; `result`: [`CommandResult`](CommandResult.md) \| `null`; \}\>

***

### prompt

> **prompt**: `string`

Defined in: [src/types/commands.ts:51](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L51)

Prompt text shown before password input.

***

### targetUser

> **targetUser**: `string`

Defined in: [src/types/commands.ts:45](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L45)

Target identity for elevated command.

***

### username

> **username**: `string`

Defined in: [src/types/commands.ts:43](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L43)

User currently requesting elevation.
