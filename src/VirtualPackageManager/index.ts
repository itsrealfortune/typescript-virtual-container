import type VirtualFileSystem from "../VirtualFileSystem";
import type { VirtualUserManager } from "../VirtualUserManager";

// ─── types ────────────────────────────────────────────────────────────────────

/**
 * A single file entry written into the VFS when a package is installed.
 */
export interface PackageFile {
	/** Absolute VFS destination path (e.g. `"/usr/bin/vim"`). */
	path: string;
	/** Text content to write. */
	content: string;
	/** POSIX mode bits (default `0o644`; use `0o755` for executables). */
	mode?: number;
}

/**
 * Metadata and behaviour definition for a single package in the registry.
 *
 * Used both for the built-in registry entries and for consumer-supplied custom
 * packages. `files` are written to the VFS on `install()`, and `onInstall` /
 * `onRemove` hooks allow arbitrary VFS mutations.
 */
export interface PackageDefinition {
	/** Package name — lowercase, no spaces (e.g. `"vim"`, `"build-essential"`). */
	name: string;
	/** Debian-style version string (e.g. `"2:9.0.1378-2"`). */
	version: string;
	/** CPU architecture label (default `"amd64"`). */
	architecture?: string;
	/** Maintainer name and email shown in `apt show` output. */
	maintainer?: string;
	/** Full package description. */
	description: string;
	/** Short one-line summary shown in `apt search` results. */
	shortDesc?: string;
	/** Installed disk usage in kilobytes (informational). */
	installedSizeKb?: number;
	/** Other package names that must be installed first (resolved recursively). */
	depends?: string[];
	/** Repository section (e.g. `"utils"`, `"net"`, `"editors"`, `"devel"`). */
	section?: string;
	/** Files to write into the VFS during installation. */
	files?: PackageFile[];
	/**
	 * Hook called after all files are written.
	 * Use to create directories, write config, or register shell commands.
	 */
	onInstall?: (vfs: VirtualFileSystem, users: VirtualUserManager) => void;
	/** Hook called before VFS files are removed during uninstall. */
	onRemove?: (vfs: VirtualFileSystem) => void;
}

/**
 * Runtime record of an installed package, persisted to `/var/lib/dpkg/status`.
 */
export interface InstalledPackage {
	/** Package name. */
	name: string;
	/** Installed version string. */
	version: string;
	/** CPU architecture. */
	architecture: string;
	/** Maintainer display string. */
	maintainer: string;
	/** Full description. */
	description: string;
	/** Repository section. */
	section: string;
	/** Installed disk usage in kilobytes. */
	installedSizeKb: number;
	/** ISO-8601 timestamp of when the package was installed. */
	installedAt: string;
	/** Absolute VFS paths written by this package (used by `dpkg -L`). */
	files: string[];
}

// ─── built-in package registry ───────────────────────────────────────────────

