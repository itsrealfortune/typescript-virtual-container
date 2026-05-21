[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / InstalledPackage

# Interface: InstalledPackage

Defined in: [src/modules/VirtualPackageManager/index.ts:74](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L74)

Runtime record of an installed package, persisted to `/var/lib/dpkg/status`.

## Properties

### architecture

> **architecture**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:80](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L80)

CPU architecture.

***

### description

> **description**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:84](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L84)

Full description.

***

### files

> **files**: `string`[]

Defined in: [src/modules/VirtualPackageManager/index.ts:92](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L92)

Absolute VFS paths written by this package (used by `dpkg -L`).

***

### installedAt

> **installedAt**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:90](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L90)

ISO-8601 timestamp of when the package was installed.

***

### installedSizeKb

> **installedSizeKb**: `number`

Defined in: [src/modules/VirtualPackageManager/index.ts:88](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L88)

Installed disk usage in kilobytes.

***

### maintainer

> **maintainer**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:82](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L82)

Maintainer display string.

***

### name

> **name**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:76](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L76)

Package name.

***

### section

> **section**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:86](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L86)

Repository section.

***

### version

> **version**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:78](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L78)

Installed version string.
