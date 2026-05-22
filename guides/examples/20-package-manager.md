---
title: 20 - Package Manager
group: Examples
---

# Example 20 — Package Manager

## Real-World Scenario

Linux package managers like `apt` (Debian/Ubuntu) and `dnf` (Fedora/RHEL) provide a unified interface for discovering, installing, upgrading, and removing software. They maintain a **registry** of available packages (sourced from remote repositories), track which packages are **installed** on the system, resolve dependencies, and execute installation scripts. Users search for packages (`apt-cache search python`), inspect details (`apt-cache show curl`), install (`apt install jq`), and remove (`apt remove tree`). This example demonstrates the full `VirtualPackageManager` API — searching the registry, listing available and installed packages, inspecting package details, installing and removing packages, verifying installation status, and integrating with the SSH server for remote package management.

## Modules Imported

```ts
import { VirtualShell, VirtualSshServer } from "../src";
```

- **`VirtualShell`**: The shell environment that owns the package manager. The shell bootstraps with a built-in package registry (a curated set of common Linux packages). The `packageManager` property on the shell provides access to the `VirtualPackageManager` instance.
- **`VirtualSshServer`**: An SSH server that binds to a `VirtualShell`, allowing remote clients to interact with the package manager over SSH. This demonstrates that the package manager is fully accessible through the shell interface.

The package manager is automatically initialized when the shell is created — no separate constructor is needed. The registry is populated from an internal data store embedded in the module.

## Step-by-Step Walkthrough

### Step 1 — Initialize the shell and get the package manager

```ts
const shell = new VirtualShell("package-manager-demo");
await shell.ensureInitialized();
const pm = shell.packageManager;
```

Creates a `VirtualShell` with hostname `"package-manager-demo"` and bootstraps it. After initialization, `shell.packageManager` returns the `VirtualPackageManager` instance. This PM comes pre-populated with a synthetic registry of common Linux packages (curl, jq, tree, htop, python3, git, nginx, redis, postgresql, neofetch, etc.) with versions, descriptions, and dependency metadata.

### Step 2 — Search the registry

```ts
console.log("--- Search for packages ---");
const results = pm.search("python");
console.log(`Found ${results.length} packages matching "python":`);
for (const pkg of results.slice(0, 5)) {
  console.log(`  ${pkg.name.padEnd(20)} ${pkg.version}\t${pkg.description}`);
}
```

`pm.search("python")` performs a substring match against the registry's package names and descriptions. It returns an array of matching `PackageDef` objects. Each `PackageDef` contains `name`, `version`, `description`, and optionally `depends` (an array of dependency names). The search is case-insensitive and matches against both name and description fields. The output shows up to 5 results with padded names for column alignment.

Under the hood, `search()` iterates the entire registry map and runs `name.includes(term) || description.includes(term)` for each entry. The registry is a `Map<string, PackageDef>` keyed by package name. This is analogous to `apt-cache search` which queries the local APT index.

### Step 3 — List all available packages

```ts
console.log(`\n--- Available packages: ${pm.listAvailable().length} total ---`);
```

`pm.listAvailable()` returns an array of all `PackageDef` entries in the registry. The length gives the total package count — typically 20-50 synthetic packages (depending on how many the module bundles). This is analogous to `apt-cache dump` or `apt list --all-versions`.

### Step 4 — Inspect a specific package

```ts
console.log("\n--- Inspect curl ---");
const curlInfo = pm.show("curl");
if (curlInfo) console.log(curlInfo);
```

`pm.show("curl")` looks up a specific package by exact name and returns its full `PackageDef` object (or `null` if not found). The output includes `name`, `version`, `description`, and `depends`. This is analogous to `apt-cache show curl` which displays the full metadata record from the APT database.

The `PackageDef` structure is:
```
{
  name: "curl",
  version: "8.4.0",
  description: "command line tool for transferring data with URL syntax",
  depends: ["libc", "openssl", "zlib"]
}
```

Dependencies are package names that would need to be installed first for the package to function. In a full implementation, `install()` would recursively resolve and install dependencies before the requested package.

