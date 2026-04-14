/** Command invocation mode used by shell runtime. */
export type CommandMode = "shell" | "exec";

import type {
	VirtualActiveSession,
	VirtualUserManager,
} from "../SSHMimic/users";
import type VirtualFileSystem from "../VirtualFileSystem";

/**
 * Normalized command execution output.
 *
 * A command can write text, control session lifecycle, request UI state
 * transitions, and update active identity/cwd.
 */
export interface CommandResult {
	/** Standard output payload to append in terminal. */
	stdout?: string;
	/** Standard error payload to append in terminal. */
	stderr?: string;
	/** Request full terminal clear before next prompt. */
	clearScreen?: boolean;
	/** Request current shell/exec session close. */
	closeSession?: boolean;
	/** Optional exit code (default behavior handled by caller). */
	exitCode?: number;
	/** Optional cwd to apply for next prompt iteration. */
	nextCwd?: string;
	/** Optional user switch for current session state. */
	switchUser?: string;
	/** Request opening built-in nano editor workflow. */
	openEditor?: NanoEditorSession;
	/** Request opening built-in htop-like screen. */
	openHtop?: boolean;
	/** Request sudo password challenge flow. */
	sudoChallenge?: SudoChallenge;
}

/** Deferred sudo challenge metadata returned by sudo command. */
export interface SudoChallenge {
	/** User currently requesting elevation. */
	username: string;
	/** Target identity for elevated command. */
	targetUser: string;
	/** Command to execute after successful challenge; null for login shell. */
	commandLine: string | null;
	/** True when challenge targets interactive login shell. */
	loginShell: boolean;
	/** Prompt text shown before password input. */
	prompt: string;
}

/** State payload used by nano command interactive editor flow. */
export interface NanoEditorSession {
	/** Final destination path to write when save succeeds. */
	targetPath: string;
	/** Temporary scratch path used while editing. */
	tempPath: string;
	/** Initial editor content shown to user. */
	initialContent: string;
}

/** Runtime context object passed to each command module. */
export interface CommandContext {
	/** Authenticated user currently bound to stream. */
	authUser: string;
	/** Virtual hostname shown in prompt and banners. */
	hostname: string;
	/** User and session manager instance. */
	users: VirtualUserManager;
	/** Snapshot of currently active user sessions. */
	activeSessions: VirtualActiveSession[];
	/** Original unparsed command line input. */
	rawInput: string;
	/** Invocation mode (interactive shell or direct exec). */
	mode: CommandMode;
	/** Tokenized arguments excluding command name. */
	args: string[];
	/** Current working directory for command execution. */
	cwd: string;
	/** Virtual filesystem instance for IO operations. */
	vfs: VirtualFileSystem;
}

/** Contract implemented by each shell command module. */
export interface ShellModule {
	/** Primary command name used in CLI. */
	name: string;
	/** Parameter help snippets displayed by help command. */
	params: string[];
	/** Command handler implementation. */
	run: (ctx: CommandContext) => CommandResult | Promise<CommandResult>;
	/** Optional alternative command names. */
	aliases?: string[];
}

/** Command return union allowing sync or async handlers. */
export type CommandOutcome = CommandResult | Promise<CommandResult>;
