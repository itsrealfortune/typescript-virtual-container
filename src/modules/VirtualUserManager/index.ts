import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { EventEmitter } from "node:events";
import * as path from "node:path";
import { type PerfLogger, createPerfLogger } from "../../utils/perfLogger";
import type VirtualFileSystem from "../VirtualFileSystem";
import { VirtualGroupManager, type VirtualGroupRecord } from "./groups";
import { type ProcessPriority, ProcessScheduler, type SchedulerConfig, type SchedulerStats } from "./processScheduler";

/** 
 * Persisted virtual user credential record.
 * @internal
 */
export interface VirtualUserRecord {
	/** Unique login name. */
	username: string;
	/** Numeric user ID. */
	uid: number;
	/** Primary group ID. */
	gid: number;
	/** Per-user random salt used for password hashing. */
	salt: string;
	/** Scrypt-derived password hash in hex encoding. */
	passwordHash: string;
	/** Days since epoch when password was last changed. */
	lastPasswordChange: number;
	/** Minimum days before password can be changed (0 = no minimum). */
	minPasswordAge: number;
	/** Maximum days password is valid (99999 = no expiration). */
	maxPasswordAge: number;
	/** Days before expiration to warn user (7 = default). */
	passwordWarnDays: number;
	/** Days after expiration before account is locked. */
	passwordInactiveDays: number;
	/** Days since epoch when account expires (0 = no expiration). */
	accountExpiryDate: number;
}

export type ProcessStatus = "running" | "stopped" | "done";

/** Runtime representation of a command currently executing in a session. */
export interface VirtualProcess {
	/** Unique process identifier (auto-incremented). */
	pid: number;
	/** Parent process ID. */
	ppid: number;
	/** Username running the process. */
	username: string;
	/** Command name (argv[0]). */
	command: string;
	/** Full argument list (command + args). */
	argv: string[];
	/** TTY identifier of the owning session, or "?" for background jobs. */
	tty: string;
	/** ISO-8601 start timestamp. */
	startedAt: string;
	/** Current process state. */
	status: ProcessStatus;
	/** AbortController for terminating the process. */
	abortController?: AbortController;
	/** Exit code set when process terminates. */
	exitCode?: number;
	/** Signal that terminated the process (if any). */
	terminatedBySignal?: number;
	/** Custom signal handlers: signal number → handler. */
	signalHandlers: Map<number, (sig: number, pid: number) => void>;
	/** Wall-clock ms the process has been running (used for CPU enforcement). */
	cpuTimeMs: number;
	/** Nice value (-20 to 19, default 0). Lower = higher priority. */
	nice: number;
	/** Scheduling priority category (derived from nice value). */
	priority: ProcessPriority;
}

/** Runtime representation of authenticated SSH session. */
export interface VirtualActiveSession {
	/** Stable session identifier (UUID). */
	id: string;
	/** Username bound to session. */
	username: string;
	/** Virtual terminal identifier (pts/*). */
	tty: string;
	/** Remote client IP or host label. */
	remoteAddress: string;
	/** ISO-8601 start timestamp. */
	startedAt: string;
}

function resolveFastPasswordHash(): boolean {
	const configured = process.env.SSH_MIMIC_FAST_PASSWORD_HASH;
	return (
		!!configured &&
		!["0", "false", "no", "off"].includes(configured.toLowerCase())
	);
}

const perf: PerfLogger = createPerfLogger("VirtualUserManager");

/**
 * Persistent user, sudoers, and active-session manager for the shell runtime.
 *
 * Passwords are hashed with scrypt by default and stored in the backing virtual filesystem.
 * Manages user accounts, process tracking, session management, and sudo access.
 *
 * @example
 * ```ts
 * const users = new VirtualUserManager(vfs);
 * await users.initialize();
 *
 * // Create a user with password
 * users.createUser("alice", "s3cret");
 * users.setPassword("alice", "new-password");
 *
 * // Check authentication
 * const ok = users.verifyPassword("alice", "new-password"); // true
 *
 * // Process management
 * const pid = users.registerProcess("alice", "sleep", ["sleep", "60"], "pts/0");
 * console.log(users.getProcess(pid)); // { pid, ppid, username, command, ... }
 * users.killProcess(pid, 15); // SIGTERM
 *
 * // Session management
 * const session = users.registerSession("alice", "192.168.1.100");
 * console.log(users.listActiveSessions());
 * users.closeSession(session.id);
 *
 * // Sudo access
 * users.addToSudoers("alice");
 * console.log(users.canSudo("alice")); // true
 * ```
 */
export class VirtualUserManager extends EventEmitter {
	private static readonly _recordCache = new Map<string, VirtualUserRecord>();
	private static readonly _maxRecordCacheSize = 100;
	private static readonly _fastPasswordHash = resolveFastPasswordHash();
	private readonly _usersPath = "/etc/htpasswd";
	private readonly _sudoersPath = "/etc/sudoers";
	private readonly _quotasPath = "/etc/quotas";
	private readonly _authDirPath = "/.virtual-env-js/.auth";
	private readonly _users = new Map<string, VirtualUserRecord>();
	private readonly _sudoers = new Set<string>();
	private readonly _quotas = new Map<string, number>();
	private readonly _activeSessions = new Map<string, VirtualActiveSession>();
	private readonly _activeProcesses = new Map<number, VirtualProcess>();
	private _nextTty = 0;
	private _nextPid = 1000;
	private _nextUid = 1001;
	private _nextGid = 1001;
	/** CPU cap: max cores visible to processes. 0 = uncapped. */
	private _cpuCapCores = 0;
	/** CPU budget per window in ms (cpuCapCores × windowMs). */
	private _cpuBudgetMs = 0;
	/** CPU accounting window duration in ms. */
	private readonly _cpuWindowMs = 1000;
	/** Wall-clock timestamp when current CPU window started. */
	private _cpuWindowStart = Date.now();
	/** Per-process CPU time consumed in current window (ms). */
	private _processCpuTime = new Map<number, number>();
	/** Watcher interval handle for CPU enforcement. */
	private _cpuWatcher: ReturnType<typeof setInterval> | null = null;
	/** Group manager for /etc/group handling. */
	private _groups!: VirtualGroupManager;
	/** Sudo timestamp cache: username → timestamp of last sudo auth (ms). */
	private _sudoTimestamps = new Map<string, number>();
	/** Login failure tracking: username → { count, lastTime, sourceIp }. */
	private _loginFailures = new Map<string, { count: number; lastTime: number; sourceIp: string }>();
	/** Max login failures before account is locked. */
	private readonly _maxLoginFailures = 5;
	/** Sudo timestamp validity window in ms (5 minutes). */
	private readonly _sudoTimestampWindowMs = 5 * 60 * 1000;
	/** Login failure TTL in ms (1 hour). */
	private readonly _loginFailureTtlMs = 60 * 60 * 1000;
	/** Process scheduler for fair CPU time allocation. */
	private _scheduler: ProcessScheduler;
	/** Scheduler enabled flag. */
	private _schedulerEnabled = false;

