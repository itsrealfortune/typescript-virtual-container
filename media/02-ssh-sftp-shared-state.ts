/**
 * 02 - SSH + SFTP with Shared State
 *
 * Demonstrates running SSH and SFTP servers that share the same
 * VirtualShell instance, so files written via SSH are visible via SFTP.
 */

import {VirtualSftpServer as SftpMimic, VirtualShell} from "../src";

const shell = new VirtualShell("my-container");
await shell.ensureInitialized();

// ── Write file via VFS ────────────────────────────────────────────
console.log("--- Write file via VFS ---");
shell.vfs.writeFile("/shared/hello.txt", "Written via SSH");
console.log("VFS wrote /shared/hello.txt");

// ── Start SFTP server ─────────────────────────────────────────────
console.log("--- Start SFTP server ---");
const sftp = new SftpMimic({port: 0, shell});
const sftpPort = await sftp.start();
console.log(`SFTP server started on port ${sftpPort}`);

// ── Verify shared state ───────────────────────────────────────────
console.log("--- Verify shared state ---");
const content = shell.vfs.readFile("/shared/hello.txt");
console.log(`File content via shared VFS: "${content.trim()}"`);

shell.vfs.writeFile("/shared/sftp-upload.txt", "Uploaded via SFTP");
console.log("VFS wrote /shared/sftp-upload.txt");

const files = shell.vfs.list("/shared");
console.log(`Files in /shared: ${files.join(", ")}`);

// ── Stop server ───────────────────────────────────────────────────
console.log("--- Stop server ---");
sftp.stop();
console.log("SFTP server stopped");
