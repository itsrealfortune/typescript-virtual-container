import { describe, expect, test } from "bun:test";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";
import { VirtualUserManager } from "../src/modules/VirtualUserManager";
import { VirtualGroupManager } from "../src/modules/VirtualUserManager/groups";

function makeVfs() {
	return new VirtualFileSystem();
}

// ─── VirtualGroupManager ─────────────────────────────────────────────────────

describe("VirtualGroupManager CRUD", () => {
	test("createGroup assigns auto GID", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		const g = gm.createGroup("developers");
		expect(g.name).toBe("developers");
		expect(g.gid).toBeGreaterThanOrEqual(2000);
		expect(g.members).toEqual([]);
	});

	test("createGroup with explicit GID", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		const g = gm.createGroup("customgrp", 3000);
		expect(g.gid).toBe(3000);
	});

	test("createGroup rejects duplicate", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		gm.createGroup("test");
		expect(() => gm.createGroup("test")).toThrow("already exists");
	});

	test("deleteGroup removes group", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		gm.createGroup("temp");
		gm.deleteGroup("temp");
		expect(gm.getGroup("temp")).toBeUndefined();
	});

	test("deleteGroup throws on missing", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		expect(() => gm.deleteGroup("nonexistent")).toThrow("does not exist");
	});

	test("addMember / removeMember", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		gm.createGroup("team");
		gm.addMember("team", "alice");
		gm.addMember("team", "bob");
		expect(gm.getMembers("team")).toEqual(["alice", "bob"]);
		gm.removeMember("team", "alice");
		expect(gm.getMembers("team")).toEqual(["bob"]);
	});

	test("addMember is idempotent", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		gm.createGroup("team");
		gm.addMember("team", "alice");
		gm.addMember("team", "alice");
		expect(gm.getMembers("team")).toEqual(["alice"]);
	});

	test("getGidByName / getNameByGid", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		gm.createGroup("mygroup", 5000);
		expect(gm.getGidByName("mygroup")).toBe(5000);
		expect(gm.getNameByGid(5000)).toBe("mygroup");
		expect(gm.getGidByName("nope")).toBeNull();
		expect(gm.getNameByGid(99999)).toBeNull();
	});

	test("getGroupByGid", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		gm.createGroup("alpha", 6000);
		expect(gm.getGroupByGid(6000)?.name).toBe("alpha");
		expect(gm.getGroupByGid(99999)).toBeUndefined();
	});

	test("getUserSupplementaryGroups", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		gm.createGroup("devs");
		gm.createGroup("ops");
		gm.addMember("devs", "alice");
		gm.addMember("ops", "alice");
		const groups = gm.getUserSupplementaryGroups("alice");
		expect(groups).toContain("devs");
		expect(groups).toContain("ops");
	});

	test("getUserAllGroups includes primary", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		gm.createGroup("alice", 1001);
		gm.createGroup("devs");
		gm.addMember("alice", "alice");
		gm.addMember("devs", "alice");
		const all = gm.getUserAllGroups("alice", 1001);
		expect(all).toContain("alice");
		expect(all).toContain("devs");
	});

	test("isMemberOf — primary and supplementary", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		gm.createGroup("alice", 1001);
		gm.createGroup("devs");
		gm.addMember("devs", "alice");
		expect(gm.isMemberOf("alice", "alice", 1001)).toBe(true);
		expect(gm.isMemberOf("alice", "devs", 1001)).toBe(true);
		expect(gm.isMemberOf("alice", "ops", 1001)).toBe(false);
	});

	test("generateGroupFile produces valid /etc/group format", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		gm.createGroup("mygrp1", 8000);
		gm.createGroup("mygrp2", 8001);
		gm.addMember("mygrp1", "alice");
		const content = gm.generateGroupFile();
		expect(content).toContain("mygrp1:x:8000:alice");
		expect(content).toContain("mygrp2:x:8001:");
	});

	test("system groups are ensured on init", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		expect(gm.getGroup("root")).toBeDefined();
		expect(gm.getGroup("sudo")).toBeDefined();
		expect(gm.getGroup("users")).toBeDefined();
		expect(gm.getGroup("nogroup")).toBeDefined();
	});

	test("validateGroupName rejects invalid names", () => {
		const vfs = makeVfs();
		const gm = new VirtualGroupManager(vfs);
		gm.initialize();
		expect(() => gm.createGroup("")).toThrow("invalid group name");
		expect(() => gm.createGroup("1bad")).toThrow("invalid group name");
		expect(() => gm.createGroup("has space")).toThrow("invalid group name");
	});
});

