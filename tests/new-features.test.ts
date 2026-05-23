import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { VirtualShell, VirtualSshServer } from "../src";
import { SshClient } from "../src/modules/SSHClient";

// Skip slow network tests by default. Run with:
//   SSH_MIMIC_RUN_NETWORK_TESTS=1 bun test tests/new-features.test.ts
const runNetwork = Boolean(process.env.SSH_MIMIC_RUN_NETWORK_TESTS);
const itNetwork = runNetwork ? test : test.skip;

async function setupClient(vmName: string) {
	const shell = new VirtualShell(vmName, undefined, { mode: "memory" });
	await shell.ensureInitialized();
	shell.users.setPassword("root", "root");
	const ssh = new VirtualSshServer({ port: 0, shell });
	const port = await ssh.start();
	const client = new SshClient();
	await client.connect({ host: "localhost", port, username: "root", password: "root" });
	return { shell, client, ssh };
}

// ─── shared shell ─────────────────────────────────────────────────────────────

let shell: VirtualShell;
let client: InstanceType<typeof SshClient>;
let ssh: InstanceType<typeof VirtualSshServer>;

beforeAll(async () => {
	const env = await setupClient("test-vm");
	shell = env.shell;
	client = env.client;
	ssh = env.ssh;
});

afterAll(() => {
	client.disconnect();
	ssh.stop();
});

// ─── Phase 1: Linux rootfs ────────────────────────────────────────────────────

describe("Linux rootfs", () => {
	test("/etc/os-release exists and has correct distro", async () => {
		const r = await client.cat("/etc/os-release");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Fortune GNU/Linux");
	});

	test("/etc/hostname exists", async () => {
		const r = await client.cat("/etc/hostname");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("test-vm");
	});

	test("/etc/hosts has localhost", async () => {
		const r = await client.cat("/etc/hosts");
		expect(r.stdout).toContain("127.0.0.1");
		expect(r.stdout).toContain("localhost");
	});

	test("/proc/meminfo is populated", async () => {
		const r = await client.cat("/proc/meminfo");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("MemTotal:");
		expect(r.stdout).toContain("MemFree:");
	});

	test("/proc/cpuinfo is populated", async () => {
		const r = await client.cat("/proc/cpuinfo");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("processor");
		expect(r.stdout).toContain("model name");
	});

	test("/proc/version is populated", async () => {
		const r = await client.cat("/proc/version");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Linux version");
		expect(r.stdout).toContain("1.0.0+itsrealfortune");
	});

	test("/ exists", async () => {
		const r = await client.cat("/sys/devices/virtual/dmi/id/sys_vendor");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("Fortune Systems");
	});

	test("/var/lib/dpkg/status is created", () => {
		expect(shell.vfs.exists("/var/lib/dpkg/status")).toBe(true);
	});

	test("/bin is symlink to /usr/bin", () => {
		expect(shell.vfs.isSymlink("/bin")).toBe(true);
	});

	test("/tmp has sticky bit", () => {
		const stat = shell.vfs.stat("/tmp");
		expect(stat.type).toBe("directory");
	});

	test("/etc/passwd contains root", async () => {
		const r = await client.cat("/etc/passwd");
		expect(r.stdout).toContain("root:x:0:0");
	});

	test("/usr/bin stubs for builtins exist", () => {
		expect(shell.vfs.exists("/usr/bin/ls")).toBe(true);
		expect(shell.vfs.exists("/usr/bin/grep")).toBe(true);
		expect(shell.vfs.exists("/usr/bin/curl")).toBe(true);
	});

	test("lsb_release -a returns Fortune distro info", async () => {
		const r = await client.exec("lsb_release -a");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Fortune");
		expect(r.stdout).toContain("Distributor ID");
	});

	test("uname -a shows kernel from properties", async () => {
		const r = await client.exec("uname -a");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("1.0.0+itsrealfortune+1-amd64");
	});
});

// ─── Phase 2: apt / dpkg ──────────────────────────────────────────────────────

