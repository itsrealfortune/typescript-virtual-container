[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / DesktopManager

# Class: DesktopManager

Defined in: [src/modules/desktopManager.ts:70](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L70)

## Constructors

### Constructor

> **new DesktopManager**(`shell`, `container`): `DesktopManager`

Defined in: [src/modules/desktopManager.ts:89](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L89)

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

Defined in: [src/modules/desktopManager.ts:321](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L321)

#### Parameters

##### id

`string`

#### Returns

`void`

***

### createAboutWindow()

> **createAboutWindow**(): `string`

Defined in: [src/modules/desktopManager.ts:295](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L295)

#### Returns

`string`

***

### createEditorWindow()

> **createEditorWindow**(`path?`): `string`

Defined in: [src/modules/desktopManager.ts:284](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L284)

#### Parameters

##### path?

`string` = `"/root/untitled.txt"`

#### Returns

`string`

***

### createTaskManagerWindow()

> **createTaskManagerWindow**(): `string`

Defined in: [src/modules/desktopManager.ts:304](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L304)

#### Returns

`string`

***

### createTerminalWindow()

> **createTerminalWindow**(): `string`

Defined in: [src/modules/desktopManager.ts:225](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L225)

#### Returns

`string`

***

### createThunarWindow()

> **createThunarWindow**(`path?`): `string`

Defined in: [src/modules/desktopManager.ts:275](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L275)

#### Parameters

##### path?

`string` = `"/root"`

#### Returns

`string`

***

### focusWindow()

> **focusWindow**(`id`): `void`

Defined in: [src/modules/desktopManager.ts:371](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L371)

#### Parameters

##### id

`string`

#### Returns

`void`

***

### getFocusedTerminal()

> **getFocusedTerminal**(): \{ `dataListeners`: (`chunk`) => `void`[]; `preEl`: `HTMLPreElement`; `stream`: [`ShellStream`](../interfaces/ShellStream.md); \} \| `null`

Defined in: [src/modules/desktopManager.ts:177](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L177)

#### Returns

\{ `dataListeners`: (`chunk`) => `void`[]; `preEl`: `HTMLPreElement`; `stream`: [`ShellStream`](../interfaces/ShellStream.md); \} \| `null`

***

### handleKeyDown()

> **handleKeyDown**(`e`): `void`

Defined in: [src/modules/desktopManager.ts:190](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L190)

#### Parameters

##### e

`KeyboardEvent`

#### Returns

`void`

***

### handlePaste()

> **handlePaste**(`e`): `void`

Defined in: [src/modules/desktopManager.ts:214](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L214)

#### Parameters

##### e

`ClipboardEvent`

#### Returns

`void`

***

### isActive()

> **isActive**(): `boolean`

Defined in: [src/modules/desktopManager.ts:105](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L105)

#### Returns

`boolean`

***

### setOnExit()

> **setOnExit**(`cb`): `void`

Defined in: [src/modules/desktopManager.ts:107](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L107)

#### Parameters

##### cb

() => `void`

#### Returns

`void`

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [src/modules/desktopManager.ts:109](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L109)

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `void`

Defined in: [src/modules/desktopManager.ts:122](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L122)

#### Returns

`void`

***

### toggleMaximize()

> **toggleMaximize**(`id`): `void`

Defined in: [src/modules/desktopManager.ts:343](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L343)

#### Parameters

##### id

`string`

#### Returns

`void`

***

### toggleMinimize()

> **toggleMinimize**(`id`): `void`

Defined in: [src/modules/desktopManager.ts:335](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/desktopManager.ts#L335)

#### Parameters

##### id

`string`

#### Returns

`void`
