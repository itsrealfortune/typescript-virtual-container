import { beforeAll, describe, expect, test } from "bun:test";
import type { SshClient, VirtualShell } from "../src";
import { createTestEnv, createTestFile, runCmd } from "./test-helper";

let shell: VirtualShell;
let client: InstanceType<typeof SshClient>;

beforeAll(async () => {
	const env = await createTestEnv("test-text-extra");
	shell = env.shell;
	client = env.client;

	createTestFile(shell, "/tmp/names.txt", "alice\nbob\ncharlie\n");
	createTestFile(shell, "/tmp/cols.txt", "a\tb\tc\nd\te\tf\n");
	createTestFile(shell, "/tmp/lines.txt", "one\ntwo\nthree\nfour\nfive\n");
});

// ─── TAC tests ──────────────────────────────────────────────────────────────

describe("tac command", () => {
	test("tac reverses file lines", async () => {
		const r = await runCmd(client, "tac /tmp/names.txt");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.trim().split("\n") ?? [];
		expect(lines[0]).toBe("charlie");
		expect(lines[lines.length - 1]).toBe("alice");
	});

	test("tac from stdin", async () => {
		const r = await runCmd(client, "echo -e '1\n2\n3' | tac");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("3\n2\n1");
	});
});

// ─── NL tests ───────────────────────────────────────────────────────────────

describe("nl command", () => {
	test("nl numbers lines", async () => {
		const r = await runCmd(client, "nl /tmp/names.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("1");
		expect(r.stdout).toContain("alice");
	});

	test("nl from stdin", async () => {
		const r = await runCmd(client, "echo 'hello' | nl");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("hello");
	});
});

// ─── PASTE tests ────────────────────────────────────────────────────────────

describe("paste command", () => {
	test("paste merges files", async () => {
		const r = await runCmd(client, "paste /tmp/names.txt /tmp/names.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("alice\talice");
	});
});

// ─── COLUMN tests ───────────────────────────────────────────────────────────

describe("column command", () => {
	test("column formats table", async () => {
		const r = await runCmd(client, "column -t /tmp/cols.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("a");
		expect(r.stdout).toContain("b");
	});

	test("column -s custom delimiter", async () => {
		const r = await runCmd(client, "echo 'a:b:c' | column -s: -t");
		expect(r.exitCode).toBe(0);
	});
});

// ─── SHUF tests ─────────────────────────────────────────────────────────────

describe("shuf command", () => {
	test("shuf shuffles lines", async () => {
		const r = await runCmd(client, "shuf /tmp/names.txt");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.trim().split("\n") ?? [];
		expect(lines.length).toBe(3);
	});

	test("shuf with file", async () => {
		const r = await runCmd(client, "shuf /tmp/names.txt");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.trim().split("\n") ?? [];
		expect(lines.length).toBe(3);
	});

	test("shuf -i range mode", async () => {
		const r = await runCmd(client, "shuf -i 1-10 -n 3");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.trim().split("\n") ?? [];
		expect(lines.length).toBe(3);
	});
});

// ─── FOLD tests ─────────────────────────────────────────────────────────────

describe("fold command", () => {
	test("fold wraps lines", async () => {
		createTestFile(shell, "/tmp/foldtest.txt", "abcdefghij");
		const r = await runCmd(client, "fold -w 5 /tmp/foldtest.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("abcde\nfghij");
	});

	test("fold from stdin", async () => {
		const r = await runCmd(client, "echo 'hello' | fold -w 2");
		expect(r.exitCode).toBe(0);
	});
});

// ─── EXPAND tests ───────────────────────────────────────────────────────────

describe("expand command", () => {
	test("expand converts tabs to spaces", async () => {
		createTestFile(shell, "/tmp/tabtest.txt", "a\tb");
		const r = await runCmd(client, "expand /tmp/tabtest.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain(" ");
	});

	test("expand from stdin", async () => {
		const r = await runCmd(client, "echo -e 'a\tb' | expand");
		expect(r.exitCode).toBe(0);
	});
});

// ─── FMT tests ──────────────────────────────────────────────────────────────

describe("fmt command", () => {
	test("fmt formats text", async () => {
		createTestFile(
			shell,
			"/tmp/fmttest.txt",
			"hello world this is a long line"
		);
		const r = await runCmd(client, "fmt -w 10 /tmp/fmttest.txt");
		expect(r.exitCode).toBe(0);
	});

	test("fmt from stdin", async () => {
		const r = await runCmd(client, "echo 'hello world' | fmt");
		expect(r.exitCode).toBe(0);
	});
});

// ─── STRINGS tests ──────────────────────────────────────────────────────────

describe("strings command", () => {
	test("strings extracts printable strings", async () => {
		const buf = Buffer.concat([
			Buffer.from("hello\x00world\x00"),
			Buffer.from([0x00, 0x01, 0x02]),
			Buffer.from("printable"),
		]);
		shell.vfs.writeFile("/tmp/strings_test.bin", buf);
		const r = await runCmd(client, "strings /tmp/strings_test.bin");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("hello");
		expect(r.stdout).toContain("world");
		expect(r.stdout).toContain("printable");
	});

	test("strings missing operand", async () => {
		const r = await runCmd(client, "strings");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("missing file operand");
	});
});
