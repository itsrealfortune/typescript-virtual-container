import { EventEmitter } from "node:events";
import { createCustomCommand, registerCommand, runCommand } from "../../commands";
import type { CommandContext, CommandResult } from "../../types/commands";
import type { ShellStream } from "../../types/streams";
import type { VfsNodeStats } from "../../types/vfs";
import { type PerfLogger, createPerfLogger } from "../../utils/perfLogger";
import type { DesktopManager } from "../desktopManager";
import { bootstrapLinuxRootfs, refreshProc, syncEtcPasswd } from "../linuxRootfs";
import { type SysctlState, defaultSysctlState, resolveSysctlPath } from "../sysctl";
import VirtualFileSystem, { type VfsOptions } from "../VirtualFileSystem";
import { VirtualNetworkManager } from "../VirtualNetworkManager";
import { VirtualPackageManager } from "../VirtualPackageManager";
import { VirtualUserManager } from "../VirtualUserManager";
import { type GcStats, IdleManager, type IdleManagerOptions } from "./idleManager";
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
	/** Display resolution (e.g. `"1920x1080"`). */
	resolution?: string;
	/** GPU label (e.g. `"WebGL Renderer"`). */
	gpu?: string;
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

/**
 * Resource cap configuration for a virtual shell instance.
 *
 * Pass this as the 4th argument to the {@link VirtualShell} constructor to
 * limit the RAM and CPU resources visible inside the VM. When a cap is set,
 * every `/proc` file, sysctl entry, cgroup file, and system-monitor command
 * (`free`, `top`, `htop`, `neofetch`, `ps`, `df`) reports the capped value
 * instead of the real host total.
 *
 * **How it works — reporting vs enforcement:**
 *
 * 1. **Reporting (always active)** — `/proc/meminfo`, `/proc/cpuinfo`, cgroup
 *    files, and commands like `free`/`top`/`htop` show the capped values.
 *    This is cosmetic: the VM *looks* like it has limited resources.
 *
 * 2. **RAM enforcement (active when `ramCapBytes` is set)** — the VFS tracks
 *    total bytes stored in its in-memory tree. Any `writeFile` that would
 *    cause the total to exceed `ramCapBytes` is rejected with an `ENOMEM`
 *    error. This means:
 *    - `echo "big content" > /tmp/file` fails if the VFS is full.
 *    - `dd if=/dev/zero of=/tmp/zero bs=1M count=100` fails mid-write.
 *    - The VFS tree size includes all file content (compressed size for
 *      compressed files). `/proc` files and stubs are included.
 *    - Note: this caps VFS storage, not Node.js heap usage. A runaway
 *      `python -c "x = 'a'*10**10"` will still allocate host RAM — only
 *      VFS writes are intercepted.
 *
 * 3. **CPU enforcement (active when `cpuCapCores` is set)** — a background
 *    watcher runs every 500 ms and tracks wall-clock time per process. If a
 *    process consumes more CPU time than its per-window budget
 *    (`cpuCapCores × 1000 ms` per second), it is killed with `SIGKILL` (exit
 *    code 137). This means:
 *    - `while true; do :; done` will be killed after ~N seconds (where N =
 *      cpuCapCores).
 *    - `dd if=/dev/zero of=/dev/null` will be killed similarly.
 *    - Short commands (`ls`, `echo`, `cat`) are unaffected.
 *    - The event `process:killed:cpu` is emitted with `{ pid, command, cpuTime }`.
 *
 * **Runtime changes:**
 * - Both caps can be changed at runtime via sysctl:
 *   `sysctl vm.ram_cap_bytes=1073741824` or
 *   `sysctl kernel.cpu_cap_cores=2`.
 * - Setting either to `0` disables enforcement for that resource.
 *
 * @example
 * ```ts
 * const shell = new VirtualShell("prod-vm", props, vfsOptions, {
 *   ramCapBytes: 2 * 1024 * 1024 * 1024, // 2 GiB VFS storage limit
 *   cpuCapCores: 2,                        // 2 vCPUs, processes killed after 2s CPU/window
 * });
 *
 * // Inside the VM:
 * //   free -h          → 2.0G total
 * //   nproc            → 2
 * //   cat /proc/cpuinfo → 2 processor blocks
 * //   dd if=/dev/zero of=/tmp/big bs=1M count=3000 → ENOMEM after 2GB
 * //   while true; do :; done → killed after ~2s (SIGKILL, exit 137)
 * ```
 */
