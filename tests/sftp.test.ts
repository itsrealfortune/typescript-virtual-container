/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import type { FileEntryWithStats, SFTPWrapper } from "ssh2";
import { Client } from "ssh2";
import { SftpMimic } from "../src/SSHMimic/sftp";
import VirtualFileSystem from "../src/VirtualFileSystem";
import { VirtualUserManager } from "../src/VirtualUserManager";

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

describe("SftpMimic", () => {
	test("authenticates with VirtualUserManager and serves files from the VirtualFileSystem", async () => {
		const vfs = new VirtualFileSystem();
		const users = new VirtualUserManager(vfs, "root");
		await users.initialize();

		const rootPath = "/home/root";
		if (!vfs.exists(rootPath)) {
			vfs.mkdir(rootPath, 0o755);
		}
		vfs.writeFile(`${rootPath}/TEST.txt`, "hello world");

		const server = new SftpMimic({ port: 0, hostname: "test-sftp", vfs, users });
		const port = await server.start();

		const { client, sftp } = await connectSftp(port);
		const list = await new Promise<FileEntryWithStats[]>((resolve, reject) => {
			sftp.readdir(
				"/home/root",
				(err: Error | undefined, list: FileEntryWithStats[]) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(list);
				},
			);
		});

		expect(list.map((entry) => entry.filename)).toContain("TEST.txt");

		const content = await new Promise<string>((resolve, reject) => {
			sftp.readFile(
				"/home/root/TEST.txt",
				"utf8",
				(err: Error | undefined, data: Buffer) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(data.toString("utf8"));
				},
			);
		});

		expect(content).toBe("hello world");
		client.end();
		server.stop();
	});
});
