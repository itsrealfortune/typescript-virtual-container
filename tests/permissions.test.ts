import {describe, expect, test} from "bun:test";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";

function makeVfs() {
	return new VirtualFileSystem();
}

function createTestDir(
	vfs: VirtualFileSystem,
	path: string,
	uid: number,
	gid: number
) {
	// Create parent path as root if needed, then set ownership
	const parts = path.split("/").filter(Boolean);
	let current = "";
	for (const part of parts) {
		current += `/${part}`;
		if (!vfs.exists(current)) {
			vfs.mkdir(current, 0o755, 0, 0);
		}
	}
	// Set final directory ownership
	vfs.chown(path, uid, gid, 0);
}

function createWritableTestDir(
	vfs: VirtualFileSystem,
	path: string,
	uid: number,
	gid: number
) {
	const parts = path.split("/").filter(Boolean);
	let current = "";
	for (const part of parts) {
		current += `/${part}`;
		if (!vfs.exists(current)) {
			vfs.mkdir(current, 0o777, 0, 0);
		}
	}
	vfs.chown(path, uid, gid, 0);
	vfs.chmod(path, 0o777, 0);
}

describe("VFS permission enforcement", () => {
	test("root can read any file", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/root", 0, 0);
		vfs.writeFile("/root/secret.txt", "secret", {mode: 0o000}, 0, 0);
		expect(vfs.readFile("/root/secret.txt", 0, 0)).toBe("secret");
	});

	test("root can write any file", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/root", 0, 0);
		vfs.writeFile("/root/secret.txt", "secret", {mode: 0o000}, 0, 0);
		expect(() =>
			vfs.writeFile("/root/secret.txt", "new", {}, 0, 0)
		).not.toThrow();
	});

	test("non-root cannot read file without r permission", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/secret.txt", "secret", {mode: 0o000}, 0, 0);
		expect(() => vfs.readFile("/shared/secret.txt", 1001, 1001)).toThrow(
			/EACCES/
		);
	});

	test("non-root can read world-readable file", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/pub.txt", "public", {mode: 0o644}, 0, 0);
		expect(vfs.readFile("/shared/pub.txt", 1001, 1001)).toBe("public");
	});

	test("non-root cannot write file without w permission", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/secret.txt", "secret", {mode: 0o444}, 0, 0);
		expect(() =>
			vfs.writeFile("/shared/secret.txt", "new", {}, 1001, 1001)
		).toThrow(/EACCES/);
	});

	test("owner can read file with 0o700 permission", () => {
		const vfs = makeVfs();
		vfs.mkdir("/home", 0o755, 0, 0);
		vfs.chown("/home", 1001, 1001, 0);
		vfs.mkdir("/home/alice", 0o755, 1001, 1001);
		vfs.writeFile(
			"/home/alice/private.txt",
			"private",
			{mode: 0o700},
			1001,
			1001
		);
		expect(vfs.readFile("/home/alice/private.txt", 1001, 1001)).toBe("private");
	});

	test("other user cannot read owner-only file", () => {
		const vfs = makeVfs();
		vfs.mkdir("/home", 0o755, 0, 0);
		vfs.chown("/home", 1001, 1001, 0);
		vfs.mkdir("/home/alice", 0o755, 1001, 1001);
		vfs.writeFile(
			"/home/alice/private.txt",
			"private",
			{mode: 0o700},
			1001,
			1001
		);
		expect(() => vfs.readFile("/home/alice/private.txt", 1002, 1002)).toThrow(
			/EACCES/
		);
	});

	test("cannot remove file from sticky dir as other user", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/tmp", 0, 0);
		vfs.chmod("/tmp", 0o1777, 0);
		vfs.writeFile("/tmp/alice-file.txt", "data", {mode: 0o644}, 1001, 1001);
		expect(() => vfs.remove("/tmp/alice-file.txt", {}, 1002, 1002)).toThrow(
			/EACCES/
		);
	});

	test("owner can remove own file from sticky dir", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/tmp", 0, 0);
		vfs.chmod("/tmp", 0o1777, 0);
		vfs.writeFile("/tmp/alice-file.txt", "data", {mode: 0o644}, 1001, 1001);
		expect(() =>
			vfs.remove("/tmp/alice-file.txt", {}, 1001, 1001)
		).not.toThrow();
	});

	test("path traversal: blocked by unsearchable parent", () => {
		const vfs = makeVfs();
		vfs.mkdir("/restricted", 0o700, 0, 0);
		vfs.writeFile("/restricted/secret.txt", "secret", {mode: 0o644}, 0, 0);
		expect(() => vfs.readFile("/restricted/secret.txt", 1001, 1001)).toThrow(
			/EACCES/
		);
	});

	test("chown requires root", () => {
		const vfs = makeVfs();
		createWritableTestDir(vfs, "/shared", 1001, 1001);
		vfs.writeFile("/shared/f.txt", "data", {mode: 0o644}, 1001, 1001);
		expect(() => vfs.chown("/shared/f.txt", 1002, 1002, 1001)).toThrow(/EPERM/);
	});

	test("root can chown", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/f.txt", "data", {mode: 0o644}, 0, 0);
		expect(() => vfs.chown("/shared/f.txt", 1001, 1001, 0)).not.toThrow();
		const owner = vfs.getOwner("/shared/f.txt");
		expect(owner.uid).toBe(1001);
		expect(owner.gid).toBe(1001);
	});

	test("chmod requires owner", () => {
		const vfs = makeVfs();
		createWritableTestDir(vfs, "/shared", 1001, 1001);
		vfs.writeFile("/shared/f.txt", "data", {mode: 0o644}, 1001, 1001);
		expect(() => vfs.chmod("/shared/f.txt", 0o600, 1002)).toThrow(/EPERM/);
	});

	test("owner can chmod own file", () => {
		const vfs = makeVfs();
		createWritableTestDir(vfs, "/shared", 1001, 1001);
		vfs.writeFile("/shared/f.txt", "data", {mode: 0o644}, 1001, 1001);
		expect(() => vfs.chmod("/shared/f.txt", 0o600, 1001)).not.toThrow();
	});

	test("root can chmod any file", () => {
		const vfs = makeVfs();
		createWritableTestDir(vfs, "/shared", 1001, 1001);
		vfs.writeFile("/shared/f.txt", "data", {mode: 0o644}, 1001, 1001);
		expect(() => vfs.chmod("/shared/f.txt", 0o600, 0)).not.toThrow();
	});

	test("mkdir with uid/gid creates directory owned by caller", () => {
		const vfs = makeVfs();
		vfs.mkdir("/home", 0o755, 0, 0);
		vfs.chown("/home", 1001, 1001, 0);
		vfs.mkdir("/home/testuser", 0o700, 1001, 1001);
		const owner = vfs.getOwner("/home/testuser");
		expect(owner.uid).toBe(1001);
		expect(owner.gid).toBe(1001);
	});

	test("symlink with uid/gid creates symlink owned by caller", () => {
		const vfs = makeVfs();
		createWritableTestDir(vfs, "/shared", 1001, 1001);
		vfs.symlink("/target", "/shared/link", 1001, 1001);
		const owner = vfs.getOwner("/shared/link");
		expect(owner.uid).toBe(1001);
	});

	test("writeFile updates uid/gid on existing file", () => {
		const vfs = makeVfs();
		createWritableTestDir(vfs, "/shared", 1001, 1001);
		vfs.writeFile("/shared/f.txt", "old", {mode: 0o666}, 0, 0);
		vfs.writeFile("/shared/f.txt", "new", {mode: 0o644}, 1001, 1001);
		const owner = vfs.getOwner("/shared/f.txt");
		expect(owner.uid).toBe(1001);
		expect(vfs.readFile("/shared/f.txt", 1001, 1001)).toBe("new");
	});

	test("root bypass with execute check fails when no x bit", () => {
		const vfs = makeVfs();
		createTestDir(vfs, "/shared", 0, 0);
		vfs.writeFile("/shared/nox.sh", "echo hi", {mode: 0o644}, 0, 0);
		expect(vfs.checkAccess("/shared/nox.sh", 0, 0, 4)).toBe(true);
	});

	test("permission denied when mode has no other bits", () => {
		const vfs = makeVfs();
		createWritableTestDir(vfs, "/shared", 1001, 1001);
		vfs.writeFile("/shared/no-other.txt", "secret", {mode: 0o740}, 1001, 1001);
		expect(vfs.checkAccess("/shared/no-other.txt", 1001, 1001, 4)).toBe(true);
		expect(vfs.checkAccess("/shared/no-other.txt", 1002, 1002, 4)).toBe(false);
	});

	test("non-sudo user cannot read /root directory", () => {
		const vfs = makeVfs();
		vfs.mkdir("/root", 0o700, 0, 0);
		expect(vfs.checkAccess("/root", 1001, 1001, 4)).toBe(false);
	});

	test("non-sudo user cannot write to /root directory", () => {
		const vfs = makeVfs();
		vfs.mkdir("/root", 0o700, 0, 0);
		expect(vfs.checkAccess("/root", 1001, 1001, 2)).toBe(false);
	});

	test("non-sudo user cannot create file in /root", () => {
		const vfs = makeVfs();
		vfs.mkdir("/root", 0o700, 0, 0);
		expect(() =>
			vfs.writeFile("/root/malicious.txt", "data", {}, 1001, 1001)
		).toThrow(/EACCES/);
	});

	test("non-sudo user cannot read file inside /root", () => {
		const vfs = makeVfs();
		vfs.mkdir("/root", 0o700, 0, 0);
		vfs.writeFile("/root/id_rsa", "key", {mode: 0o600}, 0, 0);
		expect(() => vfs.readFile("/root/id_rsa", 1001, 1001)).toThrow(/EACCES/);
	});

	test("non-sudo user cannot delete file in /root", () => {
		const vfs = makeVfs();
		vfs.mkdir("/root", 0o700, 0, 0);
		vfs.writeFile("/root/important.txt", "data", {mode: 0o644}, 0, 0);
		expect(() => vfs.remove("/root/important.txt", {}, 1001, 1001)).toThrow(
			/EACCES/
		);
	});
});