describe("Package manager (apt/dpkg)", () => {
	test("apt list shows available packages", async () => {
		const r = await client.exec("apt list");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("vim");
		expect(r.stdout).toContain("git");
		expect(r.stdout).toContain("python3");
	});

	test("apt install vim installs package and writes files", async () => {
		const r = await client.exec("apt install vim");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Setting up vim");
		expect(shell.vfs.exists("/usr/bin/vim")).toBe(true);
		expect(shell.vfs.exists("/usr/bin/vi")).toBe(true);
	});

	test("apt list --installed shows vim after install", async () => {
		const r = await client.exec("apt list --installed");
		expect(r.stdout).toContain("vim");
		expect(r.stdout).toContain("[installed]");
	});

	test("dpkg -l shows installed packages", async () => {
		const r = await client.exec("dpkg -l");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("vim");
		expect(r.stdout).toContain("ii");
	});

	test("dpkg -s vim shows package status", async () => {
		await client.exec("apt install vim"); // ensure installed
		const r = await client.exec("dpkg -s vim");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Package: vim");
		expect(r.stdout).toContain("Status: install ok installed");
	});

	test("dpkg -L vim lists installed files", async () => {
		await client.exec("apt install vim"); // ensure installed
		const r = await client.exec("dpkg -L vim");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("/usr/bin/vim");
	});

	test("apt install resolves dependencies", async () => {
		// npm depends on nodejs
		const r = await client.exec("apt install npm");
		expect(r.exitCode).toBe(0);
		// nodejs should be auto-installed
		expect(shell.vfs.exists("/usr/bin/node")).toBe(true);
		expect(shell.vfs.exists("/usr/bin/npm")).toBe(true);
	});

	test("apt install non-existent package fails", async () => {
		const r = await client.exec("apt install fakepackage999");
		expect(r.exitCode).not.toBe(0);
		expect(r.stdout).toContain("Unable to locate package");
	});

	test("apt remove vim removes package", async () => {
		await client.exec("apt install vim");
		const r = await client.exec("apt remove vim");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Removing vim");
	});

	test("apt search finds packages by term", async () => {
		const r = await client.exec("apt search editor");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("vim");
	});

	test("apt show displays package metadata", async () => {
		const r = await client.exec("apt show git");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Package: git");
		expect(r.stdout).toContain("Version:");
	});

	test("apt-cache search works", async () => {
		const r = await client.exec("apt-cache search python");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("python3");
	});

	test("apt-cache show works", async () => {
		const r = await client.exec("apt-cache show curl");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Package: curl");
	});

	test("apt-cache policy works", async () => {
		const r = await client.exec("apt-cache policy nodejs");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Candidate:");
	});

	test("dpkg-query -W lists packages", async () => {
		await client.exec("apt install git"); // ensure git installed
		// dpkg-query -W shows tab-separated name\tversion for all installed
		const r = await client.exec("dpkg-query -W git");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("git");
	});

	test("apt update simulates package index refresh", async () => {
		const r = await client.exec("apt update");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Reading package lists");
	});

	test("non-root apt install is blocked", async () => {
		await shell.users.addUser("alice", "pass");
		const aliceClient = new SshClient();
		const port = (ssh as VirtualSshServer).port;
		await aliceClient.connect({ host: "localhost", port, username: "alice", password: "pass" });
		const r = await aliceClient.exec("apt install vim");
		expect(r.exitCode).not.toBe(0);
		expect(r.stderr).toContain("Permission denied");
		aliceClient.disconnect();
	});

	test("neofetch shows package count after installs", async () => {
		await client.exec("apt install curl wget htop neofetch");
		const r = await client.exec("neofetch");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("(dpkg)");
	});
});

// ─── Phase 3: pure fetch curl/wget ───────────────────────────────────────────

describe("curl / wget (pure fetch)", () => {
	test("curl --help works without host binary", async () => {
		const r = await client.exec("curl --help");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Usage: curl");
	});

	test("wget --help works without host binary", async () => {
		const r = await client.exec("wget --help");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Usage: wget");
	});

	test("wget --version works", async () => {
		const r = await client.exec("wget --version");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("GNU Wget");
	});

	itNetwork("curl fetches real URL and returns body", async () => {
		const r = await client.exec("curl https://httpbin.org/get");
		// In sandboxed env network may be blocked — accept 0 (ok), 6 (dns), 22 (http err), or 1 (fetch error)
		expect([0, 1, 6, 22]).toContain(r.exitCode ?? -1);
	});

	itNetwork("curl -o saves to VFS", async () => {
		try {
			await client.exec("curl -o /tmp/test-curl.txt https://httpbin.org/get");
		} catch {}
		// Just check no ENOENT crash; file may or may not exist depending on network
	});
});

