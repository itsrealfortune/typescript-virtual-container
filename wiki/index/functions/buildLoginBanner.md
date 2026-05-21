[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / buildLoginBanner

# Function: buildLoginBanner()

> **buildLoginBanner**(`hostname`, `properties`, `lastLogin`): `string`

Defined in: [src/modules/SSHMimic/loginBanner.ts:20](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHMimic/loginBanner.ts#L20)

Builds the SSH login banner displaying OS info, warranty notice, and the
last login timestamp and origin.

## Parameters

### hostname

`string`

The hostname parameter.

### properties

[`ShellProperties`](../interfaces/ShellProperties.md)

The properties parameter.

### lastLogin

[`LoginBannerState`](../interfaces/LoginBannerState.md) \| `null`

The lastLogin parameter.

## Returns

`string`

The result string.
