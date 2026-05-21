[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualSwitch

# Class: VirtualSwitch

Defined in: [src/modules/VirtualSwitch.ts:111](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L111)

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

Defined in: [src/modules/VirtualSwitch.ts:140](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L140)

#### Parameters

##### subnet?

`string` = `"10.0.1.0/24"`

#### Returns

`VirtualSwitch`

## Properties

### gateway

> `readonly` **gateway**: `string`

Defined in: [src/modules/VirtualSwitch.ts:115](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L115)

Gateway IP address (.1 of the subnet).

***

### gatewayMac

> `readonly` **gatewayMac**: `string`

Defined in: [src/modules/VirtualSwitch.ts:117](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L117)

Gateway MAC address.

***

### subnet

> `readonly` **subnet**: `string`

Defined in: [src/modules/VirtualSwitch.ts:113](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L113)

Subnet CIDR (e.g. "10.0.1.0/24").

## Methods

### addDnsRecord()

> **addDnsRecord**(`hostname`, `ip`): `void`

Defined in: [src/modules/VirtualSwitch.ts:218](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L218)

Register or update a DNS record mapping a hostname to an IP.

#### Parameters

##### hostname

`string`

Hostname to register (e.g. "web-server").

##### ip

`string`

IPv4 address to map the hostname to.

#### Returns

`void`

***

### addLoadBalancer()

> **addLoadBalancer**(`rule`): `void`

Defined in: [src/modules/VirtualSwitch.ts:273](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L273)

Add a load balancer rule that distributes traffic on a port
across multiple target hosts using round-robin or least-connections.

#### Parameters

##### rule

[`LoadBalancerRule`](../interfaces/LoadBalancerRule.md)

Load balancer configuration (name, port, targets, algorithm).

#### Returns

`void`

***

### arpResolve()

> **arpResolve**(`ip`): `string` \| `null`

Defined in: [src/modules/VirtualSwitch.ts:373](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L373)

#### Parameters

##### ip

`string`

#### Returns

`string` \| `null`

***

### attach()

> **attach**(`shell`, `preferredIp?`): [`VmPort`](../interfaces/VmPort.md)

Defined in: [src/modules/VirtualSwitch.ts:155](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L155)

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

Defined in: [src/modules/VirtualSwitch.ts:333](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L333)

Remove all partitions.

#### Returns

`void`

***

### detach()

> **detach**(`mac`): `void`

Defined in: [src/modules/VirtualSwitch.ts:170](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L170)

Remove a VM from the switch by MAC address.
Cleans up the port mapping and IP-to-MAC resolution.

#### Parameters

##### mac

`string`

MAC address of the VM to detach.

#### Returns

`void`

***

### getBytesReceived()

> **getBytesReceived**(`mac`): `number`

Defined in: [src/modules/VirtualSwitch.ts:361](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L361)

Get total bytes received by a VM (identified by MAC address).

#### Parameters

##### mac

`string`

MAC address of the VM.

#### Returns

`number`

Total bytes received since counters were last reset.

***

### getBytesSent()

> **getBytesSent**(`mac`): `number`

Defined in: [src/modules/VirtualSwitch.ts:352](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L352)

Get total bytes sent by a VM (identified by MAC address).

#### Parameters

##### mac

`string`

MAC address of the VM.

#### Returns

`number`

Total bytes sent since counters were last reset.

***

### getNetworkManager()

> **getNetworkManager**(): [`VirtualNetworkManager`](VirtualNetworkManager.md)

Defined in: [src/modules/VirtualSwitch.ts:461](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L461)

Get the underlying VirtualNetworkManager for firewall and routing configuration.

#### Returns

[`VirtualNetworkManager`](VirtualNetworkManager.md)

The network manager instance.

***

### getPort()

> **getPort**(`mac`): [`VmPort`](../interfaces/VmPort.md) \| `undefined`

Defined in: [src/modules/VirtualSwitch.ts:191](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L191)

Look up a port by its MAC address.

#### Parameters

##### mac

`string`

MAC address to look up.

#### Returns

[`VmPort`](../interfaces/VmPort.md) \| `undefined`

The VmPort if found, or undefined.

***

### getPorts()

> **getPorts**(): `Map`\<`string`, [`VmPort`](../interfaces/VmPort.md)\>

Defined in: [src/modules/VirtualSwitch.ts:182](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L182)

Get a copy of all attached ports (MAC → VmPort).

#### Returns

`Map`\<`string`, [`VmPort`](../interfaces/VmPort.md)\>

A new Map of all attached ports keyed by MAC address.

***

### listDnsRecords()

> **listDnsRecords**(): [`DnsRecord`](../interfaces/DnsRecord.md)[]

Defined in: [src/modules/VirtualSwitch.ts:231](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L231)

#### Returns

[`DnsRecord`](../interfaces/DnsRecord.md)[]

***

### removeDnsRecord()

> **removeDnsRecord**(`hostname`): `void`

Defined in: [src/modules/VirtualSwitch.ts:227](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L227)

Remove a DNS record by hostname.

#### Parameters

##### hostname

`string`

Hostname to remove from DNS.

#### Returns

`void`

***

### removeLoadBalancer()

> **removeLoadBalancer**(`name`): `void`

Defined in: [src/modules/VirtualSwitch.ts:284](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L284)

Remove a load balancer rule by name.

#### Parameters

##### name

`string`

Name of the load balancer rule to remove.

#### Returns

`void`

***

### removeTrafficRule()

> **removeTrafficRule**(`target`): `void`

Defined in: [src/modules/VirtualSwitch.ts:251](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L251)

Remove traffic shaping rules for a VM.

#### Parameters

##### target

`string`

MAC address or hostname of the VM to unshaped.

#### Returns

`void`

***

### resetBandwidth()

> **resetBandwidth**(): `void`

Defined in: [src/modules/VirtualSwitch.ts:366](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L366)

Reset bandwidth counters.

#### Returns

`void`

***

### resolveHostname()

> **resolveHostname**(`hostname`): `string` \| `null`

Defined in: [src/modules/VirtualSwitch.ts:201](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L201)

Resolve a hostname to an IP address. Checks DNS records first,
then falls back to matching VM hostnames.

#### Parameters

##### hostname

`string`

Hostname to resolve.

#### Returns

`string` \| `null`

The resolved IP address, or null if not found.

***

### resolveLoadBalancer()

> **resolveLoadBalancer**(`port`): \{ `ip`: `string`; `port`: `number`; \} \| `null`

Defined in: [src/modules/VirtualSwitch.ts:296](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L296)

Resolve a load balancer target for a given destination port.
Selects the next target using the configured algorithm.

#### Parameters

##### port

`number`

Destination port to check for load balancing.

#### Returns

\{ `ip`: `string`; `port`: `number`; \} \| `null`

The target IP and port, or null if no load balancer matches.

***

### route()

> **route**(`packet`): `Promise`\<[`PacketResult`](../interfaces/PacketResult.md)\>

Defined in: [src/modules/VirtualSwitch.ts:383](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L383)

#### Parameters

##### packet

[`Packet`](../interfaces/Packet.md)

#### Returns

`Promise`\<[`PacketResult`](../interfaces/PacketResult.md)\>

***

### setPartitions()

> **setPartitions**(`groups`): `void`

Defined in: [src/modules/VirtualSwitch.ts:328](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L328)

Split the network into isolated groups. VMs in different groups
 cannot communicate with each other.

#### Parameters

##### groups

`string`[][]

Array of groups, each containing MAC addresses or hostnames.
 VMs in different groups are isolated from each other.

#### Returns

`void`

***

### setTrafficRule()

> **setTrafficRule**(`target`, `rule`): `void`

Defined in: [src/modules/VirtualSwitch.ts:243](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L243)

Set traffic shaping rules for a VM identified by MAC or hostname.
Controls bandwidth, latency, and packet loss for traffic to/from this VM.

#### Parameters

##### target

`string`

MAC address or hostname of the target VM.

##### rule

[`TrafficRule`](../interfaces/TrafficRule.md)

Traffic shaping parameters (bandwidth, latency, packet loss).

#### Returns

`void`
