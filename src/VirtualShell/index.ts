import type { VirtualUserManager } from "../SSHMimic/users";
import type { ShellStream } from "../types/streams";
import type VirtualFileSystem from "../VirtualFileSystem";
import { runCommand } from "./commands";
import { startShell } from "./shell";

class VirtualShell {
	private vfs: VirtualFileSystem;
	private users: VirtualUserManager;
	private hostname: string;

	constructor(
		vfs: VirtualFileSystem,
		users: VirtualUserManager,
		hostname: string,
	) {
		this.vfs = vfs;
		this.users = users;
		this.hostname = hostname;
	}

	executeCommand(rawInput: string, authUser: string, cwd: string): void {
		runCommand(
			rawInput,
			authUser,
			this.hostname,
			this.users,
			"shell",
			cwd,
			this.vfs,
		);
	}

	startInteractiveSession(
		stream: ShellStream,
		authUser: string,
		sessionId: string | null,
		remoteAddress: string,
		terminalSize: { cols: number; rows: number },
	): void {
		// Interactive shell logic
		startShell(
			stream,
			authUser,
			this.vfs!,
			this.hostname,
			this.users!,
			sessionId,
			remoteAddress,
			terminalSize,
		);
	}
}

export { VirtualShell };
