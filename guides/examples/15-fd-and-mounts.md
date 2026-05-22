---
title: 15 - File Descriptors & Mounts
group: Examples
---

# Example 15 — File Descriptors & Mounts

## The Scenario

Operating systems manage open file handles through a **file descriptor table** — a per-process mapping of integer FDs to open file descriptions. When a process calls `open()`, the kernel allocates the lowest available FD number and points it to an internal file object holding the current offset, access flags, and inode reference. POSIX defines `dup()` and `dup2()` for duplicating descriptors (used by shells for I/O redirection like `2>&1`), and `close()` for releasing them. Meanwhile, **mount points** let the OS graft one filesystem tree onto another — `mount --bind` attaches a directory elsewhere, `mount -o ro` enforces read-only access, and `unmount` detaches it. This example demonstrates both subsystems inside the virtual environment: managing FDs with `fdOpen`, `fdDup`, `fdDup2`, `fdClose`, and `closeAllFds`, plus mounting a real host directory into the VFS with read-only enforcement.

## Modules Used

```ts
import * as fs from "node:fs";
import * as path from "node:path";
import { VirtualFileSystem } from "../src";
```

- **`node:fs`** and **`node:path`**: Standard Node.js modules used here to create, write to, and clean up a real temporary directory on the host filesystem. These operate outside the VFS — they manipulate actual disk files so that the mount demo can bridge host files into the virtual world.
- **`VirtualFileSystem`**: The core VFS class that provides the FD table (`Map<number, FdEntry>`) and mount table (`Map<string, MountEntry>`). All FD operations and mount/unmount calls are methods on this single instance.

## Step-by-Step Walkthrough

### Step 1 — Create the VFS instance

```ts
const vfs = new VirtualFileSystem();
```

No constructor arguments. The VFS starts with an empty FD table, an empty mount table, and a root directory (`/`) auto-created. All subsequent FD and mount operations happen on this instance.

### Step 2 — Create a test file

```ts
vfs.writeFile("/tmp/test.txt", "Hello, file descriptors!");
```

Writes a file into the virtual filesystem at `/tmp/test.txt`. This file will serve as the target for FD operations. The VFS creates parent directories (`/tmp/`) automatically if needed.

### Step 3 — Open file descriptors

```ts
const fd1 = vfs.fdOpen("/tmp/test.txt", 0); // O_RDONLY
const fd2 = vfs.fdOpen("/tmp/test.txt", 0); // O_RDONLY (second handle)
```

`fdOpen(path, flags)` opens a virtual file and returns an integer FD. The flags argument follows POSIX convention: `0` = `O_RDONLY`, `1` = `O_WRONLY`, `2` = `O_RDWR`. Each call to `fdOpen` creates a **separate FD entry** pointing to the same file. The FD numbers are the lowest available integers (starting from 3, since 0/1/2 are reserved for stdin/stdout/stderr in POSIX). Here `fd1` gets `3` and `fd2` gets `4`.

```ts
console.log("Opened FDs:", fd1, fd2);
console.log("FD1 path:", vfs.fdPath(fd1));
console.log("FD2 path:", vfs.fdPath(fd2));
```

`fdPath(fd)` resolves the FD number back to the file path it points to. This is the virtual equivalent of `readlink /proc/self/fd/<n>`. Both calls return `/tmp/test.txt`.

### Step 4 — Duplicate an FD

```ts
const fd3 = vfs.fdDup(fd1);
console.log("Duplicated FD1 → FD3:", fd3);
```

`fdDup(fd)` duplicates the descriptor — it creates a new FD (the lowest available number) that points to the **same underlying file description** (same offset, same flags) as the original. This mirrors the POSIX `dup()` syscall. The output shows `fd3 = 5` (the next free slot). Now FDs 3, 4, and 5 all refer to `/tmp/test.txt`.

### Step 5 — Dup2: redirect onto a specific FD number

```ts
const fd4 = vfs.fdDup2(fd1, 100);
console.log("Dup2 FD1 → FD100:", fd4);
```

`fdDup2(oldFd, newFd)` is the POSIX `dup2()` equivalent: it atomically closes `newFd` if it is already open, then makes `newFd` point to the same file as `oldFd`. Here we force FD 100 to point to the same target as FD 1. If FD 100 was already open, it is closed first. The return value is the new FD number (100). This is the mechanism shells use for `exec 2>&1` — redirect stderr to wherever stdout is pointing.

