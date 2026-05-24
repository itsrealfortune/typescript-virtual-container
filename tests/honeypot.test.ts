import { describe, expect, test } from "bun:test";
import { EventEmitter } from "node:events";
import type { SshMimic } from "../src/modules/SSHMimic";
import type { SftpMimic } from "../src/modules/SSHMimic/sftp";
import type VirtualFileSystem from "../src/modules/VirtualFileSystem";
import type { VirtualShell } from "../src/modules/VirtualShell";
import type { VirtualUserManager } from "../src/modules/VirtualUserManager";
import { HoneyPot } from "../src/modules/Honeypot";

function mockShell(): VirtualShell {
	const ee = new EventEmitter() as EventEmitter & { pingIdle: () => void };
	ee.pingIdle = () => {};
	return ee as unknown as VirtualShell;
}

function mockVfs(): VirtualFileSystem {
	return new EventEmitter() as unknown as VirtualFileSystem;
}

function mockUsers(): VirtualUserManager {
	return new EventEmitter() as unknown as VirtualUserManager;
}

function mockSsh(): SshMimic {
	return new EventEmitter() as unknown as SshMimic;
}

function mockSftp(): SftpMimic {
	return new EventEmitter() as unknown as SftpMimic;
}

describe("HoneyPot", () => {
	test("audit log starts empty", () => {
		const hp = new HoneyPot();
		expect(hp.getAuditLog()).toHaveLength(0);
	});

	test("stats are all zero initially", () => {
		const hp = new HoneyPot();
		const stats = hp.getStats();
		expect(stats.authAttempts).toBe(0);
		expect(stats.commands).toBe(0);
		expect(stats.fileWrites).toBe(0);
		expect(stats.sessionStarts).toBe(0);
	});

	test("attach() wires shell events and logs them", () => {
		const hp = new HoneyPot();
		const shell = mockShell();
		const vfs = mockVfs();
		const users = mockUsers();

		hp.attach(shell, vfs, users);

		shell.emit("command", { cmd: "ls -la" });
		shell.emit("session:start", { sessionId: "s1" });
		shell.emit("shell:freeze");
		shell.emit("shell:thaw");

		const log = hp.getAuditLog();
		expect(log).toHaveLength(4);
		expect(log[0]!.type).toBe("command");
		expect(log[1]!.type).toBe("session:start");
	});

	test("tracks command count", () => {
		const hp = new HoneyPot();
		const shell = mockShell();
		hp.attach(shell, mockVfs(), mockUsers());

		for (let i = 0; i < 5; i++) {
			shell.emit("command", { cmd: `cmd-${i}` });
		}

		expect(hp.getStats().commands).toBe(5);
	});

	test("tracks file read/write stats", () => {
		const hp = new HoneyPot();
		const vfs = mockVfs();
		hp.attach(mockShell(), vfs, mockUsers());

		vfs.emit("file:read", { path: "/etc/passwd" });
		vfs.emit("file:write", { path: "/tmp/test" });
		vfs.emit("file:read", { path: "/home/user/file" });

		const stats = hp.getStats();
		expect(stats.fileReads).toBe(2);
		expect(stats.fileWrites).toBe(1);
	});

	test("tracks mount/unmount stats", () => {
		const hp = new HoneyPot();
		const vfs = mockVfs();
		hp.attach(mockShell(), vfs, mockUsers());

		vfs.emit("mount", { target: "/mnt" });
		vfs.emit("unmount", { target: "/mnt" });

		expect(hp.getStats().mounts).toBe(1);
		expect(hp.getStats().unmounts).toBe(1);
	});

	test("tracks user add/delete stats", () => {
		const hp = new HoneyPot();
		const users = mockUsers();
		hp.attach(mockShell(), mockVfs(), users);

		users.emit("user:add", { username: "bob" });
		users.emit("user:delete", { username: "alice" });

		const stats = hp.getStats();
		expect(stats.userCreated).toBe(1);
		expect(stats.userDeleted).toBe(1);
	});

	test("tracks SSH auth success/failure", () => {
		const hp = new HoneyPot();
		const ssh = mockSsh();
		hp.attach(mockShell(), mockVfs(), mockUsers(), ssh);

		ssh.emit("auth:success", { user: "root" });
		ssh.emit("auth:failure", { user: "attacker" });

		const stats = hp.getStats();
		expect(stats.authAttempts).toBe(2);
		expect(stats.authSuccesses).toBe(1);
		expect(stats.authFailures).toBe(1);
	});

	test("tracks auth lockouts", () => {
		const hp = new HoneyPot();
		const ssh = mockSsh();
		hp.attach(mockShell(), mockVfs(), mockUsers(), ssh);

		ssh.emit("auth:lockout", { user: "attacker" });
		expect(hp.getStats().authLockouts).toBe(1);
	});

	test("tracks client connect/disconnect", () => {
		const hp = new HoneyPot();
		const ssh = mockSsh();
		hp.attach(mockShell(), mockVfs(), mockUsers(), ssh);

		ssh.emit("client:connect");
		ssh.emit("client:disconnect", { ip: "10.0.0.1" });

		const stats = hp.getStats();
		expect(stats.clientConnects).toBe(1);
		expect(stats.clientDisconnects).toBe(1);
	});

	test("tracks SFTP events", () => {
		const hp = new HoneyPot();
		const sftp = mockSftp();
		hp.attach(mockShell(), mockVfs(), mockUsers(), undefined, sftp);

		sftp.emit("auth:success", { user: "root" });
		sftp.emit("client:connect");

		expect(hp.getStats().authSuccesses).toBe(1);
		expect(hp.getStats().clientConnects).toBe(1);
	});

	test("tracks session starts and ends", () => {
		const hp = new HoneyPot();
		const shell = mockShell();
		const users = mockUsers();
		hp.attach(shell, mockVfs(), users);

		shell.emit("session:start", { id: "s1" });
		shell.emit("session:start", { id: "s2" });
		users.emit("session:unregister", { id: "s1" });

		expect(hp.getStats().sessionStarts).toBe(2);
		expect(hp.getStats().sessionEnds).toBe(1);
	});

	test("tracks key add/remove stats", () => {
		const hp = new HoneyPot();
		const users = mockUsers();
		hp.attach(mockShell(), mockVfs(), users);

		users.emit("key:add", { key: "ssh-rsa AAAA..." });
		users.emit("key:remove", { key: "ssh-rsa AAAA..." });

		expect(hp.getStats().keysAdded).toBe(1);
		expect(hp.getStats().keysRemoved).toBe(1);
	});

	test("tracks snapshot and symlink events", () => {
		const hp = new HoneyPot();
		const vfs = mockVfs();
		hp.attach(mockShell(), vfs, mockUsers());

		vfs.emit("snapshot:restore", { name: "backup-1" });
		vfs.emit("snapshot:import", { name: "backup-2" });
		vfs.emit("symlink:create", { target: "/link", source: "/orig" });
		vfs.emit("node:remove", { path: "/tmp/file" });

		const stats = hp.getStats();
		expect(stats.snapshotsRestored).toBe(1);
		expect(stats.snapshotsImported).toBe(1);
		expect(stats.symlinksCreated).toBe(1);
		expect(stats.nodesRemoved).toBe(1);
	});

	test("getAuditLog filters by type", () => {
		const hp = new HoneyPot();
		const shell = mockShell();
		hp.attach(shell, mockVfs(), mockUsers());

		shell.emit("command", { cmd: "ls" });
		shell.emit("session:start", { id: "s1" });
		shell.emit("command", { cmd: "whoami" });

		const commands = hp.getAuditLog("command");
		expect(commands).toHaveLength(2);
	});

	test("getAuditLog filters by source", () => {
		const hp = new HoneyPot();
		const shell = mockShell();
		hp.attach(shell, mockVfs(), mockUsers());

		shell.emit("command", { cmd: "ls" });

		const shellLogs = hp.getAuditLog(undefined, "VirtualShell");
		expect(shellLogs).toHaveLength(1);
	});

	test("getRecent returns most recent entries", () => {
		const hp = new HoneyPot();
		const shell = mockShell();
		hp.attach(shell, mockVfs(), mockUsers());

		for (let i = 0; i < 10; i++) {
			shell.emit("command", { cmd: `cmd-${i}` });
		}

		const recent = hp.getRecent(3);
		expect(recent).toHaveLength(3);
	});

	test("reset clears log and stats", () => {
		const hp = new HoneyPot();
		const shell = mockShell();
		hp.attach(shell, mockVfs(), mockUsers());

		shell.emit("command", { cmd: "ls" });
		expect(hp.getAuditLog()).toHaveLength(1);

		hp.reset();
		expect(hp.getAuditLog()).toHaveLength(0);
		expect(hp.getStats().commands).toBe(0);
	});

	test("detectAnomalies - high auth failure rate", () => {
		const hp = new HoneyPot();
		const ssh = mockSsh();
		hp.attach(mockShell(), mockVfs(), mockUsers(), ssh);

		ssh.emit("auth:failure", { user: "x" });
		ssh.emit("auth:failure", { user: "x" });
		ssh.emit("auth:failure", { user: "x" });

		const anomalies = hp.detectAnomalies();
		expect(anomalies.some((a) => a.type === "excessive_auth_failures")).toBe(
			false
		);

		for (let i = 0; i < 12; i++) {
			ssh.emit("auth:failure", { user: "x" });
		}

		const anomalies2 = hp.detectAnomalies();
		expect(anomalies2.some((a) => a.type === "excessive_auth_failures")).toBe(
			true
		);
	});

	test("detectAnomalies - high command volume", () => {
		const hp = new HoneyPot();
		const shell = mockShell();
		hp.attach(shell, mockVfs(), mockUsers());

		for (let i = 0; i < 1001; i++) {
			shell.emit("command", { cmd: "ls" });
		}

		const anomalies = hp.detectAnomalies();
		expect(anomalies.some((a) => a.type === "high_command_volume")).toBe(true);
	});

	test("maxLogSize trims oldest entries", () => {
		const hp = new HoneyPot(5);
		const shell = mockShell();
		hp.attach(shell, mockVfs(), mockUsers());

		for (let i = 0; i < 10; i++) {
			shell.emit("command", { cmd: `cmd-${i}` });
		}

		expect(hp.getAuditLog()).toHaveLength(5);
	});

	test("logs VFS mirror:flush event", () => {
		const hp = new HoneyPot();
		const vfs = mockVfs();
		hp.attach(mockShell(), vfs, mockUsers());

		vfs.emit("mirror:flush");

		const log = hp.getAuditLog();
		expect(log).toHaveLength(1);
		expect(log[0]!.type).toBe("mirror:flush");
	});

	test("logs SSH start/stop events", () => {
		const hp = new HoneyPot();
		const ssh = mockSsh();
		hp.attach(mockShell(), mockVfs(), mockUsers(), ssh);

		ssh.emit("start", { port: 2222 });
		ssh.emit("stop");

		const log = hp.getAuditLog();
		expect(log).toHaveLength(2);
		expect(log[0]!.source).toBe("SshMimic");
		expect(log[1]!.source).toBe("SshMimic");
	});

	test("logs VirtualUserManager session events", () => {
		const hp = new HoneyPot();
		const users = mockUsers();
		hp.attach(mockShell(), mockVfs(), users);

		users.emit("session:register", { id: "s1", user: "root" });

		const log = hp.getAuditLog();
		expect(log).toHaveLength(1);
		expect(log[0]!.source).toBe("VirtualUserManager");
		expect(log[0]!.type).toBe("session:register");
	});
});
