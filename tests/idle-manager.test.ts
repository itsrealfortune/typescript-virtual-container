import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { VirtualShell } from "../src/modules/VirtualShell";
import { IdleManager } from "../src/modules/VirtualShell/idleManager";

function makeShell() {
	return new VirtualShell("test-vm");
}

let tmpDir: string;

beforeAll(() => {
	tmpDir = fs.mkdtempSync(path.join("/tmp", "vfs-gc-test-"));
});

afterAll(() => {
	fs.rmSync(tmpDir, { recursive: true, force: true });
});

function makeShellWithFsVfs() {
	return new VirtualShell("test-vm-fs", undefined);
}

describe("IdleManager", () => {
	test("starts as active", () => {
		const shell = makeShell();
		shell.ensureInitialized();
		const idle = new IdleManager(shell, { idleThresholdMs: 50, checkIntervalMs: 20 });
		expect(idle.state).toBe("active");
		idle.stop();
	});

	test("stop() cleans up timer", () => {
		const shell = makeShell();
		shell.ensureInitialized();
		const idle = new IdleManager(shell, { idleThresholdMs: 50, checkIntervalMs: 20 });
		idle.start();
		idle.stop();
		expect(idle.state).toBe("active");
	});

	test("freeze and thaw cycle", async () => {
		const shell = makeShell();
		shell.ensureInitialized();
		shell.vfs.writeFile("/tmp/test.txt", "data");
		const idle = new IdleManager(shell, { idleThresholdMs: 20, checkIntervalMs: 10 });

		const events: string[] = [];
		idle.on("freeze", () => events.push("freeze"));
		idle.on("thaw", () => events.push("thaw"));

		idle.start();
		await Bun.sleep(60);
		expect(events).toContain("freeze");

		idle.ping();
		expect(events).toContain("thaw");
		expect(idle.state).toBe("active");

		expect(shell.vfs.readFile("/tmp/test.txt")).toBe("data");

		idle.stop();
	});

	test("ping resets idle clock", async () => {
		const shell = makeShell();
		shell.ensureInitialized();
		const idle = new IdleManager(shell, { idleThresholdMs: 1000, checkIntervalMs: 50 });
		idle.start();
		await Bun.sleep(30);
		idle.ping();
		expect(idle.idleMs).toBeLessThan(100);
		idle.stop();
	});

	test("start is idempotent", () => {
		const shell = makeShell();
		shell.ensureInitialized();
		const idle = new IdleManager(shell, { idleThresholdMs: 50, checkIntervalMs: 20 });
		idle.start();
		idle.start();
		idle.stop();
	});

	test("gc cleans up terminated processes", () => {
		const shell = makeShell();
		shell.ensureInitialized();
		const pid = shell.users.registerProcess("root", "test", ["test"], "pts/0");
		expect(shell.users.getProcess(pid)?.status).toBe("running");
		shell.users.markProcessDone(pid);
		expect(shell.users.getProcess(pid)?.status).toBe("done");

		const idle = new IdleManager(shell, { gcIntervalMs: 0 });
		const stats = idle.runGc();

		expect(stats.terminatedProcesses).toBeGreaterThanOrEqual(1);
		expect(shell.users.getProcess(pid)).toBeUndefined();
	});

	test("gc does not remove running processes", () => {
		const shell = makeShell();
		shell.ensureInitialized();
		const pid = shell.users.registerProcess("root", "sleep", ["sleep", "60"], "pts/0");
		expect(shell.users.getProcess(pid)?.status).toBe("running");

		const idle = new IdleManager(shell, { gcIntervalMs: 0 });
		const stats = idle.runGc();

		expect(stats.terminatedProcesses).toBe(0);
		expect(shell.users.getProcess(pid)).toBeDefined();
	});

	test("runGc returns full stats shape", () => {
		const shell = makeShell();
		shell.ensureInitialized();
		const idle = new IdleManager(shell, { gcIntervalMs: 0 });

		const stats = idle.runGc();
		expect(stats).toHaveProperty("terminatedProcesses");
		expect(stats).toHaveProperty("staleCpuEntries");
		expect(stats).toHaveProperty("evictedFiles");
		expect(stats).toHaveProperty("forcedGc");
		expect(typeof stats.terminatedProcesses).toBe("number");
		expect(typeof stats.staleCpuEntries).toBe("number");
		expect(typeof stats.evictedFiles).toBe("number");
		expect(typeof stats.forcedGc).toBe("boolean");
	});

	test("evictUnusedLargeFiles evicts files without open FDs", () => {
		const shell = makeShellWithFsVfs();
		shell.ensureInitialized();
		shell.vfs.writeFile("/tmp/big.txt", "x".repeat(10_000));

		// biome-ignore lint/suspicious/noExplicitAny: accessing internal VFS node for test verification
		const node = (shell.vfs as any)._root.children.tmp.children["big.txt"];
		expect(node.evicted).toBeUndefined();

		const openPaths = shell.vfs.getOpenPaths();
		expect(openPaths.has("/tmp/big.txt")).toBe(false);

		const evicted = shell.vfs.evictUnusedLargeFiles(openPaths);
		expect(evicted).toBeGreaterThanOrEqual(1);
		expect(node.evicted).toBe(true);
		expect(node.content.length).toBe(0);
	});

	test("evictUnusedLargeFiles skips files with open FDs", () => {
		const shell = makeShellWithFsVfs();
		shell.ensureInitialized();
		shell.vfs.writeFile("/tmp/open.txt", "y".repeat(10_000));

		const fd = shell.vfs.fdOpen("/tmp/open.txt", 0);
		const openPaths = shell.vfs.getOpenPaths();
		expect(openPaths.has("/tmp/open.txt")).toBe(true);

		// biome-ignore lint/suspicious/noExplicitAny: accessing internal VFS node for test verification
		const node = (shell.vfs as any)._root.children.tmp.children["open.txt"];
		shell.vfs.evictUnusedLargeFiles(openPaths);
		expect(node.evicted).toBeUndefined();

		shell.vfs.fdClose(fd);
	});

	test("gc:run event emitted with stats", () => {
		const shell = makeShell();
		shell.ensureInitialized();
		const idle = new IdleManager(shell, { gcIntervalMs: 0 });

		const events: unknown[] = [];
		idle.on("gc:run", (stats) => events.push(stats));

		idle.runGc();

		expect(events.length).toBe(1);
		const stats = events[0] as { terminatedProcesses: number };
		expect(typeof stats.terminatedProcesses).toBe("number");
	});

	test("gc timer fires automatically", async () => {
		const shell = makeShell();
		shell.ensureInitialized();
		const pid = shell.users.registerProcess("root", "test", ["test"], "pts/0");
		shell.users.markProcessDone(pid);

		const idle = new IdleManager(shell, { gcIntervalMs: 15 });
		const gcEvents: unknown[] = [];
		idle.on("gc:run", (stats) => gcEvents.push(stats));

		idle.start();
		await Bun.sleep(50);
		idle.stop();

		expect(gcEvents.length).toBeGreaterThanOrEqual(1);
		expect(shell.users.getProcess(pid)).toBeUndefined();
	});
});
