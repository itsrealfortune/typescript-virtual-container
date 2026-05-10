/** biome-ignore-all lint/style/useNamingConvention: ENV VARIABLES */
import { executeStatements } from "../SSHMimic/executor";
import type { VirtualShell } from "../VirtualShell";
import { parseScript } from "../VirtualShell/shellParser";
import { expandAsync } from "../utils/expand";
import type {
	CommandContext,
	CommandMode,
	CommandResult,
	ShellEnv,
	ShellModule,
} from "../types/commands";
import { adduserCommand } from "./adduser";
import { aliasCommand, unaliasCommand } from "./alias";
import { testCommand } from "./test";
import { sourceCommand } from "./source";
import { historyCommand } from "./history";
import { printfCommand } from "./printf";
import { readCommand } from "./read";
import { declareCommand } from "./declare";
import { shiftCommand, trapCommand, returnCommand } from "./shift";
import { trueCommand, falseCommand } from "./true";
import { npmCommand, npxCommand } from "./npm";
import { nodeCommand } from "./node";
import { python3Command } from "./python";
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
	pwdCommand,
	cdCommand,
	lsCommand,
	treeCommand,
	// Files
	catCommand,
	touchCommand,
	rmCommand,
	mkdirCommand,
	cpCommand,
	mvCommand,
	lnCommand,
	chmodCommand,
	findCommand,
	// Text processing
	grepCommand,
	sedCommand,
	awkCommand,
	sortCommand,
	uniqCommand,
	wcCommand,
	headCommand,
	tailCommand,
	cutCommand,
	trCommand,
	teeCommand,
	xargsCommand,
	diffCommand,
	// Archives
	tarCommand,
	gzipCommand,
	gunzipCommand,
	base64Command,
	// System info
	whoamiCommand,
	whoCommand,
	hostnameCommand,
	idCommand,
	groupsCommand,
	unameCommand,
	psCommand,
	killCommand,
	dfCommand,
	duCommand,
	dateCommand,
	sleepCommand,
	pingCommand,
	// Shell
	echoCommand,
	envCommand,
	exportCommand,
	setCommand,
	unsetCommand,
	shCommand,
	clearCommand,
	exitCommand,
	// Editors
	nanoCommand,
	htopCommand,
	// Network
	curlCommand,
	wgetCommand,
	// Users
	adduserCommand,
	passwdCommand,
	deluserCommand,
	sudoCommand,
	suCommand,
	// Misc
	neofetchCommand,
	// Package management
	aptCommand,
	aptCacheCommand,
	dpkgCommand,
	dpkgQueryCommand,
	// Shell (extended)
	whichCommand,
	typeCommand,
	manCommand,
	aliasCommand,
	unaliasCommand,
	testCommand,
	sourceCommand,
	historyCommand,
	printfCommand,
	readCommand,
	declareCommand,
	shiftCommand,
	trapCommand,
	returnCommand,
	trueCommand,
	falseCommand,
	npmCommand,
	npxCommand,
	nodeCommand,
	python3Command,
	// System (extended)
	uptimeCommand,
	freeCommand,
	lsbReleaseCommand,
];

const customCommands: ShellModule[] = [];
const commandRegistry = new Map<string, ShellModule>();
let cachedCommandNames: string[] | null = null;

const helpCommand = createHelpCommand(() =>
	getCommandModules().map((cmd) => cmd.name),
);

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

/**
 * Search $PATH in the VFS for an executable file matching `name`.
 *
 * - Directories in `env.vars.PATH` are searched left-to-right.
 * - `/sbin` and `/usr/sbin` are only accessible to root or via sudo.
 * - Returns the absolute VFS path of the first match, or `null`.
 */
function resolveVfsBinary(
	name: string,
	env: ShellEnv,
	shell: VirtualShell,
	authUser: string,
): string | null {
	if (name.startsWith("/")) {
		if (!shell.vfs.exists(name)) return null;
		try {
			const st = shell.vfs.stat(name);
			if (st.type !== "file") return null;
			if (!(st.mode & 0o111)) return null;
			if (
				(name.startsWith("/sbin/") || name.startsWith("/usr/sbin/")) &&
				authUser !== "root"
			)
				return null;
			return name;
		} catch {
			return null;
		}
	}

	const pathDirs = (env.vars.PATH ?? "/usr/local/bin:/usr/bin:/bin").split(":");
	for (const dir of pathDirs) {
		if ((dir === "/sbin" || dir === "/usr/sbin") && authUser !== "root")
			continue;
		const full = `${dir}/${name}`;
		if (!shell.vfs.exists(full)) continue;
		try {
			const st = shell.vfs.stat(full);
			if (st.type !== "file") continue;
			if (!(st.mode & 0o111)) continue;
			return full;
		} catch {}
	}
	return null;
}

/**
 * Execute a pre-parsed command directly by name and argument list.
 *
 * Unlike `runCommand`, this function does NOT re-join name+args into a string
 * and re-parse — so arguments that contain special characters (`;`, `|`, `>`,
 * quotes) are passed through verbatim. Use this from the pipeline executor.
 *
 * Variable expansion (`$VAR`, `$((expr))`, `${#VAR}`, etc.) is handled by
 * `runCommand` for simple commands and by `sh.ts` line-by-line for scripts.
 * Args are NOT pre-expanded here to preserve lazy evaluation across `&&`/`||`.
 */
