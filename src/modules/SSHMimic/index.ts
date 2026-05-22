import { EventEmitter } from "node:events";
import { Server as SshServer } from "ssh2";
import { userHome } from "../../commands";
import { createPerfLogger, type PerfLogger } from "../../utils/perfLogger";
import { VirtualShell } from "../VirtualShell";
import { runExec } from "./exec";
import { loadOrCreateHostKey } from "./hostKey";
import { handleScp } from "./scp";
import type { SftpMimic } from "./sftp";

/**
 * SSH server facade that wires the virtual shell runtime into ssh2 sessions.
 *
 * This class is exported as `VirtualSshServer` for public API compatibility.
 * Create an instance, call {@link SshMimic.start}, and stop it with
 * {@link SshMimic.stop} when your process exits.
 *
 * Features:
 * - Password authentication
 * - Public-key authentication
 * - Per-IP rate limiting / lockout for brute-force protection
 * - Interactive shell sessions
 * - Non-interactive exec sessions
 */
const perf: PerfLogger = createPerfLogger("SshMimic");

// ── Dev-mode logger ───────────────────────────────────────────────────────────
const DEV = Boolean(process.env.DEV_MODE);
const devLog = DEV ? console.log.bind(console) : () => {};


/** @internal */
interface RateLimitEntry {
	attempts: number;
	lockedUntil: number;
}

/**
 * SSH server simulator accepting ssh2 client connections.
 * Routes authentication, shell, exec, and SFTP sessions to a VirtualShell.
 *
 * @example
 * ```ts
 * const shell = new VirtualShell("my-server");
 * shell.ensureInitialized();
 *
 * const ssh = new SshMimic(shell, { port: 2222 });
 * const actualPort = await ssh.start();
 * console.log(`SSH listening on port ${actualPort}`);
 *
 * // Connect with: ssh -p 2222 user@localhost
 * // Stop when done:
 * // ssh.stop();
 * ```
 *
 * @see {@link VirtualShell}
 * @see {@link SftpMimic}
 * @see {@link VirtualSshServer}
 */
class SshMimic extends EventEmitter {
	port: number;
	server: SshServer | null;
	private _shell: VirtualShell;
	private readonly _sftpMimic: SftpMimic | null;

	/** Max failed auth attempts before an IP is temporarily locked. */
	private readonly _maxAuthAttempts: number;
	/** How long (ms) a locked IP must wait before retrying. */
	private readonly _lockoutDurationMs: number;
	private readonly _authAttempts = new Map<string, RateLimitEntry>();

	/**
	 * Creates a new SSH mimic server instance.
	 *
	 * @param options - Configuration object for the SSH server.
	 * @param options.port - TCP port to bind on localhost.
	 * @param options.hostname - Virtual hostname used for the SSH ident and default shell label.
	 * @param options.shell - Optional preconfigured virtual shell instance to reuse.
	 * @param options.sftp - Optional SftpMimic instance to handle SFTP subsystem requests on this SSH port.
	 * @param options.maxAuthAttempts - Max failed attempts per IP before lockout (default: 5).
	 * @param options.lockoutDurationMs - Lockout window in ms after exceeding attempts (default: 60 000).
	 */
	constructor({
		port,
		hostname = "typescript-vm",
		shell = new VirtualShell(hostname),
		sftp = null,
		maxAuthAttempts = 5,
		lockoutDurationMs = 60_000,
	}: {
		port: number;
		hostname?: string;
		shell?: VirtualShell;
		sftp?: SftpMimic | null;
		maxAuthAttempts?: number;
		lockoutDurationMs?: number;
	}) {
		super();
		perf.mark("constructor");
		this.port = port;
		this.server = null;
		this._shell = shell;
		this._sftpMimic = sftp;
		this._maxAuthAttempts = maxAuthAttempts;
		this._lockoutDurationMs = lockoutDurationMs;
	}

	// ── Rate limiting ────────────────────────────────────────────────────────

