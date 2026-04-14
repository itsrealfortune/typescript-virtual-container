import { VirtualMachine } from ".";

const sshHostname = process.env.SSH_MIMIC_HOSTNAME ?? "typescript-vm";
const sshMimic = new VirtualMachine(2222, sshHostname);

sshMimic
	.start()
	.then((port: number) => {
		console.log(`SSH Mimic initialized. Listening on port ${port}.`);
	})
	.catch((error: unknown) => {
		console.error("Failed to start SSH Mimic:", error);
		process.exit(1);
	});