describe("linuxrootfs write protection for non-sudoers", () => {
	test("non-sudo user cannot write to /etc", () => {
		const vfs = makeVfs();
		vfs.mkdir("/etc", 0o755, 0, 0);
		expect(() => vfs.writeFile("/etc/passwd", "fake", {}, 1001, 1001)).toThrow(
			/EACCES/
		);
	});

	test("non-sudo user cannot write to /usr", () => {
		const vfs = makeVfs();
		vfs.mkdir("/usr", 0o755, 0, 0);
		vfs.mkdir("/usr/bin", 0o755, 0, 0);
		expect(() =>
			vfs.writeFile("/usr/bin/fake", "binary", {}, 1001, 1001)
		).toThrow(/EACCES/);
	});

	test("non-sudo user cannot write to /bin", () => {
		const vfs = makeVfs();
		vfs.mkdir("/bin", 0o755, 0, 0);
		expect(() =>
			vfs.writeFile("/bin/backdoor", "script", {}, 1001, 1001)
		).toThrow(/EACCES/);
	});

	test("non-sudo user cannot write to /sbin", () => {
		const vfs = makeVfs();
		vfs.mkdir("/sbin", 0o755, 0, 0);
		expect(() =>
			vfs.writeFile("/sbin/init-hack", "script", {}, 1001, 1001)
		).toThrow(/EACCES/);
	});

	test("non-sudo user cannot write to /lib", () => {
		const vfs = makeVfs();
		vfs.mkdir("/lib", 0o755, 0, 0);
		vfs.mkdir("/lib/modules", 0o755, 0, 0);
		expect(() =>
			vfs.writeFile("/lib/modules/fake.so", "lib", {}, 1001, 1001)
		).toThrow(/EACCES/);
	});

	test("non-sudo user cannot write to /var/log", () => {
		const vfs = makeVfs();
		vfs.mkdir("/var", 0o755, 0, 0);
		vfs.mkdir("/var/log", 0o755, 0, 0);
		expect(() =>
			vfs.writeFile("/var/log/auth.log", "forged", {}, 1001, 1001)
		).toThrow(/EACCES/);
	});

	test("non-sudo user cannot create directory in /etc", () => {
		const vfs = makeVfs();
		vfs.mkdir("/etc", 0o755, 0, 0);
		expect(() => vfs.mkdir("/etc/evil.d", 0o755, 1001, 1001)).toThrow(/EACCES/);
	});

	test("non-sudo user cannot remove system file", () => {
		const vfs = makeVfs();
		vfs.mkdir("/etc", 0o755, 0, 0);
		vfs.writeFile("/etc/hosts", "127.0.0.1 localhost", {mode: 0o644}, 0, 0);
		expect(() => vfs.remove("/etc/hosts", {}, 1001, 1001)).toThrow(/EACCES/);
	});

	test("non-sudo user can still read world-readable system files", () => {
		const vfs = makeVfs();
		vfs.mkdir("/etc", 0o755, 0, 0);
		vfs.writeFile("/etc/hostname", "myhost", {mode: 0o644}, 0, 0);
		expect(vfs.readFile("/etc/hostname", 1001, 1001)).toBe("myhost");
	});

	test("non-sudo user cannot chmod system files", () => {
		const vfs = makeVfs();
		vfs.mkdir("/etc", 0o755, 0, 0);
		vfs.writeFile("/etc/shadow", "root:$6$...", {mode: 0o640}, 0, 0);
		expect(() => vfs.chmod("/etc/shadow", 0o666, 1001)).toThrow(/EPERM/);
	});

	test("non-sudo user cannot chown system files", () => {
		const vfs = makeVfs();
		vfs.mkdir("/etc", 0o755, 0, 0);
		vfs.writeFile("/etc/passwd", "root:x:0:0:...", {mode: 0o644}, 0, 0);
		expect(() => vfs.chown("/etc/passwd", 1001, 1001, 1001)).toThrow(/EPERM/);
	});
});

