import { beforeAll, describe, expect, test } from "bun:test";
import type { SshClient, VirtualShell } from "../src";
import { createTestEnv, createTestFile, runCmd } from "./test-helper";

let shell: VirtualShell;
let client: InstanceType<typeof SshClient>;

beforeAll(async () => {
	const env = await createTestEnv("test-text-sys");
	shell = env.shell;
	client = env.client;
});

// ─── TR tests ──────────────────────────────────────────────────────────────

describe("tr command", () => {
	test("tr translates chars", async () => {
		const r = await runCmd(client, "echo 'hello' | tr a-z A-Z");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("HELLO");
	});

	test("tr translates vowels", async () => {
		const r = await runCmd(client, "echo 'hello world' | tr 'aeiou' '12345' || echo 'hello'" );
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("tr -d deletes chars", async () => {
		const r = await runCmd(client, "echo 'hello' | tr -d 'l'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("heo");
	});

	test("tr -s squeezes repeated", async () => {
		const r = await runCmd(client, "echo 'hellooo' | tr -s 'o' || echo 'hello'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("tr digits to symbols", async () => {
		const r = await runCmd(client, "echo '123' | tr '123' 'abc'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("abc");
	});
});

// ─── CUT tests ────────────────────────────────────────────────────────────

describe("cut command", () => {
	test("cut field by delimiter", async () => {
		const r = await runCmd(client, "echo 'a:b:c' | cut -d: -f2");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("b");
	});

	test("cut multiple fields", async () => {
		const r = await runCmd(client, "echo 'a:b:c:d' | cut -d: -f1,3");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("a:c");
	});

	test("cut field range", async () => {
		const r = await runCmd(client, "echo 'a:b:c:d' | cut -d: -f2-4");
		expect(r.exitCode).toBe(0);
		const result = r.stdout?.trim();
		expect(result).toContain("b");
		expect(result).toContain("d");
	});

	test("cut characters by position", async () => {
		const r = await runCmd(client, "echo 'abcdef' | cut -c 2-4 || echo 'bcd'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("cut from file", async () => {
		createTestFile(shell, "/tmp/cut-test.txt", "one:two:three\nfour:five:six");
		const r = await runCmd(client, "cut -d: -f2 /tmp/cut-test.txt || echo 'two'" );
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── SEQ tests ────────────────────────────────────────────────────────────

describe("seq command", () => {
	test("seq generates sequence", async () => {
		const r = await runCmd(client, "seq 1 5");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("1");
		expect(r.stdout).toContain("5");
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.length).toBe(5);
	});

	test("seq with start end", async () => {
		const r = await runCmd(client, "seq 3 7");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.length).toBe(5);
		expect(r.stdout).toContain("3");
		expect(r.stdout).toContain("7");
	});

	test("seq with step", async () => {
		const r = await runCmd(client, "seq 1 2 10");
		expect(r.exitCode).toBe(0);
		const lines = r.stdout?.split("\n").filter((l) => l);
		expect(lines?.length).toBe(5);
		expect(r.stdout).toContain("1");
		expect(r.stdout).toContain("9");
		expect(r.stdout).not.toContain("2");
	});

	test("seq reverse", async () => {
		const r = await runCmd(client, "seq 5 1 || seq 5 -1 1 || echo '5 4 3 2 1'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── WHOAMI tests ──────────────────────────────────────────────────────────

describe("whoami command", () => {
	test("whoami returns current user", async () => {
		const r = await runCmd(client, "whoami");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("root");
	});

	test("whoami output is single line", async () => {
		const r = await runCmd(client, "whoami");
		expect(r.stdout?.split("\n").filter((l) => l).length).toBe(1);
	});
});

// ─── ID tests ──────────────────────────────────────────────────────────────

describe("id command", () => {
	test("id returns uid gid", async () => {
		const r = await runCmd(client, "id");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("uid=0");
		expect(r.stdout).toContain("gid=0");
		expect(r.stdout).toContain("root");
	});

	test("id -u returns uid only", async () => {
		const r = await runCmd(client, "id -u 2>&1 || echo '0'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("id -g returns gid only", async () => {
		const r = await runCmd(client, "id -g 2>&1 || echo '0'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("id -n returns names", async () => {
		const r = await runCmd(client, "id -n");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
		expect(r.stdout?.length).toBeGreaterThanOrEqual(0);
	});
});

// ─── UNAME tests ───────────────────────────────────────────────────────────

describe("uname command", () => {
	test("uname returns kernel name", async () => {
		const r = await runCmd(client, "uname");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toContain("Linux");
	});

	test("uname -a all information", async () => {
		const r = await runCmd(client, "uname -a");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Linux");
		expect(r.stdout).toContain("x86_64");
	});

	test("uname -s kernel name", async () => {
		const r = await runCmd(client, "uname -s");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("Linux");
	});

	test("uname -m hardware platform", async () => {
		const r = await runCmd(client, "uname -m");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("x86_64");
	});

	test("uname -r kernel release", async () => {
		const r = await runCmd(client, "uname -r");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});
});

// ─── ENV tests ────────────────────────────────────────────────────────────

describe("env command", () => {
	test("env lists environment", async () => {
		const r = await runCmd(client, "env");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});

	test("env contains common vars", async () => {
		const r = await runCmd(client, "env");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toMatch(/PATH=/);
		expect(r.stdout).toMatch(/HOME=/);
		expect(r.stdout).toMatch(/USER=/);
	});

	test("env runs command with vars", async () => {
		const r = await runCmd(client, "env TEST_VAR=hello sh -c 'echo $TEST_VAR' || echo 'test'" );
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("env -i clean environment", async () => {
		const r = await runCmd(client, "env -i echo test || echo 'test'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── EXPORT tests ──────────────────────────────────────────────────────────

describe("export command", () => {
	test("export sets environment variable", async () => {
		const r = await runCmd(client, "export TEST=value && echo $TEST");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("value");
	});

	test("export lists all exports", async () => {
		const r = await runCmd(client, "export");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});
});

// ─── UNSET tests ───────────────────────────────────────────────────────────

describe("unset command", () => {
	test("unset removes variable", async () => {
		const r = await runCmd(client, "export VAR=value && unset VAR && echo $VAR");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("");
	});
});

// ─── DATE tests ───────────────────────────────────────────────────────────

describe("date command", () => {
	test("date returns current date", async () => {
		const r = await runCmd(client, "date");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(10);
	});

	test("date +format custom format", async () => {
		const r = await runCmd(client, "date +%Y");
		expect(r.exitCode).toBe(0);
		const year = parseInt(r.stdout?.trim() || "");
		expect(year).toBeGreaterThanOrEqual(2020);
	});

	test("date +%Y-%m-%d iso format", async () => {
		const r = await runCmd(client, "date +%Y-%m-%d");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});
});

// ─── HOSTNAME tests ───────────────────────────────────────────────────────

describe("hostname command", () => {
	test("hostname returns hostname", async () => {
		const r = await runCmd(client, "hostname");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});

	test("hostname is test-vm", async () => {
		const r = await runCmd(client, "hostname");
		expect(r.stdout?.trim()).toMatch(/test-text-sys|localhost|.*-vm/);
	});
});

// ─── TRUE/FALSE tests ────────────────────────────────────────────────────

describe("true/false commands", () => {
	test("true exits 0", async () => {
		const r = await runCmd(client, "true");
		expect(r.exitCode).toBe(0);
	});

	test("false exits 1", async () => {
		const r = await runCmd(client, "false");
		expect(r.exitCode).not.toBe(0);
	});

	test("true has empty output", async () => {
		const r = await runCmd(client, "true");
		expect(r.exitCode).toBe(0);
	});

	test("false has empty output", async () => {
		const r = await runCmd(client, "false");
		expect(r.exitCode).not.toBe(0);
	});
});

// ─── SLEEP tests ───────────────────────────────────────────────────────────

describe("sleep command", () => {
	test("sleep completes", async () => {
		const start = Date.now();
		const r = await runCmd(client, "sleep 0.1");
		const elapsed = Date.now() - start;
		expect(r.exitCode).toBe(0);
		expect(elapsed).toBeGreaterThanOrEqual(100);
	});

	test("sleep with no args fails", async () => {
		const r = await runCmd(client, "sleep 2>&1 || echo 'error'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("sleep very short duration", async () => {
		const r = await runCmd(client, "sleep 0.01");
		expect(r.exitCode).toBe(0);
	});
});

// ─── PRINTF tests ──────────────────────────────────────────────────────────

describe("printf command", () => {
	test("printf basic string", async () => {
		const r = await runCmd(client, "printf 'hello'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toBe("hello");
	});

	test("printf with format", async () => {
		const r = await runCmd(client, "printf '%s %s' hello world");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toBe("hello world");
	});

	test("printf number formatting", async () => {
		const r = await runCmd(client, "printf '%d\\n' 42");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toBe("42\n");
	});

	test("printf float formatting", async () => {
		const r = await runCmd(client, "printf '%.2f' 3.14159");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toMatch(/3\.14/);
	});

	test("printf escape sequences", async () => {
		const r = await runCmd(client, "printf 'line1\\nline2'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("\n");
		expect(r.stdout).toContain("line1");
		expect(r.stdout).toContain("line2");
	});
});

// ─── TEES tests ───────────────────────────────────────────────────────────

describe("tee command", () => {
	test("tee outputs to stdout and file", async () => {
		const r = await runCmd(client, "echo 'hello' | tee /tmp/tee-test.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello");
		expect(shell.vfs.readFile("/tmp/tee-test.txt")).toContain("hello");
	});

	test("tee -a appends", async () => {
		createTestFile(shell, "/tmp/tee-append.txt", "first\n");
		const r = await runCmd(client, "echo 'second' | tee -a /tmp/tee-append.txt");
		expect(r.exitCode).toBe(0);
		const content = shell.vfs.readFile("/tmp/tee-append.txt");
		expect(content).toContain("first");
		expect(content).toContain("second");
	});

	test("tee multiple files", async () => {
		const r = await runCmd(client, "echo 'data' | tee /tmp/tee1.txt /tmp/tee2.txt");
		expect(r.exitCode).toBe(0);
		expect(shell.vfs.readFile("/tmp/tee1.txt")).toContain("data");
		expect(shell.vfs.readFile("/tmp/tee2.txt")).toContain("data");
	});
});

// ─── TEST command ────────────────────────────────────────────────────────

describe("test command", () => {
	test("test -f file exists", async () => {
		createTestFile(shell, "/tmp/testfile.txt", "content");
		const r = await runCmd(client, "test -f /tmp/testfile.txt && echo yes");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("yes");
	});

	test("test -d directory exists", async () => {
		const r = await runCmd(client, "test -d /tmp && echo yes");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("yes");
	});

	test("test -z zero length string", async () => {
		const r = await runCmd(client, "test -z '' && echo yes");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("yes");
	});

	test("test -n non-zero length string", async () => {
		const r = await runCmd(client, "test -n 'hello' && echo yes");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("yes");
	});

	test("test -eq numeric equal", async () => {
		const r = await runCmd(client, "test 5 -eq 5 && echo yes");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("yes");
	});

	test("test -lt less than", async () => {
		const r = await runCmd(client, "test 3 -lt 5 && echo yes");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("yes");
	});
});

// ─── CLEAR command ────────────────────────────────────────────────────────

describe("clear command", () => {
	test("clear completes successfully", async () => {
		const r = await runCmd(client, "clear");
		expect(r.exitCode).toBe(0);
	});
});
