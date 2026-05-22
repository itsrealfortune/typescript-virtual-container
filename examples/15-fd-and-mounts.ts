/**
 * VFS file descriptors and mount points
 * 
 * Demonstrates POSIX-like file descriptor operations (open, close, dup)
 * and host directory mounting into the VFS.
 */

import { VirtualFileSystem } from "../src";

const vfs = new VirtualFileSystem();

// ── File descriptors ────────────────────────────────────────────────
console.log("--- File descriptors ---");

vfs.writeFile("/tmp/test.txt", "Hello, file descriptors!");

const fd1 = vfs.fdOpen("/tmp/test.txt", 0);
const fd2 = vfs.fdOpen("/tmp/test.txt", 0);

console.log("Opened FDs:", fd1, fd2);
console.log("FD1 path:", vfs.fdPath(fd1));
console.log("FD2 path:", vfs.fdPath(fd2));

// ── Dup ─────────────────────────────────────────────────────────────
console.log("\n--- Dup ---");

const fd3 = vfs.fdDup(fd1);
console.log("Duplicated FD1 -> FD3:", fd3);

const fd4 = vfs.fdDup2(fd1, 100);
console.log("Dup2 FD1 -> FD100:", fd4);

// ── Open FDs ────────────────────────────────────────────────────────
console.log("\n--- Open FDs ---");

const openFds = vfs.getOpenFds();
console.log("Open FDs:", Array.from(openFds.entries()));

// ── Close FDs ───────────────────────────────────────────────────────
console.log("\n--- Close FDs ---");

vfs.fdClose(fd2);
vfs.fdClose(fd3);
console.log("Closed FD2 and FD3");
console.log("Remaining open FDs:", Array.from(vfs.getOpenFds().entries()));

vfs.closeAllFds();
console.log("All FDs closed");

// ── Mount points ────────────────────────────────────────────────────
console.log("\n--- Mount points ---");

vfs.mount("/mnt/host", "/tmp", { readOnly: true });
console.log("Mount points:", vfs.getMounts());

const entries = vfs.list("/mnt/host");
console.log("Mounted directory entries:", entries);

try {
	vfs.writeFile("/mnt/host/new-file.txt", "should fail");
} catch (err: unknown) {
	console.log("Write to read-only mount failed (expected):", (err as Error).message);
}

vfs.unmount("/mnt/host");
console.log("Unmounted /mnt/host");
