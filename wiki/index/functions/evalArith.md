[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / evalArith

# Function: evalArith()

> **evalArith**(`expr`, `env`): `number`

Defined in: [src/utils/expand.ts:95](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/utils/expand.ts#L95)

Evaluate a simple integer arithmetic expression with a bounded parser.
Supports: +  -  *  /  %  **  unary-  ( )
Variables are resolved from `env`.
Returns NaN on syntax error.

## Parameters

### expr

`string`

### env

`Record`\<`string`, `string`\>

## Returns

`number`
