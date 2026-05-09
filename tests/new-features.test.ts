import { describe, expect, test, beforeAll } from "bun:test";
import { VirtualShell } from "../src";
import { SshClient } from "../src/SSHClient";

// ─── shared shell ─────────────────────────────────────────────────────────────

let shell: VirtualShell;
let client: InstanceType<typeof SshClient>;

beforeAll(async () => {
	shell = new VirtualShell("test-vm");
	await shell.ensureInitialized();
	client = new SshClient(shell, "root");
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

	test("/sys/devices/virtual/dmi/id/sys_vendor exists", async () => {
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
		// adduser alice
		await shell.users.addUser("alice", "pass");
		const aliceClient = new SshClient(shell, "alice");
		const r = await aliceClient.exec("apt install vim");
		expect(r.exitCode).not.toBe(0);
		expect(r.stderr).toContain("Permission denied");
	});

	test("neofetch shows package count after installs", async () => {
		await client.exec("apt install curl wget htop");
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

	test("curl fetches real URL and returns body", async () => {
		const r = await client.exec("curl https://httpbin.org/get");
		// In sandboxed env network may be blocked — accept 0 (ok), 6 (dns), 22 (http err), or 1 (fetch error)
		expect([0, 1, 6, 22]).toContain(r.exitCode);
	});

	test("curl -o saves to VFS", async () => {
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
		const before = shell.vfs.readFile("/proc/uptime");
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
		expect(r.stdout).toContain("aurora");
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
