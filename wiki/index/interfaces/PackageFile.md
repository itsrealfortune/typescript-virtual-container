[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / PackageFile

# Interface: PackageFile

Defined in: [src/modules/VirtualPackageManager/index.ts:25](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L25)

A single file entry written into the VFS when a package is installed.

## Properties

### content

> **content**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:29](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L29)

Text content to write.

***

### mode?

> `optional` **mode?**: `number`

Defined in: [src/modules/VirtualPackageManager/index.ts:31](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L31)

POSIX mode bits (default `0o644`; use `0o755` for executables).

***

### path

> **path**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:27](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L27)

Absolute VFS destination path (e.g. `"/usr/bin/vim"`).
