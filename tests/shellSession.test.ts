import { describe, expect, test } from "bun:test";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";

import {
	loadHistory,
	saveHistory,
	listPathCompletions,
} from "../src/utils/shellSession";

describe("shellSession", () => {
	describe("loadHistory", () => {
		test("creates history file if missing", () => {
			const vfs = new VirtualFileSystem();
			vfs.mkdir("/root", 0o755, 0, 0);
			const result = loadHistory(vfs, "root");
			expect(result).toEqual([]);
			expect(vfs.exists("/root/.bash_history")).toBe(true);
		});

		test("returns history lines", () => {
			const vfs = new VirtualFileSystem();
			vfs.mkdir("/root", 0o755, 0, 0);
			vfs.writeFile("/root/.bash_history", "echo hello\nls -la\ncd /tmp\n");
			const result = loadHistory(vfs, "root");
			expect(result).toEqual(["echo hello", "ls -la", "cd /tmp"]);
		});

		test("filters empty lines", () => {
			const vfs = new VirtualFileSystem();
			vfs.mkdir("/root", 0o755, 0, 0);
			vfs.writeFile("/root/.bash_history", "cmd1\n\n\ncmd2\n");
			const result = loadHistory(vfs, "root");
			expect(result).toEqual(["cmd1", "cmd2"]);
		});

		test("works for non-root user", () => {
			const vfs = new VirtualFileSystem();
			vfs.mkdir("/home");
			vfs.mkdir("/home/alice");
			vfs.writeFile("/home/alice/.bash_history", "ls\npwd\n");
			const result = loadHistory(vfs, "alice");
			expect(result).toEqual(["ls", "pwd"]);
		});
	});

	describe("saveHistory", () => {
		test("writes history to file", () => {
			const vfs = new VirtualFileSystem();
			vfs.mkdir("/root", 0o755, 0, 0);
			saveHistory(vfs, "root", ["cmd1", "cmd2"]);
			const content = vfs.readFile("/root/.bash_history");
			expect(content).toBe("cmd1\ncmd2\n");
		});

		test("empty history writes empty file", () => {
			const vfs = new VirtualFileSystem();
			vfs.mkdir("/root", 0o755, 0, 0);
			saveHistory(vfs, "root", []);
			const content = vfs.readFile("/root/.bash_history");
			expect(content).toBe("");
		});
	});

	describe("listPathCompletions", () => {
		test("returns matching completions", () => {
			const vfs = new VirtualFileSystem();
			vfs.mkdir("/usr", 0o755, 0, 0);
			vfs.mkdir("/usr/bin", 0o755, 0, 0);
			vfs.mkdir("/usr/lib", 0o755, 0, 0);
			vfs.mkdir("/usr/local", 0o755, 0, 0);
			const result = listPathCompletions(vfs, "/", "/usr/l");
			expect(result).toEqual(["/usr/lib/", "/usr/local/"]);
		});

		test("hides dot-files unless prefix starts with dot", () => {
			const vfs = new VirtualFileSystem();
			vfs.mkdir("/root", 0o755, 0, 0);
			vfs.writeFile("/root/.hidden", "");
			vfs.writeFile("/root/visible", "");
			const result = listPathCompletions(vfs, "", "/root/");
			expect(result).toContain("/root/visible");
			expect(result).not.toContain("/root/.hidden");
		});

		test("shows dot-files when prefix starts with dot", () => {
			const vfs = new VirtualFileSystem();
			vfs.mkdir("/root", 0o755, 0, 0);
			vfs.writeFile("/root/.hidden", "");
			vfs.writeFile("/root/visible", "");
			const result = listPathCompletions(vfs, "", "/root/.");
			expect(result).toContain("/root/.hidden");
		});

		test("appends slash to directory completions", () => {
			const vfs = new VirtualFileSystem();
			vfs.mkdir("/usr", 0o755, 0, 0);
			vfs.mkdir("/usr/bin", 0o755, 0, 0);
			const result = listPathCompletions(vfs, "/", "/usr/b");
			expect(result).toEqual(["/usr/bin/"]);
		});

		test("returns empty array on error", () => {
			const vfs = new VirtualFileSystem();
			const result = listPathCompletions(vfs, "/", "/nonexistent/");
			expect(result).toEqual([]);
		});
	});
});