	/**
	 * Creates a user manager instance backed by a virtual filesystem.
	 *
	 * @param _vfs Backing virtual filesystem used for persistence.
	 * @param _autoSudoForNewUsers Whether newly created users are added to sudoers.
	 */
	constructor(
		private readonly _vfs: VirtualFileSystem,
		// private readonly defaultRootPassword: string = process.env
		// .SSH_MIMIC_ROOT_PASSWORD || "root",
		private readonly _autoSudoForNewUsers: boolean = false,
	) {
		super();
		perf.mark("constructor");
		this._groups = new VirtualGroupManager(_vfs);
		this._scheduler = new ProcessScheduler();
	}

	/**
	 * Loads users/sudoers from disk and ensures root account exists.
	 * Also creates the current system user if not already present.
	 */
	public initialize(): void {
		perf.mark("initialize");
		this._groups.initialize();
		this._loadFromVfs();
		this._loadSudoersFromVfs();
		this._loadQuotasFromVfs();

		let changed = false;
		if (!this._users.has("root")) {
			this._users.set("root", this._createRecord("root", ""));
			changed = true;
		}

		this._sudoers.add("root");

		const homePath = "/root";
		if (!this._vfs.exists(homePath)) {
			this._vfs.mkdir(homePath, 0o755);
			this._vfs.writeFile(
				`${homePath}/README.txt`,
				`Welcome to the virtual environment, root`,
			);
		}

		if (changed) {
			this.persist();
		}
		this.emit("initialized");
	}

	/**
	 * Sets max allowed bytes under /home/<username>.
	 *
	 * @param username Target username.
	 * @param maxBytes Quota ceiling in bytes.
	 */
	public setQuotaBytes(
		username: string,
		maxBytes: number,
	): void {
		perf.mark("setQuotaBytes");
		VirtualUserManager._validateUsername(username);
		if (!this._users.has(username)) {
			throw new Error(`quota: user '${username}' does not exist`);
		}

		if (!Number.isFinite(maxBytes) || maxBytes < 0) {
			throw new Error("quota: maxBytes must be a non-negative number");
		}

		this._quotas.set(username, Math.floor(maxBytes));
		this.persist();
	}

	/**
	 * Removes quota for a user.
	 *
	 * @param username Target username.
	 */
	public clearQuota(username: string): void {
		perf.mark("clearQuota");
		VirtualUserManager._validateUsername(username);
		this._quotas.delete(username);
		this.persist();
	}

	/**
	 * Gets configured quota in bytes for a user.
	 *
	 * @param username Target username.
	 * @returns Quota in bytes, or null when unlimited.
	 */
	public getQuotaBytes(username: string): number | null {
		perf.mark("getQuotaBytes");
		return this._quotas.get(username) ?? null;
	}

	/**
	 * Computes current usage under /home/<username>.
	 *
	 * @param username Target username.
	 * @returns Current usage in bytes.
	 */
	public getUsageBytes(username: string): number {
		perf.mark("getUsageBytes");
		const homePath = username === "root" ? "/root" : `/home/${username}`;
		if (!this._vfs.exists(homePath)) {
			return 0;
		}

		return this._vfs.getUsageBytes(homePath);
	}

	/**
	 * Validates that writing file content would not exceed user quota.
	 *
	 * Quotas are enforced only for writes inside /home/<username>.
	 *
	 * @param username Authenticated user.
	 * @param targetPath Target file path.
	 * @param nextContent New file content.
	 */
	public assertWriteWithinQuota(
		username: string,
		targetPath: string,
		nextContent: string | Buffer,
	): void {
		perf.mark("assertWriteWithinQuota");
		const quota = this._quotas.get(username);
		if (quota === undefined) {
			return;
		}

		const normalizedPath = normalizeVfsPath(targetPath);
		const homePath = normalizeVfsPath(username === "root" ? "/root" : `/home/${username}`);
		const inUserHome =
			normalizedPath === homePath || normalizedPath.startsWith(`${homePath}/`);
		if (!inUserHome) {
			return;
		}

		const currentUsage = this.getUsageBytes(username);
		let existingSize = 0;
		if (this._vfs.exists(normalizedPath)) {
			const existing = this._vfs.stat(normalizedPath);
			if (existing.type === "file") {
				existingSize = existing.size;
			}
		}

		const incomingSize = Buffer.isBuffer(nextContent)
			? nextContent.length
			: Buffer.byteLength(nextContent, "utf8");
		const projectedUsage = currentUsage - existingSize + incomingSize;

		if (projectedUsage > quota) {
			throw new Error(
				`quota exceeded for '${username}': ${projectedUsage}/${quota} bytes`,
			);
		}
	}

	/**
	 * Verifies plaintext password against stored record.
	 *
	 * @param username User login name.
	 * @param password Plaintext password candidate.
	 * @returns True when credentials are valid.
	 */
	public verifyPassword(username: string, password: string): boolean {
		perf.mark("verifyPassword");
		const record = this._users.get(username);
		if (!record) {
			// Perform a dummy hash to avoid timing leakage on unknown usernames
			VirtualUserManager.hashPassword(password, "");
			return false;
		}

		const computed = VirtualUserManager.hashPassword(password, record.salt);
		const expected = record.passwordHash;
		// timingSafeEqual prevents timing-based password oracle attacks
		try {
			const a = Buffer.from(computed, "hex");
			const b = Buffer.from(expected, "hex");
			if (a.length !== b.length) return false;
			return timingSafeEqual(a, b);
		} catch {
			return computed === expected;
		}
	}

	/**
	 * Creates user, home directory, and sudo access entry.
	 *
	 * @param username New username.
	 * @param password Initial plaintext password.
	 */
	public addUser(username: string, password: string): void {
		perf.mark("addUser");
		VirtualUserManager._validateUsername(username);
		VirtualUserManager._validatePassword(password);

		if (this._users.has(username)) {
			return;
			// throw new Error(`adduser: user '${username}' already exists`);
		}

		const record = this._createRecord(username, password);
		this._users.set(username, record);
		if (this._autoSudoForNewUsers) {
			this._sudoers.add(username);
		}

		// Create per-user group (matching real Linux behavior)
		const userGroupName = username;
		if (!this._groups.getGroup(userGroupName)) {
			try {
				this._groups.createGroup(userGroupName, record.gid);
				this._groups.addMember(userGroupName, username);
			} catch {
				// Group might already exist — best-effort
			}
		}

		// Add to sudo group if sudoer
		if (this._autoSudoForNewUsers) {
			try { this._groups.addMember("sudo", username); } catch { /* best-effort */ }
		}

		const uid = record.uid;
		const gid = record.gid;
		const homePath = username === "root" ? "/root" : `/home/${username}`;
		if (!this._vfs.exists(homePath)) {
			this._vfs.mkdir(homePath, 0o700, uid, gid);
			this._vfs.writeFile(
				`${homePath}/README.txt`,
				`Welcome to the virtual environment, ${username}`,
				{},
				uid,
				gid,
			);
		}
		this.persist();
		this.emit("user:add", { username });
	}

