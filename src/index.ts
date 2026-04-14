import SSHMimic from './SSHMimic/index';

const sshMimic = new SSHMimic(2222);

sshMimic
	.start()
	.then((port) => {
		console.log(`SSH Mimic initialized. Listening on port ${port}.`);
	})
	.catch((error: unknown) => {
		console.error('Failed to start SSH Mimic:', error);
		process.exit(1);
	});