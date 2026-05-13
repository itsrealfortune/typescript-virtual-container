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
import type { VfsNodeStats } from "../types/vfs";
import type { PerfLogger } from "../utils/perfLogger";
import { createPerfLogger } from "../utils/perfLogger";
import VirtualFileSystem, { type VfsOptions } from "../VirtualFileSystem";
import { VirtualPackageManager } from "../VirtualPackageManager";
import { VirtualUserManager } from "../VirtualUserManager";
import { IdleManager, type IdleManagerOptions } from "./idleManager";
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

/**
 * Minimal VFS interface accepted by {@link VirtualShell} as a drop-in replacement
 * for the built-in {@link VirtualFileSystem}.
 */
export interface VirtualShellVfsLike {
	restoreMirror(): Promise<void>;
	flushMirror(): Promise<void>;
	writeFile(targetPath: string, content: string | Uint8Array): void;
	readFile(targetPath: string): string;
	mkdir(targetPath: string, mode?: number): void;
	exists(targetPath: string): boolean;
	stat(targetPath: string): VfsNodeStats;
	list(targetPath: string): string[];
	remove(targetPath: string, options?: { recursive?: boolean }): void;
	chmod?(targetPath: string, mode: number): void;
	symlink?(targetPath: string, linkPath: string): void;
	getUsageBytes?(targetPath?: string): number;
}

/**
 * Constructor options for {@link VirtualShell} when passing an existing VFS instance.
 */
export interface VirtualShellVfsOptions {
	vfsInstance?: VirtualShellVfsLike;
}

function hasVfsInstance(obj: unknown): obj is { vfsInstance: VirtualShellVfsLike } {
	return (
		typeof obj === "object" &&
		obj !== null &&
		"vfsInstance" in obj &&
		isVirtualShellVfsLike((obj as Record<string, unknown>).vfsInstance)
	);
}

function isVirtualShellVfsLike(value: unknown): value is VirtualShellVfsLike {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	const candidate = value as Record<string, unknown>;
	return (
		typeof candidate.restoreMirror === "function" &&
		typeof candidate.flushMirror === "function" &&
		typeof candidate.writeFile === "function" &&
		typeof candidate.readFile === "function" &&
		typeof candidate.mkdir === "function" &&
		typeof candidate.exists === "function" &&
		typeof candidate.stat === "function" &&
		typeof candidate.list === "function" &&
		typeof candidate.remove === "function" &&
		typeof candidate.copy === "function" &&
		typeof candidate.move === "function" &&
		typeof candidate.touch === "function"
	);
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
	/** Idle / cold-start manager — null until `enableIdleManagement()` is called. */
	private _idle: IdleManager | null = null;
	private initialized: Promise<void>;

	/**
	 * Creates a new virtual shell instance.
	 *
	 * @param hostname Virtual hostname used for prompts and idents.
	 * @param properties Customizable properties shown in `uname -a` and similar commands.
	 * @param vfsOptionsOrInstance Optional VFS persistence options (mode, snapshotPath) or an existing VFS instance.
	 */
	constructor(
		hostname: string,
		properties?: ShellProperties,
		vfsOptionsOrInstance?: VfsOptions | VirtualShellVfsLike | VirtualShellVfsOptions,
	) {
		super();
		perf.mark("constructor");
		this.hostname = hostname;
		this.properties = properties || defaultShellProperties;
		this.startTime = Date.now();

		if (isVirtualShellVfsLike(vfsOptionsOrInstance)) {
			this.vfs = vfsOptionsOrInstance as unknown as VirtualFileSystem;
		} else if (hasVfsInstance(vfsOptionsOrInstance)) {
			this.vfs = vfsOptionsOrInstance.vfsInstance as unknown as VirtualFileSystem;
		} else {
			this.vfs = new VirtualFileSystem((vfsOptionsOrInstance as VfsOptions) ?? {});
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
		this._idle?.ping();
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
		this._idle?.ping();
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
	 * Mount a host directory into the VFS at `vPath`.
	 *
	 * Delegates file operations inside `vPath` to the host filesystem via
	 * `node:fs`. Silently ignored in browser environments.
	 *
	 * @param vPath    Absolute path inside the VM (e.g. `"/app"`).
	 * @param hostPath Path on the host — relative paths are resolved from `process.cwd()`.
	 * @param options  `{ readOnly?: boolean }` — default `true`.
	 *
	 * @example
	 * ```ts
	 * const shell = new VirtualShell("dev-vm");
	 * await shell.ensureInitialized();
	 * shell.mount("/workspace", "./my-project");
	 * // shell commands can now read ./my-project files via /workspace
	 * ```
	 */
	public mount(
		vPath: string,
		hostPath: string,
		options: { readOnly?: boolean } = {},
	): void {
		this.vfs.mount(vPath, hostPath, options);
	}

	/** Remove a previously mounted host directory. */
	public unmount(vPath: string): void {
		this.vfs.unmount(vPath);
	}

	/** List all active mounts. */
	public getMounts(): Array<{ vPath: string; hostPath: string; readOnly: boolean }> {
		return this.vfs.getMounts();
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

	/**
	 * Enable idle detection and cold-start freeze/thaw for this shell.
	 *
	 * After `idleThresholdMs` of inactivity the VFS tree is serialised and
	 * released from RAM. The next command transparently restores it in ~0.1 ms.
	 *
	 * @example
	 * ```ts
	 * await shell.ensureInitialized();
	 * shell.enableIdleManagement({ idleThresholdMs: 60_000 });
	 * ```
	 */
	public enableIdleManagement(options?: IdleManagerOptions): void {
		if (this._idle) return; // already enabled
		this._idle = new IdleManager(this.vfs, options);
		this._idle.on("freeze", () => this.emit("shell:freeze"));
		this._idle.on("thaw",   () => this.emit("shell:thaw"));
		this._idle.start();
	}

	/**
	 * Disable idle management and thaw the shell if currently frozen.
	 * Safe to call even if idle management was never enabled.
	 */
	public async disableIdleManagement(): Promise<void> {
		if (!this._idle) return;
		await this._idle.stop();
		this._idle = null;
	}

	/**
	 * Current idle state — `"active"` or `"frozen"`.
	 * Returns `"active"` when idle management is disabled.
	 */
	public get idleState(): "active" | "frozen" {
		return this._idle?.state ?? "active";
	}

	/** Milliseconds since last shell activity. 0 when idle management is disabled. */
	public get idleMs(): number {
		return this._idle?.idleMs ?? 0;
	}

	/**
	 * Ping the idle manager to signal external activity (e.g. SFTP, direct VFS writes).
	 * No-op when idle management is disabled.
	 */
	public pingIdle(): void {
		this._idle?.ping();
	}
}

export { VirtualShell };
