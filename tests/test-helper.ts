import { VirtualShell, VirtualSshServer } from "../src";
import { SshClient } from "../src/modules/SSHClient";

/**
 * Test helper: creates a fresh shell, starts SSH server, and connects via real SSH.
 */
export async function createTestEnv(vmName = "test-shell") {
	const shell = new VirtualShell(vmName, undefined, { mode: "memory" });
	await shell.ensureInitialized();

	await shell.users.addUser("root", "root");

	const ssh = new VirtualSshServer({ port: 0, shell });
	const port = await ssh.start();

	const client = new SshClient();
	await client.connect({ host: "localhost", port, username: "root", password: "root" });

	return { shell, client, ssh, port };
}

/**
 * Helper: create a shell and SSH client bound to it (for tests that need direct shell access).
 * Starts an SSH server and connects via real SSH protocol.
 */
export async function createTestEnvWithSsh(vmName = "test-shell") {
	const shell = new VirtualShell(vmName, undefined, { mode: "memory" });
	await shell.ensureInitialized();

	const ssh = new VirtualSshServer({ port: 0, shell });
	const port = await ssh.start();

	const client = new SshClient();
	await client.connect({ host: "localhost", port, username: "root", password: "" });

	return { shell, client, ssh, port };
}

/**
 * Helper: run a single command via SshClient
 * @param client SshClient instance
 * @param cmd Command string (e.g., "ls /tmp")
 * @returns { exitCode, stdout, stderr }
 */
export async function runCmd(client: InstanceType<typeof SshClient>, cmd: string) {
	return client.exec(cmd);
}

/**
 * Helper: run a piped command
 * @param client SshClient instance
 * @param cmd Command with pipes (e.g., "echo hello | grep h")
 * @returns { exitCode, stdout, stderr }
 */
export async function runPipedCmd(client: InstanceType<typeof SshClient>, cmd: string) {
	return client.exec(cmd);
}

/**
 * Helper: create a test file in the shell
 * @param shell VirtualShell instance
 * @param path File path
 * @param content File content
 */
export function createTestFile(shell: VirtualShell, path: string, content: string) {
	shell.vfs.writeFile(path, content);
}

/**
 * Helper: create a test directory
 * @param shell VirtualShell instance
 * @param path Directory path
 */
export function createTestDir(shell: VirtualShell, path: string) {
	shell.vfs.mkdir(path);
}

/**
 * Helper: read file from shell
 * @param shell VirtualShell instance
 * @param path File path
 * @returns File content
 */
export function readTestFile(shell: VirtualShell, path: string): string {
	return shell.vfs.readFile(path);
}

/**
 * Helper: check if path exists
 * @param shell VirtualShell instance
 * @param path Path to check
 * @returns true if exists
 */
export function pathExists(shell: VirtualShell, path: string): boolean {
	return shell.vfs.exists(path);
}
