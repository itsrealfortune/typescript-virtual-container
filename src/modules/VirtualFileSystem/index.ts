/** biome-ignore-all lint/style/useNamingConvention: NW ? */
import * as crypto from "node:crypto";
import { EventEmitter } from "node:events";
import * as fsSync from "node:fs";
import * as path from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";
import type {
	RemoveOptions,
	VfsDeviceNode,
	VfsDirectoryNode,
	VfsFileNode,
	VfsNodeStats,
	VfsSnapshot,
	VfsSnapshotDeviceNode,
	VfsSnapshotDirectoryNode,
	VfsSnapshotFileNode,
	VfsSnapshotNode,
	WriteFileOptions,
} from "../../types/vfs";
import { decodeVfs, encodeVfs, isBinarySnapshot } from "./binaryPack";
import type {
	DeviceKind,
	InternalDeviceNode,
	InternalDirectoryNode,
	InternalFileNode,
	InternalNode,
	InternalStubNode,
} from "./internalTypes";
import { appendJournalEntry, JournalOp, readJournal, truncateJournal } from "./journal";
import { getNodeNormalized, getParentDirectory, normalizePath } from "./path";
import { enforceAccess, enforceChmod, enforceChown, enforceDelete, enforcePathTraversal, R_OK, W_OK } from "./permissions";

// ── Persistence options ───────────────────────────────────────────────────────

/**
 * "memory" — pure in-memory, no disk I/O (default).
 *
 * "fs"     — mirrors the VFS tree to a directory on the host filesystem.
 *             `snapshotPath` must be set to the directory where the binary
 *             snapshot file will be read/written (`vfs-snapshot.vfsb`).
 */
export type VfsPersistenceMode = "memory" | "fs";

export interface VfsOptions {
	/**
	 * Persistence mode.
	 * - `"memory"` (default): no disk access, snapshot via `toSnapshot()`.
	 * - `"fs"`: auto-save JSON snapshot to `snapshotPath` on every
	 *   `flushMirror()` call, and restore from it on `restoreMirror()`.
	 */
	mode?: VfsPersistenceMode;
	/**
	 * Directory used by `"fs"` mode.
	 * The snapshot file will be written to `<snapshotPath>/vfs-snapshot.json`.
	 * Required when `mode` is `"fs"`.
	 */
	snapshotPath?: string;
	/**
	 * Interval in milliseconds between automatic checkpoints in `"fs"` mode.
	 * Set to `0` to disable automatic flushing (manual `flushMirror()` only).
	 * Default: 30_000 (30 seconds).
	 */
	flushIntervalMs?: number;
	/**
	 * Trigger a checkpoint after this many write operations, regardless of the
	 * timer interval. Prevents unbounded journal growth during bulk operations
	 * (e.g. a 15 000-file SFTP transfer). Default: 500.
	 * Set to `0` to disable write-count flushing.
	 */
	flushAfterNWrites?: number;
	/**
	 * Files larger than this threshold (bytes) are evicted from RAM after each
	 * `flushMirror()` and reloaded on demand from the snapshot.
	 * Default: 65536 (64 KB). Set to `0` to disable eviction.
	 * Only applies to `"fs"` mode.
	 */
	evictionThresholdBytes?: number;
}

// ── VirtualFileSystem ─────────────────────────────────────────────────────────

/**
 * In-memory virtual filesystem with optional JSON-snapshot persistence.
 *
 * **Memory mode** (default) — all state lives in a fast recursive tree.
 * Use `toSnapshot()` / `fromSnapshot()` / `importSnapshot()` for serialisation.
 *
 * **FS mode** — same in-memory tree, but `restoreMirror()` loads a binary
 * snapshot from disk and `flushMirror()` writes it back.  This gives you
 * persistent VFS state across process restarts without any real POSIX filesystem
 * semantics leaking through.
 *
 * @example
 * ```ts
 * // Pure in-memory (default)
 * const vfs = new VirtualFileSystem();
 *
 * // With disk persistence
 * const vfs = new VirtualFileSystem({ mode: "fs", snapshotPath: "./data" });
 * await vfs.restoreMirror(); // load from disk (no-op if no snapshot yet)
 * // ... use vfs ...
 * await vfs.flushMirror();  // persist to disk
 * ```
 */
class VirtualFileSystem extends EventEmitter {
	private _root: InternalDirectoryNode;
	private readonly _mode: VfsPersistenceMode;
	private readonly _snapshotFile: string | null;
	/** Path to the WAL journal file (null in memory mode). */
	private readonly _journalFile: string | null;
	/** Eviction threshold in bytes (0 = disabled). Files above this are purged after flush. */
	private readonly _evictionThreshold: number;
	/** Max writes between forced flushes (0 = disabled). */
	private readonly _flushAfterNWrites: number;
	/** Pending write counter since last checkpoint. */
	private _writesSinceFlush = 0;
	/** NodeJS timer handle for periodic auto-flush (null = disabled or stopped). */
	private _flushTimer: ReturnType<typeof setInterval> | null = null;
	/** True if the VFS has unflushed changes. */
	private _dirty = false;
	/** Active host-directory mounts: vPath → { hostPath, readOnly } */
	private readonly _mounts = new Map<string, { hostPath: string; readOnly: boolean }>();
	/** Sorted mounts cache (longest-path-first). Rebuilt lazily on mount/unmount. */
	private _sortedMounts: Array<[string, { hostPath: string; readOnly: boolean }]> | null = null;
	/** Read hooks: path prefix → callback invoked before reading any file under that prefix. */
	private readonly _readHooks = new Map<string, () => void>();
	/** Sorted read hook prefixes (longest-first) for matching. */
	private _sortedReadHooks: string[] | null = null;
	/** Re-entrancy guard for read hooks — prevents infinite loop when hook triggers another read. */
	private _inReadHook = false;
	/** Write hooks: path prefix → callback invoked before writing any file under that prefix. */
	private readonly _writeHooks = new Map<string, (path: string, content: string | Buffer) => void>();
	/** Sorted write hook prefixes (longest-first) for matching. */
	private _sortedWriteHooks: string[] | null = null;
	/** Content resolver: path → callback that returns dynamic content (used for /proc/sys). */
	private readonly _contentResolvers = new Map<string, (path: string) => string | null>();
	/** Sorted content resolver prefixes (longest-first). */
	private _sortedContentResolvers: string[] | null = null;
	/** True when running in a browser environment (no host FS access). */
	private static readonly _isBrowser =
		typeof process === "undefined" || typeof (process as NodeJS.Process).versions?.node === "undefined";

	// ── File descriptor table ──────────────────────────────────────────────
	/** Open file descriptors: fd → { path, flags, refCount } */
	private readonly _fdTable = new Map<number, { path: string; flags: number; refCount: number }>();
	/** Next FD number to allocate (starts at 3 to reserve 0,1,2 for stdin/stdout/stderr). */
	private _nextFd = 3;

	constructor(options: VfsOptions = {}) {
		super();
		this._mode = options.mode ?? "memory";
		if (this._mode === "fs") {
			if (!options.snapshotPath) {
				throw new Error(
					'VirtualFileSystem: "snapshotPath" is required when mode is "fs".',
				);
			}
			this._snapshotFile = path.resolve(
				options.snapshotPath,
				"vfs-snapshot.vfsb",
			);
			this._journalFile = path.resolve(options.snapshotPath, "vfs-journal.bin");
			this._evictionThreshold = options.evictionThresholdBytes ?? 64 * 1024; // 64 KB default
			this._flushAfterNWrites = options.flushAfterNWrites ?? 500;
			const intervalMs = options.flushIntervalMs ?? 1_000;
			if (intervalMs > 0) {
				this._flushTimer = setInterval(() => {
					const dirty = this._dirty;
					if (dirty) void this._autoFlush();
				}, intervalMs);
				// Don't block process exit on this timer
				if (typeof this._flushTimer === "object" && this._flushTimer !== null && "unref" in this._flushTimer) {
					(this._flushTimer as NodeJS.Timeout).unref();
				}
			}
		} else {
			this._snapshotFile = null;
			this._journalFile = null;
			this._evictionThreshold = 0; // disabled in memory mode
			this._flushAfterNWrites = 0;
		}
		this._root = this._makeDir("", 0o755);
	}

	// ── Internal helpers ──────────────────────────────────────────────────────