	/**
	 * Ensure a user exists in the database. Creates them with a non-root UID
	 * if they are missing. Used during SSH login for unknown users.
	 * Also creates the home directory and README.txt if they don't exist.
	 * @param username - Username to ensure exists.
	 */
	public ensureUser(username: string): void {
		if (this._users.has(username)) return;
		if (username === "root") {
			this._users.set("root", this._createRecord("root", ""));
			return;
		}
		const record = this._createRecord(username, "");
		this._users.set(username, record);
		if (this._autoSudoForNewUsers) {
			this._sudoers.add(username);
		}

		// Create per-user group
		const userGroupName = username;
		if (!this._groups.getGroup(userGroupName)) {
			try {
				this._groups.createGroup(userGroupName, record.gid);
				this._groups.addMember(userGroupName, username);
			} catch { /* best-effort */ }
		}

		if (this._autoSudoForNewUsers) {
			try { this._groups.addMember("sudo", username); } catch { /* best-effort */ }
		}

		const uid = record.uid;
		const gid = record.gid;
		const homePath = `/home/${username}`;
		if (!this._vfs.exists(homePath)) {
			this._vfs.mkdir(homePath, 0o700, uid, gid);
		} else {
			// Ensure existing home dir is owned by the user
			try { this._vfs.chown(homePath, uid, gid, 0); } catch { /* best-effort */ }
		}
		if (!this._vfs.exists(`${homePath}/README.txt`)) {
			this._vfs.writeFile(
				`${homePath}/README.txt`,
				`Welcome to the virtual environment, ${username}`,
				{},
				uid,
				gid,
			);
		}
		void this.persist();
		this.emit("user:add", { username });
	}

	/**
	 * Retrieves stored password hash for a user, or null if user does not exist.
	 *
	 * @param username Target username.
	 * @returns Password hash in hex encoding, or null when user is not found.
	 */
	public getPasswordHash(username: string): string | null {
		perf.mark("getPasswordHash");
		const record = this._users.get(username);
		return record ? record.passwordHash : null;
	}

	/**
	 * Updates the password for an existing user account.
	 *
	 * @param username Username to update.
	 * @param password New plaintext password (must be non-empty).
	 * @throws When the user does not exist or the password is empty.
	 */
	public setPassword(username: string, password: string): void {
		perf.mark("setPassword");
		VirtualUserManager._validateUsername(username);
		VirtualUserManager._validatePassword(password);

		if (!this._users.has(username)) {
			throw new Error(`passwd: user '${username}' does not exist`);
		}

		this._users.set(username, this._createRecord(username, password));
		this.persist();
	}

	/**
	 * Deletes an existing non-root user account and revokes sudo access.
	 *
	 * @param username Username to remove.
	 * @throws When `username` is `"root"` or the user does not exist.
	 */
	public deleteUser(username: string): void {
		perf.mark("deleteUser");
		VirtualUserManager._validateUsername(username);

		if (username === "root") {
			throw new Error("deluser: cannot delete root");
		}

		if (!this._users.delete(username)) {
			throw new Error(`deluser: user '${username}' does not exist`);
		}

		this._sudoers.delete(username);

		// Remove from sudo group
		try { this._groups.removeMember("sudo", username); } catch { /* best-effort */ }

		// Remove per-user group if it exists and has no other members
		const userGroup = this._groups.getGroup(username);
		if (userGroup && userGroup.members.length <= 1) {
			try { this._groups.deleteGroup(username); } catch { /* best-effort */ }
		} else if (userGroup) {
			try { this._groups.removeMember(username, username); } catch { /* best-effort */ }
		}

		this.emit("user:delete", { username });
		this.persist();
	}

	/**
	 * Checks whether user is member of sudoers set.
	 *
	 * @param username Username to test.
	 * @returns True when user can run sudo.
	 */
	public isSudoer(username: string): boolean {
		perf.mark("isSudoer");
		return this._sudoers.has(username);
	}

	/**
	 * Grants sudo privileges to an existing user.
	 *
	 * @param username Username to promote.
	 * @throws When the user does not exist.
	 */
	public addSudoer(username: string): void {
		perf.mark("addSudoer");
		VirtualUserManager._validateUsername(username);
		if (!this._users.has(username)) {
			throw new Error(`sudoers: user '${username}' does not exist`);
		}

		this._sudoers.add(username);
		try { this._groups.addMember("sudo", username); } catch { /* best-effort */ }
		this.persist();
	}

	/**
	 * Revokes sudo privileges from a user. Root cannot be demoted.
	 *
	 * @param username Username to demote.
	 * @throws When `username` is `"root"`.
	 */
	public removeSudoer(username: string): void {
		perf.mark("removeSudoer");
		VirtualUserManager._validateUsername(username);
		if (username === "root") {
			throw new Error("sudoers: cannot remove root");
		}

		this._sudoers.delete(username);
		try { this._groups.removeMember("sudo", username); } catch { /* best-effort */ }
		this.persist();
	}

	/**
	 * Registers a new active session and allocates a virtual TTY identifier.
	 *
	 * Called by the SSH server when a client is authenticated. The returned
	 * descriptor is visible in `who` output and `listActiveSessions()`.
	 *
	 * @param username      Authenticated username bound to the session.
	 * @param remoteAddress IP address or hostname of the connecting client.
	 * @returns The newly created `VirtualActiveSession` descriptor.
	 */
	public registerSession(
		username: string,
		remoteAddress: string,
	): VirtualActiveSession {
		perf.mark("registerSession");
		const session: VirtualActiveSession = {
			id: randomUUID(),
			username,
			tty: `pts/${this._nextTty++}`,
			remoteAddress,
			startedAt: new Date().toISOString(),
		};
		this._activeSessions.set(session.id, session);
		this.emit("session:register", {
			sessionId: session.id,
			username,
			remoteAddress,
		});
		return session;
	}

	/**
	 * Removes an active session record when the connection closes.
	 *
	 * Safe to call with a `null` or `undefined` session ID — it will be a no-op.
	 *
	 * @param sessionId Session UUID returned by `registerSession()`, or nullish.
	 */
	public unregisterSession(sessionId: string | null | undefined): void {
		perf.mark("unregisterSession");
		if (!sessionId) {
			return;
		}

		const session = this._activeSessions.get(sessionId);
		this._activeSessions.delete(sessionId);
		if (session) {
			this.emit("session:unregister", {
				sessionId,
				username: session.username,
				tty: session.tty,
			});
		}
	}

	/**
	 * Updates the username and remote address metadata for an active session.
	 *
	 * Called internally by `su` and `sudo` when the effective user changes
	 * within a session. Silently ignored when the session ID is nullish or
	 * unknown.
	 *
	 * @param sessionId     Session UUID to update, or nullish for no-op.
	 * @param username      New effective username.
	 * @param remoteAddress New remote address (usually unchanged).
	 */
	public updateSession(
		sessionId: string | null | undefined,
		username: string,
		remoteAddress: string,
	): void {
		perf.mark("updateSession");
		if (!sessionId) {
			return;
		}

		const session = this._activeSessions.get(sessionId);
		if (!session) {
			return;
		}

		this._activeSessions.set(sessionId, {
			...session,
			username,
			remoteAddress,
		});
	}

	/**
	 * Returns a snapshot of all currently active sessions, sorted by start time.
	 *
	 * Used by `who`, `ps`, `uptime`, and the `HoneyPot` auditor.
	 *
	 * @returns Array of `VirtualActiveSession` descriptors.
	 */
	public listActiveSessions(): VirtualActiveSession[] {
		perf.mark("listActiveSessions");
		return Array.from(this._activeSessions.values()).sort((left, right) =>
			left.startedAt.localeCompare(right.startedAt),
		);
	}

	/**
	 * Returns a sorted list of all registered usernames.
	 *
	 * @returns Array of username strings sorted alphabetically.
	 */
	public listUsers(): string[] {
		return Array.from(this._users.keys()).sort();
	}

