[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / loadOrCreateHostKey

# Function: loadOrCreateHostKey()

> **loadOrCreateHostKey**(`baseDir?`): `string`

Defined in: [src/modules/SSHMimic/hostKey.ts:18](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/SSHMimic/hostKey.ts#L18)

Loads an existing PEM-encoded RSA host key from `.ssh-mimic/host_rsa` under
the given base directory, or generates a new 2048-bit key pair and persists
it to disk. Returns the private key in PEM format.

## Parameters

### baseDir?

`string` = `...`

Base directory for the `.ssh-mimic` folder (default: process.cwd()).

## Returns

`string`

PEM-encoded RSA private key string.
