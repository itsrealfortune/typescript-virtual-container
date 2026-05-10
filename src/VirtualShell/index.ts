import { EventEmitter } from "node:events";
import { createCustomCommand, registerCommand } from "../commands/registry";
import { runCommand } from "../commands/runtime";
import {
	bootstrapLinuxRootfs,
	refreshProc,
	syncEtcPasswd,
} from "../modules/linuxRootfs";
import type { CommandContext, CommandResult } from "../types/commands";
import type { ShellStream } from "../types/streams";
import type { PerfLogger } from "../utils/perfLogger";
import { createPerfLogger } from "../utils/perfLogger";
import VirtualFileSystem, { type VfsOptions } from "../VirtualFileSystem";
import { VirtualPackageManager } from "../VirtualPackageManager";
import { VirtualUserManager } from "../VirtualUserManager";
import { startShell } from "./shell";

/**
 * Virtual machine identity strings surfaced by system-info commands
 * (`uname`, `neofetch`, `lsb_release`, `/proc/version`, `/etc/os-release`).
 *
 * Pass this as the second argument to `new VirtualShell()` to customise the
 * distro name, kernel version, and CPU architecture reported inside the shell.
 *
 * @example
 * ```ts
 * const shell = new VirtualShell("my-vm", {
 *   kernel: "6.1.0+custom-amd64",
 *   os:     "Acme GNU/Linux x64",
 *   arch:   "x86_64",
 * });
 * ```
 */
export interface ShellProperties {
	/** Kernel version string (e.g. `"1.0.0+itsrealfortune+1-amd64"`). */
	kernel: string;
	/** Full OS description (e.g. `"Fortune GNU/Linux x64"`). */
	os: string;
	/** CPU architecture label (e.g. `"x86_64"`, `"aarch64"`). */
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
 * Coordinates the virtual filesystem, user manager, package manager, and
 * command runtime for a single isolated shell environment.
 *
 * Each instance owns its own VFS tree, user database, package registry, and
 * session state — multiple instances are fully independent.
 *
 * Instances are consumed both by the SSH/SFTP server facades and directly via
 * the programmatic `SshClient` API.
 *
 * @example
 * ```ts
 * const shell = new VirtualShell("my-vm");
 * await shell.ensureInitialized();
 * const client = new SshClient(shell, "root");
 * const result = await client.exec("uname -a");
 * ```
 *
 * @fires VirtualShell#initialized  Emitted once the VFS and users are ready.
 * @fires VirtualShell#command       Emitted after every command execution.
 * @fires VirtualShell#session:start Emitted when an interactive session opens.
 */
class VirtualShell extends EventEmitter {
	/** Backing virtual filesystem — use for direct path operations. */
	vfs: VirtualFileSystem;
	/** Virtual user database — use for auth, quotas, and session tracking. */
	users: VirtualUserManager;
	/** APT/dpkg package manager backed by the built-in package registry. */
	packageManager: VirtualPackageManager;
	/** Hostname shown in the shell prompt and SSH ident string. */
	hostname: string;
	/** Distro identity strings surfaced by `uname`, `neofetch`, etc. */
	properties: ShellProperties;
	/** Unix ms timestamp of shell creation — used by `uptime` and `/proc/uptime`. */
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
		vfsOptions?: VfsOptions | { vfsInstance?: VirtualFileSystem },
	) {
		super();
		perf.mark("constructor");
		this.hostname = hostname;
		this.properties = properties || defaultShellProperties;
		this.startTime = Date.now();
		// Allow passing an existing VirtualFileSystem instance (browser integration).
		function hasVfsInstance(obj: unknown): obj is { vfsInstance: VirtualFileSystem } {
			return typeof obj === "object" && obj !== null && "vfsInstance" in (obj as Record<string, unknown>) && (obj as Record<string, unknown>).vfsInstance instanceof VirtualFileSystem;
		}

		if (vfsOptions && hasVfsInstance(vfsOptions)) {
			this.vfs = vfsOptions.vfsInstance;
		} else {
			this.vfs = new VirtualFileSystem((vfsOptions as VfsOptions) ?? {});
		}
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
	 * Executes a raw command line string programmatically.
	 *
	 * Supports the full shell operator set (`&&`, `||`, `;`, `|`, `>`, `<`,
	 * `$(cmd)`) and alias expansion. The result is emitted via the
	 * `"command"` event but not returned — use `SshClient.exec()` for a
	 * result-returning wrapper.
	 *
	 * @param rawInput Unparsed command line (e.g. `"ls -la /tmp"`).
	 * @param authUser Username to run the command as.
	 * @param cwd      Current working directory for path resolution.
	 */
	executeCommand(rawInput: string, authUser: string, cwd: string): void {
		perf.mark("executeCommand");
		runCommand(rawInput, authUser, this.hostname, "shell", cwd, this);
		this.emit("command", { command: rawInput, user: authUser, cwd });
	}

	/**
	 * Attaches an interactive PTY session to this shell instance.
	 *
	 * Called internally by `SshMimic` when a client opens a shell channel.
	 * The session reads from `stream` (user keystrokes) and writes back ANSI
	 * output. History, `.bashrc` sourcing, and Ctrl+W/Ctrl+U line editing are
	 * handled automatically.
	 *
	 * @param stream        Bidirectional SSH channel stream.
	 * @param authUser      Authenticated username bound to this session.
	 * @param sessionId     Stable session UUID (used for `who` output), or `null`.
	 * @param remoteAddress IP or hostname of the connecting client.
	 * @param terminalSize  Initial terminal dimensions in columns and rows.
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
		// Refresh /proc/<pid> and /proc/self after session is registered
		this.refreshProcSessions();
	}

	/**
	 * Refreshes the `/proc` virtual filesystem with current system state.
	 *
	 * Updates `/proc/uptime`, `/proc/meminfo`, `/proc/cpuinfo`,
	 * `/proc/version`, `/proc/loadavg`, `/proc/self`, and per-session
	 * `/proc/<pid>` entries from live session and host data.
	 *
	 * Called automatically during `bootstrapLinuxRootfs`. Call again before
	 * reading `/proc` files for up-to-date values.
	 */
	public refreshProcFs(): void {
		refreshProc(
			this.vfs,
			this.properties,
			this.hostname,
			this.startTime,
			this.users.listActiveSessions(),
		);
	}

	/**
	 * Updates only the session-dependent `/proc` entries (`/proc/<pid>`,
	 * `/proc/self`). Cheaper than a full `refreshProcFs()` — call this
	 * whenever a session is registered or unregistered.
	 */
	public refreshProcSessions(): void {
		refreshProc(
			this.vfs,
			this.properties,
			this.hostname,
			this.startTime,
			this.users.listActiveSessions(),
		);
	}

	/**
	 * Syncs `/etc/passwd`, `/etc/group`, and `/etc/shadow` from the current
	 * `VirtualUserManager` state.
	 *
	 * Called automatically during `bootstrapLinuxRootfs`. Call again after
	 * `users.addUser()`, `users.deleteUser()`, or `users.addSudoer()` to keep
	 * the classic Unix credential files in sync with the user manager.
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
