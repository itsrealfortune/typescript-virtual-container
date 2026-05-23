import {describe, expect, test} from "bun:test";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";
import {VirtualUserManager} from "../src/modules/VirtualUserManager";

function makeVfs() {
	return new VirtualFileSystem();
}

describe("VirtualUserManager auto sudo", () => {
	test("does not auto-add sudoers by default", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.addUser("alice", "alice-pass");
		expect(users.isSudoer("alice")).toBe(false);
	});

	test("auto-adds sudoers when explicitly enabled", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs, true);
		users.initialize();
		users.addUser("bob", "bob-pass");
		expect(users.isSudoer("bob")).toBe(true);
	});

	test("updates password for existing user", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.addUser("alice", "alice-pass");
		users.setPassword("alice", "new-pass");
		expect(users.verifyPassword("alice", "new-pass")).toBe(true);
		expect(users.verifyPassword("alice", "alice-pass")).toBe(false);
	});
});

describe("VirtualUserManager quotas", () => {
	test("enforces quota for writes inside user home", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.addUser("alice", "alice-pass");
		const startingUsage = users.getUsageBytes("alice");
		users.setQuotaBytes("alice", startingUsage + 5);
		expect(() => {
			users.assertWriteWithinQuota("alice", "/home/alice/note.txt", "hello");
		}).not.toThrow();
		vfs.writeFile("/home/alice/note.txt", "hello");
		expect(() => {
			users.assertWriteWithinQuota(
				"alice",
				"/home/alice/note.txt",
				"this exceeds the configured quota"
			);
		}).toThrow("quota exceeded for 'alice'");
	});

	test("does not enforce home quota outside user home", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.addUser("bob", "bob-pass");
		users.setQuotaBytes("bob", 1);
		expect(() => {
			users.assertWriteWithinQuota("bob", "/tmp/shared.txt", "large-content");
		}).not.toThrow();
	});

	test("clearQuota removes enforced limit", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.addUser("charlie", "charlie-pass");
		users.setQuotaBytes("charlie", 2);
		expect(users.getQuotaBytes("charlie")).toBe(2);
		users.clearQuota("charlie");
		expect(users.getQuotaBytes("charlie")).toBeNull();
		expect(() => {
			users.assertWriteWithinQuota(
				"charlie",
				"/home/charlie/file.txt",
				"long-content"
			);
		}).not.toThrow();
	});
});

describe("VirtualUserManager ensureUser", () => {
	test("ensureUser creates user with non-root uid", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.ensureUser("fox");
		const uid = users.getUid("fox");
		expect(uid).not.toBe(0);
		expect(uid).toBeGreaterThan(0);
		expect(users.listUsers()).toContain("fox");
	});

	test("ensureUser root does not create extra records", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.ensureUser("root");
		expect(users.getUid("root")).toBe(0);
	});

	test("ensureUser is idempotent", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.ensureUser("alice");
		const uid1 = users.getUid("alice");
		users.ensureUser("alice");
		const uid2 = users.getUid("alice");
		expect(uid1).toBe(uid2);
	});

	test("ensureUser creates home directory with correct ownership", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.ensureUser("fox");
		const uid = users.getUid("fox");
		expect(vfs.exists("/home/fox")).toBe(true);
		const owner = vfs.getOwner("/home/fox");
		expect(owner.uid).toBe(uid);
		expect(vfs.stat("/home/fox").mode & 0o700).toBe(0o700);
	});

	test("getUsername resolves uid to username", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.ensureUser("fox");
		const uid = users.getUid("fox");
		expect(users.getUsername(uid)).toBe("fox");
	});

	test("getUsername returns null for unknown uid", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		expect(users.getUsername(99999)).toBeNull();
	});

	test("getUsername returns root for uid 0", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		expect(users.getUsername(0)).toBe("root");
	});

	test("getGroup resolves gid to group name", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.ensureUser("fox");
		const gid = users.getGid("fox");
		expect(users.getNameByGid(gid)).toBe("fox");
	});

	test("getNameByGid returns null for unknown gid", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		expect(users.getNameByGid(99999)).toBeNull();
	});
});
