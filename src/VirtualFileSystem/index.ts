import { promises as fs } from "node:fs";
import * as path from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";
import type {
	RemoveOptions,
	VfsNodeStats,
	WriteFileOptions,
} from "../types/vfs";
import { archiveExists, createTarBuffer, readSnapshotFromTar } from "./archive";
import type { InternalDirectoryNode, InternalNode } from "./internalTypes";
import { getNode, getParentDirectory, normalizePath, splitPath } from "./path";
import { applySnapshot, createSnapshot } from "./snapshot";
import { renderTree } from "./tree";

/**
 * In-memory virtual filesystem with tar.gz mirror persistence.
 *
 * Paths are normalized to POSIX-like absolute paths. Use
 * {@link VirtualFileSystem.restoreMirror} on startup and
 * {@link VirtualFileSystem.flushMirror} to persist pending changes.
 */
class VirtualFileSystem {
	private readonly root: InternalDirectoryNode;
	private readonly archivePath: string;
	private dirty = false;

	private computeNodeUsageBytes(node: InternalNode): number {
		if (node.type === "file") {
			return node.content.length;
		}

		let total = 0;
		for (const child of node.children.values()) {
			total += this.computeNodeUsageBytes(child);
		}
		return total;
	}

	/**
	 * Creates a virtual filesystem instance.
	 *
	 * @param baseDir Base directory used to resolve mirror archive location.
	 */
	constructor(baseDir: string = process.cwd()) {
		const now = new Date();
		this.archivePath = path.resolve(baseDir, ".vfs", "mirror.tar.gz");
		this.root = {
			type: "directory",
			name: "",
			mode: 0o755,
			createdAt: now,
			updatedAt: now,
			children: new Map<string, InternalNode>(),
		};
	}

	/**
	 * Restores filesystem state from mirror archive.
	 *
	 * If archive does not exist or cannot be read, creates fresh mirror file.
	 */
	public async restoreMirror(): Promise<void> {
		await fs.mkdir(path.dirname(this.archivePath), { recursive: true });
		try {
			const compressed = await fs.readFile(this.archivePath);
			const tarBuffer = gunzipSync(compressed);
			const snapshot = await readSnapshotFromTar(tarBuffer);
			applySnapshot(this.root, snapshot);
			this.dirty = false;
			return;
		} catch {
			console.warn(
				`No valid mirror archive found at '${this.archivePath}'. Starting with empty filesystem.`,
			);
			await this.flushMirror();
		}
	}

	/**
	 * Persists current filesystem state to mirror archive.
	 *
	 * No-op when nothing changed and archive already exists.
	 */
	public async flushMirror(): Promise<void> {
		if (!this.dirty && (await archiveExists(this.archivePath))) {
			return;
		}

		await fs.mkdir(path.dirname(this.archivePath), { recursive: true });
		const snapshotJson = JSON.stringify(createSnapshot(this.root), null, 2);
		const tarBuffer = await createTarBuffer(snapshotJson);
		const compressed = gzipSync(tarBuffer);
		await fs.writeFile(this.archivePath, compressed);
		this.dirty = false;
	}

	/**
	 * Creates directory and any missing parent directories.
	 *
	 * @param targetPath Absolute or relative path to directory.
	 * @param mode POSIX-like mode bits for new directories.
	 */
	public mkdir(targetPath: string, mode: number = 0o755): void {
		const normalized = normalizePath(targetPath);
		const parts = splitPath(normalized);

		let current = this.root;
		for (const part of parts) {
			const existing = current.children.get(part);
			if (!existing) {
				const now = new Date();
				const nextDir: InternalDirectoryNode = {
					type: "directory",
					name: part,
					mode,
					createdAt: now,
					updatedAt: now,
					children: new Map<string, InternalNode>(),
				};
				current.children.set(part, nextDir);
				current.updatedAt = now;
				this.dirty = true;
				current = nextDir;
				continue;
			}

			if (existing.type !== "directory") {
				throw new Error(
					`Cannot create directory '${normalized}': '${part}' is a file.`,
				);
			}
			current = existing;
		}
	}

