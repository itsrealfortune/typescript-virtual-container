/** biome-ignore-all lint/style/useNamingConvention: ENV VAR KEYS + system names */
/**
 * linuxRootfs.ts
 *
 * Bootstraps a realistic Linux directory hierarchy in the VFS.
 * Called once during VirtualShell initialization. Idempotent — skips
 * paths that already exist so FS-mode snapshots survive restarts.
 *
 * Emulation fidelity: modelled after a Fortune GNU/Linux 1.0 (Nyx)
 * container with Firecracker MicroVM kernel 6.x, virtio block devices
 * (vda/vdb/vdc/vdd), cgroups v1 hierarchy, Node.js 22, Python 3.12,
 * GCC 13, OpenJDK 21, and a Fortune-style package database.
 *
 * Public API:
 *  - bootstrapLinuxRootfs()    one-shot boot (VirtualShell calls this)
 *  - refreshProc()             refresh /proc/* (call on session changes)
 *  - syncEtcPasswd()           sync /etc/passwd|group|shadow from UserManager
 *  - createLinuxRootfsEngine() engine with .boot() + .tick() for live loops
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

	// os-release — Fortune Nyx identity
	ensureFile(
		vfs,
		"/etc/os-release",
		`${[
			`NAME="Fortune GNU/Linux"`,
			`PRETTY_NAME="${props.os}"`,
			`ID=fortune`,
			`ID_LIKE=debian`,
			`HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"`,
			`VERSION_CODENAME=nyx`,
			`VERSION_ID="24.04"`,
			`FORTUNE_CODENAME=nyx`,
		].join("\n")}\n`,
	);

	ensureFile(vfs, "/etc/debian_version", "nyx/stable\n");
	ensureFile(vfs, "/etc/hostname", `${hostname}\n`);
	ensureFile(
		vfs,
		"/etc/shells",
		"/bin/sh\n/bin/bash\n/usr/bin/bash\n/bin/dash\n/usr/bin/dash\n",
	);
	ensureFile(
		vfs,
		"/etc/profile",
		`${[
			"export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
			"export PS1='\\u@\\h:\\w\\$ '",
		].join("\n")}\n`,
	);

	ensureFile(vfs, "/etc/issue", "Fortune GNU/Linux 24.04 LTS \\n \\l\n");
	ensureFile(vfs, "/etc/issue.net", "Fortune GNU/Linux 24.04 LTS\n");
	ensureFile(
		vfs,
		"/etc/motd",
		["", `Welcome to ${props.os}`, `Kernel: ${props.kernel}`, ""].join("\n"),
	);
	ensureFile(vfs, "/etc/lsb-release",
		`${[
			"DISTRIB_ID=Fortune",
			"DISTRIB_RELEASE=24.04",
			"DISTRIB_CODENAME=nyx",
			`DISTRIB_DESCRIPTION="${props.os}"`,
		].join("\n")}\n`,
	);

	// APT — Fortune Nyx sources
	ensureDir(vfs, "/etc/apt");
	ensureDir(vfs, "/etc/apt/sources.list.d");
	ensureDir(vfs, "/etc/apt/trusted.gpg.d");
	ensureDir(vfs, "/etc/apt/keyrings");
	ensureFile(
		vfs,
		"/etc/apt/sources.list",
		`${[
			"# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)",
			"deb [virtual] fortune://packages.fortune.local nyx main contrib non-free",
			"deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free",
			"deb [virtual] fortune://security.fortune.local nyx-security main",
		].join("\n")}\n`,
	);
	ensureFile(vfs, "/etc/apt/apt.conf.d/70debconf", `// debconf config\n`);

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
	ensureDir(vfs, "/etc/netplan");
	ensureFile(
		vfs,
		"/etc/netplan/01-eth0.yaml",
		`${[
			"network:",
			"  version: 2",
			"  ethernets:",
			"    eth0:",
			"      dhcp4: true",
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
			"fe00::0     ip6-localnet",
			"ff00::0     ip6-mcastprefix",
			"ff02::1     ip6-allnodes",
			"ff02::2     ip6-allrouters",
		].join("\n")}\n`,
	);

	ensureFile(vfs, "/etc/nsswitch.conf",
		`${[
			"passwd:         files systemd",
			"group:          files systemd",
			"shadow:         files",
			"hosts:          files dns",
			"networks:       files",
			"protocols:      db files",
			"services:       db files",
			"ethers:         db files",
			"rpc:            db files",
		].join("\n")}\n`,
	);

	ensureDir(vfs, "/etc/cron.d");
	ensureDir(vfs, "/etc/cron.daily");
	ensureDir(vfs, "/etc/cron.hourly");
	ensureDir(vfs, "/etc/cron.weekly");
	ensureDir(vfs, "/etc/cron.monthly");
	ensureDir(vfs, "/etc/init.d");
	ensureDir(vfs, "/etc/systemd");
	ensureDir(vfs, "/etc/systemd/system");
	ensureDir(vfs, "/etc/systemd/system/multi-user.target.wants");
	ensureDir(vfs, "/etc/systemd/network");
	ensureFile(vfs, "/etc/systemd/system.conf",
		"[Manager]\nDefaultTimeoutStartSec=90s\nDefaultTimeoutStopSec=90s\n",
	);

	// fstab — virtio block devices matching Firecracker layout
	ensureFile(
		vfs,
		"/etc/fstab",
		`${[
			"# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>",
			"/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1",
			"/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0",
			"tmpfs            /tmp           tmpfs     defaults,noatime                 0  0",
			"tmpfs            /run           tmpfs     defaults,noatime                 0  0",
			"tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0",
		].join("\n")}\n`,
	);

	// login.defs
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
	ensureFile(vfs, "/etc/security/limits.conf",
		"# /etc/security/limits.conf\n*  soft  nofile  1024\n*  hard  nofile  65536\n",
	);
	ensureFile(vfs, "/etc/security/access.conf", "# /etc/security/access.conf\n");

	ensureDir(vfs, "/etc/pam.d");
	ensureFile(vfs, "/etc/pam.d/common-auth",
		"auth [success=1 default=ignore] pam_unix.so nullok\nauth requisite pam_deny.so\nauth required pam_permit.so\n",
	);
	ensureFile(vfs, "/etc/pam.d/common-account",
		"account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so\naccount requisite pam_deny.so\naccount required pam_permit.so\n",
	);
	ensureFile(vfs, "/etc/pam.d/common-password",
		"password [success=1 default=ignore] pam_unix.so obscure sha512\npassword requisite pam_deny.so\npassword required pam_permit.so\n",
	);
	ensureFile(vfs, "/etc/pam.d/common-session",
		"session [default=1] pam_permit.so\nsession requisite pam_deny.so\nsession required pam_permit.so\nsession optional pam_umask.so\nsession required pam_unix.so\n",
	);
	ensureFile(vfs, "/etc/pam.d/sshd",
		"@include common-auth\n@include common-account\n@include common-session\n",
	);
	ensureFile(vfs, "/etc/pam.d/login",
		"@include common-auth\n@include common-account\n@include common-session\n",
	);
	ensureFile(vfs, "/etc/pam.d/sudo",
		"@include common-auth\n@include common-account\n@include common-session\n",
	);

	// sudo
	ensureDir(vfs, "/etc/sudoers.d");
	ensureFile(vfs, "/etc/sudoers",
		"Defaults\tenv_reset\nDefaults\tmail_badpass\nDefaults\tsecure_path=\"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\"\nroot ALL=(ALL:ALL) ALL\n%sudo ALL=(ALL:ALL) ALL\n",
		0o440,
	);
	ensureFile(vfs, "/etc/sudoers.d/README",
		"# Files in this directory are parsed by sudo, if the file is not a backup.\n",
		0o440,
	);

	// ld
	ensureFile(vfs, "/etc/ld.so.conf", "include /etc/ld.so.conf.d/*.conf\n");
	ensureDir(vfs, "/etc/ld.so.conf.d");
	ensureFile(vfs, "/etc/ld.so.conf.d/x86_64-linux-gnu.conf",
		"/lib/x86_64-linux-gnu\n/usr/lib/x86_64-linux-gnu\n",
	);
	ensureFile(vfs, "/etc/ld.so.conf.d/fakeroot.conf",
		"/usr/lib/x86_64-linux-gnu/libfakeroot\n",
	);

	// locale + timezone
	ensureFile(vfs, "/etc/locale.conf", "LANG=en_US.UTF-8\n");
	ensureFile(vfs, "/etc/locale.gen", "en_US.UTF-8 UTF-8\n");
	ensureFile(vfs, "/etc/default/locale", "LANG=en_US.UTF-8\n");
	ensureFile(vfs, "/etc/timezone", "UTC\n");
	ensureFile(vfs, "/etc/localtime", "UTC\n");

	// environment
	ensureFile(vfs, "/etc/environment",
		"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\n",
	);

	// adduser.conf
	ensureFile(vfs, "/etc/adduser.conf",
		`${[
			"DSHELL=/bin/bash",
			"DHOME=/home",
			"GROUPHOMES=no",
			"LETTERHOMES=no",
			"SKEL=/etc/skel",
			"FIRST_SYSTEM_UID=100",
			"LAST_SYSTEM_UID=999",
			"FIRST_SYSTEM_GID=100",
			"LAST_SYSTEM_GID=999",
			"FIRST_UID=1000",
			"LAST_UID=59999",
			"FIRST_GID=1000",
			"LAST_GID=59999",
			"USERGROUPS=yes",
			"NAME_REGEX=\"^[a-z][-a-z0-9_]*$\"",
			"SYS_NAME_REGEX=\"^[a-z_][-a-z0-9_]*$\"",
		].join("\n")}\n`,
	);

	// /etc/skel
	ensureDir(vfs, "/etc/skel");
	ensureFile(vfs, "/etc/skel/.bashrc",
		`${[
			"# ~/.bashrc: executed by bash(1) for non-login shells.",
			"case $- in",
			"    *i*) ;;",
			"      *) return;;",
			"esac",
			"HISTCONTROL=ignoreboth",
			"HISTSIZE=1000",
			"HISTFILESIZE=2000",
			"shopt -s histappend",
			"shopt -s checkwinsize",
			"alias ll='ls -alF'",
			"alias la='ls -A'",
			"alias l='ls -CF'",
		].join("\n")}\n`,
	);
	ensureFile(vfs, "/etc/skel/.bash_logout", "# ~/.bash_logout\n");
	ensureFile(vfs, "/etc/skel/.profile",
		"# ~/.profile\n[ -n \"$BASH_VERSION\" ] && [ -f \"$HOME/.bashrc\" ] && . \"$HOME/.bashrc\"\n",
	);

	// alternatives
	ensureDir(vfs, "/etc/alternatives");
	const alternatives: [string, string][] = [
		["python3", "/usr/bin/python3.12"],
		["python",  "/usr/bin/python3.12"],
		["editor",  "/usr/bin/nano"],
		["vi",      "/usr/bin/nano"],
		["cc",      "/usr/bin/gcc"],
		["gcc",     "/usr/bin/gcc-13"],
		["g++",     "/usr/bin/g++-13"],
		["java",    "/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],
		["node",    "/usr/bin/node"],
		["npm",     "/usr/bin/npm"],
		["awk",     "/usr/bin/mawk"],
		["pager",   "/usr/bin/less"],
	];
	for (const [name, target] of alternatives) {
		ensureFile(vfs, `/etc/alternatives/${name}`, target);
	}

	// java
	ensureDir(vfs, "/etc/java-21-openjdk");
	ensureDir(vfs, "/etc/java-21-openjdk/security");
	ensureFile(vfs, "/etc/java-21-openjdk/security/java.security", "# java.security\n");
	ensureFile(vfs, "/etc/java-21-openjdk/logging.properties", "# logging.properties\n");

	// misc
	ensureFile(vfs, "/etc/bash.bashrc",
		"# System-wide .bashrc\n[ -z \"$PS1\" ] && return\n",
	);
	ensureFile(vfs, "/etc/inputrc",
		"# /etc/inputrc\n$include /etc/inputrc.d\nset bell-style none\n",
	);
	ensureFile(vfs, "/etc/magic", "# magic\n");
	ensureFile(vfs, "/etc/magic.mime", "# magic.mime\n");
	ensureFile(vfs, "/etc/papersize", "a4\n");
	ensureFile(vfs, "/etc/ucf.conf", "# ucf.conf\n");
	ensureFile(vfs, "/etc/gai.conf",
		"# getaddrinfo() configuration\nlabel ::1/128 0\nprecedence ::1/128 50\n",
	);
	ensureFile(vfs, "/etc/services",
		"# Network services\nftp   21/tcp\nssh   22/tcp\nsmtp  25/tcp\nhttp  80/tcp\nhttps 443/tcp\n",
	);
	ensureFile(vfs, "/etc/protocols",
		"# protocols\nip    0   IP\nicmp  1   ICMP\ntcp   6   TCP\nudp   17  UDP\n",
	);

	ensureDir(vfs, "/etc/profile.d");
	ensureFile(vfs, "/etc/profile.d/01-locale-fix.sh",
		"[ -z \"$LANG\" ] && export LANG=en_US.UTF-8\n",
	);
	ensureFile(vfs, "/etc/profile.d/apps-bin-path.sh",
		"export PATH=\"$PATH:/snap/bin\"\n",
	);
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
		"bin:x:2:2:bin:/bin:/usr/sbin/nologin",
		"sys:x:3:3:sys:/dev:/usr/sbin/nologin",
		"sync:x:4:65534:sync:/bin:/bin/sync",
		"games:x:5:60:games:/usr/games:/usr/sbin/nologin",
		"man:x:6:12:man:/var/cache/man:/usr/sbin/nologin",
		"lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin",
		"mail:x:8:8:mail:/var/mail:/usr/sbin/nologin",
		"news:x:9:9:news:/var/spool/news:/usr/sbin/nologin",
		"uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin",
		"proxy:x:13:13:proxy:/bin:/usr/sbin/nologin",
		"www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin",
		"backup:x:34:34:backup:/var/backups:/usr/sbin/nologin",
		"list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin",
		"irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin",
		"_apt:x:42:65534::/nonexistent:/usr/sbin/nologin",
		"nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin",
		"messagebus:x:100:106::/nonexistent:/usr/sbin/nologin",
		"systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin",
		"systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin",
		"polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin",
	];

	let uid = 1000;
	for (const u of userList) {
		if (u === "root") continue;
		passwdLines.push(`${u}:x:${uid}:${uid}::/home/${u}:/bin/bash`);
		uid++;
	}

	vfs.writeFile("/etc/passwd", `${passwdLines.join("\n")}\n`);

	const sudoers = userList.filter((u) => users.isSudoer(u)).join(",");
	const nonRootUsers = userList.filter((u) => u !== "root").join(",");

	const groupLines = [
		"root:x:0:",
		"daemon:x:1:",
		"bin:x:2:",
		"sys:x:3:",
		"adm:x:4:syslog",
		"tty:x:5:",
		"disk:x:6:",
		"lp:x:7:",
		"mail:x:8:",
		"news:x:9:",
		"uucp:x:10:",
		"man:x:12:",
		"proxy:x:13:",
		"kmem:x:15:",
		"dialout:x:20:",
		"fax:x:21:",
		"voice:x:22:",
		"cdrom:x:24:",
		"floppy:x:25:",
		"tape:x:26:",
		`sudo:x:27:${sudoers}`,
		"audio:x:29:",
		"dip:x:30:",
		"www-data:x:33:",
		"backup:x:34:",
		"operator:x:37:",
		"list:x:38:",
		"irc:x:39:",
		"src:x:40:",
		"_apt:x:42:",
		"shadow:x:42:",
		"utmp:x:43:",
		"video:x:44:",
		"sasl:x:45:",
		"plugdev:x:46:",
		"staff:x:50:",
		"games:x:60:",
		`users:x:100:${nonRootUsers}`,
		"nogroup:x:65534:",
		"messagebus:x:106:",
		"systemd-network:x:998:",
		"systemd-resolve:x:999:",
		"polkitd:x:997:",
	];
	vfs.writeFile("/etc/group", `${groupLines.join("\n")}\n`);

	const shadowLines = [
		"root:*:19000:0:99999:7:::",
		"daemon:*:19000:0:99999:7:::",
		"nobody:*:19000:0:99999:7:::",
		"messagebus:*:19000:0:99999:7:::",
		"_apt:*:19000:0:99999:7:::",
		"systemd-network:!:19000:::::::",
		"systemd-resolve:!:19000:::::::",
		"polkitd:!:19000:::::::",
	];
	for (const u of userList) {
		if (u === "root") continue;
		shadowLines.push(`${u}:!:19000:0:99999:7:::`);
	}
	vfs.writeFile("/etc/shadow", `${shadowLines.join("\n")}\n`, { mode: 0o640 });
}

// ─── /proc helpers ───────────────────────────────────────────────────────────

function ttyToPid(tty: string): number {
	const match = tty.match(/(\d+)$/);
	return 1000 + (match?.[1] ? parseInt(match[1], 10) : 0);
}

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
	ensureDir(vfs, `${dir}/net`);

	const uptimeSec = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
	const comm = cmdline.split(/\s+/)[0] ?? "bash";

	write(vfs, `${dir}/cmdline`, `${cmdline.replace(/\s+/g, "\0")}\0`);
	write(vfs, `${dir}/comm`, comm);
	write(
		vfs,
		`${dir}/status`,
		`${[
			`Name:   ${comm}`,
			`Umask:  0022`,
			`State:  S (sleeping)`,
			`Tgid:   ${pid}`,
			`Pid:    ${pid}`,
			`PPid:   1`,
			`TracerPid:      0`,
			`Uid:    0\t0\t0\t0`,
			`Gid:    0\t0\t0\t0`,
			`FDSize: 64`,
			`Groups:`,
			`VmPeak:    20480 kB`,
			`VmSize:    16384 kB`,
			`VmLck:         0 kB`,
			`VmPin:         0 kB`,
			`VmHWM:      4096 kB`,
			`VmRSS:      4096 kB`,
			`RssAnon:     512 kB`,
			`RssFile:    3584 kB`,
			`RssShmem:      0 kB`,
			`VmData:     2048 kB`,
			`VmStk:       132 kB`,
			`VmExe:       924 kB`,
			`VmLib:      2744 kB`,
			`VmPTE:        52 kB`,
			`VmSwap:        0 kB`,
			`Threads: 1`,
			`SigQ:   0/31968`,
			`SigPnd: 0000000000000000`,
			`SigBlk: 0000000000010000`,
			`SigIgn: 0000000000380004`,
			`SigCgt: 000000004b817efb`,
			`CapInh: 0000000000000000`,
			`CapPrm: 000001ffffffffff`,
			`CapEff: 000001ffffffffff`,
			`CapBnd: 000001ffffffffff`,
			`CapAmb: 0000000000000000`,
			`NoNewPrivs:     0`,
			`Seccomp:        0`,
			`voluntary_ctxt_switches:        100`,
			`nonvoluntary_ctxt_switches:     10`,
		].join("\n")}\n`,
	);
	write(
		vfs,
		`${dir}/stat`,
		`${pid} (${comm}) S 1 ${pid} ${pid} 0 -1 4194304 0 0 0 0 ${uptimeSec} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0\n`,
	);
	write(
		vfs,
		`${dir}/statm`,
		`4096 1024 768 231 0 512 0\n`,
	);
	write(
		vfs,
		`${dir}/environ`,
		`${Object.entries(env).map(([k, v]) => `${k}=${v}`).join("\0")}\0`,
	);
	write(vfs, `${dir}/cwd`, `/home/${username}\0`);
	write(vfs, `${dir}/exe`, "/bin/bash\0");
	write(vfs, `${dir}/maps`,
		"00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash\n" +
		"006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash\n" +
		"006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash\n" +
		"7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]\n" +
		"7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]\n",
	);
	write(vfs, `${dir}/limits`,
		`${[
			"Limit                     Soft Limit           Hard Limit           Units",
			"Max cpu time              unlimited            unlimited            seconds",
			"Max file size             unlimited            unlimited            bytes",
			"Max data size             unlimited            unlimited            bytes",
			"Max stack size            8388608              unlimited            bytes",
			"Max core file size        0                    unlimited            bytes",
			"Max resident set          unlimited            unlimited            bytes",
			"Max processes             31968                31968                processes",
			"Max open files            1048576              1048576              files",
			"Max locked memory         8388608              8388608              bytes",
			"Max address space         unlimited            unlimited            bytes",
			"Max file locks            unlimited            unlimited            locks",
			"Max pending signals       31968                31968                signals",
			"Max msgqueue size         819200               819200               bytes",
			"Max nice priority         0                    0",
			"Max realtime priority     0                    0",
			"Max realtime timeout      unlimited            unlimited            us",
		].join("\n")}\n`,
	);
	write(vfs, `${dir}/io`,
		"rchar: 1048576\nwchar: 65536\nsyscr: 512\nsyscw: 64\nread_bytes: 0\nwrite_bytes: 0\ncancelled_write_bytes: 0\n",
	);
	write(vfs, `${dir}/oom_score`, "0\n");
	write(vfs, `${dir}/oom_score_adj`, "0\n");
	write(vfs, `${dir}/loginuid`, "0\n");
	write(vfs, `${dir}/wchan`, "poll_schedule_timeout\n");
	write(vfs, `${dir}/schedstat`, "1000000 0 1\n");

	for (const fd of ["0", "1", "2"]) {
		ensureFile(vfs, `${dir}/fd/${fd}`, "");
		ensureFile(vfs, `${dir}/fdinfo/${fd}`,
			`pos:\t0\nflags:\t0${fd === "0" ? "2" : fd === "1" ? "1" : "1"}02\nmnt_id:\t13\n`,
		);
	}
}

// ─── /proc boot log ──────────────────────────────────────────────────────────

function bootProcLog(vfs: VirtualFileSystem, props: ShellProperties): void {
	ensureDir(vfs, "/proc/boot");
	ensureFile(
		vfs,
		"/proc/boot/log",
		`${[
			`[    0.000000] Linux version ${props.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,
			"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1",
			"[    0.000060] BIOS-provided physical RAM map:",
			"[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )",
			"[    0.000120] PCI: Using configuration type 1 for base access",
			"[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff",
			"[    0.000320] ACPI: IRQ0 used by override",
			"[    0.000420] Initializing cgroup subsys cpuset",
			"[    0.000440] Initializing cgroup subsys cpu",
			"[    0.000450] Initializing cgroup subsys cpuacct",
			"[    0.000460] Linux agpgart interface v0.103",
			"[    0.000480] PCI: pci_cache_line_size set to 64 bytes",
			"[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned",
			"[    0.000680] NET: Registered PF_INET6 protocol family",
			"[    0.000720] Freeing unused kernel image (initmem) memory",
			"[    0.000760] Write protecting the kernel read-only data",
			"[    0.000800] Run /sbin/init as init process",
			"[    0.001200] systemd[1]: Detected virtualization kvm",
			"[    0.001300] systemd[1]: Detected architecture x86-64",
			"[    0.002000] systemd[1]: Starting Fortune GNU/Linux...",
			"[    0.003000] systemd[1]: Started Journal Service",
			"[    0.010000] EXT4-fs (vda): mounted filesystem",
			"[    0.020000] systemd[1]: Reached target Basic System",
			"[    0.030000] systemd[1]: Started Login Service",
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
	const idleSec   = Math.floor(uptimeSec * 0.9);
	write(vfs, "/proc/uptime", `${uptimeSec}.00 ${idleSec}.00\n`);

	// meminfo — real host values, Linux-compatible format
	const totalMemKb   = Math.floor(os.totalmem() / 1024);
	const freeMemKb    = Math.floor(os.freemem() / 1024);
	const availMemKb   = Math.floor(freeMemKb * 0.95);
	const buffersKb    = Math.floor(totalMemKb * 0.03);
	const cachedKb     = Math.floor(totalMemKb * 0.08);
	const shmemKb      = Math.floor(totalMemKb * 0.005);
	const slabKb       = Math.floor(totalMemKb * 0.02);
	const pageTablesKb = Math.floor(totalMemKb * 0.001);
	write(
		vfs,
		"/proc/meminfo",
		`${[
			`MemTotal:       ${String(totalMemKb).padStart(10)} kB`,
			`MemFree:        ${String(freeMemKb).padStart(10)} kB`,
			`MemAvailable:   ${String(availMemKb).padStart(10)} kB`,
			`Buffers:        ${String(buffersKb).padStart(10)} kB`,
			`Cached:         ${String(cachedKb).padStart(10)} kB`,
			`SwapCached:     ${String(0).padStart(10)} kB`,
			`Active:         ${String(Math.floor((buffersKb + cachedKb) * 1.2)).padStart(10)} kB`,
			`Inactive:       ${String(Math.floor(cachedKb * 0.6)).padStart(10)} kB`,
			`Active(anon):   ${String(Math.floor(totalMemKb * 0.001)).padStart(10)} kB`,
			`Inactive(anon): ${String(Math.floor(totalMemKb * 0.006)).padStart(10)} kB`,
			`Active(file):   ${String(Math.floor(cachedKb * 1.2)).padStart(10)} kB`,
			`Inactive(file): ${String(Math.floor(cachedKb * 0.6)).padStart(10)} kB`,
			`Unevictable:    ${String(0).padStart(10)} kB`,
			`Mlocked:        ${String(0).padStart(10)} kB`,
			`SwapTotal:      ${String(0).padStart(10)} kB`,
			`SwapFree:       ${String(0).padStart(10)} kB`,
			`Zswap:          ${String(0).padStart(10)} kB`,
			`Zswapped:       ${String(0).padStart(10)} kB`,
			`Dirty:          ${String(Math.floor(Math.random() * 64)).padStart(10)} kB`,
			`Writeback:      ${String(0).padStart(10)} kB`,
			`AnonPages:      ${String(Math.floor(totalMemKb * 0.001)).padStart(10)} kB`,
			`Mapped:         ${String(Math.floor(cachedKb * 0.4)).padStart(10)} kB`,
			`Shmem:          ${String(shmemKb).padStart(10)} kB`,
			`KReclaimable:   ${String(Math.floor(slabKb * 0.6)).padStart(10)} kB`,
			`Slab:           ${String(slabKb).padStart(10)} kB`,
			`SReclaimable:   ${String(Math.floor(slabKb * 0.6)).padStart(10)} kB`,
			`SUnreclaim:     ${String(Math.floor(slabKb * 0.4)).padStart(10)} kB`,
			`KernelStack:    ${String(Math.floor(totalMemKb * 0.0005)).padStart(10)} kB`,
			`PageTables:     ${String(pageTablesKb).padStart(10)} kB`,
			`NFS_Unstable:   ${String(0).padStart(10)} kB`,
			`Bounce:         ${String(0).padStart(10)} kB`,
			`WritebackTmp:   ${String(0).padStart(10)} kB`,
			`CommitLimit:    ${String(Math.floor(totalMemKb * 0.5)).padStart(10)} kB`,
			`Committed_AS:   ${String(Math.floor(totalMemKb * 0.05)).padStart(10)} kB`,
			`VmallocTotal:   ${String(35184372087808 / 1024).padStart(10)} kB`,
			`VmallocUsed:    ${String(Math.floor(totalMemKb * 0.01)).padStart(10)} kB`,
			`VmallocChunk:   ${String(0).padStart(10)} kB`,
			`Percpu:         ${String(Math.floor(totalMemKb * 0.0001)).padStart(10)} kB`,
			`HardwareCorrupted:  ${String(0).padStart(6)} kB`,
			`AnonHugePages:  ${String(0).padStart(10)} kB`,
			`ShmemHugePages: ${String(0).padStart(10)} kB`,
			`ShmemPmdMapped: ${String(0).padStart(10)} kB`,
			`FileHugePages:  ${String(0).padStart(10)} kB`,
			`FilePmdMapped:  ${String(0).padStart(10)} kB`,
			`HugePages_Total:  ${String(0).padStart(8)}`,
			`HugePages_Free:   ${String(0).padStart(8)}`,
			`HugePages_Rsvd:   ${String(0).padStart(8)}`,
			`HugePages_Surp:   ${String(0).padStart(8)}`,
			`Hugepagesize:   ${String(2048).padStart(10)} kB`,
			`Hugetlb:        ${String(0).padStart(10)} kB`,
			`DirectMap4k:    ${String(Math.floor(totalMemKb * 0.02)).padStart(10)} kB`,
			`DirectMap2M:    ${String(Math.floor(totalMemKb * 0.98)).padStart(10)} kB`,
		].join("\n")}\n`,
	);

	// cpuinfo — real host CPU passthrough + x86 feature flags matching Firecracker Xeon
	const cpus = os.cpus();
	const cpuLines: string[] = [];
	for (let i = 0; i < cpus.length; i++) {
		const c = cpus[i];
		if (!c) continue;
		cpuLines.push(
			`processor\t: ${i}`,
			`vendor_id\t: GenuineIntel`,
			`cpu family\t: 6`,
			`model\t\t: 85`,
			`model name\t: ${c.model}`,
			`stepping\t: 7`,
			`microcode\t: 0x1`,
			`cpu MHz\t\t: ${c.speed.toFixed(3)}`,
			`cache size\t: 33792 KB`,
			`physical id\t: 0`,
			`siblings\t: ${cpus.length}`,
			`core id\t\t: ${i}`,
			`cpu cores\t: ${cpus.length}`,
			`apicid\t\t: ${i}`,
			`initial apicid\t: ${i}`,
			`fpu\t\t: yes`,
			`fpu_exception\t: yes`,
			`cpuid level\t: 13`,
			`wp\t\t: yes`,
			`flags\t\t: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities`,
			`bugs\t\t: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its`,
			`bogomips\t: ${(c.speed * 2 / 1000).toFixed(2)}`,
			`clflush size\t: 64`,
			`cache_alignment\t: 64`,
			`address sizes\t: 46 bits physical, 48 bits virtual`,
			`power management:`,
			"",
		);
	}
	write(vfs, "/proc/cpuinfo", `${cpuLines.join("\n")}\n`);

	write(
		vfs,
		"/proc/version",
		`Linux version ${props.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC\n`,
	);
	write(vfs, "/proc/hostname", `${hostname}\n`);

	// loadavg
	const load     = (Math.random() * 0.3).toFixed(2);
	const numProcs = 1 + sessions.length;
	write(vfs, "/proc/loadavg", `${load} ${load} ${load} ${numProcs}/${numProcs} 1\n`);

	// /proc/cmdline — Firecracker boot args
	write(vfs, "/proc/cmdline",
		`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1 -- --firecracker-init --addr 0.0.0.0:2024 --max-ws-buffer-size 32768 --block-local-connections\n`,
	);

	// /proc/filesystems — matching real container
	write(vfs, "/proc/filesystems",
		`${[
			"nodev\tsysfs",
			"nodev\ttmpfs",
			"nodev\tbdev",
			"nodev\tproc",
			"nodev\tcgroup",
			"nodev\tcgroup2",
			"nodev\tcpuset",
			"nodev\tdevtmpfs",
			"nodev\tbinfmt_misc",
			"nodev\tdebugfs",
			"nodev\tsecurityfs",
			"nodev\tsockfs",
			"nodev\tbpf",
			"nodev\tpipefs",
			"nodev\tramfs",
			"nodev\thugetlbfs",
			"nodev\trpc_pipefs",
			"nodev\tdevpts",
			"\text3",
			"\text2",
			"\text4",
			"\tsquashfs",
			"nodev\tnfs",
			"nodev\tnfs4",
			"nodev\tautofs",
			"\tfuseblk",
			"nodev\tfuse",
			"nodev\tfusectl",
			"nodev\toverlay",
			"\txfs",
			"nodev\tmqueue",
			"nodev\tselinuxfs",
			"nodev\tpstore",
		].join("\n")}\n`,
	);

	// /proc/mounts — virtio block device layout
	const mountsContent = `${[
		"proc /proc proc rw,relatime 0 0",
		"sysfs /sys sysfs rw,relatime 0 0",
		"devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0",
		"tmpfs /dev/shm tmpfs rw,relatime 0 0",
		"devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0",
		"tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0",
		"cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0",
		"cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0",
		"cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0",
		"cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0",
		"cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0",
		"cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0",
		"cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0",
		"cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0",
		"/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0",
		"/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0",
		"tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0",
		"tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0",
	].join("\n")}\n`;
	write(vfs, "/proc/mounts", mountsContent);
	ensureDir(vfs, "/proc/self");
	write(vfs, "/proc/self/mounts", mountsContent);

	// /proc/net
	ensureDir(vfs, "/proc/net");
	write(vfs, "/proc/net/dev",
		`${[
			"Inter-|   Receive                                                |  Transmit",
			" face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed",
			"    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0",
			"  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0",
		].join("\n")}\n`,
	);
	write(vfs, "/proc/net/if_inet6", "");
	write(vfs, "/proc/net/tcp",
		"  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode\n",
	);
	write(vfs, "/proc/net/tcp6",
		"  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode\n",
	);
	write(vfs, "/proc/net/udp",
		"  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode\n",
	);
	write(vfs, "/proc/net/route",
		"Iface\tDestination\tGateway\tFlags\tRefCnt\tUse\tMetric\tMask\t\tMTU\tWindow\tIRTT\n" +
		"eth0\t00000000\t0101A8C0\t0003\t0\t0\t100\t00000000\t0\t0\t0\n" +
		"eth0\t0000A8C0\t00000000\t0001\t0\t0\t100\t00FFFFFF\t0\t0\t0\n",
	);
	write(vfs, "/proc/net/arp",
		"IP address       HW type     Flags       HW address            Mask     Device\n",
	);
	write(vfs, "/proc/net/fib_trie", "Local:\n  +-- 0.0.0.0/0 3 0 5\n");
	write(vfs, "/proc/net/unix",
		"Num       RefCount Protocol Flags    Type St Inode Path\n" +
		"0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket\n",
	);
	write(vfs, "/proc/net/sockstat",
		"sockets: used 8\nTCP: inuse 0 orphan 0 tw 0 alloc 0 mem 0\nUDP: inuse 0 mem 0\nUDPLITE: inuse 0\nRAW: inuse 0\nFRAG: inuse 0 memory 0\n",
	);

	// /proc/partitions — virtio block devices
	write(
		vfs,
		"/proc/partitions",
		`${[
			"major minor  #blocks  name",
			"",
			" 254        0 268435456 vda",
			" 254       16      9664 vdb",
			" 254       32       656 vdc",
			" 254       48      5464 vdd",
		].join("\n")}\n`,
	);

	// /proc/swaps — no swap (matches real env: SwapTotal 0)
	write(vfs, "/proc/swaps",
		"Filename\t\t\t\tType\t\tSize\t\tUsed\t\tPriority\n",
	);

	// /proc/diskstats — virtio block device I/O counters
	write(vfs, "/proc/diskstats",
		`${[
			" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0",
			" 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0",
			" 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0",
			" 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0",
		].join("\n")}\n`,
	);

	// /proc/interrupts
	write(vfs, "/proc/interrupts",
		`           CPU0\n  0:         ${Math.floor(uptimeSec * 250)}  IO-APIC   2-edge   timer\n  1:             9  IO-APIC   1-edge   i8042\n NMI:             0  Non-maskable interrupts\n ERR:             0\n MIS:             0\n PIN:             0  Posted-interrupt notification event\n NPI:             0  Nested posted-interrupt event\n PIW:             0  Posted-interrupt wakeup event\n`,
	);

	// /proc/sys — sysctl virtual tree (real values)
	ensureDir(vfs, "/proc/sys");
	ensureDir(vfs, "/proc/sys/kernel");
	ensureDir(vfs, "/proc/sys/net");
	ensureDir(vfs, "/proc/sys/net/ipv4");
	ensureDir(vfs, "/proc/sys/net/ipv6");
	ensureDir(vfs, "/proc/sys/net/core");
	ensureDir(vfs, "/proc/sys/vm");
	ensureDir(vfs, "/proc/sys/fs");
	ensureDir(vfs, "/proc/sys/fs/inotify");

	write(vfs, "/proc/sys/kernel/hostname",              `${hostname}\n`);
	write(vfs, "/proc/sys/kernel/ostype",                "Linux\n");
	write(vfs, "/proc/sys/kernel/osrelease",             `${props.kernel}\n`);
	write(vfs, "/proc/sys/kernel/pid_max",               "32768\n");
	write(vfs, "/proc/sys/kernel/threads-max",           "31968\n");
	write(vfs, "/proc/sys/kernel/randomize_va_space",    "2\n");
	write(vfs, "/proc/sys/kernel/dmesg_restrict",        "0\n");
	write(vfs, "/proc/sys/kernel/kptr_restrict",         "0\n");
	write(vfs, "/proc/sys/kernel/perf_event_paranoid",   "2\n");
	write(vfs, "/proc/sys/kernel/printk",                "4\t4\t1\t7\n");
	write(vfs, "/proc/sys/kernel/sysrq",                 "176\n");
	write(vfs, "/proc/sys/kernel/panic",                 "1\n");
	write(vfs, "/proc/sys/kernel/panic_on_oops",         "1\n");
	write(vfs, "/proc/sys/kernel/core_pattern",          "core\n");
	write(vfs, "/proc/sys/kernel/core_uses_pid",         "0\n");
	write(vfs, "/proc/sys/kernel/ngroups_max",           "65536\n");
	write(vfs, "/proc/sys/kernel/cap_last_cap",          "40\n");
	write(vfs, "/proc/sys/kernel/unprivileged_userns_clone", "1\n");
	write(vfs, "/proc/sys/net/ipv4/ip_forward",          "0\n");
	write(vfs, "/proc/sys/net/ipv4/tcp_syncookies",      "1\n");
	write(vfs, "/proc/sys/net/ipv4/tcp_fin_timeout",     "60\n");
	write(vfs, "/proc/sys/net/ipv4/tcp_keepalive_time",  "7200\n");
	write(vfs, "/proc/sys/net/ipv4/conf/all/rp_filter",  "2\n");
	write(vfs, "/proc/sys/net/ipv6/conf/all/disable_ipv6", "1\n");
	write(vfs, "/proc/sys/net/core/somaxconn",           "4096\n");
	write(vfs, "/proc/sys/net/core/rmem_max",            "212992\n");
	write(vfs, "/proc/sys/net/core/wmem_max",            "212992\n");
	write(vfs, "/proc/sys/vm/swappiness",                "60\n");
	write(vfs, "/proc/sys/vm/overcommit_memory",         "0\n");
	write(vfs, "/proc/sys/vm/overcommit_ratio",          "50\n");
	write(vfs, "/proc/sys/vm/dirty_ratio",               "20\n");
	write(vfs, "/proc/sys/vm/dirty_background_ratio",    "10\n");
	write(vfs, "/proc/sys/vm/min_free_kbytes",           "65536\n");
	write(vfs, "/proc/sys/vm/vfs_cache_pressure",        "100\n");
	write(vfs, "/proc/sys/fs/file-max",                  "1048576\n");
	write(vfs, "/proc/sys/fs/inotify/max_user_watches",  "524288\n");
	write(vfs, "/proc/sys/fs/inotify/max_user_instances","512\n");
	write(vfs, "/proc/sys/fs/inotify/max_queued_events", "16384\n");

	// /proc/cgroups — v1 hierarchy
	write(vfs, "/proc/cgroups",
		`${[
			"#subsys_name\thierarchy\tnum_cgroups\tenabled",
			"cpuset\t5\t1\t1",
			"cpu\t1\t1\t1",
			"cpuacct\t2\t1\t1",
			"blkio\t6\t1\t1",
			"memory\t3\t1\t1",
			"devices\t4\t1\t1",
			"freezer\t7\t1\t1",
			"pids\t8\t1\t1",
		].join("\n")}\n`,
	);

	// init process (PID 1)
	writeProcPid(vfs, 1, "root", "pts/0", "/sbin/init", new Date(shellStartTime).toISOString(), {});

	// per-session processes
	for (const session of sessions) {
		const pid = ttyToPid(session.tty);
		writeProcPid(vfs, pid, session.username, session.tty, "bash", session.startedAt, {
			USER:     session.username,
			HOME:     `/home/${session.username}`,
			TERM:     "xterm-256color",
			SHELL:    "/bin/bash",
			LANG:     "en_US.UTF-8",
			PATH:     "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
			LOGNAME:  session.username,
		});
	}

	// /proc/self — mirror of most recent session
	const selfPid = sessions.length > 0 ? ttyToPid(sessions[sessions.length - 1]!.tty) : 1;
	try { vfs.remove("/proc/self"); } catch { /* ignore */ }

	const selfSrc = `/proc/${selfPid}`;
	ensureDir(vfs, "/proc/self");
	ensureDir(vfs, "/proc/self/fd");
	ensureDir(vfs, "/proc/self/fdinfo");
	ensureDir(vfs, "/proc/self/net");

	if (vfs.exists(selfSrc)) {
		for (const entry of vfs.list(selfSrc)) {
			const srcPath = `${selfSrc}/${entry}`;
			const dstPath = `/proc/self/${entry}`;
			try {
				const st = vfs.stat(srcPath);
				if (st.type === "file") write(vfs, dstPath, vfs.readFile(srcPath));
			} catch { /* skip */ }
		}
	} else {
		write(vfs, "/proc/self/cmdline",  "bash\0");
		write(vfs, "/proc/self/comm",     "bash");
		write(vfs, "/proc/self/status",   "Name:\tbash\nState:\tS (sleeping)\nPid:\t1\nPPid:\t0\n");
		write(vfs, "/proc/self/environ",  "");
		write(vfs, "/proc/self/cwd",      "/root\0");
		write(vfs, "/proc/self/exe",      "/bin/bash\0");
	}
}

