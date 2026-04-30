/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import type { FileEntryWithStats, SFTPWrapper } from "ssh2";
import { Client } from "ssh2";
import { SftpMimic } from "../src/SSHMimic/sftp";
import VirtualFileSystem from "../src/VirtualFileSystem";
import { VirtualUserManager } from "../src/VirtualUserManager";

// VirtualFileSystem is now pure in-memory — no temp dir or cleanup needed.

function connectSftp(port: number): Promise<{ client: Client; sftp: SFTPWrapper }> {
	return new Promise((resolve, reject) => {
		const client = new Client();
		client.on("ready", () => {
			client.sftp((err, sftp) => {
				if (err) { client.end(); reject(err); return; }
				resolve({ client, sftp });
			});
		});
		client.on("error", reject);
		client.connect({
			host: "127.0.0.1",
			port,
			username: "root",
			password: "",           // root has no password — any value or empty is accepted
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
				if (err) { client.end(); reject(err); return; }
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
		const vfs   = new VirtualFileSystem();
		const users = new VirtualUserManager(vfs);

		await users.initialize();

		const rootPath = "/home/root";
		if (!vfs.exists(rootPath)) {
			vfs.mkdir(rootPath, 0o755);
		}
		vfs.writeFile(`${rootPath}/TEST.txt`, "hello world");

		const server = new SftpMimic({ port: 0, hostname: "test-sftp", vfs, users });
		const port = await server.start();

		try {
			const { client, sftp } = await connectSftp(port);

			const list = await new Promise<FileEntryWithStats[]>((resolve, reject) => {
				sftp.readdir("/home/root", (err?: Error | null, list?: FileEntryWithStats[]) => {
					if (err) { reject(err); return; }
					resolve(list || []);
				});
			});

			expect(list.map((entry) => entry.filename)).toContain("TEST.txt");

			const content = await new Promise<string>((resolve, reject) => {
				sftp.readFile("/home/root/TEST.txt", "utf8", (err?: Error | null, data?: Buffer) => {
					if (err) { reject(err); return; }
					resolve((data || Buffer.alloc(0)).toString("utf8"));
				});
			});

			expect(content).toBe("hello world");
			client.end();
		} finally {
			server.stop();
		}
	});

	test("blocks path traversal attempts outside home directory", async () => {
		const vfs   = new VirtualFileSystem();
		const users = new VirtualUserManager(vfs);

		await users.initialize();

		const rootPath = "/home/root";
		if (!vfs.exists(rootPath)) {
			vfs.mkdir(rootPath, 0o755);
		}

		const server = new SftpMimic({ port: 0, hostname: "test-sftp", vfs, users });
		const port = await server.start();

		try {
			const { client, sftp } = await connectSftp(port);

			// /etc/passwd is outside /home/root — should be rejected
			const traversalAttempt = await new Promise<Error | null>((resolve) => {
				sftp.stat("/etc/passwd", (err?: Error | null) => { resolve(err ?? null); });
			});

			expect(traversalAttempt).not.toBeNull();
			expect(traversalAttempt?.message).toContain("Permission denied");

			// /home/root itself should work
			const homeAccess = await new Promise<FileEntryWithStats[]>((resolve, reject) => {
				sftp.readdir("/home/root", (err?: Error | null, list?: FileEntryWithStats[]) => {
					if (err) { reject(err); return; }
					resolve(list || []);
				});
			});
			expect(homeAccess).toBeDefined();

			// Path traversal via ../.. should also be rejected
			const upTraversalAttempt = await new Promise<Error | null>((resolve) => {
				sftp.readdir("/home/root/../../etc", (err?: Error | null) => { resolve(err ?? null); });
			});
			expect(upTraversalAttempt).not.toBeNull();

			client.end();
		} finally {
			server.stop();
		}
	});

	test("allows a user with a password to authenticate", async () => {
		const vfs   = new VirtualFileSystem();
		const users = new VirtualUserManager(vfs);

		await users.initialize();
		await users.addUser("alice", "alice-pass");

		// Ensure alice's home exists (addUser should create it, but let's be explicit)
		if (!vfs.exists("/home/alice")) {
			vfs.mkdir("/home/alice", 0o755);
		}
		vfs.writeFile("/home/alice/hello.txt", "hi alice");

		const server = new SftpMimic({ port: 0, hostname: "test-sftp", vfs, users });
		const port = await server.start();

		try {
			const { client, sftp } = await connectSftpWithUser(port, "alice", "alice-pass");

			const list = await new Promise<FileEntryWithStats[]>((resolve, reject) => {
				sftp.readdir("/home/alice", (err?: Error | null, list?: FileEntryWithStats[]) => {
					if (err) { reject(err); return; }
					resolve(list || []);
				});
			});

			expect(list.map((e) => e.filename)).toContain("hello.txt");

			client.end();
		} finally {
			server.stop();
		}
	});

	test("rejects a user with a wrong password", async () => {
		const vfs   = new VirtualFileSystem();
		const users = new VirtualUserManager(vfs);

		await users.initialize();
		await users.addUser("bob", "correct-pass");

		const server = new SftpMimic({ port: 0, hostname: "test-sftp", vfs, users });
		const port = await server.start();

		try {
			const connectPromise = connectSftpWithUser(port, "bob", "wrong-pass");
			await expect(connectPromise).rejects.toThrow();
		} finally {
			server.stop();
		}
	});

	test("allows writing and reading back a file over SFTP", async () => {
		const vfs   = new VirtualFileSystem();
		const users = new VirtualUserManager(vfs);

		await users.initialize();

		if (!vfs.exists("/home/root")) {
			vfs.mkdir("/home/root", 0o755);
		}

		const server = new SftpMimic({ port: 0, hostname: "test-sftp", vfs, users });
		const port = await server.start();

		try {
			const { client, sftp } = await connectSftp(port);

			await new Promise<void>((resolve, reject) => {
				sftp.writeFile(
					"/home/root/written.txt",
					Buffer.from("written via sftp"),
					(err?: Error | null) => {
						if (err) { reject(err); return; }
						resolve();
					},
				);
			});

			const content = await new Promise<string>((resolve, reject) => {
				sftp.readFile(
					"/home/root/written.txt",
					"utf8",
					(err?: Error | null, data?: Buffer) => {
						if (err) { reject(err); return; }
						resolve((data || Buffer.alloc(0)).toString("utf8"));
					},
				);
			});

			expect(content).toBe("written via sftp");

			// Also verify it landed in the in-memory VFS
			expect(vfs.readFile("/home/root/written.txt")).toBe("written via sftp");

			client.end();
		} finally {
			server.stop();
		}
	});
});
