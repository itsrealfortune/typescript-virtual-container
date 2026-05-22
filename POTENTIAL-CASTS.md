# Potential Casts Audit

## `src/` — 0 `as any` ✅

All `as any` casts have been eliminated from source code.

## Remaining casts by category

### DOM casts (~30)
**Files:** `thunarManager.ts`, `desktopManager.ts`
**Pattern:** `as HTMLElement`, `as HTMLInputElement`
**Justification:** DOM APIs return `EventTarget` or `Element`. Narrowing to specific element types is required to access properties like `.value`, `.closest()`, `.querySelector()`.

### Discriminated union narrowing (~25)
**Files:** `VirtualFileSystem/index.ts`
**Pattern:** `as InternalFileNode`, `as InternalDirectoryNode`, `as InternalDeviceNode`, `as InternalStubNode`
**Justification:** After checking `node.type === "file"`, TypeScript doesn't always narrow the union in all contexts (especially with optional chaining or nested property access). These are safe narrowing casts following a type guard check.

### Dynamic property access (~15)
**Files:** `sysctl.ts`, `python.ts`, `commands/sysctl.ts`
**Pattern:** `as unknown as Record<string, unknown>`
**Justification:** Sysctl tree is a nested object with dynamic keys determined at runtime. Python interpreter stores arbitrary attributes on module objects. These objects have no static shape that can be expressed in TypeScript.

### 2D array indexing (~12)
**Files:** `webTermRenderer.ts`, `pacmanGame.ts`
**Pattern:** `as Cell[]`
**Justification:** `_screen[r]` can be `undefined` when `r` is at boundaries. The cast asserts the row exists after bounds checking. Could be improved with proper null checks.

### JSON parse results (2)
**Files:** `shellSession.ts`, `sessionManager.ts`
**Pattern:** `as LastLogin`, `as SerializedWindow[]`
**Justification:** `JSON.parse` returns `unknown`. The cast asserts the parsed shape matches the expected interface.

### Stack pops (2)
**Files:** `nanoEditor.ts`
**Pattern:** `as UndoEntry`
**Justification:** `.pop()` returns `T | undefined`. The cast asserts the stack is non-empty (checked before pop).

### Library interop (3)
**Files:** `SSHMimic/sftp.ts`, `VirtualFileSystem/index.ts`
**Pattern:** `as KeyboardAuthContext`, `as NodeJS.Timeout`
**Justification:** ssh2 library types and Node.js timer types that don't perfectly align with the code's usage.

### Readline internals (2)
**Files:** `self-standalone.ts`
**Pattern:** `as Interface & { history: string[] }`
**Justification:** Access to readline's internal `_history` property not exposed in the public type.

## Improvement opportunities

| Priority | Category | Approach |
|----------|----------|----------|
| Medium | 2D array indexing | Add proper null/undefined checks instead of casts |
| Medium | Stack pops | Use non-null assertion `!` or add guards |
| Low | Union narrowing | Create type guard functions (`isFileNode()`, `isDirNode()`) |
| Low | JSON parse | Use runtime validation (zod/io-ts) instead of casts |
