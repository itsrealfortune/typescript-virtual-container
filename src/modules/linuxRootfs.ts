/** biome-ignore-all lint/style/useNamingConvention: ENV VAR KEYS + system names */
/**
 * linuxRootfs.ts
 *
 * Bootstraps a realistic Linux directory hierarchy in the VFS.
 * Called once during VirtualShell initialization. Idempotent — skips
 * paths that already exist so FS-mode snapshots survive restarts.
 *
 * Public API:
 *  - bootstrapLinuxRootfs()  one-shot boot (VirtualShell calls this)
 *  - refreshProc()           refresh /proc/* (call on session changes)
 *  - syncEtcPasswd()         sync /etc/passwd|group|shadow from UserManager
 *  - createLinuxRootfsEngine() returns engine with .boot() + .tick() for
 *                            runtimes that want a live refresh loop
 */

import * as os from "node:os";
import type VirtualFileSystem from "../VirtualFileSystem";
import type { ShellProperties } from "../VirtualShell";
import type { VirtualActiveSession, VirtualUserManager } from "../VirtualUserManager";

// ─── helpers ────────────────────────────────────────────────────────────────

function ensureDir(vfs: VirtualFileSystem, path: string, mode = 0o755): void {
	if (!vfs.exists(path)) vfs.mkdir(path, mode);
}

function ensureFile(
	vfs: VirtualFileSystem,
	path: string,
	content: string,
	mode = 0o644,
): void {
	if (!vfs.exists(path)) vfs.writeFile(path, content, { mode });
}

function write(vfs: VirtualFileSystem, path: string, content: string): void {
	vfs.writeFile(path, content);
}

