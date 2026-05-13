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
import VirtualFileSystem from "../VirtualFileSystem";
import { decodeVfs } from "../VirtualFileSystem/binaryPack";
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
	// Use lazy stub — no Buffer allocated until the file is actually read or overwritten
	vfs.writeStub(path, content, mode);
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

	// fstab
	ensureFile(
		vfs,
		"/etc/fstab",
		`${[
			"# <file system>  <mount point>  <type>   <options>         <dump>  <pass>",
			"UUID=00000000-0000-0000-0000-000000000001  /       ext4  errors=remount-ro  0  1",
			"UUID=00000000-0000-0000-0000-000000000002  /boot   ext4  defaults           0  2",
			"UUID=00000000-0000-0000-0000-000000000003  none    swap  sw                 0  0",
			"tmpfs  /tmp   tmpfs  defaults,noatime  0  0",
			"tmpfs  /run   tmpfs  defaults,noatime  0  0",
		].join("\n")}\n`,
	);

	// login.defs — useradd/passwd defaults
	ensureFile(
		vfs,
		"/etc/login.defs",
		`${[
			"MAIL_DIR        /var/mail",
			"PASS_MAX_DAYS   99999",
			"PASS_MIN_DAYS   0",
			"PASS_WARN_AGE   7",
			"UID_MIN         1000",
			"UID_MAX         60000",
			"GID_MIN         1000",
			"GID_MAX         60000",
			"CREATE_HOME     yes",
			"UMASK           022",
			"USERGROUPS_ENAB yes",
			"ENCRYPT_METHOD  SHA512",
		].join("\n")}\n`,
	);

	// security + pam
	ensureDir(vfs, "/etc/security");
	ensureFile(vfs, "/etc/security/limits.conf", "# /etc/security/limits.conf\n");
	ensureFile(vfs, "/etc/security/access.conf", "# /etc/security/access.conf\n");

	ensureDir(vfs, "/etc/pam.d");
	ensureFile(vfs, "/etc/pam.d/common-auth",     "auth required pam_unix.so\n");
	ensureFile(vfs, "/etc/pam.d/common-account",  "account required pam_unix.so\n");
	ensureFile(vfs, "/etc/pam.d/common-password",
		"password required pam_unix.so obscure sha512\n");
	ensureFile(vfs, "/etc/pam.d/common-session",  "session required pam_unix.so\n");
	ensureFile(vfs, "/etc/pam.d/sshd",
		"@include common-auth\n@include common-account\n@include common-session\n");

	// sudo config
	ensureDir(vfs, "/etc/sudoers.d");
	ensureFile(vfs, "/etc/sudoers",
		"root ALL=(ALL:ALL) ALL\n%sudo ALL=(ALL:ALL) ALL\n", 0o440);

	// ld
	ensureFile(vfs, "/etc/ld.so.conf", "include /etc/ld.so.conf.d/*.conf\n");
	ensureDir(vfs, "/etc/ld.so.conf.d");
	ensureFile(vfs, "/etc/ld.so.conf.d/x86_64-linux-gnu.conf", "/lib/x86_64-linux-gnu\n/usr/lib/x86_64-linux-gnu\n");

	// locale + timezone
	ensureFile(vfs, "/etc/locale.conf", "LANG=en_US.UTF-8\n");
	ensureFile(vfs, "/etc/timezone", "UTC\n");
	ensureFile(vfs, "/etc/localtime", "UTC\n");
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
	ensureFile(vfs, "/proc/net/if_inet6", "");
	ensureFile(vfs, "/proc/net/tcp",  "  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode\n");
	ensureFile(vfs, "/proc/net/tcp6", "  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode\n");

	// /proc/cmdline — kernel boot args
	write(vfs, "/proc/cmdline", `BOOT_IMAGE=/boot/vmlinuz-${props.kernel} root=/dev/sda2 ro quiet splash\n`);

	// /proc/filesystems
	ensureFile(
		vfs,
		"/proc/filesystems",
		`${["nodev\tsysfs", "nodev\ttmpfs", "nodev\tproc", "nodev\tdevtmpfs", "\text4", "\tvfat", "nodev\tsquashfs", "nodev\toverlay"].join("\n")}\n`,
	);

	// /proc/mounts (= /proc/self/mounts)
	const mountsContent = `${[
		"sysfs /sys sysfs rw,nosuid,nodev,noexec,relatime 0 0",
		"proc /proc proc rw,nosuid,nodev,noexec,relatime 0 0",
		"devtmpfs /dev devtmpfs rw,nosuid,size=8192k,nr_inodes=4096,mode=755 0 0",
		"tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0",
		"tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0",
		"/dev/sda2 / ext4 rw,relatime,errors=remount-ro 0 0",
		"/dev/sda1 /boot ext4 rw,relatime 0 0",
		"tmpfs /dev/shm tmpfs rw,nosuid,nodev 0 0",
		"devpts /dev/pts devpts rw,nosuid,noexec,relatime,mode=620,ptmxmode=000 0 0",
		"squashfs /snap/core squashfs ro,nodev,relatime 0 0",
	].join("\n")}\n`;
	write(vfs, "/proc/mounts", mountsContent);
	ensureDir(vfs, "/proc/self");
	write(vfs, "/proc/self/mounts", mountsContent);

	// /proc/partitions
	write(
		vfs,
		"/proc/partitions",
		`${[
			"major minor  #blocks  name",
			"",
			"   8        0   41943040 sda",
			"   8        1     524288 sda1",
			"   8        2   41417216 sda2",
			"   7        0   10485760 loop0",
		].join("\n")}\n`,
	);

	// /proc/swaps
	write(
		vfs,
		"/proc/swaps",
		"Filename\t\t\t\tType\t\tSize\t\tUsed\t\tPriority\n" +
		`/dev/sda3\t\t\t\tpartition\t${Math.floor(os.totalmem() / 2048)}\t\t0\t\t-2\n`,
	);

	// /proc/sys — sysctl virtual tree
	ensureDir(vfs, "/proc/sys");
	ensureDir(vfs, "/proc/sys/kernel");
	ensureDir(vfs, "/proc/sys/net");
	ensureDir(vfs, "/proc/sys/vm");
	ensureFile(vfs, "/proc/sys/kernel/hostname",            `${hostname}\n`);
	ensureFile(vfs, "/proc/sys/kernel/ostype",               "Linux\n");
	ensureFile(vfs, "/proc/sys/kernel/osrelease",            `${props.kernel}\n`);
	ensureFile(vfs, "/proc/sys/kernel/pid_max",              "32768\n");
	ensureFile(vfs, "/proc/sys/kernel/threads-max",          "65536\n");
	ensureFile(vfs, "/proc/sys/kernel/randomize_va_space",   "2\n");
	ensureFile(vfs, "/proc/sys/kernel/dmesg_restrict",       "0\n");
	ensureFile(vfs, "/proc/sys/net/ipv4/ip_forward",         "0\n");
	ensureFile(vfs, "/proc/sys/vm/swappiness",               "60\n");
	ensureFile(vfs, "/proc/sys/vm/overcommit_memory",        "0\n");

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

	// character devices
	ensureFile(vfs, "/dev/null",    "", 0o666);
	ensureFile(vfs, "/dev/zero",    "", 0o666);
	ensureFile(vfs, "/dev/full",    "", 0o666);
	ensureFile(vfs, "/dev/random",  "", 0o444);
	ensureFile(vfs, "/dev/urandom", "", 0o444);
	ensureFile(vfs, "/dev/mem",     "", 0o640);

	// terminal devices
	ensureFile(vfs, "/dev/console", "", 0o600);
	ensureFile(vfs, "/dev/tty",     "", 0o666);
	ensureFile(vfs, "/dev/tty0",    "", 0o620);
	ensureFile(vfs, "/dev/tty1",    "", 0o620);
	ensureFile(vfs, "/dev/ttyS0",   "", 0o660);

	// loop devices
	for (let i = 0; i < 8; i++) {
		ensureFile(vfs, `/dev/loop${i}`, "", 0o660);
	}
	ensureDir(vfs, "/dev/loop-control");

	// block device stubs (sda + partitions)
	ensureFile(vfs, "/dev/sda",  "", 0o660);
	ensureFile(vfs, "/dev/sda1", "", 0o660);
	ensureFile(vfs, "/dev/sda2", "", 0o660);

	// misc
	ensureDir(vfs, "/dev/pts");
	ensureDir(vfs, "/dev/shm");
	ensureFile(vfs, "/dev/stdin",  "", 0o666);
	ensureFile(vfs, "/dev/stdout", "", 0o666);
	ensureFile(vfs, "/dev/stderr", "", 0o666);
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
	ensureDir(vfs, "/var/cache");
	ensureDir(vfs, "/var/cache/apt");
	ensureDir(vfs, "/var/cache/apt/archives");
	ensureDir(vfs, "/var/lib");
	ensureDir(vfs, "/var/lib/apt");
	ensureDir(vfs, "/var/lib/apt/lists");
	ensureDir(vfs, "/var/lib/dpkg");
	ensureDir(vfs, "/var/lib/dpkg/info");
	ensureDir(vfs, "/var/lib/misc");
	ensureDir(vfs, "/var/spool");
	ensureDir(vfs, "/var/spool/cron");
	ensureDir(vfs, "/var/mail");

	// dpkg status — starts empty, VirtualPackageManager populates it
	ensureFile(vfs, "/var/lib/dpkg/status", "");
	ensureFile(vfs, "/var/lib/dpkg/available", "");

	// syslog stubs
	ensureFile(vfs, "/var/log/syslog", `${new Date().toUTCString()} fortune kernel: Virtual container started\n`);
	ensureFile(vfs, "/var/log/auth.log", "");
	ensureFile(vfs, "/var/log/kern.log", "");
	ensureFile(vfs, "/var/log/dpkg.log", "");
	ensureFile(vfs, "/var/log/apt/history.log", "");
	ensureFile(vfs, "/var/log/apt/term.log", "");

	// /run — systemd tmpfs runtime dir (canonical on modern Debian)
	// /var/run is a legacy symlink to /run
	ensureDir(vfs, "/run");
	ensureDir(vfs, "/run/lock");
	ensureDir(vfs, "/run/systemd");
	ensureDir(vfs, "/run/user");
	ensureFile(vfs, "/run/utmp", "");
}

