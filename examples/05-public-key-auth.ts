/**
 * 05 - Public-Key Authentication
 *
 * Demonstrates the full public-key auth flow: generating keys,
 * adding them to authorized_keys, verifying key presence,
 * and showing how the SSH server validates them.
 */

import { VirtualShell } from "../src";

const shell = new VirtualShell("secure-vm");
await shell.ensureInitialized();

// ── Create user with password fallback ────────────────────────────
console.log("--- Create user with password fallback ---");
shell.users.addUser("alice", "fallback-password");
console.log("Created user 'alice' with password fallback");

// ── Simulate SSH key pair ─────────────────────────────────────────
console.log("--- Simulate SSH key pair ---");
const pubKeyLine = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGtFeG9hbXBsZUtleUZvckRlbW9uc3RyYXRpb25Pbmx5 alice@laptop";
const [algo, b64] = pubKeyLine.split(" ") as [string, string];
const keyData = Buffer.from(b64, "base64");

// ── Add authorized key ────────────────────────────────────────────
console.log("--- Add authorized key ---");
shell.users.addAuthorizedKey("alice", algo, keyData);
console.log(`Added ${algo} key for alice (${keyData.length} bytes)`);

// ── Add second key for rotation ───────────────────────────────────
console.log("--- Add second key for rotation ---");
const key2Line = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDExampleRsaKeyForDemoPurposesOnly alice@desktop";
const [algo2, b64_2] = key2Line.split(" ") as [string, string];
shell.users.addAuthorizedKey("alice", algo2, Buffer.from(b64_2, "base64"));
console.log(`Added ${algo2} key for alice (key rotation)`);

// ── Verify key management ─────────────────────────────────────────
console.log("--- Verify key management ---");
const keys = shell.users.getAuthorizedKeys("alice");
console.log(`Alice has ${keys.length} authorized key(s):`);
for (let i = 0; i < keys.length; i++) {
	const k = keys[i]!;
	console.log(`  [${i + 1}] ${k.algo} (${k.data.length} bytes)`);
}

// ── Remove all keys ───────────────────────────────────────────────
console.log("--- Remove all keys ---");
shell.users.removeAuthorizedKeys("alice");
const remaining = shell.users.getAuthorizedKeys("alice");
console.log(`After removing all keys: ${remaining.length} key(s) remaining`);

// ── SSH server auth flow ──────────────────────────────────────────
console.log("--- SSH server auth flow ---");
console.log("1. Client connects with private key");
console.log("2. Server looks up authorized_keys for username");
console.log("3. Server verifies signature against stored public key");
console.log("4. If match -> auth:success event, session granted");
console.log("5. If no match -> falls back to password auth");
