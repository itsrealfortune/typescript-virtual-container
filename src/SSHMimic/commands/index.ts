import type {
	CommandMode,
	CommandOutcome,
	ShellModule,
} from "../../types/commands";
import type VirtualFileSystem from "../../VirtualFileSystem";
import type { VirtualUserManager } from "../users";
import { adduserCommand } from "./adduser";
import { catCommand } from "./cat";
import { cdCommand } from "./cd";
import { clearCommand } from "./clear";
import { curlCommand } from "./curl";
import { deluserCommand } from "./deluser";
import { exitCommand } from "./exit";
import { createHelpCommand } from "./help";
import { hostnameCommand } from "./hostname";
import { htopCommand } from "./htop";
import { lsCommand } from "./ls";
import { mkdirCommand } from "./mkdir";
import { nanoCommand } from "./nano";
import { pwdCommand } from "./pwd";
import { rmCommand } from "./rm";
import { suCommand } from "./su";
import { sudoCommand } from "./sudo";
import { touchCommand } from "./touch";
import { treeCommand } from "./tree";
import { wgetCommand } from "./wget";
import { whoCommand } from "./who";
import { whoamiCommand } from "./whoami";

const BASE_COMMANDS: ShellModule[] = [
	pwdCommand,
	whoamiCommand,
	whoCommand,
	hostnameCommand,
	lsCommand,
	cdCommand,
	catCommand,
	mkdirCommand,
	touchCommand,
	rmCommand,
	treeCommand,
	nanoCommand,
	htopCommand,
	adduserCommand,
	deluserCommand,
	sudoCommand,
	suCommand,
	curlCommand,
	wgetCommand,
	clearCommand,
	exitCommand,
];

const COMMANDS: ShellModule[] = [
	...BASE_COMMANDS,
	createHelpCommand(() => COMMANDS.map((cmd) => cmd.name)),
];

export function getCommandNames(): string[] {
	return COMMANDS.flatMap((cmd) => [cmd.name, ...(cmd.aliases ?? [])]);
}

function resolveModule(name: string): ShellModule | undefined {
	const lowered = name.toLowerCase();
	return COMMANDS.find(
		(cmd) => cmd.name === lowered || cmd.aliases?.includes(lowered),
	);
}

function parseInput(rawInput: string): { commandName: string; args: string[] } {
	const parts = rawInput.trim().split(/\s+/).filter(Boolean);
	return {
		commandName: parts[0]?.toLowerCase() ?? "",
		args: parts.slice(1),
	};
}

export function runCommand(
	rawInput: string,
	authUser: string,
	hostname: string,
	users: VirtualUserManager,
	mode: CommandMode,
	cwd: string,
	vfs: VirtualFileSystem,
): CommandOutcome {
	const trimmed = rawInput.trim();

	if (trimmed.length === 0) {
		return { exitCode: 0 };
	}

	const { commandName, args } = parseInput(trimmed);
	const mod = resolveModule(commandName);

	if (!mod) {
		return {
			stderr: `Command '${trimmed}' not found`,
			exitCode: 127,
		};
	}

	try {
		return mod.run({
			authUser,
			hostname,
			users,
			activeSessions: users.listActiveSessions(),
			rawInput: trimmed,
			mode,
			args,
			cwd,
			vfs,
		});
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Command failed";
		return { stderr: message, exitCode: 1 };
	}
}
