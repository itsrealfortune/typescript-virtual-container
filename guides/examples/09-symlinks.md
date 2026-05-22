---
title: 09 - Symlinks
group: Examples
---

# Example 09 — Symbolic Links

## The Scenario

Symbolic links (symlinks) are one of the most fundamental abstractions in Unix-like filesystem management. They appear everywhere in production Linux environments:

- **Package management**: When you run `apt install nginx`, the package manager installs the binary to a versioned path like `/usr/sbin/nginx-1.24.0` and creates a symlink at `/usr/sbin/nginx` so that all scripts and service files can reference a stable path. When nginx is upgraded to 1.26.0, only the symlink target changes — all consumers continue to work without modification.
- **Python version management**: Tools like `pyenv` and the system `alternatives` system manage symlinks such as `/usr/bin/python` → `/usr/bin/python3.12`. Switching the system Python version is a single `ln -sf` command.
- **Dotfile management with GNU Stow**: Users maintain version-controlled dotfile repositories where each package's files live in a subdirectory, and `stow` creates symlinks from the home directory into the package directory. The command `stow zsh` creates `~/.zshrc` → `~/dotfiles/zsh/.zshrc`.
- **Log rotation**: `logrotate` creates symlinks like `/var/log/nginx/access.log` → `/var/log/nginx/access.log.1` after rotation, so that monitoring tools that open the fixed path always see the current log file.
- **Container images**: Docker and OCI images use symlinks extensively for multi-arch support. `/usr/bin/qemu-aarch64-static` is often a symlink to the architecture-specific binary.
- **/proc and /sys**: The Linux kernel exposes pseudo-filesystems where many entries are symlinks. `/proc/self/exe` is a symlink to the currently running executable, and `/proc/self/fd/N` entries are symlinks to open file descriptors.

This example demonstrates how the `virtual-env-js` `VirtualFileSystem` handles symbolic links — creating them, identifying them, and resolving their targets — all in pure memory with no disk involvement. The entire example is only 14 lines of code, but it illustrates the three fundamental symlink operations that underpin all of the above use cases: creation, type detection, and target resolution.

## Modules Used

```ts
import { VirtualFileSystem } from "../src";
```

Only one import is needed because symlink operations are implemented as methods directly on the `VirtualFileSystem` class (`src/modules/VirtualFileSystem/index.ts`). No shell, client, or server wrappers are required — symlink manipulation is a core VFS primitive, not a user-facing shell command.

`VirtualFileSystem` is a full in-memory filesystem that mirrors a real Linux root tree. It supports directories, regular files, stubs (lazy files for rootfs), device nodes (`/dev/null`, `/dev/random`, etc.), and symlinks. The VFS is implemented as a tree of `InternalNode` objects, where each node carries a `type` discriminator (`"directory"`, `"file"`, `"stub"`, or `"device"`), permission bits, ownership metadata, and timestamps.

The symlink operations — `symlink()`, `isSymlink()`, and `resolveSymlink()` — operate on this tree just like `writeFile()` and `readFile()` do. There is no separate symlink table; symlinks are entries in the same directory `children` objects as regular files and directories, distinguished by a special mode value.

## Step-by-Step Walkthrough

### Step 1 — Instantiate the VFS

```ts
const vfs = new VirtualFileSystem();
```

Creates an empty virtual filesystem in memory mode (the default, `options.mode` is `"memory"`). The constructor (line 185 of the VFS source) does the following:

1. Calls `super()` on `EventEmitter` (from `node:events`), giving the VFS event capabilities.
2. Sets `this._mode` to `"memory"` (no disk persistence).
3. Sets `this._snapshotFile`, `this._journalFile`, `this._evictionThreshold`, and `this._flushAfterNWrites` to null/0 since these only apply to `"fs"` mode.
4. Creates the root directory node via `VirtualFileSystem._makeDir("", 0o755)`:
   ```ts
   {
     type: "directory",
     name: "",
     mode: 0o755,
     uid: 0, gid: 0,
     createdAt: Date.now(),
     updatedAt: Date.now(),
     children: Object.create(null),  // no prototype chain
     _childCount: 0,
     _sortedKeys: null
   }
   ```

