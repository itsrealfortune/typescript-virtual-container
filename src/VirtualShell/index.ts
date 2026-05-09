import { EventEmitter } from "node:events";
import { createCustomCommand, registerCommand, runCommand } from "../commands";
import type { CommandContext, CommandResult } from "../types/commands";
import type { ShellStream } from "../types/streams";
import type { PerfLogger } from "../utils/perfLogger";
import { createPerfLogger } from "../utils/perfLogger";
import VirtualFileSystem, { type VfsOptions } from "../VirtualFileSystem";
import { VirtualUserManager } from "../VirtualUserManager";
import { VirtualPackageManager } from "../VirtualPackageManager";
import { bootstrapLinuxRootfs, refreshProc, syncEtcPasswd } from "../modules/linuxRootfs";
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
	vfs: VirtualFileSystem;
	users: VirtualUserManager;
	packageManager: VirtualPackageManager;
	hostname: string;
	properties: ShellProperties;
	/** Unix ms timestamp of shell creation — used for uptime calculation. */
	startTime: number;
	private initialized: Promise<void>;

	/**
	 * Creates a new virtual shell instance.
	 *
	 * @param hostname Virtual hostname used for prompts and idents.
	 * @param properties Customizable properties shown in `uname -a` and similar commands.
	 * @param vfsOptions Optional VFS persistence options (mode, snapshotPath).
	 */
	constructor(
		hostname: string,
		properties?: ShellProperties,
		vfsOptions?: VfsOptions,
	) {
		super();
		perf.mark("constructor");
		this.hostname = hostname;
		this.properties = properties || defaultShellProperties;
		this.startTime = Date.now();
		this.vfs = new VirtualFileSystem(vfsOptions ?? {});
		this.users = new VirtualUserManager(this.vfs, resolveAutoSudoForNewUsers());
		this.packageManager = new VirtualPackageManager(this.vfs, this.users);

		// Store references to avoid TypeScript "used before assigned" errors
		const vfs = this.vfs;
		const users = this.users;
		const pm = this.packageManager;
		const shellProps = this.properties;
		const shellHostname = this.hostname;
		const startTime = this.startTime;

		// Initialize both VFS mirror and users, ensuring all is ready before auth
		this.initialized = (async () => {
			await vfs.restoreMirror();
			await users.initialize();
			// Bootstrap Linux rootfs (idempotent)
			bootstrapLinuxRootfs(vfs, users, shellHostname, shellProps, startTime);
			// Load installed packages from dpkg status
			pm.load();
			this.emit("initialized");
		})();
	}

	/**
	 * Ensures initialization is complete before allowing operations.
	 * Call this before any authentication or command execution.
	 */
	public async ensureInitialized(): Promise<void> {
		perf.mark("ensureInitialized");
		await this.initialized;
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
		perf.mark("executeCommand");
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
		perf.mark("startInteractiveSession");
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
	 * Refreshes /proc virtual files with current system state.
	 */
	public refreshProcFs(): void {
		refreshProc(this.vfs, this.properties, this.hostname, this.startTime);
	}

	/**
	 * Syncs /etc/passwd, /etc/group, /etc/shadow from VirtualUserManager state.
	 */
	public syncPasswd(): void {
		syncEtcPasswd(this.vfs, this.users);
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
		perf.mark("writeFileAsUser");
		this.users.assertWriteWithinQuota(authUser, targetPath, content);
		this.vfs.writeFile(targetPath, content);
	}
}

export { VirtualShell };
