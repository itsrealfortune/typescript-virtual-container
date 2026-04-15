import type { VirtualUserManager } from "../../SSHMimic/users";
import type {
	CommandContext,
	CommandMode,
	CommandOutcome,
	CommandResult,
	ShellModule,
} from "../../types/commands";
import type VirtualFileSystem from "../../VirtualFileSystem";
import { adduserCommand } from "./adduser";
import { catCommand } from "./cat";
import { cdCommand } from "./cd";
import { clearCommand } from "./clear";
import { curlCommand } from "./curl";
import { deluserCommand } from "./deluser";
import { echoCommand } from "./echo";
import { envCommand } from "./env";
import { exitCommand } from "./exit";
import { exportCommand } from "./export";
import { grepCommand } from "./grep";
import { createHelpCommand } from "./help";
import { hostnameCommand } from "./hostname";
import { htopCommand } from "./htop";
import { lsCommand } from "./ls";
import { mkdirCommand } from "./mkdir";
import { nanoCommand } from "./nano";
import { pwdCommand } from "./pwd";
import { rmCommand } from "./rm";
import { setCommand } from "./set";
import { shCommand } from "./sh";
import { suCommand } from "./su";
import { sudoCommand } from "./sudo";
import { touchCommand } from "./touch";
import { treeCommand } from "./tree";
import { unsetCommand } from "./unset";
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
	echoCommand,
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
	envCommand,
	wgetCommand,
	grepCommand,
	exportCommand,
	setCommand,
	unsetCommand,
	shCommand,
	clearCommand,
	exitCommand,
];

const customCommands: ShellModule[] = [];

const helpCommand = createHelpCommand(() =>
	getCommandModules().map((cmd) => cmd.name),
);

function getCommandModules(): ShellModule[] {
	return [...BASE_COMMANDS, ...customCommands, helpCommand];
}

function getTakenCommandNames(modules: ShellModule[]): Set<string> {
	const taken = new Set<string>();
	for (const mod of modules) {
		taken.add(mod.name);
		for (const alias of mod.aliases ?? []) {
			taken.add(alias);
		}
	}
	return taken;
}

export function registerCommand(module: ShellModule): void {
	const normalized: ShellModule = {
		...module,
		name: module.name.trim().toLowerCase(),
		aliases: module.aliases?.map((alias) => alias.trim().toLowerCase()),
	};

	const names = [normalized.name, ...(normalized.aliases ?? [])];
	if (names.some((name) => name.length === 0 || /\s/.test(name))) {
		throw new Error(
			"Command names and aliases must be non-empty and contain no spaces",
		);
	}

	const takenNames = getTakenCommandNames(getCommandModules());
	const conflict = names.find((name) => takenNames.has(name));
	if (conflict) {
		throw new Error(`Command '${conflict}' already exists`);
	}

	customCommands.push(normalized);
}

export function createCustomCommand(
	name: string,
	params: string[],
	run: (ctx: CommandContext) => CommandResult | Promise<CommandResult>,
): ShellModule {
	return {
		name,
		params,
		run,
	};
}

export function getCommandNames(): string[] {
	return getCommandModules().flatMap((cmd) => [
		cmd.name,
		...(cmd.aliases ?? []),
	]);
}

function resolveModule(name: string): ShellModule | undefined {
	const lowered = name.toLowerCase();
	return getCommandModules().find(
		(cmd) => cmd.name === lowered || cmd.aliases?.includes(lowered),
	);
}

function splitArgsRespectingQuotes(input: string): string[] {
	const tokens: string[] = [];
	let current = "";
	let inQuotes = false;
	let quoteChar = "";

	for (let i = 0; i < input.length; i += 1) {
		const ch = input[i] || "";
		const prev = i > 0 ? input[i - 1] : "";

		if ((ch === '"' || ch === "'") && prev !== "\\") {
			if (!inQuotes) {
				inQuotes = true;
				quoteChar = ch;
				continue;
			}

			if (ch === quoteChar) {
				inQuotes = false;
				quoteChar = "";
				continue;
			}
		}

		if (/\s/.test(ch) && !inQuotes) {
			if (current.length > 0) {
				tokens.push(current);
				current = "";
			}
			continue;
		}

		current += ch;
	}

	if (current.length > 0) {
		tokens.push(current);
	}

	return tokens;
}

function parseInput(rawInput: string): { commandName: string; args: string[] } {
	const parts = splitArgsRespectingQuotes(rawInput.trim());
	return {
		commandName: parts[0]?.toLowerCase() ?? "",
		args: parts.slice(1),
	};
}

// Internal async function for pipeline execution
async function runCommandInternal(
	rawInput: string,
	authUser: string,
	hostname: string,
	users: VirtualUserManager,
	mode: CommandMode,
	cwd: string,
	vfs: VirtualFileSystem,
	stdin?: string,
): Promise<CommandResult> {
	// Check if input contains pipes or redirections
	if (
		rawInput.includes("|") ||
		rawInput.includes(">") ||
		rawInput.includes("<")
	) {
		// Use pipeline executor
		const { parseShellPipeline } = await import("../shellParser");
		const { executePipeline } = await import("../../SSHMimic/executor");

		const pipeline = parseShellPipeline(rawInput);
		if (!pipeline.isValid) {
			return {
				stderr: pipeline.error || "Syntax error",
				exitCode: 1,
			};
		}

		try {
			return await executePipeline(
				pipeline,
				authUser,
				hostname,
				users,
				mode,
				cwd,
				vfs,
			);
		} catch (error: unknown) {
			const message =
				error instanceof Error ? error.message : "Pipeline execution failed";
			return { stderr: message, exitCode: 1 };
		}
	}

	// Regular command execution
	const { commandName, args } = parseInput(rawInput);
	const mod = resolveModule(commandName);

	if (!mod) {
		return {
			stderr: `Command '${rawInput}' not found`,
			exitCode: 127,
		};
	}

	try {
		const result = mod.run({
			authUser,
			hostname,
			users,
			activeSessions: users.listActiveSessions(),
			rawInput,
			mode,
			args,
			stdin,
			cwd,
			vfs,
		});

		return await Promise.resolve(result);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Command failed";
		return { stderr: message, exitCode: 1 };
	}
}

export function runCommand(
	rawInput: string,
	authUser: string,
	hostname: string,
	users: VirtualUserManager,
	mode: CommandMode,
	cwd: string,
	vfs: VirtualFileSystem,
	stdin?: string,
): CommandOutcome {
	const trimmed = rawInput.trim();

	if (trimmed.length === 0) {
		return { exitCode: 0 };
	}

	// Check if input contains pipes or redirections - use async version
	if (trimmed.includes("|") || trimmed.includes(">") || trimmed.includes("<")) {
		return runCommandInternal(
			trimmed,
			authUser,
			hostname,
			users,
			mode,
			cwd,
			vfs,
			stdin,
		);
	}

	// Regular synchronous command execution
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
			stdin,
			cwd,
			vfs,
		});
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Command failed";
		return { stderr: message, exitCode: 1 };
	}
}
