import { randomBytes } from "node:crypto";
import { EventEmitter } from "node:events";
import { createCustomCommand, registerCommand, runCommand } from "../commands";
import type { CommandContext, CommandResult } from "../types/commands";
import type { ShellStream } from "../types/streams";
import type { PerfLogger } from "../utils/perfLogger";
import { createPerfLogger } from "../utils/perfLogger";
import VirtualFileSystem from "../VirtualFileSystem";
import { VirtualUserManager } from "../VirtualUserManager";
import { startShell } from "./shell";

export interface ShellProperties {
	kernel: string;
	os: string;
	arch: string;
}

const defaultShellProperties: ShellProperties = {
	kernel: "1.0.0+itsrealfortune+1-amd64",
	os: "Fortune GNU/Linux x64",
	arch: "x86_64",
};

const perf: PerfLogger = createPerfLogger("VirtualShell");

let cachedRootPassword: string | null = null;

function resolveRootPassword(): string {
	if (cachedRootPassword) {
		return cachedRootPassword;
	}

	const configured = process.env.SSH_MIMIC_ROOT_PASSWORD;
	if (configured && configured.trim().length > 0) {
		cachedRootPassword = configured.trim();
		return cachedRootPassword;
	}

	const generated = randomBytes(18).toString("base64url");
	cachedRootPassword = generated;
	console.warn(
		`[ssh-mimic] SSH_MIMIC_ROOT_PASSWORD missing; generated ephemeral root password: ${generated}`,
	);
	return generated;
}

function resolveAutoSudoForNewUsers(): boolean {
	const configured = process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;
	if (!configured) {
		return true;
	}

	return !["0", "false", "no", "off"].includes(configured.toLowerCase());
}

/**
 * Coordinates the virtual filesystem, user manager, and command runtime.
 *
 * Instances are used both by the SSH server facade and by the programmatic
 * client API.
 */
class VirtualShell extends EventEmitter {
	basePath: string = ".";
	vfs: VirtualFileSystem;
	users: VirtualUserManager;
	hostname: string;
	properties: ShellProperties;
	private initialized: Promise<void>;

	/**
	 * Creates a new virtual shell instance.
	 *
	 * @param hostname Virtual hostname used for prompts and idents.
	 * @param properties Customizable properties shown in `uname -a` and similar commands.
	 * @param basePath Optional base path for the virtual filesystem (defaults to process.cwd()).
	 */
	constructor(
		hostname: string,
		properties?: ShellProperties,
		basePath?: string,
	) {
		super();
		this.hostname = hostname;
		this.properties = properties || defaultShellProperties;
		this.basePath = basePath || ".";
		this.vfs = new VirtualFileSystem(this.basePath);
		this.users = new VirtualUserManager(
			this.vfs,
			resolveRootPassword(),
			resolveAutoSudoForNewUsers(),
		);

		// Store references to avoid TypeScript "used before assigned" errors
		const vfs = this.vfs;
		const users = this.users;

		// Initialize both VFS mirror and users, ensuring all is ready before auth
		this.initialized = (async () => {
			await vfs.restoreMirror();
			await users.initialize();
			this.emit("initialized");
		})();
	}

	/**
	 * Ensures initialization is complete before allowing operations.
	 * Call this before any authentication or command execution.
	 */
	public async ensureInitialized(): Promise<void> {
		perf.mark("ensureInitialized:start");
		await this.initialized;
		perf.done("ensureInitialized:done");
	}

	/**
	 * Registers a new command in the shell runtime.
	 *
	 * @param name Case-insensitive command name (no spaces).
	 * @param params List of parameter names for help text (no validation).
	 * @param callback Function invoked with command context on execution.
	 */
	addCommand(
		name: string,
		params: string[],
		callback: (ctx: CommandContext) => CommandResult | Promise<CommandResult>,
	): void {
		const normalized = name.trim().toLowerCase();
		if (normalized.length === 0 || /\s/.test(normalized)) {
			throw new Error("Command name must be non-empty and contain no spaces");
		}

		registerCommand(createCustomCommand(normalized, params, callback));
	}

	/**
	 * Executes a command line string in the context of this shell instance.
	 *
	 * @param rawInput
	 * @param authUser
	 * @param cwd
	 */
	executeCommand(rawInput: string, authUser: string, cwd: string): void {
		runCommand(rawInput, authUser, this.hostname, "shell", cwd, this);
		this.emit("command", { command: rawInput, user: authUser, cwd });
	}

	/**
	 * Starts an interactive session with the shell.
	 *
	 * @param stream The stream for the interactive session.
	 * @param authUser The authenticated user for the session.
	 * @param sessionId The ID of the session.
	 * @param remoteAddress The address of the remote client.
	 */

	startInteractiveSession(
		stream: ShellStream,
		authUser: string,
		sessionId: string | null,
		remoteAddress: string,
		terminalSize: { cols: number; rows: number },
	): void {
		// Interactive shell logic
		this.emit("session:start", { user: authUser, sessionId, remoteAddress });
		startShell(
			this.properties,
			stream,
			authUser,
			this.hostname,
			sessionId,
			remoteAddress,
			terminalSize,
			this,
		);
	}

	/**
	 * Returns virtual filesystem instance after server started.
	 *
	 * @returns VirtualFileSystem or null when not started.
	 */
	public getVfs(): VirtualFileSystem | null {
		return this?.vfs ?? null;
	}

	/**
	 * Returns user manager instance after server started.
	 *
	 * @returns VirtualUserManager or null when not started.
	 */
	public getUsers(): VirtualUserManager | null {
		return this?.users ?? null;
	}

	/**
	 * Returns hostname shown in prompts and idents.
	 *
	 * @returns Configured hostname label.
	 */
	public getHostname(): string {
		return this?.hostname;
	}

	/**
	 * Writes a file on behalf of a user with quota enforcement.
	 *
	 * @param authUser User performing the write.
	 * @param targetPath Destination path.
	 * @param content File content.
	 */
	public writeFileAsUser(
		authUser: string,
		targetPath: string,
		content: string | Buffer,
	): void {
		this.users.assertWriteWithinQuota(authUser, targetPath, content);
		this.vfs.writeFile(targetPath, content);
	}
}

export { VirtualShell };
