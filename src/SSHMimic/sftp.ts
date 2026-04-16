/** biome-ignore-all lint/style/useNamingConvention: const as enum */
import * as path from "node:path";
import type { KeyboardAuthContext } from "ssh2";
import { Server as SshServer } from "ssh2";
import type VirtualFileSystem from "../VirtualFileSystem";
import { VirtualShell } from "../VirtualShell";
import type { VirtualUserManager } from "../VirtualUserManager";
import type { VfsNodeStats } from "../types/vfs";
import { loadOrCreateHostKey } from "./hostKey";

const SFTP_STATUS_CODE = {
	OK: 0,
	EOF: 1,
	NO_SUCH_FILE: 2,
	PERMISSION_DENIED: 3,
	FAILURE: 4,
	BAD_MESSAGE: 5,
	NO_CONNECTION: 6,
	CONNECTION_LOST: 7,
	OP_UNSUPPORTED: 8,
};

const OPEN_MODE = {
	READ: 0x00000001,
	WRITE: 0x00000002,
	APPEND: 0x00000004,
	CREAT: 0x00000008,
	TRUNC: 0x00000010,
	EXCL: 0x00000020,
};

interface SftpFileHandle {
	type: "file";
	path: string;
	flags: number;
	buffer: Buffer;
}

interface SftpDirHandle {
	type: "dir";
	path: string;
	entries: string[];
	index: number;
}

type SftpHandle = SftpFileHandle | SftpDirHandle;

interface SftpAttributes {
	mode: number;
	uid: number;
	gid: number;
	size: number;
	atime: number | Date;
	mtime: number | Date;
}

interface SftpServerStream {
	on(
		event: "OPEN",
		listener: (reqid: number, filename: string, flags: number) => void,
	): this;
	on(
		event: "READ",
		listener: (
			reqid: number,
			handle: Buffer,
			offset: number,
			length: number,
		) => void,
	): this;
	on(
		event: "WRITE",
		listener: (
			reqid: number,
			handle: Buffer,
			offset: number,
			data: Buffer,
		) => void,
	): this;
	on(event: "FSTAT", listener: (reqid: number, handle: Buffer) => void): this;
	on(event: "CLOSE", listener: (reqid: number, handle: Buffer) => void): this;
	on(event: "OPENDIR", listener: (reqid: number, path: string) => void): this;
	on(event: "READDIR", listener: (reqid: number, handle: Buffer) => void): this;
	on(event: "STAT", listener: (reqid: number, path: string) => void): this;
	on(event: "LSTAT", listener: (reqid: number, path: string) => void): this;
	on(
		event: "FSETSTAT",
		listener: (
			reqid: number,
			handle: Buffer,
			attrs: Partial<SftpAttributes>,
		) => void,
	): this;
	on(
		event: "SETSTAT",
		listener: (
			reqid: number,
			path: string,
			attrs: Partial<SftpAttributes>,
		) => void,
	): this;
	on(event: "REALPATH", listener: (reqid: number, path: string) => void): this;
	on(event: "MKDIR", listener: (reqid: number, path: string) => void): this;
	on(event: "RMDIR", listener: (reqid: number, path: string) => void): this;
	on(event: "REMOVE", listener: (reqid: number, path: string) => void): this;
	on(
		event: "RENAME",
		listener: (reqid: number, oldPath: string, newPath: string) => void,
	): this;
	on(event: "READLINK", listener: (reqid: number) => void): this;
	on(event: "SYMLINK", listener: (reqid: number) => void): this;
	on(event: "END", listener: () => void): this;
	status(reqid: number, code: number): void;
	attrs(reqid: number, attrs: SftpAttributes): void;
	handle(reqid: number, handle: Buffer): void;
	data(reqid: number, data: Buffer): void;
	name(
		reqid: number,
		entries: Array<{
			filename: string;
			longname: string;
			attrs: SftpAttributes;
		}>,
	): void;
}

