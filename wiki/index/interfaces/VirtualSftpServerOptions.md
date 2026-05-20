[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualSftpServerOptions

# Interface: VirtualSftpServerOptions

Defined in: [src/modules/SSHMimic/sftp.ts:149](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHMimic/sftp.ts#L149)

Options for [SftpMimic](../classes/VirtualSftpServer.md) constructor.

## Properties

### hostname?

> `optional` **hostname?**: `string`

Defined in: [src/modules/SSHMimic/sftp.ts:152](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHMimic/sftp.ts#L152)

***

### port?

> `optional` **port?**: `number`

Defined in: [src/modules/SSHMimic/sftp.ts:151](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHMimic/sftp.ts#L151)

TCP port to bind. Optional — omit if using as a subsystem handler only (no standalone server).

***

### shell?

> `optional` **shell?**: [`VirtualShell`](../classes/VirtualShell.md)

Defined in: [src/modules/SSHMimic/sftp.ts:153](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHMimic/sftp.ts#L153)

***

### users?

> `optional` **users?**: [`VirtualUserManager`](../classes/VirtualUserManager.md)

Defined in: [src/modules/SSHMimic/sftp.ts:155](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHMimic/sftp.ts#L155)

***

### vfs?

> `optional` **vfs?**: [`VirtualFileSystem`](../classes/VirtualFileSystem.md)

Defined in: [src/modules/SSHMimic/sftp.ts:154](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHMimic/sftp.ts#L154)
