/**
 * Example 02: SSH + SFTP with Shared State
 *
 * Demonstrates running SSH and SFTP servers that share the same
 * VirtualShell instance, so files written via SSH are visible via SFTP.
 */

import { VirtualSftpServer as SftpMimic, VirtualShell } from "../src";

const shell = new VirtualShell("my-container");
await shell.ensureInitialized();

// Create a file via the VFS (simulating SSH write)
shell.vfs.writeFile("/shared/hello.txt", "Written via SSH");
console.log("File written via VFS: /shared/hello.txt");

// Start SFTP server sharing the same shell
const sftp = new SftpMimic({ port: 0, shell });
const sftpPort = await sftp.start();
console.log(`SFTP server started on port ${sftpPort}`);

// Verify the file is visible through the shared VFS
const content = shell.vfs.readFile("/shared/hello.txt");
console.log(`File content via shared VFS: "${content.trim()}"`);

// Write via SFTP's shared VFS
shell.vfs.writeFile("/shared/sftp-upload.txt", "Uploaded via SFTP");
console.log("File written via SFTP: /shared/sftp-upload.txt");

// Both files are visible in the same filesystem
const files = shell.vfs.list("/shared");
console.log(`Files in /shared: ${files.join(", ")}`);

sftp.stop();
console.log("SFTP server stopped");
