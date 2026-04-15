import type { VirtualUserManager } from "../SSHMimic/users";
import type { CommandContext, CommandResult } from "../types/commands";
import type { ShellStream } from "../types/streams";
import type VirtualFileSystem from "../VirtualFileSystem";
import { createCustomCommand, registerCommand, runCommand } from "./commands";
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

	addCommand(
		name: string,
		params: string[],
		callback: (ctx: CommandContext) => CommandResult | Promise<CommandResult>,
	): void {
		const normalized = name.trim().toLowerCase();
		if (normalized.length === 0 || /\s/.test(normalized)) {
			throw new Error("Command name must be non-empty and contain no spaces");
		}

		registerCommand(createCustomCommand(normalized, params, callback));
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