	/**
	 * Returns the numeric UID for a username, or 0 if unknown.
	 * @param username - Username to look up.
	 * @returns UID number (0 if user not found).
	 */
	public getUid(username: string): number {
		return this._users.get(username)?.uid ?? 0;
	}

	/**
	 * Returns the primary GID for a username, or 0 if unknown.
	 * @param username - Username to look up.
	 * @returns GID number (0 if user not found).
	 */
	public getGid(username: string): number {
		return this._users.get(username)?.gid ?? 0;
	}

	/**
	 * Returns the username for a numeric UID, or null if unknown.
	 * @param uid - User ID number to resolve.
	 * @returns Username string, or null if UID not found.
	 */
	public getUsername(uid: number): string | null {
		for (const [name, record] of this._users) {
			if (record.uid === uid) return name;
		}
		return null;
	}

	/**
	 * Returns the group name for a numeric GID, or null if unknown.
	 * @param gid - Group ID number to resolve.
	 * @returns Group/username string, or null if GID not found.
	 */
	public getGroupName(gid: number): string | null {
		for (const [name, record] of this._users) {
			if (record.gid === gid) return name;
		}
		return null;
	}

	/**
	 * Registers a running command as a virtual process.
	 * Returns the assigned PID so the caller can deregister on completion.
	 * @param username - User who owns the process.
	 * @param command - Command name (first token of the command line).
	 * @param argv - Full argument array including the command name.
	 * @param tty - TTY device identifier (e.g. "pts/0").
	 * @param abortController - Optional AbortController for process cancellation.
	 * @param ppid - Parent process ID (default: 1 / init).
	 * @param nice - Nice value for scheduling priority (-20 to 19, default 0).
	 * @returns The newly assigned PID.
	 */
	public registerProcess(
		username: string,
		command: string,
		argv: string[],
		tty: string,
		abortController?: AbortController,
		ppid = 1,
		nice = 0,
	): number {
		const pid = this._nextPid++;
		const priority = this._scheduler.niceToPriority(nice);
		this._activeProcesses.set(pid, {
			pid,
			ppid,
			username,
			command,
			argv,
			tty,
			startedAt: new Date().toISOString(),
			status: "running",
			abortController,
			signalHandlers: new Map(),
			cpuTimeMs: 0,
			nice,
			priority,
		});
		return pid;
	}

	/**
	 * Removes a process record when the command exits.
	 * Emits SIGCHLD to the parent process.
	 * @param pid - PID of the process to unregister.
	 */
	public unregisterProcess(pid: number): void {
		this._processCpuTime.delete(pid);
		this._scheduler.removeProcess(pid);
		const proc = this._activeProcesses.get(pid);
		if (proc) {
			proc.status = "done";
			proc.signalHandlers.clear();
			proc.abortController = undefined;
			// Emit SIGCHLD to parent
			this.emit("SIGCHLD", proc.ppid, pid);
		}
		this._activeProcesses.delete(pid);
	}

	/**
	 * Marks a process as done (keeps it in the table briefly for jobs/ps).
	 * Sets status to "done" without removing the record immediately.
	 * Auto-unregisters after 5s to prevent accumulation without idle manager.
	 * @param pid - PID of the process to mark as done.
	 */
	public markProcessDone(pid: number): void {
		const proc = this._activeProcesses.get(pid);
		if (proc) {
			proc.status = "done";
			proc.signalHandlers.clear();
			proc.abortController = undefined;
			this.emit("SIGCHLD", proc.ppid, pid);
			// Auto-unregister after a brief delay for ps/jobs visibility
			setTimeout(() => this.unregisterProcess(pid), 5000).unref?.();
		}
	}

	/**
	 * Returns all currently running processes sorted by PID.
	 * @returns The process list.
	 */
	public listProcesses(): VirtualProcess[] {
		return Array.from(this._activeProcesses.values()).sort((a, b) => a.pid - b.pid);
	}

	/**
	 * Terminate a process by PID. Returns true if the process was found and signalled.
	 * Handles SIGKILL (9), SIGSTOP (19), SIGCONT (18), and custom signal handlers.
	 * @param pid - PID of the process to kill.
	 * @param signal - Signal number to send (default: 15 / SIGTERM).
	 * @returns True if the process was found and signalled, false if PID not found.
	 */
	public killProcess(pid: number, signal = 15): boolean {
		const proc = this._activeProcesses.get(pid);
		if (!proc) return false;

		// SIGKILL (9) and SIGSTOP (19) cannot be caught
		if (signal === 9) {
			if (proc.abortController) proc.abortController.abort();
			proc.status = "done";
			proc.terminatedBySignal = 9;
			proc.exitCode = 137; // 128 + 9
			this.emit("SIGCHLD", proc.ppid, pid);
			return true;
		}

		if (signal === 19) { // SIGSTOP
			proc.status = "stopped";
			return true;
		}

		if (signal === 18) { // SIGCONT
			if (proc.status === "stopped") proc.status = "running";
			return true;
		}

		// Check for custom handler
		const handler = proc.signalHandlers.get(signal);
		if (handler) {
			handler(signal, pid);
			return true;
		}

		// Default action: terminate
		if (proc.abortController) proc.abortController.abort();
		proc.status = "done";
		proc.terminatedBySignal = signal;
		proc.exitCode = 128 + signal;
		this.emit("SIGCHLD", proc.ppid, pid);
		return true;
	}

	/**
	 * Send a signal to all processes owned by a user.
	 * @param username - Username whose processes to signal.
	 * @param signal - Signal number to send (default: 15 / SIGTERM).
	 * @returns Number of processes that were signalled.
	 */
	public killAllUserProcesses(username: string, signal = 15): number {
		let count = 0;
		for (const [pid, proc] of this._activeProcesses) {
			if (proc.username === username) {
				if (this.killProcess(pid, signal)) count++;
			}
		}
		return count;
	}

	/**
	 * Kill all processes attached to a specific TTY (e.g. "pts/0").
	 * Called when an SSH session disconnects to clean up leftover processes.
	 * @param tty - TTY identifier (e.g. "pts/0").
	 * @param signal - Signal number to send (default: 9 / SIGKILL).
	 * @returns Number of processes that were killed.
	 */
	public killProcessesByTty(tty: string, signal = 9): number {
		let count = 0;
		for (const [pid, proc] of this._activeProcesses) {
			if (proc.tty === tty) {
				if (this.killProcess(pid, signal)) count++;
			}
		}
		return count;
	}

	/**
	 * Get process record by PID.
	 * @param pid - PID to look up.
	 * @returns VirtualProcess object if found, or undefined.
	 */
	public getProcess(pid: number): VirtualProcess | undefined {
		return this._activeProcesses.get(pid);
	}

	/**
	 * Sets the CPU core cap. When > 0, processes that consume more than their
	 * fair share of CPU time within a window are killed with SIGKILL.
	 *
	 * @param cores - Number of CPU cores allowed (0 = no cap).
	 */
	public setCpuCapCores(cores: number): void {
		this._cpuCapCores = cores;
		this._cpuBudgetMs = cores > 0 ? cores * this._cpuWindowMs : 0;
		if (cores > 0 && !this._cpuWatcher) {
			this._startCpuWatcher();
		} else if (cores === 0 && this._cpuWatcher) {
			this._stopCpuWatcher();
		}
	}