const PACKAGE_REGISTRY: PackageDefinition[] = [
	{
		name: "vim",
		version: "2:9.0.1378-2",
		section: "editors",
		description: "Vi IMproved - enhanced vi editor",
		shortDesc: "Vi IMproved",
		installedSizeKb: 3812,
		files: [
			{
				path: "/usr/bin/vim",
				content: "#!/bin/sh\nexec builtin nano \"$@\"\n",
				mode: 0o755,
			},
			{
				path: "/usr/bin/vi",
				content: "#!/bin/sh\nexec builtin nano \"$@\"\n",
				mode: 0o755,
			},
			{
				path: "/usr/share/doc/vim/README",
				content: "Vim editor — virtual package.\n",
			},
		],
	},
	{
		name: "git",
		version: "1:2.39.2-1",
		section: "vcs",
		description: "Fast, scalable, distributed revision control system",
		shortDesc: "fast distributed version control system",
		installedSizeKb: 11240,
		files: [
			{
				path: "/usr/bin/git",
				content: "#!/bin/sh\necho 'git: virtual stub — no host access'\n",
				mode: 0o755,
			},
			{
				path: "/usr/share/doc/git/README.Debian",
				content: "Git virtual package for Fortune GNU/Linux.\n",
			},
		],
	},
	{
		name: "python3",
		version: "3.11.2-1+b1",
		section: "python",
		description: "Interactive high-level object-oriented language (version 3)",
		shortDesc: "interactive high-level object-oriented language",
		installedSizeKb: 512,
		depends: ["python3-minimal"],
		files: [
			{
				path: "/usr/bin/python3",
				content: "#!/bin/sh\necho 'Python 3.11.2 (virtual)'\n",
				mode: 0o755,
			},
			{
				path: "/usr/bin/python3.11",
				content: "#!/bin/sh\nexec builtin python3 \"$@\"\n",
				mode: 0o755,
			},
			{ path: "/usr/lib/python3.11/.keep", content: "" },
		],
	},
	{
		name: "python3-minimal",
		version: "3.11.2-1+b1",
		section: "python",
		description: "Minimal subset of the Python language (version 3)",
		shortDesc: "minimal subset of Python language",
		installedSizeKb: 196,
		files: [{ path: "/usr/lib/python3-minimal/.keep", content: "" }],
	},
	{
		name: "nodejs",
		version: "18.19.0+dfsg-6",
		section: "javascript",
		description: "Evented I/O for V8 javascript - runtime executable",
		shortDesc: "Node.js JavaScript runtime",
		installedSizeKb: 15360,
		files: [
			{
				path: "/usr/bin/node",
				content: "#!/bin/sh\necho 'node v18.19.0 (virtual)'\n",
				mode: 0o755,
			},
			{
				path: "/usr/bin/nodejs",
				content: "#!/bin/sh\nexec builtin node \"$@\"\n",
				mode: 0o755,
			},
			{
				path: "/usr/share/doc/nodejs/README",
				content: "Node.js virtual package.\n",
			},
		],
	},
	{
		name: "npm",
		version: "9.2.0~ds1-2",
		section: "javascript",
		description: "package manager for Node.js",
		shortDesc: "package manager for Node.js",
		installedSizeKb: 9814,
		depends: ["nodejs"],
		files: [
			{
				path: "/usr/bin/npm",
				content: '#!/bin/sh\nexec builtin npm "$@"\n',
				mode: 0o755,
			},
			{
				path: "/usr/bin/npx",
				content: '#!/bin/sh\nexec builtin npx "$@"\n',
				mode: 0o755,
			},
		],
	},
	{
		name: "curl",
		version: "7.88.1-10+deb12u5",
		section: "web",
		description: "command line tool for transferring data with URL syntax",
		shortDesc: "command line tool for transferring data",
		installedSizeKb: 368,
		files: [
			{
				path: "/usr/bin/curl",
				content: '#!/bin/sh\nexec builtin curl "$@"\n',
				mode: 0o755,
			},
		],
	},
	{
		name: "wget",
		version: "1.21.3-1+b2",
		section: "web",
		description: "Retrieves files from the web",
		shortDesc: "retrieves files from the web",
		installedSizeKb: 952,
		files: [
			{
				path: "/usr/bin/wget",
				content: '#!/bin/sh\nexec builtin wget "$@"\n',
				mode: 0o755,
			},
		],
	},
	{
		name: "htop",
		version: "3.2.2-2",
		section: "utils",
		description: "interactive processes viewer",
		shortDesc: "interactive process viewer",
		installedSizeKb: 412,
		files: [
			{
				path: "/usr/bin/htop",
				content: "#!/bin/sh\nexec builtin htop\n",
				mode: 0o755,
			},
		],
	},
	{
		name: "openssh-client",
		version: "1:9.2p1-2+deb12u2",
		section: "net",
		description: "Secure Shell (SSH) client",
		shortDesc: "secure shell (SSH) client",
		installedSizeKb: 4540,
		files: [
			{
				path: "/usr/bin/ssh",
				content: "#!/bin/sh\necho 'ssh: virtual stub'\n",
				mode: 0o755,
			},
			{
				path: "/usr/bin/ssh-keygen",
				content: "#!/bin/sh\necho 'ssh-keygen: virtual stub'\n",
				mode: 0o755,
			},
			{
				path: "/etc/ssh/ssh_config",
				content: "Host *\n    StrictHostKeyChecking ask\n",
			},
		],
	},
	{
		name: "openssh-server",
		version: "1:9.2p1-2+deb12u2",
		section: "net",
		description: "Secure Shell server (sshd)",
		shortDesc: "secure shell server",
		installedSizeKb: 1732,
		depends: ["openssh-client"],
		files: [
			{
				path: "/usr/sbin/sshd",
				content: "#!/bin/sh\necho 'sshd: virtual — server already running'\n",
				mode: 0o755,
			},
			{
				path: "/etc/ssh/sshd_config",
				content: "Port 22\nPermitRootLogin yes\nPasswordAuthentication yes\n",
			},
		],
	},
	{
		name: "net-tools",
		version: "2.10-0.1",
		section: "net",
		description: "NET-3 networking toolkit (ifconfig, netstat, route)",
		shortDesc: "networking toolkit",
		installedSizeKb: 988,
		files: [
			{
				path: "/usr/bin/ifconfig",
				content:
					"#!/bin/sh\necho 'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500'\necho '        inet 10.0.0.2  netmask 255.255.255.0  broadcast 10.0.0.255'\necho '        ether 02:42:0a:00:00:02  txqueuelen 0  (Ethernet)'\n",
				mode: 0o755,
			},
			{
				path: "/usr/bin/netstat",
				content:
					"#!/bin/sh\necho 'Active Internet connections (only servers)'\necho 'Proto Recv-Q Send-Q Local Address Foreign Address State'\n",
				mode: 0o755,
			},
			{
				path: "/usr/bin/route",
				content:
					"#!/bin/sh\necho 'Kernel IP routing table'\necho 'Destination Gateway Genmask Flags Metric Ref Use Iface'\necho '0.0.0.0 10.0.0.1 0.0.0.0 UG 0 0 0 eth0'\n",
				mode: 0o755,
			},
		],
	},
	{
		name: "iputils-ping",
		version: "3:20221126-1",
		section: "net",
		description: "Tools to test the reachability of network hosts",
		shortDesc: "test reachability of network hosts",
		installedSizeKb: 164,
		files: [
			{
				path: "/usr/bin/ping",
				content: '#!/bin/sh\nexec builtin ping "$@"\n',
				mode: 0o755,
			},
		],
	},
	{
		name: "jq",
		version: "1.6-2.1",
		section: "utils",
		description: "Lightweight and flexible command-line JSON processor",
		shortDesc: "command-line JSON processor",
		installedSizeKb: 296,
		files: [
			{
				path: "/usr/bin/jq",
				content: "#!/bin/sh\necho 'jq: virtual stub — pipe JSON here'\n",
				mode: 0o755,
			},
		],
	},
	{
		name: "build-essential",
		version: "12.9",
		section: "devel",
		description: "Informational list of build-essential packages",
		shortDesc: "build-essential meta-package",
		installedSizeKb: 12,
		depends: ["gcc", "g++", "make"],
		files: [
			{
				path: "/usr/share/doc/build-essential/README",
				content: "Build-essential virtual meta-package.\n",
			},
		],
	},
	{
		name: "gcc",
		version: "4:12.2.0-3",
		section: "devel",
		description: "GNU C compiler",
		shortDesc: "GNU C compiler",
		installedSizeKb: 24448,
		files: [
			{
				path: "/usr/bin/gcc",
				content: "#!/bin/sh\necho 'gcc (Fortune GNU/Linux) 12.2.0 (virtual)'\n",
				mode: 0o755,
			},
			{
				path: "/usr/bin/gcc-12",
				content: "#!/bin/sh\necho 'gcc (Fortune GNU/Linux) 12.2.0 (virtual)'\n",
				mode: 0o755,
			},
		],
	},
	{
		name: "g++",
		version: "4:12.2.0-3",
		section: "devel",
		description: "GNU C++ compiler",
		shortDesc: "GNU C++ compiler",
		installedSizeKb: 1024,
		depends: ["gcc"],
		files: [
			{
				path: "/usr/bin/g++",
				content: "#!/bin/sh\necho 'g++ (Fortune GNU/Linux) 12.2.0 (virtual)'\n",
				mode: 0o755,
			},
		],
	},
	{
		name: "make",
		version: "4.3-4.1",
		section: "devel",
		description: "Utility for directing compilation",
		shortDesc: "build utility",
		installedSizeKb: 504,
		files: [
			{
				path: "/usr/bin/make",
				content:
					"#!/bin/sh\necho 'make: *** No targets specified and no makefile found. Stop.'\nexit 2\n",
				mode: 0o755,
			},
		],
	},
	{
		name: "less",
		version: "590-2",
		section: "text",
		description: "Pager program similar to more",
		shortDesc: "pager program",
		installedSizeKb: 328,
		files: [
			{ path: "/usr/bin/less", content: '#!/bin/sh\ncat "$@"\n', mode: 0o755 },
		],
	},
	{
		name: "unzip",
		version: "6.0-28",
		section: "utils",
		description: "De-archiver for .zip files",
		shortDesc: "de-archiver for .zip files",
		installedSizeKb: 464,
		files: [
			{
				path: "/usr/bin/unzip",
				content: "#!/bin/sh\necho 'unzip: virtual stub'\n",
				mode: 0o755,
			},
		],
	},
	{
		name: "rsync",
		version: "3.2.7-1",
		section: "net",
		description: "Fast, versatile, remote (and local) file-copying tool",
		shortDesc: "fast remote file copy program",
		installedSizeKb: 716,
		files: [
			{
				path: "/usr/bin/rsync",
				content: "#!/bin/sh\necho 'rsync: virtual stub'\n",
				mode: 0o755,
			},
		],
	},
	{
		name: "tmux",
		version: "3.3a-3",
		section: "utils",
		description: "Terminal multiplexer",
		shortDesc: "terminal multiplexer",
		installedSizeKb: 812,
		files: [
			{
				path: "/usr/bin/tmux",
				content:
					"#!/bin/sh\necho 'tmux: terminal multiplexer (virtual stub)'\n",
				mode: 0o755,
			},
		],
	},
	{
		name: "tree",
		version: "2.1.0-1",
		section: "utils",
		description: "Displays an indented directory tree, in color",
		shortDesc: "list files in tree format",
		installedSizeKb: 108,
		files: [
			{
				path: "/usr/bin/tree",
				content: '#!/bin/sh\nexec builtin tree "$@"\n',
				mode: 0o755,
			},
		],
	},
	{
		name: "ca-certificates",
		version: "20230311",
		section: "misc",
		description: "Common CA certificates",
		shortDesc: "common CA certificates",
		installedSizeKb: 388,
		files: [
			{ path: "/etc/ssl/certs/.keep", content: "" },
			{ path: "/etc/ssl/private/.keep", content: "" },
			{ path: "/usr/share/ca-certificates/.keep", content: "" },
		],
		onInstall: (vfs) => {
			if (!vfs.exists("/etc/ssl")) vfs.mkdir("/etc/ssl", 0o755);
			if (!vfs.exists("/etc/ssl/certs")) vfs.mkdir("/etc/ssl/certs", 0o755);
		},
	},
	{
		name: "locales",
		version: "2.36-9+deb12u3",
		section: "localization",
		description: "GNU C Library: National Language (locale) data",
		shortDesc: "locale data",
		installedSizeKb: 16484,
		files: [
			{ path: "/etc/locale.gen", content: "en_US.UTF-8 UTF-8\n" },
			{
				path: "/etc/default/locale",
				content: "LANG=en_US.UTF-8\nLANGUAGE=en_US:en\n",
			},
		],
	},
	{
		name: "sudo",
		version: "1.9.13p3-1+deb12u1",
		section: "admin",
		description: "Provide limited super user privileges to specific users",
		shortDesc: "super user privilege execution",
		installedSizeKb: 2304,
		files: [
			{
				path: "/usr/bin/sudo",
				content: '#!/bin/sh\nexec builtin sudo "$@"\n',
				mode: 0o755,
			},
			{
				path: "/etc/sudoers",
				content: "root ALL=(ALL:ALL) ALL\n%sudo ALL=(ALL:ALL) ALL\n",
			},
		],
	},
	{
		name: "systemd",
		version: "252.22-1~deb12u1",
		section: "admin",
		description: "System and service manager",
		shortDesc: "system and service manager",
		installedSizeKb: 26624,
		files: [
			{
				path: "/usr/bin/systemctl",
				content:
					"#!/bin/sh\necho 'systemd is not running in this virtual container.'\nexit 1\n",
				mode: 0o755,
			},
			{
				path: "/usr/bin/journalctl",
				content: "#!/bin/sh\necho 'journalctl: virtual stub'\n",
				mode: 0o755,
			},
		],
	},{
		name: "gzip",
		version: "1.12-2",
		section: "utils",
		description: "GNU compression utility",
		shortDesc: "compression utility",
		installedSizeKb: 128,
		files: [
			{
				path: "/usr/bin/gzip",
				content: "#!/bin/sh\necho 'gzip: virtual stub'\n",
				mode: 0o755,
			},
		]
	}, {
		name: "neofetch",
		version: "7.1.0-1",
		section: "utils",
		description: "A command-line system information tool written in bash 3.2+",
		shortDesc: "command-line system information tool",
		installedSizeKb: 256,
		files: [
			{
				path: "/usr/bin/neofetch",
				content: "#!/bin/sh\necho 'neofetch: virtual stub'\n",
				mode: 0o755,
			},
		],
	}
];

