/**
 * Example 05: Public-Key Authentication
 *
 * Demonstrates adding an SSH authorized key to a virtual user
 * for public-key authentication.
 */

import { VirtualShell } from "../src";

const shell = new VirtualShell("secure-vm");
await shell.ensureInitialized();
await shell.users.addUser("alice", "fallback-password");

// Simulate a public key (normally read from ~/.ssh/id_ed25519.pub)
const pubLine = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGtFeG9hbXBsZUtleUZvckRlbW9uc3RyYXRpb25Pbmx5 alice@demo";
const [_algo, b64] = pubLine.split(" ");
shell.users.addAuthorizedKey("alice", _algo, Buffer.from(b64, "base64"));

// Verify the key was added
const keys = shell.users.getAuthorizedKeys("alice");
console.log(`Alice has ${keys.length} authorized key(s)`);
console.log(`Key algo: ${keys[0].algo}`);
console.log(`Key size: ${keys[0].data.length} bytes`);

// The user can now authenticate via public key instead of password
// ssh -i ~/.ssh/id_ed25519 alice@localhost -p 2222
