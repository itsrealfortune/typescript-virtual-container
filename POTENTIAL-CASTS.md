# Casts Audit

## `src/` — 0 `as any` ✅

All `as any` casts have been eliminated from source code.

## Remaining casts by category

### DOM casts (~30)
**Files:** `thunarManager.ts`, `desktopManager.ts`
**Pattern:** `as HTMLElement`, `as HTMLInputElement`
**Justification:** DOM APIs return `EventTarget` or `Element`. Narrowing to specific element types is required to access properties like `.value`, `.closest()`, `.querySelector()`. This is standard TypeScript browser practice.

### Library interop (1)
**Files:** `SSHMimic/sftp.ts`
**Pattern:** `as KeyboardAuthContext`
**Justification:** ssh2 library's auth context types don't use discriminated unions. The `ctx.method === "keyboard-interactive"` check is the runtime guard, but TS can't narrow the type automatically.

### Python interpreter internals (~8)
**Files:** `commands/python.ts`
**Pattern:** `as unknown as Record<string, PyVal>`, `as unknown as PyVal`
**Justification:** The Python interpreter stores arbitrary attributes on module objects and dict values. `PyVal` is a union type (`string | number | PyDict | ...`) and the interpreter dynamically attaches properties like `__methods__`, `_cwd`, and `path`. These casts express the dynamic nature of Python's object model and are unavoidable without a major redesign.

### Readline internals (2)
**Files:** `self-standalone.ts`
**Pattern:** `as unknown as Record<string, unknown>`
**Justification:** Access to readline's internal `_ttyWrite` and `history` properties not exposed in the public `Interface` type. Used for Ctrl+D interception and history injection in the CLI standalone.

### Snapshot deserialization (1)
**Files:** `VirtualFileSystem/index.ts`
**Pattern:** `as DeviceKind`
**Justification:** `VfsSnapshotDeviceNode.deviceKind` is typed as `string` (serialized form) but `InternalDeviceNode.deviceKind` is `DeviceKind` (runtime enum). The cast bridges serialization boundary.

### RegExp match indexing (~15)
**Files:** `sh.ts`, `runtime.ts`, `shell.ts`, `awk.ts`, `sed.ts`, `read.ts`, `coreutils.ts`
**Pattern:** `as string` on `m[1]`, `m[2]`
**Justification:** With `noUncheckedIndexedAccess`, numeric indices on `RegExpMatchArray` are `string | undefined`. These casts assert capture group existence after regex match. Most are safe because match was already tested.

### Array indexing after bounds check (~4)
**Files:** `scp.ts`, `VirtualSwitch/index.ts`, `desktopManager.ts`, `fun.ts`, `python.ts`
**Pattern:** `as Entry`, `as DesktopWindow`, `as string`
**Justification:** Array access after explicit bounds check (`idx >= arr.length` guard, `findIndex !== -1`, or `Math.random() * length`). TS can't infer the index is valid.

## Fixed (no longer present)

| Category | Before | After |
|----------|--------|-------|
| 2D array indexing | ~24 casts (`as Cell[]`) | `_row()` / `_gridRow()` helpers with runtime bounds checks |
| Union narrowing | ~25 casts (`as Internal*Node`) | TS now narrows automatically after `type === "file"` checks |
| Stack pops | 2 casts (`as UndoEntry`) | `undefined` guards after `.pop()` |
| JSON parse | 2 casts (`as LastLogin`, `as SerializedWindow[]`) | Runtime shape validation |
| Dynamic sysctl props | 5 casts (`as unknown as Record<...>`) | Generic `access<T>()` helper with `key in obj` check |
| Color array indexing | 6 casts (`as string`) | `??` fallbacks + typed arrays |
| Dir enum casts | 4 casts (`as Dir[]`) | `readonly Dir[]` constants |
| Ghost array indexing | 2 casts (`as Ghost`) | `_ghost()` helper with bounds check |
| Prev ghost pos | 1 cast | `undefined` guard |
| Snapshot deserialization | 3 casts (`as VfsSnapshot*Node`) | TS narrows automatically after `child.type === "file"` checks |
| RegExp match casts | 5 casts (`as RegExpMatchArray`, `as string`) | Destructuring with `?? []` + `undefined` guards |
| Array indexing after bounds check | 5 casts (`as Entry`, `as DesktopWindow`, etc.) | `undefined` guards after array access |
| Map.get after has check | 2 casts (`as MacAddress`) | Direct `get()` + `undefined` guard instead of `has()` + `get()` |
| Optional property narrowing | 3 casts (`as ShellProperties`, `as ShellStream`, `as HTMLPreElement`) | `undefined` guards or TS automatic narrowing after `type === "terminal"` |
| Snapshot type narrowing | 3 casts (`as VfsSnapshot*Node`) | TS narrows automatically after `node.type === "directory"` checks |
| Array last element | 1 cast (`as VirtualActiveSession`) | `undefined` guard after array access |
| Redundant Map.get cast | 1 cast (`as SftpHandle | undefined`) | Removed — return type already matches |
| Snapshot type narrowing | 3 casts (`as VfsSnapshot*Node`) | TS narrows automatically after `node.type === "directory"` checks |

## Summary

| Status | Count |
|--------|-------|
| `as any` in `src/` | **0** |
| Remaining casts (justified) | ~42 |
| Casts eliminated this session | ~90 |
