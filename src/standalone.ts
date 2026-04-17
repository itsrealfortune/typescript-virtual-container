import { VirtualSftpServer, VirtualShell, VirtualSshServer } from ".";

const hostname = process.env.SSH_MIMIC_HOSTNAME ?? "typescript-vm";
const virtualShell = new VirtualShell(hostname);

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
	console.log("Oh my god, something terrible happened: ", error);
});

process.on("unhandledRejection", (error, promise) => {
	console.log(
		" Oh Lord! We forgot to handle a promise rejection here: ",
		promise,
	);
	console.log(" The error was: ", error);
});
