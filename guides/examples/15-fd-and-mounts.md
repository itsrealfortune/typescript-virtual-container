---
title: 15 - File Descriptors & Mounts
group: Examples
---

# Example 15 — File Descriptors & Mounts

POSIX-like operations on descriptors (`fdOpen`, `fdClose`, `fdDup`,
`fdDup2`) and mounting host directories into the VFS with read-only.

**Modules:** `VirtualFileSystem`

**Key points:**
- `fdOpen(path, flags)`: flags like `O_RDONLY` (0), `O_WRONLY` (1), `O_RDWR` (2)
- `fdDup(fd)` / `fdDup2(oldFd, newFd)`: descriptor duplication
- `getOpenFds()` → `Map<number, string>` (fd → path)
- `mount(vfsPath, hostPath, { readOnly })`: read-only mounts reject writes
- `unmount(vfsPath)`: unmounts a mount point