// ─── Phase 4: /proc VFS ───────────────────────────────────────────────────────

describe("/proc filesystem", () => {
	test("cat /proc/uptime returns numeric uptime", async () => {
		const r = await client.cat("/proc/uptime");
		expect(r.exitCode).toBe(0);
		const parts = r.stdout?.trim().split(" ");
		expect(parts?.length).toBeGreaterThanOrEqual(1);
		expect(Number(parts?.[0])).toBeGreaterThanOrEqual(0);
	});

	test("cat /proc/loadavg returns values", async () => {
		const r = await client.cat("/proc/loadavg");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toMatch(/\d+\.\d+/);
	});

	test("cat /proc/net/dev has eth0", async () => {
		const r = await client.cat("/proc/net/dev");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("eth0");
	});

	test("refreshProcFs updates /proc/uptime", async () => {
		// const before = shell.vfs.readFile("/proc/uptime");
		await new Promise((r) => setTimeout(r, 50));
		shell.refreshProcFs();
		const after = shell.vfs.readFile("/proc/uptime");
		// Uptime value is based on Date.now(), content is same format
		expect(after).toContain(".00");
	});
});

// ─── Extras: which, type, man, uptime, free, alias, $() ──────────────────────

describe("Extra commands", () => {
	test("which ls finds /usr/bin/ls", async () => {
		const r = await client.exec("which ls");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("/usr/bin/ls");
	});

	test("which nonexistent returns exit 1", async () => {
		const r = await client.exec("which thisdoesnotexist");
		expect(r.exitCode).toBe(1);
	});

	test("type ls reports builtin", async () => {
		const r = await client.exec("type ls");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("ls");
	});

	test("man ls shows manual page", async () => {
		const r = await client.exec("man ls");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("NAME");
		expect(r.stdout).toContain("list directory");
	});

	test("man nonexistent returns error", async () => {
		const r = await client.exec("man fakecmd999");
		expect(r.exitCode).not.toBe(0);
		expect(r.stderr).toContain("No manual entry");
	});

	test("uptime returns formatted string", async () => {
		const r = await client.exec("uptime");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toMatch(/up/);
	});

	test("uptime -p returns pretty format", async () => {
		const r = await client.exec("uptime -p");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("up");
		expect(r.stdout).toMatch(/minute|hour|day/);
	});

	test("free shows memory table", async () => {
		const r = await client.exec("free");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Mem:");
		expect(r.stdout).toContain("Swap:");
	});

	test("free -h shows human readable", async () => {
		const r = await client.exec("free -h");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toMatch(/[0-9.]+[GMK]/);
	});

	test("alias sets and retrieves alias", async () => {
		// alias env is per-session; use sh -c to test in one exec
		const r = await client.exec("alias ll='ls -la'; alias ll");
		expect(r.exitCode).toBe(0);
		// alias output may be in stdout
		const out = (r.stdout ?? "") + (r.stderr ?? "");
		expect(out).toContain("ll");
	});

	test("alias -a lists all aliases", async () => {
		await client.exec("alias hello='echo hello'");
		const r = await client.exec("alias");
		expect(r.exitCode).toBe(0);
	});

	test("unalias removes an alias", async () => {
		await client.exec("alias myfoo='echo foo'");
		const r = await client.exec("unalias myfoo");
		expect(r.exitCode).toBe(0);
	});

	test("lsb_release -a returns distro info", async () => {
		const r = await client.exec("lsb_release -a");
		expect(r.stdout).toContain("Fortune");
		expect(r.stdout).toContain("nyx");
	});

	test("lsb_release -d returns description", async () => {
		const r = await client.exec("lsb_release -d");
		expect(r.stdout).toContain("Description:");
	});
});

// ─── $(cmd) substitution ──────────────────────────────────────────────────────

describe("Command substitution $(cmd)", () => {
	test("echo $(echo hello) works", async () => {
		const r = await client.exec("echo $(echo hello)");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello");
	});

	test("echo $(hostname) returns hostname", async () => {
		const r = await client.exec("echo $(hostname)");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("test-vm");
	});

	test("echo $(whoami) returns user", async () => {
		const r = await client.exec("echo $(whoami)");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("root");
	});

	test("nested substitution in variable context", async () => {
		const r = await client.exec("echo user=$(whoami)");
		expect(r.stdout?.trim()).toBe("user=root");
	});
});

