/** biome-ignore-all lint/style/useNamingConvention: ENV VAR KEYS */
/**
 * linuxRootfs.ts
 *
 * Bootstraps a realistic Linux directory hierarchy in the VFS.
 * Called once during VirtualShell initialization. Idempotent — skips
 * paths that already exist so FS-mode snapshots survive restarts.
 */

import * as os from "node:os";
import type { ShellProperties } from "../VirtualShell";
import type VirtualFileSystem from "../VirtualFileSystem";
import type { VirtualUserManager } from "../VirtualUserManager";

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

	ensureFile(vfs, "/etc/issue", `Fortune GNU/Linux 1.0 \\n \\l\n`);

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

	// network stubs
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

	ensureFile(
		vfs,
		"/etc/resolv.conf",
		"nameserver 1.1.1.1\nnameserver 8.8.8.8\n",
	);

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
 * @param vfs VirtualFileSystem instance to write files into
 * @param users VirtualUserManager to source users from
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

	// shadow — fake hashes, never real
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

// ─── /proc ───────────────────────────────────────────────────────────────────

/** Derive a stable virtual PID from a tty string like "pts/0" → 1000, "pts/1" → 1001 */
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

	const uptimeSec = Math.floor(
		(Date.now() - new Date(startedAt).getTime()) / 1000,
	);

	vfs.writeFile(`${dir}/cmdline`, `${cmdline.replace(/\s+/g, "\0")}\0`);
	vfs.writeFile(`${dir}/comm`, cmdline.split(/\s+/)[0] ?? "bash");
	vfs.writeFile(
		`${dir}/status`,
		`${[
			`Name:   ${cmdline.split(/\s+/)[0] ?? "bash"}`,
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
	vfs.writeFile(
		`${dir}/stat`,
		`${pid} (${cmdline.split(/\s+/)[0] ?? "bash"}) S 1 ${pid} ${pid} 0 -1 4194304 0 0 0 0 ${uptimeSec} 0 0 0 20 0 1 0 0 16384 4096 0\n`,
	);
	vfs.writeFile(
		`${dir}/environ`,
		`${Object.entries(env)
			.map(([k, v]) => `${k}=${v}`)
			.join("\0")}\0`,
	);
	vfs.writeFile(`${dir}/cwd`, `/home/${username}\0`);
	vfs.writeFile(`${dir}/exe`, "/bin/bash\0");

	// Standard fd entries
	vfs.writeFile(`${dir}/fd/0`, "");
	vfs.writeFile(`${dir}/fd/1`, "");
	vfs.writeFile(`${dir}/fd/2`, "");
}

/**
 * Populate and refresh `/proc` virtual entries based on host stats and
 * provided active sessions. Rewrites `/proc/uptime`, `/proc/meminfo`,
 * `/proc/cpuinfo`, `/proc/<pid>` entries and `/proc/self` content.
 * @param vfs VirtualFileSystem instance
 * @param props ShellProperties used for version strings
 * @param hostname Hostname to write into /proc/hostname
 * @param shellStartTime Start time used to compute uptime
 * @param sessions Optional active sessions list to populate per-pid entries
 */
export function refreshProc(
	vfs: VirtualFileSystem,
	props: ShellProperties,
	hostname: string,
	shellStartTime: number,
	sessions?: import("../VirtualUserManager").VirtualActiveSession[],
): void {
	ensureDir(vfs, "/proc");

	const uptimeSec = Math.floor((Date.now() - shellStartTime) / 1000);
	vfs.writeFile(
		"/proc/uptime",
		`${uptimeSec}.00 ${Math.floor(uptimeSec * 0.9)}.00\n`,
	);

	const totalMemKb = Math.floor(os.totalmem() / 1024);
	const freeMemKb = Math.floor(os.freemem() / 1024);
	const availMemKb = Math.floor(freeMemKb * 0.95);
	vfs.writeFile(
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

	const cpus = os.cpus();
	const cpuLines: string[] = [];
	for (let i = 0; i < cpus.length; i++) {
		const c = cpus[i];
		if (!c) continue;
		const mhz = c.speed.toFixed(3);
		cpuLines.push(
			`processor\t: ${i}`,
			`model name\t: ${c.model}`,
			`cpu MHz\t\t: ${mhz}`,
			`cache size\t: 8192 KB`,
			"",
		);
	}
	vfs.writeFile("/proc/cpuinfo", `${cpuLines.join("\n")}\n`);

	vfs.writeFile(
		"/proc/version",
		`Linux version ${props.kernel} (fortune@build) (gcc version 12.2.0) #1 SMP\n`,
	);

	vfs.writeFile("/proc/hostname", `${hostname}\n`);

	// /proc/loadavg
	const load = (Math.random() * 0.5).toFixed(2);
	const numProcs = 1 + (sessions?.length ?? 0);
	vfs.writeFile(
		"/proc/loadavg",
		`${load} ${load} ${load} ${numProcs}/${numProcs} 1\n`,
	);

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

	// ── /proc/1 — init process ────────────────────────────────────────────────
	writeProcPid(
		vfs,
		1,
		"root",
		"pts/0",
		"/sbin/init",
		new Date(shellStartTime).toISOString(),
		{},
	);

	// ── /proc/<pid> per session ───────────────────────────────────────────────
	const activeSessions = sessions ?? [];
	for (const session of activeSessions) {
		const pid = ttyToPid(session.tty);
		writeProcPid(
			vfs,
			pid,
			session.username,
			session.tty,
			"bash",
			session.startedAt,
			{
				USER: session.username,
				HOME: `/home/${session.username}`,
				TERM: "xterm-256color",
				SHELL: "/bin/bash",
			},
		);
	}

	// ── /proc/self — symlink to current session PID or 1 ────────────────────
	// We can't know which session is "current" at populate time,
	// so /proc/self is a directory that mirrors the most recent session,
	// or init if no sessions. Commands that read /proc/self get consistent data.
	const selfPid =
		activeSessions.length > 0
			? ttyToPid(activeSessions[activeSessions.length - 1]!.tty)
			: 1;

	// Remove existing /proc/self and recreate as content copy
	if (vfs.exists("/proc/self")) {
		try {
			vfs.remove("/proc/self");
		} catch {}
	}
	// /proc/self is a real directory (not a symlink, which VFS may not support for dirs)
	const selfSrc = `/proc/${selfPid}`;
	if (vfs.exists(selfSrc)) {
		ensureDir(vfs, "/proc/self");
		ensureDir(vfs, "/proc/self/fd");
		for (const entry of vfs.list(selfSrc)) {
			const srcPath = `${selfSrc}/${entry}`;
			const dstPath = `/proc/self/${entry}`;
			try {
				const st = vfs.stat(srcPath);
				if (st.type === "file") {
					vfs.writeFile(dstPath, vfs.readFile(srcPath));
				}
			} catch {}
		}
		vfs.writeFile(
			"/proc/self/status",
			vfs.exists(`${selfSrc}/status`) ? vfs.readFile(`${selfSrc}/status`) : "",
		);
	} else {
		// Fallback minimal /proc/self
		ensureDir(vfs, "/proc/self");
		vfs.writeFile("/proc/self/cmdline", "bash\0");
		vfs.writeFile("/proc/self/comm", "bash");
		vfs.writeFile(
			"/proc/self/status",
			"Name:\tbash\nState:\tS (sleeping)\nPid:\t1\nPPid:\t0\n",
		);
		vfs.writeFile("/proc/self/environ", "");
		vfs.writeFile("/proc/self/cwd", "/root\0");
		vfs.writeFile("/proc/self/exe", "/bin/bash\0");
	}
}

