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