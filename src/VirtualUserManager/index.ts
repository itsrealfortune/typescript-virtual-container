import { createHash, randomBytes, randomUUID, scryptSync } from "node:crypto";
import { EventEmitter } from "node:events";
import * as path from "node:path";
import type { PerfLogger } from "../utils/perfLogger";
import { createPerfLogger } from "../utils/perfLogger";
import type VirtualFileSystem from "../VirtualFileSystem";

/** Persisted virtual user credential record. */
export interface VirtualUserRecord {
	/** Unique login name. */
	username: string;
	/** Per-user random salt used for password hashing. */
	salt: string;
	/** Scrypt-derived password hash in hex encoding. */
	passwordHash: string;
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
 */
export class VirtualUserManager extends EventEmitter {
	private static readonly recordCache = new Map<string, VirtualUserRecord>();
	private static readonly fastPasswordHash = resolveFastPasswordHash();
	private readonly usersPath = "/virtual-env-js/.auth/htpasswd";
	private readonly sudoersPath = "/virtual-env-js/.auth/sudoers";
	private readonly quotasPath = "/virtual-env-js/.auth/quotas";
	private readonly authDirPath = "/virtual-env-js/.auth";
	private readonly users = new Map<string, VirtualUserRecord>();
	private readonly sudoers = new Set<string>();
	private readonly quotas = new Map<string, number>();
	private readonly activeSessions = new Map<string, VirtualActiveSession>();
	private nextTty = 0;

	/**
	 * Creates a user manager instance backed by a virtual filesystem.
	 *
	 * @param vfs Backing virtual filesystem used for persistence.
	 * @param defaultRootPassword Initial root password used when root is created.
	 * @param autoSudoForNewUsers Whether newly created users are added to sudoers.
	 */
	constructor(
		private readonly vfs: VirtualFileSystem,
		// private readonly defaultRootPassword: string = process.env
		// .SSH_MIMIC_ROOT_PASSWORD || "root",
		private readonly autoSudoForNewUsers: boolean = true,
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
		this.loadFromVfs();
		this.loadSudoersFromVfs();
		this.loadQuotasFromVfs();

		let changed = false;
		if (!this.users.has("root")) {
			this.users.set("root", this.createRecord("root", ""));
			changed = true;
		}

		this.sudoers.add("root");

		// Auto-create current system user for easier authentication
		// const currentUser = process.env.USER || process.env.USERNAME;
		// if (currentUser && currentUser !== "root" && !this.users.has(currentUser)) {
		// 	const userPassword = this.defaultRootPassword;
		// 	this.users.set(currentUser, this.createRecord(currentUser, userPassword));
		// 	this.sudoers.add(currentUser);
		// 	changed = true;

		// 	const homePath = `/home/${currentUser}`;
		// 	if (!this.vfs.exists(homePath)) {
		// 		this.vfs.mkdir(homePath, 0o755);
		// 		this.vfs.writeFile(
		// 			`${homePath}/README.txt`,
		// 			`Welcome to the virtual environment, ${currentUser}`,
		// 		);
		// 	}
		// }

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
		this.validateUsername(username);
		if (!this.users.has(username)) {
			throw new Error(`quota: user '${username}' does not exist`);
		}

		if (!Number.isFinite(maxBytes) || maxBytes < 0) {
			throw new Error("quota: maxBytes must be a non-negative number");
		}

		this.quotas.set(username, Math.floor(maxBytes));
		await this.persist();
	}

	/**
	 * Removes quota for a user.
	 *
	 * @param username Target username.
	 */
	public async clearQuota(username: string): Promise<void> {
		perf.mark("clearQuota");
		this.validateUsername(username);
		this.quotas.delete(username);
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
		return this.quotas.get(username) ?? null;
	}