At this point, the VFS has a single directory node at `/` with no children. No files, no directories, no symlinks — just an empty root.

### Step 2 — Write a Target File

```ts
vfs.writeFile("/opt/myapp/bin/app", "#!/bin/sh\necho hello");
```

This creates the actual file that our symlink will point to. Internally, `writeFile()` goes through this sequence:

1. The path `"/opt/myapp/bin/app"` is normalized to the same string (it is already canonical).
2. The VFS checks for host-directory mounts (none in memory mode).
3. Write hooks are checked (none registered).
4. The parent directory path is determined: `"/opt/myapp/bin"`.
5. `getParentDirectory()` is called with `create: true` and a callback to `_mkdirRecursive()`. Since `/opt/`, `/opt/myapp/`, and `/opt/myapp/bin/` do not exist, they are all created in sequence:
   - `_mkdirRecursive("/opt", 0o755)`: Creates a directory node at `root.children["opt"]`.
   - `_mkdirRecursive("/opt/myapp", 0o755)`: Creates a directory node at `opt.children["myapp"]`.
   - `_mkdirRecursive("/opt/myapp/bin", 0o755)`: Creates a directory node at `myapp.children["bin"]`.
   
   Each creation increments the parent's `_childCount`, invalidates `_sortedKeys`, emits a `"dir:create"` event, and appends a journal entry.

6. The VFS checks if `bin.children["app"]` already exists. It does not, so no conflict.
7. A new `InternalFileNode` is created:
   ```ts
   {
     type: "file",
     name: "app",
     content: Buffer.from("#!/bin/sh\necho hello", "utf8"),  // 21 bytes
     mode: 0o644,
     uid: 0, gid: 0,
     compressed: false,
     createdAt: Date.now(),
     updatedAt: Date.now()
   }
   ```
8. The node is assigned to `bin.children["app"]`. Parent's `_childCount` is incremented and `_sortedKeys` invalidated.
9. A `"file:write"` event is emitted.

After this step, the VFS tree looks like:
```
/ (root)
└── opt/
    └── myapp/
        └── bin/
            └── app (file, 21 bytes, "#!/bin/sh\necho hello")
```

### Step 3 — Create the Symlink

```ts
vfs.symlink("/opt/myapp/bin/app", "/usr/local/bin/app");
```

The `symlink()` method (line 1951 of the VFS source) takes `targetPath` (what the symlink points to) and `linkPath` (where the symlink is created). Its full internal implementation is:

```ts
public symlink(targetPath: string, linkPath: string, uid?: number, gid?: number): void {
    const normalizedLink = normalizePath(linkPath);
    const normalizedTarget = targetPath.startsWith("/")
        ? normalizePath(targetPath)
        : targetPath;
    const { parent, name } = getParentDirectory(
        this._root, normalizedLink, true,
        (p) => this._mkdirRecursive(p, 0o755),
    );
    const symNode: InternalFileNode = {
        type: "file",
        name,
        content: Buffer.from(normalizedTarget, "utf8"),
        mode: 0o120777,
        uid: uid ?? 0,
        gid: gid ?? 0,
        compressed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    parent.children[name] = symNode;
    parent._childCount++;
    parent._sortedKeys = null;
    this._journal({ op: JournalOp.SYMLINK, path: normalizedLink, dest: normalizedTarget });
    this.emit("symlink:create", { link: normalizedLink, target: normalizedTarget });
}
```

Here is what happens step by step:

1. **Normalize paths**: `normalizedLink` becomes `"/usr/local/bin/app"`. `normalizedTarget` becomes `"/opt/myapp/bin/app"` (since it starts with `/`, it is passed through `normalizePath`).

2. **Resolve and auto-create parent directory**: `getParentDirectory()` walks the tree to find the parent of the link path. The directory `/usr/local/bin/` does not exist, so `_mkdirRecursive()` is called three times to create `/usr/`, `/usr/local/`, and `/usr/local/bin/`. After this, `parent` is the `/usr/local/bin/` directory node and `name` is `"app"`.

