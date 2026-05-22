import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import type { SshClient } from "../src/modules/SSHClient";
import { createTestEnv } from "./test-helper";

let client: InstanceType<typeof SshClient>;
let ssh: InstanceType<typeof VirtualSshServer>;

beforeAll(async () => {
	const env = await createTestEnv("ssh-client");
	client = env.client;
	ssh = env.ssh;
});

afterAll(() => {
	client.disconnect();
	ssh.stop();
});

describe("SSHClient API", () => {
	test("exec runs command", async () => {
		const r = await client.exec("echo hello");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello");
	});

	test("ls lists directory", async () => {
		const r = await client.ls("/");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("root");
	});

	test("pwd returns path", async () => {
		const r = await client.pwd();
		expect(r.exitCode).toBe(0);
	});

	test("cd changes directory", async () => {
		const r = await client.cd("/tmp");
		expect(r.exitCode).toBe(0);
		expect(client.getCwd()).toBe("/tmp");
	});

	test("cd to home", async () => {
		const r = await client.cd("/root");
		expect(r.exitCode).toBe(0);
	});

	test("cat reads file", async () => {
		const r = await client.cat("/etc/hostname");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("ssh-client");
	});

	test("mkdir creates directory", async () => {
		const r = await client.mkdir("/tmp/test-mkdir");
		expect(r.exitCode).toBe(0);
	});

	test("mkdir -p creates nested", async () => {
		const r = await client.mkdir("/tmp/a/b/c", true);
		expect(r.exitCode).toBe(0);
	});

	test("touch creates file", async () => {
		const r = await client.touch("/tmp/touched.txt");
		expect(r.exitCode).toBe(0);
	});

	test("rm removes file", async () => {
		await client.touch("/tmp/torm.txt");
		const r = await client.rm("/tmp/torm.txt");
		expect(r.exitCode).toBe(0);
	});

	test("rm -r removes directory", async () => {
		await client.mkdir("/tmp/tormdir");
		const r = await client.rm("/tmp/tormdir", true);
		expect(r.exitCode).toBe(0);
	});

	test("writeFile writes content", async () => {
		const r = await client.writeFile("/tmp/testwrite.txt", "hello");
		expect(r.exitCode).toBe(0);
	});

	test("readFile reads content", async () => {
		const r = await client.readFile("/tmp/testwrite.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toBe("hello");
	});

	test("getUsername returns user", () => {
		expect(client.getUsername()).toBe("root");
	});

	test("tree works", async () => {
		const r = await client.tree("/");
		expect(r.exitCode).toBe(0);
	});

	test("whoami works", async () => {
		const r = await client.whoami();
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("root");
	});

	test("hostname works", async () => {
		const r = await client.hostname();
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("ssh-client");
	});

	test("who works", async () => {
		const r = await client.who();
		expect(r.exitCode).toBe(0);
	});
});

import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadOrCreateHostKey } from "../src/modules/SSHMimic/hostKey";

describe("hostKey", () => {
	test("loadOrCreateHostKey generates new key in temp dir", () => {
		const tmpDir = mkdtempSync(join(tmpdir(), "hostkey-"));
		try {
			const key = loadOrCreateHostKey(tmpDir);
			expect(key).toBeTruthy();
			expect(key).toContain("BEGIN RSA PRIVATE KEY");
			const keyPath = join(tmpDir, ".ssh-mimic", "host_rsa");
			expect(existsSync(keyPath)).toBe(true);
		} finally {
			rmSync(tmpDir, { recursive: true, force: true });
		}
	});

	test("loadOrCreateHostKey reads existing key", () => {
		const tmpDir = mkdtempSync(join(tmpdir(), "hostkey-existing-"));
		try {
			const keyDir = join(tmpDir, ".ssh-mimic");
			mkdirSync(keyDir, { recursive: true });
			const keyPath = join(keyDir, "host_rsa");
			writeFileSync(keyPath, "custom-key-data\n", { mode: 0o600 });
			const key = loadOrCreateHostKey(tmpDir);
			expect(key.trim()).toBe("custom-key-data");
		} finally {
			rmSync(tmpDir, { recursive: true, force: true });
		}
	});
});

import type { VirtualSshServer } from "../src";
import { buildLoginBanner } from "../src/modules/SSHMimic/loginBanner";

describe("loginBanner", () => {
	test("buildLoginBanner returns string", () => {
		const banner = buildLoginBanner("test-vm", { kernel: "6.1.0", arch: "amd64", os: "Linux" }, null);
		expect(banner).toContain("test-vm");
		expect(banner).toContain("6.1.0");
	});

	test("buildLoginBanner with last login", () => {
		const banner = buildLoginBanner("test-vm", { kernel: "6.1.0", arch: "amd64", os: "Linux" }, { at: "Tue May 20 09:00:00", from: "127.0.0.1" });
		expect(banner).toContain("Last login");
	});
});
