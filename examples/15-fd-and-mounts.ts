/**
 * Example 15: VFS file descriptors and mount points
 *
 * Demonstrates POSIX-like file descriptor operations (open, close, dup)
 * and host directory mounting into the VFS.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { VirtualFileSystem } from "../src";

const vfs = new VirtualFileSystem();

// ── File descriptors ──────────────────────────────────────────────

// Create a file
vfs.writeFile("/tmp/test.txt", "Hello, file descriptors!");

// Open file with different flags
const fd1 = vfs.fdOpen("/tmp/test.txt", 0); // O_RDONLY
const fd2 = vfs.fdOpen("/tmp/test.txt", 0); // O_RDONLY (second handle)

console.log("Opened FDs:", fd1, fd2);
console.log("FD1 path:", vfs.fdPath(fd1));
console.log("FD2 path:", vfs.fdPath(fd2));

// Duplicate FD
const fd3 = vfs.fdDup(fd1);
console.log("Duplicated FD1 → FD3:", fd3);

// Dup2: redirect fd4 onto fd1's target
const fd4 = vfs.fdDup2(fd1, 100);
console.log("Dup2 FD1 → FD100:", fd4);

// Check open FDs
const openFds = vfs.getOpenFds();
console.log("\nOpen FDs:", Array.from(openFds.entries()));

// Close specific FDs
vfs.fdClose(fd2);
vfs.fdClose(fd3);
console.log("\nClosed FD2 and FD3");
console.log("Remaining open FDs:", Array.from(vfs.getOpenFds().entries()));

// Close all FDs
vfs.closeAllFds();
console.log("All FDs closed");

// ── Mount points ──────────────────────────────────────────────────

// Create a temp host directory
const hostDir = path.join(process.cwd(), ".vfs-mount-demo");
fs.mkdirSync(hostDir, { recursive: true });
fs.writeFileSync(path.join(hostDir, "host-file.txt"), "Content from host filesystem");
fs.writeFileSync(path.join(hostDir, "data.json"), JSON.stringify({ hello: "world" }));

// Mount host directory into VFS
vfs.mount("/mnt/host", hostDir, { readOnly: true });

console.log("\nMount points:", vfs.getMounts());

// Read mounted files
const hostContent = vfs.readFile("/mnt/host/host-file.txt");
console.log("Host file content:", hostContent);

const jsonData = vfs.readFile("/mnt/host/data.json");
console.log("JSON data:", jsonData);

// List mounted directory
const entries = vfs.list("/mnt/host");
console.log("Mounted directory entries:", entries);

// Write to read-only mount — should fail
try {
	vfs.writeFile("/mnt/host/new-file.txt", "should fail");
} catch (err: unknown) {
	console.log("\nWrite to read-only mount failed (expected):", (err as Error).message);
}

// Unmount
vfs.unmount("/mnt/host");
console.log("\nUnmounted /mnt/host");

// Cleanup
fs.rmSync(hostDir, { recursive: true, force: true });
