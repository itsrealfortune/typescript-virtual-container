---
title: 02 - SSH & SFTP Shared State
group: Examples
---

# Example 02 — SSH/SFTP Shared State

## The Scenario

In production Linux environments, users regularly access the same filesystem through multiple protocols. A developer might:

1. **SSH into a server** and use `vim` to edit a configuration file.
2. **SFTP into the same server** from their IDE (e.g., VS Code's Remote SSH or JetBrains deployment tools) to upload assets.
3. **SCP a build artifact** from their CI pipeline directly to the deployment directory.
4. **Run a script over SSH** that generates output files, then immediately **download those files via SFTP** for local inspection.

In all these cases, the user expects **immediate consistency** — a file written over SSH must be instantly visible over SFTP, and vice versa. Real SSH daemons achieve this because all protocols ultimately read and write the same physical disk. But when you are building a simulation or testing framework, you cannot rely on a real disk — you need an in-memory filesystem that all simulated services share by reference.

This example demonstrates how `virtual-env-js` achieves that consistency through a single shared `VirtualShell` instance. Both the SSH server (represented here by direct VFS writes as a stand-in for SSH activity) and the SFTP server (`VirtualSftpServer`, implemented by `SftpMimic` in `src/modules/SSHMimic/sftp.ts`) access the same `VirtualFileSystem` object. Because JavaScript passes objects by reference, there is exactly one filesystem in memory — no sync, no replication lag, no cache invalidation.

## Modules Used

Two classes are imported from the library barrel:

### `VirtualSftpServer` (aliased as `SftpMimic`)
This is the public API name for the `SftpMimic` class defined in `src/modules/SSHMimic/sftp.ts`. Despite the "SFTP" name, `SftpMimic` is not a real SFTP protocol implementation in the traditional sense — it is a server simulation that wraps an `ssh2` `Server` and handles SFTP subsystem requests by delegating every operation to the shared `VirtualFileSystem`. It supports the full set of SFTP operations: `OPEN`, `READ`, `WRITE`, `CLOSE`, `OPENDIR`, `READDIR`, `STAT`, `LSTAT`, `MKDIR`, `RMDIR`, `REMOVE`, `RENAME`, `REALPATH`, `FSETSTAT`, and `SETSTAT`. Each operation is translated to the corresponding `VFS` method call. The constructor accepts `{ port, shell, vfs, users }` — if a `shell` is provided, it extracts the VFS and user manager from it. If standalone `vfs` and `users` are provided, it uses those directly.

### `VirtualShell`
As in Example 01, `VirtualShell` is the container that owns both a `VirtualFileSystem` (accessible as `shell.vfs`) and a `VirtualUserManager` (accessible as `shell.users`). Initialization via `ensureInitialized()` populates the VFS with a minimal Linux root filesystem and registers default users. In this example, the shell acts purely as a VFS carrier — we never start an SSH server, only an SFTP server, but the shell provides the shared state nexus.

```ts
import { VirtualSftpServer as SftpMimic, VirtualShell } from "../src";
```

The `as SftpMimic` alias is used to shorten the name for clarity, though the import resolves to the same class. The barrel export at `src/index.ts` line 31 re-exports `SftpMimic as VirtualSftpServer`, so both names reference the same class.

## Step-by-Step Walkthrough

### Step 1 — Create and Initialize the Shell

```ts
const shell = new VirtualShell("my-container");
await shell.ensureInitialized();
```

The `VirtualShell` is instantiated with hostname `"my-container"`. After `ensureInitialized()`, the VFS is populated with the standard root filesystem structure. The `VirtualUserManager` is also initialized with default users and groups. At this point, `shell.vfs` is a fully functional in-memory filesystem with an empty root directory (plus the standard system directories like `/bin`, `/etc`, `/home`, `/tmp`, `/usr`, `/var`).

The VFS is an instance of `VirtualFileSystem` (defined in `src/modules/VirtualFileSystem/index.ts`), which stores all data in a tree of `InternalNode` objects rooted at `this._root`. The root is an `InternalDirectoryNode` with children stored in a plain object `children: Object.create(null)`. There is no disk I/O in memory mode — all reads and writes operate on JavaScript objects in the heap.

### Step 2 — Simulate an SSH Write via VFS

```ts
shell.vfs.writeFile("/shared/hello.txt", "Written via SSH");
console.log("VFS wrote /shared/hello.txt");
```

This call simulates what would happen internally if a user ran `echo "Written via SSH" > /shared/hello.txt` over an SSH session. Let us trace exactly what happens inside `VirtualFileSystem.writeFile()` (line 1313 of the VFS source):

1. **Normalize the path:** `"/shared/hello.txt"` is passed through `normalizePath()`, which strips trailing slashes, collapses double slashes, and resolves `.` and `..` segments. Since the path is already canonical, it stays as `"/shared/hello.txt"`.

2. **Check mounts:** The method calls `this._resolveMount(targetPath)` to check if the path falls under any host-directory mount (for `"memory"` mode, there are no mounts, so this returns `null`).

3. **Trigger write hooks:** The method checks for registered write hooks (used for `/proc/sys` sysctl simulation). With no hooks registered, this is a no-op.

4. **Enforce path traversal permission:** If `uid`/`gid` were provided, the VFS would check that the user has execute permission on every parent directory. Since they are not provided in this call, the check is skipped.

5. **Resolve parent directory:** `getParentDirectory()` is called with `create: true` and a callback that calls `_mkdirRecursive()`. This walks the VFS tree from the root, creating each missing segment along the way. Since `/shared/` does not exist yet:
   - The root's `children` object is checked for `"shared"`. It does not exist.
   - `_mkdirRecursive("/shared", 0o755)` is called.
   - This splits the path into parts `["shared"]`, creates a new `InternalDirectoryNode` with mode `0o755`, assigns it to `root.children["shared"]`, increments `_childCount`, and emits a `"dir:create"` event.
   - A journal entry (`JournalOp.MKDIR`) is appended for persistence mode (no-op in memory mode).

6. **Check for existing node:** The parent directory's `children` are checked for `"hello.txt"`. The file does not exist, so no conflict.

7. **Create the file node:** A new `InternalFileNode` is created via `VirtualFileSystem._makeFile()`:
   ```ts
   {
     type: "file",
     name: "hello.txt",
     content: Buffer.from("Written via SSH", "utf8"), // 16 bytes
     mode: 0o644,
     uid: 0, gid: 0,
     compressed: false,
     createdAt: Date.now(),
     updatedAt: Date.now()
   }
   ```
   This is assigned to `parent.children["hello.txt"]`. The parent's `_childCount` is incremented and `_sortedKeys` is invalidated (set to null, so it will be recomputed on next `list()` call).

8. **Emit and journal:** A `"file:write"` event is emitted with the path and size. A journal entry (`JournalOp.WRITE`) is appended. The RAM usage cache is invalidated.

After this step, the VFS tree has:
```
/ (root dir)
├── shared/ (dir, mode 0o755)
│   └── hello.txt (file, mode 0o644, content: "Written via SSH")
├── bin/ (from initialization)
├── etc/ (from initialization)
├── home/ (from initialization)
├── tmp/ (from initialization)
├── usr/ (from initialization)
└── var/ (from initialization)
```

### Step 3 — Start the SFTP Server

```ts
const sftp = new SftpMimic({ port: 0, shell });
const sftpPort = await sftp.start();
console.log(`SFTP server started on port ${sftpPort}`);
```

The `SftpMimic` constructor (line 186 of `sftp.ts`) destructures `{ port, shell, vfs, users }`. When `shell` is provided:

1. `this._vfs` is set to `shell.vfs` (the same `VirtualFileSystem` instance created above).
2. `this._users` is set to `shell.users` (the same user manager).
3. `this._hostname` is set to `shell.hostname` (`"my-container"`).
4. `this._shell` is set to the shell reference for initialization purposes.

**Critically, no copy is made.** The VFS reference is a pointer to the exact same object in memory. Every file that was written to `shell.vfs` in step 2 is immediately available through `sftp.getVfs()` because `getVfs()` (line 220) returns `this._shell?.vfs ?? this._vfs`, which resolves to the same object.

When `sftp.start()` (line 237) is called:

1. It loads or creates an SSH host key via `loadOrCreateHostKey()`.
2. If the shell is set, it calls `this._shell.ensureInitialized()` (safe to call again — it is idempotent).
3. It creates a new `ssh2` `Server` with authentication and session handlers.
4. It binds the server to `0.0.0.0:{port}` and returns the assigned port (the returned port is the configured port, not necessarily the OS-assigned one).

The SFTP server's authentication handler supports both `"password"` and `"keyboard-interactive"` methods, with the same no-password fallback as the SSH server.

### Step 4 — Verify Cross-Protocol Visibility

```ts
const content = shell.vfs.readFile("/shared/hello.txt");
console.log(`File content via shared VFS: "${content.trim()}"`);
```

`shell.vfs.readFile("/shared/hello.txt")` reads the file we wrote in step 2. The VFS:

1. Normalizes the path.
2. Checks for content resolvers (none registered).
3. Checks the file cache (disabled by default, so skipped).
4. Walks the tree: root → `children["shared"]` (a directory) → `children["hello.txt"]` (a file).
5. Checks that the node type is `"file"` (not a directory or device).
6. Returns `node.content.toString("utf8")` — which is `"Written via SSH"`.

The output confirms `"Written via SSH"` — the same content written in step 2. This proves that the SFTP server's backing store is the same VFS object.

### Step 5 — Simulate an SFTP Upload

```ts
shell.vfs.writeFile("/shared/sftp-upload.txt", "Uploaded via SFTP");
console.log("VFS wrote /shared/sftp-upload.txt");
```

In a real SFTP scenario, a client would connect to the SFTP server on its port and upload a file. The `SftpMimic` would handle that via the `sftp.on("WRITE", ...)` handler (line 599), which receives data chunks and assembles them into a buffer, then on `CLOSE` (line 635), writes the buffer to the VFS via `getVfs().writeFile(entry.path, entry.buffer)`.

Here, we skip the protocol simulation and call `writeFile` directly on the shared VFS. This is equivalent to what happens when an SFTP client completes a file upload — the `CLOSE` handler calls `getVfs().writeFile()` on the exact same object that `shell.vfs` refers to.

### Step 6 — List the Directory

```ts
const files = shell.vfs.list("/shared");
console.log(`Files in /shared: ${files.join(", ")}`);
```

`shell.vfs.list("/shared")` (line 1806) does the following:

1. Checks for mount delegation (none).
2. Normalizes the path to `"/shared"`.
3. Calls `getNodeNormalized()` to find the directory node at that path.
4. Checks that the node type is `"directory"` (throws otherwise).
5. Sorts the children keys alphabetically (cached in `_sortedKeys` for subsequent calls).
6. Returns the sorted array of child entry names.

The expected output is `hello.txt, sftp-upload.txt` — both files are visible in the same directory listing. The `list()` result includes all direct children, in alphabetical order, regardless of which "protocol" wrote them.

### Step 7 — Clean Shutdown

```ts
sftp.stop();
console.log("SFTP server stopped");
```

`SftpMimic.stop()` (line 418) closes the underlying `ssh2` `Server` (if running) and emits the `"stop"` event in the close callback. If the server was already stopped or never started, the `if (this.server)` guard prevents a crash. The VFS remains intact — stopping the SFTP server does not clear or flush the filesystem. This means you could start a new SFTP server on the same shell and still see all files.

## Module Interactions

The critical design insight is **JavaScript reference sharing**. When you write:

```ts
const shell = new VirtualShell("my-container");
const sftp = new SftpMimic({ shell });
```

The `SftpMimic` constructor does:
```ts
this._vfs = shell.vfs;
this._users = shell.users;
```

This is a direct reference assignment. The `VirtualShell` constructor created its VFS as:
```ts
this.vfs = new VirtualFileSystem();
```

So `shell.vfs` and `sftp._vfs` point to the exact same `VirtualFileSystem` instance. The `Map` that stores all file content is shared. When `shell.vfs.writeFile()` is called, it mutates the `_root` tree of that shared instance. When `sftp.getVfs().readFile()` is later called, it reads from that same `_root` tree.

This pattern is called **dependency injection**: the filesystem is a dependency that is created once and injected into all consumers (the SSH server, the SFTP server, the SSH client). There is no synchronization step, no event bus for file changes, no polling loop. The consistency is guaranteed by the JavaScript runtime's memory model — two references to the same object always see the same state.

### Tree Structure

The VFS tree is composed of `InternalNode` objects. Each node has a `type` field (`"directory"`, `"file"`, `"stub"`, or `"device"`), a `name`, permission bits (`mode`), ownership (`uid`, `gid`), and timestamps. Directory nodes have a `children` record (a null-prototype object `Object.create(null)`) mapping names to child nodes, plus a `_childCount` cache and a `_sortedKeys` cache for efficient directory listing. File nodes have a `content` `Buffer` and a `compressed` boolean flag.

### writeFile Internals (Expanded)

When `writeFile("/shared/hello.txt", "Written via SSH")` is called without `uid`/`gid`, the VFS skips permission checks. The full call chain is:

1. `normalizePath("/shared/hello.txt")` → `"/shared/hello.txt"`
2. `_resolveMount("/shared/hello.txt")` → `null` (no mounts)
3. `_triggerWriteHook("/shared/hello.txt", buffer)` → no-op (no hooks)
4. `getParentDirectory(root, "/shared/hello.txt", true, mkdirCallback)` →
   - Walks to `/shared` → returns `{ parent: sharedDir, name: "hello.txt" }`
   - Along the way, creates `/shared` via `_mkdirRecursive` if it does not exist
5. Check for existing node: `sharedDir.children["hello.txt"]` → `undefined` (does not exist)
6. Create `InternalFileNode` with `Buffer.from("Written via SSH")`
7. `sharedDir.children["hello.txt"] = newNode`
8. `sharedDir._childCount++` (used for `stat().childrenCount` on parent)
9. `sharedDir._sortedKeys = null` (invalidates sort cache)
10. Emit `"file:write"` event

### readFile Internals (Expanded)

When `readFile("/shared/hello.txt")` is called:

1. `normalizePath` → `"/shared/hello.txt"`
2. `_resolveMount` → `null`
3. `_triggerReadHook` → no-op
4. `_resolveContent` → `null` (no resolvers)
5. `getNodeNormalized(root, "/shared/hello.txt")` →
   - Walks from root: `children["shared"]` → `children["hello.txt"]`
   - Returns the `InternalFileNode`
6. Check type: not stub, not device, is file
7. `node.evicted` is falsy, so no reload needed
8. `node.compressed` is false, so `raw = node.content` (no decompression)
9. Returns `raw.toString("utf8")` → `"Written via SSH"`

### list Internals

When `list("/shared")` is called:

1. `getNodeNormalized(root, "/shared")` → the `InternalDirectoryNode` for `/shared`
2. `node._sortedKeys` is `null` (invalidated by the `writeFile` call)
3. `Object.keys(node.children).sort()` → `["hello.txt", "sftp-upload.txt"]`
4. This sorted array is cached in `node._sortedKeys` for subsequent calls

The sort is alphabetical (JavaScript's default `Array.prototype.sort()` with no comparator, which sorts by UTF-16 code units). This means uppercase letters come before lowercase, and numbers sort by their string representation, not numeric value.

## Expected Output

When you run `bun run examples/02-ssh-sftp-shared-state.ts`, you will see:

```
--- Write file via VFS ---
VFS wrote /shared/hello.txt
--- Start SFTP server ---
SFTP server started on port 0
--- Verify shared state ---
File content via shared VFS: "Written via SSH"
VFS wrote /shared/sftp-upload.txt
Files in /shared: hello.txt, sftp-upload.txt
--- Stop server ---
SFTP server stopped
```

Line-by-line explanation:

1. **`--- Write file via VFS ---`** — Section header printed before the first write operation.
2. **`VFS wrote /shared/hello.txt`** — confirms that the `writeFile` call completed without throwing. The file now exists in the VFS tree.
3. **`--- Start SFTP server ---`** — Section header printed before starting the SFTP server.
4. **`SFTP server started on port 0`** — the `SftpMimic` instance bound to a TCP port (port 0 means the configured port was used; if the OS assigned a different port, the output will show that port).
5. **`--- Verify shared state ---`** — Section header for the verification block.
6. **`File content via shared VFS: "Written via SSH"`** — the `readFile` call retrieved the content written earlier, proving cross-operation visibility.
7. **`VFS wrote /shared/sftp-upload.txt`** — confirms the second `writeFile` call completed.
8. **`Files in /shared: hello.txt, sftp-upload.txt`** — the `list` call returns both filenames in alphabetical order. The order is `hello.txt` before `sftp-upload.txt` because `h` < `s` in Unicode.
9. **`--- Stop server ---`** — Section header for cleanup.
10. **`SFTP server stopped`** — the `sftp.stop()` call completed without error.

## Key Concepts

- **Shared-nothing inverted**: Rather than each service maintaining its own filesystem and syncing changes (which is how real distributed systems often work), all services share a single VFS reference. This eliminates sync bugs, race conditions, and cache invalidation problems that plague real SFTP/SCP/SSH protocol stacks.
- **Dependency injection for consistency**: The `VirtualShell` is the single source of truth. Any module that needs filesystem or user access receives the shell (or its VFS) in its constructor. This makes testing straightforward — you can pass a pre-populated VFS to simulate any scenario.
- **Protocol simulation vs. implementation**: `VirtualSftpServer` is not a real SFTP daemon — it is a protocol-shaped wrapper around VFS methods. It understands SFTP operations (`OPEN`, `READ`, `WRITE`, etc.) but delegates them all to the VFS. This lets you test cross-protocol scenarios without the overhead of running actual SFTP daemons or dealing with real file descriptors.
- **Immediate consistency**: Because there is a single VFS tree in memory, there is zero replication lag. Every write is instantly readable by every consumer. This is a fundamental property of shared-memory architectures, and it is exactly what you want for testing — no `sleep(1)` calls to wait for file sync.
- **Auto-creating parent directories**: Both `writeFile()` and `mkdir()` create parent directories on demand (like `mkdir -p`). The path `/shared/hello.txt` implicitly creates `/shared/` if it does not exist, which simplifies scripting but also means a typo in a path silently creates an unexpected directory.
- **Idempotent initialization**: Calling `ensureInitialized()` multiple times is safe — the shell tracks whether initialization has already run. This means both the SSH server and SFTP server can independently call it without causing duplicate work.
