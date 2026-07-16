/**
 * 09 - Symlinks
 *
 * Demonstrates creating and resolving symbolic links in the VFS,
 * including target resolution and symlink type detection.
 */

import { VirtualFileSystem } from "../src";

// ── Symlinks ────────────────────────────────────────────────────────
console.log("--- Symlinks ---");

const VFS = new VirtualFileSystem();
VFS.writeFile("/opt/myapp/bin/app", "#!/bin/sh\necho hello");
VFS.symlink("/opt/myapp/bin/app", "/usr/local/bin/app");

console.log(VFS.isSymlink("/usr/local/bin/app"));
console.log(VFS.resolveSymlink("/usr/local/bin/app"));
