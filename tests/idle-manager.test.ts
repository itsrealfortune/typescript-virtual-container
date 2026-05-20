import { describe, expect, test } from "bun:test";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";
import { IdleManager } from "../src/modules/VirtualShell/idleManager";

function makeVfs() {
	return new VirtualFileSystem({ mode: "memory" });
}

describe("IdleManager", () => {
	test("starts as active", () => {
		const vfs = makeVfs();
		const idle = new IdleManager(vfs, { idleThresholdMs: 50, checkIntervalMs: 20 });
		expect(idle.state).toBe("active");
		idle.stop();
	});

	test("stop() cleans up timer", async () => {
		const vfs = makeVfs();
		const idle = new IdleManager(vfs, { idleThresholdMs: 50, checkIntervalMs: 20 });
		idle.start();
		await idle.stop();
		expect(idle.state).toBe("active");
	});

	test("freeze and thaw cycle", async () => {
		const vfs = makeVfs();
		vfs.writeFile("/tmp/test.txt", "data");
		const idle = new IdleManager(vfs, { idleThresholdMs: 20, checkIntervalMs: 10 });

		const events: string[] = [];
		idle.on("freeze", () => events.push("freeze"));
		idle.on("thaw", () => events.push("thaw"));

		idle.start();
		// Wait for freeze to trigger
		await Bun.sleep(60);
		expect(events).toContain("freeze");

		// Ping should thaw
		idle.ping();
		expect(events).toContain("thaw");
		expect(idle.state).toBe("active");

		// VFS should still be usable after thaw
		expect(vfs.readFile("/tmp/test.txt")).toBe("data");

		await idle.stop();
	});

	test("ping resets idle clock", async () => {
		const vfs = makeVfs();
		const idle = new IdleManager(vfs, { idleThresholdMs: 1000, checkIntervalMs: 50 });
		idle.start();
		await Bun.sleep(30);
		idle.ping(); // reset clock
		expect(idle.idleMs).toBeLessThan(100);
		await idle.stop();
	});

	test("start is idempotent", () => {
		const vfs = makeVfs();
		const idle = new IdleManager(vfs, { idleThresholdMs: 50, checkIntervalMs: 20 });
		idle.start();
		idle.start(); // second call should be no-op
		idle.stop();
	});
});