	private _makeDir(name: string, mode: number, uid = 0, gid = 0): InternalDirectoryNode {
		const now = Date.now();
		return {
			type: "directory",
			name,
			mode,
			uid,
			gid,
			createdAt: now,
			updatedAt: now,
		children: Object.create(null) as Record<string, InternalNode>,
			_childCount: 0,
			_sortedKeys: null,
		};
	}

	private _makeFile(
		name: string,
		content: Buffer,
		mode: number,
		compressed: boolean,
		uid = 0,
		gid = 0,
	): InternalFileNode {
		const now = Date.now();
		return {
			type: "file",
			name,
			content,
			mode,
			uid,
			gid,
			compressed,
			createdAt: now,
			updatedAt: now,
		};
	}

	private _makeStub(name: string, content: string, mode: number, uid = 0, gid = 0): InternalStubNode {
		const now = Date.now();
		return { type: "stub", name, stubContent: content, mode, uid, gid, createdAt: now, updatedAt: now };
	}

	private _makeDeviceNode(
		name: string,
		deviceKind: DeviceKind,
		mode: number,
		major: number,
		minor: number,
		uid = 0,
		gid = 0,
	): InternalDeviceNode {
		const now = Date.now();
		return {
			type: "device",
			name,
			deviceKind,
			mode,
			uid,
			gid,
			major,
			minor,
			createdAt: now,
			updatedAt: now,
		};
	}

	/**
	 * Write a lazy stub — stores content as a plain string with no Buffer allocation.
	 * Use for static rootfs files that may never be read. On first `writeFile()`,
	 * the stub is promoted to a real `InternalFileNode`.
	 * Parent directories are created when missing.
	 * @param targetPath - Absolute path inside the VFS (e.g. "/etc/hostname").
	 * @param content - Text content to store as a lazy stub string.
	 * @param mode - File permission bits (default: 0o644).
	 */
	public writeStub(targetPath: string, content: string, mode = 0o644): void {
		const normalized = normalizePath(targetPath);
		const { parent, name } = getParentDirectory(
			this._root,
			normalized,
			true,
			(p) => this._mkdirRecursive(p, 0o755),
		);
		const existing = parent.children[name];
		if (existing?.type === "directory") {
			throw new Error(`Cannot write stub '${normalized}': path is a directory.`);
		}
		if (existing?.type === "file") return;
		if (!existing) { parent._childCount++; parent._sortedKeys = null; }
		parent.children[name] = this._makeStub(name, content, mode);
	}

	/**
	 * Creates a special device node in the VFS.
	 * Supported device kinds: null, zero, full, random, urandom, tty, console, ptmx, stdin, stdout, stderr.
	 * Parent directories are created when missing.
	 * @param targetPath - Absolute path for the device node (e.g. "/dev/null").
	 * @param deviceKind - Device type (null, zero, full, random, urandom, tty, console, etc.).
	 * @param mode - File permission bits (default: 0o666).
	 * @param major - Major device number (default: 1).
	 * @param minor - Minor device number (default: 0).
	 */
	public mknod(
		targetPath: string,
		deviceKind: DeviceKind,
		mode = 0o666,
		major = 1,
		minor = 0,
	): void {
		const normalized = normalizePath(targetPath);
		const { parent, name } = getParentDirectory(
			this._root,
			normalized,
			true,
			(p) => this._mkdirRecursive(p, 0o755),
		);
		const existing = parent.children[name];
		if (existing) {
			throw new Error(`EEXIST: file already exists, '${normalized}'`);
		}
		parent.children[name] = this._makeDeviceNode(name, deviceKind, mode, major, minor);
		parent._childCount++;
		parent._sortedKeys = null;
		this.emit("device:create", { path: normalized, deviceKind });
		this._journal({ op: JournalOp.MKDIR, path: normalized, mode });
	}

	// ── File descriptor operations ─────────────────────────────────────────

	/**
	 * Opens a file and returns a file descriptor number.
	 * Flags follow POSIX: O_RDONLY=0, O_WRONLY=1, O_RDWR=2, O_CREAT=0o100, O_TRUNC=0o1000, O_APPEND=0o2000.
	 * FDs 0, 1, 2 are reserved for stdin, stdout, stderr.
	 * @param targetPath - Absolute path to the file to open.
	 * @param flags - POSIX open flags bitmask (default: 0 = O_RDONLY).
	 * @returns A new file descriptor number (≥ 3).
	 */
	public fdOpen(targetPath: string, flags = 0): number {
		const normalized = normalizePath(targetPath);
		const exists = this.exists(normalized);

		if (!exists && !(flags & 0o100)) {
			throw new Error(`ENOENT: no such file or directory, open '${normalized}'`);
		}

		if (!exists && (flags & 0o100)) {
			this.writeFile(normalized, "", { mode: 0o644 });
		}

		if (flags & 0o1000) {
			this.writeFile(normalized, "", { mode: 0o644 });
		}

		const fd = this._nextFd++;
		this._fdTable.set(fd, { path: normalized, flags, refCount: 1 });
		return fd;
	}

	/**
	 * Closes a file descriptor. If refCount reaches 0, the entry is removed.
	 * @param fd - File descriptor number to close.
	 */
	public fdClose(fd: number): void {
		const entry = this._fdTable.get(fd);
		if (!entry) {
			throw new Error(`EBADF: bad file descriptor: ${fd}`);
		}
		entry.refCount--;
		if (entry.refCount <= 0) {
			this._fdTable.delete(fd);
		}
	}

	/**
	 * Duplicates a file descriptor, returning a new FD pointing to the same file.
	 * The new FD shares the same flags and position conceptually.
	 * @param oldFd - Existing file descriptor to duplicate.
	 * @returns A new file descriptor number referencing the same file.
	 */
	public fdDup(oldFd: number): number {
		const entry = this._fdTable.get(oldFd);
		if (!entry) {
			throw new Error(`EBADF: bad file descriptor: ${oldFd}`);
		}
		const newFd = this._nextFd++;
		this._fdTable.set(newFd, { path: entry.path, flags: entry.flags, refCount: 1 });
		return newFd;
	}

	/**
	 * Duplicates oldFd onto newFd. If newFd is already open, it is closed first.
	 * Returns newFd.
	 * @param oldFd - Source file descriptor to duplicate.
	 * @param newFd - Target file descriptor number to assign.
	 * @returns The newFd value.
	 */
	public fdDup2(oldFd: number, newFd: number): number {
		if (oldFd === newFd) return newFd;
		const oldEntry = this._fdTable.get(oldFd);
		if (!oldEntry) {
			throw new Error(`EBADF: bad file descriptor: ${oldFd}`);
		}
		const existing = this._fdTable.get(newFd);
		if (existing) {
			existing.refCount--;
			if (existing.refCount <= 0) this._fdTable.delete(newFd);
		}
		this._fdTable.set(newFd, { path: oldEntry.path, flags: oldEntry.flags, refCount: 1 });
		return newFd;
	}

	/**
	 * Returns the path associated with an open file descriptor.
	 * @param fd - File descriptor number to look up.
	 * @returns The absolute VFS path for the given FD.
	 */
	public fdPath(fd: number): string {
		const entry = this._fdTable.get(fd);
		if (!entry) {
			throw new Error(`EBADF: bad file descriptor: ${fd}`);
		}
		return entry.path;
	}

	/**
	 * Returns the flags associated with an open file descriptor.
	 * @param fd - File descriptor number to look up.
	 * @returns The POSIX flags bitmask for the given FD.
	 */
	public fdFlags(fd: number): number {
		const entry = this._fdTable.get(fd);
		if (!entry) {
			throw new Error(`EBADF: bad file descriptor: ${fd}`);
		}
		return entry.flags;
	}

	/**
	 * Returns a map of all open file descriptors: fd → path.
	 * Used for /proc/self/fd/* population.
	 * @returns A new Map of open FD numbers to their VFS paths.
	 */
	public getOpenFds(): Map<number, string> {
		const result = new Map<number, string>();
		for (const [fd, entry] of this._fdTable) {
			result.set(fd, entry.path);
		}
		return result;
	}

	/**
	 * Clears all open file descriptors. Called when a shell session ends.
	 */
	public closeAllFds(): void {
		this._fdTable.clear();
		this._nextFd = 3;
	}

