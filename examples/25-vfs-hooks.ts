/**
 * Example 25: VFS Hooks and Content Resolvers
 *
 * Demonstrates the VirtualFileSystem hook system: register content resolvers
 * that dynamically generate file content on read, and beforeRead/beforeWrite
 * hooks for monitoring or access control.
 */

import { VirtualFileSystem } from "../src";

const vfs = new VirtualFileSystem();

vfs.mkdir("/proc");
vfs.mkdir("/sys");
vfs.mkdir("/etc");

// ── Content resolver (dynamic /proc/cpuinfo) ──────────────────────
console.log("--- Content resolvers (dynamic files) ---");

vfs.registerContentResolver("/proc", (path) => {
	if (path === "/proc/cpuinfo") {
		return "processor\t: 0\nvendor_id\t: Virtual\nmodel name\t: Virtual CPU\ncpu MHz\t\t: 2400.00\n";
	}
	if (path === "/proc/meminfo") {
		return `MemTotal:       ${512 * 1024} kB\nMemFree:        ${256 * 1024} kB\n`;
	}
	return null; // not handled, fall through to normal VFS
});

console.log(vfs.readFile("/proc/cpuinfo").split("\n").slice(0, 4).join("\n"));

// ── Before-read hook (audit log) ──────────────────────────────────
console.log("\n--- beforeRead hook (audit log) ---");
vfs.onBeforeRead("/etc", () => {
	console.log("  beforeRead: /etc file accessed");
});

// Reads trigger the hook
vfs.writeFile("/etc/hostname", "my-vm");
console.log(vfs.readFile("/etc/hostname"));

// ── Before-write hook (read-only filesystem guard) ───────────────────────────
console.log("\n--- beforeWrite hook (read-only filesystem guard) ---");
vfs.onBeforeWrite("/sys", (path) => {
	throw new Error(`Read-only: cannot write to ${path}`);
});

try {
	vfs.writeFile("/sys/test", "should fail");
} catch (err: unknown) {
	const msg = err instanceof Error ? err.message : String(err);
	console.log(`  Blocked: ${msg}`);
}

// Writes outside /sys succeed
vfs.writeFile("/tmp/test", "allowed");
console.log(`  /tmp/test content: ${vfs.readFile("/tmp/test")}`);

// ── Hook removal ──────────────────────────────────────────────────
console.log("\n--- Hook removal ---");
vfs.offBeforeRead("/etc");
vfs.offBeforeWrite("/sys");
console.log("  Hooks removed");

// ── Multiple resolvers with priority ──────────────────────────────
console.log("\n--- Overlapping resolver paths ---");
vfs.registerContentResolver("/", (path) => {
	if (path === "/etc/os-release") {
		return 'NAME="Virtual Container"\nVERSION="1.0"\n';
	}
	return null;
});

console.log(vfs.readFile("/etc/os-release"));

// ── Stat of dynamically resolved files ────────────────────────────
console.log("\n--- Stats of resolved files ---");
const cpuStat = vfs.stat("/proc/cpuinfo");
console.log(`  /proc/cpuinfo: type=${cpuStat.type}, size=${cpuStat.size}`);
