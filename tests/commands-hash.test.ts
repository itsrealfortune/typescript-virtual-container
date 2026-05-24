import { beforeAll, describe, expect, test } from "bun:test";
import type { SshClient, VirtualShell } from "../src";
import { createTestEnv, runCmd } from "./test-helper";

let shell: VirtualShell;
let client: InstanceType<typeof SshClient>;

beforeAll(async () => {
	const env = await createTestEnv("test-hash");
	shell = env.shell;
	client = env.client;
});

// ─── MD5SUM tests ───────────────────────────────────────────────────────────

describe("md5sum command", () => {
	test("md5sum computes hash", async () => {
		shell.vfs.writeFile("/tmp/hash_test.txt", "hello");
		const r = await runCmd(client, "md5sum /tmp/hash_test.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("/tmp/hash_test.txt");
	});

	test("md5sum hash format", async () => {
		shell.vfs.writeFile("/tmp/hash_test2.txt", "hello");
		const r = await runCmd(client, "md5sum /tmp/hash_test2.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toMatch(/^[0-9a-f]{32}\s/);
	});

	test("md5sum missing operand", async () => {
		const r = await runCmd(client, "md5sum");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("missing file operand");
	});

	test("md5sum consistency", async () => {
		shell.vfs.writeFile("/tmp/hash_a.txt", "same");
		shell.vfs.writeFile("/tmp/hash_b.txt", "same");
		const r1 = await runCmd(client, "md5sum /tmp/hash_a.txt");
		const r2 = await runCmd(client, "md5sum /tmp/hash_b.txt");
		const hash1 = r1.stdout?.split(" ")[0];
		const hash2 = r2.stdout?.split(" ")[0];
		expect(hash1).toBe(hash2);
	});
});

// ─── SHA256SUM tests ────────────────────────────────────────────────────────

describe("sha256sum command", () => {
	test("sha256sum computes hash", async () => {
		shell.vfs.writeFile("/tmp/sha_test.txt", "hello");
		const r = await runCmd(client, "sha256sum /tmp/sha_test.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("/tmp/sha_test.txt");
	});

	test("sha256sum hash format", async () => {
		shell.vfs.writeFile("/tmp/sha_test2.txt", "hello");
		const r = await runCmd(client, "sha256sum /tmp/sha_test2.txt");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toMatch(/^[0-9a-f]{64}\s/);
	});

	test("sha256sum missing operand", async () => {
		const r = await runCmd(client, "sha256sum");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("missing file operand");
	});
});
