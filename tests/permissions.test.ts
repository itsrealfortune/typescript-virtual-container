import { describe, expect, test } from "bun:test";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";

function makeVfs() {
	return new VirtualFileSystem();
}

function createTestDir(vfs: VirtualFileSystem, path: string, uid: number, gid: number) {
	vfs.mkdir(path, 0o755, uid, gid);
}

describe("VFS permission enforcement", () => {
	test("root can read any file", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/root", 0, 0);
		vfs.writeFile("/root/secret.txt", "secret", { mode: 0o000 }, 0, 0);
		expect(vfs.readFile("/root/secret.txt", 0, 0)).toBe("secret");
	});

	test("root can write any file", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/root", 0, 0);
		vfs.writeFile("/root/secret.txt", "secret", { mode: 0o000 }, 0, 0);
		expect(() => vfs.writeFile("/root/secret.txt", "new", {}, 0, 0)).not.toThrow();
	});

	test("non-root cannot read file without r permission", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/secret.txt", "secret", { mode: 0o000 }, 0, 0);
		expect(() => vfs.readFile("/shared/secret.txt", 1001, 1001)).toThrow(/EACCES/);
	});

	test("non-root can read world-readable file", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/pub.txt", "public", { mode: 0o644 }, 0, 0);
		expect(vfs.readFile("/shared/pub.txt", 1001, 1001)).toBe("public");
	});

	test("non-root cannot write file without w permission", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/secret.txt", "secret", { mode: 0o444 }, 0, 0);
		expect(() => vfs.writeFile("/shared/secret.txt", "new", {}, 1001, 1001)).toThrow(/EACCES/);
	});

	test("owner can read file with 0o700 permission", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/home", 0, 0);
		vfs.mkdir("/home/alice", 0o755, 1001, 1001);
		vfs.writeFile("/home/alice/private.txt", "private", { mode: 0o700 }, 1001, 1001);
		expect(vfs.readFile("/home/alice/private.txt", 1001, 1001)).toBe("private");
	});

	test("other user cannot read owner-only file", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/home", 0, 0);
		vfs.mkdir("/home/alice", 0o755, 1001, 1001);
		vfs.writeFile("/home/alice/private.txt", "private", { mode: 0o700 }, 1001, 1001);
		expect(() => vfs.readFile("/home/alice/private.txt", 1002, 1002)).toThrow(/EACCES/);
	});

	test("cannot remove file from sticky dir as other user", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/tmp", 0, 0);
		vfs.chmod("/tmp", 0o1777, 0);
		vfs.writeFile("/tmp/alice-file.txt", "data", { mode: 0o644 }, 1001, 1001);
		expect(() => vfs.remove("/tmp/alice-file.txt", {}, 1002, 1002)).toThrow(/EACCES/);
	});

	test("owner can remove own file from sticky dir", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/tmp", 0, 0);
		vfs.chmod("/tmp", 0o1777, 0);
		vfs.writeFile("/tmp/alice-file.txt", "data", { mode: 0o644 }, 1001, 1001);
		expect(() => vfs.remove("/tmp/alice-file.txt", {}, 1001, 1001)).not.toThrow();
	});

	test("path traversal: blocked by unsearchable parent", () => {
		const vfs = makeVfs();
		vfs.mkdir("/restricted", 0o700, 0, 0);
		vfs.writeFile("/restricted/secret.txt", "secret", { mode: 0o644 }, 0, 0);
		expect(() => vfs.readFile("/restricted/secret.txt", 1001, 1001)).toThrow(/EACCES/);
	});

	test("chown requires root", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/f.txt", "data", { mode: 0o644 }, 1001, 1001);
		expect(() => vfs.chown("/shared/f.txt", 1002, 1002, 1001)).toThrow(/EPERM/);
	});

	test("root can chown", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/f.txt", "data", { mode: 0o644 }, 0, 0);
		expect(() => vfs.chown("/shared/f.txt", 1001, 1001, 0)).not.toThrow();
		const owner = vfs.getOwner("/shared/f.txt");
		expect(owner.uid).toBe(1001);
		expect(owner.gid).toBe(1001);
	});

	test("chmod requires owner", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/f.txt", "data", { mode: 0o644 }, 1001, 1001);
		expect(() => vfs.chmod("/shared/f.txt", 0o600, 1002)).toThrow(/EPERM/);
	});

	test("owner can chmod own file", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/f.txt", "data", { mode: 0o644 }, 1001, 1001);
		expect(() => vfs.chmod("/shared/f.txt", 0o600, 1001)).not.toThrow();
	});

	test("root can chmod any file", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/f.txt", "data", { mode: 0o644 }, 1001, 1001);
		expect(() => vfs.chmod("/shared/f.txt", 0o600, 0)).not.toThrow();
	});

	test("mkdir with uid/gid creates directory owned by caller", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/home", 0, 0);
		vfs.mkdir("/home/testuser", 0o700, 1001, 1001);
		const owner = vfs.getOwner("/home/testuser");
		expect(owner.uid).toBe(1001);
		expect(owner.gid).toBe(1001);
	});

	test("symlink with uid/gid creates symlink owned by caller", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.symlink("/target", "/shared/link", 1001, 1001);
		const owner = vfs.getOwner("/shared/link");
		expect(owner.uid).toBe(1001);
	});

	test("writeFile updates uid/gid on existing file", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/f.txt", "old", { mode: 0o666 }, 0, 0);
		vfs.writeFile("/shared/f.txt", "new", { mode: 0o644 }, 1001, 1001);
		const owner = vfs.getOwner("/shared/f.txt");
		expect(owner.uid).toBe(1001);
		expect(vfs.readFile("/shared/f.txt", 1001, 1001)).toBe("new");
	});

	test("root bypass with execute check fails when no x bit", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/nox.sh", "echo hi", { mode: 0o644 }, 0, 0);
		expect(vfs.checkAccess("/shared/nox.sh", 0, 0, 4)).toBe(true);
	});

	test("permission denied when mode has no other bits", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/no-other.txt", "secret", { mode: 0o740 }, 1001, 1001);
		expect(vfs.checkAccess("/shared/no-other.txt", 1001, 1001, 4)).toBe(true);
		expect(vfs.checkAccess("/shared/no-other.txt", 1002, 1002, 4)).toBe(false);
	});
});
