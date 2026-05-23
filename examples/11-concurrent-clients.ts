/**
 * 11 - Concurrent Clients
 *
 * Demonstrates running operations from multiple SshClient instances
 * in parallel against the same VirtualShell, showing shared state,
 * race conditions, and concurrent file operations.
 */

import { SshClient, VirtualShell, VirtualSshServer } from "../src";

const shell = new VirtualShell("typescript-vm");
await shell.ensureInitialized();
shell.users.setPassword("root", "root");

shell.users.addUser("alice", "alice123");
shell.users.addUser("bob", "bob456");
shell.users.addUser("charlie", "charlie789");

const ssh = new VirtualSshServer({ port: 0, shell });
const port = await ssh.start();

const client1 = new SshClient();
const client2 = new SshClient();
const client3 = new SshClient();

await Promise.all([
	client1.connect({
		host: "localhost",
		port,
		username: "alice",
		password: "alice123",
	}),
	client2.connect({
		host: "localhost",
		port,
		username: "bob",
		password: "bob456",
	}),
	client3.connect({
		host: "localhost",
		port,
		username: "charlie",
		password: "charlie789",
	}),
]);

// ── Concurrent file writes ─────────────────────────────────────────
console.log("--- Concurrent file writes ---");

const [r1, r2, r3] = await Promise.all([
	client1.writeFile(
		"/tmp/alice.txt",
		`Alice's data -- written at ${Date.now()}`,
	),
	client2.writeFile("/tmp/bob.txt", `Bob's data -- written at ${Date.now()}`),
	client3.writeFile(
		"/tmp/charlie.txt",
		`Charlie's data -- written at ${Date.now()}`,
	),
]);

console.log(`Alice write: exit ${r1.exitCode}`);
console.log(`Bob write:   exit ${r2.exitCode}`);
console.log(`Charlie write: exit ${r3.exitCode}`);

// ── Concurrent reads ───────────────────────────────────────────────
console.log("\n--- Concurrent reads ---");

const [read1, read2, read3] = await Promise.all([
	client1.cat("/tmp/alice.txt"),
	client2.cat("/tmp/bob.txt"),
	client3.cat("/tmp/charlie.txt"),
]);

console.log(`Alice's file: "${read1.stdout!.trim()}"`);
console.log(`Bob's file:   "${read2.stdout!.trim()}"`);
console.log(`Charlie's file: "${read3.stdout!.trim()}"`);

// ── Cross-user file sharing ────────────────────────────────────────
console.log("\n--- Cross-user file sharing ---");

const bobReadsAlice = await client2.cat("/tmp/alice.txt");
console.log(
	`Bob reads Alice's file: exit ${bobReadsAlice.exitCode} -- "${bobReadsAlice.stdout!.trim().slice(0, 30)}..."`,
);

// ── Concurrent directory listing ───────────────────────────────────
console.log("\n--- Concurrent directory listing ---");

const [ls1, ls2, ls3] = await Promise.all([
	client1.ls("/tmp"),
	client2.ls("/tmp"),
	client3.ls("/tmp"),
]);

console.log(`Alice sees: ${ls1.stdout!.trim().split("\n").length} entries`);
console.log(`Bob sees:   ${ls2.stdout!.trim().split("\n").length} entries`);
console.log(`Charlie sees: ${ls3.stdout!.trim().split("\n").length} entries`);

// ── Concurrent command execution ───────────────────────────────────
console.log("\n--- Concurrent command execution ---");

const commands = [
	client1.exec("echo 'hello from alice'"),
	client2.exec("echo 'hello from bob'"),
	client3.exec("echo 'hello from charlie'"),
	client1.exec("hostname"),
	client2.exec("whoami"),
];

const results = await Promise.all(commands);
for (const r of results) {
	console.log(`  -> "${r.stdout!.trim()}" (exit ${r.exitCode})`);
}

client1.disconnect();
client2.disconnect();
client3.disconnect();
ssh.stop();
