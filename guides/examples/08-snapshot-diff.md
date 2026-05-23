---
title: 08 - Snapshot Diff
group: Examples
---
# Example 08 — Snapshot Diff

## The Scenario

When testing operations that modify a filesystem — installing a package, running a build tool, executing a deployment script — you need to verify that the right changes were made and that no unexpected changes occurred. The naive approach is to check individual file existence or content after the operation:

```ts
expect(fs.existsSync("/usr/bin/vim")).toBe(true);
expect(fs.readFileSync("/var/log/syslog", "utf8")).toContain("package installed");
```

This works for simple cases but has blind spots: you do not verify that other files were not created, that expected deletions happened, or that no files were accidentally modified. Manual assertions are also verbose — you need one assertion per expected change, and you can easily forget to assert on something.

Snapshot diffing solves this by capturing the filesystem state before and after an operation, computing the difference programmatically, and asserting on the entire diff at once. This is analogous to Golden Master testing or snapshot testing (Jest snapshots), but applied to the filesystem domain.

This example simulates a package installation operation and uses `diffSnapshots` and `assertDiff` to verify the changes. The simulated installation:
1. Writes a new binary to `/usr/bin/vim`.
2. Creates a new source directory `/app/src`.
3. Creates a new source file `/app/src/main.js`.
4. Appends to an existing log file `/var/log/syslog`.

The diff should show three added entries and one modified entry, with no deletions.

## Modules Used

```ts
import { assertDiff, diffSnapshots, VirtualFileSystem } from "../src";
```

- **`diffSnapshots`** — the pure function that compares two `VfsSnapshot` objects and returns a `DiffResult`. It is a standalone utility, not a method on `VirtualFileSystem`, because it operates entirely on snapshot data (plain objects) without needing a live VFS instance. This means you can compute diffs in contexts where no VFS is available — for example, in a CI pipeline script loading snapshots from JSON files.

- **`assertDiff`** — an assertion helper that compares a `DiffResult` against an expected `DiffResult` and throws if they do not match. It is designed to be used in test assertions (e.g., inside `expect(() => assertDiff(...)).not.toThrow()`). The function is the equivalent of:

  ```ts
  assertDiff(actual, expected) => {
    if (!deepEqual(actual, expected)) throw new AssertionError(...);
  }
  ```

- **`VirtualFileSystem`** — used to create the VFS, populate initial state, capture snapshots, and perform the simulated operations.

## Step-by-Step Walkthrough

### 1. Initial State Setup

```ts
const vfs = new VirtualFileSystem();
vfs.mkdir("/app");
vfs.writeFile("/app/index.js", "console.log('hello')");
vfs.writeFile("/var/log/syslog", "system boot");
```

The VFS starts empty. Three operations establish the initial state:

- **`vfs.mkdir("/app")`** — creates the `/app` directory. Under the hood, this creates a `VfsEntry` of type `directory` with mode `0o755`. The root directory `/` is implicit and always exists.

- **`vfs.writeFile("/app/index.js", "console.log('hello')")`** — creates a file entry at `/app/index.js`. The string content is stored as a `Buffer`. The file inherits the default mode (`0o644`).

- **`vfs.writeFile("/var/log/syslog", "system boot")`** — creates a file entry at `/var/log/syslog`. Note that `/var/log` is implicitly created as an intermediate directory (the VFS auto-creates parents for `writeFile`). This file represents a log that will be appended to during the simulated installation.

At this point, the VFS has four entries:
```
/                  (directory, implicit)
/app               (directory, explicit mkdir)
/app/index.js      (file)
/var               (directory, auto-created parent)
/var/log           (directory, auto-created parent)
/var/log/syslog    (file)
```

### 2. Capturing the "Before" Snapshot

```ts
const before = vfs.toSnapshot();
console.log("Before snapshot captured");
```

`vfs.toSnapshot()` serializes the current VFS state into a `VfsSnapshot`. This snapshot captures:
- All four files/directories.
- Their modes, UIDs, GIDs, timestamps.
- File contents (base64-encoded).

The snapshot is a plain JS object. After this call, `vfs` continues to be the live VFS — the snapshot is a historical record of what the state was. Modifications to `vfs` after this point do not affect `before`.

### 3. Simulating the Installation Operation

```ts
vfs.writeFile("/usr/bin/vim", "#!/bin/sh\nvim");
vfs.mkdir("/app/src");
vfs.writeFile("/app/src/main.js", "export default {}");
vfs.writeFile("/var/log/syslog", "system boot\npackage installed");
```

Four operations simulate the effects of installing a hypothetical `vim` package:

