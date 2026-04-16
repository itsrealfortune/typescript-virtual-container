import { runCommand } from "../commands";
import type { CommandResult } from "../types/commands";
import type { PerfLogger } from "../utils/perfLogger";
import { createPerfLogger } from "../utils/perfLogger";
import type { VirtualShell } from "../VirtualShell";

/**
 * Programmatic client for executing shell commands against a virtual shell.
 *
 * Maintains working-directory state across invocations and runs commands as a
 * single authenticated user without SSH transport overhead.
 *
 * @example
 * ```ts
 * const shell = new VirtualShell("typescript-vm");
 * const client = new SshClient(shell, "alice");
 * const result = await client.cd("/tmp");
 * const list = await client.ls();
 * ```
 */
const perf: PerfLogger = createPerfLogger("SshClient");

export class SshClient {
	private currentCwd = "/";

	/**
	 * Creates a programmatic client bound to a virtual shell and user.
	 *
	 * @param shell Parent virtual shell instance.
	 * @param username Login user for all commands.
	 */
	constructor(
		private shell: VirtualShell,
		private username: string,
	) {
		perf.mark("constructor");
	}

	/**
	 * Executes raw shell command.
	 *
	 * @param command Unparsed command line.
	 * @returns Command result with stdout/stderr/exitCode.
	 */
	async exec(command: string): Promise<CommandResult> {
		perf.mark("exec");
		const vfs = this.shell.getVfs();
		const users = this.shell.getUsers();
		const hostname = this.shell.getHostname();

		if (!vfs || !users) {
			throw new Error("SSH client not started");
		}

		const result = runCommand(
			command,
			this.username,
			hostname,
			"exec",
			this.currentCwd,
			this.shell,
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
		perf.mark("ls");
		const target = path ?? ".";
		return this.exec(`ls ${target}`);
	}

	/**
	 * Prints current working directory.
	 *
	 * @returns Result with cwd path in stdout.
	 */
	async pwd(): Promise<CommandResult> {
		perf.mark("pwd");
		return this.exec("pwd");
	}

	/**
	 * Changes working directory.
	 *
	 * @param path Target directory path.
	 * @returns Result; updates internal cwd on success.
	 */
	async cd(path: string): Promise<CommandResult> {
		perf.mark("cd");
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
		perf.mark("cat");
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
		perf.mark("mkdir");
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
		perf.mark("touch");
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
		perf.mark("rm");
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
		perf.mark("writeFile");
		const vfs = this.shell.getVfs();
		if (!vfs) {
			throw new Error("SSH client not started");
		}

		try {
			this.shell.writeFileAsUser(this.username, path, content);
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
		perf.mark("readFile");
		const vfs = this.shell.getVfs();
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
		perf.mark("getCwd");
		return this.currentCwd;
	}

	/**
	 * Gets logged-in username.
	 *
	 * @returns Associated username.
	 */
	getUsername(): string {
		perf.mark("getUsername");
		return this.username;
	}

	/**
	 * Renders tree view of directory.
	 *
	 * @param path Target directory, defaults to cwd.
	 * @returns Result with ASCII tree in stdout.
	 */
	async tree(path?: string): Promise<CommandResult> {
		perf.mark("tree");
		const target = path ?? ".";
		return this.exec(`tree ${target}`);
	}

	/**
	 * Shows current user.
	 *
	 * @returns Result from whoami command.
	 */
	async whoami(): Promise<CommandResult> {
		perf.mark("whoami");
		return this.exec("whoami");
	}

	/**
	 * Shows hostname.
	 *
	 * @returns Result from hostname command.
	 */
	async hostname(): Promise<CommandResult> {
		perf.mark("hostname");
		return this.exec("hostname");
	}

	/**
	 * Lists active users/sessions.
	 *
	 * @returns Result from who command.
	 */
	async who(): Promise<CommandResult> {
		perf.mark("who");
		return this.exec("who");
	}
}
