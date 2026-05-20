[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualProxy

# Class: VirtualProxy

Defined in: [src/modules/VirtualProxy.ts:39](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualProxy.ts#L39)

VirtualProxy — bridges the virtual network to the host.

Usage:
```ts
const proxy = new VirtualProxy(baie);
proxy.exposePort("web", 80, 8080);
// curl http://localhost:8080 → VM web:80

proxy.startSocksProxy(1080);
// curl --proxy socks5://localhost:1080 http://10.0.1.2:80
```

## Constructors

### Constructor

> **new VirtualProxy**(`baie`): `VirtualProxy`

Defined in: [src/modules/VirtualProxy.ts:44](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualProxy.ts#L44)

#### Parameters

##### baie

###### getVM

(`name`) => [`VirtualShell`](VirtualShell.md) \| `undefined`

###### listVMs

() => `object`[]

###### switch

[`VirtualSwitch`](VirtualSwitch.md)

#### Returns

`VirtualProxy`

## Methods

### exposePort()

> **exposePort**(`vmName`, `vmPort`, `hostPort`): `void`

Defined in: [src/modules/VirtualProxy.ts:55](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualProxy.ts#L55)

Expose a VM port on the host.

#### Parameters

##### vmName

`string`

Hostname of the target VM.

##### vmPort

`number`

Port inside the VM.

##### hostPort

`number`

Port on the host machine.

#### Returns

`void`

***

### listPorts()

> **listPorts**(): `object`[]

Defined in: [src/modules/VirtualProxy.ts:109](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualProxy.ts#L109)

List all active port forwards.

#### Returns

`object`[]

The operation result.

***

### removePort()

> **removePort**(`hostPort`): `void`

Defined in: [src/modules/VirtualProxy.ts:97](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualProxy.ts#L97)

Remove a port forwarding.

#### Parameters

##### hostPort

`number`

Host port to remove.

#### Returns

`void`

***

### startSocksProxy()

> **startSocksProxy**(`port`): `void`

Defined in: [src/modules/VirtualProxy.ts:119](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualProxy.ts#L119)

Start a SOCKS5 proxy server on the given port.
Host applications can use this proxy to route traffic into the virtual network.

#### Parameters

##### port

`number`

Local port for the SOCKS5 proxy.

#### Returns

`void`

***

### stop()

> **stop**(): `void`

Defined in: [src/modules/VirtualProxy.ts:194](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualProxy.ts#L194)

Stop the SOCKS5 proxy and all port forwards.

#### Returns

`void`