3. **Create the symlink node**: Critically, a symlink is stored as an `InternalFileNode` with a **special mode** of `0o120777`. In POSIX, symlinks have the mode `0o120777` (the `012` prefix indicates a symbolic link in the file type bits). The `content` buffer stores the **target path string** (`"/opt/myapp/bin/app"`), not the target's content. This is the key design decision: the symlink node is technically a file node but with mode `0o120777`, and its content is the target path.

   ```ts
   const symNode: InternalFileNode = {
       type: "file",            // uses the file type discriminator
       name: "app",
       content: Buffer.from("/opt/myapp/bin/app", "utf8"),  // target path stored as content
       mode: 0o120777,          // POSIX symlink mode
       uid: 0, gid: 0,
       compressed: false,
       createdAt: Date.now(),
       updatedAt: Date.now()
   };
   ```

4. **Insert into the tree**: The node is placed at `parent.children["app"]`. The parent's `_childCount` is incremented (from 0 to 1) and `_sortedKeys` is invalidated.

5. **Journal and emit**: A journal entry with op `JournalOp.SYMLINK` is appended (for WAL persistence in `"fs"` mode). The `"symlink:create"` event is emitted with `{ link: "/usr/local/bin/app", target: "/opt/myapp/bin/app" }`.

After this step, the VFS tree looks like:
```
/ (root)
├── opt/
│   └── myapp/
│       └── bin/
│           └── app (file, 21 bytes)
└── usr/
    └── local/
        └── bin/
            └── app (symlink, mode 0o120777, content="/opt/myapp/bin/app")
```

**Important**: The VFS does **not** validate that the target exists at symlink-creation time. You can create a dangling symlink (a symlink pointing to a file that does not exist). The `symlink()` method never calls `exists()` on the target. This mirrors POSIX behavior — `ln -s` never checks if the target exists.

### Step 4 — Check if a Path Is a Symlink

```ts
console.log(vfs.isSymlink("/usr/local/bin/app"));     // true
```

`isSymlink()` (line 1989) is defined as:

```ts
public isSymlink(targetPath: string): boolean {
    try {
        const node = getNodeNormalized(this._root, normalizePath(targetPath));
        return node.type === "file" && node.mode === 0o120777;
    } catch {
        return false;
    }
}
```

It walks the VFS tree to find the node at the normalized path, then checks two conditions:

1. `node.type === "file"` — all symlinks are stored as file-type nodes (not directories, stubs, or devices).
2. `node.mode === 0o120777` — the special POSIX symlink permission mode.

Both conditions must be true. A regular file with mode `0o644` would pass the first check but fail the second. A directory with any mode would fail the first check.

If the path does not exist (throws during `getNodeNormalized()`), the try/catch catches the error and returns `false`. This is a safe query — it never throws, even for nonexistent paths.

The return is `true` because `/usr/local/bin/app` exists and has mode `0o120777`.

### Step 5 — Resolve the Symlink Target

```ts
console.log(vfs.resolveSymlink("/usr/local/bin/app")); // /opt/myapp/bin/app
```

`resolveSymlink()` (line 2005) is defined as:

```ts
public resolveSymlink(linkPath: string, maxDepth = 8): string {
    let current = normalizePath(linkPath);
    for (let depth = 0; depth < maxDepth; depth++) {
        try {
            const node = getNodeNormalized(this._root, current);
            if (node.type === "file" && node.mode === 0o120777) {
                const target = node.content.toString("utf8");
                current = target.startsWith("/")
                    ? target
                    : normalizePath(
                            path.posix.join(path.posix.dirname(current), target),
                        );
                continue;
            }
        } catch {
            break;
        }
        return current;
    }
    throw new Error(`Too many levels of symbolic links: ${linkPath}`);
}
```

Here is how it resolves `/usr/local/bin/app`:

