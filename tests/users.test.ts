import { describe, expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import VirtualFileSystem from "../src/VirtualFileSystem";
import { VirtualUserManager } from "../src/VirtualUserManager";

async function withTempVfs(
	run: (vfs: VirtualFileSystem) => Promise<void>,
): Promise<void> {
	const tempDir = await mkdtemp(join(tmpdir(), "virtual-env-js-test-"));
	try {
		const vfs = new VirtualFileSystem(tempDir);
		await vfs.restoreMirror();
		await run(vfs);
	} finally {
		await rm(tempDir, { recursive: true, force: true });
	}
}

describe("VirtualUserManager auto sudo", () => {
	test("adds new users to sudoers by default", async () => {
		await withTempVfs(async (vfs) => {
			const users = new VirtualUserManager(vfs, "root-pass");
			await users.initialize();
			await users.addUser("alice", "alice-pass");

			expect(users.isSudoer("alice")).toBe(true);
		});
	});

	test("does not auto-add sudoers when disabled", async () => {
		await withTempVfs(async (vfs) => {
			const users = new VirtualUserManager(vfs, "root-pass", false);
			await users.initialize();
			await users.addUser("bob", "bob-pass");

			expect(users.isSudoer("bob")).toBe(false);
		});
	});
});
