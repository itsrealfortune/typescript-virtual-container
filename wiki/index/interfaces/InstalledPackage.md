[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / InstalledPackage

# Interface: InstalledPackage

Defined in: [src/modules/VirtualPackageManager/index.ts:58](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L58)

Runtime record of an installed package, persisted to `/var/lib/dpkg/status`.

## Properties

### architecture

> **architecture**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:64](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L64)

CPU architecture.

***

### description

> **description**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:68](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L68)

Full description.

***

### files

> **files**: `string`[]

Defined in: [src/modules/VirtualPackageManager/index.ts:76](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L76)

Absolute VFS paths written by this package (used by `dpkg -L`).

***

### installedAt

> **installedAt**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:74](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L74)

ISO-8601 timestamp of when the package was installed.

***

### installedSizeKb

> **installedSizeKb**: `number`

Defined in: [src/modules/VirtualPackageManager/index.ts:72](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L72)

Installed disk usage in kilobytes.

***

### maintainer

> **maintainer**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:66](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L66)

Maintainer display string.

***

### name

> **name**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:60](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L60)

Package name.

***

### section

> **section**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:70](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L70)

Repository section.

***

### version

> **version**: `string`

Defined in: [src/modules/VirtualPackageManager/index.ts:62](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L62)

Installed version string.