/** FNV-1a 32-bit — deterministic seed from any string */
function fnv1a(str: string): number {
	let h = 2166136261;
	for (let i = 0; i < str.length; i++) {
		h ^= str.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}

// ─── /etc ────────────────────────────────────────────────────────────────────

function bootstrapEtc(
	vfs: VirtualFileSystem,
	hostname: string,
	props: ShellProperties,
): void {
	ensureDir(vfs, "/etc");

	// os-release — authoritative distro identity used by neofetch, lsb_release
	ensureFile(
		vfs,
		"/etc/os-release",
		`${[
			`NAME="Fortune GNU/Linux"`,
			`PRETTY_NAME="${props.os}"`,
			`ID=fortune`,
			`ID_LIKE=debian`,
			`HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"`,
			`VERSION_CODENAME=aurora`,
			`VERSION_ID="1.0"`,
		].join("\n")}\n`,
	);

	ensureFile(vfs, "/etc/debian_version", "12.0\n");
	ensureFile(vfs, "/etc/hostname", `${hostname}\n`);
	ensureFile(vfs, "/etc/shells", "/bin/sh\n/bin/bash\n/usr/bin/bash\n");
	ensureFile(
		vfs,
		"/etc/profile",
		`${[
			"export PATH=/usr/local/bin:/usr/bin:/bin",
			"export PS1='\\u@\\h:\\w\\$ '",
		].join("\n")}\n`,
	);

	ensureFile(vfs, "/etc/issue", "Fortune GNU/Linux 1.0 \\n \\l\n");
	ensureFile(
		vfs,
		"/etc/motd",
		["", `Welcome to ${props.os}`, `Kernel: ${props.kernel}`, ""].join("\n"),
	);

	// APT sources
	ensureDir(vfs, "/etc/apt");
	ensureDir(vfs, "/etc/apt/sources.list.d");
	ensureFile(
		vfs,
		"/etc/apt/sources.list",
		`${[
			"# Fortune GNU/Linux package sources",
			"deb [virtual] fortune://packages.fortune.local aurora main contrib",
			"deb [virtual] fortune://security.fortune.local aurora-security main",
		].join("\n")}\n`,
	);

	// network
	ensureDir(vfs, "/etc/network");
	ensureFile(
		vfs,
		"/etc/network/interfaces",
		`${[
			"auto lo",
			"iface lo inet loopback",
			"",
			"auto eth0",
			"iface eth0 inet dhcp",
		].join("\n")}\n`,
	);

	ensureFile(vfs, "/etc/resolv.conf", "nameserver 1.1.1.1\nnameserver 8.8.8.8\n");

	ensureFile(
		vfs,
		"/etc/hosts",
		`${[
			"127.0.0.1   localhost",
			`127.0.1.1   ${hostname}`,
			"::1         localhost ip6-localhost ip6-loopback",
		].join("\n")}\n`,
	);

	ensureDir(vfs, "/etc/cron.d");
	ensureDir(vfs, "/etc/init.d");
	ensureDir(vfs, "/etc/systemd");
	ensureDir(vfs, "/etc/systemd/system");
}

// ─── /etc/passwd + /etc/group + /etc/shadow ─────────────────────────────────

/**
 * Sync `/etc/passwd`, `/etc/group`, and `/etc/shadow` from the
 * VirtualUserManager's current user list into the VFS.
 */
export function syncEtcPasswd(
	vfs: VirtualFileSystem,
	users: VirtualUserManager,
): void {
	const userList = users.listUsers();

	const passwdLines = [
		"root:x:0:0:root:/root:/bin/bash",
		"daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin",
		"www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin",
		"nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin",
	];

	let uid = 1000;
	for (const u of userList) {
		if (u === "root") continue;
		passwdLines.push(`${u}:x:${uid}:${uid}::/home/${u}:/bin/bash`);
		uid++;
	}

	vfs.writeFile("/etc/passwd", `${passwdLines.join("\n")}\n`);

	const groupLines = [
		"root:x:0:",
		"daemon:x:1:",
		`sudo:x:27:${userList.filter((u) => users.isSudoer(u)).join(",")}`,
		`users:x:100:${userList.filter((u) => u !== "root").join(",")}`,
		"nogroup:x:65534:",
	];
	vfs.writeFile("/etc/group", `${groupLines.join("\n")}\n`);

	// shadow — fake hashes, never real credentials
	const shadowLines = [
		"root:*:19000:0:99999:7:::",
		"daemon:*:19000:0:99999:7:::",
	];
	for (const u of userList) {
		if (u === "root") continue;
		shadowLines.push(`${u}:!:19000:0:99999:7:::`);
	}
	vfs.writeFile("/etc/shadow", `${shadowLines.join("\n")}\n`, { mode: 0o640 });
}

// ─── /proc helpers ───────────────────────────────────────────────────────────

/** Derive a stable virtual PID from a tty string e.g. "pts/0" → 1000 */
function ttyToPid(tty: string): number {
	const match = tty.match(/(\d+)$/);
	return 1000 + (match?.[1] ? parseInt(match[1], 10) : 0);
}

/** Write /proc/<pid>/ subtree for a single virtual process */
function writeProcPid(
	vfs: VirtualFileSystem,
	pid: number,
	username: string,
	_tty: string,
	cmdline: string,
	startedAt: string,
	env: Record<string, string>,
): void {
	const dir = `/proc/${pid}`;
	ensureDir(vfs, dir);
	ensureDir(vfs, `${dir}/fd`);
	ensureDir(vfs, `${dir}/fdinfo`);

	const uptimeSec = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
	const comm = cmdline.split(/\s+/)[0] ?? "bash";

	write(vfs, `${dir}/cmdline`, `${cmdline.replace(/\s+/g, "\0")}\0`);
	write(vfs, `${dir}/comm`, comm);
	write(
		vfs,
		`${dir}/status`,
		`${[
			`Name:   ${comm}`,
			`State:  S (sleeping)`,
			`Pid:    ${pid}`,
			`PPid:   1`,
			`Uid:    0\t0\t0\t0`,
			`Gid:    0\t0\t0\t0`,
			`VmRSS:  4096 kB`,
			`VmSize: 16384 kB`,
			`Threads: 1`,
		].join("\n")}\n`,
	);
	write(
		vfs,
		`${dir}/stat`,
		`${pid} (${comm}) S 1 ${pid} ${pid} 0 -1 4194304 0 0 0 0 ${uptimeSec} 0 0 0 20 0 1 0 0 16384 4096 0\n`,
	);
	write(
		vfs,
		`${dir}/environ`,
		`${Object.entries(env).map(([k, v]) => `${k}=${v}`).join("\0")}\0`,
	);
	write(vfs, `${dir}/cwd`, `/home/${username}\0`);
	write(vfs, `${dir}/exe`, "/bin/bash\0");

	// Standard fd stubs (stdin/stdout/stderr)
	for (const fd of ["0", "1", "2"]) {
		ensureFile(vfs, `${dir}/fd/${fd}`, "");
	}
}

// ─── /proc boot log ──────────────────────────────────────────────────────────

function bootProcLog(vfs: VirtualFileSystem, props: ShellProperties): void {
	ensureDir(vfs, "/proc/boot");
	ensureFile(
		vfs,
		"/proc/boot/log",
		`${[
			"[    0.000000] Linux virtual kernel booting...",
			"[    0.000120] init memory subsystem",
			"[    0.000240] mount /proc /sys /dev",
			"[    0.000420] start init",
			"[    0.000680] system ready",
		].join("\n")}\n`,
	);
	ensureFile(vfs, "/proc/boot/version", `Linux ${props.kernel} (virtual)\n`);
}

// ─── /proc refresh ───────────────────────────────────────────────────────────

/**
 * Populate and refresh `/proc` virtual entries based on host stats and
 * provided active sessions. Rewrites uptime, meminfo, cpuinfo, loadavg,
 * per-pid entries, and /proc/self.
 *
 * Safe to call repeatedly — acts as a live kernel state snapshot.
 */
export function refreshProc(
	vfs: VirtualFileSystem,
	props: ShellProperties,
	hostname: string,
	shellStartTime: number,
	sessions: VirtualActiveSession[] = [],
): void {
	ensureDir(vfs, "/proc");

	const uptimeSec = Math.floor((Date.now() - shellStartTime) / 1000);
	const idleSec = Math.floor(uptimeSec * 0.9);
	write(vfs, "/proc/uptime", `${uptimeSec}.00 ${idleSec}.00\n`);

	// meminfo — real host values, Linux-compatible format
	const totalMemKb = Math.floor(os.totalmem() / 1024);
	const freeMemKb = Math.floor(os.freemem() / 1024);
	const availMemKb = Math.floor(freeMemKb * 0.95);
	write(
		vfs,
		"/proc/meminfo",
		`${[
			`MemTotal:       ${String(totalMemKb).padStart(10)} kB`,
			`MemFree:        ${String(freeMemKb).padStart(10)} kB`,
			`MemAvailable:   ${String(availMemKb).padStart(10)} kB`,
			`Buffers:        ${String(Math.floor(totalMemKb * 0.02)).padStart(10)} kB`,
			`Cached:         ${String(Math.floor(totalMemKb * 0.15)).padStart(10)} kB`,
			`SwapTotal:      ${String(Math.floor(totalMemKb * 0.5)).padStart(10)} kB`,
			`SwapFree:       ${String(Math.floor(totalMemKb * 0.5)).padStart(10)} kB`,
		].join("\n")}\n`,
	);

	// cpuinfo — real host CPU passthrough
	const cpus = os.cpus();
	const cpuLines: string[] = [];
	for (let i = 0; i < cpus.length; i++) {
		const c = cpus[i];
		if (!c) continue;
		cpuLines.push(
			`processor\t: ${i}`,
			`model name\t: ${c.model}`,
			`cpu MHz\t\t: ${c.speed.toFixed(3)}`,
			`cache size\t: 8192 KB`,
			"",
		);
	}
	write(vfs, "/proc/cpuinfo", `${cpuLines.join("\n")}\n`);

	write(
		vfs,
		"/proc/version",
		`Linux version ${props.kernel} (fortune@build) (gcc version 12.2.0) #1 SMP\n`,
	);
	write(vfs, "/proc/hostname", `${hostname}\n`);

	// loadavg — slightly random but bounded
	const load = (Math.random() * 0.5).toFixed(2);
	const numProcs = 1 + sessions.length;
	write(vfs, "/proc/loadavg", `${load} ${load} ${load} ${numProcs}/${numProcs} 1\n`);

	// /proc/net stubs
	ensureDir(vfs, "/proc/net");
	ensureFile(
		vfs,
		"/proc/net/dev",
		`${[
			"Inter-|   Receive                                                |  Transmit",
			" face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed",
			"    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0",
			"  eth0:  131072    1024    0    0    0     0          0         0    65536     512    0    0    0     0       0          0",
		].join("\n")}\n`,
	);

	// init process (PID 1)
	writeProcPid(vfs, 1, "root", "pts/0", "/sbin/init", new Date(shellStartTime).toISOString(), {});

	// per-session processes
	for (const session of sessions) {
		const pid = ttyToPid(session.tty);
		writeProcPid(vfs, pid, session.username, session.tty, "bash", session.startedAt, {
			USER: session.username,
			HOME: `/home/${session.username}`,
			TERM: "xterm-256color",
			SHELL: "/bin/bash",
		});
	}

	// /proc/self — mirror of most recent session, or init
	const selfPid = sessions.length > 0 ? ttyToPid(sessions[sessions.length - 1]!.tty) : 1;

	if (vfs.exists("/proc/self")) {
		try { vfs.remove("/proc/self"); } catch { /* ignore */ }
	}

	const selfSrc = `/proc/${selfPid}`;
	ensureDir(vfs, "/proc/self");
	ensureDir(vfs, "/proc/self/fd");

	if (vfs.exists(selfSrc)) {
		for (const entry of vfs.list(selfSrc)) {
			const srcPath = `${selfSrc}/${entry}`;
			const dstPath = `/proc/self/${entry}`;
			try {
				const st = vfs.stat(srcPath);
				if (st.type === "file") write(vfs, dstPath, vfs.readFile(srcPath));
			} catch { /* skip unreadable entries */ }
		}
	} else {
		// Minimal fallback
		write(vfs, "/proc/self/cmdline", "bash\0");
		write(vfs, "/proc/self/comm", "bash");
		write(vfs, "/proc/self/status", "Name:\tbash\nState:\tS (sleeping)\nPid:\t1\nPPid:\t0\n");
		write(vfs, "/proc/self/environ", "");
		write(vfs, "/proc/self/cwd", "/root\0");
		write(vfs, "/proc/self/exe", "/bin/bash\0");
	}
}

