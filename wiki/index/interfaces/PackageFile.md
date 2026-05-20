[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / PackageFile

# Interface: PackageFile

Defined in: [src/modules/VirtualPackageManager/index.ts:9](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L9)

A single file entry written into the VFS when a package is installed.

## Properties

### content

> **content**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:13](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L13)

Text content to write.

***

### mode?

> `optional` **mode?**: `number`

Defined in: [src/modules/VirtualPackageManager/index.ts:15](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L15)

POSIX mode bits (default `0o644`; use `0o755` for executables).

***

### path

> **path**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:11](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L11)

Absolute VFS destination path (e.g. `"/usr/bin/vim"`).
