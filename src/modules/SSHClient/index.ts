/**
 * SSHClient — real SSH client for executing commands against a VirtualSshServer.
 *
 * Connects over TCP using the SSH protocol via ssh2. Maintains working-directory
 * state across invocations by tracking cwd changes from command output.
 *
 * @example
 * ```ts
 * const client = new SshClient();
 * await client.connect({ host: "localhost", port: 2222, username: "alice", password: "secret" });
 * await client.cd("/tmp");
 * const list = await client.ls();
 * await client.disconnect();
 * ```
 */
import type { ClientChannel, ConnectConfig } from "ssh2";
import { Client } from "ssh2";
import type { CommandResult } from "../../types/commands";
import { type PerfLogger, createPerfLogger } from "../../utils/perfLogger";

const perf: PerfLogger = createPerfLogger("SshClient");

export interface SshClientConnectOptions {
	host?: string;
	port?: number;
	username: string;
	password?: string;
	privateKey?: Buffer | string;
	passphrase?: Buffer | string;
	readyTimeout?: number;
}

/**
 * Real SSH client wrapping ssh2.Client.
 * Provides typed methods (exec, ls, cat, mkdir, etc.) over a real SSH connection.
 *
 * @see {@link VirtualSshServer}
 */
export class SshClient {
	private _client: Client;
	private _currentCwd = "/";
	private _username = "";
	private _connected = false;

	constructor() {
		perf.mark("constructor");
		this._client = new Client();
	}

	/**
	 * Connects to an SSH server.
	 *
	 * @param options Connection parameters.
	 * @returns Promise resolved when authenticated.
	 */
	async connect(options: SshClientConnectOptions): Promise<void> {
		perf.mark("connect");
		const config: ConnectConfig = {
			host: options.host ?? "localhost",
			port: options.port ?? 22,
			username: options.username,
			password: options.password,
			privateKey: options.privateKey,
			passphrase: options.passphrase,
			readyTimeout: options.readyTimeout ?? 10_000,
		};

		return new Promise<void>((resolve, reject) => {
			this._client.on("ready", () => {
				this._username = options.username;
				this._connected = true;
				resolve();
			});
			this._client.on("error", (err) => {
				reject(err);
			});
			this._client.connect(config);
		});
	}

	/**
	 * Disconnects from the SSH server.
	 */
	disconnect(): void {
		perf.mark("disconnect");
		this._client.end();
		this._connected = false;
	}

	/**
	 * Returns whether the client is currently connected.
	 */
	get isConnected(): boolean {
		return this._connected;
	}

	/**
	 * Executes raw shell command over SSH exec channel.
	 *
	 * @param command Unparsed command line.
	 * @returns Command result with stdout/stderr/exitCode.
	 */
	async exec(command: string): Promise<CommandResult> {
		perf.mark("exec");
		if (!this._connected) {
			throw new Error("SSH client not connected");
		}

		return new Promise<CommandResult>((resolve) => {
			this._client.exec(command, (err: Error | undefined, stream: ClientChannel) => {
				if (err) {
					resolve({ stderr: err.message, exitCode: 1 });
					return;
				}

				let stdout = "";
				let stderr = "";

				stream.on("close", (code: number | string) => {
					const exitCode = typeof code === "number" ? code : 0;
					const result: CommandResult = {
						stdout: stdout || undefined,
						stderr: stderr || undefined,
						exitCode,
					};

					// Try to extract cwd change from stderr marker
					const cwdMatch = stderr.match(/^__CWD__:(.+)$/m);
					if (cwdMatch && exitCode === 0) {
						result.nextCwd = cwdMatch[1]!.trim();
						this._currentCwd = result.nextCwd;
					}

					resolve(result);
				});

				stream.on("data", (data: Buffer) => {
					stdout += data.toString();
				});

				stream.stderr?.on("data", (data: Buffer) => {
					stderr += data.toString();
				});
			});
		});
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
		const result = await this.exec(`cd '${path}' && pwd`);
		if (result.exitCode === 0 && result.stdout) {
			this._currentCwd = result.stdout.trim();
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
		return this.exec(`cat '${path}'`);
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
		return this.exec(`mkdir ${flag}'${path}'`);
	}

	/**
	 * Creates file (empty).
	 *
	 * @param path File path.
	 * @returns Result from touch command.
	 */
	async touch(path: string): Promise<CommandResult> {
		perf.mark("touch");
		return this.exec(`touch '${path}'`);
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
		return this.exec(`rm ${flag}'${path}'`);
	}

	/**
	 * Writes file content over SSH.
	 *
	 * @param path Target file path.
	 * @param content Text to write.
	 * @returns Result from write operation.
	 */
	async writeFile(path: string, content: string): Promise<CommandResult> {
		perf.mark("writeFile");
		const escaped = content
			.replace(/\\/g, "\\\\")
			.replace(/'/g, "'\\''");
		return this.exec(`printf '%s' '${escaped}' > '${path}'`);
	}

	/**
	 * Reads file content over SSH.
	 *
	 * @param path Target file path.
	 * @returns File content as string or error in result.
	 */
	async readFile(path: string): Promise<CommandResult> {
		perf.mark("readFile");
		return this.exec(`cat '${path}'`);
	}

	/**
	 * Gets current working directory.
	 *
	 * @returns Normalized cwd path.
	 */
	getCwd(): string {
		perf.mark("getCwd");
		return this._currentCwd;
	}

	/**
	 * Gets logged-in username.
	 *
	 * @returns Associated username.
	 */
	getUsername(): string {
		perf.mark("getUsername");
		return this._username;
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
