[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / ThunarManager

# Class: ThunarManager

Defined in: [src/modules/thunarManager.ts:52](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/thunarManager.ts#L52)

Thunar-like file manager for the browser desktop environment.

Renders a graphical file browser with directory navigation, file operations
(create, delete, rename, copy path), context menus, and trash support.
Integrates with DesktopManager for window management.

## Constructors

### Constructor

> **new ThunarManager**(`host`, `container`): `ThunarManager`

Defined in: [src/modules/thunarManager.ts:60](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/thunarManager.ts#L60)

Create a Thunar file manager instance.

#### Parameters

##### host

`ThunarHost`

Desktop host providing shell, windows, and rendering helpers.

##### container

`HTMLElement`

DOM element to render the file browser into.

#### Returns

`ThunarManager`

## Methods

### renderContent()

> **renderContent**(`el`, `content`): `void`

Defined in: [src/modules/thunarManager.ts:258](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/thunarManager.ts#L258)

Render the file browser content for a Thunar window.

#### Parameters

##### el

`HTMLElement`

Window DOM element.

##### content

[`ThunarContent`](../interfaces/ThunarContent.md)

Thunar content descriptor with the target path.

#### Returns

`void`
