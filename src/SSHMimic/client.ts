import type { CommandResult } from "../types/commands";
import { runCommand } from "../VirtualShell/commands";
import type { SshMimic } from "./index";

/**
 * Programmatic SSH client to execute shell commands as a specific user.
 *
 * Maintains connection state (cwd) across multiple command invocations.
 * All commands execute with implicit authentication (no password required).
 *
 * @example
 * ```ts
 * const ssh = new SshMimic(2222, "myhost");
 * await ssh.start();
 *
 * const client = new SshClient(ssh, "alice");
 * const result = await client.cd("/tmp");
 * const list = await client.ls();
 * ```
 */
export class SshClient {
	private currentCwd = "/";

	/**
	 * Creates SSH client bound to user.
	 *
	 * @param ssh Parent SSH server instance (must be started).
	 * @param username Login user for all commands.
	 */
	constructor(
		private ssh: SshMimic,
		private username: string,
	) {}

	/**
	 * Executes raw shell command.
	 *
	 * @param command Unparsed command line.
	 * @returns Command result with stdout/stderr/exitCode.
	 */
	async exec(command: string): Promise<CommandResult> {
		const vfs = this.ssh.getVfs();
		const users = this.ssh.getUsers();
		const hostname = this.ssh.getHostname();

		if (!vfs || !users) {
			throw new Error("SSH client not started");
		}

		const result = runCommand(
			command,
			this.username,
			hostname,
			users,
			"exec",
			this.currentCwd,
			vfs,
		);

		// Handle async results
		if (result instanceof Promise) {
			return await result;
		}

		return result;
	}

	/**
	 * Lists directory contents.
	 *
	 * @param path Target directory, defaults to cwd.
	 * @returns Result with directory listing in stdout.
	 */
	async ls(path?: string): Promise<CommandResult> {
		const target = path ?? ".";
		return this.exec(`ls ${target}`);
	}

	/**
	 * Prints current working directory.
	 *
	 * @returns Result with cwd path in stdout.
	 */
	async pwd(): Promise<CommandResult> {
		return this.exec("pwd");
	}

	/**
	 * Changes working directory.
	 *
	 * @param path Target directory path.
	 * @returns Result; updates internal cwd on success.
	 */
	async cd(path: string): Promise<CommandResult> {
		const result = await this.exec(`cd ${path}`);
		if (result.nextCwd && result.exitCode !== 1) {
			this.currentCwd = result.nextCwd;
		}
		return result;
	}

	/**
	 * Reads file content.
	 *
	 * @param path File path.
	 * @returns Result with file content in stdout.
	 */
	async cat(path: string): Promise<CommandResult> {
		return this.exec(`cat ${path}`);
	}

	/**
	 * Creates directory.
	 *
	 * @param path Directory path.
	 * @param recursive When true, create parents.
	 * @returns Result from mkdir command.
	 */
	async mkdir(path: string, recursive = false): Promise<CommandResult> {
		const flag = recursive ? "-p " : "";
		return this.exec(`mkdir ${flag}${path}`);
	}

	/**
	 * Creates file (empty).
	 *
	 * @param path File path.
	 * @returns Result from touch command.
	 */
	async touch(path: string): Promise<CommandResult> {
		return this.exec(`touch ${path}`);
	}

	/**
	 * Removes file or directory.
	 *
	 * @param path Target path.
	 * @param recursive When true, delete directory tree.
	 * @returns Result from rm command.
	 */
	async rm(path: string, recursive = false): Promise<CommandResult> {
		const flag = recursive ? "-r " : "";
		return this.exec(`rm ${flag}${path}`);
	}

	/**
	 * Writes file content.
	 *
	 * @param path Target file path.
	 * @param content Text to write.
	 * @returns Result from touch/write simulation.
	 */
	async writeFile(path: string, content: string): Promise<CommandResult> {
		const vfs = this.ssh.getVfs();
		if (!vfs) {
			throw new Error("SSH client not started");
		}

		try {
			vfs.writeFile(path, content);
			return { stdout: `File '${path}' written`, exitCode: 0 };
		} catch (error) {
			return {
				stderr: `Failed to write '${path}': ${error instanceof Error ? error.message : String(error)}`,
				exitCode: 1,
			};
		}
	}

	/**
	 * Reads file content programmatically.
	 *
	 * @param path Target file path.
	 * @returns File content as string or error in result.
	 */
	async readFile(path: string): Promise<CommandResult> {
		const vfs = this.ssh.getVfs();
		if (!vfs) {
			throw new Error("SSH client not started");
		}

		try {
			const content = vfs.readFile(path);
			return { stdout: content, exitCode: 0 };
		} catch (error) {
			return {
				stderr: `Failed to read '${path}': ${error instanceof Error ? error.message : String(error)}`,
				exitCode: 1,
			};
		}
	}

	/**
	 * Gets current working directory.
	 *
	 * @returns Normalized cwd path.
	 */
	getCwd(): string {
		return this.currentCwd;
	}

	/**
	 * Gets logged-in username.
	 *
	 * @returns Associated username.
	 */
	getUsername(): string {
		return this.username;
	}

	/**
	 * Renders tree view of directory.
	 *
	 * @param path Target directory, defaults to cwd.
	 * @returns Result with ASCII tree in stdout.
	 */
	async tree(path?: string): Promise<CommandResult> {
		const target = path ?? ".";
		return this.exec(`tree ${target}`);
	}

	/**
	 * Shows current user.
	 *
	 * @returns Result from whoami command.
	 */
	async whoami(): Promise<CommandResult> {
		return this.exec("whoami");
	}

	/**
	 * Shows hostname.
	 *
	 * @returns Result from hostname command.
	 */
	async hostname(): Promise<CommandResult> {
		return this.exec("hostname");
	}

	/**
	 * Lists active users/sessions.
	 *
	 * @returns Result from who command.
	 */
	async who(): Promise<CommandResult> {
		return this.exec("who");
	}
}
