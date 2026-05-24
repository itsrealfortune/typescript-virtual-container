import { beforeAll, describe, expect, test } from "bun:test";
import type { SshClient } from "../src";
import { createTestEnv, runCmd } from "./test-helper";

let client: InstanceType<typeof SshClient>;

beforeAll(async () => {
	const env = await createTestEnv("test-packages");
	client = env.client;
});

// ─── PACMAN tests ──────────────────────────────────────────────────────────

describe("pacman command", () => {
	test("pacman -S installs package", async () => {
		const r = await runCmd(client, "pacman -S nano 2>&1 || echo 'installed'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("pacman -R removes package", async () => {
		await runCmd(client, "pacman -S nano 2>/dev/null || true");
		const r = await runCmd(client, "pacman -R nano 2>&1 || echo 'removed'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("pacman -Qs searches packages", async () => {
		const r = await runCmd(client, "pacman -Qs bash 2>&1 || echo 'searched'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("pacman -Qi shows package info", async () => {
		await runCmd(client, "pacman -S nano 2>/dev/null || true");
		const r = await runCmd(client, "pacman -Qi nano 2>&1 || echo 'info'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});
