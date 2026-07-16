import {
	VirtualSftpServer,
	VirtualShell,
	VirtualSshServer,
	VirtualWebSocketServer,
} from ".";
import { getFlag, getOptionInt, getOptionString } from "./utils/argv";

// ── CLI argument parsing ──────────────────────────────────────────────────────

const ARGV = process.argv.slice(2);

const NO_SSH = getFlag(ARGV, "--no-ssh");
const SSH_PORT = getOptionInt(ARGV, "--ssh-port", 2222);
const WS_PORT = getOptionInt(ARGV, "--ws-port", 8080);
const WS_TRANSPORT =
	getFlag(ARGV, "--transport-ws") ||
	getOptionString(ARGV, "--transport", "") === "ws";

// ── Baseline memory (before any shell is created) ─────────────────────────────

const BASELINE_RSS = process.memoryUsage().rss;

// ── Shell ─────────────────────────────────────────────────────────────────────

const HOSTNAME = process.env.SSH_MIMIC_HOSTNAME ?? "typescript-vm";
const VIRTUAL_SHELL = new VirtualShell(HOSTNAME, undefined, {
	mode: "fs",
	snapshotPath: ".vfs",
});

VIRTUAL_SHELL.addCommand("demo", [], () => {
	return {
		stdout: "This is a demo command. It does nothing useful.",
		exitCode: 0,
	};
});

// ── Idle management & GC ──────────────────────────────────────────────────────
// Enable periodic garbage collection to free memory from terminated processes,
// stale CPU entries, and closed large files. Also trigger GC on SSH disconnect
// for immediate cleanup.

VIRTUAL_SHELL.enableIdleManagement({
	idleThresholdMs: 120_000, // freeze VFS after 2 min of inactivity
	checkIntervalMs: 30_000, // check every 30s
	gcIntervalMs: 30_000, // GC runs every 30s
});

// Log periodic GC stats
VIRTUAL_SHELL.on("gc:run", (stats: import(".").GcStats) => {
	const total = process.memoryUsage().rss;
	const shells = total - BASELINE_RSS;
	console.debug(
		`[GC periodic] terminated=${stats.terminatedProcesses} staleCpu=${stats.staleCpuEntries} evicted=${stats.evictedFiles} forcedGc=${stats.forcedGc} | ` +
			`mem: shells=${Math.round(shells / 1024 / 1024)} MB total=${Math.round(total / 1024 / 1024)} MB`
	);
});

// Trigger GC immediately when an SSH session disconnects
VIRTUAL_SHELL.users.on(
	"session:unregister",
	(data: { sessionId: string; username: string; tty: string }) => {
		const killed = VIRTUAL_SHELL.users.killProcessesByTty(data.tty);
		const gcStats = VIRTUAL_SHELL.runGc();
		const total = process.memoryUsage().rss;
		const shells = total - BASELINE_RSS;
		console.debug(
			`[GC] session=${data.sessionId.slice(0, 8)}… user=${data.username} tty=${data.tty} | ` +
				`killed=${killed} procs | ` +
				`gc: terminated=${gcStats?.terminatedProcesses} staleCpu=${gcStats?.staleCpuEntries} evicted=${gcStats?.evictedFiles} forcedGc=${gcStats?.forcedGc} | ` +
				`mem: shells=${Math.round(shells / 1024 / 1024)} MB total=${Math.round(total / 1024 / 1024)} MB`
		);
	}
);

// ── Servers ───────────────────────────────────────────────────────────────────

// SFTP subsystem handler — no standalone server, reused by the SSH server
// so that `scp` and `sftp` clients work directly on the SSH port.
const SFTP_HANDLER = new VirtualSftpServer({ shell: VIRTUAL_SHELL });

if (!NO_SSH) {
	new VirtualSshServer({
		port: SSH_PORT,
		hostname: HOSTNAME,
		shell: VIRTUAL_SHELL,
		sftp: SFTP_HANDLER,
	})
		.start()
		.catch((error: unknown) => {
			console.error("Failed to start SSH server:", error);
			process.exit(1);
		});
}

if (WS_TRANSPORT) {
	new VirtualWebSocketServer({
		port: WS_PORT,
		hostname: HOSTNAME,
		shell: VIRTUAL_SHELL,
	}).start();
}

// ── Graceful shutdown ─────────────────────────────────────────────────────────
// On SIGINT / SIGTERM: flush the WAL journal to a full checkpoint before exit.
// A kill -9 or OOM crash is unrecoverable here, but the WAL journal on disk
// guarantees all writes since the last checkpoint are replayed on next start.
let isShuttingDown = false;
function gracefulShutdown(signal: string): void {
	if (isShuttingDown) {
		return;
	}
	isShuttingDown = true;
	console.log(`\n[${signal}] Flushing VFS checkpoint before exit...`);
	try {
		VIRTUAL_SHELL.vfs.stopAutoFlush();
		console.log("[shutdown] Checkpoint written. Goodbye.");
	} catch (err) {
		console.error("[shutdown] Flush failed:", err);
	}
	process.exit(0);
}

process.on("SIGINT", () => {
	void gracefulShutdown("SIGINT");
});
process.on("SIGTERM", () => {
	void gracefulShutdown("SIGTERM");
});
process.on("beforeExit", () => {
	void VIRTUAL_SHELL.vfs.stopAutoFlush();
});

process.on("uncaughtException", (error) => {
	console.debug("Oh my god, something terrible happened: ", error);
});

process.on("unhandledRejection", (error, promise) => {
	console.debug(
		" Oh Lord! We forgot to handle a promise rejection here: ",
		promise
	);
	console.debug(" The error was: ", error);
});

setInterval(() => {
	const total = process.memoryUsage().rss;
	const shells = total - BASELINE_RSS;
	const runtime = BASELINE_RSS;
	console.debug(
		`Memory: total=${Math.round(total / 1024 / 1024)} MB | ` +
			`shells=${Math.round(shells / 1024 / 1024)} MB | ` +
			`runtime=${Math.round(runtime / 1024 / 1024)} MB`
	);
}, 1000);
