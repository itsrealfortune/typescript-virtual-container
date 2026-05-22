import { beforeAll, describe, expect, test } from "bun:test";
import { VirtualShell } from "../src";

let shell: VirtualShell;

beforeAll(async () => {
	shell = new VirtualShell("api-test", undefined, { mode: "memory" });
	await shell.ensureInitialized();
});

describe("VirtualShell API", () => {
	test("addCommand registers a custom command", async () => {
		shell.addCommand("mycmd", ["<arg>"], () => ({ stdout: "custom\n", exitCode: 0 }));
		const r = await shell.executeCommand("mycmd", "root", "/");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toBe("custom\n");
	});

	test("addCommand rejects invalid name", () => {
		expect(() => shell.addCommand("", [], () => ({ exitCode: 0 }))).toThrow();
		expect(() => shell.addCommand("has space", [], () => ({ exitCode: 0 }))).toThrow();
	});

	test("executeCommand runs a command", async () => {
		const r = await shell.executeCommand("echo hello", "root", "/");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello");
	});

	test("mount and unmount", () => {
		const vPath = "/mnt/test";
		shell.mount(vPath, "/tmp", { readOnly: true });
		const mounts = shell.getMounts();
		expect(mounts.some((m) => m.vPath === vPath)).toBe(true);
		shell.unmount(vPath);
		const mounts2 = shell.getMounts();
		expect(mounts2.some((m) => m.vPath === vPath)).toBe(false);
	});

	test("writeFileAsUser writes file", () => {
		shell.writeFileAsUser("root", "/tmp/wfau-test.txt", "hello");
		expect(shell.vfs.readFile("/tmp/wfau-test.txt")).toBe("hello");
	});

	test("enableIdleManagement and disableIdleManagement", async () => {
		expect(shell.idleState).toBe("active");
		shell.enableIdleManagement({ idleThresholdMs: 50000, checkIntervalMs: 10000 });
		expect(shell.idleState).toBe("active");
		expect(shell.idleMs).toBe(0);
		await shell.disableIdleManagement();
		expect(shell.idleState).toBe("active");
	});
});
