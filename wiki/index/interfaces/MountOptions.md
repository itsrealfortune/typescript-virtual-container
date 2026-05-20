[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / MountOptions

# Interface: MountOptions

Defined in: [src/types/vfs.ts:114](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L114)

Options for mounting a host directory into the VFS.

## Properties

### hostPath

> **hostPath**: `string`

Defined in: [src/types/vfs.ts:118](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L118)

Path on the host filesystem. Relative paths resolved from `process.cwd()`.

***

### readOnly?

> `optional` **readOnly?**: `boolean`

Defined in: [src/types/vfs.ts:120](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L120)

When `true` (default), write operations inside the mount throw `EROFS`.

***

### vPath

> **vPath**: `string`

Defined in: [src/types/vfs.ts:116](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/types/vfs.ts#L116)

Absolute path inside the VM (e.g. `"/app"`).
