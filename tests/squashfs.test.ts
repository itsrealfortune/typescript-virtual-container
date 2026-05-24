import { describe, test, expect } from "bun:test";
import * as fs from "node:fs";
import { decodeSquashfs } from "../src/modules/VirtualFileSystem/squashfs";
import type {
	InternalDirectoryNode,
	InternalFileNode,
} from "../src/modules/VirtualFileSystem/internalTypes";

const imagePath = "/tmp/test-comp.squashfs";

describe("squashfs decoder", () => {
	test("decodes root tree correctly", () => {
		const buf = fs.readFileSync(imagePath);
		const root = decodeSquashfs(buf);
		expect(root.type).toBe("directory");
		expect(root.name).toBe("");

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
