[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / CommandResult

# Interface: CommandResult

Defined in: [src/types/commands.ts:13](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L13)

Normalized command execution output.

A command can write text, control session lifecycle, request UI state
transitions, and update active identity/cwd.

## Properties

### clearScreen?

> `optional` **clearScreen?**: `boolean`

Defined in: [src/types/commands.ts:19](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L19)

Request full terminal clear before next prompt.

***

### closeSession?

> `optional` **closeSession?**: `boolean`

Defined in: [src/types/commands.ts:21](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L21)

Request current shell/exec session close.

***

### exitCode?

> `optional` **exitCode?**: `number`

Defined in: [src/types/commands.ts:23](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L23)

Optional exit code (default behavior handled by caller).

***

### nextCwd?

> `optional` **nextCwd?**: `string`

Defined in: [src/types/commands.ts:25](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L25)

Optional cwd to apply for next prompt iteration.

***

### openEditor?

> `optional` **openEditor?**: [`NanoEditorSession`](NanoEditorSession.md)

Defined in: [src/types/commands.ts:29](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L29)

Request opening built-in nano editor workflow.

***

### openHtop?

> `optional` **openHtop?**: `boolean`

Defined in: [src/types/commands.ts:31](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L31)

Request opening built-in htop-like screen.

***

### openPacman?

> `optional` **openPacman?**: `boolean`

Defined in: [src/types/commands.ts:33](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L33)

Request opening built-in Pac-Man game.

***

### passwordChallenge?

> `optional` **passwordChallenge?**: [`PasswordChallenge`](PasswordChallenge.md)

Defined in: [src/types/commands.ts:37](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L37)

Request a generic password challenge (adduser, passwd).

***

### stderr?

> `optional` **stderr?**: `string`

Defined in: [src/types/commands.ts:17](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L17)

Standard error payload to append in terminal.

***

### stdout?

> `optional` **stdout?**: `string`

Defined in: [src/types/commands.ts:15](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L15)

Standard output payload to append in terminal.

***

### sudoChallenge?

> `optional` **sudoChallenge?**: [`SudoChallenge`](SudoChallenge.md)

Defined in: [src/types/commands.ts:35](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L35)

Request sudo password challenge flow.

***

### switchUser?

> `optional` **switchUser?**: `string`

Defined in: [src/types/commands.ts:27](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/commands.ts#L27)

Optional user switch for current session state.
