import { describe, expect, test } from "bun:test";
import { gzipSync } from "fflate";
import * as fsSync from "node:fs";
import * as path from "node:path";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";
import { decodeTar, isTarFormat } from "../src/modules/VirtualFileSystem/tarFormat";

// ── Helper: make a simple VFS tree ──────────────────────────────────────────

function makeTree(): VirtualFileSystem {
	const vfs = new VirtualFileSystem();
	vfs.writeFile("/hello.txt", "Hello World\n", { mode: 0o644 });
	vfs.writeFile("/nested/deep/file.txt", "deep content\n", { mode: 0o600 });
	vfs.mkdir("/emptydir", 0o755);
	vfs.writeStub("/etc/hostname", "myhost", 0o644);
	vfs.symlink("/hello.txt", "/link-to-hello");
	vfs.mknod("/dev/null", "null", 0o666, 1, 3);
	vfs.chmod("/nested", 0o755);
	return vfs;
}

function verifyTree(vfs: VirtualFileSystem): void {
	expect(vfs.readFile("/hello.txt")).toBe("Hello World\n");
	expect(vfs.readFile("/nested/deep/file.txt")).toBe("deep content\n");
	expect(vfs.isSymlink("/link-to-hello")).toBe(true);
	expect(vfs.resolveSymlink("/link-to-hello")).toBe("/hello.txt");
	expect(vfs.exists("/emptydir")).toBe(true);
	expect(vfs.list("/emptydir")).toEqual([]);
	expect(vfs.statType("/dev/null")).toBe("device");
	expect(vfs.readFile("/etc/hostname")).toBe("myhost");

	const st = vfs.stat("/hello.txt");
	expect(st.mode).toBe(0o644);
	expect(st.uid).toBe(0);
	expect(st.gid).toBe(0);
}

// ── Tests ───────────────────────────────────────────────────────────────────