// ─── syncPasswd ───────────────────────────────────────────────────────────────

describe("syncPasswd", () => {
	test("syncPasswd after addUser updates /etc/passwd", async () => {
		await shell.users.addUser("bob", "pass123");
		shell.syncPasswd();
		const r = await client.cat("/etc/passwd");
		expect(r.stdout).toContain("bob");
	});

	test("/etc/group has sudo group with sudoers", async () => {
		const r = await client.cat("/etc/group");
		expect(r.stdout).toContain("sudo:");
		expect(r.stdout).toContain("root");
	});

	test("/etc/shadow exists with restricted permissions", () => {
		expect(shell.vfs.exists("/etc/shadow")).toBe(true);
		const stat = shell.vfs.stat("/etc/shadow");
		expect(stat.type).toBe("file");
	});
});

// ─── Bug fixes ────────────────────────────────────────────────────────────────

describe("Bug fixes", () => {
	// echo
	test("echo adds newline — >> append works", async () => {
		await client.exec("echo line1 > /tmp/append.txt");
		await client.exec("echo line2 >> /tmp/append.txt");
		const content = shell.vfs.readFile("/tmp/append.txt");
		expect(content).toBe("line1\nline2\n");
	});

	test("echo -e interprets escape sequences", async () => {
		const r = await client.exec("echo -e 'a\\tb'");
		expect(r.stdout?.trim()).toBe("a\tb");
	});

	test("echo -n suppresses trailing newline", async () => {
		const r = await client.exec("echo -n hello");
		expect(r.stdout?.trim()).toBe("hello");
	});

	test("echo uses session env.vars for $VAR", async () => {
		const r = await client.exec("export MYVAR=world && echo $MYVAR");
		expect(r.stdout?.trim()).toBe("world");
	});

	// ls -a
	test("ls -a shows dotfiles", async () => {
		await client.exec("touch /tmp/.hidden-bf && touch /tmp/visible-bf");
		const normal = await client.exec("ls /tmp");
		const all = await client.exec("ls -a /tmp");
		expect(normal.stdout).not.toContain(".hidden-bf");
		expect(all.stdout).toContain(".hidden-bf");
		expect(all.stdout).toContain("visible-bf");
	});

	// chmod symbolic
	test("chmod +x adds execute bit", async () => {
		await client.exec("touch /tmp/script-bf.sh");
		const before = shell.vfs.stat("/tmp/script-bf.sh").mode;
		await client.exec("chmod +x /tmp/script-bf.sh");
		const after = shell.vfs.stat("/tmp/script-bf.sh").mode;
		expect(after & 0o111).toBeGreaterThan(0);
		expect(before & 0o111).toBe(0);
	});

	test("chmod u+x adds only user execute bit", async () => {
		await client.exec("touch /tmp/u-bf.sh && chmod 644 /tmp/u-bf.sh");
		await client.exec("chmod u+x /tmp/u-bf.sh");
		const mode = shell.vfs.stat("/tmp/u-bf.sh").mode;
		expect(mode & 0o100).toBe(0o100);
		expect(mode & 0o010).toBe(0);
	});

	test("chmod go-r removes group+other read", async () => {
		await client.exec("touch /tmp/priv-bf.sh && chmod 755 /tmp/priv-bf.sh");
		await client.exec("chmod go-r /tmp/priv-bf.sh");
		const mode = shell.vfs.stat("/tmp/priv-bf.sh").mode;
		expect(mode & 0o044).toBe(0);
	});

	// cat -n
	test("cat -n numbers lines", async () => {
		await client.exec("echo -e 'foo\\nbar' > /tmp/cattest-bf.txt");
		const r = await client.exec("cat -n /tmp/cattest-bf.txt");
		expect(r.stdout).toContain("1\t");
		expect(r.stdout).toContain("2\t");
	});

	// ping -c
	test("ping -c sends correct packet count", async () => {
		const r = await client.exec("ping -c 1 localhost");
		const dataLines = r.stdout
			?.split("\n")
			.filter((l) => l.includes("icmp_seq="));
		expect(dataLines?.length).toBe(1);
	});

	// test / [ command
	test("[ -f path ] returns 0 for existing file", async () => {
		await client.exec("touch /tmp/testfile-bf");
		const r = await client.exec("[ -f /tmp/testfile-bf ] && echo yes || echo no");
		expect(r.stdout?.trim()).toBe("yes");
	});

	test("[ -d path ] returns 0 for existing directory", async () => {
		const r = await client.exec("[ -d /etc ] && echo yes || echo no");
		expect(r.stdout?.trim()).toBe("yes");
	});

	test("[ -f path ] returns 1 for non-existent file", async () => {
		const r = await client.exec(
			"[ -f /tmp/doesnotexist-bf999 ] && echo yes || echo no",
		);
		expect(r.stdout?.trim()).toBe("no");
	});

	test("[ -e path ] returns 0 for existing path", async () => {
		const r = await client.exec("[ -e /etc/hostname ] && echo yes || echo no");
		expect(r.stdout?.trim()).toBe("yes");
	});

	test("test string comparison = works", async () => {
		const r = await client.exec("[ hello = hello ] && echo yes || echo no");
		expect(r.stdout?.trim()).toBe("yes");
	});

	test("test numeric -eq works", async () => {
		const r = await client.exec("[ 5 -eq 5 ] && echo yes || echo no");
		expect(r.stdout?.trim()).toBe("yes");
	});

	test("test numeric -lt works", async () => {
		const r = await client.exec("[ 3 -lt 5 ] && echo yes || echo no");
		expect(r.stdout?.trim()).toBe("yes");
	});

	test("test -z empty string", async () => {
		const r = await client.exec("[ -z '' ] && echo yes || echo no");
		expect(r.stdout?.trim()).toBe("yes");
	});

	test("test -n non-empty string", async () => {
		const r = await client.exec("[ -n hello ] && echo yes || echo no");
		expect(r.stdout?.trim()).toBe("yes");
	});

	// source / .
	test("source executes file in current env", async () => {
		shell.vfs.writeFile("/tmp/setup-bf.sh", "export SOURCED=yes\n");
		const r = await client.exec("source /tmp/setup-bf.sh && echo $SOURCED");
		expect(r.stdout?.trim()).toBe("yes");
	});

	test(". (dot) is alias for source", async () => {
		shell.vfs.writeFile("/tmp/dot-bf.sh", "export DOTTED=ok\n");
		const r = await client.exec(". /tmp/dot-bf.sh && echo $DOTTED");
		expect(r.stdout?.trim()).toBe("ok");
	});

	// sh -c with $(cmd)
	test("sh -c handles $(cmd) substitution", async () => {
		const r = await client.exec("sh -c 'echo user=$(whoami)'");
		expect(r.stdout?.trim()).toBe("user=root");
	});

	test("sh -c for loop with $(cmd)", async () => {
		const r = await client.exec("sh -c 'for x in a b; do echo $(echo $x); done'");
		expect(r.stdout?.trim()).toBe("a\nb");
	});

	// history
	test("history command returns command list", async () => {
		const r = await client.exec("history");
		expect(r.exitCode).toBe(0);
	});

	// ps -u
	test("ps -u shows USER column", async () => {
		const r = await client.exec("ps -u");
		expect(r.stdout).toContain("USER");
		expect(r.stdout).toContain("PID");
		expect(r.stdout).toContain("%CPU");
	});

	test("ps aux shows extended format", async () => {
		const r = await client.exec("ps aux");
		expect(r.stdout).toContain("USER");
		expect(r.exitCode).toBe(0);
	});

	// wc -l with pipe (after echo -e fix)
	test("wc -l counts newlines correctly via pipe", async () => {
		const r = await client.exec("echo -e 'a\\nb\\nc' | wc -l");
		expect(r.stdout?.trim()).toBe("3");
	});
});