	/**
	 * Writes UTF-8 text or binary content into file.
	 *
	 * Parent directories are created when missing.
	 *
	 * @param targetPath Destination file path.
	 * @param content File content as string or Buffer.
	 * @param options Optional write behavior (mode, compression).
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
			(pathToCreate) => this.mkdir(pathToCreate),
		);
		const now = new Date();

		const rawContent = Buffer.isBuffer(content)
			? content
			: Buffer.from(content, "utf8");
		const shouldCompress = options.compress ?? false;
		const storedContent = shouldCompress ? gzipSync(rawContent) : rawContent;
		const existing = parent.children.get(name);

		if (existing && existing.type === "directory") {
			throw new Error(
				`Cannot write file '${normalized}': path is a directory.`,
			);
		}

		const createdAt = existing?.type === "file" ? existing.createdAt : now;
		const mode =
			options.mode ?? (existing?.type === "file" ? existing.mode : 0o644);

		parent.children.set(name, {
			type: "file",
			name,
			mode,
			createdAt,
			updatedAt: now,
			content: storedContent,
			compressed: shouldCompress,
		});

		parent.updatedAt = now;
		this.dirty = true;
	}

	/**
	 * Reads file content as UTF-8 text.
	 *
	 * Compressed files are transparently decompressed.
	 *
	 * @param targetPath Path to file.
	 * @returns UTF-8 string content.
	 */
	public readFile(targetPath: string): string {
		const node = getNode(this.root, targetPath);
		if (node.type !== "file") {
			throw new Error(`Cannot read '${targetPath}': not a file.`);
		}

		const raw = node.compressed ? gunzipSync(node.content) : node.content;
		return raw.toString("utf8");
	}

