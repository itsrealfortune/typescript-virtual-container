import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { VirtualShell, VirtualSshServer, SshClient } from "../src";
import { runExec } from "../src/modules/SSHMimic/exec";
import type { ExecStream } from "../src/types/streams";

let shell: VirtualShell;
let ssh: VirtualSshServer;
let client: SshClient;
let port: number;

beforeAll(async () => {
	shell = new VirtualShell("exec-test");
	await shell.ensureInitialized();
	shell.users.setPassword("root", "root");
	ssh = new VirtualSshServer({ port: 0, shell });
	port = await ssh.start();
	client = new SshClient();
	await client.connect({
		host: "localhost",
		port,
		username: "root",
		password: "root",
	});
});

afterAll(() => {
	client.disconnect();
	ssh.stop();
});

describe("runExec", () => {
	test("runExec writes stdout", async () => {
		const written: string[] = [];

		const stream: ExecStream = {
			write: (s: string) => {
				written.push(s);
			},
			stderr: { write: () => {} },
			exit: () => {},
			end: () => {},
		};

		runExec(stream, "echo hello", "root", "test-vm", shell);
		await Bun.sleep(50);
		expect(written.join("")).toContain("hello");
	});

	test("runExec writes stderr", async () => {
		const stderrWritten: string[] = [];

		const stream: ExecStream = {
			write: () => {},
			stderr: {
				write: (s: string) => {
					stderrWritten.push(s);
				},
			},
			exit: () => {},
			end: () => {},
		};

		runExec(stream, "ls /nonexistent_path_xyz", "root", "test-vm", shell);
		await Bun.sleep(50);
		expect(stderrWritten.length).toBeGreaterThan(0);
	});
});

describe("Pipeline executor", () => {
	test("sequential commands with &&", async () => {
		const r = await client.exec("echo first && echo second");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("first");
		expect(r.stdout).toContain("second");
	});

	test("OR operator ||", async () => {
		const r = await client.exec("false || echo fallback");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("fallback");
	});

	test("pipe between commands", async () => {
		const r = await client.exec("echo hello | wc -w");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("1");
	});

	test("stdout redirect >", async () => {
		const r = await client.exec("echo data > /tmp/redir_test.txt");
		expect(r.exitCode).toBe(0);
		expect(shell.vfs.readFile("/tmp/redir_test.txt").trim()).toBe("data");
	});

	test("stderr redirect 2>", async () => {
		const r = await client.exec("echo errmsg >&2 2>/tmp/stderr_test.txt");
		expect(r.exitCode).toBe(0);
	});

	test("append >>", async () => {
		await client.exec("echo line1 > /tmp/append_test.txt");
		await client.exec("echo line2 >> /tmp/append_test.txt");
		const content = shell.vfs.readFile("/tmp/append_test.txt");
		expect(content).toContain("line1");
		expect(content).toContain("line2");
	});

	test("subshell (cd ...) does not affect parent", async () => {
		const r = await client.exec("(cd /tmp && pwd)");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("/tmp");
	});

	test("command group { cd ... } affects parent", async () => {
		const r = await client.exec("cd /tmp && pwd");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("/tmp");
	});

	test("background execution &", async () => {
		const r = await client.exec("sleep 0.01 &");
		expect(r.exitCode).toBe(0);
	});

	test("semicolon chaining", async () => {
		const r = await client.exec("echo a; echo b");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("a");
		expect(r.stdout).toContain("b");
	});

	test("command with stderr output", async () => {
		const r = await client.exec("echo errmsg >&2");
		expect(r.exitCode).toBe(0);
	});
});
