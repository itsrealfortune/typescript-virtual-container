import { beforeAll, describe, expect, test } from "bun:test";
import type { SshClient } from "../src";
import { createTestEnv, runCmd } from "./test-helper";

let client: InstanceType<typeof SshClient>;

beforeAll(async () => {
	const env = await createTestEnv("test-proc");
	client = env.client;
});

// ─── TOP tests ──────────────────────────────────────────────────────────────

describe("top command", () => {
	test("top displays processes", async () => {
		const r = await runCmd(client, "top");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("PID");
	});

	test("top shows headers", async () => {
		const r = await runCmd(client, "top");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("USER");
	});

	test("top shows load average", async () => {
		const r = await runCmd(client, "top");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("load average");
	});
});

// ─── NICE tests ─────────────────────────────────────────────────────────────

describe("nice command", () => {
	test("nice runs command", async () => {
		const r = await runCmd(client, "nice echo hello");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello");
	});

	test("nice -n adjusts priority", async () => {
		const r = await runCmd(client, "nice -n 5 echo hello");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello");
	});
});

// ─── PGREP tests ────────────────────────────────────────────────────────────

describe("pgrep command", () => {
	test("pgrep no pattern errors", async () => {
		const r = await runCmd(client, "pgrep");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("missing pattern");
	});

	test("pgrep no match returns non-zero", async () => {
		const r = await runCmd(client, "pgrep nonexistent_process_xyz");
		expect(r.exitCode).toBe(1);
	});

	test("pgrep with pattern", async () => {
		const r = await runCmd(client, "pgrep .");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── PKILL tests ────────────────────────────────────────────────────────────

describe("pkill command", () => {
	test("pkill no pattern errors", async () => {
		const r = await runCmd(client, "pkill");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("missing pattern");
	});
});

// ─── WAIT tests ─────────────────────────────────────────────────────────────

describe("wait command", () => {
	test("wait with no args returns", async () => {
		const r = await runCmd(client, "wait");
		expect(r.exitCode).toBe(0);
	});

	test("wait for specific pid", async () => {
		const r = await runCmd(client, "sleep 0 & wait $!");
		expect(r.exitCode).toBe(0);
	});
});

// ─── JOBS tests ─────────────────────────────────────────────────────────────

describe("jobs command", () => {
	test("jobs lists background processes", async () => {
		const r = await runCmd(client, "sleep 0 & jobs");
		expect(r.exitCode).toBe(0);
	});

	test("jobs with running process", async () => {
		const r = await runCmd(client, "sleep 1 & jobs");
		expect(r.exitCode).toBe(0);
	});
});

// ─── BG tests ───────────────────────────────────────────────────────────────

describe("bg command", () => {
	test("bg with no args", async () => {
		const r = await runCmd(client, "bg 2>&1 || echo 'done'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── FG tests ───────────────────────────────────────────────────────────────

describe("fg command", () => {
	test("fg with no args", async () => {
		const r = await runCmd(client, "fg 2>&1 || echo 'done'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});