// ─── /sys ─────────────────────────────────────────────────────────────────────

function bootstrapSys(vfs: VirtualFileSystem, props: ShellProperties): void {
	ensureDir(vfs, "/sys");
	ensureDir(vfs, "/sys/devices");
	ensureDir(vfs, "/sys/devices/virtual");
	ensureDir(vfs, "/sys/devices/virtual/dmi");
	ensureDir(vfs, "/sys/devices/virtual/dmi/id");

	ensureFile(
		vfs,
		"/sys/devices/virtual/dmi/id/sys_vendor",
		"Fortune Systems\n",
	);
	ensureFile(
		vfs,
		"/sys/devices/virtual/dmi/id/product_name",
		"VirtualContainer v1\n",
	);
	ensureFile(vfs, "/sys/devices/virtual/dmi/id/board_name", "fortune-board\n");

	ensureDir(vfs, "/sys/class");
	ensureDir(vfs, "/sys/class/net");

	ensureDir(vfs, "/sys/kernel");
	ensureFile(vfs, "/sys/kernel/hostname", "fortune-vm\n");
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

	// Stub binaries so `which` can find built-in commands
	const builtins = [
		"sh",
		"bash",
		"ls",
		"cat",
		"echo",
		"grep",
		"find",
		"sort",
		"head",
		"tail",
		"cut",
		"tr",
		"sed",
		"awk",
		"wc",
		"tee",
		"tar",
		"gzip",
		"gunzip",
		"touch",
		"mkdir",
		"rm",
		"mv",
		"cp",
		"chmod",
		"ln",
		"pwd",
		"env",
		"date",
		"sleep",
		"id",
		"whoami",
		"hostname",
		"uname",
		"ps",
		"kill",
		"df",
		"du",
		"curl",
		"wget",
		"nano",
		"diff",
		"uniq",
		"xargs",
		"base64",
	];
	for (const bin of builtins) {
		ensureFile(
			vfs,
			`/usr/bin/${bin}`,
			`#!/bin/sh\nexec builtin ${bin} "$@"\n`,
			0o755,
		);
	}

	// lsb_release script
	ensureFile(
		vfs,
		"/usr/bin/lsb_release",
		'#!/bin/sh\nexec lsb_release "$@"\n',
		0o755,
	);
}

