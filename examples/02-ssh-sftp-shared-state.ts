/**
 * Example 02: SSH + SFTP with Shared State
 *
 * Demonstrates running SSH and SFTP servers that share the same
 * VirtualShell instance, so files written via SSH are visible via SFTP.
 */

import { VirtualSftpServer, VirtualShell, VirtualSshServer } from "../src";

const shell = new VirtualShell("my-container");
const ssh   = new VirtualSshServer({ port: 2222, shell });
const sftp  = new VirtualSftpServer({ port: 2223, shell });

await ssh.start();
await sftp.start();