- **`vfs.writeFile("/usr/bin/vim", "#!/bin/sh\nvim")`** — creates a new binary file. This is the main artifact of the installation: a `vim` executable script. The parent directories (`/usr`, `/usr/bin`) are auto-created.

- **`vfs.mkdir("/app/src")`** — creates a new source directory. The parent `/app` already exists (from initial setup), so this is a simple child addition.

- **`vfs.writeFile("/app/src/main.js", "export default {}")`** — creates a new source file in the new directory structure. This simulates a package that adds source code to the project.

- **`vfs.writeFile("/var/log/syslog", "system boot\npackage installed")`** — **overwrites** the existing log file. This is critical: the old content `"system boot"` is replaced with `"system boot\npackage installed"`. In the diff, this appears as a **modification**, not an addition, because the path already exists in the `before` snapshot. If this were a separate new file (e.g., `/var/log/install.log`), it would appear as an addition.

### 4. Capturing the "After" Snapshot

```ts
const after = vfs.toSnapshot();
console.log("After snapshot captured");
```

Same as step 2, but now the VFS has additional entries and a modified file. The `after` snapshot includes:
- All original entries from `before`.
- Three new entries: `/usr/bin/vim`, `/app/src`, `/app/src/main.js`.
- One modified entry: `/var/log/syslog` (content changed).

### 5. Computing the Diff

```ts
const diff = diffSnapshots(before, after);
```

`diffSnapshots` is a pure function. It takes two `VfsSnapshot` objects and produces a `DiffResult`:

```ts
interface DiffResult {
  added: Array<{ path: string; mode: number; uid: number; gid: number }>;
  modified: Array<{ path: string; before: VfsEntryMeta; after: VfsEntryMeta }>;
  removed: Array<{ path: string; mode: number; uid: number; gid: number }>;
}
```

The comparison algorithm:

1. Collect all paths from both snapshots into two sets.
2. For each path in `after` but not in `before` → **added**.
3. For each path in `before` but not in `after` → **removed**.
4. For each path in both → compare content, mode, uid, gid. If any differ → **modified**.
5. Paths are normalized before comparison (trailing slashes stripped, `.` and `..` resolved).

In this example:
- **Added**: `/usr/bin/vim`, `/app/src`, `/app/src/main.js`.
- **Modified**: `/var/log/syslog` (content changed from `"system boot"` to `"system boot\npackage installed"`).
- **Removed**: none (no deletions in this scenario).

### 6. Displaying the Diff

```ts
console.log("Added files:");
for (const entry of diff.added) {
  console.log(`  + ${entry.path}`);
}

console.log("\nModified files:");
for (const entry of diff.modified) {
  console.log(`  ~ ${entry.path}`);
}

console.log("\nRemoved files:");
for (const entry of diff.removed) {
  console.log(`  - ${entry.path}`);
}
```

The diff results are iterated and displayed with visual prefixes:
- `+` for added entries
- `~` for modified entries
- `-` for removed entries

This is a human-readable summary. In a test framework, you would not print this — you would pass the diff to `assertDiff` and let the framework report failures.

### 7. Asserting Expected Changes

```ts
assertDiff(diff, {
  added: ["/usr/bin/vim", "/app/src", "/app/src/main.js"],
  modified: ["/var/log/syslog"],
});

console.log("\n✅ All assertions passed");
```

`assertDiff` compares the computed diff against the expected diff. The comparison logic:

1. For `added`, `modified`, and `removed` arrays, extract just the `path` strings from the computed diff entries and compare as sets (order-independent).
2. If all three arrays match, pass.
3. If any array does not match, throw an `Error` with a descriptive message listing all mismatches.

The expected diff specifies only path strings — the metadata (mode, uid, gid) is compared by `assertDiff` if present in the expected object, but in this example only paths are checked.

If the assertion passes, execution continues to the final log line. If it fails, the error propagates and the `"All assertions passed"` line is never reached.

## Module Interactions

The snapshot diffing pipeline flows through three distinct stages:

```
State Setup → Snapshot A → Operations → Snapshot B → Diff → Assert
                                                             │
                                                             ▼
                                                        Pass/Fail
```

- **`VirtualFileSystem`** is only used in the setup and operation stages. It produces snapshots but does not consume them.
- **`diffSnapshots`** is a pure function — it takes two snapshots (plain objects) and returns a diff (plain object). No VFS is needed.
- **`assertDiff`** is also a pure function — it takes the diff result and expected values, and throws on mismatch.

