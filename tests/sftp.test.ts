/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { rmSync } from "node:fs";
import type { FileEntryWithStats, SFTPWrapper } from "ssh2";
import { Client } from "ssh2";
import { SftpMimic } from "../src/SSHMimic/sftp";
import VirtualFileSystem from "../src/VirtualFileSystem";
import { VirtualUserManager } from "../src/VirtualUserManager";

function makeTempBasePath(): string {
	return `./temp-test-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function connectSftp(port: number): Promise<{ client: Client; sftp: SFTPWrapper }> {
	return new Promise((resolve, reject) => {
		const client = new Client();
		client.on("ready", () => {
			client.sftp((err, sftp) => {
				if (err) {
					client.end();
					reject(err);
					return;
				}
				resolve({ client, sftp });
			});
		});

		client.on("error", reject);
		client.connect({
			host: "127.0.0.1",
			port,
			username: "root",
			password: "root",
			hostVerifier: () => true,
		});
	});
}

function connectSftpWithUser(
	port: number,
	username: string,
	password: string,
): Promise<{ client: Client; sftp: SFTPWrapper }> {
	return new Promise((resolve, reject) => {
		const client = new Client();
		client.on("ready", () => {
			client.sftp((err, sftp) => {
				if (err) {
					client.end();
					reject(err);
					return;
				}
				resolve({ client, sftp });
			});
		});

		client.on("error", reject);
		client.connect({
			host: "127.0.0.1",
			port,
			username,
			password,
			hostVerifier: () => true,
		});
	});
}

describe("SftpMimic", () => {
	test("authenticates with VirtualUserManager and serves files from the VirtualFileSystem", async () => {
		const tempBasePath = makeTempBasePath();
		const vfs = new VirtualFileSystem(tempBasePath);
		const users = new VirtualUserManager(vfs, "root");

		try {
			await users.initialize();

			const rootPath = "/home/root";
			if (!vfs.exists(rootPath)) {
				vfs.mkdir(rootPath, 0o755);
			}
			vfs.writeFile(`${rootPath}/TEST.txt`, "hello world");

			const server = new SftpMimic({
				port: 0,
				hostname: "test-sftp",
				vfs,
				users,
			});
			const port = await server.start();

			const { client, sftp } = await connectSftp(port);
			const list = await new Promise<FileEntryWithStats[]>((resolve, reject) => {
				sftp.readdir(
					"/home/root",
					(err?: Error | null, list?: FileEntryWithStats[]) => {
						if (err) {
							reject(err);
							return;
						}
						resolve(list || []);
					},
				);
			});

			expect(list.map((entry) => entry.filename)).toContain("TEST.txt");

			const content = await new Promise<string>((resolve, reject) => {
				sftp.readFile(
					"/home/root/TEST.txt",
					"utf8",
					(err?: Error | null, data?: Buffer) => {
						if (err) {
							reject(err);
							return;
						}
						resolve((data || Buffer.alloc(0)).toString("utf8"));
					},
				);
			});

			expect(content).toBe("hello world");
			client.end();
			server.stop();
		} finally {
			rmSync(tempBasePath, { recursive: true, force: true });
		}
	});

	test("blocks path traversal attempts outside home directory", async () => {
		const tempBasePath = makeTempBasePath();
		const vfs = new VirtualFileSystem(tempBasePath);
		const users = new VirtualUserManager(vfs, "root");

		try {
			await users.initialize();

			const rootPath = "/home/root";
			if (!vfs.exists(rootPath)) {
				vfs.mkdir(rootPath, 0o755);
			}

			const server = new SftpMimic({
				port: 0,
				hostname: "test-sftp",
				vfs,
				users,
			});
			const port = await server.start();

			const { client, sftp } = await connectSftp(port);

			// Try to read /etc/passwd (outside home directory) - should fail with PERMISSION_DENIED
			const traversalAttempt = await new Promise<Error | null>((resolve) => {
				sftp.stat(
					"/etc/passwd",
					(err?: Error | null) => {
						resolve(err ?? null);
					},
				);
			});

			expect(traversalAttempt).not.toBeNull();
			expect(traversalAttempt?.message).toContain("Permission denied");

			// Try to access /home/root which should work
			const homeAccess = await new Promise<FileEntryWithStats[]>((
				resolve,
				reject,
			) => {
				sftp.readdir(
					"/home/root",
					(err?: Error | null, list?: FileEntryWithStats[]) => {
						if (err) {
							reject(err);
							return;
						}
						resolve(list || []);
					},
				);
			});

			expect(homeAccess).toBeDefined();

			// Try to go up with ../ - should fail
			const upTraversalAttempt = await new Promise<Error | null>((resolve) => {
				sftp.readdir(
					"/home/root/../../etc",
					(err?: Error | null) => {
						resolve(err ?? null);
					},
				);
			});

			expect(upTraversalAttempt).not.toBeNull();

			client.end();
			server.stop();
		} finally {
			rmSync(tempBasePath, { recursive: true, force: true });
		}
	});

	test("auto-creates current system user on initialization", async () => {
		// Use a unique temp directory for this test to avoid VFS sharing
		const tempPath = `./temp-test-${Date.now()}-${Math.random().toString(36).slice(2)}`;
		const vfs = new VirtualFileSystem(tempPath);
		const users = new VirtualUserManager(vfs, "testpass");
		await users.initialize();

		// Verify that the current system user was created
		const currentUser = process.env.USER || process.env.USERNAME;
		if (currentUser && currentUser !== "root") {
			// Should be able to verify password with the default password (testpass)
			const passwordValid = users.verifyPassword(currentUser, "testpass");
			expect(passwordValid).toBe(true);

			// Home directory should exist
			const homePath = `/home/${currentUser}`;
			expect(vfs.exists(homePath)).toBe(true);

			// README.txt should exist in home
			const readmePath = `${homePath}/README.txt`;
			expect(vfs.exists(readmePath)).toBe(true);
		}

		// Cleanup
		const fs = await import("node:fs");
		fs.rmSync(tempPath, { recursive: true, force: true });
	});

	test("allows system user to authenticate and access SFTP", async () => {
		const tempBasePath = makeTempBasePath();
		const vfs = new VirtualFileSystem(tempBasePath);
		const users = new VirtualUserManager(vfs, "root");

		try {
			await users.initialize();

			// Verify system user was created with the default password
			const currentUser = process.env.USER || process.env.USERNAME;
			if (!currentUser || currentUser === "root") {
				// Skip test if we can't determine current user
				return;
			}

			// Ensure a deterministic password for environments where user data may persist.
			await users.setPassword(currentUser, "root");

			const server = new SftpMimic({
				port: 0,
				hostname: "test-sftp",
				vfs,
				users,
			});
			const port = await server.start();

			// Connect as the system user (which was auto-created during initialize)
			const { client, sftp } = await connectSftpWithUser(
				port,
				currentUser,
				"root",
			);

			// User should be able to list their home directory
			const list = await new Promise<FileEntryWithStats[]>((resolve, reject) => {
				sftp.readdir(
					`/home/${currentUser}`,
					(err?: Error | null, list?: FileEntryWithStats[]) => {
						if (err) {
							reject(err);
							return;
						}
						resolve(list || []);
					},
				);
			});

			// README.txt should be in the home directory
			expect(list.map((e) => e.filename)).toContain("README.txt");

			// Create a file as the system user
			await new Promise<void>((resolve, reject) => {
				sftp.writeFile(
					`/home/${currentUser}/test-file.txt`,
					Buffer.from("WinSCP test"),
					(err?: Error | null) => {
						if (err) {
							reject(err);
							return;
						}
						resolve();
					},
				);
			});

			// Read the file back
			const content = await new Promise<string>((resolve, reject) => {
				sftp.readFile(
					`/home/${currentUser}/test-file.txt`,
					"utf8",
					(err?: Error | null, data?: Buffer) => {
						if (err) {
							reject(err);
							return;
						}
						resolve((data || Buffer.alloc(0)).toString("utf8"));
					},
				);
			});

			expect(content).toBe("WinSCP test");

			client.end();
			server.stop();
		} finally {
			rmSync(tempBasePath, { recursive: true, force: true });
		}
	});
});
