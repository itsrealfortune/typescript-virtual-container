/**
 * Example 10: Security Auditing with HoneyPot
 *
 * Demonstrates attaching HoneyPot to virtual components to log events,
 * track statistics, and detect anomalies.
 */

import { HoneyPot, VirtualShell, VirtualSshServer } from "../src";

const shell = new VirtualShell("typescript-vm");
const ssh   = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

const hp = new HoneyPot(5000);
hp.attach(shell, shell.vfs, shell.users, ssh);

const stats = hp.getStats();
console.log(`Commands: ${stats.commands}, File writes: ${stats.fileWrites}`);

for (const a of hp.detectAnomalies()) {
  console.log(`[${a.severity.toUpperCase()}] ${a.type}: ${a.message}`);
}
