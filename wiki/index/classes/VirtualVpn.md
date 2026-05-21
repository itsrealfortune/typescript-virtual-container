[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualVpn

# Class: VirtualVpn

Defined in: [src/modules/VirtualVpn.ts:61](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualVpn.ts#L61)

Encrypted tunnel between two Baie instances.
Supports one-to-one and hub-and-spoke topologies.

## Constructors

### Constructor

> **new VirtualVpn**(`_baieA`, `baieB`, `options`): `VirtualVpn`

Defined in: [src/modules/VirtualVpn.ts:67](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualVpn.ts#L67)

#### Parameters

##### \_baieA

###### switch

\{ `route`: (`p`) => `Promise`\<[`PacketResult`](../interfaces/PacketResult.md)\>; `subnet`: `string`; \}

###### switch.route

(`p`) => `Promise`\<[`PacketResult`](../interfaces/PacketResult.md)\>

###### switch.subnet

`string`

##### baieB

###### switch

\{ `route`: (`p`) => `Promise`\<[`PacketResult`](../interfaces/PacketResult.md)\>; `subnet`: `string`; \}

###### switch.route

(`p`) => `Promise`\<[`PacketResult`](../interfaces/PacketResult.md)\>

###### switch.subnet

`string`

##### options

[`VpnOptions`](../interfaces/VpnOptions.md)

#### Returns

`VirtualVpn`

## Methods

### addPeer()

> **addPeer**(`peer`): `void`

Defined in: [src/modules/VirtualVpn.ts:82](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualVpn.ts#L82)

Add a peer VPN instance for hub-and-spoke topology.
The peer will forward traffic through this VPN to reach other subnets.

#### Parameters

##### peer

`VirtualVpn`

Another VirtualVpn instance to peer with.

#### Returns

`void`

***

### tunnel()

> **tunnel**(`packet`): `Promise`\<[`PacketResult`](../interfaces/PacketResult.md)\>

Defined in: [src/modules/VirtualVpn.ts:92](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualVpn.ts#L92)

Encrypt a packet, simulate transit latency, decrypt on the remote side,
and route it to the destination VM.

#### Parameters

##### packet

[`Packet`](../interfaces/Packet.md)

Network packet to tunnel across the VPN link.

#### Returns

`Promise`\<[`PacketResult`](../interfaces/PacketResult.md)\>

The routing result from the remote switch (ACCEPT/DROP/REJECT).