	private _mkdirRecursive(targetPath: string, mode: number, uid?: number, gid?: number): void {
		const normalized = normalizePath(targetPath);
		if (normalized === "/") return;
		const parts = normalized.split("/").filter(Boolean);
		let current = this._root;
		let builtPath = "";
		for (const part of parts) {
			builtPath += `/${part}`;
			let child = current.children[part];
			if (!child) {
				child = this._makeDir(part, mode);
				if (uid !== undefined) child.uid = uid;
				if (gid !== undefined) child.gid = gid;
				current.children[part] = child;
				current._childCount++;
				current._sortedKeys = null;
				this.emit("dir:create", { path: builtPath, mode });
				this._journal({ op: JournalOp.MKDIR, path: builtPath, mode });
			} else if (child.type !== "directory") {
				throw new Error(
					`Cannot create directory '${builtPath}': path is a file.`,
				);
			}
			current = child as InternalDirectoryNode;
		}
	}

	// ── Persistence ───────────────────────────────────────────────────────────

	/**
	 * In `"fs"` mode: reads the binary snapshot (`vfs-snapshot.vfsb`) from disk.
	 * Automatically falls back to legacy JSON format for backward compatibility.
	 * Silently succeeds when the snapshot file does not exist yet.
	 *
	 * In `"memory"` mode: no-op (kept for API compatibility).
	 */
	public async restoreMirror(): Promise<void> {
		if (this._mode !== "fs" || !this._snapshotFile) return;

		if (!fsSync.existsSync(this._snapshotFile)) {
			// No snapshot yet — but replay journal if it exists (crash after writes, before first flush)
			if (this._journalFile) {
				const entries = readJournal(this._journalFile);
				if (entries.length > 0) this._replayJournal(entries);
			}
			return;
		}

		try {
			const raw = fsSync.readFileSync(this._snapshotFile);
			if (isBinarySnapshot(raw)) {
				// Fast binary format (current)
				this._root = decodeVfs(raw);
			} else {
				// Legacy JSON fallback — auto-migrates on next flushMirror()
				const snapshot: VfsSnapshot = JSON.parse(raw.toString("utf8"));
				this._root = this._deserializeDir(snapshot.root, "");
				console.info(
					"[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.",
				);
			}
			this.emit("snapshot:restore", { path: this._snapshotFile });
			// Replay WAL journal on top of the loaded snapshot
			if (this._journalFile) {
				const entries = readJournal(this._journalFile);
				if (entries.length > 0) this._replayJournal(entries);
			}
		} catch (err) {
			// Corrupt or unreadable snapshot — start fresh and warn
			console.warn(
				`[VirtualFileSystem] Could not restore snapshot from ${this._snapshotFile}:`,
				err instanceof Error ? err.message : String(err),
			);
		}
	}

	/**
	 * In `"fs"` mode: serialises the in-memory tree to a binary snapshot on disk
	 * (`vfs-snapshot.vfsb`). ~27% smaller and significantly faster than JSON+base64.
	 * The directory is created if it does not exist.
	 *
	 * In `"memory"` mode: emits `"mirror:flush"` and returns (no disk write).
	 */
	public async flushMirror(): Promise<void> {
		if (this._mode !== "fs" || !this._snapshotFile) {
			this.emit("mirror:flush");
			return;
		}

		const dir = path.dirname(this._snapshotFile);
		fsSync.mkdirSync(dir, { recursive: true });
		const root = this._root;
		const binary = encodeVfs(root);
		fsSync.writeFileSync(this._snapshotFile, binary);
		// Checkpoint complete — truncate the journal (entries are now in the snapshot)
		if (this._journalFile) truncateJournal(this._journalFile);
		this._dirty = false;
		this._writesSinceFlush = 0;
		this.emit("mirror:flush", { path: this._snapshotFile });
		// Evict large files from RAM now that the snapshot is on disk
		this.evictLargeFiles();
	}

	/**
	 * Returns the current persistence mode.
	 * @returns The persistence mode.
	 */
	public getMode(): VfsPersistenceMode {
		return this._mode;
	}

	/**
	 * Returns the snapshot file path used in `"fs"` mode, or `null` if not in fs mode.
	 * @returns The absolute path to the snapshot file, or null.
	 */
	public getSnapshotPath(): string | null {
		return this._snapshotFile;
	}

	// ── Public filesystem API ─────────────────────────────────────────────────

	/** Creates a directory (and any missing parents). */



	// ── Auto-flush scheduler ──────────────────────────────────────────────────

	/** Internal: flush triggered by timer or write-count threshold. */
	private async _autoFlush(): Promise<void> {
		if (!this._dirty) return;
		await this.flushMirror();
	}

	/** Mark VFS as having unflushed writes and trigger threshold flush if needed. */
	private _markDirty(): void {
		this._dirty = true;
		if (this._flushAfterNWrites > 0) {
			this._writesSinceFlush++;
			if (this._writesSinceFlush >= this._flushAfterNWrites) {
				this._writesSinceFlush = 0;
				void this._autoFlush();
			}
		}
	}

	/**
	 * Stop the automatic flush timer and perform a final checkpoint.
	 * Call this when shutting down to ensure all data is persisted.
	 *
	 * @example
	 * ```ts
	 * process.on("SIGINT", async () => {
	 *   await shell.vfs.stopAutoFlush();
	 *   process.exit(0);
	 * });
	 * ```
	 */
	public async stopAutoFlush(): Promise<void> {
		if (this._flushTimer !== null) {
			clearInterval(this._flushTimer);
			this._flushTimer = null;
		}
		if (this._dirty) await this.flushMirror();
	}

	/**
	 * Replace the entire root tree — used internally by `bootstrapLinuxRootfs`
	 * to hot-swap the static rootfs snapshot without going through importSnapshot
	 * (which would re-journal every node in fs mode).
	 * @internal
	 * @param root - New root directory node to replace the current tree.
	 */
	public importRootTree(root: InternalDirectoryNode): void {
		const prev = this._replayMode;
		this._replayMode = true;
		try { this._root = root; } finally { this._replayMode = prev; }
	}

	/**
	 * Merge a static rootfs tree into the existing live tree.
	 * Used by `bootstrapLinuxRootfs` when a persisted snapshot already exists,
	 * to layer in missing system files without overwriting user data.
	 *
	 * Rules:
	 * - Directories: recurse — never overwrite a live dir with an empty one.
	 * - Files/stubs: only written if the path does NOT yet exist in the live tree.
	 *   This ensures user-created files always win over static defaults.
	 *
	 * @internal
	 * @param incoming - Root directory node containing the tree to merge.
	 */
	public mergeRootTree(incoming: InternalDirectoryNode): void {
		const prev = this._replayMode;
		this._replayMode = true;
		try { this._mergeDir(this._root, incoming); } finally { this._replayMode = prev; }
	}

	private _mergeDir(live: InternalDirectoryNode, incoming: InternalDirectoryNode): void {
		for (const [name, node] of Object.entries(incoming.children)) {
			const existing = live.children[name];
			if (node.type === "directory") {
				if (!existing) {
					live.children[name] = node;
					live._childCount++;
					live._sortedKeys = null;
				} else if (existing.type === "directory") {
					this._mergeDir(existing, node);
				}
			} else {
				if (!existing) {
					live.children[name] = node;
					live._childCount++;
					live._sortedKeys = null;
				}
			}
		}
	}

	/**
	 * Serialise current tree to VFSB binary. Used for the static rootfs cache.
	 * @returns Binary buffer containing the encoded VFS tree.
	 */
	public encodeBinary(): Buffer {
		return encodeVfs(this._root);
	}

	/**
	 * Release the in-memory VFS tree, freeing all InternalNode objects for GC.
	 * The tree MUST be restored via `importRootTree()` before any VFS operation.
	 * Called by IdleManager when freezing an idle shell.
	 * @internal
	 */
	public releaseTree(): void {
		// Replace root with a minimal stub — keeps the object alive but frees all children
		this._root = this._makeDir("", 0o755);
	}

	/** Set to true during journal replay to suppress re-journaling. */
	private _replayMode = false;

	private _journal(entry: Parameters<typeof appendJournalEntry>[1]): void {
		if (this._journalFile && !this._replayMode) {
			appendJournalEntry(this._journalFile, entry);
			this._markDirty();
		}
	}