// ─── /sys ─────────────────────────────────────────────────────────────────────

function bootstrapSys(vfs: VirtualFileSystem, hostname: string, props: ShellProperties): void {
	ensureDir(vfs, "/sys");
	ensureDir(vfs, "/sys/devices");
	ensureDir(vfs, "/sys/devices/virtual");
	ensureDir(vfs, "/sys/devices/virtual/dmi");
	ensureDir(vfs, "/sys/devices/virtual/dmi/id");

	const seed = fnv1a(hostname);
	const product = `VirtualNode-${(seed % 10000).toString().padStart(4, "0")}`;

	// Full DMI table — deterministic, seeded from hostname
	const dmi: Record<string, string> = {
		bios_vendor:      "Virtual BIOS",
		bios_version:     "1.0",
		bios_date:        "01/01/2025",
		sys_vendor:       "Fortune Systems",
		product_name:     product,
		product_family:   "VirtualContainer",
		product_version:  "v1",
		product_uuid:     `${seed.toString(16).padStart(8, "0")}-0000-0000-0000-000000000000`,
		product_serial:   `SN-${seed}`,
		chassis_type:     "3",
		chassis_vendor:   "Virtual",
		chassis_version:  "v1",
		board_name:       "fortune-board",
		modalias:         `dmi:bvnVirtual:bvr1.0:svnFortune:pn${product}`,
	};

	for (const [k, v] of Object.entries(dmi)) {
		ensureFile(vfs, `/sys/devices/virtual/dmi/id/${k}`, `${v}\n`);
	}

	ensureDir(vfs, "/sys/class");
	ensureDir(vfs, "/sys/class/net");
	ensureDir(vfs, "/sys/kernel");

	ensureFile(vfs, "/sys/kernel/hostname", `${hostname}\n`);
	ensureFile(vfs, "/sys/kernel/osrelease", `${props.kernel}\n`);
	ensureFile(vfs, "/sys/kernel/ostype", "Linux\n");
}

