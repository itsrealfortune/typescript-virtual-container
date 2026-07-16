/**
 * 22 - Groups and Accounts
 *
 * Demonstrates group management, password aging, account locking,
 * unlocking, and account expiry policies.
 */

import { VirtualShell } from "../src";

const SHELL = new VirtualShell("accounts-demo");
await SHELL.ensureInitialized();

const USERS = SHELL.users;

// ── Create users ──────────────────────────────────────────────────
console.log("--- Create users ---");
USERS.addUser("alice", "password123");
USERS.addUser("bob", "secure456");
USERS.addUser("carol", "pass789");
console.log("Users: alice, bob, carol");

// ── Groups ────────────────────────────────────────────────────────
console.log("\n--- Groups ---");
USERS.createGroup("developers", 5000);
USERS.createGroup("admins", 5001);
USERS.createGroup("interns", 5002);

USERS.addGroupMember("developers", "alice");
USERS.addGroupMember("developers", "bob");
USERS.addGroupMember("admins", "alice");
USERS.addGroupMember("interns", "carol");

console.log(`  alice groups: ${USERS.getUserAllGroups("alice").join(", ")}`);
console.log(`  bob groups: ${USERS.getUserAllGroups("bob").join(", ")}`);
console.log(`  carol groups: ${USERS.getUserAllGroups("carol").join(", ")}`);
console.log(`  alice is developer: ${USERS.isMemberOf("alice", "developers")}`);
console.log(`  alice is intern: ${USERS.isMemberOf("alice", "interns")}`);

// ── List groups ───────────────────────────────────────────────────
console.log("\n--- All groups ---");
for (const g of USERS.listGroups()) {
	console.log(
		`  ${g.name}:${g.gid} → members: ${g.members?.join(", ") ?? "none"}`
	);
}

// ── Password aging ────────────────────────────────────────────────
console.log("\n--- Password aging ---");
USERS.setPasswordAging("alice", 1, 90, 7, 30);
const AGING = USERS.getPasswordAging("alice");
if (AGING) {
	console.log(
		`  alice: min=${AGING.minAge}d, max=${AGING.maxAge}d, warn=${AGING.warnDays}d, inactive=${AGING.inactiveDays}d`
	);
}
console.log(`  alice password expired: ${USERS.isPasswordExpired("alice")}`);

// Force password change on next login
USERS.forcePasswordChange("bob");
console.log(`  bob password expired: ${USERS.isPasswordExpired("bob")}`);

// ── Account expiry ────────────────────────────────────────────────
console.log("\n--- Account expiry ---");
const NEXT_WEEK_TS = Date.now() + 7 * 24 * 60 * 60 * 1000;
USERS.setAccountExpiry("carol", NEXT_WEEK_TS);
console.log(
	`  carol expires: ${new Date(NEXT_WEEK_TS).toISOString().slice(0, 10)}`
);

// ── Account locking ───────────────────────────────────────────────
console.log("\n--- Account locking ---");
console.log(`  alice locked: ${USERS.isAccountLocked("alice")}`);
USERS.lockAccount("alice");
console.log(`  alice locked: ${USERS.isAccountLocked("alice")}`);
USERS.unlockAccount("alice");
console.log(`  alice locked: ${USERS.isAccountLocked("alice")}`);

// ── Login failure tracking ────────────────────────────────────────
console.log("\n--- Login failure tracking ---");
USERS.recordLoginFailure("bob", "10.0.0.99");
USERS.recordLoginFailure("bob", "10.0.0.99");
USERS.recordLoginFailure("bob", "10.0.0.99");
console.log(`  bob failures: ${USERS.getLoginFailures("bob")}`);
console.log(
	`  bob locked by failures: ${USERS.isAccountLockedByFailures("bob")}`
);
USERS.resetLoginFailures("bob");
console.log(`  bob failures after reset: ${USERS.getLoginFailures("bob")}`);

// ── Sudo ──────────────────────────────────────────────────────────
console.log("\n--- Sudo ---");
console.log(`  alice sudoer: ${USERS.isSudoer("alice")}`);
USERS.addSudoer("alice");
console.log(`  alice sudoer: ${USERS.isSudoer("alice")}`);

// ── Session tracking ──────────────────────────────────────────────
console.log("\n--- Active sessions ---");
USERS.registerSession("alice", "10.0.0.5");
USERS.registerSession("bob", "10.0.0.6");
console.log(`  Active sessions: ${USERS.listActiveSessions().length}`);

// ── Shadow file ───────────────────────────────────────────────────
console.log("\n--- /etc/shadow (generated) ---");
console.log(
	`${USERS.generateShadowFile().split("\n").slice(0, 3).join("\n")}\n...`
);

// ── Group file ────────────────────────────────────────────────────
console.log("\n--- /etc/group (generated) ---");
console.log(USERS.generateGroupFile());

// ── Cleanup groups ────────────────────────────────────────────────
console.log("--- Cleanup ---");
USERS.deleteGroup("interns");
console.log(`  interns exists: ${USERS.getGroup("interns") !== undefined}`);