	private _replayJournal(entries: ReturnType<typeof readJournal>): void {
		this._replayMode = true;
		try {
			for (const e of entries) {
				try {
					if (e.op === JournalOp.WRITE) {
						this.writeFile(e.path, e.content ?? Buffer.alloc(0), { mode: e.mode });
					} else if (e.op === JournalOp.MKDIR) {
						this.mkdir(e.path, e.mode);
					} else if (e.op === JournalOp.REMOVE) {
						if (this.exists(e.path)) this.remove(e.path, { recursive: true });
					} else if (e.op === JournalOp.CHMOD) {
						if (this.exists(e.path)) this.chmod(e.path, e.mode ?? 0o644);
					} else if (e.op === JournalOp.MOVE) {
						if (this.exists(e.path) && e.dest) this.move(e.path, e.dest);
					} else if (e.op === JournalOp.SYMLINK) {
						if (e.dest) this.symlink(e.dest, e.path);
					}
				} catch { /* ignore individual replay errors — best-effort */ }
			}
		} finally {
			this._replayMode = false;
		}
	}


	// ── RAM eviction ──────────────────────────────────────────────────────────

	/**
	 * Walk the in-memory tree and evict file contents that exceed
	 * `evictionThreshold`. Called automatically after `flushMirror()`.
	 * Safe to call at any time — evicted files are reloaded on demand.
	 */
	public evictLargeFiles(): void {
		if (!this._snapshotFile || this._evictionThreshold === 0) return;
		if (!fsSync.existsSync(this._snapshotFile)) return;
		this._evictDir(this._root);
	}

	private _evictDir(dir: InternalDirectoryNode): void {
		for (const node of Object.values(dir.children)) {
			if (node.type === "directory") {
				this._evictDir(node);
			} else if (node.type === "file" && !node.evicted) {
				const rawSize = node.compressed
					? (node.size ?? node.content.length * 2) // estimate uncompressed
					: node.content.length;
				if (rawSize > this._evictionThreshold) {
					node.size    = rawSize;
					node.content = Buffer.alloc(0); // free heap
					node.evicted = true;
		}
		}
		}
	}

	/**
	 * Register a callback that is invoked before any write under `prefix`.
	 * Callback receives (normalizedPath, content). Used for /proc/sys sysctl.
	 * @param prefix - VFS path prefix to watch (e.g. "/proc/sys").
	 * @param cb - Callback invoked with the path and content before each write.
	 */
	public onBeforeWrite(prefix: string, cb: (path: string, content: string | Buffer) => void): void {
		const normalized = normalizePath(prefix);
		this._writeHooks.set(normalized, cb);
		this._sortedWriteHooks = [...this._writeHooks.keys()].sort((a, b) => b.length - a.length);
	}

	/**
	 * Remove a previously registered write hook.
	 * @param prefix - VFS path prefix of the hook to remove.
	 */
	public offBeforeWrite(prefix: string): void {
		const normalized = normalizePath(prefix);
		this._writeHooks.delete(normalized);
		this._sortedWriteHooks = [...this._writeHooks.keys()].sort((a, b) => b.length - a.length);
	}

