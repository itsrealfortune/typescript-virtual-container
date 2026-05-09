import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

// ─── which ───────────────────────────────────────────────────────────────────

export const whichCommand: ShellModule = {
	name: "which",
	description: "Locate a command in PATH",
	category: "shell",
	params: ["<command...>"],
	run: ({ args, shell, env }) => {
		if (args.length === 0) return { stderr: "which: missing argument", exitCode: 1 };

		const pathDirs = (env?.vars?.PATH ?? "/usr/local/bin:/usr/bin:/bin").split(":");
		const lines: string[] = [];
		let anyMissing = false;

		for (const name of args) {
			let found = false;
			for (const dir of pathDirs) {
				const full = `${dir}/${name}`;
				if (shell.vfs.exists(full)) {
					const st = shell.vfs.stat(full);
					if (st.type === "file") {
						lines.push(full);
						found = true;
						break;
					}
				}
			}
			if (!found) {
				anyMissing = true;
			}
		}

		if (lines.length === 0) return { exitCode: 1 };
		return { stdout: lines.join("\n"), exitCode: anyMissing ? 1 : 0 };
	},
};

// ─── type ────────────────────────────────────────────────────────────────────

export const typeCommand: ShellModule = {
	name: "type",
	description: "Describe how a command would be interpreted",
	category: "shell",
	params: ["<command...>"],
	run: ({ args, shell, env }) => {
		if (args.length === 0) return { stderr: "type: missing argument", exitCode: 1 };

		const pathDirs = (env?.vars?.PATH ?? "/usr/local/bin:/usr/bin:/bin").split(":");
		const lines: string[] = [];
		let exitCode = 0;

		// Import resolveModule lazily to check builtins
		const { resolveModule } = require("../commands") as { resolveModule: (n: string) => unknown };

		for (const name of args) {
			const builtin = resolveModule(name);
			if (builtin) {
				lines.push(`${name} is a shell builtin`);
				continue;
			}

			let found = false;
			for (const dir of pathDirs) {
				const full = `${dir}/${name}`;
				if (shell.vfs.exists(full)) {
					lines.push(`${name} is ${full}`);
					found = true;
					break;
				}
			}

			if (!found) {
				lines.push(`${name}: not found`);
				exitCode = 1;
			}
		}

		return { stdout: lines.join("\n"), exitCode };
	},
};

// ─── man ─────────────────────────────────────────────────────────────────────

const MAN_PAGES: Record<string, string> = {
	ls: `LS(1)                    User Commands                    LS(1)

NAME
       ls - list directory contents

SYNOPSIS
       ls [OPTION]... [FILE]...

DESCRIPTION
       List information about the FILEs (the current directory by default).

OPTIONS
       -l     use a long listing format
       -a     do not ignore entries starting with .
       -h     with -l, print human readable sizes
       -r     reverse order while sorting
       -t     sort by modification time

AUTHOR
       Written by Richard M. Stallman and David MacKenzie.`,

	cat: `CAT(1)                   User Commands                    CAT(1)

NAME
       cat - concatenate files and print on the standard output

SYNOPSIS
       cat [OPTION]... [FILE]...

DESCRIPTION
       Concatenate FILE(s) to standard output.

OPTIONS
       -n, --number          number all output lines
       -b, --number-nonblank number nonempty output lines`,

	grep: `GREP(1)                  User Commands                    GREP(1)

NAME
       grep, egrep, fgrep - print lines that match patterns

SYNOPSIS
       grep [OPTION]... PATTERNS [FILE]...

OPTIONS
       -i, --ignore-case     ignore case distinctions in patterns and data
       -v, --invert-match    select non-matching lines
       -n, --line-number     print line number with output lines
       -r, --recursive       read all files under each directory, recursively`,

	apt: `APT(8)                   APT                             APT(8)

NAME
       apt - command-line interface

SYNOPSIS
       apt [options] command

DESCRIPTION
       apt provides a high-level commandline interface for the package
       management system.

COMMANDS
       install pkg...   Install packages
       remove pkg...    Remove packages
       update           Download package information
       upgrade          Upgrade installed packages
       search term      Search in package descriptions
       show pkg         Show package information
       list             List packages`,

	ssh: `SSH(1)                   OpenSSH                          SSH(1)

NAME
       ssh - OpenSSH remote login client

SYNOPSIS
       ssh [-p port] [user@]hostname [command]

DESCRIPTION
       ssh (SSH client) is a program for logging into a remote machine and
       for executing commands on a remote machine.`,

	curl: `CURL(1)                  User Commands                    CURL(1)

NAME
       curl - transfer a URL

SYNOPSIS
       curl [options / URLs]

DESCRIPTION
       curl is a tool for transferring data with URL syntax.

OPTIONS
       -o, --output <file>     Write output to <file>
       -X, --request <method>  Specify request method
       -d, --data <data>       HTTP POST data
       -H, --header <header>   Pass custom header
       -s, --silent            Silent mode
       -I, --head              Show document info only
       -L, --location          Follow redirects
       -v, --verbose           Make the operation more talkative`,

	chmod: `CHMOD(1)                 User Commands                    CHMOD(1)

NAME
       chmod - change file mode bits

SYNOPSIS
       chmod [OPTION]... MODE[,MODE]... FILE...
       chmod [OPTION]... OCTAL-MODE FILE...

DESCRIPTION
       Change the file mode bits of each given file according to MODE.

EXAMPLES
       chmod 755 script.sh      rwxr-xr-x
       chmod 644 file.txt       rw-r--r--
       chmod +x script.sh       add execute permission`,

	tar: `TAR(1)                   GNU tar Manual                   TAR(1)

NAME
       tar - an archiving utility

SYNOPSIS
       tar [OPTION...] [FILE]...

DESCRIPTION
       tar saves many files together into a single tape or disk archive,
       and can restore individual files from the archive.

OPTIONS
       -c, --create           create a new archive
       -x, --extract          extract files from an archive
       -z, --gzip             filter the archive through gzip
       -f, --file=ARCHIVE     use archive file or device ARCHIVE
       -v, --verbose          verbosely list files processed
       -t, --list             list the contents of an archive`,
};

