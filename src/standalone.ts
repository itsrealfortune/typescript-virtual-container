import { VirtualSftpServer, VirtualShell, VirtualSshServer } from ".";
import { getFlag, getOptionInt } from "./utils/argv";

// ── CLI argument parsing ──────────────────────────────────────────────────────

const argv = process.argv.slice(2);

const noSsh   = getFlag(argv, "--no-ssh");
const sshPort = getOptionInt(argv, "--ssh-port", 2222);

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

// SFTP subsystem handler — no standalone server, reused by the SSH server
// so that `scp` and `sftp` clients work directly on the SSH port.
const sftpHandler = new VirtualSftpServer({ shell: virtualShell });

if (!noSsh) {
	new VirtualSshServer({ port: sshPort, hostname, shell: virtualShell, sftp: sftpHandler })
		.start()
		.catch((error: unknown) => {
			console.error("Failed to start SSH server:", error);
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
