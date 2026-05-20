[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / PackageDefinition

# Interface: PackageDefinition

Defined in: [src/modules/VirtualPackageManager/index.ts:25](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L25)

Metadata and behaviour definition for a single package in the registry.

Used both for the built-in registry entries and for consumer-supplied custom
packages. `files` are written to the VFS on `install()`, and `onInstall` /
`onRemove` hooks allow arbitrary VFS mutations.

## Properties

### architecture?

> `optional` **architecture?**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:31](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L31)

CPU architecture label (default `"amd64"`).

***

### depends?

> `optional` **depends?**: `string`[]

Defined in: [src/modules/VirtualPackageManager/index.ts:41](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L41)

Other package names that must be installed first (resolved recursively).

***

### description

> **description**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:35](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L35)

Full package description.

***

### files?

> `optional` **files?**: [`PackageFile`](PackageFile.md)[]

Defined in: [src/modules/VirtualPackageManager/index.ts:45](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L45)

Files to write into the VFS during installation.

***

### installedSizeKb?

> `optional` **installedSizeKb?**: `number`

Defined in: [src/modules/VirtualPackageManager/index.ts:39](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L39)

Installed disk usage in kilobytes (informational).

***

### maintainer?

> `optional` **maintainer?**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:33](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L33)

Maintainer name and email shown in `apt show` output.

***

### name

> **name**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:27](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L27)

Package name — lowercase, no spaces (e.g. `"vim"`, `"build-essential"`).

***

### onInstall?

> `optional` **onInstall?**: (`vfs`, `users`) => `void`

Defined in: [src/modules/VirtualPackageManager/index.ts:50](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L50)

Hook called after all files are written.
Use to create directories, write config, or register shell commands.

#### Parameters

##### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

##### users

[`VirtualUserManager`](../classes/VirtualUserManager.md)

#### Returns

`void`

***

### onRemove?

> `optional` **onRemove?**: (`vfs`) => `void`

Defined in: [src/modules/VirtualPackageManager/index.ts:52](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L52)

Hook called before VFS files are removed during uninstall.

#### Parameters

##### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

#### Returns

`void`

***

### section?

> `optional` **section?**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:43](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L43)

Repository section (e.g. `"utils"`, `"net"`, `"editors"`, `"devel"`).

***

### shortDesc?

> `optional` **shortDesc?**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:37](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L37)

Short one-line summary shown in `apt search` results.

***

### version

> **version**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:29](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L29)

Debian-style version string (e.g. `"2:9.0.1378-2"`).