export const manCommand: ShellModule = {
	name: "man",
	description: "Interface to the system reference manuals",
	category: "misc",
	params: ["<command>"],
	run: ({ args, shell }) => {
		const name = args[0];
		if (!name) return { stderr: "What manual page do you want?", exitCode: 1 };

		// Check VFS /usr/share/man first
		const manPath = `/usr/share/man/man1/${name}.1`;
		if (shell.vfs.exists(manPath)) {
			return { stdout: shell.vfs.readFile(manPath), exitCode: 0 };
		}

		const page = MAN_PAGES[name.toLowerCase()];
		if (page) return { stdout: page, exitCode: 0 };

		return {
			stderr: `No manual entry for ${name}`,
			exitCode: 16,
		};
	},
};

// ─── uptime ───────────────────────────────────────────────────────────────────

export const uptimeCommand: ShellModule = {
	name: "uptime",
	description: "Tell how long the system has been running",
	category: "system",
	params: ["[-p] [-s]"],
	run: ({ args, shell }) => {
		const pretty = ifFlag(args, ["-p"]);
		const since = ifFlag(args, ["-s"]);

		const startTime: number = (shell as unknown as { _startTime?: number })._startTime ?? Date.now();
		const uptimeSec = Math.floor((Date.now() - startTime) / 1000);
		const days = Math.floor(uptimeSec / 86400);
		const hours = Math.floor((uptimeSec % 86400) / 3600);
		const mins = Math.floor((uptimeSec % 3600) / 60);

		if (since) {
			const startDate = new Date(startTime);
			return { stdout: startDate.toISOString().slice(0, 19).replace("T", " "), exitCode: 0 };
		}

		if (pretty) {
			const parts: string[] = [];
			if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
			if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
			parts.push(`${mins} minute${mins !== 1 ? "s" : ""}`);
			return { stdout: `up ${parts.join(", ")}`, exitCode: 0 };
		}

		const now = new Date();
		const timeStr = now.toTimeString().slice(0, 8);
		const uptimeStr = days > 0 ? `${days} day${days > 1 ? "s" : ""}, ${String(hours).padStart(2)}:${String(mins).padStart(2, "0")}` : `${String(hours).padStart(2)}:${String(mins).padStart(2, "0")}`;
		const sessions = shell.users.listActiveSessions().length;
		const load = (Math.random() * 0.5).toFixed(2);
		return {
			stdout: ` ${timeStr} up ${uptimeStr},  ${sessions} user${sessions !== 1 ? "s" : ""},  load average: ${load}, ${load}, ${load}`,
			exitCode: 0,
		};
	},
};

// ─── free ─────────────────────────────────────────────────────────────────────