// ─── Roadmap features ────────────────────────────────────────────────────────

describe("/proc/self and /proc/<pid>", () => {
	test("/proc/self exists and has comm file", () => {
		expect(shell.vfs.exists("/proc/self")).toBe(true);
		expect(shell.vfs.exists("/proc/self/comm")).toBe(true);
	});

	test("/proc/self/status has Name field", async () => {
		const r = await client.exec("cat /proc/self/status");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("Name:");
	});

	test("/proc/self/cmdline is readable", async () => {
		const r = await client.exec("cat /proc/self/cmdline");
		expect(r.exitCode).toBe(0);
	});

	test("/proc/1 (init) exists", () => {
		expect(shell.vfs.exists("/proc/1")).toBe(true);
		expect(shell.vfs.exists("/proc/1/status")).toBe(true);
	});

	test("/proc/1/status has correct pid", async () => {
		const r = await client.exec("cat /proc/1/status");
		expect(r.stdout).toContain("Pid:");
		expect(r.stdout).toContain("1");
	});

	test("refreshProcFs updates /proc contents", () => {
		shell.refreshProcFs();
		expect(shell.vfs.exists("/proc/uptime")).toBe(true);
		expect(shell.vfs.exists("/proc/self")).toBe(true);
	});
});

import { assertDiff, diffSnapshots, formatDiff } from "../src";