	/**
	 * Returns the current CPU core cap (0 = uncapped).
	 */
	public getCpuCapCores(): number {
		return this._cpuCapCores;
	}

	/**
	 * Returns the CPU time (ms) consumed by a process in the current window.
	 * @param pid - Process ID.
	 * @returns CPU time in ms, or 0 if process not found.
	 */
	public getProcessCpuTime(pid: number): number {
		return this._processCpuTime.get(pid) ?? 0;
	}

	/**
	 * Updates the wall-clock CPU time for a running process.
	 * Called by the shell runtime when a command starts/stops.
	 * @param pid - Process ID.
	 * @param elapsedMs - Wall-clock milliseconds elapsed.
	 */
	public addProcessCpuTime(pid: number, elapsedMs: number): void {
		const current = this._processCpuTime.get(pid) ?? 0;
		this._processCpuTime.set(pid, current + elapsedMs);
	}

	/**
	 * Starts the CPU enforcement watcher. Checks every 500ms and kills
	 * processes that have exceeded their per-window budget.
	 */
	private _startCpuWatcher(): void {
		if (this._cpuWatcher) return;
		this._cpuWatcher = setInterval(() => this._enforceCpuCaps(), 500);
		if (typeof this._cpuWatcher.unref === "function") {
			this._cpuWatcher.unref();
		}
	}

	/**
	 * Stops the CPU enforcement watcher.
	 */
	private _stopCpuWatcher(): void {
		if (this._cpuWatcher) {
			clearInterval(this._cpuWatcher);
			this._cpuWatcher = null;
		}
	}

	/**
	 * Enforces CPU cap: kills processes that exceeded their budget.
	 */
	private _enforceCpuCaps(): void {
		if (this._cpuBudgetMs <= 0) return;

		const now = Date.now();
		const windowElapsed = now - this._cpuWindowStart;

		// Reset window if expired
		if (windowElapsed >= this._cpuWindowMs) {
			this._cpuWindowStart = now;
			this._processCpuTime.clear();
			return;
		}

		// Check each running process
		for (const [pid, proc] of this._activeProcesses) {
			if (proc.status !== "running") continue;
			const cpuTime = this._processCpuTime.get(pid) ?? 0;
			// Update wall-clock time for running processes
			const procStart = new Date(proc.startedAt).getTime();
			const wallTime = Math.min(now - procStart, windowElapsed);
			const effectiveCpu = Math.max(cpuTime, wallTime);

			if (effectiveCpu > this._cpuBudgetMs) {
				// Process exceeded budget — kill it
				this.killProcess(pid, 9); // SIGKILL
				this.emit("process:killed:cpu", { pid, command: proc.command, cpuTime: effectiveCpu });
			}
		}
	}

	// ── Process Scheduler ─────────────────────────────────────────────────────

	/**
	 * Enable the process scheduler with optional configuration.
	 * When enabled, processes are scheduled based on priority (nice values)
	 * with fair CPU time allocation.
	 * @param config - Optional scheduler configuration.
	 */
	public enableScheduler(config: SchedulerConfig = {}): void {
		this._scheduler = new ProcessScheduler(config);
		this._schedulerEnabled = true;
	}

	/**
	 * Disable the process scheduler. Falls back to FIFO execution.
	 */
	public disableScheduler(): void {
		this._schedulerEnabled = false;
	}

	/**
	 * Returns whether the scheduler is enabled.
	 */
	public isSchedulerEnabled(): boolean {
		return this._schedulerEnabled;
	}

	/**
	 * Get scheduler statistics.
	 * @returns SchedulerStats object, or null if scheduler is disabled.
	 */
	public getSchedulerStats(): SchedulerStats | null {
		return this._schedulerEnabled ? this._scheduler.getStats() : null;
	}

	/**
	 * Reset scheduler statistics.
	 */
	public resetSchedulerStats(): void {
		this._scheduler.resetStats();
	}

	/**
	 * Change the nice value of a process.
	 * @param pid - Process ID.
	 * @param nice - New nice value (-20 to 19).
	 * @returns True if the process was found and updated.
	 */
	public setProcessNice(pid: number, nice: number): boolean {
		if (!this._scheduler.isValidNice(nice)) return false;

		const proc = this._activeProcesses.get(pid);
		if (!proc) return false;

		proc.nice = nice;
		proc.priority = this._scheduler.niceToPriority(nice);
		this.emit("process:nice", { pid, nice, priority: proc.priority });
		return true;
	}

	/**
	 * Get the nice value of a process.
	 * @param pid - Process ID.
	 * @returns Nice value (-20 to 19), or 0 if process not found.
	 */
	public getProcessNice(pid: number): number {
		return this._activeProcesses.get(pid)?.nice ?? 0;
	}

	/**
	 * Get the scheduling priority of a process.
	 * @param pid - Process ID.
	 * @returns Priority name, or "normal" if process not found.
	 */
	public getProcessPriority(pid: number): ProcessPriority {
		return this._activeProcesses.get(pid)?.priority ?? "normal";
	}

	/**
	 * Calculate the recommended timeslice for a process.
	 * @param pid - Process ID.
	 * @returns Timeslice in milliseconds.
	 */
	getProcessTimeslice(pid: number): number {
		const nice = this._activeProcesses.get(pid)?.nice ?? 0;
		return this._scheduler.calculateTimeslice(nice);
	}

	/**
	 * Record CPU time for a process and check if it should be throttled.
	 * Called by the shell runtime during command execution.
	 * @param pid - Process ID.
	 * @param elapsedMs - Milliseconds of CPU time consumed.
	 * @returns True if the process should yield (throttled).
	 */
	public recordAndCheckThrottle(pid: number, elapsedMs: number): boolean {
		if (!this._schedulerEnabled) return false;

		this._scheduler.recordCpuTime(pid, elapsedMs);

		const proc = this._activeProcesses.get(pid);
		if (!proc || proc.status !== "running") return false;

		const runningCount = this.listProcesses().filter((p) => p.status === "running").length;
		return this._scheduler.shouldThrottle(pid, proc.nice, runningCount);
	}

	/**
	 * Get CPU time consumed by a process in the current accounting window.
	 * @param pid - Process ID.
	 * @returns CPU time in ms.
	 */
	public getSchedulerCpuTime(pid: number): number {
		return this._scheduler.getProcessCpuTime(pid);
	}

	/**
	 * Remove process from scheduler tracking.
	 * Called when a process is unregistered.
	 * @param pid - Process ID.
	 */
	public removeProcessFromScheduler(pid: number): void {
		this._scheduler.removeProcess(pid);
	}

