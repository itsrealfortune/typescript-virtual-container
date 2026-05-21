[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / SshClient

# Class: SshClient

Defined in: [src/modules/SSHClient/index.ts:44](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L44)

Programmatic SSH client wrapping a VirtualShell instance.
Provides typed methods (exec, ls, cat, mkdir, etc.) without real SSH.

## See

 - VirtualShell
 - VirtualSshServer

## Constructors

### Constructor

> **new SshClient**(`shell`, `username`): `SshClient`

Defined in: [src/modules/SSHClient/index.ts:53](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L53)

Creates a programmatic client bound to a virtual shell and user.

#### Parameters

##### shell

[`VirtualShell`](VirtualShell.md)

Parent virtual shell instance.

##### username

`string`

Login user for all commands.

#### Returns

`SshClient`

## Methods

### cat()

> **cat**(`path`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:139](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L139)

Reads file content.

#### Parameters

##### path

`string`

File path.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result with file content in stdout.

***

### cd()

> **cd**(`path`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:124](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L124)

Changes working directory.

#### Parameters

##### path

`string`

Target directory path.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result; updates internal cwd on success.

***

### exec()

> **exec**(`command`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:66](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L66)

Executes raw shell command.

#### Parameters

##### command

`string`

Unparsed command line.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Command result with stdout/stderr/exitCode.

***

### getCwd()

> **getCwd**(): `string`

Defined in: [src/modules/SSHClient/index.ts:239](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L239)

Gets current working directory.

#### Returns

`string`

Normalized cwd path.

***

### getUsername()

> **getUsername**(): `string`

Defined in: [src/modules/SSHClient/index.ts:249](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L249)

Gets logged-in username.

#### Returns

`string`

Associated username.

***

### hostname()

> **hostname**(): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:281](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L281)

Shows hostname.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result from hostname command.

***

### ls()

> **ls**(`path?`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:102](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L102)

Lists directory contents.

#### Parameters

##### path?

`string`

Target directory, defaults to cwd.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result with directory listing in stdout.

***

### mkdir()

> **mkdir**(`path`, `recursive?`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:151](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L151)

Creates directory.

#### Parameters

##### path

`string`

Directory path.

##### recursive?

`boolean` = `false`

When true, create parents.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result from mkdir command.

***

### pwd()

> **pwd**(): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:113](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L113)

Prints current working directory.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result with cwd path in stdout.

***

### readFile()

> **readFile**(`path`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:216](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L216)

Reads file content programmatically.

#### Parameters

##### path

`string`

Target file path.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

File content as string or error in result.

***

### rm()

> **rm**(`path`, `recursive?`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:175](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L175)

Removes file or directory.

#### Parameters

##### path

`string`

Target path.

##### recursive?

`boolean` = `false`

When true, delete directory tree.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result from rm command.

***

### touch()

> **touch**(`path`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:163](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L163)

Creates file (empty).

#### Parameters

##### path

`string`

File path.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result from touch command.

***

### tree()

> **tree**(`path?`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:260](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L260)

Renders tree view of directory.

#### Parameters

##### path?

`string`

Target directory, defaults to cwd.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result with ASCII tree in stdout.

***

### who()

> **who**(): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:291](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L291)

Lists active users/sessions.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result from who command.

***

### whoami()

> **whoami**(): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:271](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L271)

Shows current user.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result from whoami command.

***

### writeFile()

> **writeFile**(`path`, `content`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:188](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L188)

Writes file content.

#### Parameters

##### path

`string`

Target file path.

##### content

`string`

Text to write.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result from touch/write simulation.
