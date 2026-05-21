[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / DesktopManager

# Class: DesktopManager

Defined in: [src/modules/desktopManager.ts:90](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L90)

## Constructors

### Constructor

> **new DesktopManager**(`shell`, `container`): `DesktopManager`

Defined in: [src/modules/desktopManager.ts:109](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L109)

#### Parameters

##### shell

[`VirtualShell`](VirtualShell.md)

##### container

`HTMLElement`

#### Returns

`DesktopManager`

## Methods

### closeWindow()

> **closeWindow**(`id`): `void`

Defined in: [src/modules/desktopManager.ts:341](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L341)

#### Parameters

##### id

`string`

#### Returns

`void`

***

### createAboutWindow()

> **createAboutWindow**(): `string`

Defined in: [src/modules/desktopManager.ts:315](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L315)

#### Returns

`string`

***

### createEditorWindow()

> **createEditorWindow**(`path?`): `string`

Defined in: [src/modules/desktopManager.ts:304](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L304)

#### Parameters

##### path?

`string` = `"/root/untitled.txt"`

#### Returns

`string`

***

### createTaskManagerWindow()

> **createTaskManagerWindow**(): `string`

Defined in: [src/modules/desktopManager.ts:324](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L324)

#### Returns

`string`

***

### createTerminalWindow()

> **createTerminalWindow**(): `string`

Defined in: [src/modules/desktopManager.ts:245](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L245)

#### Returns

`string`

***

### createThunarWindow()

> **createThunarWindow**(`path?`): `string`

Defined in: [src/modules/desktopManager.ts:295](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L295)

#### Parameters

##### path?

`string` = `"/root"`

#### Returns

`string`

***

### focusWindow()

> **focusWindow**(`id`): `void`

Defined in: [src/modules/desktopManager.ts:391](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L391)

#### Parameters

##### id

`string`

#### Returns

`void`

***

### getFocusedTerminal()

> **getFocusedTerminal**(): \{ `dataListeners`: (`chunk`) => `void`[]; `preEl`: `HTMLPreElement`; `stream`: [`ShellStream`](../interfaces/ShellStream.md); \} \| `null`

Defined in: [src/modules/desktopManager.ts:197](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L197)

#### Returns

\{ `dataListeners`: (`chunk`) => `void`[]; `preEl`: `HTMLPreElement`; `stream`: [`ShellStream`](../interfaces/ShellStream.md); \} \| `null`

***

### handleKeyDown()

> **handleKeyDown**(`e`): `void`

Defined in: [src/modules/desktopManager.ts:210](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L210)

#### Parameters

##### e

`KeyboardEvent`

#### Returns

`void`

***

### handlePaste()

> **handlePaste**(`e`): `void`

Defined in: [src/modules/desktopManager.ts:234](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L234)

#### Parameters

##### e

`ClipboardEvent`

#### Returns

`void`

***

### isActive()

> **isActive**(): `boolean`

Defined in: [src/modules/desktopManager.ts:125](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L125)

#### Returns

`boolean`

***

### setOnExit()

> **setOnExit**(`cb`): `void`

Defined in: [src/modules/desktopManager.ts:127](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L127)

#### Parameters

##### cb

() => `void`

#### Returns

`void`

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [src/modules/desktopManager.ts:129](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L129)

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `void`

Defined in: [src/modules/desktopManager.ts:142](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L142)

#### Returns

`void`

***

### toggleMaximize()

> **toggleMaximize**(`id`): `void`

Defined in: [src/modules/desktopManager.ts:363](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L363)

#### Parameters

##### id

`string`

#### Returns

`void`

***

### toggleMinimize()

> **toggleMinimize**(`id`): `void`

Defined in: [src/modules/desktopManager.ts:355](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L355)

#### Parameters

##### id

`string`

#### Returns

`void`