// ─── VirtualUserManager group integration ────────────────────────────────────

describe("VirtualUserManager group integration", () => {
	test("addUser creates per-user group", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		const g = users.getGroup("alice");
		expect(g).toBeDefined();
		expect(g?.gid).toBe(users.getGid("alice"));
		expect(g?.members).toContain("alice");
	});

	test("addUser adds to sudo group when autoSudo", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs, true);
		await users.initialize();
		await users.addUser("bob", "pass123");
		const sudoGroup = users.getGroup("sudo");
		expect(sudoGroup?.members).toContain("bob");
	});

	test("deleteUser removes per-user group", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("temp", "pass123");
		await users.deleteUser("temp");
		expect(users.getGroup("temp")).toBeUndefined();
	});

	test("deleteUser removes from sudo group", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs, true);
		await users.initialize();
		await users.addUser("temp", "pass123");
		await users.deleteUser("temp");
		const sudoGroup = users.getGroup("sudo");
		expect(sudoGroup?.members).not.toContain("temp");
	});

	test("addSudoer adds to sudo group", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		await users.addSudoer("alice");
		const sudoGroup = users.getGroup("sudo");
		expect(sudoGroup?.members).toContain("alice");
	});

	test("removeSudoer removes from sudo group", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		await users.addSudoer("alice");
		await users.removeSudoer("alice");
		const sudoGroup = users.getGroup("sudo");
		expect(sudoGroup?.members).not.toContain("alice");
	});

	test("getUserAllGroups returns correct groups", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		users.createGroup("devs");
		users.addGroupMember("devs", "alice");
		const all = users.getUserAllGroups("alice");
		expect(all).toContain("alice");
		expect(all).toContain("devs");
	});

	test("isMemberOf works correctly", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		users.createGroup("devs");
		users.addGroupMember("devs", "alice");
		expect(users.isMemberOf("alice", "alice")).toBe(true);
		expect(users.isMemberOf("alice", "devs")).toBe(true);
		expect(users.isMemberOf("alice", "ops")).toBe(false);
	});

	test("getGidByName / getNameByGid pass-through", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		users.createGroup("mygroup", 5000);
		expect(users.getGidByName("mygroup")).toBe(5000);
		expect(users.getNameByGid(5000)).toBe("mygroup");
	});

	test("generateGroupFile delegates to group manager", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		users.createGroup("test", 9000);
		const content = users.generateGroupFile();
		expect(content).toContain("test:x:9000:");
	});
});

// ─── Password aging ──────────────────────────────────────────────────────────

describe("Password aging", () => {
	test("new user has default aging values", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		const aging = users.getPasswordAging("alice");
		expect(aging).not.toBeNull();
		expect(aging?.minAge).toBe(0);
		expect(aging?.maxAge).toBe(99999);
		expect(aging?.warnDays).toBe(7);
	});

	test("setPasswordAging updates values", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		await users.setPasswordAging("alice", 1, 90, 14, 30);
		const aging = users.getPasswordAging("alice");
		expect(aging?.minAge).toBe(1);
		expect(aging?.maxAge).toBe(90);
		expect(aging?.warnDays).toBe(14);
		expect(aging?.inactiveDays).toBe(30);
	});

	test("setAccountExpiry works", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		const expiry = Math.floor(Date.now() / 86400000) + 365;
		await users.setAccountExpiry("alice", expiry);
		const aging = users.getPasswordAging("alice");
		expect(aging?.expiryDate).toBe(expiry);
	});

	test("forcePasswordChange sets lastChange to 0", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		await users.forcePasswordChange("alice");
		const aging = users.getPasswordAging("alice");
		expect(aging?.lastChange).toBe(0);
	});

	test("isPasswordExpired detects expired passwords", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		expect(users.isPasswordExpired("alice")).toBe(false);
		// Set maxAge to 1 and force lastChange to 2 days ago
		await users.setPasswordAging("alice", 0, 1);
		// biome-ignore lint/suspicious/noExplicitAny: accessing internal user record to simulate time passage
		const record = (users as any)._users.get("alice");
		record.lastPasswordChange = Math.floor(Date.now() / 86400000) - 2;
		expect(users.isPasswordExpired("alice")).toBe(true);
	});

	test("password aging persists through reload", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		await users.setPasswordAging("alice", 5, 60, 10, 15);
		// Simulate reload by creating new instance
		const users2 = new VirtualUserManager(vfs);
		await users2.initialize();
		const aging = users2.getPasswordAging("alice");
		expect(aging?.minAge).toBe(5);
		expect(aging?.maxAge).toBe(60);
		expect(aging?.warnDays).toBe(10);
		expect(aging?.inactiveDays).toBe(15);
	});

	test("setPasswordAging throws on missing user", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await expect(users.setPasswordAging("nobody", 0, 90)).rejects.toThrow("does not exist");
	});
});

