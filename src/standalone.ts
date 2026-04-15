import { VirtualShell, VirtualSshServer } from ".";

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
	.then((port: number) => {
		// if (!sshMimic) console.error("Failed to initialize SSH Mimic shell.");
		// else {
		console.log(`SSH Mimic initialized. Listening on port ${port}.`);
		// }
	})
	.catch((error: unknown) => {
		console.error("Failed to start SSH Mimic:", error);
		process.exit(1);
	});