	/**
	 * Computes current usage under /home/<username>.
	 *
	 * @param username Target username.
	 * @returns Current usage in bytes.
	 */
	public getUsageBytes(username: string): number {
		perf.mark("getUsageBytes");
		const homePath = `/home/${username}`;
		if (!this.vfs.exists(homePath)) {
			return 0;
		}

		return this.vfs.getUsageBytes(homePath);
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
		const quota = this.quotas.get(username);
		if (quota === undefined) {
			return;
		}

		const normalizedPath = normalizeVfsPath(targetPath);
		const homePath = normalizeVfsPath(`/home/${username}`);
		const inUserHome =
			normalizedPath === homePath || normalizedPath.startsWith(`${homePath}/`);
		if (!inUserHome) {
			return;
		}

		const currentUsage = this.getUsageBytes(username);
		let existingSize = 0;
		if (this.vfs.exists(normalizedPath)) {
			const existing = this.vfs.stat(normalizedPath);
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
		const record = this.users.get(username);
		if (!record) {
			return false;
		}

		return this.hashPassword(password) === record.passwordHash;
	}

	/**
	 * Creates user, home directory, and sudo access entry.
	 *
	 * @param username New username.
	 * @param password Initial plaintext password.
	 */
	public async addUser(username: string, password: string): Promise<void> {
		perf.mark("addUser");
		this.validateUsername(username);
		this.validatePassword(password);

		if (this.users.has(username)) {
			return;
			// throw new Error(`adduser: user '${username}' already exists`);
		}

		this.users.set(username, this.createRecord(username, password));
		if (this.autoSudoForNewUsers) {
			this.sudoers.add(username);
		}
		const homePath = `/home/${username}`;
		if (!this.vfs.exists(homePath)) {
			this.vfs.mkdir(homePath, 0o755);
			this.vfs.writeFile(
				`${homePath}/README.txt`,
				`Welcome to the virtual environment, ${username}`,
			);
		}
		await this.persist();
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
		const record = this.users.get(username);
		return record ? record.passwordHash : null;
	}

	/**
	 * Updates password for an existing user account.
	 *
	 * @param username Username to update.
	 * @param password New plaintext password.
	 */
	public async setPassword(username: string, password: string): Promise<void> {
		perf.mark("setPassword");
		this.validateUsername(username);
		this.validatePassword(password);

		if (!this.users.has(username)) {
			throw new Error(`passwd: user '${username}' does not exist`);
		}

		this.users.set(username, this.createRecord(username, password));
		await this.persist();
	}

	/**
	 * Deletes existing non-root user account.
	 *
	 * @param username Username to remove.
	 */
	public async deleteUser(username: string): Promise<void> {
		perf.mark("deleteUser");
		this.validateUsername(username);

		if (username === "root") {
			throw new Error("deluser: cannot delete root");
		}

		if (!this.users.delete(username)) {
			throw new Error(`deluser: user '${username}' does not exist`);
		}

		this.sudoers.delete(username);

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
		return this.sudoers.has(username);
	}

	/**
	 * Grants sudo access to existing user.
	 *
	 * @param username Username to promote.
	 */
	public async addSudoer(username: string): Promise<void> {
		perf.mark("addSudoer");
		this.validateUsername(username);
		if (!this.users.has(username)) {
			throw new Error(`sudoers: user '${username}' does not exist`);
		}

		this.sudoers.add(username);
		await this.persist();
	}

	/**
	 * Revokes sudo access from user.
	 *
	 * @param username Username to demote.
	 */
	public async removeSudoer(username: string): Promise<void> {
		perf.mark("removeSudoer");
		this.validateUsername(username);
		if (username === "root") {
			throw new Error("sudoers: cannot remove root");
		}

		this.sudoers.delete(username);
		await this.persist();
	}

	/**
	 * Registers active session and allocates tty id.
	 *
	 * @param username Session username.
	 * @param remoteAddress Session source address.
	 * @returns Registered session descriptor.
	 */
	public registerSession(
		username: string,
		remoteAddress: string,
	): VirtualActiveSession {
		perf.mark("registerSession");
		const session: VirtualActiveSession = {
			id: randomUUID(),
			username,
			tty: `pts/${this.nextTty++}`,
			remoteAddress,
			startedAt: new Date().toISOString(),
		};
		this.activeSessions.set(session.id, session);
		this.emit("session:register", {
			sessionId: session.id,
			username,
			remoteAddress,
		});
		return session;
	}

	/**
	 * Unregisters active session when connection closes.
	 *
	 * @param sessionId Session identifier; ignored when nullish.
	 */
	public unregisterSession(sessionId: string | null | undefined): void {
		perf.mark("unregisterSession");
		if (!sessionId) {
			return;
		}

		const session = this.activeSessions.get(sessionId);
		this.activeSessions.delete(sessionId);
		if (session) {
			this.emit("session:unregister", {
				sessionId,
				username: session.username,
			});
		}
		this.activeSessions.delete(sessionId);
	}

	/**
	 * Updates username/address metadata for existing session.
	 *
	 * @param sessionId Session identifier; ignored when nullish.
	 * @param username New username value.
	 * @param remoteAddress New remote address value.
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

		const session = this.activeSessions.get(sessionId);
		if (!session) {
			return;
		}

		this.activeSessions.set(sessionId, {
			...session,
			username,
			remoteAddress,
		});
	}

	/**
	 * Lists active sessions sorted by start time.
	 *
	 * @returns Snapshot of active session descriptors.
	 */
	public listActiveSessions(): VirtualActiveSession[] {
		perf.mark("listActiveSessions");
		return Array.from(this.activeSessions.values()).sort((left, right) =>
			left.startedAt.localeCompare(right.startedAt),
		);
	}

	/**
	 * Returns sorted list of all usernames.
	 */
	public listUsers(): string[] {
		return Array.from(this.users.keys()).sort();
	}

	private loadFromVfs(): void {
		this.users.clear();

		if (!this.vfs.exists(this.usersPath)) {
			return;
		}

		const raw = this.vfs.readFile(this.usersPath);
		for (const line of raw.split("\n")) {
			const trimmed = line.trim();
			if (trimmed.length === 0) {
				continue;
			}

			const parts = trimmed.split(":");
			if (parts.length < 3) {
				continue;
			}

			const [username, salt, passwordHash] = parts;
			if (!username || !salt || !passwordHash) {
				continue;
			}

			this.users.set(username, { username, salt, passwordHash });
		}
	}

	private loadSudoersFromVfs(): void {
		this.sudoers.clear();

		if (!this.vfs.exists(this.sudoersPath)) {
			return;
		}

		const raw = this.vfs.readFile(this.sudoersPath);
		for (const line of raw.split("\n")) {
			const username = line.trim();
			if (username.length > 0) {
				this.sudoers.add(username);
			}
		}
	}

	private loadQuotasFromVfs(): void {
		this.quotas.clear();

		if (!this.vfs.exists(this.quotasPath)) {
			return;
		}

		const raw = this.vfs.readFile(this.quotasPath);
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

			this.quotas.set(username, bytes);
		}
	}