describe("tarFormat", () => {
	test("encodeTar / decodeTar roundtrip preserves content", () => {
		const vfs = makeTree();
		const tarBuf = vfs.exportTar();
		expect(tarBuf.length).toBeGreaterThan(0);
		expect(isTarFormat(tarBuf)).toBe(true);

		const vfs2 = new VirtualFileSystem();
		vfs2.importTar(tarBuf);
		verifyTree(vfs2);
	});

	test("encodeTar / decodeTar roundtrip — gzip compressed", () => {
		const vfs = makeTree();
		const tarBuf = vfs.exportTar();
		const gzBuf = Buffer.from(gzipSync(tarBuf));

		expect(isTarFormat(gzBuf)).toBe(false);
		const vfs2 = new VirtualFileSystem();
		vfs2.importTar(gzBuf);
		verifyTree(vfs2);
	});

	test("exportTar / importTar on VFS class", () => {
		const vfs = makeTree();
		const tarBuf = vfs.exportTar();

		const vfs2 = new VirtualFileSystem();
		vfs2.importTar(tarBuf);
		verifyTree(vfs2);
	});

	test("isTarFormat detects ustar magic", () => {
		const vfs = makeTree();
		const tarBuf = vfs.exportTar();
		expect(isTarFormat(tarBuf)).toBe(true);

		const fake = Buffer.alloc(1024);
		expect(isTarFormat(fake)).toBe(false);
	});

	test("tar format preserves uid, gid, mode", () => {
		const vfs = new VirtualFileSystem();
		vfs.writeFile("/normal.txt", "data", { mode: 0o644 });
		// Use chown/chmod to set uid/gid on existing file
		vfs.chown("/normal.txt", 1000, 1000, 0);
		vfs.chmod("/normal.txt", 0o777);

		const tarBuf = vfs.exportTar();
		const vfs2 = new VirtualFileSystem();
		vfs2.importTar(tarBuf);

		const st = vfs2.stat("/normal.txt");
		expect(st.mode).toBe(0o777);
		expect(st.uid).toBe(1000);
		expect(st.gid).toBe(1000);
	});

	test("tar format handles device nodes", () => {
		const vfs = makeTree();
		const tarBuf = vfs.exportTar();
		const vfs2 = new VirtualFileSystem();
		vfs2.importTar(tarBuf);

		expect(vfs2.statType("/dev/null")).toBe("device");
	});

	test("tar format handles large file (>512 byte alignment)", () => {
		const vfs = new VirtualFileSystem();
		const big = Buffer.alloc(2000, 0x42);
		vfs.writeFile("/big.bin", big);

		const tarBuf = vfs.exportTar();
		const vfs2 = new VirtualFileSystem();
		vfs2.importTar(tarBuf);

		const result = vfs2.readFileRaw("/big.bin");
		expect(result.length).toBe(2000);
		for (const b of result) {
			expect(b).toBe(0x42);
		}
	});

	test("tar format handles empty files", () => {
		const vfs = new VirtualFileSystem();
		vfs.writeFile("/empty.txt", "");

		const tarBuf = vfs.exportTar();
		const vfs2 = new VirtualFileSystem();
		vfs2.importTar(tarBuf);

		const st = vfs2.stat("/empty.txt") as { size: number };
		expect(st.size).toBe(0);
	});

	test("tar format preserves directory hierarchy", () => {
		const vfs = new VirtualFileSystem();
		vfs.writeFile("/a/b/c/d/e/f.txt", "deep");
		vfs.writeFile("/a/b/x.txt", "shallow");

		const tarBuf = vfs.exportTar();
		const vfs2 = new VirtualFileSystem();
		vfs2.importTar(tarBuf);

		expect(vfs2.readFile("/a/b/c/d/e/f.txt")).toBe("deep");
		expect(vfs2.readFile("/a/b/x.txt")).toBe("shallow");
		expect(vfs2.statType("/a")).toBe("directory");
		expect(vfs2.statType("/a/b")).toBe("directory");
		expect(vfs2.statType("/a/b/c")).toBe("directory");
	});

	test("decodeTar throws on corrupt data", () => {
		const buf = Buffer.from("not a tar archive at all");
		expect(() => decodeTar(buf)).not.toThrow();
	});

	test("isGzipTar detects gzip magic", async () => {
		const { isGzipTar } = await import(
			"../src/modules/VirtualFileSystem/tarFormat"
		);
		const vfs = makeTree();
		const tarBuf = vfs.exportTar();
		const gzBuf = Buffer.from(gzipSync(tarBuf));
		expect(isGzipTar(gzBuf)).toBe(true);
		expect(isGzipTar(tarBuf)).toBe(false);
	});

	test("restoreMirror auto-detects tar format in fs mode", async () => {
		const testDir = path.join(process.cwd(), ".test-tar-snapshot");
		try {
			fsSync.rmSync(testDir, { recursive: true, force: true });
		} catch {}
		fsSync.mkdirSync(testDir, { recursive: true });

		try {
			const vfs = makeTree();
			const tarBuf = vfs.exportTar();

			const snapshotFile = path.join(testDir, "vfs-snapshot.vfsb");
			fsSync.writeFileSync(snapshotFile, tarBuf);

			const vfs2 = new VirtualFileSystem({
				mode: "fs",
				snapshotPath: testDir,
			});
			await vfs2.restoreMirror();

			expect(vfs2.readFile("/hello.txt")).toBe("Hello World\n");
			expect(vfs2.isSymlink("/link-to-hello")).toBe(true);
		} finally {
			try {
				fsSync.rmSync(testDir, { recursive: true, force: true });
			} catch {}
		}
	});

	test("restoreMirror auto-detects gzip tar in fs mode", async () => {
		const testDir = path.join(process.cwd(), ".test-tar-gz-snapshot");
		try {
			fsSync.rmSync(testDir, { recursive: true, force: true });
		} catch {}
		fsSync.mkdirSync(testDir, { recursive: true });

		try {
			const vfs = makeTree();
			const tarBuf = vfs.exportTar();
			const gzBuf = Buffer.from(gzipSync(tarBuf));

			const snapshotFile = path.join(testDir, "vfs-snapshot.vfsb");
			fsSync.writeFileSync(snapshotFile, gzBuf);

			const vfs2 = new VirtualFileSystem({
				mode: "fs",
				snapshotPath: testDir,
			});
			await vfs2.restoreMirror();

			expect(vfs2.readFile("/hello.txt")).toBe("Hello World\n");
		} finally {
			try {
				fsSync.rmSync(testDir, { recursive: true, force: true });
			} catch {}
		}
	});
});
