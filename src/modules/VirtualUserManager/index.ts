import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { EventEmitter } from "node:events";
import * as path from "node:path";
import { type PerfLogger, createPerfLogger } from "../../utils/perfLogger";
import type VirtualFileSystem from "../VirtualFileSystem";

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

	/**
	 * Creates a user manager instance backed by a virtual filesystem.
	 *
	 * @param vfs Backing virtual filesystem used for persistence.
	 * @param autoSudoForNewUsers Whether newly created users are added to sudoers.
	 */
	constructor(
		private readonly _vfs: VirtualFileSystem,
		// private readonly defaultRootPassword: string = process.env
		// .SSH_MIMIC_ROOT_PASSWORD || "root",
		private readonly _autoSudoForNewUsers: boolean = false,
	) {
		super();
		perf.mark("constructor");
	}

	/**
	 * Loads users/sudoers from disk and ensures root account exists.
	 * Also creates the current system user if not already present.
	 */
	public async initialize(): Promise<void> {
		perf.mark("initialize");
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
			await this.persist();
		}
		this.emit("initialized");
	}

	/**
	 * Sets max allowed bytes under /home/<username>.
	 *
	 * @param username Target username.
	 * @param maxBytes Quota ceiling in bytes.
	 */
	public async setQuotaBytes(
		username: string,
		maxBytes: number,
	): Promise<void> {
		perf.mark("setQuotaBytes");
		this._validateUsername(username);
		if (!this._users.has(username)) {
			throw new Error(`quota: user '${username}' does not exist`);
		}

		if (!Number.isFinite(maxBytes) || maxBytes < 0) {
			throw new Error("quota: maxBytes must be a non-negative number");
		}

		this._quotas.set(username, Math.floor(maxBytes));
		await this.persist();
	}

	/**
	 * Removes quota for a user.
	 *
	 * @param username Target username.
	 */
	public async clearQuota(username: string): Promise<void> {
		perf.mark("clearQuota");
		this._validateUsername(username);
		this._quotas.delete(username);
		await this.persist();
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
			this.hashPassword(password, "");
			return false;
		}

		const computed = this.hashPassword(password, record.salt);
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
	public async addUser(username: string, password: string): Promise<void> {
		perf.mark("addUser");
		this._validateUsername(username);
		this._validatePassword(password);

		if (this._users.has(username)) {
			return;
			// throw new Error(`adduser: user '${username}' already exists`);
		}

		this._users.set(username, this._createRecord(username, password));
		if (this._autoSudoForNewUsers) {
			this._sudoers.add(username);
		}
		const record = this._users.get(username) as VirtualUserRecord;
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
		await this.persist();
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
		this._users.set(username, this._createRecord(username, ""));
		if (this._autoSudoForNewUsers) {
			this._sudoers.add(username);
		}
		const uid = this._nextUid - 1;
		const gid = this._nextGid - 1;
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
	public async setPassword(username: string, password: string): Promise<void> {
		perf.mark("setPassword");
		this._validateUsername(username);
		this._validatePassword(password);

		if (!this._users.has(username)) {
			throw new Error(`passwd: user '${username}' does not exist`);
		}

		this._users.set(username, this._createRecord(username, password));
		await this.persist();
	}

	/**
	 * Deletes an existing non-root user account and revokes sudo access.
	 *
	 * @param username Username to remove.
	 * @throws When `username` is `"root"` or the user does not exist.
	 */
	public async deleteUser(username: string): Promise<void> {
		perf.mark("deleteUser");
		this._validateUsername(username);

		if (username === "root") {
			throw new Error("deluser: cannot delete root");
		}

		if (!this._users.delete(username)) {
			throw new Error(`deluser: user '${username}' does not exist`);
		}

		this._sudoers.delete(username);

		this.emit("user:delete", { username });
		await this.persist();
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
	public async addSudoer(username: string): Promise<void> {
		perf.mark("addSudoer");
		this._validateUsername(username);
		if (!this._users.has(username)) {
			throw new Error(`sudoers: user '${username}' does not exist`);
		}

		this._sudoers.add(username);
		await this.persist();
	}

	/**
	 * Revokes sudo privileges from a user. Root cannot be demoted.
	 *
	 * @param username Username to demote.
	 * @throws When `username` is `"root"`.
	 */
	public async removeSudoer(username: string): Promise<void> {
		perf.mark("removeSudoer");
		this._validateUsername(username);
		if (username === "root") {
			throw new Error("sudoers: cannot remove root");
		}

		this._sudoers.delete(username);
		await this.persist();
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
	public getGroup(gid: number): string | null {
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
	 * @returns The newly assigned PID.
	 */
	public registerProcess(
		username: string,
		command: string,
		argv: string[],
		tty: string,
		abortController?: AbortController,
		ppid = 1,
	): number {
		const pid = this._nextPid++;
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
		});
		return pid;
	}

	/**
	 * Removes a process record when the command exits.
	 * Emits SIGCHLD to the parent process.
	 * @param pid - PID of the process to unregister.
	 */
	public unregisterProcess(pid: number): void {
		const proc = this._activeProcesses.get(pid);
		if (proc) {
			proc.status = "done";
			// Emit SIGCHLD to parent
			this.emit("SIGCHLD", proc.ppid, pid);
		}
		this._activeProcesses.delete(pid);
	}

	/**
	 * Marks a process as done (keeps it in the table briefly for jobs/ps).
	 * Sets status to "done" without removing the record immediately.
	 * @param pid - PID of the process to mark as done.
	 */
	public markProcessDone(pid: number): void {
		const proc = this._activeProcesses.get(pid);
		if (proc) {
			proc.status = "done";
			this.emit("SIGCHLD", proc.ppid, pid);
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

			// Format: username:uid:gid:salt:passwordHash (new) or username:salt:passwordHash (legacy)
			if (parts.length >= 5) {
				const [username, uidStr, gidStr, salt, passwordHash] = parts;
				if (!username || !salt || !passwordHash) continue;
				const uid = parseInt(uidStr ?? "1001", 10);
				const gid = parseInt(gidStr ?? "1001", 10);
				this._users.set(username, { username, uid, gid, salt, passwordHash });
			} else {
				const [username, salt, passwordHash] = parts;
				if (!username || !salt || !passwordHash) continue;
				const uid = username === "root" ? 0 : this._nextUid++;
				const gid = username === "root" ? 0 : this._nextGid++;
				this._users.set(username, { username, uid, gid, salt, passwordHash });
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

	private async persist(): Promise<void> {
		if (!this._vfs.exists(this._authDirPath)) {
			this._vfs.mkdir(this._authDirPath, 0o700);
		}

		const authContent = Array.from(this._users.values())
			.sort((left, right) => left.username.localeCompare(right.username))
			.map((record) =>
				[record.username, record.uid, record.gid, record.salt, record.passwordHash].join(":"),
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
			await this._vfs.flushMirror();
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
			return cached;
		}

		const salt = randomBytes(16).toString("hex");
		const record = {
			username,
			uid: assignedUid,
			gid: assignedGid,
			salt,
			// Hash uses the generated salt — verifyPassword must use record.salt
			passwordHash: this.hashPassword(password, salt),
		};

		VirtualUserManager._recordCache.set(cacheKey, record);
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
		const emptyHash = this.hashPassword("", record.salt);
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
	public hashPassword(password: string, salt = ""): string {
		if (VirtualUserManager._fastPasswordHash) {
			return createHash("sha256")
				.update(salt)
				.update(password)
				.digest("hex");
		}

		return scryptSync(password, salt || "", 32).toString("hex");
	}

	private _validateUsername(username: string): void {
		if (!username || username.trim() === "") {
			throw new Error("invalid username");
		}

		if (!/^[a-z_][a-z0-9_-]{0,31}$/i.test(username)) {
			throw new Error("invalid username");
		}
	}

	private _validatePassword(password: string): void {
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
}

function normalizeVfsPath(targetPath: string): string {
	const normalized = path.posix.normalize(targetPath);
	return normalized.startsWith("/") ? normalized : `/${normalized}`;
}
