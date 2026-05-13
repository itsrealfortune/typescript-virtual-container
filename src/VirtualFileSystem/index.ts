/** biome-ignore-all lint/style/useNamingConvention: NW ? */
import { EventEmitter } from "node:events";
import * as fsSync from "node:fs";
import * as path from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";
import type {
	RemoveOptions,
	VfsDirectoryNode,
	VfsFileNode,
	VfsNodeStats,
	VfsSnapshot,
	VfsSnapshotDirectoryNode,
	VfsSnapshotFileNode,
	VfsSnapshotNode,
	WriteFileOptions,
} from "../types/vfs";
import { decodeVfs, encodeVfs, isBinarySnapshot } from "./binaryPack";
import type {
	InternalDirectoryNode,
	InternalFileNode,
	InternalNode,
} from "./internalTypes";
import { appendJournalEntry, JournalOp, readJournal, truncateJournal } from "./journal";
import { getNode, getParentDirectory, normalizePath } from "./path";

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
	private root: InternalDirectoryNode;
	private readonly mode: VfsPersistenceMode;
	private readonly snapshotFile: string | null;
	/** Path to the WAL journal file (null in memory mode). */
	private readonly journalFile: string | null;
	/** Eviction threshold in bytes (0 = disabled). Files above this are purged after flush. */
	private readonly evictionThreshold: number;
	/** Max writes between forced flushes (0 = disabled). */
	private readonly flushAfterNWrites: number;
	/** Pending write counter since last checkpoint. */
	private _writesSinceFlush = 0;
	/** NodeJS timer handle for periodic auto-flush (null = disabled or stopped). */
	private _flushTimer: ReturnType<typeof setInterval> | null = null;
	/** True if the VFS has unflushed changes. */
	private _dirty = false;
	/** Active host-directory mounts: vPath → { hostPath, readOnly } */
	private readonly mounts = new Map<string, { hostPath: string; readOnly: boolean }>();
	/** True when running in a browser environment (no host FS access). */
	private static readonly isBrowser =
		typeof process === "undefined" || typeof (process as NodeJS.Process).versions?.node === "undefined";

	constructor(options: VfsOptions = {}) {
		super();
		this.mode = options.mode ?? "memory";
		if (this.mode === "fs") {
			if (!options.snapshotPath) {
				throw new Error(
					'VirtualFileSystem: "snapshotPath" is required when mode is "fs".',
				);
			}
			this.snapshotFile = path.resolve(
				options.snapshotPath,
				"vfs-snapshot.vfsb",
			);
			this.journalFile = path.resolve(options.snapshotPath, "vfs-journal.bin");
			this.evictionThreshold = options.evictionThresholdBytes ?? 64 * 1024; // 64 KB default
			this.flushAfterNWrites = options.flushAfterNWrites ?? 500;
			const intervalMs = options.flushIntervalMs ?? 30_000;
			if (intervalMs > 0) {
				this._flushTimer = setInterval(() => {
					if (this._dirty) void this._autoFlush();
				}, intervalMs);
				// Don't block process exit on this timer
				if (typeof this._flushTimer === "object" && this._flushTimer !== null && "unref" in this._flushTimer) {
					(this._flushTimer as NodeJS.Timeout).unref();
				}
			}
		} else {
			this.snapshotFile = null;
			this.journalFile = null;
			this.evictionThreshold = 0; // disabled in memory mode
			this.flushAfterNWrites = 0;
		}
		this.root = this.makeDir("", 0o755);
	}

	// ── Internal helpers ──────────────────────────────────────────────────────

	private makeDir(name: string, mode: number): InternalDirectoryNode {
		const now = new Date();
		return {
			type: "directory",
			name,
			mode,
			createdAt: now,
			updatedAt: now,
			children: Object.create(null) as Record<string, InternalNode>,
			_childCount: 0,
		};
	}

	private makeFile(
		name: string,
		content: Buffer,
		mode: number,
		compressed: boolean,
	): InternalFileNode {
		const now = new Date();
		return {
			type: "file",
			name,
			content,
			mode,
			compressed,
			createdAt: now,
			updatedAt: now,
		};
	}

	private mkdirRecursive(targetPath: string, mode: number): void {
		const normalized = normalizePath(targetPath);
		if (normalized === "/") return;
		const parts = normalized.split("/").filter(Boolean);
		let current = this.root;
		let builtPath = "";
		for (const part of parts) {
			builtPath += `/${part}`;
			let child = current.children[part];
			if (!child) {
				child = this.makeDir(part, mode);
				current.children[part] = child;
				current._childCount++;
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
		if (this.mode !== "fs" || !this.snapshotFile) return;

		if (!fsSync.existsSync(this.snapshotFile)) {
			// No snapshot yet — but replay journal if it exists (crash after writes, before first flush)
			if (this.journalFile) {
				const entries = readJournal(this.journalFile);
				if (entries.length > 0) this._replayJournal(entries);
			}
			return;
		}

		try {
			const raw = fsSync.readFileSync(this.snapshotFile);
			if (isBinarySnapshot(raw)) {
				// Fast binary format (current)
				this.root = decodeVfs(raw);
			} else {
				// Legacy JSON fallback — auto-migrates on next flushMirror()
				const snapshot: VfsSnapshot = JSON.parse(raw.toString("utf8"));
				this.root = this.deserializeDir(snapshot.root, "");
				console.info(
					"[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.",
				);
			}
			this.emit("snapshot:restore", { path: this.snapshotFile });
			// Replay WAL journal on top of the loaded snapshot
			if (this.journalFile) {
				const entries = readJournal(this.journalFile);
				if (entries.length > 0) this._replayJournal(entries);
			}
		} catch (err) {
			// Corrupt or unreadable snapshot — start fresh and warn
			console.warn(
				`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,
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
		if (this.mode !== "fs" || !this.snapshotFile) {
			this.emit("mirror:flush");
			return;
		}

		const dir = path.dirname(this.snapshotFile);
		fsSync.mkdirSync(dir, { recursive: true });
		const binary = encodeVfs(this.root);
		fsSync.writeFileSync(this.snapshotFile, binary);
		// Checkpoint complete — truncate the journal (entries are now in the snapshot)
		if (this.journalFile) truncateJournal(this.journalFile);
		this._dirty = false;
		this._writesSinceFlush = 0;
		this.emit("mirror:flush", { path: this.snapshotFile });
		// Evict large files from RAM now that the snapshot is on disk
		this.evictLargeFiles();
	}

	/** Returns the current persistence mode. */
	public getMode(): VfsPersistenceMode {
		return this.mode;
	}

	/** Returns the snapshot file path used in `"fs"` mode, or `null`. */
	public getSnapshotPath(): string | null {
		return this.snapshotFile;
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
		if (this.flushAfterNWrites > 0) {
			this._writesSinceFlush++;
			if (this._writesSinceFlush >= this.flushAfterNWrites) {
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
	 */
	public importRootTree(root: InternalDirectoryNode): void {
		const prev = this._replayMode;
		this._replayMode = true;
		try { this.root = root; } finally { this._replayMode = prev; }
	}

	/** Serialise current tree to VFSB binary. Used for the static rootfs cache. */
	public encodeBinary(): Buffer {
		return encodeVfs(this.root);
	}

	/** Set to true during journal replay to suppress re-journaling. */
	private _replayMode = false;

	/** Append a journal entry if in fs mode and not replaying. */
	private _journal(entry: Parameters<typeof appendJournalEntry>[1]): void {
		if (this.journalFile && !this._replayMode) {
			appendJournalEntry(this.journalFile, entry);
			this._markDirty();
		}
	}

	/** Replay a list of journal entries onto the in-memory tree. */
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
		if (!this.snapshotFile || this.evictionThreshold === 0) return;
		if (!fsSync.existsSync(this.snapshotFile)) return;
		this._evictDir(this.root);
	}

	private _evictDir(dir: InternalDirectoryNode): void {
		for (const node of Object.values(dir.children)) {
			if (node.type === "directory") {
				this._evictDir(node);
			} else if (!node.evicted) {
				const rawSize = node.compressed
					? (node.size ?? node.content.length * 2) // estimate uncompressed
					: node.content.length;
				if (rawSize > this.evictionThreshold) {
					node.size    = rawSize;
					node.content = Buffer.alloc(0); // free heap
					node.evicted = true;
				}
			}
		}
	}

	/**
	 * Reload a single evicted file node's content from the current snapshot.
	 * No-op if the node is not evicted.
	 */
	private _reloadEvicted(node: InternalFileNode, normalizedPath: string): void {
		if (!node.evicted || !this.snapshotFile) return;
		if (!fsSync.existsSync(this.snapshotFile)) return;
		try {
			// Load and parse the snapshot to find this specific node
			const raw = fsSync.readFileSync(this.snapshotFile);
			const tmpRoot = decodeVfs(raw);
			const parts = normalizedPath.split("/").filter(Boolean);
			let cur: InternalNode = tmpRoot;
			for (const part of parts) {
				if (cur.type !== "directory") return;
				const next = cur.children[part];
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
		if (VirtualFileSystem.isBrowser) return; // silently degrade in browser
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
		this.mounts.set(normalized, { hostPath: resolved, readOnly });
		this.emit("mount", { vPath: normalized, hostPath: resolved, readOnly });
	}

	/**
	 * Unmount a previously mounted host directory.
	 * The in-memory VFS directory at `vPath` is preserved but the host
	 * delegation is removed.
	 */
	public unmount(vPath: string): void {
		const normalized = normalizePath(vPath);
		if (this.mounts.delete(normalized)) {
			this.emit("unmount", { vPath: normalized });
		}
	}

	/** List all active mounts. */
	public getMounts(): Array<{ vPath: string; hostPath: string; readOnly: boolean }> {
		return [...this.mounts.entries()].map(([vPath, opts]) => ({
			vPath, ...opts,
		}));
	}

	/**
	 * If `targetPath` is inside a mount, return `{ hostPath, readOnly, relPath }`.
	 * `relPath` is the path relative to the mount's host directory.
	 * Returns `null` if the path is not under any mount.
	 */
	private resolveMount(targetPath: string): {
		hostPath: string;
		readOnly: boolean;
		relPath:  string;
		fullHostPath: string;
	} | null {
		const normalized = normalizePath(targetPath);
		// Iterate mounts from most specific to least specific
		const sorted = [...this.mounts.entries()].sort(
			([a], [b]) => b.length - a.length,
		);
		for (const [vBase, opts] of sorted) {
			if (normalized === vBase || normalized.startsWith(`${vBase}/`)) {
				const relPath      = normalized.slice(vBase.length).replace(/^\//, "");
				const fullHostPath = relPath ? path.join(opts.hostPath, relPath) : opts.hostPath;
				return { hostPath: opts.hostPath, readOnly: opts.readOnly, relPath, fullHostPath };
			}
		}
		return null;
	}

		public mkdir(targetPath: string, mode: number = 0o755): void {
		const normalized = normalizePath(targetPath);
		const existing = (() => {
			try {
				return getNode(this.root, normalized);
			} catch {
				return null;
			}
		})();
		if (existing && existing.type !== "directory") {
			throw new Error(
				`Cannot create directory '${normalized}': path is a file.`,
			);
		}
		this.mkdirRecursive(normalized, mode);
	}

	/**
	 * Writes UTF-8 text or binary content into a file.
	 * Parent directories are created when missing.
	 */
	public writeFile(
		targetPath: string,
		content: string | Buffer,
		options: WriteFileOptions = {},
	): void {
		// Delegate to host FS if inside a mount
		const m = this.resolveMount(targetPath);
		if (m) {
			if (m.readOnly) throw new Error(`EROFS: read-only file system, open '${m.fullHostPath}'`);
			const dir = path.dirname(m.fullHostPath);
			if (!fsSync.existsSync(dir)) fsSync.mkdirSync(dir, { recursive: true });
			fsSync.writeFileSync(m.fullHostPath, Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8"));
			return;
		}
		const normalized = normalizePath(targetPath);
		const { parent, name } = getParentDirectory(
			this.root,
			normalized,
			true,
			(p) => this.mkdirRecursive(p, 0o755),
		);

		const existing = parent.children[name];
		if (existing?.type === "directory") {
			throw new Error(
				`Cannot write file '${normalized}': path is a directory.`,
			);
		}

		const rawContent = Buffer.isBuffer(content)
			? content
			: Buffer.from(content, "utf8");
		const shouldCompress = options.compress ?? false;
		const storedContent = shouldCompress ? gzipSync(rawContent) : rawContent;
		const mode = options.mode ?? 0o644;

		if (existing) {
			const f = existing as InternalFileNode;
			f.content = storedContent;
			f.compressed = shouldCompress;
			f.mode = mode;
			f.updatedAt = new Date();
		} else {
			parent.children[name] = this.makeFile(name, storedContent, mode, shouldCompress);
			parent._childCount++;
		}

		this.emit("file:write", { path: normalized, size: storedContent.length });
		this._journal({ op: JournalOp.WRITE, path: normalized, content: rawContent, mode });
	}

	/**
	 * Reads file content as a UTF-8 string.
	 * Gzip-compressed files are transparently decompressed.
	 */
	public readFile(targetPath: string): string {
		const m = this.resolveMount(targetPath);
		if (m) {
			if (!fsSync.existsSync(m.fullHostPath)) throw new Error(`ENOENT: no such file or directory, open '${m.fullHostPath}'`);
			return fsSync.readFileSync(m.fullHostPath, "utf8");
		}
		const normalized = normalizePath(targetPath);
		const node = getNode(this.root, normalized);
		if (node.type !== "file") {
			throw new Error(`Cannot read '${targetPath}': not a file.`);
		}
		const f = node as InternalFileNode;
		if (f.evicted) this._reloadEvicted(f, normalized);
		const raw = f.compressed ? gunzipSync(f.content) : f.content;
		this.emit("file:read", { path: normalized, size: raw.length });
		return raw.toString("utf8");
	}

	/** Reads file content as a Buffer (decompresses if needed). */
	public readFileRaw(targetPath: string): Buffer {
		const m = this.resolveMount(targetPath);
		if (m) {
			if (!fsSync.existsSync(m.fullHostPath)) throw new Error(`ENOENT: no such file or directory, open '${m.fullHostPath}'`);
			return fsSync.readFileSync(m.fullHostPath);
		}
		const normalized = normalizePath(targetPath);
		const node = getNode(this.root, normalized);
		if (node.type !== "file") {
			throw new Error(`Cannot read '${targetPath}': not a file.`);
		}
		const f = node as InternalFileNode;
		if (f.evicted) this._reloadEvicted(f, normalized);
		const raw = f.compressed ? gunzipSync(f.content) : f.content;
		this.emit("file:read", { path: normalized, size: raw.length });
		return raw;
	}

	/** Returns true when a file or directory exists at path. */
	public exists(targetPath: string): boolean {
		const m = this.resolveMount(targetPath);
		if (m) return fsSync.existsSync(m.fullHostPath);
		try {
			getNode(this.root, normalizePath(targetPath));
			return true;
		} catch {
			return false;
		}
	}

	/** Updates mode bits on a node. */
	public chmod(targetPath: string, mode: number): void {
		const normalized = normalizePath(targetPath);
		getNode(this.root, normalized).mode = mode;
		this._journal({ op: JournalOp.CHMOD, path: normalized, mode });
	}

	/** Returns metadata for a file or directory. */
	public stat(targetPath: string): VfsNodeStats {
		const m = this.resolveMount(targetPath);
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
				createdAt: hst.birthtime,
				updatedAt: now,
				compressed: false,
				size: hst.size,
			} satisfies VfsFileNode;
		}
		const normalized = normalizePath(targetPath);
		const node = getNode(this.root, normalized);
		const name = normalized === "/" ? "" : path.posix.basename(normalized);
		if (node.type === "file") {
			const f = node as InternalFileNode;
			return {
				type: "file",
				name,
				path: normalized,
				mode: f.mode,
				createdAt: f.createdAt,
				updatedAt: f.updatedAt,
				compressed: f.compressed,
				size: f.evicted ? (f.size ?? 0) : f.content.length,
			};
		}
		const d = node as InternalDirectoryNode;
		return {
			type: "directory",
			name,
			path: normalized,
			mode: d.mode,
			createdAt: d.createdAt,
			updatedAt: d.updatedAt,
			childrenCount: d._childCount,
		};
	}

	/** Lists direct children names of a directory (sorted). */
	public list(dirPath: string = "/"): string[] {
		const m = this.resolveMount(dirPath);
		if (m) {
			if (!fsSync.existsSync(m.fullHostPath)) return [];
			try {
				return fsSync.readdirSync(m.fullHostPath).sort();
			} catch { return []; }
		}
		const normalized = normalizePath(dirPath);
		const node = getNode(this.root, normalized);
		if (node.type !== "directory") {
			throw new Error(`Cannot list '${dirPath}': not a directory.`);
		}
		return Object.keys((node as InternalDirectoryNode).children).sort();
	}

	/** Renders ASCII tree view of a directory hierarchy. */
	public tree(dirPath: string = "/"): string {
		const normalized = normalizePath(dirPath);
		const node = getNode(this.root, normalized);
		if (node.type !== "directory") {
			throw new Error(`Cannot render tree for '${dirPath}': not a directory.`);
		}
		const label = dirPath === "/" ? "/" : path.posix.basename(normalized);
		return this.renderTreeLines(node as InternalDirectoryNode, label);
	}

	private renderTreeLines(dir: InternalDirectoryNode, label: string): string {
		const lines = [label];
		const entries = Object.keys(dir.children).sort();
		for (let i = 0; i < entries.length; i++) {
			const name = entries[i]!;
			const child = dir.children[name]!;
			const isLast = i === entries.length - 1;
			const connector = isLast ? "└── " : "├── ";
			const nextPrefix = isLast ? "    " : "│   ";
			lines.push(`${connector}${name}`);
			if (child.type === "directory") {
				const sub = this.renderTreeLines(child as InternalDirectoryNode, "")
					.split("\n")
					.slice(1)
					.map((l) => `${nextPrefix}${l}`);
				lines.push(...sub);
			}
		}
		return lines.join("\n");
	}

	/** Computes total stored bytes under a path. */
	public getUsageBytes(targetPath: string = "/"): number {
		return this.computeUsage(getNode(this.root, normalizePath(targetPath)));
	}

	private computeUsage(node: InternalNode): number {
		if (node.type === "file") return (node as InternalFileNode).content.length;
		let total = 0;
		for (const child of Object.values((node as InternalDirectoryNode).children)) {
			total += this.computeUsage(child);
		}
		return total;
	}

	/** Compresses a file's content with gzip in place. */
	public compressFile(targetPath: string): void {
		const node = getNode(this.root, normalizePath(targetPath));
		if (node.type !== "file")
			throw new Error(`Cannot compress '${targetPath}': not a file.`);
		const f = node as InternalFileNode;
		if (!f.compressed) {
			f.content = gzipSync(f.content);
			f.compressed = true;
			f.updatedAt = new Date();
		}
	}

	/** Decompresses a gzip-compressed file in place. */
	public decompressFile(targetPath: string): void {
		const node = getNode(this.root, normalizePath(targetPath));
		if (node.type !== "file")
			throw new Error(`Cannot decompress '${targetPath}': not a file.`);
		const f = node as InternalFileNode;
		if (f.compressed) {
			f.content = gunzipSync(f.content);
			f.compressed = false;
			f.updatedAt = new Date();
		}
	}

	/**
	 * Creates a symbolic link.
	 * The link node is stored with mode `0o120777` (POSIX symlink convention).
	 */
	public symlink(targetPath: string, linkPath: string): void {
		const normalizedLink = normalizePath(linkPath);
		const normalizedTarget = targetPath.startsWith("/")
			? normalizePath(targetPath)
			: targetPath;
		const { parent, name } = getParentDirectory(
			this.root,
			normalizedLink,
			true,
			(p) => this.mkdirRecursive(p, 0o755),
		);
		const symNode: InternalFileNode = {
			type: "file",
			name,
			content: Buffer.from(normalizedTarget, "utf8"),
			mode: 0o120777,
			compressed: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		parent.children[name] = symNode;
		parent._childCount++;
		// Journal before emit
		this._journal({ op: JournalOp.SYMLINK, path: normalizedLink, dest: normalizedTarget });
		this.emit("symlink:create", {
			link: normalizedLink,
			target: normalizedTarget,
		});
	}

	/** Returns true when the path is a symbolic link node. */
	public isSymlink(targetPath: string): boolean {
		try {
			const node = getNode(this.root, normalizePath(targetPath));
			return node.type === "file" && node.mode === 0o120777;
		} catch {
			return false;
		}
	}

	/**
	 * Resolves a symlink chain up to `maxDepth` hops.
	 * Throws when the chain is too long (circular links).
	 */
	public resolveSymlink(linkPath: string, maxDepth = 8): string {
		let current = normalizePath(linkPath);
		for (let depth = 0; depth < maxDepth; depth++) {
			try {
				const node = getNode(this.root, current);
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

	/** Removes a file or directory node. */
	public remove(targetPath: string, options: RemoveOptions = {}): void {
		const m = this.resolveMount(targetPath);
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
		const node = getNode(this.root, normalized);
		if (node.type === "directory") {
			const dir = node as InternalDirectoryNode;
			if (!options.recursive && dir._childCount > 0) {
				throw new Error(
					`Directory '${normalized}' is not empty. Use recursive option.`,
				);
			}
		}
		const { parent, name } = getParentDirectory(
			this.root,
			normalized,
			false,
			() => {},
		);
		delete parent.children[name];
		parent._childCount--;		this.emit("node:remove", { path: normalized });
		this._journal({ op: JournalOp.REMOVE, path: normalized });
	}

	/** Moves or renames a node. */
	public move(fromPath: string, toPath: string): void {
		const fromNormalized = normalizePath(fromPath);
		const toNormalized = normalizePath(toPath);
		if (fromNormalized === "/" || toNormalized === "/") {
			throw new Error("Cannot move root directory.");
		}
		const node = getNode(this.root, fromNormalized);
		if (this.exists(toNormalized)) {
			throw new Error(`Destination '${toNormalized}' already exists.`);
		}
		this.mkdirRecursive(path.posix.dirname(toNormalized), 0o755);
		const { parent: destParent, name: destName } = getParentDirectory(
			this.root,
			toNormalized,
			false,
			() => {},
		);
		const { parent: srcParent, name: srcName } = getParentDirectory(
			this.root,
			fromNormalized,
			false,
			() => {},
		);
		delete srcParent.children[srcName];
		srcParent._childCount--;
		node.name = destName;
		destParent.children[destName] = node;
		destParent._childCount++;
		this._journal({ op: JournalOp.MOVE, path: fromNormalized, dest: toNormalized });
	}

	// ── Snapshot serialisation ─────────────────────────────────────────────────

	/**
	 * Exports the entire filesystem as a JSON-serialisable snapshot.
	 *
	 * Works regardless of the persistence mode. Useful for test fixtures,
	 * manual backups, or passing VFS state between processes.
	 */
	public toSnapshot(): VfsSnapshot {
		return { root: this.serializeDir(this.root) };
	}

	private serializeDir(dir: InternalDirectoryNode): VfsSnapshotDirectoryNode {
		const children: VfsSnapshotNode[] = [];
		for (const child of Object.values(dir.children)) {
			children.push(
				child.type === "file"
					? this.serializeFile(child as InternalFileNode)
					: this.serializeDir(child as InternalDirectoryNode),
			);
		}
		return {
			type: "directory",
			name: dir.name,
			mode: dir.mode,
			createdAt: dir.createdAt.toISOString(),
			updatedAt: dir.updatedAt.toISOString(),
			children,
		};
	}

	private serializeFile(file: InternalFileNode): VfsSnapshotFileNode {
		return {
			type: "file",
			name: file.name,
			mode: file.mode,
			createdAt: file.createdAt.toISOString(),
			updatedAt: file.updatedAt.toISOString(),
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
	 */
	public static fromSnapshot(snapshot: VfsSnapshot): VirtualFileSystem {
		const vfs = new VirtualFileSystem();
		vfs.root = vfs.deserializeDir(snapshot.root, "");
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
	 */
	public importSnapshot(snapshot: VfsSnapshot): void {
		this.root = this.deserializeDir(snapshot.root, "");
		this.emit("snapshot:import");
	}

	private deserializeDir(
		snap: VfsSnapshotDirectoryNode,
		name: string,
	): InternalDirectoryNode {
		const dir: InternalDirectoryNode = {
			type: "directory",
			name,
			mode: snap.mode,
			createdAt: new Date(snap.createdAt),
			updatedAt: new Date(snap.updatedAt),
			children: Object.create(null) as Record<string, InternalNode>,
			_childCount: 0,
		};
		for (const child of snap.children) {
			if (child.type === "file") {
				const f = child as VfsSnapshotFileNode;
				dir.children[f.name] = {
					type: "file",
					name: f.name,
					mode: f.mode,
					createdAt: new Date(f.createdAt),
					updatedAt: new Date(f.updatedAt),
					compressed: f.compressed,
					content: Buffer.from(f.contentBase64, "base64"),
				};
			} else {
				const sub = this.deserializeDir(
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
