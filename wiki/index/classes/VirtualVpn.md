[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualVpn

# Class: VirtualVpn

Defined in: [src/modules/VirtualVpn.ts:42](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualVpn.ts#L42)

Encrypted tunnel between two Baie instances.
Supports one-to-one and hub-and-spoke topologies.

## Constructors

### Constructor

> **new VirtualVpn**(`_baieA`, `baieB`, `options`): `VirtualVpn`

Defined in: [src/modules/VirtualVpn.ts:48](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualVpn.ts#L48)

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

Defined in: [src/modules/VirtualVpn.ts:62](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualVpn.ts#L62)

Add a peer to this VPN (hub mode).

#### Parameters

##### peer

`VirtualVpn`

The peer parameter.

#### Returns

`void`

***

### tunnel()

> **tunnel**(`packet`): `Promise`\<[`PacketResult`](../interfaces/PacketResult.md)\>

Defined in: [src/modules/VirtualVpn.ts:71](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualVpn.ts#L71)

Encrypt and forward a packet to the other side.

#### Parameters

##### packet

[`Packet`](../interfaces/Packet.md)

The packet parameter.

#### Returns

`Promise`\<[`PacketResult`](../interfaces/PacketResult.md)\>

A promise that resolves with the result.
