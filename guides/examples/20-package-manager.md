---
title: 20 - Package Manager
group: Examples
---

# Example 20 — Package Manager

Complete `VirtualPackageManager` API: registry loading, search,
installation, uninstallation, listing available and installed packages.

**Modules:** `VirtualShell` (via `packageManager`)

**Key points:**
- `load()` populates the registry from the VFS
- `findInRegistry(name)` searches by exact name
- `search(term)` searches by pattern
- `install(name)` returns `{ output, exitCode }`
- `listAvailable()` / `listInstalled()` for inventory
