---
title: 07 - Snapshot Test Fixtures
group: Examples
---
# Example 07 — Snapshots as Test Fixtures

## The Scenario

Integration tests often need a realistic filesystem state: configuration files, static assets, directory structures. The typical approach is to set up this state in a `beforeEach` hook, creating files on disk or in a mock filesystem. This works, but it has problems:

- **Setup is repetitive**: Every test file that needs the same directory structure duplicates the setup code.
- **Setup is slow**: Creating many files (even in memory) takes time proportional to the number of files.
- **Tests are not isolated**: If one test modifies a shared structure, it leaks state to other tests.
- **Teardown is error-prone**: Forgetting to clean up leads to stale state across test runs.

This example demonstrates a better approach: build the desired filesystem state as a `VfsSnapshot` once (a "fixture"), then derive independent copies of it for each test using `VirtualFileSystem.fromSnapshot()`. This is the same pattern that snapshot testing libraries (Jest snapshots, React Testing Library's `render`) use, but applied to the filesystem domain.

The concrete scenario: a web application with a configuration directory and a public assets directory. Multiple tests need to read config files, modify them, and list directory contents — all starting from the same initial state, without interference between tests.

## Modules Used

```ts
import type { VfsSnapshot } from "../src";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";
```

- **`VfsSnapshot`** (type-only import) — the type definition for a serialized filesystem state. Importing with `type` means it is erased at runtime; it exists only for TypeScript type checking. This import tells the reader that `buildFixture()` returns a `VfsSnapshot`, which is a plain object with no methods.

- **`VirtualFileSystem`** — imported directly for access to the constructor and the static factory `fromSnapshot()`. We do not need the barrel import (`../src`) because we use `VirtualFileSystem` directly, not through `VirtualShell`.

## Step-by-Step Walkthrough

### 1. Building the Fixture

```ts
function buildFixture(): VfsSnapshot {
  const vfs = new VirtualFileSystem();
  vfs.mkdir("/app/config");
  vfs.writeFile("/app/config/settings.json", JSON.stringify({ env: "test", db: "localhost" }));
  vfs.writeFile("/app/config/routes.json", JSON.stringify({ "/": "index", "/api": "api" }));
  vfs.writeFile("/app/public/index.html", "<h1>Hello</h1>");
  return vfs.toSnapshot();
}
```

The `buildFixture` function creates a temporary `VirtualFileSystem`, populates it with three files and one directory, and returns a snapshot. Let us break down each operation:

- **`new VirtualFileSystem()`** — creates an empty VFS in memory mode (no disk writes). The root directory `/` is implicitly created and owns the root entry. No files exist yet.

- **`vfs.mkdir("/app/config")`** — creates the directory `/app/config`. Internally, this inserts a `VfsEntry` of type `directory` into the VFS's `Map<string, VfsEntry>` with key `/app/config`. The parent directory `/app` is also implicitly created if it does not exist (the VFS auto-creates intermediate directories for `mkdir`). The mode is set to the default directory mode (`0o755`).

- **`vfs.writeFile("/app/config/settings.json", ...)`** — creates a file entry at `/app/config/settings.json`. The content is the JSON stringified object `{"env":"test","db":"localhost"}`. The entry is typed as `file` with default mode `0o644`. The parent directory chain (`/app` → `/app/config`) must exist — the implicit directory creation from `mkdir` covers this.

- **`vfs.writeFile("/app/config/routes.json", ...)`** — same pattern, creates a routes file in the same config directory.

- **`vfs.writeFile("/app/public/index.html", ...)`** — creates a static HTML file. Note that `/app/public` must exist as a directory. Since we did not call `mkdir("/app/public")` explicitly, the VFS must handle this. Under the hood, `writeFile` auto-creates parent directories if they do not exist (this is configurable behavior — some implementations throw if the parent does not exist).

- **`return vfs.toSnapshot()`** — serializes the entire VFS state into a `VfsSnapshot` object. This snapshot is a plain JavaScript object (JSON-serializable) containing all file contents, metadata, and directory structure. It is decoupled from the `vfs` instance — after `toSnapshot()` returns, you can discard `vfs` and the snapshot remains valid.

### 2. Storing the Fixture

```ts
const FIXTURE = buildFixture();
console.log(`Fixture built: ${Object.keys(FIXTURE.root.children ?? {}).length} top-level entries`);
```

The fixture is stored in a module-level constant (`FIXTURE`, uppercase by convention to signal it is immutable). The log prints the number of top-level children in the root directory. In this case, there is one top-level entry: `app`. The count is `1`.

The `VfsSnapshot` structure looks roughly like:

```json
{
  "version": 1,
  "root": {
    "children": {
      "app": {
        "type": "directory",
        "children": {
          "config": {
            "type": "directory",
            "children": {
              "settings.json": { "type": "file", "content": "base64...", ... },
              "routes.json": { "type": "file", "content": "base64...", ... }
            }
          },
          "public": {
            "type": "directory",
            "children": {
              "index.html": { "type": "file", "content": "base64...", ... }
            }
          }
        }
      }
    }
  }
}
```

### 3. Test 1: Reading a Config File

```ts
console.log("Test 1: reads config file");
{
  const vfs = VirtualFileSystem.fromSnapshot(FIXTURE);
  const content = JSON.parse(vfs.readFile("/app/config/settings.json"));
  console.log(`  env: ${content.env} (expected: test) ${content.env === "test" ? "✅" : "❌"}`);
  console.log(`  db: ${content.db} (expected: localhost) ${content.db === "localhost" ? "✅" : "❌"}`);
}
```

Each test creates a new VFS instance from the shared fixture:

1. **`VirtualFileSystem.fromSnapshot(FIXTURE)`** — the static factory method. It creates a new, empty VFS, then iterates over all entries in the snapshot, reconstructing each `VfsEntry` and inserting it into the new VFS's internal `Map`. The new VFS is a **deep copy** — the entries are new objects, not references to the snapshot's data.

2. **`vfs.readFile("/app/config/settings.json")`** — reads the file content as a string. The VFS resolves the path, finds the entry, and returns its content buffer decoded as UTF-8.

3. **Assertions**: The parsed JSON is checked for `env === "test"` and `db === "localhost"`. The checkmarks (`✅`/`❌`) are visual indicators of pass/fail — this is a manual testing pattern, not a test framework assertion. In a real test suite, you would use `expect(content.env).toBe("test")` (Jest) or equivalent.

### 4. Test 2: Isolated Writes

```ts
console.log("\nTest 2: isolated writes don't affect fixture");
{
  const vfs1 = VirtualFileSystem.fromSnapshot(FIXTURE);
  vfs1.writeFile("/app/config/settings.json", JSON.stringify({ env: "modified" }));

  const vfs2 = VirtualFileSystem.fromSnapshot(FIXTURE);
  const content = JSON.parse(vfs2.readFile("/app/config/settings.json"));
  console.log(`  fixture still has env=test: ${content.env === "test" ? "✅" : "❌"}`);
}
```

This is the critical isolation test:

1. **`vfs1`** is created from the fixture. `vfs1.writeFile(...)` overwrites `/app/config/settings.json` with a modified object (`{ env: "modified" }`). This mutation affects only `vfs1`'s internal `Map`.

2. **`vfs2`** is created from the **same** `FIXTURE` object. Since `fromSnapshot` performs a deep copy, `vfs2` starts fresh with the original snapshot data. The entry for `/app/config/settings.json` still contains `{ env: "test", db: "localhost" }`.

3. **Assertion**: `content.env === "test"` passes. The mutation in `vfs1` did not affect `vfs2`. If `fromSnapshot` performed a shallow copy, this test would fail because both VFS instances would share the same entry objects.

The deep copy behavior is ensured by how `fromSnapshot` works: for each entry in the snapshot, it creates a new `VfsEntry` object. The file content buffer is also copied (via `Buffer.from(original)` or equivalent). No references to the snapshot's internal data structures survive in the new VFS.

### 5. Test 3: File Listing

```ts
console.log("\nTest 3: file listing");
{
  const vfs = VirtualFileSystem.fromSnapshot(FIXTURE);
  const files = vfs.list("/app/config");
  console.log(`  /app/config contains: ${files.join(", ")}`);
}
```

`vfs.list("/app/config")` returns an array of entry names (not full paths) in the specified directory. The VFS resolves the path to the directory entry, iterates its children in the entry tree, and returns the child names.

Expected output: `settings.json, routes.json` (order is implementation-defined — typically insertion order or alphabetical).

The `list` method traverses the VFS's tree structure. For each child of the `/app/config` entry, it extracts the basename. Directories and files are both included in the listing (no filtering by type unless explicitly requested).

## Module Interactions

The fixture pattern decouples snapshot creation from snapshot consumption:

```
buildFixture()
  │
  ├── new VirtualFileSystem()   ← temporary VFS
  ├── vfs.mkdir(...)            ← populate it
  ├── vfs.writeFile(...)        ← populate it
  └── vfs.toSnapshot()          ← extract snapshot
       │
       ▼
    FIXTURE (VfsSnapshot)       ← frozen, shared, immutable
       │
       ├── fromSnapshot(FIXTURE) → vfs1 (test 1)
       ├── fromSnapshot(FIXTURE) → vfs2 (test 2, isolated)
       └── fromSnapshot(FIXTURE) → vfs3 (test 3)
```

`FIXTURE` is a value — it has no reference to the original VFS, no hidden state, no methods. It is serializable, meaning it could be:
- Stored in a JSON file and loaded by tests.
- Generated at build time and checked into version control.
- Transferred between processes (e.g., built in a setup worker, sent to test workers).

## Under the Hood

### Deep copy in fromSnapshot

`VirtualFileSystem.fromSnapshot` performs a recursive walk of the snapshot's tree structure:

```ts
static fromSnapshot(snapshot: VfsSnapshot): VirtualFileSystem {
  const vfs = new VirtualFileSystem();
  function walk(node: VfsSnapshotEntry, parentPath: string) {
    for (const [name, entry] of Object.entries(node.children ?? {})) {
      const fullPath = parentPath + "/" + name;
      if (entry.type === "directory") {
        vfs.mkdir(fullPath, { mode: entry.mode, uid: entry.uid, gid: entry.gid });
        walk(entry, fullPath);
      } else {
        const content = entry.content ? Buffer.from(entry.content, "base64") : Buffer.alloc(0);
        vfs.writeFile(fullPath, content, { mode: entry.mode, uid: entry.uid, gid: entry.gid });
      }
    }
  }
  walk(snapshot.root, "");
  return vfs;
}
```

Key details:
- File content is decoded from base64 back to a `Buffer`. This is the inverse of `toSnapshot()`'s base64 encoding.
- Metadata (mode, uid, gid) is preserved exactly as it was in the snapshot.
- The reconstructed VFS has no knowledge of the snapshot — after construction, no reference ties them together.

### Why not JSON.parse(JSON.stringify())?

You might wonder why we need `fromSnapshot` at all — why not just `JSON.parse(JSON.stringify(FIXTURE))`? Because the snapshot is already a plain JSON-compatible object. The work of `fromSnapshot` is not deep-cloning — it is reconstructing the VFS's internal data structures from the snapshot's tree format. The VFS stores entries in a flat `Map<string, VfsEntry>` keyed by full path, but the snapshot stores them in a nested tree. The conversion between these two representations is the core of `fromSnapshot`.

### Memory considerations

Each `fromSnapshot` call creates a new VFS with its own `Map` and its own `Buffer` objects. For small fixtures (tens of files), this overhead is negligible. For large fixtures (thousands of files, megabytes of content), each copy duplicates the content in memory. In extreme cases, you might:
- Build the fixture once and create many VFS copies — memory grows linearly with the number of test cases.
- Use lazy loading (copy content only on first write) to reduce memory pressure. The current implementation does not support this.

## Expected Output

```text
Fixture built: 1 top-level entries

Test 1: reads config file
  env: test (expected: test) ✅
  db: localhost (expected: localhost) ✅

Test 2: isolated writes don't affect fixture
  fixture still has env=test: ✅

Test 3: file listing
  /app/config contains: settings.json, routes.json

All tests passed
```

The top-level entry count is `1` (the `app` directory). The checkmarks confirm that all three test scenarios pass.

## Key Concepts

- **Fixture as a reusable value**: Building the filesystem state once as a `VfsSnapshot` and reusing it across tests eliminates repeated setup code. The fixture is a plain, portable object that can be serialized, stored, and shared.

- **Deep copy isolation**: Each `fromSnapshot()` call produces a fully independent VFS. Mutations in one test cannot affect another test. This eliminates the most common source of flaky tests — shared mutable state.

- **Deterministic file system state**: The fixture captures exact file contents, modes, timestamps, and directory structure. Tests that pass on the author's machine will pass in CI because there is no variation in filesystem state (no disk I/O delays, no concurrent file access).

- **Separation of fixture building from test execution**: `buildFixture()` is a pure function — it takes nothing (no arguments) and produces a value. It can be called once at module load time (as shown) or once in a `beforeAll` hook. The separation enables a pattern where fixture building is slow (many files, complex content) but test execution is fast (just a `fromSnapshot` call).

- **Type-only imports for blueprint types**: The import `import type { VfsSnapshot }` ensures that the snapshot type is available for documentation and type checking without pulling in runtime dependencies. This is a TypeScript best practice for types that are only used in function signatures.