### Step 6 — List open FDs

```ts
const openFds = vfs.getOpenFds();
console.log("\nOpen FDs:", Array.from(openFds.entries()));
```

`getOpenFds()` returns a `Map<number, string>` mapping FD numbers to their file paths. At this point it should contain entries for 3, 4, 5, and 100 — all pointing to `/tmp/test.txt`.

### Step 7 — Close specific FDs

```ts
vfs.fdClose(fd2);
vfs.fdClose(fd3);
console.log("\nClosed FD2 and FD3");
console.log("Remaining open FDs:", Array.from(vfs.getOpenFds().entries()));
```

`fdClose(fd)` closes the descriptor and frees its number for reuse. After closing FD 4 and FD 5, only FD 3 (from `fd1`) and FD 100 remain open. The output shows 2 remaining entries.

### Step 8 — Close all FDs

```ts
vfs.closeAllFds();
console.log("All FDs closed");
```

`closeAllFds()` iterates the entire FD table and closes every entry — equivalent to what the kernel does on `execve()` for FDs without the `O_CLOEXEC` flag. After this call, `getOpenFds()` returns an empty map.

### Step 9 — Create a host directory with files

```ts
const hostDir = path.join(process.cwd(), ".vfs-mount-demo");
fs.mkdirSync(hostDir, { recursive: true });
fs.writeFileSync(path.join(hostDir, "host-file.txt"), "Content from host filesystem");
fs.writeFileSync(path.join(hostDir, "data.json"), JSON.stringify({ hello: "world" }));
```

This uses Node.js `fs` (real filesystem I/O) to create a temporary directory in the current working directory and populate it with two files. This directory exists on the actual disk — not in the VFS. It will be the source for the mount operation.

### Step 10 — Mount the host directory into the VFS

```ts
vfs.mount("/mnt/host", hostDir, { readOnly: true });
```

`mount(vfsPath, hostPath, options)` creates a bridge between a real host directory and a VFS path. Under the hood:
1. The VFS creates the mount target directory (`/mnt/host`) if it doesn't exist.
2. A `MountEntry` is registered in the internal mount table, storing the host path and options.
3. When any VFS operation (read, write, list, stat) targets a path under `/mnt/host/`, the VFS intercepts the request and delegates it to the real filesystem using `node:fs`.
4. The `readOnly: true` flag means write operations (writeFile, mkdir, unlink) on the mounted path throw an error instead of modifying the host filesystem.

```ts
console.log("\nMount points:", vfs.getMounts());
```

`getMounts()` returns the internal mount table — showing what VFS paths are mounted to which host directories and their options.

### Step 11 — Read files through the mount

```ts
const hostContent = vfs.readFile("/mnt/host/host-file.txt");
console.log("Host file content:", hostContent);

const jsonData = vfs.readFile("/mnt/host/data.json");
console.log("JSON data:", jsonData);
```

Reading through a mount works transparently: the VFS detects that `/mnt/host/` is a mount point, extracts the relative path (`host-file.txt`), computes the real path (`<hostDir>/host-file.txt`), reads the file with `fs.readFileSync`, and returns the content as a string. The user sees no difference between reading a VFS-native file and a mounted one.

### Step 12 — List mounted directory entries

```ts
const entries = vfs.list("/mnt/host");
console.log("Mounted directory entries:", entries);
```

`vfs.list()` delegates to `fs.readdirSync()` for mounted directories, returning the real directory contents — `host-file.txt` and `data.json`.

### Step 13 — Attempt write to read-only mount

```ts
try {
  vfs.writeFile("/mnt/host/new-file.txt", "should fail");
} catch (err: unknown) {
  console.log("\nWrite to read-only mount failed (expected):", (err as Error).message);
}
```

Because the mount was created with `readOnly: true`, any write attempt throws an error. The catch block logs the expected failure. If the mount were read-write (`readOnly: false` or omitted), the write would pass through to the real filesystem.

### Step 14 — Unmount

```ts
vfs.unmount("/mnt/host");
console.log("\nUnmounted /mnt/host");
```

`unmount(vfsPath)` removes the mount entry from the internal table. After unmounting, paths under `/mnt/host/` revert to VFS-native behavior. No error is thrown if the mount does not exist.

