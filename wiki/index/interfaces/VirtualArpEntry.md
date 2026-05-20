[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualArpEntry

# Interface: VirtualArpEntry

Defined in: [src/modules/VirtualNetworkManager.ts:41](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L41)

An ARP cache entry mapping an IP address to a MAC address
on a specific device, with neighbour reachability state.

## Properties

### device

> **device**: `string`

Defined in: [src/modules/VirtualNetworkManager.ts:44](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L44)

***

### ip

> **ip**: `string`

Defined in: [src/modules/VirtualNetworkManager.ts:42](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L42)

***

### mac

> **mac**: `string`

Defined in: [src/modules/VirtualNetworkManager.ts:43](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L43)

***

### state

> **state**: `"REACHABLE"` \| `"STALE"` \| `"PERMANENT"`

Defined in: [src/modules/VirtualNetworkManager.ts:45](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L45)
