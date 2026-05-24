/**
 * 22 - Groups and Accounts
 *
 * Demonstrates group management, password aging, account locking,
 * unlocking, and account expiry policies.
 */

import { VirtualShell } from "../src";

const shell = new VirtualShell("accounts-demo");
await shell.ensureInitialized();

const users = shell.users;

// ── Create users ──────────────────────────────────────────────────
console.log("--- Create users ---");
users.addUser("alice", "password123");
users.addUser("bob", "secure456");
users.addUser("carol", "pass789");
console.log("Users: alice, bob, carol");

// ── Groups ────────────────────────────────────────────────────────
console.log("\n--- Groups ---");
users.createGroup("developers", 5000);
users.createGroup("admins", 5001);
users.createGroup("interns", 5002);

users.addGroupMember("developers", "alice");
users.addGroupMember("developers", "bob");
users.addGroupMember("admins", "alice");
users.addGroupMember("interns", "carol");

console.log(`  alice groups: ${users.getUserAllGroups("alice").join(", ")}`);
console.log(`  bob groups: ${users.getUserAllGroups("bob").join(", ")}`);
console.log(`  carol groups: ${users.getUserAllGroups("carol").join(", ")}`);
console.log(`  alice is developer: ${users.isMemberOf("alice", "developers")}`);
console.log(`  alice is intern: ${users.isMemberOf("alice", "interns")}`);

// ── List groups ───────────────────────────────────────────────────
console.log("\n--- All groups ---");
for (const g of users.listGroups()) {
	console.log(
		`  ${g.name}:${g.gid} → members: ${g.members?.join(", ") ?? "none"}`
	);
}

// ── Password aging ────────────────────────────────────────────────
console.log("\n--- Password aging ---");
users.setPasswordAging("alice", 1, 90, 7, 30);
const aging = users.getPasswordAging("alice");
if (aging) {
	console.log(
		`  alice: min=${aging.minAge}d, max=${aging.maxAge}d, warn=${aging.warnDays}d, inactive=${aging.inactiveDays}d`
	);
}
console.log(`  alice password expired: ${users.isPasswordExpired("alice")}`);

// Force password change on next login
users.forcePasswordChange("bob");
console.log(`  bob password expired: ${users.isPasswordExpired("bob")}`);

// ── Account expiry ────────────────────────────────────────────────
console.log("\n--- Account expiry ---");
const nextWeekTs = Date.now() + 7 * 24 * 60 * 60 * 1000;
users.setAccountExpiry("carol", nextWeekTs);
console.log(
	`  carol expires: ${new Date(nextWeekTs).toISOString().slice(0, 10)}`
);

// ── Account locking ───────────────────────────────────────────────
console.log("\n--- Account locking ---");
console.log(`  alice locked: ${users.isAccountLocked("alice")}`);
users.lockAccount("alice");
console.log(`  alice locked: ${users.isAccountLocked("alice")}`);
users.unlockAccount("alice");
console.log(`  alice locked: ${users.isAccountLocked("alice")}`);

// ── Login failure tracking ────────────────────────────────────────
console.log("\n--- Login failure tracking ---");
users.recordLoginFailure("bob", "10.0.0.99");
users.recordLoginFailure("bob", "10.0.0.99");
users.recordLoginFailure("bob", "10.0.0.99");
console.log(`  bob failures: ${users.getLoginFailures("bob")}`);
console.log(
	`  bob locked by failures: ${users.isAccountLockedByFailures("bob")}`
);
users.resetLoginFailures("bob");
console.log(`  bob failures after reset: ${users.getLoginFailures("bob")}`);

// ── Sudo ──────────────────────────────────────────────────────────
console.log("\n--- Sudo ---");
console.log(`  alice sudoer: ${users.isSudoer("alice")}`);
users.addSudoer("alice");
console.log(`  alice sudoer: ${users.isSudoer("alice")}`);

// ── Session tracking ──────────────────────────────────────────────
console.log("\n--- Active sessions ---");
users.registerSession("alice", "10.0.0.5");
users.registerSession("bob", "10.0.0.6");
console.log(`  Active sessions: ${users.listActiveSessions().length}`);

// ── Shadow file ───────────────────────────────────────────────────
console.log("\n--- /etc/shadow (generated) ---");
console.log(
	`${users.generateShadowFile().split("\n").slice(0, 3).join("\n")}\n...`
);

// ── Group file ────────────────────────────────────────────────────
console.log("\n--- /etc/group (generated) ---");
console.log(users.generateGroupFile());

// ── Cleanup groups ────────────────────────────────────────────────
console.log("--- Cleanup ---");
users.deleteGroup("interns");
console.log(`  interns exists: ${users.getGroup("interns") !== undefined}`);