	private _loadFromVfs(): void {
		this._users.clear();

		if (!this._vfs.exists(this._usersPath)) {
			return;
		}

		const raw = this._vfs.readFile(this._usersPath);
		for (const line of raw.split("\n")) {
			const trimmed = line.trim();
			if (trimmed.length === 0) {
				continue;
			}

			const parts = trimmed.split(":");
			if (parts.length < 3) {
				continue;
			}

			// Format: username:uid:gid:salt:passwordHash:lastChange:minAge:maxAge:warnDays:inactiveDays:expiry (new)
			// Format: username:uid:gid:salt:passwordHash (legacy v1.7.3)
			// Format: username:salt:passwordHash (legacy older)
			if (parts.length >= 11) {
				const [username, uidStr, gidStr, salt, passwordHash, lastChange, minAge, maxAge, warnDays, inactiveDays, expiry] = parts;
				if (!username || !salt || !passwordHash) continue;
				const uid = parseInt(uidStr ?? "1001", 10);
				const gid = parseInt(gidStr ?? "1001", 10);
				this._users.set(username, {
					username, uid, gid, salt, passwordHash,
					lastPasswordChange: parseInt(lastChange ?? "0", 10),
					minPasswordAge: parseInt(minAge ?? "0", 10),
					maxPasswordAge: parseInt(maxAge ?? "99999", 10),
					passwordWarnDays: parseInt(warnDays ?? "7", 10),
					passwordInactiveDays: parseInt(inactiveDays ?? "0", 10),
					accountExpiryDate: parseInt(expiry ?? "0", 10),
				});
			} else if (parts.length >= 5) {
				const [username, uidStr, gidStr, salt, passwordHash] = parts;
				if (!username || !salt || !passwordHash) continue;
				const uid = parseInt(uidStr ?? "1001", 10);
				const gid = parseInt(gidStr ?? "1001", 10);
				this._users.set(username, {
					username, uid, gid, salt, passwordHash,
					lastPasswordChange: Math.floor(Date.now() / 86400000),
					minPasswordAge: 0,
					maxPasswordAge: 99999,
					passwordWarnDays: 7,
					passwordInactiveDays: 0,
					accountExpiryDate: 0,
				});
			} else {
				const [username, salt, passwordHash] = parts;
				if (!username || !salt || !passwordHash) continue;
				const uid = username === "root" ? 0 : this._nextUid++;
				const gid = username === "root" ? 0 : this._nextGid++;
				this._users.set(username, {
					username, uid, gid, salt, passwordHash,
					lastPasswordChange: Math.floor(Date.now() / 86400000),
					minPasswordAge: 0,
					maxPasswordAge: 99999,
					passwordWarnDays: 7,
					passwordInactiveDays: 0,
					accountExpiryDate: 0,
				});
			}
		}
	}

	private _loadSudoersFromVfs(): void {
		this._sudoers.clear();

		if (!this._vfs.exists(this._sudoersPath)) {
			return;
		}

		const raw = this._vfs.readFile(this._sudoersPath);
		for (const line of raw.split("\n")) {
			const username = line.trim();
			if (username.length > 0) {
				this._sudoers.add(username);
			}
		}
	}

	private _loadQuotasFromVfs(): void {
		this._quotas.clear();

		if (!this._vfs.exists(this._quotasPath)) {
			return;
		}

		const raw = this._vfs.readFile(this._quotasPath);
		for (const line of raw.split("\n")) {
			const trimmed = line.trim();
			if (trimmed.length === 0) {
				continue;
			}

			const [username, value] = trimmed.split(":");
			const bytes = Number.parseInt(value ?? "", 10);
			if (!username || !Number.isFinite(bytes) || bytes < 0) {
				continue;
			}

			this._quotas.set(username, bytes);
		}
	}

	private persist(): void {
		if (!this._vfs.exists(this._authDirPath)) {
			this._vfs.mkdir(this._authDirPath, 0o700);
		}

		const authContent = Array.from(this._users.values())
			.sort((left, right) => left.username.localeCompare(right.username))
			.map((record) =>
				[
					record.username,
					record.uid,
					record.gid,
					record.salt,
					record.passwordHash,
					record.lastPasswordChange,
					record.minPasswordAge,
					record.maxPasswordAge,
					record.passwordWarnDays,
					record.passwordInactiveDays,
					record.accountExpiryDate,
				].join(":"),
			)
			.join("\n");
		const sudoersContent = Array.from(this._sudoers.values()).sort().join("\n");
		const quotasContent = Array.from(this._quotas.entries())
			.sort(([left], [right]) => left.localeCompare(right))
			.map(([username, maxBytes]) => `${username}:${maxBytes}`)
			.join("\n");

		let changed = false;
		changed =
			this._writeIfChanged(
				this._usersPath,
				authContent.length > 0 ? `${authContent}\n` : "",
				0o600,
			) || changed;
		changed =
			this._writeIfChanged(
				this._sudoersPath,
				sudoersContent.length > 0 ? `${sudoersContent}\n` : "",
				0o600,
			) || changed;
		changed =
			this._writeIfChanged(
				this._quotasPath,
				quotasContent.length > 0 ? `${quotasContent}\n` : "",
				0o600,
			) || changed;

		if (changed) {
			this._vfs.flushMirror();
		}
	}

	private _writeIfChanged(
		targetPath: string,
		content: string,
		mode: number,
	): boolean {
		if (this._vfs.exists(targetPath)) {
			const existing = this._vfs.readFile(targetPath);
			if (existing === content) {
				this._vfs.chmod(targetPath, mode);
				return false;
			}
		}

		this._vfs.writeFile(targetPath, content, { mode });
		return true;
	}

	private _createRecord(username: string, password: string, uid?: number, gid?: number): VirtualUserRecord {
		const assignedUid = uid ?? (username === "root" ? 0 : this._nextUid++);
		const assignedGid = gid ?? (username === "root" ? 0 : this._nextGid++);
		// Cache key is a hash of the inputs — never store plaintext password in memory
		const cacheKey = createHash("sha256").update(username).update(":").update(password).digest("hex");
		const cached = VirtualUserManager._recordCache.get(cacheKey);
		if (cached) {
			return {
				...cached,
				lastPasswordChange: Math.floor(Date.now() / 86400000),
				minPasswordAge: 0,
				maxPasswordAge: 99999,
				passwordWarnDays: 7,
				passwordInactiveDays: 0,
				accountExpiryDate: 0,
			};
		}

		const salt = randomBytes(16).toString("hex");
		const record: VirtualUserRecord = {
			username,
			uid: assignedUid,
			gid: assignedGid,
			salt,
			passwordHash: VirtualUserManager.hashPassword(password, salt),
			lastPasswordChange: Math.floor(Date.now() / 86400000),
			minPasswordAge: 0,
			maxPasswordAge: 99999,
			passwordWarnDays: 7,
			passwordInactiveDays: 0,
			accountExpiryDate: 0,
		};

		VirtualUserManager._recordCache.set(cacheKey, record);
		if (VirtualUserManager._recordCache.size > VirtualUserManager._maxRecordCacheSize) {
			const firstKey = VirtualUserManager._recordCache.keys().next().value;
			if (firstKey) VirtualUserManager._recordCache.delete(firstKey);
		}
		return record;
	}

	/**
	 * Returns `true` when the user has a non-empty password set.
	 *
	 * A user with no password (or whose password hash matches the empty-string
	 * hash) is allowed to authenticate without a credential check.
	 *
	 * @param username Target username.
	 * @returns True if the user has a password set, false otherwise.
	 */
	public hasPassword(username: string): boolean {
		perf.mark("hasPassword");
		const record = this._users.get(username);
		if (!record) return false;
		// Empty password hash computed with the record's own salt
		const emptyHash = VirtualUserManager.hashPassword("", record.salt);
		if (record.passwordHash === emptyHash) return false;
		return !!record.passwordHash;
	}

