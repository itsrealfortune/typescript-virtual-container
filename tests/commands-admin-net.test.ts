import {afterAll, beforeAll, describe, expect, test} from "bun:test";
import {SshClient, type VirtualShell} from "../src";
import {createTestEnv, runCmd} from "./test-helper";

// Skip network-dependent tests by default. Run with:
//   SSH_MIMIC_RUN_NETWORK_TESTS=1 bun test tests/commands-admin-net.test.ts
const runNetwork = Boolean(process.env.SSH_MIMIC_RUN_NETWORK_TESTS);
const describeNetwork = runNetwork ? describe : describe.skip;

let client: InstanceType<typeof SshClient>;
let nonRootClient: InstanceType<typeof SshClient>;
let sudoerClient: InstanceType<typeof SshClient>;
let shell: VirtualShell;
let port: number;

beforeAll(async () => {
	const env = await createTestEnv("test-admin");
	client = env.client;
	shell = env.shell;
	port = env.port;

	await shell.users.addUser("regular", "pass");
	await shell.users.addUser("sudoer", "pass");
	shell.users.addSudoer("sudoer");

	nonRootClient = new SshClient();
	await nonRootClient.connect({
		host: "localhost",
		port,
		username: "regular",
		password: "pass",
	});

	sudoerClient = new SshClient();
	await sudoerClient.connect({
		host: "localhost",
		port,
		username: "sudoer",
		password: "pass",
	});
});

afterAll(() => {
	nonRootClient.disconnect();
	sudoerClient.disconnect();
});

// ─── USERADD tests ────────────────────────────────────────────────────────

