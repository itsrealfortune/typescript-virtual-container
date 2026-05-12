import { EventEmitter } from "node:events";
import { Server as SshServer } from "ssh2";
import { VirtualShell } from "../VirtualShell";
import { createPerfLogger, type PerfLogger } from "../utils/perfLogger";
import { runExec } from "./exec";
import { loadOrCreateHostKey } from "./hostKey";

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
const DEV = !!process.env.DEV_MODE;
const devLog = DEV ? console.log.bind(console) : () => {};


interface RateLimitEntry {
	attempts: number;
	lockedUntil: number;
}

class SshMimic extends EventEmitter {
	port: number;
	server: SshServer | null;
	private shell: VirtualShell;

	/** Max failed auth attempts before an IP is temporarily locked. */
	private readonly maxAuthAttempts: number;
	/** How long (ms) a locked IP must wait before retrying. */
	private readonly lockoutDurationMs: number;
	private readonly authAttempts = new Map<string, RateLimitEntry>();

	/**
	 * Creates a new SSH mimic server instance.
	 *
	 * @param port TCP port to bind on localhost.
	 * @param hostname Virtual hostname used for the SSH ident and default shell label.
	 * @param shell Optional preconfigured virtual shell instance to reuse.
	 * @param maxAuthAttempts Max failed attempts per IP before lockout (default: 5).
	 * @param lockoutDurationMs Lockout window in ms after exceeding attempts (default: 60 000).
	 */
	constructor({
		port,
		hostname = "typescript-vm",
		shell = new VirtualShell(hostname),
		maxAuthAttempts = 5,
		lockoutDurationMs = 60_000,
	}: {
		port: number;
		hostname?: string;
		shell?: VirtualShell;
		maxAuthAttempts?: number;
		lockoutDurationMs?: number;
	}) {
		super();
		perf.mark("constructor");
		this.port = port;
		this.server = null;
		this.shell = shell;
		this.maxAuthAttempts = maxAuthAttempts;
		this.lockoutDurationMs = lockoutDurationMs;
	}

	// ── Rate limiting ────────────────────────────────────────────────────────

	private isLockedOut(ip: string): boolean {
		const entry = this.authAttempts.get(ip);
		if (!entry) return false;
		if (Date.now() < entry.lockedUntil) return true;
		if (entry.lockedUntil > 0) {
			this.authAttempts.delete(ip);
		}
		return false;
	}

	private recordFailure(ip: string): void {
		const entry = this.authAttempts.get(ip) ?? { attempts: 0, lockedUntil: 0 };
		entry.attempts += 1;
		if (entry.attempts >= this.maxAuthAttempts) {
			entry.lockedUntil = Date.now() + this.lockoutDurationMs;
			this.emit("auth:lockout", { ip, until: new Date(entry.lockedUntil) });
		}
		this.authAttempts.set(ip, entry);
	}

	private recordSuccess(ip: string): void {
		this.authAttempts.delete(ip);
	}

	// ── Home directory bootstrap ─────────────────────────────────────────────

	private ensureHomeDir(authUser: string): void {
		const homePath = `/home/${authUser}`;
		if (!this.shell.vfs.exists(homePath)) {
			this.shell.vfs.mkdir(homePath, 0o755);
			this.shell.vfs.writeFile(
				`${homePath}/README.txt`,
				`Welcome to ${this.shell.hostname}\n`,
			);
			void this.shell.vfs.stopAutoFlush();
		}
	}

	// ── Server lifecycle ─────────────────────────────────────────────────────

	/**
	 * Starts server and initializes virtual filesystem, users, and handlers.
	 *
	 * @returns Promise resolved with bound listening port.
	 */
	public async start(): Promise<number> {
		perf.mark("start");
		const shell = this.shell;
		const privateKey = loadOrCreateHostKey();

		await shell.ensureInitialized();

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
					if (this.isLockedOut(remoteAddress)) {
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
							authUser = candidateUser;
							sessionId = shell.users.registerSession(
								authUser,
								remoteAddress,
							).id;
							this.recordSuccess(remoteAddress);
							this.emit("auth:success", { username: authUser, remoteAddress });
							this.ensureHomeDir(authUser);
							ctx.accept();
							return;
						}

						if (
							!ctx.password ||
							ctx.password === "" ||
							!shell.users.verifyPassword(candidateUser, ctx.password)
						) {
							this.recordFailure(remoteAddress);
							this.emit("auth:failure", {
								username: candidateUser,
								remoteAddress,
							});
							ctx.reject();
							return;
						}

						authUser = candidateUser;
						sessionId = shell.users.registerSession(authUser, remoteAddress).id;
						this.recordSuccess(remoteAddress);
						this.emit("auth:success", { username: authUser, remoteAddress });
						this.ensureHomeDir(authUser);
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
							this.recordFailure(remoteAddress);
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
							this.recordSuccess(remoteAddress);
							this.emit("auth:success", {
								username: authUser,
								remoteAddress,
								method: "publickey",
							});
							this.ensureHomeDir(authUser);
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
							if (stream) {
								runExec(
									stream,
									info.command.trim(),
									authUser,
									shell.hostname,
									shell,
								);
							}
						});
					});
				});
			},
		);

		return new Promise<number>((resolve, reject) => {
			this.server?.once("error", (err: unknown) => reject(err));
			this.server?.listen(this.port, "0.0.0.0", () => {
				devLog(`SSH Mimic listening on port ${this.port}`);
				this.emit("start", { port: this.port });
				resolve(this.port);
			});
		});
	}

	/**
	 * Stops server if running.
	 */
	public stop(): void {
		perf.mark("stop");
		if (this.server) {
			this.server.close(() => {
				devLog("SSH Mimic stopped");
				this.emit("stop");
			});
		}
	}

	/**
	 * Manually clears the rate-limit record for an IP address.
	 * Useful in tests or admin tooling.
	 */
	public clearLockout(ip: string): void {
		this.authAttempts.delete(ip);
	}
}

export { SftpMimic } from "./sftp";
export { SshMimic };