export interface SftpMimicOptions {
	port: number;
	hostname?: string;
	shell?: VirtualShell;
	vfs?: VirtualFileSystem;
	users?: VirtualUserManager;
}

export class SftpMimic {
	port: number;
	server: SshServer | null;
	private readonly hostname: string;
	private readonly shell: VirtualShell | null;
	private readonly vfs: VirtualFileSystem;
	private readonly users: VirtualUserManager;
	private nextHandleId = 0;
	private handles = new Map<string, SftpHandle>();

	constructor({
		port,
		hostname = "typescript-vm",
		shell,
		vfs,
		users,
	}: SftpMimicOptions) {
		this.port = port;
		this.server = null;
		this.hostname = hostname;
		this.shell = null;

		if (shell) {
			this.vfs = shell.vfs;
			this.users = shell.users;
			this.hostname = shell.hostname;
			this.shell = shell;
		} else if (vfs && users) {
			this.vfs = vfs;
			this.users = users;
		} else {
			const defaultShell = new VirtualShell(hostname);
			this.vfs = defaultShell.vfs;
			this.users = defaultShell.users;
			this.shell = defaultShell;
		}
	}

	private getVfs(): VirtualFileSystem {
		return this.shell?.vfs ?? this.vfs;
	}

	private getUsers(): VirtualUserManager {
		return this.shell?.users ?? this.users;
	}

	public async start(): Promise<number> {
		const privateKey = loadOrCreateHostKey();

		// Ensure VirtualShell is fully initialized before accepting connections
		if (this.shell) {
			await this.shell.ensureInitialized();
		} else {
			// If using standalone VFS+Users, initialize users now
			await this.users.initialize();
		}

		this.server = new SshServer(
			{
				hostKeys: [privateKey],
				ident: `SSH-2.0-${this.hostname}`,
			},
			(client) => {
				let authUser = "root";
				let sessionId: string | null = null;
				let remoteAddress = "unknown";

				const acceptSession = (username: string): void => {
					authUser = username;
					sessionId = this.getUsers().registerSession(
						authUser,
						remoteAddress,
					).id;

					const homeRoot = "/home";
					if (!this.getVfs().exists(homeRoot)) {
						this.getVfs().mkdir(homeRoot, 0o755);
					}

					const homePath = `/home/${authUser}`;
					if (!this.getVfs().exists(homePath)) {
						this.getVfs().mkdir(homePath, 0o755);
						this.getVfs().writeFile(
							`${homePath}/README.txt`,
							`Welcome to ${this.hostname}`,
						);
						void this.getVfs().flushMirror();
					}
				};

				client.on("authentication", (ctx) => {
					const candidateUser = ctx.username || "root";
					remoteAddress = (ctx as { ip?: string }).ip ?? remoteAddress;

					if (ctx.method === "password") {
						if (
							!this.getUsers().verifyPassword(candidateUser, ctx.password ?? "")
						) {
							ctx.reject();
							return;
						}

						acceptSession(candidateUser);
						ctx.accept();
						return;
					}

					if (ctx.method === "keyboard-interactive") {
						const keyboardCtx = ctx as KeyboardAuthContext;
						keyboardCtx.prompt(
							[{ prompt: "Password: ", echo: false }],
							(answers) => {
								const password = answers[0] ?? "";
								if (!this.getUsers().verifyPassword(candidateUser, password)) {
									keyboardCtx.reject();
									return;
								}

								acceptSession(candidateUser);
								keyboardCtx.accept();
							},
						);
						return;
					}

					ctx.reject();
				});

				client.on("close", () => {
					this.getUsers().unregisterSession(sessionId);
					sessionId = null;
				});

				client.on("ready", () => {
					client.on("session", (accept, _reject) => {
						const session = accept();
						session.on("sftp", (acceptSftp) => {
							const sftp = acceptSftp();
							this.attachSftpHandlers(sftp, authUser);
						});
					});
				});
			},
		);

		return new Promise<number>((resolve, reject) => {
			this.server?.once("error", (err: unknown) => reject(err));
			this.server?.listen(this.port, "0.0.0.0", () => {
				const address = this.server?.address();
				const actualPort =
					address && typeof address === "object" && "port" in address
						? address.port
						: this.port;
				console.log(`SFTP Mimic listening on port ${actualPort}`);
				resolve(actualPort as number);
			});
		});
	}

