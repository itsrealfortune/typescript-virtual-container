/**
 * 25 - VFS Hooks
 *
 * Demonstrates the VFS hook system including content resolvers for
 * dynamic file generation and beforeRead/beforeWrite hooks.
 */

import { VirtualFileSystem } from "../src";

const VFS = new VirtualFileSystem();

VFS.mkdir("/proc");
VFS.mkdir("/sys");
VFS.mkdir("/etc");

// ── Content resolver (dynamic /proc/cpuinfo) ──────────────────────
console.log("--- Content resolvers (dynamic files) ---");

VFS.registerContentResolver("/proc", (path) => {
	if (path === "/proc/cpuinfo") {
		return "processor\t: 0\nvendor_id\t: Virtual\nmodel name\t: Virtual CPU\ncpu MHz\t\t: 2400.00\n";
	}
	if (path === "/proc/meminfo") {
		return `MemTotal:       ${512 * 1024} kB\nMemFree:        ${256 * 1024} kB\n`;
	}
	return null; // not handled, fall through to normal VFS
});

console.log(VFS.readFile("/proc/cpuinfo").split("\n").slice(0, 4).join("\n"));

// ── Before-read hook (audit log) ──────────────────────────────────
console.log("\n--- beforeRead hook (audit log) ---");
VFS.onBeforeRead("/etc", () => {
	console.log("  beforeRead: /etc file accessed");
});

// Reads trigger the hook
VFS.writeFile("/etc/hostname", "my-vm");
console.log(VFS.readFile("/etc/hostname"));

// ── Before-write hook (read-only filesystem guard) ───────────────────────────
console.log("\n--- beforeWrite hook (read-only filesystem guard) ---");
VFS.onBeforeWrite("/sys", (path) => {
	throw new Error(`Read-only: cannot write to ${path}`);
});

try {
	VFS.writeFile("/sys/test", "should fail");
} catch (err: unknown) {
	const MSG = err instanceof Error ? err.message : String(err);
	console.log(`  Blocked: ${MSG}`);
}

// Writes outside /sys succeed
VFS.writeFile("/tmp/test", "allowed");
console.log(`  /tmp/test content: ${VFS.readFile("/tmp/test")}`);

// ── Hook removal ──────────────────────────────────────────────────
console.log("\n--- Hook removal ---");
VFS.offBeforeRead("/etc");
VFS.offBeforeWrite("/sys");
console.log("  Hooks removed");

// ── Multiple resolvers with priority ──────────────────────────────
console.log("\n--- Overlapping resolver paths ---");
VFS.registerContentResolver("/", (path) => {
	if (path === "/etc/os-release") {
		return 'NAME="Virtual Container"\nVERSION="1.0"\n';
	}
	return null;
});

console.log(VFS.readFile("/etc/os-release"));

// ── Stat of dynamically resolved files ────────────────────────────
console.log("\n--- Stats of resolved files ---");
const CPU_STAT = VFS.stat("/proc/cpuinfo");
console.log(
	`  /proc/cpuinfo: type=${CPU_STAT.type}, size=${CPU_STAT.type === "file" ? CPU_STAT.size : "N/A"}`
);