// O(1) name lookup — built once at module load, avoids O(n) linear scan per command
const _REGISTRY_MAP = new Map<string, PackageDefinition>(
	PACKAGE_REGISTRY.map((p) => [p.name.toLowerCase(), p]),
);
// Pre-sorted for listAvailable() — avoids O(n log n) sort on every apt list/search
const _REGISTRY_SORTED = PACKAGE_REGISTRY.slice().sort((a, b) => a.name.localeCompare(b.name));

/**
 * Pure-TypeScript APT/dpkg package manager backed by a built-in registry.
 *
 * Accessed via `shell.packageManager` — not constructed directly.
 *
 * `install()` resolves dependencies recursively, writes declared files to the
 * VFS, runs `onInstall` hooks, and persists state to `/var/lib/dpkg/status`.
 * `remove()` reverses the process. All state survives VFS snapshot round-trips.
 *
 * @example
 * ```ts
 * const pm = shell.packageManager;
 * pm.install(["vim", "git"]);
 * console.log(pm.isInstalled("vim")); // true
 * console.log(pm.installedCount());   // 2
 * ```
 */
export class VirtualPackageManager {
	private readonly installed = new Map<string, InstalledPackage>();
	private readonly registryPath = "/var/lib/dpkg/status";
	private readonly logPath = "/var/log/dpkg.log";
	private readonly aptLogPath = "/var/log/apt/history.log";
	private _loaded = false;

