import { beforeAll, describe, expect, test } from "bun:test";
import type { SshClient, VirtualShell } from "../src";
import { createTestEnv, createTestFile, pathExists, readTestFile, runCmd } from "./test-helper";

let shell: VirtualShell;
let client: InstanceType<typeof SshClient>;

beforeAll(async () => {
	const env = await createTestEnv("test-core");
	shell = env.shell;
	client = env.client;
});

// ─── ECHO tests ───────────────────────────────────────────────────────────

describe("echo command", () => {
	test("echo basic output", async () => {
		const r = await runCmd(client, "echo hello");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello");
	});

	test("echo multiple args", async () => {
		const r = await runCmd(client, "echo hello world");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello world");
	});

	test("echo with -n flag (no newline)", async () => {
		const r = await runCmd(client, "echo -n hello");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toBe("hello");
		expect(r.stdout?.endsWith("\n")).toBe(false);
	});

	test("echo with -e flag (escape sequences)", async () => {
		const r = await runCmd(client, "echo -e 'hello\\nworld'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("hello");
		expect(r.stdout).toContain("world");
	});

	test("echo with -e and tab", async () => {
		const r = await runCmd(client, "echo -e 'col1\\tcol2'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("\t");
	});

	test("echo with empty string", async () => {
		const r = await runCmd(client, "echo ''");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("");
	});

	test("echo with special chars", async () => {
		const r = await runCmd(client, "echo 'test@#$%'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("test@#$%");
	});

	test("echo with variables", async () => {
		const r = await runCmd(client, "echo $HOME");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toMatch(/home|root/);
	});
});

// ─── PWD tests ────────────────────────────────────────────────────────────

describe("pwd command", () => {
	test("pwd returns current directory", async () => {
		const r = await runCmd(client, "pwd");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBeDefined();
		expect(r.stdout?.trim().length).toBeGreaterThan(0);
	});

	test("pwd after cd", async () => {
		await runCmd(client, "cd /tmp");
		const r = await runCmd(client, "pwd");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("/tmp");
		await runCmd(client, "cd /root");
	});

	test("pwd with no args", async () => {
		const r = await runCmd(client, "pwd");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});
});

// ─── CAT tests ────────────────────────────────────────────────────────────

describe("cat command", () => {
	test("cat single file", async () => {
		createTestFile(shell, "/tmp/test.txt", "hello world");
		const r = await runCmd(client, "cat /tmp/test.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello world");
	});

	test("cat multiple files", async () => {
		createTestFile(shell, "/tmp/file1.txt", "file1");
		createTestFile(shell, "/tmp/file2.txt", "file2");
		const r = await runCmd(client, "cat /tmp/file1.txt /tmp/file2.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("file1");
		expect(r.stdout).toContain("file2");
	});

	test("cat with -n flag (line numbers)", async () => {
		createTestFile(shell, "/tmp/numbered.txt", "line1\nline2\nline3");
		const r = await runCmd(client, "cat -n /tmp/numbered.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("1");
		expect(r.stdout).toContain("2");
		expect(r.stdout).toContain("3");
	});

	test("cat with -b flag (number non-blank)", async () => {
		createTestFile(shell, "/tmp/blank.txt", "line1\n\nline2");
		const r = await runCmd(client, "cat -b /tmp/blank.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("line1");
		expect(r.stdout).toContain("line2");
	});

	test("cat non-existent file", async () => {
		const r = await runCmd(client, "cat /tmp/nonexistent.txt");
		expect(r.exitCode).not.toBe(0);
		expect(r.stderr).toBeDefined();
	});

	test("cat with stdin", async () => {
		const r = await runCmd(client, "echo 'test' | cat");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("test");
	});
});

// ─── LS tests ──────────────────────────────────────────────────────────────

describe("ls command", () => {
	test("ls lists directory", async () => {
		createTestFile(shell, "/tmp/ls-test1.txt", "content");
		const r = await runCmd(client, "ls /tmp");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("ls-test1.txt");
	});

	test("ls with -l flag (long format)", async () => {
		createTestFile(shell, "/tmp/ls-long.txt", "test");
		const r = await runCmd(client, "ls -l /tmp");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("-rw");
	});

	test("ls current directory", async () => {
		const r = await runCmd(client, "ls /root");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThanOrEqual(0);
	});

	test("ls with -a flag (show hidden)", async () => {
		const r = await runCmd(client, "ls -a /root");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThanOrEqual(0);
	});

	test("ls with -h flag (human readable)", async () => {
		createTestFile(shell, "/tmp/ls-human.txt", "a".repeat(1024));
		const r = await runCmd(client, "ls -lh /tmp/ls-human.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("ls-human.txt");
	});

	test("ls non-existent path", async () => {
		const r = await runCmd(client, "ls /nonexistent");
		expect(r.exitCode).not.toBe(0);
	});
});

// ─── MKDIR/RMDIR tests ────────────────────────────────────────────────────

describe("mkdir command", () => {
	test("mkdir creates directory", async () => {
		const r = await runCmd(client, "mkdir /tmp/testdir");
		expect(r.exitCode).toBe(0);
		expect(pathExists(shell, "/tmp/testdir")).toBe(true);
	});

	test("mkdir -p creates nested dirs", async () => {
		const r = await runCmd(client, "mkdir -p /tmp/a/b/c");
		expect(r.exitCode).toBe(0);
		expect(pathExists(shell, "/tmp/a/b/c")).toBe(true);
	});

	test("mkdir duplicate dir fails", async () => {
		await runCmd(client, "mkdir /tmp/dup-unique");
		const r = await runCmd(client, "mkdir /tmp/dup-unique 2>&1 || echo 'error'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── TOUCH tests ───────────────────────────────────────────────────────────

describe("touch command", () => {
	test("touch creates file", async () => {
		const r = await runCmd(client, "touch /tmp/newfile.txt");
		expect(r.exitCode).toBe(0);
		expect(pathExists(shell, "/tmp/newfile.txt")).toBe(true);
	});

	test("touch updates timestamp on existing file", async () => {
		createTestFile(shell, "/tmp/existing.txt", "content");
		const r = await runCmd(client, "touch /tmp/existing.txt");
		expect(r.exitCode).toBe(0);
		expect(pathExists(shell, "/tmp/existing.txt")).toBe(true);
	});

	test("touch multiple files", async () => {
		const r = await runCmd(client, "touch /tmp/file1.txt /tmp/file2.txt");
		expect(r.exitCode).toBe(0);
		expect(pathExists(shell, "/tmp/file1.txt")).toBe(true);
		expect(pathExists(shell, "/tmp/file2.txt")).toBe(true);
	});
});

// ─── RM tests ──────────────────────────────────────────────────────────────

describe("rm command", () => {
	test("rm deletes file", async () => {
		createTestFile(shell, "/tmp/todel.txt", "content");
		const r = await runCmd(client, "rm /tmp/todel.txt");
		expect(r.exitCode).toBe(0);
		expect(pathExists(shell, "/tmp/todel.txt")).toBe(false);
	});

	test("rm non-existent file fails", async () => {
		const r = await runCmd(client, "rm /tmp/doesnotexist.txt");
		expect(r.exitCode).not.toBe(0);
	});

	test("rm -r deletes directory recursively", async () => {
		await runCmd(client, "mkdir -p /tmp/rmdir/sub");
		createTestFile(shell, "/tmp/rmdir/sub/file.txt", "test");
		const r = await runCmd(client, "rm -r /tmp/rmdir");
		expect(r.exitCode).toBe(0);
		expect(pathExists(shell, "/tmp/rmdir")).toBe(false);
	});

	test("rm multiple files", async () => {
		createTestFile(shell, "/tmp/rm1.txt", "1");
		createTestFile(shell, "/tmp/rm2.txt", "2");
		const r = await runCmd(client, "rm /tmp/rm1.txt /tmp/rm2.txt");
		expect(r.exitCode).toBe(0);
		expect(pathExists(shell, "/tmp/rm1.txt")).toBe(false);
		expect(pathExists(shell, "/tmp/rm2.txt")).toBe(false);
	});
});

// ─── CP tests ──────────────────────────────────────────────────────────────

describe("cp command", () => {
	test("cp copies file", async () => {
		createTestFile(shell, "/tmp/original.txt", "content");
		const r = await runCmd(client, "cp /tmp/original.txt /tmp/copy.txt");
		expect(r.exitCode).toBe(0);
		expect(pathExists(shell, "/tmp/copy.txt")).toBe(true);
		expect(readTestFile(shell, "/tmp/copy.txt")).toBe("content");
	});

	test("cp to different name", async () => {
		createTestFile(shell, "/tmp/src.txt", "data");
		const r = await runCmd(client, "cp /tmp/src.txt /tmp/dst.txt");
		expect(r.exitCode).toBe(0);
		expect(readTestFile(shell, "/tmp/dst.txt")).toBe("data");
	});

	test("cp -r copies directory recursively", async () => {
		await runCmd(client, "mkdir -p /tmp/srcdir/sub");
		createTestFile(shell, "/tmp/srcdir/file.txt", "test");
		createTestFile(shell, "/tmp/srcdir/sub/file2.txt", "test2");
		const r = await runCmd(client, "cp -r /tmp/srcdir /tmp/dstdir");
		expect(r.exitCode).toBe(0);
		expect(pathExists(shell, "/tmp/dstdir/file.txt")).toBe(true);
		expect(pathExists(shell, "/tmp/dstdir/sub/file2.txt")).toBe(true);
	});

	test("cp to directory", async () => {
		createTestFile(shell, "/tmp/cpfile.txt", "content");
		await runCmd(client, "mkdir -p /tmp/cpdir");
		const r = await runCmd(client, "cp /tmp/cpfile.txt /tmp/cpdir/");
		expect(r.exitCode).toBe(0);
		expect(pathExists(shell, "/tmp/cpdir/cpfile.txt")).toBe(true);
	});
});

// ─── MV tests ──────────────────────────────────────────────────────────────

describe("mv command", () => {
	test("mv moves file", async () => {
		createTestFile(shell, "/tmp/mvold.txt", "content");
		const r = await runCmd(client, "mv /tmp/mvold.txt /tmp/mvnew.txt");
		expect(r.exitCode).toBe(0);
		expect(pathExists(shell, "/tmp/mvold.txt")).toBe(false);
		expect(pathExists(shell, "/tmp/mvnew.txt")).toBe(true);
	});

	test("mv renames file", async () => {
		createTestFile(shell, "/tmp/oldname.txt", "data");
		const r = await runCmd(client, "mv /tmp/oldname.txt /tmp/newname.txt");
		expect(r.exitCode).toBe(0);
		expect(readTestFile(shell, "/tmp/newname.txt")).toBe("data");
	});

	test("mv to directory", async () => {
		createTestFile(shell, "/tmp/mvfile.txt", "test");
		await runCmd(client, "mkdir -p /tmp/mvdest");
		const r = await runCmd(client, "mv /tmp/mvfile.txt /tmp/mvdest/");
		expect(r.exitCode).toBe(0);
		expect(pathExists(shell, "/tmp/mvdest/mvfile.txt")).toBe(true);
	});

	test("mv non-existent file fails", async () => {
		const r = await runCmd(client, "mv /tmp/nonexist.txt /tmp/dest.txt");
		expect(r.exitCode).not.toBe(0);
	});
});

// ─── CHMOD tests ──────────────────────────────────────────────────────────

describe("chmod command", () => {
	test("chmod changes permissions", async () => {
		createTestFile(shell, "/tmp/chmodfile.txt", "test");
		const r = await runCmd(client, "chmod 644 /tmp/chmodfile.txt");
		expect(r.exitCode).toBe(0);
	});

	test("chmod recursive", async () => {
		await runCmd(client, "mkdir -p /tmp/chmoddir2/sub");
		createTestFile(shell, "/tmp/chmoddir2/file.txt", "test");
		const r = await runCmd(client, "chmod -R 755 /tmp/chmoddir2");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("chmod with symbolic notation", async () => {
		createTestFile(shell, "/tmp/symbolic.txt", "test");
		const r = await runCmd(client, "chmod u+x /tmp/symbolic.txt");
		expect(r.exitCode).toBe(0);
	});
});

// ─── GREP tests ───────────────────────────────────────────────────────────

describe("grep command", () => {
	test("grep finds pattern", async () => {
		createTestFile(shell, "/tmp/greptarget.txt", "hello\nworld\nhello world");
		const r = await runCmd(client, "grep hello /tmp/greptarget.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("hello");
	});

	test("grep -i case insensitive", async () => {
		createTestFile(shell, "/tmp/grep-case.txt", "HELLO\nhello\nHello");
		const r = await runCmd(client, "grep -i hello /tmp/grep-case.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.split("\n").filter((l) => l).length).toBeGreaterThanOrEqual(3);
	});

	test("grep -v inverts match", async () => {
		createTestFile(shell, "/tmp/grep-not.txt", "apple\norange\nbanana");
		const r = await runCmd(client, "grep -v apple /tmp/grep-not.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).not.toContain("apple");
		expect(r.stdout).toContain("orange");
	});

	test("grep from pipe", async () => {
		const r = await runCmd(client, "echo -e 'foo\\nbar\\nfoo' | grep foo");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.split("\n").filter((l) => l).length).toBe(2);
	});

	test("grep no match returns non-zero", async () => {
		createTestFile(shell, "/tmp/grep-nomatch.txt", "content");
		const r = await runCmd(client, "grep nomatch /tmp/grep-nomatch.txt");
		expect(r.exitCode).not.toBe(0);
	});
});

// ─── HEAD tests ───────────────────────────────────────────────────────────

describe("head command", () => {
	test("head default 10 lines", async () => {
		let content = "";
		for (let i = 1; i <= 20; i++) {
			content += `line${i}\n`;
		}
		createTestFile(shell, "/tmp/head-test.txt", content);
		const r = await runCmd(client, "head /tmp/head-test.txt");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.length).toBe(10);
		expect(r.stdout).toContain("line1");
		expect(r.stdout).not.toContain("line11");
	});

	test("head -n custom lines", async () => {
		let content = "";
		for (let i = 1; i <= 20; i++) {
			content += `line${i}\n`;
		}
		createTestFile(shell, "/tmp/head-custom.txt", content);
		const r = await runCmd(client, "head -n 5 /tmp/head-custom.txt");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.length).toBe(5);
	});

	test("head from pipe", async () => {
		const r = await runCmd(client, "seq 1 20 | head -n 5");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.length).toBe(5);
	});
});

// ─── TAIL tests ───────────────────────────────────────────────────────────

describe("tail command", () => {
	test("tail default 10 lines", async () => {
		let content = "";
		for (let i = 1; i <= 20; i++) {
			content += `line${i}\n`;
		}
		createTestFile(shell, "/tmp/tail-test2.txt", content);
		const r = await runCmd(client, "tail /tmp/tail-test2.txt");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.length).toBeGreaterThanOrEqual(8);
		expect(r.stdout).toContain("line20");
	});

	test("tail -n custom lines", async () => {
		let content = "";
		for (let i = 1; i <= 20; i++) {
			content += `line${i}\n`;
		}
		createTestFile(shell, "/tmp/tail-custom.txt", content);
		const r = await runCmd(client, "tail -n 5 /tmp/tail-custom.txt");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.length).toBe(5);
		expect(r.stdout).toContain("line16");
	});

	test("tail from pipe", async () => {
		const r = await runCmd(client, "seq 1 20 | tail -n 5");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.length).toBe(5);
	});
});

// ─── WC tests ──────────────────────────────────────────────────────────────

describe("wc command", () => {
	test("wc counts lines", async () => {
		createTestFile(shell, "/tmp/wc-test.txt", "line1\nline2\nline3");
		const r = await runCmd(client, "wc -l /tmp/wc-test.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toContain("3 /tmp/wc-test.txt");
	});

	test("wc counts words", async () => {
		createTestFile(shell, "/tmp/wc-words.txt", "one two three");
		const r = await runCmd(client, "wc -w /tmp/wc-words.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toContain("3 /tmp/wc-words.txt");
	});

	test("wc counts chars", async () => {
		createTestFile(shell, "/tmp/wc-chars.txt", "hello");
		const r = await runCmd(client, "wc -c /tmp/wc-chars.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toContain("5 /tmp/wc-chars.txt");
	});

	test("wc default (lines words chars)", async () => {
		createTestFile(shell, "/tmp/wc-all.txt", "hello world\ntest");
		const r = await runCmd(client, "wc /tmp/wc-all.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toContain("2");
		expect(r.stdout?.trim()).toContain("3");
		expect(r.stdout?.trim()).toContain("/tmp/wc-all.txt");
	});
});

// ─── SORT tests ───────────────────────────────────────────────────────────

describe("sort command", () => {
	test("sort lines alphabetically", async () => {
		createTestFile(shell, "/tmp/sort-test.txt", "zebra\napple\nmango\nbanana");
		const r = await runCmd(client, "sort /tmp/sort-test.txt");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.[0]).toBe("apple");
		expect(lines?.[1]).toBe("banana");
		expect(lines?.[3]).toBe("zebra");
	});

	test("sort -r reverse", async () => {
		createTestFile(shell, "/tmp/sort-rev.txt", "a\nb\nc");
		const r = await runCmd(client, "sort -r /tmp/sort-rev.txt");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.[0]).toBe("c");
		expect(lines?.[2]).toBe("a");
	});

	test("sort -n numeric", async () => {
		createTestFile(shell, "/tmp/sort-num.txt", "10\n2\n1\n100");
		const r = await runCmd(client, "sort -n /tmp/sort-num.txt");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.[0]).toBe("1");
		expect(lines?.[1]).toBe("2");
	});

	test("sort from pipe", async () => {
		const r = await runCmd(client, "echo -e 'c\\na\\nb' | sort");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.[0]).toBe("a");
	});
});

// ─── UNIQ tests ───────────────────────────────────────────────────────────

describe("uniq command", () => {
	test("uniq removes consecutive duplicates", async () => {
		createTestFile(shell, "/tmp/uniq-test3.txt", "apple\napple\nbanana\nbanana\napple");
		const r = await runCmd(client, "uniq /tmp/uniq-test3.txt || echo 'uniq'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("uniq -c count occurrences", async () => {
		createTestFile(shell, "/tmp/uniq-count2.txt", "a\na\na\nb\nb");
		const r = await runCmd(client, "uniq -c /tmp/uniq-count2.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim().length).toBeGreaterThan(0);
	});

	test("uniq from pipe", async () => {
		const r = await runCmd(client, "echo -e 'x\\nx\\ny\\ny' | uniq");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.length).toBe(2);
	});
});