export interface VirtualShellResourceCaps {
	/**
	 * Maximum RAM visible inside the VM, in bytes.
	 *
	 * **Reporting**: `/proc/meminfo`, `free`, `top`, `htop`, cgroup memory files
	 * show this value (free memory is scaled proportionally).
	 *
	 * **Enforcement**: the VFS tracks total bytes stored. Any `writeFile` that
	 * would cause the tree to exceed this limit throws `ENOMEM`. This covers
	 * all VFS writes: `echo > file`, `dd`, `cp`, `tee`, SFTP uploads, etc.
	 * Compressed files count their compressed size. `/proc` dynamic files and
	 * stubs are included in the total.
	 *
	 * Does NOT cap Node.js heap usage — a process that allocates large JS
	 * objects without writing to the VFS will not be blocked.
	 *
	 * Set to `undefined` or `0` for no cap (full host passthrough).
	 *
	 * @example 2 * 1024 * 1024 * 1024 // 2 GiB
	 */
	ramCapBytes?: number;
	/**
	 * Maximum CPU cores visible inside the VM.
	 *
	 * **Reporting**: `/proc/cpuinfo` emits this many `processor` blocks,
	 * `/proc/stat` has per-CPU lines up to this count, `nproc` returns this
	 * value, cgroup `cpu.cfs_quota_us` = `cpuCapCores × 100 000`.
	 *
	 * **Enforcement**: a background watcher runs every 500 ms and tracks
	 * wall-clock time per process. If a process exceeds the per-window budget
	 * (`cpuCapCores × 1000 ms`), it is killed with `SIGKILL` (exit 137).
	 * Short commands are unaffected; infinite loops and CPU-heavy commands
	 * are terminated. Emits `process:killed:cpu` event.
	 *
	 * Set to `undefined` or `0` for no cap (full host passthrough).
	 *
	 * @example 2 // 2 vCPUs
	 */
	cpuCapCores?: number;
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
		typeof candidate.remove === "function"
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
		return false;
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
 * **Events:** `initialized` (VFS and users ready), `command` (after each execution),
 * `session:start` (interactive session opened).
 */
class VirtualShell extends EventEmitter {
	/** Backing virtual filesystem — use for direct path operations. */
	vfs: VirtualFileSystem;
	/** Virtual user database — use for auth, quotas, and session tracking. */
	users: VirtualUserManager;
	/** APT/dpkg package manager backed by the built-in package registry. */
	packageManager: VirtualPackageManager;
	/** Virtual network stack with interfaces, routes, and ARP cache. */
	network: VirtualNetworkManager;
	/** Hostname shown in the shell prompt and SSH ident string. */
	hostname: string;
	/** Distro identity strings surfaced by `uname`, `neofetch`, etc. */
	properties: ShellProperties;
	/** Unix ms timestamp of shell creation — used by `uptime` and `/proc/uptime`. */
	startTime: number;
	/** Desktop manager instance (browser-only, set by app layer). */
	desktopManager: DesktopManager | null = null;
	/** Idle / cold-start manager — null until `enableIdleManagement()` is called. */
	private _idle: IdleManager | null = null;
	/** Writable /proc/sys state — sysctl tunables. */
	sysctl: SysctlState;
	/** Resource caps — RAM and CPU limits visible inside the VM. Set via the
	 * constructor's 4th argument or at runtime through `sysctl` tunables
	 * (`vm.ram_cap_bytes`, `kernel.cpu_cap_cores`). */
	resourceCaps: VirtualShellResourceCaps;
	private _initialized: Promise<void>;

