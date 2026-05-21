[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualSwitch

# Class: VirtualSwitch

Defined in: [src/modules/VirtualSwitch.ts:138](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L138)

Virtual network switch connecting multiple VMs on a shared subnet.
Handles ARP resolution, inter-VM routing, NAT gateway, traffic shaping,
DNS, load balancing, network partitioning, and bandwidth accounting.

## Example

```ts
const sw = new VirtualSwitch("10.0.1.0/24");
const web = new VirtualShell("web-server");
const db  = new VirtualShell("db-server");
await web.ensureInitialized();
await db.ensureInitialized();

const webPort = sw.attach(web, "10.0.1.10");
const dbPort  = sw.attach(db, "10.0.1.20");

sw.addDnsRecord("web", "10.0.1.10");
sw.addDnsRecord("db", "10.0.1.20");

// Route a packet between VMs
const result = await sw.route({
  srcIp: "10.0.1.10", srcMac: webPort.mac,
  dstIp: "10.0.1.20", protocol: "tcp", dstPort: 3306,
});

// Traffic shaping: add 100ms latency to web server
sw.setTrafficRule(webPort.mac, { vms: ["web-server"], latencyMs: 100 });

// Network partition: isolate web from db
sw.setPartitions([[webPort.mac], [dbPort.mac]]);
```

## See

 - Baie
 - VirtualProxy
 - VirtualVpn
 - VirtualNetworkManager

## Constructors

### Constructor

> **new VirtualSwitch**(`subnet?`): `VirtualSwitch`

Defined in: [src/modules/VirtualSwitch.ts:167](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L167)

#### Parameters

##### subnet?

`string` = `"10.0.1.0/24"`

#### Returns

`VirtualSwitch`

## Properties

### gateway

> `readonly` **gateway**: `string`

Defined in: [src/modules/VirtualSwitch.ts:142](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L142)

Gateway IP address (.1 of the subnet).

***

### gatewayMac

> `readonly` **gatewayMac**: `string`

Defined in: [src/modules/VirtualSwitch.ts:144](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L144)

Gateway MAC address.

***

### subnet

> `readonly` **subnet**: `string`

Defined in: [src/modules/VirtualSwitch.ts:140](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L140)

Subnet CIDR (e.g. "10.0.1.0/24").

## Methods

### addDnsRecord()

> **addDnsRecord**(`hostname`, `ip`): `void`

Defined in: [src/modules/VirtualSwitch.ts:245](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L245)

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

Defined in: [src/modules/VirtualSwitch.ts:300](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L300)

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

Defined in: [src/modules/VirtualSwitch.ts:400](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L400)

#### Parameters

##### ip

`string`

#### Returns

`string` \| `null`

***

### attach()

> **attach**(`shell`, `preferredIp?`): [`VmPort`](../interfaces/VmPort.md)

Defined in: [src/modules/VirtualSwitch.ts:182](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L182)

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

Defined in: [src/modules/VirtualSwitch.ts:360](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L360)

Remove all partitions.

#### Returns

`void`

***

### detach()

> **detach**(`mac`): `void`

Defined in: [src/modules/VirtualSwitch.ts:197](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L197)

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

Defined in: [src/modules/VirtualSwitch.ts:388](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L388)

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

Defined in: [src/modules/VirtualSwitch.ts:379](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L379)

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

Defined in: [src/modules/VirtualSwitch.ts:488](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L488)

Get the underlying VirtualNetworkManager for firewall and routing configuration.

#### Returns

[`VirtualNetworkManager`](VirtualNetworkManager.md)

The network manager instance.

***

### getPort()

> **getPort**(`mac`): [`VmPort`](../interfaces/VmPort.md) \| `undefined`

Defined in: [src/modules/VirtualSwitch.ts:218](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L218)

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

Defined in: [src/modules/VirtualSwitch.ts:209](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L209)

Get a copy of all attached ports (MAC → VmPort).

#### Returns

`Map`\<`string`, [`VmPort`](../interfaces/VmPort.md)\>

A new Map of all attached ports keyed by MAC address.

***

### listDnsRecords()

> **listDnsRecords**(): [`DnsRecord`](../interfaces/DnsRecord.md)[]

Defined in: [src/modules/VirtualSwitch.ts:258](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L258)

#### Returns

[`DnsRecord`](../interfaces/DnsRecord.md)[]

***

### removeDnsRecord()

> **removeDnsRecord**(`hostname`): `void`

Defined in: [src/modules/VirtualSwitch.ts:254](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L254)

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

Defined in: [src/modules/VirtualSwitch.ts:311](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L311)

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

Defined in: [src/modules/VirtualSwitch.ts:278](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L278)

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

Defined in: [src/modules/VirtualSwitch.ts:393](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L393)

Reset bandwidth counters.

#### Returns

`void`

***

### resolveHostname()

> **resolveHostname**(`hostname`): `string` \| `null`

Defined in: [src/modules/VirtualSwitch.ts:228](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L228)

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

Defined in: [src/modules/VirtualSwitch.ts:323](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L323)

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

Defined in: [src/modules/VirtualSwitch.ts:410](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L410)

#### Parameters

##### packet

[`Packet`](../interfaces/Packet.md)

#### Returns

`Promise`\<[`PacketResult`](../interfaces/PacketResult.md)\>

***

### setPartitions()

> **setPartitions**(`groups`): `void`

Defined in: [src/modules/VirtualSwitch.ts:355](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L355)

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

Defined in: [src/modules/VirtualSwitch.ts:270](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L270)

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