### Step 5 — List installed packages

```ts
console.log(`\n--- Currently installed: ${pm.installedCount()} packages ---`);
for (const pkg of pm.listInstalled().slice(0, 5)) {
  console.log(`  ${pkg.name} ${pkg.version}`);
}
```

`pm.installedCount()` returns the number of currently installed packages — the shell comes with certain base packages pre-installed (like `base-files`, `bash`, `coreutils`). `pm.listInstalled()` returns an array of `PackageDef` objects for installed packages only (not the full registry). The output shows up to 5 of these. This is analogous to `dpkg --get-selections` or `apt list --installed`.

### Step 6 — Install new packages

```ts
console.log("\n--- Install packages ---");
const installResult = pm.install(["jq", "tree", "htop"]);
console.log(installResult.output);
console.log(`Installed count after: ${pm.installedCount()}`);
```

`pm.install(["jq", "tree", "htop"])` installs three packages simultaneously. The `install()` method:
1. Looks up each package name in the registry.
2. Verifies the package exists (throws or returns error if not found).
3. Checks if the package is already installed (skips if already present).
4. Optionally resolves dependencies (depending on implementation depth).
5. Copies the `PackageDef` from the registry to the installed list.
6. Returns an `ExecResult`-like object: `{ output: string, exitCode: number }`.

The output is a multi-line string showing each package being installed with a simulated progress message (e.g., `"Installing jq..."`, `"done"`). The exit code is `0` on success. After installation, `pm.installedCount()` increases by the number of newly installed packages.

This is analogous to `apt-get install jq tree htop` which fetches, unpacks, and configures packages.

### Step 7 — Verify installation

```ts
console.log(`\n  jq installed: ${pm.isInstalled("jq")}`);
console.log(`  tree installed: ${pm.isInstalled("tree")}`);
```

`pm.isInstalled(name)` checks whether a specific package is in the installed list. Returns `true` if the package is found, `false` otherwise. This is a synchronous lookup — it does not involve the registry. The verification confirms that `jq` and `tree` were successfully installed.

### Step 8 — Remove a package

```ts
console.log("\n--- Remove tree ---");
const removeResult = pm.remove(["tree"]);
console.log(removeResult.output);
console.log(`  tree installed: ${pm.isInstalled("tree")}`);
```

`pm.remove(["tree"])` removes one or more packages from the installed list. The method:
1. Checks if each named package is installed.
2. Removes it from the installed set (returns error if not installed).
3. Returns `{ output: string, exitCode: number }`.

The output shows `"Removing tree..."` and `"done"`. After removal, `pm.isInstalled("tree")` returns `false`. This is analogous to `apt-get remove tree`.

### Step 9 — Lookup a package in the registry by name

```ts
console.log("\n--- Lookup by name ---");
const def = pm.findInRegistry("neofetch");
if (def) {
  console.log(`  neofetch: ${def.version} — ${def.description}`);
  console.log(`  Dependencies: ${def.depends?.join(", ") ?? "none"}`);
}
```

`pm.findInRegistry("neofetch")` searches the **registry** (available packages) for an exact name match. Unlike `search()` which does substring matching, `findInRegistry()` requires an exact match. This is useful for looking up package metadata before deciding to install. The output shows the version, description, and dependency list.

This is analogous to `apt-cache show neofetch` — it reads from the remote repository index, not the local installed database.

### Step 10 — SSH server integration

```ts
console.log("\n--- SSH server with package access ---");
const ssh = new VirtualSshServer({ port: 0, shell });
const sshPort = await ssh.start();
console.log(`SSH server on port ${sshPort}`);
ssh.stop();
```

A `VirtualSshServer` is created on a dynamic port, bound to the shell that contains the package manager. This demonstrates that the package manager is fully usable over SSH — a remote client could SSH in and run `install`, `remove`, `search`, or `list` commands through the shell. The server is started and immediately stopped after logging its port, proving the integration works without keeping the server running.

## How the Package Manager Works Under the Hood

