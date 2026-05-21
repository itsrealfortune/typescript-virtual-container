[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / Baie

# Class: Baie

Defined in: [src/modules/VirtualSwitch.ts:519](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L519)

High-level multi-VM orchestrator built on top of VirtualSwitch.

Baie manages a collection of VMs (VirtualShell instances) on a shared
subnet, handling VM creation/destruction, IP assignment, and DNS
auto-registration. Use this for scenarios like simulating a data center,
testing distributed systems, or building network labs.

## Example

```ts
const baie = new Baie("datacenter", "10.0.1.0/24");
const web = await baie.createVM("web-server", undefined, "10.0.1.10");
const db  = await baie.createVM("db-server", undefined, "10.0.1.20");

// VMs can communicate through the switch
baie.switch.addDnsRecord("web", "10.0.1.10");
console.log(baie.listVMs()); // [{ hostname: "web-server", ip: "10.0.1.10", ... }]

await baie.destroyVM("db-server");
```

## See

 - VirtualSwitch
 - VirtualVpn

## Constructors

### Constructor

> **new Baie**(`name`, `subnet?`): `Baie`

Defined in: [src/modules/VirtualSwitch.ts:526](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L526)

#### Parameters

##### name

`string`

##### subnet?

`string` = `"10.0.1.0/24"`

#### Returns

`Baie`

## Properties

### name

> `readonly` **name**: `string`

Defined in: [src/modules/VirtualSwitch.ts:521](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L521)

Human-readable name for this Baie instance.

***

### switch

> `readonly` **switch**: [`VirtualSwitch`](VirtualSwitch.md)

Defined in: [src/modules/VirtualSwitch.ts:523](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L523)

The underlying network switch managing routing, DNS, and traffic shaping.

## Methods

### createVM()

> **createVM**(`hostname`, `vfsOptions?`, `preferredIp?`): `Promise`\<[`VirtualShell`](VirtualShell.md)\>

Defined in: [src/modules/VirtualSwitch.ts:539](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L539)

Create a new VM with the given hostname and optional VFS options.
The VM is attached to the switch and auto-registered in DNS.

#### Parameters

##### hostname

`string`

Unique name for the VM (also used as DNS hostname).

##### vfsOptions?

`undefined`

Optional VFS configuration (defaults to memory mode).

##### preferredIp?

`string`

Optional specific IP address (must be free in the subnet).

#### Returns

`Promise`\<[`VirtualShell`](VirtualShell.md)\>

The initialized VirtualShell for the new VM.

***

### destroyVM()

> **destroyVM**(`hostname`): `Promise`\<`void`\>

Defined in: [src/modules/VirtualSwitch.ts:556](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L556)

Destroy a VM by hostname. Detaches it from the switch and removes its DNS record.

#### Parameters

##### hostname

`string`

Hostname of the VM to destroy.

#### Returns

`Promise`\<`void`\>

***

### getVM()

> **getVM**(`hostname`): [`VirtualShell`](VirtualShell.md) \| `undefined`

Defined in: [src/modules/VirtualSwitch.ts:570](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L570)

Get a VM by hostname.

#### Parameters

##### hostname

`string`

Hostname to look up.

#### Returns

[`VirtualShell`](VirtualShell.md) \| `undefined`

The VirtualShell if found, or undefined.

***

### listVMs()

> **listVMs**(): `object`[]

Defined in: [src/modules/VirtualSwitch.ts:578](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualSwitch.ts#L578)

List all VMs in this Baie with their hostnames and assigned IPs.

#### Returns

`object`[]

Array of VM descriptors containing hostname, IP, and shell.
