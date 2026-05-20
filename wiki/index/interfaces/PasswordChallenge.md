[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / PasswordChallenge

# Interface: PasswordChallenge

Defined in: [src/types/commands.ts:72](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L72)

Generic password challenge — used by adduser, passwd, deluser.

## Properties

### action

> **action**: `"adduser"` \| `"deluser"` \| `"passwd"` \| `"su"`

Defined in: [src/types/commands.ts:82](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L82)

Tag identifying what to do with the entered value.

***

### confirmPrompt?

> `optional` **confirmPrompt?**: `string`

Defined in: [src/types/commands.ts:78](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L78)

If set, a second prompt is shown for confirmation.

***

### confirmText?

> `optional` **confirmText?**: `string`

Defined in: [src/types/commands.ts:80](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L80)

Prompt shown for a destructive confirmation (y/N).

***

### newUsername?

> `optional` **newUsername?**: `string`

Defined in: [src/types/commands.ts:86](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L86)

For adduser: the new user's username (already validated).

***

### preamble?

> `optional` **preamble?**: `string`

Defined in: [src/types/commands.ts:74](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L74)

Lines to print before the first prompt.

***

### prompt

> **prompt**: `string`

Defined in: [src/types/commands.ts:76](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L76)

Primary prompt text (e.g. "New password: ").

***

### targetUsername

> **targetUsername**: `string`

Defined in: [src/types/commands.ts:84](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L84)

Username targeted by the action.