	/**
	 * @param vfs   Backing virtual filesystem for file I/O and dpkg status persistence.
	 * @param users User manager reference passed to `onInstall` hooks.
	 */
	constructor(
		private readonly vfs: VirtualFileSystem,
		private readonly users: VirtualUserManager,
	) {}

	/** Ensure dpkg/status is parsed. Called lazily on first package operation. */
	private _ensureLoaded(): void {
		if (this._loaded) return;
		this._loaded = true;
		this._parseStatus();
	}

	/**
	 * Loads installed package state from `/var/lib/dpkg/status` in the VFS.
	 * Safe to call again to reload state after a snapshot restore.
	 */
	public load(): void {
		this._loaded = false;
		this._ensureLoaded();
	}

	private _parseStatus(): void {
		if (!this.vfs.exists(this.registryPath)) return;
		const status = this.vfs.readFile(this.registryPath);
		if (!status.trim()) return;

		const blocks = status.split(/\n\n+/);
		for (const block of blocks) {
			if (!block.trim()) continue;
			const fields = this.parseFields(block);
			const name = fields.Package;
			if (!name) continue;
			this.installed.set(name, {
				name,
				version: fields.Version ?? "unknown",
				architecture: fields.Architecture ?? "amd64",
				maintainer: fields.Maintainer ?? "Fortune Maintainers",
				description: fields.Description ?? "",
				section: fields.Section ?? "misc",
				installedSizeKb: Number(fields["Installed-Size"] ?? 0),
				installedAt: fields["X-Installed-At"] ?? new Date().toISOString(),
				files: (fields["X-Files"] ?? "").split("|").filter(Boolean),
			});
		}
	}

