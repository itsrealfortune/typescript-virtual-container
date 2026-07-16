import { describe, test, expect } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";
import {
	decodeSquashfs,
	isSquashfsFormat,
} from "../src/modules/VirtualFileSystem/squashfs";
import type {
	InternalDirectoryNode,
	InternalFileNode,
} from "../src/modules/VirtualFileSystem/internalTypes";

const IMAGE_PATH = "/tmp/test-comp.squashfs";

describe("isSquashfsFormat", () => {
	test("detects squashfs magic bytes", () => {
		const buf = fs.readFileSync(IMAGE_PATH);
		expect(isSquashfsFormat(buf)).toBe(true);
	});

	test("rejects empty buffer", () => {
		expect(isSquashfsFormat(Buffer.alloc(0))).toBe(false);
	});

	test("rejects random data", () => {
		expect(isSquashfsFormat(Buffer.from("not a squashfs image"))).toBe(false);
	});
});

describe("decodeSquashfs", () => {
	test("decodes root tree correctly", () => {
		const buf = fs.readFileSync(IMAGE_PATH);
		const root = decodeSquashfs(buf);
		expect(root.type).toBe("directory");

		const names = Object.keys(root.children).sort();
		expect(names).toEqual(["emptydir", "hello.txt", "link-to-hello", "nested"]);

		const emptydir = root.children.emptydir as InternalDirectoryNode;
		expect(emptydir.type).toBe("directory");
		expect(Object.keys(emptydir.children)).toEqual([]);

		const hello = root.children["hello.txt"] as InternalFileNode;
		expect(hello.type).toBe("file");
		expect(hello.content.toString("utf8")).toBe("Hello, World!\n");

		const link = root.children["link-to-hello"] as InternalFileNode;
		expect(link.type).toBe("file");
		expect(link.content.toString("utf8")).toBe("/hello.txt");
		expect(link.mode).toBe(0o120777);

		const nested = root.children.nested as InternalDirectoryNode;
		expect(nested.type).toBe("directory");
		const nestedNames = Object.keys(nested.children).sort();
		expect(nestedNames).toEqual(["file.txt"]);

		const fileTxt = nested.children["file.txt"] as InternalFileNode;
		expect(fileTxt.type).toBe("file");
		expect(fileTxt.content.toString("utf8")).toBe("Nested file content\n");
	});
});

describe("squashfs snapshot integration", () => {
	test("restoreMirror loads squashfs snapshot in fs mode", async () => {
		const testDir = path.join(process.cwd(), ".test-squashfs-snapshot");
		try {
			fs.rmSync(testDir, { recursive: true, force: true });
		} catch {}
		fs.mkdirSync(testDir, { recursive: true });

		// Copy the squashfs image as the snapshot file
		fs.copyFileSync(IMAGE_PATH, path.join(testDir, "vfs-snapshot.vfsb"));

		try {
			const vfs = new VirtualFileSystem({
				mode: "fs",
				snapshotPath: testDir,
			});
			await vfs.restoreMirror();

			expect(vfs.readFile("/hello.txt")).toBe("Hello, World!\n");
			expect(vfs.isSymlink("/link-to-hello")).toBe(true);
			expect(vfs.resolveSymlink("/link-to-hello")).toBe("/hello.txt");
			expect(vfs.exists("/emptydir")).toBe(true);
			expect(vfs.list("/emptydir")).toEqual([]);
			expect(vfs.readFile("/nested/file.txt")).toBe("Nested file content\n");
		} finally {
			try {
				fs.rmSync(testDir, { recursive: true, force: true });
			} catch {}
		}
	});

	test("squashfs contents survive tar roundtrip", () => {
		const buf = fs.readFileSync(IMAGE_PATH);
		const root = decodeSquashfs(buf);

		// Import into VFS
		const vfs = new VirtualFileSystem();
		vfs.mergeRootTree(root);

		// Export as tar
		const tarBuf = vfs.exportTar();

		// Re-import into fresh VFS
		const vfs2 = new VirtualFileSystem();
		vfs2.importTar(tarBuf);

		// Verify contents survive
		expect(vfs2.readFile("/hello.txt")).toBe("Hello, World!\n");
		expect(vfs2.isSymlink("/link-to-hello")).toBe(true);
		expect(vfs2.resolveSymlink("/link-to-hello")).toBe("/hello.txt");
		expect(vfs2.exists("/emptydir")).toBe(true);
		expect(vfs2.list("/emptydir")).toEqual([]);
		expect(vfs2.readFile("/nested/file.txt")).toBe("Nested file content\n");
	});
});
