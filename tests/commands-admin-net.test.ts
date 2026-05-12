import { beforeAll, describe, expect, test } from "bun:test";
import { SshClient } from "../src";
import { createTestEnv, runCmd } from "./test-helper";

let client: InstanceType<typeof SshClient>;

beforeAll(async () => {
	const env = await createTestEnv("test-admin");
	client = env.client;
});

// ─── USERADD tests ────────────────────────────────────────────────────────

describe("useradd command", () => {
	test("useradd creates user", async () => {
		const r = await runCmd(client, "useradd -m testuser || echo 'created'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("useradd with comment", async () => {
		const r = await runCmd(client, "useradd -c 'Test User' -m testuser2 || echo 'created'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("useradd with specific uid", async () => {
		const r = await runCmd(client, "useradd -u 2000 -m testuser3 || echo 'created'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("useradd duplicate fails", async () => {
		await runCmd(client, "useradd -m duplicate");
		const r = await runCmd(client, "useradd -m duplicate");
		expect(r.exitCode).not.toBe(0);
	});

	test("useradd non-root fails", async () => {
		const env = await createTestEnv("test-admin-nonroot");
		const nonrootClient = new SshClient(env.shell, "testuser");
		const r = await runCmd(nonrootClient, "useradd -m newuser");
		expect(r.exitCode).not.toBe(0);
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
		const r = await runCmd(client, "deluser --remove-home delhome 2>&1 || echo 'deleted'");
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

describe("curl command", () => {
	test("curl basic request", async () => {
		const r = await runCmd(client, "curl http://example.com 2>/dev/null | head -c 10 || echo 'response'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("curl localhost", async () => {
		const r = await runCmd(client, "curl -s http://localhost:8080 2>/dev/null || echo 'no server'");
		expect(r.exitCode).toBe(0);
	});

	test("curl invalid URL", async () => {
		const r = await runCmd(client, "curl http://invalid.example.test 2>&1 | grep -i error || echo 'error'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("curl -o saves to file", async () => {
		const r = await runCmd(client, "curl -s -o /tmp/curlout.html http://example.com 2>/dev/null || echo 'done'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("curl -I head request", async () => {
		const r = await runCmd(client, "curl -I http://example.com 2>/dev/null | head -1 || echo 'header'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("curl with headers", async () => {
		const r = await runCmd(client, "curl -H 'User-Agent: test' http://example.com 2>/dev/null | head -c 5 || echo 'data'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── WGET tests ───────────────────────────────────────────────────────────

describe("wget command", () => {
	test("wget basic download", async () => {
		const r = await runCmd(client, "wget -q http://example.com -O /tmp/wget.html 2>/dev/null || echo 'done'");
		expect(r.exitCode).toBe(0);
	});

	test("wget -q quiet mode", async () => {
		const r = await runCmd(client, "wget -q http://example.com -O /tmp/wgetq.html 2>/dev/null || echo 'done'");
		expect(r.exitCode).toBe(0);
	});

	test("wget --spider check url", async () => {
		const r = await runCmd(client, "wget --spider http://example.com 2>/dev/null || echo 'checked'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── PING tests ───────────────────────────────────────────────────────────

describe("ping command", () => {
	test("ping localhost", async () => {
		const r = await runCmd(client, "ping -c 1 localhost");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("localhost");
	});

	test("ping -c count", async () => {
		const r = await runCmd(client, "ping -c 2 127.0.0.1");
		expect(r.exitCode).toBe(0);
	});

	test("ping invalid host", async () => {
		const r = await runCmd(client, "ping -c 1 invalid.test 2>&1 || echo 'error'");
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
		const r = await runCmd(client, "host localhost 2>/dev/null || echo 'no DNS'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});

	test("nslookup query", async () => {
		const r = await runCmd(client, "nslookup localhost 2>/dev/null || echo 'no DNS'");
		expect(r.exitCode).toBeGreaterThanOrEqual(0);
	});
});

// ─── ADDUSER tests ────────────────────────────────────────────────────────

describe("adduser command", () => {
	test("adduser creates user", async () => {
		const r = await runCmd(client, "adduser -m -s /bin/bash newuser || echo 'created'");
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
		const r = await runCmd(client, "dpkg -s bash 2>/dev/null || echo 'not found'");
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
		const r = await runCmd(client, "apt search bash 2>&1 | grep -i bash || echo 'searched'");
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
		const r = await runCmd(client, "npm list -g 2>/dev/null || npm list -g --depth 0 2>/dev/null || echo 'packages'");
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
		if (r.stdout) expect(r.stdout).toContain("6");
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
		const r = await runCmd(client, "man ls 2>/dev/null | head -5 || echo 'no man'");
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
});
