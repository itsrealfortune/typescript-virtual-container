[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / ShellProperties

# Interface: ShellProperties

Defined in: [src/modules/VirtualShell/index.ts:33](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L33)

Virtual machine identity strings surfaced by system-info commands
(`uname`, `neofetch`, `lsb_release`, `/proc/version`, `/etc/os-release`).

Pass this as the second argument to `new VirtualShell()` to customise the
distro name, kernel version, and CPU architecture reported inside the shell.

## Example

```ts
const shell = new VirtualShell("my-vm", {
  kernel: "6.1.0+custom-amd64",
  os:     "Acme GNU/Linux x64",
  arch:   "x86_64",
});
```

## Properties

### arch

> **arch**: `string`

Defined in: [src/modules/VirtualShell/index.ts:39](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L39)

CPU architecture label (e.g. `"x86_64"`, `"aarch64"`).

***

### gpu?

> `optional` **gpu?**: `string`

Defined in: [src/modules/VirtualShell/index.ts:43](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L43)

GPU label (e.g. `"WebGL Renderer"`).

***

### kernel

> **kernel**: `string`

Defined in: [src/modules/VirtualShell/index.ts:35](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L35)

Kernel version string (e.g. `"1.0.0+itsrealfortune+1-amd64"`).

***

### os

> **os**: `string`

Defined in: [src/modules/VirtualShell/index.ts:37](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L37)

Full OS description (e.g. `"Fortune GNU/Linux x64"`).

***

### resolution?

> `optional` **resolution?**: `string`

Defined in: [src/modules/VirtualShell/index.ts:41](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L41)

Display resolution (e.g. `"1920x1080"`).