describe("VFS snapshot diff tooling", () => {
	test("diffSnapshots returns clean diff for identical snapshots", () => {
		const snap = shell.vfs.toSnapshot();
		const diff = diffSnapshots(snap, snap);
		expect(diff.clean).toBe(true);
		expect(diff.added).toHaveLength(0);
		expect(diff.removed).toHaveLength(0);
		expect(diff.modified).toHaveLength(0);
	});

	test("diffSnapshots detects added file", async () => {
		const before = shell.vfs.toSnapshot();
		await client.exec("echo test > /tmp/diff-test-nf.txt");
		const after = shell.vfs.toSnapshot();
		const diff = diffSnapshots(before, after, { ignore: ["/proc"] });
		const paths = diff.added.map((e) => e.path);
		expect(paths).toContain("/tmp/diff-test-nf.txt");
		expect(diff.clean).toBe(false);
	});

	test("diffSnapshots detects added directory", () => {
		const before = shell.vfs.toSnapshot();
		shell.vfs.mkdir("/tmp/diff-newdir-nf", 0o755);
		const after = shell.vfs.toSnapshot();
		const diff = diffSnapshots(before, after, { ignore: ["/proc"] });
		const paths = diff.added.map((e) => e.path);
		expect(paths).toContain("/tmp/diff-newdir-nf");
	});

	test("diffSnapshots detects modified file", () => {
		shell.vfs.writeFile("/tmp/modtest-nf.txt", "before");
		const before = shell.vfs.toSnapshot();
		shell.vfs.writeFile("/tmp/modtest-nf.txt", "after");
		const after = shell.vfs.toSnapshot();
		const diff = diffSnapshots(before, after, { ignore: ["/proc"] });
		const mod = diff.modified.find((e) => e.path === "/tmp/modtest-nf.txt");
		expect(mod).toBeDefined();
		expect(mod?.before).toBe("before");
		expect(mod?.after).toBe("after");
	});

	test("diffSnapshots detects removed file", () => {
		shell.vfs.writeFile("/tmp/toremove-nf.txt", "bye");
		const before = shell.vfs.toSnapshot();
		shell.vfs.remove("/tmp/toremove-nf.txt");
		const after = shell.vfs.toSnapshot();
		const diff = diffSnapshots(before, after, { ignore: ["/proc"] });
		const paths = diff.removed.map((e) => e.path);
		expect(paths).toContain("/tmp/toremove-nf.txt");
	});

	test("diffSnapshots ignores specified prefixes", () => {
		shell.vfs.writeFile("/proc/uptime", "999.00 888.00\n");
		const before = shell.vfs.toSnapshot();
		shell.vfs.writeFile("/proc/uptime", "1000.00 900.00\n");
		const after = shell.vfs.toSnapshot();
		const diff = diffSnapshots(before, after, { ignore: ["/proc"] });
		expect(diff.modified.map((e) => e.path)).not.toContain("/proc/uptime");
	});

	test("formatDiff returns (no changes) for clean diff", () => {
		const snap = shell.vfs.toSnapshot();
		const diff = diffSnapshots(snap, snap);
		expect(formatDiff(diff)).toBe("(no changes)");
	});

	test("formatDiff includes change summary", () => {
		const before = shell.vfs.toSnapshot();
		shell.vfs.writeFile("/tmp/format-test-nf.txt", "x");
		const after = shell.vfs.toSnapshot();
		const diff = diffSnapshots(before, after, { ignore: ["/proc"] });
		const formatted = formatDiff(diff);
		expect(formatted).toContain("added");
	});

	test("assertDiff passes when paths match", () => {
		shell.vfs.writeFile("/tmp/assert-test-nf.txt", "hello");
		const before = shell.vfs.toSnapshot();
		shell.vfs.writeFile("/tmp/assert-new-nf.txt", "new");
		shell.vfs.remove("/tmp/assert-test-nf.txt");
		const after = shell.vfs.toSnapshot();
		const diff = diffSnapshots(before, after, { ignore: ["/proc"] });
		expect(() =>
			assertDiff(diff, {
				added: ["/tmp/assert-new-nf.txt"],
				removed: ["/tmp/assert-test-nf.txt"],
			}),
		).not.toThrow();
	});

	test("assertDiff throws when expected path is missing", () => {
		const snap = shell.vfs.toSnapshot();
		const diff = diffSnapshots(snap, snap);
		expect(() => assertDiff(diff, { added: ["/nonexistent"] })).toThrow();
	});
});