// ─── /sys ─────────────────────────────────────────────────────────────────────

function bootstrapSys(vfs: VirtualFileSystem, hostname: string, props: ShellProperties): void {
	ensureDir(vfs, "/sys");

	// No real DMI in Firecracker — /sys/devices/virtual/dmi/id does not exist.
	// Expose /sys/class/net, /sys/fs/cgroup, /sys/kernel only.

	ensureDir(vfs, "/sys/devices");
	ensureDir(vfs, "/sys/devices/virtual");
	ensureDir(vfs, "/sys/devices/system");
	ensureDir(vfs, "/sys/devices/system/cpu");
	ensureDir(vfs, "/sys/devices/system/cpu/cpu0");
	ensureFile(vfs, "/sys/devices/system/cpu/cpu0/online", "1\n");
	ensureFile(vfs, "/sys/devices/system/cpu/online",  "0\n");
	ensureFile(vfs, "/sys/devices/system/cpu/possible", "0\n");
	ensureFile(vfs, "/sys/devices/system/cpu/present",  "0\n");
	ensureDir(vfs, "/sys/devices/system/node");
	ensureDir(vfs, "/sys/devices/system/node/node0");
	ensureFile(vfs, "/sys/devices/system/node/node0/cpumap", "1\n");

	ensureDir(vfs, "/sys/class");
	ensureDir(vfs, "/sys/class/net");
	ensureDir(vfs, "/sys/class/net/eth0");
	ensureFile(vfs, "/sys/class/net/eth0/operstate",  "up\n");
	ensureFile(vfs, "/sys/class/net/eth0/carrier",    "1\n");
	ensureFile(vfs, "/sys/class/net/eth0/mtu",        "1500\n");
	ensureFile(vfs, "/sys/class/net/eth0/speed",      "10000\n");
	ensureFile(vfs, "/sys/class/net/eth0/duplex",     "full\n");
	ensureFile(vfs, "/sys/class/net/eth0/address",    "aa:bb:cc:dd:ee:ff\n");
	ensureFile(vfs, "/sys/class/net/eth0/tx_queue_len","1000\n");

	const seed    = fnv1a(hostname);
	const macSeed = seed.toString(16).padStart(8, "0");
	ensureFile(vfs, "/sys/class/net/eth0/address",
		`52:54:00:${macSeed.slice(0,2)}:${macSeed.slice(2,4)}:${macSeed.slice(4,6)}\n`,
	);

	ensureDir(vfs, "/sys/class/net/lo");
	ensureFile(vfs, "/sys/class/net/lo/operstate",  "unknown\n");
	ensureFile(vfs, "/sys/class/net/lo/carrier",    "1\n");
	ensureFile(vfs, "/sys/class/net/lo/mtu",        "65536\n");
	ensureFile(vfs, "/sys/class/net/lo/address",    "00:00:00:00:00:00\n");

	ensureDir(vfs, "/sys/class/block");
	ensureDir(vfs, "/sys/class/block/vda");
	ensureFile(vfs, "/sys/class/block/vda/size",     "536870912\n");
	ensureFile(vfs, "/sys/class/block/vda/ro",       "0\n");
	ensureFile(vfs, "/sys/class/block/vda/removable","0\n");

	// cgroup fs
	ensureDir(vfs, "/sys/fs");
	ensureDir(vfs, "/sys/fs/cgroup");
	for (const subsys of ["cpu", "cpuacct", "memory", "devices", "blkio", "pids", "freezer", "unified"]) {
		ensureDir(vfs, `/sys/fs/cgroup/${subsys}`);
		if (subsys !== "unified") {
			ensureFile(vfs, `/sys/fs/cgroup/${subsys}/tasks`, "1\n");
			ensureFile(vfs, `/sys/fs/cgroup/${subsys}/notify_on_release`, "0\n");
			ensureFile(vfs, `/sys/fs/cgroup/${subsys}/release_agent`, "");
		}
	}
	ensureFile(vfs, "/sys/fs/cgroup/memory/memory.limit_in_bytes",     `${os.totalmem()}\n`);
	ensureFile(vfs, "/sys/fs/cgroup/memory/memory.usage_in_bytes",      `${os.totalmem() - os.freemem()}\n`);
	ensureFile(vfs, "/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${os.totalmem()}\n`);
	ensureFile(vfs, "/sys/fs/cgroup/cpu/cpu.cfs_period_us",             "100000\n");
	ensureFile(vfs, "/sys/fs/cgroup/cpu/cpu.cfs_quota_us",              "-1\n");
	ensureFile(vfs, "/sys/fs/cgroup/cpu/cpu.shares",                    "1024\n");

	ensureDir(vfs, "/sys/kernel");
	ensureFile(vfs, "/sys/kernel/hostname",  `${hostname}\n`);
	ensureFile(vfs, "/sys/kernel/osrelease", `${props.kernel}\n`);
	ensureFile(vfs, "/sys/kernel/ostype",    "Linux\n");

	// security
	ensureDir(vfs, "/sys/kernel/security");


	// Still; we will create virtual dmi
	ensureDir(vfs, "/sys/devices/virtual");
	ensureDir(vfs, "/sys/devices/virtual/dmi");
	ensureDir(vfs, "/sys/devices/virtual/dmi/id");
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

	// character devices — matching real Firecracker container
	ensureFile(vfs, "/dev/null",        "", 0o666);
	ensureFile(vfs, "/dev/zero",        "", 0o666);
	ensureFile(vfs, "/dev/full",        "", 0o666);
	ensureFile(vfs, "/dev/random",      "", 0o444);
	ensureFile(vfs, "/dev/urandom",     "", 0o444);
	ensureFile(vfs, "/dev/mem",         "", 0o640);
	ensureFile(vfs, "/dev/port",        "", 0o640);
	ensureFile(vfs, "/dev/kmsg",        "", 0o660);
	ensureFile(vfs, "/dev/hwrng",       "", 0o660);
	ensureFile(vfs, "/dev/fuse",        "", 0o660);
	ensureFile(vfs, "/dev/autofs",      "", 0o660);
	ensureFile(vfs, "/dev/userfaultfd", "", 0o660);
	ensureFile(vfs, "/dev/cpu_dma_latency", "", 0o660);
	ensureFile(vfs, "/dev/ptp0",        "", 0o660);

	// snapshot (KVM-specific)
	ensureFile(vfs, "/dev/snapshot",    "", 0o660);

	// terminal devices
	ensureFile(vfs, "/dev/console",     "", 0o600);
	ensureFile(vfs, "/dev/tty",         "", 0o666);
	ensureFile(vfs, "/dev/ttyS0",       "", 0o660);
	ensureFile(vfs, "/dev/ptmx",        "", 0o666);

	// tty0–63 (like real env)
	for (let i = 0; i <= 63; i++) {
		ensureFile(vfs, `/dev/tty${i}`, "", 0o620);
	}

	// vcs devices
	ensureFile(vfs, "/dev/vcs",         "", 0o620);
	ensureFile(vfs, "/dev/vcs1",        "", 0o620);
	ensureFile(vfs, "/dev/vcsa",        "", 0o620);
	ensureFile(vfs, "/dev/vcsa1",       "", 0o620);
	ensureFile(vfs, "/dev/vcsu",        "", 0o620);
	ensureFile(vfs, "/dev/vcsu1",       "", 0o620);

	// loop devices (0–7)
	for (let i = 0; i < 8; i++) {
		ensureFile(vfs, `/dev/loop${i}`, "", 0o660);
	}
	ensureDir(vfs, "/dev/loop-control");

	// virtio block devices (vda–vdd matching mounts)
	ensureFile(vfs, "/dev/vda",  "", 0o660);
	ensureFile(vfs, "/dev/vdb",  "", 0o660);
	ensureFile(vfs, "/dev/vdc",  "", 0o660);
	ensureFile(vfs, "/dev/vdd",  "", 0o660);

	// network tun
	ensureDir(vfs, "/dev/net");
	ensureFile(vfs, "/dev/net/tun", "", 0o660);

	// misc
	ensureDir(vfs, "/dev/pts");
	ensureDir(vfs, "/dev/shm");
	ensureDir(vfs, "/dev/cpu");
	ensureFile(vfs, "/dev/stdin",  "", 0o666);
	ensureFile(vfs, "/dev/stdout", "", 0o666);
	ensureFile(vfs, "/dev/stderr", "", 0o666);
	ensureDir(vfs, "/dev/fd");
	ensureFile(vfs, "/dev/vga_arbiter", "", 0o660);
	ensureFile(vfs, "/dev/vsock",       "", 0o660);
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
	ensureDir(vfs, "/usr/local/include");
	ensureDir(vfs, "/usr/local/sbin");
	ensureDir(vfs, "/usr/share");
	ensureDir(vfs, "/usr/share/doc");
	ensureDir(vfs, "/usr/share/man");
	ensureDir(vfs, "/usr/share/man/man1");
	ensureDir(vfs, "/usr/share/man/man5");
	ensureDir(vfs, "/usr/share/man/man8");
	ensureDir(vfs, "/usr/share/common-licenses");
	ensureDir(vfs, "/usr/share/ca-certificates");
	ensureDir(vfs, "/usr/share/zoneinfo");
	ensureDir(vfs, "/usr/lib");
	ensureDir(vfs, "/usr/lib/x86_64-linux-gnu");
	ensureDir(vfs, "/usr/lib/python3");
	ensureDir(vfs, "/usr/lib/python3/dist-packages");
	ensureDir(vfs, "/usr/lib/python3.12");
	ensureDir(vfs, "/usr/lib/jvm");
	ensureDir(vfs, "/usr/lib/jvm/java-21-openjdk-amd64");
	ensureDir(vfs, "/usr/lib/jvm/java-21-openjdk-amd64/bin");
	ensureDir(vfs, "/usr/lib/node_modules");
	ensureDir(vfs, "/usr/lib/node_modules/npm");
	ensureDir(vfs, "/usr/include");
	ensureDir(vfs, "/usr/src");

	// builtins — all bins present in the real container
	const builtins = [
		"sh", "bash", "ls", "cat", "echo", "grep", "find", "sort",
		"head", "tail", "cut", "tr", "sed", "awk", "wc", "tee",
		"tar", "gzip", "gunzip", "touch", "mkdir", "rm", "mv", "cp",
		"chmod", "ln", "pwd", "env", "date", "sleep", "id", "whoami",
		"hostname", "uname", "ps", "kill", "df", "du", "curl", "wget",
		"nano", "diff", "uniq", "xargs", "base64",
	];

	// From a real container
	// const builtins = [
	// 	// core
	// 	"sh", "bash", "dash",
	// 	"ls", "cat", "echo", "grep", "find", "sort",
	// 	"head", "tail", "cut", "tr", "sed", "awk", "mawk", "gawk",
	// 	"wc", "tee", "tar", "gzip", "gunzip", "bzip2", "xz",
	// 	"touch", "mkdir", "rm", "mv", "cp", "ln", "pwd",
	// 	"chmod", "chown", "chgrp", "env", "date", "sleep",
	// 	"id", "whoami", "hostname", "uname", "ps", "kill",
	// 	"df", "du", "dd", "stat", "file",
	// 	// net
	// 	"curl", "wget", "nc", "netcat", "ss", "ip",
	// 	// editors
	// 	"nano", "vi",
	// 	// text
	// 	"diff", "uniq", "xargs", "base64", "md5sum", "sha256sum",
	// 	"strings", "hexdump", "od", "column", "fmt", "paste",
	// 	"join", "comm", "split", "csplit", "fold", "expand",
	// 	// archive
	// 	"zip", "unzip",
	// 	// process
	// 	"top", "htop", "free", "uptime", "dmesg", "lsof",
	// 	"strace", "ltrace", "pgrep", "pkill", "nohup", "nice",
	// 	// fs
	// 	"mount", "umount", "lsblk", "fdisk", "blkid", "e2fsck",
	// 	// misc
	// 	"bc", "expr", "seq", "yes", "true", "false", "test",
	// 	"readlink", "realpath", "dirname", "basename", "mktemp",
	// 	"install", "make",
	// 	// dev tools
	// 	"gcc", "gcc-13", "g++", "g++-13", "cpp", "as", "ld",
	// 	"ar", "nm", "objdump", "objcopy", "strip", "size",
	// 	"cc", "c++", "pkg-config",
	// 	// package
	// 	"apt", "apt-get", "apt-cache", "dpkg", "dpkg-query",
	// 	"lsb_release", "add-apt-repository",
	// 	// scripting
	// 	"perl", "python3", "python3.12", "pipx",
	// 	// node/npm
	// 	"node", "npm", "npx",
	// 	// java
	// 	"java", "javac", "jar", "javadoc",
	// 	// security
	// 	"openssl", "gpg", "gpg2", "gpgv", "ssh", "ssh-keygen",
	// 	"sudo", "su", "passwd", "adduser", "useradd",
	// 	// misc system
	// 	"systemctl", "journalctl", "loginctl",
	// 	"timedatectl", "localectl",
	// 	"lshw", "lscpu", "lsusb", "lspci",
	// 	// text proc
	// 	"jq", "xmllint", "pandoc",
	// 	// multimedia
	// 	"ffmpeg",
	// ];

	for (const bin of builtins) {
		ensureFile(vfs, `/usr/bin/${bin}`, `#!/bin/sh\nexec builtin ${bin} "$@"\n`, 0o755);
	}

	// sbin equivalents
	const sbins = [
		"nologin", "useradd", "userdel", "groupadd", "groupdel",
		"adduser", "deluser", "shutdown", "reboot", "halt",
		"init", "service", "update-alternatives", "update-rc.d",
		"depmod", "modprobe", "insmod", "rmmod", "lsmod",
		"ifconfig", "route", "iptables", "ip6tables",
		"arp", "iwconfig", "ethtool",
		"fdisk", "parted", "mkfs.ext4", "fsck",
		"ldconfig", "ldconfig.real",
	];
	for (const bin of sbins) {
		ensureFile(vfs, `/usr/sbin/${bin}`, `#!/bin/sh\nexec builtin ${bin} "$@"\n`, 0o755);
	}

	// versioned python symlink stubs
	ensureFile(vfs, "/usr/bin/python3.12", `#!/bin/sh\nexec python3 "$@"\n`, 0o755);
	ensureFile(vfs, "/usr/bin/python3",    `#!/bin/sh\nexec python3.12 "$@"\n`, 0o755);

	// node version stubs
	ensureFile(vfs, "/usr/bin/node",  `#!/bin/sh\nexec node "$@"\n`, 0o755);
	ensureFile(vfs, "/usr/bin/npm",   `#!/bin/sh\nexec npm "$@"\n`, 0o755);
	ensureFile(vfs, "/usr/bin/npx",   `#!/bin/sh\nexec npx "$@"\n`, 0o755);

	// java stubs
	ensureFile(vfs, "/usr/lib/jvm/java-21-openjdk-amd64/bin/java",
		`#!/bin/sh\nexec java "$@"\n`, 0o755);
	ensureFile(vfs, "/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",
		`#!/bin/sh\nexec javac "$@"\n`, 0o755);

	// /usr/share/common-licenses stubs
	ensureFile(vfs, "/usr/share/common-licenses/GPL-2",   "GNU General Public License v2\n");
	ensureFile(vfs, "/usr/share/common-licenses/GPL-3",   "GNU General Public License v3\n");
	ensureFile(vfs, "/usr/share/common-licenses/LGPL-2.1","GNU Lesser General Public License v2.1\n");
	ensureFile(vfs, "/usr/share/common-licenses/Apache-2.0","Apache License 2.0\n");
	ensureFile(vfs, "/usr/share/common-licenses/MIT",     "MIT License\n");
}

// ─── /var ─────────────────────────────────────────────────────────────────────

/** Realistic dpkg status database from real container package list */
const DPKG_STATUS = `\
Package: bash
Status: install ok installed
Priority: required
Section: shells
Installed-Size: 7012
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 5.2.21-2nyx1
Depends: base-files (>= 2.1.12), fortune-utils (>= 1.0)
Description: GNU Bourne Again SHell
 bash is an sh-compatible command language interpreter that executes commands
 read from the standard input or from a file.

Package: coreutils
Status: install ok installed
Priority: required
Section: utils
Installed-Size: 18272
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 9.4-3nyx1
Depends: libacl1 (>= 2.2.23), libattr1 (>= 1:2.4.44), libc6 (>= 2.17)
Description: GNU core utilities
 This package contains the basic file, shell and text manipulation utilities.

Package: nodejs
Status: install ok installed
Priority: optional
Section: web
Installed-Size: 107120
Maintainer: NodeSource <nodejs@nodesource.com>
Architecture: amd64
Version: 22.22.2-1nyx1
Depends: libc6 (>= 2.17), libgcc-s1 (>= 3.0), libstdc++6 (>= 9.0)
Description: Node.js event-based server-side javascript engine
 Node.js is similar in design to and influenced by systems like Ruby's Twisted.

Package: python3
Status: install ok installed
Priority: important
Section: python
Installed-Size: 68
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 3.12.3-0nyx1
Depends: python3.12 (>= 3.12.3-0nyx1)
Description: interactive high-level object-oriented language (default python3)
 Python, the high-level, interactive object oriented language, includes an
 extensive class library with lots of goodies for network programming.

Package: python3.12
Status: install ok installed
Priority: optional
Section: python
Installed-Size: 36
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 3.12.3-1nyx1
Depends: python3.12-minimal (= 3.12.3-1nyx1), libpython3.12-stdlib
Description: Interactive high-level object-oriented language (version 3.12)
 Python is a high-level, interactive, object-oriented language. Its 3.12 version
 includes an extensive class library.

Package: gcc-13
Status: install ok installed
Priority: optional
Section: devel
Installed-Size: 70460
Maintainer: Fortune GCC Maintainers <gcc@fortune.local>
Architecture: amd64
Version: 13.3.0-6nyx1
Depends: cpp-13 (= 13.3.0-6nyx1), gcc-13-base (= 13.3.0-6nyx1)
Description: GNU C compiler
 This is the GNU C compiler, a fairly portable optimizing compiler for C.

Package: openjdk-21-jre-headless
Status: install ok installed
Priority: optional
Section: java
Installed-Size: 174488
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 21.0.10+7-1~nyx
Depends: libc6 (>= 2.17), libgcc-s1 (>= 3.4)
Description: OpenJDK Java runtime, using Hotspot JIT (headless)
 Minimal Java runtime - needed for executing non-graphical Java programs.

Package: curl
Status: install ok installed
Priority: standard
Section: web
Installed-Size: 544
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 8.5.0-2nyx1
Depends: libcurl4 (= 8.5.0-2nyx1), zlib1g (>= 1:1.1.4)
Description: command line tool for transferring data with URL syntax
 curl is a command line tool for transferring data with URL syntax, supporting
 DICT, FILE, FTP, FTPS, GOPHER, HTTP, HTTPS, IMAP, IMAPS, LDAP, LDAPS, POP3,
 POP3S, RTMP, RTSP, SCP, SFTP, SMTP, SMTPS, TELNET and TFTP.

Package: git
Status: install ok installed
Priority: optional
Section: vcs
Installed-Size: 36552
Maintainer: Fortune VCS Team <vcs@fortune.local>
Architecture: amd64
Version: 1:2.43.0-1nyx1
Depends: liberror-perl, git-man, libc6 (>= 2.34), libcurl3-gnutls
Description: fast, scalable, distributed revision control system
 Git is popular version control system designed to handle very large projects
 with speed and efficiency; it is used mainly for various open source projects.

Package: openssl
Status: install ok installed
Priority: optional
Section: utils
Installed-Size: 1320
Maintainer: Fortune Security Team <security@fortune.local>
Architecture: amd64
Version: 3.0.13-0nyx1
Depends: libssl3 (>= 3.0.13)
Description: Secure Sockets Layer toolkit - cryptographic utility
 This package is part of the OpenSSL project's implementation of the SSL and TLS
 cryptographic protocols and related technologies.

Package: wget
Status: install ok installed
Priority: standard
Section: web
Installed-Size: 1100
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 1.21.4-1nyx1
Depends: libc6 (>= 2.17), libgnutls30 (>= 3.7.9), libidn2-0 (>= 2.0.0)
Description: retrieves files from the web
 GNU Wget is a program for retrieving files from the web, supporting the HTTP,
 HTTPS and FTP protocols.

Package: make
Status: install ok installed
Priority: optional
Section: devel
Installed-Size: 556
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 4.3-4.1nyx1
Depends: libc6 (>= 2.17)
Description: utility for directing compilation
 GNU Make is a utility which controls the generation of executables and other
 target files of a program from the program's source files.

Package: ffmpeg
Status: install ok installed
Priority: optional
Section: video
Installed-Size: 2184
Maintainer: Fortune Multimedia Team <multimedia@fortune.local>
Architecture: amd64
Version: 7:6.1.1-3nyx1
Depends: libavcodec60, libavdevice60, libavfilter9, libavformat60, libavutil58
Description: Tools for transcoding, streaming and playing of multimedia files
 FFmpeg is a complete, cross-platform solution to record, convert and stream
 audio and video.

Package: pandoc
Status: install ok installed
Priority: optional
Section: text
Installed-Size: 96248
Maintainer: Fortune Haskell Group <haskell@fortune.local>
Architecture: amd64
Version: 3.1.3+ds-2
Depends: libgmp10, libgcc-s1, libffi8
Description: general markup converter
 Pandoc is a Haskell library for converting from one markup format to another.

Package: tesseract-ocr
Status: install ok installed
Priority: optional
Section: graphics
Installed-Size: 1736
Maintainer: Fortune OCR Team <ocr@fortune.local>
Architecture: amd64
Version: 5.3.4-1build5
Depends: libc6 (>= 2.14), libleptonica-dev
Description: Tesseract Open Source OCR Engine
 Tesseract is an Open Source OCR Engine, originally developed by HP and now
 sponsored by Google.

Package: dpkg
Status: install ok installed
Priority: required
Section: admin
Installed-Size: 6800
Maintainer: Fortune Package Team <dpkg@fortune.local>
Architecture: amd64
Version: 1.22.6nyx1
Depends: libc6 (>= 2.17), libzstd1 (>= 1.5.7)
Description: Fortune package management system
 This package provides the low-level infrastructure for handling the
 installation and removal of Fortune software packages.

Package: apt
Status: install ok installed
Priority: important
Section: admin
Installed-Size: 4236
Maintainer: Fortune Package Team <apt@fortune.local>
Architecture: amd64
Version: 2.8.3nyx1
Depends: libapt-pkg6.0 (>= 2.8.3), adduser, gpgv
Description: commandline package manager
 This package provides commandline tools for searching and managing as well as
 querying information about packages as a low-level access to all features of
 the libapt-pkg library.

Package: systemd
Status: install ok installed
Priority: optional
Section: admin
Installed-Size: 36476
Maintainer: Fortune System Team <systemd@fortune.local>
Architecture: amd64
Version: 255.4-1nyx1
Depends: libacl1 (>= 2.2.23), libblkid1 (>= 2.24), libc6 (>= 2.39)
Description: system and service manager
 systemd is a system and service manager for Linux. It provides aggressive
 parallelization capabilities, uses socket and D-Bus activation for starting
 services, offers on-demand starting of daemons, keeps track of processes using
 Linux cgroups, maintains mount and automount points, and implements an
 elaborate transactional dependency-based service control logic.

Package: nano
Status: install ok installed
Priority: important
Section: editors
Installed-Size: 888
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 7.2-2
Depends: libc6 (>= 2.17), libncursesw6 (>= 6)
Description: small, friendly text editor inspired by Pico
 GNU nano is an easy-to-use text editor originally designed as a replacement
 for Pico, the ncurses-based editor from the non-free mailer package Pine.

Package: less
Status: install ok installed
Priority: important
Section: text
Installed-Size: 344
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 1:640-2build2
Depends: libc6 (>= 2.17), libtinfo6 (>= 6)
Description: pager program similar to more
 This package provides the \`less\` command, which is similar to more but allows
 you to move backwards through the file.

`;

function bootstrapVar(vfs: VirtualFileSystem): void {
	ensureDir(vfs, "/var");
	ensureDir(vfs, "/var/log");
	ensureDir(vfs, "/var/log/apt");
	ensureDir(vfs, "/var/log/journal");
	ensureDir(vfs, "/var/log/private");
	ensureDir(vfs, "/var/tmp");
	ensureDir(vfs, "/var/cache");
	ensureDir(vfs, "/var/cache/apt");
	ensureDir(vfs, "/var/cache/apt/archives");
	ensureDir(vfs, "/var/cache/apt/archives/partial");
	ensureDir(vfs, "/var/cache/debconf");
	ensureDir(vfs, "/var/cache/ldconfig");
	ensureDir(vfs, "/var/cache/fontconfig");
	ensureDir(vfs, "/var/cache/PackageKit");
	ensureDir(vfs, "/var/lib");
	ensureDir(vfs, "/var/lib/apt");
	ensureDir(vfs, "/var/lib/apt/lists");
	ensureDir(vfs, "/var/lib/apt/lists/partial");
	ensureDir(vfs, "/var/lib/dpkg");
	ensureDir(vfs, "/var/lib/dpkg/info");
	ensureDir(vfs, "/var/lib/dpkg/updates");
	ensureDir(vfs, "/var/lib/dpkg/alternatives");
	ensureDir(vfs, "/var/lib/misc");
	ensureDir(vfs, "/var/lib/systemd");
	ensureDir(vfs, "/var/lib/systemd/coredump");
	ensureDir(vfs, "/var/lib/pam");
	ensureDir(vfs, "/var/lib/git");
	ensureDir(vfs, "/var/lib/PackageKit");
	ensureDir(vfs, "/var/lib/python");
	ensureDir(vfs, "/var/spool");
	ensureDir(vfs, "/var/spool/cron");
	ensureDir(vfs, "/var/spool/mail");
	ensureDir(vfs, "/var/mail");
	ensureDir(vfs, "/var/backups");
	ensureDir(vfs, "/var/www");

	// dpkg status — realistic package database
	ensureFile(vfs, "/var/lib/dpkg/status", DPKG_STATUS);
	ensureFile(vfs, "/var/lib/dpkg/available", "");
	ensureFile(vfs, "/var/lib/dpkg/lock", "");
	ensureFile(vfs, "/var/lib/dpkg/lock-frontend", "");

	// apt state
	ensureFile(vfs, "/var/lib/apt/lists/lock", "");
	ensureFile(vfs, "/var/cache/apt/pkgcache.bin", "");
	ensureFile(vfs, "/var/cache/apt/srcpkgcache.bin", "");

	// syslog stubs
	ensureFile(vfs, "/var/log/syslog",
		`${new Date().toUTCString()} ${""} kernel: Virtual container started\n`,
	);
	ensureFile(vfs, "/var/log/auth.log",        "");
	ensureFile(vfs, "/var/log/kern.log",         "");
	ensureFile(vfs, "/var/log/dpkg.log",         "");
	ensureFile(vfs, "/var/log/apt/history.log",  "");
	ensureFile(vfs, "/var/log/apt/term.log",     "");
	ensureFile(vfs, "/var/log/faillog",          "");
	ensureFile(vfs, "/var/log/lastlog",          "");
	ensureFile(vfs, "/var/log/wtmp",             "");
	ensureFile(vfs, "/var/log/btmp",             "");
	ensureFile(vfs, "/var/log/alternatives.log", "");

	// /run
	ensureDir(vfs, "/run");
	ensureDir(vfs, "/run/lock");
	ensureDir(vfs, "/run/lock/subsys");
	ensureDir(vfs, "/run/systemd");
	ensureDir(vfs, "/run/systemd/ask-password");
	ensureDir(vfs, "/run/systemd/sessions");
	ensureDir(vfs, "/run/systemd/users");
	ensureDir(vfs, "/run/user");
	ensureDir(vfs, "/run/dbus");
	ensureDir(vfs, "/run/adduser");
	ensureFile(vfs, "/run/utmp", "");
	ensureFile(vfs, "/run/dbus/system_bus_socket", "");
}

// ─── /bin + /sbin symlinks ────────────────────────────────────────────────────

function bootstrapBin(vfs: VirtualFileSystem): void {
	// Modern Fortune Nyx: /bin and /sbin are symlinks to /usr/bin and /usr/sbin
	if (!vfs.exists("/bin"))  vfs.symlink("/usr/bin",  "/bin");
	if (!vfs.exists("/sbin")) vfs.symlink("/usr/sbin", "/sbin");

	// /var/run → /run (systemd compat)
	if (!vfs.exists("/var/run")) vfs.symlink("/run", "/var/run");

	ensureDir(vfs, "/lib");
	ensureDir(vfs, "/lib64");
	ensureDir(vfs, "/lib/x86_64-linux-gnu");
	ensureDir(vfs, "/lib/modules");

	// lib64 symlink (standard on x86_64)
	if (!vfs.exists("/lib64/ld-linux-x86-64.so.2")) {
		ensureFile(vfs, "/lib64/ld-linux-x86-64.so.2", "", 0o755);
	}
}

// ─── /tmp ─────────────────────────────────────────────────────────────────────

function bootstrapTmp(vfs: VirtualFileSystem): void {
	ensureDir(vfs, "/tmp", 0o1777);
	// node compile cache dir (present in real env)
	ensureDir(vfs, "/tmp/node-compile-cache", 0o1777);
}

// ─── /root home ───────────────────────────────────────────────────────────────

function bootstrapRoot(vfs: VirtualFileSystem): void {
	ensureDir(vfs, "/root", 0o700);
	ensureDir(vfs, "/root/.ssh", 0o700);
	ensureDir(vfs, "/root/.config", 0o755);
	ensureDir(vfs, "/root/.config/pip", 0o755);
	ensureDir(vfs, "/root/.local", 0o755);
	ensureDir(vfs, "/root/.local/share", 0o755);
	ensureFile(
		vfs,
		"/root/.bashrc",
		`${[
			"# root .bashrc",
			"export PS1='\\[\\033[0;31m\\]\\u@\\h\\[\\033[0m\\]:\\[\\033[0;34m\\]\\w\\[\\033[0m\\]# '",
			"export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
			"export LANG=en_US.UTF-8",
			"alias ll='ls -la'",
			"alias la='ls -A'",
			"alias l='ls -CF'",
		].join("\n")}\n`,
	);
	ensureFile(vfs, "/root/.profile",
		"[ -f ~/.bashrc ] && . ~/.bashrc\n",
	);
	ensureFile(vfs, "/root/.bash_logout",
		"# ~/.bash_logout\n",
	);
	ensureFile(vfs, "/root/.config/pip/pip.conf",
		"[global]\nbreak-system-packages = true\n",
	);
}

// ─── /opt /srv /mnt /media ────────────────────────────────────────────────────

function bootstrapMisc(vfs: VirtualFileSystem, props: ShellProperties): void {
	ensureDir(vfs, "/opt");
	ensureDir(vfs, "/opt/rclone");
	ensureDir(vfs, "/srv");
	ensureDir(vfs, "/mnt");
	ensureDir(vfs, "/media");

	// /boot — no kernel images in Firecracker containers (kernel is external),
	// but maintain the directory structure for tool compatibility
	ensureDir(vfs, "/boot");
	ensureDir(vfs, "/boot/grub");
	ensureFile(vfs, "/boot/grub/grub.cfg",
		`${[
			"# GRUB configuration (virtual)",
			"set default=0",
			"set timeout=0",
			"",
			`menuentry "Fortune GNU/Linux" {`,
			`  linux   /vmlinuz-${props.kernel} root=/dev/vda rw console=ttyS0`,
			`  initrd  /initrd.img-${props.kernel}`,
			`}`,
		].join("\n")}\n`,
	);

	const kver = props.kernel;
	ensureFile(vfs, `/boot/vmlinuz-${kver}`,         "", 0o644);
	ensureFile(vfs, `/boot/initrd.img-${kver}`,       "", 0o644);
	ensureFile(vfs, `/boot/System.map-${kver}`,       `${kver} virtual\n`, 0o644);
	ensureFile(vfs, `/boot/config-${kver}`,           `# Linux kernel config ${kver}\nCONFIG_VIRTIO=y\nCONFIG_VIRTIO_BLK=y\nCONFIG_VIRTIO_NET=y\nCONFIG_KVM_GUEST=y\n`, 0o644);

	if (!vfs.exists("/vmlinuz"))        vfs.symlink(`/boot/vmlinuz-${kver}`,   "/vmlinuz");
	if (!vfs.exists("/vmlinuz.old"))    vfs.symlink(`/boot/vmlinuz-${kver}`,   "/vmlinuz.old");
	if (!vfs.exists("/initrd.img"))     vfs.symlink(`/boot/initrd.img-${kver}`,"/initrd.img");
	if (!vfs.exists("/initrd.img.old")) vfs.symlink(`/boot/initrd.img-${kver}`,"/initrd.img.old");

	// No /snap — not present in Firecracker container
	// /proc/cmdline confirms: no snapd boot args

	// /lost+found — ext4 recovery
	ensureDir(vfs, "/lost+found", 0o700);

	// /home — users managed by bootstrapRoot + syncEtcPasswd
	ensureDir(vfs, "/home");
}

// ── Static rootfs snapshot cache ─────────────────────────────────────────────

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
	const key    = _staticCacheKey(hostname, props);
	const cached = _staticRootfsCache.get(key);
	if (cached) return cached;

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
	const snapshot = getStaticRootfsSnapshot(hostname, props);
	const hasRestoredData = vfs.getMode() === "fs" && vfs.exists("/home");

	if (hasRestoredData) {
		// Snapshot was already restored — merge static rootfs without
		// clobbering user files and directories.
		vfs.mergeRootTree(decodeVfs(snapshot));
	} else {
		// Fresh start — replace the empty tree with the full static rootfs.
		vfs.importRootTree(decodeVfs(snapshot));
	}

	bootstrapRoot(vfs);
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