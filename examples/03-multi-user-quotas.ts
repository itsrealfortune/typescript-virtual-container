/**
 * Example 03: Multi-User Environment with Quotas
 *
 * Demonstrates creating users, managing sudo access, setting disk quotas,
 * and verifying file permission isolation between users.
 */

import { SshClient, VirtualShell, VirtualSshServer } from "../src";

const shell = new VirtualShell("typescript-vm");
const ssh   = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

const users = ssh.getUsers()!;
await users.addUser("alice", "alice123");
await users.addUser("bob",   "bob456");
await users.removeSudoer("bob");
await users.setQuotaBytes("bob", 5 * 1024 * 1024); // 5 MB

const alice = new SshClient(shell, "alice");
await alice.writeFile("/etc/important.conf", "secret=yes");

const bob = new SshClient(shell, "bob");
const r = await bob.cat("/etc/important.conf");
console.log(r.stderr); // permission denied
