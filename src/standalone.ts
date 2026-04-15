import { VirtualMachine } from ".";

const sshHostname = process.env.SSH_MIMIC_HOSTNAME ?? "typescript-vm";
const sshMimic = new VirtualMachine({ port: 2222, hostname: sshHostname });

sshMimic
	.start()
	.then((port: number) => {
		if (!sshMimic.shell) console.error("Failed to initialize SSH Mimic shell.");
		else {
			console.log(`SSH Mimic initialized. Listening on port ${port}.`);
			sshMimic.shell.addCommand("demo", [], () => {
				return {
					stdout: "This is a demo command. It does nothing useful.",
					exitCode: 0,
				};
			});
		}
	})
	.catch((error: unknown) => {
		console.error("Failed to start SSH Mimic:", error);
		process.exit(1);
	});
