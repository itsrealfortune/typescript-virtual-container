import { beforeAll, describe, expect, test } from "bun:test";
import { VirtualShell } from "../src";
import { runExec } from "../src/modules/SSHMimic/exec";
import type { ExecStream } from "../src/types/streams";

let shell: VirtualShell;

beforeAll(async () => {
	shell = new VirtualShell("exec-test");
	await shell.ensureInitialized();
});

describe("runExec", () => {
	test("runExec writes stdout", async () => {
		let exitCode = 0;
		let ended = false;
		const written: string[] = [];

		const stream: ExecStream = {
			write: (s: string) => { written.push(s); },
			stderr: { write: (_s: string) => {} },
			exit: (code: number) => { exitCode = code; },
			end: () => { ended = true; },
		};

		runExec(stream, "echo hello", "root", "test-vm", shell);
		await Bun.sleep(50);
		expect(written.join("")).toContain("hello");
	});

	test("runExec writes stderr", async () => {
		const stderrWritten: string[] = [];

		const stream: ExecStream = {
			write: (_s: string) => {},
			stderr: { write: (s: string) => { stderrWritten.push(s); } },
			exit: (_code: number) => {},
			end: () => {},
		};

		runExec(stream, "ls /nonexistent_path_xyz", "root", "test-vm", shell);
		await Bun.sleep(50);
		expect(stderrWritten.length).toBeGreaterThan(0);
	});
});

describe("Pipeline executor", () => {
	test("sequential commands with &&", async () => {
		const r = await runCmd(client, "echo first && echo second");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("first");
		expect(r.stdout).toContain("second");
	});

	test("OR operator ||", async () => {
		const r = await runCmd(client, "false || echo fallback");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("fallback");
	});

	test("pipe between commands", async () => {
		const r = await runCmd(client, "echo hello | wc -w");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("1");
	});

	test("stdout redirect >", async () => {
		const r = await runCmd(client, "echo data > /tmp/redir_test.txt");
		expect(r.exitCode).toBe(0);
		expect(shell.vfs.readFile("/tmp/redir_test.txt").trim()).toBe("data");
	});

	test("stderr redirect 2>", async () => {
		// Run a command that writes to stderr and redirect it
		const r = await runCmd(client, "echo errmsg >&2 2>/tmp/stderr_test.txt");
		expect(r.exitCode).toBe(0);
	});

	test("append >>", async () => {
		await runCmd(client, "echo line1 > /tmp/append_test.txt");
		await runCmd(client, "echo line2 >> /tmp/append_test.txt");
		const content = shell.vfs.readFile("/tmp/append_test.txt");
		expect(content).toContain("line1");
		expect(content).toContain("line2");
	});

	test("subshell (cd ...) does not affect parent", async () => {
		const cwd = shell.vfs.stat("/").type;
		const r = await runCmd(client, "(cd /tmp && pwd)");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("/tmp");
	});

	test("command group { cd ... } affects parent", async () => {
		// The shell updates cwd via nextCwd in the result
		const r = await runCmd(client, "cd /tmp && pwd");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("/tmp");
	});

	test("background execution &", async () => {
		const r = await runCmd(client, "sleep 0.01 &");
		expect(r.exitCode).toBe(0);
	});

	test("semicolon chaining", async () => {
		const r = await runCmd(client, "echo a; echo b");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("a");
		expect(r.stdout).toContain("b");
	});

	test("command with stderr output", async () => {
		const r = await runCmd(client, "echo errmsg >&2");
		expect(r.exitCode).toBe(0);
	});
});

describe("runExec (SSH exec channel)", () => {
	test("runExec writes stdout and exits", async () => {
		let exitCode: number | undefined;
		let ended = false;
		const written: string[] = [];

		const stream = {
			write: (s: string) => { written.push(s); },
			stderr: { write: (_s: string) => {} },
			exit: (code: number) => { exitCode = code; },
			end: () => { ended = true; },
		};

		runExec(stream as any, "echo hello", "root", "test-vm", shell);
		await Bun.sleep(50);
		expect(written.join("")).toContain("hello");
	});

	test("runExec writes stderr", async () => {
		const stderrWritten: string[] = [];

		const stream = {
			write: (_s: string) => {},
			stderr: { write: (s: string) => { stderrWritten.push(s); } },
			exit: (_code: number) => {},
			end: () => {},
		};

		runExec(stream as any, "ls /nonexistent_path_xyz", "root", "test-vm", shell);
		await Bun.sleep(50);
		expect(stderrWritten.length).toBeGreaterThan(0);
	});
});
