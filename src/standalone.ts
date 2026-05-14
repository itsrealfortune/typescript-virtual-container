import { VirtualSftpServer, VirtualShell, VirtualSshServer } from ".";

// ── CLI argument parsing ──────────────────────────────────────────────────────

const argv = process.argv.slice(2);

function getFlag(name: string): boolean {
	return argv.includes(name);
}

function getOption(name: string, fallback: number): number {
	const prefix = `${name}=`;
	const entry = argv.find((a) => a === name || a.startsWith(prefix));
	if (!entry) return fallback;
	if (entry.startsWith(prefix)) return parseInt(entry.slice(prefix.length), 10);
	const next = argv[argv.indexOf(entry) + 1];
	return next ? parseInt(next, 10) : fallback;
}

const noSsh  = getFlag("--no-ssh");
const noSftp = getFlag("--no-sftp");

if (noSsh && noSftp) {
	console.error("standalone: at least one server must be enabled (cannot use both --no-ssh and --no-sftp)");
	process.exit(1);
}

const sshPort  = getOption("--ssh-port",  2222);
const sftpPort = getOption("--sftp-port", 2223);

// ── Shell ─────────────────────────────────────────────────────────────────────

const hostname = process.env.SSH_MIMIC_HOSTNAME ?? "typescript-vm";
const virtualShell = new VirtualShell(hostname, undefined, {
	mode: "fs",
	snapshotPath: ".vfs",
});

virtualShell.addCommand("demo", [], () => {
	return {
		stdout: "This is a demo command. It does nothing useful.",
		exitCode: 0,
	};
});

// ── Servers ───────────────────────────────────────────────────────────────────

// Create the SFTP handler first so the SSH server can reuse it for the
// sftp subsystem (enables `scp` and SFTP clients on the SSH port directly).
const sftpServer = noSftp ? null : new VirtualSftpServer({ port: sftpPort, hostname, shell: virtualShell });

if (!noSsh) {
	new VirtualSshServer({ port: sshPort, hostname, shell: virtualShell, sftp: sftpServer })
		.start()
		.catch((error: unknown) => {
			console.error("Failed to start SSH server:", error);
			process.exit(1);
		});
}

if (sftpServer) {
	sftpServer
		.start()
		.catch((error: unknown) => {
			console.error("Failed to start SFTP server:", error);
			process.exit(1);
		});
}

// ── Graceful shutdown ─────────────────────────────────────────────────────────
// On SIGINT / SIGTERM: flush the WAL journal to a full checkpoint before exit.
// A kill -9 or OOM crash is unrecoverable here, but the WAL journal on disk
// guarantees all writes since the last checkpoint are replayed on next start.
let isShuttingDown = false;
async function gracefulShutdown(signal: string): Promise<void> {
	if (isShuttingDown) return;
	isShuttingDown = true;
	console.log(`\n[${signal}] Flushing VFS checkpoint before exit...`);
	try {
		await virtualShell.vfs.stopAutoFlush();
		console.log("[shutdown] Checkpoint written. Goodbye.");
	} catch (err) {
		console.error("[shutdown] Flush failed:", err);
	}
	process.exit(0);
}

process.on("SIGINT",  () => { void gracefulShutdown("SIGINT"); });
process.on("SIGTERM", () => { void gracefulShutdown("SIGTERM"); });
process.on("beforeExit", () => { void virtualShell.vfs.stopAutoFlush(); });

process.on("uncaughtException", (error) => {
	console.debug("Oh my god, something terrible happened: ", error);
});

process.on("unhandledRejection", (error, promise) => {
	console.debug(
		" Oh Lord! We forgot to handle a promise rejection here: ",
		promise,
	);
	console.debug(" The error was: ", error);
});

setInterval(() => {
	const rss = process.memoryUsage().rss;
	console.debug(`Current memory usage: ${Math.round(rss / 1024 / 1024)} MB`);
}, 1000);
