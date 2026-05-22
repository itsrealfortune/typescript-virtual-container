/**
 * Example 09: Symlinks
 *
 * Demonstrates creating and resolving symbolic links in the VFS.
 */

import { VirtualFileSystem } from "../src";

const vfs = new VirtualFileSystem();
vfs.writeFile("/opt/myapp/bin/app", "#!/bin/sh\necho hello");
vfs.symlink("/opt/myapp/bin/app", "/usr/local/bin/app");

console.log(vfs.isSymlink("/usr/local/bin/app"));     // true
console.log(vfs.resolveSymlink("/usr/local/bin/app")); // /opt/myapp/bin/app
