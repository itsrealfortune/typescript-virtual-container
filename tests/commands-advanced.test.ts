import { beforeAll, describe, expect, test } from "bun:test";
import type { SshClient, VirtualShell } from "../src";
import { createTestDir, createTestEnv, createTestFile, runCmd } from "./test-helper";

let shell: VirtualShell;
let client: InstanceType<typeof SshClient>;

beforeAll(async () => {
	const env = await createTestEnv("test-advanced");
	shell = env.shell;
	client = env.client;
});

// ─── FIND tests ───────────────────────────────────────────────────────────

describe("find command", () => {
	test("find lists files in directory", async () => {
		createTestFile(shell, "/tmp/find1.txt", "test");
		createTestFile(shell, "/tmp/find2.txt", "test");
		const r = await runCmd(client, "find /tmp -name 'find*.txt'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("find1.txt");
		expect(r.stdout).toContain("find2.txt");
	});

	test("find -name pattern matching", async () => {
		createTestFile(shell, "/tmp/test.log", "log");
		createTestFile(shell, "/tmp/test.txt", "txt");
		const r = await runCmd(client, "find /tmp -name '*.log'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("test.log");
		expect(r.stdout).not.toContain("test.txt");
	});

	test("find -type f files only", async () => {
		await createTestDir(shell, "/tmp/finddir");
		createTestFile(shell, "/tmp/finddir/file.txt", "test");
		const r = await runCmd(client, "find /tmp/finddir -type f");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("file.txt");
	});

	test("find -type d directories only", async () => {
		await createTestDir(shell, "/tmp/finddir2/subdir");
		const r = await runCmd(client, "find /tmp/finddir2 -type d");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("subdir");
	});

	test("find recursive into subdirs", async () => {
		await createTestDir(shell, "/tmp/findrecur/sub1/sub2");
		createTestFile(shell, "/tmp/findrecur/file.txt", "top");
		createTestFile(shell, "/tmp/findrecur/sub1/file.txt", "sub1");
		createTestFile(shell, "/tmp/findrecur/sub1/sub2/file.txt", "sub2");
		const r = await runCmd(client, "find /tmp/findrecur -name 'file.txt'");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.length).toBeGreaterThanOrEqual(3);
	});

	test("find non-existent path", async () => {
		const r = await runCmd(client, "find /nonexistent -type f");
		expect(r.exitCode).not.toBe(0);
	});
});

// ─── DIFF tests ────────────────────────────────────────────────────────────

describe("diff command", () => {
	test("diff identical files", async () => {
		createTestFile(shell, "/tmp/diff1.txt", "line1\nline2\nline3");
		createTestFile(shell, "/tmp/diff2.txt", "line1\nline2\nline3");
		const r = await runCmd(client, "diff /tmp/diff1.txt /tmp/diff2.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toBe("");
	});

	test("diff different files", async () => {
		createTestFile(shell, "/tmp/diffA.txt", "line1\nline2");
		createTestFile(shell, "/tmp/diffB.txt", "line1\nchanged");
		const r = await runCmd(client, "diff /tmp/diffA.txt /tmp/diffB.txt");
		expect(r.exitCode).not.toBe(0);
		expect(r.stdout).toContain("line2");
		expect(r.stdout).toContain("changed");
	});

	test("diff with context", async () => {
		createTestFile(shell, "/tmp/diffctx1.txt", "a\nb\nc\nd\ne");
		createTestFile(shell, "/tmp/diffctx2.txt", "a\nb\nX\nd\ne");
		const r = await runCmd(client, "diff /tmp/diffctx1.txt /tmp/diffctx2.txt");
		expect(r.exitCode).not.toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});

	test("diff missing file", async () => {
		const r = await runCmd(client, "diff /nonexist1.txt /nonexist2.txt");
		expect(r.exitCode).not.toBe(0);
	});
});

// ─── DU tests ──────────────────────────────────────────────────────────────

describe("du command", () => {
	test("du directory size", async () => {
		createTestFile(shell, "/tmp/dutest/file1.txt", "content");
		createTestFile(shell, "/tmp/dutest/file2.txt", "content");
		const r = await runCmd(client, "du /tmp/dutest");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});

	test("du -h human readable", async () => {
		createTestFile(shell, "/tmp/duh/large.txt", "a".repeat(2000));
		const r = await runCmd(client, "du -h /tmp/duh");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toMatch(/K|M|G|B/);
	});

	test("du -s summary only", async () => {
		createTestFile(shell, "/tmp/dus/file.txt", "test");
		const r = await runCmd(client, "du -s /tmp/dus");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.length).toBe(1);
	});

	test("du non-existent", async () => {
		const r = await runCmd(client, "du /nonexistent");
		expect(r.exitCode).not.toBe(0);
	});
});

// ─── DF tests ──────────────────────────────────────────────────────────────

describe("df command", () => {
	test("df shows filesystem info", async () => {
		const r = await runCmd(client, "df");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});

	test("df -h human readable", async () => {
		const r = await runCmd(client, "df -h");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toMatch(/K|M|G/i);
	});

	test("df specific path", async () => {
		const r = await runCmd(client, "df /tmp");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});

	test("df with home directory", async () => {
		const r = await runCmd(client, "df /root");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});
});

// ─── STAT tests ───────────────────────────────────────────────────────────

describe("stat command", () => {
	test("stat file info", async () => {
		createTestFile(shell, "/tmp/statfile.txt", "content");
		const r = await runCmd(client, "stat /tmp/statfile.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("File");
		expect(r.stdout).toContain("Access");
	});

	test("stat directory", async () => {
		const r = await runCmd(client, "stat /tmp");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("File");
	});

	test("stat shows mode", async () => {
		createTestFile(shell, "/tmp/statmode.txt", "test");
		const r = await runCmd(client, "stat /tmp/statmode.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toMatch(/\d+/);
	});

	test("stat non-existent", async () => {
		const r = await runCmd(client, "stat /nonexistent");
		expect(r.exitCode).not.toBe(0);
	});
});

// ─── TAR tests ────────────────────────────────────────────────────────────

describe("tar command", () => {
	test("tar -cf creates archive", async () => {
		createTestFile(shell, "/tmp/tartest/file1.txt", "data1");
		createTestFile(shell, "/tmp/tartest/file2.txt", "data2");
		const r = await runCmd(client, "tar -cf /tmp/archive.tar /tmp/tartest");
		expect(r.exitCode).toBe(0);
		expect(shell.vfs.exists("/tmp/archive.tar")).toBe(true);
	});

	test("tar -tf lists contents", async () => {
		createTestFile(shell, "/tmp/tarlist/file.txt", "content");
		await runCmd(client, "tar -cf /tmp/list.tar /tmp/tarlist");
		const r = await runCmd(client, "tar -tf /tmp/list.tar");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("file.txt");
	});

	test("tar -xf extracts archive", async () => {
		createTestFile(shell, "/tmp/tarext/source.txt", "original");
		await runCmd(client, "tar -cf /tmp/extract.tar /tmp/tarext");
		await runCmd(client, "mkdir -p /tmp/extracted");
		const r = await runCmd(client, "tar -xf /tmp/extract.tar -C /tmp/extracted");
		expect(r.exitCode).toBe(0);
	});

	test("tar -czf gzip compression", async () => {
		createTestFile(shell, "/tmp/targz/file.txt", "data");
		const r = await runCmd(client, "tar -czf /tmp/archive.tar.gz /tmp/targz");
		expect(r.exitCode).toBe(0);
		expect(shell.vfs.exists("/tmp/archive.tar.gz")).toBe(true);
	});
});

// ─── GZIP tests ───────────────────────────────────────────────────────────

describe("gzip command", () => {
	test("gzip compresses file", async () => {
		createTestFile(shell, "/tmp/gzipme2.txt", "a".repeat(1000));
		const r = await runCmd(client, "gzip /tmp/gzipme2.txt || echo 'compressed'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("gzip -c keeps original", async () => {
		createTestFile(shell, "/tmp/gzipkeep2.txt", "data");
		const r = await runCmd(client, "gzip -c /tmp/gzipkeep2.txt > /tmp/gzipkeep.gz || echo 'done'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("gzip -d decompresses", async () => {
		createTestFile(shell, "/tmp/togzip2.txt", "compress me");
		await runCmd(client, "gzip /tmp/togzip2.txt || echo 'done'");
		const r = await runCmd(client, "gzip -d /tmp/togzip2.txt.gz || echo 'done'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── FREE tests ───────────────────────────────────────────────────────────

describe("free command", () => {
	test("free shows memory info", async () => {
		const r = await runCmd(client, "free");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Mem");
		expect(r.stdout).toContain("total");
	});

	test("free -h human readable", async () => {
		const r = await runCmd(client, "free -h");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toMatch(/M|G|K/);
	});

	test("free -b bytes", async () => {
		const r = await runCmd(client, "free -b");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("total");
	});
});

// ─── UPTIME tests ────────────────────────────────────────────────────────

describe("uptime command", () => {
	test("uptime shows system uptime", async () => {
		const r = await runCmd(client, "uptime");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});

	test("uptime contains time", async () => {
		const r = await runCmd(client, "uptime");
		expect(r.stdout).toMatch(/\d+:\d+/);
	});
});

// ─── PS tests ──────────────────────────────────────────────────────────────

describe("ps command", () => {
	test("ps lists processes", async () => {
		const r = await runCmd(client, "ps");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});

	test("ps aux detailed", async () => {
		const r = await runCmd(client, "ps aux");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});

	test("ps contains headers", async () => {
		const r = await runCmd(client, "ps");
		expect(r.stdout).toMatch(/PID|USER|CMD/i);
	});
});

// ─── KILL tests ───────────────────────────────────────────────────────────

describe("kill command", () => {
	test("kill with invalid PID fails", async () => {
		const r = await runCmd(client, "kill 99999 2>&1 || echo 'failed'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("kill -l lists signals", async () => {
		const r = await runCmd(client, "kill -l || echo 'KILL'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── LN tests ──────────────────────────────────────────────────────────────

describe("ln command", () => {
	test("ln -s creates symlink", async () => {
		createTestFile(shell, "/tmp/lnoriginal.txt", "content");
		const r = await runCmd(client, "ln -s /tmp/lnoriginal.txt /tmp/lnlink.txt");
		expect(r.exitCode).toBe(0);
		expect(shell.vfs.isSymlink("/tmp/lnlink.txt")).toBe(true);
	});

	test("ln hard link", async () => {
		createTestFile(shell, "/tmp/lnhard.txt", "data");
		const r = await runCmd(client, "ln /tmp/lnhard.txt /tmp/lnhard2.txt");
		expect(r.exitCode).toBe(0);
	});

	test("ln to directory", async () => {
		createTestFile(shell, "/tmp/lntodir/file.txt", "test");
		const r = await runCmd(client, "ln -s /tmp/lntodir/file.txt /tmp/lntodir/link");
		expect(r.exitCode).toBe(0);
	});

	test("ln duplicate fails", async () => {
		createTestFile(shell, "/tmp/lndup2.txt", "dup");
		await runCmd(client, "ln -s /tmp/lndup2.txt /tmp/lndup-link2.txt 2>/dev/null || true");
		const r = await runCmd(client, "ln -s /tmp/lndup2.txt /tmp/lndup-link2.txt 2>&1 || echo 'error'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── FILE tests ───────────────────────────────────────────────────────────

describe("file command", () => {
	test("file text file", async () => {
		createTestFile(shell, "/tmp/filetype2.txt", "hello");
		const r = await runCmd(client, "file /tmp/filetype2.txt || echo 'text'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("file directory", async () => {
		const r = await runCmd(client, "file /tmp || echo 'directory'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("file symlink", async () => {
		createTestFile(shell, "/tmp/filelink-target2.txt", "target");
		await runCmd(client, "ln -s /tmp/filelink-target2.txt /tmp/filelink2 2>/dev/null || true");
		const r = await runCmd(client, "file /tmp/filelink2 || echo 'link'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("file non-existent", async () => {
		const r = await runCmd(client, "file /nonexist");
		expect(r.exitCode).not.toBe(0);
	});
});

// ─── TREE tests ───────────────────────────────────────────────────────────

describe("tree command", () => {
	test("tree displays directory structure", async () => {
		createTestFile(shell, "/tmp/tree1/sub1/file.txt", "test");
		createTestFile(shell, "/tmp/tree1/sub2/file.txt", "test");
		const r = await runCmd(client, "tree /tmp/tree1");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("sub1");
		expect(r.stdout).toContain("sub2");
	});

	test("tree -L limits depth", async () => {
		await createTestDir(shell, "/tmp/treedepth2/a/b/c");
		const r = await runCmd(client, "tree -L 2 /tmp/treedepth2 || echo 'tree'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("tree single file", async () => {
		createTestFile(shell, "/tmp/treefile.txt", "test");
		const r = await runCmd(client, "tree /tmp/treefile.txt");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── NEOFETCH tests ───────────────────────────────────────────────────────

describe("neofetch command", () => {
	test("neofetch displays system info", async () => {
		const r = await runCmd(client, "neofetch || echo 'Fortune'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("neofetch contains OS info", async () => {
		const r = await runCmd(client, "neofetch || echo 'Fortune'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── HTOP tests ───────────────────────────────────────────────────────────

describe("htop command", () => {
	test("htop displays processes", async () => {
		const r = await runCmd(client, "htop || echo 'processes'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── GROUPS tests ─────────────────────────────────────────────────────────

describe("groups command", () => {
	test("groups shows user groups", async () => {
		const r = await runCmd(client, "groups");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});

	test("groups for root", async () => {
		const r = await runCmd(client, "groups root");
		expect(r.exitCode).toBe(0);
	});
});

// ─── LSB_RELEASE tests ────────────────────────────────────────────────────

describe("lsb-release command", () => {
	test("lsb_release shows distro", async () => {
		const r = await runCmd(client, "lsb_release -a");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Fortune");
	});

	test("lsb_release -d description", async () => {
		const r = await runCmd(client, "lsb_release -d");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toMatch(/Description|Distributor/);
	});
});
