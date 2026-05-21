[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / FirewallRule

# Interface: FirewallRule

Defined in: [src/modules/VirtualNetworkManager.ts:51](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L51)

A firewall rule for the virtual network.

## Properties

### action

> **action**: `"ACCEPT"` \| `"DROP"` \| `"REJECT"`

Defined in: [src/modules/VirtualNetworkManager.ts:57](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L57)

***

### chain

> **chain**: `"INPUT"` \| `"OUTPUT"` \| `"FORWARD"`

Defined in: [src/modules/VirtualNetworkManager.ts:52](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L52)

***

### destination?

> `optional` **destination?**: `string`

Defined in: [src/modules/VirtualNetworkManager.ts:55](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L55)

***

### destPort?

> `optional` **destPort?**: `number`

Defined in: [src/modules/VirtualNetworkManager.ts:56](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L56)

***

### protocol

> **protocol**: `"all"` \| `"tcp"` \| `"udp"` \| `"icmp"`

Defined in: [src/modules/VirtualNetworkManager.ts:53](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L53)

***

### source?

> `optional` **source?**: `string`

Defined in: [src/modules/VirtualNetworkManager.ts:54](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L54)