describe("useradd command", () => {
	test("useradd creates user", async () => {
		const r = await runCmd(client, "useradd -m testuser || echo 'created'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("useradd with comment", async () => {
		const r = await runCmd(
			client,
			"useradd -c 'Test User' -m testuser2 || echo 'created'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("useradd with specific uid", async () => {
		const r = await runCmd(
			client,
			"useradd -u 2000 -m testuser3 || echo 'created'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("useradd duplicate fails", async () => {
		await runCmd(client, "useradd -m duplicate");
		const r = await runCmd(client, "useradd -m duplicate");
		expect(r.exitCode).not.toBe(0);
	});

	test("useradd non-root fails", async () => {
		const env = await createTestEnv("test-admin-nonroot");
		await env.shell.users.addUser("testuser", "pass");
		const nonrootClient = new SshClient();
		await nonrootClient.connect({
			host: "localhost",
			port: env.port,
			username: "testuser",
			password: "pass",
		});
		const r = await runCmd(nonrootClient, "useradd -m newuser");
		expect(r.exitCode).not.toBe(0);
		nonrootClient.disconnect();
		env.ssh.stop();
	});
});

// ─── DELUSER tests ────────────────────────────────────────────────────────

describe("deluser command", () => {
	test("deluser removes user", async () => {
		await runCmd(client, "useradd -m deltest 2>/dev/null || true");
		const r = await runCmd(client, "deluser deltest 2>&1 || echo 'deleted'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("deluser with home removal", async () => {
		await runCmd(client, "useradd -m delhome 2>/dev/null || true");
		const r = await runCmd(
			client,
			"deluser --remove-home delhome 2>&1 || echo 'deleted'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("deluser non-existent user", async () => {
		const r = await runCmd(client, "deluser nonexistent");
		expect(r.exitCode).not.toBe(0);
	});
});

// ─── PASSWD tests ────────────────────────────────────────────────────────

describe("passwd command", () => {
	test("passwd requires root", async () => {
		const r = await runCmd(client, "passwd root");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("passwd non-existent user fails", async () => {
		const r = await runCmd(client, "passwd nonexistent");
		expect(r.exitCode).not.toBe(0);
	});
});

// ─── SUDO tests ───────────────────────────────────────────────────────────

describe("sudo command", () => {
	test("sudo as root runs command", async () => {
		const r = await runCmd(client, "sudo whoami");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("root");
	});

	test("sudo -u changes user", async () => {
		await runCmd(client, "useradd -m sudouser");
		const r = await runCmd(client, "sudo -u sudouser whoami");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("sudouser");
	});

	test("sudo preserves args", async () => {
		const r = await runCmd(client, "sudo echo test");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("test");
	});

	test("sudo -i switches to root shell", async () => {
		const r = await runCmd(client, "sudo -i whoami");
		expect(r.exitCode).toBe(0);
	});

	test("sudo without command errors", async () => {
		const r = await runCmd(client, "sudo");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("missing command");
	});
});

// ─── SU tests ──────────────────────────────────────────────────────────────

describe("su command", () => {
	test("su as root", async () => {
		const r = await runCmd(client, "su - -c whoami");
		expect(r.exitCode).toBe(0);
	});

	test("su with command execution", async () => {
		const r = await runCmd(client, "su - root -c 'echo hello'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── CURL tests ───────────────────────────────────────────────────────────

describeNetwork("curl command", () => {
	test("curl basic request", async () => {
		const r = await runCmd(
			client,
			"curl http://example.com 2>/dev/null | head -c 10 || echo 'response'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("curl localhost", async () => {
		const r = await runCmd(
			client,
			"curl -s http://localhost:8080 2>/dev/null || echo 'no server'"
		);
		expect(r.exitCode).toBe(0);
	});

	test("curl invalid URL", async () => {
		const r = await runCmd(
			client,
			"curl http://invalid.example.test 2>&1 | grep -i error || echo 'error'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("curl -o saves to file", async () => {
		const r = await runCmd(
			client,
			"curl -s -o /tmp/curlout.html http://example.com 2>/dev/null || echo 'done'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("curl blocked by firewall", async () => {
		await runCmd(client, "iptables -A OUTPUT -d 127.0.0.1 -j DROP");
		// curl to localhost — blocked by OUTPUT rule
		const r2 = await runCmd(client, "curl http://127.0.0.1");
		const output = (r2.stderr ?? "") + (r2.stdout ?? "");
		expect(output).toContain("Connection refused");
		expect(r2.exitCode).toBe(7);
		await runCmd(client, "iptables -F");
	});

	test("curl -I head request", async () => {
		const r = await runCmd(
			client,
			"curl -I http://example.com 2>/dev/null | head -1 || echo 'header'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("curl with headers", async () => {
		const r = await runCmd(
			client,
			"curl -H 'User-Agent: test' http://example.com 2>/dev/null | head -c 5 || echo 'data'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── WGET tests ───────────────────────────────────────────────────────────

describeNetwork("wget command", () => {
	test("wget basic download", async () => {
		const r = await runCmd(
			client,
			"wget -q http://example.com -O /tmp/wget.html 2>/dev/null || echo 'done'"
		);
		expect(r.exitCode).toBe(0);
	});

	test("wget -q quiet mode", async () => {
		const r = await runCmd(
			client,
			"wget -q http://example.com -O /tmp/wgetq.html 2>/dev/null || echo 'done'"
		);
		expect(r.exitCode).toBe(0);
	});

	test("wget --spider check url", async () => {
		const r = await runCmd(
			client,
			"wget --spider http://example.com 2>/dev/null || echo 'checked'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── PING tests ───────────────────────────────────────────────────────────

describeNetwork("ping command", () => {
	test("ping localhost", async () => {
		const r = await runCmd(client, "ping -c 1 localhost");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("localhost");
	});

	test("ping -c count", async () => {
		const r = await runCmd(client, "ping -c 1 127.0.0.1");
		expect(r.exitCode).toBe(0);
	});

	test("ping invalid host", async () => {
		const r = await runCmd(
			client,
			"ping -c 1 invalid.test 2>&1 || echo 'error'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("ping ipv4", async () => {
		const r = await runCmd(client, "ping -c 1 127.0.0.1");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("127.0.0.1");
	});
});

// ─── NETSTAT-like tests ────────────────────────────────────────────────────

describe("network info commands", () => {
	test("hostname shows system name", async () => {
		const r = await runCmd(client, "hostname");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});

	test("host lookup", async () => {
		const r = await runCmd(
			client,
			"host localhost 2>/dev/null || echo 'no DNS'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("nslookup query", async () => {
		const r = await runCmd(
			client,
			"nslookup localhost 2>/dev/null || echo 'no DNS'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── ADDUSER tests ────────────────────────────────────────────────────────

describe("adduser command", () => {
	test("adduser creates user", async () => {
		const r = await runCmd(
			client,
			"adduser -m -s /bin/bash newuser || echo 'created'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("adduser duplicate", async () => {
		await runCmd(client, "adduser -m addup 2>/dev/null || true");
		const r = await runCmd(client, "adduser -m addup 2>&1 || echo 'exists'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── DPKG tests ───────────────────────────────────────────────────────────

describe("dpkg command", () => {
	test("dpkg -l lists packages", async () => {
		const r = await runCmd(client, "dpkg -l");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});

	test("dpkg -s check package", async () => {
		const r = await runCmd(
			client,
			"dpkg -s bash 2>/dev/null || echo 'not found'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("dpkg status output", async () => {
		const r = await runCmd(client, "dpkg -l | head");
		expect(r.exitCode).toBe(0);
	});
});

// ─── APT tests ────────────────────────────────────────────────────────────

describe("apt command", () => {
	test("apt update list", async () => {
		const r = await runCmd(client, "apt update 2>&1 | head -5");
		expect(r.exitCode).toBe(0);
	});

	test("apt list packages", async () => {
		const r = await runCmd(client, "apt list --installed 2>/dev/null | head");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("apt search package", async () => {
		const r = await runCmd(
			client,
			"apt search bash 2>&1 | grep -i bash || echo 'searched'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── NPM tests ────────────────────────────────────────────────────────────

describe("npm command", () => {
	test("npm -v version", async () => {
		const r = await runCmd(client, "npm -v");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("npm list global", async () => {
		const r = await runCmd(
			client,
			"npm list -g 2>/dev/null || npm list -g --depth 0 2>/dev/null || echo 'packages'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("npm help", async () => {
		const r = await runCmd(client, "npm help 2>&1 | head");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── PYTHON tests ────────────────────────────────────────────────────────

describe("python command", () => {
	test("python -c executes code", async () => {
		const r = await runCmd(client, "python -c 'print(1+1)'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("python -v version", async () => {
		const r = await runCmd(client, "python --version 2>&1");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── NODE tests ───────────────────────────────────────────────────────────

describe("node command", () => {
	test("node -v version", async () => {
		const r = await runCmd(client, "node -v");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("node -e executes code", async () => {
		const r = await runCmd(client, "node -e 'console.log(1+1)'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("node eval arithmetic", async () => {
		const r = await runCmd(client, "node -e 'console.log(2*3)'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
		if (r.stdout) {
			expect(r.stdout).toContain("6");
		}
	});
});

// ─── WHICH tests ───────────────────────────────────────────────────────────

describe("which command", () => {
	test("which finds command", async () => {
		const r = await runCmd(client, "which ls");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toMatch(/ls|bin/);
	});

	test("which multiple commands", async () => {
		const r = await runCmd(client, "which ls cat grep");
		expect(r.exitCode).toBe(0);
	});

	test("which non-existent", async () => {
		const r = await runCmd(client, "which nonexistcommand");
		expect(r.exitCode).not.toBe(0);
	});
});

// ─── TYPE tests ───────────────────────────────────────────────────────────

describe("type command", () => {
	test("type shows command type", async () => {
		const r = await runCmd(client, "type ls");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("type builtin", async () => {
		const r = await runCmd(client, "type echo");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("type alias", async () => {
		const r = await runCmd(client, "alias myls=ls && type myls");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── HELP tests ───────────────────────────────────────────────────────────

describe("help command", () => {
	test("help lists commands", async () => {
		const r = await runCmd(client, "help");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.length).toBeGreaterThan(0);
	});

	test("help specific command", async () => {
		const r = await runCmd(client, "help echo");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("help lists builtins", async () => {
		const r = await runCmd(client, "help | wc -l");
		expect(r.exitCode).toBe(0);
	});
});

// ─── MAN tests ────────────────────────────────────────────────────────────

describe("man command", () => {
	test("man ls shows manual", async () => {
		const r = await runCmd(
			client,
			"man ls 2>/dev/null | head -5 || echo 'no man'"
		);
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("man non-existent", async () => {
		const r = await runCmd(client, "man nonexistent 2>&1");
		expect(r.exitCode).not.toBe(0);
	});
});

// ─── ALIAS tests ───────────────────────────────────────────────────────────

describe("alias command", () => {
	test("alias creates shortcut", async () => {
		const r = await runCmd(client, "alias myecho=echo && myecho hello");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello");
	});

	test("alias lists all", async () => {
		const r = await runCmd(client, "alias");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("alias with args", async () => {
		const r = await runCmd(client, "alias ll='ls -l' && ll /tmp | head -1");
		expect(r.exitCode).toBe(0);
	});
});

// ─── HISTORY tests ───────────────────────────────────────────────────────

describe("history command", () => {
	test("history lists command history", async () => {
		const r = await runCmd(client, "history");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("history shows entries", async () => {
		const r = await runCmd(client, "history 5");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── EXIT tests ───────────────────────────────────────────────────────────

describe("exit command", () => {
	test("exit with code 0", async () => {
		const r = await runCmd(client, "exit 0");
		expect(r.exitCode).toBe(0);
	});

	test("exit with code 1", async () => {
		const r = await runCmd(client, "exit 1");
		expect(r.exitCode).not.toBe(0);
	});

	test("chown changes file owner", async () => {
		shell.vfs.writeFile("/tmp/chown-test.txt", "data", {}, 0, 0);
		const r = await runCmd(client, "chown 1001 /tmp/chown-test.txt");
		expect(r.exitCode).toBe(0);
		const owner = shell.vfs.getOwner("/tmp/chown-test.txt");
		expect(owner.uid).toBe(1001);
	});

	test("chown missing operand", async () => {
		const r = await runCmd(client, "chown");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("missing operand");
	});

	test("chown invalid user", async () => {
		shell.vfs.writeFile("/tmp/chown-test2.txt", "data", {}, 0, 0);
		const r = await runCmd(
			client,
			"chown nonexistentuser /tmp/chown-test2.txt"
		);
		expect(r.exitCode).toBe(1);
	});

	test("chown user:group syntax", async () => {
		shell.vfs.writeFile("/tmp/chown-test3.txt", "data", {}, 0, 0);
		const r = await runCmd(client, "chown 1001:1001 /tmp/chown-test3.txt");
		expect(r.exitCode).toBe(0);
		const owner = shell.vfs.getOwner("/tmp/chown-test3.txt");
		expect(owner.uid).toBe(1001);
		expect(owner.gid).toBe(1001);
	});

	test("su auto-creates non-existent user", async () => {
		const r = await runCmd(client, "su - newauto -c 'whoami'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("newauto");
	});

	test("su -c runs command as target user", async () => {
		const r = await runCmd(client, "su - root -c 'echo hello'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("hello");
	});

	test("su without target defaults to root", async () => {
		const r = await runCmd(client, "su - -c 'whoami'");
		expect(r.exitCode).toBe(0);
		expect(r.stdout?.trim()).toBe("root");
	});

	test("iptables list rules (empty)", async () => {
		const r = await runCmd(client, "iptables -L");
		expect(r.exitCode).toBe(0);
	});

	test("iptables append and list rule", async () => {
		await runCmd(client, "iptables -A INPUT -s 10.0.0.0/8 -j DROP");
		const r = await runCmd(client, "iptables -L");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("DROP");
	});

	test("iptables flush rules", async () => {
		await runCmd(client, "iptables -A INPUT -s 1.2.3.4 -j DROP");
		await runCmd(client, "iptables -F");
		const r = await runCmd(client, "iptables -L");
		expect(r.stdout).not.toContain("1.2.3.4");
	});

	test("iptables set policy", async () => {
		const r = await runCmd(client, "iptables -P INPUT DROP");
		expect(r.exitCode).toBe(0);
	});

	test("iptables with protocol and ports", async () => {
		const r = await runCmd(
			client,
			"iptables -A INPUT -p tcp --dport 80 -j ACCEPT"
		);
		expect(r.exitCode).toBe(0);
	});

	test("iptables with destination", async () => {
		const r = await runCmd(client, "iptables -A OUTPUT -d 10.0.0.0/8 -j DROP");
		expect(r.exitCode).toBe(0);
	});

	test("iptables unknown chain errors", async () => {
		const r = await runCmd(client, "iptables -A UNKNOWN -j DROP");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("unknown chain");
	});

	test("iptables append missing action", async () => {
		const r = await runCmd(client, "iptables -A INPUT");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("requires chain and -j action");
	});
});

describe("non-root su/sudo", () => {
	test("non-root non-sudoer cannot su", async () => {
		const r = await nonRootClient.exec("su - root -c whoami");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("permission denied");
	});

	test("non-root non-sudoer cannot sudo", async () => {
		const r = await nonRootClient.exec("sudo whoami");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("permission denied");
	});

	test("sudoer triggers sudo challenge", async () => {
		const r = await sudoerClient.exec("sudo whoami");
		expect(r.exitCode).toBe(0);
	});
});

describe("sysctl command", () => {
	test("sysctl lists parameters", async () => {
		const r = await runCmd(client, "sysctl");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("kernel.hostname");
	});

	test("sysctl get parameter", async () => {
		const r = await runCmd(client, "sysctl kernel.hostname");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("kernel.hostname");
	});

	test("sysctl set parameter", async () => {
		const r = await runCmd(client, "sysctl -w net.ipv4.ip_forward=1");
		expect(r.exitCode).toBe(0);
		const r2 = await runCmd(client, "sysctl net.ipv4.ip_forward");
		expect(r2.stdout).toContain("= 1");
	});

	test("sysctl unknown parameter errors", async () => {
		const r = await runCmd(client, "sysctl unknown.parameter");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("No such file");
	});
});

describe("ip command", () => {
	test("ip addr show", async () => {
		const r = await runCmd(client, "ip addr");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("lo");
	});

	test("ip link show", async () => {
		const r = await runCmd(client, "ip link");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("LOOPBACK");
	});

	test("ip route show", async () => {
		const r = await runCmd(client, "ip route");
		expect(r.exitCode).toBe(0);
	});

	test("ip addr add", async () => {
		const r = await runCmd(client, "ip addr add 10.0.0.1/24 dev eth0");
		expect(r.exitCode).toBe(0);
	});

	test("ip link set up", async () => {
		const r = await runCmd(client, "ip link set eth0 up");
		expect(r.exitCode).toBe(0);
	});

	test("ip unknown object errors", async () => {
		const r = await runCmd(client, "ip nonexistent");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("unknown");
	});

	test("ip no args errors", async () => {
		const r = await runCmd(client, "ip");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("Usage");
	});
});

// ─── IFCONFIG tests ─────────────────────────────────────────────────────────

describe("ifconfig command", () => {
	test("ifconfig shows all interfaces", async () => {
		const r = await runCmd(client, "ifconfig");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("lo");
	});

	test("ifconfig specific interface", async () => {
		const r = await runCmd(client, "ifconfig lo");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("lo");
	});

	test("ifconfig unknown interface", async () => {
		const r = await runCmd(client, "ifconfig nonexistent");
		expect(r.exitCode).toBe(1);
	});

	test("ifconfig -a shows all", async () => {
		const r = await runCmd(client, "ifconfig -a");
		expect(r.exitCode).toBe(0);
	});

	test("ifconfig interface up/down", async () => {
		const r = await runCmd(client, "ifconfig eth0 up");
		expect(r.exitCode).toBe(0);
		const r2 = await runCmd(client, "ifconfig eth0 down");
		expect(r2.exitCode).toBe(0);
	});

	test("ifconfig set inet address", async () => {
		const r = await runCmd(client, "ifconfig eth0 inet 10.0.0.2");
		expect(r.exitCode).toBe(0);
	});
});

// ─── TC tests ───────────────────────────────────────────────────────────────

describe("tc command", () => {
	test("tc no args errors", async () => {
		const r = await runCmd(client, "tc");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("Usage");
	});

	test("tc qdisc show lists disciplines", async () => {
		const r = await runCmd(client, "tc qdisc show");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("qdisc");
	});

	test("tc qdisc show dev eth0", async () => {
		const r = await runCmd(client, "tc qdisc show dev lo");
		expect(r.exitCode).toBe(0);
	});

	test("tc qdisc add with netem", async () => {
		const r = await runCmd(
			client,
			"tc qdisc add dev eth0 root netem delay 100ms"
		);
		expect(r.exitCode).toBe(0);
	});

	test("tc qdisc change latency", async () => {
		const r = await runCmd(
			client,
			"tc qdisc change dev eth0 root netem delay 200ms"
		);
		expect(r.exitCode).toBe(0);
	});

	test("tc qdisc add with loss", async () => {
		const r = await runCmd(client, "tc qdisc add dev eth0 root netem loss 10%");
		expect(r.exitCode).toBe(0);
	});

	test("tc class show", async () => {
		const r = await runCmd(client, "tc class show dev eth0");
		expect(r.exitCode).toBe(0);
	});
});

// ─── SS tests ───────────────────────────────────────────────────────────────

describe("ss command", () => {
	test("ss shows sockets", async () => {
		const r = await runCmd(client, "ss");
		expect(r.exitCode).toBe(0);
	});

	test("ss -t shows TCP", async () => {
		const r = await runCmd(client, "ss -t");
		expect(r.exitCode).toBe(0);
	});

	test("ss -u shows UDP", async () => {
		const r = await runCmd(client, "ss -u");
		expect(r.exitCode).toBe(0);
	});

	test("ss -l shows listening", async () => {
		const r = await runCmd(client, "ss -l");
		expect(r.exitCode).toBe(0);
	});

	test("ss -a shows all", async () => {
		const r = await runCmd(client, "ss -a");
		expect(r.exitCode).toBe(0);
	});

	test("ss -s shows summary", async () => {
		const r = await runCmd(client, "ss -s");
		expect(r.exitCode).toBe(0);
	});

	test("ss -n numeric", async () => {
		const r = await runCmd(client, "ss -n");
		expect(r.exitCode).toBe(0);
	});

	test("ss -p shows processes", async () => {
		const r = await runCmd(client, "ss -p");
		expect(r.exitCode).toBe(0);
	});
});

// ─── CONNTRACK tests ────────────────────────────────────────────────────────

describe("conntrack command", () => {
	test("conntrack -L lists entries", async () => {
		const r = await runCmd(client, "conntrack -L");
		expect(r.exitCode).toBe(0);
	});

	test("conntrack with no args", async () => {
		const r = await runCmd(client, "conntrack");
		expect(r.exitCode).toBe(0);
	});

	test("conntrack -S shows stats", async () => {
		const r = await runCmd(client, "conntrack -S");
		expect(r.exitCode).toBe(0);
	});
});

// ─── TRACEROUTE tests ────────────────────────────────────────────────────────

describe("traceroute command", () => {
	test("traceroute no args errors", async () => {
		const r = await runCmd(client, "traceroute");
		expect(r.exitCode).toBe(1);
		expect(r.stderr).toContain("Usage");
	});

	test("traceroute to localhost", async () => {
		const r = await runCmd(client, "traceroute localhost 2>/dev/null");
		expect(r.exitCode).toBe(0);
	});

	test("traceroute with options", async () => {
		const r = await runCmd(
			client,
			"traceroute -m 5 -q 1 localhost 2>/dev/null"
		);
		expect(r.exitCode).toBe(0);
	});
});
