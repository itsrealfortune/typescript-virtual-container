export type CommandMode = "shell" | "exec";

import type {
	VirtualActiveSession,
	VirtualUserManager,
} from "../SSHMimic/users";
import type VirtualFileSystem from "../VirtualFileSystem";

export interface CommandResult {
	stdout?: string;
	stderr?: string;
	clearScreen?: boolean;
	closeSession?: boolean;
	exitCode?: number;
	nextCwd?: string;
	switchUser?: string;
	openEditor?: NanoEditorSession;
	openHtop?: boolean;
	sudoChallenge?: SudoChallenge;
}

export interface SudoChallenge {
	username: string;
	targetUser: string;
	commandLine: string | null;
	loginShell: boolean;
	prompt: string;
}

export interface NanoEditorSession {
	targetPath: string;
	tempPath: string;
	initialContent: string;
}

export interface CommandContext {
	authUser: string;
	hostname: string;
	users: VirtualUserManager;
	activeSessions: VirtualActiveSession[];
	rawInput: string;
	mode: CommandMode;
	args: string[];
	cwd: string;
	vfs: VirtualFileSystem;
}

export interface ShellModule {
	name: string;
	params: string[];
	run: (ctx: CommandContext) => CommandResult | Promise<CommandResult>;
	aliases?: string[];
}

export type CommandOutcome = CommandResult | Promise<CommandResult>;
