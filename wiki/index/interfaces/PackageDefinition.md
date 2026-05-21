[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / PackageDefinition

# Interface: PackageDefinition

Defined in: [src/modules/VirtualPackageManager/index.ts:41](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L41)

Metadata and behaviour definition for a single package in the registry.

Used both for the built-in registry entries and for consumer-supplied custom
packages. `files` are written to the VFS on `install()`, and `onInstall` /
`onRemove` hooks allow arbitrary VFS mutations.

## Properties

### architecture?

> `optional` **architecture?**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:47](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L47)

CPU architecture label (default `"amd64"`).

***

### depends?

> `optional` **depends?**: `string`[]

Defined in: [src/modules/VirtualPackageManager/index.ts:57](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L57)

Other package names that must be installed first (resolved recursively).

***

### description

> **description**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:51](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L51)

Full package description.

***

### files?

> `optional` **files?**: [`PackageFile`](PackageFile.md)[]

Defined in: [src/modules/VirtualPackageManager/index.ts:61](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L61)

Files to write into the VFS during installation.

***

### installedSizeKb?

> `optional` **installedSizeKb?**: `number`

Defined in: [src/modules/VirtualPackageManager/index.ts:55](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L55)

Installed disk usage in kilobytes (informational).

***

### maintainer?

> `optional` **maintainer?**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:49](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L49)

Maintainer name and email shown in `apt show` output.

***

### name

> **name**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:43](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L43)

Package name — lowercase, no spaces (e.g. `"vim"`, `"build-essential"`).

***

### onInstall?

> `optional` **onInstall?**: (`vfs`, `users`) => `void`

Defined in: [src/modules/VirtualPackageManager/index.ts:66](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L66)

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

Defined in: [src/modules/VirtualPackageManager/index.ts:68](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L68)

Hook called before VFS files are removed during uninstall.

#### Parameters

##### vfs

[`VirtualFileSystem`](../classes/VirtualFileSystem.md)

#### Returns

`void`

***

### section?

> `optional` **section?**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:59](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L59)

Repository section (e.g. `"utils"`, `"net"`, `"editors"`, `"devel"`).

***

### shortDesc?

> `optional` **shortDesc?**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:53](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L53)

Short one-line summary shown in `apt search` results.

***

### version

> **version**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:45](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L45)

Debian-style version string (e.g. `"2:9.0.1378-2"`).