	/**
	 * Hashes a plaintext password using scrypt (or SHA-256 in fast-hash mode).
	 *
	 * Set `SSH_MIMIC_FAST_PASSWORD_HASH=1` to switch to SHA-256 for test
	 * environments where scrypt latency is undesirable.
	 *
	 * @param password Plaintext password string.
	 * @returns Hex-encoded hash string.
	 */
	/**
	 * Hash a password with an optional salt.
	 * When salt is provided (verify path), the same salt is used for a
	 * deterministic hash. When omitted (create path), an empty salt is used
	 * for backward compat — callers should pass the stored salt on verify.
	 * @param password - The plaintext password.
	 * @param salt - The salt parameter.
	 * @returns The result string.
	 */
	public static hashPassword(password: string, salt = ""): string {
		if (VirtualUserManager._fastPasswordHash) {
			return createHash("sha256")
				.update(salt)
				.update(password)
				.digest("hex");
		}

		return scryptSync(password, salt || "", 32).toString("hex");
	}

	private static _validateUsername(username: string): void {
		if (!username || username.trim() === "") {
			throw new Error("invalid username");
		}

		if (!/^[a-z_][a-z0-9_-]{0,31}$/i.test(username)) {
			throw new Error("invalid username");
		}
	}

	private static _validatePassword(password: string): void {
		if (!password || password.trim() === "") {
			throw new Error("invalid password");
		}
	}
	private readonly _authorizedKeys = new Map<
		string,
		Array<{ algo: string; data: Buffer }>
	>();

	/**
	 * Adds an SSH public key for a user, enabling public-key authentication.
	 *
	 * @param username Target user.
	 * @param algo Key algorithm (e.g. "ssh-rsa", "ssh-ed25519").
	 * @param data Raw key data as a Buffer (the base64-decoded key bytes).
	 */
	public addAuthorizedKey(username: string, algo: string, data: Buffer): void {
		perf.mark("addAuthorizedKey");
		const keys = this._authorizedKeys.get(username) ?? [];
		keys.push({ algo, data });
		this._authorizedKeys.set(username, keys);
		this.emit("key:add", { username, algo });
	}

	/**
	 * Removes all authorized keys for a user.
	 *
	 * @param username Target user.
	 */
	public removeAuthorizedKeys(username: string): void {
		this._authorizedKeys.delete(username);
		this.emit("key:remove", { username });
	}

	/**
	 * Returns the list of authorized keys for a user.
	 * Returns an empty array when no keys are registered.
	 *
	 * @param username Target user.
	 * @returns The operation result.
	 */
	public getAuthorizedKeys(
		username: string,
	): Array<{ algo: string; data: Buffer }> {
		return this._authorizedKeys.get(username) ?? [];
	}

	// ======================== GROUP MANAGEMENT ========================

	/**
	 * Creates a new group with an auto-assigned GID.
	 *
	 * @param name Group name.
	 * @param gid Optional explicit GID.
	 */
	public createGroup(name: string, gid?: number): VirtualGroupRecord {
		return this._groups.createGroup(name, gid);
	}

	/**
	 * Deletes a group.
	 *
	 * @param name Group name.
	 */
	public deleteGroup(name: string): void {
		this._groups.deleteGroup(name);
	}

	/**
	 * Adds a user as a supplementary member of a group.
	 *
	 * @param groupName Target group.
	 * @param username User to add.
	 */
	public addGroupMember(groupName: string, username: string): void {
		this._groups.addMember(groupName, username);
	}

	/**
	 * Removes a user from a group's supplementary member list.
	 *
	 * @param groupName Target group.
	 * @param username User to remove.
	 */
	public removeGroupMember(groupName: string, username: string): void {
		this._groups.removeMember(groupName, username);
	}

	/**
	 * Returns the group record by name.
	 *
	 * @param name Group name.
	 */
	public getGroup(name: string): VirtualGroupRecord | undefined {
		return this._groups.getGroup(name);
	}

	/**
	 * Returns the group record by GID.
	 *
	 * @param gid Numeric group ID.
	 */
	public getGroupByGid(gid: number): VirtualGroupRecord | undefined {
		return this._groups.getGroupByGid(gid);
	}

	/**
	 * Resolves a group name to its GID.
	 *
	 * @param name Group name.
	 */
	public getGidByName(name: string): number | null {
		return this._groups.getGidByName(name);
	}

	/**
	 * Resolves a GID to its group name.
	 *
	 * @param gid Numeric group ID.
	 */
	public getNameByGid(gid: number): string | null {
		return this._groups.getNameByGid(gid);
	}

	/**
	 * Returns all supplementary groups for a user (by membership in /etc/group).
	 *
	 * @param username Target user.
	 */
	public getUserSupplementaryGroups(username: string): string[] {
		return this._groups.getUserSupplementaryGroups(username);
	}

	/**
	 * Returns all groups a user belongs to, including their primary group.
	 *
	 * @param username Target user.
	 */
	public getUserAllGroups(username: string): string[] {
		const primaryGid = this.getGid(username);
		return this._groups.getUserAllGroups(username, primaryGid);
	}

	/**
	 * Checks if a user is a member of a specific group.
	 *
	 * @param username Target user.
	 * @param groupName Target group.
	 */
	public isMemberOf(username: string, groupName: string): boolean {
		const primaryGid = this.getGid(username);
		return this._groups.isMemberOf(username, groupName, primaryGid);
	}

	/**
	 * Returns all registered groups.
	 */
	public listGroups(): VirtualGroupRecord[] {
		return this._groups.listGroups();
	}

	/**
	 * Generates /etc/group file content.
	 */
	public generateGroupFile(): string {
		return this._groups.generateGroupFile();
	}

	// ======================== PASSWORD AGING ========================

	/**
	 * Sets password aging parameters for a user.
	 *
	 * @param username Target user.
	 * @param minDays Minimum days before password can be changed (0 = no minimum).
	 * @param maxDays Maximum days password is valid (99999 = no expiration).
	 * @param warnDays Days before expiration to warn user.
	 * @param inactiveDays Days after expiration before account is locked.
	 */
	public setPasswordAging(
		username: string,
		minDays?: number,
		maxDays?: number,
		warnDays?: number,
		inactiveDays?: number,
	): void {
		const record = this._users.get(username);
		if (!record) {
			throw new Error(`chage: user '${username}' does not exist`);
		}

		if (minDays !== undefined) record.minPasswordAge = minDays;
		if (maxDays !== undefined) record.maxPasswordAge = maxDays;
		if (warnDays !== undefined) record.passwordWarnDays = warnDays;
		if (inactiveDays !== undefined) record.passwordInactiveDays = inactiveDays;

		this.persist();
	}

	/**
	 * Returns password aging information for a user.
	 *
	 * @param username Target user.
	 * @returns Aging parameters or null if user not found.
	 */
	public getPasswordAging(username: string): {
		lastChange: number;
		minAge: number;
		maxAge: number;
		warnDays: number;
		inactiveDays: number;
		expiryDate: number;
	} | null {
		const record = this._users.get(username);
		if (!record) return null;
		return {
			lastChange: record.lastPasswordChange,
			minAge: record.minPasswordAge,
			maxAge: record.maxPasswordAge,
			warnDays: record.passwordWarnDays,
			inactiveDays: record.passwordInactiveDays,
			expiryDate: record.accountExpiryDate,
		};
	}

	/**
	 * Sets the account expiry date for a user.
	 *
	 * @param username Target user.
	 * @param expiryDate Days since epoch when account expires (0 = no expiration).
	 */
	public setAccountExpiry(username: string, expiryDate: number): void {
		const record = this._users.get(username);
		if (!record) {
			throw new Error(`chage: user '${username}' does not exist`);
		}

		record.accountExpiryDate = expiryDate;
		this.persist();
	}

