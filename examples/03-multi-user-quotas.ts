/**
 * 03 - Multi-User Environment with Quotas
 *
 * Demonstrates creating users, managing sudo access, setting disk quotas,
 * and verifying file permission isolation between users.
 */

import { SshClient, VirtualShell, VirtualSshServer } from "../src";

const SHELL = new VirtualShell("typescript-vm");
await SHELL.ensureInitialized();
SHELL.users.setPassword("root", "root");

// ── Create users ──────────────────────────────────────────────────
console.log("--- Create users ---");
SHELL.users.addUser("alice", "alice123");
SHELL.users.addUser("bob", "bob456");
console.log("Created users: alice, bob");

// ── Remove sudo from bob ──────────────────────────────────────────
console.log("--- Remove sudo from bob ---");
SHELL.users.removeSudoer("bob");
console.log("Removed sudo from bob");

// ── Set disk quota for bob ────────────────────────────────────────
console.log("--- Set disk quota for bob ---");
SHELL.users.setQuotaBytes("bob", 5 * 1024 * 1024);
console.log(`Bob's quota: ${SHELL.users.getQuotaBytes("bob")} bytes`);

// ── Start SSH server ──────────────────────────────────────────────
const SSH = new VirtualSshServer({ port: 0, shell: SHELL });
const PORT = await SSH.start();

// ── Alice writes private file ─────────────────────────────────────
console.log("--- Alice writes private file ---");
const ALICE = new SshClient();
await ALICE.connect({
	host: "localhost",
	port: PORT,
	username: "alice",
	password: "alice123",
});
await ALICE.exec(
	"echo 'secret=yes' > /home/alice/private.conf && chmod 600 /home/alice/private.conf"
);
console.log("Alice wrote /home/alice/private.conf (mode 600)");

// ── Bob tries to read Alice's file ────────────────────────────────
console.log("--- Bob tries to read Alice's file ---");
const BOB = new SshClient();
await BOB.connect({
	host: "localhost",
	port: PORT,
	username: "bob",
	password: "bob456",
});
const r = await BOB.cat("/home/alice/private.conf");
console.log(
	`Bob's cat result: exit ${r.exitCode}${r.stderr ? ` — "${r.stderr.trim()}"` : ""}`
);

// ── Alice can read her own file ───────────────────────────────────
console.log("--- Alice can read her own file ---");
const R2 = await ALICE.cat("/home/alice/private.conf");
console.log(`Alice's cat result: exit ${R2.exitCode} — "${R2.stdout!.trim()}"`);

ALICE.disconnect();
BOB.disconnect();
SSH.stop();