	private async persist(): Promise<void> {
		if (!this.vfs.exists(this.authDirPath)) {
			this.vfs.mkdir(this.authDirPath, 0o700);
		}

		const authContent = Array.from(this.users.values())
			.sort((left, right) => left.username.localeCompare(right.username))
			.map((record) =>
				[record.username, record.salt, record.passwordHash].join(":"),
			)
			.join("\n");
		const sudoersContent = Array.from(this.sudoers.values()).sort().join("\n");
		const quotasContent = Array.from(this.quotas.entries())
			.sort(([left], [right]) => left.localeCompare(right))
			.map(([username, maxBytes]) => `${username}:${maxBytes}`)
			.join("\n");

		let changed = false;
		changed =
			this.writeIfChanged(
				this.usersPath,
				authContent.length > 0 ? `${authContent}\n` : "",
				0o600,
			) || changed;
		changed =
			this.writeIfChanged(
				this.sudoersPath,
				sudoersContent.length > 0 ? `${sudoersContent}\n` : "",
				0o600,
			) || changed;
		changed =
			this.writeIfChanged(
				this.quotasPath,
				quotasContent.length > 0 ? `${quotasContent}\n` : "",
				0o600,
			) || changed;

		if (changed) {
			await this.vfs.flushMirror();
		}
	}

