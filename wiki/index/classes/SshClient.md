[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / SshClient

# Class: SshClient

Defined in: [src/modules/SSHClient/index.ts:29](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L29)

Programmatic SSH client wrapping a VirtualShell instance.
Provides typed methods (exec, ls, cat, mkdir, etc.) without real SSH.

## See

 - VirtualShell
 - VirtualSshServer

## Constructors

### Constructor

> **new SshClient**(`shell`, `username`): `SshClient`

Defined in: [src/modules/SSHClient/index.ts:38](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L38)

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

Defined in: [src/modules/SSHClient/index.ts:124](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L124)

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

Defined in: [src/modules/SSHClient/index.ts:109](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L109)

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

Defined in: [src/modules/SSHClient/index.ts:51](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L51)

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

Defined in: [src/modules/SSHClient/index.ts:224](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L224)

Gets current working directory.

#### Returns

`string`

Normalized cwd path.

***

### getUsername()

> **getUsername**(): `string`

Defined in: [src/modules/SSHClient/index.ts:234](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L234)

Gets logged-in username.

#### Returns

`string`

Associated username.

***

### hostname()

> **hostname**(): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:266](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L266)

Shows hostname.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result from hostname command.

***

### ls()

> **ls**(`path?`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:87](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L87)

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

Defined in: [src/modules/SSHClient/index.ts:136](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L136)

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

Defined in: [src/modules/SSHClient/index.ts:98](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L98)

Prints current working directory.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result with cwd path in stdout.

***

### readFile()

> **readFile**(`path`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:201](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L201)

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

Defined in: [src/modules/SSHClient/index.ts:160](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L160)

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

Defined in: [src/modules/SSHClient/index.ts:148](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L148)

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

Defined in: [src/modules/SSHClient/index.ts:245](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L245)

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

Defined in: [src/modules/SSHClient/index.ts:276](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L276)

Lists active users/sessions.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result from who command.

***

### whoami()

> **whoami**(): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:256](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L256)

Shows current user.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Result from whoami command.

***

### writeFile()

> **writeFile**(`path`, `content`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/SSHClient/index.ts:173](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHClient/index.ts#L173)

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
