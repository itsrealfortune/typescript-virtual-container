import type { VirtualUserManager } from "../SSHMimic/users";
import type { ShellStream } from "../types/streams";
import type VirtualFileSystem from "../VirtualFileSystem";

class VirtualShell {
	vfs: VirtualFileSystem;
	users: VirtualUserManager;
	hostname: string;

	constructor(
		vfs: VirtualFileSystem,
		users: VirtualUserManager,
		hostname: string,
	) {
		this.vfs = vfs;
		this.users = users;
		this.hostname = hostname;
	}

	executeCommand(_command: string, _args: string[]): void {
		// Command execution logic
	}

	startInteractiveSession(
		_stream: ShellStream,
		_authUser: string,
		_sessionId: string | null,
		_remoteAddress: string,
		_terminalSize: { cols: number; rows: number },
	): void {
		// Interactive shell logic
	}
}

export { VirtualShell };