	/** Persist installed state to /var/lib/dpkg/status. */
	private persist(): void {
		const blocks: string[] = [];
		for (const pkg of this.installed.values()) {
			blocks.push(
				[
					`Package: ${pkg.name}`,
					`Status: install ok installed`,
					`Priority: optional`,
					`Section: ${pkg.section}`,
					`Installed-Size: ${pkg.installedSizeKb}`,
					`Maintainer: ${pkg.maintainer}`,
					`Architecture: ${pkg.architecture}`,
					`Version: ${pkg.version}`,
					`Description: ${pkg.description}`,
					`X-Installed-At: ${pkg.installedAt}`,
					`X-Files: ${pkg.files.join("|")}`,
				].join("\n"),
			);
		}
		this.vfs.writeFile(this.registryPath, `${blocks.join("\n\n")}\n`);
	}

	private parseFields(block: string): Record<string, string> {
		const result: Record<string, string> = {};
		for (const line of block.split("\n")) {
			const idx = line.indexOf(": ");
			if (idx === -1) continue;
			result[line.slice(0, idx)] = line.slice(idx + 2);
		}
		return result;
	}

	private log(msg: string): void {
		const ts = new Date().toISOString().replace("T", " ").slice(0, 19);
		const line = `${ts} ${msg}\n`;
		const existing = this.vfs.exists(this.logPath)
			? this.vfs.readFile(this.logPath)
			: "";
		this.vfs.writeFile(this.logPath, existing + line);
	}

