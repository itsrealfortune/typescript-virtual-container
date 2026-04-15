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

describe("VirtualUserManager quotas", () => {
	test("enforces quota for writes inside user home", async () => {
		await withTempVfs(async (vfs) => {
			const users = new VirtualUserManager(vfs, "root-pass");
			await users.initialize();
			await users.addUser("alice", "alice-pass");
			await users.setQuotaBytes("alice", 10);

			expect(() => {
				users.assertWriteWithinQuota("alice", "/home/alice/note.txt", "hello");
			}).not.toThrow();

			vfs.writeFile("/home/alice/note.txt", "hello");

			expect(() => {
				users.assertWriteWithinQuota(
					"alice",
					"/home/alice/note.txt",
					"this exceeds ten bytes",
				);
			}).toThrow("quota exceeded for 'alice'");
		});
	});

	test("does not enforce home quota outside user home", async () => {
		await withTempVfs(async (vfs) => {
			const users = new VirtualUserManager(vfs, "root-pass");
			await users.initialize();
			await users.addUser("bob", "bob-pass");
			await users.setQuotaBytes("bob", 1);

			expect(() => {
				users.assertWriteWithinQuota("bob", "/tmp/shared.txt", "large-content");
			}).not.toThrow();
		});
	});

	test("clearQuota removes enforced limit", async () => {
		await withTempVfs(async (vfs) => {
			const users = new VirtualUserManager(vfs, "root-pass");
			await users.initialize();
			await users.addUser("charlie", "charlie-pass");
			await users.setQuotaBytes("charlie", 2);

			expect(users.getQuotaBytes("charlie")).toBe(2);
			await users.clearQuota("charlie");
			expect(users.getQuotaBytes("charlie")).toBeNull();

			expect(() => {
				users.assertWriteWithinQuota(
					"charlie",
					"/home/charlie/file.txt",
					"long-content",
				);
			}).not.toThrow();
		});
	});
});
