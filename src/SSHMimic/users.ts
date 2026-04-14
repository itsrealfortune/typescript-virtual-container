import { randomBytes, randomUUID, scryptSync } from "node:crypto";
import type VirtualFileSystem from "../VirtualFileSystem";

export interface VirtualUserRecord {
	username: string;
	salt: string;
	passwordHash: string;
}

export interface VirtualActiveSession {
	id: string;
	username: string;
	tty: string;
	remoteAddress: string;
	startedAt: string;
}

export class VirtualUserManager {
	private readonly usersPath = "/virtual-env-js/.auth/htpasswd";
	private readonly sudoersPath = "/virtual-env-js/.auth/sudoers";
	private readonly users = new Map<string, VirtualUserRecord>();
	private readonly sudoers = new Set<string>();
	private readonly activeSessions = new Map<string, VirtualActiveSession>();
	private nextTty = 0;

	constructor(
		private readonly vfs: VirtualFileSystem,
		private readonly defaultRootPassword: string = "root",
	) {}

	public async initialize(): Promise<void> {
		this.loadFromVfs();
		this.loadSudoersFromVfs();

		if (!this.users.has("root")) {
			this.users.set(
				"root",
				this.createRecord("root", this.defaultRootPassword),
			);
		}

		this.sudoers.add("root");

		await this.persist();
	}

	public verifyPassword(username: string, password: string): boolean {
		const record = this.users.get(username);
		if (!record) {
			return false;
		}

		return this.hashPassword(password, record.salt) === record.passwordHash;
	}

	public async addUser(username: string, password: string): Promise<void> {
		this.validateUsername(username);
		this.validatePassword(password);

		if (this.users.has(username)) {
			throw new Error(`adduser: user '${username}' already exists`);
		}

		this.users.set(username, this.createRecord(username, password));
		this.sudoers.add(username);
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

	public isSudoer(username: string): boolean {
		return this.sudoers.has(username);
	}

	public async addSudoer(username: string): Promise<void> {
		this.validateUsername(username);
		if (!this.users.has(username)) {
			throw new Error(`sudoers: user '${username}' does not exist`);
		}

		this.sudoers.add(username);
		await this.persist();
	}

	public async removeSudoer(username: string): Promise<void> {
		this.validateUsername(username);
		if (username === "root") {
			throw new Error("sudoers: cannot remove root");
		}

		this.sudoers.delete(username);
		await this.persist();
	}

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

	public unregisterSession(sessionId: string | null | undefined): void {
		if (!sessionId) {
			return;
		}

		this.activeSessions.delete(sessionId);
	}

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
		const content = Array.from(this.users.values())
			.sort((left, right) => left.username.localeCompare(right.username))
			.map((record) =>
				[record.username, record.salt, record.passwordHash].join(":"),
			)
			.join("\n");

		this.vfs.writeFile(
			this.usersPath,
			content.length > 0 ? `${content}\n` : "",
		);
		const sudoersContent = Array.from(this.sudoers.values()).sort().join("\n");
		this.vfs.writeFile(
			this.sudoersPath,
			sudoersContent.length > 0 ? `${sudoersContent}\n` : "",
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
	}

	private validatePassword(password: string): void {
		if (!password || password.trim() === "") {
			throw new Error("invalid password");
		}
	}
}
