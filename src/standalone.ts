import { VirtualSftpServer, VirtualShell, VirtualSshServer } from ".";

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

new VirtualSshServer({
	port: 2222,
	hostname,
	shell: virtualShell,
})
	.start()
	.catch((error: unknown) => {
		console.error("Failed to start SSH Mimic:", error);
		process.exit(1);
	});

new VirtualSftpServer({ port: 2223, hostname, shell: virtualShell })
	.start()
	.catch((error: unknown) => {
		console.error("Failed to start SFTP Mimic:", error);
		process.exit(1);
	});


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
	const rss = process.memoryUsage().rss; // Just keep the event loop alive and prevent exit
	console.debug(`Current memory usage: ${Math.round(rss / 1024 / 1024)} MB`);
}, 1000);