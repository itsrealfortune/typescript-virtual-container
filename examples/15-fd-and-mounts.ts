/**
 * 15 - File Descriptors and Mount Points
 *
 * Demonstrates POSIX-like file descriptor operations (open, close, dup)
 * and host directory mounting into the VFS.
 */

import { VirtualFileSystem } from "../src";

const VFS = new VirtualFileSystem();

// ── File descriptors ────────────────────────────────────────────────
console.log("--- File descriptors ---");

VFS.writeFile("/tmp/test.txt", "Hello, file descriptors!");

const FD1 = VFS.fdOpen("/tmp/test.txt", 0);
const FD2 = VFS.fdOpen("/tmp/test.txt", 0);

console.log("Opened FDs:", FD1, FD2);
console.log("FD1 path:", VFS.fdPath(FD1));
console.log("FD2 path:", VFS.fdPath(FD2));

// ── Dup ─────────────────────────────────────────────────────────────
console.log("\n--- Dup ---");

const FD3 = VFS.fdDup(FD1);
console.log("Duplicated FD1 -> FD3:", FD3);

const FD4 = VFS.fdDup2(FD1, 100);
console.log("Dup2 FD1 -> FD100:", FD4);

// ── Open FDs ────────────────────────────────────────────────────────
console.log("\n--- Open FDs ---");

const OPEN_FDS = VFS.getOpenFds();
console.log("Open FDs:", Array.from(OPEN_FDS.entries()));

// ── Close FDs ───────────────────────────────────────────────────────
console.log("\n--- Close FDs ---");

VFS.fdClose(FD2);
VFS.fdClose(FD3);
console.log("Closed FD2 and FD3");
console.log("Remaining open FDs:", Array.from(VFS.getOpenFds().entries()));

VFS.closeAllFds();
console.log("All FDs closed");

// ── Mount points ────────────────────────────────────────────────────
console.log("\n--- Mount points ---");

VFS.mount("/mnt/host", "/tmp", { readOnly: true });
console.log("Mount points:", VFS.getMounts());

const ENTRIES = VFS.list("/mnt/host");
console.log("Mounted directory entries:", ENTRIES);

try {
	VFS.writeFile("/mnt/host/new-file.txt", "should fail");
} catch (err: unknown) {
	console.log(
		"Write to read-only mount failed (expected):",
		(err as Error).message
	);
}

VFS.unmount("/mnt/host");
console.log("Unmounted /mnt/host");
