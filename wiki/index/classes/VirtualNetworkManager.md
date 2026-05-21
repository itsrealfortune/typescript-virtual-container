[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualNetworkManager

# Class: VirtualNetworkManager

Defined in: [src/modules/VirtualNetworkManager.ts:100](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L100)

Virtual network stack with routing table, ARP cache, interface management,
and iptables-style firewall. Provides dynamic data for `ip`, `ping`,
`netstat`, and `/proc/net/*` commands.

## Example

```ts
const net = new VirtualNetworkManager();

// Configure interface
net.setInterfaceIp("eth0", "10.0.1.5", 24);
net.setInterfaceState("eth0", "UP");

// Add a route
net.addRoute("192.168.1.0", "10.0.1.1", "255.255.255.0", "eth0");

// Ping a host
const latency = net.ping("10.0.1.10"); // returns ms or -1

// Firewall: block incoming SSH
net.addFirewallRule({
  chain: "INPUT", protocol: "tcp", destPort: 22, action: "DROP",
});
net.checkFirewall("INPUT", "tcp", "10.0.1.10", "10.0.1.5", 22); // "DROP"

// Format output like real commands
console.log(net.formatIpAddr());   // mimics `ip addr`
console.log(net.formatIpRoute());  // mimics `ip route`
console.log(net.formatFirewall()); // mimics `iptables -L`
```

## Constructors

### Constructor

> **new VirtualNetworkManager**(): `VirtualNetworkManager`

#### Returns

`VirtualNetworkManager`

## Properties

### arpCache

> **arpCache**: [`VirtualArpEntry`](../interfaces/VirtualArpEntry.md)[]

Defined in: [src/modules/VirtualNetworkManager.ts:130](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L130)

## Methods

### addFirewallRule()

> **addFirewallRule**(`rule`): `number`

Defined in: [src/modules/VirtualNetworkManager.ts:317](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L317)

Add a firewall rule. Returns the rule index.

#### Parameters

##### rule

[`FirewallRule`](../interfaces/FirewallRule.md)

Firewall rule with chain, protocol, source/destination, and action.

#### Returns

`number`

Index of the newly added rule in the rules list.

***

### addRoute()

> **addRoute**(`dest`, `gateway`, `netmask`, `device`): `void`

Defined in: [src/modules/VirtualNetworkManager.ts:175](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L175)

Adds a new route to the routing table.

#### Parameters

##### dest

`string`

Destination network or "default".

##### gateway

`string`

Gateway IP address.

##### netmask

`string`

Subnet mask (e.g. "255.255.255.0").

##### device

`string`

Outbound device name (e.g. "eth0").

#### Returns

`void`

***

### checkFirewall()

> **checkFirewall**(`chain`, `protocol`, `source?`, `destination?`, `destPort?`): `"ACCEPT"` \| `"DROP"` \| `"REJECT"`

Defined in: [src/modules/VirtualNetworkManager.ts:372](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L372)

Check if a connection is allowed by the firewall.
Evaluates rules in order, falling back to the chain's default policy.

#### Parameters

##### chain

`"INPUT"` \| `"OUTPUT"` \| `"FORWARD"`

Firewall chain ("INPUT", "OUTPUT", or "FORWARD").

##### protocol

`"all"` \| `"tcp"` \| `"udp"` \| `"icmp"`

Network protocol ("tcp", "udp", "icmp", or "all").

##### source?

`string`

Source IP address (optional).

##### destination?

`string`

Destination IP address (optional).

##### destPort?

`number`

Destination port number (optional).

#### Returns

`"ACCEPT"` \| `"DROP"` \| `"REJECT"`

The firewall action ("ACCEPT", "DROP", or "REJECT").

***

### delRoute()

> **delRoute**(`dest`): `boolean`

Defined in: [src/modules/VirtualNetworkManager.ts:184](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L184)

Removes a route by destination network.

#### Parameters

##### dest

`string`

Destination network to remove.

#### Returns

`boolean`

True if a route was removed, false if no match.

***

### flushFirewall()

> **flushFirewall**(): `void`

Defined in: [src/modules/VirtualNetworkManager.ts:391](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L391)

Flush all firewall rules.

#### Returns

`void`

***

### formatFirewall()

> **formatFirewall**(): `string`

Defined in: [src/modules/VirtualNetworkManager.ts:399](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L399)

List rules in iptables -L format.

#### Returns

`string`

Multi-line string formatted like `iptables -L` output.

***

### formatIpAddr()

> **formatIpAddr**(): `string`

Defined in: [src/modules/VirtualNetworkManager.ts:243](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L243)

Formats all interfaces as `ip addr` output.

#### Returns

`string`

Formatted string mimicking `ip addr` command.

***

### formatIpLink()

> **formatIpLink**(): `string`

Defined in: [src/modules/VirtualNetworkManager.ts:278](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L278)

Formats all interfaces as `ip link` output.

#### Returns

`string`

Formatted string mimicking `ip link` command.

***

### formatIpNeigh()

> **formatIpNeigh**(): `string`

Defined in: [src/modules/VirtualNetworkManager.ts:296](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L296)

Formats the ARP cache as `ip neigh` output.

#### Returns

`string`

Formatted string mimicking `ip neigh` command.

***

### formatIpRoute()

> **formatIpRoute**(): `string`

Defined in: [src/modules/VirtualNetworkManager.ts:265](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L265)

Formats the routing table as `ip route` output.

#### Returns

`string`

Formatted string mimicking `ip route` command.

***

### getArpCache()

> **getArpCache**(): [`VirtualArpEntry`](../interfaces/VirtualArpEntry.md)[]

Defined in: [src/modules/VirtualNetworkManager.ts:164](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L164)

Returns a copy of the ARP cache.

#### Returns

[`VirtualArpEntry`](../interfaces/VirtualArpEntry.md)[]

Array of VirtualArpEntry objects.

***

### getFirewallRules()

> **getFirewallRules**(): [`FirewallRule`](../interfaces/FirewallRule.md)[]

Defined in: [src/modules/VirtualNetworkManager.ts:337](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L337)

Get all firewall rules as a copy.

#### Returns

[`FirewallRule`](../interfaces/FirewallRule.md)[]

Array of FirewallRule objects.

***

### getInterfaces()

> **getInterfaces**(): [`VirtualInterface`](../interfaces/VirtualInterface.md)[]

Defined in: [src/modules/VirtualNetworkManager.ts:148](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L148)

Returns a copy of all configured interfaces.

#### Returns

[`VirtualInterface`](../interfaces/VirtualInterface.md)[]

Array of VirtualInterface objects.

***

### getPolicy()

> **getPolicy**(`chain`): `"ACCEPT"` \| `"DROP"`

Defined in: [src/modules/VirtualNetworkManager.ts:358](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L358)

Get the default policy for a firewall chain.

#### Parameters

##### chain

`string`

Chain name ("INPUT", "OUTPUT", or "FORWARD").

#### Returns

`"ACCEPT"` \| `"DROP"`

The default policy ("ACCEPT" or "DROP").

***

### getRoutes()

> **getRoutes**(): [`VirtualRoute`](../interfaces/VirtualRoute.md)[]

Defined in: [src/modules/VirtualNetworkManager.ts:156](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L156)

Returns a copy of the routing table.

#### Returns

[`VirtualRoute`](../interfaces/VirtualRoute.md)[]

Array of VirtualRoute objects.

***

### ping()

> **ping**(`host`): `number`

Defined in: [src/modules/VirtualNetworkManager.ts:224](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L224)

Simulates an ICMP ping to the given host.

#### Parameters

##### host

`string`

Target IP address or hostname.

#### Returns

`number`

Latency in milliseconds if reachable, -1 if unreachable.

***

### removeFirewallRule()

> **removeFirewallRule**(`index`): `boolean`

Defined in: [src/modules/VirtualNetworkManager.ts:327](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L327)

Remove a firewall rule by index.

#### Parameters

##### index

`number`

Zero-based index of the rule to remove.

#### Returns

`boolean`

True if the rule was removed, false if index was out of range.

***

### setInterfaceIp()

> **setInterfaceIp**(`name`, `ipv4`, `mask`): `boolean`

Defined in: [src/modules/VirtualNetworkManager.ts:211](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L211)

Sets the IPv4 address and prefix length on an interface.

#### Parameters

##### name

`string`

Interface name.

##### ipv4

`string`

New IPv4 address.

##### mask

`number`

New subnet mask prefix length (e.g. 24).

#### Returns

`boolean`

True if the interface was found and updated, false otherwise.

***

### setInterfaceState()

> **setInterfaceState**(`name`, `state`): `boolean`

Defined in: [src/modules/VirtualNetworkManager.ts:197](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L197)

Sets the administrative state of an interface.

#### Parameters

##### name

`string`

Interface name ("lo", "eth0", etc.).

##### state

`"UP"` \| `"DOWN"`

Desired state: "UP" or "DOWN".

#### Returns

`boolean`

True if the interface was found and updated, false otherwise.

***

### setPolicy()

> **setPolicy**(`chain`, `policy`): `boolean`

Defined in: [src/modules/VirtualNetworkManager.ts:347](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L347)

Set the default policy for a firewall chain.

#### Parameters

##### chain

`string`

Chain name ("INPUT", "OUTPUT", or "FORWARD").

##### policy

`"ACCEPT"` \| `"DROP"`

Default action for unmatched packets ("ACCEPT" or "DROP").

#### Returns

`boolean`

True if the chain exists and was updated, false otherwise.
