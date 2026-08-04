/**
 * 05 - Public-Key Authentication
 *
 * Demonstrates the full public-key auth flow: generating keys,
 * adding them to authorized_keys, verifying key presence,
 * and showing how the SSH server validates them.
 */

import { VirtualShell } from "../src";

const SHELL = new VirtualShell("secure-vm");
await SHELL.ensureInitialized();

// ── Create user with password fallback ────────────────────────────
console.log("--- Create user with password fallback ---");
SHELL.users.addUser("alice", "fallback-password");
console.log("Created user 'alice' with password fallback");

// ── Simulate SSH key pair ─────────────────────────────────────────
console.log("--- Simulate SSH key pair ---");
const PUB_KEY_LINE =
	"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGtFeG9hbXBsZUtleUZvckRlbW9uc3RyYXRpb25Pbmx5 alice@laptop";
const [ALGO, B64] = PUB_KEY_LINE.split(" ") as [string, string];
const KEY_DATA = Buffer.from(B64, "base64");

// ── Add authorized key ────────────────────────────────────────────
console.log("--- Add authorized key ---");
SHELL.users.addAuthorizedKey("alice", ALGO, KEY_DATA);
console.log(`Added ${ALGO} key for alice (${KEY_DATA.length} bytes)`);

// ── Add second key for rotation ───────────────────────────────────
console.log("--- Add second key for rotation ---");
const KEY2_LINE =
	"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDExampleRsaKeyForDemoPurposesOnly alice@desktop";
const [ALGO2, B64_2] = KEY2_LINE.split(" ") as [string, string];
SHELL.users.addAuthorizedKey("alice", ALGO2, Buffer.from(B64_2, "base64"));
console.log(`Added ${ALGO2} key for alice (key rotation)`);

// ── Verify key management ─────────────────────────────────────────
console.log("--- Verify key management ---");
const KEYS = SHELL.users.getAuthorizedKeys("alice");
console.log(`Alice has ${KEYS.length} authorized key(s):`);
for (let i = 0; i < KEYS.length; i++) {
	const k = KEYS[i]!;
	console.log(`  [${i + 1}] ${k.algo} (${k.data.length} bytes)`);
}

// ── Remove all keys ───────────────────────────────────────────────
console.log("--- Remove all keys ---");
SHELL.users.removeAuthorizedKeys("alice");
const REMAINING = SHELL.users.getAuthorizedKeys("alice");
console.log(`After removing all keys: ${REMAINING.length} key(s) remaining`);

// ── SSH server auth flow ──────────────────────────────────────────
console.log("--- SSH server auth flow ---");
console.log("1. Client connects with private key");
console.log("2. Server looks up authorized_keys for username");
console.log("3. Server verifies signature against stored public key");
console.log("4. If match -> auth:success event, session granted");
console.log("5. If no match -> falls back to password auth");