1. `current` is initialized to `"/usr/local/bin/app"`.
2. **Loop iteration 0** (depth=0):
   - `getNodeNormalized()` finds the node at `/usr/local/bin/app`.
   - The node has `type === "file"` and `mode === 0o120777` — it is a symlink.
   - `target = node.content.toString("utf8")` = `"/opt/myapp/bin/app"`.
   - Since target starts with `"/"`, `current = "/opt/myapp/bin/app"`.
   - `continue` — go to the next loop iteration.
3. **Loop iteration 1** (depth=1):
   - `getNodeNormalized()` finds the node at `/opt/myapp/bin/app`.
   - The node has `type === "file"` but `mode === 0o644` — it is a regular file, not a symlink.
   - We fall out of the if-block and `return current` which is `"/opt/myapp/bin/app"`.

The function returns `"/opt/myapp/bin/app"`, which is the resolved target path.

**Symlink chain resolution**: If the target at `/opt/myapp/bin/app` were itself a symlink (e.g., pointing to `/opt/myapp/releases/v2/app`), the loop would continue following the chain. The `maxDepth` parameter (default 8) prevents infinite loops from circular symlinks. If the chain exceeds 8 hops, the function throws an error.

**Relative symlink handling**: If the target path did not start with `/` (a relative symlink like `../releases/v2/app`), the method resolves it relative to the directory containing the symlink using `path.posix.join(dirname(current), target)`. This mirrors the POSIX kernel behavior where the kernel resolves relative symlink targets against the directory of the link, not the process's current working directory.

## Module Interactions

### Storage Representation

There is no separate `InternalSymlinkNode` type in the VFS. Symlinks are stored as `InternalFileNode` objects with a specific mode value `0o120777`. This is the POSIX convention:

- The high 4 bits (`0o120000`) encode the file type — `0o120000` is the symbolic link type in the POSIX `st_mode` bitmask (macros like `S_ISLNK(m)` check `(m & S_IFMT) == S_IFLNK`).
- The low 12 bits (`0o0777`) are typically `0o777` for symlinks (all permissions), since the OS ignores symlink permissions and uses the target's permissions instead.

The `content` Buffer of the file node stores the target path as a UTF-8 encoded string. This means:

```ts
symlinkNode.content.toString("utf8") === "/opt/myapp/bin/app"  // absolute
symlinkNode.content.toString("utf8") === "../releases/v2/app"   // relative
```

There is no separate field for the link target — the content buffer doubles as both file content and link target, with the mode serving as the discriminator.

### Tree Operations

Because symlinks are just file nodes with a special mode, they participate in all VFS operations:

- **`list("/usr/local/bin")`** includes `"app"` in the returned array. The caller does not know (without calling `isSymlink()`) whether it is a file or a symlink.
- **`stat("/usr/local/bin/app")`** returns the symlink's metadata, not the target's. To get the target's stat, you would need to resolve the symlink first and then stat the resolved path. This matches POSIX `lstat()` vs. `stat()` — `lstat()` returns the link's own metadata, while `stat()` follows the link.
- **`readFile("/usr/local/bin/app")`** would return the target path string `"/opt/myapp/bin/app"` as the file content, not the target file's actual content. This is because `readFile()` just reads the node's content buffer — it does not follow symlinks. To read through a symlink, you would need to resolve it first and then call `readFile()` on the resolved path.
- **`remove("/usr/local/bin/app")`** removes the symlink node, not the target. The target file is unaffected. This is the POSIX `unlink()` behavior — deleting a symlink never follows the link.

### Journaling and Persistence

When a symlink is created, the VFS writes a journal entry:

```ts
this._journal({ op: JournalOp.SYMLINK, path: normalizedLink, dest: normalizedTarget });
```

When the VFS is in `"fs"` mode and a snapshot is restored, the journal replay handles `SYMLINK` entries by calling `this.symlink(e.dest, e.path)` — note the reversed argument order (journal stores `path` as the link location and `dest` as the target). This ensures symlinks survive process restarts.

During binary snapshot encoding (via `encodeVfs()`), symlink nodes are serialized as regular file nodes with their mode intact. When the snapshot is decoded (via `decodeVfs()`), they are reconstructed as file nodes with mode `0o120777`, preserving the symlink identity.

### Permissions and Access Control