	/**
	 * Checks whether node exists at path.
	 *
	 * @param targetPath Node path.
	 * @returns True when file or directory exists.
	 */
	public exists(targetPath: string): boolean {
		try {
			getNode(this.root, targetPath);
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Updates mode bits for file or directory.
	 *
	 * @param targetPath Node path.
	 * @param mode New POSIX-like mode.
	 */
	public chmod(targetPath: string, mode: number): void {
		const node = getNode(this.root, targetPath);
		node.mode = mode;
		node.updatedAt = new Date();
		this.dirty = true;
	}

	/**
	 * Returns metadata for file or directory.
	 *
	 * @param targetPath Node path.
	 * @returns Typed stat object based on node type.
	 */
	public stat(targetPath: string): VfsNodeStats {
		const normalized = normalizePath(targetPath);
		const node = getNode(this.root, normalized);

		if (node.type === "file") {
			return {
				type: "file",
				name: node.name,
				path: normalized,
				mode: node.mode,
				createdAt: node.createdAt,
				updatedAt: node.updatedAt,
				compressed: node.compressed,
				size: node.content.length,
			};
		}

		return {
			type: "directory",
			name: node.name,
			path: normalized,
			mode: node.mode,
			createdAt: node.createdAt,
			updatedAt: node.updatedAt,
			childrenCount: node.children.size,
		};
	}

	/**
	 * Lists direct children names of directory.
	 *
	 * @param dirPath Directory path, defaults to root.
	 * @returns Sorted child names.
	 */
	public list(dirPath: string = "/"): string[] {
		const node = getNode(this.root, dirPath);
		if (node.type !== "directory") {
			throw new Error(`Cannot list '${dirPath}': not a directory.`);
		}

		return Array.from(node.children.keys()).sort();
	}

	/**
	 * Renders ASCII tree view of directory hierarchy.
	 *
	 * @param dirPath Directory path, defaults to root.
	 * @returns Multi-line tree string.
	 */
	public tree(dirPath: string = "/"): string {
		const node = getNode(this.root, dirPath);
		if (node.type !== "directory") {
			throw new Error(`Cannot render tree for '${dirPath}': not a directory.`);
		}

		const rootLabel =
			dirPath === "/" ? "/" : path.posix.basename(normalizePath(dirPath));
		return renderTree(node, rootLabel);
	}

	/**
	 * Computes total stored file bytes under a path.
	 *
	 * File usage is based on in-memory stored bytes, including compressed
	 * payload size when files are marked as compressed.
	 *
	 * @param targetPath File or directory path to measure, defaults to root.
	 * @returns Total byte usage for file content under target path.
	 */
	public getUsageBytes(targetPath: string = "/"): number {
		const node = getNode(this.root, targetPath);
		return this.computeNodeUsageBytes(node);
	}

	/**
	 * Compresses file content with gzip and flags node as compressed.
	 *
	 * @param targetPath Path to file.
	 */
	public compressFile(targetPath: string): void {
		const node = getNode(this.root, targetPath);
		if (node.type !== "file") {
			throw new Error(`Cannot compress '${targetPath}': not a file.`);
		}

		if (!node.compressed) {
			node.content = gzipSync(node.content);
			node.compressed = true;
			node.updatedAt = new Date();
			this.dirty = true;
		}
	}

	/**
	 * Decompresses gzip-compressed file content.
	 *
	 * @param targetPath Path to file.
	 */
	public decompressFile(targetPath: string): void {
		const node = getNode(this.root, targetPath);
		if (node.type !== "file") {
			throw new Error(`Cannot decompress '${targetPath}': not a file.`);
		}

		if (node.compressed) {
			node.content = gunzipSync(node.content);
			node.compressed = false;
			node.updatedAt = new Date();
			this.dirty = true;
		}
	}

	/**
	 * Removes file or directory node.
	 *
	 * @param targetPath Path to remove.
	 * @param options Removal options, including recursive delete.
	 */
	public remove(targetPath: string, options: RemoveOptions = {}): void {
		const normalized = normalizePath(targetPath);
		if (normalized === "/") {
			throw new Error("Cannot remove root directory.");
		}

		const { parent, name } = getParentDirectory(
			this.root,
			normalized,
			false,
			() => undefined,
		);
		const node = parent.children.get(name);

		if (!node) {
			throw new Error(`Path '${normalized}' does not exist.`);
		}

		if (
			node.type === "directory" &&
			node.children.size > 0 &&
			!options.recursive
		) {
			throw new Error(
				`Directory '${normalized}' is not empty. Use recursive option.`,
			);
		}

		parent.children.delete(name);
		parent.updatedAt = new Date();
		this.dirty = true;
	}

	/**
	 * Moves or renames node to destination path.
	 *
	 * @param fromPath Existing source path.
	 * @param toPath Destination path.
	 */
	public move(fromPath: string, toPath: string): void {
		const fromNormalized = normalizePath(fromPath);
		const toNormalized = normalizePath(toPath);

		if (fromNormalized === "/" || toNormalized === "/") {
			throw new Error("Cannot move root directory.");
		}

		const { parent: fromParent, name: fromName } = getParentDirectory(
			this.root,
			fromNormalized,
			false,
			() => undefined,
		);
		const node = fromParent.children.get(fromName);

		if (!node) {
			throw new Error(`Path '${fromNormalized}' does not exist.`);
		}

		const { parent: toParent, name: toName } = getParentDirectory(
			this.root,
			toNormalized,
			true,
			(pathToCreate) => this.mkdir(pathToCreate),
		);
		if (toParent.children.has(toName)) {
			throw new Error(`Destination '${toNormalized}' already exists.`);
		}

		fromParent.children.delete(fromName);
		node.name = toName;
		node.updatedAt = new Date();
		toParent.children.set(toName, node);
		fromParent.updatedAt = new Date();
		toParent.updatedAt = new Date();
		this.dirty = true;
	}
}

export default VirtualFileSystem;
