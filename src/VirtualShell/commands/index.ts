import type { VirtualShell } from "..";
import type {
	CommandContext,
	CommandMode,
	CommandResult,
	ShellModule,
} from "../../types/commands";
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
import { neofetchCommand } from "./neofetch";
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
	neofetchCommand,
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

const commandRegistry = new Map<string, ShellModule>();
let cachedCommandNames: string[] | null = null;

function buildCache(): void {
	for (const mod of getCommandModules()) {
		commandRegistry.set(mod.name, mod);
		for (const alias of mod.aliases ?? []) {
			commandRegistry.set(alias, mod);
		}
	}
	cachedCommandNames = Array.from(commandRegistry.keys()).sort();
}

function getCommandModules(): ShellModule[] {
	// console.log("Loading command modules...");
	// console.log(
	// 	`Base commands: ${BASE_COMMANDS.map((cmd) => cmd.name).join(", ")}`,
	// );
	// console.log(
	// 	`Custom commands: ${customCommands.map((cmd) => cmd.name).join(", ")}`,
	// );
	return [...BASE_COMMANDS, ...customCommands, helpCommand];
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

	for (const name of names) {
		if (commandRegistry.has(name)) {
			throw new Error(`Command '${name}' already exists`);
		}
		commandRegistry.set(name, normalized);
	}

	buildCache();
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
	if (!cachedCommandNames) {
		buildCache();
	}
	return cachedCommandNames!;
}

export function resolveModule(name: string): ShellModule | undefined {
	if (!cachedCommandNames) {
		buildCache();
	}
	return commandRegistry.get(name.toLowerCase());
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

export async function runCommand(
	rawInput: string,
	authUser: string,
	hostname: string,
	mode: CommandMode,
	cwd: string,
	shell: VirtualShell,
	stdin?: string,
): Promise<CommandResult> {
	const trimmed = rawInput.trim();

	if (trimmed.length === 0) {
		return { exitCode: 0 };
	}

	if (trimmed.includes("|") || trimmed.includes(">") || trimmed.includes("<")) {
		const { parseShellPipeline } = await import("../shellParser");
		const { executePipeline } = await import("../../SSHMimic/executor");

		const pipeline = parseShellPipeline(trimmed);
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
				mode,
				cwd,
				shell,
			);
		} catch (error: unknown) {
			const message =
				error instanceof Error ? error.message : "Pipeline execution failed";
			return { stderr: message, exitCode: 1 };
		}
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
		return await mod.run({
			authUser,
			hostname,
			activeSessions: shell.users.listActiveSessions(),
			rawInput: trimmed,
			mode,
			args,
			stdin,
			cwd,
			shell,
		});
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Command failed";
		return { stderr: message, exitCode: 1 };
	}
}
