/**
 * Example 05: Public-Key Authentication
 *
 * Demonstrates adding an SSH authorized key to a virtual user
 * for public-key authentication.
 */

import { readFileSync } from "node:fs";
import { VirtualShell, VirtualSshServer } from "../src";

const shell = new VirtualShell("secure-vm");
await shell.ensureInitialized();
await shell.users.addUser("alice", "fallback-password");

const pubLine = readFileSync(`${process.env.HOME}/.ssh/id_ed25519.pub`, "utf8").trim();
const [algo, b64] = pubLine.split(" ");
shell.users.addAuthorizedKey("alice", algo, Buffer.from(b64, "base64"));

const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();
// ssh -i ~/.ssh/id_ed25519 alice@localhost -p 2222
