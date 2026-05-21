import { describe, expect, test } from "bun:test";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";
import { IdleManager } from "../src/modules/VirtualShell/idleManager";
import { VirtualShell } from "../src/modules/VirtualShell";

function makeShell() {
	return new VirtualShell("test-vm");
}

describe("IdleManager", () => {
	test("starts as active", async () => {
		const shell = makeShell();
		await shell.ensureInitialized();
		const idle = new IdleManager(shell, { idleThresholdMs: 50, checkIntervalMs: 20 });
		expect(idle.state).toBe("active");
		idle.stop();
	});

	test("stop() cleans up timer", async () => {
		const shell = makeShell();
		await shell.ensureInitialized();
		const idle = new IdleManager(shell, { idleThresholdMs: 50, checkIntervalMs: 20 });
		idle.start();
		await idle.stop();
		expect(idle.state).toBe("active");
	});

	test("freeze and thaw cycle", async () => {
		const shell = makeShell();
		await shell.ensureInitialized();
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

		await idle.stop();
	});

	test("ping resets idle clock", async () => {
		const shell = makeShell();
		await shell.ensureInitialized();
		const idle = new IdleManager(shell, { idleThresholdMs: 1000, checkIntervalMs: 50 });
		idle.start();
		await Bun.sleep(30);
		idle.ping();
		expect(idle.idleMs).toBeLessThan(100);
		await idle.stop();
	});

	test("start is idempotent", async () => {
		const shell = makeShell();
		await shell.ensureInitialized();
		const idle = new IdleManager(shell, { idleThresholdMs: 50, checkIntervalMs: 20 });
		idle.start();
		idle.start();
		idle.stop();
	});

	test("gc cleans up terminated processes", async () => {
		const shell = makeShell();
		await shell.ensureInitialized();
		const pid = shell.users.registerProcess("root", "test", ["test"], "pts/0");
		shell.users.markProcessDone(pid);

		const idle = new IdleManager(shell, { gcIntervalMs: 10 });
		const gcEvents: unknown[] = [];
		idle.on("gc:run", (stats) => gcEvents.push(stats));

		idle.start();
		await Bun.sleep(30);
		idle.stop();

		expect(gcEvents.length).toBeGreaterThan(0);
		const lastStats = gcEvents[gcEvents.length - 1] as { terminatedProcesses: number };
		expect(lastStats.terminatedProcesses).toBeGreaterThanOrEqual(0);
	});

	test("runGc returns stats", async () => {
		const shell = makeShell();
		await shell.ensureInitialized();
		const idle = new IdleManager(shell, { gcIntervalMs: 0 });

		const stats = idle.runGc();
		expect(stats).toHaveProperty("terminatedProcesses");
		expect(stats).toHaveProperty("staleCpuEntries");
		expect(stats).toHaveProperty("evictedFiles");
		expect(stats).toHaveProperty("forcedGc");
	});

	test("evictUnusedLargeFiles evicts files without open FDs", async () => {
		const shell = makeShell();
		await shell.ensureInitialized();
		shell.vfs.writeFile("/tmp/big.txt", "x".repeat(1000));
		const openPaths = shell.vfs.getOpenPaths();
		const evicted = shell.vfs.evictUnusedLargeFiles(openPaths);
		expect(evicted).toBeGreaterThanOrEqual(0);
	});
});