export const freeCommand: ShellModule = {
	name: "free",
	description: "Display amount of free and used memory",
	category: "system",
	params: ["[-h] [-m] [-g]"],
	run: ({ args }) => {
		const human = ifFlag(args, ["-h", "--human"]);
		const mb = ifFlag(args, ["-m"]);
		const gb = ifFlag(args, ["-g"]);

		const _totalB = process.memoryUsage?.()?.heapTotal ?? 512 * 1024 * 1024;
		// Use os.totalmem/freemem which reflect the real system
		const osTotalB = (() => { try { return require("node:os").totalmem(); } catch { return 2 * 1024 * 1024 * 1024; } })();
		const osFreeB = (() => { try { return require("node:os").freemem(); } catch { return 512 * 1024 * 1024; } })();
		const usedB = osTotalB - osFreeB;
		const sharedB = Math.floor(osTotalB * 0.02);
		const buffersB = Math.floor(osTotalB * 0.05);
		const availableB = Math.floor(osFreeB * 0.95);

		const fmt = (bytes: number): string => {
			if (human) {
				if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)}G`;
				if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}M`;
				return `${(bytes / 1024).toFixed(1)}K`;
			}
			if (gb) return String(Math.floor(bytes / (1024 * 1024 * 1024)));
			if (mb) return String(Math.floor(bytes / (1024 * 1024)));
			return String(Math.floor(bytes / 1024)); // kB default
		};

		const _unit = gb ? "(GB)" : mb ? "(MB)" : human ? "" : "(kB)";
		const header = `               total        used        free      shared  buff/cache   available`;
		const memRow = `Mem:  ${fmt(osTotalB).padStart(12)} ${fmt(usedB).padStart(11)} ${fmt(osFreeB).padStart(11)} ${fmt(sharedB).padStart(11)} ${fmt(buffersB).padStart(11)} ${fmt(availableB).padStart(11)}`;
		const swapRow = `Swap: ${fmt(Math.floor(osTotalB * 0.5)).padStart(12)} ${fmt(0).padStart(11)} ${fmt(Math.floor(osTotalB * 0.5)).padStart(11)}`;

		return { stdout: [header, memRow, swapRow].join("\n"), exitCode: 0 };
	},
};

// ─── lsb_release ──────────────────────────────────────────────────────────────

export const lsbReleaseCommand: ShellModule = {
	name: "lsb_release",
	description: "Print distribution-specific information",
	category: "system",
	params: ["[-a] [-i] [-d] [-r] [-c]"],
	run: ({ args, shell }) => {
		// Read from VFS /etc/os-release
		let osName = shell.properties?.os ?? "Fortune GNU/Linux x64";
		let codename = "aurora";
		let version = "1.0";

		try {
			const content = shell.vfs.readFile("/etc/os-release");
			for (const line of content.split("\n")) {
				if (line.startsWith("PRETTY_NAME="))
					osName = line.slice("PRETTY_NAME=".length).replace(/^"|"$/g, "").trim();
				if (line.startsWith("VERSION_CODENAME="))
					codename = line.slice("VERSION_CODENAME=".length).trim();
				if (line.startsWith("VERSION_ID="))
					version = line.slice("VERSION_ID=".length).replace(/^"|"$/g, "").trim();
			}
		} catch {}

		const all = ifFlag(args, ["-a", "--all"]);
		const id = ifFlag(args, ["-i", "--id"]);
		const desc = ifFlag(args, ["-d", "--description"]);
		const rel = ifFlag(args, ["-r", "--release"]);
		const code = ifFlag(args, ["-c", "--codename"]);

		if (all || args.length === 0) {
			return {
				stdout: [
					`Distributor ID:\tFortune`,
					`Description:\t${osName}`,
					`Release:\t${version}`,
					`Codename:\t${codename}`,
				].join("\n"),
				exitCode: 0,
			};
		}

		const lines: string[] = [];
		if (id) lines.push(`Distributor ID:\tFortune`);
		if (desc) lines.push(`Description:\t${osName}`);
		if (rel) lines.push(`Release:\t${version}`);
		if (code) lines.push(`Codename:\t${codename}`);

		return { stdout: lines.join("\n"), exitCode: 0 };
	},
};

// ─── alias ────────────────────────────────────────────────────────────────────

export const aliasCommand: ShellModule = {
	name: "alias",
	description: "Define or display aliases",
	category: "shell",
	params: ["[name[=value] ...]"],
	run: ({ args, env }) => {
		if (!env) return { exitCode: 0 };

		// aliases stored in env.vars under prefix __alias_
		if (args.length === 0) {
			const aliases = Object.entries(env.vars)
				.filter(([k]) => k.startsWith("__alias_"))
				.map(([k, v]) => `alias ${k.slice("__alias_".length)}='${v}'`);
			return { stdout: aliases.join("\n") || "", exitCode: 0 };
		}

		const lines: string[] = [];
		for (const arg of args) {
			const eq = arg.indexOf("=");
			if (eq === -1) {
				// Show alias
				const val = env.vars[`__alias_${arg}`];
				if (val) lines.push(`alias ${arg}='${val}'`);
				else return { stderr: `alias: ${arg}: not found`, exitCode: 1 };
			} else {
				const name = arg.slice(0, eq);
				const val = arg.slice(eq + 1).replace(/^['"]|['"]$/g, "");
				env.vars[`__alias_${name}`] = val;
			}
		}
		return { stdout: lines.join("\n") || undefined, exitCode: 0 };
	},
};

export const unaliasCommand: ShellModule = {
	name: "unalias",
	description: "Remove alias definitions",
	category: "shell",
	params: ["<name...> | -a"],
	run: ({ args, env }) => {
		if (!env) return { exitCode: 0 };
		if (ifFlag(args, ["-a"])) {
			for (const k of Object.keys(env.vars)) {
				if (k.startsWith("__alias_")) delete env.vars[k];
			}
			return { exitCode: 0 };
		}
		for (const name of args) {
			delete env.vars[`__alias_${name}`];
		}
		return { exitCode: 0 };
	},
};
