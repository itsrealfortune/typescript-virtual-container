[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualNetworkManager

# Class: VirtualNetworkManager

Defined in: [src/modules/VirtualNetworkManager.ts:73](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L73)

Virtual network stack with routing table, ARP cache, and interface management.
Provides dynamic data for `ip`, `ping`, and `/proc/net/*`.

## Constructors

### Constructor

> **new VirtualNetworkManager**(): `VirtualNetworkManager`

#### Returns

`VirtualNetworkManager`

## Properties

### arpCache

> **arpCache**: [`VirtualArpEntry`](../interfaces/VirtualArpEntry.md)[]

Defined in: [src/modules/VirtualNetworkManager.ts:103](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L103)

## Methods

### addFirewallRule()

> **addFirewallRule**(`rule`): `number`

Defined in: [src/modules/VirtualNetworkManager.ts:290](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L290)

Add a firewall rule. Returns the rule index.

#### Parameters

##### rule

[`FirewallRule`](../interfaces/FirewallRule.md)

The rule parameter.

#### Returns

`number`

The numeric result.

***

### addRoute()

> **addRoute**(`dest`, `gateway`, `netmask`, `device`): `void`

Defined in: [src/modules/VirtualNetworkManager.ts:148](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L148)

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

Defined in: [src/modules/VirtualNetworkManager.ts:345](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L345)

Check if a connection is allowed by the firewall.
Returns the action (ACCEPT, DROP, REJECT) for the given parameters.

#### Parameters

##### chain

`"INPUT"` \| `"OUTPUT"` \| `"FORWARD"`

The chain parameter.

##### protocol

`"all"` \| `"tcp"` \| `"udp"` \| `"icmp"`

The protocol parameter.

##### source?

`string`

The source parameter.

##### destination?

`string`

The destination parameter.

##### destPort?

`number`

The destPort parameter.

#### Returns

`"ACCEPT"` \| `"DROP"` \| `"REJECT"`

The operation result.

***

### delRoute()

> **delRoute**(`dest`): `boolean`

Defined in: [src/modules/VirtualNetworkManager.ts:157](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L157)

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

Defined in: [src/modules/VirtualNetworkManager.ts:364](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L364)

Flush all firewall rules.

#### Returns

`void`

***

### formatFirewall()

> **formatFirewall**(): `string`

Defined in: [src/modules/VirtualNetworkManager.ts:372](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L372)

List rules in iptables -L format.

#### Returns

`string`

The result string.

***

### formatIpAddr()

> **formatIpAddr**(): `string`

Defined in: [src/modules/VirtualNetworkManager.ts:216](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L216)

Formats all interfaces as `ip addr` output.

#### Returns

`string`

Formatted string mimicking `ip addr` command.

***

### formatIpLink()

> **formatIpLink**(): `string`

Defined in: [src/modules/VirtualNetworkManager.ts:251](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L251)

Formats all interfaces as `ip link` output.

#### Returns

`string`

Formatted string mimicking `ip link` command.

***

### formatIpNeigh()

> **formatIpNeigh**(): `string`

Defined in: [src/modules/VirtualNetworkManager.ts:269](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L269)

Formats the ARP cache as `ip neigh` output.

#### Returns

`string`

Formatted string mimicking `ip neigh` command.

***

### formatIpRoute()

> **formatIpRoute**(): `string`

Defined in: [src/modules/VirtualNetworkManager.ts:238](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L238)

Formats the routing table as `ip route` output.

#### Returns

`string`

Formatted string mimicking `ip route` command.

***

### getArpCache()

> **getArpCache**(): [`VirtualArpEntry`](../interfaces/VirtualArpEntry.md)[]

Defined in: [src/modules/VirtualNetworkManager.ts:137](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L137)

Returns a copy of the ARP cache.

#### Returns

[`VirtualArpEntry`](../interfaces/VirtualArpEntry.md)[]

Array of VirtualArpEntry objects.

***

### getFirewallRules()

> **getFirewallRules**(): [`FirewallRule`](../interfaces/FirewallRule.md)[]

Defined in: [src/modules/VirtualNetworkManager.ts:310](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L310)

Get all firewall rules.

#### Returns

[`FirewallRule`](../interfaces/FirewallRule.md)[]

The firewall rules.

***

### getInterfaces()

> **getInterfaces**(): [`VirtualInterface`](../interfaces/VirtualInterface.md)[]

Defined in: [src/modules/VirtualNetworkManager.ts:121](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L121)

Returns a copy of all configured interfaces.

#### Returns

[`VirtualInterface`](../interfaces/VirtualInterface.md)[]

Array of VirtualInterface objects.

***

### getPolicy()

> **getPolicy**(`chain`): `"ACCEPT"` \| `"DROP"`

Defined in: [src/modules/VirtualNetworkManager.ts:331](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L331)

Get the default policy for a chain.

#### Parameters

##### chain

`string`

The chain parameter.

#### Returns

`"ACCEPT"` \| `"DROP"`

The operation result.

***

### getRoutes()

> **getRoutes**(): [`VirtualRoute`](../interfaces/VirtualRoute.md)[]

Defined in: [src/modules/VirtualNetworkManager.ts:129](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L129)

Returns a copy of the routing table.

#### Returns

[`VirtualRoute`](../interfaces/VirtualRoute.md)[]

Array of VirtualRoute objects.

***

### ping()

> **ping**(`host`): `number`

Defined in: [src/modules/VirtualNetworkManager.ts:197](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L197)

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

Defined in: [src/modules/VirtualNetworkManager.ts:300](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L300)

Remove a firewall rule by index.

#### Parameters

##### index

`number`

The index parameter.

#### Returns

`boolean`

The success indicator.

***

### setInterfaceIp()

> **setInterfaceIp**(`name`, `ipv4`, `mask`): `boolean`

Defined in: [src/modules/VirtualNetworkManager.ts:184](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L184)

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

Defined in: [src/modules/VirtualNetworkManager.ts:170](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L170)

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

Defined in: [src/modules/VirtualNetworkManager.ts:320](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualNetworkManager.ts#L320)

Set the default policy for a chain.

#### Parameters

##### chain

`string`

The chain parameter.

##### policy

`"ACCEPT"` \| `"DROP"`

The policy parameter.

#### Returns

`boolean`

The success indicator.