export async function runCommandDirect(
	name: string,
	args: string[],
	authUser: string,
	hostname: string,
	mode: CommandMode,
	cwd: string,
	shell: VirtualShell,
	stdin: string | undefined,
	env: ShellEnv,
): Promise<CommandResult> {
	// Alias expansion on the command name
	const aliasVal = env.vars[`__alias_${name}`];
	if (aliasVal) {
		// Alias may expand to a multi-word command — re-route through runCommand
		return runCommand(
			`${aliasVal} ${args.join(" ")}`,
			authUser,
			hostname,
			mode,
			cwd,
			shell,
			stdin,
			env,
		);
	}

	const mod = resolveModule(name);
	if (!mod) {
		// VFS PATH fallback
		const vfsBinary = resolveVfsBinary(name, env, shell, authUser);
		if (vfsBinary) {
			const stubContent = shell.vfs.readFile(vfsBinary);
			const builtinMatch = stubContent.match(/exec\s+builtin\s+(\S+)/);
			if (builtinMatch) {
				const builtinMod = resolveModule(builtinMatch[1]!);
				if (builtinMod) {
					return await builtinMod.run({
						authUser,
						hostname,
						activeSessions: shell.users.listActiveSessions(),
						rawInput: [name, ...args].join(" "),
						mode,
						args,
						stdin,
						cwd,
						shell,
						env,
					});
				}
			}
			const shMod = resolveModule("sh");
			if (shMod) {
				return await shMod.run({
					authUser,
					hostname,
					activeSessions: shell.users.listActiveSessions(),
					rawInput: `sh -c ${JSON.stringify(stubContent)}`,
					mode,
					args: ["-c", stubContent, "--", ...args],
					stdin,
					cwd,
					shell,
					env,
				});
			}
		}
		return { stderr: `${name}: command not found`, exitCode: 127 };
	}

	try {
		return await mod.run({
			authUser,
			hostname,
			activeSessions: shell.users.listActiveSessions(),
			rawInput: [name, ...args].join(" "),
			mode,
			args,
			stdin,
			cwd,
			shell,
			env,
		});
	} catch (error: unknown) {
		return {
			stderr: error instanceof Error ? error.message : "Command failed",
			exitCode: 1,
		};
	}
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

	// ── Alias expansion on raw input (before operator detection) ─────────────
	// Only expand the first word to avoid breaking quoted multi-word aliases
	const rawFirstWord = trimmed.split(/\s+/)[0] ?? "";
	const aliasVal = shellEnv.vars[`__alias_${rawFirstWord}`];
	const aliasExpanded = aliasVal
		? trimmed.replace(rawFirstWord, aliasVal)
		: trimmed;

	// ── Detect shell operators FIRST (on raw input, before variable expansion) ─
	// This ensures `export A=1 && echo $A` expands $A AFTER export runs,
	// not before. Expansion happens lazily in runCommandDirect for each node.
	const hasOperators =
		/(?<![|&])[|](?![|])/.test(aliasExpanded) ||
		aliasExpanded.includes(">") ||
		aliasExpanded.includes("<") ||
		aliasExpanded.includes("&&") ||
		aliasExpanded.includes("||") ||
		aliasExpanded.includes(";");

	if (hasOperators) {
		const script = parseScript(aliasExpanded);
		if (!script.isValid)
			return { stderr: script.error || "Syntax error", exitCode: 1 };
		try {
			return await executeStatements(
				script.statements,
				authUser,
				hostname,
				mode,
				cwd,
				shell,
				shellEnv,
			);
		} catch (error: unknown) {
			return {
				stderr: error instanceof Error ? error.message : "Execution failed",
				exitCode: 1,
			};
		}
	}

	// ── Simple command: full variable + $(cmd) expansion ─────────────────────
	// expandAsync handles: $((expr)) ${#VAR} ${VAR:-def} ${VAR:=def} ${VAR:+alt}
	// ${VAR} $VAR $? $$ $# ~ — and $(cmd) substitution (single-quote-aware).
	const expanded = await expandAsync(
		aliasExpanded,
		shellEnv.vars,
		shellEnv.lastExitCode,
		(sub) =>
			runCommand(
				sub,
				authUser,
				hostname,
				mode,
				cwd,
				shell,
				undefined,
				shellEnv,
			).then((r) => r.stdout ?? ""),
	);

	const { commandName, args } = parseInput(expanded);
	const mod = resolveModule(commandName);

	if (!mod) {
		// ── VFS PATH resolution ───────────────────────────────────────────────
		// Before giving up, search $PATH in the VFS for an executable file.
		// Mirrors real shell behaviour: unknown builtins fall through to PATH.
		const vfsBinary = resolveVfsBinary(commandName, shellEnv, shell, authUser);
		if (vfsBinary) {
			// Execute stub content via sh interpreter
			const stubContent = shell.vfs.readFile(vfsBinary);
			// If stub delegates to a builtin ("exec builtin xxx"), run that builtin
			const builtinMatch = stubContent.match(/exec\s+builtin\s+(\S+)/);
			if (builtinMatch) {
				const builtinName = builtinMatch[1]!;
				const builtinMod = resolveModule(builtinName);
				if (builtinMod) {
					return await builtinMod.run({
						authUser,
						hostname,
						activeSessions: shell.users.listActiveSessions(),
						rawInput: [commandName, ...args].join(" "),
						mode,
						args,
						stdin,
						cwd,
						shell,
						env: shellEnv,
					});
				}
			}
			// Otherwise execute the stub as a sh script
			const shMod = resolveModule("sh");
			if (shMod) {
				return await shMod.run({
					authUser,
					hostname,
					activeSessions: shell.users.listActiveSessions(),
					rawInput: `sh -c ${JSON.stringify(stubContent)}`,
					mode,
					args: ["-c", stubContent, "--", ...args],
					stdin,
					cwd,
					shell,
					env: shellEnv,
				});
			}
		}

		return { stderr: `${commandName}: command not found`, exitCode: 127 };
	}

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
		return {
			stderr: error instanceof Error ? error.message : "Command failed",
			exitCode: 1,
		};
	}
}