// ─── /dev ─────────────────────────────────────────────────────────────────────

function bootstrapDev(vfs: VirtualFileSystem): void {
	ensureDir(vfs, "/dev");
	ensureFile(vfs, "/dev/null", "", 0o666);
	ensureFile(vfs, "/dev/zero", "", 0o666);
	ensureFile(vfs, "/dev/random", "", 0o444);
	ensureFile(vfs, "/dev/urandom", "", 0o444);
	ensureDir(vfs, "/dev/pts");
	ensureDir(vfs, "/dev/shm");
}

// ─── /usr ─────────────────────────────────────────────────────────────────────

function bootstrapUsr(vfs: VirtualFileSystem): void {
	ensureDir(vfs, "/usr");
	ensureDir(vfs, "/usr/bin");
	ensureDir(vfs, "/usr/sbin");
	ensureDir(vfs, "/usr/local");
	ensureDir(vfs, "/usr/local/bin");
	ensureDir(vfs, "/usr/local/lib");
	ensureDir(vfs, "/usr/local/share");
	ensureDir(vfs, "/usr/share");
	ensureDir(vfs, "/usr/share/doc");
	ensureDir(vfs, "/usr/share/man");
	ensureDir(vfs, "/usr/share/man/man1");
	ensureDir(vfs, "/usr/lib");

	// Stubs so `which` can resolve built-in commands
	const builtins = [
		"sh", "bash", "ls", "cat", "echo", "grep", "find", "sort",
		"head", "tail", "cut", "tr", "sed", "awk", "wc", "tee",
		"tar", "gzip", "gunzip", "touch", "mkdir", "rm", "mv", "cp",
		"chmod", "ln", "pwd", "env", "date", "sleep", "id", "whoami",
		"hostname", "uname", "ps", "kill", "df", "du", "curl", "wget",
		"nano", "diff", "uniq", "xargs", "base64",
	];

	for (const bin of builtins) {
		ensureFile(vfs, `/usr/bin/${bin}`, `#!/bin/sh\nexec builtin ${bin} "$@"\n`, 0o755);
	}

	ensureFile(vfs, "/usr/bin/lsb_release", '#!/bin/sh\nexec lsb_release "$@"\n', 0o755);
}

