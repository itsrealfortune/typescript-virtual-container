[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VfsDiff

# Interface: VfsDiff

Defined in: [src/utils/vfsDiff.ts:54](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L54)

Full result of a snapshot diff operation.

## Properties

### added

> **added**: [`VfsDiffEntry`](VfsDiffEntry.md)[]

Defined in: [src/utils/vfsDiff.ts:56](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L56)

Paths present in `after` but not in `before`.

***

### clean

> **clean**: `boolean`

Defined in: [src/utils/vfsDiff.ts:62](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L62)

True when there are no differences.

***

### modified

> **modified**: [`VfsDiffModified`](VfsDiffModified.md)[]

Defined in: [src/utils/vfsDiff.ts:60](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L60)

Files whose content or mode changed between snapshots.

***

### removed

> **removed**: [`VfsDiffEntry`](VfsDiffEntry.md)[]

Defined in: [src/utils/vfsDiff.ts:58](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/vfsDiff.ts#L58)

Paths present in `before` but not in `after`.