The `symlink()` method accepts optional `uid` and `gid` parameters but does **not** enforce permission checks on parent directory traversal by default. In the example, these are omitted, so the symlink is owned by root (uid=0, gid=0). If permissions were enabled, the calling process would need write permission on the parent directory (`/usr/local/bin/`) to create the symlink.

POSIX says symlink permissions are always `0o777` and are never checked — what matters is the target's permissions. The VFS follows this convention by using mode `0o120777`.

## Expected Output

When you run `bun run examples/09-symlinks.ts`:

```
true
/opt/myapp/bin/app
```

Line 1: `true` — confirms that `/usr/local/bin/app` is recognized as a symlink. The `isSymlink()` method checked the node's type and mode and returned `true`.

Line 2: `/opt/myapp/bin/app` — the result of resolving the symlink chain. The `resolveSymlink()` method followed the link from `/usr/local/bin/app` to its target `/opt/myapp/bin/app`, found that the target is a regular file (not another symlink), and returned the resolved path.

If you called `vfs.isSymlink("/opt/myapp/bin/app")`, it would return `false` because that node has mode `0o644` (a regular file). If you called `vfs.readFile("/usr/local/bin/app")`, it would return `"/opt/myapp/bin/app"` (the symlink's content, i.e., the target path), not `"#!/bin/sh\necho hello"` (the target's content) — because `readFile()` does not follow symlinks automatically.

## Key Concepts

- **Symlink vs. hard link**: A symlink is a path-based pointer that can cross filesystem boundaries and can dangle (point to a nonexistent path). A hard link is a second directory entry pointing to the same inode (same filesystem only, cannot dangle). The VFS implements only symlinks because they are more common in scripting and testing scenarios. Hard links would require reference counts on internal nodes, adding complexity without proportional benefit.

- **Target-first API design**: The method signature `symlink(target, linkPath)` mirrors the POSIX C function `symlink(const char *target, const char *linkpath)` — you specify what the link points to first, then where the link should be created. This is the opposite of `ln -s target linkname` shell syntax, and it is a common source of confusion.

- **POSIX mode 0o120777 convention**: The VFS uses the standard POSIX bitmask `S_IFLNK` (`0o120000`) ORed with `0o777` for symlinks. This value can be checked with `(mode & 0o170000) === 0o120000` in POSIX C, and the VFS checks `mode === 0o120777` directly.

- **Auto-creating parent directories**: Both `writeFile()` and `symlink()` create parent directories on demand via `_mkdirRecursive()`. The symlink's parent path `/usr/local/bin/` is implicitly created. This simplifies scripting but means a typo in the link path silently creates an unexpected directory structure.

- **Dangling symlinks are permitted**: The VFS does not validate that the target exists at symlink-creation time. `isSymlink()` still returns `true`, and `resolveSymlink()` still returns the target string. Only when you try to `readFile()` through the resolved path would you get an error. This matches real POSIX behavior — `ln -s /nonexistent /link` succeeds, and the error only appears when you try to access `/link`.

- **Circular symlink protection**: `resolveSymlink()` has a `maxDepth` parameter (default 8) that caps the number of hops. If a symlink chain is circular (A → B → C → A), the loop would iterate until `maxDepth`, then throw `"Too many levels of symbolic links"`. This mirrors the Linux kernel's `MAX_NESTED_LINKS` (usually 40) and protects against infinite loops.

- **Content vs. target ambiguity**: Because symlinks reuse the `InternalFileNode` type, a regular file with content `/opt/myapp/bin/app` (if someone wrote that string) would be indistinguishable from a symlink at the storage level except for the mode. The mode is the authoritative discriminator. This is an implementation detail that could be made more explicit with a dedicated symlink node type, but the current approach keeps the code simple.

- **Minimal surface area**: At only 14 lines, this is the shortest example in the series. It demonstrates that symlink support in the VFS is a focused, self-contained feature: create a link, check if something is a link, and resolve where it points. There is no recursive following in reads, no link-count tracking, no cross-device handling — just the three primitives that compose into all the real-world scenarios described at the start.