// ─── /var ─────────────────────────────────────────────────────────────────────

function bootstrapVar(vfs: VirtualFileSystem): void {
	ensureDir(vfs, "/var");
	ensureDir(vfs, "/var/log");
	ensureDir(vfs, "/var/log/apt");
	ensureDir(vfs, "/var/tmp");
	ensureDir(vfs, "/var/run");
	ensureDir(vfs, "/var/cache");
	ensureDir(vfs, "/var/cache/apt");
	ensureDir(vfs, "/var/cache/apt/archives");
	ensureDir(vfs, "/var/lib");
	ensureDir(vfs, "/var/lib/apt");
	ensureDir(vfs, "/var/lib/apt/lists");
	ensureDir(vfs, "/var/lib/dpkg");
	ensureDir(vfs, "/var/lib/dpkg/info");

	// dpkg status — starts empty, VirtualPackageManager populates it
	ensureFile(vfs, "/var/lib/dpkg/status", "");
	ensureFile(vfs, "/var/lib/dpkg/available", "");

	// syslog stubs
	ensureFile(vfs, "/var/log/syslog", `${new Date().toUTCString()} fortune kernel: Virtual container started\n`);
	ensureFile(vfs, "/var/log/auth.log", "");
	ensureFile(vfs, "/var/log/dpkg.log", "");
	ensureFile(vfs, "/var/log/apt/history.log", "");
	ensureFile(vfs, "/var/log/apt/term.log", "");
}

// ─── /bin + /sbin symlinks ────────────────────────────────────────────────────