	public stop(): void {
		if (this.server) {
			this.server.close(() => {
				console.log("SFTP Mimic stopped");
			});
		}
	}

	/**
	 * Resolves SFTP request paths with proper handling of relative paths.
	 * Relative paths (including ".") are resolved relative to the user's home directory.
	 * This is standard SFTP behavior where the "working directory" is always the home.
	 */
	private resolveRequestPath(requestPath: string, authUser: string): string {
		const homePath = `/home/${authUser}`;

		// Empty path or "." → resolve to home directory
		if (!requestPath || requestPath === ".") {
			return homePath;
		}

		// Relative path (doesn't start with "/") → resolve relative to home
		if (!requestPath.startsWith("/")) {
			const joined = path.posix.join(homePath, requestPath);
			return path.posix.normalize(joined);
		}

		// Absolute path → just normalize it
		return path.posix.normalize(requestPath);
	}
	/**
	 * Verifies that a target path is confined within the user's home directory.
	 * This implements chroot-like behavior for security.
	 * @param targetPath - The normalized target path
	 * @param authUser - The authenticated username
	 * @returns true if path is within home, false if traversal attempt detected
	 */
	private isPathWithinHome(targetPath: string, authUser: string): boolean {
		const homePath = `/home/${authUser}`;
		const normalized = path.posix.normalize(targetPath);

		// Allow access to home directory itself
		if (normalized === homePath) {
			return true;
		}

		// Check if path is within home directory (starts with /home/username/)
		if (normalized.startsWith(`${homePath}/`)) {
			return true;
		}

		// Reject any attempt to escape home directory
		return false;
	}

	private createAttrs(node: VfsNodeStats): SftpAttributes {
		const permissions = node.mode & 0o777;
		const fileType = node.type === "directory" ? 0o040000 : 0o100000;

		return {
			mode: fileType | permissions,
			size: node.type === "file" ? node.size : 0,
			uid: 0,
			gid: 0,
			atime: Math.floor(node.createdAt.getTime() / 1000),
			mtime: Math.floor(node.updatedAt.getTime() / 1000),
		};
	}

	private openHandle(handleValue: SftpHandle): Buffer {
		const handleId = ++this.nextHandleId;
		const handle = Buffer.alloc(4);
		handle.writeUInt32BE(handleId, 0);
		this.handles.set(handle.toString("hex"), handleValue);
		return handle;
	}

	private getHandle(handle: Buffer): SftpHandle | undefined {
		return this.handles.get(handle.toString("hex")) as SftpHandle | undefined;
	}

	private closeHandle(handle: Buffer): void {
		this.handles.delete(handle.toString("hex"));
	}

