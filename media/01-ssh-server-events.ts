/**
 * Example 01: SSH Server with Events
 *
 * Demonstrates starting an SSH server and listening for authentication
 * and lockout events.
 */

import { VirtualSshServer } from "typescript-virtual-container";

const ssh = new VirtualSshServer({ port: 2222, hostname: "lab-environment" });

ssh.on("auth:success", ({ username, remoteAddress }) => {
  console.log(`[SSH] ${username} from ${remoteAddress}`);
});

ssh.on("auth:lockout", ({ ip, until }) => {
  console.warn(`[SSH] ${ip} locked until ${until}`);
});

await ssh.start();

process.on("SIGINT", () => {
  ssh.stop();
  process.exit(0);
});
