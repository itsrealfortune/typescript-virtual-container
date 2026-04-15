import { randomBytes, randomUUID, scryptSync } from "node:crypto";
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

/**
 * User, sudoers, and active session manager for SSH mimic runtime.
 */
export class VirtualUserManager {
	private readonly usersPath = "/virtual-env-js/.auth/htpasswd";
	private readonly sudoersPath = "/virtual-env-js/.auth/sudoers";
	private readonly authDirPath = "/virtual-env-js/.auth";
	private readonly users = new Map<string, VirtualUserRecord>();
	private readonly sudoers = new Set<string>();
	private readonly activeSessions = new Map<string, VirtualActiveSession>();
	private nextTty = 0;

	/**
	 * Creates user manager instance.
	 *
	 * @param vfs Backing virtual filesystem used for persistence.
	 * @param defaultRootPassword Initial root password used when root missing.
	 */
	constructor(
		private readonly vfs: VirtualFileSystem,
		private readonly defaultRootPassword: string = "root",
		private readonly autoSudoForNewUsers: boolean = true,
	) {}

	/**
	 * Loads users/sudoers from disk and ensures root account exists.
	 */
	public async initialize(): Promise<void> {
		this.loadFromVfs();
		this.loadSudoersFromVfs();

		this.users.set("root", this.createRecord("root", this.defaultRootPassword));

		this.sudoers.add("root");

		await this.persist();
	}

	/**
	 * Verifies plaintext password against stored record.
	 *
	 * @param username User login name.
	 * @param password Plaintext password candidate.
	 * @returns True when credentials are valid.
	 */
	public verifyPassword(username: string, password: string): boolean {
		const record = this.users.get(username);
		if (!record) {
			return false;
		}

		return this.hashPassword(password, record.salt) === record.passwordHash;
	}

	/**
	 * Creates user, home directory, and sudo access entry.
	 *
	 * @param username New username.
	 * @param password Initial plaintext password.
	 */
	public async addUser(username: string, password: string): Promise<void> {
		this.validateUsername(username);
		this.validatePassword(password);

		if (this.users.has(username)) {
			throw new Error(`adduser: user '${username}' already exists`);
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
	}

	/**
	 * Deletes existing non-root user account.
	 *
	 * @param username Username to remove.
	 */
	public async deleteUser(username: string): Promise<void> {
		this.validateUsername(username);

		if (username === "root") {
			throw new Error("deluser: cannot delete root");
		}

		if (!this.users.delete(username)) {
			throw new Error(`deluser: user '${username}' does not exist`);
		}

		this.sudoers.delete(username);

		await this.persist();
	}

	/**
	 * Checks whether user is member of sudoers set.
	 *
	 * @param username Username to test.
	 * @returns True when user can run sudo.
	 */
	public isSudoer(username: string): boolean {
		return this.sudoers.has(username);
	}

	/**
	 * Grants sudo access to existing user.
	 *
	 * @param username Username to promote.
	 */
	public async addSudoer(username: string): Promise<void> {
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
		const session: VirtualActiveSession = {
			id: randomUUID(),
			username,
			tty: `pts/${this.nextTty++}`,
			remoteAddress,
			startedAt: new Date().toISOString(),
		};

		this.activeSessions.set(session.id, session);
		return session;
	}

	/**
	 * Unregisters active session when connection closes.
	 *
	 * @param sessionId Session identifier; ignored when nullish.
	 */
	public unregisterSession(sessionId: string | null | undefined): void {
		if (!sessionId) {
			return;
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
		return Array.from(this.activeSessions.values()).sort((left, right) =>
			left.startedAt.localeCompare(right.startedAt),
		);
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

	private async persist(): Promise<void> {
		if (!this.vfs.exists(this.authDirPath)) {
			this.vfs.mkdir(this.authDirPath, 0o700);
		}

		const content = Array.from(this.users.values())
			.sort((left, right) => left.username.localeCompare(right.username))
			.map((record) =>
				[record.username, record.salt, record.passwordHash].join(":"),
			)
			.join("\n");

		this.vfs.writeFile(
			this.usersPath,
			content.length > 0 ? `${content}\n` : "",
			{ mode: 0o600 },
		);
		const sudoersContent = Array.from(this.sudoers.values()).sort().join("\n");
		this.vfs.writeFile(
			this.sudoersPath,
			sudoersContent.length > 0 ? `${sudoersContent}\n` : "",
			{ mode: 0o600 },
		);
		await this.vfs.flushMirror();
	}

	private createRecord(username: string, password: string): VirtualUserRecord {
		const salt = randomBytes(16).toString("hex");
		return {
			username,
			salt,
			passwordHash: this.hashPassword(password, salt),
		};
	}

	private hashPassword(password: string, salt: string): string {
		return scryptSync(password, salt, 64).toString("hex");
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
}
