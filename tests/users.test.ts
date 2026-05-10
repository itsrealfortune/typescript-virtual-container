import { describe, expect, test } from "bun:test";
import VirtualFileSystem from "../src/VirtualFileSystem";
import { VirtualUserManager } from "../src/VirtualUserManager";

function makeVfs() {
	return new VirtualFileSystem();
}

describe("VirtualUserManager auto sudo", () => {
	test("adds new users to sudoers by default", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "alice-pass");
		expect(users.isSudoer("alice")).toBe(true);
	});

	test("does not auto-add sudoers when disabled", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs, false);
		await users.initialize();
		await users.addUser("bob", "bob-pass");
		expect(users.isSudoer("bob")).toBe(false);
	});

	test("updates password for existing user", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "alice-pass");
		await users.setPassword("alice", "new-pass");
		expect(users.verifyPassword("alice", "new-pass")).toBe(true);
		expect(users.verifyPassword("alice", "alice-pass")).toBe(false);
	});
});

describe("VirtualUserManager quotas", () => {
	test("enforces quota for writes inside user home", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "alice-pass");
		const startingUsage = users.getUsageBytes("alice");
		await users.setQuotaBytes("alice", startingUsage + 5);
		expect(() => {
			users.assertWriteWithinQuota("alice", "/home/alice/note.txt", "hello");
		}).not.toThrow();
		vfs.writeFile("/home/alice/note.txt", "hello");
		expect(() => {
			users.assertWriteWithinQuota(
				"alice",
				"/home/alice/note.txt",
				"this exceeds the configured quota",
			);
		}).toThrow("quota exceeded for 'alice'");
	});

	test("does not enforce home quota outside user home", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("bob", "bob-pass");
		await users.setQuotaBytes("bob", 1);
		expect(() => {
			users.assertWriteWithinQuota("bob", "/tmp/shared.txt", "large-content");
		}).not.toThrow();
	});

	test("clearQuota removes enforced limit", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
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
