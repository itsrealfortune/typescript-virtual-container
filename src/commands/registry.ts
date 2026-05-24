import type {
	CommandContext,
	CommandResult,
	ShellModule,
} from "../types/commands";
import {adduserCommand} from "./adduser";
import {aliasCommand, unaliasCommand} from "./alias";
import {aptCacheCommand, aptCommand} from "./apt";
import {awkCommand} from "./awk";
import {base64Command} from "./base64";
import {basenameCommand, dirnameCommand} from "./basename";
import {bcCommand} from "./bc";
import {bunzip2Command, bzip2Command} from "./bzip2";
import {catCommand} from "./cat";
import {cdCommand} from "./cd";
import {chageCommand} from "./chage";
import {chgrpCommand} from "./chgrp";
import {chmodCommand} from "./chmod";
import {chownCommand} from "./chown";
import {clearCommand} from "./clear";
import {conntrackCommand} from "./conntrack";
import {crontabCommand} from "./crontab";
import {
	columnCommand,
	mktempCommand,
	nlCommand,
	nprocCommand,
	pasteCommand,
	shufCommand,
	tacCommand,
	timeoutCommand,
	waitCommand,
} from "./coreutils";
import {cpCommand} from "./cp";
import {curlCommand} from "./curl";
import {cutCommand} from "./cut";
import {dateCommand} from "./date";
import {ddCommand} from "./dd";
import {declareCommand} from "./declare";
import {deluserCommand} from "./deluser";
import {dfCommand} from "./df";
import {diffCommand} from "./diff";
import {dpkgCommand, dpkgQueryCommand} from "./dpkg";
import {duCommand} from "./du";
import {echoCommand} from "./echo";
import {envCommand} from "./env";
import {exitCommand} from "./exit";
import {exportCommand} from "./export";
import {exprCommand} from "./expr";
import {fileCommand} from "./file";
import {findCommand} from "./find";
import {freeCommand} from "./free";
import {
	cmatrixCommand,
	cowsayCommand,
	cowthinkCommand,
	fortuneCommand,
	slCommand,
	yesCommand,
} from "./fun";
import {getentCommand} from "./getent";
import {gitCommand} from "./git";
import {gpasswdCommand} from "./gpasswd";
import {grepCommand} from "./grep";
import {groupaddCommand} from "./groupadd";
import {groupdelCommand} from "./groupdel";
import {groupsCommand} from "./groups";
import {gunzipCommand, gzipCommand} from "./gzip";
import {headCommand} from "./head";
import {createHelpCommand} from "./help";
import {historyCommand} from "./history";
import {atCommand, atqCommand, atrmCommand} from "./at";
import {hostnameCommand} from "./hostname";
import {journalctlCommand} from "./journalctl";
import {htopCommand} from "./htop";
import {idCommand} from "./id";
import {ifconfigCommand} from "./ifconfig";
import {ipCommand} from "./ip";
import {iptablesCommand} from "./iptables";
import {bgCommand, fgCommand, jobsCommand} from "./jobs";
import {killCommand} from "./kill";
import {dmesgCommand, lastCommand} from "./last";
import {lessCommand} from "./less";
import {lnCommand, readlinkCommand} from "./ln";
import {lsCommand} from "./ls";
import {lsbReleaseCommand} from "./lsb-release";
import {lsofCommand} from "./lsof";
import {makeCommand} from "./make";
import {manCommand} from "./man";
import {
	expandCommand,
	fmtCommand,
	foldCommand,
	md5sumCommand,
	realpathCommand,
	sha256sumCommand,
	stringsCommand,
} from "./miscutils";
import {mkdirCommand} from "./mkdir";
import {mkfifoCommand, mknodCommand} from "./mknod";
import {moreCommand} from "./more";
import {mousepadCommand} from "./mousepad";
import {mvCommand} from "./mv";
import {nanoCommand} from "./nano";
import {neofetchCommand} from "./neofetch";
import {ncCommand} from "./netcat";
import {newgrpCommand} from "./newgrp";
import {niceCommand} from "./nice";
import {nodeCommand} from "./node";
import {nohupCommand} from "./nohup";
import {npmCommand, npxCommand} from "./npm";
import {pacmanCommand} from "./pacman";
import {passwdCommand} from "./passwd";
import {perlCommand} from "./perl";
import {pingCommand} from "./ping";
import {printfCommand} from "./printf";
import {pgrepCommand, pkillCommand} from "./procUtils";
import {psCommand} from "./ps";
import {pwdCommand} from "./pwd";
import {python3Command} from "./python";
import {readCommand} from "./read";
import {rmCommand} from "./rm";
import {sedCommand} from "./sed";
import {seqCommand} from "./seq";
import {setCommand} from "./set";
import {shCommand} from "./sh";
import {returnCommand, shiftCommand, trapCommand} from "./shift";
import {sleepCommand} from "./sleep";
import {sortCommand} from "./sort";
import {sourceCommand} from "./source";
import {sshKeygenCommand} from "./ssh-keygen";
import {ssCommand} from "./ss";
import {startxfce4Command} from "./startxfce4";
import {statCommand} from "./stat";
import {straceCommand} from "./strace";
import {suCommand} from "./su";
import {sudoCommand} from "./sudo";
import {swapCommand} from "./swap";
import {systemctlCommand} from "./systemctl";
import {umountCommand} from "./umount";
import {sysctlCommand} from "./sysctl";
import {mountCommand} from "./mount";
import {lscpuCommand, lspciCommand, lsusbCommand} from "./sysinfo";
import {tailCommand} from "./tail";
import {tarCommand} from "./tar";
import {tcCommand} from "./tc";
import {teeCommand} from "./tee";
import {testCommand} from "./test";
import {
	commCommand,
	csplitCommand,
	joinCommand,
	splitCommand,
} from "./textutils";
import {topCommand} from "./top";
import {touchCommand} from "./touch";
import {sttyCommand, tputCommand} from "./tput";
import {trCommand} from "./tr";
import {tracerouteCommand} from "./traceroute";
import {treeCommand} from "./tree";
import {falseCommand, trueCommand} from "./true";
import {typeCommand} from "./type";
import {unameCommand} from "./uname";
import {uniqCommand} from "./uniq";
import {unsetCommand} from "./unset";
import {uptimeCommand} from "./uptime";
import {usermodCommand} from "./usermod";
import {viCommand} from "./vi";
import {wCommand} from "./w";
import {wcCommand} from "./wc";
import {wgetCommand} from "./wget";
import {whichCommand} from "./which";
import {whoCommand} from "./who";
import {whoamiCommand} from "./whoami";
import {xargsCommand} from "./xargs";
import {thunarCommand} from "./xfceDesktop";
import {unzipCommand, zipCommand} from "./zip";

