[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / getStaticRootfsSnapshot

# Function: getStaticRootfsSnapshot()

> **getStaticRootfsSnapshot**(`hostname`, `props`): `Buffer`

Defined in: [src/modules/linuxRootfs.ts:2064](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/linuxRootfs.ts#L2064)

Build or retrieve the static rootfs VFSB snapshot for the given
hostname + ShellProperties combination.

Subsequent calls with the same key return the cached Buffer in ~0ms.

## Parameters

### hostname

`string`

### props

[`ShellProperties`](../interfaces/ShellProperties.md)

## Returns

`Buffer`