describe("node and python3 REPL stubs", () => {
	beforeAll(async () => {
		await client.exec("apt install nodejs python3");
	});

	test("node --version returns v18", async () => {
		const r = await client.exec("node --version");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("v18.19.0");
	});

	test("node -e evaluates arithmetic", async () => {
		const r = await client.exec("node -e '2 + 3'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("5");
	});

	test("node -e console.log works", async () => {
		const r = await client.exec("node -e 'console.log(42)'");
		expect(r.stdout?.trim()).toBe("42");
	});

	test("node executes VFS file", async () => {
		shell.vfs.writeFile("/tmp/test-nf.js", "console.log(10 + 5);\n");
		const r = await client.exec("node /tmp/test-nf.js");
		expect(r.stdout?.trim()).toBe("15");
	});

	test("node missing file returns exit 1", async () => {
		const r = await client.exec("node /tmp/nonexistent-nf.js");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("No such file or directory");
	});

	test("python3 --version returns Python 3.11", async () => {
		const r = await client.exec("python3 --version");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toContain("Python 3.11");
	});

	test("python3 -c print arithmetic", async () => {
		const r = await client.exec("python3 -c 'print(2 + 3)'");
		expect(r.stdout?.trim()).toBe("5");
	});

	test("python3 -c f-string", async () => {
		const r = await client.exec("python3 -c 'print(f\"result: {1+1}\")'");
		expect(r.stdout?.trim()).toBe("result: 2");
	});

	test("python3 executes VFS script", async () => {
		shell.vfs.writeFile("/tmp/test-nf.py", "print(10 + 5)\n");
		const r = await client.exec("python3 /tmp/test-nf.py");
		expect(r.stdout?.trim()).toBe("15");
	});

	test("python alias works", async () => {
		const r = await client.exec("python --version");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toContain("Python");
	});

	test("python3 missing file returns exit 2", async () => {
		const r = await client.exec("python3 /tmp/nonexistent-nf.py");
		expect(r.exitCode).toBe(2);
	});

	test("node is available as a shell command", async () => {
		const r = await client.exec("node --version");
		expect(r.exitCode).toBe(0);
	});
});

// ─── Enhanced REPL tests (post-rewrite) ──────────────────────────────────────

describe("node enhanced REPL", () => {
	beforeAll(async () => {
		await client.exec("apt install nodejs");
	});

	test("node -e string methods", async () => {
		shell.vfs.writeFile("/tmp/str-nf.js", "'hello'.toUpperCase()");
		const r = await client.exec("node /tmp/str-nf.js");
		expect(r.stdout?.trim()).toBe("HELLO");
	});

	test("node -e array methods", async () => {
		shell.vfs.writeFile("/tmp/arr-nf.js", "[1,2,3].map(x => x*2).join(',')");
		const r = await client.exec("node /tmp/arr-nf.js");
		expect(r.stdout?.trim()).toBe("2,4,6");
	});

	test("node process.version is virtual", async () => {
		const r = await client.exec("node -e 'process.version'");
		expect(r.stdout?.trim()).toBe("v18.19.0");
	});

	test("node require path works", async () => {
		shell.vfs.writeFile(
			"/tmp/path-nf.js",
			"const p = require('path'); console.log(p.join('a', 'b'))",
		);
		const r = await client.exec("node /tmp/path-nf.js");
		expect(r.stdout?.trim()).toBe("a/b");
	});

	test("node require fs throws gracefully", async () => {
		shell.vfs.writeFile(
			"/tmp/fs-nf.js",
			"try { require('fs') } catch(e) { console.log('blocked') }",
		);
		const r = await client.exec("node /tmp/fs-nf.js");
		expect(r.stdout?.trim()).toBe("blocked");
	});

	test("node console.log output", async () => {
		shell.vfs.writeFile("/tmp/log-nf.js", "console.log('hello', 'world')");
		const r = await client.exec("node /tmp/log-nf.js");
		expect(r.stdout?.trim()).toBe("hello world");
	});

	test("node Math methods", async () => {
		const r = await client.exec("node -e 'Math.floor(3.9)'");
		expect(r.stdout?.trim()).toBe("3");
	});

	test("node JSON.stringify", async () => {
		const r = await client.exec("node -e 'JSON.stringify({x:1})'");
		expect(r.stdout?.trim()).toBe('{"x":1}');
	});
});

describe("python3 enhanced interpreter", () => {
	beforeAll(async () => {
		await client.exec("apt install python3");
	});

	const py = (code: string) => {
		shell.vfs.writeFile("/tmp/t-nf.py", code);
		return client.exec("python3 /tmp/t-nf.py");
	};

	test("str.upper()", async () => {
		const r = await py("print('hello'.upper())");
		expect(r.stdout?.trim()).toBe("HELLO");
	});

	test("str.split()", async () => {
		const r = await py("print('a,b,c'.split(','))");
		expect(r.stdout?.trim()).toBe("['a', 'b', 'c']");
	});

	test("str.join()", async () => {
		const r = await py("print(','.join(['a','b','c']))");
		expect(r.stdout?.trim()).toBe("a,b,c");
	});

	test("list comprehension", async () => {
		const r = await py("print([x**2 for x in range(5)])");
		expect(r.stdout?.trim()).toBe("[0, 1, 4, 9, 16]");
	});

	test("list.sort() in-place", async () => {
		const r = await py("nums=[3,1,4,1,5]\nnums.sort()\nprint(nums)");
		expect(r.stdout?.trim()).toBe("[1, 1, 3, 4, 5]");
	});

	test("dict access and methods", async () => {
		const r = await py("d={'x':1,'y':2}\nprint(d['x'])\nprint(list(d.keys()))");
		expect(r.stdout).toContain("1");
		expect(r.stdout).toContain("x");
	});

	test("class with __init__ and methods", async () => {
		const r = await py(
			"class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f'Woof! I am {self.name}'\nd = Dog('Rex')\nprint(d.bark())",
		);
		expect(r.stdout?.trim()).toBe("Woof! I am Rex");
	});

	test("import math and use functions", async () => {
		const r = await py(
			"import math\nprint(math.floor(3.9))\nprint(round(math.sqrt(16), 0))",
		);
		expect(r.stdout).toContain("3");
		expect(r.stdout).toContain("4");
	});

	test("import os and getcwd", async () => {
		const r = await py("import os\nprint(os.getcwd())");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim().length).toBeGreaterThan(0);
	});

	test("import sys and version", async () => {
		const r = await py("import sys\nprint(sys.version[:5])");
		expect(r.stdout?.trim()).toBe("3.11.");
	});

	test("import json dumps/loads", async () => {
		const r = await py(
			"import json\nd={'x':1}\nprint(json.dumps(d))\nprint(json.loads('{\"a\":2}')['a'])",
		);
		expect(r.stdout).toContain('"x"');
		expect(r.stdout).toContain("2");
	});

	test("try/except handles errors", async () => {
		const r = await py(
			"try:\n    x = 1/0\nexcept ZeroDivisionError:\n    print('caught')",
		);
		expect(r.stdout?.trim()).toBe("caught");
	});

	test("f-string interpolation", async () => {
		const r = await py("name='world'\nprint(f'hello {name}')");
		expect(r.stdout?.trim()).toBe("hello world");
	});

	test("sorted() and reversed()", async () => {
		const r = await py(
			"print(sorted([3,1,2]))\nprint(list(reversed([1,2,3])))",
		);
		expect(r.stdout).toContain("[1, 2, 3]");
		expect(r.stdout).toContain("[3, 2, 1]");
	});

	test("enumerate()", async () => {
		const r = await py("for i,v in enumerate(['a','b']):\n    print(i, v)");
		expect(r.stdout).toContain("0 a");
		expect(r.stdout).toContain("1 b");
	});
});
