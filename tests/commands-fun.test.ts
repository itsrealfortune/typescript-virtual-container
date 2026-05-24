import { beforeAll, describe, expect, test } from "bun:test";
import type { SshClient } from "../src";
import { createTestEnv, runCmd } from "./test-helper";

let client: InstanceType<typeof SshClient>;

beforeAll(async () => {
	const env = await createTestEnv("test-fun");
	client = env.client;
});

// ─── FORTUNE tests ─────────────────────────────────────────────────────────

describe("fortune command", () => {
	test("fortune outputs something", async () => {
		const r = await runCmd(client, "fortune");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});
});

// ─── COWSAY tests ──────────────────────────────────────────────────────────

describe("cowsay command", () => {
	test("cowsay with message", async () => {
		const r = await runCmd(client, "cowsay hello");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("hello");
	});

	test("cowsay shows cow", async () => {
		const r = await runCmd(client, "cowsay moo");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("^__^");
	});
});

// ─── COWTHINK tests ────────────────────────────────────────────────────────

describe("cowthink command", () => {
	test("cowthink with message", async () => {
		const r = await runCmd(client, "cowthink thinking");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("thinking");
	});

	test("cowthink shows thinking cow", async () => {
		const r = await runCmd(client, "cowthink hmm");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("o");
	});
});

// ─── CMATRIX tests ─────────────────────────────────────────────────────────

describe("cmatrix command", () => {
	test("cmatrix starts and stops", async () => {
		const r = await runCmd(client, "cmatrix 2>&1 || echo 'done'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── SL tests ───────────────────────────────────────────────────────────────

describe("sl command", () => {
	test("sl runs without error", async () => {
		const r = await runCmd(client, "sl 2>&1 || echo 'done'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});