	/**
	 * Forces a password change on next login by setting lastChange to 0.
	 *
	 * @param username Target user.
	 */
	public forcePasswordChange(username: string): void {
		const record = this._users.get(username);
		if (!record) {
			throw new Error(`chage: user '${username}' does not exist`);
		}

		record.lastPasswordChange = 0;
		this.persist();
	}

	/**
	 * Checks if a user's password has expired.
	 *
	 * @param username Target user.
	 * @returns True if password is expired.
	 */
	public isPasswordExpired(username: string): boolean {
		const record = this._users.get(username);
		if (!record || record.maxPasswordAge === 99999) return false;
		const today = Math.floor(Date.now() / 86400000);
		return (today - record.lastPasswordChange) > record.maxPasswordAge;
	}

	/**
	 * Locks a user account by prefixing the password hash with '!'.
	 *
	 * @param username Target user.
	 */
	public lockAccount(username: string): void {
		const record = this._users.get(username);
		if (!record) {
			throw new Error(`usermod: user '${username}' does not exist`);
		}

		if (!record.passwordHash.startsWith("!")) {
			record.passwordHash = `!${record.passwordHash}`;
			this.persist();
		}
	}

	/**
	 * Unlocks a user account by removing the '!' prefix from the password hash.
	 *
	 * @param username Target user.
	 */
	public unlockAccount(username: string): void {
		const record = this._users.get(username);
		if (!record) {
			throw new Error(`usermod: user '${username}' does not exist`);
		}

		if (record.passwordHash.startsWith("!")) {
			record.passwordHash = record.passwordHash.slice(1);
			this.persist();
		}
	}

	/**
	 * Checks if a user account is locked (password hash prefixed with '!').
	 *
	 * @param username Target user.
	 * @returns True if account is locked.
	 */
	public isAccountLocked(username: string): boolean {
		const record = this._users.get(username);
		return record?.passwordHash.startsWith("!") ?? false;
	}

	/**
	 * Generates /etc/shadow file content with password aging data.
	 *
	 * Format: `name:passwordHash:lastChange:min:max:warn:inactive:expiry:reserved`
	 *
	 * @returns Shadow file content string.
	 */
	public generateShadowFile(): string {
		const systemAccounts = [
			{ name: "root", hash: "*", lastChange: 19000, min: 0, max: 99999, warn: 7 },
			{ name: "daemon", hash: "*", lastChange: 19000, min: 0, max: 99999, warn: 7 },
			{ name: "nobody", hash: "*", lastChange: 19000, min: 0, max: 99999, warn: 7 },
			{ name: "messagebus", hash: "*", lastChange: 19000, min: 0, max: 99999, warn: 7 },
			{ name: "_apt", hash: "*", lastChange: 19000, min: 0, max: 99999, warn: 7 },
			{ name: "systemd-network", hash: "!", lastChange: 19000, min: 0, max: 99999, warn: 7 },
			{ name: "systemd-resolve", hash: "!", lastChange: 19000, min: 0, max: 99999, warn: 7 },
			{ name: "polkitd", hash: "!", lastChange: 19000, min: 0, max: 99999, warn: 7 },
		];

		const lines = systemAccounts.map(
			(a) => `${a.name}:${a.hash}:${a.lastChange}:${a.min}:${a.max}:${a.warn}:::`,
		);

		for (const record of this._users.values()) {
			if (record.username === "root") continue;
			const hash = record.passwordHash.startsWith("!") ? "!" : record.passwordHash;
			lines.push(
				`${record.username}:${hash}:${record.lastPasswordChange}:${record.minPasswordAge}:${record.maxPasswordAge}:${record.passwordWarnDays}:${record.passwordInactiveDays}:${record.accountExpiryDate}:`,
			);
		}

		return lines.join("\n");
	}

	// ======================== SUDO TIMESTAMP ========================

	/**
	 * Grants a sudo timestamp to a user, allowing password-less sudo for 5 minutes.
	 *
	 * @param username Target user.
	 */
	public grantSudoTimestamp(username: string): void {
		this._sudoTimestamps.set(username, Date.now());
	}

	/**
	 * Checks if a user has a valid sudo timestamp (within 5-minute window).
	 * Root always returns true.
	 *
	 * @param username Target user.
	 * @returns True if user can sudo without re-authenticating.
	 */
	public hasValidSudoTimestamp(username: string): boolean {
		if (username === "root") return true;
		const ts = this._sudoTimestamps.get(username);
		if (!ts) return false;
		if ((Date.now() - ts) >= this._sudoTimestampWindowMs) {
			this._sudoTimestamps.delete(username);
			return false;
		}
		return true;
	}

	/**
	 * Clears the sudo timestamp for a user.
	 *
	 * @param username Target user.
	 */
	public clearSudoTimestamp(username: string): void {
		this._sudoTimestamps.delete(username);
	}

	// ======================== LOGIN FAILURE TRACKING ========================

	/**
	 * Records a failed login attempt for a user.
	 *
	 * @param username Target user.
	 * @param sourceIp IP address of the failed attempt.
	 */
	public recordLoginFailure(username: string, sourceIp: string): void {
		const now = Date.now();
		// Clean stale entries older than TTL
		for (const [user, data] of this._loginFailures) {
			if (now - data.lastTime > this._loginFailureTtlMs) this._loginFailures.delete(user);
		}
		const existing = this._loginFailures.get(username);
		if (existing) {
			existing.count++;
			existing.lastTime = now;
			existing.sourceIp = sourceIp;
		} else {
			this._loginFailures.set(username, { count: 1, lastTime: now, sourceIp });
		}
	}

	/**
	 * Resets the login failure counter for a user (called on successful login).
	 *
	 * @param username Target user.
	 */
	public recordLoginSuccess(username: string): void {
		this._loginFailures.delete(username);
	}

	/**
	 * Returns the number of consecutive failed login attempts for a user.
	 *
	 * @param username Target user.
	 * @returns Failure count (0 if no failures).
	 */
	public getLoginFailures(username: string): number {
		return this._loginFailures.get(username)?.count ?? 0;
	}

	/**
	 * Resets the login failure counter for a user.
	 *
	 * @param username Target user.
	 */
	public resetLoginFailures(username: string): void {
		this._loginFailures.delete(username);
	}

	/**
	 * Checks if a user's account is locked due to too many failed login attempts.
	 *
	 * @param username Target user.
	 * @returns True if account is locked by failure threshold.
	 */
	public isAccountLockedByFailures(username: string): boolean {
		const failures = this._loginFailures.get(username);
		if (!failures) return false;
		return failures.count >= this._maxLoginFailures;
	}

	/**
	 * Returns the timestamp of the last failed login attempt.
	 *
	 * @param username Target user.
	 * @returns Timestamp in ms, or 0 if no failures.
	 */
	public getLastFailureTime(username: string): number {
		return this._loginFailures.get(username)?.lastTime ?? 0;
	}
}

function normalizeVfsPath(targetPath: string): string {
	const normalized = path.posix.normalize(targetPath);
	return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

// Re-export scheduler types for external consumers
export { ProcessScheduler } from "./processScheduler";
export type { ProcessPriority, SchedulerAction, SchedulerConfig, SchedulerStats } from "./processScheduler";

