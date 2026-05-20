[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualShellVfsLike

# Interface: VirtualShellVfsLike

Defined in: [src/modules/VirtualShell/index.ts:50](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L50)

Minimal VFS interface accepted by [VirtualShell](../classes/VirtualShell.md) as a drop-in replacement
for the built-in [VirtualFileSystem](../classes/VirtualFileSystem.md).

## Methods

### chmod()?

> `optional` **chmod**(`targetPath`, `mode`): `void`

Defined in: [src/modules/VirtualShell/index.ts:60](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L60)

#### Parameters

##### targetPath

`string`

##### mode

`number`

#### Returns

`void`

***

### exists()

> **exists**(`targetPath`): `boolean`

Defined in: [src/modules/VirtualShell/index.ts:56](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L56)

#### Parameters

##### targetPath

`string`

#### Returns

`boolean`

***

### flushMirror()

> **flushMirror**(): `Promise`\<`void`\>

Defined in: [src/modules/VirtualShell/index.ts:52](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L52)

#### Returns

`Promise`\<`void`\>

***

### getUsageBytes()?

> `optional` **getUsageBytes**(`targetPath?`): `number`

Defined in: [src/modules/VirtualShell/index.ts:62](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L62)

#### Parameters

##### targetPath?

`string`

#### Returns

`number`

***

### list()

> **list**(`targetPath`): `string`[]

Defined in: [src/modules/VirtualShell/index.ts:58](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L58)

#### Parameters

##### targetPath

`string`

#### Returns

`string`[]

***

### mkdir()

> **mkdir**(`targetPath`, `mode?`): `void`

Defined in: [src/modules/VirtualShell/index.ts:55](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L55)

#### Parameters

##### targetPath

`string`

##### mode?

`number`

#### Returns

`void`

***

### readFile()

> **readFile**(`targetPath`): `string`

Defined in: [src/modules/VirtualShell/index.ts:54](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L54)

#### Parameters

##### targetPath

`string`

#### Returns

`string`

***

### remove()

> **remove**(`targetPath`, `options?`): `void`

Defined in: [src/modules/VirtualShell/index.ts:59](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L59)

#### Parameters

##### targetPath

`string`

##### options?

###### recursive?

`boolean`

#### Returns

`void`

***

### restoreMirror()

> **restoreMirror**(): `Promise`\<`void`\>

Defined in: [src/modules/VirtualShell/index.ts:51](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L51)

#### Returns

`Promise`\<`void`\>

***

### stat()

> **stat**(`targetPath`): [`VfsNodeStats`](../type-aliases/VfsNodeStats.md)

Defined in: [src/modules/VirtualShell/index.ts:57](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L57)

#### Parameters

##### targetPath

`string`

#### Returns

[`VfsNodeStats`](../type-aliases/VfsNodeStats.md)

***

### symlink()?

> `optional` **symlink**(`targetPath`, `linkPath`): `void`

Defined in: [src/modules/VirtualShell/index.ts:61](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L61)

#### Parameters

##### targetPath

`string`

##### linkPath

`string`

#### Returns

`void`

***

### writeFile()

> **writeFile**(`targetPath`, `content`): `void`

Defined in: [src/modules/VirtualShell/index.ts:53](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L53)

#### Parameters

##### targetPath

`string`

##### content

`string` \| `Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`void`
