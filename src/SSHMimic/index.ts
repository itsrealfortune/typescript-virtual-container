import { randomBytes } from "node:crypto";
import { Server as SshServer } from "ssh2";
import VirtualFileSystem from "../VirtualFileSystem";
import { VirtualShell } from "../VirtualShell";
import { loadOrCreateHostKey } from "./hostKey";
import { VirtualUserManager } from "./users";

function resolveRootPassword(): string {
	const configured = process.env.SSH_MIMIC_ROOT_PASSWORD;
	if (configured && configured.trim().length > 0) {
		return configured;
	}

	const generated = randomBytes(18).toString("base64url");
	console.warn(
		`[ssh-mimic] SSH_MIMIC_ROOT_PASSWORD missing; generated ephemeral root password: ${generated}`,
	);
	return generated;
}

function resolveAutoSudoForNewUsers(): boolean {
	const configured = process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;
	if (!configured) {
		return true;
	}

	return !["0", "false", "no", "off"].includes(configured.toLowerCase());
}

/**
 * SSH server wrapper that exposes virtual shell and exec sessions.
 *
 * Create an instance, call {@link SshMimic.start}, and stop it with
 * {@link SshMimic.stop} when your process exits.
 */
class SshMimic {
	port: number;
	hostname: string;
	server: SshServer | null;
	vfs: VirtualFileSystem | null = null;
	users: VirtualUserManager | null = null;
	shell: VirtualShell | null = null;
	basePath: string = ".";

	/**
	 * Creates a new SSH mimic server instance.
	 *
	 * @param port TCP port to bind on localhost.
	 * @param hostname SSH ident hostname suffix and virtual host label.
	 * @param basePath Optional base path for virtual filesystem (default: current directory).
	 */
	constructor({
		port,
		hostname = "typescript-vm",
		basePath = ".",
	}: {
		port: number;
		hostname?: string;
		basePath?: string;
	}) {
		this.port = port;
		this.hostname = hostname;
		this.basePath = basePath;
		this.server = null;
	}

	/**
	 * Starts server and initializes virtual filesystem, users, and handlers.
	 *
	 * @returns Promise resolved with bound listening port.
	 */
	public async start(): Promise<number> {
		const privateKey = loadOrCreateHostKey();
		this.vfs = new VirtualFileSystem(this.basePath);
		await this.vfs.restoreMirror();
		this.users = new VirtualUserManager(
			this.vfs,
			resolveRootPassword(),
			resolveAutoSudoForNewUsers(),
		);
		await this.users.initialize();

		this.shell = new VirtualShell(this.vfs, this.users, this.hostname);

		this.server = new SshServer(
			{
				hostKeys: [privateKey],
				ident: `SSH-2.0-${this.hostname}`,
			},
			(client) => {
				let authUser = "root";
				let remoteAddress = "unknown";
				let sessionId: string | null = null;

				client.on("authentication", (ctx) => {
					if (ctx.method === "password") {
						const candidateUser = ctx.username || "root";
						remoteAddress = (ctx as { ip?: string }).ip ?? remoteAddress;

						if (
							!this.users!.verifyPassword(candidateUser, ctx.password ?? "")
						) {
							ctx.reject();
							return;
						}

						authUser = candidateUser;
						sessionId = this.users!.registerSession(authUser, remoteAddress).id;

						const homePath = `/home/${authUser}`;
						if (!this.vfs!.exists(homePath)) {
							this.vfs!.mkdir(homePath, 0o755);
							this.vfs!.writeFile(
								`${homePath}/README.txt`,
								`Welcome to ${this.hostname}`,
							);
							void this.vfs!.flushMirror();
						}

						ctx.accept();
						return;
					}

					ctx.reject();
				});

				client.on("close", () => {
					this.users!.unregisterSession(sessionId);
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
							this.shell?.startInteractiveSession(
								stream,
								authUser,
								sessionId,
								remoteAddress,
								terminalSize,
							);
						});

						session.on("exec", (acceptExec, _rejectExec, info) => {
							const _stream = acceptExec();
							this.shell?.executeCommand(
								info.command.trim(),
								authUser,
								`/home/${authUser}`,
							);
						});
					});
				});
			},
		);

		return new Promise<number>((resolve, reject) => {
			this.server?.once("error", (err: unknown) => reject(err));
			this.server?.listen(this.port, "127.0.0.1", () => {
				console.log(`SSH Mimic listening on port ${this.port}`);
				resolve(this.port);
			});
		});
	}

	/**
	 * Stops server if running.
	 */
	public stop(): void {
		if (this.server) {
			this.server.close(() => {
				console.log("SSH Mimic stopped");
			});
		}
	}

	/**
	 * Returns virtual filesystem instance after server started.
	 *
	 * @returns VirtualFileSystem or null when not started.
	 */
	public getVfs(): VirtualFileSystem | null {
		return this.vfs;
	}

	/**
	 * Returns user manager instance after server started.
	 *
	 * @returns VirtualUserManager or null when not started.
	 */
	public getUsers(): VirtualUserManager | null {
		return this.users;
	}

	/**
	 * Returns hostname shown in prompts and idents.
	 *
	 * @returns Configured hostname label.
	 */
	public getHostname(): string {
		return this.hostname;
	}
}

export { SshMimic };
