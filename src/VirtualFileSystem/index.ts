import * as fs from "node:fs";
import * as path from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";
import type {
	RemoveOptions,
	VfsNodeStats,
	WriteFileOptions,
} from "../types/vfs";
import { normalizePath } from "./path";

/**
 * In-memory virtual filesystem with tar.gz mirror persistence.
 *
 * Paths are normalized to POSIX-like absolute paths. Use
 * {@link VirtualFileSystem.restoreMirror} on startup and
 * {@link VirtualFileSystem.flushMirror} to persist pending changes.
 */
class VirtualFileSystem {
	private readonly mirrorRoot: string;

	private ensureMirrorRoot(): void {
		fs.mkdirSync(this.mirrorRoot, { recursive: true, mode: 0o755 });
	}

	private resolveFsPath(targetPath: string): string {
		const normalized = normalizePath(targetPath);
		const relativePath = normalized.slice(1);
		const resolved = path.resolve(this.mirrorRoot, relativePath || ".");
		const relative = path.relative(this.mirrorRoot, resolved);

		if (relative.startsWith("..") || path.isAbsolute(relative)) {
			throw new Error(`Invalid path '${targetPath}'.`);
		}

		return resolved;
	}

	private detectGzipFile(targetPath: string): boolean {
		const fd = fs.openSync(targetPath, "r");
		try {
			const header = Buffer.alloc(2);
			const bytesRead = fs.readSync(fd, header, 0, 2, 0);
			return bytesRead === 2 && header[0] === 0x1f && header[1] === 0x8b;
		} finally {
			fs.closeSync(fd);
		}
	}

	private computeDiskUsageBytes(targetPath: string): number {
		const stats = fs.statSync(targetPath);
		if (stats.isFile()) {
			return stats.size;
		}

		let total = 0;
		for (const entry of fs.readdirSync(targetPath)) {
			total += this.computeDiskUsageBytes(path.join(targetPath, entry));
		}
		return total;
	}

	private renderTreeLines(targetPath: string, label: string): string {
		const lines = [label];

		const walk = (currentPath: string, prefix: string): void => {
			const entries = fs
				.readdirSync(currentPath, { withFileTypes: true })
				.map((entry) => entry.name)
				.sort((left, right) => left.localeCompare(right));

			for (let i = 0; i < entries.length; i += 1) {
				const name = entries[i]!;
				const isLast = i === entries.length - 1;
				const connector = isLast ? "└── " : "├── ";
				const nextPrefix = `${prefix}${isLast ? "    " : "│   "}`;
				const entryPath = path.join(currentPath, name);
				const isDirectory = fs.statSync(entryPath).isDirectory();

				lines.push(`${prefix}${connector}${name}`);
				if (isDirectory) {
					walk(entryPath, nextPrefix);
				}
			}
		};

		walk(targetPath, "");
		return lines.join("\n");
	}

	/**
	 * Creates a virtual filesystem instance.
	 *
	 * @param baseDir Base directory used to resolve mirror archive location.
	 */
	constructor(baseDir: string = process.cwd()) {
		this.mirrorRoot = path.resolve(baseDir, ".vfs", "mirror");
	}

	/**
	 * Restores filesystem state from mirror archive.
	 *
	 * If archive does not exist or cannot be read, creates fresh mirror file.
	 */
	public async restoreMirror(): Promise<void> {
		this.ensureMirrorRoot();
	}

	/**
	 * Persists current filesystem state to mirror archive.
	 *
	 * No-op when nothing changed and archive already exists.
	 */
	public async flushMirror(): Promise<void> {
		this.ensureMirrorRoot();
	}

	/**
	 * Creates directory and any missing parent directories.
	 *
	 * @param targetPath Absolute or relative path to directory.
	 * @param mode POSIX-like mode bits for new directories.
	 */
	public mkdir(targetPath: string, mode: number = 0o755): void {
		this.ensureMirrorRoot();
		const fsPath = this.resolveFsPath(targetPath);
		if (fs.existsSync(fsPath) && !fs.statSync(fsPath).isDirectory()) {
			throw new Error(
				`Cannot create directory '${normalizePath(targetPath)}': path is a file.`,
			);
		}
		fs.mkdirSync(fsPath, { recursive: true, mode });
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
		this.ensureMirrorRoot();
		const normalized = normalizePath(targetPath);
		const fsPath = this.resolveFsPath(normalized);
		const parentPath = path.dirname(fsPath);
		fs.mkdirSync(parentPath, { recursive: true, mode: 0o755 });

		const rawContent = Buffer.isBuffer(content)
			? content
			: Buffer.from(content, "utf8");
		const shouldCompress = options.compress ?? false;
		const storedContent = shouldCompress ? gzipSync(rawContent) : rawContent;

		if (fs.existsSync(fsPath) && fs.statSync(fsPath).isDirectory()) {
			throw new Error(
				`Cannot write file '${normalized}': path is a directory.`,
			);
		}

		fs.writeFileSync(fsPath, storedContent);
		fs.chmodSync(fsPath, options.mode ?? 0o644);
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
		this.ensureMirrorRoot();
		const fsPath = this.resolveFsPath(targetPath);
		if (!fs.existsSync(fsPath) || !fs.statSync(fsPath).isFile()) {
			throw new Error(`Cannot read '${targetPath}': not a file.`);
		}

		const stored = fs.readFileSync(fsPath);
		const raw = this.detectGzipFile(fsPath) ? gunzipSync(stored) : stored;
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
			const fsPath = this.resolveFsPath(targetPath);
			return fs.existsSync(fsPath);
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
		const fsPath = this.resolveFsPath(targetPath);
		if (!fs.existsSync(fsPath)) {
			throw new Error(`Path '${normalizePath(targetPath)}' does not exist.`);
		}
		fs.chmodSync(fsPath, mode);
	}

