/**
 * Example 11: Concurrent Clients
 *
 * Demonstrates running operations from multiple SshClient instances
 * in parallel against the same VirtualShell.
 */

import { SshClient, VirtualShell } from "typescript-virtual-container";

const shell   = new VirtualShell("typescript-vm");
const client1 = new SshClient(shell, "alice");
const client2 = new SshClient(shell, "bob");

const [r1, r2] = await Promise.all([
  client1.writeFile("/tmp/alice.txt", "Alice's data"),
  client2.writeFile("/tmp/bob.txt",   "Bob's data"),
]);
