[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / buildLoginBanner

# Function: buildLoginBanner()

> **buildLoginBanner**(`hostname`, `properties`, `lastLogin`): `string`

Defined in: [src/modules/SSHMimic/loginBanner.ts:26](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHMimic/loginBanner.ts#L26)

Builds the SSH login banner displaying OS info, warranty notice, and the
last login timestamp and origin.

## Parameters

### hostname

`string`

VM hostname to display in the banner.

### properties

[`ShellProperties`](../interfaces/ShellProperties.md)

Shell properties (kernel version, architecture).

### lastLogin

[`LoginBannerState`](../interfaces/LoginBannerState.md) \| `null`

Last login info (timestamp, remote address), or null.

## Returns

`string`

Formatted banner string with CRLF line endings.