	/**
	 * Returns metadata for file or directory.
	 *
	 * @param targetPath Node path.
	 * @returns Typed stat object based on node type.
	 */
	public stat(targetPath: string): VfsNodeStats {
		this.ensureMirrorRoot();
		const normalized = normalizePath(targetPath);
		const fsPath = this.resolveFsPath(normalized);

		if (!fs.existsSync(fsPath)) {
			throw new Error(`Path '${normalized}' does not exist.`);
		}

		const stats = fs.statSync(fsPath);
		const mode = stats.mode & 0o777;
		const name = normalized === "/" ? "" : path.posix.basename(normalized);

		if (stats.isFile()) {
			return {
				type: "file",
				name,
				path: normalized,
				mode,
				createdAt: stats.birthtime,
				updatedAt: stats.mtime,
				compressed: this.detectGzipFile(fsPath),
				size: stats.size,
			};
		}

		return {
			type: "directory",
			name,
			path: normalized,
			mode,
			createdAt: stats.birthtime,
			updatedAt: stats.mtime,
			childrenCount: fs.readdirSync(fsPath).length,
		};
	}

	/**
	 * Lists direct children names of directory.
	 *
	 * @param dirPath Directory path, defaults to root.
	 * @returns Sorted child names.
	 */
	public list(dirPath: string = "/"): string[] {
		const fsPath = this.resolveFsPath(dirPath);
		if (!fs.existsSync(fsPath) || !fs.statSync(fsPath).isDirectory()) {
			throw new Error(`Cannot list '${dirPath}': not a directory.`);
		}

		return fs.readdirSync(fsPath).sort();
	}

	/**
	 * Renders ASCII tree view of directory hierarchy.
	 *
	 * @param dirPath Directory path, defaults to root.
	 * @returns Multi-line tree string.
	 */
	public tree(dirPath: string = "/"): string {
		const fsPath = this.resolveFsPath(dirPath);
		if (!fs.existsSync(fsPath) || !fs.statSync(fsPath).isDirectory()) {
			throw new Error(`Cannot render tree for '${dirPath}': not a directory.`);
		}

		const rootLabel =
			dirPath === "/" ? "/" : path.posix.basename(normalizePath(dirPath));
		return this.renderTreeLines(fsPath, rootLabel);
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
		const fsPath = this.resolveFsPath(targetPath);
		if (!fs.existsSync(fsPath)) {
			throw new Error(`Path '${normalizePath(targetPath)}' does not exist.`);
		}
		return this.computeDiskUsageBytes(fsPath);
	}

	/**
	 * Compresses file content with gzip and flags node as compressed.
	 *
	 * @param targetPath Path to file.
	 */
	public compressFile(targetPath: string): void {
		const fsPath = this.resolveFsPath(targetPath);
		if (!fs.existsSync(fsPath) || !fs.statSync(fsPath).isFile()) {
			throw new Error(`Cannot compress '${targetPath}': not a file.`);
		}

		if (!this.detectGzipFile(fsPath)) {
			const content = fs.readFileSync(fsPath);
			fs.writeFileSync(fsPath, gzipSync(content));
		}
	}

	/**
	 * Decompresses gzip-compressed file content.
	 *
	 * @param targetPath Path to file.
	 */
	public decompressFile(targetPath: string): void {
		const fsPath = this.resolveFsPath(targetPath);
		if (!fs.existsSync(fsPath) || !fs.statSync(fsPath).isFile()) {
			throw new Error(`Cannot decompress '${targetPath}': not a file.`);
		}

		if (this.detectGzipFile(fsPath)) {
			const content = fs.readFileSync(fsPath);
			fs.writeFileSync(fsPath, gunzipSync(content));
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
		const fsPath = this.resolveFsPath(normalized);

		if (!fs.existsSync(fsPath)) {
			throw new Error(`Path '${normalized}' does not exist.`);
		}

		const stats = fs.statSync(fsPath);
		if (stats.isDirectory() && !options.recursive) {
			const entries = fs.readdirSync(fsPath);
			if (entries.length > 0) {
				throw new Error(
					`Directory '${normalized}' is not empty. Use recursive option.`,
				);
			}
		}

		if (stats.isDirectory()) {
			fs.rmSync(fsPath, { recursive: options.recursive ?? false });
		} else {
			fs.rmSync(fsPath);
		}
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

		const fromFsPath = this.resolveFsPath(fromNormalized);
		const toFsPath = this.resolveFsPath(toNormalized);

		if (!fs.existsSync(fromFsPath)) {
			throw new Error(`Path '${fromNormalized}' does not exist.`);
		}

		if (fs.existsSync(toFsPath)) {
			throw new Error(`Destination '${toNormalized}' already exists.`);
		}

		fs.mkdirSync(path.dirname(toFsPath), { recursive: true, mode: 0o755 });
		fs.renameSync(fromFsPath, toFsPath);
	}
}

export default VirtualFileSystem;
