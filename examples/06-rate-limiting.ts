/**
 * Example 06: Rate Limiting
 *
 * Demonstrates configuring authentication rate limiting and
 * manual lockout override.
 */

import { VirtualSshServer } from "../src";

const ssh = new VirtualSshServer({
  port: 2222,
  maxAuthAttempts: 3,
  lockoutDurationMs: 300_000,
});

ssh.on("auth:lockout", ({ ip, until }) => console.warn(`${ip} locked until ${until}`));
ssh.clearLockout("192.168.1.100"); // manual override