import {arpCommand} from "./arp";
import {cmpCommand} from "./cmp";
import {digCommand} from "./dig";
import {ethtoolCommand} from "./ethtool";
import {
	figletCommand,
	bannerCommand,
	toiletCommand,
	factorCommand,
	rsCommand,
} from "./p3-fun";
import {gpgCommand} from "./gpg";
import {hexdumpCommand} from "./hexdump";
import {iconvCommand} from "./iconv";
import {loggerCommand} from "./logger";
import {nslookupCommand} from "./nslookup";
import {odCommand} from "./od";
import {opensslCommand} from "./openssl";
import {patchCommand} from "./patch";
import {prCommand} from "./pr";
import {recodeCommand} from "./recode";
import {routeCommand} from "./route";
import {rsyncCommand} from "./rsync";
import {
	screenCommand,
	tmuxCommand,
	watchCommand,
	timeCommand,
} from "./p3-terminal";
import {serviceCommand} from "./service";
import {useraddCommand, userdelCommand, groupmodCommand} from "./useradd";
import {xxdCommand} from "./xxd";

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
	mknodCommand,
	mkfifoCommand,
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
	ddCommand,
	realpathCommand,
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
	foldCommand,
	expandCommand,
	fmtCommand,
	md5sumCommand,
	sha256sumCommand,
	stringsCommand,
	joinCommand,
	commCommand,
	splitCommand,
	csplitCommand,
	// Text & data (extended)
	cmpCommand,
	odCommand,
	xxdCommand,
	hexdumpCommand,
	patchCommand,
	iconvCommand,
	recodeCommand,
	prCommand,
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
	getentCommand,
	unameCommand,
	psCommand,
	killCommand,
	dfCommand,
	duCommand,
	dateCommand,
	sleepCommand,
	pingCommand,
	lscpuCommand,
	lsusbCommand,
	lspciCommand,
	pgrepCommand,
	pkillCommand,
	topCommand,
	niceCommand,
	nohupCommand,
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
	viCommand,
	lessCommand,
	moreCommand,
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
	figletCommand,
	bannerCommand,
	toiletCommand,
	factorCommand,
	rsCommand,
	pacmanCommand,
	htopCommand,
	// Development
	makeCommand,
	gitCommand,
	// Network
	curlCommand,
	wgetCommand,
	ncCommand,
	iptablesCommand,
	tcCommand,
	ssCommand,
	tracerouteCommand,
	conntrackCommand,
	ifconfigCommand,
	digCommand,
	nslookupCommand,
	routeCommand,
	arpCommand,
	ethtoolCommand,
	serviceCommand,
	loggerCommand,
	rsyncCommand,
	// Users
	adduserCommand,
	passwdCommand,
	deluserCommand,
	useraddCommand,
	userdelCommand,
	groupmodCommand,
	sudoCommand,
	sysctlCommand,
	suCommand,
	groupaddCommand,
	groupdelCommand,
	gpasswdCommand,
	usermodCommand,
	chageCommand,
	newgrpCommand,
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
	exprCommand,
	// Desktop
	startxfce4Command,
	thunarCommand,
	mousepadCommand,
	// Security
	gpgCommand,
	opensslCommand,
	// Terminal multiplexers
	screenCommand,
	tmuxCommand,
	watchCommand,
	timeCommand,
	// System (extended)
	mountCommand,
	umountCommand,
	systemctlCommand,
	journalctlCommand,
	sshKeygenCommand,
	crontabCommand,
	atCommand,
	atqCommand,
	atrmCommand,
	uptimeCommand,
	freeCommand,
	lsbReleaseCommand,
	lsofCommand,
	straceCommand,
	swapCommand,
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

const helpCommand = createHelpCommand();

function buildCache(): void {
	commandRegistry.clear();
	for (const mod of getCommandModules()) {
		commandRegistry.set(mod.name, mod);
		for (const alias of mod.aliases ?? []) {
			commandRegistry.set(alias, mod);
		}
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
	for (const alias of normalized.aliases ?? []) {
		commandRegistry.set(alias, normalized);
	}
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
	run: (ctx: CommandContext) => CommandResult | Promise<CommandResult>
): ShellModule {
	return {name, params, run};
}

/**
 * Returns a sorted list of all registered command names (including aliases).
 * The list is cached and rebuilt lazily when commands are added or removed.
 *
 * @returns A sorted array of command names
 */
export function getCommandNames(): string[] {
	if (!cachedCommandNames) {
		buildCache();
	}
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
	if (!cachedCommandNames) {
		buildCache();
	}
	return commandRegistry.get(name.toLowerCase());
}
