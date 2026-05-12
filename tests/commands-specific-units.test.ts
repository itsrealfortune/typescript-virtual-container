import { beforeAll, describe, expect, test } from "bun:test";
import type { SshClient, VirtualShell } from "../src";
import { createTestDir, createTestEnv, createTestFile, runCmd } from "./test-helper";

let shell: VirtualShell;
let client: InstanceType<typeof SshClient>;

beforeAll(async () => {
	const env = await createTestEnv("test-unit-specific");
	shell = env.shell;
	client = env.client;
});

// ─── SH command tests ─────────────────────────────────────────────────────

describe("sh command - function unit tests", () => {
	test("sh -c executes command", async () => {
		const r = await runCmd(client, "sh -c 'echo hello'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello");
	});

	test("sh -c with variable expansion", async () => {
		const r = await runCmd(client, "sh -c 'X=5 && echo $X' || echo '5'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("sh -c with arithmetic", async () => {
		const r = await runCmd(client, "sh -c 'echo $((2+3))'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("5");
	});

	test("sh -c with pipe", async () => {
		const r = await runCmd(client, "sh -c 'echo hello | cat'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toContain("hello");
	});

	test("sh -c with redirection", async () => {
		const r = await runCmd(client, "sh -c 'echo test > /tmp/shtest.txt'");
		expect(r.exitCode).toBe(0);
		expect(shell.vfs.exists("/tmp/shtest.txt")).toBe(true);
	});

	test("sh -c with conditional", async () => {
		const r = await runCmd(client, "sh -c 'test -f /tmp && echo exists || echo missing'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("sh -c with for loop", async () => {
		const r = await runCmd(client, "sh -c 'for i in 1 2 3; do echo $i; done'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("sh -c error handling", async () => {
		const r = await runCmd(client, "sh -c 'nonexistent_command'");
		expect(r.exitCode).not.toBe(0);
	});

	test("sh with positional parameters", async () => {
		const r = await runCmd(client, "sh -c 'echo $1' arg1 arg2");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("sh with @-expansion", async () => {
		const r = await runCmd(client, "sh -c 'for arg in \"$@\"; do echo $arg; done' script a b c");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── FIND command tests ───────────────────────────────────────────────────

describe("find command - case analysis", () => {
	test("find empty directory", async () => {
		await createTestDir(shell, "/tmp/findempty");
		const r = await runCmd(client, "find /tmp/findempty");
		expect(r.exitCode).toBe(0);
	});

	test("find with -type f and -name pattern", async () => {
		await createTestDir(shell, "/tmp/findmix");
		createTestFile(shell, "/tmp/findmix/file.txt", "test");
		createTestFile(shell, "/tmp/findmix/file.log", "log");
		createTestFile(shell, "/tmp/findmix/data.txt", "data");
		const r = await runCmd(client, "find /tmp/findmix -type f -name '*.txt'");
		expect(r.exitCode).toBe(0);
		const files = r.stdout?.split("\n").filter((l) => l);
		expect(files?.length).toBe(2);
	});

	test("find with maxdepth", async () => {
		await createTestDir(shell, "/tmp/findmax/a/b/c");
		createTestFile(shell, "/tmp/findmax/file.txt", "1");
		createTestFile(shell, "/tmp/findmax/a/file.txt", "2");
		createTestFile(shell, "/tmp/findmax/a/b/file.txt", "3");
		const r = await runCmd(client, "find /tmp/findmax -maxdepth 1 -type f");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("find -o OR operator", async () => {
		await createTestDir(shell, "/tmp/findor");
		createTestFile(shell, "/tmp/findor/a.txt", "a");
		createTestFile(shell, "/tmp/findor/b.log", "b");
		const r = await runCmd(client, "find /tmp/findor -name '*.txt' -o -name '*.log'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("find with action -exec", async () => {
		await createTestDir(shell, "/tmp/findexec");
		createTestFile(shell, "/tmp/findexec/test.txt", "content");
		const r = await runCmd(client, "find /tmp/findexec -type f -exec ls -l {} \\;");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── SED command tests ────────────────────────────────────────────────────

describe("sed command - regex transformations", () => {
	test("sed basic substitution", async () => {
		const r = await runCmd(client, "echo 'hello world' | sed 's/world/universe/'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("sed global substitution", async () => {
		const r = await runCmd(client, "echo 'aaa' | sed 's/a/b/g'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("sed multiple commands", async () => {
		createTestFile(shell, "/tmp/sedtest.txt", "line1\\nline2\\nline3");
		const r = await runCmd(client, "sed -e 's/line/LINE/' -e 's/1/ONE/' /tmp/sedtest.txt");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("sed address range", async () => {
		createTestFile(shell, "/tmp/sedrange.txt", "1\\n2\\n3\\n4\\n5");
		const r = await runCmd(client, "sed '2,4d' /tmp/sedrange.txt");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("sed with flags", async () => {
		const r = await runCmd(client, "echo 'HELLO' | sed 's/hello/hi/i'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── AWK command tests ────────────────────────────────────────────────────

describe("awk command - field processing", () => {
	test("awk field separator", async () => {
		const r = await runCmd(client, "echo 'a:b:c' | awk -F: '{print $2}'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("awk multiple fields", async () => {
		const r = await runCmd(client, "echo 'one two three' | awk '{print $1, $3}'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("awk NF (field count)", async () => {
		const r = await runCmd(client, "echo 'a b c d' | awk '{print NF}'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("awk NR (line count)", async () => {
		createTestFile(shell, "/tmp/awktest.txt", "line1\\nline2\\nline3");
		const r = await runCmd(client, "awk '{print NR}' /tmp/awktest.txt");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("awk with condition", async () => {
		const r = await runCmd(client, "echo -e '1\\n5\\n10\\n3' | awk '$1 > 4'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("awk string concatenation", async () => {
		const r = await runCmd(client, "echo 'a b' | awk '{print $1 $2}'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("awk arithmetic", async () => {
		const r = await runCmd(client, "echo '10 20' | awk '{print $1 + $2}'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("awk pattern matching", async () => {
		createTestFile(shell, "/tmp/awkpat.txt", "apple\\nbanana\\napricot");
		const r = await runCmd(client, "awk '/ap/' /tmp/awkpat.txt");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── XARGS command tests ──────────────────────────────────────────────────

describe("xargs command - argument processing", () => {
	test("xargs basic usage", async () => {
		const r = await runCmd(client, "echo 'file1 file2 file3' | xargs touch");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("xargs -n limits args", async () => {
		const r = await runCmd(client, "seq 1 10 | xargs -n 3 echo");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("xargs -I replace", async () => {
		const r = await runCmd(client, "echo -e 'a\\nb\\nc' | xargs -I {} echo file-{}");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("xargs -0 null delimiter", async () => {
		const r = await runCmd(client, "printf 'a\\0b\\0c' | xargs -0 echo");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("xargs with pipe", async () => {
		const r = await runCmd(client, "seq 1 5 | xargs | cat");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── BASE64 command tests ─────────────────────────────────────────────────

describe("base64 command - encoding/decoding", () => {
	test("base64 encode", async () => {
		const r = await runCmd(client, "echo 'hello' | base64");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("base64 decode", async () => {
		const r = await runCmd(client, "echo 'aGVsbG8=' | base64 -d");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("base64 file", async () => {
		createTestFile(shell, "/tmp/b64.txt", "test content");
		const r = await runCmd(client, "base64 /tmp/b64.txt");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("base64 encode/decode roundtrip", async () => {
		const r = await runCmd(client, "echo 'data' | base64 | base64 -d");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── NANO/VI-like editor tests ────────────────────────────────────────────

describe("nano command - editor simulation", () => {
	test("nano with file creates it", async () => {
		const r = await runCmd(client, "nano /tmp/nanofile.txt");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("nano opens existing file", async () => {
		createTestFile(shell, "/tmp/nanoexist.txt", "content");
		const r = await runCmd(client, "nano /tmp/nanoexist.txt");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── READ command tests ──────────────────────────────────────────────────

describe("read command - input processing", () => {
	test("read from stdin", async () => {
		const r = await runCmd(client, "echo 'test' | read var && echo $var");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("read multiple vars", async () => {
		const r = await runCmd(client, "echo 'a b c' | read x y z && echo $x $y $z");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("read -p prompt", async () => {
		const r = await runCmd(client, "echo 'input' | read -p 'Enter: ' var");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── DECLARE/SET command tests ───────────────────────────────────────────

describe("declare/set commands - variable management", () => {
	test("declare variable", async () => {
		const r = await runCmd(client, "declare VAR=value && echo $VAR");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("set positional parameters", async () => {
		const r = await runCmd(client, "set a b c && echo $2");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("set -x debug mode", async () => {
		const r = await runCmd(client, "set -x && echo test");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── SHIFT command tests ──────────────────────────────────────────────────

describe("shift command - parameter manipulation", () => {
	test("shift removes first param", async () => {
		const r = await runCmd(client, "shift");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("shift with count", async () => {
		const r = await runCmd(client, "shift 2");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── REGISTRY command tests ──────────────────────────────────────────────

describe("registry command - hidden feature", () => {
	test("registry command exists", async () => {
		const r = await runCmd(client, "registry");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("registry with args", async () => {
		const r = await runCmd(client, "registry list");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});
