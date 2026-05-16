/** biome-ignore-all lint/style/useNamingConvention: ENV VARIABLES */
import type { CommandContext, CommandResult, ShellModule } from "../types/commands";
import { adduserCommand } from "./adduser";
import { aliasCommand, unaliasCommand } from "./alias";
import { aptCacheCommand, aptCommand } from "./apt";
import { awkCommand } from "./awk";
import { base64Command } from "./base64";
import { basenameCommand, dirnameCommand } from "./basename";
import { bcCommand } from "./bc";
import { columnCommand, mktempCommand, nlCommand, nprocCommand, pasteCommand, shufCommand, tacCommand, timeoutCommand, waitCommand } from "./coreutils";
import { bunzip2Command, bzip2Command } from "./bzip2";
import { lsofCommand } from "./lsof";
import { perlCommand } from "./perl";
import { straceCommand } from "./strace";
import { unzipCommand, zipCommand } from "./zip";
import { catCommand } from "./cat";
import { cdCommand } from "./cd";
import { chgrpCommand } from "./chgrp";
import { chmodCommand } from "./chmod";
import { chownCommand } from "./chown";
import { clearCommand } from "./clear";
import { cpCommand } from "./cp";
import { curlCommand } from "./curl";
import { cutCommand } from "./cut";
import { dateCommand } from "./date";
import { declareCommand } from "./declare";
import { deluserCommand } from "./deluser";
import { dfCommand } from "./df";
import { diffCommand } from "./diff";
import { dpkgCommand, dpkgQueryCommand } from "./dpkg";
import { duCommand } from "./du";
import { echoCommand } from "./echo";
import { envCommand } from "./env";
import { exitCommand } from "./exit";
import { exportCommand } from "./export";
import { fileCommand } from "./file";
import { findCommand } from "./find";
import { freeCommand } from "./free";
import { cmatrixCommand, cowsayCommand, cowthinkCommand, fortuneCommand, slCommand, yesCommand } from "./fun";
import { pacmanCommand } from "./pacman";
import { grepCommand } from "./grep";
import { groupsCommand } from "./groups";
import { gunzipCommand, gzipCommand } from "./gzip";
import { headCommand } from "./head";
import { createHelpCommand } from "./help";
import { historyCommand } from "./history";
import { hostnameCommand } from "./hostname";
import { htopCommand } from "./htop";
import { idCommand } from "./id";
import { ipCommand } from "./ip";
import { bgCommand, fgCommand, jobsCommand } from "./jobs";
import { killCommand } from "./kill";
import { dmesgCommand, lastCommand } from "./last";
import { lnCommand, readlinkCommand } from "./ln";
import { lsCommand } from "./ls";
import { lsbReleaseCommand } from "./lsb-release";
import { manCommand } from "./man";
import { mkdirCommand } from "./mkdir";
import { mvCommand } from "./mv";
import { nanoCommand } from "./nano";
import { neofetchCommand } from "./neofetch";
import { nodeCommand } from "./node";
import { npmCommand, npxCommand } from "./npm";
import { passwdCommand } from "./passwd";
import { pingCommand } from "./ping";
import { printfCommand } from "./printf";
import { psCommand } from "./ps";
import { pwdCommand } from "./pwd";
import { python3Command } from "./python";
import { readCommand } from "./read";
import { rmCommand } from "./rm";
import { sedCommand } from "./sed";
import { seqCommand } from "./seq";
import { setCommand } from "./set";
import { shCommand } from "./sh";
import { returnCommand, shiftCommand, trapCommand } from "./shift";
import { sleepCommand } from "./sleep";
import { sortCommand } from "./sort";
import { sourceCommand } from "./source";
import { statCommand } from "./stat";
import { suCommand } from "./su";
import { sudoCommand } from "./sudo";
import { tailCommand } from "./tail";
import { tarCommand } from "./tar";
import { teeCommand } from "./tee";
import { testCommand } from "./test";
import { touchCommand } from "./touch";
import { sttyCommand, tputCommand } from "./tput";
import { trCommand } from "./tr";
import { treeCommand } from "./tree";
import { falseCommand, trueCommand } from "./true";
import { typeCommand } from "./type";
import { unameCommand } from "./uname";
import { uniqCommand } from "./uniq";
import { unsetCommand } from "./unset";
import { uptimeCommand } from "./uptime";
import { wCommand } from "./w";
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
	readlinkCommand,
	chmodCommand,
	chownCommand,
	chgrpCommand,
	seqCommand,
	statCommand,
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
	zipCommand,
	unzipCommand,
	bzip2Command,
	bunzip2Command,
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
	wCommand,
	basenameCommand,
	dirnameCommand,
	fileCommand,
	tputCommand,
	sttyCommand,
	lastCommand,
	dmesgCommand,
	ipCommand,
	yesCommand,
	fortuneCommand,
	cowsayCommand,
	cowthinkCommand,
	cmatrixCommand,
	slCommand,
	pacmanCommand,
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
	jobsCommand,
	bgCommand,
	fgCommand,
	bcCommand,
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
	lsofCommand,
	straceCommand,
	// Scripting
	perlCommand,
	// Coreutils (extended)
	timeoutCommand,
	mktempCommand,
	nprocCommand,
	waitCommand,
	shufCommand,
	pasteCommand,
	tacCommand,
	nlCommand,
	columnCommand,
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

/**
 * Registers a command module so it can be called from the shell.
 * The module's name and aliases are lowercased and trimmed; names must be
 * non-empty and contain no spaces. Updates the registry incrementally and
 * invalidates the sorted-name cache.
 *
 * @param module - The command module to register
 */
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
	// Incremental insert — avoids full Map rebuild for every registerCommand call
	commandRegistry.set(normalized.name, normalized);
	for (const alias of normalized.aliases ?? []) commandRegistry.set(alias, normalized);
	// Invalidate sorted names cache; rebuilt lazily on next getCommandNames()
	cachedCommandNames = null;
}

/**
 * Creates a custom user-defined command from a shell script or function.
 * The returned module is not automatically registered; call
 * {@link registerCommand} to add it to the registry.
 *
 * @param name - The command name
 * @param params - Parameter names for the command
 * @param run   - The handler invoked when the command is executed
 * @returns A command module that can be passed to registerCommand
 */
export function createCustomCommand(
	name: string,
	params: string[],
	run: (ctx: CommandContext) => CommandResult | Promise<CommandResult>,
): ShellModule {
	return { name, params, run };
}

/**
 * Returns a sorted list of all registered command names (including aliases).
 * The list is cached and rebuilt lazily when commands are added or removed.
 *
 * @returns A sorted array of command names
 */
export function getCommandNames(): string[] {
	if (!cachedCommandNames) buildCache();
	return cachedCommandNames!;
}

/**
 * Returns all public command modules — built-in commands, custom commands,
 * and the dynamically generated help command.
 *
 * @returns An array of all registered command modules
 */
export function getCommandModulesPublic(): ShellModule[] {
	return getCommandModules();
}

/**
 * Resolves a command module by name or alias. The lookup is case-insensitive.
 * Builds the internal cache first if it has not been populated yet.
 *
 * @param name - The command or alias name to look up
 * @returns The matching ShellModule, or undefined if not found
 */
export function resolveModule(name: string): ShellModule | undefined {
	if (!cachedCommandNames) buildCache();
	return commandRegistry.get(name.toLowerCase());
}