	private _isLockedOut(ip: string): boolean {
		const entry = this._authAttempts.get(ip);
		if (!entry) { return false; }
		if (Date.now() < entry.lockedUntil) { return true; }
		if (entry.lockedUntil > 0) {
			this._authAttempts.delete(ip);
		}
		return false;
	}

	private _recordFailure(ip: string): void {
		const entry = this._authAttempts.get(ip) ?? { attempts: 0, lockedUntil: 0 };
		entry.attempts += 1;
		if (entry.attempts >= this._maxAuthAttempts) {
			entry.lockedUntil = Date.now() + this._lockoutDurationMs;
			this.emit("auth:lockout", { ip, until: new Date(entry.lockedUntil) });
		}
		this._authAttempts.set(ip, entry);
	}

	private _recordSuccess(ip: string): void {
		this._authAttempts.delete(ip);
	}

	// ── Home directory bootstrap ─────────────────────────────────────────────

	private _ensureHomeDir(authUser: string): void {
		const homePath = userHome(authUser);
		if (!this._shell.vfs.exists(homePath)) {
			const uid = this._shell.users.getUid(authUser);
			const gid = this._shell.users.getGid(authUser);
			this._shell.vfs.mkdir(homePath, 0o700, uid, gid);
			this._shell.vfs.writeFile(
				`${homePath}/README.txt`,
				`Welcome to ${this._shell.hostname}\n`,
				{},
				uid,
				gid,
			);
			void this._shell.vfs.stopAutoFlush();
		}
	}

	// ── Server lifecycle ─────────────────────────────────────────────────────

