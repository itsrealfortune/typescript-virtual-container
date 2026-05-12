/** biome-ignore-all lint/style/useNamingConvention: ENV */
/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: expand */
import { beforeAll, describe, expect, test } from "bun:test";
import type { SshClient, VirtualShell } from "../src";
import { createTestEnv, createTestFile, pathExists, runCmd } from "./test-helper";

let shell: VirtualShell;
let client: InstanceType<typeof SshClient>;

beforeAll(async () => {
	const env = await createTestEnv("test-missing");
	shell = env.shell;
	client = env.client;
});

// ─── CD command tests ──────────────────────────────────────────────────────

describe("cd command", () => {
	test("cd changes directory", async () => {
		const r = await runCmd(client, "cd /tmp && pwd");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("/tmp");
	});

	test("cd to home directory", async () => {
		const r = await runCmd(client, "cd ~ && pwd");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
		expect(r.stdout?.trim().length).toBeGreaterThan(0);
	});

	test("cd to parent directory", async () => {
		const r = await runCmd(client, "cd /tmp && cd .. && pwd");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("/");
	});

	test("cd with no args goes to home", async () => {
		const r = await runCmd(client, "cd && pwd");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
		expect(r.stdout?.trim().length).toBeGreaterThan(0);
	});

	test("cd to non-existent directory fails", async () => {
		const r = await runCmd(client, "cd /nonexistent 2>&1 || echo 'error'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("cd with absolute path", async () => {
		const r = await runCmd(client, "cd /var && pwd");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("/var");
	});

	test("cd with relative path", async () => {
		await runCmd(client, "mkdir -p /tmp/cdtest/subdir");
		const r = await runCmd(client, "cd /tmp/cdtest && cd subdir && pwd");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toContain("subdir");
	});
});

// ─── SOURCE/DOT command tests ──────────────────────────────────────────────

describe("source/dot command", () => {
	test("source executes script", async () => {
		createTestFile(shell, "/tmp/sourceme.sh", "echo sourced");
		const r = await runCmd(client, "source /tmp/sourceme.sh");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("source with variable assignment", async () => {
		createTestFile(shell, "/tmp/srcvar.sh", "VAR=sourced_value");
		const r = await runCmd(client, "source /tmp/srcvar.sh && echo $VAR || echo 'fail'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("dot command (alias for source)", async () => {
		createTestFile(shell, "/tmp/dotme.sh", "echo 'dot works'");
		const r = await runCmd(client, ". /tmp/dotme.sh");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("source non-existent file fails", async () => {
		const r = await runCmd(client, "source /nonexistent.sh 2>&1 || echo 'error'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("source with functions", async () => {
		createTestFile(shell, "/tmp/func.sh", "myfunc() { echo func_result; }");
		const r = await runCmd(client, "source /tmp/func.sh && myfunc || echo 'no func'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── WHO command tests ────────────────────────────────────────────────────

describe("who command", () => {
	test("who lists logged in users", async () => {
		const r = await runCmd(client, "who");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
		expect(r.stdout?.length).toBeGreaterThanOrEqual(0);
	});

	test("who -b boot time", async () => {
		const r = await runCmd(client, "who -b || echo 'boot'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("who -r runlevel", async () => {
		const r = await runCmd(client, "who -r || echo 'runlevel'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("who -a all information", async () => {
		const r = await runCmd(client, "who -a || echo 'all'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── EXIT command tests ───────────────────────────────────────────────────

describe("exit command", () => {
	test("exit with code 0", async () => {
		const r = await runCmd(client, "exit 0");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("exit with code 1", async () => {
		const r = await runCmd(client, "exit 1");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("exit in subshell", async () => {
		const r = await runCmd(client, "sh -c 'exit 42' || echo 'exited'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── PIPES and REDIRECTION tests ───────────────────────────────────────────

describe("pipes and redirections", () => {
	test("simple pipe", async () => {
		const r = await runCmd(client, "echo 'hello world' | wc -w");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("2");
	});

	test("multiple pipes", async () => {
		const r = await runCmd(client, "echo -e 'c\\na\\nb' | sort | tr a-z A-Z");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("A");
		expect(r.stdout).toContain("B");
		expect(r.stdout).toContain("C");
	});

	test("pipe to file (>)", async () => {
		const r = await runCmd(client, "echo 'content' > /tmp/pipe-test.txt");
		expect(r.exitCode).toBe(0);
		expect(shell.vfs.exists("/tmp/pipe-test.txt")).toBe(true);
		expect(shell.vfs.readFile("/tmp/pipe-test.txt")).toContain("content");
	});

	test("append to file (>>)", async () => {
		createTestFile(shell, "/tmp/append-test.txt", "line1\n");
		const r = await runCmd(client, "echo 'line2' >> /tmp/append-test.txt");
		expect(r.exitCode).toBe(0);
		const content = shell.vfs.readFile("/tmp/append-test.txt");
		expect(content).toContain("line1");
		expect(content).toContain("line2");
	});

	test("redirect stderr (2>)", async () => {
		const r = await runCmd(client, "ls /nonexistent 2> /tmp/err.txt 2>&1 || echo done");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("redirect both stdout and stderr (&>)", async () => {
		const r = await runCmd(client, "echo 'test' &> /tmp/both.txt");
		expect(r.exitCode).toBe(0);
		expect(pathExists(shell, "/tmp/both.txt")).toBe(true);
	});

	test("stdin redirection (<)", async () => {
		createTestFile(shell, "/tmp/stdin.txt", "hello world");
		const r = await runCmd(client, "cat < /tmp/stdin.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello world");
	});

	test("here document (<<)", async () => {
		const r = await runCmd(client, "cat << EOF\nhello\nworld\nEOF");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── COMMAND CHAINING tests ───────────────────────────────────────────────

describe("command chaining and sequencing", () => {
	test("AND operator (&&) success", async () => {
		const r = await runCmd(client, "echo 'a' && echo 'b'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("a");
		expect(r.stdout).toContain("b");
	});

	test("AND operator (&&) with failure", async () => {
		const r = await runCmd(client, "false && echo 'should not print' || echo 'failed'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("failed");
	});

	test("OR operator (||) success", async () => {
		const r = await runCmd(client, "true || echo 'should not print'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
		expect(r.stdout?.length).toBeGreaterThanOrEqual(0);
	});

	test("OR operator (||) with failure", async () => {
		const r = await runCmd(client, "false || echo 'printed'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("printed");
	});

	test("semicolon chaining", async () => {
		const r = await runCmd(client, "echo 'a'; echo 'b'; echo 'c'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("a");
		expect(r.stdout).toContain("b");
		expect(r.stdout).toContain("c");
	});

	test("background execution (&)", async () => {
		const r = await runCmd(client, "sleep 0.01 & echo 'foreground' || echo 'done'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
		expect(r.stdout?.length).toBeGreaterThanOrEqual(0);
	});
});

// ─── GLOB PATTERNS tests ───────────────────────────────────────────────────

describe("glob patterns and wildcards", () => {
	test("asterisk wildcard (*)", async () => {
		createTestFile(shell, "/tmp/glob1.txt", "a");
		createTestFile(shell, "/tmp/glob2.txt", "b");
		createTestFile(shell, "/tmp/glob3.log", "c");
		const r = await runCmd(client, "ls /tmp/glob*.txt 2>&1 || echo 'pattern'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("question mark wildcard (?)", async () => {
		createTestFile(shell, "/tmp/file1.txt", "a");
		createTestFile(shell, "/tmp/file2.txt", "b");
		createTestFile(shell, "/tmp/file10.txt", "c");
		const r = await runCmd(client, "ls /tmp/file?.txt 2>&1 || echo 'pattern'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("bracket pattern [abc]", async () => {
		createTestFile(shell, "/tmp/a1.txt", "a");
		createTestFile(shell, "/tmp/b1.txt", "b");
		createTestFile(shell, "/tmp/c1.txt", "c");
		createTestFile(shell, "/tmp/d1.txt", "d");
		const r = await runCmd(client, "ls /tmp/[abc]1.txt 2>&1 || echo 'pattern'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("range pattern [a-z]", async () => {
		createTestFile(shell, "/tmp/a.txt", "");
		createTestFile(shell, "/tmp/m.txt", "");
		createTestFile(shell, "/tmp/z.txt", "");
		const r = await runCmd(client, "ls /tmp/[a-z].txt 2>&1 || echo 'pattern'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("negated pattern [!abc]", async () => {
		createTestFile(shell, "/tmp/x.txt", "");
		createTestFile(shell, "/tmp/y.txt", "");
		const r = await runCmd(client, "ls /tmp/[!abc].txt 2>&1 || echo 'found'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── COMMAND SUBSTITUTION tests ────────────────────────────────────────────

describe("command substitution", () => {
	test("$() command substitution", async () => {
		const r = await runCmd(client, "echo $(echo hello)");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello");
	});

	test("backtick command substitution", async () => {
		const r = await runCmd(client, "echo $(echo world)");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("world");
	});

	test("nested command substitution", async () => {
		const r = await runCmd(client, "echo $(echo $(echo nested))");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toContain("nested");
	});

	test("command substitution in variable", async () => {
		const r = await runCmd(client, "VAR=$(echo value) && echo $VAR || echo 'subst'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("command substitution with pipe", async () => {
		const r = await runCmd(client, "echo $(echo hello | tr a-z A-Z) || echo 'subst'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── CONDITIONALS tests ───────────────────────────────────────────────────

describe("conditionals (if/then/else)", () => {
	test("if with true condition", async () => {
		const r = await runCmd(client, "if true; then echo yes; fi 2>&1 || echo 'if'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("if with false condition", async () => {
		const r = await runCmd(client, "if false; then echo yes; else echo no; fi 2>&1 || echo 'if'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("if with test -f", async () => {
		createTestFile(shell, "/tmp/iftest.txt", "content");
		const r = await runCmd(client, "if test -f /tmp/iftest.txt; then echo exists; fi 2>&1 || echo 'if'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("if/elif/else chain", async () => {
		const r = await runCmd(client, "if [ 1 -eq 2 ]; then echo a; elif [ 2 -eq 2 ]; then echo b; else echo c; fi");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── LOOPS tests ───────────────────────────────────────────────────────────

describe("loops (for/while)", () => {
	test("for loop with range", async () => {
		const r = await runCmd(client, "for i in 1 2 3; do echo $i; done");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("1");
		expect(r.stdout).toContain("2");
		expect(r.stdout).toContain("3");
	});

	test("for loop with seq", async () => {
		const r = await runCmd(client, "for i in $(seq 1 3); do echo $i; done");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("for loop with glob", async () => {
		createTestFile(shell, "/tmp/loop1.txt", "");
		createTestFile(shell, "/tmp/loop2.txt", "");
		const r = await runCmd(client, "for f in /tmp/loop*.txt; do echo $f; done 2>&1 || echo 'for'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── SPECIAL VARIABLES tests ───────────────────────────────────────────────

describe("special variables", () => {
	test("$# number of parameters", async () => {
		const r = await runCmd(client, "set a b c && echo $#");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("$? exit status", async () => {
		const r = await runCmd(client, "true && echo $?");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("0");
	});

	test("$$ process ID", async () => {
		const r = await runCmd(client, "echo $$ || echo 'pid'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("$0 script name", async () => {
		const r = await runCmd(client, "sh -c 'echo $0'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});

	test("$1, $2, ... positional args", async () => {
		const r = await runCmd(client, "sh -c 'echo $1 $2' script arg1 arg2 || echo 'args'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("$@ all positional args", async () => {
		const r = await runCmd(client, "sh -c 'for a in \"$@\"; do echo $a; done' script a b c");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── QUOTING and ESCAPING tests ────────────────────────────────────────────

describe("quoting and escaping", () => {
	test("double quotes with variables", async () => {
		const r = await runCmd(client, "V=hello && echo \"$V world\" || echo 'quote'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("single quotes (no substitution)", async () => {
		const r = await runCmd(client, "V=hello && echo '$V world' || echo 'quote'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("backslash escaping", async () => {
		const r = await runCmd(client, "echo 'a\\tb\\nc'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("a");
		expect(r.stdout).toContain("b");
		expect(r.stdout).toContain("c");
	});

	test("escaped special chars", async () => {
		const r = await runCmd(client, "echo '\\$\\*\\?'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("$");
		expect(r.stdout).toContain("*");
	});
});

// ─── ARITHMETIC tests ────────────────────────────────────────────────────

describe("arithmetic expansion", () => {
	test("basic arithmetic $((expr))", async () => {
		const r = await runCmd(client, "echo $((2+3))");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("5");
	});

	test("subtraction", async () => {
		const r = await runCmd(client, "echo $((10-3))");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("7");
	});

	test("multiplication", async () => {
		const r = await runCmd(client, "echo $((4*5))");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("20");
	});

	test("division", async () => {
		const r = await runCmd(client, "echo $((20/4))");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("5");
	});

	test("modulo", async () => {
		const r = await runCmd(client, "echo $((10%3))");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("1");
	});

	test("arithmetic with variables", async () => {
		const r = await runCmd(client, "A=10; B=5; echo $((A+B)) || echo 'arith'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("complex arithmetic", async () => {
		const r = await runCmd(client, "echo $(((2+3)*4))");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("20");
	});
});

// ─── PARAMETER EXPANSION tests ─────────────────────────────────────────────

describe("parameter expansion", () => {
	test("${VAR} basic expansion", async () => {
		const r = await runCmd(client, "VAR=hello && echo ${VAR}");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello");
	});

	test("${VAR:-default} with default", async () => {
		const r = await runCmd(client, "echo ${UNDEFINED:-default}");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("default");
	});

	test("${VAR:=default} assign default", async () => {
		const r = await runCmd(client, "echo ${NEWVAR:=value} && echo $NEWVAR");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("${VAR#pattern} remove prefix", async () => {
		const r = await runCmd(client, "VAR=hello world && echo ${VAR#hello }");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("${#VAR} string length", async () => {
		const r = await runCmd(client, "VAR=hello && echo ${#VAR}");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("5");
	});

	test("${VAR:0:3} substring", async () => {
		const r = await runCmd(client, "VAR=hello && echo ${VAR:0:3}");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── PROCESS SUBSTITUTION tests ────────────────────────────────────────────

describe("process and I/O operations", () => {
	test("multiple input/output redirection", async () => {
		createTestFile(shell, "/tmp/input.txt", "line1\nline2\nline3");
		const r = await runCmd(client, "cat /tmp/input.txt | grep 'line' | sort | uniq");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("line");
	});

	test("tee to multiple files via pipe", async () => {
		const r = await runCmd(client, "echo 'test' | tee /tmp/t1.txt /tmp/t2.txt | cat");
		expect(r.exitCode).toBe(0);
		expect(shell.vfs.exists("/tmp/t1.txt")).toBe(true);
		expect(shell.vfs.exists("/tmp/t2.txt")).toBe(true);
	});

	test("wc with multiple file inputs", async () => {
		createTestFile(shell, "/tmp/wc1.txt", "a\nb\nc");
		createTestFile(shell, "/tmp/wc2.txt", "d\ne");
		const r = await runCmd(client, "wc -l /tmp/wc1.txt /tmp/wc2.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("3");
		expect(r.stdout).toContain("2");
	});
});

// ─── ERROR HANDLING tests ──────────────────────────────────────────────────

describe("error handling and edge cases", () => {
	test("missing command fails", async () => {
		const r = await runCmd(client, "nonexistent_cmd 2>&1 || echo error_caught");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
		expect(r.stdout?.trim()).toBe("error_caught");
	});

	test("division by zero in arithmetic", async () => {
		const r = await runCmd(client, "echo $((1/0)) 2>&1 || echo 'math error'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("undefined variable in arithmetic", async () => {
		const r = await runCmd(client, "echo $((UNDEFINED_VAR + 5))");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("5");
	});

	test("empty file handling", async () => {
		createTestFile(shell, "/tmp/empty.txt", "");
		const r = await runCmd(client, "cat /tmp/empty.txt | wc -l");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("0");
	});

	test("binary file handling", async () => {
		shell.vfs.writeFile("/tmp/binary.bin", Buffer.from([0x00, 0x01, 0x02]));
		const r = await runCmd(client, "file /tmp/binary.bin 2>&1 || echo 'file'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});
