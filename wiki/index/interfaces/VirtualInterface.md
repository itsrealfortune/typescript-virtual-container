[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualInterface

# Interface: VirtualInterface

Defined in: [src/modules/VirtualNetworkManager.ts:14](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L14)

A virtual network interface, either loopback or ethernet,
with MAC address, MTU, IPv4/IPv6 addresses, and link state.

## Properties

### ipv4

> **ipv4**: `string`

Defined in: [src/modules/VirtualNetworkManager.ts:20](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L20)

***

### ipv4Mask

> **ipv4Mask**: `number`

Defined in: [src/modules/VirtualNetworkManager.ts:21](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L21)

***

### ipv6

> **ipv6**: `string`

Defined in: [src/modules/VirtualNetworkManager.ts:22](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L22)

***

### mac

> **mac**: `string`

Defined in: [src/modules/VirtualNetworkManager.ts:17](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L17)

***

### mtu

> **mtu**: `number`

Defined in: [src/modules/VirtualNetworkManager.ts:18](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L18)

***

### name

> **name**: `string`

Defined in: [src/modules/VirtualNetworkManager.ts:15](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L15)

***

### state

> **state**: `"UP"` \| `"DOWN"`

Defined in: [src/modules/VirtualNetworkManager.ts:19](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L19)

***

### type

> **type**: `"loopback"` \| `"ether"`

Defined in: [src/modules/VirtualNetworkManager.ts:16](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L16)