	private async attachSftpHandlers(
		sftp: SftpServerStream,
		authUser: string,
	): Promise<void> {
		const getVfs = () => this.getVfs();
		const getUsers = () => this.getUsers();

		sftp.on("OPEN", (reqid: number, filename: string, flags: number) => {
			const targetPath = this.resolveRequestPath(filename, authUser);

			// Security: Confine to home directory
			if (!this.isPathWithinHome(targetPath, authUser)) {
				console.warn(
					`[SFTP] Path traversal attempt blocked: user=${authUser}, path=${targetPath}`,
				);
				sftp.status(reqid, SFTP_STATUS_CODE.PERMISSION_DENIED);
				return;
			}

			const openMode = flags;
			const _canRead = Boolean(openMode & OPEN_MODE.READ);
			const _canWrite = Boolean(
				openMode & OPEN_MODE.WRITE || openMode & OPEN_MODE.APPEND,
			);
			const canCreate = Boolean(openMode & OPEN_MODE.CREAT);
			const shouldTruncate = Boolean(openMode & OPEN_MODE.TRUNC);

			try {
				if (!getVfs().exists(targetPath)) {
					if (!canCreate) {
						sftp.status(reqid, SFTP_STATUS_CODE.NO_SUCH_FILE);
						return;
					}

					getVfs().writeFile(targetPath, Buffer.alloc(0));
				}

				const stats = getVfs().stat(targetPath);
				if (stats.type === "directory") {
					sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
					return;
				}

				let buffer = Buffer.from(getVfs().readFile(targetPath), "utf8");
				if (shouldTruncate) {
					buffer = Buffer.alloc(0);
				}

				if (openMode & OPEN_MODE.APPEND) {
					const handle = this.openHandle({
						type: "file",
						path: targetPath,
						flags: openMode,
						buffer,
					});
					sftp.handle(reqid, handle);
					return;
				}

				const handle = this.openHandle({
					type: "file",
					path: targetPath,
					flags: openMode,
					buffer,
				});
				sftp.handle(reqid, handle);
			} catch (error) {
				console.error("SFTP OPEN error:", error);
				sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
			}
		});

		sftp.on(
			"READ",
			(reqid: number, handle: Buffer, offset: number, length: number) => {
				const entry = this.getHandle(handle);
				if (!entry || entry.type !== "file") {
					sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
					return;
				}

				if (offset >= entry.buffer.length) {
					sftp.status(reqid, SFTP_STATUS_CODE.EOF);
					return;
				}

				const chunk = entry.buffer.slice(offset, offset + length);
				sftp.data(reqid, chunk);
			},
		);

		sftp.on(
			"WRITE",
			async (reqid: number, handle: Buffer, offset: number, data: Buffer) => {
				const entry = this.getHandle(handle);
				if (!entry || entry.type !== "file") {
					sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
					return;
				}

				const end = offset + data.length;
				if (end > entry.buffer.length) {
					const nextBuffer = Buffer.alloc(end);
					entry.buffer.copy(nextBuffer, 0, 0, entry.buffer.length);
					entry.buffer = nextBuffer;
				}

				data.copy(entry.buffer, offset);
				sftp.status(reqid, SFTP_STATUS_CODE.OK);
			},
		);

		sftp.on("FSTAT", (reqid: number, handle: Buffer) => {
			const entry = this.getHandle(handle);
			if (!entry) {
				sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
				return;
			}

			try {
				const stats = getVfs().stat(entry.path);
				sftp.attrs(reqid, this.createAttrs(stats));
			} catch {
				sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
			}
		});

		sftp.on("CLOSE", async (reqid: number, handle: Buffer) => {
			const entry = this.getHandle(handle);
			if (!entry) {
				sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
				return;
			}

			if (entry.type === "file") {
				try {
					getUsers().assertWriteWithinQuota(authUser, entry.path, entry.buffer);
					getVfs().writeFile(entry.path, entry.buffer);
					void getVfs().flushMirror();
				} catch (error) {
					console.error("SFTP CLOSE write error:", error);
					sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
					this.closeHandle(handle);
					return;
				}
			}

			this.closeHandle(handle);
			sftp.status(reqid, SFTP_STATUS_CODE.OK);
		});

		sftp.on("OPENDIR", (reqid: number, requestPath: string) => {
			const targetPath = this.resolveRequestPath(requestPath, authUser);

			// Security: Confine to home directory
			if (!this.isPathWithinHome(targetPath, authUser)) {
				console.warn(
					`[SFTP] Path traversal attempt blocked: user=${authUser}, path=${targetPath}`,
				);
				sftp.status(reqid, SFTP_STATUS_CODE.PERMISSION_DENIED);
				return;
			}

			try {
				const stats = getVfs().stat(targetPath);
				if (stats.type !== "directory") {
					sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
					return;
				}

				const entries = getVfs().list(targetPath);
				const handle = this.openHandle({
					type: "dir",
					path: targetPath,
					entries,
					index: 0,
				});

				sftp.handle(reqid, handle);
			} catch {
				sftp.status(reqid, SFTP_STATUS_CODE.NO_SUCH_FILE);
			}
		});

		sftp.on("READDIR", (reqid: number, handle: Buffer) => {
			const entry = this.getHandle(handle);
			if (!entry || entry.type !== "dir") {
				sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
				return;
			}

			if (entry.index >= entry.entries.length) {
				sftp.status(reqid, SFTP_STATUS_CODE.EOF);
				return;
			}

			const filename = entry.entries[entry.index++]!;
			const filePath = path.posix.join(entry.path, filename);
			const stats = getVfs().stat(filePath);
			const attrs = this.createAttrs(stats);
			const longname = `${stats.type === "directory" ? "d" : "-"}${(stats.mode & 0o777).toString(8)} ${filename}`;
			return sftp.name(reqid, [{ filename, longname, attrs }]);
		});

		sftp.on("STAT", (reqid: number, requestPath: string) => {
			const targetPath = this.resolveRequestPath(requestPath, authUser);

			// Security: Confine to home directory
			if (!this.isPathWithinHome(targetPath, authUser)) {
				console.warn(
					`[SFTP] Path traversal attempt blocked: user=${authUser}, path=${targetPath}`,
				);
				sftp.status(reqid, SFTP_STATUS_CODE.PERMISSION_DENIED);
				return;
			}

			try {
				const stats = getVfs().stat(targetPath);
				sftp.attrs(reqid, this.createAttrs(stats));
			} catch {
				sftp.status(reqid, SFTP_STATUS_CODE.NO_SUCH_FILE);
			}
		});

		sftp.on("LSTAT", (reqid: number, requestPath: string) => {
			const targetPath = this.resolveRequestPath(requestPath, authUser);

			// Security: Confine to home directory
			if (!this.isPathWithinHome(targetPath, authUser)) {
				console.warn(
					`[SFTP] Path traversal attempt blocked: user=${authUser}, path=${targetPath}`,
				);
				sftp.status(reqid, SFTP_STATUS_CODE.PERMISSION_DENIED);
				return;
			}

			try {
				const stats = getVfs().stat(targetPath);
				sftp.attrs(reqid, this.createAttrs(stats));
			} catch {
				sftp.status(reqid, SFTP_STATUS_CODE.NO_SUCH_FILE);
			}
		});

		sftp.on(
			"FSETSTAT",
			(reqid: number, handle: Buffer, attrs: { mode?: number }) => {
				const entry = this.getHandle(handle);
				if (!entry) {
					sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
					return;
				}

				try {
					if (attrs.mode !== undefined) {
						getVfs().chmod(entry.path, attrs.mode);
					}
					sftp.status(reqid, SFTP_STATUS_CODE.OK);
				} catch {
					sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
				}
			},
		);

		sftp.on(
			"SETSTAT",
			(reqid: number, requestPath: string, attrs: { mode?: number }) => {
				const targetPath = this.resolveRequestPath(requestPath, authUser);

				// Security: Confine to home directory
				if (!this.isPathWithinHome(targetPath, authUser)) {
					console.warn(
						`[SFTP] Path traversal attempt blocked: user=${authUser}, path=${targetPath}`,
					);
					sftp.status(reqid, SFTP_STATUS_CODE.PERMISSION_DENIED);
					return;
				}

				try {
					if (attrs.mode !== undefined) {
						getVfs().chmod(targetPath, attrs.mode);
					}
					sftp.status(reqid, SFTP_STATUS_CODE.OK);
				} catch {
					sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
				}
			},
		);

		sftp.on("REALPATH", (reqid: number, requestPath: string) => {
			const normalized = this.resolveRequestPath(requestPath, authUser);

			// Security: Confine to home directory
			if (!this.isPathWithinHome(normalized, authUser)) {
				console.warn(
					`[SFTP] Path traversal attempt blocked: user=${authUser}, path=${normalized}`,
				);
				sftp.status(reqid, SFTP_STATUS_CODE.PERMISSION_DENIED);
				return;
			}

			sftp.name(reqid, [
				{
					filename: normalized,
					longname: normalized,
					attrs: {
						mode: 0o040755,
						uid: 0,
						gid: 0,
						size: 0,
						atime: 0,
						mtime: 0,
					},
				},
			]);
		});

		sftp.on("MKDIR", (reqid: number, requestPath: string) => {
			const targetPath = this.resolveRequestPath(requestPath, authUser);

			// Security: Confine to home directory
			if (!this.isPathWithinHome(targetPath, authUser)) {
				console.warn(
					`[SFTP] Path traversal attempt blocked: user=${authUser}, path=${targetPath}`,
				);
				sftp.status(reqid, SFTP_STATUS_CODE.PERMISSION_DENIED);
				return;
			}

			try {
				getVfs().mkdir(targetPath, 0o755);
				void getVfs().flushMirror();
				sftp.status(reqid, SFTP_STATUS_CODE.OK);
			} catch {
				sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
			}
		});

		sftp.on("RMDIR", (reqid: number, requestPath: string) => {
			const targetPath = this.resolveRequestPath(requestPath, authUser);

			// Security: Confine to home directory
			if (!this.isPathWithinHome(targetPath, authUser)) {
				console.warn(
					`[SFTP] Path traversal attempt blocked: user=${authUser}, path=${targetPath}`,
				);
				sftp.status(reqid, SFTP_STATUS_CODE.PERMISSION_DENIED);
				return;
			}

			try {
				getVfs().remove(targetPath, { recursive: false });
				void getVfs().flushMirror();
				sftp.status(reqid, SFTP_STATUS_CODE.OK);
			} catch {
				sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
			}
		});

		sftp.on("REMOVE", (reqid: number, requestPath: string) => {
			const targetPath = this.resolveRequestPath(requestPath, authUser);

			// Security: Confine to home directory
			if (!this.isPathWithinHome(targetPath, authUser)) {
				console.warn(
					`[SFTP] Path traversal attempt blocked: user=${authUser}, path=${targetPath}`,
				);
				sftp.status(reqid, SFTP_STATUS_CODE.PERMISSION_DENIED);
				return;
			}

			try {
				getVfs().remove(targetPath, { recursive: false });
				void getVfs().flushMirror();
				sftp.status(reqid, SFTP_STATUS_CODE.OK);
			} catch {
				sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
			}
		});

		sftp.on("RENAME", (reqid: number, oldPath: string, newPath: string) => {
			const fromPath = this.resolveRequestPath(oldPath, authUser);
			const toPath = this.resolveRequestPath(newPath, authUser);

			// Security: Confine both source and destination to home directory
			if (
				!this.isPathWithinHome(fromPath, authUser) ||
				!this.isPathWithinHome(toPath, authUser)
			) {
				console.warn(
					`[SFTP] Path traversal attempt blocked: user=${authUser}, from=${fromPath}, to=${toPath}`,
				);
				sftp.status(reqid, SFTP_STATUS_CODE.PERMISSION_DENIED);
				return;
			}

			try {
				getVfs().move(fromPath, toPath);
				void getVfs().flushMirror();
				sftp.status(reqid, SFTP_STATUS_CODE.OK);
			} catch {
				sftp.status(reqid, SFTP_STATUS_CODE.FAILURE);
			}
		});

		sftp.on("READLINK", (reqid: number) => {
			sftp.status(reqid, SFTP_STATUS_CODE.OP_UNSUPPORTED);
		});

		sftp.on("SYMLINK", (reqid: number) => {
			sftp.status(reqid, SFTP_STATUS_CODE.OP_UNSUPPORTED);
		});

		sftp.on("END", () => {
			this.handles.clear();
		});
	}
}