	private aptLog(action: string, pkgs: string[]): void {
		const ts = new Date().toISOString();
		const existing = this.vfs.exists(this.aptLogPath)
			? this.vfs.readFile(this.aptLogPath)
			: "";
		const entry = [
			`Start-Date: ${ts}`,
			`Commandline: apt-get ${action} ${pkgs.join(" ")}`,
			`${action === "install" ? "Install" : "Remove"}: ${pkgs.join(", ")}`,
			`End-Date: ${ts}`,
			"",
		].join("\n");
		this.vfs.writeFile(this.aptLogPath, existing + entry);
	}

	/**
	 * Looks up a package definition in the built-in registry by name.
	 *
	 * @param name Package name (case-insensitive).
	 * @returns The matching `PackageDefinition`, or `undefined` if not found.
	 */
	public findInRegistry(name: string): PackageDefinition | undefined {
		return _REGISTRY_MAP.get(name.toLowerCase());
	}

	/**
	 * Returns all packages in the built-in registry, sorted alphabetically.
	 *
	 * @returns Array of `PackageDefinition` entries.
	 */
	public listAvailable(): PackageDefinition[] {
		return _REGISTRY_SORTED;
	}

	/**
	 * Returns all currently installed packages, sorted alphabetically.
	 *
	 * @returns Array of `InstalledPackage` records.
	 */
	public listInstalled(): InstalledPackage[] {
		this._ensureLoaded();
		return [...this.installed.values()].sort((a, b) =>
			a.name.localeCompare(b.name),
		);
	}

	/**
	 * Returns `true` when the given package is currently installed.
	 *
	 * @param name Package name (case-insensitive).
	 */
	public isInstalled(name: string): boolean {
		this._ensureLoaded();
		return this.installed.has(name.toLowerCase());
	}

	/**
	 * Returns the total number of installed packages.
	 *
	 * Used by `neofetch` to populate the `Packages:` field.
	 */
	public installedCount(): number {
		this._ensureLoaded();
		return this.installed.size;
	}

