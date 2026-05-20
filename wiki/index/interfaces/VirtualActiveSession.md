[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualActiveSession

# Interface: VirtualActiveSession

Defined in: [src/modules/VirtualUserManager/index.ts:55](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L55)

Runtime representation of authenticated SSH session.

## Properties

### id

> **id**: `string`

Defined in: [src/modules/VirtualUserManager/index.ts:57](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L57)

Stable session identifier (UUID).

***

### remoteAddress

> **remoteAddress**: `string`

Defined in: [src/modules/VirtualUserManager/index.ts:63](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L63)

Remote client IP or host label.

***

### startedAt

> **startedAt**: `string`

Defined in: [src/modules/VirtualUserManager/index.ts:65](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L65)

ISO-8601 start timestamp.

***

### tty

> **tty**: `string`

Defined in: [src/modules/VirtualUserManager/index.ts:61](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L61)

Virtual terminal identifier (pts/*).

***

### username

> **username**: `string`

Defined in: [src/modules/VirtualUserManager/index.ts:59](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L59)

Username bound to session.
