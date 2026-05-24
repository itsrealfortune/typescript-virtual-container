/**
 * Security audit regression tests.
 *
 * - One user cannot read another user's files (VFS permission enforcement)
 * - node:vm sandbox restricts dangerous access
 * - Browser node:vm polyfill does not use unsafe eval
 */
import { describe, expect, test, beforeAll, afterAll } from "bun:test";
import { SshClient, type VirtualShell, SandboxedShell } from "../src";
import { createTestEnv } from "./test-helper";

describe("user file isolation", () => {
	let client: InstanceType<typeof SshClient>;
	let shell: VirtualShell;
	let port: number;
	let aliceClient: InstanceType<typeof SshClient>;
	let bobClient: InstanceType<typeof SshClient>;

	beforeAll(async () => {
		const env = await createTestEnv("test-audit");
		client = env.client;
		shell = env.shell;
		port = env.port;

		await shell.users.addUser("alice", "pass");
		await shell.users.addUser("bob", "pass");

		aliceClient = new SshClient();
		await aliceClient.connect({
			host: "localhost",
			port,
			username: "alice",
			password: "pass",
		});

		bobClient = new SshClient();
		await bobClient.connect({
			host: "localhost",
			port,
			username: "bob",
			password: "pass",
		});
	});

	afterAll(() => {
		client?.disconnect();
		aliceClient?.disconnect();
		bobClient?.disconnect();
	});

	test("alice can write and read her own files", async () => {
		const r = await aliceClient.exec(
			"echo 'secret data' > /home/alice/secret.txt && cat /home/alice/secret.txt"
		);
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("secret data");
	});

	test("bob cannot read alice's file", async () => {
		const r = await bobClient.exec("cat /home/alice/secret.txt");
		expect(r.exitCode).not.toBe(0);
	});

	test("bob cannot list alice's home directory", async () => {
		const r = await bobClient.exec("ls /home/alice/");
		expect(r.exitCode).not.toBe(0);
	});

	test("bob can create and read his own files independently", async () => {
		const r = await bobClient.exec(
			"echo 'bob data' > /home/bob/data.txt && cat /home/bob/data.txt"
		);
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("bob data");
	});

	test("alice cannot read bob's file", async () => {
		const r = await aliceClient.exec("cat /home/bob/data.txt");
		expect(r.exitCode).not.toBe(0);
	});
});

describe("node:vm sandbox", () => {
	let client: InstanceType<typeof SshClient>;
	let shell: VirtualShell;

	beforeAll(async () => {
		const env = await createTestEnv("test-audit-vm");
		client = env.client;
		shell = env.shell;

		// Ensure nodejs is installed
		await shell.packageManager.install(["nodejs"]);
	});

	afterAll(() => {
		client?.disconnect();
	});

	test("node -e runs code in sandboxed context", async () => {
		const r = await client.exec(
			'node -e "console.log(typeof process !== "undefined" ? process.platform : "undefined")"'
		);
		expect(r.stdout).toContain("linux");
	});

	test("node sandbox cannot require fs", async () => {
		const r = await client.exec("node -e \"require('fs')\"");
		expect(r.stdout ?? r.stderr).toContain("not available");
	});

	test("node sandbox cannot require child_process", async () => {
		const r = await client.exec("node -e \"require('child_process')\"");
		expect(r.stdout ?? r.stderr).toContain("not available");
	});

	test("node sandbox cannot require net", async () => {
		const r = await client.exec("node -e \"require('net')\"");
		expect(r.stdout ?? r.stderr).toContain("not available");
	});
});

describe("SandboxedShell isolation", () => {
	test("workers are isolated from each other", async () => {
		const s1 = new SandboxedShell("sandbox1");
		const s2 = new SandboxedShell("sandbox2");

		try {
			// Each worker has its own VFS
			await s1.exec("echo 's1 data' > /tmp/test.txt");
			await s2.exec("echo 's2 data' > /tmp/test.txt");

			const r1 = await s1.exec("cat /tmp/test.txt");
			expect(r1.stdout.trim()).toBe("s1 data");

			const r2 = await s2.exec("cat /tmp/test.txt");
			expect(r2.stdout.trim()).toBe("s2 data");
		} finally {
			s1.terminate();
			s2.terminate();
		}
	}, 15000);
});

describe("browser vm polyfill audit", () => {
	test("polyfill does not expose eval directly", async () => {
		// The polyfill is at polyfills/node_vm/index.js
		const polyfillSource = await Bun.file("polyfills/node_vm/index.js").text();
		// It should use new Function(), not eval()
		expect(polyfillSource).not.toContain("eval(");
		expect(polyfillSource).not.toContain("eval (");
		expect(polyfillSource).toContain("new Function");
	});
});
