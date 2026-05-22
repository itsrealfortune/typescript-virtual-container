/**
 * Example 03: Multi-User Environment with Quotas
 *
 * Demonstrates creating users, managing sudo access, setting disk quotas,
 * and verifying file permission isolation between users.
 */

import { SshClient, VirtualShell } from "../src";

const shell = new VirtualShell("typescript-vm");
await shell.ensureInitialized();

// Create users
await shell.users.addUser("alice", "alice123");
await shell.users.addUser("bob", "bob456");
console.log("Created users: alice, bob");

// Remove sudo from bob
await shell.users.removeSudoer("bob");
console.log("Removed sudo from bob");

// Set disk quota for bob (5 MB)
await shell.users.setQuotaBytes("bob", 5 * 1024 * 1024);
console.log(`Bob's quota: ${shell.users.getQuotaBytes("bob")} bytes`);

// Alice writes a file with restrictive permissions (owner-only)
const alice = new SshClient(shell, "alice");
await alice.exec("echo 'secret=yes' > /home/alice/private.conf && chmod 600 /home/alice/private.conf");
console.log("Alice wrote /home/alice/private.conf (mode 600)");

// Bob tries to read it
const bob = new SshClient(shell, "bob");
const r = await bob.cat("/home/alice/private.conf");
console.log(`Bob's cat result: exit ${r.exitCode}${r.stderr ? ` — "${r.stderr.trim()}"` : ""}`);

// Alice can read her own file
const r2 = await alice.cat("/home/alice/private.conf");
console.log(`Alice's cat result: exit ${r2.exitCode} — "${r2.stdout!.trim()}"`);
