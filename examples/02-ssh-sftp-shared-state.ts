/**
 * 02 - SSH + SFTP with Shared State
 *
 * Demonstrates running SSH and SFTP servers that share the same
 * VirtualShell instance, so files written via SSH are visible via SFTP.
 */

import { VirtualSftpServer as SftpMimic, VirtualShell } from "../src";

const SHELL = new VirtualShell("my-container");
await SHELL.ensureInitialized();

// ── Write file via VFS ────────────────────────────────────────────
console.log("--- Write file via VFS ---");
SHELL.vfs.writeFile("/shared/hello.txt", "Written via SSH");
console.log("VFS wrote /shared/hello.txt");

// ── Start SFTP server ─────────────────────────────────────────────
console.log("--- Start SFTP server ---");
const SFTP = new SftpMimic({ port: 0, shell: SHELL });
const SFTP_PORT = await SFTP.start();
console.log(`SFTP server started on port ${SFTP_PORT}`);

// ── Verify shared state ───────────────────────────────────────────
console.log("--- Verify shared state ---");
const CONTENT = SHELL.vfs.readFile("/shared/hello.txt");
console.log(`File content via shared VFS: "${CONTENT.trim()}"`);

SHELL.vfs.writeFile("/shared/sftp-upload.txt", "Uploaded via SFTP");
console.log("VFS wrote /shared/sftp-upload.txt");

const FILES = SHELL.vfs.list("/shared");
console.log(`Files in /shared: ${FILES.join(", ")}`);

// ── Stop server ───────────────────────────────────────────────────
console.log("--- Stop server ---");
SFTP.stop();
console.log("SFTP server stopped");