	private _triggerWriteHook(normalizedPath: string, content: string | Buffer): void {
		if (!this._sortedWriteHooks) return;
		for (const prefix of this._sortedWriteHooks) {
			if (normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`)) {
				const cb = this._writeHooks.get(prefix);
				if (cb) {
					cb(normalizedPath, content);
					return;
				}
			}
		}
	}

	/**
	 * Register a content resolver for a path prefix.
	 * Resolver returns string content or null to fall through to normal read.
	 * Used for dynamic /proc/sys values and other computed content.
	 * @param prefix - VFS path prefix to handle (e.g. "/proc/sys").
	 * @param resolver - Function that returns content string or null for passthrough.
	 */
	public registerContentResolver(prefix: string, resolver: (path: string) => string | null): void {
		const normalized = normalizePath(prefix);
		this._contentResolvers.set(normalized, resolver);
		this._sortedContentResolvers = [...this._contentResolvers.keys()].sort((a, b) => b.length - a.length);
	}

	private _resolveContent(normalizedPath: string): string | null {
		if (!this._sortedContentResolvers) return null;
		for (const prefix of this._sortedContentResolvers) {
			if (normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`)) {
				const resolver = this._contentResolvers.get(prefix);
				if (resolver) return resolver(normalizedPath);
			}
		}
		return null;
	}

	private _reloadEvicted(node: InternalFileNode, normalizedPath: string): void {
		if (!node.evicted || !this._snapshotFile) return;
		if (!fsSync.existsSync(this._snapshotFile)) return;
		try {
			// Load and parse the snapshot to find this specific node
			const raw = fsSync.readFileSync(this._snapshotFile);
			const tmpRoot = decodeVfs(raw);
			const parts = normalizedPath.split("/").filter(Boolean);
			let cur: InternalNode = tmpRoot;
			for (const part of parts) {
				if (cur.type !== "directory") return;
				const next: InternalNode | undefined = cur.children[part];
				if (!next) return;
				cur = next;
			}
			if (cur.type === "file") {
				node.content = cur.content;
				node.compressed = cur.compressed;
				node.evicted = undefined;
			}
		} catch {
			// Snapshot unreadable — leave evicted; caller will get empty content
		}
	}

	// ── Mount API ─────────────────────────────────────────────────────────────

	/**
	 * Mount a host directory into the VFS at `vPath`.
	 *
	 * Files inside `vPath` are read directly from the host filesystem via
	 * `node:fs`. All standard VFS operations (`readFile`, `writeFile`,
	 * `exists`, `stat`, `list`) are transparently delegated.
	 *
	 * In browser environments the mount is silently ignored — `vPath` remains
	 * an empty in-memory directory.
	 *
	 * @param vPath     Absolute path inside the VM (e.g. `"/app"`).
	 * @param hostPath  Path on the host filesystem — relative paths are
	 *                  resolved from `process.cwd()`.
	 * @param readOnly  When `true` (default), write operations inside the
	 *                  mount throw `EROFS: read-only file system`.
	 *
	 * @example
	 * ```ts
	 * shell.vfs.mount("/app", "./src", { readOnly: true });
	 * // cat /app/index.ts  — reads ./src/index.ts from host
	 * ```
	 */
	public mount(
		vPath: string,
		hostPath: string,
		{ readOnly = true }: { readOnly?: boolean } = {},
	): void {
		if (VirtualFileSystem._isBrowser) return; // silently degrade in browser
		const normalized = normalizePath(vPath);
		const resolved   = path.resolve(hostPath);
		if (!fsSync.existsSync(resolved)) {
			throw new Error(`VirtualFileSystem.mount: host path does not exist: "${resolved}"`);
		}
		if (!fsSync.statSync(resolved).isDirectory()) {
			throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${resolved}"`);
		}
		// Ensure the mount point exists in the VFS tree
		this.mkdir(normalized);
		this._mounts.set(normalized, { hostPath: resolved, readOnly });
		this._sortedMounts = null;
		this.emit("mount", { vPath: normalized, hostPath: resolved, readOnly });
	}

	/**
	 * Unmount a previously mounted host directory.
	 * The in-memory VFS directory at `vPath` is preserved but the host
	 * delegation is removed.
	 * @param vPath - Absolute VFS path of the mount point to unmount.
	 */
	public unmount(vPath: string): void {
		const normalized = normalizePath(vPath);
		if (this._mounts.delete(normalized)) {
			this._sortedMounts = null;
			this.emit("unmount", { vPath: normalized });
		}
	}

	/**
	 * List all active mounts with their VFS paths, host paths, and read-only flags.
	 * @returns Array of mount descriptors.
	 */
	public getMounts(): Array<{ vPath: string; hostPath: string; readOnly: boolean }> {
		return [...this._mounts.entries()].map(([vPath, opts]) => ({
			vPath, ...opts,
		}));
	}

	/**
	 * Register a callback that is invoked before any read under `prefix`.
	 * Used by /proc to refresh dynamic content on every access.
	 * @param prefix - VFS path prefix to watch (e.g. "/proc").
	 * @param cb - No-argument callback invoked before each read under the prefix.
	 */
	public onBeforeRead(prefix: string, cb: () => void): void {
		const normalized = normalizePath(prefix);
		this._readHooks.set(normalized, cb);
		this._sortedReadHooks = [...this._readHooks.keys()].sort((a, b) => b.length - a.length);
	}

	/**
	 * Remove a previously registered read hook.
	 * @param prefix - VFS path prefix of the hook to remove.
	 */
	public offBeforeRead(prefix: string): void {
		const normalized = normalizePath(prefix);
		this._readHooks.delete(normalized);
		this._sortedReadHooks = [...this._readHooks.keys()].sort((a, b) => b.length - a.length);
	}

	private _triggerReadHook(normalizedPath: string): void {
		if (this._inReadHook) return;
		if (!this._sortedReadHooks) return;
		for (const prefix of this._sortedReadHooks) {
			if (normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`)) {
				const cb = this._readHooks.get(prefix);
				if (cb) {
					this._inReadHook = true;
					try { cb(); } finally { this._inReadHook = false; }
					return;
				}
			}
		}
	}

	/**
	 * If `targetPath` is inside a mount, return `{ hostPath, readOnly, relPath }`.
	 * `relPath` is the path relative to the mount's host directory.
	 * Returns `null` if the path is not under any mount.
	 * @param targetPath - Absolute VFS path to check for mount delegation.
	 */
	private _resolveMount(targetPath: string): {
		hostPath: string;
		readOnly: boolean;
		relPath:  string;
		fullHostPath: string;
	} | null {
		const normalized = normalizePath(targetPath);
		// Iterate mounts from most specific to least specific (cached, rebuilt on mount/unmount)
		if (!this._sortedMounts) {
			this._sortedMounts = [...this._mounts.entries()].sort(([a], [b]) => b.length - a.length);
		}
		for (const [vBase, opts] of this._sortedMounts) {
			if (normalized === vBase || normalized.startsWith(`${vBase}/`)) {
				const relPath      = normalized.slice(vBase.length).replace(/^\//, "");
				const fullHostPath = relPath ? path.join(opts.hostPath, relPath) : opts.hostPath;
				return { hostPath: opts.hostPath, readOnly: opts.readOnly, relPath, fullHostPath };
			}
		}
		return null;
	}

	/**
	 * Create a directory at the given path. Parent directories are created
	 * recursively if they don't exist (like `mkdir -p`).
	 * @param targetPath - Absolute VFS path for the new directory.
	 * @param mode - Permission bits for the new directory (default: 0o755).
	 * @param uid - Optional owner UID for the new directory.
	 * @param gid - Optional owner GID for the new directory.
	 */
	public mkdir(targetPath: string, mode: number = 0o755, uid?: number, gid?: number): void {
		const normalized = normalizePath(targetPath);
		const existing = (() => {
			try {
				return getNodeNormalized(this._root, normalized);
			} catch {
				return null;
			}
		})();
		if (existing && existing.type !== "directory") {
			throw new Error(
				`Cannot create directory '${normalized}': path is a file.`,
			);
		}
		this._mkdirRecursive(normalized, mode, uid, gid);
	}

	/**
	 * Writes UTF-8 text or binary content into a file.
	 * Parent directories are created when missing.
	 * If `uid`/`gid` provided, enforces write permission on existing files.
	 * @param targetPath - Absolute VFS path for the file.
	 * @param content - Text string or Buffer to write.
	 * @param options - Optional write settings (mode, compress).
	 * @param uid - Optional owner UID (enforces write permission check).
	 * @param gid - Optional owner GID (enforces write permission check).
	 */
	public writeFile(
		targetPath: string,
		content: string | Buffer,
		options: WriteFileOptions = {},
		uid?: number,
		gid?: number,
	): void {
		const m = this._resolveMount(targetPath);
		if (m) {
			if (m.readOnly) throw new Error(`EROFS: read-only file system, open '${m.fullHostPath}'`);
			const dir = path.dirname(m.fullHostPath);
			if (!fsSync.existsSync(dir)) fsSync.mkdirSync(dir, { recursive: true });
			fsSync.writeFileSync(m.fullHostPath, Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8"));
			return;
		}
		const normalized = normalizePath(targetPath);

		// Trigger write hooks (e.g., /proc/sys sysctl)
		const rawContent = Buffer.isBuffer(content)
			? content
			: Buffer.from(content, "utf8");
		this._triggerWriteHook(normalized, rawContent);

		if (uid !== undefined && gid !== undefined) {
			enforcePathTraversal(this._root, normalized, uid, gid);
		}

		const { parent, name } = getParentDirectory(
			this._root,
			normalized,
			true,
			(p) => this._mkdirRecursive(p, 0o755),
		);

		const existing = parent.children[name];
		if (existing?.type === "directory") {
			throw new Error(
				`Cannot write file '${normalized}': path is a directory.`,
			);
		}

		if (existing?.type === "device") {
			const dev = existing as InternalDeviceNode;
			this._writeDeviceNode(dev, normalized);
			dev.updatedAt = Date.now();
			this.emit("device:write", { path: normalized });
			return;
		}

		// Enforce write permission on existing files
		if (existing && uid !== undefined && gid !== undefined) {
			enforceAccess(this._root, normalized, uid, gid, W_OK);
		}

		const shouldCompress = options.compress ?? false;
		const storedContent = shouldCompress ? gzipSync(rawContent) : rawContent;
		const mode = options.mode ?? 0o644;

		if (existing && existing.type === "file") {
			const f = existing as InternalFileNode;
			f.content = storedContent;
			f.compressed = shouldCompress;
			f.mode = mode;
			if (uid !== undefined) f.uid = uid;
			if (gid !== undefined) f.gid = gid;
			f.updatedAt = Date.now();
		} else {
			if (!existing) { parent._childCount++; parent._sortedKeys = null; }
			parent.children[name] = this._makeFile(name, storedContent, mode, shouldCompress, uid, gid);
		}

		this.emit("file:write", { path: normalized, size: storedContent.length });
		this._journal({ op: JournalOp.WRITE, path: normalized, content: rawContent, mode });
	}

	/**
	 * Reads file content as a UTF-8 string.
	 * Gzip-compressed files are transparently decompressed.
	 * If `uid`/`gid` provided, enforces read permission.
	 * @param targetPath - Absolute VFS path of the file to read.
	 * @param uid - Optional reader UID (enforces read permission check).
	 * @param gid - Optional reader GID (enforces read permission check).
	 * @returns File content as a UTF-8 decoded string.
	 */
	public readFile(targetPath: string, uid?: number, gid?: number): string {
		const m = this._resolveMount(targetPath);
		if (m) {
			if (!fsSync.existsSync(m.fullHostPath)) throw new Error(`ENOENT: no such file or directory, open '${m.fullHostPath}'`);
			return fsSync.readFileSync(m.fullHostPath, "utf8");
		}
		const normalized = normalizePath(targetPath);
		this._triggerReadHook(normalized);

		// Check content resolvers (e.g., /proc/sys sysctl values)
		const resolved = this._resolveContent(normalized);
		if (resolved !== null) {
			this.emit("file:read", { path: normalized, size: resolved.length });
			return resolved;
		}

		if (uid !== undefined && gid !== undefined) {
			enforcePathTraversal(this._root, normalized, uid, gid);
		}

		const node = getNodeNormalized(this._root, normalized);
		if (node.type === "stub") {
			if (uid !== undefined && gid !== undefined) enforceAccess(this._root, normalized, uid, gid, R_OK);
			this.emit("file:read", { path: normalized, size: node.stubContent.length });
			return node.stubContent;
		}
		if (node.type === "device") {
			const content = this._readDeviceNode(node as InternalDeviceNode, normalized);
			this.emit("file:read", { path: normalized, size: content.length });
			return content;
		}
		if (node.type !== "file") {
			throw new Error(`Cannot read '${targetPath}': not a file.`);
		}
		if (uid !== undefined && gid !== undefined) enforceAccess(this._root, normalized, uid, gid, R_OK);
		const f = node as InternalFileNode;
		if (f.evicted) this._reloadEvicted(f, normalized);
		const raw = f.compressed ? gunzipSync(f.content) : f.content;
		this.emit("file:read", { path: normalized, size: raw.length });
		return raw.toString("utf8");
	}

	/**
	 * Reads file content as a raw Buffer (decompresses if needed).
	 * @param targetPath - Absolute VFS path of the file to read.
	 * @returns File content as a Buffer (binary data).
	 */
	public readFileRaw(targetPath: string): Buffer {
		const m = this._resolveMount(targetPath);
		if (m) {
			if (!fsSync.existsSync(m.fullHostPath)) throw new Error(`ENOENT: no such file or directory, open '${m.fullHostPath}'`);
			return fsSync.readFileSync(m.fullHostPath);
		}
		const normalized = normalizePath(targetPath);
		this._triggerReadHook(normalized);
		const node = getNodeNormalized(this._root, normalized);
		if (node.type === "stub") {
			const buf = Buffer.from(node.stubContent, "utf8");
			this.emit("file:read", { path: normalized, size: buf.length });
			return buf;
		}
		if (node.type === "device") {
			const content = this._readDeviceNode(node as InternalDeviceNode, normalized);
			const buf = Buffer.from(content, "binary");
			this.emit("file:read", { path: normalized, size: buf.length });
			return buf;
		}
		if (node.type !== "file") {
			throw new Error(`Cannot read '${targetPath}': not a file.`);
		}
		const f = node as InternalFileNode;
		if (f.evicted) this._reloadEvicted(f, normalized);
		const raw = f.compressed ? gunzipSync(f.content) : f.content;
		this.emit("file:read", { path: normalized, size: raw.length });
		return raw;
	}

	/**
	 * Returns true when a file or directory exists at the given path.
	 * @param targetPath - Absolute VFS path to check.
	 * @returns True if a node exists at the path, false otherwise.
	 */
	public exists(targetPath: string): boolean {
		const m = this._resolveMount(targetPath);
		if (m) return fsSync.existsSync(m.fullHostPath);
		const normalized = normalizePath(targetPath);
		try {
			getNodeNormalized(this._root, normalized);
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Updates mode bits on a node. If `uid` is provided, enforces ownership check
	 * (only the file owner or root can change permissions).
	 * @param targetPath - Absolute VFS path of the node.
	 * @param mode - New permission bits (e.g. 0o755, 0o644).
	 * @param uid - Optional actor UID (enforces ownership check).
	 */
	public chmod(targetPath: string, mode: number, uid?: number): void {
		const normalized = normalizePath(targetPath);
		if (uid !== undefined) enforceChmod(this._root, normalized, uid);
		getNodeNormalized(this._root, normalized).mode = mode;
		this._journal({ op: JournalOp.CHMOD, path: normalized, mode });
	}

	/**
	 * Changes ownership (uid/gid) of a file or directory. If `actorUid` is provided,
	 * enforces root-only check (only uid 0 can change ownership).
	 * @param targetPath - Absolute VFS path of the node.
	 * @param uid - New owner UID.
	 * @param gid - New group GID.
	 * @param actorUid - Optional actor UID (enforces root-only check).
	 */
	public chown(targetPath: string, uid: number, gid: number, actorUid?: number): void {
		const normalized = normalizePath(targetPath);
		if (actorUid !== undefined) enforceChown(actorUid);
		const node = getNodeNormalized(this._root, normalized);
		node.uid = uid;
		node.gid = gid;
		this._journal({ op: JournalOp.CHMOD, path: normalized, mode: node.mode });
	}

	/**
	 * Returns the uid and gid of a node.
	 * @param targetPath - The target file path.
	 */
	public getOwner(targetPath: string): { uid: number; gid: number } {
		const node = getNodeNormalized(this._root, normalizePath(targetPath));
		return { uid: node.uid, gid: node.gid };
	}

	/**
	 * POSIX-style access check: does `uid`/`gid` have `want` permission on `targetPath`?
	 * `want` is a bitmask of R_OK (4), W_OK (2), X_OK (1).
	 * Root (uid === 0) is granted everything except X_OK without at least one x bit set.
	 * @param targetPath - Absolute VFS path to check.
	 * @param uid - User ID requesting access.
	 * @param gid - Group ID of the requesting user.
	 * @param want - Permission bitmask (R_OK=4, W_OK=2, X_OK=1).
	 * @returns True if access is granted, false otherwise.
	 */
	public checkAccess(targetPath: string, uid: number, gid: number, want: number): boolean {
		try {
			const node = getNodeNormalized(this._root, normalizePath(targetPath));
			const mode = node.mode;
			// Root: allowed everything except execute (at least one x bit needed)
			if (uid === 0) {
				if (want & 1) return (mode & 0o111) !== 0;
				return true;
			}
			let perm = 0;
			if (uid === node.uid) {
				perm = (mode >> 6) & 7; // owner bits
			} else if (gid === node.gid) {
				perm = (mode >> 3) & 7; // group bits
			} else {
				perm = mode & 7; // other bits
			}
			return (perm & want) === want;
		} catch {
			return false;
		}
	}

	/**
	 * Returns metadata for a file or directory (type, mode, uid, gid, size, timestamps).
	 * For mount points, delegates to the host filesystem stat.
	 * @param targetPath - Absolute VFS path of the node.
	 * @returns VfsNodeStats object with type, permissions, ownership, and size.
	 */
	public stat(targetPath: string): VfsNodeStats {
		const m = this._resolveMount(targetPath);
		if (m) {
			if (!fsSync.existsSync(m.fullHostPath)) throw new Error(`ENOENT: stat '${m.fullHostPath}'`);
			const hst = fsSync.statSync(m.fullHostPath);
			const name = m.relPath.split("/").pop() ?? m.fullHostPath.split("/").pop() ?? "";
			const now = hst.mtime;
			if (hst.isDirectory()) {
				return {
					type: "directory",
					name,
					path: normalizePath(targetPath),
					mode: 0o755,
					uid: 0,
					gid: 0,
					createdAt: hst.birthtime,
					updatedAt: now,
					childrenCount: fsSync.readdirSync(m.fullHostPath).length,
				} satisfies VfsDirectoryNode;
			}
			return {
				type: "file",
				name,
				path: normalizePath(targetPath),
				mode: m.readOnly ? 0o444 : 0o644,
				uid: 0,
				gid: 0,
				createdAt: hst.birthtime,
				updatedAt: now,
				compressed: false,
				size: hst.size,
			} satisfies VfsFileNode;
		}
		const normalized = normalizePath(targetPath);
		if (normalized.startsWith("/proc")) this._triggerReadHook(normalized);
		const node = getNodeNormalized(this._root, normalized);
		const name = normalized === "/" ? "" : path.posix.basename(normalized);
		if (node.type === "stub") {
			const s = node as InternalStubNode;
			return {
				type: "file",
				name,
				path: normalized,
				mode: s.mode,
				uid: s.uid,
				gid: s.gid,
				createdAt: new Date(s.createdAt),
				updatedAt: new Date(s.updatedAt),
				compressed: false,
				size: s.stubContent.length,
			};
		}
		if (node.type === "file") {
			const f = node as InternalFileNode;
			return {
				type: "file",
				name,
				path: normalized,
				mode: f.mode,
				uid: f.uid,
				gid: f.gid,
				createdAt: new Date(f.createdAt),
				updatedAt: new Date(f.updatedAt),
				compressed: f.compressed,
				size: f.evicted ? (f.size ?? 0) : f.content.length,
			};
		}
		if (node.type === "device") {
			const dev = node as InternalDeviceNode;
			return {
				type: "device",
				name,
				path: normalized,
				mode: dev.mode,
				uid: dev.uid,
				gid: dev.gid,
				createdAt: new Date(dev.createdAt),
				updatedAt: new Date(dev.updatedAt),
				deviceKind: dev.deviceKind,
				major: dev.major,
				minor: dev.minor,
			} satisfies VfsDeviceNode;
		}
		const d = node as InternalDirectoryNode;
		return {
			type: "directory",
			name,
			path: normalized,
			mode: d.mode,
			uid: d.uid,
			gid: d.gid,
			createdAt: new Date(d.createdAt),
			updatedAt: new Date(d.updatedAt),
			childrenCount: d._childCount,
		};
	}

	/**
	 * Reads content from a device node according to its kind.
	 * /dev/null → empty string
	 * /dev/zero → 4096 zero bytes
	 * /dev/full → throws ENOSPC
	 * /dev/random, /dev/urandom → 64 random bytes
	 * /dev/tty, /dev/console, /dev/stdin → empty string
	 * /dev/stdout, /dev/stderr → empty string
	 * @param node - Device node with deviceKind property.
	 * @param path - Normalized VFS path (used in error messages).
	 * @returns Device content string (varies by device kind).
	 */
	private _readDeviceNode(node: InternalDeviceNode, path: string): string {
		switch (node.deviceKind) {
			case "null":
				return "";
			case "zero":
				return "\0".repeat(4096);
			case "full":
				throw new Error(`ENOSPC: no space left on device, write '${path}'`);
			case "random":
			case "urandom":
				return crypto.randomBytes(64).toString("binary");
			default:
				return "";
		}
	}

	/**
	 * Handles writes to device nodes.
	 * /dev/null → silently discards
	 * /dev/full → throws ENOSPC
	 * Others → silently accepted (like a real TTY write)
	 * @param node - Device node with deviceKind property.
	 * @param path - Normalized VFS path (used in error messages).
	 */
	private _writeDeviceNode(node: InternalDeviceNode, path: string): void {
		switch (node.deviceKind) {
			case "full":
				throw new Error(`ENOSPC: no space left on device, write '${path}'`);
			default:
				break; // silently accepted
		}
	}

	/**
	 * Fast type-only check — no Date/string allocation.
	 * Use instead of `stat().type` when that's all you need.
	 * @param targetPath - Absolute VFS path to check.
	 * @returns Node type string ("file", "directory", "device") or null if not found.
	 */
	public statType(targetPath: string): "file" | "directory" | "device" | null {
		try {
			const m = this._resolveMount(targetPath);
			if (m) {
				const s = fsSync.statSync(m.fullHostPath, { throwIfNoEntry: false });
				if (!s) return null;
				return s.isDirectory() ? "directory" : "file";
			}
			const node = getNodeNormalized(this._root, normalizePath(targetPath));
			if (node.type === "directory") return "directory";
			if (node.type === "device") return "device";
			return "file";
		} catch { return null; }
	}

	/**
	 * Lists direct children names of a directory, sorted alphabetically.
	 * For mount points, delegates to the host filesystem readdir.
	 * @param dirPath - Absolute VFS path of the directory (default: "/").
	 * @returns Sorted array of child entry names.
	 */
	public list(dirPath: string = "/"): string[] {
		const m = this._resolveMount(dirPath);
		if (m) {
			if (!fsSync.existsSync(m.fullHostPath)) return [];
			try {
				return fsSync.readdirSync(m.fullHostPath).sort();
			} catch { return []; }
		}
		const normalized = normalizePath(dirPath);
		if (normalized.startsWith("/proc")) this._triggerReadHook(normalized);
		const node = getNodeNormalized(this._root, normalized);
		if (node.type !== "directory") {
			throw new Error(`Cannot list '${dirPath}': not a directory.`);
		}
		const dir = node as InternalDirectoryNode;
		if (!dir._sortedKeys) dir._sortedKeys = Object.keys(dir.children).sort();
		return dir._sortedKeys;
	}

	/**
	 * Renders an ASCII tree view of a directory hierarchy.
	 * Similar to the `tree` command output.
	 * @param dirPath - Absolute VFS path of the root directory (default: "/").
	 * @returns Multi-line string with the tree visualization.
	 */
	public tree(dirPath: string = "/"): string {
		const normalized = normalizePath(dirPath);
		const node = getNodeNormalized(this._root, normalized);
		if (node.type !== "directory") {
			throw new Error(`Cannot render tree for '${dirPath}': not a directory.`);
		}
		const label = dirPath === "/" ? "/" : path.posix.basename(normalized);
		return this._renderTreeLines(node as InternalDirectoryNode, label);
	}

	private _renderTreeLines(dir: InternalDirectoryNode, label: string): string {
		const lines = [label];
		if (!dir._sortedKeys) dir._sortedKeys = Object.keys(dir.children).sort();
		const entries = dir._sortedKeys;
		for (let i = 0; i < entries.length; i++) {
			const name = entries[i]!;
			const child = dir.children[name]!;
			const isLast = i === entries.length - 1;
			const connector = isLast ? "└── " : "├── ";
			const nextPrefix = isLast ? "    " : "│   ";
			lines.push(`${connector}${name}`);
			if (child.type === "directory") {
				const sub = this._renderTreeLines(child as InternalDirectoryNode, "")
					.split("\n")
					.slice(1)
					.map((l) => `${nextPrefix}${l}`);
				lines.push(...sub);
			}
		}
		return lines.join("\n");
	}

	/**
	 * Computes total stored bytes under a path (sum of all file content lengths).
	 * Compressed files count their compressed size, not uncompressed.
	 * @param targetPath - Absolute VFS path to compute usage for (default: "/").
	 * @returns Total bytes stored under the path.
	 */
	public getUsageBytes(targetPath: string = "/"): number {
		return this._computeUsage(getNodeNormalized(this._root, normalizePath(targetPath)));
	}

	private _computeUsage(node: InternalNode): number {
		if (node.type === "file") return (node as InternalFileNode).content.length;
		if (node.type === "stub") return (node as InternalStubNode).stubContent.length;
		if (node.type === "device") return 0;
		let total = 0;
		for (const child of Object.values((node as InternalDirectoryNode).children)) {
			total += this._computeUsage(child);
		}
		return total;
	}

	/**
	 * Compresses a file's content with gzip in place.
	 * @param targetPath - The target file path.
	 */
	public compressFile(targetPath: string): void {
		const node = getNodeNormalized(this._root, normalizePath(targetPath));
		if (node.type !== "file")
			throw new Error(`Cannot compress '${targetPath}': not a file.`);
		const f = node as InternalFileNode;
		if (!f.compressed) {
			f.content = gzipSync(f.content);
			f.compressed = true;
			f.updatedAt = Date.now();
		}
	}

	/**
	 * Decompresses a gzip-compressed file in place.
	 * @param targetPath - The target file path.
	 */
	public decompressFile(targetPath: string): void {
		const node = getNodeNormalized(this._root, normalizePath(targetPath));
		if (node.type !== "file")
			throw new Error(`Cannot decompress '${targetPath}': not a file.`);
		const f = node as InternalFileNode;
		if (f.compressed) {
			f.content = gunzipSync(f.content);
			f.compressed = false;
			f.updatedAt = Date.now();
		}
	}

	/**
	 * Creates a symbolic link.
	 * The link node is stored with mode `0o120777` (POSIX symlink convention).
	 * @param targetPath - Target path the symlink should point to.
	 * @param linkPath - Path where the symlink will be created.
	 * @param uid - Optional owner UID (default: 0).
	 * @param gid - Optional owner GID (default: 0).
	 */
	public symlink(targetPath: string, linkPath: string, uid?: number, gid?: number): void {
		const normalizedLink = normalizePath(linkPath);
		const normalizedTarget = targetPath.startsWith("/")
			? normalizePath(targetPath)
			: targetPath;
		const { parent, name } = getParentDirectory(
			this._root,
			normalizedLink,
			true,
			(p) => this._mkdirRecursive(p, 0o755),
		);
		const symNode: InternalFileNode = {
			type: "file",
			name,
			content: Buffer.from(normalizedTarget, "utf8"),
			mode: 0o120777,
			uid: uid ?? 0,
			gid: gid ?? 0,
			compressed: false,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};
		parent.children[name] = symNode;
		parent._childCount++;
		parent._sortedKeys = null;
		// Journal before emit
		this._journal({ op: JournalOp.SYMLINK, path: normalizedLink, dest: normalizedTarget });
		this.emit("symlink:create", {
			link: normalizedLink,
			target: normalizedTarget,
		});
	}

	/**
	 * Returns true when the path is a symbolic link node (mode 0o120777).
	 * @param targetPath - Absolute VFS path to check.
	 * @returns True if the path is a symlink, false otherwise.
	 */
	public isSymlink(targetPath: string): boolean {
		try {
			const node = getNodeNormalized(this._root, normalizePath(targetPath));
			return node.type === "file" && node.mode === 0o120777;
		} catch {
			return false;
		}
	}

	/**
	 * Resolves a symlink chain up to `maxDepth` hops.
	 * Throws when the chain is too long (circular links).
	 * @param linkPath - Absolute VFS path of the symlink to resolve.
	 * @param maxDepth - Maximum number of symlink hops before throwing (default: 8).
	 * @returns The final resolved path after following all symlinks.
	 */
	public resolveSymlink(linkPath: string, maxDepth = 8): string {
		let current = normalizePath(linkPath);
		for (let depth = 0; depth < maxDepth; depth++) {
			try {
				const node = getNodeNormalized(this._root, current);
				if (node.type === "file" && node.mode === 0o120777) {
					const target = (node as InternalFileNode).content.toString("utf8");
					current = target.startsWith("/")
						? target
						: normalizePath(
								path.posix.join(path.posix.dirname(current), target),
							);
					continue;
				}
			} catch {
				break;
			}
			return current;
		}
		throw new Error(`Too many levels of symbolic links: ${linkPath}`);
	}

	/**
	 * Removes a file or directory node. If `uid`/`gid` provided, enforces
	 * delete permission (including sticky bit on parent directory).
	 * @param targetPath - Absolute VFS path of the node to remove.
	 * @param options - Remove options (recursive: delete non-empty directories).
	 * @param uid - Optional actor UID (enforces delete permission check).
	 * @param gid - Optional actor GID (enforces delete permission check).
	 */
	public remove(targetPath: string, options: RemoveOptions = {}, uid?: number, gid?: number): void {
		const m = this._resolveMount(targetPath);
		if (m) {
			if (m.readOnly) throw new Error(`EROFS: read-only file system, unlink '${m.fullHostPath}'`);
			if (!fsSync.existsSync(m.fullHostPath)) throw new Error(`ENOENT: no such file or directory, unlink '${m.fullHostPath}'`);
			const hst = fsSync.statSync(m.fullHostPath);
			if (hst.isDirectory()) {
				fsSync.rmSync(m.fullHostPath, { recursive: options.recursive ?? false });
			} else {
				fsSync.unlinkSync(m.fullHostPath);
			}
			return;
		}
		const normalized = normalizePath(targetPath);
		if (normalized === "/") throw new Error("Cannot remove root directory.");
		if (uid !== undefined && gid !== undefined) {
			enforcePathTraversal(this._root, normalized, uid, gid);
			const parentPath = normalized.split("/").slice(0, -1).join("/") || "/";
			const name = normalized.split("/").pop() ?? "";
			enforceDelete(this._root, parentPath, name, uid, gid);
		}
		const node = getNodeNormalized(this._root, normalized);
		if (node.type === "directory") {
			const dir = node as InternalDirectoryNode;
			if (!options.recursive && dir._childCount > 0) {
				throw new Error(
					`Directory '${normalized}' is not empty. Use recursive option.`,
				);
			}
		}
		const { parent, name } = getParentDirectory(
			this._root,
			normalized,
			false,
			() => {},
		);
		delete parent.children[name];
		parent._childCount--;
		parent._sortedKeys = null;
		this.emit("node:remove", { path: normalized });
		this._journal({ op: JournalOp.REMOVE, path: normalized });
	}

	/**
	 * Moves or renames a node.
	 * @param fromPath - The source path.
	 * @param toPath - The destination path.
	 */
	public move(fromPath: string, toPath: string): void {
		const fromNormalized = normalizePath(fromPath);
		const toNormalized = normalizePath(toPath);
		if (fromNormalized === "/" || toNormalized === "/") {
			throw new Error("Cannot move root directory.");
		}
		const node = getNodeNormalized(this._root, fromNormalized);
		if (this.exists(toNormalized)) {
			throw new Error(`Destination '${toNormalized}' already exists.`);
		}
		this._mkdirRecursive(path.posix.dirname(toNormalized), 0o755);
		const { parent: destParent, name: destName } = getParentDirectory(
			this._root,
			toNormalized,
			false,
			() => {},
		);
		const { parent: srcParent, name: srcName } = getParentDirectory(
			this._root,
			fromNormalized,
			false,
			() => {},
		);
		delete srcParent.children[srcName];
		srcParent._childCount--;
		srcParent._sortedKeys = null;
		node.name = destName;
		destParent.children[destName] = node;
		destParent._childCount++;
		destParent._sortedKeys = null;
		this._journal({ op: JournalOp.MOVE, path: fromNormalized, dest: toNormalized });
	}

	// ── Snapshot serialisation ─────────────────────────────────────────────────

	/**
	 * Exports the entire filesystem as a JSON-serialisable snapshot.
	 *
	 * Works regardless of the persistence mode. Useful for test fixtures,
	 * manual backups, or passing VFS state between processes.
	 * @returns The filesystem snapshot.
	 */
	public toSnapshot(): VfsSnapshot {
		return { root: this._serializeDir(this._root) };
	}

	private _serializeDir(dir: InternalDirectoryNode): VfsSnapshotDirectoryNode {
		const children: VfsSnapshotNode[] = [];
		for (const child of Object.values(dir.children)) {
			if (child.type === "stub") {
				children.push({
					type: "file",
					name: child.name,
					mode: child.mode,
					uid: child.uid,
					gid: child.gid,
					createdAt: new Date(child.createdAt).toISOString(),
					updatedAt: new Date(child.updatedAt).toISOString(),
					compressed: false,
					contentBase64: Buffer.from(child.stubContent, "utf8").toString("base64"),
				} satisfies VfsSnapshotFileNode);
			} else if (child.type === "file") {
				children.push(this._serializeFile(child as InternalFileNode));
			} else if (child.type === "device") {
				const dev = child as InternalDeviceNode;
				children.push({
					type: "device",
					name: dev.name,
					mode: dev.mode,
					uid: dev.uid,
					gid: dev.gid,
					createdAt: new Date(dev.createdAt).toISOString(),
					updatedAt: new Date(dev.updatedAt).toISOString(),
					deviceKind: dev.deviceKind,
					major: dev.major,
					minor: dev.minor,
				} satisfies VfsSnapshotDeviceNode);
			} else {
				children.push(this._serializeDir(child as InternalDirectoryNode));
			}
		}
		return {
			type: "directory",
			name: dir.name,
			mode: dir.mode,
			uid: dir.uid,
			gid: dir.gid,
			createdAt: new Date(dir.createdAt).toISOString(),
			updatedAt: new Date(dir.updatedAt).toISOString(),
			children,
		};
	}

	private _serializeFile(file: InternalFileNode): VfsSnapshotFileNode {
		return {
			type: "file",
			name: file.name,
			mode: file.mode,
			uid: file.uid,
			gid: file.gid,
			createdAt: new Date(file.createdAt).toISOString(),
			updatedAt: new Date(file.updatedAt).toISOString(),
			compressed: file.compressed,
			contentBase64: file.content.toString("base64"),
		};
	}

	/**
	 * Creates a new `VirtualFileSystem` instance (memory mode) from a snapshot.
	 *
	 * @example
	 * ```ts
	 * const vfs = VirtualFileSystem.fromSnapshot(savedSnapshot);
	 * ```
	 * @param snapshot - VFS snapshot object containing the serialized tree.
	 * @returns A new VirtualFileSystem instance with the snapshot content.
	 */
	public static fromSnapshot(snapshot: VfsSnapshot): VirtualFileSystem {
		const vfs = new VirtualFileSystem();
		vfs._root = vfs._deserializeDir(snapshot.root, "");
		return vfs;
	}

	/**
	 * Replaces the current filesystem state with the content of a snapshot.
	 * The persistence mode is preserved.
	 *
	 * @example
	 * ```ts
	 * vfs.importSnapshot(savedSnapshot);
	 * ```
	 * @param snapshot - VFS snapshot object containing the serialized tree.
	 */
	public importSnapshot(snapshot: VfsSnapshot): void {
		this._root = this._deserializeDir(snapshot.root, "");
		this.emit("snapshot:import");
	}

	private _deserializeDir(
		snap: VfsSnapshotDirectoryNode,
		name: string,
	): InternalDirectoryNode {
		const dir: InternalDirectoryNode = {
			type: "directory",
			name,
			mode: snap.mode,
			uid: snap.uid ?? 0,
			gid: snap.gid ?? 0,
			createdAt: Date.parse(snap.createdAt),
			updatedAt: Date.parse(snap.updatedAt),
			children: Object.create(null) as Record<string, InternalNode>,
			_childCount: 0,
			_sortedKeys: null,
		};
		for (const child of snap.children) {
			if (child.type === "file") {
				const f = child as VfsSnapshotFileNode;
				dir.children[f.name] = {
					type: "file",
					name: f.name,
					mode: f.mode,
					uid: f.uid ?? 0,
					gid: f.gid ?? 0,
					createdAt: Date.parse(f.createdAt),
					updatedAt: Date.parse(f.updatedAt),
					compressed: f.compressed,
					content: Buffer.from(f.contentBase64, "base64"),
				};
			} else if (child.type === "device") {
				const d = child as VfsSnapshotDeviceNode;
				dir.children[d.name] = {
					type: "device",
					name: d.name,
					mode: d.mode,
					uid: d.uid ?? 0,
					gid: d.gid ?? 0,
					createdAt: Date.parse(d.createdAt),
					updatedAt: Date.parse(d.updatedAt),
					deviceKind: d.deviceKind as DeviceKind,
					major: d.major,
					minor: d.minor,
				};
			} else {
				const sub = this._deserializeDir(
					child as VfsSnapshotDirectoryNode,
					child.name,
				);
				dir.children[child.name] = sub;
			}
			dir._childCount++;
		}
		return dir;
	}
}

export default VirtualFileSystem;
