[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / signalDefaultAction

# Function: signalDefaultAction()

> **signalDefaultAction**(`sig`): `string`

Defined in: [src/modules/VirtualUserManager/signals.ts:59](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/signals.ts#L59)

Get the default action for a signal.
"terminate" — abort the process
"stop" — mark as stopped
"continue" — mark as running
"ignore" — no action
"core" — terminate (would dump core on real system)

## Parameters

### sig

`number`

## Returns

`string`