	private writeIfChanged(
		targetPath: string,
		content: string,
		mode: number,
	): boolean {
		if (this.vfs.exists(targetPath)) {
			const existing = this.vfs.readFile(targetPath);
			if (existing === content) {
				this.vfs.chmod(targetPath, mode);
				return false;
			}
		}

		this.vfs.writeFile(targetPath, content, { mode });
		return true;
	}

	private createRecord(username: string, password: string): VirtualUserRecord {
		const cacheKey = `${username}:${password}`;
		const cached = VirtualUserManager.recordCache.get(cacheKey);
		if (cached) {
			return cached;
		}

		const salt = randomBytes(16).toString("hex");
		const record = {
			username,
			salt,
			passwordHash: this.hashPassword(password),
		};

		VirtualUserManager.recordCache.set(cacheKey, record);
		return record;
	}

	public hasPassword(username: string): boolean {
		perf.mark("hasPassword");
		if (this.getPasswordHash(username) === this.hashPassword("")) {
			return false;
		}
		const record = this.users.get(username);
		return !!record && !!record.passwordHash;
	}

	/**
	 * Hashes plaintext password with per-user salt using scrypt.
	 *
	 * @param password Plaintext password.
	 * @returns Hex-encoded password hash.
	 */
	public hashPassword(password: string): string {
		if (VirtualUserManager.fastPasswordHash) {
			return createHash("sha256").update(`${password}`).digest("hex");
		}

		return scryptSync(password, "", 32).toString("hex");
	}

	private validateUsername(username: string): void {
		if (!username || username.trim() === "") {
			throw new Error("invalid username");
		}

		if (!/^[a-z_][a-z0-9_-]{0,31}$/i.test(username)) {
			throw new Error("invalid username");
		}
	}

	private validatePassword(password: string): void {
		if (!password || password.trim() === "") {
			throw new Error("invalid password");
		}
	}
	private readonly authorizedKeys = new Map<string, Array<{ algo: string; data: Buffer }>>();

	/**
	 * Adds an SSH public key for a user, enabling public-key authentication.
	 *
	 * @param username Target user.
	 * @param algo Key algorithm (e.g. "ssh-rsa", "ssh-ed25519").
	 * @param data Raw key data as a Buffer (the base64-decoded key bytes).
	 */
	public addAuthorizedKey(username: string, algo: string, data: Buffer): void {
		perf.mark("addAuthorizedKey");
		const keys = this.authorizedKeys.get(username) ?? [];
		keys.push({ algo, data });
		this.authorizedKeys.set(username, keys);
		this.emit("key:add", { username, algo });
	}

	/**
	 * Removes all authorized keys for a user.
	 *
	 * @param username Target user.
	 */
	public removeAuthorizedKeys(username: string): void {
		this.authorizedKeys.delete(username);
		this.emit("key:remove", { username });
	}

	/**
	 * Returns the list of authorized keys for a user.
	 * Returns an empty array when no keys are registered.
	 *
	 * @param username Target user.
	 */
	public getAuthorizedKeys(username: string): Array<{ algo: string; data: Buffer }> {
		return this.authorizedKeys.get(username) ?? [];
	}
}

function normalizeVfsPath(targetPath: string): string {
	const normalized = path.posix.normalize(targetPath);
	return normalized.startsWith("/") ? normalized : `/${normalized}`;
}