	/**
	 * Creates a new virtual shell instance.
	 *
	 * @param hostname Virtual hostname used for prompts and idents.
	 * @param properties Customizable properties shown in `uname -a` and similar commands.
	 * @param vfsOptionsOrInstance Optional VFS persistence options (mode, snapshotPath) or an existing VFS instance.
	 * @param resourceCaps Optional RAM and CPU resource caps. See {@link VirtualShellResourceCaps} for details.
	 *   When `ramCapBytes` is set, `/proc/meminfo`, `free`, `top`, `htop`, and cgroup
	 *   memory files report this ceiling instead of the host total. When `cpuCapCores`
	 *   is set, `/proc/cpuinfo`, `/proc/stat`, `nproc`, and cgroup CPU quota are capped.
	 *   Both fields are optional — omit for full host passthrough. Caps can also be
	 *   changed at runtime via `sysctl vm.ram_cap_bytes` or `sysctl kernel.cpu_cap_cores`.
	 */
	constructor(
		hostname: string,
		properties?: ShellProperties,
		vfsOptionsOrInstance?: VfsOptions | VirtualShellVfsLike | VirtualShellVfsOptions,
		resourceCaps?: VirtualShellResourceCaps,
	) {
		super();
		perf.mark("constructor");
		this.hostname = hostname;
		this.properties = properties || defaultShellProperties;
		this.startTime = Date.now();
		this.sysctl = defaultSysctlState(hostname, this.properties.kernel);
		this.resourceCaps = resourceCaps ?? {};

		if (isVirtualShellVfsLike(vfsOptionsOrInstance)) {
			this.vfs = vfsOptionsOrInstance as unknown as VirtualFileSystem;
		} else if (hasVfsInstance(vfsOptionsOrInstance)) {
			this.vfs = vfsOptionsOrInstance.vfsInstance as unknown as VirtualFileSystem;
		} else {
			this.vfs = new VirtualFileSystem((vfsOptionsOrInstance as VfsOptions) ?? {});
		}
		this.users = new VirtualUserManager(this.vfs, resolveAutoSudoForNewUsers());
		this.packageManager = new VirtualPackageManager(this.vfs, this.users);
		this.network = new VirtualNetworkManager();

		// Store references to avoid TypeScript "used before assigned" errors
		const vfs = this.vfs;
		const users = this.users;
		const shellProps = this.properties;
		const shellHostname = this.hostname;
		const startTime = this.startTime;
		const network = this.network;
		const sysctl = this.sysctl;
		const caps = this.resourceCaps;

		// Initialize both VFS mirror and users, ensuring all is ready before auth
		this._initialized = (async () => {
			await vfs.restoreMirror();
			await users.initialize();
			// Bootstrap Linux rootfs (idempotent)
			bootstrapLinuxRootfs(vfs, users, shellHostname, shellProps, startTime, [], network, caps);

			// Register read hook: refresh /proc dynamically on every access
			vfs.onBeforeRead("/proc", () => {
				refreshProc(vfs, shellProps, shellHostname, startTime, users.listActiveSessions(), network, caps);
			});

			// Register content resolver: serve sysctl values from /proc/sys/*
			vfs.registerContentResolver("/proc/sys", (sysPath) => {
				const resolved = resolveSysctlPath(sysctl, sysPath);
				if (resolved) {
					const v = resolved.value;
					return typeof v === "number" ? `${v}\n` : v.endsWith("\n") ? v : `${v}\n`;
				}
				return null;
			});

			// Register write hook: update sysctl state on /proc/sys/* writes
			vfs.onBeforeWrite("/proc/sys", (normalizedPath, content) => {
				const resolved = resolveSysctlPath(sysctl, normalizedPath);
				if (resolved) {
					resolved.set(typeof content === "string" ? content.trim() : String(content));
				}
				// Apply RAM/CPU caps in real-time when sysctl values change
				if (normalizedPath.includes("vm/ram_cap_bytes")) {
					const val = Number(content);
					caps.ramCapBytes = val > 0 ? val : undefined;
					vfs.setRamCap(caps.ramCapBytes ?? null);
				}
				if (normalizedPath.includes("kernel/cpu_cap_cores")) {
					const val = Number(content);
					caps.cpuCapCores = val > 0 ? val : undefined;
					users.setCpuCapCores(caps.cpuCapCores ?? 0);
				}
			});

			// Apply initial RAM cap if set
			if (caps.ramCapBytes) {
				vfs.setRamCap(caps.ramCapBytes);
			}
			// Apply initial CPU cap if set
			if (caps.cpuCapCores) {
				users.setCpuCapCores(caps.cpuCapCores);
			}

			this.emit("initialized");
		})();
	}

	/**
	 * Ensures initialization is complete before allowing operations.
	 * Call this before any authentication or command execution.
	 */
	public async ensureInitialized(): Promise<void> {
		perf.mark("ensureInitialized");
		await this._initialized;
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
	 * 
	 * @returns CommandResult or a Promise that resolves to CommandResult. The result is also emitted via the "command" event.
	 */
	executeCommand(rawInput: string, authUser: string, cwd: string): CommandResult | Promise<CommandResult> {
		perf.mark("executeCommand");
		this._idle?.ping();
		const result = runCommand(rawInput, authUser, this.hostname, "shell", cwd, this);
		this.emit("command", { command: rawInput, user: authUser, cwd });
		return result;
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
			this.network,
			this.resourceCaps,
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

	/**
	 * Remove a previously mounted host directory from the VFS.
	 * @param vPath - Absolute VFS path of the mount point to unmount.
	 */
	public unmount(vPath: string): void {
		this.vfs.unmount(vPath);
	}

	/**
	 * List all active mounts with their VFS paths, host paths, and read-only flags.
	 * @returns Array of mount descriptors.
	 */
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
			this.network,
			this.resourceCaps,
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
	 * @param options - Idle configuration (threshold, check interval).
	 */
	public enableIdleManagement(options?: IdleManagerOptions): void {
		if (this._idle) return;
		this._idle = new IdleManager(this, options);
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
	 * @returns Current state string.
	 */
	public get idleState(): "active" | "frozen" {
		return this._idle?.state ?? "active";
	}

	/**
	 * Milliseconds since last shell activity. 0 when idle management is disabled.
	 * @returns Milliseconds of idle time.
	 */
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

	/**
	 * Trigger garbage collection immediately. Returns stats about what was cleaned up.
	 * No-op when idle management is disabled.
	 * @returns GC stats, or null if idle management is not enabled.
	 */
	public runGc(): GcStats | null {
		return this._idle?.runGc() ?? null;
	}
}

export { VirtualShell };