// ─── /var ─────────────────────────────────────────────────────────────────────

function bootstrapVar(vfs: VirtualFileSystem): void {
	ensureDir(vfs, "/var");
	ensureDir(vfs, "/var/log");
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

	// dpkg status — starts empty, apt install populates it
	ensureFile(vfs, "/var/lib/dpkg/status", "");
	ensureFile(vfs, "/var/lib/dpkg/available", "");

	// syslog stub
	ensureFile(
		vfs,
		"/var/log/syslog",
		`${new Date().toUTCString()} fortune kernel: Virtual container started\n`,
	);
	ensureFile(vfs, "/var/log/auth.log", "");
	ensureFile(vfs, "/var/log/dpkg.log", "");
	ensureFile(vfs, "/var/log/apt/history.log", "");
	ensureFile(vfs, "/var/log/apt/term.log", "");
}

// ─── /bin + /sbin symlinks ────────────────────────────────────────────────────

function bootstrapBin(vfs: VirtualFileSystem): void {
	// On modern Debian/Ubuntu /bin is a symlink to /usr/bin
	if (!vfs.exists("/bin")) {
		vfs.symlink("/usr/bin", "/bin");
	}
	if (!vfs.exists("/sbin")) {
		vfs.symlink("/usr/sbin", "/sbin");
	}
	if (!vfs.exists("/lib")) {
		ensureDir(vfs, "/lib");
	}
	if (!vfs.exists("/lib64")) {
		ensureDir(vfs, "/lib64");
	}
}

// ─── /tmp ─────────────────────────────────────────────────────────────────────

function bootstrapTmp(vfs: VirtualFileSystem): void {
	ensureDir(vfs, "/tmp", 0o1777);
}

// ─── /root ────────────────────────────────────────────────────────────────────

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
	// Fix: /home/root should map to /root for root user
	if (!vfs.exists("/home/root")) {
		vfs.symlink("/root", "/home/root");
	}
}

// ─── /opt + /srv + /mnt + /media ─────────────────────────────────────────────

function bootstrapMisc(vfs: VirtualFileSystem): void {
	ensureDir(vfs, "/opt");
	ensureDir(vfs, "/srv");
	ensureDir(vfs, "/mnt");
	ensureDir(vfs, "/media");
}

// ─── main entry point ─────────────────────────────────────────────────────────

/**
 * Bootstraps the full Linux rootfs hierarchy in the VFS.
 * Safe to call multiple times — idempotent.
 *
 * @param vfs Target virtual filesystem.
 * @param users User manager (for /etc/passwd sync).
 * @param hostname Virtual hostname.
 * @param props Shell properties (kernel, os, arch).
 * @param shellStartTime Unix ms of shell creation (for uptime).
 */
export function bootstrapLinuxRootfs(
	vfs: VirtualFileSystem,
	users: VirtualUserManager,
	hostname: string,
	props: ShellProperties,
	shellStartTime: number,
): void {
	bootstrapEtc(vfs, hostname, props);
	bootstrapSys(vfs, props);
	bootstrapDev(vfs);
	bootstrapUsr(vfs);
	bootstrapVar(vfs);
	bootstrapBin(vfs);
	bootstrapTmp(vfs);
	bootstrapRoot(vfs);
	bootstrapMisc(vfs);
	refreshProc(vfs, props, hostname, shellStartTime, []);
	syncEtcPasswd(vfs, users);
}