describe("symlink and move permission enforcement", () => {
	test("non-sudo user cannot create symlink in /root", () => {
		const vfs = makeVfs();
		vfs.mkdir("/root", 0o700, 0, 0);
		expect(() =>
			vfs.symlink("/tmp/target", "/root/evil-link", 1001, 1001)
		).toThrow(/EACCES/);
	});

	test("non-sudo user cannot create symlink in /etc", () => {
		const vfs = makeVfs();
		vfs.mkdir("/etc", 0o755, 0, 0);
		expect(() =>
			vfs.symlink("/tmp/target", "/etc/evil-link", 1001, 1001)
		).toThrow(/EACCES/);
	});

	test("non-sudo user cannot move file into /root", () => {
		const vfs = makeVfs();
		vfs.mkdir("/root", 0o700, 0, 0);
		vfs.mkdir("/tmp", 0o755, 0, 0);
		vfs.chmod("/tmp", 0o777, 0);
		vfs.writeFile("/tmp/myfile.txt", "data", {mode: 0o644}, 1001, 1001);
		expect(() =>
			vfs.move("/tmp/myfile.txt", "/root/stolen.txt", 1001, 1001)
		).toThrow(/EACCES/);
	});

	test("non-sudo user cannot move file into /etc", () => {
		const vfs = makeVfs();
		vfs.mkdir("/etc", 0o755, 0, 0);
		vfs.mkdir("/tmp", 0o755, 0, 0);
		vfs.chmod("/tmp", 0o777, 0);
		vfs.writeFile("/tmp/myfile.txt", "data", {mode: 0o644}, 1001, 1001);
		expect(() =>
			vfs.move("/tmp/myfile.txt", "/etc/fake.conf", 1001, 1001)
		).toThrow(/EACCES/);
	});

	test("non-sudo user cannot move system file", () => {
		const vfs = makeVfs();
		vfs.mkdir("/etc", 0o755, 0, 0);
		vfs.writeFile("/etc/hosts", "127.0.0.1 localhost", {mode: 0o644}, 0, 0);
		vfs.mkdir("/tmp", 0o755, 0, 0);
		vfs.chmod("/tmp", 0o777, 0);
		expect(() =>
			vfs.move("/etc/hosts", "/tmp/stolen-hosts", 1001, 1001)
		).toThrow(/EACCES/);
	});

	test("owner can create symlink in own directory", () => {
		const vfs = makeVfs();
		vfs.mkdir("/home", 0o755, 0, 0);
		vfs.chown("/home", 1001, 1001, 0);
		vfs.mkdir("/home/alice", 0o755, 1001, 1001);
		expect(() =>
			vfs.symlink("/tmp/target", "/home/alice/link", 1001, 1001)
		).not.toThrow();
	});

	test("owner can move own files", () => {
		const vfs = makeVfs();
		vfs.mkdir("/home", 0o755, 0, 0);
		vfs.chown("/home", 1001, 1001, 0);
		vfs.mkdir("/home/alice", 0o755, 1001, 1001);
		vfs.writeFile("/home/alice/old.txt", "data", {mode: 0o644}, 1001, 1001);
		expect(() =>
			vfs.move("/home/alice/old.txt", "/home/alice/new.txt", 1001, 1001)
		).not.toThrow();
	});
});