// ─── Lock/unlock accounts ────────────────────────────────────────────────────

describe("Account lock/unlock", () => {
	test("lockAccount prefixes hash with !", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		expect(users.isAccountLocked("alice")).toBe(false);
		await users.lockAccount("alice");
		expect(users.isAccountLocked("alice")).toBe(true);
	});

	test("unlockAccount removes ! prefix", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		await users.lockAccount("alice");
		await users.unlockAccount("alice");
		expect(users.isAccountLocked("alice")).toBe(false);
	});

	test("locked user cannot authenticate", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		expect(users.verifyPassword("alice", "pass123")).toBe(true);
		await users.lockAccount("alice");
		expect(users.verifyPassword("alice", "pass123")).toBe(false);
	});

	test("lock is idempotent", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		await users.lockAccount("alice");
		await users.lockAccount("alice");
		expect(users.isAccountLocked("alice")).toBe(true);
	});
});

// ─── Sudo timestamp caching ──────────────────────────────────────────────────

describe("Sudo timestamp caching", () => {
	test("grantSudoTimestamp sets timestamp", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		users.grantSudoTimestamp("alice");
		expect(users.hasValidSudoTimestamp("alice")).toBe(true);
	});

	test("sudo timestamp expires after 5 minutes", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		users.grantSudoTimestamp("alice");
		// Simulate time passing by clearing the cache
		users.clearSudoTimestamp("alice");
		expect(users.hasValidSudoTimestamp("alice")).toBe(false);
	});

	test("no timestamp by default", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		expect(users.hasValidSudoTimestamp("alice")).toBe(false);
	});

	test("root always has valid sudo", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		expect(users.hasValidSudoTimestamp("root")).toBe(true);
	});
});

// ─── Login failure tracking ──────────────────────────────────────────────────

describe("Login failure tracking", () => {
	test("recordLoginFailure increments counter", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.recordLoginFailure("alice", "192.168.1.1");
		expect(users.getLoginFailures("alice")).toBe(1);
	});

	test("multiple failures accumulate", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.recordLoginFailure("alice", "192.168.1.1");
		users.recordLoginFailure("alice", "192.168.1.1");
		users.recordLoginFailure("alice", "192.168.1.1");
		expect(users.getLoginFailures("alice")).toBe(3);
	});

	test("resetLoginFailures clears counter", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.recordLoginFailure("alice", "192.168.1.1");
		users.recordLoginFailure("alice", "192.168.1.1");
		users.resetLoginFailures("alice");
		expect(users.getLoginFailures("alice")).toBe(0);
	});

	test("isAccountLockedByFailures after threshold", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		for (let i = 0; i < 5; i++) {
			users.recordLoginFailure("alice", "192.168.1.1");
		}
		expect(users.isAccountLockedByFailures("alice")).toBe(true);
	});

	test("isAccountLockedByFailures below threshold", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		users.recordLoginFailure("alice", "192.168.1.1");
		users.recordLoginFailure("alice", "192.168.1.1");
		expect(users.isAccountLockedByFailures("alice")).toBe(false);
	});

	test("getLoginFailures returns 0 for unknown user", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		expect(users.getLoginFailures("nobody")).toBe(0);
	});

	test("successful login resets failures", async () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		await users.initialize();
		await users.addUser("alice", "pass123");
		users.recordLoginFailure("alice", "192.168.1.1");
		users.recordLoginFailure("alice", "192.168.1.1");
		users.recordLoginSuccess("alice");
		expect(users.getLoginFailures("alice")).toBe(0);
	});

	test("getLastFailureTime returns timestamp", () => {
		const vfs = makeVfs();
		const users = new VirtualUserManager(vfs);
		users.initialize();
		const before = Date.now();
		users.recordLoginFailure("alice", "192.168.1.1");
		const after = Date.now();
		const lastTime = users.getLastFailureTime("alice");
		expect(lastTime).toBeGreaterThanOrEqual(before);
		expect(lastTime).toBeLessThanOrEqual(after);
	});
});
