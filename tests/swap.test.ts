import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import * as fsSync from "node:fs";
import * as path from "node:path";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";

const TEST_DIR = path.join(process.cwd(), ".test-swap");

function cleanup() {
	try {
		fsSync.rmSync(TEST_DIR, { recursive: true, force: true });
	} catch {
		/* ignore */
	}
}

function makeVfs(swapEnabled = false) {
	cleanup();
	fsSync.mkdirSync(TEST_DIR, { recursive: true });
	return new VirtualFileSystem({
		mode: "fs",
		snapshotPath: TEST_DIR,
		swapEnabled,
	});
}

describe("SwapStore", () => {
	beforeEach(cleanup);
	afterEach(cleanup);

	test("swap is disabled by default in memory mode", () => {
		const vfs = new VirtualFileSystem();
		expect(vfs.isSwapEnabled()).toBe(false);
		expect(vfs.getSwapStats()).toBeNull();
	});

	test("swap is disabled by default in fs mode", () => {
		const vfs = makeVfs(false);
		expect(vfs.isSwapEnabled()).toBe(false);
		expect(vfs.getSwapStats()).toBeNull();
	});

	test("swap can be enabled in fs mode", () => {
		const vfs = makeVfs(true);
		expect(vfs.isSwapEnabled()).toBe(true);
		expect(vfs.getSwapStats()).not.toBeNull();
	});
});

describe("SwapStore basic operations", () => {
	beforeEach(cleanup);
	afterEach(cleanup);

	test("swapOutFile writes content to swap and evicts from RAM", () => {
		const vfs = makeVfs(true);
		const content = "x".repeat(1000);
		vfs.writeFile("/test.txt", content);

		const result = vfs.swapOutFile("/test.txt");
		expect(result).toBe(true);

		// File should be marked as evicted
		const stat = vfs.stat("/test.txt");
		expect(stat.type).toBe("file");
		expect((stat as { size: number }).size).toBe(1000);
	});

	test("reading an evicted file reloads from swap", () => {
		const vfs = makeVfs(true);
		const content = "hello swap world";
		vfs.writeFile("/test.txt", content);
		vfs.swapOutFile("/test.txt");

		// Reading should reload from swap
		const read = vfs.readFile("/test.txt");
		expect(read).toBe(content);
	});

	test("swap stats track operations", () => {
		const vfs = makeVfs(true);
		vfs.writeFile("/a.txt", "a".repeat(500));
		vfs.writeFile("/b.txt", "b".repeat(500));

		vfs.swapOutFile("/a.txt");
		vfs.swapOutFile("/b.txt");

		const stats = vfs.getSwapStats();
		expect(stats).not.toBeNull();
		expect(stats!.filesSwapped).toBe(2);
		expect(stats!.swapOuts).toBe(2);
	});

	test("clearSwap removes all swap files", () => {
		const vfs = makeVfs(true);
		vfs.writeFile("/test.txt", "test content");
		vfs.swapOutFile("/test.txt");

		vfs.clearSwap();

		const stats = vfs.getSwapStats();
		expect(stats!.filesSwapped).toBe(0);
	});

	test("swapOutFile returns false for non-existent file", () => {
		const vfs = makeVfs(true);
		const result = vfs.swapOutFile("/nonexistent.txt");
		expect(result).toBe(false);
	});

	test("swapOutFile returns false when swap disabled", () => {
		const vfs = makeVfs(false);
		vfs.writeFile("/test.txt", "content");
		const result = vfs.swapOutFile("/test.txt");
		expect(result).toBe(false);
	});
});

describe("Swap + RAM cap integration", () => {
	beforeEach(cleanup);
	afterEach(cleanup);

	test("RAM cap triggers swap-out before rejecting writes", () => {
		const vfs = makeVfs(true);
		vfs.setRamCap(2000);

		// Write a file that fits
		vfs.writeFile("/small.txt", "a".repeat(500));

		// Write another file that would exceed cap - should trigger swap
		vfs.writeFile("/large.txt", "b".repeat(1000));

		// Both files should exist (swap allowed the write)
		expect(vfs.exists("/small.txt")).toBe(true);
		expect(vfs.exists("/large.txt")).toBe(true);
	});

	test("write fails when swap can't free enough space", () => {
		const vfs = makeVfs(true);
		vfs.setRamCap(100);

		// This should fail - no files to swap out
		expect(() => {
			vfs.writeFile("/test.txt", "x".repeat(200));
		}).toThrow("ENOMEM");
	});
});

describe("Swap + eviction integration", () => {
	beforeEach(cleanup);
	afterEach(cleanup);

	test("evictLargeFiles uses swap when enabled", () => {
		const vfs = makeVfs(true);
		const content = "x".repeat(1000);
		vfs.writeFile("/large.txt", content);

		// Flush and evict
		vfs.evictLargeFiles();

		// File should still be readable (from swap)
		const read = vfs.readFile("/large.txt");
		expect(read).toBe(content);
	});

	test("evictUnusedLargeFiles uses swap when enabled", () => {
		const vfs = makeVfs(true);
		const content = "y".repeat(1000);
		vfs.writeFile("/unused.txt", content);

		const openPaths = vfs.getOpenPaths();
		vfs.evictUnusedLargeFiles(openPaths);

		// File should still be readable (from swap)
		const read = vfs.readFile("/unused.txt");
		expect(read).toBe(content);
	});
});