	/**
	 * Starts server and initializes virtual filesystem, users, and handlers.
	 *
	 * @returns Promise resolved with bound listening port.
	 */
	public start(): Promise<number> {
		perf.mark("start");
		const shell = this._shell;
		const privateKey = loadOrCreateHostKey();

		shell.ensureInitialized();

		this.server = new SshServer(
			{
				hostKeys: [privateKey],
				ident: `SSH-2.0-${shell.hostname}`,
			},
			(client) => {
				let authUser = "root";
				let remoteAddress = "unknown";
				let sessionId: string | null = null;

				this.emit("client:connect");

				client.on("authentication", (ctx) => {
					const candidateUser = ctx.username || "root";
					remoteAddress = (ctx as { ip?: string }).ip ?? remoteAddress;

					// Rate-limit check
					if (this._isLockedOut(remoteAddress)) {
						this.emit("auth:failure", {
							username: candidateUser,
							remoteAddress,
							reason: "lockout",
						});
						ctx.reject();
						return;
					}

					// ── Password auth ──────────────────────────────────────
					if (ctx.method === "password") {
						if (!shell.users.hasPassword(candidateUser)) {
							shell.users.ensureUser(candidateUser);
							authUser = candidateUser;
							sessionId = shell.users.registerSession(
								authUser,
								remoteAddress,
							).id;
							this._recordSuccess(remoteAddress);
							this.emit("auth:success", { username: authUser, remoteAddress });
							this._ensureHomeDir(authUser);
							ctx.accept();
							return;
						}

						if (
							!ctx.password ||
							ctx.password === "" ||
							!shell.users.verifyPassword(candidateUser, ctx.password)
						) {
							this._recordFailure(remoteAddress);
							this.emit("auth:failure", {
								username: candidateUser,
								remoteAddress,
							});
							ctx.reject();
							return;
						}

						authUser = candidateUser;
						sessionId = shell.users.registerSession(authUser, remoteAddress).id;
						this._recordSuccess(remoteAddress);
						this.emit("auth:success", { username: authUser, remoteAddress });
						this._ensureHomeDir(authUser);
						ctx.accept();
						return;
					}

					// ── Public-key auth ────────────────────────────────────
					if (ctx.method === "publickey") {
						const authorizedKeys = shell.users.getAuthorizedKeys(candidateUser);
						if (authorizedKeys.length === 0) {
							// No keys configured — reject cleanly
							ctx.reject();
							return;
						}

						const incomingKey = ctx.key;
						const keyMatches = authorizedKeys.some(
							(k) =>
								k.algo === incomingKey.algo && k.data.equals(incomingKey.data),
						);

						if (!keyMatches) {
							this._recordFailure(remoteAddress);
							this.emit("auth:failure", {
								username: candidateUser,
								remoteAddress,
								method: "publickey",
							});
							ctx.reject();
							return;
						}

						// Key matched — if this is a signature check step, accept
						if (ctx.signature) {
							authUser = candidateUser;
							sessionId = shell.users.registerSession(
								authUser,
								remoteAddress,
							).id;
							this._recordSuccess(remoteAddress);
							this.emit("auth:success", {
								username: authUser,
								remoteAddress,
								method: "publickey",
							});
							this._ensureHomeDir(authUser);
							ctx.accept();
						} else {
							// Key exists but no signature yet — ssh2 will call again with signature
							ctx.accept();
						}
						return;
					}

					ctx.reject(["password", "publickey"]);
				});

				client.on("close", () => {
					shell.users.unregisterSession(sessionId);
					this.emit("client:disconnect", { user: authUser });
					sessionId = null;
				});

				client.on("ready", () => {
					client.on("session", (accept) => {
						const session = accept();
						const terminalSize = { cols: 80, rows: 24 };

						session.on("pty", (acceptPty, _rejectPty, info) => {
							terminalSize.cols = info?.cols ?? terminalSize.cols;
							terminalSize.rows = info?.rows ?? terminalSize.rows;
							acceptPty();
						});

						session.on(
							"window-change",
							(_acceptChange, _rejectChange, info) => {
								terminalSize.cols = info?.cols ?? terminalSize.cols;
								terminalSize.rows = info?.rows ?? terminalSize.rows;
							},
						);

						session.on("shell", (acceptShell) => {
							const stream = acceptShell();
							shell?.startInteractiveSession(
								stream,
								authUser,
								sessionId,
								remoteAddress,
								terminalSize,
							);
						});

						session.on("exec", (acceptExec, _rejectExec, info) => {
							const stream = acceptExec();
							if (!stream) { return; }
							const cmd = info.command.trim();
							const parts = cmd.split(/\s+/);
							if (parts[0] === "scp") {
								handleScp(stream, parts.slice(1), authUser, shell);
							} else {
								runExec(stream, cmd, authUser, shell.hostname, shell);
							}
						});

						session.on("sftp", (acceptSftp, rejectSftp) => {
							if (this._sftpMimic) {
								const sftp = acceptSftp();
								this._sftpMimic.attachSftpHandlers(sftp, authUser);
								// Close the SSH connection when the SFTP channel ends
								// (scp/sftp clients open a session just for the transfer).
								sftp.on("close", () => client.end());
								sftp.on("end",   () => sftp.end());
							} else {
								rejectSftp();
							}
						});
					});
				});
			},
		);

		return new Promise<number>((resolve, reject) => {
			this.server?.once("error", (err: unknown) => reject(err));
			this.server?.listen(this.port, "0.0.0.0", () => {
				const addr = this.server?.address();
				const actualPort = typeof addr === "object" && addr ? addr.port : this.port;
				this.port = actualPort;
				devLog(`SSH Mimic listening on port ${actualPort}`);
				this.emit("start", { port: actualPort });
				resolve(actualPort);
			});
		});
	}

	/**
	 * Stops server if running.
	 */
	public stop(): void {
		perf.mark("stop");
		// Flush pending WAL journal before closing
		void this._shell.vfs.stopAutoFlush();
		if (this.server) {
			this.server.close(() => {
				devLog("SSH Mimic stopped");
				this.emit("stop");
			});
		}
	}

	/**
	 * Records a simulated authentication failure for the given IP.
	 * If the failure count reaches `maxAuthAttempts`, the IP is locked out
	 * and an `auth:lockout` event is emitted.
	 */
	public recordAuthFailure(ip: string): void {
		this._recordFailure(ip);
	}

	/**
	 * Manually clears the rate-limit record for an IP address.
	 * Useful in tests or admin tooling.
	 */
	public clearLockout(ip: string): void {
		this._authAttempts.delete(ip);
	}
}

export { SftpMimic } from "./sftp";
export { SshMimic };

