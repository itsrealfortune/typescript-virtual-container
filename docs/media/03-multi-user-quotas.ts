/**
 * 03 - Multi-User Environment with Quotas
 *
 * Demonstrates creating users, managing sudo access, setting disk quotas,
 * and verifying file permission isolation between users.
 */

import { SshClient, VirtualShell, VirtualSshServer } from "../src";

const shell = new VirtualShell("typescript-vm");
await shell.ensureInitialized();
shell.users.setPassword("root", "root");

// ── Create users ──────────────────────────────────────────────────
console.log("--- Create users ---");
shell.users.addUser("alice", "alice123");
shell.users.addUser("bob", "bob456");
console.log("Created users: alice, bob");

// ── Remove sudo from bob ──────────────────────────────────────────
console.log("--- Remove sudo from bob ---");
shell.users.removeSudoer("bob");
console.log("Removed sudo from bob");

// ── Set disk quota for bob ────────────────────────────────────────
console.log("--- Set disk quota for bob ---");
shell.users.setQuotaBytes("bob", 5 * 1024 * 1024);
console.log(`Bob's quota: ${shell.users.getQuotaBytes("bob")} bytes`);

// ── Start SSH server ──────────────────────────────────────────────
const ssh = new VirtualSshServer({ port: 0, shell });
const port = await ssh.start();

// ── Alice writes private file ─────────────────────────────────────
console.log("--- Alice writes private file ---");
const alice = new SshClient();
await alice.connect({
	host: "localhost",
	port,
	username: "alice",
	password: "alice123",
});
await alice.exec(
	"echo 'secret=yes' > /home/alice/private.conf && chmod 600 /home/alice/private.conf"
);
console.log("Alice wrote /home/alice/private.conf (mode 600)");

// ── Bob tries to read Alice's file ────────────────────────────────
console.log("--- Bob tries to read Alice's file ---");
const bob = new SshClient();
await bob.connect({
	host: "localhost",
	port,
	username: "bob",
	password: "bob456",
});
const r = await bob.cat("/home/alice/private.conf");
console.log(
	`Bob's cat result: exit ${r.exitCode}${r.stderr ? ` — "${r.stderr.trim()}"` : ""}`
);

// ── Alice can read her own file ───────────────────────────────────
console.log("--- Alice can read her own file ---");
const r2 = await alice.cat("/home/alice/private.conf");
console.log(`Alice's cat result: exit ${r2.exitCode} — "${r2.stdout!.trim()}"`);

alice.disconnect();
bob.disconnect();
ssh.stop();
