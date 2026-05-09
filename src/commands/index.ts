/** biome-ignore-all lint/style/useNamingConvention: ENV VARIABLES */
import { executeStatements } from "../SSHMimic/executor";
import type { VirtualShell } from "../VirtualShell";
import { parseScript } from "../VirtualShell/shellParser";
import type {
	CommandContext,
	CommandMode,
	CommandResult,
	ShellEnv,
	ShellModule,
} from "../types/commands";
import { adduserCommand } from "./adduser";
import { aliasCommand, unaliasCommand } from "./alias";
import { aptCacheCommand, aptCommand } from "./apt";
import { awkCommand } from "./awk";
import { base64Command } from "./base64";
import { catCommand } from "./cat";
import { cdCommand } from "./cd";
import { chmodCommand } from "./chmod";
import { clearCommand } from "./clear";
import { cpCommand } from "./cp";
import { curlCommand } from "./curl";
import { cutCommand } from "./cut";
import { dateCommand } from "./date";
import { deluserCommand } from "./deluser";
import { dfCommand } from "./df";
import { diffCommand } from "./diff";
import { dpkgCommand, dpkgQueryCommand } from "./dpkg";
import { duCommand } from "./du";
import { echoCommand } from "./echo";
import { envCommand } from "./env";
import { exitCommand } from "./exit";
import { exportCommand } from "./export";
import { findCommand } from "./find";
import { freeCommand } from "./free";
import { grepCommand } from "./grep";
import { groupsCommand } from "./groups";
import { gunzipCommand, gzipCommand } from "./gzip";
import { headCommand } from "./head";
import { createHelpCommand } from "./help";
import { hostnameCommand } from "./hostname";
import { htopCommand } from "./htop";
import { idCommand } from "./id";
import { killCommand } from "./kill";
import { lnCommand } from "./ln";
import { lsCommand } from "./ls";
import { lsbReleaseCommand } from "./lsb-release";
import { manCommand } from "./man";
import { mkdirCommand } from "./mkdir";
import { mvCommand } from "./mv";
import { nanoCommand } from "./nano";
import { neofetchCommand } from "./neofetch";
import { passwdCommand } from "./passwd";
import { pingCommand } from "./ping";
import { psCommand } from "./ps";
import { pwdCommand } from "./pwd";
import { rmCommand } from "./rm";
import { sedCommand } from "./sed";
import { setCommand } from "./set";
import { shCommand } from "./sh";
import { sleepCommand } from "./sleep";
import { sortCommand } from "./sort";
import { suCommand } from "./su";
import { sudoCommand } from "./sudo";
import { tailCommand } from "./tail";
import { tarCommand } from "./tar";
import { teeCommand } from "./tee";
import { touchCommand } from "./touch";
import { trCommand } from "./tr";
import { treeCommand } from "./tree";
import { typeCommand } from "./type";
import { unameCommand } from "./uname";
import { uniqCommand } from "./uniq";
import { unsetCommand } from "./unset";
import { uptimeCommand } from "./uptime";
import { wcCommand } from "./wc";
import { wgetCommand } from "./wget";
import { whichCommand } from "./which";
import { whoCommand } from "./who";
import { whoamiCommand } from "./whoami";
import { xargsCommand } from "./xargs";

const BASE_COMMANDS: ShellModule[] = [
	// Navigation
	pwdCommand, cdCommand, lsCommand, treeCommand,
	// Files
	catCommand, touchCommand, rmCommand, mkdirCommand, cpCommand, mvCommand, lnCommand,
	chmodCommand, findCommand,
	// Text processing
	grepCommand, sedCommand, awkCommand, sortCommand, uniqCommand, wcCommand,
	headCommand, tailCommand, cutCommand, trCommand, teeCommand, xargsCommand,
	diffCommand,
	// Archives
	tarCommand, gzipCommand, gunzipCommand, base64Command,
	// System info
	whoamiCommand, whoCommand, hostnameCommand, idCommand, groupsCommand, unameCommand,
	psCommand, killCommand, dfCommand, duCommand, dateCommand, sleepCommand, pingCommand,
	// Shell
	echoCommand, envCommand, exportCommand, setCommand, unsetCommand, shCommand,
	clearCommand, exitCommand,
	// Editors
	nanoCommand, htopCommand,
	// Network
	curlCommand, wgetCommand,
	// Users
	adduserCommand, passwdCommand, deluserCommand, sudoCommand, suCommand,
	// Misc
	neofetchCommand,
	// Package management
	aptCommand, aptCacheCommand, dpkgCommand, dpkgQueryCommand,
	// Shell (extended)
	whichCommand, typeCommand, manCommand, aliasCommand, unaliasCommand,
	// System (extended)
	uptimeCommand, freeCommand, lsbReleaseCommand,
];

const customCommands: ShellModule[] = [];
const commandRegistry = new Map<string, ShellModule>();
let cachedCommandNames: string[] | null = null;

const helpCommand = createHelpCommand(() => getCommandModules().map((cmd) => cmd.name));

function buildCache(): void {
	commandRegistry.clear();
	for (const mod of getCommandModules()) {
		commandRegistry.set(mod.name, mod);
		for (const alias of mod.aliases ?? []) commandRegistry.set(alias, mod);
	}
	cachedCommandNames = Array.from(commandRegistry.keys()).sort();
}

