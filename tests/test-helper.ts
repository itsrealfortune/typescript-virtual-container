import { VirtualShell } from "../src";
import { SshClient } from "../src/SSHClient";

/**
 * Test helper: creates a fresh shell & client for each test
 */
export async function createTestEnv(vmName = "test-shell") {
	const shell = new VirtualShell(vmName);
	await shell.ensureInitialized();
	const client = new SshClient(shell, "root");
	return { shell, client };
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

/**
 * Helper: cleanup test environment
 * @param shell VirtualShell instance
 */
export function cleanupTestEnv(shell: VirtualShell) {
	// No cleanup needed for now, VirtualShell is ephemeral
}
