import { EventEmitter } from "node:events";
import * as fsSync from "node:fs";
import * as path from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";
import type {
	InternalDirectoryNode,
	InternalFileNode,
	InternalNode,
} from "./internalTypes";
import { getNode, getParentDirectory, normalizePath } from "./path";
import type {
	RemoveOptions,
	VfsNodeStats,
	VfsSnapshot,
	VfsSnapshotDirectoryNode,
	VfsSnapshotFileNode,
	VfsSnapshotNode,
	WriteFileOptions,
} from "../types/vfs";

// ── Persistence options ───────────────────────────────────────────────────────

/**
 * "memory" — pure in-memory, no disk I/O (default).
 *
 * "fs"     — mirrors the VFS tree to a directory on the host filesystem.
 *             `snapshotPath` must be set to the directory where the JSON
 *             snapshot file will be read/written.
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
}

// ── VirtualFileSystem ─────────────────────────────────────────────────────────

/**
 * In-memory virtual filesystem with optional JSON-snapshot persistence.
 *
 * **Memory mode** (default) — all state lives in a fast recursive tree.
 * Use `toSnapshot()` / `fromSnapshot()` / `importSnapshot()` for serialisation.
 *
 * **FS mode** — same in-memory tree, but `restoreMirror()` loads a JSON
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
				"vfs-snapshot.json",
			);
		} else {
			this.snapshotFile = null;
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
			children: new Map(),
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
			let child = current.children.get(part);
			if (!child) {
				child = this.makeDir(part, mode);
				current.children.set(part, child);
				this.emit("dir:create", { path: builtPath, mode });
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
	 * In `"fs"` mode: reads the JSON snapshot from disk and hydrates the tree.
	 * Silently succeeds when the snapshot file does not exist yet.
	 *
	 * In `"memory"` mode: no-op (kept for API compatibility).
	 */
	public async restoreMirror(): Promise<void> {
		if (this.mode !== "fs" || !this.snapshotFile) return;

		if (!fsSync.existsSync(this.snapshotFile)) return;

		try {
			const raw = fsSync.readFileSync(this.snapshotFile, "utf8");
			const snapshot: VfsSnapshot = JSON.parse(raw);
			this.root = this.deserializeDir(snapshot.root, "");
			this.emit("snapshot:restore", { path: this.snapshotFile });
		} catch (err) {
			// Corrupt or unreadable snapshot — start fresh and warn
			console.warn(
				`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,
				err instanceof Error ? err.message : String(err),
			);
		}
	}

	/**
	 * In `"fs"` mode: serialises the in-memory tree to a JSON snapshot on disk.
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
		const snapshot = this.toSnapshot();
		fsSync.writeFileSync(this.snapshotFile, JSON.stringify(snapshot), "utf8");
		this.emit("mirror:flush", { path: this.snapshotFile });
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
		const normalized = normalizePath(targetPath);
		const { parent, name } = getParentDirectory(
			this.root,
			normalized,
			true,
			(p) => this.mkdirRecursive(p, 0o755),
		);

		const existing = parent.children.get(name);
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
			parent.children.set(
				name,
				this.makeFile(name, storedContent, mode, shouldCompress),
			);
		}

		this.emit("file:write", { path: normalized, size: storedContent.length });
	}

	/**
	 * Reads file content as a UTF-8 string.
	 * Gzip-compressed files are transparently decompressed.
	 */
	public readFile(targetPath: string): string {
		const normalized = normalizePath(targetPath);
		const node = getNode(this.root, normalized);
		if (node.type !== "file") {
			throw new Error(`Cannot read '${targetPath}': not a file.`);
		}
		const f = node as InternalFileNode;
		const raw = f.compressed ? gunzipSync(f.content) : f.content;
		this.emit("file:read", { path: normalized, size: raw.length });
		return raw.toString("utf8");
	}

	/** Reads file content as a Buffer (decompresses if needed). */
	public readFileRaw(targetPath: string): Buffer {
		const normalized = normalizePath(targetPath);
		const node = getNode(this.root, normalized);
		if (node.type !== "file") {
			throw new Error(`Cannot read '${targetPath}': not a file.`);
		}
		const f = node as InternalFileNode;
		const raw = f.compressed ? gunzipSync(f.content) : f.content;
		this.emit("file:read", { path: normalized, size: raw.length });
		return raw;
	}

	/** Returns true when a file or directory exists at path. */
	public exists(targetPath: string): boolean {
		try {
			getNode(this.root, normalizePath(targetPath));
			return true;
		} catch {
			return false;
		}
	}

	/** Updates mode bits on a node. */
	public chmod(targetPath: string, mode: number): void {
		getNode(this.root, normalizePath(targetPath)).mode = mode;
	}

	/** Returns metadata for a file or directory. */
	public stat(targetPath: string): VfsNodeStats {
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
				size: f.content.length,
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
			childrenCount: d.children.size,
		};
	}

	/** Lists direct children names of a directory (sorted). */
	public list(dirPath: string = "/"): string[] {
		const normalized = normalizePath(dirPath);
		const node = getNode(this.root, normalized);
		if (node.type !== "directory") {
			throw new Error(`Cannot list '${dirPath}': not a directory.`);
		}
		return Array.from((node as InternalDirectoryNode).children.keys()).sort();
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
		const entries = Array.from(dir.children.keys()).sort();
		for (let i = 0; i < entries.length; i++) {
			const name = entries[i]!;
			const child = dir.children.get(name)!;
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
		for (const child of (node as InternalDirectoryNode).children.values()) {
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
		parent.children.set(name, symNode);
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
		const normalized = normalizePath(targetPath);
		if (normalized === "/") throw new Error("Cannot remove root directory.");
		const node = getNode(this.root, normalized);
		if (node.type === "directory") {
			const dir = node as InternalDirectoryNode;
			if (!options.recursive && dir.children.size > 0) {
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
		parent.children.delete(name);
		this.emit("node:remove", { path: normalized });
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
		srcParent.children.delete(srcName);
		node.name = destName;
		destParent.children.set(destName, node);
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
		for (const child of dir.children.values()) {
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
			children: new Map(),
		};
		for (const child of snap.children) {
			if (child.type === "file") {
				const f = child as VfsSnapshotFileNode;
				dir.children.set(f.name, {
					type: "file",
					name: f.name,
					mode: f.mode,
					createdAt: new Date(f.createdAt),
					updatedAt: new Date(f.updatedAt),
					compressed: f.compressed,
					content: Buffer.from(f.contentBase64, "base64"),
				});
			} else {
				const sub = this.deserializeDir(
					child as VfsSnapshotDirectoryNode,
					child.name,
				);
				dir.children.set(child.name, sub);
			}
		}
		return dir;
	}
}

export default VirtualFileSystem;
