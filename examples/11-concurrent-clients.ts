/**
 * 11 - Concurrent Clients
 *
 * Demonstrates running operations from multiple SshClient instances
 * in parallel against the same VirtualShell, showing shared state,
 * race conditions, and concurrent file operations.
 */

import { SshClient, VirtualShell, VirtualSshServer } from "../src";

const SHELL = new VirtualShell("typescript-vm");
await SHELL.ensureInitialized();
SHELL.users.setPassword("root", "root");

SHELL.users.addUser("alice", "alice123");
SHELL.users.addUser("bob", "bob456");
SHELL.users.addUser("charlie", "charlie789");

const SSH = new VirtualSshServer({ port: 0, shell: SHELL });
const PORT = await SSH.start();

const CLIENT1 = new SshClient();
const CLIENT2 = new SshClient();
const CLIENT3 = new SshClient();

await Promise.all([
	CLIENT1.connect({
		host: "localhost",
		port: PORT,
		username: "alice",
		password: "alice123",
	}),
	CLIENT2.connect({
		host: "localhost",
		port: PORT,
		username: "bob",
		password: "bob456",
	}),
	CLIENT3.connect({
		host: "localhost",
		port: PORT,
		username: "charlie",
		password: "charlie789",
	}),
]);

// ── Concurrent file writes ─────────────────────────────────────────
console.log("--- Concurrent file writes ---");

const [R1, R2, R3] = await Promise.all([
	CLIENT1.writeFile(
		"/tmp/alice.txt",
		`Alice's data -- written at ${Date.now()}`
	),
	CLIENT2.writeFile("/tmp/bob.txt", `Bob's data -- written at ${Date.now()}`),
	CLIENT3.writeFile(
		"/tmp/charlie.txt",
		`Charlie's data -- written at ${Date.now()}`
	),
]);

console.log(`Alice write: exit ${R1.exitCode}`);
console.log(`Bob write:   exit ${R2.exitCode}`);
console.log(`Charlie write: exit ${R3.exitCode}`);

// ── Concurrent reads ───────────────────────────────────────────────
console.log("\n--- Concurrent reads ---");

const [READ1, READ2, READ3] = await Promise.all([
	CLIENT1.cat("/tmp/alice.txt"),
	CLIENT2.cat("/tmp/bob.txt"),
	CLIENT3.cat("/tmp/charlie.txt"),
]);

console.log(`Alice's file: "${READ1.stdout!.trim()}"`);
console.log(`Bob's file:   "${READ2.stdout!.trim()}"`);
console.log(`Charlie's file: "${READ3.stdout!.trim()}"`);

// ── Cross-user file sharing ────────────────────────────────────────
console.log("\n--- Cross-user file sharing ---");

const BOB_READS_ALICE = await CLIENT2.cat("/tmp/alice.txt");
console.log(
	`Bob reads Alice's file: exit ${BOB_READS_ALICE.exitCode} -- "${BOB_READS_ALICE.stdout!.trim().slice(0, 30)}..."`
);

// ── Concurrent directory listing ───────────────────────────────────
console.log("\n--- Concurrent directory listing ---");

const [LS1, LS2, LS3] = await Promise.all([
	CLIENT1.ls("/tmp"),
	CLIENT2.ls("/tmp"),
	CLIENT3.ls("/tmp"),
]);

console.log(`Alice sees: ${LS1.stdout!.trim().split("\n").length} entries`);
console.log(`Bob sees:   ${LS2.stdout!.trim().split("\n").length} entries`);
console.log(`Charlie sees: ${LS3.stdout!.trim().split("\n").length} entries`);

// ── Concurrent command execution ───────────────────────────────────
console.log("\n--- Concurrent command execution ---");

const COMMANDS = [
	CLIENT1.exec("echo 'hello from alice'"),
	CLIENT2.exec("echo 'hello from bob'"),
	CLIENT3.exec("echo 'hello from charlie'"),
	CLIENT1.exec("hostname"),
	CLIENT2.exec("whoami"),
];

const RESULTS = await Promise.all(COMMANDS);
for (const r of RESULTS) {
	console.log(`  -> "${r.stdout!.trim()}" (exit ${r.exitCode})`);
}

CLIENT1.disconnect();
CLIENT2.disconnect();
CLIENT3.disconnect();
SSH.stop();
