/** Command invocation mode used by shell runtime. */
export type CommandMode = "shell" | "exec";

import type { VirtualShell } from "../VirtualShell";
import type { VirtualActiveSession } from "../VirtualUserManager";

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
	/** Request a generic password challenge (adduser, passwd). */
	passwordChallenge?: PasswordChallenge;
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
	/**
	 * Challenge mode.
	 * - `"sudo"` (default): verify `username`'s password, then run `commandLine`.
	 * - `"passwd"`: multi-step new-password flow; `onPassword` handles each step.
	 * - `"confirm"`: text confirmation flow (e.g. deluser); `onPassword` receives typed text.
	 */
	mode?: "sudo" | "passwd" | "confirm";
	/**
	 * Optional async handler called when the user submits input.
	 * Receives the typed text and the shell instance.
	 * Returns a `CommandResult` written to the terminal, or `null` to show
	 * another prompt (pass `nextPrompt` to change the prompt text).
	 */
	onPassword?: (input: string, shell: import("../VirtualShell").VirtualShell) => Promise<{
		result: CommandResult | null;
		nextPrompt?: string;
	}>;
}

/** Generic password challenge — used by adduser, passwd, deluser. */
export interface PasswordChallenge {
	/** Lines to print before the first prompt. */
	preamble?: string;
	/** Primary prompt text (e.g. "New password: "). */
	prompt: string;
	/** If set, a second prompt is shown for confirmation. */
	confirmPrompt?: string;
	/** Prompt shown for a destructive confirmation (y/N). */
	confirmText?: string;
	/** Tag identifying what to do with the entered value. */
	action: "adduser" | "passwd" | "deluser" | "su";
	/** Username targeted by the action. */
	targetUsername: string;
	/** For adduser: the new user's username (already validated). */
	newUsername?: string;
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

/** Per-session shell environment (variables, last exit code). */
export interface ShellEnv {
	/** Environment variables visible to commands. */
	vars: Record<string, string>;
	/** Exit status of the last executed command. */
	lastExitCode: number;
}

/** Runtime context object passed to each command module. */
export interface CommandContext {
	/** Authenticated user currently bound to stream. */
	authUser: string;
	/** Virtual hostname shown in prompt and banners. */
	hostname: string;
	/** Snapshot of currently active user sessions. */
	activeSessions: VirtualActiveSession[];
	/** Original unparsed command line input. */
	rawInput: string;
	/** Invocation mode (interactive shell or direct exec). */
	mode: CommandMode;
	/** Tokenized arguments excluding command name. */
	args: string[];
	/** Virtual shell instance. */
	shell: VirtualShell;
	/** Optional stdin payload (used by pipes/redirections). */
	stdin?: string;
	/** Current working directory for command execution. */
	cwd: string;
	/** Per-session environment available to command modules. */
	env: ShellEnv;
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
	/** Short description shown in `help`. */
	description?: string;
	/** Category used for grouped help output. */
	category?: string;
}

/** Command return union allowing sync or async handlers. */
export type CommandOutcome = CommandResult | Promise<CommandResult>;