	/**
	 * Installs one or more packages from the registry.
	 *
	 * Dependencies listed in `PackageDefinition.depends` are resolved and
	 * installed automatically. Already-installed packages are skipped. Files
	 * declared in `PackageDefinition.files` are written to the VFS and
	 * `onInstall` hooks are called in dependency order.
	 *
	 * @param names   Package names to install.
	 * @param opts    Installation options.
	 * @param opts.quiet  Suppress progress output lines when `true`.
	 * @returns Terminal-style `output` string and an APT-compatible `exitCode`
	 *          (`0` on success, `100` when a package is not found).
	 */
	public install(
		names: string[],
		opts: { quiet?: boolean } = {},
	): { output: string; exitCode: number } {
		this._ensureLoaded();
		const lines: string[] = [];
		const toInstall: PackageDefinition[] = [];
		const notFound: string[] = [];

		// Resolve + deduplicate including deps
		const resolve = (name: string, seen = new Set<string>()): void => {
			if (seen.has(name)) return;
			seen.add(name);
			if (this.isInstalled(name)) return;
			const def = this.findInRegistry(name);
			if (!def) {
				notFound.push(name);
				return;
			}
			for (const dep of def.depends ?? []) resolve(dep, seen);
			if (!toInstall.find((p) => p.name === def.name)) {
				toInstall.push(def);
			}
		};

		for (const n of names) resolve(n);

		if (notFound.length > 0) {
			return {
				output: `E: Unable to locate package ${notFound.join(", ")}`,
				exitCode: 100,
			};
		}

		if (toInstall.length === 0) {
			return {
				output: names
					.map((n) => `${n} is already the newest version.`)
					.join("\n"),
				exitCode: 0,
			};
		}

		const totalKb = toInstall.reduce(
			(acc, p) => acc + (p.installedSizeKb ?? 0),
			0,
		);

		if (!opts.quiet) {
			lines.push(
				`Reading package lists... Done`,
				`Building dependency tree... Done`,
				`Reading state information... Done`,
				`The following NEW packages will be installed:`,
				`  ${toInstall.map((p) => p.name).join(" ")}`,
				`0 upgraded, ${toInstall.length} newly installed, 0 to remove and 0 not upgraded.`,
				`Need to get 0 B/${totalKb} kB of archives.`,
				`After this operation, ${totalKb} kB of additional disk space will be used.`,
				``,
			);
		}

		for (const def of toInstall) {
			if (!opts.quiet) {
				lines.push(`Selecting previously unselected package ${def.name}.`);
				lines.push(
					`(Reading database ... 12345 files and directories currently installed.)`,
				);
				lines.push(
					`Preparing to unpack .../archives/${def.name}_${def.version}_amd64.deb ...`,
				);
				lines.push(`Unpacking ${def.name} (${def.version}) ...`);
			}

			// Write files
			for (const f of def.files ?? []) {
				const dir = f.path.slice(0, f.path.lastIndexOf("/"));
				if (dir && !this.vfs.exists(dir)) this.vfs.mkdir(dir, 0o755);
				this.vfs.writeFile(f.path, f.content, { mode: f.mode ?? 0o644 });
			}

			// Run install hook
			def.onInstall?.(this.vfs, this.users);

			if (!opts.quiet) {
				lines.push(`Setting up ${def.name} (${def.version}) ...`);
			}

			const now = new Date().toISOString();
			this.installed.set(def.name, {
				name: def.name,
				version: def.version,
				architecture: def.architecture ?? "amd64",
				maintainer: def.maintainer ?? "Fortune Maintainers <pkg@fortune.local>",
				description: def.description,
				section: def.section ?? "misc",
				installedSizeKb: def.installedSizeKb ?? 0,
				installedAt: now,
				files: (def.files ?? []).map((f) => f.path),
			});

			this.log(`install ${def.name} ${def.version}`);
		}

		this.aptLog(
			"install",
			toInstall.map((p) => p.name),
		);
		this.persist();

		if (!opts.quiet) {
			lines.push(`Processing triggers for man-db (2.11.2-2) ...`);
		}

		return { output: lines.join("\n"), exitCode: 0 };
	}

