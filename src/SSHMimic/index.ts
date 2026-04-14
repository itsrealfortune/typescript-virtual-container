import { Server as SshServer } from "ssh2";
import VirtualFileSystem from "../VirtualFileSystem";
import { runExec } from "./exec";
import { loadOrCreateHostKey } from "./hostKey";
import { startShell } from "./shell";
import { VirtualUserManager } from "./users";

class SshMimic {
	private port: number;
	private hostname: string;
	private server: SshServer | null;

	constructor(port: number, hostname = "typescript-vm") {
		this.port = port;
		this.hostname = hostname;
		this.server = null;
	}

	public async start(): Promise<number> {
		const privateKey = loadOrCreateHostKey();
		const vfs = new VirtualFileSystem();
		await vfs.restoreMirror();
		const users = new VirtualUserManager(
			vfs,
			process.env.SSH_MIMIC_ROOT_PASSWORD ?? "root",
		);
		await users.initialize();

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

						if (!users.verifyPassword(candidateUser, ctx.password ?? "")) {
							ctx.reject();
							return;
						}

						authUser = candidateUser;
						sessionId = users.registerSession(authUser, remoteAddress).id;

						const homePath = `/home/${authUser}`;
						if (!vfs.exists(homePath)) {
							vfs.mkdir(homePath, 0o755);
							vfs.writeFile(
								`${homePath}/README.txt`,
								`Welcome to ${this.hostname}`,
							);
							void vfs.flushMirror();
						}

						ctx.accept();
						return;
					}

					ctx.reject();
				});

				client.on("close", () => {
					users.unregisterSession(sessionId);
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
							startShell(
								stream,
								authUser,
								vfs,
								this.hostname,
								users,
								sessionId,
								remoteAddress,
								terminalSize,
							);
						});

						session.on("exec", (acceptExec, _rejectExec, info) => {
							const stream = acceptExec();
							runExec(
								stream,
								info.command.trim(),
								authUser,
								this.hostname,
								users,
								vfs,
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

	public stop(): void {
		if (this.server) {
			this.server.close(() => {
				console.log("SSH Mimic stopped");
			});
		}
	}
}

export default SshMimic;
