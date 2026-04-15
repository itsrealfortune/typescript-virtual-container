import { describe, expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { VirtualUserManager } from "../src/SSHMimic/users";
import VirtualFileSystem from "../src/VirtualFileSystem";
import { defaultShellProperties } from "../src/VirtualShell";
import { getCommandNames, runCommand } from "../src/VirtualShell/commands";

async function withShellContext(
	run: (
		vfs: VirtualFileSystem,
		users: VirtualUserManager,
	) => Promise<void>,
): Promise<void> {
	const tempDir = await mkdtemp(join(tmpdir(), "virtual-env-js-node-npm-test-"));
	try {
		const vfs = new VirtualFileSystem(tempDir);
		await vfs.restoreMirror();
		const users = new VirtualUserManager(vfs, "root-pass");
		await users.initialize();
		await run(vfs, users);
	} finally {
		await rm(tempDir, { recursive: true, force: true });
	}
}

describe("node and npm commands", () => {
	test("are registered in the shell", () => {
		const commandNames = getCommandNames();

		expect(commandNames).toContain("node");
		expect(commandNames).toContain("npm");
	});

	test("run host node version output", async () => {
		await withShellContext(async (vfs, users) => {
			const result = await Promise.resolve(
				runCommand(
					"node -v",
					"root",
					"localhost",
					users,
					"shell",
					"/home/root",
					defaultShellProperties,
					vfs,
				),
			);

			expect(result.exitCode).toBe(0);
			expect(result.stdout?.trim()).toMatch(/^v\d+\.\d+\.\d+/);
		});
	});

	test("run host npm version output", async () => {
		await withShellContext(async (vfs, users) => {
			const result = await Promise.resolve(
				runCommand(
					"npm -v",
					"root",
					"localhost",
					users,
					"shell",
					"/home/root",
					defaultShellProperties,
					vfs,
				),
			);

			expect(result.exitCode).toBe(0);
			expect(result.stdout?.trim()).toMatch(/^\d+\.\d+\.\d+/);
		});
	});
});