	/**
	 * Removes one or more installed packages.
	 *
	 * Package files are deleted from the VFS. Config files (paths under
	 * `/etc/` or ending in `.conf`) are preserved unless `opts.purge` is set.
	 * The `onRemove` hook is called for each package.
	 *
	 * @param names       Package names to remove.
	 * @param opts        Removal options.
	 * @param opts.purge  Also delete configuration files when `true`.
	 * @param opts.quiet  Suppress progress output lines when `true`.
	 * @returns Terminal-style `output` string and exit code (`0` on success).
	 */
	public remove(
		names: string[],
		opts: { purge?: boolean; quiet?: boolean } = {},
	): { output: string; exitCode: number } {
		this._ensureLoaded();
		const lines: string[] = [];
		const toRemove: InstalledPackage[] = [];

		for (const name of names) {
			const pkg = this.installed.get(name.toLowerCase());
			if (!pkg) {
				lines.push(`Package '${name}' is not installed, so not removed`);
			} else {
				toRemove.push(pkg);
			}
		}

		if (toRemove.length === 0) {
			return { output: lines.join("\n") || "Nothing to remove.", exitCode: 0 };
		}

		if (!opts.quiet) {
			lines.push(
				`Reading package lists... Done`,
				`Building dependency tree... Done`,
				`The following packages will be REMOVED:`,
				`  ${toRemove.map((p) => p.name).join(" ")}`,
				`0 upgraded, 0 newly installed, ${toRemove.length} to remove and 0 not upgraded.`,
			);
		}

		for (const pkg of toRemove) {
			if (!opts.quiet) lines.push(`Removing ${pkg.name} (${pkg.version}) ...`);

			// Remove files (if purge, include config files)
			for (const filePath of pkg.files) {
				if (
					!opts.purge &&
					(filePath.startsWith("/etc/") || filePath.endsWith(".conf"))
				) {
					continue; // keep config unless --purge
				}
				try {
					if (this.vfs.exists(filePath)) this.vfs.remove(filePath);
				} catch {}
			}

			// Run remove hook
			const def = this.findInRegistry(pkg.name);
			def?.onRemove?.(this.vfs);

			this.installed.delete(pkg.name);
			this.log(`remove ${pkg.name} ${pkg.version}`);
		}

		this.aptLog(
			"remove",
			toRemove.map((p) => p.name),
		);
		this.persist();

		return { output: lines.join("\n"), exitCode: 0 };
	}

	/**
	 * Searches the registry for packages whose name or description contains
	 * the given term (case-insensitive). Equivalent to `apt-cache search`.
	 *
	 * @param term Search string.
	 * @returns Matching `PackageDefinition` entries sorted alphabetically.
	 */
	public search(term: string): PackageDefinition[] {
		const t = term.toLowerCase();
		return PACKAGE_REGISTRY.filter(
			(p) =>
				p.name.includes(t) ||
				p.description.toLowerCase().includes(t) ||
				(p.shortDesc ?? "").toLowerCase().includes(t),
		).sort((a, b) => a.name.localeCompare(b.name));
	}

	/**
	 * Returns a dpkg-style metadata block for a package, including its
	 * install status. Equivalent to `apt-cache show` / `dpkg -s`.
	 *
	 * @param name Package name.
	 * @returns Multi-line metadata string, or `null` if not in the registry.
	 */
	public show(name: string): string | null {
		this._ensureLoaded();
		const def = this.findInRegistry(name);
		if (!def) return null;
		const inst = this.installed.get(name);
		return [
			`Package: ${def.name}`,
			`Version: ${def.version}`,
			`Architecture: ${def.architecture ?? "amd64"}`,
			`Maintainer: ${def.maintainer ?? "Fortune Maintainers <pkg@fortune.local>"}`,
			`Installed-Size: ${def.installedSizeKb ?? 0}`,
			`Depends: ${(def.depends ?? []).join(", ") || "(none)"}`,
			`Section: ${def.section ?? "misc"}`,
			`Priority: optional`,
			`Description: ${def.description}`,
			`Status: ${inst ? "install ok installed" : "install ok not-installed"}`,
		].join("\n");
	}
}