function bootstrapBin(vfs: VirtualFileSystem): void {
	// Modern Debian: /bin and /sbin are symlinks to /usr/bin and /usr/sbin
	if (!vfs.exists("/bin")) vfs.symlink("/usr/bin", "/bin");
	if (!vfs.exists("/sbin")) vfs.symlink("/usr/sbin", "/sbin");
	ensureDir(vfs, "/lib");
	ensureDir(vfs, "/lib64");
}

// ─── /tmp ─────────────────────────────────────────────────────────────────────

function bootstrapTmp(vfs: VirtualFileSystem): void {
	ensureDir(vfs, "/tmp", 0o1777);
}

// ─── /root home ───────────────────────────────────────────────────────────────

function bootstrapRoot(vfs: VirtualFileSystem): void {
	ensureDir(vfs, "/root", 0o700);
	ensureFile(
		vfs,
		"/root/.bashrc",
		`${[
			"# root .bashrc",
			"export PS1='\\[\\033[0;31m\\]\\u@\\h\\[\\033[0m\\]:\\[\\033[0;34m\\]\\w\\[\\033[0m\\]# '",
			"export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
			"alias ll='ls -la'",
			"alias la='ls -A'",
		].join("\n")}\n`,
	);
	ensureFile(vfs, "/root/.profile", "[ -f ~/.bashrc ] && . ~/.bashrc\n");
}

// ─── /opt /srv /mnt /media /home ─────────────────────────────────────────────

function bootstrapMisc(vfs: VirtualFileSystem): void {
	ensureDir(vfs, "/opt");
	ensureDir(vfs, "/srv");
	ensureDir(vfs, "/mnt");
	ensureDir(vfs, "/media");
	ensureDir(vfs, "/home");
}

// ─── main entry point ─────────────────────────────────────────────────────────

/**
 * Bootstraps the full Linux rootfs hierarchy in the VFS.
 * Safe to call multiple times — idempotent.
 *
 * @param vfs            Target virtual filesystem.
 * @param users          User manager (for /etc/passwd sync).
 * @param hostname       Virtual hostname.
 * @param props          Shell properties (kernel, os, arch).
 * @param shellStartTime Unix ms of shell creation (for uptime).
 * @param sessions       Active sessions (for /proc/<pid> population).
 */
export function bootstrapLinuxRootfs(
	vfs: VirtualFileSystem,
	users: VirtualUserManager,
	hostname: string,
	props: ShellProperties,
	shellStartTime: number,
	sessions: VirtualActiveSession[] = [],
): void {
	bootstrapEtc(vfs, hostname, props);
	bootstrapSys(vfs, hostname, props);
	bootstrapDev(vfs);
	bootstrapUsr(vfs);
	bootstrapVar(vfs);
	bootstrapBin(vfs);
	bootstrapTmp(vfs);
	bootstrapRoot(vfs);
	bootstrapMisc(vfs);
	bootProcLog(vfs, props);
	refreshProc(vfs, props, hostname, shellStartTime, sessions);
	syncEtcPasswd(vfs, users);
}

// ─── optional live engine ─────────────────────────────────────────────────────

/**
 * Engine for runtimes that want periodic /proc refresh (e.g. web shell
 * with live `top`/`ps` output). Call `.boot()` once, then `.tick()` on
 * each session change or on a timer.
 *
 * ```ts
 * const engine = createLinuxRootfsEngine(vfs, props, hostname, Date.now());
 * engine.boot(users, sessions);
 * setInterval(() => engine.tick(shell.listActiveSessions()), 5000);
 * ```
 */
export function createLinuxRootfsEngine(
	vfs: VirtualFileSystem,
	props: ShellProperties,
	hostname: string,
	startTime: number,
) {
	return {
		boot(users: VirtualUserManager, sessions: VirtualActiveSession[] = []) {
			bootstrapLinuxRootfs(vfs, users, hostname, props, startTime, sessions);
		},
		tick(sessions: VirtualActiveSession[] = []) {
			refreshProc(vfs, props, hostname, startTime, sessions);
		},
	};
}