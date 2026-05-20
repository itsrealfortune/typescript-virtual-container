[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualSwitch

# Class: VirtualSwitch

Defined in: [src/modules/VirtualSwitch.ts:92](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L92)

Virtual network switch connecting multiple VMs on a shared subnet.
Handles ARP resolution, inter-VM routing, NAT gateway, traffic shaping,
DNS, load balancing, network partitioning, and bandwidth accounting.

## See

 - Baie
 - VirtualProxy
 - VirtualVpn
 - VirtualNetworkManager

## Constructors

### Constructor

> **new VirtualSwitch**(`subnet?`): `VirtualSwitch`

Defined in: [src/modules/VirtualSwitch.ts:121](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L121)

#### Parameters

##### subnet?

`string` = `"10.0.1.0/24"`

#### Returns

`VirtualSwitch`

## Properties

### gateway

> `readonly` **gateway**: `string`

Defined in: [src/modules/VirtualSwitch.ts:96](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L96)

Gateway IP address (.1 of the subnet).

***

### gatewayMac

> `readonly` **gatewayMac**: `string`

Defined in: [src/modules/VirtualSwitch.ts:98](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L98)

Gateway MAC address.

***

### subnet

> `readonly` **subnet**: `string`

Defined in: [src/modules/VirtualSwitch.ts:94](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L94)

Subnet CIDR (e.g. "10.0.1.0/24").

## Methods

### addDnsRecord()

> **addDnsRecord**(`hostname`, `ip`): `void`

Defined in: [src/modules/VirtualSwitch.ts:197](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L197)

Register a DNS record.

#### Parameters

##### hostname

`string`

The hostname parameter.

##### ip

`string`

The ip parameter.

#### Returns

`void`

***

### addLoadBalancer()

> **addLoadBalancer**(`rule`): `void`

Defined in: [src/modules/VirtualSwitch.ts:255](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L255)

Add a load balancer rule.

#### Parameters

##### rule

[`LoadBalancerRule`](../interfaces/LoadBalancerRule.md)

The rule parameter.

#### Returns

`void`

***

### arpResolve()

> **arpResolve**(`ip`): `string` \| `null`

Defined in: [src/modules/VirtualSwitch.ts:359](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L359)

#### Parameters

##### ip

`string`

#### Returns

`string` \| `null`

***

### attach()

> **attach**(`shell`, `preferredIp?`): [`VmPort`](../interfaces/VmPort.md)

Defined in: [src/modules/VirtualSwitch.ts:136](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L136)

Attach a VM to the switch. Assigns an IP from the subnet.

#### Parameters

##### shell

[`VirtualShell`](VirtualShell.md)

The VirtualShell to attach.

##### preferredIp?

`string`

Optional specific IP (must be free).

#### Returns

[`VmPort`](../interfaces/VmPort.md)

The port descriptor with assigned MAC and IP.

***

### clearPartitions()

> **clearPartitions**(): `void`

Defined in: [src/modules/VirtualSwitch.ts:313](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L313)

Remove all partitions.

#### Returns

`void`

***

### detach()

> **detach**(`mac`): `void`

Defined in: [src/modules/VirtualSwitch.ts:150](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L150)

Remove a VM from the switch by MAC.

#### Parameters

##### mac

`string`

The mac parameter.

#### Returns

`void`

***

### getBytesReceived()

> **getBytesReceived**(`mac`): `number`

Defined in: [src/modules/VirtualSwitch.ts:347](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L347)

Get total bytes received by a MAC.

#### Parameters

##### mac

`string`

The mac parameter.

#### Returns

`number`

The numeric result.

***

### getBytesSent()

> **getBytesSent**(`mac`): `number`

Defined in: [src/modules/VirtualSwitch.ts:338](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L338)

Get total bytes sent by a MAC.

#### Parameters

##### mac

`string`

The mac parameter.

#### Returns

`number`

The numeric result.

***

### getNetworkManager()

> **getNetworkManager**(): [`VirtualNetworkManager`](VirtualNetworkManager.md)

Defined in: [src/modules/VirtualSwitch.ts:443](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L443)

#### Returns

[`VirtualNetworkManager`](VirtualNetworkManager.md)

***

### getPort()

> **getPort**(`mac`): [`VmPort`](../interfaces/VmPort.md) \| `undefined`

Defined in: [src/modules/VirtualSwitch.ts:171](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L171)

Get a port by MAC address.

#### Parameters

##### mac

`string`

The mac parameter.

#### Returns

[`VmPort`](../interfaces/VmPort.md) \| `undefined`

The VM port descriptor.

***

### getPorts()

> **getPorts**(): `Map`\<`string`, [`VmPort`](../interfaces/VmPort.md)\>

Defined in: [src/modules/VirtualSwitch.ts:162](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L162)

Get all attached ports (MAC → VmPort).

#### Returns

`Map`\<`string`, [`VmPort`](../interfaces/VmPort.md)\>

The map of entries.

***

### listDnsRecords()

> **listDnsRecords**(): [`DnsRecord`](../interfaces/DnsRecord.md)[]

Defined in: [src/modules/VirtualSwitch.ts:210](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L210)

#### Returns

[`DnsRecord`](../interfaces/DnsRecord.md)[]

***

### removeDnsRecord()

> **removeDnsRecord**(`hostname`): `void`

Defined in: [src/modules/VirtualSwitch.ts:206](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L206)

Remove a DNS record.

#### Parameters

##### hostname

`string`

The hostname parameter.

#### Returns

`void`

***

### removeLoadBalancer()

> **removeLoadBalancer**(`name`): `void`

Defined in: [src/modules/VirtualSwitch.ts:266](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L266)

Remove a load balancer.

#### Parameters

##### name

`string`

The name parameter.

#### Returns

`void`

***

### removeTrafficRule()

> **removeTrafficRule**(`target`): `void`

Defined in: [src/modules/VirtualSwitch.ts:229](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L229)

Remove a traffic rule.

#### Parameters

##### target

`string`

The target parameter.

#### Returns

`void`

***

### resetBandwidth()

> **resetBandwidth**(): `void`

Defined in: [src/modules/VirtualSwitch.ts:352](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L352)

Reset bandwidth counters.

#### Returns

`void`

***

### resolveHostname()

> **resolveHostname**(`hostname`): `string` \| `null`

Defined in: [src/modules/VirtualSwitch.ts:180](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L180)

Resolve a hostname to an IP address via DNS records or VM hostnames.

#### Parameters

##### hostname

`string`

The hostname parameter.

#### Returns

`string` \| `null`

The operation result.

***

### resolveLoadBalancer()

> **resolveLoadBalancer**(`port`): \{ `ip`: `string`; `port`: `number`; \} \| `null`

Defined in: [src/modules/VirtualSwitch.ts:276](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L276)

Route through a load balancer. Returns the target IP and port or null.

#### Parameters

##### port

`number`

The port parameter.

#### Returns

\{ `ip`: `string`; `port`: `number`; \} \| `null`

***

### route()

> **route**(`packet`): `Promise`\<[`PacketResult`](../interfaces/PacketResult.md)\>

Defined in: [src/modules/VirtualSwitch.ts:369](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L369)

#### Parameters

##### packet

[`Packet`](../interfaces/Packet.md)

#### Returns

`Promise`\<[`PacketResult`](../interfaces/PacketResult.md)\>

***

### setPartitions()

> **setPartitions**(`groups`): `void`

Defined in: [src/modules/VirtualSwitch.ts:308](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L308)

Split the network into isolated groups. VMs in different groups
 cannot communicate.

#### Parameters

##### groups

`string`[][]

The groups parameter.
 Each group is an array of MAC addresses or hostnames.

#### Returns

`void`

***

### setTrafficRule()

> **setTrafficRule**(`target`, `rule`): `void`

Defined in: [src/modules/VirtualSwitch.ts:221](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L221)

Set traffic shaping for a VM (by MAC or hostname).

#### Parameters

##### target

`string`

The target parameter.

##### rule

[`TrafficRule`](../interfaces/TrafficRule.md)

The rule parameter.

#### Returns

`void`
