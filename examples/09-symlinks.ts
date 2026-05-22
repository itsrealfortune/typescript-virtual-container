/**
 * Symlinks
 * 
 * Demonstrates creating and resolving symbolic links in the VFS.
 */

import { VirtualFileSystem } from "../src";

// ── Symlinks ────────────────────────────────────────────────────────
console.log("--- Symlinks ---");

const vfs = new VirtualFileSystem();
vfs.writeFile("/opt/myapp/bin/app", "#!/bin/sh\necho hello");
vfs.symlink("/opt/myapp/bin/app", "/usr/local/bin/app");

console.log(vfs.isSymlink("/usr/local/bin/app"));
console.log(vfs.resolveSymlink("/usr/local/bin/app"));