### Step 15 — Clean up host directory

```ts
fs.rmSync(hostDir, { recursive: true, force: true });
```

Removes the temporary host directory from the real filesystem. This is cleanup — nothing to do with the VFS itself.

## Module Interactions

**FD table internals:** The VFS maintains a `Map<number, FdEntry>` where each `FdEntry` stores the file path, the flags (read/write mode), and the current seek position. `fdOpen` creates a new entry with position 0 and the given flags. `fdDup` creates a new entry with the same path, same flags, and same position (shallow copy of the file description, not the FD number). `fdDup2` behaves like `dup` but allows specifying the target FD number, closing the target first if it is occupied. `fdClose` deletes the entry. `closeAllFds` clears the entire map. FD numbers 0, 1, and 2 are reserved but not automatically created — they exist only if explicitly allocated.

**Mount resolution:** Every VFS operation that takes a path (read, write, list, stat, unlink, mkdir, rmdir, rename) first checks the mount table. The mount table is an ordered list of `MountEntry` objects, each with a VFS base path, a host root path, and options. The VFS iterates the mount table and checks if the requested path starts with any mount's base path. The **longest matching prefix** wins (most specific mount). If a match is found, the VFS delegates the operation to `node:fs`, translating the VFS path to a real path by replacing the mount prefix. If no match is found, the operation proceeds on the in-memory VFS tree.

**Read-only enforcement:** Writes are rejected at the mount delegation level — before any `fs.writeFileSync` call, the mount code checks the `readOnly` flag and throws immediately. This is a coarse enforcement: it blocks all mutations (write, mkdir, rmdir, unlink, rename, symlink, chmod, chown) on the mounted tree.

## Expected Output

When running `bun run examples/15-fd-and-mounts.ts`:

```
Opened FDs: 3 4
FD1 path: /tmp/test.txt
FD2 path: /tmp/test.txt
Duplicated FD1 → FD3: 5
Dup2 FD1 → FD100: 100

Open FDs: [[3, "/tmp/test.txt"], [4, "/tmp/test.txt"], [5, "/tmp/test.txt"], [100, "/tmp/test.txt"]]

Closed FD2 and FD3
Remaining open FDs: [[3, "/tmp/test.txt"], [100, "/tmp/test.txt"]]
All FDs closed

Mount points: Map { "/mnt/host" => { hostPath: "<cwd>/.vfs-mount-demo", readOnly: true } }
Host file content: Content from host filesystem
JSON data: {"hello":"world"}
Mounted directory entries: ["host-file.txt", "data.json"]

Write to read-only mount failed (expected): Cannot write to read-only mount

Unmounted /mnt/host
```

FD numbers (3, 4, 5, 100) are deterministic because the FD allocator always assigns the lowest available integer. The mount host path in the output will show the actual working directory.

## Key Concepts

- **POSIX FD emulation:** `fdOpen`/`fdClose`/`fdDup`/`fdDup2` mirror the `open`/`close`/`dup`/`dup2` POSIX syscalls. The FD allocator uses lowest-available-number semantics identical to the kernel.
- **Descriptor duplication vs. reopening:** `fdDup` creates a new FD pointing to the same file description (shared offset and flags). Opening the same file a second time creates an independent file description with its own offset. This matters for concurrent reads — duplicated FDs share the seek position, separate `fdOpen` calls do not.
- **Mount as a delegation layer:** Mount points are not symlinks — they are a path-level interception mechanism. Every VFS operation checks the mount table before touching the in-memory tree. This is analogous to how the Linux VFS layer dispatches to specific filesystem drivers (ext4, tmpfs, NFS) based on mount points.
- **Read-only mount protection:** The VFS enforces read-only mounts at the delegation boundary, not at the file permission level. There is no way for a user to bypass this — any write to a read-only mounted path throws, regardless of the file's Unix permissions.
- **FD lifecycle:** FDs are tracked per-VFS-instance, not per-user or per-process. In a multi-user scenario, all users share the same FD table if they share the same VFS. This differs from real Linux where each process has its own FD table.
- **Mount order independence:** Unmounting removes the mount entry from the table. The underlying host directory is untouched — only the virtual bridge is torn down. Remounting the same path re-establishes the bridge.
