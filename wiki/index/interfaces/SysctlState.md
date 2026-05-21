[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / SysctlState

# Interface: SysctlState

Defined in: [src/modules/sysctl.ts:9](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/sysctl.ts#L9)

biome-ignore-all lint/style/useNamingConvention: to fix later

## Properties

### fs

> **fs**: `object`

Defined in: [src/modules/sysctl.ts:57](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/sysctl.ts#L57)

#### file\_max

> **file\_max**: `number`

#### inotify

> **inotify**: `object`

##### inotify.max\_queued\_events

> **max\_queued\_events**: `number`

##### inotify.max\_user\_instances

> **max\_user\_instances**: `number`

##### inotify.max\_user\_watches

> **max\_user\_watches**: `number`

***

### kernel

> **kernel**: `object`

Defined in: [src/modules/sysctl.ts:10](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/sysctl.ts#L10)

#### cap\_last\_cap

> **cap\_last\_cap**: `number`

#### core\_pattern

> **core\_pattern**: `string`

#### core\_uses\_pid

> **core\_uses\_pid**: `number`

#### dmesg\_restrict

> **dmesg\_restrict**: `number`

#### domainname

> **domainname**: `string`

#### hostname

> **hostname**: `string`

#### kptr\_restrict

> **kptr\_restrict**: `number`

#### ngroups\_max

> **ngroups\_max**: `number`

#### osrelease

> **osrelease**: `string`

#### ostype

> **ostype**: `string`

#### panic

> **panic**: `number`

#### panic\_on\_oops

> **panic\_on\_oops**: `number`

#### perf\_event\_paranoid

> **perf\_event\_paranoid**: `number`

#### pid\_max

> **pid\_max**: `number`

#### printk

> **printk**: `string`

#### randomize\_va\_space

> **randomize\_va\_space**: `number`

#### sysrq

> **sysrq**: `number`

#### threads\_max

> **threads\_max**: `number`

#### unprivileged\_userns\_clone

> **unprivileged\_userns\_clone**: `number`

***

### net

> **net**: `object`

Defined in: [src/modules/sysctl.ts:31](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/sysctl.ts#L31)

#### core

> **core**: `object`

##### core.rmem\_max

> **rmem\_max**: `number`

##### core.somaxconn

> **somaxconn**: `number`

##### core.wmem\_max

> **wmem\_max**: `number`

#### ipv4

> **ipv4**: `object`

##### ipv4.ip\_forward

> **ip\_forward**: `number`

##### ipv4.rp\_filter

> **rp\_filter**: `number`

##### ipv4.tcp\_fin\_timeout

> **tcp\_fin\_timeout**: `number`

##### ipv4.tcp\_keepalive\_time

> **tcp\_keepalive\_time**: `number`

##### ipv4.tcp\_syncookies

> **tcp\_syncookies**: `number`

#### ipv6

> **ipv6**: `object`

##### ipv6.disable\_ipv6

> **disable\_ipv6**: `number`

***

### vm

> **vm**: `object`

Defined in: [src/modules/sysctl.ts:48](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/sysctl.ts#L48)

#### dirty\_background\_ratio

> **dirty\_background\_ratio**: `number`

#### dirty\_ratio

> **dirty\_ratio**: `number`

#### min\_free\_kbytes

> **min\_free\_kbytes**: `number`

#### overcommit\_memory

> **overcommit\_memory**: `number`

#### overcommit\_ratio

> **overcommit\_ratio**: `number`

#### swappiness

> **swappiness**: `number`

#### vfs\_cache\_pressure

> **vfs\_cache\_pressure**: `number`
