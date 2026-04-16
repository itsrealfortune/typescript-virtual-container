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
 */
const perf: PerfLogger = createPerfLogger("SshMimic");


class SshMimic extends EventEmitter {
	port: number;
	server: SshServer | null;
	private shell: VirtualShell;
	private shellHostname: string;

	/**
	 * Creates a new SSH mimic server instance.
	 *
	 * @param port TCP port to bind on localhost.
	 * @param hostname Virtual hostname used for the SSH ident and default shell label.
	 * @param shell Optional preconfigured virtual shell instance to reuse.
	 */
	constructor({
		port,
		hostname = "typescript-vm",
		shell = new VirtualShell(hostname),
	}: {
		port: number;
		hostname?: string;
		shell?: VirtualShell;
	}) {
		super();
		this.port = port;
		this.shellHostname = hostname;
		this.server = null;
		this.shell = shell;
	}

	/**
	 * Starts server and initializes virtual filesystem, users, and handlers.
	 *
	 * @returns Promise resolved with bound listening port.
	 */
	public async start(): Promise<number> {
		const shell = this.shell;
		const privateKey = loadOrCreateHostKey();

		// Ensure VirtualShell is fully initialized before accepting connections
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
					shell;
					if (ctx.method === "password") {
						const candidateUser = ctx.username || "root";
						remoteAddress = (ctx as { ip?: string }).ip ?? remoteAddress;

						if (
							!shell.users.verifyPassword(candidateUser, ctx.password ?? "")
						) {
							this.emit("auth:failure", {
								username: candidateUser,
								remoteAddress,
							});
							ctx.reject();
							return;
						}

						authUser = candidateUser;
						sessionId = shell.users.registerSession(authUser, remoteAddress).id;
						this.emit("auth:success", { username: authUser, remoteAddress });

						const homePath = `/home/${authUser}`;
						if (!shell.vfs.exists(homePath)) {
							shell.vfs.mkdir(homePath, 0o755);
							shell.vfs.writeFile(
								`${homePath}/README.txt`,
								`Welcome to ${shell?.hostname ?? this.shellHostname}`,
							);
							void shell.vfs.flushMirror();
						}

						ctx.accept();
						return;
					}

					ctx.reject();
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
				console.log(`SSH Mimic listening on port ${this.port}`);
				this.emit("start", { port: this.port });
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
				this.emit("stop");
			});
		}
	}
}

export { SftpMimic } from "./sftp";
export { SshMimic };