function getCommandModules(): ShellModule[] {
	return [...BASE_COMMANDS, ...customCommands, helpCommand];
}

export function registerCommand(module: ShellModule): void {
	const normalized: ShellModule = {
		...module,
		name: module.name.trim().toLowerCase(),
		aliases: module.aliases?.map((a) => a.trim().toLowerCase()),
	};
	const names = [normalized.name, ...(normalized.aliases ?? [])];
	if (names.some((n) => n.length === 0 || /\s/.test(n))) {
		throw new Error("Command names must be non-empty and contain no spaces");
	}
	customCommands.push(normalized);
	buildCache();
}

export function createCustomCommand(
	name: string,
	params: string[],
	run: (ctx: CommandContext) => CommandResult | Promise<CommandResult>,
): ShellModule {
	return { name, params, run };
}

export function getCommandNames(): string[] {
	if (!cachedCommandNames) buildCache();
	return cachedCommandNames!;
}

export function getCommandModulesPublic(): ShellModule[] {
	return getCommandModules();
}

export function resolveModule(name: string): ShellModule | undefined {
	if (!cachedCommandNames) buildCache();
	return commandRegistry.get(name.toLowerCase());
}

function splitArgsRespectingQuotes(input: string): string[] {
	const tokens: string[] = [];
	let current = "";
	let inQuotes = false;
	let quoteChar = "";

	for (let i = 0; i < input.length; i++) {
		const ch = input[i] || "";
		const prev = i > 0 ? input[i - 1] : "";
		if ((ch === '"' || ch === "'") && prev !== "\\") {
			if (!inQuotes) { inQuotes = true; quoteChar = ch; continue; }
			if (ch === quoteChar) { inQuotes = false; quoteChar = ""; continue; }
		}
		if (/\s/.test(ch) && !inQuotes) {
			if (current.length > 0) { tokens.push(current); current = ""; }
			continue;
		}
		current += ch;
	}
	if (current.length > 0) tokens.push(current);
	return tokens;
}

function parseInput(rawInput: string): { commandName: string; args: string[] } {
	const parts = splitArgsRespectingQuotes(rawInput.trim());
	return { commandName: parts[0]?.toLowerCase() ?? "", args: parts.slice(1) };
}

export function makeDefaultEnv(authUser: string, hostname: string): ShellEnv {
	return {
		vars: {
			PATH: "/usr/local/bin:/usr/bin:/bin",
			HOME: `/home/${authUser}`,
			USER: authUser,
			LOGNAME: authUser,
			SHELL: "/bin/sh",
			TERM: "xterm-256color",
			HOSTNAME: hostname,
			PS1: "\\u@\\h:\\w\\$ ",
		},
		lastExitCode: 0,
	};
}

export async function runCommand(
	rawInput: string,
	authUser: string,
	hostname: string,
	mode: CommandMode,
	cwd: string,
	shell: VirtualShell,
	stdin?: string,
	env?: ShellEnv,
): Promise<CommandResult> {
	const trimmed = rawInput.trim();
	if (trimmed.length === 0) return { exitCode: 0 };

	const shellEnv: ShellEnv = env ?? makeDefaultEnv(authUser, hostname);

	// ── $(cmd) command substitution ──────────────────────────────────────────
	let expanded = trimmed;
	if (expanded.includes("$(")) {
		// Replace each $(…) with the stdout of running that command
		const subRe = /\$\(([^)]+)\)/g;
		const matches = [...expanded.matchAll(subRe)];
		for (const m of matches) {
			const sub = m[1]?.trim() ?? "";
			const subResult = await runCommand(sub, authUser, hostname, mode, cwd, shell, undefined, shellEnv);
			const subOut = (subResult.stdout ?? "").replace(/\n$/, "");
			expanded = expanded.replace(m[0], subOut);
		}
	}

	// ── alias expansion ───────────────────────────────────────────────────────
	const firstWord = expanded.split(/\s+/)[0] ?? "";
	const aliasVal = shellEnv.vars[`__alias_${firstWord}`];
	if (aliasVal) {
		expanded = expanded.replace(firstWord, aliasVal);
	}

	// Detect shell operators
	if (
		/(?<![|&])[|](?![|])/.test(expanded) ||
		expanded.includes(">") ||
		expanded.includes("<") ||
		expanded.includes("&&") ||
		expanded.includes("||") ||
		expanded.includes(";")
	) {
		const script = parseScript(expanded);
		if (!script.isValid) return { stderr: script.error || "Syntax error", exitCode: 1 };
		try {
			return await executeStatements(script.statements, authUser, hostname, mode, cwd, shell, shellEnv);
		} catch (error: unknown) {
			return { stderr: error instanceof Error ? error.message : "Execution failed", exitCode: 1 };
		}
	}

	const { commandName, args } = parseInput(expanded);
	const mod = resolveModule(commandName);

	if (!mod) return { stderr: `${commandName}: command not found`, exitCode: 127 };

	try {
		return await mod.run({
			authUser,
			hostname,
			activeSessions: shell.users.listActiveSessions(),
			rawInput: expanded,
			mode,
			args,
			stdin,
			cwd,
			shell,
			env: shellEnv,
		});
	} catch (error: unknown) {
		return { stderr: error instanceof Error ? error.message : "Command failed", exitCode: 1 };
	}
}