**Registry structure:** The `VirtualPackageManager` holds a `Map<string, PackageDef>` called the registry. This map is populated at construction time from an embedded JSON dataset. Each `PackageDef` has:

```
{
  name: string;          // canonical package name (e.g., "curl")
  version: string;       // semantic version (e.g., "8.4.0")
  description: string;   // human-readable summary
  depends?: string[];    // optional dependency list
}
```

**Installed packages set:** A separate `Map<string, PackageDef>` tracks installed packages. This is initially populated with a set of base system packages (similar to a minimal Debian install). When `install()` is called, packages are moved (by reference) from the registry to the installed set. When `remove()` is called, they are removed from the installed set only — they remain in the registry for future reinstallation.

**Install flow:**
1. `install(names)` iterates the input array.
2. For each name, it calls `findInRegistry(name)` to verify the package exists.
3. If found and not already installed, it calls `isInstalled(name)` to skip duplicates.
4. The `PackageDef` is added to the installed map under its name.
5. A result string is built with per-package status lines.

**Search vs. findInRegistry:** `search(term)` does a substring match against `name` and `description` across all registry entries. `findInRegistry(name)` does an exact key lookup in the registry map. The former returns multiple results (like a search engine), the latter returns one or none (like a dictionary lookup).

**Dependency resolution:** The current implementation does not automatically resolve `depends`. The `depends` array is metadata only — `install()` does not recursively install dependencies. A production package manager would traverse the dependency graph, check for conflicts, and install in topological order. The metadata is present so client code can implement this if needed.

## Expected Output

When running `bun run examples/20-package-manager.ts`:

```
--- Search for packages ---
Found 3 packages matching "python":
  python3              3.11.5   Python 3.11 interpreter
  python3-pip          23.2.1   Python package installer
  python3-venv         3.11.5   Python virtual environment support

--- Available packages: <N> total ---

--- Inspect curl ---
{
  name: "curl",
  version: "8.4.0",
  description: "command line tool for transferring data with URL syntax",
  depends: ["libc", "openssl", "zlib"]
}

--- Currently installed: <M> packages ---
  base-files 12.0
  bash 5.2.15
  coreutils 9.3
  ...

--- Install packages ---
Installing jq...
done
Installing tree...
done
Installing htop...
done
Installed count after: <M+3>

  jq installed: true
  tree installed: true

--- Remove tree ---
Removing tree...
done
  tree installed: false

--- Lookup by name ---
  neofetch: 7.1.0 — system information tool
  Dependencies: none

--- SSH server with package access ---
SSH server on port <dynamic>
```

`<N>` (available count) and `<M>` (initial installed count) depend on the embedded registry size and base package set. The search output shows `python3`, `python3-pip`, and `python3-venv` — the exact list may vary. The SSH port is dynamically assigned.

## Key Concepts and Patterns

- **Registry vs. installed separation:** The package manager maintains two distinct data structures — a read-only registry (all known packages) and a mutable installed set (packages currently on the system). This mirrors the `apt` model where `/var/lib/apt/lists/` holds the registry and `/var/lib/dpkg/status` tracks installed packages.
- **Search and exact lookup duality:** Two search mechanisms serve different needs: `search()` for fuzzy discovery (users typing partial names) and `findInRegistry()`/`show()` for exact metadata inspection (scripts checking for specific packages).
- **Idempotent installation:** `install()` skips already-installed packages rather than erroring. This matches `apt-get install` behavior where installing an already-present package is a no-op.
- **Non-destructive removal:** `remove()` only affects the installed set — the registry retains the package definition. Re-installing after removal does not require re-loading the registry.
- **`isInstalled()` as a query primitive:** The boolean check enables conditional logic — scripts can test whether a dependency is met before proceeding, similar to `dpkg -s <package>` in shell scripts.
- **SSH integration as a usage vector:** The `VirtualSshServer` integration demonstrates that the package manager is not an isolated API — it is accessible through the shell interface, meaning remote clients can install and remove packages over the virtual SSH connection. This is how real users interact with package managers: by SSHing into a server and running `apt install`.
