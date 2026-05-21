[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualPackageManager

# Class: VirtualPackageManager

Defined in: [src/modules/VirtualPackageManager/index.ts:629](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L629)

Pure-TypeScript APT/dpkg package manager backed by a built-in registry.

Accessed via `shell.packageManager` — not constructed directly.

`install()` resolves dependencies recursively, writes declared files to the
VFS, runs `onInstall` hooks, and persists state to `/var/lib/dpkg/status`.
`remove()` reverses the process. All state survives VFS snapshot round-trips.

## Example

```ts
const pm = shell.packageManager;
pm.install(["vim", "git"]);
console.log(pm.isInstalled("vim")); // true
console.log(pm.installedCount());   // 2
```

## Constructors

### Constructor

> **new VirtualPackageManager**(`vfs`, `users`): `VirtualPackageManager`

Defined in: [src/modules/VirtualPackageManager/index.ts:640](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L640)

#### Parameters

##### vfs

[`VirtualFileSystem`](VirtualFileSystem.md)

Backing virtual filesystem for file I/O and dpkg status persistence.

##### users

[`VirtualUserManager`](VirtualUserManager.md)

User manager reference passed to `onInstall` hooks.

#### Returns

`VirtualPackageManager`

## Methods

### findInRegistry()

> **findInRegistry**(`name`): [`PackageDefinition`](../interfaces/PackageDefinition.md) \| `undefined`

Defined in: [src/modules/VirtualPackageManager/index.ts:749](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L749)

Looks up a package definition in the built-in registry by name.

#### Parameters

##### name

`string`

Package name (case-insensitive).

#### Returns

[`PackageDefinition`](../interfaces/PackageDefinition.md) \| `undefined`

The matching `PackageDefinition`, or `undefined` if not found.

***

### install()

> **install**(`names`, `opts?`): `object`

Defined in: [src/modules/VirtualPackageManager/index.ts:810](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L810)

Installs one or more packages from the registry.

Dependencies listed in `PackageDefinition.depends` are resolved and
installed automatically. Already-installed packages are skipped. Files
declared in `PackageDefinition.files` are written to the VFS and
`onInstall` hooks are called in dependency order.

#### Parameters

##### names

`string`[]

Package names to install.

##### opts?

Installation options.

###### quiet?

`boolean`

Suppress progress output lines when `true`.

#### Returns

`object`

Terminal-style `output` string and an APT-compatible `exitCode`
         (`0` on success, `100` when a package is not found).

##### exitCode

> **exitCode**: `number`

##### output

> **output**: `string`

***

### installedCount()

> **installedCount**(): `number`

Defined in: [src/modules/VirtualPackageManager/index.ts:791](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L791)

Returns the total number of installed packages.

Used by `neofetch` to populate the `Packages:` field.

#### Returns

`number`

The numeric result.

***

### isInstalled()

> **isInstalled**(`name`): `boolean`

Defined in: [src/modules/VirtualPackageManager/index.ts:780](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L780)

Returns `true` when the given package is currently installed.

#### Parameters

##### name

`string`

Package name (case-insensitive).

#### Returns

`boolean`

The success indicator.

***

### listAvailable()

> **listAvailable**(): [`PackageDefinition`](../interfaces/PackageDefinition.md)[]

Defined in: [src/modules/VirtualPackageManager/index.ts:758](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L758)

Returns all packages in the built-in registry, sorted alphabetically.

#### Returns

[`PackageDefinition`](../interfaces/PackageDefinition.md)[]

Array of `PackageDefinition` entries.

***

### listInstalled()

> **listInstalled**(): [`InstalledPackage`](../interfaces/InstalledPackage.md)[]

Defined in: [src/modules/VirtualPackageManager/index.ts:767](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L767)

Returns all currently installed packages, sorted alphabetically.

#### Returns

[`InstalledPackage`](../interfaces/InstalledPackage.md)[]

Array of `InstalledPackage` records.

***

### load()

> **load**(): `void`

Defined in: [src/modules/VirtualPackageManager/index.ts:656](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L656)

Loads installed package state from `/var/lib/dpkg/status` in the VFS.
Safe to call again to reload state after a snapshot restore.

#### Returns

`void`

***

### remove()

> **remove**(`names`, `opts?`): `object`

Defined in: [src/modules/VirtualPackageManager/index.ts:940](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L940)

Removes one or more installed packages.

Package files are deleted from the VFS. Config files (paths under
`/etc/` or ending in `.conf`) are preserved unless `opts.purge` is set.
The `onRemove` hook is called for each package.

#### Parameters

##### names

`string`[]

Package names to remove.

##### opts?

Removal options.

###### purge?

`boolean`

Also delete configuration files when `true`.

###### quiet?

`boolean`

Suppress progress output lines when `true`.

#### Returns

`object`

Terminal-style `output` string and exit code (`0` on success).

##### exitCode

> **exitCode**: `number`

##### output

> **output**: `string`

***

### search()

> **search**(`term`): [`PackageDefinition`](../interfaces/PackageDefinition.md)[]

Defined in: [src/modules/VirtualPackageManager/index.ts:1011](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L1011)

Searches the registry for packages whose name or description contains
the given term (case-insensitive). Equivalent to `apt-cache search`.

#### Parameters

##### term

`string`

Search string.

#### Returns

[`PackageDefinition`](../interfaces/PackageDefinition.md)[]

Matching `PackageDefinition` entries sorted alphabetically.

***

### show()

> **show**(`name`): `string` \| `null`

Defined in: [src/modules/VirtualPackageManager/index.ts:1028](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualPackageManager/index.ts#L1028)

Returns a dpkg-style metadata block for a package, including its
install status. Equivalent to `apt-cache show` / `dpkg -s`.

#### Parameters

##### name

`string`

Package name.

#### Returns

`string` \| `null`

Multi-line metadata string, or `null` if not in the registry.