// ─── /bin + /sbin symlinks ────────────────────────────────────────────────────

function bootstrapBin(vfs: VirtualFileSystem): void {
	// Modern Debian: /bin and /sbin are symlinks to /usr/bin and /usr/sbin
	if (!vfs.exists("/bin"))  vfs.symlink("/usr/bin",  "/bin");
	if (!vfs.exists("/sbin")) vfs.symlink("/usr/sbin", "/sbin");

	// /var/run → /run (systemd compat)
	if (!vfs.exists("/var/run")) vfs.symlink("/run", "/var/run");

	ensureDir(vfs, "/lib");
	ensureDir(vfs, "/lib64");
	ensureDir(vfs, "/lib/x86_64-linux-gnu");
	ensureDir(vfs, "/lib/modules");
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

function bootstrapMisc(vfs: VirtualFileSystem, props: ShellProperties): void {
	ensureDir(vfs, "/opt");
	ensureDir(vfs, "/srv");
	ensureDir(vfs, "/mnt");
	ensureDir(vfs, "/media");
	ensureDir(vfs, "/home");

	// /boot — grub + kernel images
	ensureDir(vfs, "/boot");
	ensureDir(vfs, "/boot/grub");
	ensureDir(vfs, "/boot/grub/grub.cfg.d");
	ensureFile(
		vfs,
		"/boot/grub/grub.cfg",
		`${[
			"# GRUB configuration (virtual)",
			"set default=0",
			"set timeout=5",
			"",
			`menuentry "Fortune GNU/Linux" {`,
			`  linux   /vmlinuz root=/dev/sda2 ro quiet splash`,
			`  initrd  /initrd.img`,
			`}`,
		].join("\n")}\n`,
	);
	// kernel + initrd stubs in /boot
	const kver = props.kernel;
	ensureFile(vfs, `/boot/vmlinuz-${kver}`, "", 0o644);
	ensureFile(vfs, `/boot/initrd.img-${kver}`, "", 0o644);
	ensureFile(vfs, `/boot/System.map-${kver}`, `${kver} virtual\n`, 0o644);
	ensureFile(vfs, `/boot/config-${kver}`, `# Linux kernel config ${kver}\n`, 0o644);

	// root-level symlinks (Debian convention)
	if (!vfs.exists("/vmlinuz"))     vfs.symlink(`/boot/vmlinuz-${kver}`, "/vmlinuz");
	if (!vfs.exists("/vmlinuz.old")) vfs.symlink(`/boot/vmlinuz-${kver}`, "/vmlinuz.old");
	if (!vfs.exists("/initrd.img"))     vfs.symlink(`/boot/initrd.img-${kver}`, "/initrd.img");
	if (!vfs.exists("/initrd.img.old")) vfs.symlink(`/boot/initrd.img-${kver}`, "/initrd.img.old");

	// /snap — snapd mount namespace root
	ensureDir(vfs, "/snap");
	ensureDir(vfs, "/snap/bin");

	// /lost+found — ext4 fsck recovery dir (mode 0o700, root only)
	ensureDir(vfs, "/lost+found", 0o700);
}

// ── Static rootfs snapshot cache ─────────────────────────────────────────────
// The static parts of the rootfs (dev, usr, var, bin, tmp, etc, sys, misc)
// are identical for all shells sharing the same hostname+props.
// We build them once, serialise to VFSB binary, and clone via decodeVfs()
// for each new shell — avoiding ~250 JS object allocations per instance.

const _staticRootfsCache = new Map<string, Buffer>();

function _staticCacheKey(hostname: string, props: ShellProperties): string {
	return `${hostname}|${props.kernel}|${props.os}|${props.arch}`;
}

/**
 * Build or retrieve the static rootfs VFSB snapshot for the given
 * hostname + ShellProperties combination.
 *
 * Subsequent calls with the same key return the cached Buffer in ~0ms.
 */
export function getStaticRootfsSnapshot(
	hostname: string,
	props: ShellProperties,
): Buffer {
	const key = _staticCacheKey(hostname, props);
	const cached = _staticRootfsCache.get(key);
	if (cached) return cached;

	// Build the static subset into a temporary VFS
	const tmp = new VirtualFileSystem({ mode: "memory" });
	bootstrapEtc(tmp, hostname, props);
	bootstrapSys(tmp, hostname, props);
	bootstrapDev(tmp);
	bootstrapUsr(tmp);
	bootstrapVar(tmp);
	bootstrapBin(tmp);
	bootstrapTmp(tmp);
	bootstrapMisc(tmp, props);
	bootProcLog(tmp, props);

	const snapshot = tmp.encodeBinary();
	_staticRootfsCache.set(key, snapshot);
	return snapshot;
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
	// Fast path: clone the cached static rootfs snapshot (VFSB decode ~0.07ms)
	// instead of rebuilding ~250 JS objects from scratch each time.
	const snapshot = getStaticRootfsSnapshot(hostname, props);
	vfs.importRootTree(decodeVfs(snapshot));

	// Dynamic parts: per-instance data injected after the static clone
	bootstrapRoot(vfs);           // /root home dir + .bashrc
	refreshProc(vfs, props, hostname, shellStartTime, sessions);  // /proc live data
	syncEtcPasswd(vfs, users);   // /etc/passwd|group|shadow
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