This layered architecture means each component can be tested independently:
- Test `VirtualFileSystem` snapshot generation with known inputs → expected snapshot outputs.
- Test `diffSnapshots` with known before/after snapshot pairs → expected diff results.
- Test `assertDiff` with known diff/expected pairs → pass or throw correctly.

## Under the Hood

### Diff algorithm in detail

```ts
function diffSnapshots(before: VfsSnapshot, after: VfsSnapshot): DiffResult {
  const beforePaths = new Set(collectPaths(before.root, ""));
  const afterPaths = new Set(collectPaths(after.root, ""));

  const added: DiffEntry[] = [];
  const removed: DiffEntry[] = [];
  const modified: ModifiedEntry[] = [];

  for (const p of afterPaths) {
    if (!beforePaths.has(p)) {
      added.push({ path: p, ...getMeta(after, p) });
    }
  }

  for (const p of beforePaths) {
    if (!afterPaths.has(p)) {
      removed.push({ path: p, ...getMeta(before, p) });
    }
  }

  for (const p of beforePaths) {
    if (afterPaths.has(p)) {
      const b = getEntry(before, p);
      const a = getEntry(after, p);
      if (b.content !== a.content || b.mode !== a.mode || b.uid !== a.uid || b.gid !== a.gid) {
        modified.push({ path: p, before: b, after: a });
      }
    }
  }

  return { added, modified, removed };
}
```

- Path collection is recursive (`collectPaths` walks the nested tree structure of the snapshot).
- Content comparison checks the base64-encoded strings directly — no need to decode to buffers for the comparison.
- Directory entries also appear in the diff. For example, `/app/src` is a directory, and it appears in the `added` array even though no file content is involved.

### What is NOT diffed

The diff function does **not** track:
- **Rename/move detection**: If `/app/index.js` is renamed to `/src/index.js`, the diff shows one removal and one addition, not a rename. Detecting renames would require content-based heuristics (e.g., fuzzy matching).
- **Permission-only changes**: If only the mode or ownership changes without content change, the entry appears in `modified`. Both content and metadata are checked.
- **Timestamp-only changes**: Timestamps (mtime, atime, ctime) are not included in the diff comparison — they change too frequently and would produce noisy diffs. Only content, mode, uid, and gid are compared.

### assertDiff error messages

When `assertDiff` fails, it produces a detailed error message showing what was expected vs what was actually observed:

```text
Assertion failed:
  Added files:
    expected: ["/usr/bin/vim"]
    actual:   ["/usr/bin/vim", "/app/src"]
  Modified files:
    expected: ["/var/log/syslog"]
    actual:   []
  Removed files:
    expected: []
    actual:   ["/app/index.js"]
```

This makes it immediately clear which expectation was violated without needing to manually inspect the filesystem.

## Expected Output

```text
Before snapshot captured

After snapshot captured

Added files:
  + /usr/bin/vim
  + /app/src
  + /app/src/main.js

Modified files:
  ~ /var/log/syslog

Removed files:

✅ All assertions passed
```

The "Removed files:" section has no entries because no files were deleted. The empty output is intentional — it confirms that no unintended deletions occurred.

## Key Concepts

- **Before/after snapshot pattern**: Capturing state at two points in time and comparing them is a general testing technique (also called "golden master" or "snapshot testing"). Applied to filesystems, it gives you a complete picture of what changed without enumerating individual file assertions.

- **Pure diff computation**: `diffSnapshots` is a pure function with no side effects and no dependencies on VFS instances. It works on plain JSON-serializable objects. This means diffs can be computed in any JavaScript environment — Node.js, browser, or worker thread — and the logic can be tested independently of the VFS.

- **AssertDiff for declarative verification**: Instead of writing multiple `expect(fs.existsSync(p)).toBe(true)` calls, you declare the entire expected diff in one object. This is more concise, more complete (you assert on all categories at once), and harder to accidentally miss a case.

- **Added vs modified distinction**: The diff distinguishes between new paths and existing paths with changed content. This is important for verification — adding a file is a different operation from modifying one, and they should be asserted separately. For example, you might allow modifications to log files but prohibit new executable files in `/usr/bin`.

- **Path normalization**: Before comparison, paths are normalized to a canonical form. This prevents false negatives caused by trivial differences like trailing slashes (`/usr/bin/vim` vs `/usr/bin/vim/`) or double slashes (`/app//src` vs `/app/src`). The normalization is transparent to the caller.

- **No rename tracking**: The current implementation does not detect renames. A file that is moved from one path to another appears as a removal + addition. This is a deliberate simplification — true rename detection requires content comparison or an append-only change log, both of which add complexity that the library avoids for now.
